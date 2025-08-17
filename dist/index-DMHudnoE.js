import { a as n } from "./app-BFYad37a.js";
import { c as o } from "./styling-vNuWbS3G.js";
import { c as i } from "./extensionsFactory-DRAOPv5d.js";
const e = {
  classNamePrefix: null,
  elements: {}
};
function c() {
  d(), n().on("render:item", r), n().on("render:widgets", r), n().on("itemedit:changed", r);
}
function r() {
  e.classNamePrefix = o(e.classNamePrefix), n().getItem().questions.length ? u() : m();
}
function u() {
  const t = e.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]'), s = e.elements.apiWrapper.querySelectorAll(".lrn-author-ui-add-extras");
  [...t, ...s].forEach((a) => {
    a.classList.add(`lrn-${e.classNamePrefix}hide`);
  });
}
function m() {
  const t = e.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]'), s = e.elements.apiWrapper.querySelectorAll(".lrn-author-ui-add-extras");
  [...t, ...s].forEach((a) => {
    a.classList.remove(`lrn-${e.classNamePrefix}hide`);
  });
}
function d() {
  e.elements.apiWrapper = document.querySelector(".lrn-author");
}
const p = i("singleQuestion", c), E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  singleQuestion: p
}, Symbol.toStringTag, { value: "Module" }));
export {
  p as a,
  E as s
};
