import { a as r, d as M, b as h, s as w } from "../app-C4hoGTng.js";
import v from "../logger.js";
import { r as j } from "../initExtensions-DVo3AlMk.js";
function O() {
  r().on("navigate", (t) => {
    window.location.hash = "#" + t.data.locationEncoded;
  }), r().navigate(window.location.hash.replace(/^#/, "")), window.onhashchange = () => {
    r().navigate(window.location.hash.replace(/^#/, ""));
  };
}
const _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routingHash: O
}, Symbol.toStringTag, { value: "Module" }));
function E() {
  return r().getWidget()?.type || null;
}
const x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  type: E
}, Symbol.toStringTag, { value: "Module" }));
let n = null, l = null;
const T = Object.fromEntries(Object.entries(M).filter(([t]) => !["extensionsListener", "handleEvent"].includes(t))), q = Object.fromEntries(Object.entries(h).filter(([t]) => !["setup"].includes(t))), g = {
  utils: {
    logger: v,
    get monitor() {
      return n;
    }
  }
};
async function L() {
  if (!l) {
    const t = await import(
      /* webpackChunkName: "lt-memory-monitor" */
      "../memoryMonitor-Db1sqzAh.js"
    );
    l = t.default || t.MemoryMonitor || t;
  }
  return l;
}
async function d(t = {}) {
  const s = await L();
  return n || (n = new s()), n.isMonitoring || n.startMonitoring(t.intervalMs ?? 5e3), n;
}
function S() {
  n?.stopMonitoring();
}
async function U(t, s = {}) {
  w(t);
  const { extensions: o = [], security: c, request: u, monitor: i, perf: f = !1, perfLimit: m = 50 } = s, p = (e) => !!(e && e.security && e.request), a = o.find((e) => typeof e == "object" && e.id === "imageUploader") || o.find((e) => e === "imageUploader");
  if (a) {
    const e = typeof a == "object" ? a.args : null, y = p(e), b = p({ security: c, request: u });
    if (!y && !b)
      throw new TypeError("LT.init: imageUploader extension requires `security` and `request` (provide via extension args or top-level options).");
  }
  if (i) {
    Object.assign(g.utils, {
      enableMonitoring: d,
      disableMonitoring: S
    });
    const e = typeof i == "object" && Number.isFinite(i.intervalMs) ? i.intervalMs : void 0;
    await d({ intervalMs: e });
  }
  o.length && await j(A, o, "authoring", {
    security: c,
    request: u,
    perf: f,
    perfLimit: m
  });
}
const A = { init: U, extensions: {}, ...q, ...T, ..._, ...x, ...g };
export {
  A as LT
};
