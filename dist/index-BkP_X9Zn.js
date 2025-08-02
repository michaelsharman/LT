import { c as x, l as y } from "./app-DzUv0oqG.js";
const a = {
  renderedCss: !1,
  resize: {
    triggered: !1
  }
};
function _() {
  a.renderedCss || k(), x().on("item:load", () => {
    b();
  }), window.addEventListener("resize", () => {
    L(b, 250);
  });
}
function b() {
  const e = y();
  if (!e)
    return;
  const n = e.querySelectorAll('[class^="col-"]'), r = !!e.querySelector(".lt__resizer"), i = !!document.querySelector(".lrn-layout-single-column");
  if (n.length === 2) {
    if (!i && !r) {
      const o = document.createElement("div");
      o.setAttribute("tooltip", "Click and hold to drag column width");
      const c = document.createElement("span");
      c.classList.add("lt__resizer-tab"), c.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-vertical-icon lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>', o.classList.add("lt__resizer"), n[0].classList.add("lrn-column-left"), n[1].classList.add("lrn-column-right"), o.append(c), n[0].after(o);
    } else i && r && z(e, n);
    E(e);
  }
}
function z(e, n) {
  e.querySelector(".lt__resizer")?.remove(), n[0].removeAttribute("style"), window.dispatchEvent(new Event("resize"));
}
function E(e) {
  const n = (i) => {
    const o = i.previousElementSibling, c = i.parentNode;
    let s = !1, f = 0, u = 0;
    const v = (t) => {
      t instanceof MouseEvent ? u = t.clientX : u = t.targetTouches[0].clientX, f = o.getBoundingClientRect().width, s = !0, i.setAttribute("aria-pressed", "true"), document.addEventListener("mousemove", m), document.addEventListener("mouseup", p), document.addEventListener("touchmove", m), document.addEventListener("touchend", p);
    }, m = (t) => {
      if (!s)
        return;
      let l;
      t instanceof MouseEvent ? l = t.clientX - u : l = t.targetTouches[0].clientX - u;
      const g = c.getBoundingClientRect().width, d = (f + l) * 100 / g;
      d >= 10 && d <= 90 && (o.style.width = d + "%");
    }, p = () => {
      s = !1, i.setAttribute("aria-pressed", "false"), document.removeEventListener("mousemove", m), document.removeEventListener("mouseup", p), document.removeEventListener("touchmove", m), document.removeEventListener("touchend", p);
    }, w = (t) => {
      if ((t.key === " " || t.key === "Spacebar") && (t.preventDefault(), s = !s, i.setAttribute("aria-pressed", String(s))), !s)
        return;
      const l = 2, g = c.getBoundingClientRect().width, d = o.getBoundingClientRect().width * 100 / g;
      if (t.key === "ArrowLeft") {
        t.preventDefault();
        const h = Math.max(10, d - l);
        o.style.width = h + "%";
      }
      if (t.key === "ArrowRight") {
        t.preventDefault();
        const h = Math.min(90, d + l);
        o.style.width = h + "%";
      }
    };
    i.addEventListener("mousedown", v), i.addEventListener("touchstart", v), i.addEventListener("keydown", w);
  }, r = e.querySelector(".lt__resizer");
  r && (r.setAttribute("tabindex", "0"), r.setAttribute("role", "separator"), r.setAttribute("aria-orientation", "horizontal"), r.setAttribute("aria-pressed", "false"), r.setAttribute("aria-label", "Resize panel"), n(r));
}
function L(e, n) {
  a.resize.triggered || (a.resize.triggered = !0, e.apply(this));
  let r;
  return (...i) => {
    clearTimeout(r), r = setTimeout(() => {
      a.resize.triggered = !1, e.apply(this, i);
    }, n);
  };
}
function k() {
  const e = document.createElement("style"), n = `
/* Learnosity column resizer styles */
.lt__resizer {
    background-color: #e8e8e8;
    width: 3px;
    padding: 0;
    position: relative;
    outline: none;
}
.lt__resizer .lt__resizer-tab {
    position: relative;
    width: 45px;
    height: 30px;
    border: 1px solid #e4e4e4;
    left: -22px;
    border-radius: 3px;
    cursor: col-resize;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    z-index: 2;
    padding-bottom: 3px;
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
.lt__resizer:focus {
    background-color: rgba(0, 123, 255, 0.1);
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
}

.lt__resizer:hover {
    background-color: rgba(0, 0, 0, 0.05);
}

.lt__resizer[aria-pressed="true"] {
    background-color: rgba(0, 123, 255, 0.2);

    .lt__resizer-tab {
        box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.5);
    }
}
.row {
    display: flex;
}
.col-xs-6.lrn-column-left {
    display: flex;
    flex-direction: column;
    min-width: 5em;
    overflow: hidden;
}
.col-xs-6.lrn-column-right {
    display: flex;

    flex: 1;
    display: flex;
    flex-direction: column;
    min-width: 5em;
    overflow: hidden;
}
.lrn-column-left .lrn_widget,
.lrn-column-right .lrn_widget {
    padding: 1.5em;
}
@media (max-width: 650px) {
    .lt__resizer {
        display: none;
    }
}
`;
  e.setAttribute("data-style", "LT Column Resizer"), e.textContent = n, document.head.append(e), a.renderedCss = !0;
}
const A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: _
}, Symbol.toStringTag, { value: "Module" }));
export {
  A as c,
  _ as r
};
