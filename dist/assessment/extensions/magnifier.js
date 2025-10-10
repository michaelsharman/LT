import { c as U, L as N } from "../../extensionsFactory-BHOEyOSK.js";
const z = {
  zoom: 4,
  shape: "square",
  // 'square' | 'circle'
  width: 350,
  height: 350
}, g = {
  initialised: !1,
  instance: null,
  options: { ...z }
};
function _(u) {
  if (g.initialised) {
    N.utils.logger.debug("Magnifier already initialised; ignoring run()");
    return;
  }
  g.initialised = !0, g.options = { ...z, ...u || {} };
}
function b() {
  return g.instance || (g.instance = new Z(g.options)), g.instance;
}
function W(u = "lrn__magnifier") {
  document.querySelectorAll(`.${u}`).forEach((y) => {
    y.addEventListener("click", () => {
      b().toggle();
    });
  }), N.itemsApp().on("item:load", j);
}
function F() {
  b().hide();
}
function O() {
  b().show();
}
function P() {
  b().toggle();
}
function Z(u) {
  const o = this;
  o.options = { ...z, ...u || {} };
  const y = `
<div id="lt__magnifier" class="magnifier" style="display:none;position:fixed;overflow:hidden;background-color:#fff;border:1px solid #555;border-radius:4px;z-index:10000;">
  <div class="magnifier-content" style="top:0;left:0;position:absolute;display:block;transform-origin:left top;user-select:none;padding-top:0"></div>
  <div class="magnifier-glass" style="position:absolute;inset:0;opacity:0;background-color:#fff;cursor:move;"></div>
</div>`.trim();
  let s, c, h = !1, A = 0, E = !0;
  const L = {}, Y = () => document.scrollingElement || document.documentElement;
  document.addEventListener("keydown", (t) => {
    t.key === "Escape" && o.isVisible() && o.hide();
  });
  function M(t, e, n) {
    t.style.left = `${e}px`, t.style.top = `${n}px`;
  }
  function B(t, e, n) {
    t.style.width = `${e}px`, t.style.height = `${n}px`;
  }
  function v() {
    const { shape: t, width: e, height: n, zoom: i } = o.options;
    B(s, e, n), s.style.borderRadius = t === "circle" ? "50%" : "4px", c.style.transform = `scale(${i})`;
  }
  function f() {
    const t = s.getBoundingClientRect(), e = s.clientLeft, n = s.clientTop, i = Y(), a = i.scrollLeft + t.left + e, r = i.scrollTop + t.top + n, d = o.options.zoom;
    M(c, -Math.round(a * d), -Math.round(r * d)), C("viewPortChanged", c);
  }
  function x(t, e) {
    t.querySelectorAll(e).forEach((n) => n.parentNode?.removeChild(n));
  }
  function H() {
    c.innerHTML = "";
    const t = document.body, e = t.cloneNode(!0), n = getComputedStyle(t).backgroundColor;
    n && (s.style.backgroundColor = n), e.style.cursor = "auto", e.style.paddingTop = "0px", e.setAttribute("unselectable", "on");
    const i = t.querySelectorAll("canvas"), a = e.querySelectorAll("canvas");
    if (i.length && i.length === a.length)
      for (let p = 0; p < i.length; p++)
        try {
          a[p].getContext("2d").drawImage(i[p], 0, 0);
        } catch {
        }
    x(e, "script"), x(e, "audio"), x(e, "video"), x(e, ".magnifier"), C("prepareContent", e), c.appendChild(e);
    const r = document.documentElement, d = Math.max(r.scrollWidth, r.clientWidth), w = Math.max(r.scrollHeight, r.clientHeight);
    B(c, d, w), C("contentUpdated", c), E = !1;
  }
  function X(t) {
    const e = [];
    if (t?.getAttribute) {
      const n = t.getAttribute("id");
      n && e.push("#" + n);
      const i = String(t.className || "").trim();
      i && e.push("." + i.split(/\s+/).join("."));
      for (let a = 0; a < e.length; a++) {
        const r = c.querySelectorAll(e[a]);
        if (r.length === 1)
          return r[0].scrollTop = t.scrollTop, r[0].scrollLeft = t.scrollLeft, !0;
      }
    } else t === document && f();
    return !1;
  }
  function S(t) {
    if (h) {
      if (t && t.target)
        X(t.target);
      else {
        const e = [];
        document.querySelectorAll("div").forEach((n) => {
          n.scrollTop > 0 && e.push(n);
        });
        for (let n = 0; n < e.length; n++)
          V(s, e[n]) || X(e[n]);
      }
      C("syncScrollBars", c);
    }
  }
  function V(t, e) {
    for (let n = e; n; n = n.parentNode)
      if (n === t)
        return !0;
    return !1;
  }
  function $() {
    h && (E && H(), S());
  }
  function q() {
    h && (A && cancelAnimationFrame(A), A = requestAnimationFrame($));
  }
  function C(t, e) {
    const n = L[t];
    if (n)
      for (let i = 0; i < n.length; i++)
        n[i].call(o, e);
  }
  function D(t, e = {}) {
    const n = new Set((e.exclude || ["INPUT", "TEXTAREA", "SELECT", "A", "BUTTON"]).map((l) => l.toUpperCase()));
    let i = 0, a = 0, r = 0, d = 0, w = !1;
    t.style.cursor = "move";
    function p(l) {
      const m = l.target;
      if (m && (n.has(m.tagName) || m.parentNode && n.has(m.parentNode.tagName)))
        return;
      const T = t.getBoundingClientRect();
      i = T.left, a = T.top, r = l.clientX ?? l.touches?.[0]?.clientX, d = l.clientY ?? l.touches?.[0]?.clientY, w = !0, l.preventDefault();
    }
    function k(l) {
      if (!w)
        return;
      const m = l.clientX ?? l.touches?.[0]?.clientX, T = l.clientY ?? l.touches?.[0]?.clientY;
      M(t, Math.round(i + (m - r)), Math.round(a + (T - d))), e.ondrag?.(l);
    }
    function I() {
      w = !1;
    }
    t.addEventListener("mousedown", p), t.addEventListener("touchstart", p, { passive: !1 }), window.addEventListener("mousemove", k, { passive: !0 }), window.addEventListener("touchmove", k, { passive: !0 }), window.addEventListener("mouseup", I, { passive: !0 }), window.addEventListener("touchend", I, { passive: !0 });
  }
  function R() {
    const t = document.createElement("div");
    t.innerHTML = y, s = t.querySelector(".magnifier"), c = s.querySelector(".magnifier-content"), (document.querySelector(".lrn-assess") || document.body).appendChild(s), window.addEventListener(
      "resize",
      () => {
        E = !0, q();
      },
      { passive: !0 }
    ), window.addEventListener(
      "scroll",
      (n) => {
        S(n), q();
      },
      { passive: !0, capture: !0 }
    ), D(s, { ondrag: () => f() });
  }
  return o.setZoom = (t) => {
    o.options.zoom = Number(t) || o.options.zoom, v(), f();
  }, o.setShape = (t, e, n) => {
    o.options.shape = t, e && (o.options.width = e), n && (o.options.height = n), v(), f();
  }, o.setWidth = (t) => {
    o.options.width = t, v(), f();
  }, o.setHeight = (t) => {
    o.options.height = t, v(), f();
  }, o.getZoom = () => o.options.zoom, o.getShape = () => o.options.shape, o.getWidth = () => o.options.width, o.getHeight = () => o.options.height, o.isVisible = () => h, o.on = (t, e) => {
    L[t] = L[t] || [], L[t].push(e);
  }, o.syncScrollBars = () => S(), o.syncContent = () => q(), o.hide = () => {
    c.innerHTML = "", s.style.display = "none", h = !1;
  }, o.show = (t) => {
    const { width: e, height: n } = o.options, i = t?.clientX ?? 200, a = t?.clientY ?? 200, r = Math.max(0, Math.round(i - e / 2)), d = Math.max(0, Math.round(a - n / 2));
    v(), E && H(), M(s, r, d), s.style.display = "", h = !0, f(), S();
  }, o.toggle = () => o.isVisible() ? o.hide() : o.show(), R(), o;
}
function j() {
  const u = N.itemElement();
  if (!u)
    return;
  const o = u.querySelectorAll("img");
  !o || !o.length || o.forEach((y) => {
    y.addEventListener("click", (s) => {
      const c = b();
      c.isVisible() || c.show(s);
    });
  });
}
const G = U("magnifier", _, {
  setupButtons: W,
  hide: F,
  show: O,
  toggle: P
});
export {
  G as magnifier
};
