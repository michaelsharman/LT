import { J as s, G as l } from "./activity-BJ6tgIm8.js";
function m() {
  s().on("item:load", () => {
    const a = l(), o = Array.from(document.getElementsByClassName("item-prev")), n = Array.from(document.getElementsByClassName("item-next")), e = o.concat(n);
    for (let t = 0; t < e.length; t++) {
      const r = e[t].getAttribute("aria-label");
      e[t].setAttribute("aria-live", r + " of " + a);
    }
  });
}
const c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: m
}, Symbol.toStringTag, { value: "Module" }));
export {
  c as a,
  m as r
};
