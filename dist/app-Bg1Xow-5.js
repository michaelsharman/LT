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
  const t = e || m()[0];
  return t ? s().question(t).getQuestion() : (u.error(`Question not found (index ${t})`), {});
}
function k(e) {
  const t = e || m()[0];
  return t ? s().question(t) : {};
}
function I() {
  return l().questions;
}
function T(e) {
  const t = e || m()[0];
  return t ? J(t) : {};
}
function m() {
  return I().map((e) => e.response_id);
}
function G(e) {
  const t = e || m()[0];
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
  questionResponseIds: m,
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
  return d() ? (e = typeof f()[0].items[0] == "object" ? f()[0].items[0].reference : f()[0].items[0], e === l().reference) : (e = typeof n().items[0] == "object" ? n().items[0].reference : n().items[0], e === l().reference);
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
const Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  if (d()) {
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
  if (d()) {
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
  return d() ? n().sections : [];
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
function R() {
  return n().activity_template_id;
}
function pe() {
  return n().config.title;
}
function me() {
  return n().config.subtitle;
}
function de() {
  return s().getTags();
}
function ge() {
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
function L() {
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
function d() {
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
function Oe() {
  const e = n().config?.regions?.items;
  return e ? e.some((t) => t.type === "vertical_element") : !1;
}
function W() {
  return n()?.organisation_id;
}
function z() {
  return n()?.item_pool_id;
}
function E() {
  return p.maxTime === -1 && (p.maxTime = n()?.config?.time?.max_time ?? 0), p.maxTime;
}
function Pe() {
  return n()?.config?.regions;
}
function qe() {
  return n()?.config?.navigation?.resource_items;
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
function ke() {
  const e = E();
  return e ? e - $() : null;
}
function Te() {
  if (d()) {
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
  activitySubTitle: me,
  activityTags: de,
  activityTemplateId: R,
  activityTitle: pe,
  adaptiveType: ge,
  annotationsConfig: x,
  autoSaveConfig: B,
  elapsedTime: $,
  hasActivityTemplate: _e,
  hasAnnotations: A,
  hasAnswerMasking: ye,
  hasAutoSave: F,
  hasEvents: L,
  hasItemPool: he,
  hasLineReader: be,
  hasResourceItems: Ie,
  hasSections: d,
  hasShuffledItems: ve,
  hasTryAgain: Se,
  isAdaptive: O,
  isResuming: Ae,
  isVerticalLayout: Oe,
  itemBank: W,
  itemPool: z,
  maxTime: E,
  region: Pe,
  resourceItems: qe,
  sessionId: M,
  state: C,
  timeRemaining: ke,
  totalItems: Te,
  userId: V
}, Symbol.toStringTag, { value: "Module" })), we = "3.0.0-beta.3", _ = {
  events: {
    broadcast: !1,
    listenFor: "item"
  }
};
function je() {
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
      version: we
    },
    versions: e
  };
}
function Re(e) {
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
const Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: je,
  filterEvent: Re,
  handleEvent: b,
  listen: xe
}, Symbol.toStringTag, { value: "Module" })), g = {};
function Be(e) {
  g.app = e, $e();
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
function $e() {
  g.app.on("all", (e) => {
    b(e);
  }), g.app.on("item:load", () => {
    m().forEach((t) => {
      const i = g.app.question(t);
      ["changed", "beforeValidate", "rendered", "validated"].forEach((o) => {
        i.on(o, () => b(o));
      });
    });
  });
}
const Qe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  annotationsApp: Q,
  appInstance: s,
  assessApp: v,
  eventsApp: D,
  init: Be,
  questionsApp: H
}, Symbol.toStringTag, { value: "Module" }));
export {
  Oe as A,
  V as B,
  M as C,
  re as D,
  l as E,
  Qe as a,
  Ce as b,
  s as c,
  Ve as d,
  Q as e,
  I as f,
  Z as g,
  A as h,
  Ee as i,
  T as j,
  v as k,
  oe as l,
  m,
  k as n,
  Ae as o,
  n as p,
  ze as q,
  se as r,
  Me as s,
  Te as t,
  Y as u,
  Pe as v,
  ne as w,
  N as x,
  c as y,
  H as z
};
