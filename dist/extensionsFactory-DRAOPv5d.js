function l(e, n, r = {}) {
  let o = !1;
  return {
    run(...f) {
      if (o)
        return;
      d("extension:run", e);
      const c = `lt:ext:${e}:start`, i = `lt:ext:${e}:end`;
      performance.mark(c);
      const a = performance.now(), s = () => {
        const t = performance.now() - a;
        performance.mark(i), performance.measure(`lt:ext:${e}`, c, i), p(e, t);
      };
      try {
        const t = n(...f);
        o = !0, t && typeof t.then == "function" ? (s(), t.catch((u) => {
          o = !1, console.error(u);
        })) : s();
      } catch (t) {
        throw s(), o = !1, t;
      }
    },
    isRunning: () => o,
    name: e,
    ...r
  };
}
function d(e, n, r = {}) {
  typeof window < "u" && window.dispatchEvent(
    new CustomEvent(e, {
      detail: {
        name: n,
        timestamp: Date.now(),
        ...r
      }
    })
  );
}
function p(e, n) {
  (window.__LT_PERF ??= []).push({ name: e, ms: n, at: (/* @__PURE__ */ new Date()).toISOString() }), typeof process < "u" && process.env?.NODE_ENV === "development" && console.debug(`[LT] ${e} init ${n.toFixed(1)}ms`);
}
export {
  l as c
};
