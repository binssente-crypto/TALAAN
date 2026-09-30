"""
talaan_eis_transmit.py - Talaan to BIR EIS reference pipeline (Philippines)
Version 2, aligned with the Talaan prototype (Bizmaker Consultancy Inc. sample data).

What it does
  1. Reads Talaan documents (invoices and credit memos) exported as JSON
     (the "Structured data (JSON)" of each document, or a list of them in one file).
  2. Checks each document: required RR 7-2024 contents, TIN format, arithmetic of the
     VAT boxes, withholding, statutory discounts, foreign-currency peso equivalents.
  3. Maps Talaan field names to the BIR EIS template through FIELD_MAP.
  4. Signs the canonical JSON with JWS (ES256), encrypts it for the BIR (JWE),
     and transmits it, or writes the files only (--dry-run, the default).
  5. Writes a transmission log (CSV) with each document's result.

Legal basis
  Tax Code Secs. 113, 237 and 237-A (as amended by the EOPT Act); RR 7-2024 (invoice contents);
  RR 11-2025 as amended by RR 26-2025 (EIS); RMC 77-2024 (formats); RMC 98-2026
  (e-invoicing rules, PTI Electronic Invoice, EIS Certification within 6 months of the PTI;
  sales reporting and the Permit to Transmit apply only once the Commissioner directs it).

IMPORTANT: PLACEHOLDERS
  * FIELD_MAP right-hand names are placeholders. Replace them with the official EIS JSON
    template (CAS or CRM/POS, current spec version) from the EIS Certification Portal,
    https://eis-cert.bir.gov.ph (see the Talaan Technical Build Plan, section 7).
  * EIS_API_BASE, the authentication flow, key IDs and the encryption envelope come from
    the BIR's technical guide issued during certification and with the Permit to Transmit.
  * Nothing is sent unless you pass --send AND fill in the configuration below.

Requires: Python 3.10+, pip install jwcrypto requests
Usage:
  python talaan_eis_transmit.py documents.json                 # validate, sign, encrypt; write files
  python talaan_eis_transmit.py documents.json --send          # also transmit (after PTT only)
  python talaan_eis_transmit.py --make-keys                    # create a test signing key pair
"""

from __future__ import annotations

import argparse
import csv
import json
import re
import sys
from dataclasses import dataclass
from datetime import datetime, timedelta, timezone
from decimal import ROUND_HALF_UP, Decimal
from pathlib import Path
from typing import Any

try:
    from jwcrypto import jwe, jwk, jws
    from jwcrypto.common import json_encode
except ImportError:  # validation still works without it
    jwk = jws = jwe = None

PH_TZ = timezone(timedelta(hours=8))            # Philippine Standard Time
CENT = Decimal("0.01")
TIN_RE = re.compile(r"^\d{3}-\d{3}-\d{3}-\d{5}$")

# ---------------------------------------------------------------------------
# 1. Configuration: fill in from the BIR onboarding documents
# ---------------------------------------------------------------------------
EIS_API_BASE = "https://<eis-endpoint-from-BIR>"     # placeholder, emailed after the PTT
EIS_CERT_ID = "XXXXXXXX"                             # EIS certificate ID (placeholder)
SPEC_VERSION = "2.01"                                # confirm on the Certification Portal
SIGNING_KEY_FILE = "keys/seller_signing_key.json"    # private JWK (keep in a key vault in production)
BIR_PUBLIC_KEY_FILE = "keys/bir_public_key.json"     # BIR encryption key (from the BIR)
OUT_DIR = Path("eis_out")

