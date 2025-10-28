import { c as U, L as z } from "../../extensionsFactory-BHOEyOSK.js";
const B = {
  zoom: 4,
  shape: "square",
  // 'square' | 'circle'
  width: 350,
  height: 350,
  sampleOffsetX: 0,
  // px shift of the sampled document point, relative to lens center
  sampleOffsetY: 350
  // positive moves the sampled point downward inside the lens; negative moves it upward
}, g = {
  initialised: !1,
  instance: null,
  options: { ...B }
};
function _(u) {
  if (g.initialised) {
    z.utils.logger.debug("Magnifier already initialised; ignoring run()");
    return;
  }
  g.initialised = !0, g.options = { ...B, ...u || {} };
}
function E() {
  return g.instance || (g.instance = new Q(g.options)), g.instance;
}
function F(u = "lrn__magnifier") {
  document.querySelectorAll(`.${u}`).forEach((w) => {
    w.addEventListener("click", () => {
      E().toggle();
    });
  }), z.itemsApp().on("item:load", G);
}
function P() {
  E().hide();
}
function Z() {
  E().show();
}
function j() {
  E().toggle();
}
function Q(u) {
  const n = this;
  n.options = { ...B, ...u || {} };
  const w = `
<div id="lt__magnifier" class="magnifier" style="display:none;position:fixed;overflow:hidden;background-color:#fff;border:2px solid #555;border-radius:6px;z-index:10000;">
  <div class="magnifier-content" style="top:0;left:0;position:absolute;display:block;transform-origin:left top;user-select:none;"></div>
  <div class="magnifier-glass" style="position:absolute;inset:0;opacity:0;background-color:#fff;cursor:move;"></div>
</div>`.trim();
  let s, c, m = !1, A = 0, x = !0;
  const L = {};
  document.addEventListener("keydown", (t) => {
    t.key === "Escape" && n.isVisible() && n.hide();
  });
  function N(t, e, o) {
    t.style.left = `${e}px`, t.style.top = `${o}px`;
  }
  function H(t, e, o) {
    t.style.width = `${e}px`, t.style.height = `${o}px`;
  }
  function v() {
    const { shape: t, width: e, height: o, zoom: i } = n.options;
    H(s, e, o), s.style.borderRadius = t === "circle" ? "50%" : "4px", c.style.transform = `scale(${i})`;
  }
  function p() {
    const t = s.getBoundingClientRect(), e = s.clientWidth, o = s.clientHeight, i = e / 2, l = o / 2, a = n.options.zoom, d = k || document.scrollingElement || document.documentElement, h = d === document.scrollingElement || d === document.documentElement ? { left: 0, top: 0 } : d.getBoundingClientRect(), T = d.scrollLeft || 0, C = d.scrollTop || 0, M = T + (t.left - h.left) + i, r = C + (t.top - h.top) + l, f = Number(n.options.sampleOffsetX) || 0, y = Number(n.options.sampleOffsetY) || 0, $ = Math.round(i + f - M * a), D = Math.round(l + y - r * a);
    N(c, $, D), X("viewPortChanged", c);
  }
  function Y() {
    c.innerHTML = "";
    const t = document.body, e = t.cloneNode(!0), o = getComputedStyle(t);
    s.style.backgroundColor = o.backgroundColor || "#fff", e.style.margin = o.margin, e.style.padding = o.padding || "0", e.style.boxSizing = o.boxSizing || "border-box", e.style.cursor = "auto", e.style.paddingTop = "0px", e.setAttribute("unselectable", "on"), c.appendChild(e), k = O();
    const i = document.documentElement, l = Math.max(i.scrollWidth, i.clientWidth), a = Math.max(i.scrollHeight, i.clientHeight);
    H(c, l, a), X("contentUpdated", c), x = !1;
  }
  function q(t) {
    const e = [];
    if (t?.getAttribute) {
      const o = t.getAttribute("id");
      o && e.push("#" + o);
      const i = String(t.className || "").trim();
      i && e.push("." + i.split(/\s+/).join("."));
      for (let l = 0; l < e.length; l++) {
        const a = c.querySelectorAll(e[l]);
        if (a.length === 1)
          return a[0].scrollTop = t.scrollTop, a[0].scrollLeft = t.scrollLeft, !0;
      }
    } else t === document && p();
    return !1;
  }
  function b(t) {
    if (m) {
      if (t && t.target)
        q(t.target);
      else {
        const e = [];
        document.querySelectorAll("div").forEach((o) => {
          o.scrollTop > 0 && e.push(o);
        });
        for (let o = 0; o < e.length; o++)
          R(s, e[o]) || q(e[o]);
      }
      X("syncScrollBars", c);
    }
  }
  function R(t, e) {
    for (let o = e; o; o = o.parentNode)
      if (o === t)
        return !0;
    return !1;
  }
  function W() {
    m && (x && Y(), b());
  }
  function S() {
    m && (A && cancelAnimationFrame(A), A = requestAnimationFrame(W));
  }
  function X(t, e) {
    const o = L[t];
    if (o)
      for (let i = 0; i < o.length; i++)
        o[i].call(n, e);
  }
  function I(t, e = {}) {
    const o = new Set((e.exclude || ["INPUT", "TEXTAREA", "SELECT", "A", "BUTTON"]).map((r) => r.toUpperCase()));
    let i = 0, l = 0, a = 0, d = 0, h = !1;
    t.style.cursor = "move";
    function T(r) {
      const f = r.target;
      if (f && (o.has(f.tagName) || f.parentNode && o.has(f.parentNode.tagName)))
        return;
      const y = t.getBoundingClientRect();
      i = y.left, l = y.top, a = r.clientX ?? r.touches?.[0]?.clientX, d = r.clientY ?? r.touches?.[0]?.clientY, h = !0, r.preventDefault();
    }
    function C(r) {
      if (!h)
        return;
      const f = r.clientX ?? r.touches?.[0]?.clientX, y = r.clientY ?? r.touches?.[0]?.clientY;
      N(t, Math.round(i + (f - a)), Math.round(l + (y - d))), e.ondrag?.(r);
    }
    function M() {
      h = !1;
    }
    t.addEventListener("mousedown", T), t.addEventListener("touchstart", T, { passive: !1 }), window.addEventListener("mousemove", C, { passive: !0 }), window.addEventListener("touchmove", C, { passive: !0 }), window.addEventListener("mouseup", M, { passive: !0 }), window.addEventListener("touchend", M, { passive: !0 });
  }
  let k = null;
  function O() {
    const t = [document.querySelector(".lrn-assess"), document.querySelector("#app"), document.scrollingElement].filter(Boolean);
    for (const e of t) {
      const o = getComputedStyle(e);
      if ((/(auto|scroll)/.test(o.overflow) || /(auto|scroll)/.test(o.overflowX) || /(auto|scroll)/.test(o.overflowY)) && (e.scrollWidth > e.clientWidth || e.scrollHeight > e.clientHeight))
        return e;
    }
    return document.scrollingElement || document.documentElement;
  }
  window.addEventListener(
    "scroll",
    (t) => {
      t && t.target && t.target !== document && t.target !== window && (k = t.target), b(t), S();
    },
    { passive: !0, capture: !0 }
  );
  function V() {
    const t = document.createElement("div");
    t.innerHTML = w, s = t.querySelector(".magnifier"), c = s.querySelector(".magnifier-content"), document.body.appendChild(s), window.addEventListener(
      "resize",
      () => {
        x = !0, S();
      },
      { passive: !0 }
    ), window.addEventListener(
      "scroll",
      (e) => {
        b(e), S();
      },
      { passive: !0, capture: !0 }
    ), I(s, { ondrag: () => p() });
  }
  return n.setZoom = (t) => {
    n.options.zoom = Number(t) || n.options.zoom, v(), p();
  }, n.setShape = (t, e, o) => {
    n.options.shape = t, e && (n.options.width = e), o && (n.options.height = o), v(), p();
  }, n.setWidth = (t) => {
    n.options.width = t, v(), p();
  }, n.setHeight = (t) => {
    n.options.height = t, v(), p();
  }, n.getZoom = () => n.options.zoom, n.getShape = () => n.options.shape, n.getWidth = () => n.options.width, n.getHeight = () => n.options.height, n.isVisible = () => m, n.on = (t, e) => {
    L[t] = L[t] || [], L[t].push(e);
  }, n.syncScrollBars = () => b(), n.syncContent = () => S(), n.hide = () => {
    c.innerHTML = "", s.style.display = "none", m = !1;
  }, n.show = (t) => {
    const { width: e, height: o } = n.options, i = t?.clientX ?? 200, l = t?.clientY ?? 200, a = Math.max(0, Math.round(i - e / 2)), d = Math.max(0, Math.round(l - o / 2));
    v(), x && Y(), N(s, a, d), s.style.display = "", m = !0, p(), b();
  }, n.toggle = () => n.isVisible() ? n.hide() : n.show(), V(), n;
}
function G() {
  const u = z.itemElement();
  if (!u)
    return;
  const n = u.querySelectorAll("img");
  !n || !n.length || n.forEach((w) => {
    w.addEventListener("click", (s) => {
      const c = E();
      c.isVisible() || c.show(s);
    });
  });
}
const K = U("magnifier", _, {
  setupButtons: F,
  hide: P,
  show: Z,
  toggle: j
});
export {
  K as magnifier
};
