const n = {
  elements: {},
  theme: "nextGen"
};
function p() {
  a(), r();
}
function r() {
  const e = n.elements.apiWrapper, t = document.createElement("main");
  t.className = `lt__theme lt__theme-${n.theme}`, e.parentNode.insertBefore(t, e), t.appendChild(e);
}
function a() {
  n.elements.apiWrapper = document.querySelector(".lrn-assess");
}
export {
  p as run
};