# Talaan field -> official EIS field. Replace every right-hand value with the template's name.
FIELD_MAP: dict[str, str] = {
    "SpecVersion": "SpecVersion",
    "EisUniqueId": "EisUniqueId",
    "DocumentType": "DocumentType",
    "InvoiceNo": "InvoiceNo",
    "CreditMemoNo": "CreditMemoNo",
    "Format": "InvoiceFormat",
    "IssueDateTime": "IssueDateTime",
    "TransactionDate": "TransactionDate",
    "SalesType": "SalesType",
    "Nature": "NatureOfTransaction",
    "Seller": "Seller",
    "Buyer": "Buyer",
    "Items": "Items",
    "VatableSales": "VatableSales",
    "VatAmount": "VatAmount",
    "ZeroRatedSales": "ZeroRatedSales",
    "VatExemptSales": "VatExemptSales",
    "TotalSales": "TotalSalesVatInclusive",
    "Discount": "TotalDiscount",
    "WithholdingTax": "WithholdingTax",
    "TotalAmountDue": "TotalAmountDue",
    "StatutoryDiscount": "SpecialDiscount",
    "SaleDiscount": "SalesDiscount",
    "Payment": "Payment",
    "Currency": "Currency",
    "ExchangeRate": "ExchangeRate",
    "TotalAmountDuePHP": "TotalAmountDuePhp",
    "VatAmountPHP": "VatAmountPhp",
    "PtiElectronicInvoiceNo": "PermitToIssueNo",
    "Branch": "BranchName",
    "BranchCode": "BranchCode",
    "References": "References",
}


def money(x: Any) -> Decimal:
    return Decimal(str(x or 0)).quantize(CENT, rounding=ROUND_HALF_UP)


# ---------------------------------------------------------------------------
# 2. Validation (mirrors the checks in the Talaan prototype)
# ---------------------------------------------------------------------------
@dataclass
class Result:
    doc_id: str
    ok: bool
    problems: list[str]
    files: list[str]
    response: str = ""


def validate(doc: dict) -> list[str]:
    p: list[str] = []
    dtype = doc.get("DocumentType", "INVOICE")
    doc_no = doc.get("InvoiceNo") or doc.get("CreditMemoNo")
    if not doc_no:
        p.append("document number missing")
    if not doc.get("EisUniqueId"):
        p.append("EIS unique ID missing")

    seller = doc.get("Seller") or {}
    for k in ("RegisteredName", "TIN", "Address"):
        if not seller.get(k):
            p.append(f"seller {k} missing")
    if seller.get("TIN") and not TIN_RE.match(seller["TIN"]):
        p.append("seller TIN not in ###-###-###-##### format (branch code included)")

    buyer = doc.get("Buyer") or {}
    if dtype == "INVOICE":
        if not buyer.get("RegisteredName"):
            p.append("buyer name missing")
        tin = buyer.get("TIN")
        if tin and not TIN_RE.match(tin):
            p.append("buyer TIN not in ###-###-###-##### format")
        if buyer.get("BuyerType") == "FOREIGN" and not buyer.get("Country"):
            p.append("foreign buyer without a country")

    if not doc.get("Items"):
        p.append("no line items")
    for n, it in enumerate(doc.get("Items") or [], 1):
        if not it.get("Description"):
            p.append(f"line {n}: description missing")
        if it.get("TaxType") not in ("VATABLE", "ZERO_RATED", "EXEMPT", "SSPT", None):
            p.append(f"line {n}: unknown tax type {it.get('TaxType')}")
        change = it.get("TaxTypeChange")
        if change and change.get("From") != it.get("TaxType") and not change.get("Reason"):
            p.append(f"line {n}: VAT class changed without a reason")

    # Arithmetic of the RMC 77-2024 boxes (VAT sellers)
    if dtype == "INVOICE" and "VatableSales" in doc:
        vatable, vat = money(doc.get("VatableSales")), money(doc.get("VatAmount"))
        zero, exempt = money(doc.get("ZeroRatedSales")), money(doc.get("VatExemptSales"))
        disc, wht, due = money(doc.get("Discount")), money(doc.get("WithholdingTax")), money(doc.get("TotalAmountDue"))
        if abs(vat - (vatable * Decimal("0.12")).quantize(CENT)) > Decimal("0.05"):
            p.append(f"VAT {vat} is not 12% of VATable sales {vatable}")
        # Due = VATable + zero + exempt + VAT - discount - withholding, allowing for BNPC discounts
        # already netted in VATable sales and centavo rounding.
        expected = vatable + zero + exempt + vat - wht
        if not (expected - disc - Decimal("1.00") <= due <= expected + Decimal("1.00")):
            p.append(f"total amount due {due} does not reconcile with the boxes")
        if wht < 0 or wht > vatable + zero + exempt:
            p.append("withholding tax out of range")

    sd = doc.get("StatutoryDiscount")
    if sd:
        if not sd.get("IdNo"):
            p.append("statutory discount without the beneficiary's ID number")
        if sd.get("Type") in ("SP",) and not sd.get("ChildName"):
            p.append("solo-parent discount without the child's name")

    cur = doc.get("Currency", "PHP")
    if cur != "PHP":
        if not doc.get("ExchangeRate") or not doc.get("RateSource"):
            p.append("foreign-currency document without the exchange rate and its source (BAP/BSP)")
        if doc.get("TotalAmountDuePHP") is None:
            p.append("foreign-currency document without the peso equivalent")

    pay = doc.get("Payment") or {}
    if doc.get("SalesType") == "CHARGE" and pay and pay.get("Status") != "UNPAID_AT_ISSUANCE":
        p.append("charge sale not flagged as unpaid at issuance")

    if not doc.get("PtiElectronicInvoiceNo"):
        p.append("PTI Electronic Invoice number missing")
    return p


