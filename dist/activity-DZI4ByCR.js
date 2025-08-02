import { c as r, b as y } from "./app-C9b6PwWF.js";
import p from "./logger.js";
function C(e) {
  if (!b(e))
    return !1;
  const t = n()?.config?.questions_api_init_options?.attribute_overrides && n().config.questions_api_init_options.attribute_overrides.hasOwnProperty("instant_feedback") && typeof n().config.questions_api_init_options.attribute_overrides.instant_feedback == "boolean", i = k(e);
  return t ? n().config.questions_api_init_options.attribute_overrides.instant_feedback : i.hasOwnProperty("instant_feedback") && typeof i.instant_feedback == "boolean" ? i.instant_feedback : !1;
}
function b(e) {
  return q(e).checkValidation().has_validation;
}
function k(e) {
  const t = e || g()[0];
  return t ? r().question(t).getQuestion() : (p.error(`Question not found (index ${t})`), {});
}
function q(e) {
  const t = e || g()[0];
  return t ? r().question(t) : {};
}
function h() {
  return l().questions;
}
function P(e) {
  const t = e || g()[0];
  if (t) {
    if (r().question(t))
      return r().question(t).getResponse();
    p.error(`Response not found ${t}`);
    return;
  } else
    return {};
}
function g() {
  return h().map((e) => e.response_id);
}
function V(e) {
  const t = e || g()[0];
  return t ? r().getScores()[t] || {} : {};
}
function F() {
  const e = u();
  return y().item(e).dynamic || {};
}
function L() {
  const e = u();
  y().item(e).flag();
}
function j() {
  return l()?.source.hasOwnProperty("data_table_seed");
}
function E() {
  let e;
  return m() ? (e = typeof c()[0].items[0] == "object" ? c()[0].items[0].reference : c()[0].items[0], e === l().reference) : (e = typeof n().items[0] == "object" ? n().items[0].reference : n().items[0], e === l().reference);
}
function Q() {
  return l().is_last_item;
}
function $() {
  return l().user_flagged;
}
function M(e = void 0) {
  let t, i, s;
  if (e ? t = r().getItems()[e].questions : t = h(), Array.isArray(t) && t.length)
    for (let a = 0; a < t.length; a++) {
      const o = t[a];
      if (s = P(o.response_id), s) {
        if (o.hasOwnProperty("metadata") && o.metadata.hasOwnProperty("valid_response_count") && Array.isArray(s.value) && (s.value.filter((d) => d === void 0).length || s.value.filter((d) => d === null).length))
          return !1;
        i = !0;
      } else
        return !1;
    }
  else
    i = !0;
  return i;
}
function D() {
  return !!document.querySelector(".lrn-masking");
}
function l(e = void 0) {
  return e ? r().getItems()[e] : r().getCurrentItem();
}
function H() {
  return r().getCurrentItem().attempt_status;
}
function z(e) {
  const t = r().getItems();
  let i;
  for (const s in t)
    if (t[s].response_ids.includes(e)) {
      i = t[s];
      break;
    }
  return i;
}
function G() {
  return document.querySelector(`div[data-reference='${u()}']`);
}
function J() {
  return r().assessApp().getItemPosition(u()) + 1;
}
function u() {
  return r().getCurrentItem()?.reference;
}
function K(e = void 0) {
  const t = r().getTags(), i = e || u();
  return t[i] || [];
}
function N() {
  return v() === 1;
}
function U() {
  return v() === w();
}
function _() {
  if (m()) {
    const e = u(), t = c();
    let i = -1, s = !1;
    for (let a = 0; a < t.length && !s; a++) {
      ++i;
      for (let o = 0; o < t[a].items.length; o++)
        if (e === t[a].items[o].reference) {
          s = !0;
          break;
        }
    }
    return c()[i];
  } else
    return {};
}
function W() {
  return !!_()?.config?.configuration?.shuffle_items;
}
function X() {
  if (m()) {
    const e = u(), t = t();
    let i = 0, s = !1;
    for (let a = 0; a < t.length && !s; a++) {
      ++i;
      for (let o = 0; o < t[a].items.length; o++)
        if (e === t[a].items[o].reference) {
          s = !0;
          break;
        }
    }
    return i;
  } else
    return 0;
}
function v() {
  const e = u(), t = _();
  let i = 0;
  if (!Object.keys(t).length)
    return null;
  for (let s = 0; s < t.items.length && (++i, e !== t.items[s].reference); s++)
    ;
  return i;
}
function c() {
  return m() ? n().sections : [];
}
function w() {
  return _()?.items?.length || null;
}
const f = {
  activity: null,
  maxTime: -1
};
function n() {
  return f.activity === null && (f.activity = r().getActivity()), f.activity;
}
function Y() {
  return n().activity_id;
}
function Z() {
  return n().activity_template_id;
}
function ee() {
  return n().config.title;
}
function te() {
  return n().config.subtitle;
}
function ne() {
  return r().getTags();
}
function ie() {
  return I() && n().adaptive.hasOwnProperty("type") ? n().adaptive.type : "";
}
function se() {
  return A() && n()?.config?.annotations_api_init_options ? n().config.annotations_api_init_options : {};
}
function re() {
  const e = n();
  return e?.config?.navigation?.auto_save ? e.config.navigation.auto_save : {};
}
function S() {
  return r().getTime();
}
function ae() {
  return n().hasOwnProperty("activity_template_id");
}
function A() {
  const e = n();
  return !!(e?.config?.annotations === !0 || e?.config?.annotations_api_init_options);
}
function oe() {
  return !!document.querySelector(".test-answer-masking");
}
function ue() {
  const e = n();
  return e.hasOwnProperty("config") && e.config.hasOwnProperty("navigation") && e.config.navigation.hasOwnProperty("auto_save") && e.config.navigation.auto_save !== !1;
}
function ce() {
  return !!n()?.config?.configuration?.shuffle_items;
}
function fe() {
  const e = n();
  return e.hasOwnProperty("events") && e.events !== !1;
}
function le() {
  return n().hasOwnProperty("item_pool_id");
}
function me() {
  return !!document.querySelector(".lrn_linereader-toggle");
}
function ge() {
  return !!n()?.config?.navigation?.resource_items;
}
function m() {
  return n().hasOwnProperty("sections");
}
function de() {
  return n()?.dynamic_items.hasOwnProperty("try_again");
}
function I() {
  return n().hasOwnProperty("adaptive");
}
function pe() {
  return n().existing_session;
}
function _e() {
  const e = n().config?.regions?.items;
  return e ? e.some((t) => t.type === "vertical_element") : !1;
}
function ye() {
  return n()?.organisation_id;
}
function he() {
  return n()?.item_pool_id;
}
function O() {
  return f.maxTime === -1 && (f.maxTime = n()?.config?.time?.max_time ?? 0), f.maxTime;
}
function ve() {
  return n()?.config?.regions;
}
function Ie() {
  return n()?.config?.navigation?.resource_items;
}
function be() {
  return n()?.session_id;
}
function ke() {
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
  const e = O();
  return e ? e - S() : null;
}
function Pe() {
  if (m()) {
    let e = 0;
    const t = c();
    for (let i = 0; i < t.length; i++)
      e += t[i].items.length;
    return e;
  } else return I() ? n().hasOwnProperty("items") ? n().items.length : (p.info("This is an adaptive session, no items array found"), 0) : n().items.length;
}
function we() {
  return n()?.user_id;
}
export {
  h as $,
  I as A,
  pe as B,
  _e as C,
  O as D,
  ve as E,
  Ie as F,
  qe as G,
  Pe as H,
  F as I,
  L as J,
  j as K,
  E as L,
  Q as M,
  $ as N,
  M as O,
  D as P,
  l as Q,
  H as R,
  z as S,
  G as T,
  J as U,
  u as V,
  K as W,
  C as X,
  b as Y,
  k as Z,
  q as _,
  se as a,
  P as a0,
  g as a1,
  V as a2,
  N as a3,
  U as a4,
  _ as a5,
  W as a6,
  X as a7,
  v as a8,
  c as a9,
  w as aa,
  fe as b,
  n as c,
  Y as d,
  Z as e,
  re as f,
  ue as g,
  A as h,
  ye as i,
  he as j,
  ke as k,
  ee as l,
  te as m,
  ne as n,
  ie as o,
  S as p,
  ae as q,
  oe as r,
  be as s,
  ce as t,
  we as u,
  le as v,
  me as w,
  ge as x,
  m as y,
  de as z
};
