import u from "./logger.js";
function G(e) {
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
  const t = e ?? m()[0];
  return t ? s().question(t) : {};
}
function I() {
  return d().questions;
}
function w(e) {
  const t = e || m()[0];
  if (t) {
    if (s().question(t))
      return s().question(t).getResponse();
    u.error(`Response not found ${t}`);
    return;
  } else
    return {};
}
function m() {
  return I().map((e) => e.response_id);
}
function J(e) {
  const t = e || m()[0];
  return t ? s().getScores()[t] || {} : {};
}
const Fe = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  hasCheckAnswer: G,
  isAutoScorable: P,
  question: q,
  questionInstance: k,
  questionResponse: w,
  questionResponseIds: m,
  questionScore: J,
  questions: I
}, Symbol.toStringTag, { value: "Module" }));
function K() {
  const e = f();
  return v().item(e).dynamic || {};
}
function N() {
  const e = f();
  v().item(e).flag();
}
function U() {
  return d()?.source.hasOwnProperty("data_table_seed");
}
function X() {
  let e;
  return _() ? (e = typeof l()[0].items[0] == "object" ? l()[0].items[0].reference : l()[0].items[0], e === d().reference) : (e = typeof n().items[0] == "object" ? n().items[0].reference : n().items[0], e === d().reference);
}
function Y() {
  return d().is_last_item;
}
function ee() {
  return d().user_flagged;
}
function te(e = void 0) {
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
function ne() {
  return !!document.querySelector(".lrn-masking");
}
function d(e = void 0) {
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
  return document.querySelector(`div[data-reference='${f()}']`);
}
function re() {
  return s().assessApp().getItemPosition(f()) + 1;
}
function f() {
  return s().getCurrentItem()?.reference;
}
function ae(e = void 0) {
  const t = s().getTags(), i = e || f();
  return t[i] || [];
}
const We = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  dynamic: K,
  flag: N,
  isDynamicItem: U,
  isFirstItem: X,
  isFlagged: ee,
  isItemFullyAttempted: te,
  isLastItem: Y,
  isMaskingEnabled: ne,
  item: d,
  itemAttemptStatus: ie,
  itemByResponseId: se,
  itemElement: oe,
  itemPosition: re,
  itemReference: f,
  itemTags: ae
}, Symbol.toStringTag, { value: "Module" }));
function ue() {
  return S() === 1;
}
function ce() {
  return S() === T();
}
function y() {
  if (_()) {
    const e = f(), t = l();
    let i = -1, o = !1;
    for (let r = 0; r < t.length && !o; r++) {
      ++i;
      for (let a = 0; a < t[r].items.length; a++)
        if (e === t[r].items[a].reference) {
          o = !0;
          break;
        }
    }
    return l()[i];
  } else
    return {};
}
function fe() {
  return !!y()?.config?.configuration?.shuffle_items;
}
function le() {
  if (_()) {
    const e = f(), t = t();
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
  const e = f(), t = y();
  let i = 0;
  if (!Object.keys(t).length)
    return -1;
  for (let o = 0; o < t.items.length && (++i, e !== t.items[o].reference); o++)
    ;
  return i;
}
function l() {
  return n()?.sections ?? [];
}
function T() {
  return y()?.items?.length || -1;
}
const ze = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  isFirstItemInSection: ue,
  isLastItemInSection: ce,
  section: y,
  sectionHasShuffledItems: fe,
  sectionIndex: le,
  sectionItemPosition: S,
  sections: l,
  totalItemsInSection: T
}, Symbol.toStringTag, { value: "Module" })), p = {
  activity: null,
  maxTime: -1
};
function n() {
  return p.activity === null && (p.activity = s().getActivity()), p.activity;
}
function x() {
  return n().activity_id;
}
function de() {
  return n().config?.subtitle ?? "";
}
function pe() {
  return s().getTags() ?? [];
}
function j() {
  return n()?.activity_template_id ?? "";
}
function me() {
  return n().config?.title ?? "";
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
function L() {
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
function $() {
  const e = n();
  return e.hasOwnProperty("config") && e.config.hasOwnProperty("navigation") && e.config.navigation.hasOwnProperty("auto_save") && e.config.navigation.auto_save !== !1;
}
function ve() {
  return !!n()?.config?.configuration?.shuffle_items;
}
function E() {
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
function _() {
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
function F() {
  return n()?.organisation_id ?? null;
}
function W() {
  return n()?.item_pool_id ?? "";
}
function z() {
  return p.maxTime === -1 && (p.maxTime = n()?.config?.time?.max_time ?? 0), p.maxTime;
}
function Pe() {
  return n()?.config?.regions ?? "";
}
function qe() {
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
function ke() {
  const e = z();
  return e ? e - L() : null;
}
function we() {
  if (_()) {
    let e = 0;
    const t = l();
    for (let i = 0; i < t.length; i++)
      e += t[i].items.length;
    return e;
  } else return O() ? n().hasOwnProperty("items") ? n().items.length : (u.info("This is an adaptive session, no items array found"), 0) : n().items.length;
}
function V() {
  return n()?.user_id;
}
const Me = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  activity: n,
  activityId: x,
  activitySubTitle: de,
  activityTags: pe,
  activityTemplateId: j,
  activityTitle: me,
  adaptiveType: ge,
  annotationsConfig: R,
  autoSaveConfig: B,
  elapsedTime: L,
  hasActivityTemplate: _e,
  hasAnnotations: A,
  hasAnswerMasking: ye,
  hasAutoSave: $,
  hasEvents: E,
  hasItemPool: he,
  hasLineReader: be,
  hasResourceItems: Ie,
  hasSections: _,
  hasShuffledItems: ve,
  hasTryAgain: Se,
  isAdaptive: O,
  isResuming: Ae,
  isVerticalLayout: Oe,
  itemBank: F,
  itemPool: W,
  maxTime: z,
  region: Pe,
  resourceItems: qe,
  sessionId: M,
  state: C,
  timeRemaining: ke,
  totalItems: we,
  userId: V
}, Symbol.toStringTag, { value: "Module" })), c = {
  events: {
    broadcast: !1,
    listenFor: "item",
    extensions: []
  },
  initialised: !1
};
function Te() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {
      annotations: {
        app: D(),
        config: R(),
        enabled: A()
      },
      assess: {
        app: v()
      },
      events: {
        app: H(),
        enabled: E()
      },
      items: {
        app: s(),
        metadata: n().config.metadata
      },
      questions: {
        app: Z()
      }
    },
    activity: {
      activity: x(),
      activityTemplate: j(),
      autoSave: {
        config: B(),
        enabled: $()
      },
      itemBank: F(),
      itemPool: W(),
      session: M(),
      state: C(),
      type: n().type,
      user: V()
    },
    LT: {
      extensions: c.events.extensions,
      version: "3.0.0-beta.8"
    },
    versions: e
  };
}
function xe(e) {
  /^[a-zA-Z:*]*$/.test(e) ? c.events.listenFor = e : u.warn("Invalid event type");
}
function b(e) {
  if (c.events.broadcast) {
    const t = c.events.listenFor, i = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? u.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(i) && u.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(i) && u.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(i) && u.info(e) : e.startsWith(i) && u.info(e);
  }
}
function je(e = !0) {
  c.events.broadcast = !!e, e ? u.info(`👂 listening for '${c.events.listenFor}'`) : u.info("🚫👂 not listening");
}
function Q() {
  c.initialised || (window.addEventListener("module:run", (e) => {
    const { name: t, timestamp: i } = e.detail;
    c.events.extensions.push({ name: t, timestamp: i });
  }), c.initialised = !0);
}
const Ce = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: Te,
  extensionsListener: Q,
  filterEvent: xe,
  handleEvent: b,
  listen: je
}, Symbol.toStringTag, { value: "Module" })), g = {};
async function Re(e) {
  g.app = e, Be();
}
function s() {
  return g.app;
}
function D() {
  return s().annotationsApp() !== void 0 ? s().annotationsApp() : null;
}
function v() {
  return s().assessApp();
}
function H() {
  return s().eventsApp();
}
function Z() {
  return s().questionsApp();
}
function Be() {
  g.app.on("all", (e) => {
    b(e);
  }), g.app.on("item:load", () => {
    m().forEach((t) => {
      const i = g.app.question(t);
      ["changed", "beforeValidate", "rendered", "validated"].forEach((o) => {
        i.on(o, () => b(o));
      });
    });
  }), Q();
}
const Ve = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  annotationsApp: D,
  appInstance: s,
  assessApp: v,
  eventsApp: H,
  init: Re,
  questionsApp: Z
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ae as A,
  n as B,
  se as C,
  ne as D,
  N as E,
  Ve as a,
  Me as b,
  s as c,
  Ce as d,
  D as e,
  I as f,
  G as g,
  A as h,
  We as i,
  w as j,
  v as k,
  oe as l,
  m,
  k as n,
  f as o,
  Z as p,
  Fe as q,
  Pe as r,
  ze as s,
  we as t,
  Oe as u,
  V as v,
  M as w,
  re as x,
  d as y,
  Y as z
};
