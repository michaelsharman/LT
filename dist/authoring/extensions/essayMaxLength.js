import { c as o, L as a } from "../../extensionsFactory-BHOEyOSK.js";
const n = {
  renderedCss: !1,
  validTypes: ["longtextV2", "plaintext"]
};
function i() {
  n.renderedCss || (u(), n.renderedCss = !0), l();
}
function l() {
  a.authorApp().on("widgetedit:widget:ready", () => {
    setTimeout(() => {
      const e = a.type();
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
  const t = /^\d+$/, r = /^(0|[1-9]\d*)$/, s = "lt__input-invalid";
  e.value = e.value.replace(/^0+/, ""), t.test(e.value) || (e.value = e.value.replace(/[^0-9]/g, "")), e.value.length && !r.test(e.value) ? e.classList.add(s) : e.classList.remove(s);
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
const p = o("essayMaxLength", i);
export {
  p as essayMaxLength
};
