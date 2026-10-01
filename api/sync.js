const mysql = require("mysql2/promise");

let pool = null;

function getPool() {
  if (pool) return pool;
  const rawUri = process.env.MYSQL_URI;
  if (!rawUri) return null;

  // Clean URI of parameters that mysql2 doesn't accept in URI query string
  const cleanUri = rawUri.replace(/\?ssl-mode=.*$/, "").replace(/\?ssl=.*$/, "");
  const sslConfig = process.env.MYSQL_CA
    ? { ca: process.env.MYSQL_CA, rejectUnauthorized: true }
    : { rejectUnauthorized: false };

  pool = mysql.createPool({
    uri: cleanUri,
    ssl: sslConfig,
    waitForConnections: true,
    connectionLimit: 5,
    maxIdle: 3,
    idleTimeout: 30000,
    queueLimit: 0,
  });
  return pool;
}

async function initSchema(conn) {
  await conn.query(`
    CREATE TABLE IF NOT EXISTS invoices (
      no INT PRIMARY KEY,
      branch VARCHAR(10) NOT NULL DEFAULT '00000',
      issued_at BIGINT NOT NULL,
      customer_id VARCHAR(50),
      sales_type VARCHAR(20) NOT NULL DEFAULT 'CHARGE',
      total_due BIGINT NOT NULL,
      status VARCHAR(20) NOT NULL DEFAULT 'pending',
      doc_data JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_branch (branch),
      INDEX idx_status (status)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS credit_memos (
      no INT PRIMARY KEY,
      inv_no INT NOT NULL,
      branch VARCHAR(10) NOT NULL DEFAULT '00000',
      at_ts BIGINT NOT NULL,
      due BIGINT NOT NULL,
      reason VARCHAR(255),
      doc_data JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_inv (inv_no)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS collection_receipts (
      no INT PRIMARY KEY,
      branch VARCHAR(10) NOT NULL DEFAULT '00000',
      customer_id VARCHAR(50),
      amount BIGINT NOT NULL,
      type VARCHAR(50) NOT NULL,
      doc_data JSON NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INT AUTO_INCREMENT PRIMARY KEY,
      at_ts BIGINT NOT NULL,
      user_name VARCHAR(100) NOT NULL,
      event VARCHAR(100) NOT NULL,
      detail TEXT,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      INDEX idx_event (event)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);

  await conn.query(`
    CREATE TABLE IF NOT EXISTS system_settings (
      id VARCHAR(50) PRIMARY KEY,
      config JSON NOT NULL,
      updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
  `);
}

let schemaInitialized = false;

module.exports = async function handler(req, res) {
  // Security headers
  res.setHeader("X-Content-Type-Options", "nosniff");
  res.setHeader("X-Frame-Options", "DENY");
  res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
  res.setHeader("Content-Type", "application/json");

  // CORS headers
  const origin = req.headers.origin;
  res.setHeader("Access-Control-Allow-Origin", origin || "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  const p = getPool();
  if (!p) {
    return res.status(200).json({
      ok: true,
      dbConnected: false,
      message: "MYSQL_URI not set. Running in demo memory mode.",
    });
  }

  try {
    if (!schemaInitialized) {
      const conn = await p.getConnection();
      try {
        await initSchema(conn);
        schemaInitialized = true;
      } finally {
        conn.release();
      }
    }

    if (req.method === "GET") {
      const [invRows] = await p.query(
        "SELECT doc_data FROM invoices ORDER BY no DESC",
      );
      const [cmRows] = await p.query(
        "SELECT doc_data FROM credit_memos ORDER BY no DESC",
      );
      const [rcRows] = await p.query(
        "SELECT doc_data FROM collection_receipts ORDER BY no DESC",
      );
      const [logRows] = await p.query(
        "SELECT at_ts AS at, user_name AS user, event, detail FROM audit_logs ORDER BY id DESC LIMIT 200",
      );
      const [setRows] = await p.query(
        "SELECT config FROM system_settings WHERE id = 'main'",
      );

      return res.status(200).json({
        ok: true,
        dbConnected: true,
        invoices: invRows.map((r) =>
          typeof r.doc_data === "string" ? JSON.parse(r.doc_data) : r.doc_data,
        ),
        credits: cmRows.map((r) =>
          typeof r.doc_data === "string" ? JSON.parse(r.doc_data) : r.doc_data,
        ),
        receipts: rcRows.map((r) =>
          typeof r.doc_data === "string" ? JSON.parse(r.doc_data) : r.doc_data,
        ),
        secLog: logRows,
        settings: setRows.length
          ? typeof setRows[0].config === "string"
            ? JSON.parse(setRows[0].config)
            : setRows[0].config
          : null,
      });
    }

    if (req.method === "POST") {
      const body =
        typeof req.body === "string" ? JSON.parse(req.body) : req.body || {};
      const { action, data } = body;

      if (action === "save_invoice" && data && data.no) {
        await p.query(
          `INSERT INTO invoices (no, branch, issued_at, customer_id, sales_type, total_due, status, doc_data)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             branch = VALUES(branch),
             sales_type = VALUES(sales_type),
             total_due = VALUES(total_due),
             status = VALUES(status),
             doc_data = VALUES(doc_data)`,
          [
            data.no,
            data.branch || "00000",
            data.issuedAt || Date.now(),
            data.customerId || "",
            data.salesType || "CHARGE",
            data.totalDue || 0,
            data.status || "pending",
            JSON.stringify(data),
          ],
        );
        return res.status(200).json({ ok: true, saved: data.no });
      }

      if (action === "save_credit" && data && data.no) {
        await p.query(
          `INSERT INTO credit_memos (no, inv_no, branch, at_ts, due, reason, doc_data)
           VALUES (?, ?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             reason = VALUES(reason),
             doc_data = VALUES(doc_data)`,
          [
            data.no,
            data.invNo,
            data.branch || "00000",
            data.at || Date.now(),
            data.due || 0,
            data.reason || "",
            JSON.stringify(data),
          ],
        );
        return res.status(200).json({ ok: true, saved: data.no });
      }

      if (action === "save_receipt" && data && data.no) {
        await p.query(
          `INSERT INTO collection_receipts (no, branch, customer_id, amount, type, doc_data)
           VALUES (?, ?, ?, ?, ?, ?)
           ON DUPLICATE KEY UPDATE
             amount = VALUES(amount),
             doc_data = VALUES(doc_data)`,
          [
            data.no,
            data.branch || "00000",
            data.customerId || "",
            data.amount || 0,
            data.type || "COLLECTION",
            JSON.stringify(data),
          ],
        );
        return res.status(200).json({ ok: true, saved: data.no });
      }

      if (action === "log_security" && data) {
        await p.query(
          `INSERT INTO audit_logs (at_ts, user_name, event, detail)
           VALUES (?, ?, ?, ?)`,
          [
            data.at || Date.now(),
            data.user || "—",
            data.event || "",
            data.detail || "",
          ],
        );
        return res.status(200).json({ ok: true, logged: true });
      }

      if (action === "save_settings" && data) {
        await p.query(
          `INSERT INTO system_settings (id, config)
           VALUES ('main', ?)
           ON DUPLICATE KEY UPDATE config = VALUES(config)`,
          [JSON.stringify(data)],
        );
        return res.status(200).json({ ok: true, updated: "settings" });
      }

      if (action === "seed_all" && data) {
        const { invoices, credits, receipts, settings } = data;
        const conn = await p.getConnection();
        try {
          await conn.beginTransaction();
          if (Array.isArray(invoices)) {
            for (const inv of invoices) {
              await conn.query(
                `INSERT IGNORE INTO invoices (no, branch, issued_at, customer_id, sales_type, total_due, status, doc_data)
                 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
                [
                  inv.no,
                  inv.branch || "00000",
                  inv.issuedAt || Date.now(),
                  inv.customerId || "",
                  inv.salesType || "CHARGE",
                  inv.totalDue || 0,
                  inv.status || "pending",
                  JSON.stringify(inv),
                ],
              );
            }
          }
          if (Array.isArray(credits)) {
            for (const cm of credits) {
              await conn.query(
                `INSERT IGNORE INTO credit_memos (no, inv_no, branch, at_ts, due, reason, doc_data)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`,
                [
                  cm.no,
                  cm.invNo,
                  cm.branch || "00000",
                  cm.at || Date.now(),
                  cm.due || 0,
                  cm.reason || "",
                  JSON.stringify(cm),
                ],
              );
            }
          }
          if (Array.isArray(receipts)) {
            for (const rc of receipts) {
              await conn.query(
                `INSERT IGNORE INTO collection_receipts (no, branch, customer_id, amount, type, doc_data)
                 VALUES (?, ?, ?, ?, ?, ?)`,
                [
                  rc.no,
                  rc.branch || "00000",
                  rc.customerId || "",
                  rc.amount || 0,
                  rc.type || "COLLECTION",
                  JSON.stringify(rc),
                ],
              );
            }
          }
          if (settings) {
            await conn.query(
              `INSERT INTO system_settings (id, config)
               VALUES ('main', ?)
               ON DUPLICATE KEY UPDATE config = VALUES(config)`,
              [JSON.stringify(settings)],
            );
          }
          await conn.commit();
          return res.status(200).json({ ok: true, seeded: true });
        } catch (seedErr) {
          await conn.rollback();
          throw seedErr;
        } finally {
          conn.release();
        }
      }

      return res.status(400).json({ ok: false, error: "Unknown action" });
    }

    return res.status(405).json({ ok: false, error: "Method not allowed" });
  } catch (err) {
    console.error("Database sync error:", err.message);
    return res.status(500).json({
      ok: false,
      error: "Database operation failed",
    });
  }
};
