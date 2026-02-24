import { d as u, a as m, s as p, q as g, p as M, b as d, i as b, e as v, c as y } from "../player-CSUkfi78.js";
import j from "../logger.js";
import { r as O } from "../initExtensions-C5h-JTF-.js";
let i = null, s = null;
const w = Object.fromEntries(Object.entries(u).filter(([t]) => !["extensionsListener", "handleEvent"].includes(t))), x = Object.fromEntries(Object.entries(m).filter(([t]) => !["setup"].includes(t))), a = {
  utils: {
    logger: j,
    get monitor() {
      return i;
    }
  }
};
async function E() {
  if (!s) {
    const t = await import(
      /* webpackChunkName: "lt-memory-monitor" */
      "../memoryMonitor-Db1sqzAh.js"
    );
    s = t.default || t.MemoryMonitor || t;
  }
  return s;
}
async function r(t = {}) {
  const e = await E();
  return i || (i = new e()), i.isMonitoring || i.startMonitoring(t.intervalMs ?? 5e3), i;
}
function C() {
  i?.stopMonitoring();
}
async function F(t, e = {}) {
  y(t);
  const { extensions: o = [], monitor: n, perf: l = !1, perfLimit: c = 50 } = e;
  if (n) {
    Object.assign(a.utils, {
      enableMonitoring: r,
      disableMonitoring: C
    });
    const f = typeof n == "object" && Number.isFinite(n.intervalMs) ? n.intervalMs : void 0;
    await r({ intervalMs: f });
  }
  o.length && await O(L, o, "assessment", { perf: l, perfLimit: c });
}
const L = {
  init: F,
  extensions: {},
  eventBus: v,
  ...x,
  ...b,
  ...d,
  ...M,
  ...g,
  ...p,
  ...w,
  ...a
};
export {
  L as LT
};
