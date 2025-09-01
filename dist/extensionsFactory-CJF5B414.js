let l = null, o = null, c = null;
function d(e, n, u) {
  l = e, o = n, c = u;
}
function p(e, n, u = {}) {
  let i = !1, a = null;
  function s(...r) {
    if (i)
      return a ?? void 0;
    f("extension:run", e);
    try {
      const t = n(...r);
      return i = !0, t && typeof t.then == "function" ? (a = t, a) : (a = Promise.resolve(), t);
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
function f(e, n, u = {}) {
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
  l as L,
  d as a,
  o as b,
  p as c,
  c as d
};
