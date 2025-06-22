import { c as a, l as m } from "./app-C2_EjRb0.js";
import { l } from "./logger-BpyELtLr.js";
const e = {
  _initialised: !1,
  elTimerWrapper: null,
  forceRenderTimer: !1,
  renderedCss: !1
};
function p(t = 60) {
  if (e._initialised)
    l.debug("Toggle timer already initialised, ignoring run();");
  else {
    const n = document.querySelector(".lrn-sm");
    if (e.elTimerWrapper = document.querySelector(".lrn-timer-wrapper"), n && e.elTimerWrapper) {
      e.renderedCss || c(), e._initialised = !0;
      const s = Array.from(e.elTimerWrapper.children), r = document.createElement("button");
      r.classList.add("lrn_btn", "lt__timer-button"), r.setAttribute("type", "button"), r.setAttribute("aria-label", `${e.elTimerWrapper.getAttribute("aria-label")}, click to toggle visibility of the timer.`), e.elTimerWrapper.innerHTML = "", e.elTimerWrapper.appendChild(r), s.forEach((i) => {
        r.appendChild(i);
      }), r.addEventListener("click", () => {
        o();
      }), a().on("time:change", () => {
        const i = m();
        !e.forceRenderTimer && typeof i == "number" && i <= Number(t) && e.elTimerWrapper.classList.contains("lt__timer-hide") && (e.forceRenderTimer = !0, e.elTimerWrapper.classList.remove("lt__timer-hide"), l.info(`Force show the timer limit (${t}) reached.`));
      });
    } else
      l.warn("Timer wrapper, or `lrn-sm`, not found");
  }
}
function o() {
  e.elTimerWrapper.classList.toggle("lt__timer-hide");
}
function c() {
  const t = document.createElement("style"), n = `
/* Learnosity toggle timer styles */
.lrn.lrn-assess .lrn-region:not(.lrn-items-region) .lrn_btn.lt__timer-button {
    font-size: inherit;
}

.lrn-assess .lrn_btn.lt__timer-button .timer {
    padding: 8px;
    height: 29px;
    position: relative;
    top: -4px;
}

.lrn.lrn-assess .lt__timer-wrapper.lt__timer-hide .lrn_btn.lt__timer-button .timer .clock:before {
    padding-right: 0;
}

.lrn-timer-wrapper.lt__timer-hide .lt__timer-button .timer > *:not(.clock) {
    display: none;
}
`;
  t.setAttribute("data-style", "LT Toggle Timer"), t.textContent = n, document.head.append(t), e.renderedCss = !0;
}
const _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: p,
  toggle: o
}, Symbol.toStringTag, { value: "Module" }));
export {
  o as a,
  p as r,
  _ as t
};
