const t = {
  color: "rgba(250, 170, 140, 0.5)",
  renderedCss: !1,
  zindex: 99999
};
function o(e, n) {
  if (e && typeof e == "string" && (t.color = e), n && typeof n == "number" && (t.zindex = n), !document.querySelector(".lrn__overlay")) {
    const r = document.createElement("div");
    r.classList.add("lrn__overlay"), document.querySelector("body").append(r);
  }
  t.renderedCss || a();
}
function l() {
  const e = document.querySelector(".lrn__overlay");
  e && e.remove();
}
function a() {
  const e = document.createElement("style"), n = `
/* Learnosity page overlay styles */
.lrn__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${t.color};
    z-index: ${t.zindex};
    pointer-events: none;
}
`;
  e.setAttribute("data-style", "LT Page Overlay"), e.textContent = n, document.head.append(e), t.renderedCss = !0;
}
const c = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  halt: l,
  run: o
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as h,
  c as p,
  o as r
};
