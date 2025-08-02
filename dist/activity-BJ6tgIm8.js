import u from "./logger.js";
const P = "3.0.0-beta.4", d = {
  events: {
    broadcast: !1,
    listenFor: "item"
  }
};
function X() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {
      annotations: {
        app: B(),
        config: $(),
        enabled: q()
      },
      assess: {
        app: _()
      },
      events: {
        app: F(),
        enabled: M()
      },
      items: {
        app: s(),
        metadata: n().config.metadata
      },
      questions: {
        app: L()
      }
    },
    activity: {
      activity: E(),
      activityTemplate: V(),
      autoSave: {
        config: C(),
        enabled: Q()
      },
      itemBank: z(),
      itemPool: D(),
      session: Z(),
      state: G(),
      type: n().type,
      user: J()
    },
    LT: {
      version: P
    },
    versions: e
  };
}
function Y(e) {
  /^[a-zA-Z:*]*$/.test(e) ? d.events.listenFor = e : u.warn("Invalid event type");
}
function b(e) {
  if (d.events.broadcast) {
    const t = d.events.listenFor, i = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? u.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(i) && u.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(i) && u.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(i) && u.info(e) : e.startsWith(i) && u.info(e);
  }
}
function ee(e = !0) {
  d.events.broadcast = !!e, e ? u.info(`👂 listening for '${d.events.listenFor}'`) : u.info("🚫👂 not listening");
}
function te() {
  return I() === 1;
}
function ne() {
  return I() === w();
}
function v() {
  if (h()) {
    const e = c(), t = f();
    let i = -1, a = !1;
    for (let o = 0; o < t.length && !a; o++) {
      ++i;
      for (let r = 0; r < t[o].items.length; r++)
        if (e === t[o].items[r].reference) {
          a = !0;
          break;
        }
    }
    return f()[i];
  } else
    return {};
}
function ie() {
  return !!v()?.config?.configuration?.shuffle_items;
}
function se() {
  if (h()) {
    const e = c(), t = t();
    let i = 0, a = !1;
    for (let o = 0; o < t.length && !a; o++) {
      ++i;
      for (let r = 0; r < t[o].items.length; r++)
        if (e === t[o].items[r].reference) {
          a = !0;
          break;
        }
    }
    return i;
  } else
    return 0;
}
function I() {
  const e = c(), t = v();
  let i = 0;
  if (!Object.keys(t).length)
    return null;
  for (let a = 0; a < t.items.length && (++i, e !== t.items[a].reference); a++)
    ;
  return i;
}
function f() {
  return h() ? n().sections : [];
}
function w() {
  return v()?.items?.length || null;
}
function ae() {
  const e = c();
  return _().item(e).dynamic || {};
}
function oe() {
  const e = c();
  _().item(e).flag();
}
function re() {
  return m()?.source.hasOwnProperty("data_table_seed");
}
function ue() {
  let e;
  return h() ? (e = typeof f()[0].items[0] == "object" ? f()[0].items[0].reference : f()[0].items[0], e === m().reference) : (e = typeof n().items[0] == "object" ? n().items[0].reference : n().items[0], e === m().reference);
}
function ce() {
  return m().is_last_item;
}
function fe() {
  return m().user_flagged;
}
function le(e = void 0) {
  let t, i, a;
  if (e ? t = s().getItems()[e].questions : t = A(), Array.isArray(t) && t.length)
    for (let o = 0; o < t.length; o++) {
      const r = t[o];
      if (a = R(r.response_id), a) {
        if (r.hasOwnProperty("metadata") && r.metadata.hasOwnProperty("valid_response_count") && Array.isArray(a.value) && (a.value.filter((y) => y === void 0).length || a.value.filter((y) => y === null).length))
          return !1;
        i = !0;
      } else
        return !1;
    }
  else
    i = !0;
  return i;
}
function me() {
  return !!document.querySelector(".lrn-masking");
}
function m(e = void 0) {
  return e ? s().getItems()[e] : s().getCurrentItem();
}
function pe() {
  return s().getCurrentItem().attempt_status;
}
function de(e) {
  const t = s().getItems();
  let i;
  for (const a in t)
    if (t[a].response_ids.includes(e)) {
      i = t[a];
      break;
    }
  return i;
}
function ge() {
  return document.querySelector(`div[data-reference='${c()}']`);
}
function he() {
  return s().assessApp().getItemPosition(c()) + 1;
}
function c() {
  return s().getCurrentItem()?.reference;
}
function ye(e = void 0) {
  const t = s().getTags(), i = e || c();
  return t[i] || [];
}
function ve(e) {
  if (!S(e))
    return !1;
  const t = n()?.config?.questions_api_init_options?.attribute_overrides && n().config.questions_api_init_options.attribute_overrides.hasOwnProperty("instant_feedback") && typeof n().config.questions_api_init_options.attribute_overrides.instant_feedback == "boolean", i = T(e);
  return t ? n().config.questions_api_init_options.attribute_overrides.instant_feedback : i.hasOwnProperty("instant_feedback") && typeof i.instant_feedback == "boolean" ? i.instant_feedback : !1;
}
function S(e) {
  return O(e).checkValidation().has_validation;
}
function T(e) {
  const t = e || g()[0];
  return t ? s().question(t).getQuestion() : (u.error(`Question not found (index ${t})`), {});
}
function O(e) {
  const t = e || g()[0];
  return t ? s().question(t) : {};
}
function A() {
  return m().questions;
}
function R(e) {
  const t = e || g()[0];
  return t ? x(t) : {};
}
function g() {
  return A().map((e) => e.response_id);
}
function _e(e) {
  const t = e || g()[0];
  return t ? s().getScores()[t] || {} : {};
}
function x(e) {
  if (s().question(e))
    return s().question(e).getResponse();
  u.error(`Response not found ${e}`);
}
const p = {};
function be(e) {
  p.app = e, W();
}
function s() {
  return p.app;
}
function B() {
  return s().annotationsApp() !== void 0 ? s().annotationsApp() : null;
}
function _() {
  return s().assessApp();
}
function F() {
  return s().eventsApp();
}
function L() {
  return s().questionsApp();
}
function W() {
  p.app.on("all", (e) => {
    b(e);
  }), p.app.on("item:load", () => {
    g().forEach((t) => {
      const i = p.app.question(t);
      ["changed", "beforeValidate", "rendered", "validated"].forEach((a) => {
        i.on(a, () => b(a));
      });
    });
  });
}
const l = {
  activity: null,
  maxTime: -1
};
function n() {
  return l.activity === null && (l.activity = s().getActivity()), l.activity;
}
function E() {
  return n().activity_id;
}
function V() {
  return n().activity_template_id;
}
function Ie() {
  return n().config.title;
}
function Ae() {
  return n().config.subtitle;
}
function qe() {
  return s().getTags();
}
function ke() {
  return k() && n().adaptive.hasOwnProperty("type") ? n().adaptive.type : "";
}
function $() {
  return q() && n()?.config?.annotations_api_init_options ? n().config.annotations_api_init_options : {};
}
function C() {
  const e = n();
  return e?.config?.navigation?.auto_save ? e.config.navigation.auto_save : {};
}
function j() {
  return s().getTime();
}
function Pe() {
  return n().hasOwnProperty("activity_template_id");
}
function q() {
  const e = n();
  return !!(e?.config?.annotations === !0 || e?.config?.annotations_api_init_options);
}
function we() {
  return !!document.querySelector(".test-answer-masking");
}
function Q() {
  const e = n();
  return e.hasOwnProperty("config") && e.config.hasOwnProperty("navigation") && e.config.navigation.hasOwnProperty("auto_save") && e.config.navigation.auto_save !== !1;
}
function Se() {
  return !!n()?.config?.configuration?.shuffle_items;
}
function M() {
  const e = n();
  return e.hasOwnProperty("events") && e.events !== !1;
}
function Te() {
  return n().hasOwnProperty("item_pool_id");
}
function Oe() {
  return !!document.querySelector(".lrn_linereader-toggle");
}
function Re() {
  return !!n()?.config?.navigation?.resource_items;
}
function h() {
  return n().hasOwnProperty("sections");
}
function xe() {
  return n()?.dynamic_items.hasOwnProperty("try_again");
}
function k() {
  return n().hasOwnProperty("adaptive");
}
function Be() {
  return n().existing_session;
}
function Fe() {
  const e = n().config?.regions?.items;
  return e ? e.some((t) => t.type === "vertical_element") : !1;
}
function z() {
  return n()?.organisation_id;
}
function D() {
  return n()?.item_pool_id;
}
function H() {
  return l.maxTime === -1 && (l.maxTime = n()?.config?.time?.max_time ?? 0), l.maxTime;
}
function Le() {
  return n()?.config?.regions;
}
function We() {
  return n()?.config?.navigation?.resource_items;
}
function Z() {
  return n()?.session_id;
}
function G() {
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
function Ee() {
  const e = H();
  return e ? e - j() : null;
}
function Ve() {
  if (h()) {
    let e = 0;
    const t = f();
    for (let i = 0; i < t.length; i++)
      e += t[i].items.length;
    return e;
  } else return k() ? n().hasOwnProperty("items") ? n().items.length : (u.info("This is an adaptive session, no items array found"), 0) : n().items.length;
}
function J() {
  return n()?.user_id;
}
export {
  pe as $,
  H as A,
  Le as B,
  We as C,
  Z as D,
  G as E,
  Ee as F,
  Ve as G,
  J as H,
  be as I,
  s as J,
  B as K,
  _ as L,
  F as M,
  L as N,
  X as O,
  Y as P,
  b as Q,
  ee as R,
  ae as S,
  oe as T,
  re as U,
  ue as V,
  ce as W,
  fe as X,
  le as Y,
  me as Z,
  m as _,
  n as a,
  de as a0,
  ge as a1,
  he as a2,
  c as a3,
  ye as a4,
  ve as a5,
  S as a6,
  T as a7,
  O as a8,
  A as a9,
  R as aa,
  g as ab,
  _e as ac,
  te as ad,
  ne as ae,
  v as af,
  ie as ag,
  se as ah,
  I as ai,
  f as aj,
  w as ak,
  E as b,
  V as c,
  Ie as d,
  Ae as e,
  qe as f,
  ke as g,
  $ as h,
  C as i,
  j,
  Pe as k,
  q as l,
  we as m,
  Q as n,
  Se as o,
  M as p,
  Te as q,
  Oe as r,
  Re as s,
  h as t,
  xe as u,
  k as v,
  Be as w,
  Fe as x,
  z as y,
  D as z
};
