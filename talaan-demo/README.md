# Talaan e-invoicing prototype: hosting package

This folder is a **demonstration** of the Talaan e-invoicing system. It is a single
static web page (`index.html`). It needs no server software, database or build step.

## What is inside

| File | Purpose |
|---|---|
| `index.html` | The complete prototype (styles and program in one file) |
| `robots.txt` | Keeps search engines from listing the demo |
| `tools/bir_eis_einvoice.py` | Reference script: build, validate, sign, encrypt and transmit EIS JSON (run separately, not on the web host) |
| `tools/requirements.txt` | Python packages for the script |

## Upload options

**Netlify (easiest).** Go to https://app.netlify.com/drop and drag this whole folder
onto the page. Netlify gives you a link such as `talaan-demo.netlify.app`.

**GitHub Pages.** Create a repository, upload the files, then in Settings > Pages choose
the main branch. The site appears at `https://<account>.github.io/<repository>/`.

**cPanel or any web hosting.** Open File Manager, go to `public_html` (or a subfolder
such as `public_html/talaan-demo`), and upload `index.html` and `robots.txt`.
Open `https://yourdomain.com/talaan-demo/`.

Use an **https** address. The digital signatures for QR verification only work on
secure (https) pages.

## Signing in

Demo accounts are listed on the sign-in screen, for example `msantos` / `Clerk#2026`
(billing clerk) and `jreyes` / `Approve#2026` (approver, with a two-factor code shown
on screen). The provider console PIN is `2468`.

## Important limits of this demo

- Everything runs in the visitor's browser. Data resets when the page is reloaded,
  and each visitor sees their own copy.
- Sign-in, roles and two-factor are **simulated**. Do not enter real client data,
  real TINs of actual customers, or real passwords.
- Nothing is sent to the BIR or to buyers. Emails and QR delivery are simulated.
- JSON field names are placeholders until mapped to the official EIS template
  (https://eis-cert.bir.gov.ph).

## Production system (next stage)

The production build needs a server application and database, real user accounts
with hashed passwords and two-factor sign-in, a key vault for signing keys, encrypted
storage, backups, per-client data separation, and CAS registration and PTI Electronic
Invoice coverage for each client. Use this prototype as the functional specification.
