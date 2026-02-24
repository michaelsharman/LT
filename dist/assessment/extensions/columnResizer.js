import { c as w, L as b } from "../../extensionsFactory-BHOEyOSK.js";
const h = {
  resize: {
    triggered: !1
  }
};
function y() {
  b.eventBus.on("item:load", () => {
    x();
  }, "columnResizer"), window.addEventListener("resize", () => {
    L(x, 250);
  });
}
function x() {
  const e = b.itemElement();
  if (!e)
    return;
  const o = e.querySelectorAll('[class^="col-"]'), s = !!e.querySelector(".lt__resizer"), r = !!document.querySelector(".lrn-layout-single-column");
  if (o.length === 2) {
    if (!r && !s) {
      const l = k(), i = document.createElement("div");
      i.classList.add("lt__resizer"), i.setAttribute("role", "separator"), i.setAttribute("aria-orientation", "horizontal"), i.setAttribute("aria-pressed", "false"), i.setAttribute("aria-label", "Resize columns"), i.setAttribute("aria-describedby", `lt__helpText-${l}`);
      const n = document.createElement("span");
      n.classList.add("lt__resizer-tab", "lt__tooltip"), n.setAttribute("data-tooltip", "Click and hold to drag column width"), n.setAttribute("tabindex", "0"), n.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-vertical-icon lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>';
      const a = document.createElement("span");
      a.classList.add("sr-only"), a.setAttribute("id", `lt__helpText-${l}`), a.textContent = "Press space to activate resize mode. Then use arrow keys to adjust the panel width. Press space again to finish.", o[0].classList.add("lt__column-left"), o[1].classList.add("lt__column-right"), i.append(n), i.append(a), o[0].after(i);
    } else r && s && z(e, o);
    E(e);
  }
}
function z(e, o) {
  e.querySelector(".lt__resizer")?.remove(), o[0].removeAttribute("style"), window.dispatchEvent(new Event("resize"));
}
function E(e) {
  const o = (r) => {
    const l = r.previousElementSibling, i = r.parentNode;
    let n = !1, a = 0, u = 0;
    const v = (t) => {
      t instanceof MouseEvent ? u = t.clientX : u = t.targetTouches[0].clientX, a = l.getBoundingClientRect().width, n = !0, r.setAttribute("aria-pressed", "true"), document.addEventListener("mousemove", p), document.addEventListener("mouseup", g), document.addEventListener("touchmove", p), document.addEventListener("touchend", g);
    }, p = (t) => {
      if (!n)
        return;
      let c;
      t instanceof MouseEvent ? c = t.clientX - u : c = t.targetTouches[0].clientX - u;
      const m = i.getBoundingClientRect().width, d = (a + c) * 100 / m;
      d >= 10 && d <= 90 && (l.style.width = d + "%");
    }, g = () => {
      n = !1, r.setAttribute("aria-pressed", "false"), document.removeEventListener("mousemove", p), document.removeEventListener("mouseup", g), document.removeEventListener("touchmove", p), document.removeEventListener("touchend", g);
    }, _ = (t) => {
      if ((t.key === " " || t.key === "Spacebar") && (t.preventDefault(), n = !n, r.setAttribute("aria-pressed", String(n))), !n)
        return;
      const c = 2, m = i.getBoundingClientRect().width, d = l.getBoundingClientRect().width * 100 / m;
      if (t.key === "ArrowLeft") {
        t.preventDefault();
        const f = Math.max(10, d - c);
        l.style.width = f + "%";
      }
      if (t.key === "ArrowRight") {
        t.preventDefault();
        const f = Math.min(90, d + c);
        l.style.width = f + "%";
      }
    };
    r.addEventListener("mousedown", v), r.addEventListener("touchstart", v), r.addEventListener("keydown", _);
  }, s = e.querySelector(".lt__resizer");
  s && o(s);
}
function L(e, o) {
  h.resize.triggered || (h.resize.triggered = !0, e.apply(this));
  let s;
  return (...r) => {
    clearTimeout(s), s = setTimeout(() => {
      h.resize.triggered = !1, e.apply(this, r);
    }, o);
  };
}
function k() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}
function A() {
  let e = `
        /* Learnosity column resizer styles */
        .lt__resizer {
            background-color: #e8e8e8;
            width: 3px;
            padding: 0;
            position: relative;
            outline: none;

            &:hover {
                background-color: rgba(0, 0, 0, 0.05);
            }

            &[aria-pressed='true'] {
                background-color: rgba(0, 123, 255, 0.2);
                box-shadow:
                    0 0 0 2px rgba(0, 123, 255, 0.5),
                    0 0 0 2px rgba(0, 123, 255, 0.2);
            }

            .lt__resizer-tab {
                position: relative;
                width: 45px;
                height: 30px;
                border: 1px solid #e4e4e4;
                left: -21px;
                top: -2px;
                border-radius: 3px;
                cursor: col-resize;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 1.5em;
                z-index: 2;
                padding-bottom: 4px;
                color: #444;
                -webkit-user-select: none;
                user-select: none;
                background: linear-gradient(0deg, rgba(245,245,245,1) 0%, rgba(250,250,250,1) 51%, rgba(245,245,245,1) 100%);

                svg {
                    width: 18px;
                    height: 18px;
                    top: 2px;
                    position: relative;
                }
            }
        }

        .lt__resizer[aria-pressed='true'] .lt__resizer-tab:focus {
        background-color: rgba(0, 123, 255, 0.25);
        box-shadow:
            0 0 0 2px rgba(0, 123, 255, 0.5),
            0 0 0 4px rgba(0, 123, 255, 0.2);
        }

        .row {
            display: flex;
        }

        [class*="col-xs-"].lt__column-left,
        [class*="col-xs-"].lt__column-right {
            display: flex;
            flex-direction: column;
            min-width: 5em;
            overflow: auto;
        }

        [class*="col-xs-"].lt__column-right {
            flex: 1;
        }

        .lt__column-left .lrn_widget {
            padding-right: 0.75em;
        }
        .lt__column-right .lrn_widget {
            padding-left: 0.75em;
        }

        .lrn-layout-single-column {
            .lt__resizer {
                all: unset;
                display: none;
            }

            .lt__column-left .lrn_widget,
            .lt__column-right .lrn_widget {
                padding: 0;
            }
        }
    `;
  return b.region() !== "horizontal-fixed" && (e += `
            .lt__resizer:not(:is(.lrn-fullscreen *)) {
                .lt__tooltip {
                    &::before,
                    &::after {
                        opacity: 0;
                        pointer-events: none;
                        transition: opacity 0.2s ease-in 0.2s, visibility 0s linear 0.2s;
                        visibility: hidden;
                        z-index: 10;
                    }

                    &::before {
                        box-shadow: 2px 2px 2px rgba(0, 0, 0, 0.2);
                        content: attr(data-tooltip);
                        position: absolute;
                        bottom: 140%;
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
        `), e;
}
const T = w("columnResizer", y, { getStyles: A });
export {
  T as columnResizer
};
