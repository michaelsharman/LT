import { d as c, a as f, i as m, b as p, p as u, q as M, s as g, c as d } from "../player-NvOpRVNY.js";
import b from "../logger.js";
import { M as s, r as v } from "../memoryMonitor-DgwEyRXh.js";
let t = null;
const j = Object.fromEntries(Object.entries(c).filter(([i]) => !["extensionsListener", "handleEvent"].includes(i))), x = Object.fromEntries(Object.entries(f).filter(([i]) => !["setup"].includes(i))), y = {
  utils: {
    logger: b,
    get monitor() {
      return t;
    },
    // optional convenience APIs
    enableMonitoring(i = {}) {
      return t || (t = new s()), t.isMonitoring || t.startMonitoring(i.intervalMs ?? 5e3), t;
    },
    disableMonitoring() {
      t?.stopMonitoring();
    }
  }
};
async function O(i, o = {}) {
  d(i);
  const { extensions: e = [], monitor: n, perf: r = !1, perfLimit: a = 50 } = o;
  if (n) {
    const l = typeof n == "object" && Number.isFinite(n.intervalMs) ? n.intervalMs : void 0;
    t || (t = new s()), t.isMonitoring || t.startMonitoring(l);
  }
  e.length && await v(E, e, "assessment", { perf: r, perfLimit: a });
}
const E = {
  init: O,
  extensions: {},
  ...x,
  ...m,
  ...p,
  ...u,
  ...M,
  ...g,
  ...j,
  ...y
};
export {
  E as LT
};
