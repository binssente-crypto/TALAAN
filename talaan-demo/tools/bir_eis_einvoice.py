"""
bir_eis_einvoice.py — Reference implementation for BIR EIS e-invoicing (Philippines)

Pipeline:  build invoice -> validate -> canonical JSON -> JWS sign -> AES-256 encrypt -> transmit
Legal basis: NIRC Secs. 237/237-A (as amended by EOPT), RR 7-2024 (invoice contents),
             RR 11-2025 as amended by RR 26-2025 (EIS mandate; Phase 1 deadline 31 Dec 2026).

IMPORTANT — READ BEFORE USE
  * Field names in FIELD_MAP below are PLACEHOLDERS. Map them to the official EIS JSON
    template (CAS or CRM/POS variant, current spec version) downloaded from the
    EIS Certification Portal (eis-cert.bir.gov.ph). The BIR validates every field server-side.
  * EIS_API_BASE, auth flow, key IDs and the exact encryption envelope come from the
    BIR's technical guide issued to you upon EIS certification / Permit to Transmit (PTT).
  * Transmission deadline: within 3 days of issuance.

Requires:  pip install jwcrypto requests
"""

from __future__ import annotations

import json
import uuid
from dataclasses import dataclass, field, asdict
from datetime import datetime, timezone, timedelta
from decimal import Decimal, ROUND_HALF_UP
from typing import List, Optional

from jwcrypto import jwk, jws, jwe
from jwcrypto.common import json_encode

PH_TZ = timezone(timedelta(hours=8))
VAT_RATE = Decimal("0.12")
CENT = Decimal("0.01")

# ---------------------------------------------------------------------------
# 1. CONFIGURATION — replace with values from your EIS onboarding documents
# ---------------------------------------------------------------------------
EIS_API_BASE = "https://<eis-endpoint-from-BIR>"          # placeholder
EIS_CERT_ID = "XXXXXXXX"                                  # 8-char EIS certificate ID (placeholder)
SPEC_VERSION = "2.01"                                     # confirm on the Certification Portal

# Internal name -> official EIS JSON key. Edit the right-hand side to match the BIR template.
FIELD_MAP = {
    "eis_unique_id": "EisUniqueId",
    "invoice_type": "InvoiceType",
    "invoice_no": "InvoiceNo",
    "issue_datetime": "IssueDateTime",
    "seller": "Seller",
    "buyer": "Buyer",
    "items": "Items",
    "vatable_sales": "VatableSales",
    "vat_exempt_sales": "VatExemptSales",
    "zero_rated_sales": "ZeroRatedSales",
    "discount": "TotalDiscount",
    "vat_amount": "VatAmount",
    "total_amount": "TotalAmountDue",
    "spec_version": "SpecVersion",
}


def money(x) -> Decimal:
    return Decimal(str(x)).quantize(CENT, rounding=ROUND_HALF_UP)


# ---------------------------------------------------------------------------
# 2. DATA MODEL (RR 7-2024 minimum invoice contents)
# ---------------------------------------------------------------------------
@dataclass
class Party:
    registered_name: str
    tin: str                      # format ###-###-###-##### (branch code included)
    address: str
    business_style: str = ""


@dataclass
class LineItem:
    description: str
    quantity: Decimal
    unit_cost: Decimal            # VAT-exclusive unit price
    tax_type: str = "VATABLE"     # VATABLE | EXEMPT | ZERO_RATED
    discount: Decimal = Decimal("0")

    @property
    def net_amount(self) -> Decimal:
        return money(self.quantity * self.unit_cost - self.discount)

    @property
    def vat(self) -> Decimal:
        return money(self.net_amount * VAT_RATE) if self.tax_type == "VATABLE" else Decimal("0.00")


