/* ============ Store set-up (maintained by the manager and the EIS provider; read-only at the counter) ============ */
const SELLER = {
  trade: "BIZMAKER",
  name: "BIZMAKER CONSULTANCY INC.",
  tinVat: "VAT REG TIN 010-386-422-00000",
  tinNon: "NON-VAT REG TIN 010-386-422-00000",
  branch: "Head Office (00000)",
  address:
    "P41-10 6th-11th Street, Villamor Air Base, Barangay 183, Pasay City 1300, NCR, Fourth District, Philippines",
  pti: "PTI-EI-0426-2026-000123",
  permit: "CAS-PTU-0426-00012",
  series: [5000001, 5000500],
  logo: "data:image/webp;base64,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",
};
let STORE = { vat: true };
const CASHIERS = [
  { id: "k1", name: "Carlo Mendoza", pin: "1234" },
  { id: "k2", name: "Liza Ramos", pin: "5678" },
];
/* shelf prices in pesos, VAT-inclusive for VATable items; coverage decides which discounts may apply */
const ITEMS = [
  {
    sku: "SEM-TAX",
    barcode: "",
    desc: "Tax seminar, one-day (per participant)",
    uom: "participant",
    price: 3920.0,
    tax: "VATABLE",
    cov: {},
  },
  {
    sku: "SEM-EST",
    barcode: "",
    desc: "Estate tax seminar (per participant)",
    uom: "participant",
    price: 3360.0,
    tax: "VATABLE",
    cov: {},
  },
  {
    sku: "VOD-TAX",
    barcode: "",
    desc: "Tax VOD course, 12-month access",
    uom: "subscription",
    price: 5040.0,
    tax: "VATABLE",
    cov: {},
  },
  {
    sku: "ADV-HR",
    barcode: "",
    desc: "Tax advisory (per hour)",
    uom: "hour",
    price: 5600.0,
    tax: "VATABLE",
    cov: {},
  },
  {
    sku: "REG-BUS",
    barcode: "",
    desc: "Business registration assistance (SEC, BIR, LGU)",
    uom: "engagement",
    price: 28000.0,
    tax: "VATABLE",
    cov: {},
  },
  {
    sku: "BKP-MO",
    barcode: "",
    desc: "Bookkeeping and tax compliance retainer (per month)",
    uom: "month",
    price: 16800.0,
    tax: "VATABLE",
    cov: {},
  },
  {
    sku: "ADV-NR",
    barcode: "",
    desc: "Tax advisory, nonresident client (per hour)",
    uom: "hour",
    price: 5000.0,
    tax: "ZERO_RATED",
    cov: {},
  },
  {
    sku: "WB-TAX",
    barcode: "4806543210019",
    desc: "Tax seminar workbook (printed)",
    uom: "copy",
    price: 800.0,
    tax: "EXEMPT",
    cov: {},
    stock: 300,
  },
  {
    sku: "USB-VOD",
    barcode: "4806543210026",
    desc: "Seminar recordings on USB flash drive",
    uom: "pc",
    price: 1680.0,
    tax: "VATABLE",
    cov: {},
    stock: 100,
  },
  {
    sku: "PAD-BZ",
    barcode: "4806543210033",
    desc: "Bizmaker planner notebook",
    uom: "pc",
    price: 504.0,
    tax: "VATABLE",
    cov: {},
    stock: 200,
  },
];
const CUSTOMERS = [
  { name: "Walk-in customer", tin: "", address: "", email: "", type: "B2C" },
  {
    name: "BUYER INC.",
    tin: "987-654-321-00000",
    address: "Ayala Ave., Makati City",
    email: "ap@buyerinc.ph",
    type: "VAT",
    wht: 0.1,
    whtNote: "expanded withholding on professional fees, 10%",
  },
  {
    name: "PASIG HARDWARE TRADING",
    tin: "234-567-890-00001",
    address: "Caruncho Ave., Pasig City",
    email: "billing@pasighardware.ph",
    type: "VAT",
  },
  {
    name: "JUAN DELA CRUZ",
    tin: "",
    address: "Quezon City",
    email: "",
    type: "B2C",
  },
  {
    name: "PACIFIC RIM TRADING PTE. LTD.",
    tin: "",
    address: "10 Anson Road, Singapore 079903",
    email: "accounts@pacificrim.sg",
    type: "FOREIGN",
    country: "Singapore",
  },
];
const iso = (d) => new Date(d).toLocaleDateString("en-CA");
const TODAY = iso(Date.now());
/* store-wide promotions: set by the manager with dates; the counter applies them automatically */
const PROMOS = [
  {
    name: "Early-bird seminar rate",
    pct: 15,
    from: iso(Date.now() - 3 * 864e5),
    to: iso(Date.now() + 7 * 864e5),
    skus: ["SEM-TAX", "SEM-EST"],
  },
];
/* exchange rates entered daily by the office (sample figures): BAP for USD, BSP for others (RMC 12-2024) */
const FX = {
  USD: { rate: 58.1, src: "BAP" },
  EUR: { rate: 63.4, src: "BSP" },
  JPY: { rate: 0.3925, src: "BSP" },
  SGD: { rate: 44.8, src: "BSP" },
};
/* statutory discounts; added rules come from the EIS provider */
const ST = {
  SC: {
    label: "Senior citizen",
    short: "SC",
    id: "OSCA or government ID no.",
    law: "RA 9994",
  },
  PWD: { label: "PWD", short: "PWD", id: "PWD ID no.", law: "RA 10754" },
  NAAC: {
    label: "Athlete or coach",
    short: "NAAC",
    id: "PNSTM ID no.",
    law: "RA 10699",
  },
  MOV: {
    label: "Medal of Valor",
    short: "MOV",
    id: "MOV or dependent ID no.",
    law: "RA 9049",
  },
  SP: {
    label: "Solo parent",
    short: "SP",
    id: "Solo Parent ID no.",
    law: "RA 11861",
  },
};
const TIN_RE = /^\d{3}-\d{3}-\d{3}-\d{5}$/,
  BNPC_CAP = 12500;

/* ============ Demo State (in-memory: fresh clean slate on reload) ============ */
let db = { next: SELLER.series[0], invoices: [], requests: [], stock: {} };
try {
  localStorage.removeItem("talaan-counter-bizmaker-v2");
} catch (e) {}
ITEMS.forEach((i) => {
  if (i.stock != null && db.stock[i.sku] == null) db.stock[i.sku] = i.stock;
});
const SUPERVISOR = { name: "Jose Reyes, Finance manager", pin: "9999" };
function onHand(sku) {
  return db.stock[sku];
}
function inDraft(sku, except) {
  return inv
    ? inv.lines.reduce(
        (a, l, i) =>
          a + (l.sku === sku && i !== except ? Number(l.qty || 0) : 0),
        0,
      )
    : 0;
}
function save() {}

