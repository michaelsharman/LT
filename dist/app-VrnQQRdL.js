import { l as u } from "./logger-BpyELtLr.js";
function H(e) {
  if (!P(e))
    return !1;
  const t = n()?.config?.questions_api_init_options?.attribute_overrides && n().config.questions_api_init_options.attribute_overrides.hasOwnProperty("instant_feedback") && typeof n().config.questions_api_init_options.attribute_overrides.instant_feedback == "boolean", i = q(e);
  return t ? n().config.questions_api_init_options.attribute_overrides.instant_feedback : i.hasOwnProperty("instant_feedback") && typeof i.instant_feedback == "boolean" ? i.instant_feedback : !1;
}
function P(e) {
  return k(e).checkValidation().has_validation;
}
function q(e) {
  const t = e || p()[0];
  return t ? s().question(t).getQuestion() : (u.error(`Question not found (index ${t})`), {});
}
function k(e) {
  const t = e || p()[0];
  return t ? s().question(t) : {};
}
function I() {
  return l().questions;
}
function w(e) {
  const t = e || p()[0];
  return t ? G(t) : {};
}
function p() {
  return I().map((e) => e.response_id);
}
function Z(e) {
  const t = e || p()[0];
  return t ? s().getScores()[t] || {} : {};
}
function G(e) {
  if (s().question(e))
    return s().question(e).getResponse();
  u.error(`Response not found ${e}`);
}
const We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasCheckAnswer: H,
  isAutoScorable: P,
  question: q,
  questionInstance: k,
  questionResponse: w,
  questionResponseIds: p,
  questionScore: Z,
  questions: I
}, Symbol.toStringTag, { value: "Module" }));
function J() {
  const e = c();
  return y().item(e).dynamic || {};
}
function K() {
  const e = c();
  y().item(e).flag();
}
function N() {
  return l()?.source.hasOwnProperty("data_table_seed");
}
function U() {
  let e;
  return d() ? (e = typeof f()[0].items[0] == "object" ? f()[0].items[0].reference : f()[0].items[0], e === l().reference) : (e = typeof n().items[0] == "object" ? n().items[0].reference : n().items[0], e === l().reference);
}
function X() {
  return l().is_last_item;
}
function Y() {
  return l().user_flagged;
}
function ee(e) {
  let t, i, o;
  if (e ? t = s().getItems()[e].questions : t = I(), Array.isArray(t) && t.length)
    for (let r = 0; r < t.length; r++) {
      const a = t[r];
      if (o = w(a.response_id), o) {
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
function l(e) {
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
  return s().getCurrentItem().reference;
}
function re(e) {
  const t = s().getTags(), i = e || c();
  return t[i] || [];
}
const ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
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
  return S() === T();
}
function _() {
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
function ce() {
  return !!_()?.config?.configuration?.shuffle_items;
}
function fe() {
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
  const e = c(), t = _();
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
function T() {
  return _()?.items?.length || null;
}
const Ee = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isFirstItemInSection: ae,
  isLastItemInSection: ue,
  section: _,
  sectionHasShuffledItems: ce,
  sectionIndex: fe,
  sectionItemPosition: S,
  sections: f,
  totalItemsInSection: T
}, Symbol.toStringTag, { value: "Module" }));
function n() {
  return s().getActivity();
}
function j() {
  return n().activity_id;
}
function R() {
  return n().activity_template_id;
}
function le() {
  return n().config.title;
}
function pe() {
  return n().config.subtitle;
}
function de() {
  return s().getTags();
}
function me() {
  return O() && n().adaptive.hasOwnProperty("type") ? n().adaptive.type : "";
}
function B() {
  return A() && n()?.config?.annotations_api_init_options ? n().config.annotations_api_init_options : {};
}
function $() {
  const e = n();
  return e?.config?.navigation?.auto_save ? e.config.navigation.auto_save : {};
}
function x() {
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
function W() {
  const e = n();
  return e.hasOwnProperty("events") && e.events !== !1;
}
function he() {
  return n().hasOwnProperty("item_pool_id");
}
function ve() {
  return !!document.querySelector(".lrn_linereader-toggle");
}
function be() {
  return !!n()?.config?.navigation?.resource_items;
}
function d() {
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
function z() {
  return n()?.organisation_id;
}
function E() {
  return n()?.item_pool_id;
}
function v() {
  return n()?.config?.time?.max_time ? n().config.time.max_time : 0;
}
function Ae() {
  return n()?.config?.regions;
}
function Oe() {
  return n()?.config?.navigation?.resource_items;
}
function L() {
  return n()?.session_id;
}
function M() {
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
function Pe() {
  return v() === 0 ? null : v() - x();
}
function qe() {
  if (d()) {
    let e = 0;
    const t = f();
    for (let i = 0; i < t.length; i++)
      e += t[i].items.length;
    return e;
  } else return O() ? n().hasOwnProperty("items") ? n().items.length : (u.info("This is an adaptive session, no items array found"), 0) : n().items.length;
}
function C() {
  return n()?.user_id;
}
const Le = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activity: n,
  activityId: j,
  activitySubTitle: pe,
  activityTags: de,
  activityTemplateId: R,
  activityTitle: le,
  adaptiveType: me,
  annotationsConfig: B,
  autoSaveConfig: $,
  elapsedTime: x,
  hasActivityTemplate: ge,
  hasAnnotations: A,
  hasAnswerMasking: _e,
  hasAutoSave: F,
  hasEvents: W,
  hasItemPool: he,
  hasLineReader: ve,
  hasResourceItems: be,
  hasSections: d,
  hasShuffledItems: ye,
  hasTryAgain: Ie,
  isAdaptive: O,
  isResuming: Se,
  itemBank: z,
  itemPool: E,
  maxTime: v,
  region: Ae,
  resourceItems: Oe,
  sessionId: L,
  state: M,
  timeRemaining: Pe,
  totalItems: qe,
  userId: C
}, Symbol.toStringTag, { value: "Module" })), ke = "3.0.0-beta.2", g = {
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
        app: V(),
        config: B(),
        enabled: A()
      },
      assess: {
        app: y()
      },
      events: {
        app: Q(),
        enabled: W()
      },
      items: {
        app: s(),
        metadata: n().config.metadata
      },
      questions: {
        app: D()
      }
    },
    activity: {
      activity: j(),
      activityTemplate: R(),
      autoSave: {
        config: $(),
        enabled: F()
      },
      itemBank: z(),
      itemPool: E(),
      session: L(),
      state: M(),
      type: n().type,
      user: C()
    },
    LT: {
      version: ke
    },
    versions: e
  };
}
function Te(e) {
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
  diagnostics: we,
  filterEvent: Te,
  handleEvent: b,
  listen: je
}, Symbol.toStringTag, { value: "Module" })), m = {};
function Re(e) {
  m.app = e, Be();
}
function s() {
  return m.app;
}
function V() {
  return s().annotationsApp() !== void 0 ? s().annotationsApp() : null;
}
function y() {
  return s().assessApp();
}
function Q() {
  return s().eventsApp();
}
function D() {
  return s().questionsApp();
}
function Be() {
  m.app.on("all", (e) => {
    b(e);
  }), m.app.on("item:load", () => {
    p().forEach((t) => {
      const i = m.app.question(t);
      ["changed", "beforeValidate", "rendered", "validated"].forEach((o) => {
        i.on(o, () => b(o));
      });
    });
  });
}
const Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  annotationsApp: V,
  appInstance: s,
  assessApp: y,
  eventsApp: Q,
  init: Re,
  questionsApp: D
}, Symbol.toStringTag, { value: "Module" }));
export {
  H as A,
  Se as B,
  X as C,
  Ae as D,
  n as E,
  ie as F,
  Le as a,
  Ce as b,
  s as c,
  Me as d,
  se as e,
  I as f,
  k as g,
  te as h,
  ze as i,
  K as j,
  D as k,
  Pe as l,
  y as m,
  L as n,
  c as o,
  oe as p,
  We as q,
  p as r,
  Ee as s,
  qe as t,
  C as u,
  q as v,
  w,
  l as x,
  V as y,
  A as z
};
