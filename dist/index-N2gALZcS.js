import { c as s, t as l } from "./app-CFqc6CDD.js";
function m() {
  s().on("item:load", () => {
    const a = l(), o = Array.from(document.getElementsByClassName("item-prev")), n = Array.from(document.getElementsByClassName("item-next")), e = o.concat(n);
    for (let t = 0; t < e.length; t++) {
      const r = e[t].getAttribute("aria-label");
      e[t].setAttribute("aria-live", r + " of " + a);
    }
  });
}
const i = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: m
}, Symbol.toStringTag, { value: "Module" }));
export {
  i as a,
  m as r
};
