import n from "./logger.js";
const e = {
  blueLightFilter: null,
  color: "rgba(250, 170, 140, 0.5)",
  renderedCss: !1,
  zindex: 99999
};
function d(t, i) {
  e.renderedCss || (u(), e.renderedCss = !0), t && typeof t == "string" && (e.color = t), i && typeof i == "number" && (e.zindex = i);
  let l = document.getElementById("lt__blue-light-filter");
  l || (l = document.createElement("div"), l.id = "lt__blue-light-filter", l.hidden = !0, l.classList.add("lt__blue-light-filter"), document.querySelector(".lrn-assess").appendChild(l)), e.blueLightFilter = l;
}
function o() {
  e.blueLightFilter?.hidden && r();
}
function s() {
  e.blueLightFilter?.hidden || r();
}
function r() {
  if (!e.blueLightFilter) {
    n.warn("[BlueLightFilter] visibility called before run()");
    return;
  }
  e.blueLightFilter.hidden = !e.blueLightFilter.hidden;
}
function u() {
  const t = document.createElement("style"), i = `
/* Learnosity blue light filter styles */
.lt__blue-light-filter {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: ${e.color};
    z-index: ${e.zindex};
    pointer-events: none;
}
`;
  t.setAttribute("data-style", "LT Blue Light Filter"), t.textContent = i, document.head.append(t), e.renderedCss = !0;
}
const g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hide: s,
  run: d,
  show: o,
  toggle: r
}, Symbol.toStringTag, { value: "Module" }));
export {
  g as b,
  s as h,
  d as r,
  o as s,
  r as t
};
