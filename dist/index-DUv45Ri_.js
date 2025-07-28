import { a as s, aa as o, a4 as a, a7 as t } from "./app-CgKRbBlK.js";
function i() {
  s().on("item:load", r);
}
function r() {
  const n = o();
  for (const e of n)
    a(e) && s().question(e).on("validated", () => {
      t(e).disable();
    });
}
const c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: i
}, Symbol.toStringTag, { value: "Module" }));
export {
  c as d,
  i as r
};
