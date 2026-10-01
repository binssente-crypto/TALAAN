const https = require("https");

function sendBrevoEmail(apiKey, payload) {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);
    const req = https.request(
      "https://api.brevo.com/v3/smtp/email",
      {
        method: "POST",
        headers: {
          "api-key": apiKey,
          "content-type": "application/json",
          accept: "application/json",
          "content-length": Buffer.byteLength(data),
        },
        timeout: 10000,
      },
      (res) => {
        res.on("error", reject);
        let body = "";
        res.on("data", (chunk) => (body += chunk));
        res.on("end", () => {
          if (res.statusCode >= 200 && res.statusCode < 300) {
            try {
              resolve(JSON.parse(body));
            } catch (e) {
              resolve({ ok: true, raw: body });
            }
          } else {
            let parsed;
            try {
              parsed = JSON.parse(body);
            } catch (e) {
              parsed = { message: body };
            }
            reject(new Error(parsed.message || `Brevo HTTP ${res.statusCode}`));
          }
        });
      },
    );
    req.on("error", reject);
    req.on("timeout", () => {
      req.destroy();
      reject(new Error("Brevo request timed out"));
    });
    req.write(data);
    req.end();
  });
}

function esc(str) {
  return String(str ?? "").replace(/[&<>"']/g, (m) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[m]));
}

function amt(c) {
  const n = Number(c || 0);
  return (n / 100).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

function peso(c) {
  return "₱" + amt(c);
}

function buildInvoiceEmailHtml(inv, buyer, seller) {
  const S = seller || { name: "BIZMAKER CONSULTANCY INC.", tin: "010-386-422-00000" };
  const b = buyer || { name: "Valued Customer", tin: "", address: "" };
  const items = inv.items || [];
  const due = inv.due != null ? inv.due : (inv.calc && inv.calc.due) || 0;
  const salesType = (inv.salesType || "CHARGE").toUpperCase();

  const itemRows = items
    .map(
      (it) => `
    <tr>
      <td style="padding:10px 12px;border-bottom:1px solid #E4E7EC;color:#1D2939;font-size:13px;">
        <strong>${esc(it.desc || "Item")}</strong>
        ${it.sku ? `<div style="font-size:11px;color:#667085;margin-top:2px;">SKU: ${esc(it.sku)} &bull; ${esc(it.tax || "VATABLE")}</div>` : ""}
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #E4E7EC;color:#1D2939;font-size:13px;text-align:right;">
        ${Number(it.qty || 1)} ${esc(it.uom || "")}
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #E4E7EC;color:#1D2939;font-size:13px;text-align:right;">
        ₱${amt(Math.round(Number(it.price || 0) * 100))}
      </td>
      <td style="padding:10px 12px;border-bottom:1px solid #E4E7EC;color:#1D2939;font-size:13px;text-align:right;font-weight:600;">
        ₱${amt(Math.round(Number(it.price || 0) * Number(it.qty || 1) * 100) - Math.round(Number(it.disc || 0) * 100))}
      </td>
    </tr>`,
    )
    .join("");

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Electronic Invoice No. ${esc(inv.no)}</title>
</head>
<body style="margin:0;padding:24px 0;background-color:#F8F9FA;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;color:#1D2939;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;margin:0 auto;background:#FFFFFF;border:1px solid #EAECF0;border-radius:10px;overflow:hidden;box-shadow:0 1px 3px rgba(16,24,40,0.05);">
    <!-- Header -->
    <tr>
      <td style="padding:28px 32px;background:#0F172A;color:#FFFFFF;">
        <table role="presentation" width="100%">
          <tr>
            <td>
              <div style="font-size:20px;font-weight:700;letter-spacing:-0.02em;">${esc(S.name)}</div>
              <div style="font-size:12px;color:#94A3B8;margin-top:4px;">TIN: ${esc(S.tin)} &bull; ${S.vat ? "VAT-Registered" : "Non-VAT"}</div>
            </td>
            <td style="text-align:right;">
              <span style="display:inline-block;padding:4px 10px;background:#1E293B;border:1px solid #334155;border-radius:6px;font-size:11px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;color:#38BDF8;">
                Electronic Invoice
              </span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Invoice Meta & Sold To -->
    <tr>
      <td style="padding:24px 32px 16px;">
        <table role="presentation" width="100%">
          <tr>
            <td style="vertical-align:top;width:55%;">
              <div style="font-size:11px;font-weight:700;color:#667085;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:6px;">SOLD TO</div>
              <div style="font-size:14px;font-weight:700;color:#0F172A;">${esc(b.name)}</div>
              <div style="font-size:12px;color:#475467;margin-top:3px;">TIN: ${esc(b.tin || "None")}</div>
              <div style="font-size:12px;color:#475467;margin-top:2px;">${esc(b.address || "")}</div>
              ${b.email ? `<div style="font-size:12px;color:#0284C7;margin-top:2px;">${esc(b.email)}</div>` : ""}
            </td>
            <td style="vertical-align:top;width:45%;text-align:right;">
              <div style="font-size:11px;font-weight:700;color:#667085;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:4px;">INVOICE DETAILS</div>
              <div style="font-size:16px;font-weight:700;color:#0284C7;">No. ${esc(inv.no)}</div>
              <div style="font-size:12px;color:#475467;margin-top:4px;">Date: <strong>${esc(inv.txnDate || new Date().toISOString().slice(0, 10))}</strong></div>
              <div style="font-size:12px;color:#475467;margin-top:2px;">Type: <strong>${esc(salesType)} SALES</strong></div>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Line Items Table -->
    <tr>
      <td style="padding:16px 32px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;border:1px solid #E4E7EC;border-radius:8px;overflow:hidden;">
          <thead>
            <tr style="background:#F8F9FA;">
              <th style="padding:10px 12px;text-align:left;font-size:11px;font-weight:700;color:#475467;text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid #E4E7EC;">Item & Description</th>
              <th style="padding:10px 12px;text-align:right;font-size:11px;font-weight:700;color:#475467;text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid #E4E7EC;">Qty</th>
              <th style="padding:10px 12px;text-align:right;font-size:11px;font-weight:700;color:#475467;text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid #E4E7EC;">Unit Price</th>
              <th style="padding:10px 12px;text-align:right;font-size:11px;font-weight:700;color:#475467;text-transform:uppercase;letter-spacing:0.04em;border-bottom:1px solid #E4E7EC;">Amount</th>
            </tr>
          </thead>
          <tbody>
            ${itemRows}
          </tbody>
        </table>
      </td>
    </tr>

    <!-- Total Due Banner -->
    <tr>
      <td style="padding:16px 32px 28px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F0FDF4;border:1.5px solid #86EFAC;border-radius:8px;padding:14px 18px;">
          <tr>
            <td style="font-size:13px;font-weight:700;color:#166534;text-transform:uppercase;letter-spacing:0.03em;">
              Total Amount Due
            </td>
            <td style="text-align:right;font-size:22px;font-weight:800;color:#15803D;">
              ${peso(due)}
            </td>
          </tr>
        </table>
        ${salesType === "CHARGE" ? `<div style="font-size:11px;color:#991B1B;background:#FEF2F2;border:1px solid #FCA5A5;border-radius:6px;padding:8px 12px;margin-top:10px;font-weight:600;">UNPAID AT ISSUANCE. Payment will be acknowledged by an official Collection Receipt.</div>` : ""}
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="padding:20px 32px;background:#F8F9FA;border-top:1px solid #EAECF0;text-align:center;font-size:11.5px;color:#667085;line-height:1.5;">
        This electronic document was issued under BIR Electronic Invoicing System guidelines.<br>
        BIR Permit No.: ${esc(S.permitNo || "CAS-PTU-0426-00012")} &bull; PTI: ${esc(S.ptiNo || "PTI-EI-0426-2026-000123")}<br>
        &copy; ${new Date().getFullYear()} ${esc(S.name)}. All rights reserved.
      </td>
    </tr>
  </table>
</body>
</html>
  `.trim();
}

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const apiKey = process.env.BREVO_API_KEY;
  const senderEmail = process.env.BREVO_SENDER_EMAIL || "binssente@gmail.com";
  const senderName = process.env.BREVO_SENDER_NAME || "Talaan-BizmakerPH";

  const { invoice, buyer, seller } = req.body || {};

  if (!invoice || !invoice.no) {
    return res.status(400).json({ ok: false, error: "Missing invoice data" });
  }

  const recipientEmail = (buyer && buyer.email) || invoice.buyerEmail;
  if (!recipientEmail || !recipientEmail.includes("@")) {
    return res.status(400).json({ ok: false, error: "Recipient email is missing or invalid" });
  }

  const recipientName = (buyer && buyer.name) || "Valued Customer";

  const htmlContent = buildInvoiceEmailHtml(invoice, buyer, seller || invoice.seller);

  // If no API key is configured or key starts with placeholder, return simulated success
  if (!apiKey || apiKey.startsWith("xsmtpsib-")) {
    console.warn("Brevo API key is not an active REST v3 key. Simulating email dispatch.");
    return res.status(200).json({
      ok: true,
      simulated: true,
      message: `Simulated email for Invoice No. ${invoice.no} to ${recipientEmail}`,
      to: recipientEmail,
    });
  }

  try {
    const brevoPayload = {
      sender: {
        name: senderName,
        email: senderEmail,
      },
      to: [
        {
          name: recipientName,
          email: recipientEmail,
        },
      ],
      subject: `Electronic Invoice No. ${invoice.no} from ${senderName}`,
      htmlContent: htmlContent,
    };

    const result = await sendBrevoEmail(apiKey, brevoPayload);
    return res.status(200).json({ ok: true, result, to: recipientEmail });
  } catch (err) {
    console.error("Brevo dispatch error:", err.message);
    return res.status(502).json({ ok: false, error: err.message, to: recipientEmail });
  }
};
