const n = {
  elements: {},
  renderedCss: !1,
  theme: "nextGen"
};
function l() {
  s(), r(), a();
}
function a() {
  const t = n.elements.apiWrapper, e = document.createElement("main");
  e.className = `lt__theme lt__theme-${n.theme}`, t.parentNode.insertBefore(e, t), e.appendChild(t);
}
function r() {
  n.elements.apiWrapper = document.querySelector(".lrn-assess");
}
function s(t) {
  const e = document.createElement("style");
  e.setAttribute("data-lt-style", "LT Theme NextGen"), e.textContent = t, document.head.appendChild(e);
}
export {
  l as run
};
