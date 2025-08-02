import { c as o } from "./app-C9b6PwWF.js";
import { a1 as n, X as t, _ as a } from "./activity-DZI4ByCR.js";
function i() {
  o().on("item:load", r);
}
function r() {
  const s = n();
  for (const e of s)
    t(e) && o().question(e).on("validated", () => {
      a(e).disable();
    });
}
const p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: i
}, Symbol.toStringTag, { value: "Module" }));
export {
  p as d,
  i as r
};
