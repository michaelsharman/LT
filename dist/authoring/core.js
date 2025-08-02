import { a as o, b as n, d as t } from "../app-C8cT1zZy.js";
import { w as i } from "../widgets-BnOM6eRt.js";
import e from "../logger.js";
function s() {
  o().on("navigate", (a) => {
    window.location.hash = "#" + a.data.locationEncoded;
  }), o().navigate(window.location.hash.replace(/^#/, "")), window.onhashchange = () => {
    o().navigate(window.location.hash.replace(/^#/, ""));
  };
}
const c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routingHash: s
}, Symbol.toStringTag, { value: "Module" })), r = {
  utils: {
    logger: e
  }
}, p = { ...n, ...t, ...c, ...i, ...r };
export {
  p as LT
};
