let a = null;
function f(e, n, u) {
  a = e;
}
function l(e, n, u = {}) {
  let i = !1, r = null;
  function s(...o) {
    if (i)
      return r ?? void 0;
    c("extension:run", e);
    try {
      const t = n(...o);
      return i = !0, t && typeof t.then == "function" ? (r = t, r) : (r = Promise.resolve(), t);
    } catch (t) {
      throw i = !1, t;
    }
  }
  return {
    name: e,
    run: s,
    hasRun: () => i,
    ...u
  };
}
function c(e, n, u = {}) {
  typeof window < "u" && window.dispatchEvent(
    new CustomEvent(e, {
      detail: {
        name: n,
        timestamp: Date.now(),
        ...u
      }
    })
  );
}
export {
  a as L,
  f as a,
  l as c
};
