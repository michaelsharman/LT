import { c as s, t as i } from "./app-BC_Cj6Pt.js";
import { c as l } from "./extensionsFactory-DRAOPv5d.js";
function m() {
  s().on("item:load", () => {
    const a = i(), o = Array.from(document.getElementsByClassName("item-prev")), n = Array.from(document.getElementsByClassName("item-next")), e = o.concat(n);
    for (let t = 0; t < e.length; t++) {
      const r = e[t].getAttribute("aria-label");
      e[t].setAttribute("aria-live", r + " of " + a);
    }
  });
}
const c = l("ariaCountOnNav", m), p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  ariaCountOnNav: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  p as a,
  c as b
};
