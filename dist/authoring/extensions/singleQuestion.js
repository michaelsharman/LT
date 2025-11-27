import { c as l } from "../../styling-GKhoo4nb.js";
import { c as i, L as s } from "../../extensionsFactory-BHOEyOSK.js";
const e = {
  classNamePrefix: null,
  elements: {}
};
function c() {
  d(), s.authorApp().on("render:item", o), s.authorApp().on("render:widgets", o), s.authorApp().on("itemedit:changed", o);
}
function o() {
  e.classNamePrefix = l(e.classNamePrefix), s.authorApp().getItem().questions.length ? u() : p();
}
function u() {
  const r = e.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]'), n = e.elements.apiWrapper.querySelectorAll(".lrn-author-ui-add-extras"), t = [...r, ...n];
  t && t.forEach((a) => {
    a.classList.add(`lrn-${e.classNamePrefix}hide`);
  });
}
function p() {
  const r = e.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]'), n = e.elements.apiWrapper.querySelectorAll(".lrn-author-ui-add-extras"), t = [...r, ...n];
  t && t.forEach((a) => {
    a.classList.remove(`lrn-${e.classNamePrefix}hide`);
  });
}
function d() {
  e.elements.apiWrapper = document.querySelector(".lrn-author");
}
const f = i("singleQuestion", c);
export {
  f as singleQuestion
};
