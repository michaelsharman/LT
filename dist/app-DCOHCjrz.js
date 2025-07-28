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
  const t = e || d()[0];
  return t ? s().question(t) : {};
}
function I() {
  return l().questions;
}
function T(e) {
  const t = e || d()[0];
  return t ? J(t) : {};
}
function d() {
  return I().map((e) => e.response_id);
}
function G(e) {
  const t = e || d()[0];
  return t ? s().getScores()[t] || {} : {};
}
function J(e) {
  if (s().question(e))
    return s().question(e).getResponse();
  u.error(`Response not found ${e}`);
}
const ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
function K() {
  const e = c();
  return v().item(e).dynamic || {};
}
function N() {
  const e = c();
  v().item(e).flag();
}
function U() {
  return l()?.source.hasOwnProperty("data_table_seed");
}
function X() {
  let e;
  return m() ? (e = typeof f()[0].items[0] == "object" ? f()[0].items[0].reference : f()[0].items[0], e === l().reference) : (e = typeof n().items[0] == "object" ? n().items[0].reference : n().items[0], e === l().reference);
}
function Y() {
  return l().is_last_item;
}
function ee() {
  return l().user_flagged;
}
function te(e = void 0) {
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
function ne() {
  return !!document.querySelector(".lrn-masking");
}
function l(e = void 0) {
  return e ? s().getItems()[e] : s().getCurrentItem();
}
function ie() {
  return s().getCurrentItem().attempt_status;
}
function se(e) {
  const t = s().getItems();
  let i;
  for (const o in t)
    if (t[o].response_ids.includes(e)) {
      i = t[o];
      break;
    }
  return i;
}
function oe() {
  return document.querySelector(`div[data-reference='${c()}']`);
}
function re() {
  return s().assessApp().getItemPosition(c()) + 1;
}
function c() {
  return s().getCurrentItem().reference;
}
function ae(e = void 0) {
  const t = s().getTags(), i = e || c();
  return t[i] || [];
}
const Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dynamic: K,
  flag: N,
  isDynamicItem: U,
  isFirstItem: X,
  isFlagged: ee,
  isItemFullyAttempted: te,
  isLastItem: Y,
  isMaskingEnabled: ne,
  item: l,
  itemAttemptStatus: ie,
  itemByResponseId: se,
  itemElement: oe,
  itemPosition: re,
  itemReference: c,
  itemTags: ae
}, Symbol.toStringTag, { value: "Module" }));
function ue() {
  return S() === 1;
}
function ce() {
  return S() === w();
}
function y() {
  if (m()) {
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
function fe() {
  return !!y()?.config?.configuration?.shuffle_items;
}
function le() {
  if (m()) {
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
    return null;
  for (let o = 0; o < t.items.length && (++i, e !== t.items[o].reference); o++)
    ;
  return i;
}
function f() {
  return m() ? n().sections : [];
}
function w() {
  return y()?.items?.length || null;
}
const Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isFirstItemInSection: ue,
  isLastItemInSection: ce,
  section: y,
  sectionHasShuffledItems: fe,
  sectionIndex: le,
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
function x() {
  return n().activity_template_id;
}
function pe() {
  return n().config.title;
}
function de() {
  return n().config.subtitle;
}
function me() {
  return s().getTags();
}
function ge() {
  return O() && n().adaptive.hasOwnProperty("type") ? n().adaptive.type : "";
}
function R() {
  return A() && n()?.config?.annotations_api_init_options ? n().config.annotations_api_init_options : {};
}
function B() {
  const e = n();
  return e?.config?.navigation?.auto_save ? e.config.navigation.auto_save : {};
}
function $() {
  return s().getTime();
}
function _e() {
  return n().hasOwnProperty("activity_template_id");
}
function A() {
  const e = n();
  return !!(e?.config?.annotations === !0 || e?.config?.annotations_api_init_options);
}
function ye() {
  return !!document.querySelector(".test-answer-masking");
}
function F() {
  const e = n();
  return e.hasOwnProperty("config") && e.config.hasOwnProperty("navigation") && e.config.navigation.hasOwnProperty("auto_save") && e.config.navigation.auto_save !== !1;
}
function ve() {
  return !!n()?.config?.configuration?.shuffle_items;
}
function W() {
  const e = n();
  return e.hasOwnProperty("events") && e.events !== !1;
}
function he() {
  return n().hasOwnProperty("item_pool_id");
}
function be() {
  return !!document.querySelector(".lrn_linereader-toggle");
}
function Ie() {
  return !!n()?.config?.navigation?.resource_items;
}
function m() {
  return n().hasOwnProperty("sections");
}
function Se() {
  return n()?.dynamic_items.hasOwnProperty("try_again");
}
function O() {
  return n().hasOwnProperty("adaptive");
}
function Ae() {
  return n().existing_session;
}
function z() {
  return n()?.organisation_id;
}
function L() {
  return n()?.item_pool_id;
}
function M() {
  return p.maxTime === -1 && (p.maxTime = n()?.config?.time?.max_time ?? 0), p.maxTime;
}
function Oe() {
  return n()?.config?.regions;
}
function Pe() {
  return n()?.config?.navigation?.resource_items;
}
function C() {
  return n()?.session_id;
}
function E() {
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
  const e = M();
  return e ? e - $() : null;
}
function ke() {
  if (m()) {
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
const Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activity: n,
  activityId: j,
  activitySubTitle: de,
  activityTags: me,
  activityTemplateId: x,
  activityTitle: pe,
  adaptiveType: ge,
  annotationsConfig: R,
  autoSaveConfig: B,
  elapsedTime: $,
  hasActivityTemplate: _e,
  hasAnnotations: A,
  hasAnswerMasking: ye,
  hasAutoSave: F,
  hasEvents: W,
  hasItemPool: he,
  hasLineReader: be,
  hasResourceItems: Ie,
  hasSections: m,
  hasShuffledItems: ve,
  hasTryAgain: Se,
  isAdaptive: O,
  isResuming: Ae,
  itemBank: z,
  itemPool: L,
  maxTime: M,
  region: Oe,
  resourceItems: Pe,
  sessionId: C,
  state: E,
  timeRemaining: qe,
  totalItems: ke,
  userId: V
}, Symbol.toStringTag, { value: "Module" })), Te = "3.0.0-beta.3", _ = {
  events: {
    broadcast: !1,
    listenFor: "item"
  }
};
function we() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {
      annotations: {
        app: Q(),
        config: R(),
        enabled: A()
      },
      assess: {
        app: v()
      },
      events: {
        app: D(),
        enabled: W()
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
      activityTemplate: x(),
      autoSave: {
        config: B(),
        enabled: F()
      },
      itemBank: z(),
      itemPool: L(),
      session: C(),
      state: E(),
      type: n().type,
      user: V()
    },
    LT: {
      version: Te
    },
    versions: e
  };
}
function je(e) {
  /^[a-zA-Z:*]*$/.test(e) ? _.events.listenFor = e : u.warn("Invalid event type");
}
function b(e) {
  if (_.events.broadcast) {
    const t = _.events.listenFor, i = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? u.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(i) && u.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(i) && u.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(i) && u.info(e) : e.startsWith(i) && u.info(e);
  }
}
function xe(e = !0) {
  _.events.broadcast = !!e, e ? u.info(`👂 listening for '${_.events.listenFor}'`) : u.info("🚫👂 not listening");
}
const Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: we,
  filterEvent: je,
  handleEvent: b,
  listen: xe
}, Symbol.toStringTag, { value: "Module" })), g = {};
function Re(e) {
  g.app = e, Be();
}
function s() {
  return g.app;
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
function Be() {
  g.app.on("all", (e) => {
    b(e);
  }), g.app.on("item:load", () => {
    d().forEach((t) => {
      const i = g.app.question(t);
      ["changed", "beforeValidate", "rendered", "validated"].forEach((o) => {
        i.on(o, () => b(o));
      });
    });
  });
}
const Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  annotationsApp: Q,
  appInstance: s,
  assessApp: v,
  eventsApp: D,
  init: Re,
  questionsApp: H
}, Symbol.toStringTag, { value: "Module" }));
export {
  n as A,
  se as B,
  Y as C,
  Oe as D,
  Ve as a,
  Ce as b,
  s as c,
  Ee as d,
  oe as e,
  I as f,
  k as g,
  ne as h,
  Le as i,
  N as j,
  H as k,
  v as l,
  C as m,
  c as n,
  re as o,
  d as p,
  ze as q,
  T as r,
  Me as s,
  ke as t,
  V as u,
  l as v,
  Q as w,
  A as x,
  Z as y,
  Ae as z
};
