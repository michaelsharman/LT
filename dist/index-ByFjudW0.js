import { c as s, t as l } from "./app-DrpANbC0.js";
import { c as m } from "./moduleFactory-Ck7axszi.js";
function c() {
  s().on("item:load", () => {
    const a = l(), o = Array.from(document.getElementsByClassName("item-prev")), n = Array.from(document.getElementsByClassName("item-next")), e = o.concat(n);
    for (let t = 0; t < e.length; t++) {
      const r = e[t].getAttribute("aria-label");
      e[t].setAttribute("aria-live", r + " of " + a);
    }
  });
}
const i = m("ariaCountOnNav", c), p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ariaCountOnNav: i
}, Symbol.toStringTag, { value: "Module" }));
export {
  p as a,
  i as b
};
