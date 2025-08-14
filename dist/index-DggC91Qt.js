import { c, f as a, g as r, j as o, k as u } from "./app-DrpANbC0.js";
import d from "./logger.js";
import { d as l, h } from "./player-IETdC3gL.js";
import { c as m } from "./moduleFactory-Ck7axszi.js";
const t = {
  message: {
    header: "Please check your answers",
    body: `<p>Before moving on, attempt all questions and click the "Check Answer" button.</p>
            <p>Note: the "Check Answer" button may not appear on every question.</p>`
  }
};
function p(e) {
  e && e?.message && (t.message?.header.length && (t.message.header = e.message.header), t.message?.body.length && (t.message.body = e.message.body)), c().on("item:beforeunload", (s) => {
    f(s);
  });
}
function f(e) {
  g() && (b() || (d.debug("Disabling navigation."), e.preventDefault(), k()));
}
function g() {
  const e = a();
  let s = !1;
  for (const n of e) {
    const i = n.response_id;
    if (r(i)) {
      s = !0;
      break;
    }
  }
  return s;
}
function b() {
  const e = a();
  for (const s of e) {
    const n = s.response_id;
    if (r(n) && (!o(n) || !o(n).hasOwnProperty("feedbackAttemptsCount")))
      return !1;
  }
  return !0;
}
function k() {
  l({
    header: t.message.header,
    body: t.message.body,
    buttons: [
      {
        button_id: "lt__check_answer_validation",
        label: "Close",
        is_primary: !1
      }
    ]
  }), u().on("button:lt__check_answer_validation:clicked", () => {
    h();
  });
}
const _ = m("checkAnswerValidation", p), v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  checkAnswerValidation: _
}, Symbol.toStringTag, { value: "Module" }));
export {
  _ as a,
  v as c
};
