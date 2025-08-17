import { a as o } from "./app-BFYad37a.js";
import { c as r } from "./extensionsFactory-DRAOPv5d.js";
import { t as l } from "./widgets-6yrsWoDe.js";
const n = {
  renderedCss: !1,
  validTypes: ["longtextV2", "plaintext"]
};
function i() {
  n.renderedCss || (c(), n.renderedCss = !0), d();
}
function d() {
  o().on("widgetedit:widget:ready", () => {
    setTimeout(() => {
      const e = l();
      if (n.validTypes.includes(e)) {
        const t = document.querySelector('[data-lrn-qe-input-path="max_length"] input.lrn-qe-input');
        t && t.addEventListener("input", () => {
          u(t);
        });
      }
    }, 500);
  });
}
function u(e) {
  const t = /^\d+$/, s = /^(0|[1-9]\d*)$/, a = "lt__input-invalid";
  e.value = e.value.replace(/^0+/, ""), t.test(e.value) || (e.value = e.value.replace(/[^0-9]/g, "")), e.value.length && !s.test(e.value) ? e.classList.add(a) : e.classList.remove(a);
}
function c() {
  const e = document.createElement("style"), t = `
/* Learnosity essay validate max length styles */
.lrn-qe-ui .lrn-qe-form-group .lrn-qe-form-control.lt__input-invalid,
.lrn-qe-ui .lrn-qe-form-group .lrn-qe-form-control.lt__input-invalid:active:not(:disabled):not([readonly]),
.lrn-qe-ui .lrn-qe-form-group .lrn-qe-form-control.lt__input-invalid:focus:not(:disabled):not([readonly]) {
    border-color: #ff0000;
    outline: 0.0714285714em solid #dd002f;
}
`;
  e.setAttribute("data-style", "LT Essay Max Length"), e.textContent = t, document.head.append(e), n.renderedCss = !0;
}
const p = r("essayMaxLength", i), v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  essayMaxLength: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  p as a,
  v as e
};
