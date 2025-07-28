import { c as s, o as n, x as t, g as a } from "./app-cSJfMaLP.js";
function i() {
  s().on("item:load", r);
}
function r() {
  const o = n();
  for (const e of o)
    t(e) && s().question(e).on("validated", () => {
      a(e).disable();
    });
}
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: i
}, Symbol.toStringTag, { value: "Module" }));
export {
  d,
  i as r
};
