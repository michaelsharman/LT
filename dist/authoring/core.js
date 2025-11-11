import { a as i, d as f, b as p, s as d } from "../app-DjTONOng.js";
import m from "../logger.js";
import { M as r, r as M } from "../memoryMonitor-DBuv6WYK.js";
function b() {
  i().on("navigate", (e) => {
    window.location.hash = "#" + e.data.locationEncoded;
  }), i().navigate(window.location.hash.replace(/^#/, "")), window.onhashchange = () => {
    i().navigate(window.location.hash.replace(/^#/, ""));
  };
}
const h = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routingHash: b
}, Symbol.toStringTag, { value: "Module" }));
function w() {
  return i().getWidget()?.type;
}
const v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  type: w
}, Symbol.toStringTag, { value: "Module" }));
let t = null;
const y = Object.fromEntries(Object.entries(f).filter(([e]) => !["extensionsListener", "handleEvent"].includes(e))), j = Object.fromEntries(Object.entries(p).filter(([e]) => !["setup"].includes(e))), O = {
  utils: {
    logger: m,
    get monitor() {
      return t;
    },
    // optional convenience APIs
    enableMonitoring(e = {}) {
      return t || (t = new r()), t.isMonitoring || t.startMonitoring(e.intervalMs ?? 5e3), t;
    },
    disableMonitoring() {
      t?.stopMonitoring();
    }
  }
};
async function _(e, s = {}) {
  d(e);
  const { extensions: o = [], security: a, request: l, monitor: n, perf: c = !1, perfLimit: g = 50 } = s;
  if (n) {
    const u = typeof n == "object" && Number.isFinite(n.intervalMs) ? n.intervalMs : void 0;
    t || (t = new r()), t.isMonitoring || t.startMonitoring(u);
  }
  o.length && await M(x, o, "authoring", {
    security: a,
    request: l,
    perf: c,
    perfLimit: g
  });
}
const x = { init: _, extensions: {}, ...j, ...y, ...h, ...v, ...O };
export {
  x as LT
};
