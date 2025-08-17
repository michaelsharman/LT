import { c as s, m as o, g as a, n as t } from "./app-BC_Cj6Pt.js";
import { c as i } from "./extensionsFactory-DRAOPv5d.js";
function r() {
  s().on("item:load", d);
}
function d() {
  const n = o();
  for (const e of n)
    a(e) && s().question(e).on("validated", () => {
      t(e).disable();
    });
}
const c = i("disableOnValidate", r), u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  disableOnValidate: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  c as a,
  u as d
};
