import { l as d } from "./logger-BpyELtLr.js";
const a = {
  mouse: { x: 0, y: 0 },
  mouseTrackingInitialised: !1,
  readingMask: null,
  renderedCss: !1
};
function o() {
  a.renderedCss || g(), a.readingMask || l(), a.mouseTrackingInitialised || (document.addEventListener(
    "mousemove",
    (e) => {
      a.mouse.x = e.clientX, a.mouse.y = e.clientY, a.readingMask?.hidden || r(e.clientY);
    },
    { passive: !0 }
  ), a.mouseTrackingInitialised = !0);
}
function l() {
  const e = document.createElement("div");
  e.id = "lt__reading-mask", e.classList.add("lt__reading-mask"), e.hidden = !0, document.body.appendChild(e), a.readingMask = e;
}
function r(e) {
  if (!a.readingMask)
    return;
  const t = Math.max(0, e - 80), s = e + 80, i = `
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
  a.readingMask.style.maskImage = i, a.readingMask.style.webkitMaskImage = i;
}
function n() {
  if (!a.readingMask) {
    d.warn("[ReadingMask] toggle() called before run()");
    return;
  }
  const e = a.readingMask.hidden;
  return a.readingMask.hidden = !e, e ? (a.readingMask.classList.add("has-mask"), r(a.mouse.y)) : a.readingMask.classList.remove("has-mask"), e;
}
function k() {
  a.readingMask?.hidden && n();
}
function c() {
  a.readingMask?.hidden || n();
}
function g() {
  const e = document.createElement("style");
  e.setAttribute("data-style", "LT Reading Mask");
  const t = `
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
  e.textContent = t, document.head.append(e), a.renderedCss = !0;
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
