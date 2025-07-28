import s from "./logger.js";
function $(e, i, t = 5) {
  const o = document.getElementById(e);
  o ? i(o) : t > 0 ? setTimeout(() => $(e, i, t - 1), 10) : console.warn(`Element with ID "${e}" not found after ${t} attempts.`);
}
function l(e, i, t) {
  const o = t.dispatchEvent || !1, u = t.name || "lt:datatable", d = t.root || document.body, n = t.state || { activeObservers: /* @__PURE__ */ new Set() }, m = {
    childList: !0,
    subtree: !0,
    ...t.observeConfig
  };
  if (n.activeObservers.has(e))
    return s.debug(`${n.logPrefix}Already observing`, e), () => {
    };
  const f = d.querySelector(e);
  if (f)
    return s.debug(`${n.logPrefix}Element already in DOM`, e), i(f), () => {
    };
  n.activeObservers.add(e);
  const b = new MutationObserver((h, a) => {
    for (const c of h)
      if (c.type === "childList") {
        for (const r of c.addedNodes)
          if (r.nodeType === 1) {
            if (s.debug(`${n.logPrefix}Observing changes: `, d, r), r.matches && r.matches(e)) {
              a.disconnect(), s.debug(`${n.logPrefix}Disconnecting ${e}`), n.activeObservers.delete(e), v(e, u, o), i(r);
              return;
            }
            if (r.querySelector) {
              const g = r.querySelector(e);
              if (g) {
                a.disconnect(), s.debug(`${n.logPrefix}Disconnecting ${e}`), n.activeObservers.delete(e), v(e, u, o), i(g);
                return;
              }
            }
          }
      }
  });
  s.debug(`${n.logPrefix}Observing for ${e}`), b.observe(d, m);
}
function v(e, i, t) {
  if (!t)
    return;
  const o = new CustomEvent(i);
  document.dispatchEvent(o);
}
export {
  l as s,
  $ as w
};
