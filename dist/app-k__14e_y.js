import { l as u } from "./logger-BpyELtLr.js";
function R(e) {
  if (!S(e))
    return !1;
  const t = n()?.config?.questions_api_init_options?.attribute_overrides && n().config.questions_api_init_options.attribute_overrides.hasOwnProperty("instant_feedback") && typeof n().config.questions_api_init_options.attribute_overrides.instant_feedback == "boolean", i = q(e);
  return t ? n().config.questions_api_init_options.attribute_overrides.instant_feedback : i.hasOwnProperty("instant_feedback") && typeof i.instant_feedback == "boolean" ? i.instant_feedback : !1;
}
function S(e) {
  return P(e).checkValidation().has_validation;
}
function q(e) {
  const t = e || d()[0];
  return t ? s().question(t).getQuestion() : (u.error(`Question not found (index ${t})`), {});
}
function P(e) {
  const t = e || d()[0];
  return t ? s().question(t) : {};
}
function b() {
  return l().questions;
}
function O(e) {
  const t = e || d()[0];
  return t ? j(t) : {};
}
function d() {
  return b().map((e) => e.response_id);
}
function x(e) {
  const t = e || d()[0];
  return t ? s().getScores()[t] || {} : {};
}
function j(e) {
  if (s().question(e))
    return s().question(e).getResponse();
  u.error(`Response not found ${e}`);
}
const be = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasCheckAnswer: R,
  isAutoScorable: S,
  question: q,
  questionInstance: P,
  questionResponse: O,
  questionResponseIds: d,
  questionScore: x,
  questions: b
}, Symbol.toStringTag, { value: "Module" }));
function B() {
  const e = c();
  return A().item(e).dynamic || {};
}
function $() {
  const e = c();
  A().item(e).flag();
}
function F() {
  return l()?.source.hasOwnProperty("data_table_seed");
}
function W() {
  let e;
  return _() ? (e = typeof f()[0].items[0] == "object" ? f()[0].items[0].reference : f()[0].items[0], e === l().reference) : (e = typeof n().items[0] == "object" ? n().items[0].reference : n().items[0], e === l().reference);
}
function L() {
  return l().is_last_item;
}
function E() {
  return l().user_flagged;
}
function C(e = void 0) {
  let t, i, o;
  if (e ? t = s().getItems()[e].questions : t = b(), Array.isArray(t) && t.length)
    for (let r = 0; r < t.length; r++) {
      const a = t[r];
      if (o = O(a.response_id), o) {
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
function M() {
  return !!document.querySelector(".lrn-masking");
}
function l(e = void 0) {
  return e ? s().getItems()[e] : s().getCurrentItem();
}
function V() {
  return s().getCurrentItem().attempt_status;
}
function z(e) {
  const t = s().getItems();
  let i;
  for (const o in t)
    if (t[o].response_ids.includes(e)) {
      i = t[o];
      break;
    }
  return i;
}
function Q() {
  return document.querySelector(`div[data-reference='${c()}']`);
}
function D() {
  return s().assessApp().getItemPosition(c()) + 1;
}
function c() {
  return s().getCurrentItem().reference;
}
function H(e = void 0) {
  const t = s().getTags(), i = e || c();
  return t[i] || [];
}
const Ie = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dynamic: B,
  flag: $,
  isDynamicItem: F,
  isFirstItem: W,
  isFlagged: E,
  isItemFullyAttempted: C,
  isLastItem: L,
  isMaskingEnabled: M,
  item: l,
  itemAttemptStatus: V,
  itemByResponseId: z,
  itemElement: Q,
  itemPosition: D,
  itemReference: c,
  itemTags: H
}, Symbol.toStringTag, { value: "Module" }));
function Z() {
  return I() === 1;
}
function G() {
  return I() === k();
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
function J() {
  return !!y()?.config?.configuration?.shuffle_items;
}
function K() {
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
function I() {
  const e = c(), t = y();
  let i = 0;
  if (!Object.keys(t).length)
    return null;
  for (let o = 0; o < t.items.length && (++i, e !== t.items[o].reference); o++)
    ;
  return i;
}
function f() {
  return _() ? n().sections : [];
}
function k() {
  return y()?.items?.length || null;
}
const Ae = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isFirstItemInSection: Z,
  isLastItemInSection: G,
  section: y,
  sectionHasShuffledItems: J,
  sectionIndex: K,
  sectionItemPosition: I,
  sections: f,
  totalItemsInSection: k
}, Symbol.toStringTag, { value: "Module" })), p = {
  activity: null,
  maxTime: -1
};
function n() {
  return p.activity === null && (p.activity = s().getActivity()), p.activity;
}
function N() {
  return n().activity_id;
}
function U() {
  return n().activity_template_id;
}
function Se() {
  return n().config.title;
}
function qe() {
  return n().config.subtitle;
}
function Pe() {
  return s().getTags();
}
function Oe() {
  return w() && n().adaptive.hasOwnProperty("type") ? n().adaptive.type : "";
}
function X() {
  return T() && n()?.config?.annotations_api_init_options ? n().config.annotations_api_init_options : {};
}
function Y() {
  const e = n();
  return e?.config?.navigation?.auto_save ? e.config.navigation.auto_save : {};
}
function ee() {
  return s().getTime();
}
function ke() {
  return n().hasOwnProperty("activity_template_id");
}
function T() {
  const e = n();
  return !!(e?.config?.annotations === !0 || e?.config?.annotations_api_init_options);
}
function Te() {
  return !!document.querySelector(".test-answer-masking");
}
function te() {
  const e = n();
  return e.hasOwnProperty("config") && e.config.hasOwnProperty("navigation") && e.config.navigation.hasOwnProperty("auto_save") && e.config.navigation.auto_save !== !1;
}
function we() {
  return !!n()?.config?.configuration?.shuffle_items;
}
function ne() {
  const e = n();
  return e.hasOwnProperty("events") && e.events !== !1;
}
function Re() {
  return n().hasOwnProperty("item_pool_id");
}
function xe() {
  return !!document.querySelector(".lrn_linereader-toggle");
}
function je() {
  return !!n()?.config?.navigation?.resource_items;
}
function _() {
  return n().hasOwnProperty("sections");
}
function Be() {
  return n()?.dynamic_items.hasOwnProperty("try_again");
}
function w() {
  return n().hasOwnProperty("adaptive");
}
function $e() {
  return n().existing_session;
}
function ie() {
  return n()?.organisation_id;
}
function se() {
  return n()?.item_pool_id;
}
function oe() {
  return p.maxTime === -1 && (p.maxTime = n()?.config?.time?.max_time ?? 0), p.maxTime;
}
function Fe() {
  return n()?.config?.regions;
}
function We() {
  return n()?.config?.navigation?.resource_items;
}
function re() {
  return n()?.session_id;
}
function ae() {
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
function Le() {
  const e = oe();
  return e ? e - ee() : null;
}
function Ee() {
  if (_()) {
    let e = 0;
    const t = f();
    for (let i = 0; i < t.length; i++)
      e += t[i].items.length;
    return e;
  } else return w() ? n().hasOwnProperty("items") ? n().items.length : (u.info("This is an adaptive session, no items array found"), 0) : n().items.length;
}
function ue() {
  return n()?.user_id;
}
const ce = "3.0.0-beta.2", g = {
  events: {
    broadcast: !1,
    listenFor: "item"
  }
};
function fe() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {
      annotations: {
        app: de(),
        config: X(),
        enabled: T()
      },
      assess: {
        app: A()
      },
      events: {
        app: me(),
        enabled: ne()
      },
      items: {
        app: s(),
        metadata: n().config.metadata
      },
      questions: {
        app: ge()
      }
    },
    activity: {
      activity: N(),
      activityTemplate: U(),
      autoSave: {
        config: Y(),
        enabled: te()
      },
      itemBank: ie(),
      itemPool: se(),
      session: re(),
      state: ae(),
      type: n().type,
      user: ue()
    },
    LT: {
      version: ce
    },
    versions: e
  };
}
function le(e) {
  /^[a-zA-Z:*]*$/.test(e) ? g.events.listenFor = e : u.warn("Invalid event type");
}
function v(e) {
  if (g.events.broadcast) {
    const t = g.events.listenFor, i = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? u.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(i) && u.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(i) && u.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(i) && u.info(e) : e.startsWith(i) && u.info(e);
  }
}
function pe(e = !0) {
  g.events.broadcast = !!e, e ? u.info(`👂 listening for '${g.events.listenFor}'`) : u.info("🚫👂 not listening");
}
const Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: fe,
  filterEvent: le,
  handleEvent: v,
  listen: pe
}, Symbol.toStringTag, { value: "Module" })), m = {};
function Me(e) {
  m.app = e, _e();
}
function s() {
  return m.app;
}
function de() {
  return s().annotationsApp() !== void 0 ? s().annotationsApp() : null;
}
function A() {
  return s().assessApp();
}
function me() {
  return s().eventsApp();
}
function ge() {
  return s().questionsApp();
}
function _e() {
  m.app.on("all", (e) => {
    v(e);
  }), m.app.on("item:load", () => {
    d().forEach((t) => {
      const i = m.app.question(t);
      ["changed", "beforeValidate", "rendered", "validated"].forEach((o) => {
        i.on(o, () => v(o));
      });
    });
  });
}
export {
  R as $,
  Re as A,
  xe as B,
  je as C,
  _ as D,
  Be as E,
  w as F,
  $e as G,
  ie as H,
  se as I,
  oe as J,
  Fe as K,
  We as L,
  re as M,
  ae as N,
  Le as O,
  Ee as P,
  ue as Q,
  Q as R,
  b as S,
  P as T,
  M as U,
  $ as V,
  c as W,
  D as X,
  d as Y,
  O as Z,
  l as _,
  Me as a,
  z as a0,
  L as a1,
  s as b,
  de as c,
  Ce as d,
  A as e,
  me as f,
  ge as g,
  n as h,
  Ie as i,
  N as j,
  U as k,
  Se as l,
  qe as m,
  Pe as n,
  Oe as o,
  X as p,
  be as q,
  Y as r,
  Ae as s,
  ee as t,
  ke as u,
  T as v,
  Te as w,
  te as x,
  we as y,
  ne as z
};
