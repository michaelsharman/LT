import { a as L } from "./extensionsFactory-BHOEyOSK.js";
import _ from "./logger.js";
const F = {
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
}, S = {
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
}, C = { assessment: F, authoring: S }, l = () => performance.now();
let M = null;
function k() {
  return M || (M = window.__LT_PERF = window.__LT_PERF || []), M;
}
function g(s, e) {
  s && k().push(e);
}
function A(s, { limit: e = 50 } = {}) {
  if (!s || !M || !M.length)
    return;
  const p = 10 ** 3, o = (t) => Number.isFinite(t) ? Math.round((t + Number.EPSILON) * p) / p : t, i = (t, f) => t.reduce((c, u) => c + (Number.isFinite(u[f]) ? u[f] : 0), 0), m = /* @__PURE__ */ new Map();
  for (const t of M)
    m.has(t.id) || m.set(t.id, []), m.get(t.id).push(t);
  const r = [];
  for (const [t, f] of m) {
    if (t === "__init__")
      continue;
    const c = { id: t, importMs: 0, cssMs: 0, runMs: 0, totalMs: 0 };
    for (const u of f)
      u.phase === "import" ? c.importMs += u.ms : u.phase === "css" ? c.cssMs += u.ms : u.phase === "run" && (c.runMs += u.ms);
    c.totalMs = c.importMs + c.cssMs + c.runMs, r.push(c);
  }
  r.sort((t, f) => f.totalMs - t.totalMs);
  const w = r.slice(0, e).map((t) => ({
    id: t.id,
    importMs: o(t.importMs),
    cssMs: o(t.cssMs),
    runMs: o(t.runMs),
    totalMs: o(t.totalMs)
  }));
  w.push({
    id: "TOTAL",
    importMs: o(i(r, "importMs")),
    cssMs: o(i(r, "cssMs")),
    runMs: o(i(r, "runMs")),
    totalMs: o(i(r, "totalMs"))
  }), console.groupCollapsed("[LT] extension performance"), console.table(w, ["id", "importMs", "cssMs", "runMs", "totalMs"]), console.groupEnd();
}
function N(s, e = "lt-extensions") {
  if (!s || typeof document > "u")
    return;
  let a = document.head.querySelector(`style#${e}`);
  a || (a = document.createElement("style"), a.id = e, a.setAttribute("data-style", "LT Extension Styles"), document.head.append(a)), a.textContent = s;
}
function $(s) {
  return typeof s == "string" ? { id: s, args: [] } : s || { id: "" };
}
async function v(s, e, a) {
  const p = C[s]?.[e];
  if (!p)
    throw new Error(`[LT] Unknown extension id "${e}"`);
  const o = l(), i = await p();
  if (g(a, { id: e, phase: "import", ms: l() - o }), i[e]?.run)
    return i[e];
  if (i.default?.run)
    return i.default;
  for (const m of Object.values(i))
    if (m && typeof m.run == "function")
      return m;
  throw new Error(`[LT] Extension "${e}" does not export a runnable module`);
}
function D(s, e, a) {
  const p = l();
  let o = "";
  try {
    typeof e.getStyles == "function" ? o = String(e.getStyles() || "") : typeof e.styles == "string" && (o = e.styles || "");
  } catch (i) {
    _.warn(`[LT] getStyles() threw for "${s}"`, i);
  } finally {
    a && o && g(!0, { id: s, phase: "css", ms: l() - p });
  }
  return o;
}
async function j(s, e, a, { mode: p = "sequential", collectCSS: o = !0, dedupeCSS: i = !0, mountId: m = "lt-extensions", perf: r = !1, perfLimit: w = 50, security: t = {}, request: f = {} } = {}) {
  const c = l();
  L(s);
  const u = (e || []).map($);
  s.extensions ||= {};
  const b = [], E = /* @__PURE__ */ new Set(), x = (n) => Array.isArray(n) ? n : n === void 0 ? [] : [n];
  async function T({ id: n, args: d = [] }) {
    const y = await v(a, n, r);
    s.extensions[n] = y;
    const P = l();
    try {
      const h = y.run(...x(d));
      h && typeof h.then == "function" && await h;
    } finally {
      g(r, { id: n, phase: "run", ms: l() - P });
    }
    if (o) {
      const h = D(n, y, r).trim();
      h && (!i || !E.has(n)) && (b.push(`/* ${n} */
${h}`), i && E.add(n));
    }
  }
  if (p === "parallel") {
    const n = u.map((d) => T(d).catch((y) => _.error(`[LT] Failed to init extension "${d.id}"`, y)));
    await Promise.allSettled(n);
  } else
    for (const n of u)
      try {
        await T(n);
      } catch (d) {
        _.error(`[LT] Failed to init extension "${n.id}"`, d);
      }
  if (o && b.length) {
    const n = l();
    N(b.join(`

`), m), g(r, { id: "__init__", phase: "css:inject", ms: l() - n });
  }
  g(r, { id: "__init__", phase: "total", ms: l() - c }), A(r, { limit: w });
}
export {
  C as E,
  j as r
};
