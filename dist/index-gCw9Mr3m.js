import { J as s, ab as o, a5 as a, a8 as t } from "./activity-BOoVb08o.js";
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
