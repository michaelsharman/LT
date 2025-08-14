function o(n, t, e = {}) {
  let i = !1;
  return {
    async run(...u) {
      i || (i = !0, await t(...u), a("module:run", n));
    },
    isRunning: () => i,
    name: n,
    ...e
  };
}
function a(n, t, e = {}) {
  typeof window < "u" && window.dispatchEvent(
    new CustomEvent(n, {
      detail: {
        name: t,
        timestamp: Date.now(),
        ...e
      }
    })
  );
}
export {
  o as c
};
