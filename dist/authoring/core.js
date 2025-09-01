import { a as e, d as a, b as r, s as c } from "../app-BHwuGSUg.js";
import l from "../logger.js";
import { r as u } from "../initExtensions-DZqnPDuf.js";
function d() {
  e().on("navigate", (t) => {
    window.location.hash = "#" + t.data.locationEncoded;
  }), e().navigate(window.location.hash.replace(/^#/, "")), window.onhashchange = () => {
    e().navigate(window.location.hash.replace(/^#/, ""));
  };
}
const p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routingHash: d
}, Symbol.toStringTag, { value: "Module" }));
function g() {
  return e().getWidget()?.type;
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  type: g
}, Symbol.toStringTag, { value: "Module" })), h = Object.fromEntries(Object.entries(a).filter(([t]) => !["extensionsListener", "handleEvent"].includes(t))), b = Object.fromEntries(Object.entries(r).filter(([t]) => !["setup"].includes(t))), m = {
  utils: {
    logger: l
  }
};
async function w(t, o = {}) {
  c(t);
  const { extensions: n = [], security: i, request: s } = o;
  n.length && await u(j, n, "authoring", {
    security: i,
    request: s
  });
}
const j = { init: w, extensions: {}, ...b, ...h, ...p, ...f, ...m };
export {
  j as LT
};
