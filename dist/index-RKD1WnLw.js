import { c as U, e as W } from "./app-CnMVZMul.js";
import { l as Z } from "./logger-BpyELtLr.js";
const G = "ERROR", p = {
  _initialised: !1,
  magnifier: null
};
function Q(c) {
  p._initialised ? Z.debug("Magnifier already initialised, ignoring run();", G) : (c || (c = {
    zoom: 4,
    shape: "square",
    width: 350,
    height: 350
  }), p.magnifier = new K(c), p._initialised = !0);
}
function F(c = "lrn__magnifier") {
  document.querySelectorAll(`.${c}`).forEach((h) => {
    h.addEventListener("click", () => {
      p.magnifier.toggle();
    });
  }), U().on("item:load", ee());
}
function J() {
  p.magnifier.toggle();
}
function K(c) {
  const o = this;
  o.options = Object.assign(
    {
      zoom: 2,
      shape: "square",
      width: 200,
      height: 200
    },
    c
  );
  const h = `<div id="lt__magnifier" class="magnifier" style="display: none;position: fixed;overflow: hidden;background-color: white;border: 1px solid #555;border-radius: 4px;z-index:10000;">
                                <div class="magnifier-content" style="top: 0px;left: 0px;margin-left: 0px;margin-top: 0px;overflow: visible;position: absolute;display: block;transform-origin: left top;-moz-transform-origin: left top;-ms-transform-origin: left top;-webkit-transform-origin: left top;-o-transform-origin: left top;user-select: none;-moz-user-select: none;-webkit-user-select: none;padding-top: 0px"></div>
                                <div class="magnifier-glass" style="position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;opacity: 0.0;-ms-filter: alpha(opacity=0);background-color: white;cursor: move;"></div>
                            </div>`;
  let r, l, S, z, u = !1, m;
  const x = {};
  document.addEventListener("keydown", (e) => {
    e.key === "Escape" && o.isVisible() && o.hide();
  });
  function B(e, t, i) {
    e.style.left = `${t}px`, e.style.top = `${i}px`;
  }
  function _(e, t, i) {
    e.style.width = `${t}px`, e.style.height = `${i}px`;
  }
  function y() {
    switch (o.options.shape) {
      case "square":
        _(r, o.options.width, o.options.height);
        break;
      case "circle":
        _(r, o.options.width, o.options.height), r.style.borderRadius = "50%";
        break;
    }
    l.style.WebkitTransform = l.style.MozTransform = l.style.OTransform = l.style.MsTransform = l.style.transform = `scale(${o.options.zoom})`;
  }
  function I(e, t) {
    let i = t;
    for (; i != null; ) {
      if (i == e)
        return !0;
      i = i.parentNode;
    }
    return !1;
  }
  function q() {
    u && (N(), T(), L());
  }
  function A() {
    u && (window.clearTimeout(z), z = window.setTimeout(q, 100));
  }
  function M() {
    u && A();
  }
  function X() {
    S && (S.disconnect(), S = null), document.removeEventListener && (document.removeEventListener("DOMNodeInserted", M, !1), document.removeEventListener("DOMNodeRemoved", M, !1));
  }
  function b(e, t) {
    const i = x[e];
    if (i)
      for (let n = 0; n < i.length; n++)
        i[n].call(o, t);
  }
  function T() {
    const e = r.offsetLeft, t = r.offsetTop, i = document.body.scrollLeft, n = document.body.scrollTop, d = -e * o.options.zoom - i * o.options.zoom, v = -t * o.options.zoom - n * o.options.zoom;
    B(l, d, v), b("viewPortChanged", m);
  }
  function E(e, t) {
    const i = e.querySelectorAll(t);
    if (i.length > 0)
      for (let n = 0; n < i.length; n++)
        i[n].parentNode.removeChild(i[n]);
  }
  function N() {
    l.innerHTML = "";
    const e = document.body, t = e.cloneNode(!0), i = e.style.backgroundColor;
    i && r.css("background-color", i), t.style.cursor = "auto", t.style.paddingTop = "0px", t.setAttribute("unselectable", "on");
    const n = e.querySelectorAll("canvas"), d = t.querySelectorAll("canvas");
    if (n.length > 0 && n.length === d.length)
      for (let g = 0; g < n.length; g++)
        d[g].getContext("2d").drawImage(n[g], 0, 0);
    E(t, "script"), E(t, "audio"), E(t, "video"), E(t, ".magnifier"), b("prepareContent", t), l.appendChild(t);
    const v = document.body.clientWidth, C = document.body.clientHeight;
    _(l, v, C), m = l.querySelector("body"), b("contentUpdated", m);
  }
  function $() {
    b("initScrollBars", m);
  }
  function H(e) {
    const t = [];
    if (e.getAttribute) {
      e.getAttribute("id") && t.push("#" + e.getAttribute("id")), e.className && t.push("." + e.className.split(" ").join("."));
      for (let i = 0; i < t.length; i++) {
        const n = m.querySelectorAll(t[i]);
        if (n.length == 1)
          return n[0].scrollTop = e.scrollTop, n[0].scrollLeft = e.scrollLeft, !0;
      }
    } else e == document && T();
    return !1;
  }
  function L(e) {
    if (u) {
      if (e && e.target)
        H(e.target);
      else {
        const t = [], i = document.querySelectorAll("div");
        for (let n = 0; n < i.length; n++)
          i[n].scrollTop > 0 && t.push(i[n]);
        for (let n = 0; n < t.length; n++)
          I(r, t[n]) || H(t[n]);
      }
      b("syncScrollBars", m);
    }
  }
  function D(e, t) {
    const i = this;
    let n = null, d = null;
    t = t || {}, t.exclude = ["INPUT", "TEXTAREA", "SELECT", "A", "BUTTON"], t.handler ? d = e.querySelector(t.handler) : d = e;
    function v(s, a, f) {
      s.style.left = `${a}px`, s.style.top = `${f}px`;
    }
    let C, g, O, R;
    e.style.cursor = "move";
    function Y(s) {
      const a = s.target || s.srcElement, f = a.parentNode;
      if (a && t.exclude.indexOf(a.tagName.toUpperCase()) == -1 && (!f || t.exclude.indexOf(f.tagName.toUpperCase()) == -1)) {
        n = e;
        const w = s.pageX || s.touches[0].pageX, k = s.pageY || s.touches[0].pageY;
        O = n.getBoundingClientRect().left - n.offsetLeft, R = n.getBoundingClientRect().top - n.offsetTop, g = w - (n.getBoundingClientRect().left + document.body.scrollLeft), C = k - (n.getBoundingClientRect().top + document.body.scrollTop), s.preventDefault();
      }
    }
    function j(s) {
      if (n !== null) {
        const a = s.pageX || s.touches[0].pageX, f = s.pageY || s.touches[0].pageY, w = a - g - O - document.body.scrollLeft, k = f - C - R - document.body.scrollTop;
        v(n, w, k), t.ondrag && t.ondrag.call(s);
      }
    }
    function P() {
      n !== null && (n = null);
    }
    return [
      { target: d, types: ["mousedown", "touchstart"], handler: Y },
      { target: window, types: ["mousemove", "touchmove"], handler: j },
      { target: window, types: ["mouseup", "touchend"], handler: P }
    ].forEach(({ target: s, types: a, handler: f }) => {
      a.forEach((w) => s.addEventListener(w, f));
    }), i;
  }
  function V() {
    const e = document.createElement("div");
    e.innerHTML = h, r = e.querySelector(".magnifier"), document.body.appendChild(r), l = r.querySelector(".magnifier-content"), window.addEventListener && (window.addEventListener("resize", q, !1), window.addEventListener("scroll", L, !0)), D(r, {
      ondrag: T
    });
  }
  return o.setZoom = (e) => {
    o.options.zoom = e, y();
  }, o.setShape = (e, t, i) => {
    o.options.shape = e, t && (o.options.width = t), i && (o.options.height = i), y();
  }, o.setWidth = (e) => {
    o.options.width = e, y();
  }, o.setHeight = (e) => {
    o.options.height = e, y();
  }, o.getZoom = () => o.options.zoom, o.getShape = () => o.options.shape, o.getWidth = () => o.options.width, o.getHeight = () => o.options.height, o.isVisible = () => u, o.on = (e, t) => {
    x[e] = x[e] || [], x[e].push(t);
  }, o.syncScrollBars = () => {
    L();
  }, o.syncContent = () => {
    A();
  }, o.hide = () => {
    X(), l.innerHTML = "", r.style.display = "none", u = !1;
  }, o.show = (e) => {
    let t, i;
    e ? (t = e.pageX - 175, i = e.pageY - 175) : (t = 200, i = 200), y(), N(), B(r, t, i), r.style.display = "", T(), L(), $(), u = !0;
  }, o.toggle = () => {
    o.isVisible() ? o.hide() : o.show();
  }, V(), o;
}
function ee() {
  const o = W().querySelectorAll("img");
  o && o.forEach((h) => {
    h.addEventListener("click", (r) => {
      p.magnifier.isVisible() || p.magnifier.show(r);
    });
  });
}
const ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: Q,
  setupButtons: F,
  toggle: J
}, Symbol.toStringTag, { value: "Module" }));
export {
  ie as m,
  Q as r,
  F as s,
  J as t
};
