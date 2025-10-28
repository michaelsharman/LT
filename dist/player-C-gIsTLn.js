import r from "./logger.js";
function U(e) {
  if (!O(e))
    return !1;
  const t = n()?.config?.questions_api_init_options?.attribute_overrides && n().config.questions_api_init_options.attribute_overrides.hasOwnProperty("instant_feedback") && typeof n().config.questions_api_init_options.attribute_overrides.instant_feedback == "boolean", i = R(e);
  return t ? n().config.questions_api_init_options.attribute_overrides.instant_feedback : i.hasOwnProperty("instant_feedback") && typeof i.instant_feedback == "boolean" ? i.instant_feedback : !1;
}
function O(e) {
  return T(e).checkValidation().has_validation;
}
function R(e) {
  const t = e || _()[0];
  return t ? s().question(t).getQuestion() : (r.error(`Question not found (index ${t})`), {});
}
function T(e) {
  const t = e ?? _()[0];
  return t ? s().question(t) : {};
}
function k() {
  return m().questions;
}
function x(e) {
  const t = e || _()[0];
  if (t) {
    if (s().question(t))
      return s().question(t).getResponse();
    r.error(`Response not found ${t}`);
    return;
  } else
    return {};
}
function _() {
  return k().map((e) => e.response_id);
}
function X(e) {
  const t = e || _()[0];
  return t ? s().getScores()[t] || {} : {};
}
const Ye = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasCheckAnswer: U,
  isAutoScorable: O,
  question: R,
  questionInstance: T,
  questionResponse: x,
  questionResponseIds: _,
  questionScore: X,
  questions: k
}, Symbol.toStringTag, { value: "Module" }));
function Y() {
  const e = f();
  return g().item(e).dynamic || {};
}
function ee() {
  const e = f();
  g().item(e).flag();
}
function te() {
  return m()?.source.hasOwnProperty("data_table_seed");
}
function ne() {
  let e;
  return h() ? (e = typeof d()[0].items[0] == "object" ? d()[0].items[0].reference : d()[0].items[0], e === m().reference) : (e = typeof n().items[0] == "object" ? n().items[0].reference : n().items[0], e === m().reference);
}
function M() {
  return m().is_last_item;
}
function ie() {
  return m().user_flagged;
}
function se(e = void 0) {
  let t, i, o;
  if (e ? t = s().getItems()[e].questions : t = k(), Array.isArray(t) && t.length)
    for (let a = 0; a < t.length; a++) {
      const u = t[a];
      if (o = x(u.response_id), o) {
        if (u.hasOwnProperty("metadata") && u.metadata.hasOwnProperty("valid_response_count") && Array.isArray(o.value) && (o.value.filter((w) => w === void 0).length || o.value.filter((w) => w === null).length))
          return !1;
        i = !0;
      } else
        return !1;
    }
  else
    i = !0;
  return i;
}
function oe() {
  return !!document.querySelector(".lrn-masking");
}
function m(e = void 0) {
  return e ? s().getItems()[e] : s().getCurrentItem();
}
function re() {
  return s().getCurrentItem().attempt_status;
}
function ae(e) {
  const t = s().getItems();
  let i;
  for (const o in t)
    if (t[o].response_ids.includes(e)) {
      i = t[o];
      break;
    }
  return i;
}
function ue() {
  return document.querySelector(`div[data-reference='${f()}']`);
}
function ce() {
  return s().assessApp().getItemPosition(f()) + 1;
}
function f() {
  return s().getCurrentItem()?.reference;
}
function le(e = void 0) {
  const t = s().getTags(), i = e || f();
  return t[i] || [];
}
const et = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dynamic: Y,
  flag: ee,
  isDynamicItem: te,
  isFirstItem: ne,
  isFlagged: ie,
  isItemFullyAttempted: se,
  isLastItem: M,
  isMaskingEnabled: oe,
  item: m,
  itemAttemptStatus: re,
  itemByResponseId: ae,
  itemElement: ue,
  itemPosition: ce,
  itemReference: f,
  itemTags: le
}, Symbol.toStringTag, { value: "Module" }));
function fe() {
  return A() === 1;
}
function de() {
  return A() === j();
}
function v() {
  if (!h())
    return 0;
  const e = f(), t = d();
  let i = -1, o = !1;
  for (let a = 0; a < t.length && !o; a++) {
    ++i;
    for (let u = 0; u < t[a].items.length; u++)
      if (e === t[a].items[u]) {
        o = !0;
        break;
      }
  }
  return d()[i];
}
function me() {
  return !!v()?.config?.configuration?.shuffle_items;
}
function ge() {
  if (!h())
    return 0;
  const e = f(), t = d();
  let i = 0, o = !1;
  for (let a = 0; a < t.length && !o; a++) {
    ++i;
    for (let u = 0; u < t[a].items.length; u++)
      if (e === t[a].items[u]) {
        o = !0;
        break;
      }
  }
  return o && i || 0;
}
function A() {
  const e = f(), t = v();
  let i = 0;
  if (!Object.keys(t).length)
    return -1;
  for (let o = 0; o < t.items.length && (++i, e !== t.items[o]); o++)
    ;
  return i;
}
function d() {
  return n()?.sections ?? [];
}
function j() {
  return v()?.items?.length || -1;
}
const tt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isFirstItemInSection: fe,
  isLastItemInSection: de,
  section: v,
  sectionHasShuffledItems: me,
  sectionIndex: ge,
  sectionItemPosition: A,
  sections: d,
  totalItemsInSection: j
}, Symbol.toStringTag, { value: "Module" })), p = {
  activity: null,
  maxTime: -1
};
function n() {
  return p.activity === null && (p.activity = s().getActivity()), p.activity;
}
function $() {
  return n().activity_id;
}
function pe() {
  return n().config?.subtitle ?? "";
}
function _e() {
  return s().getTags() ?? [];
}
function B() {
  return n()?.activity_template_id ?? "";
}
function be() {
  return n().config?.title ?? "";
}
function he() {
  return P() && n().adaptive.hasOwnProperty("type") ? n().adaptive.type : "";
}
function E() {
  return q() && n()?.config?.annotations_api_init_options ? n().config.annotations_api_init_options : {};
}
function L() {
  const e = n();
  return e?.config?.navigation?.auto_save ? e.config.navigation.auto_save : {};
}
function I() {
  return s().getTime();
}
function ye() {
  return n().hasOwnProperty("activity_template_id");
}
function q() {
  const e = n();
  return !!(e?.config?.annotations === !0 || e?.config?.annotations_api_init_options);
}
function ve() {
  return !!document.querySelector(".test-answer-masking");
}
function F() {
  const e = n();
  return e.hasOwnProperty("config") && e.config.hasOwnProperty("navigation") && e.config.navigation.hasOwnProperty("auto_save") && e.config.navigation.auto_save !== !1;
}
function V() {
  return (n()?.config?.configuration?.reading_mode?.reading_time || 0) > 0;
}
function we() {
  return !!n()?.config?.configuration?.shuffle_items;
}
function C() {
  const e = n();
  return e.hasOwnProperty("events") && e.events !== !1;
}
function Se() {
  return n().hasOwnProperty("item_pool_id");
}
function ke() {
  return !!document.querySelector(".lrn_linereader-toggle");
}
function Ae() {
  return !!n()?.config?.navigation?.resource_items;
}
function h() {
  return n().hasOwnProperty("sections");
}
function Ie() {
  return n()?.dynamic_items.hasOwnProperty("try_again");
}
function P() {
  return n().hasOwnProperty("adaptive");
}
function qe() {
  return n().existing_session;
}
function Pe() {
  const e = n().config?.regions?.items;
  return e ? e.some((t) => t.type === "vertical_element") : !1;
}
function W() {
  return n()?.organisation_id ?? null;
}
function z() {
  return n()?.item_pool_id ?? "";
}
function N() {
  return p.maxTime === -1 && (p.maxTime = n()?.config?.time?.max_time ?? 0), p.maxTime;
}
function Oe() {
  return n()?.config?.regions ?? "";
}
function Re() {
  return n()?.config?.navigation?.resource_items ?? [];
}
function Q() {
  return n()?.session_id;
}
function D() {
  let e;
  switch (n()?.state) {
    case void 0:
      e = "initial";
      break;
    default:
      e = n().state;
      break;
  }
  return e;
}
function Te() {
  const e = N();
  return e ? e - I() : null;
}
function xe() {
  if (h()) {
    let e = 0;
    const t = d();
    for (let i = 0; i < t.length; i++)
      e += t[i].items.length;
    return e;
  } else return P() ? n().hasOwnProperty("items") ? n().items.length : (r.info("This is an adaptive session, no items array found"), 0) : n().items.length;
}
function H() {
  return n()?.user_id;
}
const nt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activity: n,
  activityId: $,
  activitySubTitle: pe,
  activityTags: _e,
  activityTemplateId: B,
  activityTitle: be,
  adaptiveType: he,
  annotationsConfig: E,
  autoSaveConfig: L,
  elapsedTime: I,
  hasActivityTemplate: ye,
  hasAnnotations: q,
  hasAnswerMasking: ve,
  hasAutoSave: F,
  hasEvents: C,
  hasItemPool: Se,
  hasLineReader: ke,
  hasReadingMode: V,
  hasResourceItems: Ae,
  hasSections: h,
  hasShuffledItems: we,
  hasTryAgain: Ie,
  isAdaptive: P,
  isResuming: qe,
  isVerticalLayout: Pe,
  itemBank: W,
  itemPool: z,
  maxTime: N,
  region: Oe,
  resourceItems: Re,
  sessionId: Q,
  state: D,
  timeRemaining: Te,
  totalItems: xe,
  userId: H
}, Symbol.toStringTag, { value: "Module" })), l = {
  events: {
    broadcast: !1,
    listenFor: "item"
  },
  extensions: {
    running: []
  },
  initialised: !1
};
function Me() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {
      annotations: {
        app: G(),
        config: E(),
        enabled: q()
      },
      assess: {
        app: g()
      },
      events: {
        app: J(),
        enabled: C()
      },
      items: {
        app: s(),
        metadata: n().config.metadata
      },
      questions: {
        app: K()
      }
    },
    activity: {
      activity: $(),
      activityTemplate: B(),
      autoSave: {
        config: L(),
        enabled: F()
      },
      itemBank: W(),
      itemPool: z(),
      session: Q(),
      state: D(),
      type: n().type,
      user: H()
    },
    LT: {
      extensions: l.extensions,
      version: "3.0.0-beta.12"
    },
    versions: e
  };
}
function je(e) {
  /^[a-zA-Z:*]*$/.test(e) ? l.events.listenFor = e : r.warn("Invalid event type");
}
function S(e) {
  if (l.events.broadcast) {
    const t = l.events.listenFor, i = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? r.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(i) && r.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(i) && r.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(i) && r.info(e) : e.startsWith(i) && r.info(e);
  }
}
function $e(e = !0) {
  l.events.broadcast = !!e, e ? r.info(`👂 listening for '${l.events.listenFor}'`) : r.info("🚫👂 not listening");
}
function Z() {
  l.initialised || (window.addEventListener("extension:run", (e) => {
    const { name: t, timestamp: i } = e.detail;
    l.extensions.running.push({ name: t, timestamp: i });
  }), l.initialised = !0);
}
const it = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: Me,
  extensionsListener: Z,
  filterEvent: je,
  handleEvent: S,
  listen: $e
}, Symbol.toStringTag, { value: "Module" })), b = {};
function Be(e) {
  b.app = e, Ee();
}
function s() {
  return b.app;
}
function G() {
  return s().annotationsApp() !== void 0 ? s().annotationsApp() : null;
}
function g() {
  return s().assessApp();
}
function J() {
  return s().eventsApp();
}
function K() {
  return s().questionsApp();
}
function Ee() {
  b.app.on("all", (e) => {
    S(e);
  }), b.app.on("item:load", () => {
    _().forEach((t) => {
      const i = b.app.question(t);
      ["changed", "beforeValidate", "rendered", "validated"].forEach((o) => {
        i.on(o, () => S(o));
      });
    });
  }), Z();
}
const st = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  annotationsApp: G,
  assessApp: g,
  eventsApp: J,
  itemsApp: s,
  questionsApp: K,
  setup: Be
}, Symbol.toStringTag, { value: "Module" })), c = {
  answerMasking: {
    enabled: null
  },
  lineReader: {
    enabled: null,
    id: null
  }
};
function Le(e) {
  c.answerMasking.enabled === null && (document.querySelector(".test-answer-masking") ? c.answerMasking.enabled = !0 : c.answerMasking.enabled = !1), c.answerMasking.enabled ? e !== void 0 && s().questionsApp().masking(e) : r.warn("Answer masking is not enabled in the Items API configuration.");
}
function Fe(e) {
  g().dialogs().custom.show(e);
}
function Ve() {
  g().dialogs().custom.hide();
}
function Ce() {
  return document.querySelector(".lrn-assess")?.classList.contains("lrn-fullscreen") ?? !1;
}
function We() {
  return !g().hasStarted();
}
function ze() {
  return !!(V() && I() === 0);
}
function Ne() {
  return !!document.querySelector(".has-menu-region");
}
function Qe() {
  return document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden") === null;
}
function De(e) {
  if (c.lineReader.enabled === null) {
    const t = document.querySelector(".lrn_linereader-toggle");
    if (t) {
      c.lineReader.enabled = !0;
      const o = t.querySelector("[data-lrn-widget-container]").getAttribute("data-lrn-widget-container").match(/\d+$/);
      o ? c.lineReader.id = o[0] : r.warn("Could not find the line reader unique id.");
    } else
      c.lineReader.enabled = !1;
  }
  if (c.lineReader.enabled && c.lineReader.id !== null) {
    const t = s().features()[`lrn-assessapp-feature_${c.lineReader.id}`];
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
    r.warn("Line reader is not enabled in the Items API configuration.");
}
function y(e) {
  switch (e) {
    case "previous":
      s().items().previous();
      break;
    case "next":
      M() || s().items().next();
      break;
    case "review":
      document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden") === null ? s().dialogs().reviewScreen.hide() : s().dialogs().reviewScreen.show();
      break;
    case "submit":
      const t = {
        show_submit_confirmation: !0,
        show_submit_ui: !0,
        success: () => {
          alert("Test saved!");
        },
        error: (i) => {
          alert("Test submit failed...check browser log"), r.error("Submission failed: ", i);
        }
      };
      s().submit(t);
      break;
    default:
      typeof Number(e) == "number" && Number(e) >= 0 ? s().items().goto(Number(e)) : r.warn(`Invalid target (${e})`);
  }
}
function He() {
  y("next");
}
function Ze() {
  y("previous");
}
function Ge() {
  y("review");
}
function Je() {
  y("submit");
}
const ot = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  answerMasking: Le,
  dialog: Fe,
  hideDialog: Ve,
  isFullscreen: Ce,
  isIntroScreen: We,
  isReadingMode: ze,
  isResponsiveMode: Ne,
  isReviewScreen: Qe,
  lineReader: De,
  navigate: y,
  next: He,
  previous: Ze,
  review: Ge,
  submit: Je
}, Symbol.toStringTag, { value: "Module" }));
export {
  st as a,
  nt as b,
  Be as c,
  it as d,
  We as e,
  ze as f,
  et as i,
  ot as p,
  Ye as q,
  tt as s
};
