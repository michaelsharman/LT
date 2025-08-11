import l from "./logger.js";
const e = {
  _initialised: !1,
  elTimerWrapper: null,
  enableForceTimerShow: !1,
  forceRenderTimer: !1,
  renderedCss: !1
};
function n(r = 60) {
  if (e._initialised)
    l.debug("Toggle timer already initialised, ignoring run();");
  else {
    const t = document.querySelector(".lrn-sm");
    if (e.elTimerWrapper = document.querySelector(".lrn-timer-wrapper"), !e.elTimerWrapper) {
      l.warn("Timer wrapper not found, cannot run toggle timer extension");
      return;
    }
    e.elTimer = e.elTimerWrapper.querySelector(".timer"), e.elClock = e.elTimerWrapper.querySelector(".clock"), t && e.elTimerWrapper ? (e.renderedCss || (a(), e.renderedCss = !0), e._initialised = !0, e.elTimerWrapper.querySelector(".timer"), e.elTimerWrapper.classList.add("lt__timer-wrapper", "lrn_btn"), e.elTimerWrapper.setAttribute("role", "button"), e.elTimerWrapper.setAttribute("tabindex", "0"), e.elTimerWrapper.setAttribute("aria-pressed", "true"), e.elTimerWrapper.setAttribute("aria-label", "Assessment time. Timer is visible. Click to hide it."), e.elTimerWrapper.addEventListener("click", o), e.elTimerWrapper.addEventListener("keydown", (i) => {
      (i.key === "Enter" || i.key === " ") && (i.preventDefault(), o());
    })) : l.warn("Timer wrapper, or `lrn-sm`, not found");
  }
}
function o() {
  if (!e.elTimerWrapper)
    return;
  const r = !e.elTimer.classList.contains("hidden");
  if (r) {
    e.elTimer.classList.add("hidden");
    const i = e.elTimerWrapper.querySelector(".clock").cloneNode(!0);
    i.classList.add("clock-copy"), i.classList.remove("clock"), e.elTimerWrapper.appendChild(i);
  } else {
    const t = e.elTimerWrapper.querySelector(".clock-copy");
    t && t.remove(), e.elTimer.classList.remove("hidden");
  }
  s(!r);
}
function s(r) {
  e.elTimerWrapper.setAttribute("aria-pressed", String(r)), e.elTimerWrapper.setAttribute(
    "aria-label",
    `Assessment time. Timer is ${r ? "visible" : "hidden"}. Click to ${r ? "hide" : "show"} it.`
  );
}
function a() {
  const r = document.createElement("style"), t = `
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
        padding: .68em .9em;

        &:before {
            font-family: "LearnosityIconsRegular";
            top: 1px;
            position: relative;
            float: left;
            padding-left: .4em;
            padding-right: .4em;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            content: "";
        }
    }
}

.lrn.lrn-assess .lrn-region:not(.lrn-items-region) .lrn_btn.lt__timer-wrapper {
    font-size: inherit;
    padding: 0.01em;
}
`;
  r.setAttribute("data-style", "LT Toggle Timer"), r.textContent = t, document.head.append(r), e.renderedCss = !0;
}
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: n,
  toggle: o
}, Symbol.toStringTag, { value: "Module" }));
export {
  o as a,
  n as r,
  d as t
};
