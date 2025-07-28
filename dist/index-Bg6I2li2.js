import { m as n, c as s, l as c } from "./app-CnMVZMul.js";
import { l as a } from "./logger-BpyELtLr.js";
const e = {
  _initialised: !1,
  elTimerWrapper: null,
  enableForceTimerShow: !1,
  forceRenderTimer: !1,
  renderedCss: !1
};
function p(r = 60) {
  if (e._initialised)
    a.debug("Toggle timer already initialised, ignoring run();");
  else {
    const t = document.querySelector(".lrn-sm");
    if (e.elTimerWrapper = document.querySelector(".lrn-timer-wrapper"), e.elTimer = e.elTimerWrapper.querySelector(".timer"), e.elClock = e.elTimerWrapper.querySelector(".clock"), t && e.elTimerWrapper) {
      e.renderedCss || m(), e._initialised = !0;
      const o = e.elTimerWrapper.querySelector(".timer");
      e.elTimerWrapper.classList.add("lt__timer-wrapper"), e.elTimerWrapper.setAttribute("role", "button"), e.elTimerWrapper.setAttribute("tabindex", "0"), e.elTimerWrapper.setAttribute("aria-pressed", "true"), e.elTimerWrapper.setAttribute("aria-label", "Assessment time. Timer is visible. Click to hide it."), e.enableForceTimerShow && n() > 0 && s().on("time:change", () => {
        const i = c();
        !e.forceRenderTimer && typeof i == "number" && i <= Number(r) && o.classList.contains("hidden") && (e.forceRenderTimer = !0, l(), a.info(`Force show the timer limit (${r}) reached.`));
      }), e.elTimerWrapper.addEventListener("click", l), e.elTimerWrapper.addEventListener("keydown", (i) => {
        (i.key === "Enter" || i.key === " ") && (i.preventDefault(), l());
      });
    } else
      a.warn("Timer wrapper, or `lrn-sm`, not found");
  }
}
function l() {
  if (!e.elTimerWrapper)
    return;
  const r = !e.elTimer.classList.contains("hidden");
  if (r) {
    e.elTimer.classList.add("hidden");
    const o = e.elTimerWrapper.querySelector(".clock").cloneNode(!0);
    o.classList.add("clock-copy"), o.classList.remove("clock"), e.elTimerWrapper.appendChild(o);
  } else {
    const t = e.elTimerWrapper.querySelector(".clock-copy");
    t && t.remove(), e.elTimer.classList.remove("hidden");
  }
  d(!r);
}
function d(r) {
  e.elTimerWrapper.setAttribute("aria-pressed", String(r)), e.elTimerWrapper.setAttribute(
    "aria-label",
    `Assessment time. Timer is ${r ? "visible" : "hidden"}. Click to ${r ? "hide" : "show"} it.`
  );
}
function m() {
  const r = document.createElement("style");
  r.setAttribute("data-style", "LT Toggle Timer");
  const t = `
/* Learnosity toggle timer styles */
.lrn-timer-wrapper.lt__timer-wrapper {
    position: relative;
    border-radius: 2px;
    cursor: pointer;
    background-color: #eaeaea;
    color: #333;
    border: 1px solid #d9d9d9;

    &:hover {
        background-color: #d9d9d9;
        color: #333;
    }

    &:focus {
        box-shadow: none;
        border: 1px solid #1877b1;
    }

    &:active {
        box-shadow: none;
    }

    .clock-copy {
        display: inline-block;
        vertical-align: top;
        max-width: 100%;
        padding: .74em .9em;

        &:before {
            font-family: "LearnosityIconsRegular";
            top: 0;
            float: left;
            padding-left: .4em;
            padding-right: .4em;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            content: "";
        }
    }
}
`;
  r.setAttribute("data-style", "LT Toggle Timer"), r.textContent = t, document.head.append(r), e.renderedCss = !0;
}
const f = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: p,
  toggle: l
}, Symbol.toStringTag, { value: "Module" }));
export {
  l as a,
  p as r,
  f as t
};
