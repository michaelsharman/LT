import u from "../logger.js";
import { r as me } from "../initExtensions-DZqnPDuf.js";
function de(e) {
  if (!z(e))
    return !1;
  const t = s()?.config?.questions_api_init_options?.attribute_overrides && s().config.questions_api_init_options.attribute_overrides.hasOwnProperty("instant_feedback") && typeof s().config.questions_api_init_options.attribute_overrides.instant_feedback == "boolean", n = V(e);
  return t ? s().config.questions_api_init_options.attribute_overrides.instant_feedback : n.hasOwnProperty("instant_feedback") && typeof n.instant_feedback == "boolean" ? n.instant_feedback : !1;
}
function z(e) {
  return C(e).checkValidation().has_validation;
}
function V(e) {
  const t = e || w()[0];
  return t ? o().question(t).getQuestion() : (u.error(`Question not found (index ${t})`), {});
}
function C(e) {
  const t = e ?? w()[0];
  return t ? o().question(t) : {};
}
function B() {
  return y().questions;
}
function W(e) {
  const t = e || w()[0];
  if (t) {
    if (o().question(t))
      return o().question(t).getResponse();
    u.error(`Response not found ${t}`);
    return;
  } else
    return {};
}
function w() {
  return B().map((e) => e.response_id);
}
function pe(e) {
  const t = e || w()[0];
  return t ? o().getScores()[t] || {} : {};
}
const ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasCheckAnswer: de,
  isAutoScorable: z,
  question: V,
  questionInstance: C,
  questionResponse: W,
  questionResponseIds: w,
  questionScore: pe,
  questions: B
}, Symbol.toStringTag, { value: "Module" }));
function he() {
  const e = g();
  return S().item(e).dynamic || {};
}
function be() {
  const e = g();
  S().item(e).flag();
}
function ye() {
  return y()?.source.hasOwnProperty("data_table_seed");
}
function _e() {
  let e;
  return I() ? (e = typeof b()[0].items[0] == "object" ? b()[0].items[0].reference : b()[0].items[0], e === y().reference) : (e = typeof s().items[0] == "object" ? s().items[0].reference : s().items[0], e === y().reference);
}
function D() {
  return y().is_last_item;
}
function ve() {
  return y().user_flagged;
}
function Me(e = void 0) {
  let t, n, i;
  if (e ? t = o().getItems()[e].questions : t = B(), Array.isArray(t) && t.length)
    for (let r = 0; r < t.length; r++) {
      const a = t[r];
      if (i = W(a.response_id), i) {
        if (a.hasOwnProperty("metadata") && a.metadata.hasOwnProperty("valid_response_count") && Array.isArray(i.value) && (i.value.filter((l) => l === void 0).length || i.value.filter((l) => l === null).length))
          return !1;
        n = !0;
      } else
        return !1;
    }
  else
    n = !0;
  return n;
}
function we() {
  return !!document.querySelector(".lrn-masking");
}
function y(e = void 0) {
  return e ? o().getItems()[e] : o().getCurrentItem();
}
function Se() {
  return o().getCurrentItem().attempt_status;
}
function ke(e) {
  const t = o().getItems();
  let n;
  for (const i in t)
    if (t[i].response_ids.includes(e)) {
      n = t[i];
      break;
    }
  return n;
}
function Ie() {
  return document.querySelector(`div[data-reference='${g()}']`);
}
function Ae() {
  return o().assessApp().getItemPosition(g()) + 1;
}
function g() {
  return o().getCurrentItem()?.reference;
}
function Pe(e = void 0) {
  const t = o().getTags(), n = e || g();
  return t[n] || [];
}
const Te = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dynamic: he,
  flag: be,
  isDynamicItem: ye,
  isFirstItem: _e,
  isFlagged: ve,
  isItemFullyAttempted: Me,
  isLastItem: D,
  isMaskingEnabled: we,
  item: y,
  itemAttemptStatus: Se,
  itemByResponseId: ke,
  itemElement: Ie,
  itemPosition: Ae,
  itemReference: g,
  itemTags: Pe
}, Symbol.toStringTag, { value: "Module" }));
function Oe() {
  return j() === 1;
}
function qe() {
  return j() === N();
}
function O() {
  if (I()) {
    const e = g(), t = b();
    let n = -1, i = !1;
    for (let r = 0; r < t.length && !i; r++) {
      ++n;
      for (let a = 0; a < t[r].items.length; a++)
        if (e === t[r].items[a].reference) {
          i = !0;
          break;
        }
    }
    return b()[n];
  } else
    return {};
}
function xe() {
  return !!O()?.config?.configuration?.shuffle_items;
}
function Re() {
  if (I()) {
    const e = g(), t = t();
    let n = 0, i = !1;
    for (let r = 0; r < t.length && !i; r++) {
      ++n;
      for (let a = 0; a < t[r].items.length; a++)
        if (e === t[r].items[a].reference) {
          i = !0;
          break;
        }
    }
    return n;
  } else
    return 0;
}
function j() {
  const e = g(), t = O();
  let n = 0;
  if (!Object.keys(t).length)
    return -1;
  for (let i = 0; i < t.items.length && (++n, e !== t.items[i].reference); i++)
    ;
  return n;
}
function b() {
  return s()?.sections ?? [];
}
function N() {
  return O()?.items?.length || -1;
}
const Be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isFirstItemInSection: Oe,
  isLastItemInSection: qe,
  section: O,
  sectionHasShuffledItems: xe,
  sectionIndex: Re,
  sectionItemPosition: j,
  sections: b,
  totalItemsInSection: N
}, Symbol.toStringTag, { value: "Module" })), M = {
  activity: null,
  maxTime: -1
};
function s() {
  return M.activity === null && (M.activity = o().getActivity()), M.activity;
}
function H() {
  return s().activity_id;
}
function je() {
  return s().config?.subtitle ?? "";
}
function Le() {
  return o().getTags() ?? [];
}
function X() {
  return s()?.activity_template_id ?? "";
}
function Fe() {
  return s().config?.title ?? "";
}
function Ee() {
  return F() && s().adaptive.hasOwnProperty("type") ? s().adaptive.type : "";
}
function J() {
  return L() && s()?.config?.annotations_api_init_options ? s().config.annotations_api_init_options : {};
}
function Q() {
  const e = s();
  return e?.config?.navigation?.auto_save ? e.config.navigation.auto_save : {};
}
function Y() {
  return o().getTime();
}
function $e() {
  return s().hasOwnProperty("activity_template_id");
}
function L() {
  const e = s();
  return !!(e?.config?.annotations === !0 || e?.config?.annotations_api_init_options);
}
function ze() {
  return !!document.querySelector(".test-answer-masking");
}
function Z() {
  const e = s();
  return e.hasOwnProperty("config") && e.config.hasOwnProperty("navigation") && e.config.navigation.hasOwnProperty("auto_save") && e.config.navigation.auto_save !== !1;
}
function Ve() {
  return !!s()?.config?.configuration?.shuffle_items;
}
function G() {
  const e = s();
  return e.hasOwnProperty("events") && e.events !== !1;
}
function Ce() {
  return s().hasOwnProperty("item_pool_id");
}
function We() {
  return !!document.querySelector(".lrn_linereader-toggle");
}
function De() {
  return !!s()?.config?.navigation?.resource_items;
}
function I() {
  return s().hasOwnProperty("sections");
}
function Ne() {
  return s()?.dynamic_items.hasOwnProperty("try_again");
}
function F() {
  return s().hasOwnProperty("adaptive");
}
function He() {
  return s().existing_session;
}
function Xe() {
  const e = s().config?.regions?.items;
  return e ? e.some((t) => t.type === "vertical_element") : !1;
}
function K() {
  return s()?.organisation_id ?? null;
}
function U() {
  return s()?.item_pool_id ?? "";
}
function ee() {
  return M.maxTime === -1 && (M.maxTime = s()?.config?.time?.max_time ?? 0), M.maxTime;
}
function Je() {
  return s()?.config?.regions ?? "";
}
function Qe() {
  return s()?.config?.navigation?.resource_items ?? [];
}
function te() {
  return s()?.session_id;
}
function ne() {
  let e;
  switch (s()?.state) {
    case void 0:
      e = "initial";
      break;
    default:
      e = s().state;
      break;
  }
  return e;
}
function Ye() {
  const e = ee();
  return e ? e - Y() : null;
}
function Ze() {
  if (I()) {
    let e = 0;
    const t = b();
    for (let n = 0; n < t.length; n++)
      e += t[n].items.length;
    return e;
  } else return F() ? s().hasOwnProperty("items") ? s().items.length : (u.info("This is an adaptive session, no items array found"), 0) : s().items.length;
}
function ie() {
  return s()?.user_id;
}
const Ge = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activity: s,
  activityId: H,
  activitySubTitle: je,
  activityTags: Le,
  activityTemplateId: X,
  activityTitle: Fe,
  adaptiveType: Ee,
  annotationsConfig: J,
  autoSaveConfig: Q,
  elapsedTime: Y,
  hasActivityTemplate: $e,
  hasAnnotations: L,
  hasAnswerMasking: ze,
  hasAutoSave: Z,
  hasEvents: G,
  hasItemPool: Ce,
  hasLineReader: We,
  hasResourceItems: De,
  hasSections: I,
  hasShuffledItems: Ve,
  hasTryAgain: Ne,
  isAdaptive: F,
  isResuming: He,
  isVerticalLayout: Xe,
  itemBank: K,
  itemPool: U,
  maxTime: ee,
  region: Je,
  resourceItems: Qe,
  sessionId: te,
  state: ne,
  timeRemaining: Ye,
  totalItems: Ze,
  userId: ie
}, Symbol.toStringTag, { value: "Module" })), p = {
  events: {
    broadcast: !1,
    listenFor: "item"
  },
  extensions: {
    running: []
  },
  initialised: !1
};
function Ke() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {
      annotations: {
        app: re(),
        config: J(),
        enabled: L()
      },
      assess: {
        app: S()
      },
      events: {
        app: ae(),
        enabled: G()
      },
      items: {
        app: o(),
        metadata: s().config.metadata
      },
      questions: {
        app: ue()
      }
    },
    activity: {
      activity: H(),
      activityTemplate: X(),
      autoSave: {
        config: Q(),
        enabled: Z()
      },
      itemBank: K(),
      itemPool: U(),
      session: te(),
      state: ne(),
      type: s().type,
      user: ie()
    },
    LT: {
      extensions: p.extensions,
      version: "3.0.0-beta.9"
    },
    versions: e
  };
}
function Ue(e) {
  /^[a-zA-Z:*]*$/.test(e) ? p.events.listenFor = e : u.warn("Invalid event type");
}
function R(e) {
  if (p.events.broadcast) {
    const t = p.events.listenFor, n = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? u.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(n) && u.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(n) && u.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(n) && u.info(e) : e.startsWith(n) && u.info(e);
  }
}
function et(e = !0) {
  p.events.broadcast = !!e, e ? u.info(`👂 listening for '${p.events.listenFor}'`) : u.info("🚫👂 not listening");
}
function se() {
  p.initialised || (window.addEventListener("extension:run", (e) => {
    const { name: t, timestamp: n } = e.detail;
    p.extensions.running.push({ name: t, timestamp: n });
  }), p.initialised = !0);
}
const tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: Ke,
  extensionsListener: se,
  filterEvent: Ue,
  handleEvent: R,
  listen: et
}, Symbol.toStringTag, { value: "Module" })), k = {};
function oe(e) {
  k.app = e, nt();
}
function o() {
  return k.app;
}
function re() {
  return o().annotationsApp() !== void 0 ? o().annotationsApp() : null;
}
function S() {
  return o().assessApp();
}
function ae() {
  return o().eventsApp();
}
function ue() {
  return o().questionsApp();
}
function nt() {
  k.app.on("all", (e) => {
    R(e);
  }), k.app.on("item:load", () => {
    w().forEach((t) => {
      const n = k.app.question(t);
      ["changed", "beforeValidate", "rendered", "validated"].forEach((i) => {
        n.on(i, () => R(i));
      });
    });
  }), se();
}
const it = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  annotationsApp: re,
  assessApp: S,
  eventsApp: ae,
  itemsApp: o,
  questionsApp: ue,
  setup: oe
}, Symbol.toStringTag, { value: "Module" })), m = {
  answerMasking: {
    enabled: null
  },
  lineReader: {
    enabled: null,
    id: null
  }
};
function st(e) {
  m.answerMasking.enabled === null && (document.querySelector(".test-answer-masking") ? m.answerMasking.enabled = !0 : m.answerMasking.enabled = !1), m.answerMasking.enabled ? e !== void 0 && o().questionsApp().masking(e) : u.warn("Answer masking is not enabled in the Items API configuration.");
}
function ot(e) {
  S().dialogs().custom.show(e);
}
function rt() {
  S().dialogs().custom.hide();
}
function at() {
  return document.querySelector(".lrn-assess")?.classList.contains("lrn-fullscreen") ?? !1;
}
function ut() {
  return !!document.querySelector(".has-menu-region");
}
function ct() {
  return document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden") === null;
}
function lt(e) {
  if (m.lineReader.enabled === null) {
    const t = document.querySelector(".lrn_linereader-toggle");
    if (t) {
      m.lineReader.enabled = !0;
      const i = t.querySelector("[data-lrn-widget-container]").getAttribute("data-lrn-widget-container").match(/\d+$/);
      i ? m.lineReader.id = i[0] : u.warn("Could not find the line reader unique id.");
    } else
      m.lineReader.enabled = !1;
  }
  if (m.lineReader.enabled && m.lineReader.id !== null) {
    const t = o().features()[`lrn-assessapp-feature_${m.lineReader.id}`];
    switch (e) {
      case "show":
        t.show();
        break;
      case "hide":
        t.hide();
        break;
      default:
        t.toggle();
    }
  } else
    u.warn("Line reader is not enabled in the Items API configuration.");
}
function A(e) {
  switch (e) {
    case "previous":
      o().items().previous();
      break;
    case "next":
      D() || o().items().next();
      break;
    case "review":
      document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden") === null ? o().dialogs().reviewScreen.hide() : o().dialogs().reviewScreen.show();
      break;
    case "submit":
      const t = {
        show_submit_confirmation: !0,
        show_submit_ui: !0,
        success: () => {
          alert("Test saved!");
        },
        error: (n) => {
          alert("Test submit failed...check browser log"), u.error("Submission failed: ", n);
        }
      };
      o().submit(t);
      break;
    default:
      typeof Number(e) == "number" && Number(e) >= 0 ? o().items().goto(Number(e)) : u.warn(`Invalid target (${e})`);
  }
}
function ft() {
  A("next");
}
function mt() {
  A("previous");
}
function dt() {
  A("review");
}
function pt() {
  A("submit");
}
const gt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  answerMasking: st,
  dialog: ot,
  hideDialog: rt,
  isFullscreen: at,
  isResponsiveMode: ut,
  isReviewScreen: ct,
  lineReader: lt,
  navigate: A,
  next: ft,
  previous: mt,
  review: dt,
  submit: pt
}, Symbol.toStringTag, { value: "Module" }));
class ce {
  constructor() {
    this.measurements = [], this.isMonitoring = !1, this.timerId = null, this.intervalMs = 5e3, this.baselineMB = null, this.baselineTs = null;
  }
  startMonitoring(t = 5e3) {
    if (!("memory" in performance)) {
      console.warn("performance.memory not available");
      return;
    }
    this.intervalMs = t, this.baselineMB = Math.round(performance.memory.usedJSHeapSize / 1048576), this.baselineTs = Date.now(), this.isMonitoring = !0, this.monitorMemory();
  }
  monitorMemory() {
    if (!this.isMonitoring)
      return;
    const t = {
      used: performance.memory.usedJSHeapSize,
      total: performance.memory.totalJSHeapSize,
      limit: performance.memory.jsHeapSizeLimit,
      timestamp: Date.now()
    };
    this.measurements.push(t), this.measurements.length > 100 && this.measurements.shift(), this.detectMemoryLeaks(), this.timerId = setTimeout(() => this.monitorMemory(), this.intervalMs);
  }
  stopMonitoring() {
    this.isMonitoring = !1, this.timerId && (clearTimeout(this.timerId), this.timerId = null);
  }
  detectMemoryLeaks(t = 10, n = 1e3) {
    if (this.measurements.length < t)
      return !1;
    const i = this.measurements.slice(-t), r = i[i.length - 1].used - i[0].used, a = r / (t * this.intervalMs) * 1e3;
    return a > n ? (u.warn("⚠️ Potential memory leak detected:", {
      growthMB: (r / 1048576).toFixed(2),
      rateBps: a.toFixed(2)
    }), this.printReport(Math.min(20, this.measurements.length)), !0) : !1;
  }
  /**
   * Build a compact pattern and stats from the latest window of measurements.
   * @param {number} windowSize number of points to include (default 20)
   * @returns {{ pattern: Array<{usedMB:number, ts:number}>, stats: {count:number,minMB:number,maxMB:number,avgMB:number,slopeMBperMin:number,r2:number,leakSuspect:boolean} | null }}
   */
  analyzeMemoryPattern(t = 20) {
    const i = this.measurements.slice(-t).map((a) => ({
      usedMB: Math.round(a.used / 1048576),
      // MB
      ts: a.timestamp
    })), r = this.#e(i);
    return { pattern: i, stats: r };
  }
  /**
   * Convenience method: prints a table and stats to the console.
   * Returns the same object as analyzeMemoryPattern for further use.
   */
  printReport(t = 20) {
    const { pattern: n, stats: i } = this.analyzeMemoryPattern(t);
    if (console.table(
      n.map((r) => ({
        time: new Date(r.ts).toLocaleTimeString(),
        usedMB: r.usedMB
      }))
    ), this.baselineMB != null && n.length) {
      const a = n.at(-1).usedMB - this.baselineMB, _ = this.baselineTs ? new Date(this.baselineTs).toLocaleTimeString() : "baseline";
      u.log(`Approx delta since baseline (${_}): ${a.toFixed(1)} MB`);
    }
    return u.log("Memory stats:", i), { pattern: n, stats: i };
  }
  // --- helpers -------------------------------------------------------------
  #e(t) {
    if (!t.length)
      return null;
    const n = t.map((h) => h.usedMB), i = Math.min(...n), r = Math.max(...n), a = +(n.reduce((h, T) => h + T, 0) / n.length).toFixed(2), _ = t[0].ts, P = t.map((h) => (h.ts - _) / 6e4), { slope: l, r2: v } = this.#t(P, n);
    return {
      count: t.length,
      minMB: i,
      maxMB: r,
      avgMB: a,
      slopeMBperMin: +l.toFixed(3),
      r2: +v.toFixed(3),
      leakSuspect: l > 0.5 && v > 0.6
      // tweak for your needs
    };
  }
  #t(t, n) {
    const i = t.length;
    if (i < 2)
      return { slope: 0, intercept: n[0] ?? 0, r2: 0 };
    const r = t.reduce((f, c) => f + c, 0), a = n.reduce((f, c) => f + c, 0), _ = t.reduce((f, c, x) => f + c * n[x], 0), P = t.reduce((f, c) => f + c * c, 0), l = r / i, v = a / i, h = _ - i * l * v, T = P - i * l * l, q = T ? h / T : 0, E = v - q * l, $ = n.reduce((f, c) => f + (c - v) ** 2, 0), le = n.reduce((f, c, x) => f + (c - (q * t[x] + E)) ** 2, 0), fe = $ ? 1 - le / $ : 0;
    return { slope: q, intercept: E, r2: fe };
  }
}
let d = null;
const ht = Object.fromEntries(Object.entries(tt).filter(([e]) => !["extensionsListener", "handleEvent"].includes(e))), bt = Object.fromEntries(Object.entries(it).filter(([e]) => !["setup"].includes(e))), yt = {
  utils: {
    logger: u,
    get monitor() {
      return d;
    },
    // optional convenience APIs
    enableMonitoring(e = {}) {
      return d || (d = new ce()), d.isMonitoring || d.startMonitoring(e.intervalMs ?? 5e3), d;
    },
    disableMonitoring() {
      d?.stopMonitoring();
    }
  }
};
async function _t(e, t = {}) {
  oe(e);
  const { extensions: n = [], monitor: i } = t;
  if (i) {
    const r = typeof i == "object" && Number.isFinite(i.intervalMs) ? i.intervalMs : void 0;
    d || (d = new ce()), d.isMonitoring || d.startMonitoring(r);
  }
  n.length && await me(vt, n, "assessment");
}
const vt = {
  init: _t,
  extensions: {},
  ...bt,
  ...Te,
  ...Ge,
  ...gt,
  ...ge,
  ...Be,
  ...ht,
  ...yt
};
export {
  vt as LT
};
