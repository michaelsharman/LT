import { c as x, l as y, r as w } from "./app-C0Ni2tF_.js";
const u = {
  renderedCss: !1,
  resize: {
    triggered: !1
  }
};
function z() {
  u.renderedCss || S(), x().on("item:load", () => {
    v();
  }), window.addEventListener("resize", () => {
    k(v, 250);
  });
}
function v() {
  const e = y();
  if (!e)
    return;
  const r = e.querySelectorAll('[class^="col-"]'), s = !!e.querySelector(".lt__resizer"), n = !!document.querySelector(".lrn-layout-single-column");
  if (r.length === 2) {
    if (!n && !s) {
      const l = A(), o = document.createElement("div");
      o.classList.add("lt__resizer"), o.setAttribute("role", "separator"), o.setAttribute("aria-orientation", "horizontal"), o.setAttribute("aria-pressed", "false"), o.setAttribute("aria-label", "Resize columns"), o.setAttribute("aria-describedby", `lt__helpText-${l}`);
      const i = document.createElement("span");
      i.classList.add("lt__resizer-tab", "lt__tooltip"), i.setAttribute("data-tooltip", "Click and hold to drag column width"), i.setAttribute("tabindex", "0"), i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-vertical-icon lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>';
      const a = document.createElement("span");
      a.classList.add("sr-only"), a.setAttribute("id", `lt__helpText-${l}`), a.textContent = "Press space to activate resize mode. Then use arrow keys to adjust the panel width. Press space again to finish.", r[0].classList.add("lt__column-left"), r[1].classList.add("lt__column-right"), o.append(i), o.append(a), r[0].after(o);
    } else n && s && E(e, r);
    L(e);
  }
}
function E(e, r) {
  e.querySelector(".lt__resizer")?.remove(), r[0].removeAttribute("style"), window.dispatchEvent(new Event("resize"));
}
function L(e) {
  const r = (n) => {
    const l = n.previousElementSibling, o = n.parentNode;
    let i = !1, a = 0, p = 0;
    const b = (t) => {
      t instanceof MouseEvent ? p = t.clientX : p = t.targetTouches[0].clientX, a = l.getBoundingClientRect().width, i = !0, n.setAttribute("aria-pressed", "true"), document.addEventListener("mousemove", m), document.addEventListener("mouseup", g), document.addEventListener("touchmove", m), document.addEventListener("touchend", g);
    }, m = (t) => {
      if (!i)
        return;
      let c;
      t instanceof MouseEvent ? c = t.clientX - p : c = t.targetTouches[0].clientX - p;
      const f = o.getBoundingClientRect().width, d = (a + c) * 100 / f;
      d >= 10 && d <= 90 && (l.style.width = d + "%");
    }, g = () => {
      i = !1, n.setAttribute("aria-pressed", "false"), document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", g), document.removeEventListener("touchmove", m), document.removeEventListener("touchend", g);
    }, _ = (t) => {
      if ((t.key === " " || t.key === "Spacebar") && (t.preventDefault(), i = !i, n.setAttribute("aria-pressed", String(i))), !i)
        return;
      const c = 2, f = o.getBoundingClientRect().width, d = l.getBoundingClientRect().width * 100 / f;
      if (t.key === "ArrowLeft") {
        t.preventDefault();
        const h = Math.max(10, d - c);
        l.style.width = h + "%";
      }
      if (t.key === "ArrowRight") {
        t.preventDefault();
        const h = Math.min(90, d + c);
        l.style.width = h + "%";
      }
    };
    n.addEventListener("mousedown", b), n.addEventListener("touchstart", b), n.addEventListener("keydown", _);
  }, s = e.querySelector(".lt__resizer");
  s && r(s);
}
function k(e, r) {
  u.resize.triggered || (u.resize.triggered = !0, e.apply(this));
  let s;
  return (...n) => {
    clearTimeout(s), s = setTimeout(() => {
      u.resize.triggered = !1, e.apply(this, n);
    }, r);
  };
}
function A() {
  return crypto.getRandomValues(new Uint32Array(1))[0].toString(36);
}
function S() {
  const e = document.createElement("style");
  let r = `
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
  w() !== "horizontal-fixed" && (r += `
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
        `), e.setAttribute("data-style", "LT Column Resizer"), e.textContent = r, document.head.append(e), u.renderedCss = !0;
}
const T = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: z
}, Symbol.toStringTag, { value: "Module" }));
export {
  T as c,
  z as r
};
