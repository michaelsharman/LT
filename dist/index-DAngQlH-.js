import { c as s, m as o, g as a, n as t } from "./app-DrpANbC0.js";
import { c as i } from "./moduleFactory-Ck7axszi.js";
function d() {
  s().on("item:load", r);
}
function r() {
  const n = o();
  for (const e of n)
    a(e) && s().question(e).on("validated", () => {
      t(e).disable();
    });
}
const l = i("disableOnValidate", d), u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  disableOnValidate: l
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as a,
  u as d
};
