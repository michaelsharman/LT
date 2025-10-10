import { LT as s } from "./core.js";
import { E as r } from "../memoryMonitor-DBuv6WYK.js";
const i = Object.freeze(
  Object.keys(r.assessment).sort()
  // sort for deterministic order
), E = {
  ...s,
  /**
   * LT.init(itemsApp, options?)
   *  - itemsApp: Learnosity Items API instance (object, required)
   *  - options: { extensions?: string[] }
   */
  async init(t, n = {}) {
    if (typeof t != "object" || t === null)
      throw new TypeError("LT.init(itemsApp, options): the first argument must be the Learnosity Items API instance object.");
    const { extensions: e } = n || {}, o = Array.isArray(e) && e.length > 0 ? e : i;
    return s.init(t, {
      extensions: o
    });
  }
};
export {
  E as LT
};
