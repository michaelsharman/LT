import { d as u, a as m, s as p, q as g, p as M, b as d, i as b, c as y } from "../player-BmddCyd3.js";
import j from "../logger.js";
import { r as v } from "../initExtensions-DVo3AlMk.js";
let i = null, o = null;
const O = Object.fromEntries(Object.entries(u).filter(([t]) => !["extensionsListener", "handleEvent"].includes(t))), w = Object.fromEntries(Object.entries(m).filter(([t]) => !["setup"].includes(t))), a = {
  utils: {
    logger: j,
    get monitor() {
      return i;
    }
  }
};
async function x() {
  if (!o) {
    const t = await import(
      /* webpackChunkName: "lt-memory-monitor" */
      "../memoryMonitor-Db1sqzAh.js"
    );
    o = t.default || t.MemoryMonitor || t;
  }
  return o;
}
async function r(t = {}) {
  const e = await x();
  return i || (i = new e()), i.isMonitoring || i.startMonitoring(t.intervalMs ?? 5e3), i;
}
function E() {
  i?.stopMonitoring();
}
async function C(t, e = {}) {
  y(t);
  const { extensions: s = [], monitor: n, perf: l = !1, perfLimit: c = 50 } = e;
  if (n) {
    Object.assign(a.utils, {
      enableMonitoring: r,
      disableMonitoring: E
    });
    const f = typeof n == "object" && Number.isFinite(n.intervalMs) ? n.intervalMs : void 0;
    await r({ intervalMs: f });
  }
  s.length && await v(F, s, "assessment", { perf: l, perfLimit: c });
}
const F = {
  init: C,
  extensions: {},
  ...w,
  ...b,
  ...d,
  ...M,
  ...g,
  ...p,
  ...O,
  ...a
};
export {
  F as LT
};
