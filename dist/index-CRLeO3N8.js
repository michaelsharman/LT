import { c as f, l as v } from "./app-C501rTFe.js";
const l = {
  renderedCss: !1,
  resize: {
    triggered: !1
  }
};
function h() {
  l.renderedCss || z(), f().on("item:load", () => {
    g();
  }), window.addEventListener("resize", () => {
    y(g, 250);
  });
}
function g() {
  const e = v();
  if (!e)
    return;
  const t = e.querySelectorAll('[class^="col-"]'), r = !!e.querySelector(".lrn-resizer"), n = !!document.querySelector(".lrn-layout-single-column");
  if (t.length === 2) {
    if (!n && !r) {
      const o = document.createElement("div");
      o.setAttribute("tooltip", "Click and hold to drag column width");
      const i = document.createElement("span");
      i.innerHTML = "↤ ↦", o.classList.add("lrn-resizer"), t[0].classList.add("lrn-column-left"), t[1].classList.add("lrn-column-right"), o.append(i), t[0].after(o);
    } else n && r && b(e, t);
    x(e);
  }
}
function b(e, t) {
  e.querySelector(".lrn-resizer")?.remove(), t[0].removeAttribute("style"), window.dispatchEvent(new Event("resize"));
}
function x(e) {
  const t = (n) => {
    const o = n.previousElementSibling;
    let i = 0, m = 0;
    const p = (s) => {
      s instanceof MouseEvent ? i = s.clientX : i = s.targetTouches[0].clientX, m = o.getBoundingClientRect().width, document.addEventListener("mousemove", d), document.addEventListener("mouseup", c), document.addEventListener("touchmove", d), document.addEventListener("touchend", c);
    }, d = (s) => {
      let a;
      s instanceof MouseEvent ? a = s.clientX - i : a = s.targetTouches[0].clientX - i;
      const u = (m + a) * 100 / n.parentNode.getBoundingClientRect().width;
      u >= 10 && u <= 90 && (o.style.width = u + "%");
    }, c = () => {
      document.removeEventListener("mousemove", d), document.removeEventListener("mouseup", c), document.removeEventListener("touchmove", d), document.removeEventListener("touchend", c);
    };
    n.addEventListener("mousedown", p), n.addEventListener("touchstart", p);
  }, r = e.querySelector(".lrn-resizer");
  r && t(r);
}
function y(e, t) {
  l.resize.triggered || (l.resize.triggered = !0, e.apply(this));
  let r;
  return (...n) => {
    clearTimeout(r), r = setTimeout(() => {
      l.resize.triggered = !1, e.apply(this, n);
    }, t);
  };
}
function z() {
  const e = document.createElement("style"), t = `
/* Learnosity column resizer styles */
.lrn-resizer {
    background-color: #e8e8e8;
    cursor: grab;
    width: 3px;
    padding: 0;
    position: relative;
}
.lrn-resizer span {
    position: relative;
    width: 45px;
    height: 30px;
    border: 1px solid #e4e4e4;
    left: -22px;
    border-radius: 3px;
    cursor: grab;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em;
    z-index: 2;
    padding-bottom: 3px;
    color: #444;

    -webkit-user-select: none;
    user-select: none;

    background: rgb(233,233,233);
    background: linear-gradient(0deg, rgba(233,233,233,1) 0%, rgba(250,250,250,1) 51%, rgba(238,238,238,1) 100%);
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
    .lrn-resizer {
        display: none;
    }
}
`;
  e.setAttribute("data-style", "LT Column Resizer"), e.textContent = t, document.head.append(e), l.renderedCss = !0;
}
const E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: h
}, Symbol.toStringTag, { value: "Module" }));
export {
  E as c,
  h as r
};
