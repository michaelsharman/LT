import { c as o } from "../../styling-B1v3AcrI.js";
import { c, L as s } from "../../extensionsFactory-BHOEyOSK.js";
const e = {
  classNamePrefix: null,
  elements: {}
};
function i() {
  m(), s.authorApp().on("render:item", a), s.authorApp().on("render:widgets", a), s.authorApp().on("itemedit:changed", a);
}
function a() {
  e.classNamePrefix = o(e.classNamePrefix), s.authorApp().getItem().questions.length ? u() : p();
}
function u() {
  const t = e.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]'), n = e.elements.apiWrapper.querySelectorAll(".lrn-author-ui-add-extras");
  [...t, ...n].forEach((r) => {
    r.classList.add(`lrn-${e.classNamePrefix}hide`);
  });
}
function p() {
  const t = e.elements.apiWrapper.querySelectorAll('[data-authorapi-selector="add-button"]'), n = e.elements.apiWrapper.querySelectorAll(".lrn-author-ui-add-extras");
  [...t, ...n].forEach((r) => {
    r.classList.remove(`lrn-${e.classNamePrefix}hide`);
  });
}
function m() {
  e.elements.apiWrapper = document.querySelector(".lrn-author");
}
const f = c("singleQuestion", i);
export {
  f as singleQuestion
};
