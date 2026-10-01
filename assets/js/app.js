/* === Responsive Drawer & Sidebar Rail Event Handlers === */
try {
  if (localStorage.getItem("sidebar_collapsed") === "1") {
    const appEl = document.querySelector(".app");
    if (appEl) appEl.classList.add("sidebar-collapsed");
  }
} catch (e) {}

let touchStartX = 0;
document.addEventListener(
  "touchstart",
  (e) => {
    if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
  },
  { passive: true },
);

document.addEventListener(
  "touchend",
  (e) => {
    if (window.innerWidth > 900) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diffX = touchEndX - touchStartX;
    const appEl = document.querySelector(".app");
    const overlay = document.getElementById("navOverlay");
    if (touchStartX < 40 && diffX > 40) {
      if (appEl) appEl.classList.add("mobile-nav-open");
      if (overlay) overlay.classList.add("show");
    } else if (
      diffX < -40 &&
      appEl &&
      appEl.classList.contains("mobile-nav-open")
    ) {
      if (appEl) appEl.classList.remove("mobile-nav-open");
      if (overlay) overlay.classList.remove("show");
    }
  },
  { passive: true },
);

document.addEventListener("click", (e) => {
  // Sidebar toggle
  const act = e.target.closest("[data-act]");
  if (act && act.dataset.act === "togglesidebar") {
    const appEl = document.querySelector(".app");
    if (appEl) {
      const wasCollapsed = appEl.classList.toggle("sidebar-collapsed");
      const btn = document.getElementById("sidebarToggleBtn");
      if (btn) btn.title = wasCollapsed ? "Expand sidebar" : "Collapse sidebar";
      try {
        localStorage.setItem("sidebar_collapsed", wasCollapsed ? "1" : "0");
      } catch (err) {}
    }
    return;
  }
  // Mobile drawer open
  if (e.target.closest("#mobileMenuBtn") || e.target.closest("#pullTab")) {
    const appEl = document.querySelector(".app");
    const overlay = document.getElementById("navOverlay");
    if (appEl) appEl.classList.add("mobile-nav-open");
    if (overlay) overlay.classList.add("show");
    return;
  }
  // Mobile drawer close on overlay or navigation
  if (
    e.target.closest("#navOverlay") ||
    (window.innerWidth <= 900 && e.target.closest(".navbtn"))
  ) {
    const appEl = document.querySelector(".app");
    const overlay = document.getElementById("navOverlay");
    if (appEl) appEl.classList.remove("mobile-nav-open");
    if (overlay) overlay.classList.remove("show");
  }
});

/* ================= Company, PTI and permit settings ================= */
const S = {
  plan: { name: "Starter", mb: 50 },
  autoEmail: true,
  vat: true,
  trade: "BIZMAKER",
  name: "BIZMAKER CONSULTANCY INC.",
  tin: "010-386-422-00000",
  address:
    "P41-10 6th-11th Street, Villamor Air Base, Barangay 183, Pasay City 1300, NCR, Fourth District, Philippines",
  tinIssued: "2019-08-28",
  rdoReg:
    "Revenue District Office No. 051, Pasay City (Revenue Region No. 08B, South NCR)",
  corOcn: "051RC20220000003609",
  corDate: "2022-10-05",
  invFrom: 5000001,
  invTo: 5000500,
  prFrom: 6000001,
  prTo: 6000500,
  cnFrom: 7000001,
  cnTo: 7000500,
  crFrom: 8000001,
  crTo: 8000500,
  permitNo: "CAS-PTU-0426-00012",
  atpNo: "OCN 3AU0000080582",
  atpDate: "2026-02-23",
  /* RMC 98-2026 */
  ptiNo: "PTI-EI-0426-2026-000123",
  ptiDate: "2026-09-24",
  ptiSystem: "Talaan e-invoicing v1.0 (cloud)",
  branch: "Head Office (00000)",
  eisCert: false,
  eisCertDate: "",
  reporting: false,
  manualSeries: "9000001–9000250 (authorized manual booklet)",
};
const CERT = "AAACERT1",
  DAY = 864e5,
  now = () => Date.now();
/* ================= Design versions: controlled by the EIS provider only ================= */
const FONTS = {
  "Arial, Helvetica, sans-serif": "Arial",
  "Verdana, Geneva, sans-serif": "Verdana",
  "Tahoma, Geneva, sans-serif": "Tahoma",
  "Georgia, 'Times New Roman', serif": "Georgia (serif)",
};
const SIZES = { 0.92: "Small", 1: "Standard", 1.08: "Large" };
const PROVIDER = { name: "AAA & Co. IT Division (EIS provider)", pin: "2468" };
let BIZ_LOGO =
  "data:image/webp;base64,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";
let designs = [
  {
    v: 1,
    logo: BIZ_LOGO,
    primary: "#0B2A5B",
    accent: "#D0021B",
    font: "Arial, Helvetica, sans-serif",
    fs: 1,
    tr: 17,
    effective: new Date("2026-09-24").getTime(),
    birRef: {
      type: "PTI Electronic Invoice (initial)",
      no: "PTI-EI-0426-2026-000123",
      date: "2026-09-24",
    },
    dcr: null,
    summary: "Initial design at go-live",
    by: PROVIDER.name,
  },
];
let dcrs = [
  {
    id: "DCR-0001",
    at: Date.now() - 2 * 864e5,
    areas: ["Colours"],
    desc: "Use Bizmaker gold for the top band to match the seal.",
    contact: "Maria Santos, Finance",
    logo: null,
    status: "Submitted",
    history: [
      {
        at: Date.now() - 2 * 864e5,
        status: "Submitted",
        by: "Client",
        note: "",
      },
    ],
    birRef: null,
    version: null,
  },
];
let designAudit = [
  {
    at: new Date("2026-09-24").getTime(),
    by: PROVIDER.name,
    action: "Activated design version 1 (initial design at go-live)",
  },
];
let providerOn = false,
  pDraft = null,
  dcrDraft = null;
function curDesign() {
  return designs[designs.length - 1];
}
function designV(v) {
  return designs.find((d) => d.v === v) || designs[0];
}
function titleSize(d) {
  return Math.max(Math.round(30 * d.fs), d.tr + 10);
}
function paperStyle(d) {
  return `--pn:${d.primary};--pr:${d.accent};font-family:${d.font};--fs:${d.fs};--tr:${d.tr}px;--ts:${titleSize(d)}px`;
}
const MANDATE = new Date("2026-12-31T23:59:59+08:00").getTime();
const CUSTOMERS = [
  { id: "cw", name: "WALK-IN CUSTOMER", tin: "", address: "", email: "" },
  {
    id: "c1",
    name: "BUYER INC.",
    tin: "987-654-321-00000",
    address: "Ayala Ave., Makati City",
    email: "ap@buyerinc.ph",
  },
  {
    id: "c2",
    name: "PASIG HARDWARE TRADING",
    tin: "234-567-890-00001",
    address: "Caruncho Ave., Pasig City",
    email: "billing@pasighardware.ph",
  },
  {
    id: "c3",
    name: "CEBU EXPORT PARTNERS LTD.",
    tin: "345-678-901-00000",
    address: "Mandaue City, Cebu",
    email: "finance@cebuexport.ph",
  },
  {
    id: "c4",
    name: "LUZON AGRI COOPERATIVE",
    tin: "456-789-012-00000",
    address: "Cabanatuan City, Nueva Ecija",
    email: "coop@luzonagri.ph",
  },
  {
    id: "c5",
    name: "QC BAKESHOP CORP.",
    tin: "56-7890-12",
    address: "Tomas Morato, Quezon City",
    email: "accounts@qcbakeshop.ph",
  },
  {
    id: "c6",
    name: "JUAN DELA CRUZ (walk-in)",
    tin: "",
    address: "Quezon City",
    email: "",
  },
];
const VS_LABEL = {
  VAT: "VAT-registered",
  NONVAT: "Non-VAT registered",
  INDIVIDUAL: "Individual or end consumer (B2C)",
  FOREIGN: "Foreign buyer (no Philippine TIN)",
};
function tinTxt(b) {
  return b && b.vatStatus === "FOREIGN"
    ? `None (foreign buyer${b.country ? ", " + b.country : ""})${b.foreignTaxId ? `; foreign tax ID ${b.foreignTaxId}` : ""}`
    : (b && b.tin) || "";
}
{
  const VS = {
    cw: "INDIVIDUAL",
    c1: "VAT",
    c2: "VAT",
    c3: "VAT",
    c4: "NONVAT",
    c5: "VAT",
    c6: "INDIVIDUAL",
  };
  CUSTOMERS.forEach((c) => (c.vatStatus = VS[c.id]));
}
{
  const T = {
    c1: "NET30",
    c2: "NET15",
    c3: "DUE",
    c4: "NET30",
    c5: "NET7",
    c7: "NET30",
  };
  CUSTOMERS.forEach((c) => (c.terms = T[c.id] || "NET30"));
}
Object.assign(
  CUSTOMERS.find((c) => c.id === "c1"),
  { wht: 0.1, whtNote: "expanded withholding on professional fees, 10%" },
);
CUSTOMERS.push({
  id: "c7",
  name: "PACIFIC RIM TRADING PTE. LTD.",
  tin: "",
  address: "10 Anson Road, #20-05 International Plaza, Singapore 079903",
  email: "accounts@pacificrim.sg",
  vatStatus: "FOREIGN",
  country: "Singapore",
  foreignTaxId: "UEN 201812345K",
});
const TAX_VAT = {
  VATABLE: "VATable 12%",
  ZERO_RATED: "Zero-rated",
  EXEMPT: "VAT-exempt",
};
const TAX_NV = { SSPT: "Subject to percentage tax", EXEMPT: "Exempt" };
const FORMATS = {
  B1: "VAT invoice",
  B2: "Non-VAT invoice",
  B3: "VAT invoice – VAT-exempt sale",
  B4: "VAT invoice – zero-rated sale",
  B5: "Non-VAT invoice – mixed sales",
  B6: "Collection receipt",
};
const WHT = [
  [0, "None"],
  [0.01, "1% (goods)"],
  [0.02, "2% (services)"],
  [0.05, "5% (rentals)"],
  [0.1, "10% (professional fees)"],
  [0.15, "15% (professional fees)"],
];
const REASONS = [
  "Return of goods",
  "Allowance",
  "Discount granted after sale",
  "Overbilling",
  "Cancellation of invoice",
];
const TIN_RE = /^\d{3}-\d{3}-\d{3}-\d{5}$/;

/* ================= Helpers ================= */
function rand(n) {
  let s = "";
  const c = "ABCDEF0123456789";
  for (let i = 0; i < n; i++) s += c[Math.floor(Math.random() * 16)];
  return s;
}
function ymd(t) {
  const d = new Date(t);
  return (
    d.getFullYear() +
    String(d.getMonth() + 1).padStart(2, "0") +
    String(d.getDate()).padStart(2, "0")
  );
}
function eisId(t) {
  return ymd(t) + CERT + rand(8);
}
function cents(x) {
  return Math.round(Number(x || 0) * 100);
}
function amt(c) {
  return (c / 100).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}
function peso(c) {
  return "₱" + amt(c);
}
function cust(id) {
  return CUSTOMERS.find((c) => c.id === id);
}
function esc(s) {
  return String(s ?? "").replace(
    /[&<>"]/g,
    (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m],
  );
}
function fmtDate(t) {
  return new Date(t).toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
function dDate(t) {
  return new Date(t).toLocaleDateString("en-PH", {
    timeZone: "Asia/Manila",
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}
function lineGross(it) {
  return cents(Number(it.qty) * Number(it.price)) - cents(it.disc);
}
const SC_STAT = ["SC20", "BNPC5", "STAT20", "SP10", "CUS_EX", "CUS_VD"];
function lineReg(it) {
  return cents(Number(it.qty) * Number(it.price));
}
function lineNet(it) {
  return SC_STAT.includes(it.scChoice)
    ? lineReg(it)
    : lineGross(it) - (it.promo || 0);
}
function lineShown(it) {
  return SC_STAT.includes(it.scChoice) ? lineReg(it) : lineGross(it);
}
/* sale or promotional discount: shown on the invoice at the time of sale, deducted before VAT, allocated to lines in proportion */
function promoAmount(inv) {
  const pr = inv.promo;
  if (!pr || !(pr.value > 0)) return 0;
  const g = inv.items.reduce((a, it) => a + lineGross(it), 0);
  return pr.type === "PCT"
    ? Math.round((g * Math.min(pr.value, 100)) / 100)
    : Math.min(cents(pr.value), g);
}
let STORE_PROMOS = [],
  promoForm = null;
function activePromo(sku, iso, br) {
  return STORE_PROMOS.find(
    (p) =>
      p.active !== false &&
      p.skus.includes(sku) &&
      p.from <= iso &&
      p.to >= iso &&
      (p.branch === "ALL" || p.branch === br),
  );
}
function allocatePromo(inv) {
  if (!(promoAmount(inv) > 0)) {
    const on = inv.txnDate || todayISO();
    inv.items.forEach((it) => {
      const sp = it.sku && activePromo(it.sku, on, inv.branch);
      it.promo = sp ? Math.round((lineGross(it) * sp.pct) / 100) : 0;
      it.promoName = sp ? `${sp.name} (${sp.pct}%)` : "";
      it.promoSrc = sp ? "STORE" : "";
    });
    return;
  }
  inv.items.forEach((it) => {
    it.promoSrc = "MANUAL";
    it.promoName = "";
  });
  allocateManual(inv);
}
function allocateManual(inv) {
  const total = promoAmount(inv),
    g = inv.items.reduce((a, it) => a + lineGross(it), 0);
  let left = total;
  inv.items.forEach((it, k) => {
    if (!total || !g) {
      it.promo = 0;
      return;
    }
    const share =
      k === inv.items.length - 1
        ? left
        : Math.round((total * lineGross(it)) / g);
    it.promo = Math.min(share, Math.max(lineGross(it), 0));
    left -= it.promo;
  });
}
function promoTotal(inv) {
  return inv.items.reduce((a, it) => a + (it.promo || 0), 0);
}
function promoLabel(inv) {
  const names = [
    ...new Set(
      inv.items
        .filter((it) => it.promoSrc === "STORE" && it.promo)
        .map((it) => it.promoName),
    ),
  ];
  if (names.length) return names.join(", ");
  const pr = inv.promo;
  return `${pr.name || "Sale discount"}${pr.type === "PCT" ? ` (${pr.value}%)` : ""}`;
}
function todayISO(t) {
  return new Date(t ?? Date.now()).toLocaleDateString("en-CA", {
    timeZone: "Asia/Manila",
  });
}
function phNow() {
  return new Date().toLocaleString("en-PH", {
    timeZone: "Asia/Manila",
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}
function isoDate(iso) {
  return dDate(new Date(iso + "T12:00:00").getTime());
}
function invOf(no) {
  return invoices.find((i) => i.no === no);
}
function viewLink(id) {
  return "https://einvoice.talaan.ph/v/" + id;
}
function addMonths(d, m) {
  const x = new Date(d);
  x.setMonth(x.getMonth() + m);
  return x.getTime();
}

/* ================= Data ================= */
function mk(no, cid, type, items, status, daysAgo, o = {}) {
  const t = now() + daysAgo * DAY;
  return {
    branch: o.branch || "00000",
    no,
    customerId: cid,
    salesType: type,
    issuedAt: t,
    status,
    vat: true,
    incl: !!o.incl,
    items: items.map(([desc, qty, price, tax, disc]) => ({
      desc,
      qty,
      price,
      tax,
      disc,
    })),
    nature: o.nature || "GOODS",
    scpwd: o.scpwd || "",
    scId: o.scId || "",
    scName: o.scName || "",
    wht: o.wht || 0,
    refs: o.refs || {},
    deliveries: o.deliveries || [],
    eisId: eisId(t),
    ack: status === "accepted" ? "ACK-" + rand(10) : null,
    reason: null,
  };
}
/* ================= Branches: separate series, printing, stock and access per branch (RMC 98-2026 IV.10, IV.13) ================= */
let BRS = [
  {
    code: "00000",
    name: "Head Office",
    address:
      "P41-10 6th-11th Street, Villamor Air Base, Barangay 183, Pasay City 1300, NCR, Fourth District, Philippines",
    rdo: "RDO 051, Pasay City",
    ptiNotice: "",
    active: true,
    series: {
      inv: [5000001, 5000500],
      cn: [7000001, 7000500],
      pr: [6000001, 6000500],
      cr: [8000001, 8000500],
    },
    next: { inv: 5000006, cn: 7000002, pr: 6000004, cr: 8000001 },
  },
];
let viewBr = "00000",
  brForm = null;
const SERIES_LABEL = {
  inv: "Invoices",
  cn: "Credit memos",
  pr: "Collection receipts",
  cr: "Correction notices",
};
function brOf(code) {
  return BRS.find((b) => b.code === code) || BRS[0];
}
function brLabel(code) {
  return code === "ALL" ? "All branches" : `${brOf(code).name} (${code})`;
}
function brTin(code) {
  return S.tin.slice(0, 11) + "-" + code;
}
function wb() {
  return viewBr === "ALL" ? null : viewBr;
}
function inBr(code) {
  return viewBr === "ALL" || viewBr === (code || "00000");
}
function canBranch(code) {
  const u = me();
  return !!u && (u.branch === "ALL" || u.branch === (code || "00000"));
}
function ser(kind, code) {
  return brOf(code).series[kind];
}
function nextNo(kind, code) {
  return brOf(code).next[kind];
}
function takeNo(kind, code) {
  return brOf(code).next[kind]++;
}
function newInvFor(code) {
  if (!canBranch(code)) {
    deny("ops");
    return false;
  }
  resetPicker();
  view = "new";
  current = null;
  showJson = false;
  draft = newDraft();
  draft.branch = code;
  draft.no = nextNo("inv", code);
  return true;
}
/* ================= Foreign currency (RMC 12-2024: spot rate on the transaction date; BAP for USD, BSP for other currencies; no monthly averages) ================= */
const CURRENCIES = {
  PHP: { name: "Philippine peso", sym: "₱" },
  USD: { name: "US dollar", src: "BAP" },
  EUR: { name: "Euro", src: "BSP" },
  JPY: { name: "Japanese yen", src: "BSP" },
  SGD: { name: "Singapore dollar", src: "BSP" },
  HKD: { name: "Hong Kong dollar", src: "BSP" },
  AUD: { name: "Australian dollar", src: "BSP" },
};
let fxRates = [],
  fxForm = null,
  fxTab = "rates";
function curOf(x) {
  return (x && x.cur) || "PHP";
}
function isFX(x) {
  return curOf(x) !== "PHP";
}
function money(x, c) {
  return isFX(x) ? `${curOf(x)} ${amt(c)}` : peso(c);
}
function rateFor(cur, iso) {
  if (cur === "PHP") return { rate: 1, source: "", date: iso };
  const r = fxRates
    .filter((r) => r.cur === cur && r.date <= iso)
    .sort((a, b) => b.date.localeCompare(a.date))[0];
  return r ? { rate: r.rate, source: r.source, date: r.date } : null;
}
function fxOf(x) {
  if (!isFX(x)) return { rate: 1 };
  if (x.fx) return x.fx;
  return rateFor(curOf(x), x.txnDate || todayISO()) || { rate: 0 };
}
function toPHP(x, c) {
  return Math.round(c * (fxOf(x).rate || 0));
}
function fxNote(x, c) {
  const f = fxOf(x);
  return isFX(x)
    ? `Currency: ${curOf(x)}. Peso equivalent at ₱${f.rate.toFixed(4)} per ${curOf(x)} (${f.source} rate, ${isoDate(f.date)}): total sales ${peso(toPHP(x, c.totalSales))}; VAT ${peso(toPHP(x, c.vatShown || 0))}; total amount due ${peso(toPHP(x, c.due))}.`
    : "";
}
function stockLoc() {
  return viewBr === "ALL" ? null : viewBr;
}
let invoices = [
  mk(
    5000005,
    "c1",
    "CHARGE",
    [
      ["Tax advisory (per hour)", 12, 5000, "VATABLE", 0],
      ["BIR audit representation (engagement)", 1, 150000, "VATABLE", 10000],
    ],
    "accepted",
    -2.2,
    {
      nature: "SERVICES",
      wht: 0.1,
      deliveries: [
        { via: "Email", to: "ap@buyerinc.ph", at: now() - 2.2 * DAY + 600e3 },
      ],
    },
  ),
  mk(
    5000004,
    "c3",
    "CHARGE",
    [
      [
        "Business registration assistance (SEC, BIR, LGU)",
        1,
        86000,
        "VATABLE",
        0,
      ],
    ],
    "pending",
    -2.6,
    {
      nature: "SERVICES",
      deliveries: [
        {
          via: "Email",
          to: "finance@cebuexport.ph",
          at: now() - 2.6 * DAY + 900e3,
        },
      ],
    },
  ),
  mk(
    5000003,
    "c4",
    "CHARGE",
    [["Tax seminar, one-day (per participant)", 15, 3500, "VATABLE", 0]],
    "pending",
    -0.4,
    { nature: "SERVICES" },
  ),
  mk(
    5000002,
    "c5",
    "CHARGE",
    [["Seminar recordings on USB flash drive", 10, 1500, "VATABLE", 0]],
    "rejected",
    -1.1,
  ),
  mk(
    5000001,
    "c6",
    "CASH",
    [
      ["Estate tax seminar (per participant)", 1, 3000, "VATABLE", 0],
      ["Tax seminar workbook (printed)", 1, 800, "EXEMPT", 0],
    ],
    "accepted",
    -4,
    {
      nature: "SERVICES",
      deliveries: [
        {
          via: "Printed copy",
          to: "Buyer at counter",
          at: now() - 4 * DAY + 60e3,
        },
        { via: "QR code", to: "Scanned by buyer", at: now() - 4 * DAY + 90e3 },
      ],
    },
  ),
];
invOf(5000002).reason =
  "Buyer TIN is not in the valid format (###-###-###-#####).";
/* ================= Users, roles and access control (simulation; real authentication runs on the server) ================= */
const ROLES = {
  CASHIER: {
    label: "Cashier (counter only)",
    perms: ["counter", "customer.add"],
  },
  CLERK: {
    label: "Cashier or billing clerk",
    perms: ["ops", "counter", "customer.add"],
  },
  ACCOUNTANT: {
    label: "Accountant or bookkeeper",
    perms: ["ops", "counter", "customer.add", "master"],
  },
  APPROVER: {
    label: "Approver",
    perms: ["ops", "counter", "customer.add", "master", "approve"],
  },
  ADMIN: {
    label: "Company administrator",
    perms: [
      "ops",
      "master",
      "counter",
      "customer.add",
      "settings",
      "users",
      "admin",
      "security.view",
    ],
  },
  AUDITOR: { label: "Auditor (read-only)", perms: ["security.view"] },
};
const PERM_LABEL = {
  counter: "issue invoices at the cashier counter",
  ops: "issue and prepare documents",
  master: "maintain customers, items and stock",
  approve: "approve documents",
  settings: "change company, PTI and series settings",
  users: "manage users",
  admin: "request design changes",
  "security.view": "view the security log",
  "customer.add": "add customers",
};

const USERS = [
  {
    id: "u1",
    name: "Maria Santos",
    position: "Billing clerk",
    roleCode: "CLERK",
    username: "msantos",
    pw: "Clerk#2026",
    mfa: false,
    branch: "00000",
    limit: 0,
    discCap: 10,
  },
  {
    id: "u2",
    name: "Jose Reyes",
    position: "Finance manager",
    roleCode: "APPROVER",
    username: "jreyes",
    pw: "Approve#2026",
    mfa: true,
    branch: "ALL",
    limit: 5000000,
    discCap: 20,
  },
  {
    id: "u3",
    name: "Ana Cruz",
    position: "Controller",
    roleCode: "APPROVER",
    username: "acruz",
    pw: "Control#2026",
    mfa: true,
    branch: "ALL",
    limit: 50000000,
    discCap: 25,
  },
  {
    id: "u4",
    name: "Lito Garcia",
    position: "Bookkeeper",
    roleCode: "ACCOUNTANT",
    username: "lgarcia",
    pw: "Books#2026",
    mfa: false,
    branch: "00000",
    limit: 0,
    discCap: 15,
  },
  {
    id: "u5",
    name: "Ramon Bautista",
    position: "Company administrator",
    roleCode: "ADMIN",
    username: "rbautista",
    pw: "Admin#2026",
    mfa: true,
    branch: "ALL",
    limit: 0,
    discCap: 20,
  },
  {
    id: "u6",
    name: "Rosa Lim",
    position: "External auditor",
    roleCode: "AUDITOR",
    username: "rlim",
    pw: "Audit#2026",
    mfa: true,
    branch: "ALL",
    limit: 0,
    discCap: 0,
  },
  {
    id: "u7",
    name: "Carlo Mendoza",
    position: "Cashier, seminar registration desk",
    roleCode: "CASHIER",
    username: "cmendoza",
    pw: "Desk#2026",
    mfa: false,
    branch: "00000",
    limit: 0,
    discCap: 10,
  },
  {
    id: "u8",
    name: "Nina Flores",
    position: "Cashier, head office",
    roleCode: "CASHIER",
    username: "nflores",
    pw: "Counter#2026",
    mfa: false,
    branch: "00000",
    limit: 0,
    discCap: 0,
  },
];
USERS.forEach((u) => {
  u.active = true;
  u.failed = 0;
  u.lockUntil = 0;
  u.lastLogin = 0;
  u.mustChange = false;
  Object.defineProperty(u, "role", {
    get() {
      return this.position;
    },
    enumerable: true,
  });
  Object.defineProperty(u, "approver", {
    get() {
      return ROLES[this.roleCode].perms.includes("approve");
    },
    enumerable: false,
  });
});
let secLog = [],
  auth = {
    step: "login",
    uid: null,
    code: null,
    codeTries: 0,
    err: "",
    username: "",
  },
  lastActivity = Date.now(),
  userForm = null;
const IDLE_MIN = 15,
  MAX_FAIL = 5,
  LOCK_MIN = 15;
function can(p) {
  const u = me();
  return !!u && ROLES[u.roleCode].perms.includes(p);
}
let isDbConnected = false;
function postDbSync(action, data) {
  if (typeof fetch !== "undefined") {
    fetch("/api/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action, data }),
    }).catch(() => {});
  }
}
function slog(event, detail, u) {
  const item = {
    at: now(),
    user: u ? u.name : me() ? me().name : "—",
    event,
    detail: detail || "",
  };
  secLog.push(item);
  postDbSync("log_security", item);
}
function deny(p) {
  const u = me();
  slog(
    "Access denied",
    `${u ? ROLES[u.roleCode].label : "Not signed in"} tried to ${PERM_LABEL[p] || p}`,
  );
  toast(
    `Your role (${u ? ROLES[u.roleCode].label : "none"}) can't ${PERM_LABEL[p] || p}.`,
  );
  return false;
}
function need(p) {
  return can(p) || deny(p);
}
let userId =
  (typeof localStorage !== "undefined" &&
    localStorage.getItem("talaan_uid")) ||
  null;
const me = () => USERS.find((u) => u.id === userId);
const who = (u) => ({ id: u.id, name: u.name, role: u.role });
function canView(v) {
  const u = me();
  if (!u) return false;
  const r = u.roleCode;
  if (r === "CASHIER") return v === "counter";
  switch (v) {
    case "counter":
      return can("counter");
    case "list":
    case "detail":
    case "register":
    case "credits":
    case "credit":
    case "corrections":
    case "corr":
    case "receipts":
    case "receipt":
    case "aging":
    case "customers":
    case "verify":
    case "ready":
    case "log":
      return true;
    case "new":
    case "newReceipt":
    case "newCredit":
    case "newCorr":
    case "tally":
    case "cmreq":
    case "corrreq":
      return can("ops") && r !== "AUDITOR";
    case "products":
    case "item":
    case "newStock":
    case "stockdoc":
    case "fx":
      return can("master") && r !== "AUDITOR";
    case "acct":
      return can("master") || can("security.view");
    case "branches":
    case "settings":
      return can("settings") || can("approve") || can("security.view");
    case "users":
      return can("users") || can("security.view");
    case "design":
    case "newDcr":
    case "dcr":
    case "provider":
      return can("admin");
    default:
      return true;
  }
}
let cmReqs = [],
  nextCMR = 2;
let credits = [
  {
    no: 7000001,
    invNo: 5000004,
    at: now() - 1 * DAY,
    reason: "Overbilling",
    note: "Engagement fee billed at ₱86,000; agreed fee ₱80,000.",
    lines: [{ src: 0, amount: 600000 }],
    eisId: eisId(now() - DAY),
    preparedBy: { id: "u1", name: "Maria Santos", role: "Billing clerk" },
    preparedAt: now() - 1.2 * DAY,
    approvedBy: { id: "u2", name: "Jose Reyes", role: "Finance manager" },
    approvedAt: now() - DAY,
    approvalNote: "Agreed price confirmed with sales.",
    deliveries: [
      { via: "Email", to: "finance@cebuexport.ph", at: now() - 0.9 * DAY },
    ],
  },
];
let receipts = [
  {
    no: 6000001,
    at: now() - 1.5 * DAY,
    customerId: "c1",
    method: "CASH",
    account: "",
    type: "COLLECTION",
    purpose: "",
    amount: 0,
    lines: [{ invNo: 5000005, amount: 0 }],
    applications: [],
  },
  {
    no: 6000002,
    at: now() - 5 * DAY,
    customerId: "c4",
    method: "CASH",
    account: "",
    type: "ADVANCE",
    purpose: "In-house tax seminar for 15 cooperative members (deposit)",
    amount: 6000000,
    lines: [],
    applications: [{ invNo: 5000003, amount: 0, at: 0 }],
  },
  {
    no: 6000003,
    at: now() - 1 * DAY,
    customerId: "c2",
    method: "CARD",
    account: "BDO-4417",
    type: "ADVANCE",
    purpose: "Bookkeeping and tax compliance retainer, October to December",
    amount: 5040000,
    lines: [],
    applications: [],
  },
];
let log = invoices
  .filter((i) => i.status === "accepted" || i.status === "rejected")
  .map((i) => ({
    no: i.no,
    at: i.issuedAt + 3600e3,
    result: i.status,
    ref: i.ack || "—",
    msg: i.status === "accepted" ? "Accepted" : i.reason,
  }));
let draft = null,
  draftR = null,
  draftC = null,
  view =
    (typeof localStorage !== "undefined" &&
      localStorage.getItem("talaan_view")) ||
    "list",
  current =
    typeof localStorage !== "undefined" && localStorage.getItem("talaan_cur")
      ? isNaN(+localStorage.getItem("talaan_cur"))
        ? localStorage.getItem("talaan_cur")
        : +localStorage.getItem("talaan_cur")
      : null,
  showJson = false,
  rFilter = "all";

/* ================= Computation (RMC 77-2024 boxes) ================= */
/* ===== SC/PWD engine: RA 9994, RA 10754 and IRRs; DTI-DA-DOE JAO 24-02 (BNPC) ===== */
const SC_CATS = {
  Q20: "20% discount + VAT exemption (qualified goods or services)",
  BNPC: "5% special discount (basic necessity or prime commodity)",
  NONE: "Not covered",
};
const BNPC_CAP = 12500;
function scCatOf(it) {
  return it.scCat || (itemById(it.itemId) || {}).scCat || "NONE";
}
function weekStart(t) {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.getTime();
}
function txnTime(inv) {
  return inv.txnDate
    ? new Date(inv.txnDate + "T12:00:00").getTime()
    : inv.issuedAt || now();
}
function bnpcUsed(id, wk, excl) {
  id = (id || "").trim().toLowerCase();
  if (!id) return 0;
  return invoices
    .filter(
      (i) =>
        i.no !== excl &&
        i.scpwd &&
        (i.scId || "").trim().toLowerCase() === id &&
        weekStart(txnTime(i)) === wk,
    )
    .reduce(
      (a, i) =>
        a +
        i.items.reduce(
          (x, it) => x + (it.scChoice === "BNPC5" ? it.bnpcDisc || 0 : 0),
          0,
        ),
      0,
    );
}
function groupFactor(inv) {
  const g = inv.group;
  return g && g.diners > 0 && g.sc > 0 && g.sc < g.diners ? g.sc / g.diners : 1;
}
const ST_TYPES = {
  SC: {
    label: "Senior citizen",
    short: "SC",
    idLabel: "OSCA or other government ID no.",
    law: "RA 9994",
    rateNote: "20% + VAT exemption; 5% on BNPC",
  },
  PWD: {
    label: "Person with disability",
    short: "PWD",
    idLabel: "PWD ID no.",
    law: "RA 10754",
    rateNote: "20% + VAT exemption; 5% on BNPC",
  },
  NAAC: {
    label: "National athlete or coach",
    short: "NAAC",
    idLabel: "PNSTM ID no.",
    law: "RA 10699; RR 13-2020",
    rateNote: "20% of VAT-exclusive price; VAT still due",
  },
  MOV: {
    label: "Medal of Valor awardee or dependent",
    short: "MOV",
    idLabel: "MOV awardee or dependent ID no.",
    law: "RA 9049 and IRR",
    rateNote: "20%; VAT still due",
  },
  SP: {
    label: "Solo parent",
    short: "SP",
    idLabel: "Solo Parent ID (SPIC) no.",
    law: "RA 11861; RR 1-2023",
    rateNote: "10% + VAT exemption",
  },
};
const isSCPWD = (t) => t === "SC" || t === "PWD";
/* ===== "Others": new mandatory discounts defined by the EIS provider once a law or regulation is issued ===== */
let customRules = [],
  ruleForm = null;
function stType(T) {
  return (
    ST_TYPES[T] ||
    customRules.find((r) => r.code === T) || {
      label: T,
      short: T,
      idLabel: "ID no.",
      law: "",
      rateNote: "",
    }
  );
}
function ruleLive(r, iso) {
  iso = iso || todayISO();
  return r.active && r.effective <= iso && (!r.expiry || r.expiry >= iso);
}
function allTypes(iso) {
  const o = { ...ST_TYPES };
  customRules.filter((r) => ruleLive(r, iso)).forEach((r) => (o[r.code] = r));
  return o;
}
function customUsedWeek(code, id, wk, excl) {
  id = (id || "").trim().toLowerCase();
  if (!id) return 0;
  return invoices
    .filter(
      (i) =>
        i.no !== excl &&
        i.scpwd === code &&
        (i.scId || "").trim().toLowerCase() === id &&
        weekStart(txnTime(i)) === wk,
    )
    .reduce(
      (a, i) => a + i.items.reduce((x, it) => x + (it.stDisc || 0), 0),
      0,
    );
}
function covOf(it, T) {
  if (isSCPWD(T)) return scCatOf(it);
  if (it.stCov) return it.stCov === "Y" ? "COV" : "NONE";
  const i = itemById(it.itemId);
  if (!i) return "NONE";
  if (["NAAC", "MOV", "SP"].includes(T))
    return i[T.toLowerCase()] ? "COV" : "NONE";
  return i.cov && i.cov[T] ? "COV" : "NONE";
}
function choiceLabel(it, T) {
  const s = (stType(T) || {}).short || T;
  if (it.scChoice === "CUS_EX" || it.scChoice === "CUS_VD")
    return `${stType(T).rate}% ${s}`;
  return it.scChoice === "SC20"
    ? `20% ${s}`
    : it.scChoice === "BNPC5"
      ? "5% BNPC"
      : it.scChoice === "STAT20"
        ? `20% ${s}`
        : it.scChoice === "SP10"
          ? "10% SP"
          : it.scChoice === "PROMO" && (it.scStat || 0) > 0
            ? "Sale discount"
            : covOf(it, T) === "NONE"
              ? "Not covered"
              : "None";
}
function decideSC(inv) {
  const T = inv.scpwd,
    f = groupFactor(inv),
    rule = customRules.find((r) => r.code === T);
  let capLeft = isSCPWD(T)
    ? Math.max(
        0,
        BNPC_CAP - bnpcUsed(inv.scId, weekStart(txnTime(inv)), inv.no),
      )
    : 0;
  let cTxn = rule && rule.capTxn ? rule.capTxn : Infinity,
    cWeek =
      rule && rule.capWeek
        ? Math.max(
            0,
            rule.capWeek -
              customUsedWeek(T, inv.scId, weekStart(txnTime(inv)), inv.no),
          )
        : Infinity;
  inv.items.forEach((it) => {
    const cov = covOf(it, T),
      R = lineReg(it),
      vatable = inv.vat && it.tax === "VATABLE",
      base = vatable ? (inv.incl ? Math.round(R / 1.12) : R) : R;
    const P = cents(it.disc) + (it.promo || 0),
      promoB = vatable && !inv.incl ? Math.round(P * 1.12) : P;
    let stat = 0,
      bnpc = 0,
      choice = null;
    if (isSCPWD(T) && cov === "Q20") {
      stat = vatable ? Math.round(base * 0.32 * f) : Math.round(R * 0.2 * f);
      choice = "SC20";
    }
    if (isSCPWD(T) && cov === "BNPC") {
      const retail = vatable && !inv.incl ? Math.round(R * 1.12) : R;
      bnpc = Math.min(Math.round(retail * 0.05), capLeft);
      stat = bnpc;
      choice = "BNPC5";
    }
    if ((T === "NAAC" || T === "MOV") && cov === "COV") {
      stat = Math.round(base * 0.2 * f);
      choice = "STAT20";
    }
    if (T === "SP" && cov === "COV") {
      stat = vatable ? Math.round(base * 0.22) : Math.round(R * 0.1);
      choice = "SP10";
    }
    let cd = 0;
    if (rule && cov === "COV") {
      const ff = rule.group ? f : 1;
      cd = Math.min(Math.round((base * ff * rule.rate) / 100), cTxn, cWeek);
      stat =
        (rule.vatExempt && vatable ? Math.round(base * ff * 0.12) : 0) + cd;
      choice = rule.vatExempt ? "CUS_EX" : "CUS_VD";
    }
    it.scStat = stat;
    it.scPromo = promoB;
    if (stat > 0 && stat > promoB) {
      it.scChoice = choice;
      it.promo = 0;
      if (choice === "BNPC5") {
        it.bnpcDisc = bnpc;
        capLeft -= bnpc;
      }
      if (rule) {
        it.stDisc = cd;
        cTxn -= cd;
        cWeek -= cd;
      }
    } else {
      it.scChoice = cov === "NONE" ? "NONE" : "PROMO";
      delete it.bnpcDisc;
      delete it.stDisc;
    }
  });
}
function calc(inv) {
  if (inv.status === "draft") {
    inv.items.forEach((it) => {
      delete it.scChoice;
      delete it.bnpcDisc;
      delete it.stDisc;
    });
    allocatePromo(inv);
  }
  if (inv.scpwd && (inv.status === "draft" || !inv.scFrozen)) {
    decideSC(inv);
    if (inv.status !== "draft") inv.scFrozen = true;
  }
  const c = {
    vatable: 0,
    vat: 0,
    zero: 0,
    exempt: 0,
    sspt: 0,
    totalSales: 0,
    lessVat: 0,
    netOfVat: 0,
    disc: 0,
    addVat: 0,
    wht: 0,
    due: 0,
    vatShown: 0,
  };
  const f = groupFactor(inv),
    fx = (ch) => (ch === "SP10" ? 1 : f);
  inv.items.forEach((it) => {
    const ch = inv.scpwd ? it.scChoice : null,
      amt = lineNet(it),
      rate = ch === "SP10" ? 0.1 : 0.2;
    if (inv.vat) {
      if (it.tax === "VATABLE") {
        const base = inv.incl ? Math.round(amt / 1.12) : amt,
          v = inv.incl ? amt - base : Math.round(base * 0.12);
        c.totalSales += base + v;
        c.lessVat += v;
        if (ch === "SC20" || ch === "SP10") {
          const scB = Math.round(base * fx(ch)),
            rest = base - scB;
          c.exempt += scB;
          c.disc += Math.round(scB * rate);
          c.vatable += rest;
          c.vat += Math.round(rest * 0.12);
        } else if (ch === "STAT20") {
          c.vatable += base;
          c.vat += v;
          c.disc += Math.round(base * f * 0.2);
        } else if (ch === "CUS_EX") {
          const r = stType(inv.scpwd),
            scB = Math.round(base * (r.group ? f : 1)),
            rest = base - scB;
          c.exempt += scB;
          c.disc += it.stDisc || 0;
          c.vatable += rest;
          c.vat += Math.round(rest * 0.12);
        } else if (ch === "CUS_VD") {
          c.vatable += base;
          c.vat += v;
          c.disc += it.stDisc || 0;
        } else if (ch === "BNPC5") {
          const dn = Math.round((it.bnpcDisc || 0) / 1.12);
          c.disc += dn;
          c.vatable += base - dn;
          c.vat += Math.round((base - dn) * 0.12);
        } else {
          c.vatable += base;
          c.vat += v;
        }
      } else {
        const bucket = it.tax === "ZERO_RATED" ? "zero" : "exempt";
        c[bucket] += amt;
        c.totalSales += amt;
        if (ch === "SC20" || ch === "STAT20" || ch === "SP10")
          c.disc += Math.round(amt * fx(ch) * rate);
        else if (ch === "CUS_EX" || ch === "CUS_VD") c.disc += it.stDisc || 0;
        else if (ch === "BNPC5") c.disc += it.bnpcDisc || 0;
      }
    } else {
      c.totalSales += amt;
      if (it.tax === "EXEMPT") c.exempt += amt;
      else c.sspt += amt;
      if (ch === "SC20" || ch === "STAT20" || ch === "SP10")
        c.disc += Math.round(amt * fx(ch) * rate);
      else if (ch === "CUS_EX" || ch === "CUS_VD") c.disc += it.stDisc || 0;
      else if (ch === "BNPC5") c.disc += it.bnpcDisc || 0;
    }
  });
  if (inv.vat) {
    c.netOfVat = c.totalSales - c.lessVat;
    c.addVat = c.vat;
    c.vatShown = c.vat;
    c.wht = whtOf(inv, c.netOfVat - c.disc);
    c.due = c.netOfVat - c.disc + c.addVat - c.wht;
  } else {
    c.netOfVat = c.totalSales;
    c.wht = whtOf(inv, c.totalSales - c.disc);
    c.due = c.totalSales - c.disc - c.wht;
  }
  return c;
}
function taxTag(inv, tax) {
  if (!inv.vat)
    return tax === "EXEMPT" ? "Exempt" : "Subject to percentage tax";
  return tax === "VATABLE"
    ? "VATable"
    : tax === "ZERO_RATED"
      ? "Zero-rated"
      : "VAT-exempt";
}
function lineTaxTag(inv, it) {
  let t = taxTag(inv, it.tax);
  if (
    inv.scpwd &&
    ["SC20", "SP10", "CUS_EX"].includes(it.scChoice) &&
    it.tax === "VATABLE"
  ) {
    const f = it.scChoice === "SP10" ? 1 : groupFactor(inv);
    t =
      f < 1
        ? `Split: ${inv.group.sc} of ${inv.group.diners} shares VAT-exempt (${stType(inv.scpwd).short}), rest VATable`
        : `VAT-exempt (${stType(inv.scpwd).short})`;
  }
  if (it.taxReason)
    t += `: ${it.taxReason.reason}${it.taxReason.ref ? `, ${it.taxReason.ref}` : ""}`;
  return t;
}
const RECLASS = {
  ZERO_RATED: [
    "Sale to a registered export enterprise (e.g. PEZA or BOI)",
    "Service to a nonresident, paid in acceptable foreign currency",
    "Other zero-rated sale under Sec. 106(A)(2) or 108(B)",
  ],
  EXEMPT: [
    "Exempt under Sec. 109 of the Tax Code",
    "Exempt under a special law",
    "Other exempt sale",
  ],
  VATABLE: ["Item is not covered by the exemption or zero rating"],
};
function whtOf(inv, base) {
  if (inv.whtMode === "AMT") {
    const a = Math.round(Number(inv.whtAmt || 0) * 100);
    return Math.max(0, Math.min(a, base));
  }
  return Math.round(base * (inv.wht || 0));
}
function formatOf(inv) {
  const t = new Set(inv.items.map((i) => i.tax));
  if (inv.vat) {
    if (t.size === 1 && t.has("EXEMPT")) return "B3";
    if (t.size === 1 && t.has("ZERO_RATED")) return "B4";
    return "B1";
  }
  return t.has("EXEMPT") ? "B5" : "B2";
}
function rightBox(f, c) {
  const disc = ["Less: Discount<small>[SC/PWD/NAAC/MOV/SP]</small>", c.disc];
  if (f === "B1")
    return [
      ["Total Sales<small>(VAT Inclusive)</small>", c.totalSales],
      ["Less: VAT", c.lessVat],
      ["Amount: Net of VAT", c.netOfVat],
      disc,
      ["Add: VAT", c.addVat],
      ["Less: Withholding Tax", c.wht],
      ["TOTAL AMOUNT DUE", c.due, 1],
    ];
  const first =
    f === "B3"
      ? "Total VAT-Exempt Sales"
      : f === "B4"
        ? "Total Zero-rated Sales"
        : "Total Sales";
  return [
    [first, c.totalSales],
    disc,
    ["Less: Withholding Tax", c.wht],
    ["TOTAL AMOUNT DUE", c.due, 1],
  ];
}
function leftBox(f, c) {
  if (f === "B1")
    return [
      ["VATable Sales", c.vatable],
      ["VAT", c.vatShown],
      ["Zero-Rated Sales", c.zero],
      ["VAT-Exempt Sales", c.exempt],
    ];
  if (f === "B5")
    return [
      ["Exempt Sales", c.exempt],
      ["Sales Subject to Percentage Tax", c.sspt],
    ];
  return null;
}

/* ================= Credit memos (RMC 98-2026 IV.8) ================= */
function cnPseudo(cn) {
  const inv = invOf(cn.invNo);
  return {
    vat: inv.vat,
    incl: inv.incl,
    scpwd: inv.scpwd,
    scFrozen: true,
    group: inv.group,
    wht: inv.wht,
    items: cn.lines.map((l) => {
      const o = inv.items[l.src],
        R = lineNet(o) || 1;
      return {
        desc: o.desc,
        qty: 1,
        price: l.amount / 100,
        tax: o.tax,
        disc: 0,
        scChoice: o.scChoice,
        bnpcDisc:
          o.scChoice === "BNPC5"
            ? Math.round(((o.bnpcDisc || 0) * l.amount) / R)
            : 0,
        stDisc: o.stDisc ? Math.round((o.stDisc * l.amount) / R) : 0,
      };
    }),
  };
}
function cnCalc(cn) {
  return calc(cnPseudo(cn));
}
function creditsOf(no) {
  return credits.filter((c) => c.invNo === no);
}
function pendingOnLine(no, idx, excl) {
  return cmReqs
    .filter((r) => r.status === "PENDING" && r.invNo === no && r !== excl)
    .reduce(
      (a, r) =>
        a +
        r.lines.filter((l) => l.src === idx).reduce((x, l) => x + l.amount, 0),
      0,
    );
}
function creditedOnLine(no, idx, exclude) {
  return credits
    .filter((c) => c.invNo === no && c !== exclude)
    .reduce(
      (a, c) =>
        a +
        c.lines.filter((l) => l.src === idx).reduce((x, l) => x + l.amount, 0),
      0,
    );
}
function creditTotal(no) {
  return creditsOf(no).reduce((a, c) => a + cnCalc(c).due, 0);
}
function isCancelled(inv) {
  return inv.items.every((it, k) => creditedOnLine(inv.no, k) >= lineNet(it));
}

/* ================= Receipts register ================= */
function allocs(r) {
  return r.type === "COLLECTION" ? r.lines : r.applications;
}
function appliedOf(r) {
  return allocs(r).reduce((a, x) => a + x.amount, 0);
}
function unappliedOf(r) {
  return r.amount - appliedOf(r);
}
function collections(no) {
  const out = [];
  receipts.forEach((r) =>
    allocs(r).forEach((x) => {
      if (x.invNo === no)
        out.push({
          r,
          amount: x.amount,
          at: r.type === "ADVANCE" ? x.at : r.at,
        });
    }),
  );
  return out;
}
const TERMS = {
  DUE: ["Due on receipt", 0],
  NET7: ["Net 7 days", 7],
  NET15: ["Net 15 days", 15],
  NET30: ["Net 30 days", 30],
  NET45: ["Net 45 days", 45],
  NET60: ["Net 60 days", 60],
  CUSTOM: ["Specific due date", null],
};
function addDaysISO(iso, n) {
  const d = new Date(iso + "T12:00:00");
  d.setDate(d.getDate() + n);
  return todayISO(d.getTime());
}
function dueDateOf(inv) {
  if (inv.salesType !== "CHARGE") return null;
  const t = inv.terms || "NET30",
    base = inv.txnDate || todayISO(inv.issuedAt);
  return t === "CUSTOM" ? inv.dueDate || base : addDaysISO(base, TERMS[t][1]);
}
function termsText(inv) {
  const t = inv.terms || "NET30";
  return `Terms: ${TERMS[t][0]}${t === "CUSTOM" ? "" : ""}; due date ${isoDate(dueDateOf(inv))}`;
}
function daysBetween(a, b) {
  return Math.round(
    (new Date(b + "T12:00:00") - new Date(a + "T12:00:00")) / 864e5,
  );
}
let agingAsOf = "",
  agingOpen = null;
const AGE_B = [
  ["cur", "Not yet due"],
  ["b30", "1–30 days past due"],
  ["b60", "31–60 days"],
  ["b90", "61–90 days"],
  ["b91", "Over 90 days"],
];
function agingData(asOf) {
  const rows = {};
  invoices
    .filter(
      (i) =>
        i.salesType === "CHARGE" &&
        !isCancelled(i) &&
        inBr(i.branch) &&
        (i.txnDate || todayISO(i.issuedAt)) <= asOf,
    )
    .forEach((i) => {
      const cmDue = creditsOf(i.no)
        .filter((c) => todayISO(c.at) <= asOf)
        .reduce((a, c) => a + cnCalc(c).due, 0);
      const due =
        calc(i).due -
        cmDue -
        collections(i.no)
          .filter((x) => todayISO(x.r.at) <= asOf)
          .reduce((a, x) => a + x.amount, 0);
      if (due <= 0) return;
      const P = toPHP(i, due),
        od = daysBetween(dueDateOf(i), asOf),
        k =
          od <= 0
            ? "cur"
            : od <= 30
              ? "b30"
              : od <= 60
                ? "b60"
                : od <= 90
                  ? "b90"
                  : "b91",
        c = cust(i.customerId) || { name: "(unknown)" };
      const r = (rows[i.customerId] = rows[i.customerId] || {
        name: (i.buyer || c).name,
        cur: 0,
        b30: 0,
        b60: 0,
        b90: 0,
        b91: 0,
        total: 0,
        invs: [],
      });
      r[k] += P;
      r.total += P;
      r.invs.push({ i, P, od, k, due: dueDateOf(i) });
    });
  return Object.entries(rows)
    .map(([id, r]) => ({ id, ...r }))
    .sort((a, b) => b.total - a.total);
}
function vAging() {
  if (
    !(
      can("ops") ||
      can("master") ||
      can("approve") ||
      can("settings") ||
      can("security.view")
    )
  )
    return `<div class="head"><div><h1>Receivables aging</h1></div></div><div class="panel">Only office users can open this page.</div>`;
  agingAsOf = agingAsOf || todayISO();
  const data = agingData(agingAsOf),
    tot = { cur: 0, b30: 0, b60: 0, b90: 0, b91: 0, total: 0 };
  data.forEach((r) => Object.keys(tot).forEach((k) => (tot[k] += r[k])));
  const cell = (v) => `<td class="num">${v ? peso(v) : ""}</td>`;
  return `<div class="head"><div><h1>Receivables aging</h1><p class="sub">Unpaid charge-sale invoices by client, grouped by days past the due date set by their payment terms. Amounts in pesos, net of credit memos and collections up to the date chosen.</p></div>
   <div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap"><div><label for="ag-d">As of</label><input id="ag-d" type="date" data-agd="1" value="${agingAsOf}" max="${todayISO()}"></div><button class="btn" data-act="agcsv"${data.length ? "" : " disabled"}>Download CSV</button></div></div>
  <div class="stats"><div class="stat"><b>${peso(tot.total)}</b><span>total receivables</span></div><div class="stat${tot.total - tot.cur > 0 ? " alert" : ""}"><b>${peso(tot.total - tot.cur)}</b><span>past due</span></div><div class="stat"><b>${data.length}</b><span>client${data.length === 1 ? "" : "s"} with a balance</span></div></div>
  ${
    data.length
      ? `<div class="tablewrap"><table style="min-width:900px"><thead><tr><th>Client</th>${AGE_B.map(([, l]) => `<th class="num">${l}</th>`).join("")}<th class="num">Total</th></tr></thead><tbody>
   ${data
     .map(
       (
         r,
       ) => `<tr class="row" data-agopen="${r.id}" tabindex="0"><td><strong>${esc(r.name)}</strong><br><span class="due">${r.invs.length} invoice${r.invs.length === 1 ? "" : "s"}${agingOpen === r.id ? ", details below" : ""}</span></td>${AGE_B.map(([k]) => cell(r[k])).join("")}<td class="num"><strong>${peso(r.total)}</strong></td></tr>
     ${agingOpen === r.id ? r.invs.map((x) => `<tr><td style="padding-left:28px"><button class="btn link" data-open="${x.i.no}">Invoice No. ${x.i.no}</button><br><span class="due">${esc(TERMS[x.i.terms || "NET30"][0])}, due ${isoDate(x.due)}${x.od > 0 ? `, ${x.od} days past due` : ""}</span></td>${AGE_B.map(([k]) => cell(x.k === k ? x.P : 0)).join("")}<td class="num">${peso(x.P)}</td></tr>`).join("") : ""}`,
     )
     .join("")}
   <tr><td><strong>Total</strong></td>${AGE_B.map(([k]) => `<td class="num"><strong>${peso(tot[k])}</strong></td>`).join("")}<td class="num"><strong>${peso(tot.total)}</strong></td></tr></tbody></table></div>`
      : `<div class="panel empty">No unpaid charge-sale invoices as of ${isoDate(agingAsOf)}.</div>`
  }
  <p class="note">Click a client to see its invoices. Days past due count from the due date on each invoice (date of transaction plus the payment terms).</p>`;
}
function balanceOf(inv) {
  return inv.salesType === "CASH"
    ? 0
    : calc(inv).due -
        creditTotal(inv.no) -
        collections(inv.no).reduce((a, x) => a + x.amount, 0);
}
function openAdvances(cid) {
  return receipts.filter(
    (r) => r.type === "ADVANCE" && r.customerId === cid && unappliedOf(r) > 0,
  );
}

/* ================= Status pills ================= */
const pill = (s) =>
  `<span class="pill s-${s}">${{ accepted: "Accepted by BIR", pending: "Awaiting transmission", rejected: "Rejected", draft: "Draft", paid: "Paid", notreq: "Not yet required", credit: "Cancelled" }[s]}</span>`;
function reportPill(i) {
  return S.reporting ? pill(i.status) : pill("notreq");
}
function collPill(inv) {
  if (isCancelled(inv)) return pill("credit");
  if (inv.salesType === "CASH")
    return '<span class="pill s-paid">Cash sale</span>';
  const b = balanceOf(inv),
    d = calc(inv).due - creditTotal(inv.no);
  const od = b > 0 ? daysBetween(dueDateOf(inv), todayISO()) : 0;
  return b <= 0
    ? '<span class="pill s-paid">Paid</span>'
    : (od > 0
        ? `<span class="pill s-rejected">Overdue ${od} day${od === 1 ? "" : "s"}</span> `
        : "") +
        (b < d
          ? '<span class="pill s-pending">Partly paid</span>'
          : '<span class="pill s-draft">Unpaid</span>');
}
function delivered(inv) {
  return inv.deliveries.some((d) => d.via !== "Printed copy");
}
function rStatus(r) {
  if (r.type === "COLLECTION")
    return '<span class="pill s-paid">Collection</span>';
  const u = unappliedOf(r);
  return u === r.amount
    ? '<span class="pill s-pending">Advance, not yet invoiced</span>'
    : u > 0
      ? '<span class="pill s-pending">Advance, partly invoiced</span>'
      : '<span class="pill s-paid">Advance, fully invoiced</span>';
}
function dueInfo(inv) {
  if (!S.reporting || (inv.status !== "pending" && inv.status !== "rejected"))
    return "";
  const left = inv.issuedAt + 3 * DAY - now();
  if (left < 0) return '<span class="due late">Past 3-day deadline</span>';
  const h = Math.ceil(left / 3600e3);
  return `<span class="due${h < 24 ? " late" : ""}">${h > 24 ? Math.ceil(h / 24) + " days" : h + " hours"} left to transmit</span>`;
}

/* ================= Invoice checks ================= */
function checks(inv) {
  const c = cust(inv.customerId),
    out = [];
  out.push([!!S.ptiNo.trim(), "PTI Electronic Invoice on file"]);
  out.push([!!c, "Buyer's registered name selected"]);
  if (c && c.vatStatus === "FOREIGN")
    out.push([
      !!(c.country || "").trim() && !!c.address.trim(),
      "Foreign buyer's country and address on file",
    ]);
  out.push([
    !c || c.vatStatus === "FOREIGN" || !c.tin || TIN_RE.test(c.tin),
    "Buyer TIN, if any, in ###-###-###-##### format",
  ]);
  {
    const sr = ser("inv", inv.branch);
    out.push([
      inv.no >= sr[0] && inv.no <= sr[1],
      `Invoice no. within ${brOf(inv.branch).name} series ${sr[0]}–${sr[1]}`,
    ]);
    out.push([
      !invoices.some((x) => x.no === inv.no && x !== inv),
      "Invoice number is not already assigned to an issued invoice",
    ]);
  }
  out.push([
    inv.items.length > 0 && inv.items.every((i) => i.desc.trim()),
    "Every item has a description or nature of service",
  ]);
  out.push([
    inv.items.every((i) => Number(i.qty) > 0 && Number(i.price) >= 0),
    "Quantities above zero, prices not negative",
  ]);
  out.push([
    inv.items.every(
      (i) => cents(i.disc) <= cents(Number(i.qty) * Number(i.price)),
    ),
    "No line discount exceeds its amount",
  ]);
  if (inv.scpwd) {
    const T = inv.scpwd,
      st = stType(T);
    out.push([
      !!(inv.scId || "").trim(),
      `${st.idLabel.replace(" no.", "")} number entered`,
    ]);
    out.push([
      !!(inv.scName || "").trim(),
      `Name of the ${st.label.toLowerCase()} entered`,
    ]);
    if (T === "MOV")
      out.push([
        !!inv.movRel,
        "Beneficiary type selected (awardee, widow or widower, or dependent)",
      ]);
    if (T === "SP") {
      out.push([
        !!(inv.spChild || "").trim(),
        "Name of the child aged 6 or under entered",
      ]);
      out.push([
        !!inv.stConfirm,
        "Solo Parent ID shows income below ₱250,000 and the child's age; prescription in the child's name seen for medicines",
      ]);
    }
    if (T === "NAAC")
      out.push([
        !!inv.stConfirm,
        "PNSTM ID and booklet presented; NSA endorsement seen for sports equipment",
      ]);
    const cr = customRules.find((r) => r.code === T);
    if (cr) {
      out.push([
        ruleLive(cr, inv.txnDate),
        `${cr.label} rule in force on the date of transaction`,
      ]);
      if (cr.extraLabel)
        out.push([!!(inv.stExtraVal || "").trim(), `${cr.extraLabel} entered`]);
      if (cr.confirmText) out.push([!!inv.stConfirm, cr.confirmText]);
    }
    if (inv.group && inv.group.diners > 0)
      out.push([
        inv.group.sc > 0 && inv.group.sc <= inv.group.diners,
        "Group meal: number of beneficiary diners is between 1 and the total diners",
      ]);
    if (isSCPWD(T) && inv.items.some((it) => scCatOf(it) === "BNPC"))
      out.push([
        !!(inv.scId || "").trim(),
        "ID recorded so the ₱125 weekly BNPC cap can be tracked",
      ]);
  }
  if (
    inv.status === "draft" &&
    me() &&
    inv.items.some(
      (it) =>
        (it.promoSrc !== "STORE" && (it.promo || 0) > 0) || cents(it.disc) > 0,
    )
  ) {
    const g = inv.items.reduce((a, it) => a + lineReg(it), 0),
      dsc = inv.items.reduce(
        (a, it) =>
          a + cents(it.disc) + (it.promoSrc === "STORE" ? 0 : it.promo || 0),
        0,
      ),
      pct = g ? (dsc / g) * 100 : 0;
    if (dsc > 0 && me().roleCode !== "CASHIER")
      out.push([
        pct <= me().discCap + 1e-9,
        `Sale and line discounts (${pct.toFixed(1)}% of the sale) within your limit of ${me().discCap}%`,
      ]);
  }
  if (inv.promo && inv.promo.value > 0) {
    out.push([
      !!inv.promo.name.trim(),
      "Sale discount has a name, e.g. the sale event",
    ]);
    out.push([
      inv.promo.type === "PCT"
        ? inv.promo.value <= 100
        : cents(inv.promo.value) <=
          inv.items.reduce((a, it) => a + lineGross(it), 0),
      "Sale discount does not exceed the sale",
    ]);
  }
  if (
    c &&
    inv.vat &&
    c.vatStatus === "VAT" &&
    toPHP(inv, calc(inv).totalSales) >= 100000
  )
    out.push([
      TIN_RE.test(c.tin) && !!c.address.trim(),
      "Sale of ₱1,000 or more to a VAT-registered buyer: registered name, address and TIN shown",
    ]);
  if (inv.txnDate)
    out.push([
      inv.txnDate <= todayISO(),
      "Date of transaction is not in the future",
    ]);
  if (
    inv.status === "draft" &&
    inv.salesType === "CASH" &&
    inv.pay &&
    inv.pay.method !== "CASH"
  )
    out.push([
      !!(inv.pay.ref || "").trim(),
      `${PAY_METHODS[inv.pay.method]}: reference or check number entered`,
    ]);
  if (inv.status === "draft" && inv.whtMode === "AMT")
    out.push([
      Number(inv.whtAmt || 0) >= 0 &&
        Math.round(Number(inv.whtAmt || 0) * 100) <= calc(inv).netOfVat,
      "Withholding amount not more than the sale net of VAT",
    ]);
  if (isFX(inv) && inv.status === "draft") {
    const f = rateFor(curOf(inv), inv.txnDate || todayISO());
    out.push([
      !!f,
      `${CURRENCIES[curOf(inv)].src} exchange rate for ${curOf(inv)} on file for the date of transaction (enter it under Foreign currency)`,
    ]);
    out.push([
      !inv.scpwd,
      "Statutory discounts are applied on peso sales only",
    ]);
  }
  if (inv.refs.manual)
    out.push([
      !!(inv.refs.manual.no.trim() && inv.refs.manual.date),
      "Manual invoice no. and date entered",
    ]);
  if (inv.adv && Object.keys(inv.adv).length) {
    const tot = Object.values(inv.adv).reduce((a, x) => a + x, 0);
    out.push([
      Object.entries(inv.adv).every(
        ([n, v]) =>
          v > 0 && v <= unappliedOf(receipts.find((r) => r.no === +n)),
      ),
      "Each advance applied is within its unapplied balance",
    ]);
    out.push([
      tot <= calc(inv).due,
      "Advances applied do not exceed total amount due",
    ]);
  }
  return out;
}
function checksHtml(ch) {
  return ch
    .map(([ok, l]) => `<li class="${ok ? "ok" : "no"}">${l}</li>`)
    .join("");
}
function advisories(inv) {
  const fxa = isFX(inv)
    ? [
        `Invoice in ${curOf(inv)}. Amounts print in ${curOf(inv)}, with the peso equivalent of total sales, VAT and amount due at the ${CURRENCIES[curOf(inv)].src} rate of the transaction date. Books and returns use the peso amounts.`,
      ]
    : [];
  const _adv = advisoriesBase(inv);
  return fxa.concat(_adv);
}
function advisoriesBase(inv) {
  const c = cust(inv.customerId),
    t = calc(inv).totalSales,
    out = [];
  const need = {};
  inv.items.forEach((it) => {
    const item = itemById(it.itemId);
    if (item && item.type === "GOODS")
      need[item.id] = (need[item.id] || 0) + Number(it.qty || 0);
  });
  Object.entries(need).forEach(([id, q]) => {
    const item = itemById(id),
      h = onHand(id, inv.branch);
    if (q > h)
      out.push(
        `${esc(item.sku)}: invoicing ${fmtQty(q)} ${esc(item.uom)} but only ${fmtQty(h)} on hand. Issuing will make stock negative; check for unrecorded deliveries.`,
      );
  });
  if (!c) return out;
  if (inv.vat) {
    if (c.vatStatus === "VAT" && t < 100000 && !TIN_RE.test(c.tin))
      out.push(
        "Below ₱1,000, the buyer's TIN is optional, but without it a VAT-registered buyer cannot claim this input VAT.",
      );
    if (c.vatStatus === "VAT" && t < 100000 && TIN_RE.test(c.tin))
      out.push(
        "Buyer's TIN is shown, so the buyer can claim the input VAT even though the sale is below ₱1,000.",
      );
  } else {
    if (toPHP(inv, t) < 50000 && !inv.refs.aggregate)
      out.push(
        `Non-VAT sale below ₱500: an invoice is required only if the buyer asks, or once the day's small sales reach ₱500.${t > 0 ? ' <button class="btn link" data-act="totally">Record it in today\'s small sales tally instead</button>' : ""}`,
      );
    out.push(
      "Non-VAT invoice: prints “This document is not valid for claim of input tax.”",
    );
  }
  if (inv.txnDate && inv.txnDate < todayISO() && !inv.refs.manual)
    out.push(
      `The date of transaction (${isoDate(inv.txnDate)}) is earlier than today. The invoice should be issued on the date of transaction; late issuance may be treated as failure to issue on time.`,
    );
  if (inv.nature === "SERVICES") {
    if (inv.salesType === "CHARGE")
      out.push(
        "Service billed on account: this invoice evidences the sale now. When the buyer pays later, record a collection receipt, not another invoice (RMC 77-2024 Q15, Q31).",
      );
    if (advTotal(inv) > 0)
      out.push(
        "Advance applied: the invoice cites the Collection Receipt as proof of payment. The receipt stays a supplementary document; this invoice is the evidence of the sale.",
      );
  }
  if (inv.scpwd) {
    calc(inv);
    const T = inv.scpwd,
      st = stType(T);
    out.push(
      `${st.label} discount (${st.law}): confirm the purchase is for the beneficiary's ${T === "SP" ? "child aged 6 or under" : "actual and exclusive use"}, and have the invoice signed.`,
    );
    if (T === "NAAC" || T === "MOV")
      out.push(
        `${st.short} discount is 20% of the VAT-exclusive price. The sale is not VAT-exempt, so VAT stays on the full price.`,
      );
    if (T === "MOV")
      out.push(
        "Covers the awardee, the widow or widower, and dependents: transport, hotels and lodging, restaurants, recreation and sports centers, medicines, and admission fees.",
      );
    {
      const cr = customRules.find((r) => r.code === T);
      if (cr) {
        out.push(
          `${cr.label} (${cr.law}): ${cr.rate}% ${cr.vatExempt ? "with VAT exemption (VAT removed first)" : "of the VAT-exclusive price; VAT still due"}.`,
        );
        if (cr.capWeek)
          out.push(
            `Weekly cap per ID: ${peso(cr.capWeek)}; used this week before this invoice: ${peso(customUsedWeek(T, inv.scId, weekStart(txnTime(inv)), inv.no))}.`,
          );
        if (cr.capTxn) out.push(`Cap per transaction: ${peso(cr.capTxn)}.`);
      }
    }
    if (T === "SP")
      out.push(
        "Covers baby's milk, food and micronutrient supplements, sanitary diapers, and prescribed medicines, vaccines and medical supplements for the child.",
      );
    if (inv.items.every((it) => covOf(it, T) === "NONE"))
      out.push(
        `No line is covered by the ${st.short} discount. Set the coverage per line if any item qualifies.`,
      );
    inv.items.forEach((it) => {
      if (it.scChoice === "PROMO" && it.scStat > 0)
        out.push(
          `${esc(it.desc || "Line")}: the sale discount (${peso(it.scPromo)}) is higher than the ${st.short} discount (${peso(it.scStat)}), so the sale discount applies.`,
        );
    });
    if (isSCPWD(T) && inv.items.some((it) => scCatOf(it) === "BNPC")) {
      const used = bnpcUsed(inv.scId, weekStart(txnTime(inv)), inv.no);
      out.push(
        `BNPC 5% discount used by this ID this week: ${peso(used)} of ₱125.00 before this invoice.`,
      );
    }
  }
  if (c.vatStatus === "FOREIGN") {
    out.push(
      `Foreign buyer${c.country ? " in " + esc(c.country) : ""}: no Philippine TIN is required. The invoice prints "None (foreign buyer)" with the country${c.foreignTaxId ? " and the buyer's foreign tax ID" : ""}.`,
    );
    if (inv.vat && inv.items.some((it) => it.tax === "ZERO_RATED")) {
      out.push(
        inv.nature === "SERVICES"
          ? "Zero-rated services to a nonresident: the fee must be paid in acceptable foreign currency and accounted for under BSP rules (Tax Code Sec. 108(B)(2)). Keep the proof of inward remittance."
          : "Zero-rated export sale: keep the export documents (e.g. export declaration, bill of lading) and proof of foreign-currency payment (Tax Code Sec. 106(A)(2)).",
      );
      if (!isFX(inv))
        out.push(
          "This zero-rated sale is in pesos. Check that payment will be received in acceptable foreign currency, or the sale may not qualify for zero rating.",
        );
    }
  }
  if (c.vatStatus === "INDIVIDUAL")
    out.push(
      "B2C sale: the customer's name is enough. A printed copy may be given if electronic delivery isn't practicable.",
    );
  return out;
}
function advHtml(a) {
  return a.map((x) => `<li class="info">${x}</li>`).join("");
}

/* ================= Printed documents ================= */
function sellerSnap(code) {
  code = code || wb() || "00000";
  const b = brOf(code),
    r = (k) => `${b.series[k][0]} – ${b.series[k][1]}`;
  return {
    vat: S.vat,
    name: S.name,
    trade: S.trade,
    tin: brTin(code),
    address: b.address,
    permitNo: S.permitNo,
    atpNo: S.atpNo,
    atpDate: S.atpDate,
    ptiNo: S.ptiNo,
    branch: `${b.name} (${code})`,
    branchCode: code,
    inv: r("inv"),
    cn: r("cn"),
    pr: r("pr"),
    cr: r("cr"),
  };
}
function sellerBlock(vat, d, sl) {
  d = d || curDesign();
  const S = sl || sellerSnap();
  return `<div class="seller">${d.logo ? `<img class="logo-img" src="${d.logo}" alt="${esc(S.trade)} logo">` : '<div class="mark" aria-hidden="true"></div>'}<div>
   <div class="trade">${esc(S.trade)}</div>${vat ? "" : '<div class="op">Operated by</div>'}<div class="rname">${esc(S.name)}</div>
   <div>${vat ? "VAT" : "NON-VAT"} REG TIN ${esc(S.tin)}</div><div class="small">${esc(S.address).toUpperCase()}</div></div></div>`;
}
function footer(series, sl) {
  const S = sl || sellerSnap();
  return `<div class="foot"><div>BIR Permit No.: ${esc(S.permitNo)}<br>ATP No./OCN: ${esc(S.atpNo)}</div>
  <div>Date issued: ${esc(new Date(S.atpDate).toLocaleDateString("en-PH", { day: "2-digit", month: "short", year: "numeric" }))}<br>Approved series: ${series}</div></div>`;
}
function bx(rows) {
  return `<table class="bx">${rows.map(([l, v, b]) => `<tr${b ? ' class="tot"' : ""}><td class="lab">${l}</td><td>${v ? amt(v) : ""}</td></tr>`).join("")}</table>`;
}
/* ===== Signed QR codes (ECDSA P-256, the same algorithm family as the JWS ES256 used for EIS) ===== */
const SIGN = { priv: null, pub: null, pubJwk: null, ready: false };
const VERIFY_HOST = "https://verify.talaan.ph/v/";
function b64u(buf) {
  const b = buf instanceof ArrayBuffer ? new Uint8Array(buf) : buf;
  let s = "";
  b.forEach((x) => (s += String.fromCharCode(x)));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64uStr(str) {
  return b64u(new TextEncoder().encode(str));
}
function unb64u(s) {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  return Uint8Array.from(bin, (c) => c.charCodeAt(0));
}
async function initSigning() {
  try {
    if (typeof localStorage !== "undefined") {
      const storedPriv = localStorage.getItem("talaan_priv_jwk");
      const storedPub = localStorage.getItem("talaan_pub_jwk");
      if (storedPriv && storedPub) {
        SIGN.priv = await crypto.subtle.importKey(
          "jwk",
          JSON.parse(storedPriv),
          { name: "ECDSA", namedCurve: "P-256" },
          true,
          ["sign"],
        );
        SIGN.pub = await crypto.subtle.importKey(
          "jwk",
          JSON.parse(storedPub),
          { name: "ECDSA", namedCurve: "P-256" },
          true,
          ["verify"],
        );
        SIGN.pubJwk = JSON.parse(storedPub);
        SIGN.ready = true;
        return;
      }
    }
    const k = await crypto.subtle.generateKey(
      { name: "ECDSA", namedCurve: "P-256" },
      true,
      ["sign", "verify"],
    );
    SIGN.priv = k.privateKey;
    SIGN.pub = k.publicKey;
    SIGN.pubJwk = await crypto.subtle.exportKey("jwk", k.publicKey);
    const privJwk = await crypto.subtle.exportKey("jwk", k.privateKey);
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("talaan_priv_jwk", JSON.stringify(privJwk));
      localStorage.setItem("talaan_pub_jwk", JSON.stringify(SIGN.pubJwk));
    }
    SIGN.ready = true;
  } catch (e) {
    SIGN.ready = false;
  }
}
function docTotals(doc, kind) {
  if (kind === "CR") return { total: 0, vat: 0, date: todayISO(doc.at) };
  if (kind === "CM") {
    const c = cnCalc(doc);
    return { total: c.due, vat: c.vatShown || 0, date: todayISO(doc.at) };
  }
  const c = calc(doc);
  return {
    total: c.due,
    vat: c.vatShown || 0,
    date: doc.txnDate || todayISO(doc.issuedAt),
  };
}
function payloadOf(doc, kind) {
  const t = docTotals(doc, kind),
    sel = doc.seller || sellerSnap();
  const base = [
    "TLV1",
    sel.tin,
    kind,
    doc.no,
    t.date,
    (t.total / 100).toFixed(2),
    (t.vat / 100).toFixed(2),
    doc.eisId,
  ];
  if (kind === "CR")
    base.push(
      "REF " + doc.invNo,
      ...doc.changes.map((c) => `${c.field}=${c.to}`),
    );
  return base.join("|");
}
async function signDoc(doc, kind) {
  if (!SIGN.ready) return;
  doc.vt = doc.vt || (rand(8) + rand(8)).toLowerCase();
  doc.sigPayload = payloadOf(doc, kind);
  const sig = await crypto.subtle.sign(
    { name: "ECDSA", hash: "SHA-256" },
    SIGN.priv,
    new TextEncoder().encode(doc.sigPayload),
  );
  doc.sig = b64u(sig);
  doc.verifyUrl = `${VERIFY_HOST}${doc.vt}?d=${b64uStr(doc.sigPayload)}&s=${doc.sig}`;
}
async function verifySig(payload, sig) {
  try {
    return await crypto.subtle.verify(
      { name: "ECDSA", hash: "SHA-256" },
      SIGN.pub,
      unb64u(sig),
      new TextEncoder().encode(payload),
    );
  } catch (e) {
    return false;
  }
}
function qrDoc(doc, kind, label) {
  if (!doc.verifyUrl)
    return `<div class="qr"><div>QR code and verification link are assigned when the document is issued.</div></div>`;
  return `<div class="qr"><button class="qrbtn" data-verify="${kind}:${doc.no}" aria-label="Scan to verify ${kind === "CM" ? "credit memo" : "invoice"} ${doc.no}"><div data-qr="${esc(doc.verifyUrl)}"></div><div>${label}<br>verify.talaan.ph/v/${esc(doc.vt)}</div></button></div>`;
}
function qrBlock(id, label) {
  return id
    ? `<div class="qr"><div data-qr="${esc(viewLink(id))}"></div><div>${label}<br>${esc(viewLink(id))}</div></div>`
    : "";
}
function advRefs(inv) {
  if (inv.adv)
    return Object.entries(inv.adv)
      .filter(([n, v]) => v > 0)
      .map(([n, v]) => {
        const r = receipts.find((x) => x.no === +n);
        return { no: r.no, at: r.at, amount: v };
      });
  const out = [];
  receipts
    .filter((r) => r.type === "ADVANCE")
    .forEach((r) =>
      r.applications
        .filter((a) => a.invNo === inv.no)
        .forEach((a) => out.push({ no: r.no, at: r.at, amount: a.amount })),
    );
  return out;
}
function remarks(inv) {
  const r = [],
    x = inv.refs || {};
  if (x.manual)
    r.push(
      `Replaces manual Invoice No. ${esc(x.manual.no)} dated ${dDate(x.manual.date)}, issued during system downtime.`,
    );
  if (x.reissueOf)
    r.push(
      `Issued in place of Invoice No. ${x.reissueOf}, cancelled by Credit Memo No. ${x.cancelledBy}.`,
    );
  if (x.addlFor) r.push(`Additional billing for Invoice No. ${x.addlFor}.`);
  if (x.lateReason)
    r.push(
      `Date of transaction ${dDate(new Date(inv.txnDate + "T12:00:00").getTime())}; issued ${inv.issuedAt ? dDate(inv.issuedAt) : "today"}. Reason: ${esc(x.lateReason)}.`,
    );
  const ar = advRefs(inv);
  if (ar.length) {
    const tot = ar.reduce((a, x) => a + x.amount, 0),
      due = calc(inv).due;
    r.push(
      `Proof of payment: ${ar.map((a) => `${peso(a.amount)} received in advance under Collection Receipt No. ${a.no} dated ${dDate(a.at)}`).join("; ")}, applied to this invoice.${due - tot > 0 ? ` Balance due ${peso(due - tot)}.` : " Fully paid."}`,
    );
  }
  if (x.aggregate)
    r.push(
      `Aggregate invoice covering ${x.aggregate.ids.length} sales below ₱500 recorded on ${isoDate(x.aggregate.day)}.`,
    );
  return r.length
    ? `<div class="remarks"><b>Remarks:</b> ${r.join(" ")}</div>`
    : "";
}
function docInvoice(inv, override) {
  const dz = override || designV(inv.designV || curDesign().v);
  const f = formatOf(inv),
    c = calc(inv),
    b = inv.buyer || cust(inv.customerId) || { name: "", tin: "", address: "" };
  const rows = inv.items.map(
    (it) =>
      `<tr><td>${esc(it.desc)}${inv.scpwd && ["SC20", "STAT20", "SP10", "CUS_EX", "CUS_VD"].includes(it.scChoice) ? ` <span style="font-size:10px">[${choiceLabel(it, inv.scpwd)}${it.scChoice !== "SP10" && groupFactor(inv) < 1 ? `, ${inv.group.sc} of ${inv.group.diners} diners` : ""}${it.scChoice === "STAT20" || it.scChoice === "CUS_VD" ? ", VAT due" : ""}]</span>` : ""}${inv.scpwd && it.scChoice === "BNPC5" ? ` <span style="font-size:10px">[${inv.scpwd} 5% BNPC: ${amt(it.bnpcDisc || 0)}]</span>` : ""}${inv.scpwd && SC_STAT.includes(it.scChoice) && (cents(it.disc) > 0 || (it.scPromo || 0) > 0) ? ` <span style="font-size:10px">(sale discount not applied: ${stType(inv.scpwd).short} discount is higher)</span>` : ""}${inv.scpwd && it.scChoice === "PROMO" && (it.scStat || 0) > 0 ? ` <span style="font-size:10px">(sale discount applied instead of ${stType(inv.scpwd).short} discount)</span>` : ""}<br><span style="font-size:10px">${it.sku ? `SKU ${esc(it.sku)}, ` : ""}<b>${esc(lineTaxTag(inv, it))}</b></span>${cents(it.disc) && !SC_STAT.includes(it.scChoice) ? ` <span style="font-size:10.5px">(less ${amt(cents(it.disc))})</span>` : ""}</td><td class="r">${it.qty}${it.uom ? " " + esc(it.uom) : ""}</td><td class="r">${amt(cents(it.price))}</td><td class="r">${amt(lineShown(it))}</td></tr>`,
  );
  if (promoTotal(inv))
    rows.push(
      `<tr><td><b>Less: ${esc(promoLabel(inv))}</b></td><td></td><td></td><td class="r">(${amt(promoTotal(inv))})</td></tr>`,
    );
  while (rows.length < 4)
    rows.push("<tr><td></td><td></td><td></td><td></td></tr>");
  const lb = leftBox(f, c),
    kind = f === "B3" ? "VAT-EXEMPT SALE" : f === "B4" ? "ZERO-RATED SALE" : "",
    notValid = ["B2", "B3", "B5"].includes(f),
    cash = inv.salesType === "CASH";
  return `<div class="paperwrap"><article class="paper" style="${paperStyle(dz)}" aria-label="${FORMATS[f]}"><div class="band"></div><div class="in">
   <div class="hdr">${sellerBlock(inv.vat, dz, inv.seller || sellerSnap(inv.branch))}<div class="title"><div class="big">INVOICE</div>${kind ? `<div class="kind">${kind}</div>` : ""}</div></div>
   <div class="serial">Invoice No. ${inv.no}</div>
   <div class="row2"><div class="cb">${cash ? "☑" : "☐"} CASH SALES<br>${cash ? "☐" : "☑"} CHARGE SALES</div><div class="datebox"><div>Date:</div><div>${inv.txnDate ? isoDate(inv.txnDate) : inv.issuedAt ? dDate(inv.issuedAt) : ""}</div></div></div>
   <div class="box sold"><div class="h">SOLD TO:</div><div class="b"><span>Registered Name</span><span>: ${esc(b.name)}</span><span>TIN</span><span>: ${esc(tinTxt(b))}</span><span>Business Address</span><span>: ${esc(b.address)}</span>${b.email ? `<span>Email</span><span>: ${esc(b.email)}</span>` : ""}</div></div>
   <table class="it"><thead><tr><th style="width:50%">Item Description/<br>Nature of Service</th><th>Quantity</th><th>Unit Cost/<br>Price${isFX(inv) ? ` (${curOf(inv)})` : ""}</th><th>Amount${isFX(inv) ? ` (${curOf(inv)})` : ""}</th></tr></thead><tbody>${rows.join("")}</tbody></table>
   ${remarks(inv)}${isFX(inv) ? `<div class="remarks"><b>${esc(fxNote(inv, c))}</b></div>` : ""}
   <div class="bottom"><div>${lb ? bx(lb) : ""}
     ${
       f === "B1" || f === "B2"
         ? (() => {
             const ar = advRefs(inv),
               at = ar.reduce((a, x) => a + x.amount, 0);
             return `<div class="recv">${cash || at ? "☑" : "☐"} Received the amount of<br><span class="line">${cash ? money(inv, c.due) : at ? `${peso(at)} per CR No. ${ar.map((a) => a.no).join(", ")}` : ""}</span></div>`;
           })()
         : ""
     }
     ${inv.salesType === "CHARGE" ? `<div style="margin-top:10px;border:1.5px solid #B42318;color:#B42318;padding:6px 8px;font-size:11px;font-weight:700">UNPAID AT ISSUANCE. Payment will be acknowledged by a Collection Receipt.<br><span style="font-weight:400;color:#111">${esc(termsText(inv))}</span></div>` : `<div style="margin-top:8px;font-size:11px"><b>Payment:</b> ${esc(payText(inv.pay))}</div>`}
     ${notValid ? `<div class="notvalid">“THIS DOCUMENT IS<br>NOT VALID FOR CLAIM<br>OF INPUT TAX.”</div>` : ""}
     ${qrDoc(inv, "INV", "Scan to verify this e-invoice")}</div>
    <div>${bx(rightBox(f, c))}<div class="scbox"><div>SC/PWD/NAAC/MOV/<br>Solo Parent ID No.:</div><div class="v">${inv.scpwd ? `${esc(stType(inv.scpwd).short)} ${esc(inv.scId)}${inv.scName ? `<br>${esc(inv.scName)}` : ""}${inv.movRel ? ` (${esc(inv.movRel)})` : ""}${inv.spChild ? `<br>Child: ${esc(inv.spChild)}` : ""}${inv.stExtraVal ? `<br>${esc(inv.stExtraVal)}` : ""}` : ""}</div><div>SC/PWD/NAAC/MOV/<br>Signature:</div><div class="v"></div></div></div></div>
   ${footer((inv.seller || sellerSnap(inv.branch)).inv, inv.seller || sellerSnap(inv.branch))}</div></article></div>
  <p class="fmtline noprint">Printed in RMC 77-2024 Annex ${f} format: ${FORMATS[f]}. Design version ${dz.v}.</p>`;
}
function docCredit(cn) {
  const dz = designV(cn.designV || curDesign().v),
    inv = invOf(cn.invNo),
    b = cn.buyer || inv.buyer || cust(inv.customerId),
    c = cnCalc(cn),
    f = formatOf(inv);
  const rows = cn.lines.map(
    (l) =>
      `<tr><td>${esc(cn.reason)}: ${esc(inv.items[l.src].desc)}${l.qty ? ` (${fmtQty(l.qty)} ${esc(inv.items[l.src].uom || "")})` : ""}${inv.items[l.src].sku ? `<br><span style="font-size:10px">SKU ${esc(inv.items[l.src].sku)}</span>` : ""}</td><td>${inv.vat ? TAX_VAT[inv.items[l.src].tax] : TAX_NV[inv.items[l.src].tax]}</td><td class="r">${amt(l.amount)}</td></tr>`,
  );
  while (rows.length < 3) rows.push("<tr><td></td><td></td><td></td></tr>");
  const lb = inv.vat
    ? [
        ["VATable Sales", c.vatable],
        ["VAT", c.vatShown],
        ["Zero-Rated Sales", c.zero],
        ["VAT-Exempt Sales", c.exempt],
      ]
    : [
        ["Exempt Sales", c.exempt],
        ["Sales Subject to Percentage Tax", c.sspt],
      ];
  const rb =
    inv.vat && f === "B1"
      ? [
          ["Total Sales Credited<small>(VAT Inclusive)</small>", c.totalSales],
          ["Less: VAT", c.lessVat],
          ["Amount: Net of VAT", c.netOfVat],
          ["Less: Discount<small>[SC/PWD/NAAC/MOV/SP]</small>", c.disc],
          ["Add: VAT", c.addVat],
          ["Less: Withholding Tax", c.wht],
          ["TOTAL AMOUNT CREDITED", c.due, 1],
        ]
      : [
          ["Total Sales Credited", c.totalSales],
          ["Less: Discount<small>[SC/PWD/NAAC/MOV/SP]</small>", c.disc],
          ["Less: Withholding Tax", c.wht],
          ["TOTAL AMOUNT CREDITED", c.due, 1],
        ];
  return `<div class="paperwrap"><article class="paper" style="${paperStyle(dz)}" aria-label="Credit memo"><div class="band"></div><div class="in">
   <div class="hdr">${sellerBlock(inv.vat, dz, cn.seller || sellerSnap(inv.branch))}<div class="title"><div class="big">CREDIT MEMO</div></div></div>
   <div class="serial">${cn.no ? `Credit Memo No. ${cn.no}` : '<span class="draftmark">DRAFT, FOR APPROVAL</span>'}</div>
   <div class="row2"><div class="cb"><b>Reference Invoice No. ${inv.no}</b><br>dated ${dDate(inv.issuedAt)}</div><div class="datebox"><div>Date:</div><div>${dDate(cn.at)}</div></div></div>
   <div class="box sold"><div class="h">ISSUED TO:</div><div class="b"><span>Registered Name</span><span>: ${esc(b.name)}</span><span>TIN</span><span>: ${esc(tinTxt(b))}</span><span>Business Address</span><span>: ${esc(b.address)}</span></div></div>
   <table class="it"><thead><tr><th style="width:62%">Reason / Item Description</th><th>Tax treatment</th><th>Amount</th></tr></thead><tbody>${rows.join("")}</tbody></table>
   ${cn.note ? `<div class="remarks"><b>Details:</b> ${esc(cn.note)}</div>` : ""}${isFX(inv) ? `<div class="remarks"><b>${esc(fxNote(inv, c).replace("total amount due", "total amount credited"))} (the reference invoice's rate)</b></div>` : ""}
   <div class="bottom"><div>${bx(lb)}${inv.vat ? "" : `<div class="notvalid">“THIS DOCUMENT IS<br>NOT VALID FOR CLAIM<br>OF INPUT TAX.”</div>`}${qrDoc(cn, "CM", "Scan to verify this credit memo")}</div><div>${bx(rb)}</div></div>
   <div class="signoff"><div><div class="sl"><b>${esc(cn.preparedBy ? cn.preparedBy.name : "")}</b>Prepared by${cn.preparedBy ? `, ${esc(cn.preparedBy.role)}` : ""}<br>${cn.preparedAt ? fmtDate(cn.preparedAt) : ""}</div></div>
    <div><div class="sl"><b>${cn.approvedBy ? esc(cn.approvedBy.name) : "&nbsp;"}</b>Approved by${cn.approvedBy ? `, ${esc(cn.approvedBy.role)}` : " (pending)"}<br>${cn.approvedAt ? fmtDate(cn.approvedAt) : ""}</div></div>
    <div><div class="sl"><b>&nbsp;</b>Received by (buyer)<br>Signature over printed name and date</div></div></div>
   <div class="ptiline">Issued under PTI Electronic Invoice No. ${esc((cn.seller || sellerSnap(inv.branch)).ptiNo)}, ${esc((cn.seller || sellerSnap(inv.branch)).branch)}</div>
   ${footer((cn.seller || sellerSnap(inv.branch)).cn, cn.seller || sellerSnap(inv.branch))}</div></article></div>
  <p class="fmtline noprint">Credit memo layout mirrors the referenced invoice (RMC 77-2024 Annex A1 style). No BIR sample format exists for credit memos yet.</p>`;
}
function docReceipt(r) {
  const dz = designV(r.designV || curDesign().v),
    b = r.buyer || cust(r.customerId);
  const rows =
    r.type === "COLLECTION"
      ? r.lines.map(
          (l) =>
            `<tr><td>Payment for Invoice No. ${l.invNo}</td><td class="r">${amt(l.amount)}</td></tr>`,
        )
      : [
          `<tr><td>Advance payment for: ${esc(r.purpose)}</td><td class="r">${amt(r.amount)}</td></tr>`,
        ];
  while (rows.length < 2) rows.push("<tr><td></td><td></td></tr>");
  return `<div class="paperwrap"><article class="paper" style="${paperStyle(dz)}" aria-label="Collection receipt"><div class="band"></div><div class="in">
   <div class="hdr">${sellerBlock(r.seller ? r.seller.vat : S.vat, dz, r.seller || sellerSnap(r.branch))}</div>
   <div class="row2" style="margin-top:16px;padding:0"><div style="font-size:21px">COLLECTION RECEIPT</div><div class="serial" style="margin:0">No. ${r.no}</div></div>
   <div class="row2" style="margin-top:6px"><div class="cb">${r.method === "CASH" ? "☑" : "☐"} CASH<br>${r.method === "CARD" ? "☑" : "☐"} CREDIT CARD</div>
    <div class="datebox" style="grid-template-columns:110px 150px;border-bottom:0"><div>Payment Date:</div><div>${dDate(r.at)}</div><div style="border-top:1px solid var(--pl);border-left:0">Account No.:</div><div style="border-top:1px solid var(--pl)">${esc(r.account)}</div></div></div>
   <div class="box sold"><div class="h">RECEIVED FROM:</div><div class="b"><span>Registered Name</span><span>: ${esc(b.name)}</span><span>TIN</span><span>: ${esc(tinTxt(b))}</span><span>Business Address</span><span>: ${esc(b.address)}</span></div></div>
   <table class="it"><thead><tr><th style="width:75%">Description of Transaction/Nature of Service</th><th>Amount</th></tr></thead><tbody>${rows.join("")}</tbody></table>
   <div class="bottom"><div class="notvalid">“THIS DOCUMENT IS<br>NOT VALID FOR CLAIM<br>OF INPUT TAX.”</div>
    <div><table class="bx"><tr class="tot"><td class="hd">TOTAL PAID AMOUNT${isFX(r) ? ` (${curOf(r)})` : ""}</td><td>${amt(r.amount)}</td></tr>${isFX(r) ? `<tr><td style="text-align:left">Peso equivalent at ₱${r.fx.rate.toFixed(4)} (${r.fx.source}, ${isoDate(r.fx.date)})</td><td>${amt(Math.round(r.amount * r.fx.rate))}</td></tr>` : ""}<tr><td style="text-align:left">Invoice Reference No.:</td><td>${r.type === "COLLECTION" ? r.lines.map((l) => l.invNo).join(", ") : ""}</td></tr></table></div></div>
   ${footer((r.seller || sellerSnap(r.branch)).pr, r.seller || sellerSnap(r.branch))}</div></article></div>
  <p class="fmtline noprint">Printed in RMC 77-2024 Annex B6 format, titled Collection Receipt (one of the receipt names shown in the Annex) for both advances and later collections. The printed receipt never changes after issuance; later applications to invoices are recorded in the register.</p>`;
}
function renderQRs() {
  document.querySelectorAll("[data-qr]").forEach((el) => {
    if (el.dataset.done) return;
    el.dataset.done = 1;
    try {
      new QRCode(el, {
        text: el.dataset.qr,
        width: 128,
        height: 128,
        correctLevel: QRCode.CorrectLevel.M,
      });
    } catch (e) {
      el.textContent = "[QR]";
    }
  });
}

/* ================= Navigation ================= */
const PAY_METHODS = {
  CASH: "Cash",
  CHECK: "Check",
  EWALLET: "E-wallet",
  BANK: "Bank transfer",
  CARD: "Credit or debit card",
};
function payText(p) {
  if (!p || p.method === "CASH") return "Cash";
  const m = PAY_METHODS[p.method];
  if (p.method === "CHECK")
    return `Check No. ${p.ref || "—"}${p.bank ? `, ${p.bank}` : ""}${p.date ? `, dated ${isoDate(p.date)}` : ""}`;
  if (p.method === "EWALLET")
    return `E-wallet${p.bank ? ` (${p.bank})` : ""}, reference ${p.ref || "—"}`;
  if (p.method === "BANK")
    return `Bank transfer${p.bank ? ` to/from ${p.bank}` : ""}, reference ${p.ref || "—"}${p.date ? `, ${isoDate(p.date)}` : ""}`;
  return `${m}${p.bank ? ` (${p.bank})` : ""}, approval code ${p.ref || "—"}`;
}
function termsFields(d, attr) {
  const t = d.terms || "NET30";
  return `<div class="fields"><div><label for="${attr}-tm">Payment terms</label><select id="${attr}-tm" ${attr}="terms">${Object.entries(
    TERMS,
  )
    .map(
      ([k, [l]]) =>
        `<option value="${k}"${t === k ? " selected" : ""}>${l}</option>`,
    )
    .join("")}</select></div>
   <div><label for="${attr}-dd">Due date</label>${t === "CUSTOM" ? `<input id="${attr}-dd" type="date" ${attr}="dueDate" value="${esc(d.dueDate || d.txnDate)}" min="${d.txnDate}">` : `<div class="ro">${isoDate(dueDateOf(d))}</div>`}</div></div>`;
}
function payFields(p, attr) {
  const lab = {
    CHECK: ["Bank", "Check no.", "Check date"],
    EWALLET: ["Provider (e.g. GCash, Maya)", "Reference no.", null],
    BANK: ["Bank", "Reference no.", "Transfer date"],
    CARD: ["Card issuer or bank", "Approval code", null],
  }[p.method];
  return `<div class="fields"><div><label for="${attr}-m">Payment method</label><select id="${attr}-m" ${attr}="method">${Object.entries(
    PAY_METHODS,
  )
    .map(
      ([k, l]) =>
        `<option value="${k}"${p.method === k ? " selected" : ""}>${l}</option>`,
    )
    .join("")}</select></div>
   ${lab ? `<div><label for="${attr}-b">${lab[0]}</label><input id="${attr}-b" ${attr}="bank" value="${esc(p.bank || "")}"></div><div><label for="${attr}-r">${lab[1]}</label><input id="${attr}-r" ${attr}="ref" value="${esc(p.ref || "")}"></div>${lab[2] ? `<div><label for="${attr}-d">${lab[2]}</label><input id="${attr}-d" type="date" ${attr}="date" value="${esc(p.date || "")}" max="${todayISO()}"></div>` : ""}` : ""}</div>`;
}
function newDraft() {
  return {
    terms: "NET30",
    dueDate: "",
    pay: { method: "CASH", bank: "", ref: "", date: "" },
    whtMode: "RATE",
    whtAmt: "",
    cur: "PHP",
    branch: wb() || "00000",
    nature: "GOODS",
    txnDate: todayISO(),
    no: nextNo("inv", wb() || "00000"),
    customerId: "",
    salesType: "CHARGE",
    vat: S.vat,
    incl: false,
    items: [
      { desc: "", qty: 1, price: 0, tax: S.vat ? "VATABLE" : "SSPT", disc: 0 },
    ],
    scpwd: "",
    scId: "",
    wht: 0,
    promo: { name: "", type: "PCT", value: 0 },
    status: "draft",
    issuedAt: now(),
    adv: {},
    refs: {},
    deliveries: [],
  };
}
function go(v, no) {
  if (!canView(v)) {
    const u = me();
    slog(
      "Access denied",
      `${u ? ROLES[u.roleCode].label : "Anonymous"} tried to navigate to ${v}`,
    );
    toast(
      `Your role (${u ? ROLES[u.roleCode].label : "none"}) cannot access this page.`,
    );
    return;
  }
  if (["new", "newReceipt", "newStock"].includes(v) && !wb()) {
    toast("Choose a branch before issuing documents.");
    return;
  }
  if (v !== view) resetPicker();
  view = v;
  current = no ?? null;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("talaan_view", v);
    if (current != null) localStorage.setItem("talaan_cur", current);
    else localStorage.removeItem("talaan_cur");
  }
  showJson = false;
  if (v === "new") draft = newDraft();
  render();
  window.scrollTo(0, 0);
}
function render() {
  renderCore();
  renderHelp();
}
function renderCore() {
  const navEl = document.querySelector("nav.side");
  const appEl = document.querySelector(".app");
  if (!me()) {
    navEl.style.display = "none";
    if (appEl) appEl.classList.add("auth-mode");
    document.getElementById("main").innerHTML = portalOpen
      ? vPortal()
      : vLogin();
    renderQRs();
    const hr = document.getElementById("helpRoot");
    if (hr) hr.innerHTML = "";
    return;
  }
  if (appEl) appEl.classList.remove("auth-mode");
  document
    .querySelector(".app")
    .classList.toggle("counter-mode", uiMode === "counter");
  if (uiMode === "counter") {
    navEl.style.display = "none";
    document.getElementById("main").innerHTML = vCounter();
    renderQRs();
    return;
  }
  navEl.style.display = "";
  if (!canView(view)) {
    view = "list";
    current = null;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("talaan_view", "list");
      localStorage.removeItem("talaan_cur");
    }
  }
  if (view === "new" && !draft) draft = newDraft();
  if (
    (view === "detail" && (!current || !invOf(+current))) ||
    (view === "receipt" &&
      (!current || !receipts.find((r) => r.no === +current))) ||
    (view === "credit" && (!current || !credits.find((c) => c.no === +current)))
  ) {
    view = "list";
    current = null;
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("talaan_view", "list");
      localStorage.removeItem("talaan_cur");
    }
  }
  {
    const dbr = docBranchOfView();
    if (dbr && !canBranch(dbr)) {
      slog("Access denied", `Tried to open a document of ${brLabel(dbr)}`);
      view = "list";
      current = null;
      toast(`That document belongs to ${brLabel(dbr)}, outside your branch.`);
    }
  }
  document.getElementById("userBox").innerHTML =
    `<div class="me"><b>${esc(me().name)}</b>${esc(me().position)}<br><span class="due">${esc(ROLES[me().roleCode].label)}${me().mfa ? ", two-factor on" : ""}</span></div>
   ${me().branch === "ALL" ? `<label for="vbr" style="font-size:12px;margin-top:8px">Branch</label><select id="vbr" data-vbr="1">${[["ALL", "All branches (view only)"], ...BRS.filter((b) => b.active).map((b) => [b.code, brLabel(b.code)])].map(([v, l]) => `<option value="${v}"${viewBr === v ? " selected" : ""}>${esc(l)}</option>`).join("")}</select>` : `<div class="due" style="margin-top:6px">Branch: ${esc(brLabel(me().branch))}</div>`}
   <div class="due" style="margin-top:6px;font-size:12px">Philippine Standard Time<br><span data-phclock="1">${phNow()}</span></div>
   <div class="due" style="margin-top:6px;font-size:12px">Database: <span style="color:${isDbConnected ? "var(--good, #12B76A)" : "#98A2B3"}">●</span> ${isDbConnected ? "Aiven MySQL 8.4" : "Local session"}</div>
   ${can("counter") ? `<button class="btn" style="margin-top:8px;width:100%" data-act="kmode">Switch to cashier counter</button>` : ""}<button class="btn link" data-act="signout">Sign out</button>`;
  document.getElementById("coBox").innerHTML =
    `${esc(S.name)}<br>${S.vat ? "VAT" : "Non-VAT"} reg. TIN ${esc(S.tin)}`;
  const navKey =
    {
      newCorr: "corrections",
      corrreq: "corrections",
      corr: "corrections",
      item: "products",
      newStock: "products",
      stockdoc: "products",
      cmreq: "credits",
      detail: "list",
      receipt: "receipts",
      newReceipt: "receipts",
      credit: "credits",
      newCredit: "credits",
      newDcr: "design",
      dcr: "provider",
    }[view] || view;
  document.querySelectorAll(".navbtn").forEach((b) => {
    const allowed = canView(b.dataset.go);
    b.style.display = allowed ? "" : "none";
    if (allowed) {
      if (b.dataset.go === navKey) b.setAttribute("aria-current", "page");
      else b.removeAttribute("aria-current");
    }
  });
  const open = S.reporting
    ? invoices.filter((i) => i.status === "pending" || i.status === "rejected")
        .length
    : invoices.filter((i) => !delivered(i) && !isCancelled(i)).length;
  const nc = document.getElementById("navCount");
  nc.hidden = !open;
  nc.textContent = open;
  const pc = cmReqs.filter((r) => r.status === "PENDING").length,
    cc = document.getElementById("cmCount");
  cc.hidden = !pc;
  cc.textContent = pc;
  document.getElementById("main").innerHTML = {
    list: vList,
    new: vEditor,
    detail: vDetail,
    log: vLog,
    receipts: vReceipts,
    aging: vAging,
    receipt: vReceipt,
    newReceipt: vNewReceipt,
    credits: vCredits,
    credit: vCredit,
    cmreq: vCmReq,
    newCredit: vNewCredit,
    ready: vReady,
    settings: vSettings,
    design: vDesign,
    fx: vFX,
    acct: vAcct,
    branches: vBranches,
    users: vUsers,
    corrections: vCorrections,
    newCorr: vNewCorr,
    corrreq: vCorrReq,
    corr: vCorr,
    verify: vVerify,
    register: vRegister,
    products: vProducts,
    item: vItem,
    newStock: vNewStock,
    stockdoc: vStockDoc,
    tally: vTally,
    customers: vCustomers,
    newDcr: vNewDcr,
    provider: vProvider,
    dcr: vDcr,
  }[view]();
  {
    const sb = storageBanner();
    if (sb)
      document.getElementById("main").insertAdjacentHTML("afterbegin", sb);
  }
  if (view === "new") refreshEditor();
  if (view === "newStock") refreshSD();
  if (view === "newCorr") refreshCR();
  {
    const pc = corrReqs.filter((r) => r.status === "PENDING").length,
      el = document.getElementById("crCount");
    if (el) {
      el.hidden = !pc;
      el.textContent = pc;
    }
  }
  if (view === "newReceipt") refreshR();
  if (view === "newCredit") refreshC();
  renderQRs();
}

/* ================= Invoice list ================= */
function certBanner() {
  if (S.eisCert) return "";
  const due = addMonths(S.ptiDate, 6);
  return `<div class="banner info"><strong>EIS Certification due by ${dDate(due)}.</strong> RMC 98-2026 requires it within 6 months of your PTI Electronic Invoice (${esc(S.ptiNo)}); missing it is a ground for revoking the PTI.</div>`;
}
function vList() {
  const INV = invoices.filter((i) => inBr(i.branch));
  const act = INV.filter((i) => !isCancelled(i)),
    notSent = act.filter((i) => !delivered(i));
  const total = act.reduce(
    (a, i) => a + toPHP(i, calc(i).due - creditTotal(i.no)),
    0,
  );
  const pend = INV.filter((i) => i.status === "pending"),
    rej = INV.filter((i) => i.status === "rejected");
  const kr = kRequests.filter((r) => r.status === "OPEN" && inBr(r.branch));
  return `${kr.length && (can("approve") || can("settings")) ? `<div class="banner info"><strong>${kr.length} counter request${kr.length > 1 ? "s" : ""} waiting.</strong><ul class="dl" style="margin:6px 0 0">${kr.map((r) => `<li>${r.id}: ${esc(r.kind)}${r.invNo ? ` (Invoice No. <button class="btn link" data-open="${r.invNo}">${r.invNo}</button>)` : ""}${r.note ? `, ${esc(r.note)}` : ""}<br><span class="due">${esc(r.by)}, ${fmtDate(r.at)}</span> <button class="btn link" data-act="kdone" data-id="${r.id}">Mark handled</button></li>`).join("")}</ul></div>` : ""}<div class="head"><div><h1>Invoices</h1><p class="sub">Issued e-invoices cannot be edited or deleted. Corrections go through a credit memo or a new invoice.</p></div>
  ${can("ops") && me().roleCode !== "AUDITOR" ? '<button class="btn primary" data-go="new">New invoice</button>' : ""}</div>
  ${certBanner()}
  <div class="stats">
   <div class="stat"><b>${peso(total)}</b><span>Total amount due, net of credit memos</span></div>
   <div class="stat${notSent.length ? " alert" : ""}"><b>${notSent.length}</b><span>Not yet sent electronically to buyer</span></div>
   <div class="stat"><b>${credits.length}</b><span>Credit memos issued</span></div>
   ${
     S.reporting
       ? `<div class="stat${pend.length || rej.length ? " alert" : ""}"><b>${pend.length + rej.length}</b><span>Awaiting or rejected in sales reporting</span></div>`
       : `<div class="stat"><b>${Math.max(0, Math.ceil((MANDATE - now()) / DAY))} days</b><span>Until the December 31, 2026 e-invoicing deadline</span></div>`
   }
  </div>
  ${S.reporting && pend.length && me().roleCode !== "AUDITOR" ? `<div style="margin-bottom:12px"><button class="btn" data-act="sendall">Transmit all pending (${pend.length})</button></div>` : ""}
  <div class="tablewrap"><table><thead><tr><th>Invoice no.</th><th>Branch</th><th>Date</th><th>Buyer</th><th>Format</th><th class="num">Amount due</th><th>Sent to buyer</th><th>Collection</th><th>Sales reporting</th></tr></thead><tbody>
  ${INV.slice()
    .sort((a, b) => b.issuedAt - a.issuedAt)
    .map(
      (i) =>
        `<tr class="row" data-open="${i.no}" tabindex="0"><td><strong>${i.no}</strong>${i.refs.manual ? ' <span class="due">(replaces manual)</span>' : ""}</td><td>${esc(brOf(i.branch).name)}<br><span class="due">${i.branch}</span></td><td>${fmtDate(i.issuedAt)}</td><td>${esc((i.buyer || cust(i.customerId)).name)}</td><td><span class="pill fmt">${formatOf(i)}</span> ${i.salesType === "CASH" ? "Cash" : "Charge"}</td><td class="num">${money(i, calc(i).due)}${isFX(i) ? `<br><span class="due">${peso(toPHP(i, calc(i).due))}</span>` : ""}${creditsOf(i.no).length ? `<br><span class="due">less CM ${money(i, creditTotal(i.no))}</span>` : ""}</td><td>${delivered(i) ? '<span class="pill s-paid">Sent</span>' : isCancelled(i) ? "—" : '<span class="pill s-pending">Not yet</span>'}</td><td>${collPill(i)}</td><td>${reportPill(i)} ${dueInfo(i)}</td></tr>`,
    )
    .join("")}
  </tbody></table></div>
  <p class="note">Prototype with sample data. Nothing is sent to the BIR or to buyers.</p>`;
}

/* ================= Invoice editor ================= */
function vEditor() {
  const d = draft,
    c = cust(d.customerId),
    TAX = d.vat ? TAX_VAT : TAX_NV,
    x = d.refs;
  const refNote = x.reissueOf
    ? `Replacement for Invoice No. ${x.reissueOf} (cancelled by Credit Memo No. ${x.cancelledBy})`
    : x.addlFor
      ? `Additional billing for Invoice No. ${x.addlFor}`
      : "";
  return `<div class="head"><div><h1>New invoice</h1><p class="sub">Issuing branch: ${esc(brLabel(d.branch))}, TIN ${esc(brTin(d.branch))}. Invoice No. ${d.no}, next in its series ${ser("inv", d.branch)[0]}–${ser("inv", d.branch)[1]}${refNote ? ". " + refNote : ""}</p></div><button class="btn" data-go="list">Cancel</button></div>
  <div class="grid2"><div class="stack">
   <div class="panel"><h2>Sale</h2>
    <div class="fields"><div><span class="lbl">Type of sale</span><div class="seg" role="radiogroup" aria-label="Type of sale">
      <label><input type="radio" name="st" value="CASH" data-f="salesType"${d.salesType === "CASH" ? " checked" : ""}>Cash sales</label><label><input type="radio" name="st" value="CHARGE" data-f="salesType"${d.salesType === "CHARGE" ? " checked" : ""}>Charge sales</label></div></div>
     <div><span class="lbl">Seller registration</span><div class="ro">${d.vat ? "VAT-registered" : "Non-VAT (percentage tax)"}</div></div></div>
    ${d.salesType === "CASH" ? payFields(d.pay || { method: "CASH" }, "data-pay") : `${termsFields(d, "data-f")}<p class="hint" style="margin:0">Charge sale: the invoice prints as unpaid with its terms; payment will be acknowledged by a Collection Receipt.</p>`}
    <div class="fields" style="margin-top:12px"><div><label for="cur">Currency</label><select id="cur" data-f="cur">${Object.entries(
      CURRENCIES,
    )
      .map(
        ([k, c]) =>
          `<option value="${k}"${curOf(d) === k ? " selected" : ""}>${k}, ${c.name}</option>`,
      )
      .join("")}</select></div>
     <div><span class="lbl">Exchange rate</span><div class="ro">${
       isFX(d)
         ? (() => {
             const f = rateFor(curOf(d), d.txnDate);
             return f
               ? `₱${f.rate.toFixed(4)} per ${curOf(d)} (${f.source}, ${isoDate(f.date)})`
               : `No ${CURRENCIES[curOf(d)].src} rate on file for this date`;
           })()
         : "Not applicable (peso sale)"
     }</div></div></div>
    <div class="fields" style="margin-top:12px"><div><span class="lbl">Nature of sale</span><div class="seg" role="radiogroup" aria-label="Nature of sale">
      <label><input type="radio" name="ns" value="GOODS" data-f="nature"${d.nature === "GOODS" ? " checked" : ""}>Goods</label><label><input type="radio" name="ns" value="SERVICES" data-f="nature"${d.nature === "SERVICES" ? " checked" : ""}>Services</label></div></div>
     <div><label for="txd">${d.nature === "SERVICES" ? "Date of transaction (service rendered or billed)" : "Date of transaction"}</label><input id="txd" type="date" data-f="txnDate" value="${esc(d.txnDate)}" max="${todayISO()}"></div></div>
    <label class="inline"><input type="checkbox" data-f="manual"${x.manual ? " checked" : ""}> This replaces a manual invoice issued during system downtime</label>
    ${x.manual ? `<div class="fields" style="margin-top:10px"><div><label for="mno">Manual invoice no.</label><input id="mno" data-f="mno" value="${esc(x.manual.no)}" placeholder="From ${esc(S.manualSeries)}"></div><div><label for="mdt">Date issued</label><input id="mdt" type="date" data-f="mdt" value="${esc(x.manual.date)}"></div></div>` : ""}
   </div>
   <div class="panel"><h2>Sold to</h2>${pickerHtml("inv", d.customerId, !!(x.reissueOf || x.addlFor || x.aggregate))}</div>
   <div class="panel items"><h2>Item description or nature of service</h2><div style="overflow-x:auto"><table><thead><tr><th>Item (SKU)</th><th style="width:30%">Description</th><th>Quantity</th><th>Unit cost/price</th><th>Tax treatment</th><th>Line discount</th><th class="num">Amount</th><th></th></tr></thead><tbody>
    ${d.items
      .map(
        (
          it,
          k,
        ) => `<tr><td><input aria-label="Item or SKU" list="skulist" value="${esc(it.skuText ?? (it.sku ? skuLabel(itemById(it.itemId) || { sku: it.sku, desc: it.desc }) : ""))}" data-i="${k}" data-k="sku" placeholder="Type SKU or name" style="width:150px"><br>${itemSelect(`data-isel="${k}"`, it.itemId, draft.branch, false)}${it.itemId && itemById(it.itemId) && itemById(it.itemId).type === "GOODS" ? `<br><span class="due">On hand at ${esc(brOf(draft.branch).name)}: ${fmtQty(onHand(it.itemId, draft.branch))} ${esc(it.uom || "")}</span>` : ""}</td><td><input aria-label="Description" value="${esc(it.desc)}" data-i="${k}" data-k="desc" placeholder="Goods sold or service rendered"></td>
     <td><input aria-label="Quantity" type="number" min="0" step="any" value="${it.qty}" data-i="${k}" data-k="qty" style="width:80px"></td>
     <td><input aria-label="Unit cost or price" type="number" min="0" step="0.01" value="${it.price}" data-i="${k}" data-k="price" style="width:120px"></td>
     <td><select aria-label="Tax treatment" data-i="${k}" data-k="tax">${Object.entries(
       TAX,
     )
       .map(
         ([v, l]) =>
           `<option value="${v}"${v === it.tax ? " selected" : ""}>${l}</option>`,
       )
       .join("")}</select></td>
     <td><input aria-label="Line discount" type="number" min="0" step="0.01" value="${it.disc}" data-i="${k}" data-k="disc" style="width:100px"></td>
     <td class="num" data-amt="${k}">${peso(lineShown(it))}</td><td><button class="x" data-del="${k}" aria-label="Remove item">×</button></td></tr>`,
      )
      .join("")}
   </tbody></table></div><datalist id="skulist">${ITEMS.filter(
     (i) => !i.inactive,
   )
     .map((i) => `<option value="${esc(skuLabel(i))}"></option>`)
     .join(
       "",
     )}</datalist><button class="btn link" data-act="add">Add item</button>
   ${d.vat ? `<label class="inline"><input type="checkbox" data-f="incl"${d.incl ? " checked" : ""}> Unit prices already include VAT</label>` : ""}</div>
   <div class="panel"><h2>Discounts and withholding</h2>
    <div class="fields"><div><label for="pn">Sale or promotional discount</label><input id="pn" data-f="promoName" value="${esc(d.promo.name)}" placeholder="e.g. Anniversary Sale"></div>
     <div><label for="pt">Type</label><select id="pt" data-f="promoType"><option value="PCT"${d.promo.type === "PCT" ? " selected" : ""}>Percentage of sale</option><option value="AMT"${d.promo.type === "AMT" ? " selected" : ""}>Fixed peso amount</option></select></div>
     <div><label for="pv">${d.promo.type === "PCT" ? "Rate (%)" : "Amount (₱)"}</label><input id="pv" type="number" min="0" step="${d.promo.type === "PCT" ? "0.5" : "0.01"}" data-f="promoValue" value="${d.promo.value || ""}"></div></div>
    <p class="hint" style="margin:-4px 0 12px">Applies to the whole invoice, spread over the lines in proportion. For a discount on one item only, use that line's discount. It is shown on the invoice and deducted before VAT is computed.</p>
    <div class="fields"><div><label for="sc">Statutory discount</label><select id="sc" data-f="scpwd"><option value=""${!d.scpwd ? " selected" : ""}>None</option>${Object.entries(
      allTypes(d.txnDate),
    )
      .map(
        ([k, t]) =>
          `<option value="${k}"${d.scpwd === k ? " selected" : ""}>${t.label} (${t.rateNote})${t.custom ? " [added rule]" : ""}</option>`,
      )
      .join("")}</select></div>
     <div><label for="scid">${d.scpwd ? stType(d.scpwd).idLabel : "Beneficiary ID no."}</label><input id="scid" data-f="scId" value="${esc(d.scId || "")}"${d.scpwd ? "" : " disabled"}></div>
     <div><label for="scn">Beneficiary's name</label><input id="scn" data-f="scName" value="${esc(d.scName || "")}"${d.scpwd ? "" : " disabled"}></div>
     <div><label for="wht">Withholding tax by buyer</label><select id="wht" data-f="wht">${WHT.map(([r, l]) => `<option value="${r}"${d.whtMode === "RATE" && r === d.wht ? " selected" : ""}>${l}</option>`).join("")}<option value="custom"${d.whtMode === "PCT" ? " selected" : ""}>Other rate (%)</option><option value="amount"${d.whtMode === "AMT" ? " selected" : ""}>Fixed amount (₱)</option></select></div>
     ${d.whtMode === "PCT" ? `<div><label for="whtp">Rate (%)</label><input id="whtp" type="number" min="0" max="100" step="0.01" data-f="whtPct" value="${esc(d.whtPct || "")}"></div>` : ""}${d.whtMode === "AMT" ? `<div><label for="whta">Amount withheld (₱)</label><input id="whta" type="number" min="0" step="0.01" data-f="whtAmt" value="${esc(d.whtAmt || "")}"></div>` : ""}</div>
    ${d.scpwd ? stExtra(d) + scPanel(d) : `<p class="hint">Choosing a statutory discount opens the line-by-line coverage and comparison.</p>`}</div>
   ${advPanel(d)}
  </div>
  <div class="stack"><div class="panel totals" id="totalsBox"></div><div class="panel"><h2>Before issuing</h2><ul class="checks" id="checksBox"></ul></div>
   <button class="btn primary" id="issueBtn" data-act="issue">Issue e-invoice</button>
   <p class="hint" style="margin:0">Once issued, the invoice is locked. Corrections go through a credit memo or a new invoice.</p>
   <button class="btn link" data-act="preview">Preview printed invoice</button></div></div>
  <div id="previewBox" style="margin-top:18px"></div>`;
}
function advPanel(d) {
  if (!d.customerId || isFX(d)) return "";
  const list = receipts.filter(
    (r) =>
      r.type === "ADVANCE" &&
      r.customerId === d.customerId &&
      (unappliedOf(r) > 0 || d.adv[r.no] != null),
  );
  if (!list.length) return "";
  return `<div class="panel"><h2>Advance payments from this buyer</h2><p class="hint" style="margin:0 0 10px">Apply advances already covered by a Collection Receipt. The invoice shows the full sale and cites the Collection Receipt as proof of payment.</p>
   <div style="overflow-x:auto"><table style="min-width:700px"><thead><tr><th></th><th>Collection Receipt no.</th><th>Received</th><th>For</th><th class="num">Unapplied</th><th>Apply</th></tr></thead><tbody>
   ${list
     .map(
       (
         r,
       ) => `<tr><td><input type="checkbox" aria-label="Apply receipt ${r.no}" data-adv="${r.no}"${d.adv[r.no] != null ? " checked" : ""}></td><td>${r.no}</td><td>${dDate(r.at)}</td><td style="white-space:normal">${esc(r.purpose)}</td><td class="num">${peso(unappliedOf(r))}</td>
    <td><input type="number" step="0.01" min="0" aria-label="Amount to apply" data-advamt="${r.no}" value="${d.adv[r.no] != null ? (d.adv[r.no] / 100).toFixed(2) : ""}"${d.adv[r.no] != null ? "" : " disabled"} style="width:120px"></td></tr>`,
     )
     .join("")}</tbody></table></div></div>`;
}
function stExtra(d) {
  const T = d.scpwd;
  if (T === "MOV")
    return `<div class="fields"><div><label for="mrel">Beneficiary</label><select id="mrel" data-f="movRel"><option value="">Choose</option>${["Awardee", "Widow or widower", "Dependent"].map((x) => `<option${d.movRel === x ? " selected" : ""}>${x}</option>`).join("")}</select></div></div>`;
  if (T === "SP")
    return `<div class="fields"><div><label for="spc">Child's name (aged 6 or under)</label><input id="spc" data-f="spChild" value="${esc(d.spChild || "")}"></div></div><label class="inline" style="margin-top:0"><input type="checkbox" data-f="stConfirm"${d.stConfirm ? " checked" : ""}> Solo Parent ID and booklet seen: income below ₱250,000 and the child's age shown; for medicines, prescription in the child's name</label>`;
  const cr = customRules.find((r) => r.code === T);
  if (cr)
    return `${cr.extraLabel ? `<div class="fields"><div><label for="stx">${esc(cr.extraLabel)}</label><input id="stx" data-f="stExtraVal" value="${esc(d.stExtraVal || "")}"></div></div>` : ""}${cr.confirmText ? `<label class="inline" style="margin-top:0"><input type="checkbox" data-f="stConfirm"${d.stConfirm ? " checked" : ""}> ${esc(cr.confirmText)}</label>` : ""}`;
  if (T === "NAAC")
    return `<label class="inline" style="margin-top:0"><input type="checkbox" data-f="stConfirm"${d.stConfirm ? " checked" : ""}> PNSTM ID and booklet presented; for sports equipment, National Sports Association endorsement seen</label>`;
  return "";
}
function scPanel(d) {
  calc(d);
  const T = d.scpwd,
    st = stType(T),
    g = d.group || { diners: 0, sc: 0 };
  const cr = customRules.find((r) => r.code === T),
    opts = isSCPWD(T)
      ? [
          ["Q20", "20% + VAT exempt"],
          ["BNPC", "5% BNPC"],
          ["NONE", "Not covered"],
        ]
      : [
          [
            "COV",
            cr
              ? `${cr.rate}%${cr.vatExempt ? " + VAT exempt" : " (VAT due)"}`
              : T === "SP"
                ? "10% + VAT exempt"
                : "20% (VAT due)",
          ],
          ["NONE", "Not covered"],
        ];
  return `<div style="border-top:1px solid var(--line);margin-top:10px;padding-top:12px"><h2 style="font-size:15px">${st.label} discount, line by line</h2>
   <p class="hint" style="margin:0 0 10px">For each line the system compares the statutory discount with any sale or line discount and applies whichever is higher. ${isSCPWD(T) || T === "SP" ? "The statutory benefit includes the VAT removed." : "VAT remains due on the full price."}</p>
   <div style="overflow-x:auto"><table style="min-width:640px"><thead><tr><th>Line</th><th>Coverage</th><th class="num">Statutory benefit</th><th class="num">Sale/line discount</th><th>Applied</th></tr></thead><tbody>
   ${d.items
     .map(
       (
         it,
         k,
       ) => `<tr><td style="white-space:normal">${esc(it.desc || "Line " + (k + 1))}</td><td><select aria-label="${st.short} coverage" data-i="${k}" data-k="${isSCPWD(T) ? "scCat" : "stCov"}">${opts.map(([v, l]) => `<option value="${v}"${covOf(it, T) === v ? " selected" : ""}>${l}</option>`).join("")}</select></td>
    <td class="num">${peso(it.scStat || 0)}</td><td class="num">${peso(it.scPromo || 0)}</td><td>${SC_STAT.includes(it.scChoice) ? `<span class="pill s-paid">${choiceLabel(it, T)}</span>` : it.scChoice === "PROMO" && (it.scStat || 0) > 0 ? '<span class="pill s-pending">Sale discount</span>' : `<span class="due">${choiceLabel(it, T)}</span>`}</td></tr>`,
     )
     .join("")}</tbody></table></div>
   ${
     T !== "SP" && (!cr || cr.group)
       ? `<div class="fields" style="margin-top:12px"><div><label for="gd">Group meal: total diners</label><input id="gd" type="number" min="0" step="1" data-f="groupDiners" value="${g.diners || ""}" placeholder="Leave blank if not a group meal"></div>
    <div><label for="gs">Of whom ${st.short}</label><input id="gs" type="number" min="0" step="1" data-f="groupSc" value="${g.sc || ""}"></div></div>
   <p class="hint" style="margin:0">Group meal: where individual orders can't be separated, the discount covers only the beneficiary diners' share.${isSCPWD(T) ? " The 5% BNPC discount is capped at ₱125 per week per ID (JAO 24-02)." : ""}</p>`
       : ""
   }</div>`;
}
function advTotal(d) {
  return Object.values(d.adv || {}).reduce((a, x) => a + x, 0);
}
function totalsHtml(d) {
  const f = formatOf(d),
    c = calc(d),
    fxl =
      isFX(d) && fxOf(d).rate
        ? `<div class="grp">Peso equivalent</div><div><span>Total amount due</span><span>${peso(toPHP(d, c.due))}</span></div><div><span>VAT</span><span>${peso(toPHP(d, c.vatShown || 0))}</span></div>`
        : "",
    lb = leftBox(f, c),
    strip = (s) => s.replace(/<small>.*<\/small>/, "");
  return `<h2>Summary</h2><div style="margin-bottom:6px"><span class="pill fmt">${f}</span> <span class="due">${FORMATS[f]}</span></div>
  ${d.scpwd ? `<div class="grp">${stType(d.scpwd).short} comparison</div>${d.items.map((it) => `<div><span>${esc((it.desc || "Line").slice(0, 28))}</span><span>${choiceLabel(it, d.scpwd)}</span></div>`).join("")}` : ""}
  ${
    promoTotal(d)
      ? `<div class="grp">Sale discount</div><div><span>Sales before discount</span><span>${money(
          d,
          d.items.reduce((a, it) => a + lineGross(it), 0),
        )}</span></div><div><span>Less: ${esc(promoLabel(d))}</span><span>(${money(d, promoTotal(d))})</span></div>`
      : ""
  }
  ${lb ? `<div class="grp">Breakdown</div>${lb.map(([l, v]) => `<div><span>${l}</span><span>${money(d, v)}</span></div>`).join("")}<div class="grp">Computation</div>` : ""}
  ${rightBox(f, c)
    .map(
      ([l, v, b]) =>
        `<div${b ? ' class="grand"' : ""}><span>${b ? "Total amount due" : strip(l)}</span><span>${money(d, v)}</span></div>`,
    )
    .join("")}
  ${fxl}${
    advTotal(d)
      ? `<div class="grp">Receipts register</div>${advRefs(d)
          .map(
            (a) =>
              `<div><span>Less: advance per Collection Receipt No. ${a.no}</span><span>${money(d, a.amount)}</span></div>`,
          )
          .join(
            "",
          )}<div><span>Balance to collect</span><span>${money(d, c.due - advTotal(d))}</span></div>`
      : ""
  }`;
}
function refreshSC() {
  render();
}
function refreshEditor() {
  calc(draft);
  const ch = checks(draft);
  document.getElementById("totalsBox").innerHTML = totalsHtml(draft);
  document.getElementById("checksBox").innerHTML =
    checksHtml(ch) + advHtml(advisories(draft));
  document.getElementById("issueBtn").disabled = !ch.every((x) => x[0]);
  draft.items.forEach((it, k) => {
    const el = document.querySelector(`[data-amt="${k}"]`);
    if (el) el.textContent = peso(lineShown(it));
  });
  const pv = document.getElementById("previewBox");
  if (pv && pv.innerHTML) {
    pv.innerHTML = docInvoice(draft);
    renderQRs();
  }
}
function issue() {
  if (draft) {
    const b = brOf(draft.branch);
    if (b && draft.no < b.next.inv) {
      draft.no = b.next.inv;
    }
  }
  if (!checks(draft).every((x) => x[0])) return;
  const d = draft,
    t = now();
  invoices.push(
    Object.assign(d, {
      issuedBy: userId,
      issuedAt: t,
      status: "pending",
      eisId: eisId(t),
      ack: null,
      reason: null,
      designV: curDesign().v,
    }),
  );
  takeNo("inv", d.branch);
  Object.entries(d.adv || {}).forEach(([n, v]) =>
    receipts
      .find((r) => r.no === +n)
      .applications.push({ invNo: d.no, amount: v, at: t }),
  );
  if (isFX(d)) d.fx = rateFor(curOf(d), d.txnDate || todayISO());
  d.buyer = snap(d.customerId);
  d.seller = sellerSnap(d.branch);
  d.seller.vat = d.vat;
  if (d.refs.aggregate)
    tally
      .filter((t) => d.refs.aggregate.ids.includes(t.id))
      .forEach((t) => (t.invNo = d.no));
  {
    const cu = cust(d.customerId);
    if (S.autoEmail && cu && cu.email && cu.autoEmail !== false)
      d.deliveries.push({ via: "Email (automatic)", to: cu.email, at: now() });
  }
  delete d.adv;
  draft = null;
  slog(
    "Issued invoice",
    `${brLabel(d.branch)}: Invoice No. ${d.no}, ${peso(calc(d).due)}`,
  );
  go("detail", d.no);
  signDoc(d, "INV")
    .then(() => {
      postDbSync("save_invoice", d);
      toast(`E-invoice ${d.no} issued and digitally signed.`);
      render();
    })
    .catch((err) => {
      postDbSync("save_invoice", d);
      toast(`E-invoice ${d.no} issued.`);
      render();
    });
}

/* ================= Invoice detail ================= */
const STEPS = [
  ["Validated", "Required fields and VAT computation checked"],
  ["Signed", "JWS signature with your company's private key"],
  ["Encrypted", "AES-256 encryption for the BIR"],
  ["Transmitted", "Sent to the BIR EIS"],
  ["Acknowledged", "BIR confirms receipt"],
];
function stepState(inv, k) {
  if (inv.status === "accepted") return "done";
  if (inv.status === "rejected") return k < 3 ? "done" : k === 3 ? "fail" : "";
  if (inv.progress != null)
    return k < inv.progress ? "done" : k === inv.progress ? "active" : "";
  return k === 0 ? "done" : "";
}
function validity(inv) {
  return [
    [
      !!S.ptiNo.trim(),
      "Generated by a registered system under PTI Electronic Invoice " +
        esc(S.ptiNo),
    ],
    [true, "Structured format: JSON data generated for every invoice"],
    [
      delivered(inv),
      delivered(inv)
        ? "Transmitted to the buyer electronically"
        : "Not yet transmitted to the buyer electronically (email, online view or QR code)",
    ],
    [true, "Data can be extracted and transmitted for sales reporting"],
    ...(inv.vat && (inv.buyer || cust(inv.customerId)).vatStatus === "VAT"
      ? [
          [
            TIN_RE.test((inv.buyer || cust(inv.customerId)).tin),
            TIN_RE.test((inv.buyer || cust(inv.customerId)).tin)
              ? "Buyer can claim input VAT: registered names and TINs, date, description, sales amount and VAT all shown"
              : "Buyer cannot claim input VAT: buyer's TIN is missing",
          ],
        ]
      : []),
  ];
}
function vDetail() {
  const i = invOf(current),
    c = calc(i),
    cn = creditsOf(i.no),
    cancelled = isCancelled(i),
    b = cust(i.customerId);
  const later = invoices.filter(
    (x) => x.refs.reissueOf === i.no || x.refs.addlFor === i.no,
  );
  return `<div class="head noprint"><div><h1>Invoice No. ${i.no}</h1><p class="sub">Issued ${fmtDate(i.issuedAt)}. Locked: issued e-invoices cannot be edited or deleted. Seller, buyer, design and permit details are frozen as issued.</p></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-go="list">Back to invoices</button><button class="btn" data-act="print">Print copy for buyer</button>
  ${S.reporting && i.status === "pending" && me().roleCode !== "AUDITOR" ? `<button class="btn primary" data-act="send" data-no="${i.no}"${i.progress != null ? " disabled" : ""}>Transmit to BIR</button>` : ""}</div></div>
  <div class="noprint">${
    crApproved(i.no).length
      ? `<div class="banner info"><strong>Buyer details corrected</strong> by Correction Notice No. ${crApproved(
          i.no,
        )
          .map(
            (c) =>
              `<button class="btn link" data-opencr="${c.no}">${c.no}</button>`,
          )
          .join(", ")}: ${crApproved(i.no)
          .flatMap((c) => c.changes)
          .map(
            (x) =>
              `${CR_FIELDS[x.field].replace("Buyer's ", "")} now "${esc(x.to)}"`,
          )
          .join("; ")}. The invoice below is shown as issued.</div>`
      : ""
  }${corrReqs
    .filter((r) => r.invNo === i.no && r.status === "PENDING")
    .map(
      (r) =>
        `<div class="banner info">Correction request <button class="btn link" data-opencrr="${r.id}">${r.id}</button> is awaiting approval.</div>`,
    )
    .join(
      "",
    )}${cancelled ? `<div class="banner bad"><strong>Cancelled</strong> in full by Credit Memo No. ${cn.map((x) => x.no).join(", ")}.</div>` : ""}
  ${S.reporting && i.status === "rejected" ? `<div class="banner bad"><strong>Rejected in sales reporting.</strong> ${esc(i.reason)} Cancel it with a credit memo and issue a corrected invoice.</div>` : ""}</div>
  <div class="grid2"><div>${docInvoice(i)}</div>
   <div class="stack noprint">
    <div class="panel"><h2>E-invoice validity</h2><ul class="checks">${validity(
      i,
    )
      .map(([ok, l]) => `<li class="${ok ? "ok" : "no"}">${l}</li>`)
      .join("")}</ul></div>
    <div class="panel"><h2>Send to buyer</h2>
     ${i.deliveries.length ? `<ul class="dl">${i.deliveries.map((d) => `<li><b>${d.via}</b>, ${esc(d.to)}<br><span class="due">${fmtDate(d.at)}</span></li>`).join("")}</ul>` : `<p class="due" style="margin:0 0 10px">Not yet sent.</p>`}
     ${me().roleCode !== "AUDITOR" ? `<div class="row3"><div><label for="em">Buyer email</label><input id="em" type="email" value="${esc(b.email || "")}" placeholder="name@company.ph"></div><button class="btn" data-act="email" data-no="${i.no}">Email e-invoice</button></div>
     <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn" data-act="link" data-no="${i.no}">Copy online view link</button><button class="btn" data-act="qrshown" data-no="${i.no}">Buyer scanned QR code</button></div>
     <p class="hint">A printed copy is given on request or when electronic delivery isn't practicable (B2C). Use "Print copy for buyer".</p>` : `<p class="hint">Auditor inspection mode: delivery audit history is shown above.</p>`}
     ${i.verifyUrl ? `<button class="btn link" data-verify="INV:${i.no}">Open the verification page for this invoice</button>` : ""}</div>
    <div class="panel"><h2>Adjustments</h2>
     ${cmReqs
       .filter((r) => r.invNo === i.no && r.status === "PENDING")
       .map(
         (r) =>
           `<p style="margin:0 0 8px"><button class="btn link" data-opencmr="${r.id}">${r.id}</button> <span class="pill s-pending">Awaiting approval</span> ${peso(cnCalc(r).due)}</p>`,
       )
       .join(
         "",
       )}${cn.length || later.length ? `<ul class="dl">${cn.map((x) => `<li><button class="btn link" data-opencn="${x.no}">Credit Memo No. ${x.no}</button> ${esc(x.reason)}<br><span class="due">${dDate(x.at)}, ${peso(cnCalc(x).due)} credited</span></li>`).join("")}${later.map((x) => `<li><button class="btn link" data-open="${x.no}">Invoice No. ${x.no}</button> ${x.refs.reissueOf ? "replacement invoice" : "additional billing"}<br><span class="due">${dDate(x.issuedAt)}, ${peso(calc(x).due)}</span></li>`).join("")}</ul>` : `<p class="due" style="margin:0 0 10px">No adjustments.</p>`}
     ${cancelled || me().roleCode === "AUDITOR" ? "" : `<div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-act="cm" data-no="${i.no}">Issue credit memo</button><button class="btn" data-act="addl" data-no="${i.no}">Bill additional amount</button><button class="btn" data-act="reissue" data-no="${i.no}">Cancel and reissue</button><button class="btn" data-act="crnew" data-no="${i.no}">Correct buyer details</button></div>`}
     <p class="hint">Decrease: credit memo. Increase: new e-invoice. Both reference this invoice.</p></div>
    <div class="panel"><h2>Collection</h2>${collPanel(i, c)}</div>
    <div class="panel"><h2>Electronic sales reporting</h2>
     ${
       S.reporting
         ? `${pill(i.status)} <div style="margin-top:6px">${dueInfo(i)}</div><ol class="pipeline" style="margin-top:14px">${STEPS.map(([t, s], k) => `<li class="${stepState(i, k)}"><div><b>${t}</b><small>${s}</small></div></li>`).join("")}</ol>`
         : `${pill("notreq")}<p class="hint">Under RMC 98-2026, sales reporting under Sec. 237-A applies only once the BIR issues its implementing guidelines, and a Permit to Transmit only upon the Commissioner's directive. The data below is ready when that happens.</p>`
     }
     <div class="eisid" style="margin-top:10px">${i.eisId}</div><button class="btn link" data-act="json">${showJson ? "Hide" : "Show"} structured data (JSON)</button>
     ${showJson ? `<pre>${esc(JSON.stringify(buildJson(i), null, 2))}</pre>` : ""}</div>
   </div></div>`;
}
function collPanel(i, c) {
  if (i.salesType === "CASH")
    return `<p style="margin:0">Cash sale. Payment of ${money(i, c.due)} is acknowledged on the invoice itself.${creditsOf(i.no).length ? ` Credit memos of ${money(i, creditTotal(i.no))} are to be refunded.` : ""}</p>`;
  const col = collections(i.no),
    bal = balanceOf(i),
    ct = creditTotal(i.no),
    dd = dueDateOf(i),
    od = daysBetween(dd, todayISO());
  return (
    `<p style="margin:0 0 8px"><b>${esc(TERMS[i.terms || "NET30"][0])}</b>, due ${isoDate(dd)}${bal > 0 ? (od > 0 ? ` <span class="pill s-rejected">Overdue ${od} day${od === 1 ? "" : "s"}</span>` : od === 0 ? " (due today)" : ` (${-od} day${od === -1 ? "" : "s"} left)`) : ""}</p><p class="due" style="margin:0 0 8px">${i.nature === "SERVICES" ? "Service" : "Sale"} dated ${i.txnDate ? isoDate(i.txnDate) : dDate(i.issuedAt)}. Payments before this date are advances; payments after it are collections.</p>` +
    `${col.length ? `<ul class="dl">${col.map((x) => `<li><button class="btn link" data-openr="${x.r.no}">Collection Receipt No. ${x.r.no}</button> ${money(i, x.amount)}<br><span class="due">${x.r.type === "ADVANCE" ? "Advance received " + dDate(x.r.at) + ", applied " + dDate(x.at) : "Collected " + dDate(x.at)}</span></li>`).join("")}</ul>` : ""}
   <div class="totals"><div><span>Total amount due</span><span>${money(i, c.due)}</span></div>${ct ? `<div><span>Less: credit memos</span><span>${money(i, ct)}</span></div>` : ""}${
     col.length
       ? `<div><span>Less: collections</span><span>${money(
           i,
           col.reduce((a, x) => a + x.amount, 0),
         )}</span></div>`
       : ""
   }
   <div class="grand"><span>${bal < 0 ? "Overpayment" : "Balance"}</span><span>${money(i, Math.abs(bal))}</span></div></div>
   ${bal > 0 && me().roleCode !== "AUDITOR" ? `<button class="btn" style="margin-top:10px" data-act="payinv" data-no="${i.no}">Record payment</button>` : ""}`
  );
}
function buildJson(i) {
  const b = i.buyer || cust(i.customerId),
    c = calc(i),
    p = (v) => (v / 100).toFixed(2);
  return {
    SpecVersion: "2.01",
    EisUniqueId: i.eisId,
    DocumentType: "INVOICE",
    InvoiceFormat: formatOf(i),
    InvoiceNo: String(i.no),
    IssueDateTime: new Date(i.issuedAt).toISOString(),
    SalesType: i.salesType,
    PtiElectronicInvoiceNo: (i.seller || S).ptiNo,
    Branch: (i.seller || sellerSnap(i.branch)).branch,
    BranchCode: i.branch,
    Seller: {
      RegisteredName: (i.seller || S).name,
      TradeName: (i.seller || S).trade,
      TIN: (i.seller || S).tin,
      VatRegistered: i.vat,
      Address: (i.seller || S).address,
    },
    Buyer: {
      RegisteredName: b.name,
      TIN: b.vatStatus === "FOREIGN" ? null : b.tin || null,
      Address: b.address,
      BuyerType: b.vatStatus || null,
      Country: b.country || null,
      ForeignTaxId: b.foreignTaxId || null,
    },
    Items: i.items.map((it) => ({
      ItemCode: it.sku || null,
      UnitOfMeasure: it.uom || null,
      Description: it.desc,
      Quantity: String(it.qty),
      UnitCost: p(cents(it.price)),
      TaxTypeChange: it.taxReason
        ? {
            From: it.taxReason.from,
            Reason: it.taxReason.reason,
            Document: it.taxReason.ref,
            ChangedBy: it.taxReason.by,
            ApprovedBy: it.taxReason.approvedBy || null,
          }
        : undefined,
      Discount: p(cents(it.disc)),
      SaleDiscount: p(it.promo || 0),
      TaxType: it.tax,
      Amount: p(lineNet(it)),
    })),
    SaleDiscount: promoTotal(i)
      ? {
          Name: i.promo.name,
          Type: i.promo.type === "PCT" ? "PERCENT" : "AMOUNT",
          Rate: i.promo.type === "PCT" ? i.promo.value : null,
          Amount: p(promoTotal(i)),
        }
      : null,
    PricesVatInclusive: !!i.incl,
    VatableSales: p(c.vatable),
    VatAmount: p(c.vatShown),
    ZeroRatedSales: p(c.zero),
    VatExemptSales: p(c.exempt),
    SalesSubjectToPercentageTax: p(c.sspt),
    TotalSales: p(c.totalSales),
    LessVat: p(c.lessVat),
    NetOfVat: p(c.netOfVat),
    StatutoryDiscount: i.scpwd
      ? {
          Type: i.scpwd,
          Law: stType(i.scpwd).law,
          IdNo: i.scId,
          BeneficiaryName: i.scName || null,
          Beneficiary: i.movRel || null,
          ChildName: i.spChild || null,
          OtherDetail: i.stExtraVal || null,
          RuleRate: stType(i.scpwd).rate || null,
          Amount: p(c.disc),
          GroupMeal:
            groupFactor(i) < 1
              ? { Diners: i.group.diners, ScPwdDiners: i.group.sc }
              : null,
          Lines: i.items.map((it, k) => ({
            Line: k + 1,
            Coverage: covOf(it, i.scpwd),
            Applied: it.scChoice || "NONE",
            BnpcDiscount: it.scChoice === "BNPC5" ? p(it.bnpcDisc || 0) : null,
          })),
        }
      : null,
    AddVat: p(c.addVat),
    WithholdingTax: p(c.wht),
    TotalAmountDue: p(c.due),
    NatureOfSale: i.nature || "GOODS",
    TransactionDate: i.txnDate || todayISO(i.issuedAt),
    ProofOfPayment: advRefs(i).map((a) => ({
      CollectionReceiptNo: String(a.no),
      Date: new Date(a.at).toISOString().slice(0, 10),
      Amount: (a.amount / 100).toFixed(2),
    })),
    Payment:
      i.salesType === "CASH"
        ? {
            Method: (i.pay || { method: "CASH" }).method,
            Details: payText(i.pay),
          }
        : {
            Method: "CHARGE",
            Status: "UNPAID_AT_ISSUANCE",
            Terms: TERMS[i.terms || "NET30"][0],
            DueDate: dueDateOf(i),
          },
    Currency: curOf(i),
    ExchangeRate: isFX(i) ? fxOf(i).rate : 1,
    RateSource: isFX(i) ? fxOf(i).source : null,
    RateDate: isFX(i) ? fxOf(i).date : null,
    TotalAmountDuePHP: p(toPHP(i, c.due)),
    VatAmountPHP: p(toPHP(i, c.vatShown || 0)),
    References: {
      AggregateDailySales: i.refs.aggregate
        ? { Date: i.refs.aggregate.day, Count: i.refs.aggregate.ids.length }
        : null,
      ReplacesManualInvoice: i.refs.manual
        ? { No: i.refs.manual.no, Date: i.refs.manual.date }
        : null,
      ReplacesInvoiceNo: i.refs.reissueOf ? String(i.refs.reissueOf) : null,
      AdditionalBillingForInvoiceNo: i.refs.addlFor
        ? String(i.refs.addlFor)
        : null,
    },
  };
}
function cnJson(cn) {
  const inv = invOf(cn.invNo),
    c = cnCalc(cn),
    p = (v) => (v / 100).toFixed(2);
  return {
    SpecVersion: "2.01",
    EisUniqueId: cn.eisId,
    DocumentType: "CREDIT_MEMO",
    CreditMemoNo: String(cn.no),
    IssueDateTime: new Date(cn.at).toISOString(),
    ReferenceInvoiceNo: String(inv.no),
    ReferenceEisUniqueId: inv.eisId,
    Reason: cn.reason,
    PtiElectronicInvoiceNo: (cn.seller || S).ptiNo,
    PreparedBy: cn.preparedBy ? cn.preparedBy.name : null,
    PreparedAt: cn.preparedAt ? new Date(cn.preparedAt).toISOString() : null,
    ApprovedBy: cn.approvedBy ? cn.approvedBy.name : null,
    ApprovedAt: cn.approvedAt ? new Date(cn.approvedAt).toISOString() : null,
    Lines: cn.lines.map((l) => ({
      Description: inv.items[l.src].desc,
      TaxType: inv.items[l.src].tax,
      Amount: p(l.amount),
    })),
    VatableSales: p(c.vatable),
    VatAmount: p(c.vatShown),
    ZeroRatedSales: p(c.zero),
    VatExemptSales: p(c.exempt),
    WithholdingTax: p(c.wht),
    TotalAmountCredited: p(c.due),
  };
}

/* ================= Credit memo views ================= */
function vCredits() {
  const pend = cmReqs
    .filter((r) => r.status !== "APPROVED" && inBr(invOf(r.invNo).branch))
    .slice()
    .reverse();
  return `<div class="head"><div><h1>Credit memos</h1><p class="sub">Decreases to issued e-invoices. Each is prepared, then approved by a different authorized person before it is numbered and issued.</p></div></div>
  ${
    pend.length
      ? `<h2>Awaiting approval or declined</h2><div class="tablewrap" style="margin-bottom:18px"><table><thead><tr><th>Request</th><th>Prepared</th><th>Reference invoice</th><th>Reason</th><th class="num">Amount</th><th>Status</th></tr></thead><tbody>
   ${pend.map((r) => `<tr class="row" data-opencmr="${r.id}" tabindex="0"><td><strong>${r.id}</strong></td><td>${esc(r.preparedBy.name)}<br><span class="due">${fmtDate(r.preparedAt)}</span></td><td>${r.invNo}</td><td>${esc(r.reason)}</td><td class="num">${peso(cnCalc(r).due)}</td><td>${r.status === "PENDING" ? '<span class="pill s-pending">Awaiting approval</span>' : '<span class="pill s-rejected">Declined</span>'}</td></tr>`).join("")}</tbody></table></div><h2>Issued credit memos</h2>`
      : ""
  }
  ${
    credits.length
      ? `<div class="tablewrap"><table><thead><tr><th>Credit memo no.</th><th>Date</th><th>Buyer</th><th>Reference invoice</th><th>Reason</th><th>Prepared / approved by</th><th class="num">Amount credited</th></tr></thead><tbody>
  ${credits
    .filter((x) => inBr(invOf(x.invNo).branch))
    .slice()
    .sort((a, b) => b.at - a.at)
    .map(
      (x) =>
        `<tr class="row" data-opencn="${x.no}" tabindex="0"><td><strong>${x.no}</strong></td><td>${fmtDate(x.at)}</td><td>${esc(cust(invOf(x.invNo).customerId).name)}</td><td>${x.invNo}</td><td>${esc(x.reason)}</td><td>${esc(x.preparedBy ? x.preparedBy.name : "—")} / ${esc(x.approvedBy ? x.approvedBy.name : "—")}</td><td class="num">${money(invOf(x.invNo), cnCalc(x).due)}</td></tr>`,
    )
    .join("")}</tbody></table></div>`
      : `<div class="panel empty">No credit memos yet. Issue one from the invoice you need to reduce.</div>`
  }`;
}
function vCredit() {
  const x = credits.find((c) => c.no === current),
    inv = invOf(x.invNo),
    re = invoices.find((i) => i.refs.cancelledBy === x.no);
  return `<div class="head noprint"><div><h1>Credit Memo No. ${x.no}</h1><p class="sub">${esc(x.reason)}, issued ${fmtDate(x.at)}</p></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-go="credits">Back to credit memos</button><button class="btn" data-open="${inv.no}">View Invoice No. ${inv.no}</button><button class="btn" data-act="print">Print</button></div></div>
  <div class="grid2"><div>${docCredit(x)}</div><div class="stack noprint">
   <div class="panel"><h2>Trace</h2><ul class="dl"><li>Reduces <button class="btn link" data-open="${inv.no}">Invoice No. ${inv.no}</button><br><span class="due">Original invoice amount ${peso(calc(inv).due)}; after credit memos ${peso(calc(inv).due - creditTotal(inv.no))}</span></li>
    ${re ? `<li>Replaced by <button class="btn link" data-open="${re.no}">Invoice No. ${re.no}</button></li>` : ""}</ul>
    ${x.reason === "Cancellation of invoice" && !re && me().roleCode !== "AUDITOR" ? `<button class="btn primary" data-act="reissuenow" data-cn="${x.no}">Issue replacement invoice</button>` : ""}</div>
   <div class="panel"><h2>Send to buyer</h2>
    ${(x.deliveries || []).length ? `<ul class="dl">${x.deliveries.map((d) => `<li><b>${d.via}</b>, ${esc(d.to)}<br><span class="due">${fmtDate(d.at)}</span></li>`).join("")}</ul>` : `<p class="due" style="margin:0 0 10px">Not yet sent. The buyer should be informed so a VAT-registered buyer reduces its input VAT.</p>`}
    ${me().roleCode !== "AUDITOR" ? `<div class="row3"><div><label for="cem">Buyer email</label><input id="cem" type="email" value="${esc((cust(inv.customerId) || {}).email || "")}"></div><button class="btn" data-act="cnemail" data-cn="${x.no}">Email credit memo</button></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:10px"><button class="btn" data-act="cnlink" data-cn="${x.no}">Copy online view link</button><button class="btn" data-act="cnack" data-cn="${x.no}">Buyer signed printed copy</button></div>
    <p class="hint">Delivery by email or online view serves as the buyer's notice for the electronic memo; a signed "Received by" line serves for a printed copy.</p>` : `<p class="hint">Auditor inspection mode: delivery audit history is shown above.</p>`}</div>
   <div class="panel"><h2>Authorization</h2><ul class="dl"><li><b>Prepared by</b> ${esc(x.preparedBy ? x.preparedBy.name + ", " + x.preparedBy.role : "—")}<br><span class="due">${x.preparedAt ? fmtDate(x.preparedAt) : ""}</span></li>
    <li><b>Approved by</b> ${esc(x.approvedBy ? x.approvedBy.name + ", " + x.approvedBy.role : "—")}<br><span class="due">${x.approvedAt ? fmtDate(x.approvedAt) : ""}${x.approvalNote ? ". " + esc(x.approvalNote) : ""}</span></li>
    <li><b>PTI Electronic Invoice</b> ${esc((x.seller || S).ptiNo)}<br><span class="due">${esc((x.seller || S).branch)}; credit memo series ${esc((x.seller || {}).cn || "")}</span></li></ul></div>
   <div class="panel"><h2>Structured data</h2><p class="hint" style="margin-top:0">${S.reporting ? "Included in electronic sales reporting." : "Ready for sales reporting once the BIR requires it."}</p>
    <button class="btn link" data-act="json">${showJson ? "Hide" : "Show"} JSON</button>${showJson ? `<pre>${esc(JSON.stringify(cnJson(x), null, 2))}</pre>` : ""}</div></div></div>`;
}
function vCmReq() {
  const r = cmReqs.find((x) => x.id === current),
    inv = invOf(r.invNo),
    u = me(),
    own = r.preparedBy.id === u.id;
  const draftDoc = Object.assign(
    { no: null, at: now(), eisId: null, designV: curDesign().v },
    r,
    { approvedBy: null, approvedAt: null },
  );
  return `<div class="head"><div><h1>${r.id}: credit memo request</h1><p class="sub">${esc(r.reason)} on Invoice No. ${inv.no}. Prepared by ${esc(r.preparedBy.name)}, ${fmtDate(r.preparedAt)}.</p></div><button class="btn" data-go="credits">Back to credit memos</button></div>
  <div class="grid2"><div>${docCredit(draftDoc)}</div><div class="stack">
   <div class="panel"><h2>Approval</h2>
    ${
      r.status === "PENDING"
        ? u.roleCode === "AUDITOR"
          ? `<p class="due">Auditor read-only inspection mode.</p>`
          : !u.approver
            ? `<p style="margin:0">Waiting for an authorized approver. You are signed in as ${esc(u.name)} (${esc(u.role)}), who cannot approve credit memos.</p><p class="hint">Switch the "Signed in as" user in the menu to Jose Reyes or Ana Cruz to try approving.</p>`
            : own
              ? `<p style="margin:0">You prepared this request, so someone else must approve it.</p>`
              : `<label for="apn">Note (required if declining)</label><input id="apn" placeholder="e.g. Returned goods inspected and received"><div style="display:flex;gap:8px;margin-top:10px"><button class="btn primary" data-act="cmapprove">Approve and issue</button><button class="btn" data-act="cmreject">Decline</button></div><p class="hint">Approving assigns ${esc(brOf(inv.branch).name)} Credit Memo No. ${nextNo("cn", inv.branch)} and records you as approver. Your approval limit: ${peso(u.limit)}; this memo: ${peso(cnCalc(r).due)}.</p>`
        : r.status === "APPROVED"
          ? `<p style="margin:0">Approved and issued as <button class="btn link" data-opencn="${r.cnNo}">Credit Memo No. ${r.cnNo}</button>.</p>`
          : `<p style="margin:0">Declined. No credit memo was issued.</p>`
    }</div>
   <div class="panel"><h2>History</h2><ul class="dl">${r.history.map((h) => `<li>${esc(h.act)}<br><span class="due">${fmtDate(h.at)}, ${esc(h.by)}</span></li>`).join("")}</ul></div></div></div>`;
}
function goNewC(invNo, reason, full, reissue) {
  const inv = invOf(invNo);
  draftC = {
    invNo,
    reason: reason || "",
    note: "",
    amts: {},
    qtys: {},
    reissue: !!reissue,
  };
  if (full)
    inv.items.forEach((it, k) => {
      const r =
        lineNet(it) - creditedOnLine(invNo, k) - pendingOnLine(invNo, k);
      if (r > 0) {
        draftC.amts[k] = r;
        if (isStockLine(it))
          draftC.qtys[k] = Number(it.qty) - returnedQty(invNo, k);
      }
    });
  view = "newCredit";
  current = null;
  render();
  window.scrollTo(0, 0);
}
function cnDraftObj() {
  const inv = invOf(draftC.invNo);
  return {
    invNo: draftC.invNo,
    lines: Object.entries(draftC.amts)
      .filter(([k, v]) => v > 0)
      .map(([k, v]) => {
        const l = { src: +k, amount: v };
        if (qtyMode(draftC) && isStockLine(inv.items[+k]) && draftC.qtys[k] > 0)
          l.qty = Number(draftC.qtys[k]);
        return l;
      }),
  };
}
function vNewCredit() {
  const d = draftC,
    inv = invOf(d.invNo);
  return `<div class="head"><div><h1>New credit memo</h1><p class="sub">Prepared by ${esc(me().name)}. The number is assigned when an approver issues it. Reducing Invoice No. ${inv.no} of ${esc(cust(inv.customerId).name)}</p></div><button class="btn" data-open="${inv.no}">Cancel</button></div>
  <div class="grid2"><div class="stack">
   <div class="panel"><h2>Reason</h2><div class="fields"><div><label for="cr">Reason for the credit</label><select id="cr" data-c="reason"><option value="">Choose a reason</option>${REASONS.map((r) => `<option${r === d.reason ? " selected" : ""}>${r}</option>`).join("")}</select></div>
    <div style="grid-column:1/-1"><label for="cn">Details (optional)</label><input id="cn" data-c="note" value="${esc(d.note)}" placeholder="e.g. 2 units returned, damaged on delivery"></div></div></div>
   <div class="panel"><h2>Amounts to credit</h2><div style="overflow-x:auto"><table style="min-width:640px"><thead><tr><th>Item on the invoice</th><th>Tax</th><th class="num">Line amount</th><th class="num">Credited or pending</th>${qtyMode(d) ? "<th>Qty back in stock</th>" : ""}<th>Credit now</th></tr></thead><tbody>
    ${inv.items
      .map((it, k) => {
        const done = creditedOnLine(inv.no, k) + pendingOnLine(inv.no, k),
          rem = lineNet(it) - done;
        return `<tr><td style="white-space:normal">${esc(it.desc)}</td><td>${inv.vat ? TAX_VAT[it.tax] : TAX_NV[it.tax]}</td><td class="num">${peso(lineNet(it))}</td><td class="num">${peso(done)}</td>
     ${qtyMode(d) ? `<td>${isStockLine(it) ? `<input type="number" step="any" min="0" aria-label="Quantity returned for ${esc(it.desc)}" data-cqty="${k}" value="${d.qtys[k] ?? ""}" style="width:90px"> <span class="due">of ${fmtQty(Number(it.qty) - returnedQty(inv.no, k))} ${esc(it.uom || "")}</span>` : '<span class="due">not stocked</span>'}</td>` : ""}
     <td><input type="number" step="0.01" min="0" aria-label="Credit on ${esc(it.desc)}" data-camt="${k}"${qtyMode(d) && isStockLine(it) ? " readonly" : ""} value="${d.amts[k] ? (d.amts[k] / 100).toFixed(2) : ""}"${rem <= 0 ? " disabled" : ""} style="width:130px"></td></tr>`;
      })
      .join("")}
   </tbody></table></div>
   <button class="btn link" data-act="cmfull">Credit the full remaining amount</button>
   <p class="hint">Amounts are on the same basis as the invoice lines${inv.incl ? " (VAT-inclusive)" : " (net of VAT)"}. VAT, discount and withholding are reversed proportionally.</p></div></div>
  <div class="stack"><div class="panel totals" id="cTotals"></div><div class="panel"><h2>Before submitting</h2><ul class="checks" id="cChecks"></ul></div>
   <button class="btn primary" id="cIssue" data-act="issuecn">Submit for approval</button>
   <p class="hint" style="margin:0">An approver other than the preparer must approve it before it is numbered and issued.</p>
   ${d.reissue ? `<p class="hint" style="margin:0">After approval, the corrected replacement invoice is issued.</p>` : ""}</div></div>`;
}
function checksC() {
  const d = draftC,
    inv = invOf(d.invNo),
    o = cnDraftObj();
  return [
    ...(qtyMode(d)
      ? [
          [
            o.lines.every(
              (l) =>
                !isStockLine(inv.items[l.src]) ||
                (l.qty > 0 &&
                  l.qty <=
                    Number(inv.items[l.src].qty) - returnedQty(inv.no, l.src)),
            ),
            "Quantity back in stock entered, within the quantity sold less earlier returns",
          ],
        ]
      : []),
    [!!d.reason, "Reason selected"],
    [o.lines.length > 0, "At least one amount to credit"],
    [
      o.lines.every(
        (l) =>
          l.amount <=
          lineNet(inv.items[l.src]) -
            creditedOnLine(inv.no, l.src) -
            pendingOnLine(inv.no, l.src),
      ),
      "No credit exceeds the line's remaining amount, including memos awaiting approval",
    ],
    [
      nextNo("cn", inv.branch) <= ser("cn", inv.branch)[1],
      `${brOf(inv.branch).name} credit memo series still available`,
    ],
    [!!S.ptiNo.trim(), "PTI Electronic Invoice on file for the credit memo"],
  ];
}
function refreshC() {
  const o = cnDraftObj(),
    c = o.lines.length ? cnCalc(o) : null,
    ch = checksC();
  document.getElementById("cTotals").innerHTML =
    `<h2>Summary</h2>${c ? `<div><span>VATable sales credited</span><span>${peso(c.vatable)}</span></div><div><span>VAT reversed</span><span>${peso(c.vatShown)}</span></div><div><span>Zero-rated credited</span><span>${peso(c.zero)}</span></div><div><span>Exempt credited</span><span>${peso(c.exempt)}</span></div>${c.wht ? `<div><span>Withholding reversed</span><span>${peso(c.wht)}</span></div>` : ""}<div class="grand"><span>Total amount credited</span><span>${peso(c.due)}</span></div>` : '<p class="due">Enter an amount to credit.</p>'}`;
  document.getElementById("cChecks").innerHTML = checksHtml(ch);
  document.getElementById("cIssue").disabled = !ch.every((x) => x[0]);
}
function issueCredit() {
  if (!checksC().every((x) => x[0])) return;
  const o = cnDraftObj();
  const r = {
    id: "CMR-" + String(nextCMR++).padStart(4, "0"),
    invNo: draftC.invNo,
    reason: draftC.reason,
    note: draftC.note.trim(),
    lines: o.lines,
    reissue: draftC.reissue,
    preparedBy: who(me()),
    preparedAt: now(),
    status: "PENDING",
    history: [
      { at: now(), by: me().name, act: "Prepared and submitted for approval" },
    ],
  };
  cmReqs.push(r);
  draftC = null;
  toast(`${r.id} submitted for approval`);
  view = "cmreq";
  current = r.id;
  render();
  window.scrollTo(0, 0);
}
function approveReq(r, note) {
  const inv = invOf(r.invNo);
  const amt = cnCalc(r).due;
  if (amt > me().limit) {
    slog(
      "Access denied",
      `Credit memo ${r.id} of ${peso(amt)} exceeds approval limit ${peso(me().limit)}`,
    );
    toast(
      `${peso(amt)} is above your approval limit of ${peso(me().limit)}. A higher approver must approve it.`,
    );
    return;
  }
  if (
    !r.lines.every(
      (l) =>
        l.amount <=
        lineNet(inv.items[l.src]) -
          creditedOnLine(inv.no, l.src) -
          pendingOnLine(inv.no, l.src, r),
    )
  ) {
    toast(
      "Amounts now exceed the invoice's remaining balance. Reject and prepare a new one.",
    );
    return;
  }
  if (nextNo("cn", inv.branch) > ser("cn", inv.branch)[1]) {
    toast("Credit memo series used up.");
    return;
  }
  const t = now(),
    cn = {
      no: takeNo("cn", inv.branch),
      invNo: r.invNo,
      at: t,
      reason: r.reason,
      note: r.note,
      lines: r.lines,
      eisId: eisId(t),
      designV: curDesign().v,
      buyer: effBuyer(inv),
      seller: Object.assign(sellerSnap(inv.branch), { vat: inv.vat }),
      preparedBy: r.preparedBy,
      preparedAt: r.preparedAt,
      approvedBy: who(me()),
      approvedAt: t,
      approvalNote: note,
      reqId: r.id,
    };
  credits.push(cn);
  slog(
    "Approved credit memo",
    `${r.id} issued as Credit Memo No. ${cn.no}, ${peso(cnCalc(cn).due)}`,
  );
  r.status = "APPROVED";
  r.cnNo = cn.no;
  r.history.push({
    at: t,
    by: me().name,
    act:
      `Approved; issued as Credit Memo No. ${cn.no}` +
      (note ? `. ${note}` : ""),
  });
  if (r.reissue && isCancelled(inv)) startReissue(cn);
  else go("credit", cn.no);
  signDoc(cn, "CM")
    .then(() => {
      postDbSync("save_credit", cn);
      toast(`Credit Memo No. ${cn.no} approved, issued, and digitally signed.`);
      render();
    })
    .catch((err) => {
      postDbSync("save_credit", cn);
      toast(`Credit Memo No. ${cn.no} approved and issued.`);
      render();
    });
}
function issueCreditOld() {
  const t = now(),
    o = cnDraftObj(),
    reissue = draftC.reissue;
  const cn = {
    no: nextCN++,
    invNo: draftC.invNo,
    at: t,
    reason: draftC.reason,
    note: draftC.note.trim(),
    lines: o.lines,
    eisId: eisId(t),
    designV: curDesign().v,
    seller: Object.assign(sellerSnap(), { vat: invOf(draftC.invNo).vat }),
  };
  credits.push(cn);
  draftC = null;
  toast(`Credit Memo No. ${cn.no} issued`);
  if (reissue && isCancelled(invOf(cn.invNo))) startReissue(cn);
  else go("credit", cn.no);
}
function startReissue(cn) {
  const src = invOf(cn.invNo);
  if (!newInvFor(src.branch)) return;
  Object.assign(draft, {
    promo: JSON.parse(
      JSON.stringify(src.promo || { name: "", type: "PCT", value: 0 }),
    ),
    customerId: src.customerId,
    salesType: src.salesType,
    incl: src.incl,
    wht: src.wht,
    scpwd: src.scpwd,
    scId: src.scId,
    items: JSON.parse(JSON.stringify(src.items)),
    refs: { reissueOf: src.no, cancelledBy: cn.no },
  });
  render();
  toast("Correct the details, then issue the replacement invoice.");
}

/* ================= Receipts register views ================= */
function vReceipts() {
  const list = receipts
      .filter((r) => inBr(r.branch))
      .filter(
        (r) =>
          rFilter === "all" || (r.type === "ADVANCE" && unappliedOf(r) > 0),
      )
      .sort((a, b) => b.no - a.no),
    openAdv = receipts.filter(
      (r) => r.type === "ADVANCE" && unappliedOf(r) > 0,
    );
  return `<div class="head"><div><h1>Receipts register</h1><p class="sub">Collection receipts (Annex B6), kept separate from invoices. Each one traces to the invoices it settles.</p></div>${can("ops") && me().roleCode !== "AUDITOR" ? '<button class="btn primary" data-act="newreceipt">Record receipt</button>' : ""}</div>
  <div class="stats"><div class="stat"><b>${peso(receipts.reduce((a, r) => a + r.amount, 0))}</b><span>Total received</span></div><div class="stat${openAdv.length ? " alert" : ""}"><b>${peso(openAdv.reduce((a, r) => a + unappliedOf(r), 0))}</b><span>Advances not yet invoiced (${openAdv.length})</span></div></div>
  <div class="seg" role="radiogroup" aria-label="Filter" style="margin-bottom:12px"><label><input type="radio" name="rf" data-rf="all"${rFilter === "all" ? " checked" : ""}>All receipts</label><label><input type="radio" name="rf" data-rf="adv"${rFilter === "adv" ? " checked" : ""}>Advances not yet invoiced</label></div>
  ${
    list.length
      ? `<div class="tablewrap"><table><thead><tr><th>Receipt no.</th><th>Payment date</th><th>Received from</th><th>Type</th><th class="num">Amount</th><th>Applied to invoice</th><th class="num">Unapplied</th></tr></thead><tbody>
  ${list
    .map(
      (r) =>
        `<tr class="row" data-openr="${r.no}" tabindex="0"><td><strong>${r.no}</strong></td><td>${fmtDate(r.at)}</td><td>${esc(cust(r.customerId).name)}</td><td>${rStatus(r)}</td><td class="num">${money(r, r.amount)}</td><td>${
          allocs(r)
            .map((x) => x.invNo)
            .join(", ") || "—"
        }</td><td class="num">${r.type === "ADVANCE" ? peso(unappliedOf(r)) : "—"}</td></tr>`,
    )
    .join("")}</tbody></table></div>`
      : `<div class="panel empty">No advances waiting for an invoice.</div>`
  }`;
}
function vReceipt() {
  const r = receipts.find((x) => x.no === current),
    u = unappliedOf(r),
    al = allocs(r);
  return `<div class="head noprint"><div><h1>Collection receipt No. ${r.no}</h1><p class="sub">Received ${fmtDate(r.at)} from ${esc(cust(r.customerId).name)}</p></div><div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-go="receipts">Back to register</button><button class="btn" data-act="print">Print</button></div></div>
  ${r.type === "ADVANCE" && u > 0 ? `<div class="banner info noprint"><strong>Advance received ${Math.max(0, Math.floor((now() - r.at) / DAY))} day(s) ago, not yet invoiced.</strong> A collection receipt is only a supplementary document. Once the goods are delivered or the service is rendered, issue the invoice dated on that day and apply this advance; a receipt without the invoice counts as failure to issue an invoice (RMC 77-2024 Q27).</div>` : ""}
  <div class="grid2"><div>${docReceipt(r)}</div><div class="stack noprint"><div class="panel"><h2>Trace to invoices</h2>${rStatus(r)}
   ${al.length ? `<ul class="dl" style="margin-top:10px">${al.map((x) => `<li><button class="btn link" data-open="${x.invNo}">Invoice No. ${x.invNo}</button> ${peso(x.amount)}<br><span class="due">${r.type === "ADVANCE" ? "Applied " + dDate(x.at) : "Settled on receipt"}</span></li>`).join("")}</ul>` : `<p class="due" style="margin:12px 0 0">No invoice issued against this advance yet.</p>`}
   ${r.type === "ADVANCE" ? `<div class="totals" style="margin-top:10px"><div><span>Advance received</span><span>${peso(r.amount)}</span></div><div><span>Applied to invoices</span><span>${peso(r.amount - u)}</span></div><div class="grand"><span>Unapplied</span><span>${peso(u)}</span></div></div>${u > 0 && me().roleCode !== "AUDITOR" ? `<button class="btn primary" style="margin-top:12px;width:100%" data-act="invfromadv" data-no="${r.no}">Issue invoice from this advance</button>` : ""}` : ""}</div></div></div>`;
}
function goNewR(pre) {
  if (!wb() && !(pre && pre.branch)) {
    toast("Choose a branch before issuing documents.");
    return;
  }
  view = "newReceipt";
  current = null;
  draftR = Object.assign(
    {
      cur: "PHP",
      branch: wb(),
      customerId: "",
      type: "COLLECTION",
      method: "CASH",
      account: "",
      purpose: "",
      advAmt: 0,
      sel: {},
    },
    pre,
  );
  render();
  window.scrollTo(0, 0);
}
function openInvoicesOf(cid) {
  return invoices.filter(
    (i) =>
      curOf(i) === ((draftR && draftR.cur) || curOf(i)) &&
      i.branch === (draftR ? draftR.branch : i.branch) &&
      i.customerId === cid &&
      i.salesType === "CHARGE" &&
      balanceOf(i) > 0,
  );
}
function vNewReceipt() {
  const d = draftR,
    inv = d.customerId ? openInvoicesOf(d.customerId) : [],
    adv = d.customerId ? openAdvances(d.customerId) : [];
  return `<div class="head"><div><h1>Record receipt</h1><p class="sub">${esc(brLabel(d.branch))}: Collection receipt No. ${nextNo("pr", d.branch)}, next in series ${ser("pr", d.branch)[0]}–${ser("pr", d.branch)[1]}</p></div><button class="btn" data-go="receipts">Cancel</button></div>
  <div class="grid2"><div class="stack">
   <div class="panel"><h2>Received from</h2><div class="fields"><div>${pickerHtml("rcpt", d.customerId, false)}</div>
     <div><label for="rcur">Currency</label><select id="rcur" data-r="cur"${d.type === "ADVANCE" ? " disabled" : ""}>${Object.keys(
       CURRENCIES,
     )
       .map(
         (k) =>
           `<option${(d.cur || "PHP") === k ? " selected" : ""}>${k}</option>`,
       )
       .join("")}</select>${
       isFX(d)
         ? `<p class="hint" style="margin:4px 0 0">${(() => {
             const f = rateFor(d.cur, todayISO());
             return f
               ? `Collection rate ₱${f.rate.toFixed(4)} (${f.source}, ${isoDate(f.date)}). The difference from each invoice's rate is a realized forex gain or loss.`
               : `No ${CURRENCIES[d.cur].src} rate on file for today.`;
           })()}</p>`
         : ""
     }</div>
     <div><span class="lbl">This payment is</span><div class="seg" role="radiogroup" aria-label="Receipt type"><label><input type="radio" name="rt" data-r="type" value="COLLECTION"${d.type === "COLLECTION" ? " checked" : ""}>Collection after the sale or service</label><label><input type="radio" name="rt" data-r="type" value="ADVANCE"${d.type === "ADVANCE" ? " checked" : ""}>Advance payment before the sale or service</label></div></div></div>
    <p class="hint" style="margin:0 0 6px">${d.type === "COLLECTION" ? "The invoice was issued on the date of transaction. This receipt only records the later payment (RMC 77-2024 Q15, Q31)." : "No invoice yet: the goods or service have not been delivered. Issue the invoice on the date of transaction and apply this advance to it."}</p>
    ${adv.length && d.type === "COLLECTION" ? `<p class="hint" style="margin:0">This payer has ${adv.length} advance${adv.length > 1 ? "s" : ""} not yet invoiced (${peso(adv.reduce((a, r) => a + unappliedOf(r), 0))}).</p>` : ""}</div>
   ${
     d.type === "COLLECTION"
       ? `<div class="panel"><h2>Invoices being paid</h2>${
           !d.customerId
             ? `<p class="due" style="margin:0">Choose a payer to see their unpaid charge invoices.</p>`
             : inv.length
               ? `<div style="overflow-x:auto"><table style="min-width:520px"><thead><tr><th></th><th>Invoice no.</th><th>Date</th><th class="num">Balance</th><th>Amount paid</th></tr></thead><tbody>
      ${inv.map((i) => `<tr><td><input type="checkbox" aria-label="Pay invoice ${i.no}" data-rsel="${i.no}"${d.sel[i.no] != null ? " checked" : ""}></td><td>${i.no}</td><td>${dDate(i.issuedAt)}</td><td class="num">${money(i, balanceOf(i))}</td><td><input type="number" step="0.01" min="0" aria-label="Amount paid on invoice ${i.no}" data-ramt="${i.no}" value="${d.sel[i.no] != null ? (d.sel[i.no] / 100).toFixed(2) : ""}"${d.sel[i.no] != null ? "" : " disabled"} style="width:130px"></td></tr>`).join("")}</tbody></table></div>`
               : `<p class="due" style="margin:0">No unpaid charge invoices for this payer. If goods or services are still to be delivered, record it as an advance payment.</p>`
         }</div>`
       : `<div class="panel"><h2>Advance payment</h2><div class="fields"><div style="grid-column:1/-1"><label for="rp">Advance payment for</label><input id="rp" data-r="purpose" value="${esc(d.purpose)}" placeholder="Goods or services to be delivered"></div><div><label for="ra">Amount received</label><input id="ra" type="number" step="0.01" min="0" data-r="advAmt" value="${d.advAmt ? (d.advAmt / 100).toFixed(2) : ""}"></div></div><p class="hint" style="margin:0">It stays in the register as an unapplied advance until you issue the invoice for the sale.</p></div>`
   }
   <div class="panel"><h2>Payment</h2><div class="fields"><div><span class="lbl">Paid by</span><div class="seg" role="radiogroup" aria-label="Paid by"><label><input type="radio" name="rm" data-r="method" value="CASH"${d.method === "CASH" ? " checked" : ""}>Cash</label><label><input type="radio" name="rm" data-r="method" value="CARD"${d.method === "CARD" ? " checked" : ""}>Credit card</label></div></div><div><label for="racct">Account no. (optional)</label><input id="racct" data-r="account" value="${esc(d.account)}"></div></div></div>
  </div><div class="stack"><div class="panel totals" id="rTotals"></div><div class="panel"><h2>Before issuing</h2><ul class="checks" id="rChecks"></ul></div><button class="btn primary" id="rIssue" data-act="issuer">Issue collection receipt No. ${nextNo("pr", d.branch)}</button></div></div>`;
}
function rTotal(d) {
  return d.type === "COLLECTION"
    ? Object.values(d.sel).reduce((a, x) => a + x, 0)
    : d.advAmt;
}
function checksR(d) {
  const out = [[!!d.customerId, "Payer selected"]];
  if (d.type === "COLLECTION") {
    const ks = Object.keys(d.sel);
    out.push([ks.length > 0, "At least one invoice selected"]);
    out.push([
      ks.every((n) => d.sel[n] > 0 && d.sel[n] <= balanceOf(invOf(+n))),
      "Each amount is above zero and within the invoice balance",
    ]);
  } else {
    out.push([!!d.purpose.trim(), "Purpose of the advance described"]);
    out.push([d.advAmt > 0, "Amount received entered"]);
  }
  if (isFX(d)) {
    out.push([
      d.type === "COLLECTION",
      "Foreign-currency receipts are for collections on foreign-currency invoices",
    ]);
    out.push([
      !!rateFor(d.cur, todayISO()),
      `${CURRENCIES[d.cur].src} rate for ${d.cur} on file for today`,
    ]);
  }
  out.push([
    nextNo("pr", d.branch) <= ser("pr", d.branch)[1],
    "Receipt no. within series",
  ]);
  return out;
}
function refreshR() {
  const d = draftR,
    ch = checksR(d);
  document.getElementById("rTotals").innerHTML =
    `<h2>Summary</h2><div><span>Type</span><span>${d.type === "COLLECTION" ? "Collection" : "Advance payment"}</span></div><div class="grand"><span>Total paid amount</span><span>${money(d, rTotal(d))}</span></div>`;
  document.getElementById("rChecks").innerHTML = checksHtml(ch);
  document.getElementById("rIssue").disabled = !ch.every((x) => x[0]);
}
function issueReceipt() {
  const d = draftR;
  if (!checksR(d).every((x) => x[0])) return;
  const rfx = isFX(d) ? rateFor(d.cur, todayISO()) : null;
  const r = {
    cur: d.cur || "PHP",
    fx: rfx,
    branch: d.branch,
    designV: curDesign().v,
    seller: sellerSnap(d.branch),
    buyer: snap(d.customerId),
    no: takeNo("pr", d.branch),
    at: now(),
    customerId: d.customerId,
    method: d.method,
    account: d.account.trim(),
    type: d.type,
    purpose: d.type === "ADVANCE" ? d.purpose.trim() : "",
    amount: rTotal(d),
    lines:
      d.type === "COLLECTION"
        ? Object.entries(d.sel).map(([n, v]) => ({ invNo: +n, amount: v }))
        : [],
    applications: [],
  };
  if (rfx)
    r.lines.forEach((l) => {
      const inv = invOf(l.invNo);
      l.fxGain = Math.round(l.amount * rfx.rate) - toPHP(inv, l.amount);
    });
  receipts.push(r);
  postDbSync("save_receipt", r);
  draftR = null;
  toast(`Collection receipt No. ${r.no} issued`);
  go("receipt", r.no);
}

/* ================= RMC 98-2026 readiness ================= */
function vReady() {
  const act = invoices.filter((i) => !isCancelled(i)),
    notSent = act.filter((i) => !delivered(i)),
    certDue = addMonths(S.ptiDate, 6),
    manual = invoices.filter((i) => i.refs.manual).length;
  const days = Math.ceil((MANDATE - now()) / DAY);
  const items = [
    [
      S.ptiNo ? "ok" : "wa",
      "PTI Electronic Invoice secured before issuing e-invoices (IV.12)",
      S.ptiNo
        ? `${esc(S.ptiNo)}, issued ${dDate(S.ptiDate)} for ${esc(S.ptiSystem)}, ${esc(S.branch)}.`
        : "Enter your PTI under Company, PTI and permits. Issuing is blocked until then.",
    ],
    [
      S.eisCert ? "ok" : "wa",
      "EIS Certification within 6 months of the PTI (IV.15)",
      S.eisCert
        ? `Certified ${S.eisCertDate ? dDate(S.eisCertDate) : ""}.`
        : `Due by ${dDate(certDue)}. Five mandatory tests, or seven with API callback, on eis-cert.bir.gov.ph.`,
    ],
    [
      notSent.length ? "wa" : "ok",
      "Invoices transmitted to buyers electronically (IV.4b)",
      notSent.length
        ? `${notSent.length} invoice(s) not yet sent by email, online view or QR code: ${notSent.map((i) => i.no).join(", ")}.`
        : "Every active invoice has been sent electronically.",
    ],
    [
      "ok",
      "Printed copy available on buyer request (IV.4, IV.7)",
      "Print copy for buyer on every invoice; allowed for B2C where electronic delivery isn't practicable.",
    ],
    [
      "ok",
      "No deletion or alteration of issued e-invoices (IV.8)",
      "Issued invoices are locked. Decreases use credit memos; increases use a new e-invoice referencing the original.",
    ],
    [
      "ok",
      "Downtime procedure (IV.11)",
      `Manual invoices from ${esc(S.manualSeries)} are replaced by e-invoices bearing the manual invoice number. ${manual} replacement(s) recorded.`,
    ],
    [
      "ok",
      "Structured JSON data for every document (IV.6)",
      "Invoices and credit memos generate JSON that can be converted to the BIR's prescribed format.",
    ],
    [
      BRS.filter((b) => b.active && b.code !== "00000" && !b.ptiNotice).length
        ? "wa"
        : "ok",
      "Branch coverage (IV.10, IV.13)",
      `${BRS.filter((b) => b.active)
        .map(
          (b) =>
            `${esc(b.name)} (${b.code})${b.code === "00000" ? "" : b.ptiNotice ? `, BIR notified ${isoDate(b.ptiNotice)}` : ", BIR notice not yet recorded"}`,
        )
        .join(
          "; ",
        )}. Every branch issues e-invoices under the same PTI number with its own series; new branches on the same system need notice to the BIR, not a new PTI.`,
    ],
    [
      S.reporting ? "ok" : "na",
      "Electronic sales reporting and Permit to Transmit (IV.2, IV.15)",
      S.reporting
        ? "Enabled. Invoices go through the transmission pipeline."
        : "Not yet required. Applies only once the BIR issues sales-reporting guidelines; PTT only upon the Commissioner's directive. Turn it on in settings when that happens.",
    ],
    [
      days > 0 ? "na" : "wa",
      "Mandate deadline: December 31, 2026 (IV.1)",
      days > 0
        ? `${days} days remaining for covered taxpayers (e-commerce, LTS, large taxpayers, CAS/CBA users). Micro taxpayers are exempt.`
        : "Deadline has passed.",
    ],
  ];
  return `<div class="head"><div><h1>RMC 98-2026 readiness</h1><p class="sub">Electronic invoicing checklist for ${esc(S.name)}. Section references are to Part IV of the Circular.</p></div></div>
  <div class="panel" style="max-width:860px"><ul class="ck">${items.map(([s, t, d]) => `<li><div class="mk ${s}">${s === "ok" ? "✓" : s === "wa" ? "!" : "–"}</div><div><b>${t}</b><small>${d}</small></div></li>`).join("")}</ul></div>
  <h2 style="margin:26px 0 6px;font-size:18px">Invoicing rules built into the system</h2>
  <p class="sub" style="margin:0 0 12px">From the Tax Code as amended by the EOPT Act, RR 7-2024 as amended by RR 11-2024, and RMC 77-2024.</p>
  <div class="panel" style="max-width:860px"><ul class="rules">${[...RULES, ...customRules.map((r) => [`${r.label}: ${r.rate}% ${r.vatExempt ? "with VAT exemption" : "of the VAT-exclusive price, VAT still due"}${r.active ? "" : " (deactivated)"}`, `${r.law}; effective ${isoDate(r.effective)}${r.expiry ? ` to ${isoDate(r.expiry)}` : ""}`, `Added by the EIS provider on ${dDate(r.createdAt)}.${r.capWeek ? ` Weekly cap ${peso(r.capWeek)} per ID.` : ""}${r.capTxn ? ` Cap ${peso(r.capTxn)} per transaction.` : ""}`, "Enforced"])].map(([t, src, how, tag]) => `<li><b>${t}<span class="tag ${tag === "Enforced" ? "s-paid" : tag === "Checked" ? "s-pending" : "s-draft"}">${tag}</span></b><small>${how}</small><small>${src}</small></li>`).join("")}</ul></div>
  <p class="note">Sales-adjustment rules and ESP guidelines are to follow in separate BIR issuances (RMC 98-2026, IV.3 and IV.8).</p>`;
}
const RULES = [
  [
    "VAT-registered seller: an invoice for every sale, regardless of amount",
    "RR 7-2024 Sec. 3; RMC 77-2024 Q1",
    "Every sale by a VAT seller goes through a numbered e-invoice. There is no minimum amount.",
    "Enforced",
  ],
  [
    "Non-VAT seller: an invoice for sales of ₱500 or more, on buyer request, or when the day's small sales exceed ₱500",
    "RMC 77-2024 Q2–Q3",
    "Shown as guidance on sales below ₱500 so the cashier knows when an invoice is still needed.",
    "Guidance",
  ],
  [
    "Sale of ₱1,000 or more to a VAT-registered buyer: buyer's registered name, address and TIN",
    "Tax Code Sec. 113(B), as amended; RR 7-2024 Sec. 3",
    "Issuing is blocked until the buyer's TIN and address are complete. Buyers are tagged VAT-registered, non-VAT or B2C in the customer database.",
    "Enforced",
  ],
  [
    "Input VAT claim needs: sales amount and VAT, registered name and TIN of buyer and seller, description, and date",
    "RR 7-2024 Sec. 3",
    "Each invoice shows whether a VAT-registered buyer can claim the input VAT. Below ₱1,000 the system warns when the buyer's TIN is missing.",
    "Checked",
  ],
  [
    "VAT shown as a separate item, with VATable, zero-rated and VAT-exempt sales broken down",
    "Tax Code Sec. 113(B); RMC 77-2024 Annex A1, B1",
    "Computed automatically on every VAT invoice.",
    "Enforced",
  ],
  [
    '"VAT-EXEMPT SALE" or "ZERO-RATED SALE" on invoices covering only those sales',
    "RR 7-2024 Sec. 3; RMC 77-2024 Annex B3, B4",
    "The format is selected from the tax treatment of the items.",
    "Enforced",
  ],
  [
    "Non-VAT seller may not issue a VAT invoice",
    "Tax Code Sec. 113(D); RR 7-2024",
    'Non-VAT companies can only choose "subject to percentage tax" or "exempt"; issuing a VAT invoice would make the seller liable for VAT plus a 50% surcharge.',
    "Enforced",
  ],
  [
    'Non-VAT invoices and supplementary documents carry "This document is not valid for claim of input tax"',
    "RR 7-2024; RMC 77-2024 Annex A2, B2, B3, B5, B6",
    "Printed automatically on the B2, B3, B5 formats and on collection receipts.",
    "Enforced",
  ],
  [
    "Seller's TIN with branch code, registered name and address on every invoice",
    "Tax Code Sec. 113(B); RMC 77-2024 Annex A1",
    "Locked in the seller profile; changes go through the provider.",
    "Enforced",
  ],
  [
    "SC, PWD, NAAC, MOV and solo-parent sales: ID number and signature",
    "RMC 77-2024 Annex A1 item 11",
    "ID number required when a statutory discount is applied; signature box on every form.",
    "Enforced",
  ],
  [
    "Service with different transaction and collection dates: invoice on the date of transaction, a supplementary receipt (here, the Collection Receipt) on later collection",
    "RMC 77-2024 Q31",
    "Service invoices carry the date the service was rendered or billed. Later payments go through the receipts register, linked to the invoice.",
    "Enforced",
  ],
  [
    "Advance payment: Collection Receipt on receipt of the advance, then an invoice on the date of transaction citing it as proof of payment",
    "RMC 77-2024 Q15, Q31; RR 7-2024 (supplementary documents)",
    "The advance is issued a Collection Receipt. When the sale happens, the invoice applies the advance and prints the Collection Receipt number, date and amount as proof of payment.",
    "Enforced",
  ],
  [
    "Credit memo duly authorized: prepared, approved by a different authorized person, and issued under the PTI",
    "RMC 98-2026 IV.8, IV.12",
    "A credit memo is numbered only on approval. The preparer cannot approve their own request. Each memo prints the preparer, approver and PTI Electronic Invoice number.",
    "Enforced",
  ],
  [
    "No invoice upon receipt of payment; a payment, official or acknowledgement receipt may be issued on later collection",
    "RMC 77-2024 Q15",
    '"Record payment" only issues a collection receipt. It never creates a second invoice.',
    "Enforced",
  ],
  [
    "A receipt, billing statement or statement of account without the invoice is failure to issue an invoice",
    "RMC 77-2024 Q27",
    "Advances not yet invoiced are flagged in the receipts register until the invoice is issued and the advance applied.",
    "Checked",
  ],
  [
    "Non-VAT small sales: one invoice once the day's sales below ₱500 reach the threshold",
    "RMC 77-2024 Q2–Q3",
    "The small sales tally keeps a running total and prompts one aggregate invoice at ₱500. A day cannot be closed while the threshold is met without an invoice.",
    "Enforced",
  ],
  [
    "Sale or promotional discount shown on the invoice at the time of sale and not dependent on a future event is deducted before VAT",
    "Tax Code Sec. 106(D) and 108; RR 7-2024 (discount breakdown on the invoice)",
    "The discount prints as its own line under the items, and VAT is computed on the discounted amount.",
    "Enforced",
  ],
  [
    "SC/PWD 20% discount and VAT exemption on qualified goods and services for their exclusive use (medicines and medical supplies, medical and dental services, restaurants, hotels, transport, recreation, funeral services)",
    "RA 9994 Sec. 4; RA 10754; IRRs",
    "Each item carries its coverage. VAT is removed first, then 20% is computed on the VAT-exempt price. The OSCA or PWD ID number and the buyer's signature are required.",
    "Enforced",
  ],
  [
    "No double discount: the SC or PWD gets the store's promotional discount or the statutory discount, whichever is higher",
    "RA 9994 Sec. 4; RA 10754; JAO 24-02 Sec. 8",
    "The system compares the two on every line and applies the higher automatically, and the printed invoice notes which one was applied.",
    "Enforced",
  ],
  [
    "5% special discount on basic necessities and prime commodities, without VAT exemption, up to ₱125 per calendar week (₱2,500 purchases)",
    "DTI-DA-DOE JAO 24-02 (2024)",
    "Tracked per SC/PWD ID across invoices in the same week; the discount stops at the cap.",
    "Enforced",
  ],
  [
    "National athletes and coaches: 20% of the VAT-exclusive price on transport, lodging, food, recreation, admission fees, medicines and sports equipment; VAT still due on the full price",
    "RA 10699; RR 13-2020",
    "Discount computed on the VAT-exclusive price with VAT kept on the full amount; PNSTM ID, booklet and NSA endorsement for sports equipment confirmed; name and ID recorded.",
    "Enforced",
  ],
  [
    "Medal of Valor awardees, widows or widowers and dependents: 20% on transport, hotels, restaurants, recreation and sports centers, medicines and admission fees",
    "RA 9049 and IRR",
    "Treated like the NAAC discount (VAT still due) pending BIR regulations on its tax treatment; beneficiary type recorded.",
    "Checked",
  ],
  [
    "Solo parents earning below ₱250,000 with a child aged 6 or under: 10% discount and VAT exemption on baby's milk, food and micronutrient supplements, sanitary diapers, and prescribed medicines, vaccines and medical supplements",
    "RA 11861; RR 1-2023",
    "VAT removed first, then 10%; the child's name and the eligibility confirmation are required.",
    "Enforced",
  ],
  [
    "One statutory discount per sale; beneficiaries holding two IDs (e.g. an athlete who is also a PWD) choose one",
    "RR 13-2020; RA 9994 and RA 10754",
    "Only one statutory discount type can be selected per invoice.",
    "Enforced",
  ],
  [
    "Separate records of discounted sales: name, ID, date, gross sales, discount, invoice number",
    "RR 13-2020; RR 1-2023; SC and PWD regulations",
    "The discount register lists every discounted sale by type.",
    "Enforced",
  ],
  [
    "Group meals: the discount covers only the SC/PWD diners' share",
    "RA 9994 and RA 10754 IRRs",
    "Enter total diners and SC/PWD diners; the 20% lines are prorated.",
    "Enforced",
  ],
  [
    "E-invoice sent to the buyer by QR code; validity verifiable electronically or manually, as the BIR may prescribe",
    "RMC 98-2026 IV.4(b), IV.14",
    "Each invoice and credit memo carries a digitally signed QR code. Scanning it opens a verification page showing authenticity, status (valid, adjusted or cancelled) and the EIS unique ID. Buyer details are shown only in the authorized view, and each such access is logged.",
    "Checked",
  ],
  [
    "Correction of buyer details by a separate, approved Correction Notice that references the original invoice; the invoice itself is never altered",
    "RMC 98-2026 IV.8; RR 7-2024 Sec. 3 (buyer's name and TIN for input VAT)",
    "Allowed: address for any invoice; name and TIN only for non-VAT or B2C buyers, or non-VAT invoices. For a VAT-registered buyer on a VAT invoice, a wrong name or TIN goes through cancel and reissue. Prepared and approved by different persons, with supporting document, digital signature and QR verification.",
    "Checked",
  ],
  [
    "Individual user accounts, role-based access, segregation of duties, approval limits and a security audit trail",
    "BIR CAS evaluation practice; Data Privacy Act (RA 10173) and NPC rules",
    "Sign-in with password and two-factor code for approvers, administrators and auditors; lockout after 5 failed attempts; sign-out after 15 minutes idle; roles limit what each user can do; no one approves their own documents; every sign-in, denial, approval and settings change is logged. Simulated in this prototype; enforced on the server in production.",
    "Checked",
  ],
  [
    "Foreign-currency transactions converted to pesos at the spot rate on the transaction date: BAP rate for US dollars, BSP rate for other currencies; monthly averages not allowed; only realized forex gains and losses are taxable",
    "RMC 12-2024; RR 2-40",
    "Invoices in foreign currency print the peso equivalent of total sales, VAT and amount due at the frozen rate. Collections record the realized gain or loss. A summary of foreign-currency transactions is kept for audit.",
    "Enforced",
  ],
  [
    'Foreign buyers without a Philippine TIN: the invoice shows the buyer\'s name, address and country, with the TIN marked "None (foreign buyer)"',
    "Tax Code Sec. 113(B) (buyer's TIN required for sales of ₱1,000 or more to VAT-registered persons); Sec. 106(A)(2) and 108(B)(2) (zero rating)",
    'Buyers tagged "Foreign buyer" need a country and address instead of a TIN; an optional foreign tax ID can be recorded. Zero-rated sales to them show a reminder on export documents and foreign-currency payment.',
    "Checked",
  ],
  [
    "Cashier counter: cashiers encode directly on the invoice form with limited access; prices, promotions, rates, withholding and discount coverage come from the office",
    "Internal control; RMC 98-2026 IV.8 (issued invoices not altered)",
    "Cashier accounts open only the counter. Other roles may switch between the full system and the counter. Price changes, voids and corrections go to a supervisor as requests.",
    "Enforced",
  ],
  [
    "Summarized journal entries exported to the accounting system, with invoice-level detail kept in Talaan as the subsidiary sales journal",
    "Tax Code Sec. 232 (books of accounts); RR 7-2024 (subsidiary sales journal)",
    "Entries by day, week, month, quarter or year, per branch; mapped to the client's chart of accounts; each entry balanced and carrying a fixed ID so the same period cannot be posted twice.",
    "Checked",
  ],
  [
    "Dates and times follow Philippine Standard Time (Asia/Manila), whatever the device's own time zone",
    "RR 7-2024 (invoice issued on the date of transaction)",
    "Today's date, time stamps, the earlier-date check and period cut-offs are computed in Manila time.",
    "Enforced",
  ],
  [
    "A line's VAT class may be changed from the item master's default only with a reason and supporting document; cashiers need an approver",
    "Tax Code Sec. 106(A)(2), 108(B), 109; internal control",
    "The new class, reason and document print on the line and go to the security log and the structured data.",
    "Enforced",
  ],
  [
    "Charge sales may be invoiced without payment; the invoice shows it is unpaid, with its terms and due date, and later payment is acknowledged by a Collection Receipt",
    "RR 7-2024; RMC 77-2024 Q31",
    "Terms come from the client's record (Net 7 to Net 60 or a specific date); the receivables aging report groups unpaid balances by days past due.",
    "Checked",
  ],
  [
    "Failure to issue an invoice: fine of ₱1,000 to ₱50,000 and imprisonment of 2 to 4 years",
    "Tax Code Sec. 264(a)",
    "Downtime procedure and manual-invoice replacement keep every sale documented.",
    "Guidance",
  ],
];

/* ================= Log and settings ================= */
function vLog() {
  return `<div class="head"><div><h1>EIS transmission log</h1><p class="sub">${S.reporting ? "Every attempt to send sales data to the BIR, newest first." : "Sales reporting is not yet required. Past test entries are shown below."}</p></div></div>
  ${
    log.length
      ? `<div class="tablewrap"><table><thead><tr><th>When</th><th>Invoice no.</th><th>Result</th><th>BIR reference</th><th>Message</th></tr></thead><tbody>
  ${log
    .slice()
    .sort((a, b) => b.at - a.at)
    .map(
      (l) =>
        `<tr class="row" data-open="${l.no}" tabindex="0"><td>${fmtDate(l.at)}</td><td><strong>${l.no}</strong></td><td>${pill(l.result)}</td><td>${l.ref}</td><td style="white-space:normal">${esc(l.msg)}</td></tr>`,
    )
    .join("")}</tbody></table></div>`
      : `<div class="panel empty">No transmissions yet.</div>`
  }`;
}
function vSettings() {
  const admin = can("settings");
  const f = (k, l, t = "text") =>
    `<div><label for="s_${k}">${l}</label><input id="s_${k}" type="${t}" data-s="${k}" value="${esc(S[k])}"${admin ? "" : " disabled"}></div>`;
  return `<div class="head"><div><h1>Company, PTI and permits</h1><p class="sub">${admin ? "Changes apply immediately." : "Read-only inspection mode. Changes can only be made by a Company Administrator."}</p></div></div>
  <div class="panel" style="display:flex;gap:16px;align-items:center;flex-wrap:wrap"><img src="${BIZ_LOGO}" alt="Bizmaker Consultancy Inc. logo" style="width:72px;height:72px;object-fit:contain"><div><h2 style="margin:0 0 4px">Certificate of Registration (BIR Form 2303)</h2>
   <div class="hint" style="margin:0">${esc(S.name)}, TIN ${esc(S.tin)} (head office), issued ${isoDate(S.tinIssued)}. ${esc(S.rdoReg)}. COR OCN ${esc(S.corOcn)}, generated ${isoDate(S.corDate)}.<br>Registered address: ${esc(S.address)}</div></div></div>
  <div class="stack" style="max-width:860px">
   <div class="panel"><h2>Registration</h2><div class="seg" role="radiogroup" aria-label="VAT status"><label><input type="radio" name="vs" data-s="vat" value="1"${S.vat ? " checked" : ""}${admin ? "" : " disabled"}>VAT-registered</label><label><input type="radio" name="vs" data-s="vat" value="0"${S.vat ? "" : " checked"}${admin ? "" : " disabled"}>Non-VAT (percentage tax)</label></div>
    <p class="hint">Non-VAT switches new invoices to the B2 and B5 formats. Issued invoices keep their format.</p></div>
   <div class="panel"><h2>Seller information</h2><div class="fields"><div><span class="lbl">Registered name</span><div class="ro">${esc(S.name)}</div></div><div><span class="lbl">Business or trade name</span><div class="ro">${esc(S.trade)}</div></div><div><span class="lbl">TIN with branch code</span><div class="ro">${esc(S.tin)}</div></div></div>
    <div class="fields"><div style="grid-column:1/-1"><span class="lbl">Registered business address</span><div class="ro">${esc(S.address)}</div></div></div>
    <div class="lockrow">🔒 Locked. Changes to seller details, logo or invoice design go through your EIS provider after the BIR update. ${can("admin") ? '<button class="btn link" data-go="design">Request a change</button>' : ""}</div></div>
   <div class="panel"><h2>PTI Electronic Invoice (RMC 98-2026)</h2><div class="fields">${f("ptiNo", "PTI Electronic Invoice no.")}${f("ptiDate", "Date issued", "date")}${f("ptiSystem", "Approved software/system")}${f("branch", "Branch covered")}</div>
    <label class="inline"><input type="checkbox" data-s="eisCert"${S.eisCert ? " checked" : ""}${admin ? "" : " disabled"}> EIS Certification obtained</label>
    ${S.eisCert ? `<div class="fields" style="margin-top:10px">${f("eisCertDate", "Date certified", "date")}</div>` : ""}
    <label class="inline"><input type="checkbox" data-s="reporting"${S.reporting ? " checked" : ""}${admin ? "" : " disabled"}> Electronic sales reporting required (BIR guidelines issued and PTT secured)</label></div>
   <div class="panel"><h2>Statutory discounts</h2><p style="margin:0">Built in: senior citizens, PWDs, national athletes and coaches, Medal of Valor awardees, and solo parents.${
     customRules.filter((r) => r.active).length
       ? ` Added rules: ${customRules
           .filter((r) => r.active)
           .map((r) => `${esc(r.label)} (${r.rate}%)`)
           .join(", ")}.`
       : ""
   }</p>
    <p class="hint">A new mandatory discount is added by your EIS provider once its law or regulation is issued. Contact after-sales support with the issuance.</p></div>
   <div class="panel"><h2>Delivery to buyers</h2><label class="inline"><input type="checkbox" data-s="autoEmail"${S.autoEmail ? " checked" : ""}${admin ? "" : " disabled"}> Email each e-invoice automatically when it is issued, to buyers with an email on file who have not opted out</label>
    <p class="hint" style="margin:6px 0 0">Buyers can be excluded in their customer record. Every automatic email is logged on the invoice.</p></div>
   <div class="panel"><h2>Series</h2><p style="margin-top:0">Numbering series are kept per branch. See <button class="btn link" data-go="branches">Branches</button>.</p><div class="fields">${f("manualSeries", "Authorized manual invoices for downtime")}</div></div>
   <div class="panel"><h2>Printed footer</h2><div class="fields">${f("permitNo", "BIR Permit No.")}${f("atpNo", "ATP No./OCN")}${f("atpDate", "Date issued", "date")}</div></div></div>`;
}

/* ================= Invoice design: client side (request only) ================= */
function designCard(d) {
  return `<div class="fields"><div><span class="lbl">Logo</span><div class="ro">${d.logo ? `<img src="${d.logo}" alt="Current logo" style="max-height:40px">` : "Standard mark (no logo uploaded)"}</div></div>
  <div><span class="lbl">Colors</span><div class="ro"><span class="sw" style="background:${d.primary}"></span>${d.primary} <span class="sw" style="background:${d.accent};margin-left:10px"></span>${d.accent}</div></div>
  <div><span class="lbl">Font and size</span><div class="ro">${FONTS[d.font]}, ${SIZES[d.fs]} text, trade name ${d.tr}px</div></div></div>`;
}
function dcrPill(s) {
  const m = {
    Submitted: "s-draft",
    "Under review": "s-pending",
    "BIR update recorded": "s-pending",
    Applied: "s-paid",
    Rejected: "s-rejected",
  };
  return `<span class="pill ${m[s]}">${s}</span>`;
}
function vDesign() {
  const d = curDesign();
  return `<div class="head"><div><h1>Invoice design</h1><p class="sub">Your logo and invoice design are controlled by your EIS provider. Changes are made through after-sales support once the BIR update is in place.</p></div>
  <button class="btn primary" data-act="newdcr">Request a design change</button></div>
  <div class="stack" style="max-width:900px">
   <div class="panel"><h2>Current design: version ${d.v}</h2>${designCard(d)}<p class="hint" style="margin:0">Effective ${dDate(d.effective)}. BIR reference: ${esc(d.birRef.type)} ${esc(d.birRef.no)}, ${dDate(d.birRef.date)}.</p></div>
   <div class="panel"><h2>Your change requests</h2>${
     dcrs.length
       ? `<div style="overflow-x:auto"><table style="min-width:620px"><thead><tr><th>Request</th><th>Filed</th><th>What changes</th><th>Status</th><th>Result</th></tr></thead><tbody>
    ${dcrs
      .slice()
      .reverse()
      .map(
        (r) =>
          `<tr><td><strong>${r.id}</strong></td><td>${dDate(r.at)}</td><td style="white-space:normal">${r.areas.join(", ")}<br><span class="due">${esc(r.desc)}</span></td><td>${dcrPill(r.status)}</td><td>${r.version ? "Design version " + r.version : r.status === "Rejected" ? esc(r.history[r.history.length - 1].note) : "—"}</td></tr>`,
      )
      .join("")}</tbody></table></div>`
       : `<p class="due">No requests yet.</p>`
   }</div>
   <div class="panel"><h2>Design history</h2><div style="overflow-x:auto"><table style="min-width:620px"><thead><tr><th>Version</th><th>Effective</th><th>Change</th><th>BIR reference</th></tr></thead><tbody>
    ${designs
      .slice()
      .reverse()
      .map(
        (x) =>
          `<tr><td><strong>${x.v}</strong></td><td>${dDate(x.effective)}</td><td style="white-space:normal">${esc(x.summary)}</td><td style="white-space:normal">${esc(x.birRef.type)}<br><span class="due">${esc(x.birRef.no)}, ${dDate(x.birRef.date)}</span></td></tr>`,
      )
      .join("")}</tbody></table></div>
    <p class="hint">Documents keep the design version they were issued with. A new design applies only to documents issued after it takes effect.</p></div></div>`;
}
function vNewDcr() {
  const d = dcrDraft;
  const areas = [
    "Logo",
    "Colors",
    "Fonts and sizes",
    "Business or trade name",
    "Layout or other",
  ];
  return `<div class="head"><div><h1>Request a design change</h1><p class="sub">Sent to ${esc(PROVIDER.name)}. They will coordinate the BIR update before applying it.</p></div><button class="btn" data-go="design">Cancel</button></div>
  <div class="stack" style="max-width:760px"><div class="panel"><h2>What should change?</h2>
   <div style="display:flex;flex-wrap:wrap;gap:14px">${areas.map((a) => `<label class="inline" style="margin:0"><input type="checkbox" data-dcr-area="${a}"${d.areas.includes(a) ? " checked" : ""}> ${a}</label>`).join("")}</div>
   <div class="fields" style="margin-top:14px"><div style="grid-column:1/-1"><label for="dd">Describe the change</label><input id="dd" data-dcr="desc" value="${esc(d.desc)}" placeholder="e.g. Use our new logo; make the item lines larger"></div>
    <div><label for="dc">Contact person</label><input id="dc" data-dcr="contact" value="${esc(d.contact)}" placeholder="Name and position"></div>
    <div><label for="dl">New logo file (optional)</label><input id="dl" type="file" accept="image/png,image/jpeg,image/svg+xml" data-dcr-logo="1"></div></div>
   ${d.logo ? `<p class="hint">Attached: <img src="${d.logo}" alt="Attached logo" style="max-height:36px;vertical-align:middle"></p>` : ""}
   ${d.areas.includes("Business or trade name") ? `<div class="banner info" style="margin:10px 0 0">A change of business or trade name may also require updating your BIR registration and PTI Electronic Invoice.</div>` : ""}</div>
   <div><button class="btn primary" data-act="submitdcr"${d.areas.length && d.desc.trim() && d.contact.trim() ? "" : " disabled"}>Submit request</button></div></div>`;
}

/* ================= Provider console (EIS provider / programmer only) ================= */
function vProvider() {
  if (!can("admin"))
    return `<div class="head"><div><h1>Provider console</h1></div></div><div class="panel">Restricted to authorized software providers.</div>`;
  if (!providerOn)
    return `<div class="head"><div><h1>Provider console</h1><p class="sub">For ${esc(PROVIDER.name)} only. Clients cannot change logos or invoice designs.</p></div></div>
   <div class="panel" style="max-width:420px"><h2>Provider sign-in</h2><label for="pin">Provider PIN</label><input id="pin" type="password" inputmode="numeric" autocomplete="off">
    <p class="hint">Demo PIN: 2468. The real system uses separate provider accounts with two-factor sign-in.</p><p class="hint" id="pinErr" style="color:var(--bad)"></p>
    <button class="btn primary" data-act="pin">Sign in</button></div>`;
  return `<div class="head"><div><h1>Provider console</h1><p class="sub">Signed in as ${esc(PROVIDER.name)}. Client: ${esc(S.name)}.</p></div><button class="btn" data-act="pout">Sign out</button></div>
  <div class="stack" style="max-width:980px">
   <div class="panel"><h2>Design change requests</h2>${
     dcrs.length
       ? `<div style="overflow-x:auto"><table style="min-width:640px"><thead><tr><th>Request</th><th>Filed</th><th>Client contact</th><th>What changes</th><th>Status</th></tr></thead><tbody>
    ${dcrs
      .slice()
      .reverse()
      .map(
        (r) =>
          `<tr class="row" data-opendcr="${r.id}" tabindex="0"><td><strong>${r.id}</strong></td><td>${dDate(r.at)}</td><td>${esc(r.contact)}</td><td style="white-space:normal">${r.areas.join(", ")}</td><td>${dcrPill(r.status)}</td></tr>`,
      )
      .join("")}</tbody></table></div>`
       : `<p class="due">No requests.</p>`
   }</div>
   <div class="panel"><h2>Statutory discount rules ("Others")</h2>
    <p class="hint" style="margin-top:0">Add a new mandatory discount once its law or regulation is issued. Built-in: SC, PWD, NAAC, MOV, solo parent. Rules can't be edited after creation, so issued invoices stay consistent; to change one, deactivate it and add a new rule.</p>
    ${customRules.length ? `<div style="overflow-x:auto"><table style="min-width:640px"><thead><tr><th>Code</th><th>Discount</th><th>Legal basis</th><th>Effective</th><th>Status</th><th></th></tr></thead><tbody>${customRules.map((r) => `<tr><td><strong>${esc(r.code)}</strong></td><td style="white-space:normal">${esc(r.label)}<br><span class="due">${r.rate}%, ${r.vatExempt ? "VAT-exempt" : "VAT due"}</span></td><td style="white-space:normal">${esc(r.law)}</td><td>${isoDate(r.effective)}${r.expiry ? `<br><span class="due">to ${isoDate(r.expiry)}</span>` : ""}</td><td>${r.active ? '<span class="pill s-paid">Active</span>' : '<span class="pill s-draft">Inactive</span>'}</td><td>${r.active ? `<button class="btn link" data-act="ruleoff" data-code="${esc(r.code)}">Deactivate</button>` : ""}</td></tr>`).join("")}</tbody></table></div>` : '<p class="due">No added rules yet.</p>'}
    ${ruleForm ? ruleFormHtml() : '<button class="btn primary" style="margin-top:10px" data-act="rulenew">Add a statutory discount rule</button>'}</div>
   ${supportInbox()}
   <div class="panel"><h2>Design audit trail</h2><ul class="dl">${designAudit
     .slice()
     .reverse()
     .map(
       (a) =>
         `<li><b>${esc(a.action)}</b><br><span class="due">${fmtDate(a.at)}, ${esc(a.by)}</span></li>`,
     )
     .join("")}</ul></div></div>`;
}
function sampleInvoice() {
  return (
    invoices
      .slice()
      .sort((a, b) => b.no - a.no)
      .find((i) => formatOf(i) === "B1") || invoices[0]
  );
}
function vDcr() {
  if (!providerOn) {
    view = "provider";
    return vProvider();
  }
  const r = dcrs.find((x) => x.id === current),
    st = r.status,
    closed = st === "Applied" || st === "Rejected";
  const s1 = st === "Submitted" ? "now" : "done",
    s2 =
      st === "Under review"
        ? "now"
        : ["BIR update recorded", "Applied"].includes(st)
          ? "done"
          : "off",
    s3 =
      st === "BIR update recorded" ? "now" : st === "Applied" ? "done" : "off";
  const pd = pDraft;
  return `<div class="head"><div><h1>${r.id}</h1><p class="sub">${r.areas.join(", ")}. Filed ${fmtDate(r.at)} by ${esc(r.contact)}.</p></div><button class="btn" data-go="provider">Back to console</button></div>
  <div class="panel" style="margin-bottom:14px"><b>Client request:</b> ${esc(r.desc)} ${r.logo ? `<br><img src="${r.logo}" alt="Logo supplied by client" style="max-height:44px;margin-top:8px">` : ""}
   <ul class="dl" style="margin-top:10px">${r.history.map((h) => `<li>${dcrPill(h.status)} ${esc(h.note)}<br><span class="due">${fmtDate(h.at)}, ${esc(h.by)}</span></li>`).join("")}</ul></div>
  ${
    st === "Rejected"
      ? ""
      : `<ol class="steps">
   <li class="${s1}"><b>Review the request</b><p class="hint" style="margin:4px 0 8px">Confirm the change with the client and check whether it needs a BIR update.</p>
    ${st === "Submitted" ? `<div class="row3"><div><label for="rj">Reason, if declining</label><input id="rj" placeholder="Optional"></div><button class="btn primary" data-act="dcrreview">Start review</button><button class="btn" data-act="dcrreject">Decline</button></div>` : ""}</li>
   <li class="${s2}"><b>Record the BIR update</b><p class="hint" style="margin:4px 0 8px">Required before activation. Enter the amended PTI or the acknowledged notice to the RDO/LT Office.</p>
    ${
      st === "Under review"
        ? `<div class="fields"><div><label for="bt">Type</label><select id="bt"><option>Amended PTI Electronic Invoice</option><option>Notice acknowledged by RDO/LT Office</option><option>Other BIR approval</option></select></div><div><label for="bn">Reference no.</label><input id="bn"></div><div><label for="bd">Date</label><input id="bd" type="date"></div></div><button class="btn primary" data-act="dcrbir">Record BIR update</button> <span class="due" id="birErr" style="color:var(--bad)"></span>`
        : r.birRef
          ? `<p style="margin:0">${esc(r.birRef.type)} ${esc(r.birRef.no)}, ${dDate(r.birRef.date)}</p>`
          : ""
    }</li>
   <li class="${s3}"><b>Configure and activate the new design</b><p class="hint" style="margin:4px 0 8px">The word INVOICE is kept the largest description automatically, and required fields cannot be hidden.</p>
    ${
      st === "BIR update recorded" && pd
        ? `<div class="fields"><div><label for="plg">Logo</label><input id="plg" type="file" accept="image/png,image/jpeg,image/svg+xml" data-p-logo="1">${pd.logo ? `<button class="btn link" data-act="plogoclear">Remove logo</button>` : ""}</div>
      <div><label for="ppc">Primary color (band, title)</label><input id="ppc" type="color" data-p="primary" value="${pd.primary}" style="height:40px;padding:4px"></div>
      <div><label for="pac">Accent color (serial no., legends)</label><input id="pac" type="color" data-p="accent" value="${pd.accent}" style="height:40px;padding:4px"></div></div>
     <div class="fields"><div><label for="pf">Font</label><select id="pf" data-p="font">${Object.entries(
       FONTS,
     )
       .map(
         ([v, l]) =>
           `<option value="${esc(v)}"${v === pd.font ? " selected" : ""}>${l}</option>`,
       )
       .join("")}</select></div>
      <div><label for="ps">Text size</label><select id="ps" data-p="fs">${Object.entries(
        SIZES,
      )
        .map(
          ([v, l]) =>
            `<option value="${v}"${+v === pd.fs ? " selected" : ""}>${l}</option>`,
        )
        .join("")}</select></div>
      <div><label for="pt">Trade name size (px)</label><input id="pt" type="number" min="14" max="26" data-p="tr" value="${pd.tr}"></div></div>
     <p class="hint" id="guard">INVOICE title auto-sized to ${titleSize(pd)}px, larger than every other description on the form.</p>
     <div class="fields"><div style="grid-column:1/-1"><label for="psum">Change summary for the design history</label><input id="psum" data-p="summary" value="${esc(pd.summary)}"></div></div>
     <button class="btn primary" data-act="activate">Activate as design version ${curDesign().v + 1}</button>
     <div id="pPreview" style="margin-top:16px">${docInvoice(sampleInvoice(), Object.assign({}, pd, { v: curDesign().v + 1 }))}</div>`
        : st === "Applied"
          ? `<p style="margin:0">Activated as design version ${r.version}.</p>`
          : ""
    }</li></ol>`
  }`;
}
function ruleFormHtml() {
  const f = ruleForm;
  const inp = (k, l, t = "text", ph = "") =>
    `<div><label for="rf-${k}">${l}</label><input id="rf-${k}" type="${t}" data-rf2="${k}" value="${esc(f[k] ?? "")}" placeholder="${ph}"></div>`;
  return `<div class="panel" style="background:var(--soft);margin-top:12px"><h2 style="font-size:15px">New statutory discount rule</h2>
   <div class="fields">${inp("label", "Name of the discount", "text", "e.g. Barangay health worker discount")}${inp("code", "Short code (2–6 letters)", "text", "e.g. BHW")}${inp("law", "Legal basis", "text", "Law, IRR or RR and section")}</div>
   <div class="fields">${inp("effective", "Effective date", "date")}${inp("expiry", "Expiry date (optional)", "date")}${inp("rate", "Discount rate (%)", "number")}</div>
   <div class="fields"><div><span class="lbl">VAT treatment</span><div class="seg" role="radiogroup" aria-label="VAT treatment"><label><input type="radio" name="rfv" data-rf2="vatExempt" value="1"${f.vatExempt ? " checked" : ""}>VAT-exempt (VAT removed first)</label><label><input type="radio" name="rfv" data-rf2="vatExempt" value="0"${f.vatExempt ? "" : " checked"}>VAT still due</label></div></div></div>
   <div class="fields">${inp("idLabel", "ID the beneficiary presents", "text", "e.g. BHW ID no.")}${inp("extraLabel", "Extra detail to record (optional)", "text", "e.g. Barangay")}${inp("confirmText", "Cashier confirmation (optional)", "text", "e.g. ID and certification seen")}</div>
   <div class="fields">${inp("capWeek", "Weekly cap per ID, ₱ (optional)", "number")}${inp("capTxn", "Cap per transaction, ₱ (optional)", "number")}<div><span class="lbl">Group meals</span><label class="inline" style="margin:6px 0"><input type="checkbox" data-rf2="group"${f.group ? " checked" : ""}> Prorate for group meals</label></div></div>
   <p class="hint">The rule is compared with sale discounts on every line (whichever is higher), recorded in the discount register, and listed on the readiness page.</p>
   <div class="err">${f.err || ""}</div><div style="display:flex;gap:8px"><button class="btn primary" data-act="rulesave">Activate rule</button><button class="btn" data-act="rulecancel">Cancel</button></div></div>`;
}
function saveRule() {
  const f = ruleForm,
    code = (f.code || "").trim().toUpperCase(),
    rate = Number(f.rate);
  if (!f.label.trim() || !f.law.trim()) {
    f.err = "Enter the name and the legal basis.";
    return render();
  }
  if (!/^[A-Z]{2,6}$/.test(code)) {
    f.err = "The short code must be 2 to 6 letters.";
    return render();
  }
  if (ST_TYPES[code] || customRules.some((r) => r.code === code)) {
    f.err = `Code ${code} is already used.`;
    return render();
  }
  if (!(rate > 0 && rate <= 100)) {
    f.err = "Enter a rate between 0 and 100.";
    return render();
  }
  if (!f.effective) {
    f.err = "Enter the effective date.";
    return render();
  }
  if (f.expiry && f.expiry < f.effective) {
    f.err = "The expiry date is before the effective date.";
    return render();
  }
  const r = {
    code,
    short: code,
    label: f.label.trim(),
    law: f.law.trim(),
    effective: f.effective,
    expiry: f.expiry || "",
    rate,
    vatExempt: !!f.vatExempt,
    idLabel: (f.idLabel || "").trim() || `${code} ID no.`,
    extraLabel: (f.extraLabel || "").trim(),
    confirmText: (f.confirmText || "").trim(),
    capWeek: f.capWeek ? cents(f.capWeek) : 0,
    capTxn: f.capTxn ? cents(f.capTxn) : 0,
    group: !!f.group,
    active: true,
    custom: true,
    createdAt: now(),
    by: PROVIDER.name,
    rateNote: `${rate}%${f.vatExempt ? " + VAT exemption" : ", VAT still due"}`,
  };
  customRules.push(r);
  designAudit.push({
    at: now(),
    by: PROVIDER.name,
    action: `Added statutory discount rule ${code} (${r.label}, ${rate}%, ${r.law}), effective ${r.effective}`,
  });
  ruleForm = null;
  toast(`Rule ${code} is active`);
  render();
}
function dcrStep(r, status, note) {
  r.status = status;
  r.history.push({ at: now(), status, by: PROVIDER.name, note: note || "" });
}

/* ================= Customer master and type-ahead ================= */
let picker = {
    ctx: null,
    q: "",
    open: false,
    hi: 0,
    adding: false,
    editId: null,
    nc: null,
    err: "",
  },
  custQ = "";
function snap(id) {
  const c = cust(id);
  return c
    ? {
        email: c.email || "",
        name: c.name,
        tin: c.tin,
        address: c.address,
        vatStatus: c.vatStatus,
        country: c.country || "",
        foreignTaxId: c.foreignTaxId || "",
      }
    : null;
}
function lastSale(id) {
  return invoices
    .filter((i) => i.customerId === id)
    .reduce((m, i) => Math.max(m, i.issuedAt || 0), 0);
}
function digits(x) {
  return String(x).replace(/\D/g, "");
}
function searchCustomers(q) {
  q = q.trim().toLowerCase();
  const dq = digits(q);
  return CUSTOMERS.filter(
    (c) =>
      !q ||
      c.name.toLowerCase().includes(q) ||
      (dq.length >= 3 && digits(c.tin).includes(dq)),
  )
    .sort((a, b) => lastSale(b.id) - lastSale(a.id))
    .slice(0, 6);
}
function hl(text, q) {
  q = q.trim();
  if (!q) return esc(text);
  const i = text.toLowerCase().indexOf(q.toLowerCase());
  if (i < 0) return esc(text);
  return (
    esc(text.slice(0, i)) +
    "<mark>" +
    esc(text.slice(i, i + q.length)) +
    "</mark>" +
    esc(text.slice(i + q.length))
  );
}
function suggHtml(ctx) {
  const list = searchCustomers(picker.q),
    q = picker.q.trim();
  const opts = list.map(
    (c, i) =>
      `<div class="opt${i === picker.hi ? " hi" : ""}" role="option" id="po-${ctx}-${i}" aria-selected="${i === picker.hi}" data-pickid="${c.id}" data-ctx="${ctx}"><b>${hl(c.name, q)}</b><small>${VS_LABEL[c.vatStatus]}. TIN ${c.tin ? hl(c.tin, q) : "none"}, ${esc(c.address)}${lastSale(c.id) ? `. Last invoice ${dDate(lastSale(c.id))}` : ""}</small></div>`,
  );
  opts.push(
    `<div class="opt add${list.length === picker.hi ? " hi" : ""}" role="option" id="po-${ctx}-${list.length}" aria-selected="${list.length === picker.hi}" data-act="pickadd" data-ctx="${ctx}">+ Add new customer${q ? ` “${esc(q)}”` : ""}</div>`,
  );
  return (
    (list.length
      ? ""
      : `<div class="opt" style="cursor:default"><small>No saved customer matches “${esc(q)}”.</small></div>`) +
    opts.join("")
  );
}
function ncForm(ctx) {
  const n = picker.nc,
    edit = !!picker.editId;
  return `<div class="panel" style="background:var(--soft)"><h2 style="font-size:15px">${edit ? "Update customer record" : "New customer"}</h2>
   <div class="fields"><div style="grid-column:1/-1"><label for="nc-name">Registered name (as in BIR COR) or customer's name if B2C</label><input id="nc-name" data-nc="name" value="${esc(n.name)}"></div>
    <div><label for="nc-vs">Buyer's tax status</label><select id="nc-vs" data-nc="vatStatus">${Object.entries(
      VS_LABEL,
    )
      .map(
        ([k, l]) =>
          `<option value="${k}"${n.vatStatus === k ? " selected" : ""}>${l}</option>`,
      )
      .join("")}</select></div>
    ${n.vatStatus === "FOREIGN" ? `<div><label for="nc-ctry">Country</label><input id="nc-ctry" data-nc="country" value="${esc(n.country || "")}"></div><div><label for="nc-ftid">Foreign tax ID (optional)</label><input id="nc-ftid" data-nc="foreignTaxId" value="${esc(n.foreignTaxId || "")}" placeholder="e.g. EIN, UEN, VAT no."></div>` : `<div><label for="nc-tin">TIN with branch code</label><input id="nc-tin" data-nc="tin" value="${esc(n.tin)}" placeholder="###-###-###-##### (blank for B2C)"></div>`}
    <div><label for="nc-em">Email for e-invoices</label><input id="nc-em" type="email" data-nc="email" value="${esc(n.email)}"><label class="inline" style="margin:4px 0 0"><input type="checkbox" data-ncb="autoEmail"${n.autoEmail !== false ? " checked" : ""}> Send e-invoices automatically</label></div>
    <div><label for="nc-terms">Payment terms</label><select id="nc-terms" data-nc="terms">${Object.entries(
      TERMS,
    )
      .filter(([k]) => k !== "CUSTOM")
      .map(
        ([k, [l]]) =>
          `<option value="${k}"${(n.terms || "NET30") === k ? " selected" : ""}>${l}</option>`,
      )
      .join("")}</select></div>
    <div><label for="nc-wht">Withholds tax on our invoices</label><select id="nc-wht" data-nc="wht"><option value="0">No</option>${WHT.slice(
      1,
    )
      .map(
        ([r, l]) =>
          `<option value="${r}"${Number(n.wht) === r ? " selected" : ""}>${l}</option>`,
      )
      .join("")}</select></div>
    ${Number(n.wht) > 0 ? `<div><label for="nc-whn">Withholding note</label><input id="nc-whn" data-nc="whtNote" value="${esc(n.whtNote || "")}" placeholder="e.g. top withholding agent; EWT on professional fees"></div>` : ""}
    <div style="grid-column:1/-1"><label for="nc-ad">Registered business address</label><input id="nc-ad" data-nc="address" value="${esc(n.address)}"></div></div>
   ${edit ? `<p class="hint" style="margin:0 0 8px">Changes apply to future documents only. Issued invoices keep the buyer details printed on them.</p>` : ""}
   <div class="err" id="nc-err">${picker.err}</div>
   <div style="display:flex;gap:8px;margin-top:8px"><button class="btn primary" data-act="ncsave" data-ctx="${ctx}">${edit ? "Save changes" : "Save and use"}</button><button class="btn" data-act="nccancel">Cancel</button></div></div>`;
}
function pickerHtml(ctx, selId, locked) {
  if (picker.ctx === ctx && picker.adding) return ncForm(ctx);
  if (selId) {
    const c = cust(selId);
    return `<div class="buyercard"><div><b>${esc(c.name)}</b><small>${VS_LABEL[c.vatStatus]}</small><small>TIN ${esc(tinTxt(c) || "none")}</small><small>${esc(c.address)}</small>${c.email ? `<small>${esc(c.email)}</small>` : ""}</div>
    <div style="display:flex;flex-direction:column;gap:2px;align-items:flex-end">${locked ? '<span class="due">Buyer fixed for this invoice</span>' : `<button class="btn link" data-act="pickchange" data-ctx="${ctx}">Change</button>`}<button class="btn link" data-act="ncedit" data-ctx="${ctx}" data-id="${c.id}">Update record</button></div></div>`;
  }
  const open = picker.ctx === ctx && picker.open;
  return `<div class="picker"><label for="pk-${ctx}">Registered name or TIN</label>
   <input id="pk-${ctx}" role="combobox" aria-autocomplete="list" aria-expanded="${open}" aria-controls="pl-${ctx}" autocomplete="off" data-pick="${ctx}" value="${esc(picker.ctx === ctx ? picker.q : "")}" placeholder="Start typing a name or TIN">
   <div id="pl-${ctx}" class="sugg" role="listbox"${open ? "" : " hidden"}>${open ? suggHtml(ctx) : ""}</div></div>
   <p class="hint" style="margin:6px 0 0">Saved customers fill in automatically. New ones are added to the customer database.</p>`;
}
function refreshSugg(ctx) {
  const el = document.getElementById("pl-" + ctx),
    inp = document.getElementById("pk-" + ctx);
  if (!el) return;
  const open = picker.ctx === ctx && picker.open;
  el.hidden = !open;
  el.innerHTML = open ? suggHtml(ctx) : "";
  if (inp) {
    inp.setAttribute("aria-expanded", open);
    inp.setAttribute(
      "aria-activedescendant",
      open ? `po-${ctx}-${picker.hi}` : "",
    );
  }
}
function resetPicker() {
  picker = {
    ctx: null,
    q: "",
    open: false,
    hi: 0,
    adding: false,
    editId: null,
    nc: null,
    err: "",
  };
}
function setBuyer(ctx, id) {
  resetPicker();
  if (ctx === "inv" && draft) {
    draft.customerId = id;
    draft.adv = {};
    const cw = cust(id);
    if (cw && !draft.termsSet) draft.terms = cw.terms || "NET30";
    if (cw && cw.wht && !draft.wht && draft.whtMode === "RATE")
      draft.wht = cw.wht;
    render();
    refreshEditor();
  } else if (ctx === "rcpt" && draftR) {
    draftR.customerId = id;
    draftR.sel = {};
    render();
  } else render();
}
function saveNc(ctx) {
  const n = picker.nc,
    name = n.name.trim(),
    tin = n.tin.trim();
  if (!name) {
    picker.err = "Enter the registered name.";
    return render();
  }
  if (n.vatStatus === "FOREIGN") {
    if (!(n.country || "").trim() || !n.address.trim()) {
      picker.err = "Enter the foreign buyer's country and address.";
      return render();
    }
  } else if (n.vatStatus !== "INDIVIDUAL" && !tin) {
    picker.err =
      'A registered business buyer needs a TIN. Choose "Individual or end consumer" for walk-in B2C buyers.';
    return render();
  }
  if (tin && !TIN_RE.test(tin)) {
    picker.err =
      "TIN must be in ###-###-###-##### format, including the branch code.";
    return render();
  }
  const dup =
    tin && CUSTOMERS.find((c) => c.tin === tin && c.id !== picker.editId);
  if (dup) {
    picker.err = `This TIN is already on file under ${esc(dup.name)} <button class="btn link" data-pickid="${dup.id}" data-ctx="${ctx}">Use that record</button>`;
    return render();
  }
  const same =
    !picker.editId &&
    CUSTOMERS.find((c) => c.name.toLowerCase() === name.toLowerCase());
  if (same && !picker.confirmDup) {
    picker.confirmDup = true;
    picker.err = `A customer named ${esc(same.name)} already exists. <button class="btn link" data-pickid="${same.id}" data-ctx="${ctx}">Use it</button>, or click Save again to add a separate record.`;
    return render();
  }
  if (picker.editId) {
    Object.assign(cust(picker.editId), {
      terms: n.terms || "NET30",
      wht: Number(n.wht || 0),
      whtNote: (n.whtNote || "").trim(),
      autoEmail: n.autoEmail !== false,
      name,
      tin: n.vatStatus === "FOREIGN" ? "" : tin,
      address: n.address.trim(),
      email: n.email.trim(),
      vatStatus: n.vatStatus,
      country: (n.country || "").trim(),
      foreignTaxId: (n.foreignTaxId || "").trim(),
    });
    toast("Customer record updated");
    const id = picker.editId;
    resetPicker();
    if (ctx === "master") render();
    else {
      render();
      if (view === "new") refreshEditor();
    }
    return;
  }
  const c = {
    terms: n.terms || "NET30",
    wht: Number(n.wht || 0),
    whtNote: (n.whtNote || "").trim(),
    autoEmail: n.autoEmail !== false,
    id: "c" + (CUSTOMERS.length + 1) + rand(3),
    name,
    tin: n.vatStatus === "FOREIGN" ? "" : tin,
    address: n.address.trim(),
    email: n.email.trim(),
    vatStatus: n.vatStatus,
    country: (n.country || "").trim(),
    foreignTaxId: (n.foreignTaxId || "").trim(),
  };
  CUSTOMERS.push(c);
  toast(`${name} saved to customers`);
  if (ctx === "master") {
    resetPicker();
    render();
  } else setBuyer(ctx, c.id);
}
function vCustomers() {
  const q = custQ.trim().toLowerCase(),
    dq = digits(q);
  const list = CUSTOMERS.filter(
    (c) =>
      !q ||
      c.name.toLowerCase().includes(q) ||
      (dq.length >= 3 && digits(c.tin).includes(dq)),
  ).sort((a, b) => a.name.localeCompare(b.name));
  const pageN = Math.max(1, Math.ceil(list.length / CPAGE));
  if (cPage > pageN) cPage = pageN;
  const pageList = list.slice((cPage - 1) * CPAGE, cPage * CPAGE);
  return `<div class="head"><div><h1>Customers</h1><p class="sub">The buyer database behind auto-fill on invoices and receipts.</p></div>${can("customer.add") && me().roleCode !== "AUDITOR" ? '<button class="btn primary" data-act="ncnew">Add customer</button>' : ""}</div>${portalReview()}
  ${picker.ctx === "master" && picker.adding ? `<div style="max-width:760px;margin-bottom:16px">${ncForm("master")}</div>` : ""}
  <div style="max-width:420px;margin-bottom:12px"><label for="cq">Search by name or TIN</label><input id="cq" data-custq="1" value="${esc(custQ)}" autocomplete="off"></div>
  <div class="tablewrap"><table><thead><tr><th>Registered name</th><th>TIN</th><th>Address</th><th>Email</th><th class="num">Invoices</th><th>Last invoice</th><th></th></tr></thead><tbody id="custBody">${custRows(pageList)}</tbody></table></div>${pager("cpage", cPage, pageN, list.length)}`;
}
function custRows(list) {
  return (
    list
      .map((c) => {
        const n = invoices.filter((i) => i.customerId === c.id).length,
          l = lastSale(c.id);
        return `<tr><td><strong>${esc(c.name)}</strong><br><span class="due">${VS_LABEL[c.vatStatus]}</span></td><td>${esc(c.vatStatus === "FOREIGN" ? "None (" + (c.country || "foreign") + ")" : c.tin) || "—"}</td><td style="white-space:normal">${esc(c.address)}</td><td>${esc(c.email) || "—"}</td><td class="num">${n}</td><td>${l ? dDate(l) : "—"}</td><td>${can("master") ? `<button class="btn link" data-act="ncedit" data-ctx="master" data-id="${c.id}">Edit</button>` : ""}</td></tr>`;
      })
      .join("") ||
    `<tr><td colspan="7" class="due">No customers match.</td></tr>`
  );
}

/* ================= Small sales tally (non-VAT, RMC 77-2024 Q2-Q3) ================= */
const TALLY_LIMIT = 50000;
let tally = [],
  closedDays = [],
  tDraft = { desc: "", amt: "", tax: "SSPT", err: "" };
function tallyToday() {
  return tally.filter(
    (t) => t.day === todayISO() && (t.branch || "00000") === (wb() || "00000"),
  );
}
function uncovered(day) {
  return tally.filter(
    (t) =>
      t.day === day && !t.invNo && (t.branch || "00000") === (wb() || "00000"),
  );
}
function sum(a) {
  return a.reduce((x, t) => x + t.amount, 0);
}
function aggCustomer() {
  let c = CUSTOMERS.find((x) => x.id === "cagg");
  if (!c) {
    c = {
      id: "cagg",
      name: "VARIOUS WALK-IN CUSTOMERS",
      tin: "",
      address: "Various",
      email: "",
      vatStatus: "INDIVIDUAL",
    };
    CUSTOMERS.push(c);
  }
  return c;
}
function vTally() {
  if (S.vat)
    return `<div class="head"><div><h1>Small sales tally</h1><p class="sub">For non-VAT sellers only.</p></div></div>
   <div class="panel" style="max-width:720px"><p style="margin-top:0">${esc(S.name)} is VAT-registered, so every sale needs its own invoice regardless of amount (RR 7-2024 Sec. 3; RMC 77-2024 Q1). There is nothing to tally.</p>
   <p class="hint">Non-VAT sellers issue an invoice for sales of ₱500 or more or on the buyer's request. Sales below ₱500 are tallied, and one invoice is issued once the day's total reaches the threshold (RMC 77-2024 Q2–Q3).</p>
   <button class="btn" data-act="demononvat">Switch this demo company to non-VAT to try it</button></div>`;
  const day = todayISO(),
    un = uncovered(day),
    tot = sum(un),
    pct = Math.min(100, Math.round((tot / TALLY_LIMIT) * 100)),
    today = tallyToday();
  return `<div class="head"><div><h1>Small sales tally</h1><p class="sub">Non-VAT sales below ₱500 where the buyer did not ask for an invoice. Once today's total reaches ₱500, issue one aggregate invoice.</p></div>
   <button class="btn" data-act="closeday">Close the day</button></div>
  ${tot >= TALLY_LIMIT ? `<div class="banner bad"><strong>Today's small sales have reached ${peso(tot)}.</strong> Issue one aggregate invoice covering these ${un.length} sales. <button class="btn primary" style="margin-left:8px" data-act="agginv">Issue aggregate invoice</button></div>` : ""}
  <div class="stats"><div class="stat${tot >= TALLY_LIMIT ? " alert" : ""}"><b>${peso(tot)}</b><span>Today, not yet invoiced (${un.length} sale${un.length === 1 ? "" : "s"})</span><div class="bar${tot >= TALLY_LIMIT ? " full" : ""}"><span style="width:${pct}%"></span></div></div>
   <div class="stat"><b>${peso(Math.max(0, TALLY_LIMIT - tot))}</b><span>Left before an aggregate invoice is required</span></div>
   <div class="stat"><b>${peso(sum(today))}</b><span>All small sales today</span></div></div>
  <div class="grid2"><div class="stack">
   <div class="tablewrap"><table><thead><tr><th>Time</th><th>Sale</th><th>Tax treatment</th><th class="num">Amount</th><th>Invoice</th></tr></thead><tbody>
   ${
     today.length
       ? today
           .slice()
           .reverse()
           .map(
             (t) =>
               `<tr><td>${new Date(t.at).toLocaleTimeString("en-PH", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit" })}</td><td>${esc(t.desc)}</td><td>${TAX_NV[t.tax]}</td><td class="num">${peso(t.amount)}</td><td>${t.invNo ? `<button class="btn link" data-open="${t.invNo}">Invoice No. ${t.invNo}</button>` : '<span class="pill s-pending">Not yet</span>'}</td></tr>`,
           )
           .join("")
       : `<tr><td colspan="5" class="due">No small sales recorded today.</td></tr>`
   }</tbody></table></div>
   ${
     closedDays.length
       ? `<div class="panel"><h2>Closed days</h2><ul class="dl">${closedDays
           .slice()
           .reverse()
           .map(
             (c) =>
               `<li><b>${isoDate(c.day)}</b>: ${c.count} small sales, ${peso(c.total)}. ${c.invNos.length ? `Covered by Invoice No. ${c.invNos.join(", ")}.` : "Total stayed below ₱500; no invoice required."}</li>`,
           )
           .join("")}</ul></div>`
       : ""
   }
  </div>
  <div class="stack"><div class="panel"><h2>Record a small sale</h2>
   <div class="fields"><div style="grid-column:1/-1"><label for="tdesc">What was sold</label><input id="tdesc" data-t="desc" value="${esc(tDraft.desc)}" placeholder="e.g. Photocopies, snacks"></div>
    <div><label for="tamt">Amount</label><input id="tamt" type="number" step="0.01" min="0" data-t="amt" value="${esc(tDraft.amt)}"></div>
    <div><label for="ttax">Tax treatment</label><select id="ttax" data-t="tax">${Object.entries(
      TAX_NV,
    )
      .map(
        ([k, l]) =>
          `<option value="${k}"${k === tDraft.tax ? " selected" : ""}>${l}</option>`,
      )
      .join("")}</select></div></div>
   <div class="err">${tDraft.err}</div>
   <button class="btn primary" data-act="tadd">Record sale</button>
   <p class="hint">Buyer asked for an invoice? <button class="btn link" data-go="new">Issue an invoice instead</button>, whatever the amount.</p></div></div></div>`;
}
function startAggregate(day) {
  const un = uncovered(day);
  if (!un.length) return;
  const c = aggCustomer();
  go("new");
  const by = {};
  un.forEach((t) => {
    by[t.tax] = (by[t.tax] || 0) + t.amount;
  });
  Object.assign(draft, {
    customerId: c.id,
    salesType: "CASH",
    txnDate: day,
    nature: "GOODS",
    refs: { aggregate: { day, ids: un.map((t) => t.id) } },
    items: Object.entries(by).map(([tax, a]) => ({
      desc: `Aggregate of ${un.filter((t) => t.tax === tax).length} sale${un.filter((t) => t.tax === tax).length === 1 ? "" : "s"} below ₱500 on ${isoDate(day)}${Object.keys(by).length > 1 ? " (" + TAX_NV[tax].toLowerCase() + ")" : ""}`,
      qty: 1,
      price: a / 100,
      tax,
      disc: 0,
    })),
  });
  render();
  toast("Review and issue the aggregate invoice.");
}

/* ================= Products and stock (Inventory module) ================= */
let pCat = "ALL",
  pKind = "ALL",
  pPage = 1,
  cPage = 1,
  impState = null;
const PPAGE = 20,
  CPAGE = 20;
let nextTR = 2,
  ITEMS = [],
  stockDocs = [],
  nextRR = 2,
  nextRS = 1,
  nextADJ = 2,
  pTab = "items",
  pQ = "",
  itemForm = null,
  sDraft = null;
const UOMS = ["pc", "ream", "box", "set", "unit", "sack", "lot", "kg", "hour"];
const DOC_LABEL = {
  PURCHASE: "Receiving report",
  SUPRETURN: "Return to supplier",
  ADJ: "Stock adjustment",
  TRANSFER: "Stock transfer",
};
const ADJ_REASONS = [
  "Physical count variance",
  "Damaged goods",
  "Loss or theft",
  "Expired or obsolete",
  "Found during count",
];
function itemById(id) {
  return ITEMS.find((i) => i.id === id);
}
function skuLabel(i) {
  return `${i.sku} — ${i.desc}`;
}
function findItemByLabel(v) {
  v = (v || "").trim();
  if (!v) return null;
  const sku = v.split(" — ")[0].trim().toLowerCase();
  return (
    ITEMS.find(
      (i) => i.sku.toLowerCase() === sku || (i.barcode && i.barcode === v),
    ) || null
  );
}
function fmtQty(q) {
  q = Number(q) || 0;
  return (q === 0 ? 0 : q).toLocaleString("en-PH", {
    maximumFractionDigits: 3,
  });
}
function priceAt(item, code) {
  const bp = item.branchPrices && item.branchPrices[code];
  return bp != null && bp !== "" ? Number(bp) : item.price;
}
function applyItem(it, item) {
  it.itemId = item.id;
  it.scCat = item.scCat || "NONE";
  it.sku = item.sku;
  it.uom = item.uom;
  it.desc = item.desc;
  let tax = item.tax;
  if (!draft.vat) tax = tax === "EXEMPT" ? "EXEMPT" : "SSPT";
  it.tax = tax;
  let pr = priceAt(item, draft.branch);
  if (isFX(draft)) {
    const f = rateFor(curOf(draft), draft.txnDate || todayISO());
    pr = f ? Math.round((pr / f.rate) * 100) / 100 : 0;
  }
  it.price =
    draft.vat && draft.incl && tax === "VATABLE"
      ? Math.round(pr * 112) / 100
      : pr;
}
function isStockLine(it) {
  const i = it && itemById(it.itemId);
  return !!(i && i.type === "GOODS");
}
function qtyMode(d) {
  return (
    d &&
    (d.reason === "Return of goods" || d.reason === "Cancellation of invoice")
  );
}
function returnedQty(invNo, idx) {
  let q = 0;
  credits
    .filter((c) => c.invNo === invNo)
    .forEach((c) =>
      c.lines.forEach((l) => {
        if (l.src === idx && l.qty) q += l.qty;
      }),
    );
  cmReqs
    .filter((r) => r.status === "PENDING" && r.invNo === invNo)
    .forEach((r) =>
      r.lines.forEach((l) => {
        if (l.src === idx && l.qty) q += l.qty;
      }),
    );
  return q;
}
/* every movement is derived from its source document, so the ledger can never drift from the documents */
function movesOf(id, loc) {
  const item = itemById(id),
    m = [];
  if (item.opening && item.opening.qty)
    m.push({
      loc: "00000",
      at: item.opening.at,
      kind: "OPEN",
      doc: "Opening balance",
      qty: item.opening.qty,
      cost: item.opening.cost,
    });
  stockDocs
    .filter((d) => ["POSTED", "IN_TRANSIT", "RECEIVED"].includes(d.status))
    .forEach((d) =>
      d.lines
        .filter((l) => l.itemId === id)
        .forEach((l) => {
          const at = d.postedAt || d.at,
            ref = { t: "sd", id: d.id };
          if (d.type === "TRANSFER") {
            m.push({
              loc: d.branch,
              at,
              kind: "TRANSFER",
              doc: `Stock transfer ${d.id} to ${brOf(d.toBranch).name}`,
              ref,
              qty: -l.qty,
              cost: null,
            });
            if (d.status !== "IN_TRANSIT") {
              const rq = l.recvQty ?? l.qty;
              if (rq > 0)
                m.push({
                  loc: d.toBranch,
                  at: d.receivedAt || at,
                  kind: "TRANSFER",
                  doc: `Stock transfer ${d.id} from ${brOf(d.branch).name}${rq < l.qty ? `, received ${fmtQty(rq)} of ${fmtQty(l.qty)}` : ""}`,
                  ref,
                  qty: rq,
                  cost: l.unitCost,
                });
            }
            return;
          }
          const sign =
            d.type === "PURCHASE"
              ? 1
              : d.type === "SUPRETURN"
                ? -1
                : d.dir === "IN"
                  ? 1
                  : -1;
          m.push({
            loc: d.branch || "00000",
            at,
            kind: d.type,
            doc: `${DOC_LABEL[d.type]} ${d.id}`,
            ref,
            qty: sign * l.qty,
            cost: d.type === "PURCHASE" ? l.unitCost : null,
          });
        }),
    );
  invoices.forEach((inv) =>
    inv.items.forEach((it) => {
      if (it.itemId === id && item.type === "GOODS")
        m.push({
          loc: inv.branch || "00000",
          at: inv.issuedAt,
          kind: "SALE",
          doc: `Invoice ${inv.no}`,
          ref: { t: "inv", id: inv.no },
          qty: -Number(it.qty),
        });
    }),
  );
  credits.forEach((cn) =>
    cn.lines.forEach((l) => {
      const inv = invOf(cn.invNo),
        it = inv.items[l.src];
      if (it.itemId === id && l.qty)
        m.push({
          loc: inv.branch || "00000",
          at: cn.at,
          kind: "CUSTRETURN",
          doc: `Credit Memo ${cn.no} (${cn.reason.toLowerCase()})`,
          ref: { t: "cn", id: cn.no },
          qty: l.qty,
        });
    }),
  );
  const f = loc ? m.filter((x) => x.loc === loc) : m;
  f.sort((a, b) => a.at - b.at);
  let q = 0,
    avg = 0;
  f.forEach((x) => {
    if (x.qty > 0 && x.cost != null) {
      avg =
        q + x.qty > 0
          ? Math.round((q * avg + x.qty * x.cost) / (q + x.qty))
          : x.cost;
    }
    x.unit = x.cost ?? avg;
    q += x.qty;
    x.bal = q;
    x.avg = avg;
    x.value = Math.round(q * avg);
  });
  return f;
}
function onHand(id, loc) {
  const m = movesOf(id, loc);
  return m.length ? m[m.length - 1].bal : 0;
}
function avgCost(id, loc) {
  const m = movesOf(id, loc);
  return m.length
    ? m[m.length - 1].avg
    : (itemById(id).opening || {}).cost || 0;
}
function recon(id, loc) {
  const r = {
    OPEN: 0,
    PURCHASE: 0,
    SUPRETURN: 0,
    SALE: 0,
    CUSTRETURN: 0,
    ADJ: 0,
    TRANSFER: 0,
  };
  movesOf(id, loc).forEach((x) => {
    r[x.kind] += x.qty;
  });
  r.end = onHand(id, loc);
  return r;
}
function stockDocChecks(d) {
  const out = [];
  out.push([
    d.lines.length > 0 &&
      d.lines.every((l) => l.itemId && itemById(l.itemId).type === "GOODS"),
    "Every line is a stocked item (SKU)",
  ]);
  out.push([d.lines.every((l) => l.qty > 0), "Quantities above zero"]);
  if (d.type === "PURCHASE") {
    out.push([
      !!d.supplier.trim() && !!d.supDoc.trim(),
      "Supplier name and supplier invoice no. entered",
    ]);
    out.push([
      d.lines.every((l) => l.unitCost > 0),
      "Unit cost entered for every line",
    ]);
    out.push([
      !d.supTin || TIN_RE.test(d.supTin),
      "Supplier TIN, if any, in ###-###-###-##### format",
    ]);
  }
  if (d.type === "SUPRETURN")
    out.push([
      !!d.supplier.trim() && !!d.supDoc.trim(),
      "Supplier and return slip or debit memo no. entered",
    ]);
  if (d.type === "ADJ")
    out.push([!!d.reason, "Reason for the adjustment selected"]);
  if (d.type === "TRANSFER")
    out.push([
      !!d.toBranch && d.toBranch !== d.branch,
      "Receiving branch selected",
    ]);
  if (
    d.type === "SUPRETURN" ||
    d.type === "TRANSFER" ||
    (d.type === "ADJ" && d.dir === "OUT")
  ) {
    const need = {};
    d.lines.forEach((l) => {
      if (l.itemId) need[l.itemId] = (need[l.itemId] || 0) + l.qty;
    });
    out.push([
      Object.entries(need).every(([id, q]) => q <= onHand(id, d.branch)),
      "Quantity out does not exceed stock on hand",
    ]);
  }
  return out;
}
function vProducts() {
  const tabs = `<div class="tabs" role="group" aria-label="Products and stock sections">${[
    ["items", "Items"],
    ["docs", "Stock in and out"],
    ["recon", "Inventory reconciliation"],
    ["promos", "Store promotions"],
  ]
    .map(
      ([k, l]) =>
        `<button class="btn" data-ptab="${k}" aria-pressed="${pTab === k}">${l}</button>`,
    )
    .join("")}</div>`;
  const pend = stockDocs.filter((d) => d.status === "PENDING").length;
  let body = "";
  if (pTab === "items") {
    const list = productList(),
      pages = Math.max(1, Math.ceil(list.length / PPAGE));
    if (pPage > pages) pPage = pages;
    const pageList = list.slice((pPage - 1) * PPAGE, pPage * PPAGE);
    const val = ITEMS.filter((i) => i.type === "GOODS").reduce(
        (a, i) =>
          a + Math.round(onHand(i.id, stockLoc()) * avgCost(i.id, stockLoc())),
        0,
      ),
      low = ITEMS.filter(
        (i) => i.type === "GOODS" && onHand(i.id, stockLoc()) <= i.reorder,
      );
    body = `<div class="stats"><div class="stat"><b>${ITEMS.length}</b><span>Items in the master list</span></div><div class="stat"><b>${peso(val)}</b><span>Stock value at average cost</span></div><div class="stat${low.length ? " alert" : ""}"><b>${low.length}</b><span>At or below reorder level</span></div></div>
     ${itemForm ? `<div style="max-width:820px;margin-bottom:16px">${itemFormHtml()}</div>` : ""}
     ${impState || impOpen ? impPanel() : ""}<div class="fields" style="margin-bottom:12px"><div><label for="pq">Search SKU, barcode or name</label><input id="pq" data-pq="1" value="${esc(pQ)}" autocomplete="off"></div>
      <div><label for="pcat">Category</label><select id="pcat" data-pcat="1"><option value="ALL">All categories</option>${categories()
        .map(
          (c) => `<option${pCat === c ? " selected" : ""}>${esc(c)}</option>`,
        )
        .join("")}</select></div>
      <div><label for="pkind">Show</label><select id="pkind" data-pkind="1">${[
        ["ALL", "All items"],
        ["SERVICE", "Services"],
        ["GOODS", "Products"],
        ["LOW", "At or below reorder level"],
        ["INACTIVE", "Inactive"],
      ]
        .map(
          ([k, l]) =>
            `<option value="${k}"${pKind === k ? " selected" : ""}>${l}</option>`,
        )
        .join("")}</select></div>
      <div style="display:flex;gap:8px;align-items:flex-end"><button class="btn primary" data-act="itemnew">Add item</button><button class="btn" data-act="impstart">Import from CSV</button></div></div>
     <div class="tablewrap"><table><thead><tr><th>SKU</th><th>Description</th><th>Unit</th><th class="num">Selling price</th><th>Tax treatment</th><th class="num">On hand</th><th class="num">Avg cost</th><th class="num">Stock value</th><th></th></tr></thead><tbody id="itemBody">${itemRows(pageList)}</tbody></table></div>${pager("ppage", pPage, pages, list.length)}`;
  }
  if (pTab === "docs") {
    body = `<div style="display:flex;gap:8px;flex-wrap:wrap;margin-bottom:14px"><button class="btn primary" data-act="sdnew" data-type="PURCHASE">Receive a purchase</button><button class="btn" data-act="sdnew" data-type="SUPRETURN">Return to supplier</button><button class="btn" data-act="sdnew" data-type="TRANSFER">Transfer to another branch</button><button class="btn" data-act="sdnew" data-type="ADJ">Stock adjustment</button></div>
     <p class="hint" style="margin:0 0 12px">Sales go out automatically when an invoice is issued. Customer returns come back in through an approved credit memo ("Return of goods"). A cancelled invoice reverses its quantities.</p>
     ${
       stockDocs.length
         ? `<div class="tablewrap"><table><thead><tr><th>Document</th><th>Date</th><th>Type</th><th>Supplier or reason</th><th class="num">Lines</th><th>Status</th></tr></thead><tbody>
      ${stockDocs
        .filter((d) => inBr(d.branch) || (d.toBranch && inBr(d.toBranch)))
        .slice()
        .reverse()
        .map(
          (d) =>
            `<tr class="row" data-opensd="${d.id}" tabindex="0"><td><strong>${d.id}</strong><br><span class="due">${esc(brOf(d.branch).name)}</span></td><td>${fmtDate(d.at)}</td><td>${DOC_LABEL[d.type]}${d.type === "ADJ" ? ` (${d.dir === "IN" ? "increase" : "decrease"})` : ""}</td><td>${esc(d.type === "ADJ" ? d.reason : d.type === "TRANSFER" ? `To ${brOf(d.toBranch).name}` : d.supplier)}</td><td class="num">${d.lines.length}</td><td>${d.status === "IN_TRANSIT" ? '<span class="pill s-pending">In transit</span>' : d.status === "RECEIVED" ? (d.lines.some((l) => (l.recvQty ?? l.qty) < l.qty) ? '<span class="pill s-rejected">Received short</span>' : '<span class="pill s-paid">Received</span>') : d.status === "POSTED" ? '<span class="pill s-paid">Posted</span>' : d.status === "PENDING" ? '<span class="pill s-pending">Awaiting approval</span>' : '<span class="pill s-rejected">Declined</span>'}</td></tr>`,
        )
        .join("")}</tbody></table></div>`
         : `<div class="panel empty">No stock documents yet.</div>`
     }`;
  }
  if (pTab === "promos") {
    const mgr = can("approve") || can("settings");
    body = `<p class="hint" style="margin-top:0">Store-wide sale discounts set by a manager. They apply automatically on the listed items, at the counter and in the full system, and are compared line by line with statutory discounts (whichever is higher).</p>
    ${mgr ? `<div style="margin-bottom:12px"><button class="btn primary" data-act="promonew">Add promotion</button></div>` : ""}
    ${
      promoForm
        ? `<div class="panel" style="background:var(--soft);max-width:820px;margin-bottom:14px"><h2>New promotion</h2><div class="fields"><div><label for="pm-n">Name shown on the invoice</label><input id="pm-n" data-pm="name" value="${esc(promoForm.name)}"></div><div><label for="pm-p">Discount (%)</label><input id="pm-p" type="number" min="0" max="99" data-pm="pct" value="${esc(promoForm.pct)}"></div><div><label for="pm-f">From</label><input id="pm-f" type="date" data-pm="from" value="${promoForm.from}"></div><div><label for="pm-t">To</label><input id="pm-t" type="date" data-pm="to" value="${promoForm.to}"></div><div><label for="pm-b">Branch</label><select id="pm-b" data-pm="branch"><option value="ALL">All branches</option>${BRS.filter(
            (b) => b.active,
          )
            .map(
              (b) =>
                `<option value="${b.code}"${promoForm.branch === b.code ? " selected" : ""}>${esc(b.name)}</option>`,
            )
            .join("")}</select></div></div>
     <span class="lbl">Items</span><div style="display:flex;flex-wrap:wrap;gap:4px 14px">${ITEMS.filter(
       (i) => !i.inactive,
     )
       .map(
         (i) =>
           `<label class="inline" style="margin:2px 0"><input type="checkbox" data-pmsku="${esc(i.sku)}"${promoForm.skus.includes(i.sku) ? " checked" : ""}> ${esc(i.sku)}</label>`,
       )
       .join("")}</div>
     <div class="err">${esc(promoForm.err || "")}</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn primary" data-act="promosave">Save promotion</button><button class="btn" data-act="promocancel">Cancel</button></div></div>`
        : ""
    }
    <div class="tablewrap"><table><thead><tr><th>Promotion</th><th class="num">Discount</th><th>Dates</th><th>Items</th><th>Branch</th><th>Status</th><th></th></tr></thead><tbody>${
      STORE_PROMOS.map((p) => {
        const live =
          p.active !== false && p.from <= todayISO() && p.to >= todayISO();
        return `<tr><td><strong>${esc(p.name)}</strong><br><span class="due">set by ${esc(p.by)}</span></td><td class="num">${p.pct}%</td><td>${isoDate(p.from)} to ${isoDate(p.to)}</td><td style="white-space:normal">${p.skus.map(esc).join(", ")}</td><td>${p.branch === "ALL" ? "All" : esc(brOf(p.branch).name)}</td><td>${p.active === false ? '<span class="pill s-draft">Ended</span>' : live ? '<span class="pill s-paid">Running</span>' : '<span class="pill s-pending">Scheduled</span>'}</td><td>${mgr && p.active !== false ? `<button class="btn link" data-act="promooff" data-id="${p.id}">End</button>` : ""}</td></tr>`;
      }).join("") || '<tr><td colspan="7" class="due">No promotions.</td></tr>'
    }</tbody></table></div>`;
  }
  if (pTab === "recon") {
    const goods = ITEMS.filter((i) => i.type === "GOODS"),
      rows = goods.map((i) => ({ i, r: recon(i.id, stockLoc()) }));
    body = `<p class="hint" style="margin:0 0 12px">Beginning + purchases − returns to suppliers − sales + customer returns ± adjustments = ending. Quantities come straight from the source documents.</p>
     <div class="tablewrap"><table style="min-width:900px"><thead><tr><th>SKU</th><th class="num">Beginning</th><th class="num">Purchases</th><th class="num">Returned to suppliers</th><th class="num">Sold (invoices)</th><th class="num">Customer returns (CM)</th><th class="num">Adjustments</th><th class="num">Transfers</th><th class="num">Ending</th><th class="num">Value</th></tr></thead><tbody>
     ${rows.map(({ i, r }) => `<tr class="row" data-openitem="${i.id}" tabindex="0"><td><strong>${esc(i.sku)}</strong><br><span class="due">${esc(i.uom)}</span></td><td class="num">${fmtQty(r.OPEN)}</td><td class="num">${fmtQty(r.PURCHASE)}</td><td class="num">${fmtQty(-r.SUPRETURN)}</td><td class="num">${fmtQty(-r.SALE)}</td><td class="num">${fmtQty(r.CUSTRETURN)}</td><td class="num">${r.ADJ > 0 ? "+" : ""}${fmtQty(r.ADJ)}</td><td class="num">${r.TRANSFER > 0 ? "+" : ""}${fmtQty(r.TRANSFER)}</td><td class="num"><strong>${fmtQty(r.end)}</strong></td><td class="num">${peso(Math.round(r.end * avgCost(i.id, stockLoc())))}</td></tr>`).join("")}</tbody></table></div>`;
  }
  const incoming = stockDocs.filter(
    (d) =>
      d.type === "TRANSFER" && d.status === "IN_TRANSIT" && inBr(d.toBranch),
  );
  return `${incoming.length ? `<div class="banner info"><strong>${incoming.length} transfer${incoming.length > 1 ? "s" : ""} in transit to ${esc(brLabel(viewBr))}:</strong> ${incoming.map((d) => `<button class="btn link" data-opensd="${d.id}">${d.id}</button>`).join(", ")}. Confirm receipt when the goods arrive.</div>` : ""}<div class="head"><div><h1>Products and stock</h1><p class="sub">Item master (SKUs) and every movement in and out.${pend ? ` ${pend} adjustment${pend > 1 ? "s" : ""} awaiting approval.` : ""}</p></div></div>${tabs}${body}`;
}
let impOpen = false;
const IMP_COLS = [
  "sku",
  "barcode",
  "description",
  "category",
  "unit",
  "selling_price",
  "tax_treatment",
  "type",
  "reorder_level",
  "opening_qty",
  "opening_unit_cost",
];
function parseCSV(t) {
  const rows = [];
  let r = [],
    f = "",
    q = false;
  for (let i = 0; i < t.length; i++) {
    const ch = t[i];
    if (q) {
      if (ch === '"') {
        if (t[i + 1] === '"') {
          f += '"';
          i++;
        } else q = false;
      } else f += ch;
    } else if (ch === '"') q = true;
    else if (ch === ",") {
      r.push(f);
      f = "";
    } else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && t[i + 1] === "\n") i++;
      r.push(f);
      rows.push(r);
      r = [];
      f = "";
    } else f += ch;
  }
  if (f !== "" || r.length) {
    r.push(f);
    rows.push(r);
  }
  return rows.filter((x) => x.some((c) => c.trim() !== ""));
}
function normTax(v) {
  v = (v || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z]/g, "");
  return v === "vatable" || v === "vat"
    ? "VATABLE"
    : v === "exempt" || v === "vatexempt"
      ? "EXEMPT"
      : v === "zerorated" || v === "zero"
        ? "ZERO_RATED"
        : null;
}
function normType(v) {
  v = (v || "").trim().toLowerCase();
  return v.startsWith("good") || v === "product" || v === "products"
    ? "GOODS"
    : v.startsWith("serv")
      ? "SERVICE"
      : null;
}
function validateImport(rows) {
  if (!rows.length) return [];
  const head = rows[0].map((h) => h.trim().toLowerCase().replace(/\s+/g, "_")),
    idx = (k) => head.indexOf(k),
    seen = new Set();
  if (idx("sku") < 0 || idx("description") < 0)
    return [
      {
        line: 1,
        status: "ERROR",
        msg: "Header row must include at least sku and description. Download the template.",
      },
    ];
  return rows.slice(1).map((r, n) => {
    const g = (k) => (idx(k) >= 0 ? (r[idx(k)] || "").trim() : ""),
      sku = g("sku").toUpperCase(),
      o = {
        line: n + 2,
        sku,
        barcode: g("barcode"),
        desc: g("description"),
        category: g("category"),
        uom: g("unit") || "pc",
        price: g("selling_price"),
        tax: normTax(g("tax_treatment") || "VATable"),
        type: normType(g("type") || "service"),
        reorder: g("reorder_level"),
        oq: g("opening_qty"),
        oc: g("opening_unit_cost"),
      },
      err = [];
    if (!/^[A-Z0-9][A-Z0-9._-]{0,29}$/.test(sku))
      err.push("SKU missing or invalid");
    if (seen.has(sku)) err.push("SKU repeated in the file");
    seen.add(sku);
    if (!o.desc) err.push("description missing");
    if (o.price === "" || isNaN(+o.price) || +o.price < 0)
      err.push("selling price must be a number");
    if (!o.tax) err.push("tax treatment must be VATable, Exempt or Zero-rated");
    if (!o.type) err.push("type must be Goods or Service");
    if (o.reorder && (isNaN(+o.reorder) || +o.reorder < 0))
      err.push("reorder level must be a number");
    if (
      (o.oq || o.oc) &&
      (isNaN(+o.oq) || isNaN(+o.oc) || +o.oq < 0 || +o.oc < 0)
    )
      err.push("opening quantity and cost must be numbers");
    const ex = ITEMS.find((i) => i.sku === sku);
    if (ex && (o.oq || o.oc))
      err.push("opening balance applies only to new items");
    if (o.type === "SERVICE" && (o.oq || o.oc))
      err.push("services carry no opening stock");
    return {
      ...o,
      status: err.length ? "ERROR" : ex ? "UPDATE" : "NEW",
      msg: err.join("; "),
      exId: ex && ex.id,
    };
  });
}
function impPanel() {
  const S2 = impState,
    ok = S2 ? S2.rows.filter((r) => r.status !== "ERROR") : [];
  return `<div class="panel" style="background:var(--soft);margin-bottom:14px"><h2>Import items from a CSV file</h2>
   <p class="hint" style="margin-top:0">Columns: ${IMP_COLS.join(", ")}. Tax treatment: VATable, Exempt or Zero-rated. Type: Goods or Service. Existing SKUs are updated (not their stock); new SKUs are added, with an optional opening balance for goods.</p>
   <div style="display:flex;gap:8px;flex-wrap:wrap;align-items:center"><button class="btn" data-act="imptemplate">Download template</button><label class="btn" style="cursor:pointer">Choose CSV file<input type="file" accept=".csv,text/csv" data-impfile="1" style="display:none"></label>${S2 ? `<span class="due">${esc(S2.name)}: ${S2.rows.length} row(s)</span>` : ""}</div>
   ${
     S2
       ? `<div class="tablewrap" style="margin-top:12px;max-height:340px;overflow:auto"><table style="min-width:860px"><thead><tr><th>Line</th><th>SKU</th><th>Description</th><th>Category</th><th class="num">Price</th><th>Tax</th><th>Type</th><th>Result</th></tr></thead><tbody>${S2.rows.map((r) => `<tr><td>${r.line}</td><td>${esc(r.sku || "")}</td><td style="white-space:normal">${esc(r.desc || "")}</td><td>${esc(r.category || "")}</td><td class="num">${esc(r.price || "")}</td><td>${esc(r.tax || "")}</td><td>${esc(r.type || "")}</td><td>${r.status === "ERROR" ? `<span class="pill s-rejected">Error</span> <span class="due">${esc(r.msg)}</span>` : r.status === "UPDATE" ? '<span class="pill s-pending">Update</span>' : '<span class="pill s-paid">New</span>'}</td></tr>`).join("")}</tbody></table></div>
    <div style="display:flex;gap:8px;margin-top:10px"><button class="btn primary" data-act="impdo"${ok.length ? "" : " disabled"}>Import ${ok.length} valid row${ok.length === 1 ? "" : "s"}</button><button class="btn" data-act="impcancel">Cancel</button></div>`
       : `<div style="margin-top:10px"><button class="btn link" data-act="impcancel">Close</button></div>`
   }</div>`;
}
function doImport() {
  const rows = impState.rows.filter((r) => r.status !== "ERROR");
  let n = 0,
    u = 0;
  rows.forEach((r) => {
    const vals = {
      sku: r.sku,
      barcode: r.barcode,
      desc: r.desc,
      category: r.category,
      uom: r.uom,
      price: +r.price,
      tax: r.tax,
      type: r.type,
      reorder: +(r.reorder || 0),
    };
    if (r.status === "UPDATE") {
      Object.assign(itemById(r.exId), vals);
      u++;
    } else {
      ITEMS.push({
        ...vals,
        id: "i" + (ITEMS.length + 1) + rand(2),
        scCat: "NONE",
        opening:
          r.type === "GOODS" && +r.oq > 0
            ? { qty: +r.oq, cost: cents(r.oc), at: now() }
            : null,
      });
      n++;
    }
  });
  slog("Items imported from CSV", `${impState.name}: ${n} new, ${u} updated`);
  toast(`${n} item(s) added, ${u} updated`);
  impState = null;
  impOpen = false;
  render();
}
let storageSim = 0,
  storageLvl = 0;
function bytesOf(x) {
  try {
    return new Blob([JSON.stringify(x)]).size;
  } catch (e) {
    return JSON.stringify(x).length;
  }
}
function storageUse() {
  const docs = bytesOf({
      invoices,
      credits,
      receipts,
      corrections,
      cmReqs,
      corrReqs,
      stockDocs,
    }),
    masters = bytesOf({ CUSTOMERS, ITEMS, STORE_PROMOS, fxRates }),
    files =
      portalSubs.reduce((a, x) => a + (x.file ? x.file.size : 0), 0) +
      CUSTOMERS.reduce((a, c) => a + (c.cor ? c.cor.size : 0), 0) +
      designs.reduce((a, d) => a + (d.logo ? d.logo.length : 0), 0),
    logs = bytesOf({ secLog, exportLog, supportThreads, kRequests }),
    quota = S.plan.mb * 1024 * 1024,
    used = docs + masters + files + logs + storageSim;
  return {
    docs,
    masters,
    files,
    logs,
    sim: storageSim,
    used,
    quota,
    pct: Math.min(100, (used / quota) * 100),
  };
}
function fmtBytes(b) {
  return b < 1024
    ? b + " B"
    : b < 1048576
      ? (b / 1024).toFixed(1) + " KB"
      : (b / 1048576).toFixed(2) + " MB";
}
function storageCheck() {
  const u = storageUse(),
    lvl = u.pct >= 100 ? 100 : u.pct >= 90 ? 90 : u.pct >= 80 ? 80 : 0;
  if (lvl > storageLvl) {
    storageLvl = lvl;
    slog(
      "Storage alert",
      `${u.pct.toFixed(0)}% of the ${S.plan.name} plan used; alert emailed to the administrator`,
    );
    if (me() && can("settings"))
      toast(
        `Storage ${u.pct.toFixed(0)}% full. Alert emailed to the administrator.`,
      );
  } else if (lvl < storageLvl) storageLvl = lvl;
  return u;
}
function storageBanner() {
  if (!me() || !can("settings")) return "";
  const u = storageUse();
  if (u.pct < 80) return "";
  return `<div class="banner ${u.pct >= 100 ? "bad" : "info"}"><strong>Storage ${u.pct.toFixed(0)}% full</strong> (${fmtBytes(u.used)} of ${S.plan.mb} MB on the ${esc(S.plan.name)} plan). ${u.pct >= 100 ? "Invoicing continues, but upgrade the plan or archive old attachments now." : "Plan an upgrade or archive old attachments before it fills."} <button class="btn link" data-go="users">See storage</button></div>`;
}
function storagePanel() {
  const u = storageCheck(),
    col =
      u.pct >= 100 ? "var(--bad)" : u.pct >= 80 ? "var(--warn)" : "var(--ok)",
    row = (l, b) =>
      `<tr><td>${l}</td><td class="num">${fmtBytes(b)}</td><td class="num">${((b / u.quota) * 100).toFixed(2)}%</td></tr>`;
  return `<div class="panel" style="margin-bottom:16px"><h2>Storage</h2><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><span><b>${fmtBytes(u.used)}</b> used of ${S.plan.mb} MB (${esc(S.plan.name)} plan)</span><b style="color:${col}">${u.pct.toFixed(1)}%</b></div>
   <div class="gauge" role="img" aria-label="Storage ${u.pct.toFixed(0)} percent used" style="margin:8px 0 12px"><span style="width:${Math.max(u.pct, 0.5)}%;background:${col}"></span></div>
   <table style="min-width:0"><tbody>${row("Documents (invoices, memos, receipts, stock)", u.docs)}${row("Customers, items and settings", u.masters)}${row("Attachments (2303 uploads, logos)", u.files)}${row("Logs and messages", u.logs)}${u.sim ? row("Simulated usage (demo)", u.sim) : ""}</tbody></table>
   <p class="hint">Alerts go to the administrator at 80%, 90% and 100%. Issuing invoices is never blocked by storage; the plan is upgraded or old attachments archived instead.</p>
   ${can("settings") ? `<label for="stsim" style="margin-top:4px">Demo: simulate usage</label><select id="stsim" data-stsim="1" style="max-width:260px"><option value="0">Actual usage</option>${[85, 95, 100].map((p) => `<option value="${p}"${u.sim && Math.round(u.pct) === p ? " selected" : ""}>${p}% of the plan</option>`).join("")}</select>` : ""}</div>`;
}
const HELP = [
  [
    "Issue an invoice",
    "issue new invoice sale bill",
    "Open New invoice, pick the buyer, add items by typing the SKU or name or using List ▾, choose cash or charge, then click Issue e-invoice when every check is green. Cashiers use the counter: type on the invoice form and press Ctrl + Enter.",
  ],
  [
    "Use the cashier counter",
    "counter cashier switch encode",
    "Click Switch to cashier counter under your name. Cashier accounts open there automatically. Encode buyer, items and payment on the form, then Issue invoice. Switch to full system returns to the menus.",
  ],
  [
    "Correct an issued invoice",
    "wrong mistake void cancel correct edit error",
    "Issued invoices cannot be edited. Use Issue credit memo for returns, allowances and overbilling; Bill additional amount for underbilling; Correct buyer details for a wrong address, or a wrong name or TIN of a non-VAT or B2C buyer; Cancel and reissue for other errors. Cashiers use Request correction or void.",
  ],
  [
    "Record a payment",
    "payment collection receipt collected paid unpaid check",
    "Charge-sale invoices print as unpaid. When the client pays, open the invoice and click Record payment to issue a Collection Receipt. Advances before invoicing are also recorded as Collection Receipts.",
  ],
  [
    "Payment details on a cash invoice",
    "payment method check gcash maya ewallet bank card reference",
    "On a cash sale choose the payment method: cash, check, e-wallet, bank transfer or card, and enter the bank or provider and the reference or check number. It prints on the invoice under Payment.",
  ],
  [
    "Withholding tax",
    "withholding ewt cwt 2307 withheld rate amount",
    "Choose the rate under Discounts and withholding, pick Other rate (%) for any rate, or Fixed amount (₱) to type the amount withheld. The total due recomputes. A client's usual rate can be saved in its customer record so it fills in automatically.",
  ],
  [
    "Statutory discounts",
    "senior citizen pwd solo parent athlete medal valor discount id",
    "Choose the beneficiary type, then enter the ID number and name from the ID. The system applies the discount only to covered items and compares it with any promotion, applying whichever is higher.",
  ],
  [
    "Store promotions",
    "promo promotion sale early bird discount",
    "Approvers and administrators set promotions under Products and stock > Store promotions with a name, rate, dates and items. They apply automatically.",
  ],
  [
    "Reprint an invoice",
    "reprint copy print again lost",
    "At the counter, click My invoices, search by date, number or buyer, and open the invoice to print a reprinted copy. In the full system, open the invoice and click Print copy for buyer.",
  ],
  [
    "Email to the buyer",
    "email send buyer automatic",
    "Invoices are emailed automatically when issued if the buyer has an email and has not opted out (Company, PTI and permits > Delivery to buyers). You can also resend from the invoice.",
  ],
  [
    "Add or import items",
    "item product service add import csv upload category",
    "Products and stock > Add item for one item, or Import from CSV for many: download the template, fill it, choose the file, check the preview and import the valid rows.",
  ],
  [
    "New client details",
    "customer client portal form 2303 register tin",
    "Send clients the link or QR code on the Customers page. They fill in their registered details and upload their 2303; approve the submission to create the customer.",
  ],
  [
    "Foreign currency and foreign buyers",
    "usd dollar foreign currency exchange rate abroad nonresident",
    "Enter the day's BAP (USD) or BSP rate under Foreign currency, then choose the currency on the invoice. For a buyer without a Philippine TIN, tag it as a foreign buyer and enter the country.",
  ],
  [
    "Accounting export",
    "journal netsuite sap export accounting csv json",
    "Accounting export summarizes sales-side entries by day, week, month, quarter or year, mapped to your chart of accounts, and downloads CSV or JSON for NetSuite, SAP Business One or any software.",
  ],
  [
    "Earlier invoice date",
    "date earlier backdate late downtime manual",
    "Invoices are dated today. Office users can pick an earlier date at the counter with a reason, which prints on the invoice; cashiers need a supervisor.",
  ],
  [
    "Storage",
    "storage space full quota plan",
    "Users and security shows storage used against the plan. The administrator is alerted at 80%, 90% and 100%; invoicing is never blocked.",
  ],
  [
    "BIR EIS and sales reporting",
    "bir eis transmit sales reporting certification portal permit",
    "Sales reporting to the BIR starts only when the BIR directs it and the client holds a Permit to Transmit. Until then the system keeps the signed data of every invoice ready to send.",
  ],
];
let helpOpen = false,
  helpTab = "assistant",
  helpQ = "",
  helpAns = "",
  helpBusy = false,
  helpMsg = "",
  supportThreads = [],
  supReply = {},
  SAMPLE = null,
  nextSUP = 1;
(async () => {
  try {
    if (window.claude && window.claude.use)
      SAMPLE = await window.claude.use("sample");
  } catch (e) {
    SAMPLE = null;
  }
})();
function helpSearch(q) {
  const w = q
    .toLowerCase()
    .split(/[^a-z0-9₱%]+/)
    .filter((x) => x.length > 2);
  return HELP.map(([t, k, a]) => ({
    t,
    a,
    sc: w.reduce(
      (s, x) =>
        s +
        (t.toLowerCase().includes(x) ? 3 : 0) +
        (k.includes(x) ? 2 : 0) +
        (a.toLowerCase().includes(x) ? 1 : 0),
      0,
    ),
  }))
    .filter((x) => x.sc > 0)
    .sort((a, b) => b.sc - a.sc)
    .slice(0, 2);
}
async function helpAsk() {
  const q = helpQ.trim();
  if (!q || helpBusy) return;
  const hits = helpSearch(q);
  if (SAMPLE) {
    helpBusy = true;
    helpAns = "Thinking...";
    renderHelp();
    const prompt = `You are the in-app help for Talaan, an e-invoicing system used by ${S.name} in the Philippines. The user is ${me().name}, role ${ROLES[me().roleCode].label}${uiMode === "counter" ? ", using the cashier counter" : ""}. Answer in 2 to 5 short sentences of plain text, only from these help articles. If they do not cover the question, say so and suggest the Talk to support tab.\n\n${HELP.map(([t, , a]) => `${t}: ${a}`).join("\n")}\n\nQuestion: ${q}`;
    try {
      await SAMPLE(prompt, {
        modelTier: "quick",
        onText: ({ text }) => {
          helpAns = text;
          const el = document.getElementById("helpAns");
          if (el) el.textContent = text;
        },
      });
    } catch (e) {
      helpAns =
        (e && e.text) ||
        (hits.length
          ? hits.map((h) => `${h.t}: ${h.a}`).join("\n\n")
          : "I couldn't find that in the help. Try Talk to support.");
    }
    helpBusy = false;
    renderHelp();
    return;
  }
  helpAns = hits.length
    ? hits.map((h) => `${h.t}\n${h.a}`).join("\n\n")
    : "I couldn't find that in the help articles. Try other words, or use Talk to support.";
  renderHelp();
}
function myThread() {
  return supportThreads.find((t) => t.userId === userId);
}
function helpSend() {
  const text = helpMsg.trim();
  if (!text) return;
  let t = myThread();
  if (!t) {
    t = {
      id: "SUP-" + String(nextSUP++).padStart(3, "0"),
      userId,
      userName: me().name,
      role: ROLES[me().roleCode].label,
      branch: brLabel(
        uiMode === "counter" && draft
          ? draft.branch
          : me().branch === "ALL"
            ? viewBr
            : me().branch,
      ),
      msgs: [],
      status: "OPEN",
    };
    supportThreads.push(t);
  }
  t.msgs.push({
    from: me().name,
    text,
    at: now(),
    where: uiMode === "counter" ? "Cashier counter" : view || "",
  });
  t.status = "OPEN";
  if (t.msgs.filter((m) => m.staff).length === 0 && t.msgs.length === 1)
    t.msgs.push({
      from: "AAA IT Support",
      staff: true,
      auto: true,
      text: `Thanks, we have your message (reference ${t.id}). Our team replies within business hours. Your name, role, branch and screen were attached so we can help faster.`,
      at: now(),
    });
  helpMsg = "";
  slog("Support message", `${t.id}: ${text.slice(0, 60)}`);
  renderHelp();
}
function helpHtml() {
  if (!me()) return "";
  if (!helpOpen)
    return `<button class="helpfab" data-act="helptoggle" aria-expanded="false">Help</button>`;
  const t = myThread();
  return `<div class="helppanel" role="dialog" aria-label="Help and support"><div class="hh"><button class="btn" data-act="helptab" data-tab="assistant" aria-pressed="${helpTab === "assistant"}">Help assistant</button><button class="btn" data-act="helptab" data-tab="support" aria-pressed="${helpTab === "support"}">Talk to support</button><span style="flex:1"></span><button class="btn link" data-act="helptoggle" aria-label="Close help">Close</button></div>
   ${
     helpTab === "assistant"
       ? `<div class="hb"><p class="hint" style="margin-top:0">Ask how to do something in Talaan.${SAMPLE ? "" : " Answers come from the built-in help articles."}</p>${helpAns ? `<div class="msg" id="helpAns">${esc(helpAns)}</div>` : `<div class="hint">Try: "How do I reprint an invoice?" or "How do I record a check payment?"</div>`}</div>
     <div class="hf"><input data-helpq="1" value="${esc(helpQ)}" placeholder="Type your question" aria-label="Your question"><button class="btn primary" data-act="helpask"${helpBusy ? " disabled" : ""}>Ask</button></div>`
       : `<div class="hb">${t ? t.msgs.map((m) => `<div class="msg${m.staff ? "" : " me"}">${esc(m.text)}<small>${esc(m.from)}${m.auto ? " (automatic reply)" : ""}, ${fmtDate(m.at)}</small></div>`).join("") : `<p class="hint" style="margin-top:0">Message AAA's IT support team. Your name, role, branch and current screen are attached automatically.${me().roleCode === "CASHIER" ? " For price, discount or void questions, use Ask supervisor instead." : ""}</p>`}</div>
     <div class="hf"><textarea data-helpmsg="1" rows="2" style="flex:1" placeholder="Describe the problem" aria-label="Message to support">${esc(helpMsg)}</textarea><button class="btn primary" data-act="helpsend">Send</button></div>`
   }</div>`;
}
function renderHelp() {
  const r = document.getElementById("helpRoot");
  if (r) r.innerHTML = helpHtml();
  const b = r && r.querySelector(".hb");
  if (b) b.scrollTop = b.scrollHeight;
}
function helpHandle(a) {
  const act = a.dataset.act;
  if (act === "helptoggle") helpOpen = !helpOpen;
  if (act === "helptab") helpTab = a.dataset.tab;
  if (act === "helpask") {
    helpAsk();
    return;
  }
  if (act === "helpsend") {
    helpSend();
    return;
  }
  renderHelp();
}
function supportInbox() {
  return `<div class="panel"><h2>Support inbox</h2>${
    supportThreads.length
      ? supportThreads
          .slice()
          .reverse()
          .map(
            (
              t,
            ) => `<div style="border-top:1px solid var(--line);padding:10px 0"><b>${t.id}</b>, ${esc(t.userName)} (${esc(t.role)}, ${esc(t.branch)}) <span class="pill ${t.status === "OPEN" ? "s-pending" : "s-paid"}">${t.status === "OPEN" ? "Waiting for reply" : "Answered"}</span>
   ${t.msgs.map((m) => `<div class="msg${m.staff ? " me" : ""}">${esc(m.text)}<small>${esc(m.from)}${m.where ? `, from ${esc(m.where)}` : ""}, ${fmtDate(m.at)}</small></div>`).join("")}
   <div style="display:flex;gap:6px"><input data-supreply="${t.id}" value="${esc(supReply[t.id] || "")}" placeholder="Reply to ${esc(t.userName)}"><button class="btn" data-act="supsend" data-id="${t.id}">Send reply</button></div></div>`,
          )
          .join("")
      : '<p class="due" style="margin:0">No messages from clients yet.</p>'
  }</div>`;
}
function pager(act, page, pages, total) {
  if (pages <= 1) return `<p class="hint">${total} shown.</p>`;
  const b = (p, l, dis) =>
    `<button class="btn" data-act="${act}" data-p="${p}"${dis ? " disabled" : ""}>${l}</button>`;
  return `<div style="display:flex;gap:8px;align-items:center;margin-top:10px;flex-wrap:wrap">${b(1, "First", page === 1)}${b(page - 1, "Previous", page === 1)}<span class="due">Page ${page} of ${pages}, ${total} records</span>${b(page + 1, "Next", page === pages)}${b(pages, "Last", page === pages)}</div>`;
}
function catOf(i) {
  return i.category || (i.type === "GOODS" ? "Products" : "Services");
}
function categories() {
  return [...new Set(ITEMS.map(catOf))].sort();
}
function productList() {
  const q = pQ.trim().toLowerCase(),
    L = stockLoc();
  return ITEMS.filter(
    (i) =>
      (!q ||
        i.sku.toLowerCase().includes(q) ||
        i.desc.toLowerCase().includes(q) ||
        (i.barcode || "").includes(q)) &&
      (pCat === "ALL" || catOf(i) === pCat) &&
      (pKind === "ALL" ||
        (pKind === "GOODS" && i.type === "GOODS" && !i.inactive) ||
        (pKind === "SERVICE" && i.type !== "GOODS" && !i.inactive) ||
        (pKind === "LOW" &&
          i.type === "GOODS" &&
          onHand(i.id, L) <= i.reorder) ||
        (pKind === "INACTIVE" && i.inactive)),
  );
}
function itemRows(list) {
  return (
    list
      .map((i) => {
        const g = i.type === "GOODS",
          h = g ? onHand(i.id, stockLoc()) : null;
        return `<tr><td><button class="btn link" data-openitem="${i.id}"><strong>${esc(i.sku)}</strong></button>${i.barcode ? `<br><span class="due">${esc(i.barcode)}</span>` : ""}</td><td style="white-space:normal">${esc(i.desc)}<br><span class="due">${esc(catOf(i))}</span>${g ? "" : ' <span class="pill s-draft">Service</span>'}${i.scCat && i.scCat !== "NONE" ? ` <span class="pill s-paid">${i.scCat === "Q20" ? "SC/PWD 20%" : "BNPC 5%"}</span>` : ""}${i.naac ? ' <span class="pill s-draft">NAAC</span>' : ""}${i.mov ? ' <span class="pill s-draft">MOV</span>' : ""}${i.sp ? ' <span class="pill s-draft">SP</span>' : ""}${Object.keys(
          i.cov || {},
        )
          .filter((k) => i.cov[k])
          .map((k) => ` <span class="pill s-draft">${esc(k)}</span>`)
          .join(
            "",
          )}</td><td>${esc(i.uom)}</td><td class="num">${peso(cents(stockLoc() ? priceAt(i, stockLoc()) : i.price))}${Object.values(i.branchPrices || {}).some((v) => v !== "" && v != null) ? '<br><span class="due">branch prices set</span>' : ""}</td><td>${TAX_VAT[i.tax] || TAX_NV[i.tax]}</td>
  <td class="num${g && h <= i.reorder ? " low" : ""}">${g ? fmtQty(h) : "—"}</td><td class="num">${g ? peso(avgCost(i.id, stockLoc())) : "—"}</td><td class="num">${g ? peso(Math.round(h * avgCost(i.id, stockLoc()))) : "—"}</td><td><button class="btn link" data-act="itemedit" data-id="${i.id}">Edit</button></td></tr>`;
      })
      .join("") || `<tr><td colspan="9" class="due">No items match.</td></tr>`
  );
}
function itemFormHtml() {
  const f = itemForm,
    edit = !!f.id,
    T = { ...TAX_VAT };
  return `<div class="panel" style="background:var(--soft)"><h2>${edit ? "Edit item" : "New item"}</h2>
   <div class="fields"><div><label for="if-sku">SKU or item code</label><input id="if-sku" data-if="sku" value="${esc(f.sku)}"${edit ? " readonly" : ""}></div><div><label for="if-bc">Barcode (optional)</label><input id="if-bc" data-if="barcode" value="${esc(f.barcode)}"></div>
    <div><span class="lbl">Type</span><div class="seg" role="radiogroup" aria-label="Item type"><label><input type="radio" name="ift" data-if="type" value="GOODS"${f.type === "GOODS" ? " checked" : ""}>Goods (stocked)</label><label><input type="radio" name="ift" data-if="type" value="SERVICE"${f.type === "SERVICE" ? " checked" : ""}>Service</label></div></div></div>
   <div class="fields"><div style="grid-column:1/-1"><label for="if-d">Description as printed on the invoice</label><input id="if-d" data-if="desc" value="${esc(f.desc)}"></div></div>
   <div class="fields"><div><label for="if-u">Unit of measure</label><input id="if-u" data-if="uom" list="uomlist" value="${esc(f.uom)}"><datalist id="uomlist">${UOMS.map((u) => `<option value="${u}">`).join("")}</datalist></div>
    <div><label for="if-p">Selling price, net of VAT</label><input id="if-p" type="number" step="0.01" min="0" data-if="price" value="${esc(f.price)}"></div>
    <div><span class="lbl">Branch prices, net of VAT (blank = same as above)</span>${BRS.filter(
      (b) => b.active,
    )
      .map(
        (b) =>
          `<label class="inline" style="margin:4px 0;gap:6px">${esc(b.name)} <input type="number" min="0" step="0.01" style="width:110px" data-ifbp="${b.code}" value="${esc((f.branchPrices || {})[b.code] ?? "")}"></label>`,
      )
      .join("")}</div>
    <div><label for="if-cat">Category</label><input id="if-cat" data-if="category" list="catlist" value="${esc(f.category || "")}" placeholder="e.g. Seminars"><datalist id="catlist">${categories()
      .map((c) => `<option value="${esc(c)}">`)
      .join("")}</datalist></div>
    <div><label for="if-t">Default tax treatment</label><select id="if-t" data-if="tax">${Object.entries(
      T,
    )
      .map(
        ([k, l]) =>
          `<option value="${k}"${f.tax === k ? " selected" : ""}>${l}</option>`,
      )
      .join("")}</select></div>
    <div><span class="lbl">Other statutory discounts</span>${[
      ["naac", "NAAC 20%"],
      ["mov", "MOV 20%"],
      ["sp", "Solo parent 10%"],
    ]
      .map(
        ([k, l]) =>
          `<label class="inline" style="margin:2px 0"><input type="checkbox" data-ifc="${k}"${f[k] ? " checked" : ""}> ${l}</label>`,
      )
      .join("")}${customRules
      .filter((r) => r.active)
      .map(
        (r) =>
          `<label class="inline" style="margin:2px 0"><input type="checkbox" data-ifcc="${esc(r.code)}"${f.cov && f.cov[r.code] ? " checked" : ""}> ${esc(r.short)} ${r.rate}%</label>`,
      )
      .join("")}</div>
    <div><label for="if-sc">SC/PWD coverage</label><select id="if-sc" data-if="scCat">${Object.entries(
      SC_CATS,
    )
      .map(
        ([k, l]) =>
          `<option value="${k}"${(f.scCat || "NONE") === k ? " selected" : ""}>${l}</option>`,
      )
      .join("")}</select></div>
    ${f.type === "GOODS" ? `<div><label for="if-r">Reorder level</label><input id="if-r" type="number" min="0" step="any" data-if="reorder" value="${esc(f.reorder)}"></div>` : ""}</div>
   ${!edit && f.type === "GOODS" ? `<div class="fields"><div><label for="if-oq">Opening quantity</label><input id="if-oq" type="number" min="0" step="any" data-if="openQty" value="${esc(f.openQty)}"></div><div><label for="if-oc">Opening unit cost</label><input id="if-oc" type="number" min="0" step="0.01" data-if="openCost" value="${esc(f.openCost)}"></div></div>` : ""}
   ${edit ? `<p class="hint" style="margin:0 0 8px">Changes apply to future invoices only. Issued invoices keep the description, SKU and price printed on them.</p>` : ""}
   <div class="err">${f.err || ""}</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn primary" data-act="itemsave">${edit ? "Save changes" : "Add item"}</button><button class="btn" data-act="itemcancel">Cancel</button></div></div>`;
}
function saveItem() {
  const f = itemForm,
    sku = f.sku.trim();
  if (!sku || !f.desc.trim()) {
    f.err = "Enter the SKU and description.";
    return render();
  }
  if (!f.id && ITEMS.some((i) => i.sku.toLowerCase() === sku.toLowerCase())) {
    f.err = `SKU ${esc(sku)} already exists.`;
    return render();
  }
  if (
    f.barcode &&
    ITEMS.some((i) => i.barcode === f.barcode.trim() && i.id !== f.id)
  ) {
    f.err = "That barcode is already assigned to another item.";
    return render();
  }
  if (!(Number(f.price) >= 0) || f.price === "") {
    f.err = "Enter the selling price.";
    return render();
  }
  if (f.type === "GOODS" && !f.uom.trim()) {
    f.err = "Enter the unit of measure.";
    return render();
  }
  if (f.id) {
    Object.assign(itemById(f.id), {
      category: (f.category || "").trim(),
      branchPrices: { ...(f.branchPrices || {}) },
      cov: { ...(f.cov || {}) },
      naac: !!f.naac,
      mov: !!f.mov,
      sp: !!f.sp,
      scCat: f.scCat,
      barcode: f.barcode.trim(),
      desc: f.desc.trim(),
      uom: f.uom.trim(),
      price: Number(f.price),
      tax: f.tax,
      type: f.type,
      reorder: Number(f.reorder || 0),
    });
    toast("Item updated");
  } else {
    const it = {
      category: (f.category || "").trim(),
      branchPrices: { ...(f.branchPrices || {}) },
      cov: { ...(f.cov || {}) },
      naac: !!f.naac,
      mov: !!f.mov,
      sp: !!f.sp,
      scCat: f.scCat,
      id: "i" + Date.now() + rand(2),
      sku,
      barcode: f.barcode.trim(),
      desc: f.desc.trim(),
      uom: f.uom.trim() || "unit",
      price: Number(f.price),
      tax: f.tax,
      type: f.type,
      reorder: Number(f.reorder || 0),
    };
    if (f.type === "GOODS" && Number(f.openQty) > 0)
      it.opening = {
        qty: Number(f.openQty),
        cost: cents(f.openCost),
        at: now(),
      };
    ITEMS.push(it);
    toast(`${sku} added`);
  }
  itemForm = null;
  render();
}
function vItem() {
  const i = itemById(current),
    L = stockLoc(),
    m = i.type === "GOODS" ? movesOf(i.id, L) : [];
  return `<div class="head"><div><h1>${esc(i.sku)}</h1><p class="sub">${esc(i.desc)}. Unit: ${esc(i.uom)}. Selling price ${peso(cents(i.price))}${Object.entries(
    i.branchPrices || {},
  )
    .filter(([k, v]) => v !== "" && v != null)
    .map(([k, v]) => `; ${esc(brOf(k).name)} ${peso(cents(v))}`)
    .join(
      "",
    )}, ${TAX_VAT[i.tax] || TAX_NV[i.tax]}.</p></div><button class="btn" data-go="products">Back to products</button></div>
  ${
    i.type !== "GOODS"
      ? `<div class="panel">Service item. No stock is tracked.</div>`
      : `
  <div class="stats"><div class="stat${onHand(i.id, L) <= i.reorder ? " alert" : ""}"><b>${fmtQty(onHand(i.id, L))} ${esc(i.uom)}</b><span>On hand, ${esc(brLabel(viewBr))} (reorder at ${fmtQty(i.reorder)})</span></div><div class="stat"><b>${peso(avgCost(i.id, L))}</b><span>Weighted average cost</span></div><div class="stat"><b>${peso(Math.round(onHand(i.id, L) * avgCost(i.id, L)))}</b><span>Stock value</span></div></div>
  <h2>Stock card</h2><div class="tablewrap"><table style="min-width:860px"><thead><tr><th>Date</th><th>Source document</th><th class="num">In</th><th class="num">Out</th><th class="num">Balance</th><th class="num">Unit cost</th><th class="num">Avg cost</th><th class="num">Value</th></tr></thead><tbody>
  ${m.map((x) => `<tr><td>${fmtDate(x.at)}</td><td>${x.ref ? `<button class="btn link" ${x.ref.t === "inv" ? `data-open="${x.ref.id}"` : x.ref.t === "cn" ? `data-opencn="${x.ref.id}"` : `data-opensd="${x.ref.id}"`}>${esc(x.doc)}</button>` : esc(x.doc)}</td><td class="num">${x.qty > 0 ? fmtQty(x.qty) : ""}</td><td class="num">${x.qty < 0 ? fmtQty(-x.qty) : ""}</td><td class="num${x.bal < 0 ? " low" : ""}">${fmtQty(x.bal)}</td><td class="num">${peso(x.unit)}</td><td class="num">${peso(x.avg)}</td><td class="num">${peso(x.value)}</td></tr>`).join("") || `<tr><td colspan="8" class="due">No movements yet.</td></tr>`}</tbody></table></div>`
  }`;
}
function goNewSD(type) {
  if (!wb()) {
    toast("Choose a branch before recording stock documents.");
    return;
  }
  sDraft = {
    branch: wb(),
    toBranch: BRS.find((b) => b.code !== wb() && b.active)?.code || "",
    type,
    dir: "IN",
    supplier: "",
    supTin: "",
    supDoc: "",
    supDocDate: todayISO(),
    reason: "",
    note: "",
    lines: [{ skuText: "", itemId: null, qty: 1, unitCost: 0 }],
  };
  view = "newStock";
  current = null;
  render();
  window.scrollTo(0, 0);
}
function vNewStock() {
  const d = sDraft,
    purch = d.type === "PURCHASE",
    adj = d.type === "ADJ",
    tr = d.type === "TRANSFER";
  return `<div class="head"><div><h1>${DOC_LABEL[d.type]}</h1><p class="sub">${esc(brLabel(d.branch))}. ${tr ? `Transfer ${"TR-" + String(nextTR).padStart(4, "0")}: goods leave this branch at average cost and arrive at the receiving branch.` : purch ? `Receiving Report ${"RR-" + String(nextRR).padStart(4, "0")}. Record the supplier's invoice number so the input VAT can be traced to it.` : adj ? "Adjustments need approval by an authorized approver other than the preparer." : `Return slip ${"RS-" + String(nextRS).padStart(4, "0")}. Quote the supplier's debit memo or your return slip number.`}</p></div><button class="btn" data-go="products">Cancel</button></div>
  <div class="grid2"><div class="stack">
   ${
     tr
       ? `<div class="panel"><h2>Transfer</h2><div class="fields"><div><span class="lbl">From</span><div class="ro">${esc(brLabel(d.branch))}</div></div><div><label for="sdtb">To branch</label><select id="sdtb" data-sd="toBranch">${BRS.filter(
           (b) => b.active && b.code !== d.branch,
         )
           .map(
             (b) =>
               `<option value="${b.code}"${d.toBranch === b.code ? " selected" : ""}>${esc(brLabel(b.code))}</option>`,
           )
           .join("")}</select></div>
     <div style="grid-column:1/-1"><label for="sdn2">Details</label><input id="sdn2" data-sd="note" value="${esc(d.note)}" placeholder="e.g. Workbooks for the Cebu seminar"></div></div></div>`
       : adj
         ? `<div class="panel"><h2>Adjustment</h2><div class="fields"><div><span class="lbl">Direction</span><div class="seg" role="radiogroup" aria-label="Direction"><label><input type="radio" name="sdd" data-sd="dir" value="IN"${d.dir === "IN" ? " checked" : ""}>Increase</label><label><input type="radio" name="sdd" data-sd="dir" value="OUT"${d.dir === "OUT" ? " checked" : ""}>Decrease</label></div></div>
     <div><label for="sdr">Reason</label><select id="sdr" data-sd="reason"><option value="">Choose a reason</option>${ADJ_REASONS.map((r) => `<option${r === d.reason ? " selected" : ""}>${r}</option>`).join("")}</select></div>
     <div style="grid-column:1/-1"><label for="sdn">Details</label><input id="sdn" data-sd="note" value="${esc(d.note)}" placeholder="e.g. Count of Sept 27 by warehouse team"></div></div></div>`
         : `<div class="panel"><h2>Supplier</h2><div class="fields"><div><label for="sds">Supplier's registered name</label><input id="sds" data-sd="supplier" value="${esc(d.supplier)}"></div><div><label for="sdt">Supplier TIN</label><input id="sdt" data-sd="supTin" value="${esc(d.supTin)}" placeholder="###-###-###-#####"></div>
     <div><label for="sdi">${purch ? "Supplier's invoice no." : "Debit memo or return slip no."}</label><input id="sdi" data-sd="supDoc" value="${esc(d.supDoc)}"></div><div><label for="sdx">Date</label><input id="sdx" type="date" data-sd="supDocDate" value="${esc(d.supDocDate)}"></div></div></div>`
   }
   <div class="panel items"><h2>Items</h2><div style="overflow-x:auto"><table style="min-width:620px"><thead><tr><th>Item (SKU)</th><th class="num">On hand</th><th>Quantity</th>${purch ? "<th>Unit cost</th>" : ""}<th></th></tr></thead><tbody>
    ${d.lines
      .map(
        (
          l,
          k,
        ) => `<tr><td><input list="skulist2" aria-label="Item or SKU" data-sl="${k}" data-slk="sku" value="${esc(l.skuText)}" placeholder="Type SKU or name" style="width:260px"><br>${itemSelect(`data-ssel="${k}"`, l.itemId, sDraft.branch, true).replace("width:150px", "width:260px")}</td><td class="num">${l.itemId ? fmtQty(onHand(l.itemId, sDraft.branch)) + " " + esc(itemById(l.itemId).uom) : ""}</td>
     <td><input type="number" min="0" step="any" aria-label="Quantity" data-sl="${k}" data-slk="qty" value="${l.qty}" style="width:90px"></td>${purch ? `<td><input type="number" min="0" step="0.01" aria-label="Unit cost" data-sl="${k}" data-slk="unitCost" value="${l.unitCost ? (l.unitCost / 100).toFixed(2) : ""}" style="width:110px"></td>` : ""}
     <td><button class="x" data-sldel="${k}" aria-label="Remove line">×</button></td></tr>`,
      )
      .join("")}</tbody></table></div>
    <datalist id="skulist2">${ITEMS.filter((i) => i.type === "GOODS")
      .map((i) => `<option value="${esc(skuLabel(i))}"></option>`)
      .join(
        "",
      )}</datalist><button class="btn link" data-act="sdadd">Add line</button></div></div>
  <div class="stack"><div class="panel"><h2>Before ${adj ? "submitting" : "posting"}</h2><ul class="checks" id="sdChecks"></ul></div><button class="btn primary" id="sdGo" data-act="sdsave">${adj ? "Submit for approval" : "Post to stock"}</button></div></div>`;
}
function refreshSD() {
  const ch = stockDocChecks(sDraft);
  const el = document.getElementById("sdChecks");
  if (!el) return;
  el.innerHTML = checksHtml(ch);
  document.getElementById("sdGo").disabled = !ch.every((x) => x[0]);
}
function saveSD() {
  const d = sDraft;
  if (!stockDocChecks(d).every((x) => x[0])) return;
  const t = now();
  const id =
    d.type === "TRANSFER"
      ? "TR-" + String(nextTR++).padStart(4, "0")
      : d.type === "PURCHASE"
        ? "RR-" + String(nextRR++).padStart(4, "0")
        : d.type === "SUPRETURN"
          ? "RS-" + String(nextRS++).padStart(4, "0")
          : "ADJ-" + String(nextADJ++).padStart(4, "0");
  const doc = {
    branch: d.branch,
    toBranch: d.type === "TRANSFER" ? d.toBranch : null,
    id,
    type: d.type,
    dir: d.dir,
    at: t,
    supplier: d.supplier.trim(),
    supTin: d.supTin.trim(),
    supDoc: d.supDoc.trim(),
    supDocDate: d.supDocDate,
    reason: d.reason,
    note: d.note.trim(),
    lines: d.lines.map((l) => ({
      itemId: l.itemId,
      qty: Number(l.qty),
      unitCost:
        d.type === "TRANSFER" ? avgCost(l.itemId, d.branch) : l.unitCost,
    })),
    preparedBy: who(me()),
    status:
      d.type === "ADJ"
        ? "PENDING"
        : d.type === "TRANSFER"
          ? "IN_TRANSIT"
          : "POSTED",
    postedAt: d.type === "ADJ" ? null : t,
    history: [
      {
        at: t,
        by: me().name,
        act:
          d.type === "ADJ"
            ? "Prepared and submitted for approval"
            : d.type === "TRANSFER"
              ? `Sent to ${brLabel(d.toBranch)}; out of ${brLabel(d.branch)} stock, awaiting receipt`
              : "Posted to stock",
      },
    ],
  };
  stockDocs.push(doc);
  sDraft = null;
  toast(
    d.type === "ADJ"
      ? `${id} submitted for approval`
      : d.type === "TRANSFER"
        ? `${id} sent; the receiving branch must confirm`
        : `${id} posted`,
  );
  view = "stockdoc";
  current = id;
  render();
  window.scrollTo(0, 0);
}
function transferPanel(d) {
  const u = me();
  if (d.status === "IN_TRANSIT") {
    const canRecv =
      canBranch(d.toBranch) &&
      (can("ops") || can("master")) &&
      d.preparedBy.id !== u.id;
    return `<span class="pill s-pending">In transit</span><p class="hint">Sent ${fmtDate(d.postedAt)}. Out of ${esc(brLabel(d.branch))} stock; enters ${esc(brLabel(d.toBranch))} stock only when received.</p>
     ${
       canRecv
         ? `<h2 style="font-size:15px;margin-top:12px">Confirm receipt</h2><table><thead><tr><th>SKU</th><th class="num">Sent</th><th>Received</th></tr></thead><tbody>${d.lines.map((l, k) => `<tr><td>${esc(itemById(l.itemId).sku)}</td><td class="num">${fmtQty(l.qty)}</td><td><input type="number" min="0" step="any" style="width:90px" data-rq="${k}" value="${l.qty}" aria-label="Quantity received"></td></tr>`).join("")}</tbody></table>
      <label for="rqn" style="margin-top:8px">Note on any shortage or damage</label><input id="rqn"><button class="btn primary" style="margin-top:10px" data-act="trrecv">Confirm receipt</button>`
         : `<p style="margin:0">Waiting for ${esc(brLabel(d.toBranch))} to confirm receipt${d.preparedBy.id === u.id ? ". The sender cannot confirm their own transfer" : ""}.</p>`
     }`;
  }
  const short = d.lines.filter((l) => (l.recvQty ?? l.qty) < l.qty);
  return `${short.length ? '<span class="pill s-rejected">Received short</span>' : '<span class="pill s-paid">Received</span>'} <span class="due">${d.receivedAt ? `${fmtDate(d.receivedAt)}, by ${esc(d.receivedBy || "")}` : fmtDate(d.postedAt)}</span>
   ${short.length ? `<div class="banner bad" style="margin-top:10px">Short: ${short.map((l) => `${esc(itemById(l.itemId).sku)} ${fmtQty(l.qty - (l.recvQty ?? l.qty))}`).join(", ")}. The missing quantity is out of both branches' stock. Investigate, then record a claim against the carrier or a stock adjustment.</div>` : ""}`;
}
function vStockDoc() {
  const d = stockDocs.find((x) => x.id === current),
    u = me(),
    own = d.preparedBy.id === u.id;
  return `<div class="head"><div><h1>${DOC_LABEL[d.type]} ${d.id}</h1><p class="sub">${fmtDate(d.at)}. Prepared by ${esc(d.preparedBy.name)}.</p></div><button class="btn" data-go="products">Back to products</button></div>
  <div class="grid2"><div class="stack"><div class="panel">${d.type === "TRANSFER" ? `<p style="margin-top:0"><b>${esc(brLabel(d.branch))} → ${esc(brLabel(d.toBranch))}</b>${d.note ? `. ${esc(d.note)}` : ""}</p>` : d.type === "ADJ" ? `<p style="margin-top:0"><b>${d.dir === "IN" ? "Increase" : "Decrease"}</b>: ${esc(d.reason)}${d.note ? `. ${esc(d.note)}` : ""}</p>` : `<p style="margin-top:0"><b>${esc(d.supplier)}</b>${d.supTin ? `, TIN ${esc(d.supTin)}` : ""}<br>${d.type === "PURCHASE" ? "Supplier's invoice" : "Debit memo / return slip"} no. ${esc(d.supDoc)}, ${isoDate(d.supDocDate)}</p>`}
   <table><thead><tr><th>SKU</th><th>Description</th><th class="num">Quantity</th>${d.type === "PURCHASE" || d.type === "TRANSFER" ? '<th class="num">Unit cost</th><th class="num">Amount</th>' : ""}</tr></thead><tbody>
   ${d.lines
     .map((l) => {
       const i = itemById(l.itemId);
       return `<tr><td><button class="btn link" data-openitem="${i.id}">${esc(i.sku)}</button></td><td>${esc(i.desc)}</td><td class="num">${fmtQty(l.qty)} ${esc(i.uom)}</td>${d.type === "PURCHASE" || d.type === "TRANSFER" ? `<td class="num">${peso(l.unitCost)}</td><td class="num">${peso(Math.round(l.qty * l.unitCost))}</td>` : ""}</tr>`;
     })
     .join("")}</tbody></table></div></div>
  <div class="stack"><div class="panel"><h2>Status</h2>${
    d.type === "TRANSFER"
      ? transferPanel(d)
      : d.status === "POSTED"
        ? `<span class="pill s-paid">Posted</span> <span class="due">${fmtDate(d.postedAt)}${d.approvedBy ? `, approved by ${esc(d.approvedBy.name)}` : ""}</span>`
        : d.status === "REJECTED"
          ? '<span class="pill s-rejected">Declined</span>'
          : !u.approver
            ? `<p style="margin:0">Waiting for an authorized approver. Switch the "Signed in as" user to Jose Reyes or Ana Cruz to approve.</p>`
            : own
              ? `<p style="margin:0">You prepared this adjustment, so someone else must approve it.</p>`
              : `<label for="sdapn">Note (required if declining)</label><input id="sdapn"><div style="display:flex;gap:8px;margin-top:10px"><button class="btn primary" data-act="sdapprove">Approve and post</button><button class="btn" data-act="sdreject">Decline</button></div>`
  }</div>
   <div class="panel"><h2>History</h2><ul class="dl">${d.history.map((h) => `<li>${esc(h.act)}<br><span class="due">${fmtDate(h.at)}, ${esc(h.by)}</span></li>`).join("")}</ul></div></div></div>`;
}

/* ================= Statutory discount register (records required for the seller's deduction) ================= */
let regType = "ALL";
function vRegister() {
  const rows = [];
  invoices
    .filter((i) => inBr(i.branch))
    .slice()
    .sort((a, b) => b.issuedAt - a.issuedAt)
    .forEach((i) => {
      if (!i.scpwd || (regType !== "ALL" && i.scpwd !== regType)) return;
      const c = calc(i);
      rows.push({
        i,
        c,
        gross: c.totalSales,
        exempt: i.items.reduce(
          (a, it) =>
            a + (["SC20", "SP10", "CUS_EX"].includes(it.scChoice) ? 1 : 0),
          0,
        )
          ? c.exempt
          : 0,
        cm: creditsOf(i.no).length,
      });
    });
  const tot = {};
  rows.forEach((r) => {
    tot[r.i.scpwd] = (tot[r.i.scpwd] || 0) + r.c.disc;
  });
  return `<div class="head"><div><h1>Statutory discount register</h1><p class="sub">Separate record of sales with statutory discounts: beneficiary, ID, date, invoice, gross sales and discount. Keep it to support the discounts claimed as deductions.</p></div></div>
  <div class="stats">${Object.entries(allTypes())
    .map(
      ([k, t]) =>
        `<div class="stat"><b>${peso(tot[k] || 0)}</b><span>${t.label} discounts</span></div>`,
    )
    .join("")}</div>
  <div class="seg" role="radiogroup" aria-label="Filter by type" style="margin-bottom:12px">${[["ALL", "All"], ...Object.entries(allTypes()).map(([k, t]) => [k, t.short])].map(([k, l]) => `<label><input type="radio" name="rgt" data-rgt="${k}"${regType === k ? " checked" : ""}>${l}</label>`).join("")}</div>
  ${
    rows.length
      ? `<div class="tablewrap"><table style="min-width:980px"><thead><tr><th>Date</th><th>Invoice no.</th><th>Type</th><th>Beneficiary</th><th>ID no.</th><th class="num">Gross sales</th><th class="num">VAT-exempt sales</th><th class="num">Discount</th><th>Notes</th></tr></thead><tbody>
   ${rows.map((r) => `<tr class="row" data-open="${r.i.no}" tabindex="0"><td>${r.i.txnDate ? isoDate(r.i.txnDate) : dDate(r.i.issuedAt)}</td><td><strong>${r.i.no}</strong></td><td>${stType(r.i.scpwd).short}</td><td>${esc(r.i.scName || (r.i.buyer || cust(r.i.customerId)).name)}${r.i.movRel ? `<br><span class="due">${esc(r.i.movRel)}</span>` : ""}${r.i.spChild ? `<br><span class="due">Child: ${esc(r.i.spChild)}</span>` : ""}</td><td>${esc(r.i.scId)}</td><td class="num">${peso(r.gross)}</td><td class="num">${peso(r.exempt)}</td><td class="num">${peso(r.c.disc)}</td><td>${r.cm ? `<span class="pill s-credit">${r.cm} credit memo(s)</span>` : ""}</td></tr>`).join("")}</tbody></table></div>`
      : `<div class="panel empty">No sales with statutory discounts${regType !== "ALL" ? " of this type" : ""} yet.</div>`
  }
  <p class="note">SC, PWD, NAAC and solo-parent discounts are generally deductible from gross income, subject to the conditions of their regulations (not available under the optional standard deduction or 8% option). Confirm the treatment of Medal of Valor discounts, which RA 9049 frames as a tax credit for some establishments.</p>`;
}

/* ================= Verification page (what a QR scan opens) ================= */
let vState = {
  kind: null,
  no: null,
  tamper: false,
  examiner: false,
  result: null,
  paste: "",
  err: "",
};
function docByKind(kind, no) {
  return kind === "CM"
    ? credits.find((c) => c.no === no)
    : kind === "CR"
      ? corrections.find((c) => c.no === no)
      : invOf(no);
}
function openVerify(kind, no, tamper) {
  vState = {
    kind,
    no,
    tamper: !!tamper,
    examiner: false,
    result: null,
    paste: "",
    err: "",
  };
  view = "verify";
  current = null;
  render();
  window.scrollTo(0, 0);
  runVerify();
}
async function runVerify() {
  const doc = docByKind(vState.kind, vState.no);
  if (!doc || !doc.sig) return;
  let payload = doc.sigPayload;
  if (vState.tamper) {
    const f = payload.split("|");
    f[5] = (Number(f[5]) + 1000).toFixed(2);
    payload = f.join("|");
  }
  const ok = await verifySig(payload, doc.sig);
  vState.result = {
    ok,
    match: payload === payloadOf(doc, vState.kind),
    payload,
  };
  render();
}
async function verifyPasted() {
  const u = vState.paste.trim();
  vState.err = "";
  const m = u.match(/\/v\/([a-z0-9]+)\?d=([A-Za-z0-9_-]+)&s=([A-Za-z0-9_-]+)/);
  if (!m) {
    vState.err = "That is not a Talaan verification link.";
    return render();
  }
  const doc = [
    ...invoices.map((i) => ["INV", i]),
    ...credits.map((c) => ["CM", c]),
  ].find(([k, d]) => d.vt === m[1]);
  let payload;
  try {
    payload = new TextDecoder().decode(unb64u(m[2]));
  } catch (e) {
    vState.err = "The link is damaged.";
    return render();
  }
  if (!doc) {
    vState.kind = null;
    vState.result = { ok: false, match: false, payload, notFound: true };
    return render();
  }
  vState.kind = doc[0];
  vState.no = doc[1].no;
  vState.tamper = false;
  const ok = await verifySig(payload, m[3]);
  vState.result = { ok, match: payload === payloadOf(doc[1], doc[0]), payload };
  render();
}
function statusOf(doc, kind) {
  if (kind === "CM")
    return {
      cls: "good",
      text: `Valid credit memo reducing Invoice No. ${doc.invNo}`,
    };
  if (kind === "CR")
    return {
      cls: "good",
      text: `Valid correction notice for Invoice No. ${doc.invNo}: buyer details only; amounts unchanged`,
    };
  const crs = crApproved(doc.no),
    crText = crs.length
      ? ` Buyer details corrected by Correction Notice No. ${crs.map((c) => c.no).join(", ")}.`
      : "";
  const cn = creditsOf(doc.no),
    add = invoices.filter(
      (x) => x.refs.addlFor === doc.no || x.refs.reissueOf === doc.no,
    );
  if (isCancelled(doc))
    return {
      cls: "bad",
      text:
        `Cancelled by Credit Memo No. ${cn.map((c) => c.no).join(", ")}${add.length ? `; replaced by Invoice No. ${add.map((a) => a.no).join(", ")}` : ""}` +
        crText,
    };
  if (cn.length || add.length)
    return {
      cls: "warn",
      text: `Valid, adjusted by ${[cn.length ? `Credit Memo No. ${cn.map((c) => c.no).join(", ")}` : "", add.length ? `Invoice No. ${add.map((a) => a.no).join(", ")}` : ""].filter(Boolean).join(" and ")}.${crText}`,
    };
  return {
    cls: crs.length ? "warn" : "good",
    text: crs.length
      ? `Valid.${crText}`
      : "Valid. No credit memo or adjustment issued against it.",
  };
}
function vVerify() {
  const pasteBox = `<div class="panel" style="margin-bottom:16px"><h2>Check a verification link</h2><p class="hint" style="margin-top:0">Paste the link from a scanned QR code, or click the QR code on any invoice or credit memo in this system.</p>
   <div class="row3"><div><label for="vp">Verification link</label><input id="vp" data-vp="1" value="${esc(vState.paste)}" placeholder="https://verify.talaan.ph/v/…"></div><button class="btn primary" data-act="vpaste">Verify</button></div><div class="err">${esc(vState.err)}</div></div>`;
  const r = vState.result;
  if (!vState.kind && !r)
    return `<div class="head"><div><h1>Verify a document</h1><p class="sub">What an examiner, auditor or buyer sees after scanning the QR code on a Talaan invoice or credit memo.</p></div></div>${pasteBox}`;
  if (r && r.notFound)
    return `<div class="head"><div><h1>Verify a document</h1></div></div>${pasteBox}<div class="vres bad"><b>No matching document</b>This link does not match any document issued through this system.</div>`;
  const doc = docByKind(vState.kind, vState.no),
    kind = vState.kind,
    sel =
      doc.seller ||
      sellerSnap(doc.branch || (doc.invNo && invOf(doc.invNo).branch)),
    t = docTotals(doc, kind),
    st = statusOf(doc, kind),
    b =
      kind === "CM" || kind === "CR"
        ? effBuyer(invOf(doc.invNo))
        : effBuyer(doc);
  const res = !r
    ? `<div class="vres"><b>Checking the digital signature…</b></div>`
    : r.ok && r.match
      ? `<div class="vres good"><b>Authentic</b>Issued by ${esc(sel.name)} through Talaan under PTI Electronic Invoice ${esc(sel.ptiNo)}. The digital signature matches, and the amounts below are exactly as issued.</div>`
      : !r.ok
        ? `<div class="vres bad"><b>Not authentic or altered</b>The digital signature does not match the details presented${vState.tamper ? " (the total was changed on this copy)" : ""}. Treat this copy as unreliable and ask the seller for the original.</div>`
        : `<div class="vres warn"><b>Signature valid, record differs</b>Contact the seller.</div>`;
  const shown = r && !r.ok && vState.tamper ? r.payload.split("|") : null;
  return `<div class="head"><div><h1>${kind === "CR" ? "Correction notice" : kind === "CM" ? "Credit memo" : "Invoice"} verification</h1><p class="sub">Opened from verify.talaan.ph/v/${esc(doc.vt || "")}. This page is the seller's verification service; BIR-prescribed validation will follow its own rules (RMC 98-2026, IV.14).</p></div>
   <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-act="vtamper">${vState.tamper ? "Show the genuine copy" : "Try an altered copy"}</button><button class="btn" data-go="verify">Check another link</button></div></div>
  ${res}
  <div class="grid2"><div class="stack">
   <div class="panel"><h2>Document</h2><dl class="kvt">
    <dt>Seller</dt><dd>${esc(sel.name)}</dd><dt>Seller TIN</dt><dd>${esc(sel.tin)}</dd>
    <dt>Document</dt><dd>${kind === "CR" ? `Correction Notice No. ${doc.no}, for Invoice No. ${doc.invNo}` : kind === "CM" ? `Credit Memo No. ${doc.no}, reducing Invoice No. ${doc.invNo}` : `Invoice No. ${doc.no} (${FORMATS[formatOf(doc)]})`}</dd>
    <dt>Date</dt><dd>${isoDate(t.date)}</dd>
    <dt>${kind === "CR" ? "Amounts" : kind === "CM" ? "Total amount credited" : "Total amount due"}</dt><dd><strong>${kind === "CR" ? "Unchanged (buyer details only)" : shown ? peso(Math.round(Number(shown[5]) * 100)) + " (as presented)" : money(kind === "INV" ? doc : kind === "CM" ? invOf(doc.invNo) : {}, t.total)}</strong></dd>
    <dt>VAT</dt><dd>${money(kind === "INV" ? doc : kind === "CM" ? invOf(doc.invNo) : {}, t.vat)}</dd>
    <dt>PTI Electronic Invoice</dt><dd>${esc(sel.ptiNo)}</dd>
    <dt>EIS unique ID</dt><dd class="mono">${esc(doc.eisId)}</dd>
    <dt>Buyer</dt><dd>${vState.examiner ? `${esc(b.name)}, TIN ${esc(b.tin || "none")}` : "Shown to the buyer and authorized examiners only"}</dd></dl></div>
   <div class="panel"><h2>Status</h2><div class="vres ${st.cls}" style="margin:0">${st.text}</div></div>
   ${
     vState.examiner
       ? `<div class="panel"><h2>Full details (authorized view)</h2>${kind === "CR" ? docCorr(doc) : kind === "CM" ? docCredit(doc) : docInvoice(doc)}${
           kind === "INV" && crApproved(doc.no).length
             ? crApproved(doc.no)
                 .map((c) => docCorr(c))
                 .join("")
             : ""
         }</div>`
       : ""
   }
  </div>
  <div class="stack">
   <div class="panel"><h2>Authorized view</h2>${
     vState.examiner
       ? `<p style="margin:0">Signed in as <b>BIR examiner (demo)</b>. Buyer details and the full document are shown, and this access is logged.</p>`
       : `<p style="margin:0 0 10px">Buyer details and line items are withheld from the public page under the Data Privacy Act. An authorized examiner signs in to see them.</p><button class="btn" data-act="vexam">Sign in as BIR examiner (demo)</button>`
   }</div>
   <div class="panel"><h2>Signature details</h2><p class="hint" style="margin-top:0">ECDSA P-256 with SHA-256 over the signed fields below. The public key is published by the seller's EIS provider.</p>
    <div class="mono">${esc(r ? r.payload : doc.sigPayload || "")}</div>
    <p class="hint">Signed fields: format version, seller TIN, document type, number, date, total, VAT, EIS unique ID.</p></div>
   <div class="panel"><h2>Access log</h2>${
     (doc.accessLog || []).length
       ? `<ul class="dl">${doc.accessLog
           .slice()
           .reverse()
           .map(
             (a) =>
               `<li>${esc(a.who)}<br><span class="due">${fmtDate(a.at)}</span></li>`,
           )
           .join("")}</ul>`
       : '<p class="due" style="margin:0">No authorized views yet.</p>'
   }</div>
  </div></div>`;
}

/* ================= Correction notices (buyer details only; RMC 98-2026 IV.8) ================= */
let corrections = [],
  corrReqs = [],
  nextCR = 8000001,
  nextCRR = 1,
  crDraft = null;
const CR_FIELDS = {
  name: "Buyer's registered name",
  tin: "Buyer's TIN",
  address: "Buyer's business address",
};
const CR_REASONS = [
  "Typographical error",
  "Transposed or missing digits",
  "Misspelling",
  "Outdated address in the customer record",
];
function origBuyer(inv) {
  return inv.buyer || cust(inv.customerId);
}
function crApproved(invNo) {
  return corrections.filter((c) => c.invNo === invNo);
}
function effBuyer(inv) {
  const b = { ...origBuyer(inv) };
  crApproved(inv.no).forEach((c) =>
    c.changes.forEach((ch) => (b[ch.field] = ch.to)),
  );
  return b;
}
/* policy: address always; name and TIN only where the buyer's input VAT does not depend on this invoice */
function crAllowed(inv) {
  const b = origBuyer(inv),
    vatBuyer = inv.vat && b.vatStatus === "VAT";
  return { address: true, name: !vatBuyer, tin: !vatBuyer, vatBuyer };
}
function goNewCR(no) {
  const inv = invOf(no),
    b = effBuyer(inv);
  crDraft = {
    invNo: no,
    sel: {},
    to: { name: b.name, tin: b.tin, address: b.address },
    reason: "",
    support: "",
    seen: false,
    updateMaster: true,
  };
  view = "newCorr";
  current = null;
  render();
  window.scrollTo(0, 0);
}
function crChecks() {
  const d = crDraft,
    inv = invOf(d.invNo),
    al = crAllowed(inv),
    b = effBuyer(inv),
    ks = Object.keys(d.sel).filter((k) => d.sel[k]);
  const out = [
    [ks.length > 0, "At least one field selected for correction"],
    [
      ks.every((k) => al[k]),
      "Only fields allowed for this invoice (amounts, items and VAT can never be corrected here)",
    ],
    [
      ks.every(
        (k) => (d.to[k] || "").trim() && d.to[k].trim() !== (b[k] || ""),
      ),
      "Each corrected value is filled in and differs from the current one",
    ],
    [
      !d.sel.tin || !d.to.tin.trim() || TIN_RE.test(d.to.tin.trim()),
      "Corrected TIN in ###-###-###-##### format",
    ],
    [!!d.reason, "Reason selected"],
    [
      !!d.support.trim() && d.seen,
      "Supporting document identified, seen and a copy kept",
    ],
    [
      nextNo("cr", inv.branch) <= ser("cr", inv.branch)[1],
      "Correction notice series still available",
    ],
  ];
  return out;
}
function crDraftDoc() {
  const d = crDraft,
    inv = invOf(d.invNo),
    b = effBuyer(inv);
  return {
    no: null,
    invNo: d.invNo,
    at: now(),
    reason: d.reason,
    support: d.support,
    eisId: null,
    changes: Object.keys(d.sel)
      .filter((k) => d.sel[k])
      .map((k) => ({ field: k, from: b[k] || "", to: d.to[k].trim() })),
    preparedBy: who(me()),
    preparedAt: now(),
  };
}
function docCorr(cr) {
  const inv = invOf(cr.invNo),
    sel = cr.seller || sellerSnap(inv.branch),
    dz = designV(cr.designV || curDesign().v),
    b = effBuyer(inv);
  return `<div class="paperwrap"><article class="paper" style="${paperStyle(dz)}" aria-label="Correction notice"><div class="band"></div><div class="in">
   <div class="hdr">${sellerBlock(inv.vat, dz, sel)}<div class="title"><div class="big" style="font-size:calc(var(--ts,30px)*0.8)">CORRECTION NOTICE</div></div></div>
   <div class="serial">${cr.no ? `Correction Notice No. ${cr.no}` : '<span class="draftmark">DRAFT, FOR APPROVAL</span>'}</div>
   <div class="row2"><div class="cb"><b>Reference Invoice No. ${inv.no}</b><br>dated ${inv.txnDate ? isoDate(inv.txnDate) : dDate(inv.issuedAt)}<br><span style="font-size:10px">EIS unique ID ${esc(inv.eisId)}</span></div><div class="datebox"><div>Date:</div><div>${dDate(cr.at)}</div></div></div>
   <table class="it"><thead><tr><th style="width:26%">Buyer information</th><th>As shown on the invoice</th><th>Corrected to</th></tr></thead><tbody>
    ${cr.changes.map((c) => `<tr><td>${CR_FIELDS[c.field]}</td><td>${esc(c.from)}</td><td><b>${esc(c.to)}</b></td></tr>`).join("")}</tbody></table>
   <div class="remarks"><b>Reason:</b> ${esc(cr.reason)}. <b>Supporting document:</b> ${esc(cr.support)}.</div>
   <div class="remarks">This notice corrects only the buyer information shown above. The amounts, items, taxes and all other details of the reference invoice are unchanged, and the reference invoice itself has not been altered (RMC No. 98-2026, IV.8).</div>
   <div class="bottom"><div>${cr.no ? qrDoc(cr, "CR", "Scan to verify this correction notice") : ""}</div><div></div></div>
   <div class="signoff"><div><div class="sl"><b>${esc(cr.preparedBy ? cr.preparedBy.name : "")}</b>Prepared by${cr.preparedBy ? `, ${esc(cr.preparedBy.role)}` : ""}<br>${cr.preparedAt ? fmtDate(cr.preparedAt) : ""}</div></div>
    <div><div class="sl"><b>${cr.approvedBy ? esc(cr.approvedBy.name) : "&nbsp;"}</b>Approved by${cr.approvedBy ? `, ${esc(cr.approvedBy.role)}` : " (pending)"}<br>${cr.approvedAt ? fmtDate(cr.approvedAt) : ""}</div></div>
    <div><div class="sl"><b>&nbsp;</b>Received by (buyer)<br>Signature over printed name and date</div></div></div>
   <div class="ptiline">Issued under PTI Electronic Invoice No. ${esc(sel.ptiNo)}, ${esc(sel.branch)}</div>
   ${footer(sel.cr, sel)}</div></article></div>
  <p class="fmtline noprint">No BIR sample format exists for correction notices. Layout follows the credit memo.</p>`;
}
function vNewCorr() {
  const d = crDraft,
    inv = invOf(d.invNo),
    al = crAllowed(inv),
    b = effBuyer(inv);
  return `<div class="head"><div><h1>Correct buyer details</h1><p class="sub">Correction Notice for Invoice No. ${inv.no}. Prepared by ${esc(me().name)}; numbered when an approver issues it.</p></div><button class="btn" data-open="${inv.no}">Cancel</button></div>
  ${al.vatBuyer ? `<div class="banner info"><strong>VAT-registered buyer on a VAT invoice.</strong> Only the address can be corrected by notice. The buyer's input VAT depends on its registered name and TIN appearing correctly on the invoice itself (RR 7-2024), so a wrong name or TIN is corrected by cancelling and reissuing. <button class="btn link" data-act="reissue" data-no="${inv.no}">Cancel and reissue instead</button></div>` : ""}
  <div class="grid2"><div class="stack">
   <div class="panel"><h2>Fields to correct</h2><div style="overflow-x:auto"><table style="min-width:620px"><thead><tr><th></th><th>Field</th><th>Currently shown</th><th>Corrected to</th></tr></thead><tbody>
    ${Object.entries(CR_FIELDS)
      .map(
        ([
          k,
          l,
        ]) => `<tr><td><input type="checkbox" aria-label="Correct ${l}" data-crsel="${k}"${d.sel[k] ? " checked" : ""}${al[k] ? "" : " disabled"}></td><td>${l}${al[k] ? "" : '<br><span class="due">Not allowed for this invoice</span>'}</td><td style="white-space:normal">${esc(b[k] || "")}</td>
     <td><input data-crto="${k}" value="${esc(d.to[k] || "")}"${d.sel[k] ? "" : " disabled"} placeholder="${k === "tin" ? "###-###-###-#####" : ""}" style="min-width:220px"></td></tr>`,
      )
      .join("")}</tbody></table></div>
    <p class="hint">Allowed: the buyer's address for any invoice; the buyer's registered name and TIN only for non-VAT, B2C buyers or non-VAT invoices. Never allowed: amounts, items, quantities, prices, VAT, dates, seller details.</p></div>
   <div class="panel"><h2>Reason and support</h2><div class="fields"><div><label for="crr">Reason</label><select id="crr" data-crf="reason"><option value="">Choose a reason</option>${CR_REASONS.map((r) => `<option${d.reason === r ? " selected" : ""}>${r}</option>`).join("")}</select></div>
     <div style="grid-column:1/-1"><label for="crs">Supporting document</label><input id="crs" data-crf="support" value="${esc(d.support)}" placeholder="e.g. Buyer's BIR Certificate of Registration (Form 2303) dated Mar 3, 2021"></div></div>
    <label class="inline"><input type="checkbox" data-crf="seen"${d.seen ? " checked" : ""}> Supporting document seen and a copy kept on file</label>
    <label class="inline"><input type="checkbox" data-crf="updateMaster"${d.updateMaster ? " checked" : ""}> Also update the customer record on approval, so future documents are correct</label></div></div>
  <div class="stack"><div class="panel"><h2>Before submitting</h2><ul class="checks" id="crChecks"></ul></div>
   <button class="btn primary" id="crGo" data-act="crsubmit">Submit for approval</button>
   <p class="hint" style="margin:0">An approver other than you must approve it before it is numbered, signed and issued.</p></div></div>
  <h2 style="margin-top:20px">Preview</h2><div id="crPrev">${docCorr(crDraftDoc())}</div>`;
}
function refreshCR() {
  const ch = crChecks(),
    el = document.getElementById("crChecks");
  if (!el) return;
  el.innerHTML = checksHtml(ch);
  document.getElementById("crGo").disabled = !ch.every((x) => x[0]);
  document.getElementById("crPrev").innerHTML = docCorr(crDraftDoc());
}
function submitCR() {
  if (!crChecks().every((x) => x[0])) return;
  const dd = crDraftDoc();
  const r = {
    id: "CRR-" + String(nextCRR++).padStart(4, "0"),
    invNo: dd.invNo,
    reason: dd.reason,
    support: dd.support,
    changes: dd.changes,
    updateMaster: crDraft.updateMaster,
    preparedBy: dd.preparedBy,
    preparedAt: dd.preparedAt,
    status: "PENDING",
    history: [
      { at: now(), by: me().name, act: "Prepared and submitted for approval" },
    ],
  };
  corrReqs.push(r);
  crDraft = null;
  toast(`${r.id} submitted for approval`);
  view = "corrreq";
  current = r.id;
  render();
  window.scrollTo(0, 0);
}
async function approveCR(r, note) {
  const inv = invOf(r.invNo);
  if (nextNo("cr", inv.branch) > ser("cr", inv.branch)[1]) {
    toast("Correction notice series used up.");
    return;
  }
  const t = now(),
    cr = {
      no: takeNo("cr", inv.branch),
      invNo: r.invNo,
      at: t,
      reason: r.reason,
      support: r.support,
      changes: r.changes,
      eisId: eisId(t),
      designV: curDesign().v,
      seller: Object.assign(sellerSnap(inv.branch), { vat: inv.vat }),
      preparedBy: r.preparedBy,
      preparedAt: r.preparedAt,
      approvedBy: who(me()),
      approvedAt: t,
      approvalNote: note,
      reqId: r.id,
      deliveries: [],
    };
  corrections.push(cr);
  slog("Approved correction notice", `${r.id} issued as No. ${cr.no}`);
  r.status = "APPROVED";
  r.crNo = cr.no;
  r.history.push({
    at: t,
    by: me().name,
    act:
      `Approved; issued as Correction Notice No. ${cr.no}` +
      (note ? `. ${note}` : ""),
  });
  if (r.updateMaster) {
    const c = cust(inv.customerId);
    if (c) r.changes.forEach((ch) => (c[ch.field] = ch.to));
  }
  toast(`Correction Notice No. ${cr.no} issued`);
  view = "corr";
  current = cr.no;
  render();
  await signDoc(cr, "CR");
  render();
}
function vCorrections() {
  const pend = corrReqs
    .filter((r) => r.status !== "APPROVED" && inBr(invOf(r.invNo).branch))
    .slice()
    .reverse();
  return `<div class="head"><div><h1>Correction notices</h1><p class="sub">Corrections of buyer details on issued invoices, by separate document. The invoices themselves are never altered.</p></div></div>
  ${
    pend.length
      ? `<h2>Awaiting approval or declined</h2><div class="tablewrap" style="margin-bottom:18px"><table><thead><tr><th>Request</th><th>Prepared</th><th>Reference invoice</th><th>Fields</th><th>Status</th></tr></thead><tbody>
   ${pend.map((r) => `<tr class="row" data-opencrr="${r.id}" tabindex="0"><td><strong>${r.id}</strong></td><td>${esc(r.preparedBy.name)}<br><span class="due">${fmtDate(r.preparedAt)}</span></td><td>${r.invNo}</td><td>${r.changes.map((c) => CR_FIELDS[c.field]).join(", ")}</td><td>${r.status === "PENDING" ? '<span class="pill s-pending">Awaiting approval</span>' : '<span class="pill s-rejected">Declined</span>'}</td></tr>`).join("")}</tbody></table></div><h2>Issued correction notices</h2>`
      : ""
  }
  ${
    corrections.length
      ? `<div class="tablewrap"><table><thead><tr><th>Notice no.</th><th>Date</th><th>Reference invoice</th><th>Corrected</th><th>Prepared / approved by</th></tr></thead><tbody>
   ${corrections
     .filter((c) => inBr(invOf(c.invNo).branch))
     .slice()
     .reverse()
     .map(
       (c) =>
         `<tr class="row" data-opencr="${c.no}" tabindex="0"><td><strong>${c.no}</strong></td><td>${fmtDate(c.at)}</td><td>${c.invNo}</td><td style="white-space:normal">${c.changes.map((x) => CR_FIELDS[x.field]).join(", ")}</td><td>${esc(c.preparedBy.name)} / ${esc(c.approvedBy.name)}</td></tr>`,
     )
     .join("")}</tbody></table></div>`
      : `<div class="panel empty">No correction notices yet. Open the invoice and use "Correct buyer details".</div>`
  }`;
}
function vCorrReq() {
  const r = corrReqs.find((x) => x.id === current),
    u = me(),
    own = r.preparedBy.id === u.id,
    dd = Object.assign({ no: null, at: now() }, r, {
      approvedBy: null,
      approvedAt: null,
    });
  return `<div class="head"><div><h1>${r.id}: correction notice request</h1><p class="sub">Invoice No. ${r.invNo}. Prepared by ${esc(r.preparedBy.name)}, ${fmtDate(r.preparedAt)}.</p></div><button class="btn" data-go="corrections">Back to correction notices</button></div>
  <div class="grid2"><div>${docCorr(dd)}</div><div class="stack"><div class="panel"><h2>Approval</h2>
   ${
     r.status === "PENDING"
       ? u.roleCode === "AUDITOR"
         ? `<p class="due">Auditor read-only inspection mode.</p>`
         : !u.approver
           ? `<p style="margin:0">Waiting for an authorized approver. Switch the "Signed in as" user to Jose Reyes or Ana Cruz to approve.</p>`
           : own
             ? `<p style="margin:0">You prepared this request, so someone else must approve it.</p>`
             : `<p class="hint" style="margin-top:0">Check the corrected values against the supporting document before approving.</p><label for="crapn">Note (required if declining)</label><input id="crapn"><div style="display:flex;gap:8px;margin-top:10px"><button class="btn primary" data-act="crapprove">Approve and issue</button><button class="btn" data-act="crreject">Decline</button></div>`
       : r.status === "APPROVED"
         ? `<p style="margin:0">Issued as <button class="btn link" data-opencr="${r.crNo}">Correction Notice No. ${r.crNo}</button>.</p>`
         : `<p style="margin:0">Declined.</p>`
   }</div>
   <div class="panel"><h2>History</h2><ul class="dl">${r.history.map((h) => `<li>${esc(h.act)}<br><span class="due">${fmtDate(h.at)}, ${esc(h.by)}</span></li>`).join("")}</ul></div></div></div>`;
}
function vCorr() {
  const c = corrections.find((x) => x.no === current),
    inv = invOf(c.invNo);
  return `<div class="head noprint"><div><h1>Correction Notice No. ${c.no}</h1><p class="sub">Corrects buyer details on Invoice No. ${inv.no}. Issued ${fmtDate(c.at)}.</p></div>
  <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" data-go="corrections">Back</button><button class="btn" data-open="${inv.no}">View Invoice No. ${inv.no}</button><button class="btn" data-act="print">Print</button></div></div>
  <div class="grid2"><div>${docCorr(c)}</div><div class="stack noprint">
   <div class="panel"><h2>Send to buyer</h2>${c.deliveries.length ? `<ul class="dl">${c.deliveries.map((d) => `<li><b>${d.via}</b>, ${esc(d.to)}<br><span class="due">${fmtDate(d.at)}</span></li>`).join("")}</ul>` : '<p class="due" style="margin:0 0 10px">Not yet sent.</p>'}
    ${me().roleCode !== "AUDITOR" ? `<div class="row3"><div><label for="crem">Buyer email</label><input id="crem" type="email" value="${esc((cust(inv.customerId) || {}).email || "")}"></div><button class="btn" data-act="cremail" data-cr="${c.no}">Email notice</button></div>
    <button class="btn link" data-act="crack" data-cr="${c.no}">Buyer signed printed copy</button>` : `<p class="hint">Auditor inspection mode: delivery audit history is shown above.</p>`}</div>
   <div class="panel"><h2>Authorization</h2><ul class="dl"><li><b>Prepared by</b> ${esc(c.preparedBy.name)}, ${esc(c.preparedBy.role)}<br><span class="due">${fmtDate(c.preparedAt)}</span></li><li><b>Approved by</b> ${esc(c.approvedBy.name)}, ${esc(c.approvedBy.role)}<br><span class="due">${fmtDate(c.approvedAt)}${c.approvalNote ? ". " + esc(c.approvalNote) : ""}</span></li><li><b>PTI Electronic Invoice</b> ${esc(c.seller.ptiNo)}</li></ul></div>
   <div class="panel"><h2>Structured data</h2><button class="btn link" data-act="json">${showJson ? "Hide" : "Show"} JSON</button>${showJson ? `<pre>${esc(JSON.stringify(crJson(c), null, 2))}</pre>` : ""}</div></div></div>`;
}
function crJson(c) {
  const inv = invOf(c.invNo);
  return {
    SpecVersion: "2.01",
    EisUniqueId: c.eisId,
    DocumentType: "CORRECTION_NOTICE",
    CorrectionNoticeNo: String(c.no),
    IssueDateTime: new Date(c.at).toISOString(),
    ReferenceInvoiceNo: String(inv.no),
    ReferenceEisUniqueId: inv.eisId,
    Corrections: c.changes.map((x) => ({
      Field: {
        name: "BuyerRegisteredName",
        tin: "BuyerTIN",
        address: "BuyerAddress",
      }[x.field],
      From: x.from,
      To: x.to,
    })),
    AmountsChanged: false,
    Reason: c.reason,
    SupportingDocument: c.support,
    PreparedBy: c.preparedBy.name,
    ApprovedBy: c.approvedBy.name,
    PtiElectronicInvoiceNo: c.seller.ptiNo,
  };
}

/* ================= Sign-in, two-factor, session ================= */
let portalOpen = false,
  portalSubs = [],
  portalForm = null,
  portalDone = null,
  nextPS = 1;
function newPortalForm() {
  return {
    name: "",
    trade: "",
    tin: "",
    address: "",
    email: "",
    contact: "",
    phone: "",
    vatStatus: "VAT",
    country: "",
    wht: "0",
    file: null,
    consent: false,
    err: "",
  };
}
function vPortal() {
  const f = portalForm || (portalForm = newPortalForm());
  if (portalDone)
    return `<div class="login" style="max-width:560px"><img src="${BIZ_LOGO}" alt="" style="width:64px;height:64px;object-fit:contain"><h1>Thank you</h1><p class="sub">Your information was received as reference <b>${portalDone}</b>. ${esc(S.name)} will review it and use it on your invoices. You will receive e-invoices at the email you gave.</p>
   <div style="display:flex;gap:8px;margin-top:14px"><button class="btn" data-act="portalagain">Submit another</button><button class="btn link" data-act="portalback">Back to sign-in</button></div></div>`;
  const inp = (k, l, t = "text", ph = "") =>
    `<div><label for="pf-${k}">${l}</label><input id="pf-${k}" type="${t}" data-pf="${k}" value="${esc(f[k] || "")}" placeholder="${ph}"></div>`;
  return `<div class="login" style="max-width:720px"><div style="display:flex;gap:12px;align-items:center"><img src="${BIZ_LOGO}" alt="" style="width:64px;height:64px;object-fit:contain"><div><h1 style="margin:0">Client information form</h1><p class="sub" style="margin:2px 0 0">For invoices issued by ${esc(S.name)}</p></div></div>
   <p class="hint">Enter your details exactly as in your BIR Certificate of Registration (Form 2303). They will appear on the invoices issued to you.</p>
   <div class="fields">${inp("name", "Registered name")}${inp("trade", "Trade or business name (optional)")}</div>
   <div class="fields"><div><label for="pf-vs">Tax status</label><select id="pf-vs" data-pf="vatStatus">${[
     ["VAT", "VAT-registered"],
     ["NONVAT", "Non-VAT registered"],
     ["INDIVIDUAL", "Individual, not in business"],
     ["FOREIGN", "Foreign company (no Philippine TIN)"],
   ]
     .map(
       ([k, l]) =>
         `<option value="${k}"${f.vatStatus === k ? " selected" : ""}>${l}</option>`,
     )
     .join("")}</select></div>
    ${f.vatStatus === "FOREIGN" ? inp("country", "Country") : inp("tin", "TIN with branch code", "text", "###-###-###-#####")}</div>
   <div class="fields"><div style="grid-column:1/-1"><label for="pf-address">Registered business address</label><input id="pf-address" data-pf="address" value="${esc(f.address)}"></div></div>
   <div class="fields">${inp("email", "Email for e-invoices", "email")}${inp("contact", "Contact person")}${inp("phone", "Mobile or phone", "tel")}</div>
   <div class="fields"><div><label for="pf-wht">Do you withhold tax on payments to us?</label><select id="pf-wht" data-pf="wht"><option value="0">No</option>${WHT.slice(
     1,
   )
     .map(
       ([r, l]) =>
         `<option value="${r}"${String(r) === String(f.wht) ? " selected" : ""}>Yes, ${l}</option>`,
     )
     .join("")}</select></div>
    <div><label for="pf-file">BIR Form 2303 (PDF or image, up to 5 MB)</label><input id="pf-file" type="file" accept=".pdf,image/*" data-pfile="1">${f.file ? `<p class="hint" style="margin:4px 0 0">${esc(f.file.name)}, ${(f.file.size / 1024).toFixed(0)} KB</p>` : ""}</div></div>
   <label class="inline"><input type="checkbox" data-pf="consent"${f.consent ? " checked" : ""}> I consent to ${esc(S.name)} processing this information to issue and send invoices, under the Data Privacy Act of 2012.</label>
   <div class="err">${esc(f.err)}</div><div style="display:flex;gap:8px;margin-top:10px"><button class="btn primary" data-act="portalsubmit">Submit</button><button class="btn link" data-act="portalback">Back to sign-in</button></div></div>`;
}
function portalSubmit() {
  const f = portalForm,
    tin = (f.tin || "").trim();
  const err = !f.name.trim()
    ? "Enter the registered name."
    : f.vatStatus === "FOREIGN"
      ? !f.country.trim()
        ? "Enter the country."
        : ""
      : f.vatStatus !== "INDIVIDUAL" && !TIN_RE.test(tin)
        ? "Enter the TIN in ###-###-###-##### format, including the branch code."
        : tin && !TIN_RE.test(tin)
          ? "Check the TIN format."
          : "";
  if (
    err ||
    !f.address.trim() ||
    !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(f.email) ||
    !f.consent
  ) {
    f.err =
      err ||
      (!f.address.trim()
        ? "Enter the address."
        : !f.consent
          ? "Tick the consent box to continue."
          : "Enter a valid email.");
    return render();
  }
  const id = "PS-" + String(nextPS++).padStart(4, "0");
  portalSubs.push({
    id,
    at: now(),
    status: "PENDING",
    ...JSON.parse(JSON.stringify(f)),
    err: undefined,
  });
  portalDone = id;
  portalForm = newPortalForm();
  render();
}
function portalReview() {
  const pend = portalSubs.filter((x) => x.status === "PENDING"),
    url = location.href.split("#")[0] + "#portal",
    mgr = can("master");
  return `<div class="panel" style="margin-bottom:14px"><div style="display:flex;gap:16px;flex-wrap:wrap;align-items:center"><div data-qr="${esc(url)}" style="width:96px;height:96px"></div><div style="flex:1;min-width:240px"><h2 style="margin:0 0 4px">Client information form</h2><p class="hint" style="margin:0 0 6px">Send this link or QR code to new clients. They enter their registered details and upload their BIR Form 2303; you review before they become customers.</p><code style="font-size:12.5px;word-break:break-all">${esc(url)}</code></div></div></div>
  ${
    pend.length
      ? `<h2>Waiting for review (${pend.length})</h2><div class="tablewrap" style="margin-bottom:16px"><table style="min-width:860px"><thead><tr><th>Ref.</th><th>Received</th><th>Registered name</th><th>TIN or country</th><th>Email</th><th>2303</th><th></th></tr></thead><tbody>${pend
          .map(
            (
              x,
            ) => `<tr><td>${x.id}</td><td>${fmtDate(x.at)}</td><td style="white-space:normal"><strong>${esc(x.name)}</strong>${x.trade ? `<br><span class="due">${esc(x.trade)}</span>` : ""}<br><span class="due">${esc(x.address)}</span></td><td>${esc(x.vatStatus === "FOREIGN" ? x.country : x.tin || "none")}</td><td>${esc(x.email)}</td><td>${x.file ? `${esc(x.file.name)}` : '<span class="due">not uploaded</span>'}</td>
    <td>${mgr ? `<button class="btn link" data-act="psok" data-id="${x.id}">Approve</button> <button class="btn link" data-act="psno" data-id="${x.id}">Reject</button>` : ""}</td></tr>`,
          )
          .join("")}</tbody></table></div>`
      : ""
  }`;
}
function vLogin() {
  const a = auth;
  const demo = `<div class="demoacc"><div class="demoacc-title"><span><b>Demo accounts</b> (click to autofill)</span><span class="demoacc-badge">Prototype</span></div><div class="demoacc-tablewrap"><table><thead><tr><th>Username</th><th>Password</th><th>Role</th></tr></thead><tbody>${USERS.filter(
    (u) => u.active,
  )
    .map(
      (u) =>
        `<tr data-quick-user="${esc(u.username)}" data-quick-pass="${u.mustChange ? "Temp#1234" : esc(u.pw)}" title="Click to autofill ${esc(u.username)}"><td><code>${esc(u.username)}</code></td><td><code>${u.mustChange ? "Temp#1234" : esc(u.pw)}</code></td><td><span class="role-badge">${esc(ROLES[u.roleCode].label)}${u.mfa ? ", 2FA" : ""}</span></td></tr>`,
    )
    .join("")}</tbody></table></div></div>`;
  if (a.step === "mfa") {
    const u = USERS.find((x) => x.id === a.uid);
    return `<div class="login"><h1>Two-factor sign-in</h1><p class="sub">Enter the 6-digit code from ${esc(u.name)}'s authenticator app.</p>
    <label for="mfa" style="margin-top:16px">Verification code</label><input id="mfa" inputmode="numeric" autocomplete="one-time-code" maxlength="6" data-auth="code">
    <div class="err">${esc(a.err)}</div><div style="display:flex;gap:8px;margin-top:12px"><button class="btn primary" data-act="mfaok">Verify</button><button class="btn" data-act="authcancel">Cancel</button></div>
    <div class="authapp">Demo authenticator app (normally on the user's phone)<div class="code">${a.code}</div></div></div>`;
  }
  if (a.step === "change") {
    return `<div class="login"><h1>Set a new password</h1><p class="sub">Your password was reset by the administrator. Choose a new one.</p>
    <label for="np1" style="margin-top:16px">New password</label><input id="np1" type="password" data-auth="np1"><label for="np2" style="margin-top:10px">Repeat new password</label><input id="np2" type="password" data-auth="np2">
    <p class="hint">At least 10 characters, with upper and lower case, a number and a symbol.</p><div class="err">${esc(a.err)}</div><button class="btn primary" data-act="pwchange">Save and continue</button></div>`;
  }
  return `<div class="login"><div class="login-header"><img src="${BIZ_LOGO}" alt="Logo" class="login-logo"><h1>Sign in to Talaan</h1><p class="sub">${esc(S.name)}</p></div>
   <label for="un">Username</label><input id="un" autocomplete="username" data-auth="username" value="${esc(a.username)}" placeholder="e.g. msantos">
   <label for="pw">Password</label><input id="pw" type="password" autocomplete="current-password" data-auth="password" placeholder="••••••••">
   <div class="err">${esc(a.err)}</div><button class="btn primary" data-act="signin">Sign in</button>
   <p style="text-align:center;margin:16px 0 0"><button class="btn link" data-act="openportal">Are you a client? Fill in your information for invoicing</button></p><p class="hint" style="text-align:center">Accounts lock for ${LOCK_MIN} minutes after ${MAX_FAIL} failed attempts. Sessions end after ${IDLE_MIN} minutes without activity.</p>${demo}</div>`;
}
function pwStrong(p) {
  return (
    p.length >= 10 &&
    /[a-z]/.test(p) &&
    /[A-Z]/.test(p) &&
    /\d/.test(p) &&
    /[^A-Za-z0-9]/.test(p)
  );
}
function finishLogin(u) {
  userId = u.id;
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("talaan_uid", u.id);
  }
  uiMode = u.roleCode === "CASHIER" ? "counter" : "full";
  if (typeof localStorage !== "undefined") {
    localStorage.setItem("talaan_uimode", uiMode);
  }
  if (uiMode === "counter")
    setTimeout(() => {
      kNew();
      render();
    }, 0);
  viewBr = u.branch === "ALL" ? "00000" : u.branch;
  u.failed = 0;
  u.lastLogin = now();
  lastActivity = Date.now();
  auth = {
    step: "login",
    uid: null,
    code: null,
    codeTries: 0,
    err: "",
    username: "",
  };
  slog(
    "Signed in",
    `${ROLES[u.roleCode].label}${u.mfa ? ", two-factor verified" : ""}`,
    u,
  );
  view = "list";
  current = null;
  render();
  toast(`Welcome, ${u.name}`);
}
function doSignin() {
  const un = (auth.username || "").trim().toLowerCase(),
    pw = auth.password || "",
    u = USERS.find((x) => x.username === un);
  auth.password = "";
  if (!u || !u.active) {
    auth.err = "Username or password is incorrect.";
    slog("Failed sign-in", `Unknown or inactive username "${un}"`);
    return render();
  }
  if (u.lockUntil > now()) {
    auth.err = `Account locked. Try again after ${new Date(u.lockUntil).toLocaleTimeString("en-PH", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit" })}, or ask the administrator.`;
    slog("Sign-in blocked", "Account locked", u);
    return render();
  }
  const expected = u.mustChange ? "Temp#1234" : u.pw;
  if (pw !== expected) {
    u.failed++;
    slog("Failed sign-in", `Wrong password (${u.failed} of ${MAX_FAIL})`, u);
    if (u.failed >= MAX_FAIL) {
      u.lockUntil = now() + LOCK_MIN * 60e3;
      u.failed = 0;
      slog(
        "Account locked",
        `${LOCK_MIN} minutes after ${MAX_FAIL} failed attempts`,
        u,
      );
      auth.err = `Too many failed attempts. The account is locked for ${LOCK_MIN} minutes.`;
    } else
      auth.err = `Username or password is incorrect. ${MAX_FAIL - u.failed} attempt(s) left before lock.`;
    return render();
  }
  if (u.mustChange) {
    auth.step = "change";
    auth.uid = u.id;
    auth.err = "";
    return render();
  }
  if (u.mfa) {
    auth.step = "mfa";
    auth.uid = u.id;
    auth.code = String(Math.floor(100000 + Math.random() * 900000));
    auth.codeTries = 0;
    auth.err = "";
    return render();
  }
  finishLogin(u);
}
function docBranchOfView() {
  try {
    if (view === "detail") return invOf(current).branch;
    if (view === "receipt")
      return receipts.find((r) => r.no === current).branch;
    if (view === "credit")
      return invOf(credits.find((c) => c.no === current).invNo).branch;
    if (view === "cmreq")
      return invOf(cmReqs.find((r) => r.id === current).invNo).branch;
    if (view === "corr")
      return invOf(corrections.find((c) => c.no === current).invNo).branch;
    if (view === "corrreq")
      return invOf(corrReqs.find((r) => r.id === current).invNo).branch;
    if (view === "stockdoc") {
      const d = stockDocs.find((x) => x.id === current);
      return canBranch(d.toBranch) ? d.toBranch : d.branch;
    }
  } catch (e) {}
  return null;
}
function signOut(reason) {
  uiMode = "full";
  kIssued = null;
  kModal = null;
  kShift = 0;
  {
    const t = CUSTOMERS.findIndex((c) => c.id === "ktemp");
    if (t >= 0) CUSTOMERS.splice(t, 1);
  }
  const u = me();
  if (u)
    slog(
      reason === "timeout" ? "Session timed out" : "Signed out",
      reason === "timeout" ? `No activity for ${IDLE_MIN} minutes` : "",
      u,
    );
  userId = null;
  if (typeof localStorage !== "undefined") {
    localStorage.removeItem("talaan_uid");
    localStorage.removeItem("talaan_view");
    localStorage.removeItem("talaan_cur");
    localStorage.removeItem("talaan_uimode");
  }
  draft = null;
  draftR = null;
  draftC = null;
  crDraft = null;
  sDraft = null;
  render();
  if (reason === "timeout") toast("Signed out after inactivity");
}
setInterval(() => {
  if (me() && Date.now() - lastActivity > IDLE_MIN * 60e3) signOut("timeout");
  document
    .querySelectorAll("[data-phclock]")
    .forEach((el) => (el.textContent = phNow()));
}, 30e3);

/* ================= Users and security page ================= */
function vUsers() {
  if (!can("users") && !can("security.view"))
    return `<div class="head"><div><h1>Users and security</h1></div></div><div class="panel">Only the company administrator and the auditor can open this page.</div>`;
  const admin = can("users");
  return (
    storagePanel() +
    `<div class="head"><div><h1>Users and security</h1><p class="sub">Roles, limits and the security log. ${admin ? "You can manage users." : "Read-only view."}</p></div>${admin ? '<div style="display:flex;gap:8px"><button class="btn primary" data-act="usernew">Add user</button><button class="btn" data-act="review">Record access review</button></div>' : ""}</div>
  ${userForm ? `<div style="max-width:880px;margin-bottom:16px">${userFormHtml()}</div>` : ""}
  <div class="tablewrap" style="margin-bottom:18px"><table style="min-width:980px"><thead><tr><th>User</th><th>Role</th><th>Branch</th><th class="num">Approval limit</th><th class="num">Sale discount cap</th><th>Two-factor</th><th>Status</th><th>Last sign-in</th>${admin ? "<th></th>" : ""}</tr></thead><tbody>
   ${USERS.map(
     (
       u,
     ) => `<tr><td><strong>${esc(u.name)}</strong><br><span class="due">${esc(u.username)}, ${esc(u.position)}</span></td><td>${esc(ROLES[u.roleCode].label)}</td><td>${esc(brLabel(u.branch))}</td><td class="num">${u.approver ? peso(u.limit) : "—"}</td><td class="num">${ROLES[u.roleCode].perms.includes("ops") ? u.discCap + "%" : "—"}</td><td>${u.mfa ? "Required" : "Off"}</td>
    <td>${!u.active ? '<span class="pill s-draft">Deactivated</span>' : u.lockUntil > now() ? '<span class="pill s-rejected">Locked</span>' : '<span class="pill s-paid">Active</span>'}</td><td>${u.lastLogin ? fmtDate(u.lastLogin) : "Never"}</td>
    ${admin ? `<td style="white-space:normal"><button class="btn link" data-act="useredit" data-uid="${u.id}">Edit</button> ${u.id !== userId ? `<button class="btn link" data-act="usertoggle" data-uid="${u.id}">${u.active ? "Deactivate" : "Reactivate"}</button>` : ""} <button class="btn link" data-act="userreset" data-uid="${u.id}">Reset password</button>${u.lockUntil > now() ? ` <button class="btn link" data-act="userunlock" data-uid="${u.id}">Unlock</button>` : ""}</td>` : ""}</tr>`,
   ).join("")}</tbody></table></div>
  <h2>What each role can do</h2><div class="tablewrap" style="margin-bottom:18px"><table style="min-width:760px"><thead><tr><th>Permission</th>${Object.values(
    ROLES,
  )
    .map((r) => `<th>${esc(r.label)}</th>`)
    .join("")}</tr></thead><tbody>
   ${Object.entries(PERM_LABEL)
     .map(
       ([k, l]) =>
         `<tr><td>${l.charAt(0).toUpperCase() + l.slice(1)}</td>${Object.values(
           ROLES,
         )
           .map((r) => `<td>${r.perms.includes(k) ? "✓" : ""}</td>`)
           .join("")}</tr>`,
     )
     .join("")}
   <tr><td>Approve own documents</td>${Object.values(ROLES)
     .map(() => "<td>Never</td>")
     .join("")}</tr><tr><td>Edit or delete issued documents</td>${Object.values(
     ROLES,
   )
     .map(() => "<td>Never</td>")
     .join("")}</tr></tbody></table></div>
  <h2>Security log</h2><p class="hint" style="margin-top:0">Sign-ins, failures, lockouts, sign-outs, denied actions, approvals, and changes to users and settings. Entries cannot be edited or deleted.</p>
  <div class="tablewrap"><table style="min-width:760px"><thead><tr><th>When</th><th>User</th><th>Event</th><th>Detail</th></tr></thead><tbody>
   ${
     secLog
       .slice()
       .reverse()
       .slice(0, 200)
       .map(
         (x) =>
           `<tr><td>${fmtDate(x.at)}</td><td>${esc(x.user)}</td><td>${esc(x.event)}</td><td style="white-space:normal">${esc(x.detail)}</td></tr>`,
       )
       .join("") || '<tr><td colspan="4" class="due">No entries yet.</td></tr>'
   }</tbody></table></div>
  <p class="note">Prototype simulation. In production: passwords stored only as salted hashes, two-factor by authenticator app or passkey, sessions on the server, encryption in transit and at rest, and per-client data separation.</p>`
  );
}
function userFormHtml() {
  const f = userForm,
    edit = !!f.id;
  return `<div class="panel" style="background:var(--soft)"><h2>${edit ? "Edit user" : "Add user"}</h2>
   <div class="fields"><div><label for="uf-n">Full name</label><input id="uf-n" data-uf="name" value="${esc(f.name)}"></div><div><label for="uf-p">Position</label><input id="uf-p" data-uf="position" value="${esc(f.position)}"></div><div><label for="uf-u">Username</label><input id="uf-u" data-uf="username" value="${esc(f.username)}"${edit ? " readonly" : ""}></div></div>
   <div class="fields"><div><label for="uf-r">Role</label><select id="uf-r" data-uf="roleCode">${Object.entries(
     ROLES,
   )
     .map(
       ([k, r]) =>
         `<option value="${k}"${f.roleCode === k ? " selected" : ""}>${r.label}</option>`,
     )
     .join("")}</select></div>
    <div><label for="uf-b">Branch</label><select id="uf-b" data-uf="branch">${[["ALL", "All branches"], ...BRS.filter((b) => b.active).map((b) => [b.code, brLabel(b.code)])].map(([v, l]) => `<option value="${v}"${f.branch === v ? " selected" : ""}>${esc(l)}</option>`).join("")}</select></div>
    ${f.roleCode === "APPROVER" ? `<div><label for="uf-l">Approval limit (₱)</label><input id="uf-l" type="number" min="0" step="1000" data-uf="limit" value="${esc(f.limit)}"></div>` : ""}
    ${ROLES[f.roleCode].perms.includes("ops") ? `<div><label for="uf-d">Maximum sale discount (%)</label><input id="uf-d" type="number" min="0" max="100" step="1" data-uf="discCap" value="${esc(f.discCap)}"></div>` : ""}</div>
   <label class="inline"><input type="checkbox" data-uf="mfa"${f.mfa || ["APPROVER", "ADMIN", "AUDITOR"].includes(f.roleCode) ? " checked" : ""}${["APPROVER", "ADMIN", "AUDITOR"].includes(f.roleCode) ? " disabled" : ""}> Require two-factor sign-in${["APPROVER", "ADMIN", "AUDITOR"].includes(f.roleCode) ? " (always required for this role)" : ""}</label>
   ${edit ? "" : `<p class="hint">The user signs in first with the temporary password Temp#1234 and must set a new one.</p>`}
   <div class="err">${esc(f.err || "")}</div><div style="display:flex;gap:8px;margin-top:8px"><button class="btn primary" data-act="usersave">${edit ? "Save changes" : "Add user"}</button><button class="btn" data-act="usercancel">Cancel</button></div></div>`;
}
function saveUser() {
  const f = userForm,
    un = (f.username || "").trim().toLowerCase();
  if (!f.name.trim() || !un) {
    f.err = "Enter the name and username.";
    return render();
  }
  if (!f.id && USERS.some((u) => u.username === un)) {
    f.err = "That username is taken.";
    return render();
  }
  const mfa = ["APPROVER", "ADMIN", "AUDITOR"].includes(f.roleCode) || !!f.mfa,
    vals = {
      name: f.name.trim(),
      position: f.position.trim() || ROLES[f.roleCode].label,
      roleCode: f.roleCode,
      branch: f.branch,
      limit: f.roleCode === "APPROVER" ? cents(f.limit) : 0,
      discCap: Number(f.discCap || 0),
      mfa,
    };
  if (f.id) {
    const u = USERS.find((x) => x.id === f.id);
    if (u.id === userId && vals.roleCode !== "ADMIN") {
      f.err = "You can't remove your own administrator role.";
      return render();
    }
    const before = `${ROLES[u.roleCode].label}, limit ${peso(u.limit)}, cap ${u.discCap}%`;
    Object.assign(u, vals);
    slog(
      "User changed",
      `${u.name}: ${before} → ${ROLES[u.roleCode].label}, limit ${peso(u.limit)}, cap ${u.discCap}%`,
    );
  } else {
    const u = {
      id: "u" + (USERS.length + 1) + rand(2),
      username: un,
      pw: "",
      active: true,
      failed: 0,
      lockUntil: 0,
      lastLogin: 0,
      mustChange: true,
      ...vals,
    };
    Object.defineProperty(u, "role", {
      get() {
        return this.position;
      },
      enumerable: true,
    });
    Object.defineProperty(u, "approver", {
      get() {
        return ROLES[this.roleCode].perms.includes("approve");
      },
      enumerable: false,
    });
    USERS.push(u);
    slog(
      "User added",
      `${u.name} (${un}), ${ROLES[u.roleCode].label}, ${brLabel(u.branch)}`,
    );
  }
  userForm = null;
  render();
}

/* ================= Branches page ================= */
function vBranches() {
  const admin = can("settings");
  const stat = (code) => {
    const inv = invoices.filter((i) => i.branch === code);
    return {
      n: inv.length,
      sales: inv.reduce((a, i) => a + calc(i).due - creditTotal(i.no), 0),
      rc: receipts
        .filter((r) => r.branch === code)
        .reduce((a, r) => a + r.amount, 0),
      stock: ITEMS.filter((i) => i.type === "GOODS").reduce(
        (a, i) => a + Math.round(onHand(i.id, code) * avgCost(i.id, code)),
        0,
      ),
    };
  };
  const rows = BRS.map((b) => ({ b, t: stat(b.code) })),
    tot = rows.reduce(
      (a, { t }) => ({
        n: a.n + t.n,
        sales: a.sales + t.sales,
        rc: a.rc + t.rc,
        stock: a.stock + t.stock,
      }),
      { n: 0, sales: 0, rc: 0, stock: 0 },
    );
  return `<div class="head"><div><h1>Branches</h1><p class="sub">Every branch issues e-invoices under the same PTI Electronic Invoice number, with its own TIN branch code, address and numbering series (RMC 98-2026 IV.10, IV.13). One company database; each record is tagged by branch.</p></div>${admin ? '<button class="btn primary" data-act="brnew">Add branch</button>' : ""}</div>
  ${brForm ? `<div style="max-width:900px;margin-bottom:16px">${brFormHtml()}</div>` : ""}
  <div class="tablewrap" style="margin-bottom:18px"><table style="min-width:1000px"><thead><tr><th>Branch</th><th>TIN</th><th>Registered address</th><th>RDO</th><th>PTI coverage</th><th>Series (next no.)</th></tr></thead><tbody>
   ${BRS.map(
     (
       b,
     ) => `<tr><td><strong>${esc(b.name)}</strong><br><span class="due">${b.code}${b.active ? "" : ", inactive"}</span></td><td>${esc(brTin(b.code))}</td><td style="white-space:normal;max-width:260px">${esc(b.address)}</td><td>${esc(b.rdo)}</td>
    <td style="white-space:normal">${b.code === "00000" ? `PTI ${esc(S.ptiNo)}` : b.ptiNotice ? `Same PTI number; BIR notified ${isoDate(b.ptiNotice)}` : '<span class="pill s-pending">BIR notice not recorded</span>'}</td>
    <td style="white-space:normal;font-size:13px">${Object.entries(SERIES_LABEL)
      .map(
        ([k, l]) => `${l}: ${b.series[k][0]}–${b.series[k][1]} (${b.next[k]})`,
      )
      .join("<br>")}</td></tr>`,
   ).join("")}</tbody></table></div>
  <h2>Branch totals</h2><div class="tablewrap"><table><thead><tr><th>Branch</th><th class="num">Invoices</th><th class="num">Sales, net of credit memos</th><th class="num">Collections</th><th class="num">Stock value</th></tr></thead><tbody>
   ${rows.map(({ b, t }) => `<tr><td>${esc(brLabel(b.code))}</td><td class="num">${t.n}</td><td class="num">${peso(t.sales)}</td><td class="num">${peso(t.rc)}</td><td class="num">${peso(t.stock)}</td></tr>`).join("")}
   <tr><td><strong>Consolidated</strong></td><td class="num"><strong>${tot.n}</strong></td><td class="num"><strong>${peso(tot.sales)}</strong></td><td class="num"><strong>${peso(tot.rc)}</strong></td><td class="num"><strong>${peso(tot.stock)}</strong></td></tr></tbody></table></div>
  <p class="note">Users assigned to a branch see and issue only that branch's documents. Users assigned to all branches choose a branch from the menu, or "All branches" for consolidated viewing.</p>`;
}
function brFormHtml() {
  const f = brForm,
    inp = (k, l, t = "text") =>
      `<div><label for="bf-${k}">${l}</label><input id="bf-${k}" type="${t}" data-bf="${k}" value="${esc(f[k] ?? "")}"></div>`;
  return `<div class="panel" style="background:var(--soft)"><h2>New branch</h2>
   <div class="fields">${inp("code", "Branch code (5 digits)")}${inp("name", "Branch name")}${inp("rdo", "RDO")}</div>
   <div class="fields"><div style="grid-column:1/-1"><label for="bf-address">Registered address (as in the branch COR)</label><input id="bf-address" data-bf="address" value="${esc(f.address)}"></div></div>
   <div class="fields">${inp("ptiNotice", "Date the BIR was notified (IV.13)", "date")}${inp("start", "Series block start (e.g. 5200001)", "number")}${inp("size", "Numbers per series", "number")}</div>
   <p class="hint">Series are created for invoices, credit memos, collection receipts and correction notices from the block start, and must not overlap another branch's series.</p>
   <div class="err">${esc(f.err || "")}</div><div style="display:flex;gap:8px"><button class="btn primary" data-act="brsave">Add branch</button><button class="btn" data-act="brcancel">Cancel</button></div></div>`;
}
function saveBranch() {
  const f = brForm,
    code = (f.code || "").trim(),
    start = Number(f.start),
    size = Number(f.size || 500);
  if (!/^\d{5}$/.test(code) || BRS.some((b) => b.code === code)) {
    f.err = "Enter a new 5-digit branch code.";
    return render();
  }
  if (!f.name.trim() || !f.address.trim()) {
    f.err = "Enter the branch name and registered address.";
    return render();
  }
  if (!(start > 0) || !(size > 0)) {
    f.err = "Enter the series block start and size.";
    return render();
  }
  const off = { inv: 0, cn: 2000000, pr: 1000000, cr: 3000000 },
    series = {},
    next = {};
  Object.keys(off).forEach((k) => {
    series[k] = [start + off[k], start + off[k] + size - 1];
    next[k] = start + off[k];
  });
  const clash = BRS.some((b) =>
    Object.keys(off).some((k) =>
      Object.keys(off).some(
        (j) =>
          !(series[k][1] < b.series[j][0] || series[k][0] > b.series[j][1]),
      ),
    ),
  );
  if (clash) {
    f.err =
      "Those numbers overlap an existing series. Choose another block start.";
    return render();
  }
  BRS.push({
    code,
    name: f.name.trim(),
    address: f.address.trim(),
    rdo: (f.rdo || "").trim(),
    ptiNotice: f.ptiNotice || "",
    active: true,
    series,
    next,
  });
  slog("Branch added", `${f.name.trim()} (${code}), series from ${start}`);
  brForm = null;
  toast(`Branch ${code} added`);
  render();
}

/* ================= Foreign currency page ================= */
function fxDocs() {
  const out = [];
  invoices
    .filter((i) => isFX(i) && inBr(i.branch))
    .forEach((i) => {
      const c = calc(i);
      out.push({
        date: i.txnDate || todayISO(i.issuedAt),
        doc: `Invoice ${i.no}`,
        open: `data-open="${i.no}"`,
        nature: "Sale",
        cur: curOf(i),
        amount: c.due,
        fx: fxOf(i),
        php: toPHP(i, c.due),
      });
    });
  credits
    .filter((cn) => isFX(invOf(cn.invNo)) && inBr(invOf(cn.invNo).branch))
    .forEach((cn) => {
      const inv = invOf(cn.invNo),
        d = cnCalc(cn).due;
      out.push({
        date: todayISO(cn.at),
        doc: `Credit Memo ${cn.no}`,
        open: `data-opencn="${cn.no}"`,
        nature: "Sales adjustment",
        cur: curOf(inv),
        amount: -d,
        fx: fxOf(inv),
        php: -toPHP(inv, d),
      });
    });
  receipts
    .filter((r) => isFX(r) && inBr(r.branch))
    .forEach((r) =>
      out.push({
        date: todayISO(r.at),
        doc: `Collection Receipt ${r.no}`,
        open: `data-openr="${r.no}"`,
        nature: "Collection",
        cur: curOf(r),
        amount: r.amount,
        fx: r.fx,
        php: Math.round(r.amount * r.fx.rate),
      }),
    );
  return out.sort((a, b) => b.date.localeCompare(a.date));
}
function vFX() {
  const tabs = `<div class="tabs" role="group" aria-label="Foreign currency sections">${[
    ["rates", "Exchange rates"],
    ["summary", "Transactions summary"],
    ["gains", "Realized forex gains and losses"],
  ]
    .map(
      ([k, l]) =>
        `<button class="btn" data-fxtab="${k}" aria-pressed="${fxTab === k}">${l}</button>`,
    )
    .join("")}</div>`;
  let body = "";
  if (fxTab === "rates")
    body = `${can("master") ? `<div style="margin-bottom:12px"><button class="btn primary" data-act="fxnew">Enter a rate</button></div>` : ""}${
      fxForm
        ? `<div class="panel" style="background:var(--soft);max-width:760px;margin-bottom:14px"><h2>Enter an exchange rate</h2><div class="fields"><div><label for="fx-c">Currency</label><select id="fx-c" data-fx="cur">${Object.entries(
            CURRENCIES,
          )
            .filter(([k]) => k !== "PHP")
            .map(
              ([k, c]) =>
                `<option value="${k}"${fxForm.cur === k ? " selected" : ""}>${k}, ${c.name}</option>`,
            )
            .join(
              "",
            )}</select></div><div><label for="fx-d">Date</label><input id="fx-d" type="date" data-fx="date" value="${fxForm.date}"></div><div><label for="fx-r">Pesos per unit</label><input id="fx-r" type="number" step="0.0001" min="0" data-fx="rate" value="${fxForm.rate}"></div><div><span class="lbl">Source</span><div class="ro">${CURRENCIES[fxForm.cur].src} ${CURRENCIES[fxForm.cur].src === "BAP" ? "(Bankers Association of the Philippines)" : "(Bangko Sentral ng Pilipinas)"}</div></div></div><div class="err">${esc(fxForm.err || "")}</div><div style="display:flex;gap:8px"><button class="btn primary" data-act="fxsave">Save rate</button><button class="btn" data-act="fxcancel">Cancel</button></div></div>`
        : ""
    }
   <div class="tablewrap"><table><thead><tr><th>Date</th><th>Currency</th><th class="num">Pesos per unit</th><th>Source</th><th>Entered by</th></tr></thead><tbody>${
     fxRates
       .slice()
       .sort(
         (a, b) => b.date.localeCompare(a.date) || a.cur.localeCompare(b.cur),
       )
       .map(
         (r) =>
           `<tr><td>${isoDate(r.date)}</td><td>${r.cur}</td><td class="num">${r.rate.toFixed(4)}</td><td>${r.source}</td><td>${esc(r.by)}</td></tr>`,
       )
       .join("") || '<tr><td colspan="5" class="due">No rates yet.</td></tr>'
   }</tbody></table></div>
   <p class="note">Rates are entered daily from the published source: the BAP rate for US dollars and the BSP rate for other currencies (RMC 12-2024). Monthly averages are not allowed. An invoice uses the rate of its date of transaction, or the latest earlier published rate. The prototype's rates are samples, not actual published rates.</p>`;
  if (fxTab === "summary") {
    const rows = fxDocs();
    body = `<p class="hint" style="margin-top:0">Summary of foreign-currency transactions kept for BIR audit: date, amount, nature, rate and peso amount (RMC 12-2024).</p><div class="tablewrap"><table style="min-width:900px"><thead><tr><th>Date</th><th>Document</th><th>Nature</th><th>Currency</th><th class="num">Amount</th><th class="num">Rate</th><th>Source</th><th class="num">Peso amount</th></tr></thead><tbody>${rows.map((r) => `<tr class="row" ${r.open} tabindex="0"><td>${isoDate(r.date)}</td><td>${r.doc}</td><td>${r.nature}</td><td>${r.cur}</td><td class="num">${amt(r.amount)}</td><td class="num">${r.fx.rate.toFixed(4)}</td><td>${r.fx.source} ${isoDate(r.fx.date)}</td><td class="num">${peso(r.php)}</td></tr>`).join("") || '<tr><td colspan="8" class="due">No foreign-currency transactions yet.</td></tr>'}</tbody></table></div>`;
  }
  if (fxTab === "gains") {
    const rows = [];
    receipts
      .filter((r) => isFX(r) && inBr(r.branch))
      .forEach((r) =>
        r.lines.forEach((l) => {
          const inv = invOf(l.invNo);
          rows.push({ r, l, inv });
        }),
      );
    const tot = rows.reduce((a, x) => a + (x.l.fxGain || 0), 0);
    body = `<p class="hint" style="margin-top:0">Only realized gains and losses, on collection, count for income tax; unrealized revaluation differences do not (RMC 12-2024).</p><div class="stats"><div class="stat"><b>${peso(tot)}</b><span>Net realized forex ${tot >= 0 ? "gain" : "loss"}</span></div></div>
    <div class="tablewrap"><table style="min-width:860px"><thead><tr><th>Collection receipt</th><th>Invoice</th><th class="num">Amount collected</th><th class="num">Invoice rate</th><th class="num">Collection rate</th><th class="num">Gain (loss)</th></tr></thead><tbody>${rows.map((x) => `<tr><td><button class="btn link" data-openr="${x.r.no}">${x.r.no}</button> ${dDate(x.r.at)}</td><td><button class="btn link" data-open="${x.inv.no}">${x.inv.no}</button></td><td class="num">${money(x.r, x.l.amount)}</td><td class="num">${fxOf(x.inv).rate.toFixed(4)}</td><td class="num">${x.r.fx.rate.toFixed(4)}</td><td class="num">${peso(x.l.fxGain || 0)}</td></tr>`).join("") || '<tr><td colspan="6" class="due">No foreign-currency collections yet.</td></tr>'}</tbody></table></div>`;
  }
  return `<div class="head"><div><h1>Foreign currency</h1><p class="sub">Invoices may be issued in foreign currency; the system keeps the peso equivalent of every amount at the prescribed rate.</p></div></div>${tabs}${body}`;
}

/* ================= Cashier counter (encode directly on the invoice) ================= */
let kHist = { from: "", to: "", q: "" },
  kReprint = false,
  uiMode =
    (typeof localStorage !== "undefined" &&
      localStorage.getItem("talaan_uimode")) ||
    "full",
  kRows = [],
  kBuyer = null,
  kTender = "",
  kSugg = { row: -1, list: [], hi: 0, kind: null },
  kModal = null,
  kIssued = null,
  kRequests = [],
  kShift = 0;
function kBlank() {
  return { desc: "", qty: "", price: 0, tax: "VATABLE", disc: 0, q: "" };
}
function kBranch() {
  return wb() || (me().branch !== "ALL" ? me().branch : "00000");
}
function kNew() {
  const br = kBranch();
  draft = newDraft();
  Object.assign(draft, {
    branch: br,
    no: nextNo("inv", br),
    salesType: "CASH",
    counter: true,
  });
  kRows = [kBlank(), kBlank(), kBlank(), kBlank()];
  kBuyer = { ...cust("cw") };
  kTender = "";
  kIssued = null;
  kSugg = { row: -1, list: [], hi: 0, kind: null };
  kSync();
  if (!kShift) kShift = now();
}
function kSync() {
  if (!draft) return;
  draft.items = kRows.filter((r) => r.sku && Number(r.qty) > 0);
  let t = CUSTOMERS.find((c) => c.id === "ktemp");
  const known = CUSTOMERS.find(
    (c) =>
      c.id !== "ktemp" &&
      c.name === kBuyer.name &&
      (c.tin || "") === (kBuyer.tin || ""),
  );
  if (known && known.id !== "cw") {
    draft.customerId = known.id;
    if (!draft.termsSet) draft.terms = known.terms || "NET30";
    if (!draft.whtManual) {
      draft.whtMode = "RATE";
      draft.wht = known.wht || 0;
    }
  } else if (known && known.id === "cw") {
    draft.customerId = "cw";
    if (!draft.whtManual) {
      draft.whtMode = "RATE";
      draft.wht = 0;
    }
    draft.walkinEmail = (kBuyer.email || "").trim();
  } else {
    if (!t) {
      t = { id: "ktemp" };
      CUSTOMERS.push(t);
    }
    if (!draft.whtManual) {
      draft.whtMode = "RATE";
      draft.wht = 0;
    }
    Object.assign(t, {
      name: kBuyer.name,
      tin: kBuyer.vatStatus === "FOREIGN" ? "" : kBuyer.tin,
      address: kBuyer.address || "",
      email: kBuyer.email || "",
      vatStatus: kBuyer.vatStatus,
      country: kBuyer.country || "",
    });
    draft.customerId = "ktemp";
  }
}
function kChecks() {
  kSync();
  const c = calc(draft),
    out = checks(draft).filter(
      ([ok, l]) => !/Invoice no\. within|PTI Electronic/.test(l) || !ok,
    );
  out.unshift([draft.items.length > 0, "At least one item with a quantity"]);
  out.push([
    kRows.every((r) => !r.q || r.sku),
    "Every item picked from the product list",
  ]);
  if (draft.salesType === "CHARGE")
    out.push([draft.customerId !== "cw", "Charge sale needs a named buyer"]);
  if (draft.whtManual && me().roleCode === "CASHIER") {
    out.push([
      draft.customerId !== "cw",
      "Manual withholding only for a named client",
    ]);
    out.push([
      !!(draft.whtReason || "").trim(),
      "Reason for the manual withholding",
    ]);
  }
  if (draft.whtManual && draft.whtMode === "PCT")
    out.push([
      Number(draft.whtPct) > 0 && Number(draft.whtPct) <= 100,
      "Withholding rate between 0 and 100%",
    ]);
  if ((kBuyer.email || "").trim())
    out.push([
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(kBuyer.email.trim()),
      "Buyer email in a valid format",
    ]);
  if (draft.txnDate < todayISO())
    out.push([
      !!((draft.refs || {}).lateReason || "").trim(),
      "Reason for the earlier date (it prints on the invoice)",
    ]);
  if (draft.salesType === "CASH" && (draft.pay || {}).method === "CASH")
    out.push([
      cents(kTender) >= c.due && c.due > 0,
      "Cash received covers the amount due",
    ]);
  return out;
}
function kMine() {
  const d = new Date().toDateString();
  return invoices.filter(
    (i) => i.issuedBy === userId && new Date(i.issuedAt).toDateString() === d,
  );
}
function vCounter() {
  if (!kIssued && !draft) kNew();
  if (kIssued && !invOf(kIssued)) kIssued = null;
  const u = me(),
    br = kIssued ? invOf(kIssued).branch : draft ? draft.branch : kBranch();
  const strip = `<header class="kstrip"><span class="brand">Talaan Counter</span><span class="who">${esc(brLabel(br))}</span><span class="who">Cashier <b>${esc(u.name)}</b></span><span class="who">Shift from ${new Date(kShift || now()).toLocaleTimeString("en-PH", { timeZone: "Asia/Manila", hour: "numeric", minute: "2-digit" })}</span><span class="who" title="Philippine Standard Time">PST <span data-phclock="1">${phNow()}</span></span>
   ${
     u.branch === "ALL" && !kIssued
       ? `<label class="who" for="kbr">Branch</label><select id="kbr" data-kbr="1">${BRS.filter(
           (b) => b.active,
         )
           .map(
             (b) =>
               `<option value="${b.code}"${br === b.code ? " selected" : ""}>${esc(b.name)}</option>`,
           )
           .join("")}</select>`
       : ""
   }
   <span class="sp"></span><button class="btn link" data-act="ktoday">My invoices (${kMine().length} today)</button><button class="btn link" data-act="kshift">End of shift</button><button class="btn link" data-act="khelp">Ask supervisor</button>
   ${u.roleCode !== "CASHIER" ? `<button class="btn" data-act="kfull">Switch to full system</button>` : ""}<button class="btn link" data-act="signout">Sign out</button></header>`;
  if (kIssued) {
    const i = invOf(kIssued),
      c = calc(i);
    return `${strip}<div class="kwork"><div style="overflow-x:auto">${kReprint ? `<div style="max-width:760px;margin:0 auto 6px;font-weight:700;color:#B42318">REPRINTED COPY of Invoice No. ${i.no}, originally issued ${fmtDate(i.issuedAt)}</div>` : ""}${docInvoice(i)}</div><aside class="krail">
    <div class="panel"><div class="due" style="font-size:13px;font-weight:600">Invoice No. ${i.no}</div><div class="kdue">${money(i, c.due)}</div>
     ${i.salesType === "CASH" ? `<div class="kminor"><span>Cash received</span><b>${money(i, cents(i.tender))}</b></div><div class="kminor"><span>Change given</span><b>${money(i, Math.max(cents(i.tender) - c.due, 0))}</b></div>` : `<div class="kminor"><span>Charge sale</span><b>Collected by the office</b></div>`}</div>
    <button class="kissue" data-act="knext">Next customer</button>
    <div class="panel" style="display:flex;flex-direction:column;gap:8px"><button class="btn" data-act="print">Print copy for buyer</button>
     <button class="btn" data-act="kemail"${(i.buyer || {}).email ? "" : " disabled"}>Email e-invoice${(i.buyer || {}).email ? ` to ${esc(i.buyer.email)}` : " (no email on file)"}</button>
     <button class="btn" data-act="kqr">Buyer scanned the QR code</button><button class="btn" data-act="kcorrect">Request correction or void</button></div>
    ${i.deliveries.length ? `<div class="panel hint" style="margin:0">${i.deliveries.map((d) => `${esc(d.via)}: ${esc(d.to)}`).join("<br>")}</div>` : ""}
    <div class="panel hint" style="margin:0">Issued invoices are locked. Corrections are made by a supervisor through a credit memo, a correction notice or a new invoice.</div></aside></div>${kModalHtml()}`;
  }
  const c = calc(draft),
    ch = kChecks(),
    ok = ch.every((x) => x[0]),
    adv = advisories(draft);
  return `${strip}<div class="kwork"><div style="overflow-x:auto">${kPaper(c)}</div><aside class="krail" aria-label="Payment and issue">
   <div class="panel"><div class="due" style="font-size:13px;font-weight:600">Amount due</div><div class="kdue">${money(draft, c.due)}</div>
    ${isFX(draft) && fxOf(draft).rate ? `<div class="kminor"><span>Peso equivalent</span><b>${peso(toPHP(draft, c.due))}</b></div>` : ""}
    <div class="kminor"><span>Items</span><b>${draft.items.length}</b></div>${draft.vat ? `<div class="kminor"><span>VAT</span><b>${money(draft, c.vatShown || 0)}</b></div>` : ""}
    ${promoTotal(draft) ? `<div class="kminor"><span>Sale discount</span><b>−${money(draft, promoTotal(draft))}</b></div>` : ""}${c.disc ? `<div class="kminor"><span>${esc(stType(draft.scpwd).label)} discount</span><b>−${money(draft, c.disc)}</b></div>` : ""}${c.wht ? `<div class="kminor"><span>Withheld by buyer</span><b>−${money(draft, c.wht)}</b></div>` : ""}</div>
   ${draft.salesType === "CASH" ? `<div class="panel">${payFields(draft.pay || { method: "CASH" }, "data-kpay")}</div>` : ""}
   ${
     draft.salesType === "CASH" && (draft.pay || {}).method === "CASH"
       ? `<div class="panel ktender"><label for="ktender">Cash received${isFX(draft) ? ` (${curOf(draft)})` : ""}</label><input id="ktender" data-ktender="1" inputmode="decimal" value="${esc(kTender)}" placeholder="0.00">
     <div class="kquick">${[
       c.due,
       ...(isFX(draft) ? [100, 500, 1000] : [10000, 50000, 100000]).map(
         (x) => Math.ceil(c.due / x) * x,
       ),
     ]
       .filter((x, i, a) => x > 0 && a.indexOf(x) === i)
       .map((x) => `<button data-kquick="${x}">${money(draft, x)}</button>`)
       .join("")}</div>
     <div class="kminor" style="margin-top:10px"><span>Change</span><b style="font-size:22px">${cents(kTender) ? money(draft, Math.max(cents(kTender) - c.due, 0)) : "—"}</b></div></div>`
       : draft.salesType === "CASH"
         ? ""
         : `<div class="panel">${me().roleCode === "CASHIER" ? `<span class="lbl">Payment terms</span><div class="ro">${esc(TERMS[draft.terms || "NET30"][0])}, due ${isoDate(dueDateOf(draft))}</div><p class="hint" style="margin:6px 0 0">From the client's record. The office sets payment terms.</p>` : termsFields(draft, "data-kterm")}<p class="hint" style="margin:6px 0 0">Charge sale: the invoice prints as unpaid, and the office collects later with a Collection Receipt.</p></div>`
   }
   ${kWhtPanel(c)}
   <div class="panel"><ul class="checks">${checksHtml(ch)}${adv.map((a) => `<li class="info">${a}</li>`).join("")}</ul></div>
   <button class="kissue" data-act="kissue"${ok ? "" : " disabled"}>Issue invoice</button><p class="hint" style="margin:0;text-align:center">Ctrl + Enter issues the invoice. Enter moves to the next field.</p>
   <div class="panel hint" style="margin:0"><b>Set by the office:</b> prices, promotions, exchange rates, withholding and discount coverage. <b>Needs a supervisor:</b> price changes, other discounts, voids, returns and corrections.</div></aside></div>${kModalHtml()}`;
}
function kPaper(c) {
  const d = draft,
    f = formatOf(d),
    dz = curDesign(),
    sl = sellerSnap(d.branch),
    b = kBuyer,
    T = isFX(d) ? null : d.scpwd,
    lb = leftBox(f, c),
    rb = rightBox(f, c),
    kind = f === "B3" ? "VAT-EXEMPT SALE" : f === "B4" ? "ZERO-RATED SALE" : "";
  const bx = (rows) =>
    `<table class="bx">${rows.map(([l, v, t]) => `<tr${t ? ' class="tot"' : ""}><td class="lab">${l}</td><td>${v ? amt(v) : ""}</td></tr>`).join("")}</table>`;
  const rows =
    kRows
      .map((r, k) => {
        const note = [];
        if (d.scpwd && SC_STAT.includes(r.scChoice))
          note.push(choiceLabel(r, d.scpwd));
        else if (r.promo)
          note.push(
            r.promoName +
              (r.scStat
                ? `, applied instead of ${stType(d.scpwd).short} discount`
                : ""),
          );
        const oh = r.itemId ? kStock(r.itemId) : null,
          after =
            oh == null
              ? null
              : oh - kSoldInDraft(r.itemId, k) - Number(r.qty || 0);
        return `<tr><td class="krel"><div class="kline"><input class="kf${r.q && !r.sku ? " err" : ""}" data-kline="${k}" data-kk="q" value="${esc(r.q || r.desc)}" placeholder="${k === 0 ? "Scan, type, or pick from the list" : ""}" aria-label="Item ${k + 1}" autocomplete="off">${kListHtml(k, r.itemId)}</div>${
          r.sku
            ? `<span class="ktag">SKU ${esc(r.sku)}, <b>${esc(lineTaxTag(d, r))}</b>${note.length ? "; " + esc(note.join("; ")) : ""}${r.taxReason ? ` (changed by ${esc(r.taxReason.by)}${r.taxReason.approvedBy ? `, approved by ${esc(r.taxReason.approvedBy)}` : ""})` : ""}</span>
     <span class="ktag noprint" style="display:block"><button class="kmini" data-krc="${k}">Change VAT class</button>${isSCPWD(d.scpwd) && (itemById(r.itemId) || {}).scCat === "Q20" ? ` <label style="margin-left:8px"><input type="checkbox" data-kforsc="${k}"${r.scCat !== "NONE" ? " checked" : ""}> This order is for the ${stType(d.scpwd).short}</label>` : ""}</span>${kRc && kRc.row === k ? kRcForm(r) : ""}`
            : ""
        }${oh != null && r.sku ? `<span class="ktag noprint" style="display:block;${after < 0 ? "color:#B42318;font-weight:700" : ""}">On hand ${fmtQty(oh)}; after this sale ${fmtQty(after)}${after < 0 ? ". Check with the office before selling" : ""}</span>` : ""}${kSugg.kind === "item" && kSugg.row === k ? kSuggHtml() : ""}</td>
    <td class="r" style="width:84px"><input class="kf" style="text-align:right" data-kline="${k}" data-kk="qty" value="${esc(r.qty)}" inputmode="decimal" aria-label="Quantity ${k + 1}"${r.sku ? "" : " disabled"}></td>
    <td class="r" style="width:96px">${r.sku ? amt(cents(r.price)) : ""}</td><td class="r" style="width:110px">${r.sku && Number(r.qty) > 0 ? amt(lineShown(r)) : ""}${r.sku ? `<button class="kx" data-kdel="${k}" aria-label="Remove item ${k + 1}">×</button>` : ""}</td></tr>`;
      })
      .join("") +
    (promoTotal(d)
      ? `<tr><td><b>Less: ${esc(promoLabel(d))}</b></td><td></td><td></td><td class="r">(${amt(promoTotal(d))})</td></tr>`
      : "");
  const types = allTypes(d.txnDate);
  const stF = T
    ? `<div class="kg"><span>${esc(stType(T).idLabel)}:</span><input class="kf" data-kst="scId" value="${esc(d.scId || "")}"><span>Name:</span><input class="kf" data-kst="scName" value="${esc(d.scName || "")}">
    ${T === "MOV" ? `<span>Beneficiary:</span><select class="kf" data-kst="movRel"><option value="">Choose</option>${["Awardee", "Widow or widower", "Dependent"].map((x) => `<option${d.movRel === x ? " selected" : ""}>${x}</option>`).join("")}</select>` : ""}
    ${T === "SP" ? `<span>Child (6 or under):</span><input class="kf" data-kst="spChild" value="${esc(d.spChild || "")}">` : ""}
    ${stType(T).extraLabel ? `<span>${esc(stType(T).extraLabel)}:</span><input class="kf" data-kst="stExtraVal" value="${esc(d.stExtraVal || "")}">` : ""}
    ${T === "SP" || T === "NAAC" || stType(T).confirmText ? `<label style="grid-column:1/-1;display:flex;gap:6px;font-size:11px"><input type="checkbox" data-kstok="1"${d.stConfirm ? " checked" : ""}> ${esc(T === "SP" ? "Solo Parent ID and booklet checked; income below ₱250,000; prescription for medicines" : T === "NAAC" ? "PNSTM ID and booklet checked; NSA endorsement for sports equipment" : stType(T).confirmText)}</label>` : ""}
    ${T !== "SP" ? `<span>Group meal:</span><span style="display:grid;grid-template-columns:1fr 1fr;gap:6px"><input class="kf" data-kgrp="diners" value="${(d.group || {}).diners || ""}" placeholder="total diners" inputmode="numeric"><input class="kf" data-kgrp="sc" value="${(d.group || {}).sc || ""}" placeholder="beneficiaries" inputmode="numeric"></span>` : ""}
    <span>Signature:</span><span style="border-bottom:1px solid #1F2937;height:20px"></span></div>`
    : `<div class="kg"><span>SC/PWD/NAAC/MOV/<br>Solo Parent ID No.:</span><span></span><span>Signature:</span><span></span></div>`;
  return `<article class="paper" style="${paperStyle(dz)}" aria-label="Invoice being encoded"><div class="band"></div><div class="in">
   <div class="hdr">${sellerBlock(d.vat, dz, sl)}<div class="title"><div class="big">INVOICE</div>${kind ? `<div class="kind">${kind}</div>` : ""}</div></div>
   <div class="serial">Invoice No. <span style="opacity:.55">${nextNo("inv", d.branch)} (on issue)</span></div>
   <div class="row2"><div class="cb"><button class="ksales" data-ksales="CASH" aria-pressed="${d.salesType === "CASH"}">${d.salesType === "CASH" ? "☑" : "☐"} CASH SALES</button><button class="ksales" data-ksales="CHARGE" aria-pressed="${d.salesType === "CHARGE"}">${d.salesType === "CHARGE" ? "☑" : "☐"} CHARGE SALES</button>
     <div style="font-size:11.5px;margin-top:3px">Currency: <select data-kcur="1" aria-label="Currency" style="font-size:11.5px;padding:1px 4px;width:auto">${Object.keys(
       CURRENCIES,
     )
       .filter((k) => k === "PHP" || rateFor(k, d.txnDate))
       .map((k) => `<option${curOf(d) === k ? " selected" : ""}>${k}</option>`)
       .join("")}</select></div></div>
    <div><div class="datebox"><div>Date:</div><div>${me().roleCode === "CASHIER" ? isoDate(d.txnDate) : `<input type="date" class="kf" data-kdate="1" value="${d.txnDate}" max="${todayISO()}" aria-label="Date of transaction" style="min-width:130px">`}</div></div>
     ${d.txnDate < todayISO() ? `<div style="font-size:11px;border:1px solid #1F2937;border-top:0;padding:4px 8px;max-width:300px"><span style="color:#B42318;font-weight:700">Earlier date.</span> Reason: <input class="kf" data-klate="1" value="${esc((d.refs || {}).lateReason || "")}" placeholder="e.g. replaces manual invoice No. 9000012 (downtime)" aria-label="Reason for the earlier date"></div>` : ""}</div></div>
   <div class="box sold"><div class="h">SOLD TO:</div><div class="b">
     <span>Registered Name</span><span class="krel"><input class="kf" data-kb="name" value="${esc(b.name)}" aria-label="Buyer's registered name" autocomplete="off">${kSugg.kind === "buyer" ? kSuggHtml() : ""}</span>
     <span>TIN</span>${
       b.vatStatus === "FOREIGN"
         ? `<span><span style="display:grid;grid-template-columns:auto 1fr;gap:6px;align-items:center"><span>None (foreign buyer)</span><input class="kf" data-kb="country" value="${esc(b.country || "")}" placeholder="Country" aria-label="Country"></span><button class="kmini" data-kforeign="0">Has a Philippine TIN</button></span>`
         : `<span><input class="kf${b.tin && !TIN_RE.test(b.tin) ? " err" : ""}" data-kb="tin" value="${esc(b.tin || "")}" placeholder="###-###-###-##### (blank for walk-in)" aria-label="Buyer TIN"><button class="kmini" data-kforeign="1">Foreign buyer (no Philippine TIN)</button></span>`
     }
     <span>Business Address</span><input class="kf" data-kb="address" value="${esc(b.address || "")}" aria-label="Buyer address">
     <span>Email</span><input class="kf" type="email" data-kb="email" value="${esc(b.email || "")}" placeholder="for the e-invoice" aria-label="Buyer email"></div></div>
   <table class="it"><thead><tr><th>Item Description/<br>Nature of Service</th><th>Quantity</th><th>Unit Price${isFX(d) ? ` (${curOf(d)})` : ""}</th><th>Amount${isFX(d) ? ` (${curOf(d)})` : ""}</th></tr></thead><tbody>${rows}</tbody></table>
   ${isFX(d) && c.due ? `<div class="remarks"><b>${esc(fxNote(d, c))}</b></div>` : ""}${c.wht ? `<div class="remarks">Withholding by buyer: ${d.whtMode === "AMT" ? money(d, c.wht) + " (fixed amount)" : +(d.wht * 100).toFixed(2) + "%"}${d.whtManual && d.whtReason ? `; ${esc(d.whtReason)}` : cust(d.customerId).whtNote ? ` (${esc(cust(d.customerId).whtNote)})` : ""}.</div>` : ""}
   <div class="bottom"><div>${lb ? bx(lb) : ""}${f === "B1" || f === "B2" ? `<div class="recv">${d.salesType === "CASH" ? "☑" : "☐"} Received the amount of<br><span class="line">${d.salesType === "CASH" && c.due ? money(d, c.due) : ""}</span></div>` : ""}
     ${d.salesType === "CHARGE" ? `<div style="margin-top:10px;border:1.5px solid #B42318;color:#B42318;padding:6px 8px;font-size:11px;font-weight:700">UNPAID AT ISSUANCE. Payment will be acknowledged by a Collection Receipt.<br><span style="font-weight:400;color:#111">${esc(termsText(d))}</span></div>` : `<div style="margin-top:8px;font-size:11px"><b>Payment:</b> ${esc(payText(d.pay))}</div>`}
     ${["B2", "B3", "B5"].includes(f) ? `<div class="notvalid">“THIS DOCUMENT IS<br>NOT VALID FOR CLAIM<br>OF INPUT TAX.”</div>` : ""}</div>
    <div>${bx(rb)}<div class="kbox"><div class="h">Statutory discount: ${
      isFX(d)
        ? "peso sales only"
        : `<button class="kbtn" data-kst-type="" aria-pressed="${!d.scpwd}">None</button>${Object.entries(
            types,
          )
            .map(
              ([k, t]) =>
                `<button class="kbtn" data-kst-type="${k}" aria-pressed="${d.scpwd === k}">${esc(t.label)}</button>`,
            )
            .join("")}`
    }</div>${stF}</div></div></div>
   ${footer(sl.inv, sl)}</div></article>`;
}
function kStock(itemId) {
  const it = itemById(itemId);
  return it && it.type === "GOODS" ? onHand(it.id, draft.branch) : null;
}
function kSoldInDraft(itemId, except) {
  return kRows.reduce(
    (a, r, i) =>
      a +
      (r.itemId === itemId && i !== except && r.sku ? Number(r.qty || 0) : 0),
    0,
  );
}
function kListHtml(k, cur) {
  const act = ITEMS.filter((i) => !i.inactive);
  return `<select class="kpick noprint" data-kselect="${k}" aria-label="Choose item ${k + 1} from the list"><option value="">List ▾</option>${groupedOptions(act, cur, draft.branch, (i) => esc(i.desc))}</select>`;
}
function groupedOptions(list, cur, br, label) {
  const cats = [...new Set(list.map(catOf))].sort();
  return cats
    .map(
      (c) =>
        `<optgroup label="${esc(c)}">${list
          .filter((i) => catOf(i) === c)
          .map(
            (i) =>
              `<option value="${i.id}"${cur === i.id ? " selected" : ""}>${label(i)}${i.type === "GOODS" ? ` (${fmtQty(onHand(i.id, br))} on hand)` : ""}</option>`,
          )
          .join("")}</optgroup>`,
    )
    .join("");
}
function itemSelect(attr, cur, br, goodsOnly) {
  const act = ITEMS.filter(
    (i) => !i.inactive && (!goodsOnly || i.type === "GOODS"),
  );
  return `<select ${attr} aria-label="Choose from the product list" style="width:150px;margin-top:4px;font-size:13px;padding:4px 6px"><option value="">List ▾</option>${groupedOptions(act, cur, br, (i) => `${esc(i.sku)}: ${esc(i.desc)}`)}</select>`;
}
let kRc = null;
function kRcForm(r) {
  const f = kRc,
    cashier = me().roleCode === "CASHIER",
    apprs = USERS.filter((u) => u.active && u.approver && u.id !== userId);
  return `<div class="noprint" style="border:1px solid #9aa3ad;border-radius:6px;padding:8px;margin-top:6px;background:#FAFBFC;font-size:12px;color:#111">
   <div style="display:grid;grid-template-columns:auto 1fr;gap:6px 8px;align-items:center">
    <span>New class</span><select class="kf" data-krcf="tax">${[
      "VATABLE",
      "ZERO_RATED",
      "EXEMPT",
    ]
      .filter((t) => t !== r.tax)
      .map(
        (t) =>
          `<option value="${t}"${f.tax === t ? " selected" : ""}>${taxTag(draft, t)}</option>`,
      )
      .join("")}</select>
    <span>Reason</span><select class="kf" data-krcf="reason">${(RECLASS[f.tax] || []).map((x) => `<option${f.reason === x ? " selected" : ""}>${esc(x)}</option>`).join("")}</select>
    ${f.tax !== "VATABLE" ? `<span>Document</span><input class="kf" data-krcf="ref" value="${esc(f.ref)}" placeholder="e.g. PEZA Cert. No. 2024-123, or proof of inward remittance">` : ""}
    ${cashier ? `<span>Approver</span><select class="kf" data-krcf="appr"><option value="">Choose</option>${apprs.map((u) => `<option value="${u.id}"${f.appr === u.id ? " selected" : ""}>${esc(u.name)}</option>`).join("")}</select><span>Approver's password</span><input class="kf" type="password" data-krcf="pw" value="" autocomplete="off">` : ""}</div>
   <div style="color:#B42318;min-height:14px;margin-top:4px">${esc(f.err || "")}</div>
   <button class="kbtn" data-act="krcsave">Apply</button> <button class="kbtn" data-act="krccancel">Cancel</button>
   <div style="color:#555;margin-top:4px">The change and reason are printed on the line and recorded in the security log.</div></div>`;
}
function kRcSave() {
  const f = kRc,
    r = kRows[f.row],
    cashier = me().roleCode === "CASHIER";
  if (f.tax !== "VATABLE" && !(f.ref || "").trim()) {
    f.err = "Enter the supporting document for the new class.";
    return kRefresh();
  }
  let appr = null;
  if (cashier) {
    appr = USERS.find((u) => u.id === f.appr);
    if (!appr || appr.pw !== f.pw) {
      f.err = "The approver's password is incorrect.";
      slog("Reclassification approval failed", `${r.sku} by ${me().name}`);
      return kRefresh();
    }
  }
  const from = r.tax;
  r.tax = f.tax;
  r.taxReason = {
    reason: f.reason,
    ref: (f.ref || "").trim(),
    by: me().name,
    approvedBy: appr ? appr.name : "",
    from,
  };
  slog(
    "Line VAT class changed",
    `${r.sku}: ${taxTag(draft, from)} to ${taxTag(draft, f.tax)}. ${f.reason}${f.ref ? `, ${f.ref}` : ""}${appr ? `; approved by ${appr.name}` : ""}`,
  );
  kRc = null;
  kRefresh();
}
function kWhtPanel(c) {
  const d = draft,
    cu = cust(d.customerId) || {},
    cashier = me().roleCode === "CASHIER",
    walk = d.customerId === "cw",
    val = !d.whtManual
      ? "AUTO"
      : d.whtMode === "AMT"
        ? "amount"
        : d.whtMode === "PCT"
          ? "custom"
          : String(d.wht);
  return `<div class="panel"><label for="kwht">Withholding by buyer</label>
   <select id="kwht" data-kwht="1"${cashier && walk ? " disabled" : ""}><option value="AUTO"${val === "AUTO" ? " selected" : ""}>From customer record (${cu.wht ? cu.wht * 100 + "%" : "none"})</option>${WHT.map(([r, l]) => `<option value="${r}"${val === String(r) ? " selected" : ""}>${l}</option>`).join("")}<option value="custom"${val === "custom" ? " selected" : ""}>Other rate (%)</option><option value="amount"${val === "amount" ? " selected" : ""}>Fixed amount (${isFX(d) ? curOf(d) : "₱"})</option></select>
   ${d.whtManual && d.whtMode === "PCT" ? `<label for="kwhtp" style="margin-top:6px">Rate (%)</label><input id="kwhtp" type="number" min="0" max="100" step="0.01" data-kwhtp="1" value="${esc(d.whtPct || "")}">` : ""}
   ${d.whtManual && d.whtMode === "AMT" ? `<label for="kwhta" style="margin-top:6px">Amount withheld</label><input id="kwhta" type="number" min="0" step="0.01" data-kwhta="1" value="${esc(d.whtAmt || "")}">` : ""}
   ${d.whtManual ? `<label for="kwhtr" style="margin-top:6px">Reason${cashier ? "" : " (optional)"}</label><input id="kwhtr" data-kwhtr="1" value="${esc(d.whtReason || "")}" placeholder="e.g. client will issue BIR Form 2307">` : ""}
   <p class="hint" style="margin:6px 0 0">${cashier && walk ? "Enter the client's name first; withholding can't be entered for walk-in customers." : c.wht ? `Withheld: ${money(d, c.wht)}. The amount due is reduced by this.` : "No withholding on this invoice."}</p></div>`;
}
function kSuggHtml() {
  if (!kSugg.list.length) return "";
  return `<div class="ksugg" role="listbox">${kSugg.list.map((x, i) => `<div role="option" class="${i === kSugg.hi ? "hi" : ""}" data-kpick="${i}">${kSugg.kind === "item" ? `<b>${esc(x.desc)}</b><small>${esc(x.sku)}, ${peso(cents(priceAt(x, draft.branch)))} per ${esc(x.uom)}${x.tax === "EXEMPT" ? ", VAT-exempt" : x.tax === "ZERO_RATED" ? ", zero-rated" : ""}${activePromo(x.sku, draft.txnDate, draft.branch) ? `, on sale` : ""}${x.type === "GOODS" ? `, <b>${fmtQty(onHand(x.id, draft.branch))} on hand</b>` : ""}</small>` : `<b>${esc(x.name)}</b><small>${esc(VS_LABEL[x.vatStatus] || "")}${x.tin ? ", " + esc(x.tin) : ""}${x.wht ? `, withholds ${Math.round(x.wht * 100)}%` : ""}</small>`}</div>`).join("")}</div>`;
}
function kFindItems(q) {
  q = q.trim().toLowerCase();
  if (!q) return [];
  return ITEMS.filter(
    (i) =>
      !i.inactive &&
      (i.barcode === q ||
        i.sku.toLowerCase().includes(q) ||
        i.desc.toLowerCase().includes(q)),
  ).slice(0, 6);
}
function kPickItem(k, item) {
  const r = kRows[k];
  applyItem(r, item);
  delete r.taxReason;
  r.q = "";
  if (!(Number(r.qty) > 0)) r.qty = "1";
  if (kRows.every((x) => x.sku)) kRows.push(kBlank());
  kSugg = { row: -1, list: [], hi: 0, kind: null };
  kRefresh();
  const q = document.querySelector(`[data-kline="${k}"][data-kk="qty"]`);
  if (q) {
    q.focus();
    q.select();
  }
}
function kPickBuyer(c) {
  kBuyer = { ...c };
  kSugg = { row: -1, list: [], hi: 0, kind: null };
  kRefresh();
  const n = document.querySelector('[data-kb="tin"],[data-kb="country"]');
  if (n) n.focus();
}
function kRefresh() {
  kSync();
  const a = document.activeElement,
    key =
      a &&
      [
        a.dataset.kline,
        a.dataset.kk,
        a.dataset.kb,
        a.dataset.kst,
        a.dataset.ktender,
        a.dataset.kgrp,
        a.dataset.kpay,
        a.dataset.klate,
        a.dataset.kwhtp,
        a.dataset.kwhta,
      ].join("|"),
    pos = a && a.selectionStart;
  render();
  if (key && key !== "|||||||||") {
    const el = [...document.querySelectorAll("input")].find(
      (e) =>
        [
          e.dataset.kline,
          e.dataset.kk,
          e.dataset.kb,
          e.dataset.kst,
          e.dataset.ktender,
          e.dataset.kgrp,
          e.dataset.kpay,
          e.dataset.klate,
          e.dataset.kwhtp,
          e.dataset.kwhta,
        ].join("|") === key,
    );
    if (el) {
      el.focus();
      try {
        el.setSelectionRange(pos, pos);
      } catch (e) {}
    }
  }
}
function kIssue() {
  if (!draft || !kChecks().every((x) => x[0])) return;
  {
    const c0 = cust(draft.customerId),
      em = (kBuyer.email || "").trim();
    if (c0 && c0.id !== "ktemp" && c0.id !== "cw" && em && c0.email !== em) {
      c0.email = em;
      slog("Customer email updated at counter", `${c0.name}: ${em}`);
    }
  }
  if (draft.customerId === "ktemp") {
    const t = CUSTOMERS.find((c) => c.id === "ktemp");
    t.id = "c" + (CUSTOMERS.length + 1) + rand(3);
    draft.customerId = t.id;
    slog("Customer added at counter", t.name);
  }
  if (draft.whtManual) {
    const cw2 = calc(draft);
    slog(
      "Manual withholding at counter",
      `Invoice No. ${draft.no}: ${draft.whtMode === "AMT" ? "fixed amount" : +(draft.wht * 100).toFixed(2) + "%"}, ${peso(toPHP(draft, cw2.wht))}${draft.whtReason ? `. ${draft.whtReason}` : ""}`,
    );
  }
  if (draft.txnDate < todayISO())
    slog(
      "Invoice with earlier date",
      `${draft.no}: dated ${draft.txnDate}. ${draft.refs.lateReason}`,
    );
  draft.tender =
    (draft.pay || {}).method === "CASH"
      ? kTender
      : (calc(draft).due / 100).toFixed(2);
  const no = draft.no,
    we = draft.customerId === "cw" ? draft.walkinEmail : "";
  kIssued = no;
  issue();
  if (!invOf(no)) {
    kIssued = null;
    return;
  }
  if (we) {
    const iv = invOf(no);
    iv.buyer.email = we;
    if (S.autoEmail)
      iv.deliveries.push({ via: "Email (automatic)", to: we, at: now() });
  }
  uiMode = "counter";
  render();
}
function kModalHtml() {
  const m = kModal;
  if (!m) return "";
  if (m === "today") {
    const H = kHist,
      q = H.q.trim().toLowerCase(),
      list = invoices
        .filter(
          (i) =>
            i.issuedBy === userId &&
            todayISO(i.issuedAt) >= H.from &&
            todayISO(i.issuedAt) <= H.to &&
            (!q ||
              String(i.no).includes(q) ||
              ((i.buyer || {}).name || "").toLowerCase().includes(q)),
        )
        .sort((a, b) => b.issuedAt - a.issuedAt);
    return `<div class="kmodal" role="dialog" aria-modal="true" aria-label="My invoices"><div class="box"><h2>My issued invoices</h2>
    <div class="fields"><div><label for="kh-f">From</label><input id="kh-f" type="date" data-kh="from" value="${H.from}" max="${todayISO()}"></div><div><label for="kh-t">To</label><input id="kh-t" type="date" data-kh="to" value="${H.to}" max="${todayISO()}"></div><div><label for="kh-q">Invoice no. or buyer</label><input id="kh-q" data-kh="q" value="${esc(H.q)}" placeholder="e.g. 5000007 or BUYER"></div></div>
    ${(() => {
      const P = (i) => toPHP(i, calc(i).due),
        tot = list.reduce((a, i) => a + P(i), 0),
        cash = list
          .filter((i) => i.salesType === "CASH")
          .reduce((a, i) => a + P(i), 0),
        vat = list.reduce((a, i) => a + toPHP(i, calc(i).vatShown || 0), 0);
      return `<div class="stats" style="margin:4px 0 8px"><div class="stat"><b>${list.length}</b><span>invoice${list.length === 1 ? "" : "s"} issued</span></div><div class="stat"><b>${peso(tot)}</b><span>total amount due</span></div><div class="stat"><b>${peso(cash)}</b><span>cash sales</span></div><div class="stat"><b>${peso(tot - cash)}</b><span>charge sales</span></div><div class="stat"><b>${peso(vat)}</b><span>VAT</span></div></div>`;
    })()}
    <p class="hint" style="margin:0 0 8px">Totals are for the dates and search above, in pesos. You can see and reprint only invoices you issued yourself.</p>${list.length ? `<div class="tablewrap"><table><thead><tr><th>No.</th><th>Time</th><th>Buyer</th><th>Sale</th><th class="num">Amount</th></tr></thead><tbody>${list.map((i) => `<tr class="row" data-kopen="${i.no}" tabindex="0"><td>${i.no}</td><td>${fmtDate(i.issuedAt)}</td><td>${esc((i.buyer || {}).name || "")}</td><td>${i.salesType === "CASH" ? "Cash" : "Charge"}</td><td class="num">${money(i, calc(i).due)}</td></tr>`).join("")}</tbody></table></div>` : "<p>No invoices match.</p>"}<p class="hint">Open one to print a reprinted copy or send it again.</p><button class="btn" data-act="kclose">Close</button></div></div>`;
  }
  if (m === "shift") {
    const list = kMine(),
      t = {
        n: list.length,
        gross: 0,
        vatable: 0,
        vat: 0,
        exempt: 0,
        zero: 0,
        promo: 0,
        wht: 0,
        cash: 0,
        charge: 0,
      },
      bySt = {},
      fx = {};
    list.forEach((i) => {
      const c = calc(i),
        P = (x) => toPHP(i, x);
      t.gross += P(c.totalSales);
      t.vatable += P(c.vatable);
      t.vat += P(c.vatShown || 0);
      t.exempt += P(c.exempt + c.sspt);
      t.zero += P(c.zero);
      t.promo += P(promoTotal(i));
      t.wht += P(c.wht);
      if (i.scpwd && c.disc) bySt[i.scpwd] = (bySt[i.scpwd] || 0) + c.disc;
      if (i.salesType === "CASH") {
        if (isFX(i)) fx[curOf(i)] = (fx[curOf(i)] || 0) + c.due;
        else t.cash += c.due;
      } else t.charge += P(c.due);
    });
    const nos = list.map((i) => i.no),
      row = (l, x, b) =>
        `<tr><td>${b ? `<b>${l}</b>` : l}</td><td class="num">${b ? `<b>${x}</b>` : x}</td></tr>`;
    return `<div class="kmodal" role="dialog" aria-modal="true" aria-label="End of shift"><div class="box"><h2>End of shift, ${esc(me().name)}</h2><div class="tablewrap"><table style="min-width:0"><tbody>${row("Invoices issued", `${t.n}${nos.length ? ` (No. ${Math.min(...nos)} to ${Math.max(...nos)})` : ""}`)}${row("Total sales, in pesos", peso(t.gross))}${row("VATable sales", peso(t.vatable))}${row("VAT", peso(t.vat))}${row("Zero-rated sales", peso(t.zero))}${row("Exempt sales", peso(t.exempt))}${row("Sale discounts", peso(t.promo))}${Object.entries(
      bySt,
    )
      .map(([k, x]) => row(`${esc(stType(k).label)} discounts`, peso(x)))
      .join(
        "",
      )}${row("Withheld by buyers", peso(t.wht))}${row("Cash to remit, pesos", peso(t.cash), 1)}${Object.entries(
      fx,
    )
      .map(([k, x]) => row(`Cash to remit, ${k}`, `${k} ${amt(x)}`, 1))
      .join(
        "",
      )}${row("Charge sales, in pesos", peso(t.charge))}</tbody></table></div>
      <p class="hint">Count the drawer per currency against "Cash to remit" and hand this to your supervisor.</p><div style="display:flex;gap:8px"><button class="btn" data-act="kclose">Close</button><button class="btn" data-act="signout">End shift and sign out</button></div></div></div>`;
  }
  if (m === "help" || m === "correct") {
    const kinds =
      m === "correct"
        ? [
            "Void or cancel this invoice",
            "Wrong buyer name, TIN or address",
            "Wrong item or quantity",
            "Customer is returning goods",
          ]
        : [
            "Price is different from the shelf",
            "Customer asks for another discount",
            "Item not in the product list",
            "Exchange rate for today is missing",
            "Customer is returning goods",
            "Other",
          ];
    return `<div class="kmodal" role="dialog" aria-modal="true" aria-label="Ask supervisor"><div class="box"><h2>${m === "correct" ? `Request correction of Invoice No. ${kIssued}` : "Ask a supervisor"}</h2><p class="hint" style="margin-top:0">${m === "correct" ? "The invoice stays as issued. A supervisor corrects it with a credit memo, a correction notice or a new invoice." : "The request appears for approvers on the Invoices page of the full system."}</p>
     ${kinds.map((k, i) => `<label class="inline" style="margin:4px 0"><input type="radio" name="khk" value="${esc(k)}"${i === 0 ? " checked" : ""}> ${esc(k)}</label>`).join("")}<label for="khn" style="margin-top:8px">Details</label><input id="khn">
     <div style="display:flex;gap:8px;margin-top:12px"><button class="btn" data-act="kclose">Cancel</button><button class="btn primary" data-act="ksend">Send to supervisor</button></div></div></div>`;
  }
  return "";
}
function kHandle(e) {
  const t = e.target;
  const s = t.closest("[data-ksales]");
  if (s) {
    draft.salesType = s.dataset.ksales;
    kRefresh();
    return true;
  }
  const st = t.closest("[data-kst-type]");
  if (st) {
    draft.scpwd = st.dataset.kstType || "";
    draft.stConfirm = false;
    draft.movRel = "";
    draft.spChild = "";
    draft.stExtraVal = "";
    draft.items.forEach((it) => delete it.stCov);
    if (!draft.scpwd) {
      draft.scId = "";
      draft.scName = "";
      draft.group = null;
    }
    kRefresh();
    const f = document.querySelector('[data-kst="scId"]');
    if (f) f.focus();
    return true;
  }
  const fb = t.closest("[data-kforeign]");
  if (fb) {
    if (fb.dataset.kforeign === "1") {
      kBuyer.vatStatus = "FOREIGN";
      kBuyer.tin = "";
    } else {
      kBuyer.vatStatus = kBuyer.tin ? "VAT" : "INDIVIDUAL";
      kBuyer.country = "";
    }
    kRefresh();
    return true;
  }
  const pk = t.closest("[data-kpick]");
  if (pk) {
    const x = kSugg.list[+pk.dataset.kpick];
    if (kSugg.kind === "item") kPickItem(kSugg.row, x);
    else kPickBuyer(x);
    return true;
  }
  const rc = t.closest("[data-krc]");
  if (rc) {
    const r = kRows[+rc.dataset.krc],
      first = ["VATABLE", "ZERO_RATED", "EXEMPT"].find((x) => x !== r.tax);
    kRc = {
      row: +rc.dataset.krc,
      tax: first,
      reason: RECLASS[first][0],
      ref: "",
      appr: "",
      pw: "",
      err: "",
    };
    kRefresh();
    return true;
  }
  if (t.closest("[data-act='krcsave']")) {
    kRcSave();
    return true;
  }
  if (t.closest("[data-act='krccancel']")) {
    kRc = null;
    kRefresh();
    return true;
  }
  const del = t.closest("[data-kdel]");
  if (del) {
    kRows.splice(+del.dataset.kdel, 1);
    while (kRows.length < 4) kRows.push(kBlank());
    kRefresh();
    return true;
  }
  const q = t.closest("[data-kquick]");
  if (q) {
    kTender = (+q.dataset.kquick / 100).toFixed(2);
    kRefresh();
    return true;
  }
  const op = t.closest("[data-kopen]");
  if (op) {
    kIssued = +op.dataset.kopen;
    kReprint = true;
    kModal = null;
    slog("Reprint opened", `Invoice No. ${kIssued}`);
    render();
    return true;
  }
  const a = t.closest("[data-act]");
  if (!a) {
    if (kSugg.kind && !t.closest(".ksugg")) {
      kSugg = { row: -1, list: [], hi: 0, kind: null };
      kRefresh();
    }
    return false;
  }
  const act = a.dataset.act;
  if (act === "kissue") {
    kIssue();
    return true;
  }
  if (act === "knext") {
    kReprint = false;
    kRc = null;
    kNew();
    render();
    const f = document.querySelector('[data-kline="0"][data-kk="q"]');
    if (f) f.focus();
    return true;
  }
  if (act === "kfull") {
    if (me() && me().roleCode === "CASHIER") {
      slog("Access denied", "Cashier tried to switch to full system");
      toast("Cashier accounts are restricted to the counter terminal.");
      return true;
    }
    uiMode = "full";
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("talaan_uimode", "full");
    }
    const t2 = CUSTOMERS.findIndex((c) => c.id === "ktemp");
    if (t2 >= 0) CUSTOMERS.splice(t2, 1);
    draft = null;
    go("list");
    return true;
  }
  if (act === "kemail") {
    const i = invOf(kIssued);
    deliver(i.no, "Email", (i.buyer || {}).email || cust(i.customerId).email);
    toast("E-invoice emailed (demo)");
    return true;
  }
  if (act === "kqr") {
    deliver(kIssued, "QR code", "Scanned by buyer");
    toast("Delivery by QR recorded");
    return true;
  }
  if (act === "ktoday") {
    kHist = { from: todayISO(), to: todayISO(), q: "" };
  }
  if (["ktoday", "kshift", "khelp", "kcorrect"].includes(act)) {
    kModal = {
      ktoday: "today",
      kshift: "shift",
      khelp: "help",
      kcorrect: "correct",
    }[act];
    render();
    return true;
  }
  if (act === "kclose") {
    kModal = null;
    render();
    return true;
  }
  if (act === "ksend") {
    const k = document.querySelector('input[name="khk"]:checked').value,
      n = document.getElementById("khn").value.trim();
    kRequests.push({
      id: "REQ-" + String(kRequests.length + 1).padStart(3, "0"),
      at: now(),
      by: me().name,
      branch: kIssued ? invOf(kIssued).branch : draft.branch,
      kind: k,
      note: n,
      invNo: kModal === "correct" ? kIssued : null,
      status: "OPEN",
    });
    slog("Counter request", `${k}${n ? ": " + n : ""}`);
    kModal = null;
    render();
    toast("Sent to the supervisor");
    return true;
  }
  return false;
}

/* ================= Accounting export: summarized journal entries for NetSuite, SAP or any package ================= */
const ACCT_DEFAULT = {
  CASH: ["1010", "Cash and cash equivalents"],
  AR: ["1100", "Accounts receivable, trade"],
  CWT: ["1250", "Creditable withholding tax (withheld by clients)"],
  INV: ["1300", "Merchandise inventory"],
  ADV: ["2150", "Advances from customers"],
  OVAT: ["2300", "Output VAT payable"],
  SALES_V: ["4010", "Sales and service income, VATable"],
  SALES_Z: ["4020", "Sales and service income, zero-rated"],
  SALES_E: ["4030", "Sales and service income, VAT-exempt"],
  SALES_P: ["4040", "Sales, subject to percentage tax"],
  DISC_ST: ["4110", "Statutory discounts (SC, PWD, NAAC, MOV, SP)"],
  RET: ["4130", "Sales returns and allowances"],
  COGS: ["5010", "Cost of sales"],
  FXG: ["7010", "Foreign exchange gain or loss, realized"],
};
const ACCT_USE = {
  CASH: "Cash sales, collections, advances",
  AR: "Charge sales, collections, credit memos",
  CWT: "Expanded withholding tax withheld by clients on invoices (e.g. 10% on professional fees); reversed on credit memos",
  INV: "Only if cost of sales is included: goods sold and returned",
  ADV: "Advance payments before invoicing",
  OVAT: "VAT on sales and credit memos",
  SALES_V: "VATable sales, net of promotions",
  SALES_Z: "Zero-rated sales",
  SALES_E: "VAT-exempt sales",
  SALES_P: "Non-VAT sales subject to percentage tax",
  DISC_ST: "Statutory discounts granted",
  RET: "Credit memos (returns, allowances, cancellations)",
  COGS: "Only if cost of sales is included: weighted average cost of goods sold",
  FXG: "Realized gains and losses on collection",
};
let ACCT = JSON.parse(JSON.stringify(ACCT_DEFAULT)),
  acctTab = "summary",
  acctF = null,
  exportLog = [];
const GRAN = { D: "Day", W: "Week", M: "Month", Q: "Quarter", Y: "Year" };
const TARGETS = {
  GENERIC: "Generic (any accounting software)",
  NETSUITE: "Oracle NetSuite",
  SAPB1: "SAP Business One",
};
function acctDefaults() {
  const t = todayISO();
  return {
    from: t.slice(0, 8) + "01",
    to: t,
    gran: "D",
    br: viewBr === "ALL" ? "ALL" : viewBr,
    target: "GENERIC",
    cogs: false,
  };
}
function isoOf(t) {
  return typeof t === "string" ? t : todayISO(t);
}
function bucketOf(iso, g) {
  const d = new Date(iso + "T12:00:00");
  if (g === "D") return iso;
  if (g === "W") {
    d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
    return todayISO(d.getTime());
  }
  if (g === "M") return iso.slice(0, 8) + "01";
  if (g === "Q")
    return `${iso.slice(0, 4)}-${String(Math.floor((+iso.slice(5, 7) - 1) / 3) * 3 + 1).padStart(2, "0")}-01`;
  return iso.slice(0, 4) + "-01-01";
}
function bucketEnd(start, g) {
  const d = new Date(start + "T12:00:00");
  if (g === "D") return start;
  if (g === "W") d.setDate(d.getDate() + 6);
  else if (g === "M") {
    d.setMonth(d.getMonth() + 1, 0);
  } else if (g === "Q") {
    d.setMonth(d.getMonth() + 3, 0);
  } else {
    d.setMonth(12, 0);
  }
  return todayISO(d.getTime());
}
function bucketLabel(start, g) {
  const d = new Date(start + "T12:00:00");
  if (g === "D") return isoDate(start);
  if (g === "W") return `Week of ${isoDate(start)}`;
  if (g === "M")
    return d.toLocaleDateString("en-PH", { month: "long", year: "numeric" });
  if (g === "Q")
    return `Q${Math.floor(d.getMonth() / 3) + 1} ${d.getFullYear()}`;
  return String(d.getFullYear());
}
function acctBuild(f) {
  const E = {},
    inR = (iso) => iso >= f.from && iso <= f.to,
    brOk = (b) => f.br === "ALL" || f.br === (b || "00000");
  const post = (iso, br, key, dr, cr, src) => {
    if (!inR(iso) || !brOk(br) || (!dr && !cr)) return;
    const b = bucketOf(iso, f.gran),
      k = (br || "00000") + "|" + b,
      bs = b < f.from ? f.from : b,
      be0 = bucketEnd(b, f.gran),
      be = be0 > f.to ? f.to : be0;
    const e = (E[k] = E[k] || {
      branch: br || "00000",
      start: bs,
      end: be,
      full: bs === b && be === be0,
      acc: {},
      srcs: new Set(),
    });
    const a = (e.acc[key] = e.acc[key] || { dr: 0, cr: 0 });
    a.dr += dr || 0;
    a.cr += cr || 0;
    if (src) e.srcs.add(src);
  };
  invoices.forEach((inv) => {
    const iso = inv.txnDate || isoOf(inv.issuedAt);
    if (!inR(iso) || !brOk(inv.branch)) return;
    const c = calc(inv),
      P = (x) => toPHP(inv, x || 0),
      br = inv.branch;
    const salesV = c.netOfVat - c.zero - c.exempt - (c.sspt || 0),
      dr = {
        [inv.salesType === "CASH" ? "CASH" : "AR"]: P(c.due),
        CWT: P(c.wht),
        DISC_ST: P(c.disc),
      },
      cr = {
        OVAT: P(c.addVat || 0),
        SALES_V: P(salesV),
        SALES_Z: P(c.zero),
        SALES_E: P(c.exempt),
        SALES_P: P(c.sspt || 0),
      };
    const diff =
      Object.values(dr).reduce((a, x) => a + x, 0) -
      Object.values(cr).reduce((a, x) => a + x, 0);
    const big = Object.keys(cr)
      .filter((k) => k.startsWith("SALES"))
      .sort((a, b) => cr[b] - cr[a])[0];
    cr[big] += diff;
    Object.entries(dr).forEach(([k, v]) =>
      post(iso, br, k, v, 0, `Invoice ${inv.no}`),
    );
    Object.entries(cr).forEach(([k, v]) =>
      post(iso, br, k, 0, v, `Invoice ${inv.no}`),
    );
  });
  credits.forEach((cn) => {
    const inv = invOf(cn.invNo),
      iso = isoOf(cn.at),
      c = cnCalc(cn),
      P = (x) => toPHP(inv, x || 0),
      br = inv.branch;
    const dr = { RET: P(c.netOfVat - c.disc), OVAT: P(c.addVat || 0) },
      cr = {
        [inv.salesType === "CASH" ? "CASH" : "AR"]: P(c.due),
        CWT: P(c.wht),
      };
    dr.RET += Object.values(cr).reduce((a, x) => a + x, 0) - dr.RET - dr.OVAT;
    Object.entries(dr).forEach(([k, v]) =>
      post(iso, br, k, v, 0, `Credit Memo ${cn.no}`),
    );
    Object.entries(cr).forEach(([k, v]) =>
      post(iso, br, k, 0, v, `Credit Memo ${cn.no}`),
    );
  });
  receipts.forEach((r) => {
    const iso = isoOf(r.at),
      br = r.branch || "00000";
    if (r.type === "COLLECTION") {
      const cash = isFX(r) ? Math.round(r.amount * r.fx.rate) : r.amount,
        ar = r.lines.reduce((a, l) => a + toPHP(invOf(l.invNo), l.amount), 0),
        fx = cash - ar;
      post(iso, br, "CASH", cash, 0, `CR ${r.no}`);
      post(iso, br, "AR", 0, ar, `CR ${r.no}`);
      if (fx > 0) post(iso, br, "FXG", 0, fx, `CR ${r.no}`);
      if (fx < 0) post(iso, br, "FXG", -fx, 0, `CR ${r.no}`);
    } else {
      post(iso, br, "CASH", r.amount, 0, `CR ${r.no}`);
      post(iso, br, "ADV", 0, r.amount, `CR ${r.no}`);
    }
    (r.applications || []).forEach((ap) => {
      if (ap.amount && ap.at) {
        const ai = isoOf(ap.at);
        post(ai, br, "ADV", ap.amount, 0, `CR ${r.no} applied`);
        post(ai, br, "AR", 0, ap.amount, `CR ${r.no} applied`);
      }
    });
  });
  if (f.cogs)
    ITEMS.filter((i) => i.type === "GOODS").forEach((it) =>
      BRS.forEach((b) =>
        movesOf(it.id, b.code).forEach((m) => {
          const iso = isoOf(m.at),
            v = Math.round(Math.abs(m.qty) * (m.unit || 0)),
            src = m.doc;
          if (m.kind === "SALE") {
            post(iso, b.code, "COGS", v, 0, src);
            post(iso, b.code, "INV", 0, v, src);
          } else if (m.kind === "CUSTRETURN") {
            post(iso, b.code, "INV", v, 0, src);
            post(iso, b.code, "COGS", 0, v, src);
          }
        }),
      ),
    );
  const order = Object.keys(ACCT_DEFAULT);
  return Object.values(E)
    .sort(
      (a, b) =>
        a.start.localeCompare(b.start) || a.branch.localeCompare(b.branch),
    )
    .map((e) => {
      const lines = order
        .filter((k) => e.acc[k])
        .map((k) => {
          const n = e.acc[k].dr - e.acc[k].cr;
          return {
            key: k,
            code: ACCT[k][0],
            name: ACCT[k][1],
            debit: n > 0 ? n : 0,
            credit: n < 0 ? -n : 0,
          };
        })
        .filter((l) => l.debit || l.credit)
        .sort((a, b) => (b.debit > 0) - (a.debit > 0));
      const post = e.end,
        id = `TLN-${e.branch}-${f.gran}-${e.start}${f.gran === "D" ? "" : "-" + e.end}`,
        lab =
          bucketLabel(bucketOf(e.start, f.gran), f.gran) +
          (e.full || f.gran === "D"
            ? ""
            : ` (${isoDate(e.start)} to ${isoDate(e.end)})`);
      return {
        id,
        branch: e.branch,
        location: brOf(e.branch).loc || e.branch,
        period: lab,
        start: e.start,
        end: e.end,
        postingDate: post,
        lines,
        dr: lines.reduce((a, l) => a + l.debit, 0),
        cr: lines.reduce((a, l) => a + l.credit, 0),
        sources: [...e.srcs],
        memo: `Talaan summary, ${lab}, ${brOf(e.branch).name} (${e.branch})`,
      };
    })
    .filter((e) => e.lines.length);
}
const money2 = (c) => (c / 100).toFixed(2);
function csvCell(v) {
  v = String(v ?? "");
  return /[",\n]/.test(v) ? `"${v.replace(/"/g, '""')}"` : v;
}
function acctCSV(f, list) {
  let rows;
  if (f.target === "NETSUITE") {
    rows = [
      [
        "External ID",
        "Date",
        "Memo",
        "Account",
        "Debit",
        "Credit",
        "Location",
        "Line Memo",
      ],
    ];
    list.forEach((e) =>
      e.lines.forEach((l) =>
        rows.push([
          e.id,
          e.postingDate,
          e.memo,
          l.code,
          l.debit ? money2(l.debit) : "",
          l.credit ? money2(l.credit) : "",
          e.location,
          l.name,
        ]),
      ),
    );
  } else if (f.target === "SAPB1") {
    rows = [
      [
        "Reference",
        "ReferenceDate",
        "Memo",
        "AccountCode",
        "Debit",
        "Credit",
        "LineMemo",
        "Reference2",
      ],
    ];
    list.forEach((e) =>
      e.lines.forEach((l) =>
        rows.push([
          e.id,
          e.postingDate,
          e.memo.slice(0, 50),
          l.code,
          money2(l.debit),
          money2(l.credit),
          l.name.slice(0, 50),
          e.branch,
        ]),
      ),
    );
  } else {
    rows = [
      [
        "EntryID",
        "Period",
        "PeriodStart",
        "PeriodEnd",
        "PostingDate",
        "BranchCode",
        "BranchName",
        "Location",
        "AccountCode",
        "AccountName",
        "Debit",
        "Credit",
        "Currency",
        "Memo",
      ],
    ];
    list.forEach((e) =>
      e.lines.forEach((l) =>
        rows.push([
          e.id,
          e.period,
          e.start,
          e.end,
          e.postingDate,
          e.branch,
          brOf(e.branch).name,
          e.location,
          l.code,
          l.name,
          money2(l.debit),
          money2(l.credit),
          "PHP",
          e.memo,
        ]),
      ),
    );
  }
  return rows.map((r) => r.map(csvCell).join(",")).join("\r\n") + "\r\n";
}
function acctJSON(f, list) {
  const head = {
    source: "Talaan",
    company: S.name,
    tin: S.tin,
    from: f.from,
    to: f.to,
    summarizedBy: GRAN[f.gran],
    branch: f.br,
    generatedAt: new Date().toISOString(),
    currency: "PHP",
  };
  if (f.target === "NETSUITE")
    return JSON.stringify(
      {
        ...head,
        target: "NetSuite REST record: journalEntry",
        records: list.map((e) => ({
          externalId: e.id,
          tranDate: e.postingDate,
          memo: e.memo,
          location: { id: e.location },
          line: {
            items: e.lines.map((l) => ({
              account: { id: l.code },
              debit: l.debit ? +money2(l.debit) : undefined,
              credit: l.credit ? +money2(l.credit) : undefined,
              memo: l.name,
              location: { id: e.location },
            })),
          },
        })),
      },
      null,
      2,
    );
  if (f.target === "SAPB1")
    return JSON.stringify(
      {
        ...head,
        target: "SAP Business One Service Layer: POST /JournalEntries",
        records: list.map((e) => ({
          Reference: e.id,
          ReferenceDate: e.postingDate,
          Memo: e.memo.slice(0, 50),
          Reference2: e.branch,
          JournalEntryLines: e.lines.map((l) => ({
            AccountCode: l.code,
            Debit: +money2(l.debit),
            Credit: +money2(l.credit),
            LineMemo: l.name.slice(0, 50),
          })),
        })),
      },
      null,
      2,
    );
  return JSON.stringify(
    {
      ...head,
      target: "Generic",
      entries: list.map((e) => ({
        entryId: e.id,
        period: e.period,
        periodStart: e.start,
        periodEnd: e.end,
        postingDate: e.postingDate,
        branch: {
          code: e.branch,
          name: brOf(e.branch).name,
          location: e.location,
        },
        memo: e.memo,
        lines: e.lines.map((l) => ({
          mappingKey: l.key,
          accountCode: l.code,
          accountName: l.name,
          debit: +money2(l.debit),
          credit: +money2(l.credit),
        })),
        totals: { debit: +money2(e.dr), credit: +money2(e.cr) },
        sourceDocuments: e.sources,
      })),
    },
    null,
    2,
  );
}
async function saveFile(name, text) {
  let dl = null;
  try {
    if (window.claude && window.claude.use)
      dl = await window.claude.use("downloads");
  } catch (e) {}
  if (dl) {
    try {
      await dl.save({ filename: name, data: text });
      toast(`${name} saved`);
    } catch (e) {
      if (e && e.code !== "declined")
        toast("The download couldn't be offered here.");
    }
    return;
  }
  const url = URL.createObjectURL(
    new Blob([text], {
      type: name.endsWith(".json") ? "application/json" : "text/csv",
    }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
  toast(`${name} downloaded`);
}
function vAcct() {
  if (!(can("master") || can("settings") || can("security.view")))
    return `<div class="head"><div><h1>Accounting export</h1></div></div><div class="panel">Only accountants, approvers, administrators and auditors can open this page.</div>`;
  acctF = acctF || acctDefaults();
  const f = acctF,
    edit = can("master") || can("settings");
  const tabs = `<div class="tabs" role="group" aria-label="Accounting export sections">${[
    ["summary", "Journal summary"],
    ["map", "Account mapping"],
    ["log", "Export history"],
  ]
    .map(
      ([k, l]) =>
        `<button class="btn" data-acctab="${k}" aria-pressed="${acctTab === k}">${l}</button>`,
    )
    .join("")}</div>`;
  const head = `<div class="head"><div><h1>Accounting export</h1><p class="sub">Summarized sales-side journal entries (sales, output VAT, withholding by clients, statutory discounts, credit memos, collections and advances), ready to upload to NetSuite, SAP or any accounting software. Invoice-level detail stays in Talaan as the subsidiary sales journal.</p></div></div>${tabs}`;
  if (acctTab === "map")
    return (
      head +
      `<div class="panel"><h2>Chart of accounts mapping</h2><p class="hint" style="margin-top:0">Enter the account code and name exactly as in the client's accounting software. Every export uses these codes.</p>
    <div style="overflow-x:auto"><table style="min-width:760px"><thead><tr><th>Posting</th><th>Used for</th><th>Account code</th><th>Account name</th></tr></thead><tbody>${Object.keys(
      ACCT_DEFAULT,
    )
      .map(
        (k) =>
          `<tr><td><strong>${k}</strong></td><td style="white-space:normal">${ACCT_USE[k]}</td><td><input data-amc="${k}" value="${esc(ACCT[k][0])}" style="width:110px"${edit ? "" : " disabled"} aria-label="${k} account code"></td><td><input data-amn="${k}" value="${esc(ACCT[k][1])}"${edit ? "" : " disabled"} aria-label="${k} account name"></td></tr>`,
      )
      .join("")}</tbody></table></div>
    <h2 style="margin-top:18px">Branch location codes</h2><p class="hint" style="margin-top:0">The location, department or cost center each branch posts to (NetSuite location, SAP cost center or profit center).</p>
    ${BRS.map((b) => `<div class="fields"><div><span class="lbl">${esc(brLabel(b.code))}</span></div><div><input data-aml="${b.code}" value="${esc(b.loc || b.code)}"${edit ? "" : " disabled"} aria-label="Location code for ${esc(b.name)}"></div></div>`).join("")}
    ${edit ? `<button class="btn" data-act="acctreset" style="margin-top:8px">Restore default codes</button>` : ""}</div>`
    );
  if (acctTab === "log")
    return (
      head +
      `<div class="tablewrap"><table><thead><tr><th>Exported</th><th>By</th><th>Period</th><th>Summarized by</th><th>Branch</th><th>Target</th><th class="num">Entries</th><th class="num">Total debits</th></tr></thead><tbody>${
        exportLog
          .slice()
          .reverse()
          .map(
            (x) =>
              `<tr><td>${fmtDate(x.at)}</td><td>${esc(x.by)}</td><td>${isoDate(x.from)} to ${isoDate(x.to)}</td><td>${GRAN[x.gran]}</td><td>${esc(brLabel(x.br))}</td><td>${esc(TARGETS[x.target])} (${x.fmt})</td><td class="num">${x.n}</td><td class="num">${peso(x.total)}</td></tr>`,
          )
          .join("") ||
        '<tr><td colspan="8" class="due">Nothing exported yet.</td></tr>'
      }</tbody></table></div>
    <p class="note">Each entry carries a fixed ID (branch, summary level and period start), so re-uploading the same period is rejected by the receiving system as a duplicate rather than posted twice.</p>`
    );
  const list = acctBuild(f),
    tot = list.reduce((a, e) => a + e.dr, 0),
    unbal = list.filter((e) => e.dr !== e.cr),
    unmapped = Object.keys(ACCT).filter(
      (k) => (f.cogs || !["INV", "COGS"].includes(k)) && !ACCT[k][0].trim(),
    ),
    overlap = exportLog.filter(
      (x) =>
        x.gran === f.gran &&
        (x.br === f.br || x.br === "ALL" || f.br === "ALL") &&
        x.target === f.target &&
        !(x.to < f.from || x.from > f.to),
    );
  return (
    head +
    `<div class="panel"><div class="fields">
    <div><label for="ax-f">From</label><input id="ax-f" type="date" data-ax="from" value="${f.from}" max="${todayISO()}"></div>
    <div><label for="ax-t">To</label><input id="ax-t" type="date" data-ax="to" value="${f.to}" max="${todayISO()}"></div>
    <div><label for="ax-g">Summarize by</label><select id="ax-g" data-ax="gran">${Object.entries(
      GRAN,
    )
      .map(
        ([k, l]) =>
          `<option value="${k}"${f.gran === k ? " selected" : ""}>${l}</option>`,
      )
      .join("")}</select></div>
    <div><label for="ax-b">Branch</label><select id="ax-b" data-ax="br">${[["ALL", "All branches, one entry each"], ...BRS.map((b) => [b.code, brLabel(b.code)])].map(([k, l]) => `<option value="${k}"${f.br === k ? " selected" : ""}>${esc(l)}</option>`).join("")}</select></div>
    <div><span class="lbl">Cost of sales</span><label class="inline" style="margin:6px 0"><input type="checkbox" data-axc="1"${f.cogs ? " checked" : ""}> Include cost of sales (Dr cost of sales, Cr inventory)</label></div>
    <div><label for="ax-x">Format for</label><select id="ax-x" data-ax="target">${Object.entries(
      TARGETS,
    )
      .map(
        ([k, l]) =>
          `<option value="${k}"${f.target === k ? " selected" : ""}>${l}</option>`,
      )
      .join("")}</select></div></div>
    <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:6px"><button class="btn primary" data-act="axcsv"${list.length && !unbal.length && !unmapped.length ? "" : " disabled"}>Download CSV</button><button class="btn" data-act="axjson"${list.length && !unbal.length && !unmapped.length ? "" : " disabled"}>Download JSON</button></div>
    ${overlap.length ? `<div class="banner info" style="margin-top:10px">Part of this period was already exported on ${overlap.map((x) => fmtDate(x.at)).join(", ")}. The entry IDs are the same, so the accounting system will reject exact duplicates; post only corrections made since.</div>` : ""}
    ${unmapped.length ? `<div class="banner bad" style="margin-top:10px">Account codes missing for ${unmapped.join(", ")}. Complete the mapping first.</div>` : ""}</div>
  <div class="stats"><div class="stat"><b>${list.length}</b><span>journal entr${list.length === 1 ? "y" : "ies"}</span></div><div class="stat"><b>${peso(tot)}</b><span>total debits = total credits</span></div><div class="stat${unbal.length ? " alert" : ""}"><b>${unbal.length ? unbal.length + " unbalanced" : "All balanced"}</b><span>checked per entry</span></div></div>
  ${
    list.length
      ? list
          .map(
            (
              e,
            ) => `<div class="panel" style="margin-bottom:12px"><div style="display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap"><h2 style="margin:0">${esc(e.period)}, ${esc(brOf(e.branch).name)}</h2><span class="due">${e.id}, posting date ${isoDate(e.postingDate)}</span></div>
    <div style="overflow-x:auto;margin-top:8px"><table style="min-width:620px"><thead><tr><th>Account</th><th>Name</th><th class="num">Debit</th><th class="num">Credit</th></tr></thead><tbody>${e.lines.map((l) => `<tr><td>${esc(l.code)}</td><td>${esc(l.name)}</td><td class="num">${l.debit ? peso(l.debit) : ""}</td><td class="num">${l.credit ? peso(l.credit) : ""}</td></tr>`).join("")}
     <tr><td colspan="2"><strong>Total</strong> ${e.dr === e.cr ? '<span class="pill s-paid">Balanced</span>' : '<span class="pill s-rejected">Not balanced</span>'}</td><td class="num"><strong>${peso(e.dr)}</strong></td><td class="num"><strong>${peso(e.cr)}</strong></td></tr></tbody></table></div>
    <details style="margin-top:6px"><summary class="due" style="cursor:pointer">${e.sources.length} source document${e.sources.length === 1 ? "" : "s"}</summary><p class="hint" style="margin:6px 0 0">${e.sources.map(esc).join(", ")}</p></details></div>`,
          )
          .join("")
      : `<div class="panel empty">No sales, credit memos, collections or advances in this period.</div>`
  }
  <p class="note">Only the revenue side is exported: purchases, payables and stock adjustments stay out and belong to the purchases and inventory books. Sales are credited net of promotions; statutory discounts and tax withheld by clients are debited separately. Cost of sales is optional. Amounts are in pesos; foreign-currency documents use their frozen rates, and collections post the realized forex difference.</p>`
  );
}
function acctExport(fmt) {
  const f = acctF,
    list = acctBuild(f);
  if (!list.length) return;
  const base = `talaan-journal-${f.gran === "D" ? "daily" : GRAN[f.gran].toLowerCase() + "ly"}-${f.from}-to-${f.to}${f.br === "ALL" ? "" : "-" + f.br}-${f.target.toLowerCase()}`;
  const text = fmt === "csv" ? acctCSV(f, list) : acctJSON(f, list);
  exportLog.push({
    at: now(),
    by: me().name,
    from: f.from,
    to: f.to,
    gran: f.gran,
    br: f.br,
    target: f.target,
    fmt: fmt.toUpperCase(),
    n: list.length,
    total: list.reduce((a, e) => a + e.dr, 0),
  });
  slog(
    "Accounting export",
    `${list.length} entries, ${f.from} to ${f.to}, by ${GRAN[f.gran].toLowerCase()}, ${TARGETS[f.target]} ${fmt.toUpperCase()}`,
  );
  saveFile(`${base}.${fmt}`, text);
  render();
}

/* ================= Central permission guard ================= */
const ACT_PERM = {
  issue: "ops",
  issuelater: "ops",
  add: "ops",
  issuer: "ops",
  newreceipt: "ops",
  payinv: "ops",
  issuecn: "ops",
  cm: "ops",
  addl: "ops",
  reissue: "ops",
  reissuenow: "ops",
  crnew: "ops",
  crsubmit: "ops",
  invfromadv: "ops",
  email: "ops",
  link: "ops",
  qrshown: "ops",
  cnemail: "ops",
  cnlink: "ops",
  cnack: "ops",
  cremail: "ops",
  crack: "ops",
  send: "ops",
  sendall: "ops",
  tadd: "ops",
  tinv: "ops",
  agginv: "ops",
  closeday: "ops",
  totally: "ops",
  cmapprove: "approve",
  cmreject: "approve",
  crapprove: "approve",
  crreject: "approve",
  sdapprove: "approve",
  sdreject: "approve",
  itemnew: "master",
  itemedit: "master",
  itemsave: "master",
  sdnew: "master",
  sdsave: "master",
  trrecv: "ops",
  ncedit: "master",
  ncnew: "master",
  newdcr: "admin",
  submitdcr: "admin",
  brnew: "settings",
  brsave: "settings",
  psok: "master",
  psno: "master",
  impstart: "master",
  impdo: "master",
  imptemplate: "master",
  acctreset: "master",
  promonew: "master",
  promosave: "master",
  promooff: "master",
  kdone: "master",
  fxnew: "master",
  fxsave: "master",
  demononvat: "settings",
  usernew: "users",
  useredit: "users",
  usersave: "users",
  usertoggle: "users",
  userreset: "users",
  userunlock: "users",
  review: "users",
};
const VIEW_PERM = {
  new: "ops",
  newReceipt: "ops",
  newCredit: "ops",
  newCorr: "ops",
  newStock: "master",
  newDcr: "admin",
};

/* ================= Actions ================= */
function transmit(no, cb) {
  const i = invOf(no);
  if (!i || i.progress != null) return;
  i.progress = 1;
  if (view === "detail") render();
  const tick = () => {
    i.progress++;
    if (i.progress >= 5) {
      delete i.progress;
      const b = i.buyer || cust(i.customerId);
      if (b.tin && !TIN_RE.test(b.tin)) {
        i.status = "rejected";
        i.reason = "Buyer TIN is not in the valid format (###-###-###-#####).";
      } else {
        i.status = "accepted";
        i.ack = "ACK-" + rand(10);
        i.reason = null;
      }
      log.push({
        no: i.no,
        at: now(),
        result: i.status,
        ref: i.ack || "—",
        msg: i.status === "accepted" ? "Accepted" : i.reason,
      });
      toast(
        i.status === "accepted"
          ? `Invoice ${i.no} accepted by BIR`
          : `Invoice ${i.no} rejected. See reason.`,
      );
      render();
      cb && cb();
      return;
    }
    if (view === "detail" && current === no) render();
    setTimeout(tick, 650);
  };
  setTimeout(tick, 650);
}
function deliver(no, via, to) {
  invOf(no).deliveries.push({ via, to, at: now() });
  render();
}
function toast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2800);
}

document.addEventListener("click", (e) => {
  lastActivity = Date.now();
  const qRow = e.target.closest("[data-quick-user]");
  if (qRow) {
    auth.username = qRow.dataset.quickUser;
    auth.password = qRow.dataset.quickPass;
    render();
    const un = document.getElementById("un"),
      pw = document.getElementById("pw");
    if (un) un.value = auth.username;
    if (pw) pw.value = auth.password;
    toast(`Autofilled ${auth.username}`);
    return;
  }
  const aa = e.target.closest("[data-act]");
  if (!me()) {
    if (!aa) return;
    const act = aa.dataset.act;
    if (act === "signin") doSignin();
    if (act === "openportal") {
      portalOpen = true;
      portalDone = null;
      render();
    }
    if (act === "portalback") {
      portalOpen = false;
      portalDone = null;
      if (location.hash === "#portal")
        history.replaceState(null, "", location.pathname + location.search);
      render();
    }
    if (act === "portalagain") {
      portalDone = null;
      render();
    }
    if (act === "portalsubmit") portalSubmit();
    if (act === "authcancel") {
      auth = {
        step: "login",
        uid: null,
        code: null,
        codeTries: 0,
        err: "",
        username: "",
      };
      render();
    }
    if (act === "mfaok") {
      const u = USERS.find((x) => x.id === auth.uid);
      if ((auth.codeIn || "").trim() === auth.code) finishLogin(u);
      else {
        auth.codeTries++;
        slog("Failed two-factor code", `Attempt ${auth.codeTries} of 3`, u);
        if (auth.codeTries >= 3) {
          auth = {
            step: "login",
            uid: null,
            code: null,
            codeTries: 0,
            err: "Too many wrong codes. Sign in again.",
            username: u.username,
          };
        } else auth.err = "Wrong code. Check the authenticator app.";
        render();
      }
    }
    if (act === "pwchange") {
      const u = USERS.find((x) => x.id === auth.uid);
      if (auth.np1 !== auth.np2) {
        auth.err = "The passwords don't match.";
        return render();
      }
      if (!pwStrong(auth.np1 || "")) {
        auth.err = "The password doesn't meet the rules.";
        return render();
      }
      u.pw = auth.np1;
      u.mustChange = false;
      slog("Password changed", "New password set after reset", u);
      if (u.mfa) {
        auth.step = "mfa";
        auth.code = String(Math.floor(100000 + Math.random() * 900000));
        auth.codeTries = 0;
        auth.err = "";
        render();
      } else finishLogin(u);
    }
    return;
  }
  if (aa && aa.dataset.act === "signout") {
    signOut();
    return;
  }
  if (
    aa &&
    ["helptoggle", "helptab", "helpask", "helpsend"].includes(aa.dataset.act)
  ) {
    helpHandle(aa);
    return;
  }
  if (aa && aa.dataset.act === "kmode") {
    if (!need("counter")) return;
    uiMode = "counter";
    if (typeof localStorage !== "undefined") {
      localStorage.setItem("talaan_uimode", "counter");
    }
    kShift = kShift || now();
    kNew();
    render();
    setTimeout(() => {
      const f = document.querySelector('[data-kline="0"][data-kk="q"]');
      if (f) f.focus();
    }, 30);
    return;
  }
  if (uiMode === "counter") {
    if (aa && aa.dataset.act === "print") {
      window.print();
      return;
    }
    if (!can("counter")) {
      deny("counter");
      return;
    }
    if (kHandle(e)) return;
    return;
  }
  if (aa && ACT_PERM[aa.dataset.act] && !need(ACT_PERM[aa.dataset.act])) return;
  if (aa && aa.dataset.act === "ncsave" && picker.editId && !need("master"))
    return;
  const pk = e.target.closest("[data-pickid]");
  if (pk) {
    setBuyer(pk.dataset.ctx, pk.dataset.pickid);
    return;
  }
  if (picker.open && !e.target.closest(".picker")) {
    picker.open = false;
    if (picker.ctx) refreshSugg(picker.ctx);
  }
  const g = e.target.closest("[data-go]");
  if (g) {
    resetPicker();
    if (g.dataset.go === "verify")
      vState = {
        kind: null,
        no: null,
        tamper: false,
        examiner: false,
        result: null,
        paste: "",
        err: "",
      };
    go(g.dataset.go);
    return;
  }
  const o = e.target.closest("[data-open]");
  if (o) {
    go("detail", +o.dataset.open);
    return;
  }
  const orr = e.target.closest("[data-openr]");
  if (orr) {
    go("receipt", +orr.dataset.openr);
    return;
  }
  const vq = e.target.closest("[data-verify]");
  if (vq) {
    const [k, n] = vq.dataset.verify.split(":");
    openVerify(k, +n);
    return;
  }
  const ago = e.target.closest("[data-agopen]");
  if (ago) {
    agingOpen = agingOpen === ago.dataset.agopen ? null : ago.dataset.agopen;
    render();
    return;
  }
  const at = e.target.closest("[data-acctab]");
  if (at) {
    acctTab = at.dataset.acctab;
    render();
    return;
  }
  const ft = e.target.closest("[data-fxtab]");
  if (ft) {
    fxTab = ft.dataset.fxtab;
    render();
    return;
  }
  const pt = e.target.closest("[data-ptab]");
  if (pt) {
    pTab = pt.dataset.ptab;
    render();
    return;
  }
  const oi = e.target.closest("[data-openitem]");
  if (oi) {
    view = "item";
    current = oi.dataset.openitem;
    render();
    window.scrollTo(0, 0);
    return;
  }
  const osd = e.target.closest("[data-opensd]");
  if (osd) {
    view = "stockdoc";
    current = osd.dataset.opensd;
    render();
    window.scrollTo(0, 0);
    return;
  }
  const sld = e.target.closest("[data-sldel]");
  if (sld) {
    sDraft.lines.splice(+sld.dataset.sldel, 1);
    render();
    return;
  }
  const ocrr = e.target.closest("[data-opencrr]");
  if (ocrr) {
    view = "corrreq";
    current = ocrr.dataset.opencrr;
    render();
    window.scrollTo(0, 0);
    return;
  }
  const ocn2 = e.target.closest("[data-opencr]");
  if (ocn2) {
    view = "corr";
    current = +ocn2.dataset.opencr;
    showJson = false;
    render();
    window.scrollTo(0, 0);
    return;
  }
  const ocr = e.target.closest("[data-opencmr]");
  if (ocr) {
    view = "cmreq";
    current = ocr.dataset.opencmr;
    render();
    window.scrollTo(0, 0);
    return;
  }
  const oc = e.target.closest("[data-opencn]");
  if (oc) {
    go("credit", +oc.dataset.opencn);
    return;
  }
  const od = e.target.closest("[data-opendcr]");
  if (od) {
    view = "dcr";
    current = od.dataset.opendcr;
    const r = dcrs.find((x) => x.id === current);
    pDraft = Object.assign({}, curDesign(), {
      summary: r.desc,
      logo: r.logo || curDesign().logo,
    });
    render();
    window.scrollTo(0, 0);
    return;
  }
  const del = e.target.closest("[data-del]");
  if (del) {
    draft.items.splice(+del.dataset.del, 1);
    render();
    return;
  }
  const a = e.target.closest("[data-act]");
  if (!a) return;
  const act = a.dataset.act,
    no = +a.dataset.no;
  if (act === "add") {
    draft.items.push({
      desc: "",
      qty: 1,
      price: 0,
      tax: draft.vat ? "VATABLE" : "SSPT",
      disc: 0,
    });
    render();
  }
  if (act === "issue") issue();
  if (act === "preview") {
    const pv = document.getElementById("previewBox");
    if (pv.innerHTML) {
      pv.innerHTML = "";
      a.textContent = "Preview printed invoice";
    } else {
      pv.innerHTML = docInvoice(draft);
      renderQRs();
      a.textContent = "Hide preview";
      pv.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
  if (act === "send") transmit(no);
  if (act === "json") {
    showJson = !showJson;
    render();
  }
  if (act === "print") window.print();
  if (act === "email") {
    const v = document.getElementById("em").value.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
      toast("Enter a valid buyer email.");
      return;
    }
    deliver(no, "Email", v);
    toast("E-invoice emailed (simulated)");
  }
  if (act === "link") {
    const l = invOf(no).verifyUrl || viewLink(invOf(no).eisId);
    try {
      navigator.clipboard.writeText(l);
    } catch (err) {}
    deliver(no, "Online view link", l);
    toast("Link copied: " + l);
  }
  if (act === "qrshown") {
    deliver(no, "QR code", "Scanned by buyer");
    toast("QR delivery recorded");
  }
  if (act === "cm") goNewC(no, "", false, false);
  if (act === "reissue") goNewC(no, "Cancellation of invoice", true, true);
  if (act === "reissuenow") {
    const cn = credits.find((c) => c.no === +a.dataset.cn);
    startReissue(cn);
  }
  if (act === "addl") {
    const src = invOf(no);
    if (!newInvFor(src.branch)) return;
    Object.assign(draft, {
      customerId: src.customerId,
      salesType: src.salesType,
      refs: { addlFor: src.no },
    });
    draft.items[0].desc = "Additional billing: ";
    render();
  }
  if (act === "cmfull") {
    const inv = invOf(draftC.invNo);
    inv.items.forEach((it, k) => {
      const r =
        lineNet(it) - creditedOnLine(inv.no, k) - pendingOnLine(inv.no, k);
      if (r > 0) {
        draftC.amts[k] = r;
        if (qtyMode(draftC) && isStockLine(it))
          draftC.qtys[k] = Number(it.qty) - returnedQty(inv.no, k);
      }
    });
    render();
  }
  if (act === "issuecn") issueCredit();
  if (act === "crnew") goNewCR(no);
  if (act === "crsubmit") submitCR();
  if (act === "crapprove") {
    const r = corrReqs.find((x) => x.id === current);
    if (!me().approver || r.preparedBy.id === userId) return;
    approveCR(r, document.getElementById("crapn").value.trim());
  }
  if (act === "crreject") {
    const r = corrReqs.find((x) => x.id === current),
      n = document.getElementById("crapn").value.trim();
    if (!n) {
      toast("Enter the reason for declining.");
      return;
    }
    r.status = "REJECTED";
    r.history.push({ at: now(), by: me().name, act: "Declined: " + n });
    render();
  }
  if (act === "cremail" || act === "crack") {
    const c = corrections.find((z) => z.no === +a.dataset.cr);
    if (act === "cremail") {
      const v = document.getElementById("crem").value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
        toast("Enter a valid buyer email.");
        return;
      }
      c.deliveries.push({ via: "Email", to: v, at: now() });
    } else
      c.deliveries.push({
        via: "Printed copy signed",
        to: "Received by buyer",
        at: now(),
      });
    render();
  }
  if (act === "cnemail" || act === "cnlink" || act === "cnack") {
    const c = credits.find((z) => z.no === +a.dataset.cn);
    c.deliveries = c.deliveries || [];
    if (act === "cnemail") {
      const v = document.getElementById("cem").value.trim();
      if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v)) {
        toast("Enter a valid buyer email.");
        return;
      }
      c.deliveries.push({ via: "Email", to: v, at: now() });
      toast("Credit memo emailed (simulated)");
    }
    if (act === "cnlink") {
      const l = viewLink(c.eisId);
      try {
        navigator.clipboard.writeText(l);
      } catch (err) {}
      c.deliveries.push({ via: "Online view link", to: l, at: now() });
      toast("Link copied");
    }
    if (act === "cnack") {
      c.deliveries.push({
        via: "Printed copy signed",
        to: "Received by buyer",
        at: now(),
      });
      toast("Buyer acknowledgment recorded");
    }
    render();
  }
  if (act === "itemnew") {
    itemForm = {
      id: null,
      naac: false,
      mov: false,
      sp: false,
      sku: "",
      barcode: "",
      desc: "",
      uom: "pc",
      price: "",
      tax: "VATABLE",
      type: "GOODS",
      scCat: "NONE",
      reorder: "",
      openQty: "",
      openCost: "",
      err: "",
    };
    render();
  }
  if (act === "itemedit") {
    const i = itemById(a.dataset.id);
    itemForm = {
      category: i.category || "",
      id: i.id,
      branchPrices: { ...(i.branchPrices || {}) },
      cov: { ...(i.cov || {}) },
      naac: !!i.naac,
      mov: !!i.mov,
      sp: !!i.sp,
      sku: i.sku,
      barcode: i.barcode || "",
      desc: i.desc,
      uom: i.uom,
      price: String(i.price),
      tax: i.tax,
      type: i.type,
      scCat: i.scCat || "NONE",
      reorder: String(i.reorder),
      err: "",
    };
    pTab = "items";
    view = "products";
    render();
    window.scrollTo(0, 0);
  }
  if (act === "itemsave") saveItem();
  if (act === "itemcancel") {
    itemForm = null;
    render();
  }
  if (act === "sdnew") goNewSD(a.dataset.type);
  if (act === "trrecv") {
    const d = stockDocs.find((x) => x.id === current);
    if (!canBranch(d.toBranch) || d.preparedBy.id === userId) {
      deny("ops");
      return;
    }
    d.lines.forEach((l, k) => {
      const el = document.querySelector(`[data-rq="${k}"]`);
      l.recvQty = Math.max(0, Math.min(l.qty, Number(el ? el.value : l.qty)));
    });
    const n = document.getElementById("rqn").value.trim(),
      short = d.lines.filter((l) => l.recvQty < l.qty);
    d.status = "RECEIVED";
    d.receivedAt = now();
    d.receivedBy = me().name;
    d.history.push({
      at: now(),
      by: me().name,
      act: `Received at ${brLabel(d.toBranch)}${short.length ? `, short on ${short.length} line(s)` : " in full"}${n ? `. ${n}` : ""}`,
    });
    slog("Transfer received", `${d.id}${short.length ? " (short)" : ""}`);
    toast(`${d.id} received`);
    render();
  }
  if (act === "sdadd") {
    sDraft.lines.push({ skuText: "", itemId: null, qty: 1, unitCost: 0 });
    render();
  }
  if (act === "sdsave") saveSD();
  if (act === "sdapprove") {
    const d = stockDocs.find((x) => x.id === current);
    if (!me().approver || d.preparedBy.id === userId) return;
    {
      const val = d.lines.reduce(
        (a, l) => a + Math.round(l.qty * avgCost(l.itemId, d.branch)),
        0,
      );
      if (val > me().limit) {
        slog(
          "Access denied",
          `Adjustment ${d.id} of ${peso(val)} exceeds approval limit`,
        );
        toast(
          `${peso(val)} at cost is above your approval limit of ${peso(me().limit)}.`,
        );
        return;
      }
      slog("Approved stock adjustment", `${d.id}, ${peso(val)} at cost`);
    }
    if (d.dir === "OUT") {
      const need = {};
      d.lines.forEach((l) => (need[l.itemId] = (need[l.itemId] || 0) + l.qty));
      if (Object.entries(need).some(([id, q]) => q > onHand(id, d.branch))) {
        toast(
          "Stock on hand is now lower than this decrease. Decline and prepare a new one.",
        );
        return;
      }
    }
    const n = document.getElementById("sdapn").value.trim();
    d.status = "POSTED";
    d.postedAt = now();
    d.approvedBy = who(me());
    d.history.push({
      at: now(),
      by: me().name,
      act: "Approved and posted" + (n ? `. ${n}` : ""),
    });
    toast(`${d.id} approved and posted`);
    render();
  }
  if (act === "sdreject") {
    const d = stockDocs.find((x) => x.id === current),
      n = document.getElementById("sdapn").value.trim();
    if (!n) {
      toast("Enter the reason for declining.");
      return;
    }
    d.status = "REJECTED";
    d.history.push({ at: now(), by: me().name, act: "Declined: " + n });
    render();
  }
  if (act === "cmapprove") {
    const r = cmReqs.find((x) => x.id === current);
    if (!me().approver || r.preparedBy.id === userId) return;
    approveReq(r, document.getElementById("apn").value.trim());
  }
  if (act === "cmreject") {
    const r = cmReqs.find((x) => x.id === current),
      n = document.getElementById("apn").value.trim();
    if (!n) {
      toast("Enter the reason for declining.");
      return;
    }
    r.status = "REJECTED";
    r.history.push({ at: now(), by: me().name, act: "Declined: " + n });
    toast(`${r.id} declined`);
    render();
  }
  if (act === "newreceipt") goNewR({});
  if (act === "agcsv") {
    const data = agingData(agingAsOf),
      rows = [
        [
          "Client",
          "Invoice No.",
          "Invoice date",
          "Terms",
          "Due date",
          "Days past due",
          "Balance (PHP)",
          "Bucket",
        ],
      ];
    data.forEach((r) =>
      r.invs.forEach((x) =>
        rows.push([
          r.name,
          x.i.no,
          x.i.txnDate,
          TERMS[x.i.terms || "NET30"][0],
          x.due,
          Math.max(0, x.od),
          (x.P / 100).toFixed(2),
          AGE_B.find((b) => b[0] === x.k)[1],
        ]),
      ),
    );
    saveFile(
      `talaan-receivables-aging-${agingAsOf}.csv`,
      rows.map((r) => r.map(csvCell).join(",")).join("\r\n") + "\r\n",
    );
  }
  if (act === "supsend") {
    const t = supportThreads.find((x) => x.id === a.dataset.id),
      txt = (supReply[t.id] || "").trim();
    if (!txt) return;
    t.msgs.push({
      from: "AAA IT Support (" + PROVIDER.name + ")",
      staff: true,
      text: txt,
      at: now(),
    });
    t.status = "ANSWERED";
    supReply[t.id] = "";
    render();
  }
  if (act === "impstart") {
    impOpen = true;
    impState = null;
    render();
  }
  if (act === "impcancel") {
    impOpen = false;
    impState = null;
    render();
  }
  if (act === "impdo") doImport();
  if (act === "imptemplate") {
    saveFile(
      "talaan-items-template.csv",
      IMP_COLS.join(",") +
        "\r\nSEM-VAT,,VAT compliance seminar (per participant),Seminars,participant,3500,VATable,Service,,,\r\nWB-EST,4806543210040,Estate tax workbook (printed),Publications,copy,900,Exempt,Goods,40,100,300\r\n",
    );
  }
  if (act === "psok" || act === "psno") {
    const x = portalSubs.find((y) => y.id === a.dataset.id);
    if (act === "psno") {
      x.status = "REJECTED";
      slog("Portal submission rejected", x.id);
    } else {
      if (x.tin && CUSTOMERS.some((c) => c.tin === x.tin)) {
        toast(
          "A customer with this TIN already exists. Update that record instead.",
        );
        return;
      }
      const c = {
        id: "c" + (CUSTOMERS.length + 1) + rand(3),
        name: x.name.trim().toUpperCase(),
        tin: x.vatStatus === "FOREIGN" ? "" : x.tin.trim(),
        address: x.address.trim(),
        email: x.email.trim(),
        vatStatus: x.vatStatus === "NONVAT" ? "NONVAT" : x.vatStatus,
        country: x.country || "",
        wht: Number(x.wht || 0),
        whtNote: Number(x.wht) ? "stated by the client in the portal" : "",
        autoEmail: true,
        contact: x.contact,
        phone: x.phone,
        cor: x.file,
      };
      CUSTOMERS.push(c);
      x.status = "APPROVED";
      x.customerId = c.id;
      slog("Portal submission approved", `${x.id} as customer ${c.name}`);
      toast(`${c.name} added to customers`);
    }
    render();
  }
  if (act === "ppage" || act === "cpage") {
    if (act === "ppage") pPage = +a.dataset.p;
    else cPage = +a.dataset.p;
    render();
  }
  if (act === "kdone") {
    const r = kRequests.find((x) => x.id === a.dataset.id);
    r.status = "DONE";
    r.handledBy = me().name;
    slog("Counter request handled", r.id);
    render();
  }
  if (act === "promonew") {
    promoForm = {
      name: "",
      pct: "",
      from: todayISO(),
      to: todayISO(now() + 7 * DAY),
      skus: [],
      branch: "ALL",
      err: "",
    };
    render();
  }
  if (act === "promocancel") {
    promoForm = null;
    render();
  }
  if (act === "promosave") {
    const f = promoForm,
      pct = Number(f.pct);
    if (
      !f.name.trim() ||
      !(pct > 0 && pct < 100) ||
      !f.skus.length ||
      !f.from ||
      !f.to ||
      f.to < f.from
    ) {
      f.err =
        "Enter a name, a rate between 0 and 100, the dates and at least one item.";
      return render();
    }
    STORE_PROMOS.push({
      id: "P" + (STORE_PROMOS.length + 1),
      name: f.name.trim(),
      pct,
      from: f.from,
      to: f.to,
      skus: f.skus,
      branch: f.branch,
      by: me().name,
      active: true,
    });
    slog("Store promotion added", `${f.name} ${pct}% ${f.from} to ${f.to}`);
    promoForm = null;
    toast("Promotion saved");
    render();
  }
  if (act === "promooff") {
    const p = STORE_PROMOS.find((x) => x.id === a.dataset.id);
    p.active = false;
    slog("Store promotion ended", p.name);
    render();
  }
  if (act === "brnew") {
    brForm = {
      code: "",
      name: "",
      address: "",
      rdo: "",
      ptiNotice: todayISO(),
      start: "5200001",
      size: "500",
      err: "",
    };
    render();
  }
  if (act === "brsave") saveBranch();
  if (act === "brcancel") {
    brForm = null;
    render();
  }
  if (act === "fxnew") {
    fxForm = { cur: "USD", date: todayISO(), rate: "", err: "" };
    render();
  }
  if (act === "fxcancel") {
    fxForm = null;
    render();
  }
  if (act === "fxsave") {
    const f = fxForm,
      r = Number(f.rate);
    if (!(r > 0) || !f.date) {
      f.err = "Enter the date and a rate above zero.";
      return render();
    }
    if (fxRates.some((x) => x.cur === f.cur && x.date === f.date)) {
      f.err = "A rate for that currency and date is already on file.";
      return render();
    }
    fxRates.push({
      cur: f.cur,
      date: f.date,
      rate: r,
      source: CURRENCIES[f.cur].src,
      by: me().name,
    });
    slog(
      "Exchange rate entered",
      `${f.cur} ${r} for ${f.date} (${CURRENCIES[f.cur].src})`,
    );
    fxForm = null;
    toast("Rate saved");
    render();
  }
  if (act === "axcsv" || act === "axjson") {
    if (!(can("master") || can("settings") || can("security.view"))) {
      deny("master");
      return;
    }
    acctExport(act === "axcsv" ? "csv" : "json");
  }
  if (act === "acctreset") {
    ACCT = JSON.parse(JSON.stringify(ACCT_DEFAULT));
    BRS.forEach((b) => delete b.loc);
    slog("Account mapping reset", "Default codes restored");
    render();
  }
  if (act === "usernew") {
    userForm = {
      id: null,
      name: "",
      position: "",
      username: "",
      roleCode: "CLERK",
      branch: "00000",
      limit: "",
      discCap: "10",
      mfa: false,
      err: "",
    };
    render();
  }
  if (act === "useredit") {
    const u = USERS.find((x) => x.id === a.dataset.uid);
    userForm = {
      id: u.id,
      name: u.name,
      position: u.position,
      username: u.username,
      roleCode: u.roleCode,
      branch: u.branch,
      limit: String(u.limit / 100),
      discCap: String(u.discCap),
      mfa: u.mfa,
      err: "",
    };
    render();
    window.scrollTo(0, 0);
  }
  if (act === "usersave") saveUser();
  if (act === "usercancel") {
    userForm = null;
    render();
  }
  if (act === "usertoggle") {
    const u = USERS.find((x) => x.id === a.dataset.uid);
    u.active = !u.active;
    slog(u.active ? "User reactivated" : "User deactivated", u.name);
    render();
  }
  if (act === "userreset") {
    const u = USERS.find((x) => x.id === a.dataset.uid);
    u.mustChange = true;
    u.failed = 0;
    u.lockUntil = 0;
    slog("Password reset", `${u.name} must set a new password at next sign-in`);
    toast(`Temporary password for ${u.name}: Temp#1234`);
    render();
  }
  if (act === "userunlock") {
    const u = USERS.find((x) => x.id === a.dataset.uid);
    u.lockUntil = 0;
    u.failed = 0;
    slog("Account unlocked", u.name);
    render();
  }
  if (act === "review") {
    slog(
      "Access review completed",
      `${USERS.filter((u) => u.active).length} active users reviewed`,
    );
    toast("Access review recorded");
    render();
  }
  if (act === "vtamper") {
    openVerify(vState.kind, vState.no, !vState.tamper);
  }
  if (act === "vexam") {
    vState.examiner = true;
    const d = docByKind(vState.kind, vState.no);
    d.accessLog = d.accessLog || [];
    d.accessLog.push({
      at: now(),
      who: "BIR examiner (demo), authorized view",
    });
    render();
  }
  if (act === "vpaste") verifyPasted();
  if (act === "demononvat") {
    S.vat = false;
    render();
    toast("Demo company switched to non-VAT");
  }
  if (act === "tadd") {
    const v = cents(tDraft.amt);
    if (!(v > 0)) {
      tDraft.err = "Enter the amount.";
      return render();
    }
    if (v >= TALLY_LIMIT) {
      tDraft.err = `A sale of ₱500 or more needs its own invoice. <button class="btn link" data-act="tinv">Issue the invoice</button>`;
      return render();
    }
    tally.push({
      branch: wb() || "00000",
      id: "t" + Date.now() + rand(3),
      day: todayISO(),
      at: now(),
      desc: tDraft.desc.trim() || "Walk-in sale",
      amount: v,
      tax: tDraft.tax,
      invNo: null,
    });
    const tot = sum(uncovered(todayISO()));
    tDraft = { desc: "", amt: "", tax: tDraft.tax, err: "" };
    render();
    toast(
      tot >= TALLY_LIMIT
        ? "Today's small sales reached ₱500. Issue the aggregate invoice."
        : "Small sale recorded",
    );
  }
  if (act === "tinv") {
    const v = cents(tDraft.amt),
      desc = tDraft.desc,
      tax = tDraft.tax;
    tDraft = { desc: "", amt: "", tax, err: "" };
    go("new");
    draft.salesType = "CASH";
    draft.items = [{ desc: desc || "", qty: 1, price: v / 100, tax, disc: 0 }];
    render();
  }
  if (act === "agginv") startAggregate(todayISO());
  if (act === "closeday") {
    const day = todayISO(),
      un = uncovered(day),
      tot = sum(un);
    if (tot >= TALLY_LIMIT) {
      toast("Issue the aggregate invoice before closing the day.");
      return;
    }
    const all = tallyToday();
    if (!all.length) {
      toast("No small sales to close today.");
      return;
    }
    const invNos = [...new Set(all.filter((t) => t.invNo).map((t) => t.invNo))];
    closedDays = closedDays.filter(
      (c) => !(c.day === day && c.branch === wb()),
    );
    closedDays.push({
      branch: wb(),
      day,
      count: all.length,
      total: sum(all),
      invNos,
    });
    toast(
      invNos.length
        ? "Day closed."
        : "Day closed. Total stayed below ₱500, so no invoice was required.",
    );
    render();
  }
  if (act === "totally") {
    const t = calc(draft).totalSales,
      tax = draft.items.some((i) => i.tax === "SSPT") ? "SSPT" : "EXEMPT",
      desc = draft.items[0].desc || "Walk-in sale";
    tally.push({
      branch: wb() || "00000",
      id: "t" + Date.now() + rand(3),
      day: todayISO(),
      at: now(),
      desc,
      amount: t,
      tax,
      invNo: null,
    });
    draft = null;
    go("tally");
    toast("Recorded in today's small sales tally");
  }
  if (act === "pickadd") {
    const ctx = a.dataset.ctx,
      q = picker.q.trim(),
      isTin = digits(q).length >= 9 && !/[a-z]/i.test(q);
    picker = {
      ...picker,
      ctx,
      adding: true,
      open: false,
      editId: null,
      err: "",
      nc: {
        name: isTin ? "" : q,
        tin: isTin ? q : "",
        address: "",
        email: "",
        vatStatus: isTin ? "VAT" : "VAT",
      },
    };
    render();
  }
  if (act === "pickchange") {
    const ctx = a.dataset.ctx;
    if (ctx === "inv") draft.customerId = "";
    else draftR.customerId = "";
    resetPicker();
    picker.ctx = ctx;
    picker.open = true;
    render();
    const i = document.getElementById("pk-" + ctx);
    if (i) i.focus();
  }
  if (act === "ncedit") {
    const c = cust(a.dataset.id);
    picker = {
      ctx: a.dataset.ctx,
      q: "",
      open: false,
      hi: 0,
      adding: true,
      editId: c.id,
      err: "",
      nc: {
        terms: c.terms || "NET30",
        wht: c.wht || 0,
        whtNote: c.whtNote || "",
        autoEmail: c.autoEmail !== false,
        name: c.name,
        tin: c.tin,
        address: c.address,
        email: c.email || "",
        vatStatus: c.vatStatus,
        country: c.country || "",
        foreignTaxId: c.foreignTaxId || "",
      },
    };
    render();
  }
  if (act === "ncnew") {
    picker = {
      ctx: "master",
      q: "",
      open: false,
      hi: 0,
      adding: true,
      editId: null,
      err: "",
      nc: { name: "", tin: "", address: "", email: "", vatStatus: "VAT" },
    };
    render();
  }
  if (act === "ncsave") saveNc(a.dataset.ctx);
  if (act === "nccancel") {
    resetPicker();
    render();
    if (view === "new") refreshEditor();
  }
  if (act === "newdcr") {
    dcrDraft = { areas: [], desc: "", contact: "", logo: null };
    view = "newDcr";
    render();
  }
  if (act === "submitdcr") {
    const id = "DCR-" + String(dcrs.length + 1).padStart(4, "0");
    dcrs.push({
      id,
      at: now(),
      areas: dcrDraft.areas,
      desc: dcrDraft.desc.trim(),
      contact: dcrDraft.contact.trim(),
      logo: dcrDraft.logo,
      status: "Submitted",
      history: [{ at: now(), status: "Submitted", by: "Client", note: "" }],
      birRef: null,
      version: null,
    });
    dcrDraft = null;
    toast(`Request ${id} sent to your EIS provider`);
    go("design");
  }
  if (act === "pin") {
    if (document.getElementById("pin").value === PROVIDER.pin) {
      providerOn = true;
      render();
    } else document.getElementById("pinErr").textContent = "Incorrect PIN.";
  }
  if (act === "pout") {
    providerOn = false;
    go("provider");
  }
  if (act === "rulenew") {
    ruleForm = {
      label: "",
      code: "",
      law: "",
      effective: todayISO(),
      expiry: "",
      rate: "",
      vatExempt: false,
      idLabel: "",
      extraLabel: "",
      confirmText: "",
      capWeek: "",
      capTxn: "",
      group: false,
      err: "",
    };
    render();
  }
  if (act === "rulecancel") {
    ruleForm = null;
    render();
  }
  if (act === "rulesave") saveRule();
  if (act === "ruleoff") {
    const r = customRules.find((x) => x.code === a.dataset.code);
    r.active = false;
    designAudit.push({
      at: now(),
      by: PROVIDER.name,
      action: `Deactivated statutory discount rule ${r.code}`,
    });
    toast(`Rule ${r.code} deactivated`);
    render();
  }
  if (act === "dcrreview") {
    const r = dcrs.find((x) => x.id === current);
    dcrStep(r, "Under review", "Review started");
    designAudit.push({
      at: now(),
      by: PROVIDER.name,
      action: `Started review of ${r.id}`,
    });
    render();
  }
  if (act === "dcrreject") {
    const r = dcrs.find((x) => x.id === current),
      why =
        document.getElementById("rj").value.trim() || "Declined by provider";
    dcrStep(r, "Rejected", why);
    designAudit.push({
      at: now(),
      by: PROVIDER.name,
      action: `Declined ${r.id}: ${why}`,
    });
    render();
  }
  if (act === "dcrbir") {
    const r = dcrs.find((x) => x.id === current),
      no = document.getElementById("bn").value.trim(),
      dt = document.getElementById("bd").value;
    if (!no || !dt) {
      document.getElementById("birErr").textContent =
        "Enter the reference no. and date.";
      return;
    }
    r.birRef = { type: document.getElementById("bt").value, no, date: dt };
    dcrStep(r, "BIR update recorded", `${r.birRef.type} ${no}`);
    designAudit.push({
      at: now(),
      by: PROVIDER.name,
      action: `Recorded BIR update for ${r.id}: ${r.birRef.type} ${no}`,
    });
    render();
  }
  if (act === "plogoclear") {
    pDraft.logo = null;
    render();
  }
  if (act === "activate") {
    const r = dcrs.find((x) => x.id === current),
      v = curDesign().v + 1;
    designs.push({
      v,
      logo: pDraft.logo,
      primary: pDraft.primary,
      accent: pDraft.accent,
      font: pDraft.font,
      fs: +pDraft.fs,
      tr: +pDraft.tr,
      effective: now(),
      birRef: r.birRef,
      dcr: r.id,
      summary: pDraft.summary || r.desc,
      by: PROVIDER.name,
    });
    r.version = v;
    dcrStep(r, "Applied", `Activated as design version ${v}`);
    designAudit.push({
      at: now(),
      by: PROVIDER.name,
      action: `Activated design version ${v} for ${r.id}`,
    });
    toast(`Design version ${v} is live for new documents`);
    render();
  }
  if (act === "payinv") {
    const inv = invOf(no);
    goNewR({
      cur: curOf(inv),
      branch: inv.branch,
      customerId: inv.customerId,
      sel: { [inv.no]: balanceOf(inv) },
    });
  }
  if (act === "issuer") issueReceipt();
  if (act === "invfromadv") {
    const r = receipts.find((x) => x.no === no);
    if (!newInvFor(r.branch)) return;
    draft.customerId = r.customerId;
    draft.nature = "SERVICES";
    draft.items[0].desc = r.purpose;
    draft.adv = { [r.no]: unappliedOf(r) };
    render();
    toast("Enter the items and prices. The advance is already applied.");
  }
  if (act === "sendall") {
    const list = invoices
      .filter((i) => i.status === "pending")
      .map((i) => i.no);
    toast(`Transmitting ${list.length} invoice(s)…`);
    const next = () => {
      const n = list.shift();
      if (n) transmit(n, next);
    };
    next();
  }
});
document.addEventListener("keydown", (e) => {
  lastActivity = Date.now();
  if (e.key === "Enter" && e.target.dataset && e.target.dataset.helpq) {
    e.preventDefault();
    helpAsk();
    return;
  }
  if (uiMode === "counter" && me()) {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      kIssue();
      return;
    }
    if (e.key === "Escape") {
      if (kModal) {
        kModal = null;
        render();
        return;
      }
      if (kSugg.kind) {
        kSugg = { row: -1, list: [], hi: 0, kind: null };
        kRefresh();
      }
      return;
    }
    const el = e.target;
    if (el.closest && el.closest("tr[data-kopen]") && e.key === "Enter") {
      el.click();
      return;
    }
    if (
      kSugg.kind &&
      kSugg.list.length &&
      (e.key === "ArrowDown" || e.key === "ArrowUp")
    ) {
      e.preventDefault();
      kSugg.hi =
        (kSugg.hi + (e.key === "ArrowDown" ? 1 : -1) + kSugg.list.length) %
        kSugg.list.length;
      kRefresh();
      return;
    }
    if (e.key === "Enter" && draft && !kIssued) {
      if (kSugg.kind && kSugg.list.length) {
        e.preventDefault();
        const x = kSugg.list[kSugg.hi];
        if (kSugg.kind === "item") kPickItem(kSugg.row, x);
        else kPickBuyer(x);
        return;
      }
      if (el.dataset.kk === "qty") {
        e.preventDefault();
        const k = +el.dataset.kline;
        if (k + 1 >= kRows.length) kRows.push(kBlank());
        kRefresh();
        const n = document.querySelector(
          `[data-kline="${k + 1}"][data-kk="q"]`,
        );
        if (n) n.focus();
        return;
      }
      if (el.dataset.kb) {
        e.preventDefault();
        const order = ["name", "tin", "country", "address"].filter((k) =>
            document.querySelector(`[data-kb="${k}"]`),
          ),
          i = order.indexOf(el.dataset.kb);
        const n =
          i < order.length - 1
            ? document.querySelector(`[data-kb="${order[i + 1]}"]`)
            : document.querySelector('[data-kline="0"][data-kk="q"]');
        if (n) n.focus();
        return;
      }
    }
    if (!me() || e.key !== "Enter") return;
    return;
  }
  if (!me() && e.key === "Enter") {
    const t = e.target.closest("[data-auth]");
    if (t) {
      e.preventDefault();
      document
        .querySelector(
          auth.step === "mfa"
            ? '[data-act="mfaok"]'
            : auth.step === "change"
              ? '[data-act="pwchange"]'
              : '[data-act="signin"]',
        )
        .click();
    }
    return;
  }
  const pi = e.target.closest && e.target.closest("[data-pick]");
  if (pi) {
    const ctx = pi.dataset.pick,
      n = searchCustomers(picker.q).length + 1;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      picker.ctx = ctx;
      picker.open = true;
      picker.hi = (picker.hi + 1) % n;
      refreshSugg(ctx);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      picker.open = true;
      picker.hi = (picker.hi - 1 + n) % n;
      refreshSugg(ctx);
    } else if (e.key === "Escape") {
      picker.open = false;
      refreshSugg(ctx);
    } else if (e.key === "Enter" && picker.open) {
      e.preventDefault();
      const list = searchCustomers(picker.q);
      if (picker.hi < list.length) setBuyer(ctx, list[picker.hi].id);
      else
        document
          .querySelector(`[data-act="pickadd"][data-ctx="${ctx}"]`)
          .click();
    }
    return;
  }
  if (e.key !== "Enter") return;
  const t = e.target.closest("tr");
  if (!t) return;
  if (t.dataset.openitem) {
    view = "item";
    current = t.dataset.openitem;
    render();
    return;
  }
  if (t.dataset.opensd) {
    view = "stockdoc";
    current = t.dataset.opensd;
    render();
    return;
  }
  if (t.dataset.opencrr) {
    view = "corrreq";
    current = t.dataset.opencrr;
    render();
    return;
  }
  if (t.dataset.opencr) {
    view = "corr";
    current = +t.dataset.opencr;
    render();
    return;
  }
  if (t.dataset.opencmr) {
    view = "cmreq";
    current = t.dataset.opencmr;
    render();
    return;
  }
  if (t.dataset.open) go("detail", +t.dataset.open);
  else if (t.dataset.openr) go("receipt", +t.dataset.openr);
  else if (t.dataset.opencn) go("credit", +t.dataset.opencn);
});
document.addEventListener("focusin", (e) => {
  const pi = e.target.closest && e.target.closest("[data-pick]");
  if (pi) {
    picker.ctx = pi.dataset.pick;
    picker.open = true;
    refreshSugg(pi.dataset.pick);
  }
});
document.addEventListener("input", (e) => {
  const el = e.target;
  lastActivity = Date.now();
  if (el.dataset.helpq) {
    helpQ = el.value;
    return;
  }
  if (el.dataset.helpmsg) {
    helpMsg = el.value;
    return;
  }
  if (el.dataset.supreply) {
    supReply[el.dataset.supreply] = el.value;
    return;
  }
  if (el.dataset.kh && kModal === "today") {
    kHist[el.dataset.kh] = el.value;
    const pos = el.selectionStart,
      k = el.dataset.kh;
    render();
    const n = document.querySelector(`[data-kh="${k}"]`);
    if (n) {
      n.focus();
      try {
        n.setSelectionRange(pos, pos);
      } catch (e) {}
    }
    return;
  }
  if (uiMode === "counter" && me() && draft && !kIssued) {
    if (el.dataset.kline != null) {
      const k = +el.dataset.kline,
        r = kRows[k];
      if (el.dataset.kk === "q") {
        r.q = el.value;
        if (r.sku && el.value !== r.desc) {
          Object.assign(r, kBlank(), { q: el.value });
        }
        const ex = ITEMS.find(
          (i) => i.barcode && i.barcode === el.value.trim(),
        );
        if (ex) {
          kPickItem(k, ex);
          return;
        }
        kSugg = { row: k, list: kFindItems(el.value), hi: 0, kind: "item" };
        kRefresh();
        return;
      }
      if (el.dataset.kk === "qty") {
        r.qty = el.value.replace(/[^0-9.]/g, "");
        kRefresh();
        return;
      }
    }
    if (el.dataset.kb) {
      const f = el.dataset.kb;
      kBuyer[f] = el.value;
      if (f === "name") {
        if (kBuyer.vatStatus !== "FOREIGN")
          kBuyer.vatStatus = kBuyer.tin ? "VAT" : "INDIVIDUAL";
        kSugg = {
          row: -1,
          list: searchCustomers(el.value).filter((c) => c.id !== "ktemp"),
          hi: 0,
          kind: "buyer",
        };
      }
      if (f === "tin" && kBuyer.vatStatus !== "FOREIGN")
        kBuyer.vatStatus = el.value ? "VAT" : "INDIVIDUAL";
      kRefresh();
      return;
    }
    if (el.dataset.kst && el.tagName === "INPUT") {
      draft[el.dataset.kst] = el.value;
      kRefresh();
      return;
    }
    if (el.dataset.kgrp) {
      draft.group = draft.group || { diners: 0, sc: 0 };
      draft.group[el.dataset.kgrp] = Number(el.value || 0);
      kRefresh();
      return;
    }
    if (el.dataset.ktender) {
      kTender = el.value.replace(/[^0-9.]/g, "");
      kRefresh();
      return;
    }
    if (el.dataset.kterm) {
      if (me().roleCode === "CASHIER") return;
      const k = el.dataset.kterm;
      if (k === "terms") {
        draft.terms = el.value;
        draft.termsSet = true;
        if (el.value === "CUSTOM" && !draft.dueDate)
          draft.dueDate = addDaysISO(draft.txnDate, 30);
      } else
        draft.dueDate = el.value < draft.txnDate ? draft.txnDate : el.value;
      kRefresh();
      return;
    }
    if (el.dataset.kwht) {
      const v = el.value;
      if (v === "AUTO") {
        draft.whtManual = false;
        draft.whtMode = "RATE";
        draft.whtReason = "";
        const cu = cust(draft.customerId) || {};
        draft.wht = cu.wht || 0;
      } else {
        draft.whtManual = true;
        if (v === "custom") {
          draft.whtMode = "PCT";
          draft.wht = Number(draft.whtPct || 0) / 100;
        } else if (v === "amount") {
          draft.whtMode = "AMT";
        } else {
          draft.whtMode = "RATE";
          draft.wht = Number(v);
        }
      }
      kRefresh();
      return;
    }
    if (el.dataset.kwhtp) {
      draft.whtPct = el.value;
      draft.wht = Math.max(0, Math.min(100, Number(el.value || 0))) / 100;
      kRefresh();
      return;
    }
    if (el.dataset.kwhta) {
      draft.whtAmt = el.value;
      kRefresh();
      return;
    }
    if (el.dataset.kwhtr) {
      draft.whtReason = el.value;
      return;
    }
    if (el.dataset.krcf && kRc) {
      const k = el.dataset.krcf;
      kRc[k] = el.value;
      if (k === "tax") {
        kRc.reason = (RECLASS[el.value] || [""])[0];
        kRefresh();
      }
      return;
    }
    if (el.dataset.kforsc != null) {
      const r = kRows[+el.dataset.kforsc];
      r.scCat = el.checked ? "Q20" : "NONE";
      kRefresh();
      return;
    }
    if (el.dataset.kpay) {
      draft.pay = draft.pay || { method: "CASH" };
      draft.pay[el.dataset.kpay] = el.value;
      kRefresh();
      return;
    }
    if (el.dataset.klate) {
      draft.refs = draft.refs || {};
      draft.refs.lateReason = el.value;
      kRefresh();
      return;
    }
    return;
  }
  if (el.dataset.vbr) {
    viewBr = el.value;
    slog("Branch switched", brLabel(viewBr));
    if (
      ["new", "newReceipt", "newStock", "newCorr", "newCredit"].includes(view)
    ) {
      view = "list";
      current = null;
    }
    render();
    return;
  }
  if (!me() && el.dataset.pf && portalForm) {
    const k = el.dataset.pf;
    portalForm[k] = el.type === "checkbox" ? el.checked : el.value;
    if (k === "vatStatus") render();
    return;
  }
  if (el.dataset.auth) {
    const k = el.dataset.auth;
    if (k === "code") auth.codeIn = el.value;
    else auth[k] = el.value;
    return;
  }
  if (el.dataset.fx && fxForm) {
    fxForm[el.dataset.fx] = el.value;
    if (el.dataset.fx === "cur") render();
    return;
  }
  if (el.dataset.pm && promoForm) {
    promoForm[el.dataset.pm] = el.value;
    return;
  }
  if (el.dataset.pmsku && promoForm) {
    const k = el.dataset.pmsku;
    promoForm.skus = el.checked
      ? [...promoForm.skus, k]
      : promoForm.skus.filter((x) => x !== k);
    return;
  }
  if (el.dataset.axc && acctF) {
    acctF.cogs = el.checked;
    render();
    return;
  }
  if (el.dataset.ax && acctF) {
    const k = el.dataset.ax;
    acctF[k] = el.value;
    if (k === "from" && acctF.to < acctF.from) acctF.to = acctF.from;
    if (k === "to" && acctF.to < acctF.from) acctF.from = acctF.to;
    render();
    return;
  }
  if (el.dataset.amc || el.dataset.amn || el.dataset.aml) {
    if (!(can("master") || can("settings"))) {
      deny("master");
      render();
      return;
    }
    if (el.dataset.amc) ACCT[el.dataset.amc][0] = el.value.trim();
    if (el.dataset.amn) ACCT[el.dataset.amn][1] = el.value;
    if (el.dataset.aml) brOf(el.dataset.aml).loc = el.value.trim();
    return;
  }
  if (el.dataset.bf && brForm) {
    brForm[el.dataset.bf] = el.value;
    return;
  }
  if (el.dataset.uf && userForm) {
    const k = el.dataset.uf;
    userForm[k] = k === "mfa" ? el.checked : el.value;
    if (k === "roleCode") render();
    return;
  }
  if (el.dataset.s && !can("settings")) {
    deny("settings");
    render();
    return;
  }
  if (el.dataset.pq) {
    pQ = el.value;
    pPage = 1;
    const pos = el.selectionStart;
    render();
    const n = document.querySelector("[data-pq]");
    if (n) {
      n.focus();
      try {
        n.setSelectionRange(pos, pos);
      } catch (e) {}
    }
    return;
  }
  if (el.dataset.agd) {
    agingAsOf = el.value || todayISO();
    render();
    return;
  }
  if (el.dataset.stsim) {
    const pct = +el.value;
    storageSim = 0;
    if (pct) {
      const u = storageUse();
      storageSim = Math.max(0, Math.round((u.quota * pct) / 100) - u.used);
    }
    storageCheck();
    render();
    return;
  }
  if (el.dataset.pcat) {
    pCat = el.value;
    pPage = 1;
    render();
    return;
  }
  if (el.dataset.pkind) {
    pKind = el.value;
    pPage = 1;
    render();
    return;
  }
  if (el.dataset.ifcc && itemForm) {
    itemForm.cov = itemForm.cov || {};
    itemForm.cov[el.dataset.ifcc] = el.checked;
    return;
  }
  if (el.dataset.ifbp && itemForm) {
    itemForm.branchPrices = itemForm.branchPrices || {};
    itemForm.branchPrices[el.dataset.ifbp] = el.value;
    return;
  }
  if (el.dataset.ifc && itemForm) {
    itemForm[el.dataset.ifc] = el.checked;
    return;
  }
  if (el.dataset.if && itemForm) {
    itemForm[el.dataset.if] = el.value;
    if (el.dataset.if === "type") render();
    return;
  }
  if (view === "newStock" && sDraft) {
    if (el.dataset.sd) {
      sDraft[el.dataset.sd] = el.value;
      if (el.dataset.sd === "dir") render();
      else refreshSD();
      return;
    }
    if (el.dataset.sl != null) {
      const l = sDraft.lines[+el.dataset.sl],
        k = el.dataset.slk;
      if (k === "sku") {
        l.skuText = el.value;
        const it = findItemByLabel(el.value);
        l.itemId = it && it.type === "GOODS" ? it.id : null;
        if (it) {
          l.skuText = skuLabel(it);
          render();
          return;
        }
        refreshSD();
        return;
      }
      l[k] = k === "unitCost" ? cents(el.value) : Number(el.value || 0);
      refreshSD();
      return;
    }
    return;
  }
  if (el.dataset.pick) {
    picker.ctx = el.dataset.pick;
    picker.q = el.value;
    picker.hi = 0;
    picker.open = true;
    refreshSugg(el.dataset.pick);
    return;
  }
  if (el.dataset.ncb) {
    picker.nc[el.dataset.ncb] = el.checked;
    return;
  }
  if (el.dataset.pay && draft) {
    draft.pay = draft.pay || { method: "CASH" };
    draft.pay[el.dataset.pay] = el.value;
    if (el.dataset.pay === "method") {
      render();
      return;
    }
    refreshEditor();
    return;
  }
  if (el.dataset.nc) {
    picker.nc[el.dataset.nc] = el.value;
    if (el.dataset.nc === "vatStatus" || el.dataset.nc === "wht") {
      render();
      return;
    }
    if (el.dataset.nc === "name") picker.confirmDup = false;
    return;
  }
  if (el.dataset.custq) {
    custQ = el.value;
    cPage = 1;
    const pos = el.selectionStart;
    render();
    const n = document.querySelector("[data-custq]");
    if (n) {
      n.focus();
      try {
        n.setSelectionRange(pos, pos);
      } catch (e) {}
    }
    return;
  }
  if (el.dataset.s) {
    const k = el.dataset.s;
    slog(
      "Setting changed",
      `${k} → ${el.type === "checkbox" ? el.checked : el.value}`,
    );
    if (k === "vat") {
      S.vat = el.value === "1";
      render();
      return;
    }
    if (k === "autoEmail") {
      S.autoEmail = el.checked;
      render();
      toast(el.checked ? "Automatic email on" : "Automatic email off");
      return;
    }
    if (k === "eisCert" || k === "reporting") {
      S[k] = el.checked;
      render();
      toast(
        k === "reporting"
          ? el.checked
            ? "Sales reporting enabled"
            : "Sales reporting set to not yet required"
          : "Saved",
      );
      return;
    }
    S[k] = [
      "invFrom",
      "invTo",
      "prFrom",
      "prTo",
      "cnFrom",
      "cnTo",
      "crFrom",
      "crTo",
    ].includes(k)
      ? Number(el.value)
      : el.value;
    document.getElementById("coBox").innerHTML =
      `${esc(S.name)}<br>${S.vat ? "VAT" : "Non-VAT"} reg. TIN ${esc(S.tin)}`;
    return;
  }
  if (el.dataset.rf) {
    rFilter = el.dataset.rf;
    render();
    return;
  }
  if (el.dataset.rf2 && ruleForm) {
    const k = el.dataset.rf2;
    ruleForm[k] =
      k === "vatExempt"
        ? el.value === "1"
        : k === "group"
          ? el.checked
          : el.value;
    return;
  }
  if (el.dataset.vp) {
    vState.paste = el.value;
    return;
  }
  if (view === "newCorr" && crDraft) {
    if (el.dataset.crsel) {
      crDraft.sel[el.dataset.crsel] = el.checked;
      render();
      return;
    }
    if (el.dataset.crto) {
      crDraft.to[el.dataset.crto] = el.value;
      refreshCR();
      return;
    }
    if (el.dataset.crf) {
      const k = el.dataset.crf;
      crDraft[k] = k === "seen" || k === "updateMaster" ? el.checked : el.value;
      refreshCR();
      return;
    }
  }
  if (el.dataset.rgt) {
    regType = el.dataset.rgt;
    render();
    return;
  }
  if (el.dataset.t) {
    tDraft[el.dataset.t] = el.value;
    tDraft.err = "";
    return;
  }
  if (view === "newDcr" && dcrDraft) {
    if (el.dataset.dcrArea) {
      const a = el.dataset.dcrArea;
      if (el.checked) dcrDraft.areas.push(a);
      else dcrDraft.areas = dcrDraft.areas.filter((x) => x !== a);
      render();
      return;
    }
    if (el.dataset.dcr) {
      dcrDraft[el.dataset.dcr] = el.value;
      const b = document.querySelector('[data-act="submitdcr"]');
      if (b)
        b.disabled = !(
          dcrDraft.areas.length &&
          dcrDraft.desc.trim() &&
          dcrDraft.contact.trim()
        );
      return;
    }
    return;
  }
  if (view === "dcr" && pDraft && el.dataset.p) {
    const k = el.dataset.p;
    pDraft[k] = k === "fs" || k === "tr" ? Number(el.value) : el.value;
    if (k !== "summary") {
      const pv = document.getElementById("pPreview");
      pv.innerHTML = docInvoice(
        sampleInvoice(),
        Object.assign({}, pDraft, { v: curDesign().v + 1 }),
      );
      renderQRs();
      document.getElementById("guard").textContent =
        `INVOICE title auto-sized to ${titleSize(pDraft)}px, larger than every other description on the form.`;
    }
    return;
  }
  if (view === "newCredit" && draftC) {
    if (el.dataset.c) {
      draftC[el.dataset.c] = el.value;
      if (el.dataset.c === "reason") {
        if (!qtyMode(draftC)) draftC.qtys = {};
        render();
        return;
      }
      refreshC();
      return;
    }
    if (el.dataset.cqty != null) {
      const k = +el.dataset.cqty,
        inv = invOf(draftC.invNo),
        it = inv.items[k],
        q = Number(el.value || 0);
      draftC.qtys[k] = q;
      draftC.amts[k] = Math.round((lineNet(it) / Number(it.qty)) * q);
      const a = document.querySelector(`[data-camt="${k}"]`);
      if (a) a.value = (draftC.amts[k] / 100).toFixed(2);
      refreshC();
      return;
    }
    if (el.dataset.camt != null) {
      draftC.amts[+el.dataset.camt] = cents(el.value);
      refreshC();
      return;
    }
    return;
  }
  if (view === "newReceipt" && draftR) {
    if (el.dataset.r === "cur") {
      draftR.cur = el.value;
      draftR.sel = {};
      render();
      return;
    }
    if (el.dataset.r) {
      const k = el.dataset.r;
      if (k === "advAmt") draftR.advAmt = cents(el.value);
      else draftR[k] = el.value;
      if (k === "customerId") {
        draftR.sel = {};
        render();
      } else if (k === "type" || k === "method") render();
      else refreshR();
      return;
    }
    if (el.dataset.rsel) {
      const n = +el.dataset.rsel;
      if (el.checked) draftR.sel[n] = balanceOf(invOf(n));
      else delete draftR.sel[n];
      render();
      return;
    }
    if (el.dataset.ramt) {
      draftR.sel[+el.dataset.ramt] = cents(el.value);
      refreshR();
      return;
    }
    return;
  }
  if (!draft) return;
  const f = el.dataset.f;
  if (el.dataset.adv) {
    const n = +el.dataset.adv,
      r = receipts.find((x) => x.no === n);
    if (el.checked)
      draft.adv[n] =
        Math.min(
          unappliedOf(r),
          Math.max(calc(draft).due - advTotal(draft), 0),
        ) || unappliedOf(r);
    else delete draft.adv[n];
    render();
    return;
  }
  if (el.dataset.advamt) {
    draft.adv[+el.dataset.advamt] = cents(el.value);
    refreshEditor();
    return;
  }
  if (f === "customer") {
    draft.customerId = el.value;
    draft.adv = {};
    render();
    return;
  }
  if (f === "tin") {
    cust(draft.customerId).tin = el.value.trim();
    refreshEditor();
    return;
  }
  if (f === "salesType") {
    draft.salesType = el.value;
    refreshEditor();
    return;
  }
  if (f === "nature") {
    draft.nature = el.value;
    render();
    return;
  }
  if (f === "txnDate") {
    draft.txnDate = el.value;
    if (isFX(draft)) {
      render();
      return;
    }
    refreshEditor();
    return;
  }
  if (f === "cur") {
    draft.cur = el.value;
    if (isFX(draft)) {
      draft.scpwd = "";
      draft.adv = {};
    }
    render();
    return;
  }
  if (f === "incl") {
    draft.incl = el.checked;
    refreshEditor();
    return;
  }
  if (f === "manual") {
    draft.refs.manual = el.checked ? { no: "", date: "" } : undefined;
    if (!el.checked) delete draft.refs.manual;
    render();
    return;
  }
  if (f === "mno") {
    draft.refs.manual.no = el.value;
    refreshEditor();
    return;
  }
  if (f === "mdt") {
    draft.refs.manual.date = el.value;
    refreshEditor();
    return;
  }
  if (f === "scpwd") {
    draft.scpwd = el.value;
    draft.stExtraVal = "";
    draft.items.forEach((it) => delete it.stCov);
    draft.stConfirm = false;
    draft.movRel = "";
    if (!el.value) {
      draft.scId = "";
      draft.scName = "";
      draft.spChild = "";
      draft.group = null;
    }
    render();
    return;
  }
  if (f === "stExtraVal") {
    draft.stExtraVal = el.value;
    refreshEditor();
    return;
  }
  if (f === "scName" || f === "spChild") {
    draft[f] = el.value;
    refreshEditor();
    return;
  }
  if (f === "movRel") {
    draft.movRel = el.value;
    refreshEditor();
    return;
  }
  if (f === "stConfirm") {
    draft.stConfirm = el.checked;
    refreshEditor();
    return;
  }
  if (f === "groupDiners" || f === "groupSc") {
    draft.group = draft.group || { diners: 0, sc: 0 };
    draft.group[f === "groupDiners" ? "diners" : "sc"] = Number(el.value || 0);
    refreshSC();
    return;
  }
  if (f === "scId") {
    draft.scId = el.value;
    refreshEditor();
    return;
  }
  if (f === "wht") {
    if (el.value === "custom") {
      draft.whtMode = "PCT";
      draft.whtPct = draft.whtPct || "";
      render();
      return;
    }
    if (el.value === "amount") {
      draft.whtMode = "AMT";
      render();
      return;
    }
    draft.whtMode = "RATE";
    draft.wht = Number(el.value);
    render();
    return;
  }
  if (f === "terms") {
    draft.terms = el.value;
    draft.termsSet = true;
    if (el.value === "CUSTOM" && !draft.dueDate)
      draft.dueDate = addDaysISO(draft.txnDate, 30);
    render();
    return;
  }
  if (f === "dueDate") {
    draft.dueDate = el.value < draft.txnDate ? draft.txnDate : el.value;
    refreshEditor();
    return;
  }
  if (f === "whtPct") {
    draft.whtPct = el.value;
    draft.wht = Math.max(0, Math.min(100, Number(el.value || 0))) / 100;
    refreshEditor();
    return;
  }
  if (f === "whtAmt") {
    draft.whtAmt = el.value;
    refreshEditor();
    return;
  }
  if (f === "promoName") {
    draft.promo.name = el.value;
    refreshEditor();
    return;
  }
  if (f === "promoType") {
    draft.promo.type = el.value;
    draft.promo.value = 0;
    render();
    return;
  }
  if (f === "promoValue") {
    draft.promo.value = Number(el.value || 0);
    refreshEditor();
    return;
  }
  if (el.dataset.i != null && el.dataset.k === "sku") {
    const it = draft.items[+el.dataset.i];
    it.skuText = el.value;
    const item = findItemByLabel(el.value);
    if (item) {
      applyItem(it, item);
      delete it.skuText;
      render();
      return;
    }
    if (!el.value.trim()) {
      delete it.itemId;
      delete it.sku;
      delete it.uom;
      refreshEditor();
    }
    return;
  }
  if (el.dataset.i != null && el.dataset.k === "scCat") {
    draft.items[+el.dataset.i].scCat = el.value;
    refreshSC();
    return;
  }
  if (el.dataset.i != null && el.dataset.k === "stCov") {
    draft.items[+el.dataset.i].stCov = el.value === "COV" ? "Y" : "N";
    refreshSC();
    return;
  }
  if (el.dataset.i != null) {
    const it = draft.items[+el.dataset.i],
      k = el.dataset.k;
    it[k] = ["qty", "price", "disc"].includes(k)
      ? el.value === ""
        ? 0
        : Number(el.value)
      : el.value;
    if (k === "tax") render();
    else refreshEditor();
  }
});
document.addEventListener("change", (e) => {
  const el = e.target;
  if (el.dataset.pfile && portalForm) {
    const fl = el.files && el.files[0];
    if (fl) {
      if (fl.size > 5 * 1024 * 1024) {
        portalForm.err = "The file is over 5 MB.";
        portalForm.file = null;
      } else portalForm.file = { name: fl.name, size: fl.size, type: fl.type };
    }
    render();
    return;
  }
  if (el.dataset.impfile) {
    const fl = el.files && el.files[0];
    if (fl) {
      const r = new FileReader();
      r.onload = () => {
        impState = {
          name: fl.name,
          rows: validateImport(parseCSV(String(r.result))),
        };
        render();
      };
      r.readAsText(fl);
    }
    return;
  }
  if (el.dataset.isel != null && draft && uiMode !== "counter") {
    const it = draft.items[+el.dataset.isel],
      item = itemById(el.value);
    if (item) {
      applyItem(it, item);
      delete it.skuText;
      render();
    }
    return;
  }
  if (el.dataset.ssel != null && sDraft) {
    const l = sDraft.lines[+el.dataset.ssel],
      item = itemById(el.value);
    if (item) {
      l.itemId = item.id;
      l.skuText = skuLabel(item);
      render();
    }
    return;
  }
  if (uiMode === "counter" && me() && draft && !kIssued) {
    if (el.dataset.kcur) {
      draft.cur = el.value;
      if (isFX(draft)) {
        draft.scpwd = "";
        draft.scId = "";
        draft.scName = "";
      }
      kRows.forEach((r) => {
        const it = r.itemId && itemById(r.itemId);
        if (it) applyItem(r, it);
      });
      kTender = "";
      kRefresh();
      return;
    }
    if (el.dataset.kselect != null) {
      const it = itemById(el.value);
      if (it) kPickItem(+el.dataset.kselect, it);
      return;
    }
    if (el.dataset.kpay === "method") {
      draft.pay.method = el.value;
      kRefresh();
      return;
    }
    if (el.dataset.kstok) {
      draft.stConfirm = el.checked;
      kRefresh();
      return;
    }
    if (el.dataset.kdate) {
      if (me().roleCode === "CASHIER") {
        deny("counter");
        return;
      }
      const v = el.value > todayISO() ? todayISO() : el.value;
      draft.txnDate = v || todayISO();
      if (draft.txnDate >= todayISO() && draft.refs)
        delete draft.refs.lateReason;
      kRows.forEach((r) => {
        const it = r.itemId && itemById(r.itemId);
        if (it) applyItem(r, it);
      });
      kRefresh();
      return;
    }
    if (el.dataset.kst && el.tagName === "SELECT") {
      draft[el.dataset.kst] = el.value;
      kRefresh();
      return;
    }
    if (el.dataset.kbr) {
      const br = el.value;
      viewBr = br;
      const keep = kRows;
      kNew();
      kRows = keep;
      kRows.forEach((r) => {
        const it = r.itemId && itemById(r.itemId);
        if (it) applyItem(r, it);
      });
      kRefresh();
      return;
    }
  }
  if (el.type !== "file" || !el.files || !el.files[0]) return;
  const f = el.files[0];
  if (f.size > 1024 * 1024) {
    toast("Logo file must be under 1 MB.");
    el.value = "";
    return;
  }
  const rd = new FileReader();
  rd.onload = () => {
    if (el.dataset.dcrLogo && dcrDraft) {
      dcrDraft.logo = rd.result;
      render();
    } else if (el.dataset.pLogo && pDraft) {
      pDraft.logo = rd.result;
      render();
    }
  };
  rd.readAsDataURL(f);
});
/* seed amounts that depend on computation */
{
  const d5 = calc(invOf(5000005)).due;
  receipts[0].amount = d5;
  receipts[0].lines[0].amount = d5;
  const i3 = invOf(5000003);
  receipts[1].applications[0].amount = calc(i3).due;
  receipts[1].applications[0].at = i3.issuedAt;
}
ITEMS = [
  [
    "SEM-TAX",
    "",
    "Tax seminar, one-day (per participant)",
    "participant",
    3500,
    "VATABLE",
    "SERVICE",
    0,
    null,
  ],
  [
    "SEM-EST",
    "",
    "Estate tax seminar (per participant)",
    "participant",
    3000,
    "VATABLE",
    "SERVICE",
    0,
    null,
  ],
  [
    "VOD-TAX",
    "",
    "Tax VOD course, 12-month access",
    "subscription",
    4500,
    "VATABLE",
    "SERVICE",
    0,
    null,
  ],
  [
    "ADV-HR",
    "",
    "Tax advisory (per hour)",
    "hour",
    5000,
    "VATABLE",
    "SERVICE",
    0,
    null,
  ],
  [
    "AUD-REP",
    "",
    "BIR audit representation (engagement)",
    "engagement",
    150000,
    "VATABLE",
    "SERVICE",
    0,
    null,
  ],
  [
    "REG-BUS",
    "",
    "Business registration assistance (SEC, BIR, LGU)",
    "engagement",
    25000,
    "VATABLE",
    "SERVICE",
    0,
    null,
  ],
  [
    "BKP-MO",
    "",
    "Bookkeeping and tax compliance retainer (per month)",
    "month",
    15000,
    "VATABLE",
    "SERVICE",
    0,
    null,
  ],
  [
    "ADV-NR",
    "",
    "Tax advisory, nonresident client (per hour)",
    "hour",
    5000,
    "ZERO_RATED",
    "SERVICE",
    0,
    null,
  ],
  [
    "WB-TAX",
    "4806543210019",
    "Tax seminar workbook (printed)",
    "copy",
    800,
    "EXEMPT",
    "GOODS",
    50,
    [300, 25000],
  ],
  [
    "USB-VOD",
    "4806543210026",
    "Seminar recordings on USB flash drive",
    "pc",
    1500,
    "VATABLE",
    "GOODS",
    20,
    [100, 40000],
  ],
  [
    "PAD-BZ",
    "4806543210033",
    "Bizmaker planner notebook",
    "pc",
    450,
    "VATABLE",
    "GOODS",
    30,
    [200, 15000],
  ],
  [
    "FD-LUNCH",
    "",
    "Seminar lunch buffet (per person)",
    "person",
    450,
    "VATABLE",
    "SERVICE",
    0,
    null,
  ],
].map(([sku, barcode, desc, uom, price, tax, type, reorder, op], k) => ({
  scCat: sku === "FD-LUNCH" ? "Q20" : "NONE",
  category: {
    "SEM-TAX": "Seminars",
    "SEM-EST": "Seminars",
    "VOD-TAX": "E-learning",
    "USB-VOD": "E-learning",
    "ADV-HR": "Advisory and compliance",
    "AUD-REP": "Advisory and compliance",
    "REG-BUS": "Advisory and compliance",
    "BKP-MO": "Advisory and compliance",
    "ADV-NR": "Advisory and compliance",
    "WB-TAX": "Publications",
    "PAD-BZ": "Merchandise",
    "FD-LUNCH": "Food and beverage",
  }[sku],
  id: "i" + (k + 1),
  sku,
  barcode,
  desc,
  uom,
  price,
  tax,
  type,
  reorder,
  opening: op ? { qty: op[0], cost: op[1], at: now() - 10 * DAY } : null,
}));
invoices.forEach((inv) =>
  inv.items.forEach((it) => {
    const item = ITEMS.find((i) => i.desc === it.desc);
    if (item) {
      it.itemId = item.id;
      it.sku = item.sku;
      it.uom = item.uom;
      it.scCat = item.scCat;
    }
  }),
);
stockDocs = [
  {
    id: "RR-0001",
    type: "PURCHASE",
    at: now() - 5 * DAY,
    postedAt: now() - 5 * DAY,
    supplier: "PRINTWORKS PUBLISHING INC.",
    supTin: "111-222-333-00000",
    supDoc: "SI 88123",
    supDocDate: todayISO(now() - 5 * DAY),
    reason: "",
    note: "",
    lines: [
      { itemId: "i9", qty: 200, unitCost: 23000 },
      { itemId: "i10", qty: 50, unitCost: 38000 },
    ],
    preparedBy: { id: "u1", name: "Maria Santos", role: "Billing clerk" },
    status: "POSTED",
    history: [
      { at: now() - 5 * DAY, by: "Maria Santos", act: "Posted to stock" },
    ],
  },
  {
    id: "ADJ-0001",
    type: "ADJ",
    dir: "OUT",
    at: now() - 3600e3,
    reason: "Damaged goods",
    note: "2 workbooks water-damaged in storage",
    lines: [{ itemId: "i9", qty: 2, unitCost: 0 }],
    preparedBy: { id: "u1", name: "Maria Santos", role: "Billing clerk" },
    status: "PENDING",
    postedAt: null,
    history: [
      {
        at: now() - 3600e3,
        by: "Maria Santos",
        act: "Prepared and submitted for approval",
      },
    ],
  },
];
{
  const d0 = todayISO(),
    d1 = todayISO(now() - DAY),
    d3 = todayISO(now() - 3 * DAY);
  fxRates = [
    ["USD", d3, 57.85],
    ["USD", d1, 58.02],
    ["USD", d0, 58.1],
    ["EUR", d1, 63.05],
    ["EUR", d0, 63.4],
    ["JPY", d0, 0.3925],
    ["SGD", d0, 44.8],
  ].map(([cur, date, rate]) => ({
    cur,
    date,
    rate,
    source: CURRENCIES[cur].src,
    by: "Lito Garcia",
  }));
}
{
  const x = mk(
    5000006,
    "c7",
    "CHARGE",
    [["Tax advisory, nonresident client (per hour)", 6, 85, "ZERO_RATED", 0]],
    "pending",
    -3,
    { nature: "SERVICES" },
  );
  x.cur = "USD";
  x.txnDate = todayISO(now() - 3 * DAY);
  x.fx = rateFor("USD", x.txnDate);
  invoices.push(x);
  BRS[0].next.inv = 5000007;
}
STORE_PROMOS = [
  {
    id: "P1",
    name: "Early-bird seminar rate",
    pct: 15,
    from: todayISO(now() - 3 * DAY),
    to: todayISO(now() + 7 * DAY),
    skus: ["SEM-TAX", "SEM-EST"],
    branch: "ALL",
    by: "Ramon Bautista",
    active: true,
  },
];
receipts.forEach((r) => (r.branch = r.branch || "00000"));
stockDocs.forEach((d) => (d.branch = d.branch || "00000"));
stockDocs.forEach((d) => (d.branch = d.branch || "00000"));
[...invoices, ...credits, ...receipts].forEach((x) => {
  x.designV = 1;
  x.seller = sellerSnap(
    x.branch || (x.invNo && invOf(x.invNo).branch) || "00000",
  );
  if (x.vat !== undefined) x.seller.vat = x.vat;
});
invoices.forEach((i) => {
  i.txnDate = todayISO(i.issuedAt);
  i.nature = i.nature || "GOODS";
  if (i.salesType === "CHARGE")
    i.terms = (cust(i.customerId) || {}).terms || "NET30";
});
nextTR = 1;
tally = [
  ["Photocopies of BIR forms", 8000, "SSPT", -5],
  ["Seminar handout set", 14500, "SSPT", -4],
  ["Tax table booklet", 6500, "EXEMPT", -2],
  ["Coffee at seminar venue", 18000, "SSPT", -1],
]
  .map(([desc, amount, tax, h], k) => ({
    branch: "00000",
    id: "seed" + k,
    day: todayISO(),
    at: now() + h * 3600e3,
    desc,
    amount,
    tax,
    invNo: null,
  }))
  .filter((t) => t.day === todayISO());
[...invoices, ...receipts].forEach((x) => (x.buyer = snap(x.customerId)));
if (location.hash === "#portal") portalOpen = true;
render();
initSigning().then(async () => {
  for (const i of invoices) {
    if (!i.sig || !i.verifyUrl) await signDoc(i, "INV");
  }
  for (const c of credits) {
    if (!c.sig || !c.verifyUrl) await signDoc(c, "CM");
  }
  render();
});
async function syncWithDb() {
  if (typeof fetch === "undefined") return;
  try {
    const res = await fetch("/api/sync");
    if (!res.ok) {
      isDbConnected = false;
      render();
      return;
    }
    const data = await res.json();
    if (data.ok && data.dbConnected) {
      isDbConnected = true;
      if (Array.isArray(data.invoices) && data.invoices.length > 0) {
        invoices = data.invoices;
        if (Array.isArray(data.credits)) credits = data.credits;
        if (Array.isArray(data.receipts)) receipts = data.receipts;
        if (Array.isArray(data.secLog)) secLog = data.secLog;
        if (data.settings && typeof data.settings === "object") {
          Object.assign(S, data.settings);
        }
        [...invoices, ...receipts].forEach((x) => {
          if (!x.buyer && x.customerId) x.buyer = snap(x.customerId);
        });
        BRS.forEach((b) => {
          const brInvs = invoices.filter(
            (i) => (i.branch || "00000") === b.code && typeof i.no === "number",
          );
          if (brInvs.length > 0) {
            b.next.inv = Math.max(...brInvs.map((i) => i.no)) + 1;
          }
          if (draft && draft.branch === b.code) {
            draft.no = b.next.inv;
          }
          const brCns = credits.filter(
            (c) =>
              (c.branch ||
                (invOf(c.invNo) && invOf(c.invNo).branch) ||
                "00000") === b.code && typeof c.no === "number",
          );
          if (brCns.length > 0) {
            b.next.cn = Math.max(...brCns.map((c) => c.no)) + 1;
          }
          const brPrs = receipts.filter(
            (r) => (r.branch || "00000") === b.code && typeof r.no === "number",
          );
          if (brPrs.length > 0) {
            b.next.pr = Math.max(...brPrs.map((r) => r.no)) + 1;
          }
        });
        if (!SIGN.ready) await initSigning();
        for (const i of invoices) {
          if (!i.sig || !i.verifyUrl) await signDoc(i, "INV");
        }
        for (const c of credits) {
          if (!c.sig || !c.verifyUrl) await signDoc(c, "CM");
        }
      } else {
        postDbSync("seed_all", { invoices, credits, receipts, settings: S });
      }
      render();
    } else {
      isDbConnected = false;
      render();
    }
  } catch (e) {
    isDbConnected = false;
    render();
  }
}
syncWithDb();