# ---------------------------------------------------------------------------
# 3. Mapping, canonical form, signing and encryption
# ---------------------------------------------------------------------------
def to_eis(doc: dict) -> dict:
    out = {FIELD_MAP.get(k, k): v for k, v in doc.items() if v is not None}
    out[FIELD_MAP["SpecVersion"]] = SPEC_VERSION
    return out


def canonical(payload: dict) -> bytes:
    """Stable byte form for signing: sorted keys, no whitespace, UTF-8."""
    return json.dumps(payload, sort_keys=True, separators=(",", ":"), ensure_ascii=False).encode("utf-8")


def load_key(path: str):
    if jwk is None:
        raise SystemExit("Install jwcrypto: pip install jwcrypto requests")
    return jwk.JWK.from_json(Path(path).read_text())


def jws_sign(data: bytes, key, kid: str) -> str:
    token = jws.JWS(data)
    token.add_signature(key, alg="ES256", protected=json_encode({"alg": "ES256", "kid": kid}))
    return token.serialize(compact=True)


def encrypt_for_bir(signed: str, bir_key) -> str:
    """Envelope per the BIR technical guide; RSA-OAEP-256 with A256GCM is a placeholder."""
    token = jwe.JWE(signed.encode("utf-8"), json_encode({"alg": "RSA-OAEP-256", "enc": "A256GCM"}))
    token.add_recipient(bir_key)
    return token.serialize(compact=True)


def transmit(encrypted: str, access_token: str) -> str:
    import requests  # imported only when sending
    r = requests.post(f"{EIS_API_BASE}/invoices", data=encrypted, timeout=60,
                      headers={"Authorization": f"Bearer {access_token}", "Content-Type": "application/jose"})
    return f"{r.status_code} {r.text[:300]}"


# ---------------------------------------------------------------------------
# 4. Driver
# ---------------------------------------------------------------------------
def load_documents(path: Path) -> list[dict]:
    data = json.loads(path.read_text(encoding="utf-8"))
    if isinstance(data, dict) and "entries" in data:   # not an accounting export
        raise SystemExit("This looks like an accounting export, not EIS documents.")
    return data if isinstance(data, list) else [data]


