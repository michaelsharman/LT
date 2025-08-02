import { a as l } from "./app-C8cT1zZy.js";
import { t as r } from "./widgets-BnOM6eRt.js";
const n = {
  renderedCss: !1,
  validTypes: ["longtextV2", "plaintext"]
};
function s() {
  n.renderedCss || u(), i();
}
function i() {
  l().on("widgetedit:widget:ready", () => {
    setTimeout(() => {
      const e = r();
      if (n.validTypes.includes(e)) {
        const t = document.querySelector('[data-lrn-qe-input-path="max_length"] input.lrn-qe-input');
        t && t.addEventListener("input", () => {
          d(t);
        });
      }
    }, 500);
  });
}
function d(e) {
  const t = /^\d+$/, a = /^(0|[1-9]\d*)$/, o = "lt__input-invalid";
  e.value = e.value.replace(/^0+/, ""), t.test(e.value) || (e.value = e.value.replace(/[^0-9]/g, "")), e.value.length && !a.test(e.value) ? e.classList.add(o) : e.classList.remove(o);
}
function u() {
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
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: s
}, Symbol.toStringTag, { value: "Module" }));
export {
  f as e,
  s as r
};
