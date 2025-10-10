import { a as E } from "./extensionsFactory-BHOEyOSK.js";
import b from "./logger.js";
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
}, L = {
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
}, P = { assessment: F, authoring: L }, d = () => performance.now();
let w = null;
function v() {
  return w || (w = window.__LT_PERF = window.__LT_PERF || []), w;
}
function x(a, t) {
  a && v().push(t);
}
function k(a, { limit: t = 50 } = {}) {
  if (!a || !w || !w.length)
    return;
  const i = 10 ** 3, s = (o) => Number.isFinite(o) ? Math.round((o + Number.EPSILON) * i) / i : o, r = (o, h) => o.reduce((l, p) => l + (Number.isFinite(p[h]) ? p[h] : 0), 0), u = /* @__PURE__ */ new Map();
  for (const o of w)
    u.has(o.id) || u.set(o.id, []), u.get(o.id).push(o);
  const m = [];
  for (const [o, h] of u) {
    if (o === "__init__")
      continue;
    const l = { id: o, importMs: 0, cssMs: 0, runMs: 0, totalMs: 0 };
    for (const p of h)
      p.phase === "import" ? l.importMs += p.ms : p.phase === "css" ? l.cssMs += p.ms : p.phase === "run" && (l.runMs += p.ms);
    l.totalMs = l.importMs + l.cssMs + l.runMs, m.push(l);
  }
  m.sort((o, h) => h.totalMs - o.totalMs);
  const f = m.slice(0, t).map((o) => ({
    id: o.id,
    importMs: s(o.importMs),
    cssMs: s(o.cssMs),
    runMs: s(o.runMs),
    totalMs: s(o.totalMs)
  }));
  f.push({
    id: "TOTAL",
    importMs: s(r(m, "importMs")),
    cssMs: s(r(m, "cssMs")),
    runMs: s(r(m, "runMs")),
    totalMs: s(r(m, "totalMs"))
  }), console.groupCollapsed("[LT] extension performance"), console.table(f, ["id", "importMs", "cssMs", "runMs", "totalMs"]), console.groupEnd();
}
function D(a, t = "lt-extensions") {
  if (!a || typeof document > "u")
    return;
  let e = document.head.querySelector(`style#${t}`);
  e || (e = document.createElement("style"), e.id = t, e.setAttribute("data-style", "LT Extension Styles"), document.head.append(e)), e.textContent = a;
}
function I(a) {
  return typeof a == "string" ? { id: a, args: [] } : a || { id: "" };
}
async function R(a, t, e) {
  const i = P[a]?.[t];
  if (!i)
    throw new Error(`[LT] Unknown extension id "${t}"`);
  const s = d(), r = await i();
  if (x(e, { id: t, phase: "import", ms: d() - s }), r[t]?.run)
    return r[t];
  if (r.default?.run)
    return r.default;
  for (const u of Object.values(r))
    if (u && typeof u.run == "function")
      return u;
  throw new Error(`[LT] Extension "${t}" does not export a runnable module`);
}
function $(a, t, e) {
  const i = d();
  let s = "";
  try {
    typeof t.getStyles == "function" ? s = String(t.getStyles() || "") : typeof t.styles == "string" && (s = t.styles || "");
  } catch (r) {
    b.warn(`[LT] getStyles() threw for "${a}"`, r);
  } finally {
    e && s && x(!0, { id: a, phase: "css", ms: d() - i });
  }
  return s;
}
async function N(a, t, e, { mode: i = "sequential", collectCSS: s = !0, dedupeCSS: r = !0, mountId: u = "lt-extensions", perf: m = !1, perfLimit: f = 50, security: o = {}, request: h = {} } = {}) {
  const l = d();
  E(a);
  const p = (t || []).map(I);
  a.extensions ||= {};
  const g = [], T = /* @__PURE__ */ new Set(), B = (n) => Array.isArray(n) ? n : n === void 0 ? [] : [n];
  async function S({ id: n, args: c = [] }) {
    const M = await R(e, n, m);
    a.extensions[n] = M;
    const _ = d();
    try {
      const y = M.run(...B(c));
      y && typeof y.then == "function" && await y;
    } finally {
      x(m, { id: n, phase: "run", ms: d() - _ });
    }
    if (s) {
      const y = $(n, M, m).trim();
      y && (!r || !T.has(n)) && (g.push(`/* ${n} */
${y}`), r && T.add(n));
    }
  }
  if (i === "parallel") {
    const n = p.map((c) => S(c).catch((M) => b.error(`[LT] Failed to init extension "${c.id}"`, M)));
    await Promise.allSettled(n);
  } else
    for (const n of p)
      try {
        await S(n);
      } catch (c) {
        b.error(`[LT] Failed to init extension "${n.id}"`, c);
      }
  if (s && g.length) {
    const n = d();
    D(g.join(`

`), u), x(m, { id: "__init__", phase: "css:inject", ms: d() - n });
  }
  x(m, { id: "__init__", phase: "total", ms: d() - l }), k(m, { limit: f });
}
class O {
  constructor() {
    this.measurements = [], this.isMonitoring = !1, this.timerId = null, this.intervalMs = 5e3, this.baselineMB = null, this.baselineTs = null;
  }
  startMonitoring(t = 5e3) {
    if (!("memory" in performance)) {
      console.warn("performance.memory not available");
      return;
    }
    this.intervalMs = t, this.baselineMB = Math.round(performance.memory.usedJSHeapSize / 1048576), this.baselineTs = Date.now(), this.isMonitoring = !0, this.monitorMemory();
  }
  monitorMemory() {
    if (!this.isMonitoring)
      return;
    const t = {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit,
      timestamp: Date.now()
    };
    this.measurements.push(t), this.measurements.length > 100 && this.measurements.shift(), this.detectMemoryLeaks(), this.timerId = setTimeout(() => this.monitorMemory(), this.intervalMs);
  }
  stopMonitoring() {
    this.isMonitoring = !1, this.timerId && (clearTimeout(this.timerId), this.timerId = null);
  }
  detectMemoryLeaks(t = 10, e = 1e3) {
    if (this.measurements.length < t)
      return !1;
    const i = this.measurements.slice(-t), s = i[i.length - 1].used - i[0].used, r = s / (t * this.intervalMs) * 1e3;
    return r > e ? (b.warn("⚠️ Potential memory leak detected:", {
      growthMB: (s / 1048576).toFixed(2),
      rateBps: r.toFixed(2)
    }), this.printReport(Math.min(20, this.measurements.length)), !0) : !1;
  }
  /**
   * Build a compact pattern and stats from the latest window of measurements.
   * @param {number} windowSize number of points to include (default 20)
   * @returns {{ pattern: Array<{usedMB:number, ts:number}>, stats: {count:number,minMB:number,maxMB:number,avgMB:number,slopeMBperMin:number,r2:number,leakSuspect:boolean} | null }}
   */
  analyzeMemoryPattern(t = 20) {
    const i = this.measurements.slice(-t).map((r) => ({
      usedMB: Math.round(r.used / 1048576),
      // MB
      ts: r.timestamp
    })), s = this.#t(i);
    return { pattern: i, stats: s };
  }
  /**
   * Convenience method: prints a table and stats to the console.
   * Returns the same object as analyzeMemoryPattern for further use.
   */
  printReport(t = 20) {
    const { pattern: e, stats: i } = this.analyzeMemoryPattern(t);
    if (console.table(
      e.map((s) => ({
        time: new Date(s.ts).toLocaleTimeString(),
        usedMB: s.usedMB
      }))
    ), this.baselineMB != null && e.length) {
      const r = e.at(-1).usedMB - this.baselineMB, u = this.baselineTs ? new Date(this.baselineTs).toLocaleTimeString() : "baseline";
      b.log(`Approx delta since baseline (${u}): ${r.toFixed(1)} MB`);
    }
    return b.log("Memory stats:", i), { pattern: e, stats: i };
  }
  // --- helpers -------------------------------------------------------------
  #t(t) {
    if (!t.length)
      return null;
    const e = t.map((h) => h.usedMB), i = Math.min(...e), s = Math.max(...e), r = +(e.reduce((h, l) => h + l, 0) / e.length).toFixed(2), u = t[0].ts, m = t.map((h) => (h.ts - u) / 6e4), { slope: f, r2: o } = this.#e(m, e);
    return {
      count: t.length,
      minMB: i,
      maxMB: s,
      avgMB: r,
      slopeMBperMin: +f.toFixed(3),
      r2: +o.toFixed(3),
      leakSuspect: f > 0.5 && o > 0.6
      // tweak for your needs
    };
  }
  #e(t, e) {
    const i = t.length;
    if (i < 2)
      return { slope: 0, intercept: e[0] ?? 0, r2: 0 };
    const s = t.reduce((n, c) => n + c, 0), r = e.reduce((n, c) => n + c, 0), u = t.reduce((n, c, M) => n + c * e[M], 0), m = t.reduce((n, c) => n + c * c, 0), f = s / i, o = r / i, h = u - i * f * o, l = m - i * f * f, p = l ? h / l : 0, g = o - p * f, T = e.reduce((n, c) => n + (c - o) ** 2, 0), B = e.reduce((n, c, M) => n + (c - (p * t[M] + g)) ** 2, 0), S = T ? 1 - B / T : 0;
    return { slope: p, intercept: g, r2: S };
  }
}
export {
  P as E,
  O as M,
  N as r
};
