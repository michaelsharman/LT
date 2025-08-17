import { c as r } from "../../../extensionsFactory-DRAOPv5d.js";
const n = {
  elements: {},
  renderedCss: !1,
  theme: "nextGen"
};
function s() {
  n.renderedCss || (l(), n.renderedCss = !0), c(), a();
}
function a() {
  const t = n.elements.apiWrapper, e = document.createElement("main");
  e.className = `lt__theme lt__theme-${n.theme}`, t.parentNode.insertBefore(e, t), e.appendChild(t);
}
function c() {
  n.elements.apiWrapper = document.querySelector(".lrn-assess");
}
function l(t) {
  const e = document.createElement("style");
  e.setAttribute("data-lt-style", "LT Theme NextGen"), e.textContent = t, document.head.appendChild(e);
}
const o = r("nextGen", s);
export {
  o as nextGen
};