@dataclass
class Invoice:
    invoice_no: str
    seller: Party
    buyer: Party
    items: List[LineItem]
    invoice_type: str = "SALES_INVOICE"   # also: CREDIT_MEMO, DEBIT_MEMO, etc. per spec
    issue_datetime: datetime = field(default_factory=lambda: datetime.now(PH_TZ))
    eis_unique_id: Optional[str] = None

    # --- totals ---
    def _sum(self, tax_type: str) -> Decimal:
        return money(sum((i.net_amount for i in self.items if i.tax_type == tax_type), Decimal("0")))

    @property
    def vatable_sales(self): return self._sum("VATABLE")
    @property
    def vat_exempt_sales(self): return self._sum("EXEMPT")
    @property
    def zero_rated_sales(self): return self._sum("ZERO_RATED")
    @property
    def discount(self): return money(sum((i.discount for i in self.items), Decimal("0")))
    @property
    def vat_amount(self): return money(sum((i.vat for i in self.items), Decimal("0")))
    @property
    def total_amount(self):
        return money(self.vatable_sales + self.vat_exempt_sales + self.zero_rated_sales + self.vat_amount)


# ---------------------------------------------------------------------------
# 3. EIS UNIQUE ID — 24 chars: issue date (8) + EIS Cert ID (8) + control value (8)
#    Confirm the control-value algorithm in the official spec; a random/sequence
#    value is used here as a stand-in.
# ---------------------------------------------------------------------------
def make_eis_unique_id(issue_dt: datetime, cert_id: str = EIS_CERT_ID) -> str:
    control = uuid.uuid4().hex[:8].upper()
    uid = issue_dt.strftime("%Y%m%d") + cert_id[:8].ljust(8, "0") + control
    assert len(uid) == 24
    return uid


# ---------------------------------------------------------------------------
# 4. VALIDATION — catch errors locally before the BIR rejects them
# ---------------------------------------------------------------------------
import re
TIN_RE = re.compile(r"^\d{3}-\d{3}-\d{3}-\d{5}$")


def validate(inv: Invoice) -> List[str]:
    errs = []
    if not inv.invoice_no:
        errs.append("Missing invoice number (must be sequential, per ATP/PTU).")
    for role, p in (("Seller", inv.seller), ("Buyer", inv.buyer)):
        if not p.registered_name:
            errs.append(f"{role}: registered name required.")
        if role == "Seller" and not TIN_RE.match(p.tin):
            errs.append(f"Seller TIN '{p.tin}' must be ###-###-###-#####.")
        if role == "Buyer" and p.tin and not TIN_RE.match(p.tin):
            errs.append(f"Buyer TIN '{p.tin}' malformed.")
        if not p.address:
            errs.append(f"{role}: address required.")
    if not inv.items:
        errs.append("At least one line item required.")
    for n, it in enumerate(inv.items, 1):
        if it.tax_type not in {"VATABLE", "EXEMPT", "ZERO_RATED"}:
            errs.append(f"Item {n}: invalid tax_type '{it.tax_type}'.")
        if it.quantity <= 0 or it.unit_cost < 0:
            errs.append(f"Item {n}: quantity must be > 0 and unit cost >= 0.")
        if it.discount > it.quantity * it.unit_cost:
            errs.append(f"Item {n}: discount exceeds gross amount.")
    if inv.eis_unique_id and len(inv.eis_unique_id) != 24:
        errs.append("EisUniqueId must be 24 characters.")
    # Cross-check: VAT must equal 12% of vatable sales within rounding tolerance
    if abs(inv.vat_amount - money(inv.vatable_sales * VAT_RATE)) > Decimal("0.05"):
        errs.append("VAT amount does not reconcile to 12% of vatable sales.")
    return errs


# ---------------------------------------------------------------------------
# 5. SERIALIZE to EIS JSON (field names via FIELD_MAP)
# ---------------------------------------------------------------------------
def to_eis_json(inv: Invoice) -> dict:
    F = FIELD_MAP
    def party(p: Party):
        return {"RegisteredName": p.registered_name, "TIN": p.tin,
                "Address": p.address, "BusinessStyle": p.business_style}
    return {
        F["spec_version"]: SPEC_VERSION,
        F["eis_unique_id"]: inv.eis_unique_id,
        F["invoice_type"]: inv.invoice_type,
        F["invoice_no"]: inv.invoice_no,
        F["issue_datetime"]: inv.issue_datetime.isoformat(timespec="seconds"),
        F["seller"]: party(inv.seller),
        F["buyer"]: party(inv.buyer),
        F["items"]: [{
            "Description": i.description,
            "Quantity": str(i.quantity),
            "UnitCost": str(money(i.unit_cost)),
            "Discount": str(money(i.discount)),
            "TaxType": i.tax_type,
            "NetAmount": str(i.net_amount),
            "VatAmount": str(i.vat),
        } for i in inv.items],
        F["vatable_sales"]: str(inv.vatable_sales),
        F["vat_exempt_sales"]: str(inv.vat_exempt_sales),
        F["zero_rated_sales"]: str(inv.zero_rated_sales),
        F["discount"]: str(inv.discount),
        F["vat_amount"]: str(inv.vat_amount),
        F["total_amount"]: str(inv.total_amount),
    }


