import { a as i, d as p, b as m, s as b } from "../app-C4hoGTng.js";
import M from "../logger.js";
import { r as h } from "../initExtensions-DVo3AlMk.js";
function w() {
  i().on("navigate", (t) => {
    window.location.hash = "#" + t.data.locationEncoded;
  }), i().navigate(window.location.hash.replace(/^#/, "")), window.onhashchange = () => {
    i().navigate(window.location.hash.replace(/^#/, ""));
  };
}
const y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routingHash: w
}, Symbol.toStringTag, { value: "Module" }));
function v() {
  return i().getWidget()?.type;
}
const j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  type: v
}, Symbol.toStringTag, { value: "Module" }));
let n = null, r = null;
const O = Object.fromEntries(Object.entries(p).filter(([t]) => !["extensionsListener", "handleEvent"].includes(t))), _ = Object.fromEntries(Object.entries(m).filter(([t]) => !["setup"].includes(t))), l = {
  utils: {
    logger: M,
    get monitor() {
      return n;
    }
  }
};
async function x() {
  if (!r) {
    const t = await import(
      /* webpackChunkName: "lt-memory-monitor" */
      "../memoryMonitor-Db1sqzAh.js"
    );
    r = t.default || t.MemoryMonitor || t;
  }
  return r;
}
async function a(t = {}) {
  const o = await x();
  return n || (n = new o()), n.isMonitoring || n.startMonitoring(t.intervalMs ?? 5e3), n;
}
function E() {
  n?.stopMonitoring();
}
async function S(t, o = {}) {
  b(t);
  const { extensions: s = [], security: c, request: u, monitor: e, perf: g = !1, perfLimit: f = 50 } = o;
  if (e) {
    Object.assign(l.utils, {
      enableMonitoring: a,
      disableMonitoring: E
    });
    const d = typeof e == "object" && Number.isFinite(e.intervalMs) ? e.intervalMs : void 0;
    await a({ intervalMs: d });
  }
  s.length && await h(C, s, "authoring", {
    security: c,
    request: u,
    perf: g,
    perfLimit: f
  });
}
const C = { init: S, extensions: {}, ..._, ...O, ...y, ...j, ...l };
export {
  C as LT
};
