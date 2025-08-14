import { a as t, b as n, c as e } from "../app-DSq6w2-y.js";
import { w as a } from "../widgets-Cxh4wPXN.js";
import i from "../logger.js";
function s() {
  t().on("navigate", (o) => {
    window.location.hash = "#" + o.data.locationEncoded;
  }), t().navigate(window.location.hash.replace(/^#/, "")), window.onhashchange = () => {
    t().navigate(window.location.hash.replace(/^#/, ""));
  };
}
const c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routingHash: s
}, Symbol.toStringTag, { value: "Module" })), r = Object.fromEntries(Object.entries(n).filter(([o]) => !["extensionsListener", "handleEvent"].includes(o))), l = {
  utils: {
    logger: i
  }
}, h = { ...e, ...r, ...c, ...a, ...l };
export {
  h as LT
};
