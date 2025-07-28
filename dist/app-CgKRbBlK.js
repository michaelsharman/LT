import { l as u } from "./logger-BpyELtLr.js";
function X(t) {
  if (!P(t))
    return !1;
  const e = n()?.config?.questions_api_init_options?.attribute_overrides && n().config.questions_api_init_options.attribute_overrides.hasOwnProperty("instant_feedback") && typeof n().config.questions_api_init_options.attribute_overrides.instant_feedback == "boolean", i = w(t);
  return e ? n().config.questions_api_init_options.attribute_overrides.instant_feedback : i.hasOwnProperty("instant_feedback") && typeof i.instant_feedback == "boolean" ? i.instant_feedback : !1;
}
function P(t) {
  return S(t).checkValidation().has_validation;
}
function w(t) {
  const e = t || g()[0];
  return e ? s().question(e).getQuestion() : (u.error(`Question not found (index ${e})`), {});
}
function S(t) {
  const e = t || g()[0];
  return e ? s().question(e) : {};
}
function I() {
  return m().questions;
}
function T(t) {
  const e = t || g()[0];
  return e ? O(e) : {};
}
function g() {
  return I().map((t) => t.response_id);
}
function Y(t) {
  const e = t || g()[0];
  return e ? s().getScores()[e] || {} : {};
}
function O(t) {
  if (s().question(t))
    return s().question(t).getResponse();
  u.error(`Response not found ${t}`);
}
function tt() {
  const t = c();
  return _().item(t).dynamic || {};
}
function et() {
  const t = c();
  _().item(t).flag();
}
function nt() {
  return m()?.source.hasOwnProperty("data_table_seed");
}
function it() {
  let t;
  return h() ? (t = typeof f()[0].items[0] == "object" ? f()[0].items[0].reference : f()[0].items[0], t === m().reference) : (t = typeof n().items[0] == "object" ? n().items[0].reference : n().items[0], t === m().reference);
}
function st() {
  return m().is_last_item;
}
function at() {
  return m().user_flagged;
}
function ot(t = void 0) {
  let e, i, a;
  if (t ? e = s().getItems()[t].questions : e = I(), Array.isArray(e) && e.length)
    for (let o = 0; o < e.length; o++) {
      const r = e[o];
      if (a = T(r.response_id), a) {
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
function rt() {
  return !!document.querySelector(".lrn-masking");
}
function m(t = void 0) {
  return t ? s().getItems()[t] : s().getCurrentItem();
}
function ut() {
  return s().getCurrentItem().attempt_status;
}
function ct(t) {
  const e = s().getItems();
  let i;
  for (const a in e)
    if (e[a].response_ids.includes(t)) {
      i = e[a];
      break;
    }
  return i;
}
function ft() {
  return document.querySelector(`div[data-reference='${c()}']`);
}
function lt() {
  return s().assessApp().getItemPosition(c()) + 1;
}
function c() {
  return s().getCurrentItem().reference;
}
function mt(t = void 0) {
  const e = s().getTags(), i = t || c();
  return e[i] || [];
}
function pt() {
  return A() === 1;
}
function dt() {
  return A() === R();
}
function v() {
  if (h()) {
    const t = c(), e = f();
    let i = -1, a = !1;
    for (let o = 0; o < e.length && !a; o++) {
      ++i;
      for (let r = 0; r < e[o].items.length; r++)
        if (t === e[o].items[r].reference) {
          a = !0;
          break;
        }
    }
    return f()[i];
  } else
    return {};
}
function gt() {
  return !!v()?.config?.configuration?.shuffle_items;
}
function ht() {
  if (h()) {
    const t = c(), e = e();
    let i = 0, a = !1;
    for (let o = 0; o < e.length && !a; o++) {
      ++i;
      for (let r = 0; r < e[o].items.length; r++)
        if (t === e[o].items[r].reference) {
          a = !0;
          break;
        }
    }
    return i;
  } else
    return 0;
}
function A() {
  const t = c(), e = v();
  let i = 0;
  if (!Object.keys(e).length)
    return null;
  for (let a = 0; a < e.items.length && (++i, t !== e.items[a].reference); a++)
    ;
  return i;
}
function f() {
  return h() ? n().sections : [];
}
function R() {
  return v()?.items?.length || null;
}
const l = {
  activity: null,
  maxTime: -1
};
function n() {
  return l.activity === null && (l.activity = s().getActivity()), l.activity;
}
function x() {
  return n().activity_id;
}
function B() {
  return n().activity_template_id;
}
function yt() {
  return n().config.title;
}
function vt() {
  return n().config.subtitle;
}
function _t() {
  return s().getTags();
}
function bt() {
  return k() && n().adaptive.hasOwnProperty("type") ? n().adaptive.type : "";
}
function F() {
  return q() && n()?.config?.annotations_api_init_options ? n().config.annotations_api_init_options : {};
}
function W() {
  const t = n();
  return t?.config?.navigation?.auto_save ? t.config.navigation.auto_save : {};
}
function L() {
  return s().getTime();
}
function It() {
  return n().hasOwnProperty("activity_template_id");
}
function q() {
  const t = n();
  return !!(t?.config?.annotations === !0 || t?.config?.annotations_api_init_options);
}
function At() {
  return !!document.querySelector(".test-answer-masking");
}
function E() {
  const t = n();
  return t.hasOwnProperty("config") && t.config.hasOwnProperty("navigation") && t.config.navigation.hasOwnProperty("auto_save") && t.config.navigation.auto_save !== !1;
}
function qt() {
  return !!n()?.config?.configuration?.shuffle_items;
}
function $() {
  const t = n();
  return t.hasOwnProperty("events") && t.events !== !1;
}
function kt() {
  return n().hasOwnProperty("item_pool_id");
}
function Pt() {
  return !!document.querySelector(".lrn_linereader-toggle");
}
function wt() {
  return !!n()?.config?.navigation?.resource_items;
}
function h() {
  return n().hasOwnProperty("sections");
}
function St() {
  return n()?.dynamic_items.hasOwnProperty("try_again");
}
function k() {
  return n().hasOwnProperty("adaptive");
}
function Tt() {
  return n().existing_session;
}
function C() {
  return n()?.organisation_id;
}
function V() {
  return n()?.item_pool_id;
}
function j() {
  return l.maxTime === -1 && (l.maxTime = n()?.config?.time?.max_time ?? 0), l.maxTime;
}
function Ot() {
  return n()?.config?.regions;
}
function Rt() {
  return n()?.config?.navigation?.resource_items;
}
function Q() {
  return n()?.session_id;
}
function M() {
  let t;
  switch (n()?.state) {
    case void 0:
      t = "initial";
      break;
    default:
      t = n().state;
      break;
  }
  return t;
}
function xt() {
  const t = j();
  return t ? t - L() : null;
}
function Bt() {
  if (h()) {
    let t = 0;
    const e = f();
    for (let i = 0; i < e.length; i++)
      t += e[i].items.length;
    return t;
  } else return k() ? n().hasOwnProperty("items") ? n().items.length : (u.info("This is an adaptive session, no items array found"), 0) : n().items.length;
}
function z() {
  return n()?.user_id;
}
const D = "3.0.0-beta.2", d = {
  events: {
    broadcast: !1,
    listenFor: "item"
  }
};
function Ft() {
  const t = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {
      annotations: {
        app: H(),
        config: F(),
        enabled: q()
      },
      assess: {
        app: _()
      },
      events: {
        app: Z(),
        enabled: $()
      },
      items: {
        app: s(),
        metadata: n().config.metadata
      },
      questions: {
        app: G()
      }
    },
    activity: {
      activity: x(),
      activityTemplate: B(),
      autoSave: {
        config: W(),
        enabled: E()
      },
      itemBank: C(),
      itemPool: V(),
      session: Q(),
      state: M(),
      type: n().type,
      user: z()
    },
    LT: {
      version: D
    },
    versions: t
  };
}
function Wt(t) {
  /^[a-zA-Z:*]*$/.test(t) ? d.events.listenFor = t : u.warn("Invalid event type");
}
function b(t) {
  if (d.events.broadcast) {
    const e = d.events.listenFor, i = e.replaceAll("*", "");
    e.length === 1 && e === "*" || e === "all" ? u.info(t) : e.startsWith("*") && !e.endsWith("*") ? t.endsWith(i) && u.info(t) : e.endsWith("*") && !e.startsWith("*") ? t.startsWith(i) && u.info(t) : e.startsWith("*") && e.endsWith("*") ? t.includes(i) && u.info(t) : t.startsWith(i) && u.info(t);
  }
}
function Lt(t = !0) {
  d.events.broadcast = !!t, t ? u.info(`👂 listening for '${d.events.listenFor}'`) : u.info("🚫👂 not listening");
}
const p = {};
function Et(t) {
  p.app = t, J();
}
function s() {
  return p.app;
}
function H() {
  return s().annotationsApp() !== void 0 ? s().annotationsApp() : null;
}
function _() {
  return s().assessApp();
}
function Z() {
  return s().eventsApp();
}
function G() {
  return s().questionsApp();
}
function J() {
  p.app.on("all", (t) => {
    b(t);
  }), p.app.on("item:load", () => {
    g().forEach((e) => {
      const i = p.app.question(e);
      ["changed", "beforeValidate", "rendered", "validated"].forEach((a) => {
        i.on(a, () => b(a));
      });
    });
  });
}
export {
  ct as $,
  St as A,
  k as B,
  Tt as C,
  C as D,
  V as E,
  j as F,
  Ot as G,
  Rt as H,
  Q as I,
  M as J,
  xt as K,
  Bt as L,
  z as M,
  Ft as N,
  Wt as O,
  b as P,
  Lt as Q,
  tt as R,
  et as S,
  nt as T,
  it as U,
  st as V,
  at as W,
  ot as X,
  rt as Y,
  m as Z,
  ut as _,
  s as a,
  ft as a0,
  lt as a1,
  c as a2,
  mt as a3,
  X as a4,
  P as a5,
  w as a6,
  S as a7,
  I as a8,
  T as a9,
  g as aa,
  Y as ab,
  pt as ac,
  dt as ad,
  v as ae,
  gt as af,
  ht as ag,
  A as ah,
  f as ai,
  R as aj,
  H as b,
  _ as c,
  n as d,
  Z as e,
  x as f,
  B as g,
  yt as h,
  Et as i,
  vt as j,
  _t as k,
  bt as l,
  F as m,
  W as n,
  L as o,
  It as p,
  G as q,
  q as r,
  At as s,
  E as t,
  qt as u,
  $ as v,
  kt as w,
  Pt as x,
  wt as y,
  h as z
};
