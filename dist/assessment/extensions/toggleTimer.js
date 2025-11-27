import { c as m, L as i } from "../../extensionsFactory-BHOEyOSK.js";
const e = {
  initialised: !1,
  elTimerWrapper: null,
  elTimer: null,
  elClock: null
};
function d(r) {
  const { showTimerLimit: w = 60 } = r || {};
  if (e.initialised) {
    i.utils.logger.debug("Toggle timer already initialised, ignoring run();");
    return;
  }
  const a = document.querySelector(".lrn-sm"), t = document.querySelector(".lrn-timer-wrapper");
  if (!a || !t) {
    i.utils.logger.warn("Timer wrapper, or `.lrn-sm`, not found");
    return;
  }
  const o = t.querySelector(".timer"), s = t.querySelector(".clock");
  if (!o) {
    i.utils.logger.warn("Timer element not found, cannot run toggle timer extension");
    return;
  }
  e.elTimerWrapper = t, e.elTimer = o, e.elClock = s, requestAnimationFrame(() => {
    if (e.elTimerWrapper.classList.add("lt__timer-wrapper", "lrn_btn", "lt__tooltip"), e.elTimerWrapper.setAttribute("role", "button"), e.elTimerWrapper.setAttribute("tabindex", "0"), p(!0), e.elTimerWrapper.addEventListener("click", c), e.elTimerWrapper.addEventListener("keydown", u), !e.elTimerWrapper.querySelector(".lt__clock-glyph")) {
      const n = document.createElement("span");
      n.className = "lt__clock-glyph", e.elTimerWrapper.appendChild(n);
    }
    e.initialised = !0;
  });
}
function c() {
  l();
}
function u(r) {
  (r.key === "Enter" || r.key === " ") && (r.preventDefault(), l());
}
function l() {
  if (!e.elTimerWrapper || !e.elTimer)
    return;
  const r = !e.elTimerWrapper.classList.contains("lt--timer-hidden");
  e.elTimerWrapper.classList.toggle("lt--timer-hidden", r), p(!r);
}
function p(r) {
  e.elTimerWrapper.setAttribute("aria-pressed", String(r)), e.elTimerWrapper.setAttribute(
    "aria-label",
    `Assessment time. Timer is ${r ? "visible" : "hidden"}. Click to ${r ? "hide" : "show"} it.`
  );
}
function _() {
  return `
        /* Learnosity toggle timer styles */
        .lrn-timer-wrapper.lt__timer-wrapper {
            position: relative;
            border-radius: 2px;
            cursor: pointer;
            background-color: #eaeaea;
            color: #333;
            border: 1px solid #d9d9d9;
        }
        .lrn-timer-wrapper.lt__timer-wrapper:hover {
            background-color: #d9d9d9;
            color: #333;
        }
        .lrn-timer-wrapper.lt__timer-wrapper:focus {
            box-shadow: none;
            border: 1px solid #1877b1;
        }
        .lrn-timer-wrapper.lt__timer-wrapper:active {
            box-shadow: none;
        }

        /* When hidden, suppress the timer number and show the clock icon via ::before */
        .lrn-timer-wrapper.lt__timer-wrapper.lt--timer-hidden .timer {
            display: none !important;
        }
        /* Hide numbers when off */
        .lrn-timer-wrapper.lt__timer-wrapper.lt--timer-hidden .timer {
            display: none !important;
        }

        /* Clock glyph element (no tooltip conflict) */
        .lrn-timer-wrapper.lt__timer-wrapper .lt__clock-glyph {
            display: none;
        }

        .lrn-timer-wrapper.lt__timer-wrapper.lt--timer-hidden .lt__clock-glyph {
            display: inline-block;
            vertical-align: top;
            max-width: 100%;
            padding: .68em .9em;
        }

        /* Render the clock via icon font */
        .lrn-timer-wrapper.lt__timer-wrapper .lt__clock-glyph::before {
            font-family: "LearnosityIconsRegular";
            position: relative;
            top: 1px;
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            content: ""; /* same glyph you used before */
        }

        /* Tooltip */
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip::before,
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip::after {
            opacity: 0;
            pointer-events: none;
            transition: opacity 0.2s ease-in 0.2s, visibility 0s linear 0.2s;
            visibility: hidden;
            z-index: 10;
            font-family: inherit;
        }
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip::before {
            box-shadow: 2px 2px 2px rgba(0,0,0,0.2);
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
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip::after {
            content: '';
            position: absolute;
            bottom: 103%;
            left: 50%;
            transform: translateX(-50%);
            border: 6px solid transparent;
            border-top-color: #4d4d4d;
        }
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip:is(:hover, :focus)::before,
        .lrn-timer-wrapper.lt__timer-wrapper.lt__tooltip:is(:hover, :focus)::after {
            opacity: 1;
            visibility: visible;
        }

        /* Layout adjustment */
        .lrn.lrn-assess .lrn-region:not(.lrn-items-region) .lrn_btn.lt__timer-wrapper {
            font-size: inherit;
            padding: 0.01em;
        }
    `;
}
const g = m("toggleTimer", d, {
  getStyles: _,
  toggle: l
});
export {
  g as toggleTimer
};
