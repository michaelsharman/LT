import { a as s } from "./app-DSq6w2-y.js";
import { c as o } from "./styling-Clo4owDN.js";
import { c } from "./moduleFactory-Ck7axszi.js";
const e = {
  classNamePrefix: null,
  elements: {}
};
function i() {
  d(), s().on("render:item", l), s().on("render:widgets", l), s().on("itemedit:changed", l);
}
function l() {
  e.classNamePrefix = o(e.classNamePrefix), s().getItem().questions.length ? u() : m();
}
function u() {
  const t = e.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]'), n = e.elements.apiWrapper.querySelectorAll(".lrn-author-ui-add-extras");
  [...t, ...n].forEach((a) => {
    a.classList.add(`lrn-${e.classNamePrefix}hide`);
  });
}
function m() {
  const t = e.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]'), n = e.elements.apiWrapper.querySelectorAll(".lrn-author-ui-add-extras");
  [...t, ...n].forEach((a) => {
    a.classList.remove(`lrn-${e.classNamePrefix}hide`);
  });
}
function d() {
  e.elements.apiWrapper = document.querySelector(".lrn-author");
}
const p = c("singleQuestion", i), g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  singleQuestion: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  p as a,
  g as s
};
