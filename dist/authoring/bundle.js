import { LT as n } from "./core.js";
import { E as c } from "../initExtensions-DVo3AlMk.js";
const a = Object.freeze(
  Object.keys(c.authoring || {}).sort()
  // sort for deterministic order
), T = {
  ...n,
  /**
   * LT.init(authorApp, options?)
   *  - authorApp: Learnosity Author API instance (object, required)
   *  - options: { extensions?: string[], security?: object, request?: object }
   */
  async init(t, s = {}) {
    if (typeof t != "object" || t === null)
      throw new TypeError("LT.init(authorApp, options): the first argument must be the Learnosity Author API instance object.");
    const { extensions: e, security: r, request: o } = s || {}, i = Array.isArray(e) && e.length > 0 ? e : a;
    return n.init(t, {
      extensions: i,
      security: r,
      request: o
    });
  }
};
export {
  T as LT
};
