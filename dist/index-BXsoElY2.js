import { c as P, e as U } from "./app-CLzv4RuI.js";
import { l as W } from "./logger-BpyELtLr.js";
const Z = "ERROR", p = {
  _initialised: !1,
  magnifier: null
};
function G(c) {
  p._initialised ? W.debug("Magnifier already initialised, ignoring run();", Z) : (c || (c = {
    zoom: 4,
    shape: "square",
    width: 350,
    height: 350
  }), p.magnifier = new J(c), p._initialised = !0);
}
function Q(c = "lrn__magnifier") {
  document.querySelectorAll(`.${c}`).forEach((h) => {
    h.addEventListener("click", () => {
      p.magnifier.toggle();
    });
  }), P().on("item:load", K());
}
function F() {
  p.magnifier.toggle();
}
function J(c) {
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
  let r, l, O, u = !1, m;
  const x = {};
  document.addEventListener("keydown", (e) => {
    e.key === "Escape" && o.isVisible() && o.hide();
  });
  function z(e, t, i) {
    e.style.left = `${t}px`, e.style.top = `${i}px`;
  }
  function S(e, t, i) {
    e.style.width = `${t}px`, e.style.height = `${i}px`;
  }
  function y() {
    switch (o.options.shape) {
      case "square":
        S(r, o.options.width, o.options.height);
        break;
      case "circle":
        S(r, o.options.width, o.options.height), r.style.borderRadius = "50%";
        break;
    }
    l.style.WebkitTransform = l.style.MozTransform = l.style.OTransform = l.style.MsTransform = l.style.transform = `scale(${o.options.zoom})`;
  }
  function R(e, t) {
    let i = t;
    for (; i != null; ) {
      if (i == e)
        return !0;
      i = i.parentNode;
    }
    return !1;
  }
  function B() {
    u && (M(), T(), L());
  }
  function q() {
    u && (window.clearTimeout(O), O = window.setTimeout(B, 100));
  }
  function A() {
    u && q();
  }
  function I() {
    document.removeEventListener && (document.removeEventListener("DOMNodeInserted", A, !1), document.removeEventListener("DOMNodeRemoved", A, !1));
  }
  function b(e, t) {
    const i = x[e];
    if (i)
      for (let n = 0; n < i.length; n++)
        i[n].call(o, t);
  }
  function T() {
    const e = r.offsetLeft, t = r.offsetTop, i = document.body.scrollLeft, n = document.body.scrollTop, d = -e * o.options.zoom - i * o.options.zoom, v = -t * o.options.zoom - n * o.options.zoom;
    z(l, d, v), b("viewPortChanged", m);
  }
  function E(e, t) {
    const i = e.querySelectorAll(t);
    if (i.length > 0)
      for (let n = 0; n < i.length; n++)
        i[n].parentNode.removeChild(i[n]);
  }
  function M() {
    l.innerHTML = "";
    const e = document.body, t = e.cloneNode(!0), i = e.style.backgroundColor;
    i && r.css("background-color", i), t.style.cursor = "auto", t.style.paddingTop = "0px", t.setAttribute("unselectable", "on");
    const n = e.querySelectorAll("canvas"), d = t.querySelectorAll("canvas");
    if (n.length > 0 && n.length === d.length)
      for (let g = 0; g < n.length; g++)
        d[g].getContext("2d").drawImage(n[g], 0, 0);
    E(t, "script"), E(t, "audio"), E(t, "video"), E(t, ".magnifier"), b("prepareContent", t), l.appendChild(t);
    const v = document.body.clientWidth, C = document.body.clientHeight;
    S(l, v, C), m = l.querySelector("body"), b("contentUpdated", m);
  }
  function X() {
    b("initScrollBars", m);
  }
  function N(e) {
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
        N(e.target);
      else {
        const t = [], i = document.querySelectorAll("div");
        for (let n = 0; n < i.length; n++)
          i[n].scrollTop > 0 && t.push(i[n]);
        for (let n = 0; n < t.length; n++)
          R(r, t[n]) || N(t[n]);
      }
      b("syncScrollBars", m);
    }
  }
  function $(e, t) {
    const i = this;
    let n = null, d = null;
    t = t || {}, t.exclude = ["INPUT", "TEXTAREA", "SELECT", "A", "BUTTON"], t.handler ? d = e.querySelector(t.handler) : d = e;
    function v(s, a, f) {
      s.style.left = `${a}px`, s.style.top = `${f}px`;
    }
    let C, g, _, H;
    e.style.cursor = "move";
    function V(s) {
      const a = s.target || s.srcElement, f = a.parentNode;
      if (a && t.exclude.indexOf(a.tagName.toUpperCase()) == -1 && (!f || t.exclude.indexOf(f.tagName.toUpperCase()) == -1)) {
        n = e;
        const w = s.pageX || s.touches[0].pageX, k = s.pageY || s.touches[0].pageY;
        _ = n.getBoundingClientRect().left - n.offsetLeft, H = n.getBoundingClientRect().top - n.offsetTop, g = w - (n.getBoundingClientRect().left + document.body.scrollLeft), C = k - (n.getBoundingClientRect().top + document.body.scrollTop), s.preventDefault();
      }
    }
    function Y(s) {
      if (n !== null) {
        const a = s.pageX || s.touches[0].pageX, f = s.pageY || s.touches[0].pageY, w = a - g - _ - document.body.scrollLeft, k = f - C - H - document.body.scrollTop;
        v(n, w, k), t.ondrag && t.ondrag.call(s);
      }
    }
    function j() {
      n !== null && (n = null);
    }
    return [
      { target: d, types: ["mousedown", "touchstart"], handler: V },
      { target: window, types: ["mousemove", "touchmove"], handler: Y },
      { target: window, types: ["mouseup", "touchend"], handler: j }
    ].forEach(({ target: s, types: a, handler: f }) => {
      a.forEach((w) => s.addEventListener(w, f));
    }), i;
  }
  function D() {
    const e = document.createElement("div");
    e.innerHTML = h, r = e.querySelector(".magnifier"), document.body.appendChild(r), l = r.querySelector(".magnifier-content"), window.addEventListener && (window.addEventListener("resize", B, !1), window.addEventListener("scroll", L, !0)), $(r, {
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
    q();
  }, o.hide = () => {
    I(), l.innerHTML = "", r.style.display = "none", u = !1;
  }, o.show = (e) => {
    let t, i;
    e ? (t = e.pageX - 175, i = e.pageY - 175) : (t = 200, i = 200), y(), M(), z(r, t, i), r.style.display = "", T(), L(), X(), u = !0;
  }, o.toggle = () => {
    o.isVisible() ? o.hide() : o.show();
  }, D(), o;
}
function K() {
  const o = U().querySelectorAll("img");
  o && o.forEach((h) => {
    h.addEventListener("click", (r) => {
      p.magnifier.isVisible() || p.magnifier.show(r);
    });
  });
}
const ne = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: G,
  setupButtons: Q,
  toggle: F
}, Symbol.toStringTag, { value: "Module" }));
export {
  ne as m,
  G as r,
  Q as s,
  F as t
};
