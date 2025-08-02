const t = {
  color: "rgba(250, 170, 140, 0.5)",
  renderedCss: !1,
  zindex: 99999
};
function l(e, r) {
  if (e && typeof e == "string" && (t.color = e), r && typeof r == "number" && (t.zindex = r), !document.querySelector(".lrn__overlay")) {
    const n = document.createElement("div");
    n.classList.add("lrn__overlay"), document.querySelector("body").append(n);
  }
  t.renderedCss || i();
}
function o() {
  document.querySelector(".lrn__overlay")?.remove();
}
function i() {
  const e = document.createElement("style");
  e.setAttribute("data-style", "LT Blue Light Filter");
  const r = `
/* Learnosity blue light filter styles */
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
  e.setAttribute("data-style", "LT Blue Light Filter"), e.textContent = r, document.head.append(e), t.renderedCss = !0;
}
const a = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  halt: o,
  run: l
}, Symbol.toStringTag, { value: "Module" }));
export {
  a as b,
  o as h,
  l as r
};
