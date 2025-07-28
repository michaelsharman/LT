import { a as n } from "./app-BXKmoa_A.js";
import { c as o } from "./styling-CgOepzZE.js";
const e = {
  classNamePrefix: null,
  elements: {}
};
function c() {
  m(), n().on("render:item", a), n().on("render:widgets", a), n().on("itemedit:changed", a);
}
function a() {
  e.classNamePrefix = o(e.classNamePrefix), n().getItem().questions.length ? i() : u();
}
function i() {
  const t = e.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]'), r = e.elements.apiWrapper.querySelectorAll(".lrn-author-ui-add-extras");
  [...t, ...r].forEach((s) => {
    s.classList.add(`lrn-${e.classNamePrefix}hide`);
  });
}
function u() {
  const t = e.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]'), r = e.elements.apiWrapper.querySelectorAll(".lrn-author-ui-add-extras");
  [...t, ...r].forEach((s) => {
    s.classList.remove(`lrn-${e.classNamePrefix}hide`);
  });
}
function m() {
  e.elements.apiWrapper = document.querySelector(".lrn-author");
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  c as r,
  f as s
};