def canonical(payload: dict) -> bytes:
    """Deterministic JSON so the signature is reproducible."""
    return json.dumps(payload, separators=(",", ":"), sort_keys=True, ensure_ascii=False).encode("utf-8")


# ---------------------------------------------------------------------------
# 6. SIGN (JWS) and ENCRYPT (AES-256)
# ---------------------------------------------------------------------------
def jws_sign(payload: bytes, private_key: jwk.JWK, kid: str) -> str:
    token = jws.JWS(payload)
    token.add_signature(private_key, alg="RS256",
                        protected=json_encode({"alg": "RS256", "kid": kid, "typ": "JOSE"}))
    return token.serialize(compact=True)


def encrypt_for_bir(signed_compact: str, bir_public_key: jwk.JWK) -> str:
    """
    JWE: RSA-OAEP-256 key wrap + A256GCM content encryption (AES-256).
    If the BIR guide prescribes a pre-shared AES key instead, swap alg to 'A256KW'
    or 'dir' with a symmetric JWK. Follow the envelope in your EIS technical guide.
    """
    token = jwe.JWE(signed_compact.encode("utf-8"),
                    protected=json_encode({"alg": "RSA-OAEP-256", "enc": "A256GCM"}))
    token.add_recipient(bir_public_key)
    return token.serialize(compact=True)


# ---------------------------------------------------------------------------
# 7. TRANSMIT — stub; endpoint/auth per BIR onboarding (after PTT is issued)
# ---------------------------------------------------------------------------
def transmit(encrypted: str, access_token: str, dry_run: bool = True) -> dict:
    if dry_run:
        return {"status": "DRY_RUN", "bytes": len(encrypted)}
    import requests
    r = requests.post(f"{EIS_API_BASE}/invoices",                 # placeholder path
                      headers={"Authorization": f"Bearer {access_token}",
                               "Content-Type": "application/json"},
                      json={"data": encrypted}, timeout=30)
    r.raise_for_status()
    return r.json()   # store BIR acknowledgment / reference no. with the invoice (10-yr retention)


# ---------------------------------------------------------------------------
# 8. DEMO
# ---------------------------------------------------------------------------
if __name__ == "__main__":
    inv = Invoice(
        invoice_no="SI-0000123",
        seller=Party("SAMPLE TRADING CORP.", "123-456-789-00000",
                     "Aseana City, Parañaque City", "Sample Trading"),
        buyer=Party("BUYER INC.", "987-654-321-00000", "Makati City"),
        items=[
            LineItem("Tax advisory retainer - Sept 2026", Decimal("1"), Decimal("50000")),
            LineItem("Seminar kit", Decimal("10"), Decimal("500"), discount=Decimal("250")),
            LineItem("Export service", Decimal("1"), Decimal("20000"), tax_type="ZERO_RATED"),
        ],
    )
    inv.eis_unique_id = make_eis_unique_id(inv.issue_datetime)

    errors = validate(inv)
    if errors:
        raise SystemExit("Validation failed:\n- " + "\n- ".join(errors))

    payload = to_eis_json(inv)
    print(json.dumps(payload, indent=2, ensure_ascii=False))

    # Demo keys only. In production: taxpayer private key from your HSM/keystore;
    # BIR public key from the EIS portal.
    taxpayer_key = jwk.JWK.generate(kty="RSA", size=2048)
    bir_key = jwk.JWK.generate(kty="RSA", size=2048)

    signed = jws_sign(canonical(payload), taxpayer_key, kid=EIS_CERT_ID)
    encrypted = encrypt_for_bir(signed, bir_key)
    print("\nJWS length:", len(signed), "| JWE length:", len(encrypted))
    print("Transmit:", transmit(encrypted, access_token="<token>", dry_run=True))
