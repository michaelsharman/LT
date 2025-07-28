import { c as s, p as o, z as t, g as a } from "./app-4iB5KbSe.js";
function i() {
  s().on("item:load", r);
}
function r() {
  const n = o();
  for (const e of n)
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
