import { a as t, d as n, b as e } from "../app-BFYad37a.js";
import { w as a } from "../widgets-6yrsWoDe.js";
import i from "../logger.js";
function s() {
  t().on("navigate", (o) => {
    window.location.hash = "#" + o.data.locationEncoded;
  }), t().navigate(window.location.hash.replace(/^#/, "")), window.onhashchange = () => {
    t().navigate(window.location.hash.replace(/^#/, ""));
  };
}
const r = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routingHash: s
}, Symbol.toStringTag, { value: "Module" })), c = Object.fromEntries(Object.entries(n).filter(([o]) => !["extensionsListener", "handleEvent"].includes(o))), l = {
  utils: {
    logger: i
  }
}, h = { ...e, ...c, ...r, ...a, ...l };
export {
  h as LT
};
