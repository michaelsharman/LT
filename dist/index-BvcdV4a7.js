import { c as v, l as f } from "./app-C501rTFe.js";
const l = {
  renderedCss: !1,
  resize: {
    triggered: !1
  }
};
function h() {
  l.renderedCss || b(), v().on("item:load", () => {
    g();
  }), window.addEventListener("resize", () => {
    w(g, 250);
  });
}
function g() {
  const e = f();
  if (!e)
    return;
  const t = e.querySelectorAll('[class^="col-"]'), r = !!e.querySelector(".lt__resizer"), n = !!document.querySelector(".lrn-layout-single-column");
  if (t.length === 2) {
    if (!n && !r) {
      const o = document.createElement("div");
      o.setAttribute("tooltip", "Click and hold to drag column width");
      const i = document.createElement("span");
      i.classList.add("lt__resizer-tab"), i.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grip-vertical-icon lucide-grip-vertical"><circle cx="9" cy="12" r="1"/><circle cx="9" cy="5" r="1"/><circle cx="9" cy="19" r="1"/><circle cx="15" cy="12" r="1"/><circle cx="15" cy="5" r="1"/><circle cx="15" cy="19" r="1"/></svg>', o.classList.add("lt__resizer"), t[0].classList.add("lrn-column-left"), t[1].classList.add("lrn-column-right"), o.append(i), t[0].after(o);
    } else n && r && x(e, t);
    y(e);
  }
}
function x(e, t) {
  e.querySelector(".lt__resizer")?.remove(), t[0].removeAttribute("style"), window.dispatchEvent(new Event("resize"));
}
function y(e) {
  const t = (n) => {
    const o = n.previousElementSibling;
    let i = 0, m = 0;
    const p = (s) => {
      s instanceof MouseEvent ? i = s.clientX : i = s.targetTouches[0].clientX, m = o.getBoundingClientRect().width, document.addEventListener("mousemove", c), document.addEventListener("mouseup", d), document.addEventListener("touchmove", c), document.addEventListener("touchend", d);
    }, c = (s) => {
      let a;
      s instanceof MouseEvent ? a = s.clientX - i : a = s.targetTouches[0].clientX - i;
      const u = (m + a) * 100 / n.parentNode.getBoundingClientRect().width;
      u >= 10 && u <= 90 && (o.style.width = u + "%");
    }, d = () => {
      document.removeEventListener("mousemove", c), document.removeEventListener("mouseup", d), document.removeEventListener("touchmove", c), document.removeEventListener("touchend", d);
    };
    n.addEventListener("mousedown", p), n.addEventListener("touchstart", p);
  }, r = e.querySelector(".lt__resizer");
  r && t(r);
}
function w(e, t) {
  l.resize.triggered || (l.resize.triggered = !0, e.apply(this));
  let r;
  return (...n) => {
    clearTimeout(r), r = setTimeout(() => {
      l.resize.triggered = !1, e.apply(this, n);
    }, t);
  };
}
function b() {
  const e = document.createElement("style"), t = `
/* Learnosity column resizer styles */
.lt__resizer {
    background-color: #e8e8e8;
    cursor: grab;
    width: 3px;
    padding: 0;
    position: relative;
}
.lt__resizer .lt__resizer-tab {
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

    svg {
        width: 18px;
        height: 18px;
        top: 1px;
        position: relative;
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
  e.setAttribute("data-style", "LT Column Resizer"), e.textContent = t, document.head.append(e), l.renderedCss = !0;
}
const _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: h
}, Symbol.toStringTag, { value: "Module" }));
export {
  _ as c,
  h as r
};
