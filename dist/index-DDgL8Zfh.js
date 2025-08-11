import d from "./logger.js";
const e = {
  mouse: { x: 0, y: 0 },
  mouseTrackingInitialised: !1,
  readingMask: null,
  renderedCss: !1
};
function o() {
  e.renderedCss || (g(), e.renderedCss = !0), e.readingMask || l(), e.mouseTrackingInitialised || (document.addEventListener(
    "mousemove",
    (a) => {
      e.mouse.x = a.clientX, e.mouse.y = a.clientY, e.readingMask?.hidden || i(a.clientY);
    },
    { passive: !0 }
  ), e.mouseTrackingInitialised = !0);
}
function l() {
  const a = document.createElement("div");
  a.id = "lt__reading-mask", a.classList.add("lt__reading-mask"), a.hidden = !0, document.querySelector(".lrn-assess").appendChild(a), e.readingMask = a;
}
function c() {
  e.readingMask?.hidden || n();
}
function k() {
  e.readingMask?.hidden && n();
}
function n() {
  if (!e.readingMask) {
    d.warn("[ReadingMask] toggle() called before run()");
    return;
  }
  const a = e.readingMask.hidden;
  return e.readingMask.hidden = !a, a ? (e.readingMask.classList.add("has-mask"), i(e.mouse.y)) : e.readingMask.classList.remove("has-mask"), a;
}
function i(a) {
  if (!e.readingMask)
    return;
  const t = Math.max(0, a - 80), s = a + 80, r = `
            linear-gradient(
                to bottom,
                black 0,
                black ${t}px,
                transparent ${t}px,
                transparent ${s}px,
                black ${s}px,
                black 100%
            )
        `;
  e.readingMask.style.maskImage = r, e.readingMask.style.webkitMaskImage = r;
}
function g() {
  const a = document.createElement("style"), t = `
/* Learnosity reading mask styles */
.lt__reading-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    pointer-events: none; /* Let mouse events pass through */
    z-index: 9999;
    mask-image: linear-gradient(to bottom, black 0, black 100px, transparent 100px, transparent 300px, black 300px, black 100%);
    -webkit-mask-image: linear-gradient(to bottom, black 0, black 100px, transparent 100px, transparent 300px, black 300px, black 100%);
    background: rgba(0, 0, 0, 0.6);

    .has-mask {
        mask-image: linear-gradient(to bottom, black 0, black 100px, transparent 100px, transparent 300px, black 300px, black 100%);
        -webkit-mask-image: linear-gradient(to bottom, black 0, black 100px, transparent 100px, transparent 300px, black 300px, black 100%);
    }
}
`;
  a.setAttribute("data-style", "LT Reading Mask"), a.textContent = t, document.head.append(a), e.renderedCss = !0;
}
const p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hide: c,
  run: o,
  show: k,
  toggle: n
}, Symbol.toStringTag, { value: "Module" }));
export {
  o as a,
  c as h,
  p as r,
  k as s,
  n as t
};
