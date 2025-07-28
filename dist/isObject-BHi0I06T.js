import a from "./logger.js";
function p(e, t, n = 5) {
  const o = document.getElementById(e);
  o ? t(o) : n > 0 ? setTimeout(() => p(e, t, n - 1), 10) : console.warn(`Element with ID "${e}" not found after ${n} attempts.`);
}
function G(e, t, n) {
  const o = n.dispatchEvent || !1, c = n.name || "lt:datatable", f = n.root || document.body, r = n.state || { activeObservers: /* @__PURE__ */ new Set() }, y = {
    childList: !0,
    subtree: !0,
    ...n.observeConfig
  };
  if (r.activeObservers.has(e))
    return a.debug(`${r.logPrefix}Already observing`, e), () => {
    };
  const g = f.querySelector(e);
  if (g)
    return a.debug(`${r.logPrefix}Element already in DOM`, e), t(g), () => {
    };
  r.activeObservers.add(e);
  const j = new MutationObserver((h, u) => {
    for (const d of h)
      if (d.type === "childList") {
        for (const i of d.addedNodes)
          if (i.nodeType === 1) {
            if (a.debug(`${r.logPrefix}Observing changes: `, f, i), i.matches && i.matches(e)) {
              u.disconnect(), a.debug(`${r.logPrefix}Disconnecting ${e}`), r.activeObservers.delete(e), v(e, c, o), t(i);
              return;
            }
            if (i.querySelector) {
              const l = i.querySelector(e);
              if (l) {
                u.disconnect(), a.debug(`${r.logPrefix}Disconnecting ${e}`), r.activeObservers.delete(e), v(e, c, o), t(l);
                return;
              }
            }
          }
      }
  });
  a.debug(`${r.logPrefix}Observing for ${e}`), j.observe(f, y);
}
function v(e, t, n) {
  if (!n)
    return;
  const o = new CustomEvent(t);
  document.dispatchEvent(o);
}
var S = typeof global == "object" && global && global.Object === Object && global, T = typeof self == "object" && self && self.Object === Object && self, $ = S || T || Function("return this")(), b = $.Symbol, O = Object.prototype, w = O.hasOwnProperty, P = O.toString, s = b ? b.toStringTag : void 0;
function E(e) {
  var t = w.call(e, s), n = e[s];
  try {
    e[s] = void 0;
    var o = !0;
  } catch {
  }
  var c = P.call(e);
  return o && (t ? e[s] = n : delete e[s]), c;
}
var x = Object.prototype, C = x.toString;
function D(e) {
  return C.call(e);
}
var q = "[object Null]", L = "[object Undefined]", m = b ? b.toStringTag : void 0;
function M(e) {
  return e == null ? e === void 0 ? L : q : m && m in Object(e) ? E(e) : D(e);
}
function N(e) {
  return e != null && typeof e == "object";
}
function A(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
export {
  N as a,
  M as b,
  S as f,
  A as i,
  $ as r,
  G as s,
  p as w
};