/* ============ Helpers ============ */
const $ = (s) => document.querySelector(s);
const cents = (x) => Math.round(Number(x || 0) * 100);
const amt = (c) => {
  const n = Number(c || 0);
  return (n / 100).toLocaleString("en-PH", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};
const peso = (c) => "₱" + amt(c);
const esc = (s) =>
  String(s ?? "").replace(
    /[&<>"]/g,
    (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[m],
  );
const dateTxt = (t) =>
  new Date(t).toLocaleDateString("en-PH", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
const timeOf = (t) =>
  new Date(t).toLocaleTimeString("en-PH", {
    hour: "numeric",
    minute: "2-digit",
  });
function money(v, c) {
  return v.cur && v.cur !== "PHP" ? `${v.cur} ${amt(c)}` : peso(c);
}
function toast(m) {
  const t = $("#toast");
  t.textContent = m;
  t.classList.add("show");
  clearTimeout(t._h);
  t._h = setTimeout(() => t.classList.remove("show"), 2600);
}
function itemBy(sku) {
  return ITEMS.find((i) => i.sku === sku);
}
function itemOf(l) {
  return l.frozen || itemBy(l.sku);
}
function promoFor(sku, on) {
  return PROMOS.find((p) => p.skus.includes(sku) && p.from <= on && p.to >= on);
}
function weekStart(t) {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d.getTime();
}

/* ============ State ============ */
let me = null,
  shiftStart = null,
  inv = null,
  view = null,
  sugg = { row: -1, list: [], hi: 0, kind: null },
  modal = null;
function blankLine() {
  return { sku: "", desc: "", qty: "", q: "" };
}
function newInvoice() {
  inv = {
    date: TODAY,
    dateOk: false,
    lateReason: "",
    vat: STORE.vat,
    cur: "PHP",
    sales: "CASH",
    buyer: { ...CUSTOMERS[0] },
    lines: [blankLine(), blankLine(), blankLine(), blankLine()],
    st: null,
    stId: "",
    stName: "",
    stExtra: "",
    stOk: false,
    diners: "",
    bens: "",
    tender: "",
  };
  view = null;
}

/* ============ Computation ============ */
function unitPrice(v, it) {
  const r = v.fx ? v.fx.rate : FX[v.cur] ? FX[v.cur].rate : 1;
  return v.cur === "PHP" ? it.price : Math.round((it.price / r) * 100) / 100;
}
function taxOf(v, it) {
  return v.vat ? it.tax : it.tax === "EXEMPT" ? "EXEMPT" : "SSPT";
}
function covKey(T) {
  return { SC: "q20", PWD: "q20", NAAC: "naac", MOV: "mov", SP: "sp" }[T];
}
function groupF(v) {
  const d = +v.diners,
    b = +v.bens;
  return v.st && v.st !== "SP" && d > 0 && b > 0 && b < d ? b / d : 1;
}
function bnpcUsed(id, t, excl) {
  id = (id || "").trim().toLowerCase();
  if (!id) return 0;
  const wk = weekStart(t);
  return db.invoices
    .filter(
      (i) =>
        i.no !== excl &&
        (i.st === "SC" || i.st === "PWD") &&
        (i.stId || "").trim().toLowerCase() === id &&
        weekStart(i.at) === wk,
    )
    .reduce((a, i) => a + i.lines.reduce((x, l) => x + (l.bnpc || 0), 0), 0);
}
function calc(v) {
  const on = v.date || TODAY,
    T = v.cur === "PHP" ? v.st : null,
    f = groupF(v);
  let capLeft =
    T === "SC" || T === "PWD"
      ? Math.max(0, BNPC_CAP - bnpcUsed(v.stId, v.at || Date.now(), v.no))
      : 0;
  const c = {
    vatable: 0,
    vat: 0,
    exempt: 0,
    zero: 0,
    sspt: 0,
    total: 0,
    lessVat: 0,
    disc: 0,
    promo: 0,
    addVat: 0,
    wht: 0,
    due: 0,
    promoNames: new Set(),
  };
  v.lines.forEach((l) => {
    l.res = null;
    const it = itemOf(l),
      q = Number(l.qty || 0);
    if (!it || !(q > 0)) return;
    const tax = taxOf(v, it),
      R = Math.round(q * unitPrice(v, it) * 100);
    const vt = v.vat && tax === "VATABLE",
      base = vt ? Math.round(R / 1.12) : R,
      pr = v.issued ? l.promoPct : (promoFor(it.sku, on) || {}).pct,
      P = pr ? Math.round((R * pr) / 100) : 0;
    let stat = 0,
      ch = null,
      bn = 0;
    const k = covKey(T);
    if (T && k && it.cov[k]) {
      if (T === "SP") {
        stat = vt ? Math.round(base * 0.22) : Math.round(R * 0.1);
        ch = "SP";
      } else if (T === "NAAC" || T === "MOV") {
        stat = Math.round(base * 0.2 * f);
        ch = "VD";
      } else {
        stat = vt ? Math.round(base * 0.32 * f) : Math.round(R * 0.2 * f);
        ch = "EX";
      }
    } else if (T && (T === "SC" || T === "PWD") && it.cov.bnpc) {
      bn = v.issued ? l.bnpc || 0 : Math.min(Math.round(R * 0.05), capLeft);
      stat = bn;
      ch = "BNPC";
    }
    const useStat = stat > 0 && stat > P;
    if (useStat && ch === "BNPC") capLeft -= bn;
    const res = {
      R,
      tax,
      ch: useStat ? ch : null,
      stat,
      promo: useStat ? 0 : P,
      promoName:
        useStat || !P
          ? ""
          : (promoFor(it.sku, on) || { name: l.promoName }).name,
      bnpc: useStat && ch === "BNPC" ? bn : 0,
    };
    l.res = res;
    if (res.promo) {
      c.promo += res.promo;
      c.promoNames.add(`${res.promoName} (${pr}%)`);
    }
    const a = R - res.promo;
    if (v.vat) {
      c.total += a;
      if (tax === "VATABLE") {
        const b = Math.round(a / 1.12),
          t = a - b;
        c.lessVat += t;
        if (res.ch === "EX" || res.ch === "SP") {
          const ff = res.ch === "SP" ? 1 : f,
            s = Math.round(b * ff),
            rest = b - s;
          c.exempt += s;
          c.disc += Math.round(s * (res.ch === "SP" ? 0.1 : 0.2));
          c.vatable += rest;
          c.vat += Math.round(rest * 0.12);
        } else if (res.ch === "VD") {
          c.vatable += b;
          c.vat += t;
          c.disc += Math.round(b * 0.2 * f);
        } else if (res.ch === "BNPC") {
          const dn = Math.round(res.bnpc / 1.12);
          c.disc += dn;
          c.vatable += b - dn;
          c.vat += Math.round((b - dn) * 0.12);
        } else {
          c.vatable += b;
          c.vat += t;
        }
      } else {
        if (tax === "ZERO_RATED") c.zero += a;
        else c.exempt += a;
        if (res.ch === "EX" || res.ch === "VD")
          c.disc += Math.round(a * 0.2 * f);
        else if (res.ch === "SP") c.disc += Math.round(a * 0.1);
        else if (res.ch === "BNPC") c.disc += res.bnpc;
      }
    } else {
      c.total += a;
      if (tax === "EXEMPT") c.exempt += a;
      else c.sspt += a;
      if (res.ch === "EX" || res.ch === "VD") c.disc += Math.round(a * 0.2 * f);
      else if (res.ch === "SP") c.disc += Math.round(a * 0.1);
      else if (res.ch === "BNPC") c.disc += res.bnpc;
    }
  });
  c.net = c.total - c.lessVat;
  c.addVat = c.vat;
  const wr = v.buyer.wht || 0;
  c.wht = Math.round((c.net - c.disc) * wr);
  c.due = c.net - c.disc + c.addVat - c.wht;
  c.rate = v.cur === "PHP" ? 1 : v.fx ? v.fx.rate : FX[v.cur].rate;
  c.php = (x) => Math.round(x * c.rate);
  return c;
}
function format(v) {
  const used = v.lines
    .filter((l) => l.sku && Number(l.qty) > 0)
    .map((l) => taxOf(v, itemOf(l)));
  if (!v.vat) return used.includes("EXEMPT") ? "B5" : "B2";
  if (used.length && used.every((t) => t === "EXEMPT")) return "B3";
  if (used.length && used.every((t) => t === "ZERO_RATED")) return "B4";
  return "B1";
}
function checks(v) {
  const c = calc(v),
    used = v.lines.filter((l) => l.sku && Number(l.qty) > 0),
    b = v.buyer,
    out = [],
    T = v.st;
  out.push([used.length > 0, "At least one item with a quantity"]);
  out.push([
    v.lines.every((l) => !l.q || l.sku),
    "Every item picked from the product list",
  ]);
  out.push([
    v.lines
      .filter((l) => l.sku)
      .every((l) => Number(l.qty) > 0 && isFinite(l.qty)),
    "Valid positive quantity for every selected item",
  ]);
  out.push([!!b.name.trim(), 'Buyer\'s name (or "Walk-in customer")']);
  if (b.type === "FOREIGN")
    out.push([
      !!(b.country || "").trim() && !!b.address.trim(),
      "Foreign buyer's country and address",
    ]);
  else if (b.tin)
    out.push([TIN_RE.test(b.tin), "Buyer TIN in ###-###-###-##### format"]);
  if (v.vat && b.type === "VAT" && c.php(c.total) >= 100000)
    out.push([
      TIN_RE.test(b.tin) && !!b.address.trim(),
      "₱1,000 or more to a VAT-registered buyer: TIN and address",
    ]);
  if (v.sales === "CHARGE")
    out.push([
      b.name !== "Walk-in customer",
      "Charge sale needs a named buyer",
    ]);
  if (v.cur !== "PHP")
    out.push([!!FX[v.cur], `${v.cur} rate for today on file`]);
  if (T) {
    out.push([!!v.stId.trim(), `${ST[T].id.replace(" no.", "")} number`]);
    out.push([!!v.stName.trim(), `Name of the ${ST[T].label.toLowerCase()}`]);
    out.push([
      used.some((l) => l.res && l.res.stat > 0),
      "At least one item covered by this discount",
    ]);
    if (T === "MOV")
      out.push([!!v.stExtra, "Awardee, widow or widower, or dependent"]);
    if (T === "SP") {
      out.push([!!v.stExtra.trim(), "Child's name (6 years old or under)"]);
      out.push([v.stOk, "Solo Parent ID and booklet checked"]);
    }
    if (T === "NAAC") out.push([v.stOk, "PNSTM ID and booklet checked"]);
    if (v.diners)
      out.push([
        +v.bens > 0 && +v.bens <= +v.diners,
        "Group meal: beneficiaries between 1 and total diners",
      ]);
  }
  if ((b.email || "").trim())
    out.push([
      /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(b.email.trim()),
      "Buyer email in a valid format",
    ]);
  if (v.date < TODAY) {
    out.push([
      !!v.lateReason.trim(),
      "Reason for the earlier date (it prints on the invoice)",
    ]);
    if (v.cur !== "PHP")
      out.push([
        false,
        "Foreign-currency sales use today's rate, so they can only be dated today",
      ]);
  }
  if (v.sales === "CASH")
    out.push([
      cents(v.tender) >= c.due && c.due > 0,
      "Cash received covers the amount due",
    ]);
  return out;
}
function warns(v) {
  const w = [];
  v.lines.forEach((l, k) => {
    const oh = onHand(l.sku);
    if (oh != null && l.sku) {
      const after = oh - inDraft(l.sku, k) - Number(l.qty || 0);
      if (after < 0)
        w.push(
          `${l.desc}: only ${oh} on hand. Check with the office before selling.`,
        );
    }
  });
  if (v.date < TODAY)
    w.push(
      `Earlier date approved by ${SUPERVISOR.name}. Invoices should be issued on the date of the sale.`,
    );
  return w;
}
function taxLabel(v, l) {
  const t = taxOf(v, itemOf(l));
  return !v.vat
    ? t === "EXEMPT"
      ? "Exempt"
      : "Subject to percentage tax"
    : t === "VATABLE"
      ? "VATable"
      : t === "ZERO_RATED"
        ? "Zero-rated"
        : "VAT-exempt";
}
function tinTxt(b) {
  return b.type === "FOREIGN"
    ? `None (foreign buyer${b.country ? ", " + b.country : ""})`
    : b.tin;
}

/* ============ Screens ============ */
function mine() {
  const d = new Date().toDateString();
  return db.invoices.filter(
    (i) => i.cashier === me.id && new Date(i.at).toDateString() === d,
  );
}
function render() {
  const app = $("#app");
  if (!me) {
    app.innerHTML = signinHtml();
    return;
  }
  const doc = view || inv,
    c = calc(doc),
    ch = view ? [] : checks(doc),
    ok = ch.every((x) => x[0]);
  app.innerHTML = `<header class="strip noprint"><span class="brand">Talaan Counter</span>
    <span class="who">${esc(SELLER.branch)}${STORE.vat ? "" : ", non-VAT store"}</span><span class="who">Cashier <b>${esc(me.name)}</b></span><span class="who">Shift from ${timeOf(shiftStart)}</span>
    <span class="sp"></span><button class="btn quiet" data-act="today">Today's invoices (${mine().length})</button><button class="btn quiet" data-act="shift">End of shift</button><button class="btn quiet" data-act="help">Ask supervisor</button><button class="btn quiet" data-act="signout">Sign out</button></header>
  <main class="work"><div class="paperwrap">${paperHtml(doc, c)}</div>
   <aside class="rail noprint" aria-label="Payment and issue">${view ? viewedRail(doc, c) : railHtml(doc, c, ch, ok)}</aside></main>${modal ? modalHtml() : ""}`;
  renderQR();
}
function signinHtml() {
  return `<div class="signin"><h1>Talaan Counter</h1><p class="sub">${esc(SELLER.name)}, ${esc(SELLER.branch)}</p>
  <label for="who" style="font-size:13px;font-weight:600;color:var(--muted)">Cashier</label><select id="who" class="who">${CASHIERS.map((k) => `<option value="${k.id}">${esc(k.name)}</option>`).join("")}</select>
  <label for="pin" style="display:block;margin-top:12px;font-size:13px;font-weight:600;color:var(--muted)">4-digit PIN</label><div class="pinrow"><input id="pin" type="password" inputmode="numeric" maxlength="4" autocomplete="off"></div>
  <div class="err" id="perr"></div><button class="issue" data-act="signin" style="margin-top:4px">Start shift</button>
  <p class="modeline">Store registration, set by the manager: <label><input type="radio" name="sm" value="1"${STORE.vat ? " checked" : ""} data-store="1"> VAT</label> <label><input type="radio" name="sm" value="0"${STORE.vat ? "" : " checked"} data-store="1"> Non-VAT</label> (demo switch)</p>
  <p class="limits" style="margin-top:10px">Demo PINs: Carlo 1234, Liza 5678. The counter issues invoices only. Prices, promotions, exchange rates and discount coverage come from the office.</p></div>`;
}

function boxes(v, c, f) {
  const L = [],
    Rr = [],
    d = (x) => amt(x);
  if (f === "B1") {
    L.push(
      ["VATable Sales", c.vatable],
      ["VAT", c.vat],
      ["Zero-Rated Sales", c.zero],
      ["VAT-Exempt Sales", c.exempt],
    );
    Rr.push(
      ["Total Sales<small>(VAT Inclusive)</small>", c.total],
      ["Less: VAT", c.lessVat],
      ["Amount: Net of VAT", c.net],
      ["Less: Discount<small>[SC/PWD/NAAC/MOV/SP]</small>", c.disc],
      ["Add: VAT", c.addVat],
      ["Less: Withholding Tax", c.wht],
    );
  } else if (f === "B5") {
    L.push(
      ["Exempt Sales", c.exempt],
      ["Sales Subject to Percentage Tax", c.sspt],
    );
    Rr.push(
      ["Total Sales", c.total],
      ["Less: Discount<small>[SC/PWD/NAAC/MOV/SP]</small>", c.disc],
      ["Less: Withholding Tax", c.wht],
    );
  } else
    Rr.push(
      [
        f === "B3"
          ? "Total VAT-Exempt Sales"
          : f === "B4"
            ? "Total Zero-rated Sales"
            : "Total Sales",
        c.total,
      ],
      ["Less: Discount<small>[SC/PWD/NAAC/MOV/SP]</small>", c.disc],
      ["Less: Withholding Tax", c.wht],
    );
  Rr.push(["TOTAL AMOUNT DUE", c.due, 1]);
  const tb = (rows) =>
    `<table class="bx">${rows.map(([l, x, t]) => `<tr${t ? ' class="tot"' : ""}><td class="lab">${l}</td><td>${d(x)}</td></tr>`).join("")}</table>`;
  return { left: L.length ? tb(L) : "", right: tb(Rr) };
}
function lineNote(v, l) {
  const r = l.res;
  if (!r) return "";
  const s = [];
  if (r.ch) {
    const T = v.st;
    s.push(
      r.ch === "BNPC"
        ? `${T} 5% BNPC ${amt(r.bnpc)}`
        : r.ch === "SP"
          ? "SP 10%, VAT-exempt"
          : r.ch === "VD"
            ? `${T} 20%, VAT due`
            : `${T} 20%, VAT-exempt`,
    );
    if (promoFor(l.sku, v.date || TODAY))
      s.push("sale discount not applied: statutory discount is higher");
  } else if (r.promo) {
    s.push(
      `${r.promoName}${r.stat ? `, applied instead of ${v.st} discount` : ""}`,
    );
  }
  return s.length ? `<br><span class="tag">${esc(s.join("; "))}</span>` : "";
}
function paperHtml(v, c) {
  const f = format(v),
    issued = !!v.no,
    dis = issued ? ' readonly tabindex="-1"' : "",
    b = v.buyer,
    T = v.cur === "PHP" ? v.st : null,
    bx = boxes(v, c, f);
  const rows =
    v.lines
      .map((l, k) => {
        const it = itemOf(l);
        return `<tr><td class="rel">${issued ? `${esc(l.desc)}<span class="tag"> SKU ${esc(l.sku)}, <b>${taxLabel(v, l)}</b></span>` : `<div class="lineb"><input class="f${l.q && !l.sku ? " err" : ""}" data-line="${k}" data-k="q" value="${esc(l.q || l.desc)}" placeholder="${k === 0 ? "Scan, type, or pick from the list" : ""}" aria-label="Item ${k + 1}" autocomplete="off">${listHtml(k, l.sku)}</div>${l.sku ? `<span class="tag">SKU ${esc(l.sku)}, <b>${taxLabel(v, l)}</b></span>` : ""}${sugg.kind === "item" && sugg.row === k ? suggHtml() : ""}`}${lineNote(v, l)}${
          !issued && l.sku && onHand(l.sku) != null
            ? (() => {
                const oh = onHand(l.sku),
                  after = oh - inDraft(l.sku, k) - Number(l.qty || 0);
                return `<span class="tag noprint" style="display:block;${after < 0 ? "color:#B42318;font-weight:700" : ""}">On hand ${oh}; after this sale ${after}</span>`;
              })()
            : ""
        }</td>
     <td class="r" style="width:84px">${issued ? `${l.qty} ${esc(l.uom || "")}` : `<input class="f" style="text-align:right" data-line="${k}" data-k="qty" value="${esc(l.qty)}" inputmode="decimal" aria-label="Quantity ${k + 1}"${l.sku ? "" : " disabled"}>`}</td>
     <td class="r" style="width:96px">${it ? amt(cents(unitPrice(v, it))) : ""}</td>
     <td class="r" style="width:110px">${l.res ? amt(l.res.R) : ""}${!issued && l.sku ? `<button class="x noprint" data-del="${k}" aria-label="Remove item ${k + 1}">×</button>` : ""}</td></tr>`;
      })
      .join("") +
    (c.promo
      ? `<tr class="promo"><td>Less: ${esc([...c.promoNames].join(", "))}</td><td></td><td></td><td class="r">(${amt(c.promo)})</td></tr>`
      : "");
  const kind =
      f === "B3" ? "VAT-EXEMPT SALE" : f === "B4" ? "ZERO-RATED SALE" : "",
    notValid = ["B2", "B3", "B5"].includes(f);
  const stBtns = `<button data-st="" aria-pressed="${!v.st}">None</button>${Object.entries(
    ST,
  )
    .map(
      ([k, s]) =>
        `<button data-st="${k}" aria-pressed="${v.st === k}">${s.label}</button>`,
    )
    .join("")}`;
  const stFields = T
    ? `<div class="g"><span>${esc(ST[T].id)}:</span><input class="f" data-stf="stId" value="${esc(v.stId)}" aria-label="${esc(ST[T].id)}"${dis}><span>Name:</span><input class="f" data-stf="stName" value="${esc(v.stName)}" aria-label="Beneficiary's name"${dis}>
     ${T === "MOV" ? `<span>Beneficiary:</span>${issued ? `<span>${esc(v.stExtra)}</span>` : `<select class="f" data-stf="stExtra" aria-label="Beneficiary type"><option value="">Choose</option>${["Awardee", "Widow or widower", "Dependent"].map((x) => `<option${v.stExtra === x ? " selected" : ""}>${x}</option>`).join("")}</select>`}` : ""}
     ${T === "SP" ? `<span>Child (6 or under):</span><input class="f" data-stf="stExtra" value="${esc(v.stExtra)}" aria-label="Child's name"${dis}>` : ""}
     ${T === "SP" || T === "NAAC" ? `<label class="chk"><input type="checkbox" data-stok="1"${v.stOk ? " checked" : ""}${issued ? " disabled" : ""}> ${T === "SP" ? "Solo Parent ID and booklet checked; income below ₱250,000; prescription for medicines" : "PNSTM ID and booklet checked; NSA endorsement for sports equipment"}</label>` : ""}
     ${T !== "SP" ? `<span>Group meal:</span><span class="g2"><input class="f" data-stf="diners" value="${esc(v.diners)}" placeholder="total diners" inputmode="numeric" aria-label="Total diners"${dis}><input class="f" data-stf="bens" value="${esc(v.bens)}" placeholder="of whom ${ST[T].short}" inputmode="numeric" aria-label="Beneficiary diners"${dis}></span>` : ""}
     <span>Signature:</span><span style="border-bottom:1px solid #1F2937;height:20px"></span></div>`
    : `<div class="g"><span>SC/PWD/NAAC/MOV/<br>Solo Parent ID No.:</span><span></span><span>Signature:</span><span></span></div>`;
  return `<article class="paper" aria-label="Invoice being encoded"><div class="band"></div>${v.reprint ? '<span class="copytag">REPRINTED COPY</span>' : ""}${issued && !v.reprint ? '<div class="stamp">ISSUED</div>' : ""}<div class="in">
   <div class="hdr"><div class="seller"><img src="${SELLER.logo}" alt="Bizmaker logo" style="width:60px;height:60px;object-fit:contain;flex:none"><div><div class="trade">${SELLER.trade}</div>${v.vat ? "" : '<div class="small">Operated by</div>'}<div class="rname">${SELLER.name}</div><div>${v.vat ? SELLER.tinVat : SELLER.tinNon}</div><div class="small">${SELLER.address.toUpperCase()}</div></div></div>
    <div class="title"><div class="big">INVOICE</div>${kind ? `<div class="kind">${kind}</div>` : ""}</div></div>
   <div class="serial">Invoice No. ${issued ? v.no : `<span style="opacity:.55">${db.next} (on issue)</span>`}</div>
   <div class="row2"><div class="cb"><button data-sales="CASH" aria-pressed="${v.sales === "CASH"}"${issued ? " disabled" : ""}>${v.sales === "CASH" ? "☑" : "☐"} CASH SALES</button><button data-sales="CHARGE" aria-pressed="${v.sales === "CHARGE"}"${issued ? " disabled" : ""}>${v.sales === "CHARGE" ? "☑" : "☐"} CHARGE SALES</button>
     <div class="fxrow noprint">Currency: ${issued ? `<b>${v.cur}</b>` : `<select data-cur="1" aria-label="Currency">${["PHP", ...Object.keys(FX)].map((k) => `<option${v.cur === k ? " selected" : ""}>${k}</option>`).join("")}</select>`}</div></div>
    <div><div class="datebox"><div>Date:</div><div>${issued ? dateTxt(new Date((v.date || iso(v.at)) + "T12:00:00")) : v.dateOk ? `<input type="date" class="f" data-date="1" value="${v.date}" max="${TODAY}" aria-label="Date of transaction">` : `${dateTxt(Date.now())} <button class="mini noprint" data-act="unlockdate">Change (supervisor)</button>`}</div></div>
     ${!issued && v.date < TODAY ? `<div style="font-size:11px;border:1px solid #1F2937;border-top:0;padding:4px 8px;max-width:300px"><span style="color:#B42318;font-weight:700">Earlier date.</span> Reason: <input class="f" data-late="1" value="${esc(v.lateReason)}" placeholder="e.g. replaces manual invoice No. 9000012" aria-label="Reason for the earlier date"></div>` : ""}</div></div>
   <div class="sold"><div class="h">SOLD TO:</div><div class="b">
     <span>Registered Name</span><span class="rel"><input class="f" data-buyer="name" value="${esc(b.name)}" aria-label="Buyer's registered name" autocomplete="off"${dis}>${sugg.kind === "buyer" ? suggHtml() : ""}</span>
     <span>TIN</span>${
       b.type === "FOREIGN"
         ? `<span>${issued ? esc(tinTxt(b)) : `<span class="g2"><span style="align-self:center">None (foreign buyer)</span><input class="f" data-buyer="country" value="${esc(b.country || "")}" placeholder="Country" aria-label="Country"></span>`}${issued ? "" : ` <button class="mini noprint" data-foreign="0">Has a Philippine TIN</button>`}</span>`
         : `<span><input class="f${b.tin && !TIN_RE.test(b.tin) ? " err" : ""}" data-buyer="tin" value="${esc(b.tin)}" placeholder="${issued ? "" : "###-###-###-##### (blank for walk-in)"}" aria-label="Buyer TIN"${dis}>${issued ? "" : `<button class="mini noprint" data-foreign="1">Foreign buyer (no Philippine TIN)</button>`}</span>`
     }
     <span>Business Address</span><input class="f" data-buyer="address" value="${esc(b.address)}" aria-label="Buyer address"${dis}>
     ${issued && !b.email ? "" : `<span>Email</span><input class="f" type="email" data-buyer="email" value="${esc(b.email || "")}" placeholder="${issued ? "" : "for the e-invoice"}" aria-label="Buyer email"${dis}>`}</div></div>
   <table class="it"><thead><tr><th>Item Description/<br>Nature of Service</th><th>Quantity</th><th>Unit Price${v.cur !== "PHP" ? ` (${v.cur})` : ""}</th><th>Amount${v.cur !== "PHP" ? ` (${v.cur})` : ""}</th></tr></thead><tbody>${rows}</tbody></table>
   ${v.cur !== "PHP" && c.due ? `<div class="remarks"><b>Currency: ${v.cur}. Peso equivalent at ₱${c.rate.toFixed(4)} per ${v.cur} (${(v.fx || FX[v.cur]).src} rate, ${issued ? dateTxt(v.at) : dateTxt(Date.now())}): total sales ${peso(c.php(c.total))}; VAT ${peso(c.php(c.vat))}; total amount due ${peso(c.php(c.due))}.</b></div>` : ""}
   ${v.date && v.date < (issued ? iso(v.at) : TODAY) && v.lateReason ? `<div class="remarks"><b>Remarks:</b> Date of transaction ${dateTxt(new Date(v.date + "T12:00:00"))}; issued ${dateTxt(issued ? v.at : Date.now())}. Reason: ${esc(v.lateReason)}${v.lateBy ? `; approved by ${esc(v.lateBy)}` : ""}.</div>` : ""}
   ${b.wht && c.wht ? `<div class="remarks">Withholding by buyer: ${Math.round(b.wht * 100)}% (${esc(b.whtNote || "")}).</div>` : ""}
   <div class="bottom"><div>${bx.left}
     ${f === "B1" || f === "B2" ? `<div class="recv">${v.sales === "CASH" ? "☑" : "☐"} Received the amount of<br><span class="line">${v.sales === "CASH" && c.due ? money(v, c.due) : ""}</span></div>` : ""}
     ${notValid ? `<div class="notvalid">“THIS DOCUMENT IS<br>NOT VALID FOR CLAIM<br>OF INPUT TAX.”</div>` : ""}
     ${issued ? `<div class="qr"><div data-qr="${esc(v.verify)}"></div><div>Scan to verify this e-invoice<br>${esc(v.verify.replace("https://", ""))}</div></div>` : ""}</div>
    <div>${bx.right}
     <div class="scbox"><div class="h"><span>Statutory discount:</span>${issued ? `<b>${v.st ? ST[v.st].label : "None"}</b>` : v.cur !== "PHP" ? "<span>peso sales only</span>" : `<span class="stt">${stBtns}</span>`}</div>${stFields}</div></div></div>
   <div class="foot"><div>BIR Permit No.: ${SELLER.permit}<br>PTI Electronic Invoice: ${SELLER.pti}</div><div>${SELLER.branch}<br>Approved series: ${SELLER.series[0]} – ${SELLER.series[1]}</div></div></div></article>`;
}

function listHtml(k, cur) {
  const opt = (i) =>
    `<option value="${i.sku}"${cur === i.sku ? " selected" : ""}>${esc(i.desc)}${onHand(i.sku) != null ? ` (${onHand(i.sku)} on hand)` : ""}</option>`;
  return `<select class="pick noprint" data-select="${k}" aria-label="Choose item ${k + 1} from the list"><option value="">List ▾</option><optgroup label="Services">${ITEMS.filter(
    (i) => onHand(i.sku) == null,
  )
    .map(opt)
    .join("")}</optgroup><optgroup label="Products">${ITEMS.filter(
    (i) => onHand(i.sku) != null,
  )
    .map(opt)
    .join("")}</optgroup></select>`;
}
function suggHtml() {
  if (!sugg.list.length) return "";
  return `<div class="sugg" role="listbox">${sugg.list.map((x, i) => `<div role="option" class="${i === sugg.hi ? "hi" : ""}" data-pick="${i}">${sugg.kind === "item" ? `<b>${esc(x.desc)}</b><small>${esc(x.sku)}, ${peso(cents(x.price))} per ${esc(x.uom)}${x.tax === "EXEMPT" ? ", VAT-exempt" : x.tax === "ZERO_RATED" ? ", zero-rated" : ""}${promoFor(x.sku, TODAY) ? `, on sale ${promoFor(x.sku, TODAY).pct}%` : ""}${onHand(x.sku) != null ? `, <b>${onHand(x.sku)} on hand</b>` : ""}</small>` : `<b>${esc(x.name)}</b><small>${x.type === "FOREIGN" ? `Foreign buyer, ${esc(x.country)}` : x.tin ? esc(x.tin) : "No TIN"}${x.address ? ", " + esc(x.address) : ""}${x.wht ? `, withholds ${Math.round(x.wht * 100)}%` : ""}</small>`}</div>`).join("")}</div>`;
}

function railHtml(v, c, ch, ok) {
  const t = cents(v.tender),
    chg = t - c.due,
    step = v.cur === "PHP" ? [10000, 50000, 100000] : [100, 500, 1000];
  return `<div class="card"><div class="due-label">Amount due</div><div class="due">${money(v, c.due)}</div>
    ${v.cur !== "PHP" ? `<div class="minor"><span>Peso equivalent</span><b>${peso(c.php(c.due))}</b></div>` : ""}
    <div class="minor"><span>Items</span><b>${v.lines.filter((l) => l.sku && Number(l.qty) > 0).length}</b></div>
    ${v.vat ? `<div class="minor"><span>VAT</span><b>${money(v, c.vat)}</b></div>` : ""}
    ${c.promo ? `<div class="minor"><span>Sale discount</span><b>−${money(v, c.promo)}</b></div>` : ""}
    ${c.disc ? `<div class="minor"><span>${ST[v.st].label} discount</span><b>−${money(v, c.disc)}</b></div>` : ""}
    ${c.wht ? `<div class="minor"><span>Withheld by buyer</span><b>−${money(v, c.wht)}</b></div>` : ""}</div>
   ${
     v.sales === "CASH"
       ? `<div class="card tender"><label for="tender">Cash received${v.cur !== "PHP" ? ` (${v.cur})` : ""}</label><input id="tender" data-tender="1" inputmode="decimal" value="${esc(v.tender)}" placeholder="0.00">
    <div class="quick">${[c.due, ...step.map((s) => Math.ceil(c.due / s) * s)]
      .filter((x, i, a) => x > 0 && a.indexOf(x) === i)
      .map((x) => `<button data-quick="${x}">${money(v, x)}</button>`)
      .join("")}</div>
    <div class="change"><span class="due-label">Change</span><b id="chg" style="color:${chg < 0 ? "var(--bad)" : "var(--ink)"}">${t ? money(v, Math.max(chg, 0)) : "—"}</b></div></div>`
       : `<div class="card"><div class="due-label">Charge sale</div><p class="limits" style="margin:4px 0 0">Collected later with a Collection Receipt from the office.</p></div>`
   }
   <div class="card"><ul class="checks" id="checks">${ch.map(([k, l]) => `<li class="${k ? "" : "no"}">${l}</li>`).join("")}</ul>${
     warns(v).length
       ? `<ul class="checks" style="margin-top:8px">${warns(v)
           .map(
             (w) => `<li class="no" style="color:var(--warn)">${esc(w)}</li>`,
           )
           .join("")}</ul>`
       : ""
   }</div>
   <button class="issue" data-act="issue"${ok ? "" : " disabled"}>Issue invoice</button><div class="kbd">Ctrl + Enter issues the invoice. Enter moves to the next field.</div>
   <div class="card limits"><b>Your access:</b> issue invoices, apply statutory discounts with the buyer's ID, choose the currency, reprint and send your own invoices. <b>Set by the office:</b> prices, promotions, exchange rates, withholding and discount coverage. <b>Needs a supervisor:</b> price changes, other discounts, voids, returns and corrections.</div>`;
}
function viewedRail(v, c) {
  return `<div class="card"><div class="due-label">Invoice No. ${v.no}</div><div class="due">${money(v, c.due)}</div>
    ${v.cur !== "PHP" ? `<div class="minor"><span>Peso equivalent</span><b>${peso(c.php(c.due))}</b></div>` : ""}
    <div class="minor"><span>${v.sales === "CASH" ? "Cash received" : "Charge sale"}</span><b>${v.sales === "CASH" ? money(v, cents(v.tender)) : "—"}</b></div>${v.sales === "CASH" ? `<div class="minor"><span>Change given</span><b>${money(v, Math.max(cents(v.tender) - c.due, 0))}</b></div>` : ""}
    <div class="minor"><span>Issued</span><b>${timeOf(v.at)}</b></div></div>
   <button class="issue" data-act="next">Next customer</button>
   <div class="card" style="display:flex;flex-direction:column;gap:8px"><button class="btn" data-act="print">Print copy for buyer</button>
    <button class="btn" data-act="download-pdf"><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align:-2px;margin-right:4px"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>Download PDF</button>
    <button class="btn" data-act="email"${v.buyer.email ? "" : " disabled"}>Email to ${v.buyer.email ? esc(v.buyer.email) : "buyer (no email on file)"}</button>
    <button class="btn" data-act="qrshown">Buyer scanned the QR code</button><button class="btn" data-act="correct">Request correction or void</button></div>
   ${v.sent && v.sent.length ? `<div class="card limits">${v.sent.map((s) => `Sent by ${esc(s)}`).join("<br>")}</div>` : ""}
   <div class="card limits">Issued invoices are locked. Any correction is made by a supervisor through a credit memo or a new invoice.</div>`;
}

function modalHtml() {
  const m = modal;
  if (m === "today") {
    const list = mine().slice().reverse();
    return `<div class="modal" role="dialog" aria-modal="true" aria-label="Today's invoices"><div class="box"><h2>Your invoices today</h2>
   ${list.length ? `<table><thead><tr><th>No.</th><th>Time</th><th>Buyer</th><th>Sale</th><th class="num">Amount</th></tr></thead><tbody>${list.map((i) => `<tr class="pick" data-open="${i.no}" tabindex="0"><td>${i.no}</td><td>${timeOf(i.at)}</td><td>${esc(i.buyer.name)}</td><td>${i.sales === "CASH" ? "Cash" : "Charge"}</td><td class="num">${money(i, calc(i).due)}</td></tr>`).join("")}</tbody></table>` : `<p>No invoices yet this shift. Scan or type the first item on the form to start.</p>`}
   <p class="limits">Open one to reprint it or send it again.</p><button class="btn" data-act="close">Close</button></div></div>`;
  }
  if (m === "shift") {
    const list = mine(),
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
      byST = {},
      fx = {};
    list.forEach((i) => {
      const c = calc(i),
        p = c.php;
      t.gross += p(c.total);
      t.vatable += p(c.vatable);
      t.vat += p(c.vat);
      t.exempt += p(c.exempt + c.sspt);
      t.zero += p(c.zero);
      t.promo += p(c.promo);
      t.wht += p(c.wht);
      if (i.st && c.disc) byST[i.st] = (byST[i.st] || 0) + c.disc;
      if (i.cur !== "PHP") {
        fx[i.cur] = (fx[i.cur] || 0) + (i.sales === "CASH" ? c.due : 0);
      } else if (i.sales === "CASH") t.cash += c.due;
      if (i.sales === "CHARGE") t.charge += p(c.due);
    });
    const nos = list.map((i) => i.no),
      row = (l, x, b) =>
        `<tr><td>${b ? `<b>${l}</b>` : l}</td><td class="num">${b ? `<b>${x}</b>` : x}</td></tr>`;
    return `<div class="modal" role="dialog" aria-modal="true" aria-label="End of shift summary"><div class="box"><h2>End of shift, ${esc(me.name)}</h2>
    <table><tbody>${row("Invoices issued", `${t.n}${nos.length ? ` (No. ${Math.min(...nos)} to ${Math.max(...nos)})` : ""}`)}${row("Total sales, in pesos", peso(t.gross))}${STORE.vat ? row("VATable sales", peso(t.vatable)) + row("VAT", peso(t.vat)) + row("Zero-rated sales", peso(t.zero)) : ""}${row(STORE.vat ? "VAT-exempt sales" : "Exempt and percentage-tax sales", peso(t.exempt))}
     ${row("Sale discounts (promotions)", peso(t.promo))}${Object.entries(byST)
       .map(([k, x]) => row(`${ST[k].label} discounts`, peso(x)))
       .join("")}${row("Withheld by buyers", peso(t.wht))}
     ${row("Cash to remit, pesos", peso(t.cash), 1)}${Object.entries(fx)
       .map(([k, x]) => row(`Cash to remit, ${k}`, `${k} ${amt(x)}`, 1))
       .join(
         "",
       )}${row("Charge sales, in pesos", peso(t.charge))}</tbody></table>
    <p class="limits">Count the cash drawer per currency against "Cash to remit" and hand this summary to your supervisor.</p><div style="display:flex;gap:8px"><button class="btn" data-act="close">Close</button><button class="btn" data-act="signout">End shift and sign out</button></div></div></div>`;
  }
  if (m === "unlock")
    return `<div class="modal" role="dialog" aria-modal="true" aria-label="Supervisor approval"><div class="box"><h2>Supervisor approval to change the date</h2>
    <p class="limits" style="margin-top:0">Invoices are issued on the date of the sale. An earlier date is allowed only with a supervisor's approval and a reason, for example to replace a manual invoice issued during a system downtime. Future dates are never allowed.</p>
    <label for="spin" style="display:block;font-size:13px;font-weight:600;color:var(--muted)">Supervisor PIN (demo: 9999)</label><input id="spin" type="password" inputmode="numeric" maxlength="4" style="width:100%;font-size:22px;padding:8px;border:1px solid var(--line);border-radius:8px;background:var(--rail)">
    <div class="err" id="serr"></div><div style="display:flex;gap:8px;margin-top:10px"><button class="btn" data-act="close">Cancel</button><button class="btn" data-act="spinok" style="border-color:var(--go);color:var(--go)">Approve</button></div></div></div>`;
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
    return `<div class="modal" role="dialog" aria-modal="true" aria-label="Ask supervisor"><div class="box"><h2>${m === "correct" ? `Request correction of Invoice No. ${(view || {}).no}` : "Ask a supervisor"}</h2>
    <p class="limits" style="margin-top:0">${m === "correct" ? "The invoice stays as issued. The supervisor corrects it with a credit memo, a correction notice or a new invoice." : "These need a supervisor's authority. The request appears on the supervisor's screen with your name."}</p>
    ${kinds.map((k, i) => `<label style="display:flex;gap:8px;align-items:center;padding:6px 0"><input type="radio" name="hk" value="${esc(k)}"${i === 0 ? " checked" : ""}> ${esc(k)}</label>`).join("")}
    <label for="hnote" style="display:block;font-size:13px;font-weight:600;color:var(--muted);margin-top:8px">Details</label><input id="hnote" style="width:100%;padding:9px;border:1px solid var(--line);border-radius:8px;background:var(--rail)">
    <div style="display:flex;gap:8px;margin-top:14px"><button class="btn" data-act="close">Cancel</button><button class="btn" data-act="sendreq" style="border-color:var(--go);color:var(--go)">Send to supervisor</button></div></div></div>`;
  }
  return "";
}
function renderQR() {
  document.querySelectorAll("[data-qr]").forEach((el) => {
    try {
      new QRCode(el, {
        text: el.dataset.qr,
        width: 88,
        height: 88,
        correctLevel: QRCode.CorrectLevel.M,
      });
    } catch (e) {
      el.textContent = "[QR]";
    }
  });
}
function refresh() {
  const a = document.activeElement,
    key =
      a &&
      [
        a.dataset.line,
        a.dataset.k,
        a.dataset.buyer,
        a.dataset.stf,
        a.dataset.tender,
        a.dataset.late,
      ].join("|"),
    pos = a && a.selectionStart;
  render();
  if (key && key !== "|||||") {
    const el = [...document.querySelectorAll("input")].find(
      (e) =>
        [
          e.dataset.line,
          e.dataset.k,
          e.dataset.buyer,
          e.dataset.stf,
          e.dataset.tender,
          e.dataset.late,
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

/* ============ Lookup ============ */
function findItems(q) {
  q = q.trim().toLowerCase();
  if (!q) return [];
  return ITEMS.filter(
    (i) =>
      i.barcode === q ||
      i.sku.toLowerCase().includes(q) ||
      i.desc.toLowerCase().includes(q),
  ).slice(0, 6);
}
function findBuyers(q) {
  q = q.trim().toLowerCase();
  const d = q.replace(/\D/g, "");
  return CUSTOMERS.filter(
    (c) =>
      !q ||
      c.name.toLowerCase().includes(q) ||
      (d.length >= 3 && c.tin.replace(/\D/g, "").includes(d)),
  ).slice(0, 6);
}
function pickItem(k, it) {
  const l = inv.lines[k];
  Object.assign(l, {
    sku: it.sku,
    desc: it.desc,
    uom: it.uom,
    q: "",
    qty: l.qty || "1",
  });
  if (inv.lines.every((x) => x.sku)) inv.lines.push(blankLine());
  sugg = { row: -1, list: [], hi: 0, kind: null };
  refresh();
  const q = document.querySelector(`[data-line="${k}"][data-k="qty"]`);
  if (q) {
    q.focus();
    q.select();
  }
}
function pickBuyer(b) {
  inv.buyer = { ...b };
  sugg = { row: -1, list: [], hi: 0, kind: null };
  refresh();
  const n = document.querySelector(
    '[data-buyer="tin"],[data-buyer="country"],[data-buyer="address"]',
  );
  if (n) n.focus();
}

/* ============ Issue ============ */
function issue() {
  if (!me || !inv || view || !checks(inv).every((x) => x[0])) return;
  if (db.next > SELLER.series[1]) {
    toast("The invoice series is used up. Call a supervisor.");
    return;
  }
  calc(inv);
  const no = db.next++,
    on = inv.date;
  const d = {
    ...inv,
    st: inv.cur === "PHP" ? inv.st : null,
    fx: inv.cur !== "PHP" ? { ...FX[inv.cur] } : null,
    lines: inv.lines
      .filter((l) => l.sku && Number(l.qty) > 0)
      .map((l) => {
        const p = promoFor(l.sku, on);
        const it = itemBy(l.sku);
        return {
          frozen: {
            sku: it.sku,
            desc: it.desc,
            uom: it.uom,
            price: it.price,
            tax: it.tax,
            cov: { ...it.cov },
          },
          sku: l.sku,
          desc: l.desc,
          qty: l.qty,
          uom: l.uom,
          promoPct: l.res && l.res.promo ? p.pct : 0,
          promoName: l.res && l.res.promo ? p.name : "",
          bnpc: l.res ? l.res.bnpc : 0,
        };
      }),
    no,
    at: Date.now(),
    date: inv.date,
    lateReason: inv.date < TODAY ? inv.lateReason : "",
    lateBy: inv.date < TODAY ? SUPERVISOR.name : "",
    issued: true,
    cashier: me.id,
    cashierName: me.name,
    sent: [],
    verify: `https://verify.talaan.ph/v/${Math.random().toString(16).slice(2, 10)}${Date.now().toString(16).slice(-8)}`,
  };
  d.lines.forEach((l) => {
    if (db.stock[l.sku] != null) db.stock[l.sku] -= Number(l.qty);
  });
  db.invoices.push(d);
  save();
  view = d;
  inv = null;
  render();
  toast(`Invoice No. ${no} issued`);
}

/* ============ Events ============ */
document.addEventListener("click", (e) => {
  const s = e.target.closest("[data-sales]");
  if (s && inv && !view) {
    inv.sales = s.dataset.sales;
    render();
    return;
  }
  const st = e.target.closest("[data-st]");
  if (st && inv && !view) {
    inv.st = st.dataset.st || null;
    inv.stExtra = "";
    inv.stOk = false;
    if (!inv.st) {
      inv.stId = "";
      inv.stName = "";
      inv.diners = "";
      inv.bens = "";
    }
    render();
    const f = document.querySelector('[data-stf="stId"]');
    if (f) f.focus();
    return;
  }
  const fb = e.target.closest("[data-foreign]");
  if (fb && inv) {
    if (fb.dataset.foreign === "1") {
      inv.buyer.type = "FOREIGN";
      inv.buyer.tin = "";
      inv.buyer.wht = 0;
    } else {
      inv.buyer.type = inv.buyer.tin ? "VAT" : "B2C";
      inv.buyer.country = "";
    }
    render();
    return;
  }
  const pk = e.target.closest("[data-pick]");
  if (pk) {
    const x = sugg.list[+pk.dataset.pick];
    if (sugg.kind === "item") pickItem(sugg.row, x);
    else pickBuyer(x);
    return;
  }
  const del = e.target.closest("[data-del]");
  if (del && inv) {
    inv.lines.splice(+del.dataset.del, 1);
    while (inv.lines.length < 4) inv.lines.push(blankLine());
    render();
    return;
  }
  const q = e.target.closest("[data-quick]");
  if (q && inv) {
    inv.tender = (+q.dataset.quick / 100).toFixed(2);
    refresh();
    return;
  }
  const op = e.target.closest("[data-open]");
  if (op) {
    view = {
      ...db.invoices.find((i) => i.no === +op.dataset.open),
      reprint: true,
    };
    modal = null;
    render();
    return;
  }
  const a = e.target.closest("[data-act]");
  if (!a) {
    if (sugg.kind && !e.target.closest(".sugg")) {
      sugg = { row: -1, list: [], hi: 0, kind: null };
      refresh();
    }
    return;
  }
  const act = a.dataset.act;
  if (act === "signin") {
    const k = CASHIERS.find((x) => x.id === $("#who").value);
    if ($("#pin").value === k.pin) {
      me = k;
      shiftStart = Date.now();
      newInvoice();
      render();
      setTimeout(() => {
        const f = document.querySelector('[data-line="0"][data-k="q"]');
        if (f) f.focus();
      }, 50);
    } else $("#perr").textContent = "Wrong PIN. Try again.";
  }
  if (act === "signout") {
    me = null;
    inv = null;
    view = null;
    modal = null;
    render();
  }
  if (act === "issue") issue();
  if (act === "next") {
    newInvoice();
    render();
    const f = document.querySelector('[data-line="0"][data-k="q"]');
    if (f) f.focus();
  }
  if (act === "print") window.print();
  if (act === "download-pdf") {
    const inv = view;
    if (!inv) return;
    const paper = document.querySelector(".paper");
    if (!paper) {
      window.print();
      return;
    }
    const filename = `Invoice-${inv.no}.pdf`;
    toast("Generating invoice PDF...");
    if (typeof html2pdf !== "undefined") {
      const opt = {
        margin: [8, 8, 8, 8],
        filename: filename,
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true, letterRendering: true, logging: false },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        pagebreak: { mode: ["avoid-all", "css", "legacy"] },
      };
      const worker = html2pdf().set(opt).from(paper);
      worker
        .save()
        .then(() => toast(`Downloaded ${filename}`))
        .catch(() => {
          document.querySelectorAll(".html2pdf__container").forEach((el) => el.remove());
          window.print();
        });
      return;
    }
    window.print();
  }
  if ((act === "email" || act === "qrshown") && view) {
    const d = db.invoices.find((i) => i.no === view.no);
    d.sent.push(
      act === "email"
        ? `email to ${d.buyer.email}, ${timeOf(Date.now())}`
        : `QR code scanned by buyer, ${timeOf(Date.now())}`,
    );
    view.sent = d.sent;
    save();
    render();
    toast(
      act === "email" ? "E-invoice emailed (demo)" : "Delivery by QR recorded",
    );
  }
  if (["today", "shift", "help", "correct"].includes(act)) {
    modal = act;
    render();
  }
  if (act === "close") {
    modal = null;
    render();
  }
  if (act === "unlockdate" && inv) {
    modal = "unlock";
    render();
    setTimeout(() => {
      const f = $("#spin");
      if (f) f.focus();
    }, 30);
  }
  if (act === "spinok") {
    if ($("#spin").value === SUPERVISOR.pin) {
      inv.dateOk = true;
      db.requests.push({
        at: Date.now(),
        cashier: me.name,
        kind: "Date change approved",
        note: SUPERVISOR.name,
        invoice: null,
      });
      save();
      modal = null;
      render();
      const f = document.querySelector("[data-date]");
      if (f) f.focus();
    } else $("#serr").textContent = "Wrong PIN.";
  }
  if (act === "sendreq") {
    const k = document.querySelector('input[name="hk"]:checked').value,
      n = $("#hnote").value.trim();
    db.requests.push({
      at: Date.now(),
      cashier: me.name,
      kind: k,
      note: n,
      invoice: modal === "correct" && view ? view.no : null,
    });
    save();
    modal = null;
    render();
    toast("Sent to the supervisor");
  }
});
document.addEventListener("change", (e) => {
  const el = e.target;
  if (el.dataset.store) {
    STORE.vat = el.value === "1";
    return;
  }
  if (!inv || view) return;
  if (el.dataset.cur) {
    inv.cur = el.value;
    if (inv.cur !== "PHP") {
      inv.st = null;
      inv.stId = "";
      inv.stName = "";
    }
    inv.tender = "";
    render();
    return;
  }
  if (el.dataset.select != null) {
    const it = itemBy(el.value);
    if (it) pickItem(+el.dataset.select, it);
    return;
  }
  if (el.dataset.stok) {
    inv.stOk = el.checked;
    refresh();
    return;
  }
  if (el.dataset.date) {
    inv.date = el.value && el.value <= TODAY ? el.value : TODAY;
    render();
    return;
  }
  if (el.dataset.stf === "stExtra" && el.tagName === "SELECT") {
    inv.stExtra = el.value;
    refresh();
    return;
  }
});
document.addEventListener("input", (e) => {
  const el = e.target;
  if (!inv || view) return;
  if (el.dataset.line != null) {
    const k = +el.dataset.line,
      l = inv.lines[k];
    if (el.dataset.k === "q") {
      l.q = el.value;
      if (l.sku && el.value !== l.desc)
        Object.assign(l, { sku: "", desc: "", qty: "" });
      const exact = ITEMS.find((i) => i.barcode === el.value.trim());
      if (exact) {
        pickItem(k, exact);
        return;
      }
      sugg = { row: k, list: findItems(el.value), hi: 0, kind: "item" };
      refresh();
      return;
    }
    if (el.dataset.k === "qty") {
      l.qty = el.value.replace(/[^0-9.]/g, "");
      refresh();
      return;
    }
  }
  if (el.dataset.buyer) {
    const f = el.dataset.buyer;
    inv.buyer[f] = el.value;
    if (f === "name") {
      const known = CUSTOMERS.find((c) => c.name === el.value);
      if (!known && inv.buyer.type !== "FOREIGN") {
        inv.buyer.type = inv.buyer.tin ? "VAT" : "B2C";
        inv.buyer.wht = 0;
      }
      sugg = { row: -1, list: findBuyers(el.value), hi: 0, kind: "buyer" };
    }
    if (f === "tin" && inv.buyer.type === "B2C" && el.value)
      inv.buyer.type = "VAT";
    refresh();
    return;
  }
  if (el.dataset.stf && el.tagName === "INPUT") {
    inv[el.dataset.stf] = el.value;
    refresh();
    return;
  }
  if (el.dataset.tender) {
    inv.tender = el.value.replace(/[^0-9.]/g, "");
    refresh();
    return;
  }
  if (el.dataset.late) {
    inv.lateReason = el.value;
    refresh();
    return;
  }
});
document.addEventListener("keydown", (e) => {
  if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
    e.preventDefault();
    issue();
    return;
  }
  if (e.key === "Escape") {
    if (modal) {
      modal = null;
      render();
      return;
    }
    if (sugg.kind) {
      sugg = { row: -1, list: [], hi: 0, kind: null };
      refresh();
    }
    return;
  }
  const el = e.target;
  if (e.key === "Enter" && el.id === "spin") {
    document.querySelector('[data-act="spinok"]').click();
    return;
  }
  if (!me && e.key === "Enter" && el.id === "pin") {
    document.querySelector('[data-act="signin"]').click();
    return;
  }
  if (el.closest && el.closest("tr.pick") && e.key === "Enter") {
    el.click();
    return;
  }
  if (
    sugg.kind &&
    sugg.list.length &&
    (e.key === "ArrowDown" || e.key === "ArrowUp")
  ) {
    e.preventDefault();
    sugg.hi =
      (sugg.hi + (e.key === "ArrowDown" ? 1 : -1) + sugg.list.length) %
      sugg.list.length;
    refresh();
    return;
  }
  if (e.key !== "Enter" || !inv || view) return;
  if (sugg.kind && sugg.list.length) {
    e.preventDefault();
    const x = sugg.list[sugg.hi];
    if (sugg.kind === "item") pickItem(sugg.row, x);
    else pickBuyer(x);
    return;
  }
  if (el.dataset.k === "qty") {
    e.preventDefault();
    const k = +el.dataset.line;
    if (k + 1 >= inv.lines.length) inv.lines.push(blankLine());
    refresh();
    const n = document.querySelector(`[data-line="${k + 1}"][data-k="q"]`);
    if (n) n.focus();
    return;
  }
  if (el.dataset.buyer) {
    e.preventDefault();
    const order = ["name", "tin", "country", "address"].filter((k) =>
        document.querySelector(`[data-buyer="${k}"]`),
      ),
      i = order.indexOf(el.dataset.buyer);
    const n =
      i < order.length - 1
        ? document.querySelector(`[data-buyer="${order[i + 1]}"]`)
        : document.querySelector('[data-line="0"][data-k="q"]');
    if (n) n.focus();
  }
});
render();