def days_late(doc: dict) -> int:
    issued = doc.get("IssueDateTime")
    if not issued:
        return 0
    t = datetime.fromisoformat(issued.replace("Z", "+00:00")).astimezone(PH_TZ)
    return (datetime.now(PH_TZ).date() - t.date()).days


def run(path: Path, send: bool, token: str) -> list[Result]:
    OUT_DIR.mkdir(exist_ok=True)
    key = bir = None
    results: list[Result] = []
    for doc in load_documents(path):
        doc_id = str(doc.get("InvoiceNo") or doc.get("CreditMemoNo") or "?")
        problems = validate(doc)
        if problems:
            results.append(Result(doc_id, False, problems, []))
            continue
        payload = to_eis(doc)
        files = []
        plain = OUT_DIR / f"{doc_id}.json"
        plain.write_text(json.dumps(payload, indent=2, ensure_ascii=False), encoding="utf-8")
        files.append(str(plain))
        if jwk is not None and Path(SIGNING_KEY_FILE).exists():
            key = key or load_key(SIGNING_KEY_FILE)
            signed = jws_sign(canonical(payload), key, kid=EIS_CERT_ID)
            (OUT_DIR / f"{doc_id}.jws").write_text(signed)
            files.append(str(OUT_DIR / f"{doc_id}.jws"))
            if Path(BIR_PUBLIC_KEY_FILE).exists():
                bir = bir or load_key(BIR_PUBLIC_KEY_FILE)
                enc = encrypt_for_bir(signed, bir)
                (OUT_DIR / f"{doc_id}.jwe").write_text(enc)
                files.append(str(OUT_DIR / f"{doc_id}.jwe"))
                if send:
                    results.append(Result(doc_id, True, [], files, transmit(enc, token)))
                    continue
        note = "dry run; not sent"
        if days_late(doc) > 3:
            note += f"; issued {days_late(doc)} days ago (EIS allows 3 days once reporting applies)"
        results.append(Result(doc_id, True, [], files, note))
    return results


def make_keys() -> None:
    if jwk is None:
        raise SystemExit("Install jwcrypto: pip install jwcrypto requests")
    Path("keys").mkdir(exist_ok=True)
    k = jwk.JWK.generate(kty="EC", crv="P-256", kid=EIS_CERT_ID)
    Path(SIGNING_KEY_FILE).write_text(k.export_private())
    Path("keys/seller_public_key.json").write_text(k.export_public())
    print("Test key pair written to keys/. In production, keep the private key in a key vault.")


def main() -> None:
    ap = argparse.ArgumentParser(description="Validate, sign, encrypt and (optionally) transmit Talaan documents to the BIR EIS.")
    ap.add_argument("file", nargs="?", help="JSON file: one Talaan document or a list of them")
    ap.add_argument("--send", action="store_true", help="transmit to the EIS (only after the Permit to Transmit)")
    ap.add_argument("--token", default="", help="EIS access token (from the BIR authentication step)")
    ap.add_argument("--make-keys", action="store_true", help="create a test ES256 key pair")
    a = ap.parse_args()
    if a.make_keys:
        return make_keys()
    if not a.file:
        ap.error("give a JSON file of Talaan documents")
    results = run(Path(a.file), a.send, a.token)
    log = OUT_DIR / f"transmission_log_{datetime.now(PH_TZ):%Y%m%d_%H%M%S}.csv"
    with log.open("w", newline="", encoding="utf-8") as f:
        w = csv.writer(f)
        w.writerow(["Document", "Valid", "Problems", "Files", "Result"])
        for r in results:
            w.writerow([r.doc_id, "yes" if r.ok else "no", "; ".join(r.problems), " ".join(r.files), r.response])
    bad = [r for r in results if not r.ok]
    for r in results:
        print(f"{r.doc_id}: {'OK' if r.ok else 'REJECTED'} {'; '.join(r.problems) or r.response}")
    print(f"\n{len(results) - len(bad)} valid, {len(bad)} rejected. Log: {log}")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
