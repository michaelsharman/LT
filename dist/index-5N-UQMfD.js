import n from "./logger.js";
import { c as d } from "./moduleFactory-Ck7axszi.js";
const e = {
  blueLightFilter: null,
  color: "rgba(250, 170, 140, 0.5)",
  renderedCss: !1,
  zindex: 99999
};
function o(t, i) {
  e.renderedCss || (h(), e.renderedCss = !0), t && typeof t == "string" && (e.color = t), i && typeof i == "number" && (e.zindex = i);
  let l = document.getElementById("lt__blue-light-filter");
  l || (l = document.createElement("div"), l.id = "lt__blue-light-filter", l.hidden = !0, l.classList.add("lt__blue-light-filter"), document.querySelector(".lrn-assess").appendChild(l)), e.blueLightFilter = l;
}
function u() {
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
function h() {
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
const c = d("blueLightFilter", o, {
  show: u,
  hide: s,
  toggle: r
}), b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  blueLightFilter: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  c as a,
  b
};
