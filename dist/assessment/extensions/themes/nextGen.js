const n = {
  elements: {},
  renderedCss: !1,
  theme: "nextGen"
};
function l() {
  n.renderedCss || (a(), n.renderedCss = !0), s(), r();
}
function r() {
  const t = n.elements.apiWrapper, e = document.createElement("main");
  e.className = `lt__theme lt__theme-${n.theme}`, t.parentNode.insertBefore(e, t), e.appendChild(t);
}
function s() {
  n.elements.apiWrapper = document.querySelector(".lrn-assess");
}
function a(t) {
  const e = document.createElement("style");
  e.setAttribute("data-lt-style", "LT Theme NextGen"), e.textContent = t, document.head.appendChild(e);
}
export {
  l as run
};
