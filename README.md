# Talaan E-Invoicing System

Philippine BIR EIS compliant e-invoicing reference prototype for Bizmaker Consultancy Inc. (aligned with RA 11976 / EOPT Act, RR 7-2024, RMC 77-2024, and RMC 98-2026).

## Architecture & Folder Structure

```
├── index.html                   # Primary office application entrypoint
├── cashier.html                 # Standalone counter POS kiosk (/cashier)
├── vercel.json                  # Clean URL routing & static pass-through
├── .vercelignore                # Vercel deployment exclusions
├── .gitignore                   # Git ignore patterns
│
├── assets/
│   ├── css/
│   │   └── style.css            # Core stylesheets & responsive drawer
│   ├── js/
│   │   └── app.js               # Application logic & compliance engine
│   └── img/
│       └── logo.png             # Official company logo
│
├── docs/                        # Complete technical and user manuals
│   ├── Talaan-Admin-and-Office-Manual.pdf
│   ├── Talaan-Counter-Cashier-Guide.pdf
│   └── Talaan-Technical-Build-Plan.pdf
│
└── tools/                       # Python BIR EIS reference transmission pipeline
    ├── talaan_eis_transmit.py   # Version 2 transmission CLI (JWS/JWE/CSV logs)
    ├── bir_eis_einvoice.py      # Reference SDK bridge
    ├── requirements.txt         # Tool dependencies (jwcrypto, requests)
    └── sample_invoice.json      # Sample document for verification
```

## Demo Credentials (Prototype)

| Username | Password | Role | Notes |
|---|---|---|---|
| `msantos` | `Clerk#2026` | Billing clerk | Standard invoice encoding |
| `lgarcia` | `Books#2026` | Bookkeeper | Accounts & journals |
| `jreyes` | `Approve#2026` | Approver | Approver (2FA code on screen) |
| `acruz` | `Control#2026` | Approver | Approver (2FA code on screen) |
| `rbautista`| `Admin#2026` | Administrator | Full company admin (2FA) |
| `rlim` | `Audit#2026` | Auditor | Read-only audit trail (2FA) |
| `cmendoza` | `Desk#2026` | Cashier | Opens counter interface directly |
| `nflores` | `Counter#2026` | Cashier | Opens counter interface directly |

- **Provider Console PIN:** `2468`
- **Client Onboarding Portal:** `index.html#portal`
- **Standalone Counter PINs:** Carlo `1234`, Liza `5678`, Supervisor `9999`

## Live Testing the EIS Pipeline

```bash
cd tools
pip install -r requirements.txt
python talaan_eis_transmit.py --make-keys
python talaan_eis_transmit.py sample_invoice.json
```
