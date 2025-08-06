import u from "./logger.js";
function Z(e) {
  if (!P(e))
    return !1;
  const t = n()?.config?.questions_api_init_options?.attribute_overrides && n().config.questions_api_init_options.attribute_overrides.hasOwnProperty("instant_feedback") && typeof n().config.questions_api_init_options.attribute_overrides.instant_feedback == "boolean", i = q(e);
  return t ? n().config.questions_api_init_options.attribute_overrides.instant_feedback : i.hasOwnProperty("instant_feedback") && typeof i.instant_feedback == "boolean" ? i.instant_feedback : !1;
}
function P(e) {
  return k(e).checkValidation().has_validation;
}
function q(e) {
  const t = e || d()[0];
  return t ? s().question(t).getQuestion() : (u.error(`Question not found (index ${t})`), {});
}
function k(e) {
  const t = e ?? d()[0];
  return t ? s().question(t) : {};
}
function I() {
  return l().questions;
}
function T(e) {
  const t = e || d()[0];
  if (t) {
    if (s().question(t))
      return s().question(t).getResponse();
    u.error(`Response not found ${t}`);
    return;
  } else
    return {};
}
function d() {
  return I().map((e) => e.response_id);
}
function G(e) {
  const t = e || d()[0];
  return t ? s().getScores()[t] || {} : {};
}
const Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasCheckAnswer: Z,
  isAutoScorable: P,
  question: q,
  questionInstance: k,
  questionResponse: T,
  questionResponseIds: d,
  questionScore: G,
  questions: I
}, Symbol.toStringTag, { value: "Module" }));
function J() {
  const e = c();
  return v().item(e).dynamic || {};
}
function K() {
  const e = c();
  v().item(e).flag();
}
function N() {
  return l()?.source.hasOwnProperty("data_table_seed");
}
function U() {
  let e;
  return _() ? (e = typeof f()[0].items[0] == "object" ? f()[0].items[0].reference : f()[0].items[0], e === l().reference) : (e = typeof n().items[0] == "object" ? n().items[0].reference : n().items[0], e === l().reference);
}
function X() {
  return l().is_last_item;
}
function Y() {
  return l().user_flagged;
}
function ee(e = void 0) {
  let t, i, o;
  if (e ? t = s().getItems()[e].questions : t = I(), Array.isArray(t) && t.length)
    for (let r = 0; r < t.length; r++) {
      const a = t[r];
      if (o = T(a.response_id), o) {
        if (a.hasOwnProperty("metadata") && a.metadata.hasOwnProperty("valid_response_count") && Array.isArray(o.value) && (o.value.filter((h) => h === void 0).length || o.value.filter((h) => h === null).length))
          return !1;
        i = !0;
      } else
        return !1;
    }
  else
    i = !0;
  return i;
}
function te() {
  return !!document.querySelector(".lrn-masking");
}
function l(e = void 0) {
  return e ? s().getItems()[e] : s().getCurrentItem();
}
function ne() {
  return s().getCurrentItem().attempt_status;
}
function ie(e) {
  const t = s().getItems();
  let i;
  for (const o in t)
    if (t[o].response_ids.includes(e)) {
      i = t[o];
      break;
    }
  return i;
}
function se() {
  return document.querySelector(`div[data-reference='${c()}']`);
}
function oe() {
  return s().assessApp().getItemPosition(c()) + 1;
}
function c() {
  return s().getCurrentItem()?.reference;
}
function re(e = void 0) {
  const t = s().getTags(), i = e || c();
  return t[i] || [];
}
const We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dynamic: J,
  flag: K,
  isDynamicItem: N,
  isFirstItem: U,
  isFlagged: Y,
  isItemFullyAttempted: ee,
  isLastItem: X,
  isMaskingEnabled: te,
  item: l,
  itemAttemptStatus: ne,
  itemByResponseId: ie,
  itemElement: se,
  itemPosition: oe,
  itemReference: c,
  itemTags: re
}, Symbol.toStringTag, { value: "Module" }));
function ae() {
  return S() === 1;
}
function ue() {
  return S() === w();
}
function y() {
  if (_()) {
    const e = c(), t = f();
    let i = -1, o = !1;
    for (let r = 0; r < t.length && !o; r++) {
      ++i;
      for (let a = 0; a < t[r].items.length; a++)
        if (e === t[r].items[a].reference) {
          o = !0;
          break;
        }
    }
    return f()[i];
  } else
    return {};
}
function ce() {
  return !!y()?.config?.configuration?.shuffle_items;
}
function fe() {
  if (_()) {
    const e = c(), t = t();
    let i = 0, o = !1;
    for (let r = 0; r < t.length && !o; r++) {
      ++i;
      for (let a = 0; a < t[r].items.length; a++)
        if (e === t[r].items[a].reference) {
          o = !0;
          break;
        }
    }
    return i;
  } else
    return 0;
}
function S() {
  const e = c(), t = y();
  let i = 0;
  if (!Object.keys(t).length)
    return -1;
  for (let o = 0; o < t.items.length && (++i, e !== t.items[o].reference); o++)
    ;
  return i;
}
function f() {
  return n()?.sections ?? [];
}
function w() {
  return y()?.items?.length || -1;
}
const ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isFirstItemInSection: ae,
  isLastItemInSection: ue,
  section: y,
  sectionHasShuffledItems: ce,
  sectionIndex: fe,
  sectionItemPosition: S,
  sections: f,
  totalItemsInSection: w
}, Symbol.toStringTag, { value: "Module" })), p = {
  activity: null,
  maxTime: -1
};
function n() {
  return p.activity === null && (p.activity = s().getActivity()), p.activity;
}
function j() {
  return n().activity_id;
}
function le() {
  return n().config?.subtitle ?? "";
}
function pe() {
  return s().getTags() ?? [];
}
function R() {
  return n()?.activity_template_id ?? "";
}
function de() {
  return n().config?.title ?? "";
}
function me() {
  return O() && n().adaptive.hasOwnProperty("type") ? n().adaptive.type : "";
}
function x() {
  return A() && n()?.config?.annotations_api_init_options ? n().config.annotations_api_init_options : {};
}
function B() {
  const e = n();
  return e?.config?.navigation?.auto_save ? e.config.navigation.auto_save : {};
}
function $() {
  return s().getTime();
}
function ge() {
  return n().hasOwnProperty("activity_template_id");
}
function A() {
  const e = n();
  return !!(e?.config?.annotations === !0 || e?.config?.annotations_api_init_options);
}
function _e() {
  return !!document.querySelector(".test-answer-masking");
}
function F() {
  const e = n();
  return e.hasOwnProperty("config") && e.config.hasOwnProperty("navigation") && e.config.navigation.hasOwnProperty("auto_save") && e.config.navigation.auto_save !== !1;
}
function ye() {
  return !!n()?.config?.configuration?.shuffle_items;
}
function L() {
  const e = n();
  return e.hasOwnProperty("events") && e.events !== !1;
}
function ve() {
  return n().hasOwnProperty("item_pool_id");
}
function he() {
  return !!document.querySelector(".lrn_linereader-toggle");
}
function be() {
  return !!n()?.config?.navigation?.resource_items;
}
function _() {
  return n().hasOwnProperty("sections");
}
function Ie() {
  return n()?.dynamic_items.hasOwnProperty("try_again");
}
function O() {
  return n().hasOwnProperty("adaptive");
}
function Se() {
  return n().existing_session;
}
function Ae() {
  const e = n().config?.regions?.items;
  return e ? e.some((t) => t.type === "vertical_element") : !1;
}
function W() {
  return n()?.organisation_id ?? null;
}
function z() {
  return n()?.item_pool_id ?? "";
}
function E() {
  return p.maxTime === -1 && (p.maxTime = n()?.config?.time?.max_time ?? 0), p.maxTime;
}
function Oe() {
  return n()?.config?.regions ?? "";
}
function Pe() {
  return n()?.config?.navigation?.resource_items ?? [];
}
function M() {
  return n()?.session_id;
}
function C() {
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
function qe() {
  const e = E();
  return e ? e - $() : null;
}
function ke() {
  if (_()) {
    let e = 0;
    const t = f();
    for (let i = 0; i < t.length; i++)
      e += t[i].items.length;
    return e;
  } else return O() ? n().hasOwnProperty("items") ? n().items.length : (u.info("This is an adaptive session, no items array found"), 0) : n().items.length;
}
function V() {
  return n()?.user_id;
}
const Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activity: n,
  activityId: j,
  activitySubTitle: le,
  activityTags: pe,
  activityTemplateId: R,
  activityTitle: de,
  adaptiveType: me,
  annotationsConfig: x,
  autoSaveConfig: B,
  elapsedTime: $,
  hasActivityTemplate: ge,
  hasAnnotations: A,
  hasAnswerMasking: _e,
  hasAutoSave: F,
  hasEvents: L,
  hasItemPool: ve,
  hasLineReader: he,
  hasResourceItems: be,
  hasSections: _,
  hasShuffledItems: ye,
  hasTryAgain: Ie,
  isAdaptive: O,
  isResuming: Se,
  isVerticalLayout: Ae,
  itemBank: W,
  itemPool: z,
  maxTime: E,
  region: Oe,
  resourceItems: Pe,
  sessionId: M,
  state: C,
  timeRemaining: qe,
  totalItems: ke,
  userId: V
}, Symbol.toStringTag, { value: "Module" })), g = {
  events: {
    broadcast: !1,
    listenFor: "item"
  }
};
function Te() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {
      annotations: {
        app: Q(),
        config: x(),
        enabled: A()
      },
      assess: {
        app: v()
      },
      events: {
        app: D(),
        enabled: L()
      },
      items: {
        app: s(),
        metadata: n().config.metadata
      },
      questions: {
        app: H()
      }
    },
    activity: {
      activity: j(),
      activityTemplate: R(),
      autoSave: {
        config: B(),
        enabled: F()
      },
      itemBank: W(),
      itemPool: z(),
      session: M(),
      state: C(),
      type: n().type,
      user: V()
    },
    LT: {
      version: "3.0.0-beta.6"
    },
    versions: e
  };
}
function we(e) {
  /^[a-zA-Z:*]*$/.test(e) ? g.events.listenFor = e : u.warn("Invalid event type");
}
function b(e) {
  if (g.events.broadcast) {
    const t = g.events.listenFor, i = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? u.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(i) && u.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(i) && u.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(i) && u.info(e) : e.startsWith(i) && u.info(e);
  }
}
function je(e = !0) {
  g.events.broadcast = !!e, e ? u.info(`👂 listening for '${g.events.listenFor}'`) : u.info("🚫👂 not listening");
}
const Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: Te,
  filterEvent: we,
  handleEvent: b,
  listen: je
}, Symbol.toStringTag, { value: "Module" })), m = {};
function Re(e) {
  m.app = e, xe();
}
function s() {
  return m.app;
}
function Q() {
  return s().annotationsApp() !== void 0 ? s().annotationsApp() : null;
}
function v() {
  return s().assessApp();
}
function D() {
  return s().eventsApp();
}
function H() {
  return s().questionsApp();
}
function xe() {
  m.app.on("all", (e) => {
    b(e);
  }), m.app.on("item:load", () => {
    d().forEach((t) => {
      const i = m.app.question(t);
      ["changed", "beforeValidate", "rendered", "validated"].forEach((o) => {
        i.on(o, () => b(o));
      });
    });
  });
}
const Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  annotationsApp: Q,
  appInstance: s,
  assessApp: v,
  eventsApp: D,
  init: Re,
  questionsApp: H
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ae as A,
  V as B,
  M as C,
  oe as D,
  l as E,
  Ce as a,
  Ee as b,
  s as c,
  Me as d,
  Q as e,
  I as f,
  Z as g,
  A as h,
  We as i,
  T as j,
  v as k,
  se as l,
  d as m,
  k as n,
  Se as o,
  n as p,
  Le as q,
  Oe as r,
  ze as s,
  ke as t,
  ie as u,
  X as v,
  te as w,
  K as x,
  c as y,
  H as z
};
