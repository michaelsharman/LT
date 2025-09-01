import { a as x } from "./extensionsFactory-CJF5B414.js";
import w from "./logger.js";
const L = {
  ariaCountOnNav: () => import("./assessment/extensions/ariaCountOnNav.js"),
  blockGrammarChecks: () => import("./assessment/extensions/blockGrammarChecks.js"),
  blueLightFilter: () => import("./assessment/extensions/blueLightFilter.js"),
  checkAnswerValidation: () => import("./assessment/extensions/checkAnswerValidation.js"),
  columnResizer: () => import("./assessment/extensions/columnResizer.js"),
  contentTabs: () => import("./assessment/extensions/contentTabs.js"),
  disableOnValidate: () => import("./assessment/extensions/disableOnValidate.js"),
  events: () => import("./assessment/extensions/events.js"),
  hideAlternatives: () => import("./assessment/extensions/hideAlternatives.js"),
  keyboardShortcuts: () => import("./assessment/extensions/keyboardShortcuts.js"),
  magnifier: () => import("./assessment/extensions/magnifier.js"),
  mcqLabelPrefix: () => import("./assessment/extensions/mcqLabelPrefix.js"),
  networkStatus: () => import("./assessment/extensions/networkStatus.js"),
  periodicTable: () => import("./assessment/extensions/resources/periodicTable.js"),
  readingMask: () => import("./assessment/extensions/readingMask.js"),
  renderPDF: () => import("./assessment/extensions/renderPDF.js"),
  resetResponse: () => import("./assessment/extensions/resetResponse.js"),
  toggleTimer: () => import("./assessment/extensions/toggleTimer.js"),
  whiteNoise: () => import("./assessment/extensions/whiteNoise.js")
}, P = {
  contentTabs: () => import("./authoring/extensions/contentTabs.js"),
  createTags: () => import("./authoring/extensions/createTags.js"),
  dynamicContent: () => import("./authoring/extensions/dynamicContent.js"),
  essayMaxLength: () => import("./authoring/extensions/essayMaxLength.js"),
  imageUploader: () => import("./authoring/extensions/imageUploader.js"),
  languageTextDirection: () => import("./authoring/extensions/languageTextDirection.js"),
  nativeTabs: () => import("./authoring/extensions/nativeTabs.js"),
  renderPDF: () => import("./authoring/extensions/renderPDF.js"),
  requiredTags: () => import("./authoring/extensions/requiredTags.js"),
  singleQuestion: () => import("./authoring/extensions/singleQuestion.js")
}, F = { assessment: L, authoring: P }, p = () => performance.now(), _ = window.__LT_PERF = window.__LT_PERF || [];
function M(s) {
  _.push(s);
}
function S({ limit: s = 50 } = {}) {
  const o = (t) => Number.isFinite(t) ? Math.round((t + Number.EPSILON) * 1e3) / 1e3 : t, i = (t, l) => t.reduce((a, c) => a + (Number.isFinite(c[l]) ? c[l] : 0), 0), m = /* @__PURE__ */ new Map();
  for (const t of _)
    m.has(t.id) || m.set(t.id, []), m.get(t.id).push(t);
  const u = [];
  for (const [t, l] of m) {
    if (t === "__init__")
      continue;
    const a = { id: t, importMs: 0, cssMs: 0, runMs: 0, totalMs: 0 };
    for (const c of l)
      c.phase === "import" ? a.importMs += c.ms : c.phase === "css" ? a.cssMs += c.ms : c.phase === "run" && (a.runMs += c.ms);
    a.totalMs = a.importMs + a.cssMs + a.runMs, u.push(a);
  }
  u.sort((t, l) => l.totalMs - t.totalMs);
  const y = u.slice(0, s).map((t) => ({
    id: t.id,
    importMs: o(t.importMs),
    cssMs: o(t.cssMs),
    runMs: o(t.runMs),
    totalMs: o(t.totalMs)
  })), g = {
    id: "TOTAL",
    importMs: o(i(u, "importMs")),
    cssMs: o(i(u, "cssMs")),
    runMs: o(i(u, "runMs")),
    totalMs: o(i(u, "totalMs"))
  };
  y.push(g), console.groupCollapsed("[LT] extension performance"), console.table(y, ["id", "importMs", "cssMs", "runMs", "totalMs"]), console.groupEnd();
}
function C(s, n = "lt-extensions") {
  if (!s || typeof document > "u")
    return;
  let r = document.head.querySelector(`style#${n}`);
  r || (r = document.createElement("style"), r.id = n, r.setAttribute("data-style", "LT Extension Styles"), document.head.append(r)), r.textContent = s;
}
function k(s) {
  return typeof s == "string" ? { id: s, args: [] } : s || { id: "" };
}
async function A(s, n) {
  const r = F[s]?.[n];
  if (!r)
    throw new Error(`[LT] Unknown extension id "${n}"`);
  const o = p(), i = await r();
  if (M({ id: n, phase: "import", ms: p() - o }), i[n]?.run)
    return i[n];
  if (i.default?.run)
    return i.default;
  for (const m of Object.values(i))
    if (m && typeof m.run == "function")
      return m;
  throw new Error(`[LT] Extension "${n}" does not export a runnable module`);
}
function N(s, n) {
  const r = p();
  let o = "";
  try {
    typeof n.getStyles == "function" ? o = String(n.getStyles() || "") : typeof n.styles == "string" && (o = n.styles || "");
  } catch (i) {
    w.warn(`[LT] getStyles() threw for "${s}"`, i);
  } finally {
    o && M({ id: s, phase: "css", ms: p() - r });
  }
  return o;
}
async function D(s, n, r, { mode: o = "sequential", collectCSS: i = !0, dedupeCSS: m = !0, mountId: u = "lt-extensions", security: y = {}, request: g = {} } = {}) {
  const t = p();
  x(s, y, g);
  const l = (n || []).map(k);
  s.extensions ||= {};
  const a = [], c = /* @__PURE__ */ new Set(), E = (e) => Array.isArray(e) ? e : e === void 0 ? [] : [e];
  async function b({ id: e, args: f = [] }) {
    const h = await A(r, e);
    s.extensions[e] = h;
    const T = p();
    try {
      const d = h.run(...E(f));
      d && typeof d.then == "function" && await d;
    } finally {
      M({ id: e, phase: "run", ms: p() - T });
    }
    if (i) {
      const d = N(e, h).trim();
      d && (!m || !c.has(e)) && (a.push(`/* ${e} */
${d}`), m && c.add(e));
    }
  }
  if (o === "parallel") {
    const e = l.map((f) => b(f).catch((h) => w.error(`[LT] Failed to init extension "${f.id}"`, h)));
    await Promise.allSettled(e);
  } else
    for (const e of l)
      try {
        await b(e);
      } catch (f) {
        w.error(`[LT] Failed to init extension "${e.id}"`, f);
      }
  if (i && a.length) {
    const e = p();
    C(a.join(`

`), u), M({ id: "__init__", phase: "css:inject", ms: p() - e });
  }
  M({ id: "__init__", phase: "total", ms: p() - t }), S();
}
export {
  F as E,
  D as r
};
