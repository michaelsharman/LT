import u from "./logger.js";
const P = "3.0.0-beta.4", d = {
  events: {
    broadcast: !1,
    listenFor: "item"
  }
};
function U() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {
      annotations: {
        app: x(),
        config: V(),
        enabled: q()
      },
      assess: {
        app: v()
      },
      events: {
        app: B(),
        enabled: Q()
      },
      items: {
        app: s(),
        metadata: n().config.metadata
      },
      questions: {
        app: F()
      }
    },
    activity: {
      activity: W(),
      activityTemplate: E(),
      autoSave: {
        config: $(),
        enabled: j()
      },
      itemBank: M(),
      itemPool: z(),
      session: H(),
      state: Z(),
      type: n().type,
      user: G()
    },
    LT: {
      version: P
    },
    versions: e
  };
}
function X(e) {
  /^[a-zA-Z:*]*$/.test(e) ? d.events.listenFor = e : u.warn("Invalid event type");
}
function b(e) {
  if (d.events.broadcast) {
    const t = d.events.listenFor, i = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? u.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(i) && u.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(i) && u.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(i) && u.info(e) : e.startsWith(i) && u.info(e);
  }
}
function Y(e = !0) {
  d.events.broadcast = !!e, e ? u.info(`👂 listening for '${d.events.listenFor}'`) : u.info("🚫👂 not listening");
}
function ee() {
  return I() === 1;
}
function te() {
  return I() === w();
}
function _() {
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
function ne() {
  return !!_()?.config?.configuration?.shuffle_items;
}
function ie() {
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
  const e = c(), t = _();
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
  return _()?.items?.length || null;
}
function se() {
  const e = c();
  return v().item(e).dynamic || {};
}
function ae() {
  const e = c();
  v().item(e).flag();
}
function oe() {
  return m()?.source.hasOwnProperty("data_table_seed");
}
function re() {
  let e;
  return h() ? (e = typeof f()[0].items[0] == "object" ? f()[0].items[0].reference : f()[0].items[0], e === m().reference) : (e = typeof n().items[0] == "object" ? n().items[0].reference : n().items[0], e === m().reference);
}
function ue() {
  return m().is_last_item;
}
function ce() {
  return m().user_flagged;
}
function fe(e = void 0) {
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
function le() {
  return !!document.querySelector(".lrn-masking");
}
function m(e = void 0) {
  return e ? s().getItems()[e] : s().getCurrentItem();
}
function me() {
  return s().getCurrentItem().attempt_status;
}
function pe(e) {
  const t = s().getItems();
  let i;
  for (const a in t)
    if (t[a].response_ids.includes(e)) {
      i = t[a];
      break;
    }
  return i;
}
function de() {
  return document.querySelector(`div[data-reference='${c()}']`);
}
function ge() {
  return s().assessApp().getItemPosition(c()) + 1;
}
function c() {
  return s().getCurrentItem()?.reference;
}
function he(e = void 0) {
  const t = s().getTags(), i = e || c();
  return t[i] || [];
}
function ye(e) {
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
  if (t) {
    if (s().question(t))
      return s().question(t).getResponse();
    u.error(`Response not found ${t}`);
    return;
  } else
    return {};
}
function g() {
  return A().map((e) => e.response_id);
}
function _e(e) {
  const t = e || g()[0];
  return t ? s().getScores()[t] || {} : {};
}
const p = {};
function ve(e) {
  p.app = e, L();
}
function s() {
  return p.app;
}
function x() {
  return s().annotationsApp() !== void 0 ? s().annotationsApp() : null;
}
function v() {
  return s().assessApp();
}
function B() {
  return s().eventsApp();
}
function F() {
  return s().questionsApp();
}
function L() {
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
function W() {
  return n().activity_id;
}
function E() {
  return n().activity_template_id;
}
function be() {
  return n().config.title;
}
function Ie() {
  return n().config.subtitle;
}
function Ae() {
  return s().getTags();
}
function qe() {
  return k() && n().adaptive.hasOwnProperty("type") ? n().adaptive.type : "";
}
function V() {
  return q() && n()?.config?.annotations_api_init_options ? n().config.annotations_api_init_options : {};
}
function $() {
  const e = n();
  return e?.config?.navigation?.auto_save ? e.config.navigation.auto_save : {};
}
function C() {
  return s().getTime();
}
function ke() {
  return n().hasOwnProperty("activity_template_id");
}
function q() {
  const e = n();
  return !!(e?.config?.annotations === !0 || e?.config?.annotations_api_init_options);
}
function Pe() {
  return !!document.querySelector(".test-answer-masking");
}
function j() {
  const e = n();
  return e.hasOwnProperty("config") && e.config.hasOwnProperty("navigation") && e.config.navigation.hasOwnProperty("auto_save") && e.config.navigation.auto_save !== !1;
}
function we() {
  return !!n()?.config?.configuration?.shuffle_items;
}
function Q() {
  const e = n();
  return e.hasOwnProperty("events") && e.events !== !1;
}
function Se() {
  return n().hasOwnProperty("item_pool_id");
}
function Te() {
  return !!document.querySelector(".lrn_linereader-toggle");
}
function Oe() {
  return !!n()?.config?.navigation?.resource_items;
}
function h() {
  return n().hasOwnProperty("sections");
}
function Re() {
  return n()?.dynamic_items.hasOwnProperty("try_again");
}
function k() {
  return n().hasOwnProperty("adaptive");
}
function xe() {
  return n().existing_session;
}
function Be() {
  const e = n().config?.regions?.items;
  return e ? e.some((t) => t.type === "vertical_element") : !1;
}
function M() {
  return n()?.organisation_id;
}
function z() {
  return n()?.item_pool_id;
}
function D() {
  return l.maxTime === -1 && (l.maxTime = n()?.config?.time?.max_time ?? 0), l.maxTime;
}
function Fe() {
  return n()?.config?.regions;
}
function Le() {
  return n()?.config?.navigation?.resource_items;
}
function H() {
  return n()?.session_id;
}
function Z() {
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
function We() {
  const e = D();
  return e ? e - C() : null;
}
function Ee() {
  if (h()) {
    let e = 0;
    const t = f();
    for (let i = 0; i < t.length; i++)
      e += t[i].items.length;
    return e;
  } else return k() ? n().hasOwnProperty("items") ? n().items.length : (u.info("This is an adaptive session, no items array found"), 0) : n().items.length;
}
function G() {
  return n()?.user_id;
}
export {
  me as $,
  D as A,
  Fe as B,
  Le as C,
  H as D,
  Z as E,
  We as F,
  Ee as G,
  G as H,
  ve as I,
  s as J,
  x as K,
  v as L,
  B as M,
  F as N,
  U as O,
  X as P,
  b as Q,
  Y as R,
  se as S,
  ae as T,
  oe as U,
  re as V,
  ue as W,
  ce as X,
  fe as Y,
  le as Z,
  m as _,
  n as a,
  pe as a0,
  de as a1,
  ge as a2,
  c as a3,
  he as a4,
  ye as a5,
  S as a6,
  T as a7,
  O as a8,
  A as a9,
  R as aa,
  g as ab,
  _e as ac,
  ee as ad,
  te as ae,
  _ as af,
  ne as ag,
  ie as ah,
  I as ai,
  f as aj,
  w as ak,
  W as b,
  E as c,
  be as d,
  Ie as e,
  Ae as f,
  qe as g,
  V as h,
  $ as i,
  C as j,
  ke as k,
  q as l,
  Pe as m,
  j as n,
  we as o,
  Q as p,
  Se as q,
  Te as r,
  Oe as s,
  h as t,
  Re as u,
  k as v,
  xe as w,
  Be as x,
  M as y,
  z
};
