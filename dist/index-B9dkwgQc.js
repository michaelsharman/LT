import { c as s } from "./app-C9b6PwWF.js";
import { H as l } from "./activity-DZI4ByCR.js";
function m() {
  s().on("item:load", () => {
    const o = l(), a = Array.from(document.getElementsByClassName("item-prev")), r = Array.from(document.getElementsByClassName("item-next")), e = a.concat(r);
    for (let t = 0; t < e.length; t++) {
      const n = e[t].getAttribute("aria-label");
      e[t].setAttribute("aria-live", n + " of " + o);
    }
  });
}
const u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: m
}, Symbol.toStringTag, { value: "Module" }));
export {
  u as a,
  m as r
};
