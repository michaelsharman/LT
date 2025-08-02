import { c as v, l as f } from "./app-C501rTFe.js";
const s = {
  renderedCss: !1,
  resize: {
    triggered: !1
  }
};
function h() {
  s.renderedCss || b(), v().on("item:load", () => {
    p();
  }), window.addEventListener("resize", () => {
    w(p, 250);
  });
}
function p() {
  const e = f();
  if (!e)
    return;
  const t = e.querySelectorAll('[class^="col-"]'), r = !!e.querySelector(".lrn-resizer"), n = !!document.querySelector(".lrn-layout-single-column");
  if (t.length === 2) {
    if (!n && !r) {
      const i = document.createElement("div");
      i.setAttribute("tooltip", "Click and hold to drag column width");
      const o = document.createElement("span");
      o.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-vertical-icon lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>', i.classList.add("lrn-resizer"), t[0].classList.add("lrn-column-left"), t[1].classList.add("lrn-column-right"), i.append(o), t[0].after(i);
    } else n && r && x(e, t);
    y(e);
  }
}
function x(e, t) {
  e.querySelector(".lrn-resizer")?.remove(), t[0].removeAttribute("style"), window.dispatchEvent(new Event("resize"));
}
function y(e) {
  const t = (n) => {
    const i = n.previousElementSibling;
    let o = 0, m = 0;
    const g = (l) => {
      l instanceof MouseEvent ? o = l.clientX : o = l.targetTouches[0].clientX, m = i.getBoundingClientRect().width, document.addEventListener("mousemove", c), document.addEventListener("mouseup", d), document.addEventListener("touchmove", c), document.addEventListener("touchend", d);
    }, c = (l) => {
      let a;
      l instanceof MouseEvent ? a = l.clientX - o : a = l.targetTouches[0].clientX - o;
      const u = (m + a) * 100 / n.parentNode.getBoundingClientRect().width;
      u >= 10 && u <= 90 && (i.style.width = u + "%");
    }, d = () => {
      document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", d), document.removeEventListener("touchmove", c), document.removeEventListener("touchend", d);
    };
    n.addEventListener("mousedown", g), n.addEventListener("touchstart", g);
  }, r = e.querySelector(".lrn-resizer");
  r && t(r);
}
function w(e, t) {
  s.resize.triggered || (s.resize.triggered = !0, e.apply(this));
  let r;
  return (...n) => {
    clearTimeout(r), r = setTimeout(() => {
      s.resize.triggered = !1, e.apply(this, n);
    }, t);
  };
}
function b() {
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
  e.setAttribute("data-style", "LT Column Resizer"), e.textContent = t, document.head.append(e), s.renderedCss = !0;
}
const E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: h
}, Symbol.toStringTag, { value: "Module" }));
export {
  E as c,
  h as r
};
