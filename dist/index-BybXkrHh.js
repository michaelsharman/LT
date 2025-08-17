import { c as n } from "./extensionsFactory-DRAOPv5d.js";
import o from "./logger.js";
const e = {
  _initialised: !1,
  elTimerWrapper: null,
  enableForceTimerShow: !1,
  forceRenderTimer: !1,
  renderedCss: !1
};
function s(r = 60) {
  if (e._initialised)
    o.debug("Toggle timer already initialised, ignoring run();");
  else {
    const t = document.querySelector(".lrn-sm");
    if (e.elTimerWrapper = document.querySelector(".lrn-timer-wrapper"), !e.elTimerWrapper) {
      o.warn("Timer wrapper not found, cannot run toggle timer extension");
      return;
    }
    e.elTimer = e.elTimerWrapper.querySelector(".timer"), e.elClock = e.elTimerWrapper.querySelector(".clock"), t && e.elTimerWrapper ? (e.renderedCss || (p(), e.renderedCss = !0), e._initialised = !0, e.elTimerWrapper.querySelector(".timer"), e.elTimerWrapper.classList.add("lt__timer-wrapper", "lrn_btn", "lt__tooltip"), e.elTimerWrapper.setAttribute("role", "button"), e.elTimerWrapper.setAttribute("tabindex", "0"), e.elTimerWrapper.setAttribute("aria-pressed", "true"), e.elTimerWrapper.setAttribute("aria-label", "Assessment time. Timer is visible. Click to hide it."), e.elTimerWrapper.addEventListener("click", l), e.elTimerWrapper.addEventListener("keydown", (i) => {
      (i.key === "Enter" || i.key === " ") && (i.preventDefault(), l());
    })) : o.warn("Timer wrapper, or `lrn-sm`, not found");
  }
}
function l() {
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
  a(!r);
}
function a(r) {
  e.elTimerWrapper.setAttribute("aria-pressed", String(r)), e.elTimerWrapper.setAttribute(
    "aria-label",
    `Assessment time. Timer is ${r ? "visible" : "hidden"}. Click to ${r ? "hide" : "show"} it.`
  );
}
function p() {
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

    &.lt__tooltip {
        &::before,
        &::after {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease-in 0.2s, visibility 0s linear 0.2s;
            visibility: hidden;
            z-index: 10;
            font-family: inherit;
        }

        &::before {
            box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
            content: attr(aria-label);
            position: absolute;
            top: -55px;
            left: 50%;
            transform: translateX(-50%);
            background: #4d4d4d;
            color: #fff;
            padding: 10px 30px;
            border-radius: 4px;
            white-space: nowrap;
            font-size: 14px;
        }

        &::after {
            content: '';
            position: absolute;
            bottom: 105%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-top-color: #4d4d4d;
        }

        &:is(:hover, :focus)::before,
        &:is(:hover, :focus)::after {
            opacity: 1;
            visibility: visible;
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
const d = n("toggleTimer", s, {
  toggle: l
}), u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  toggleTimer: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  d as a,
  u as t
};
