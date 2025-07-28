import { a as c, a8 as o, a4 as r, a9 as n, c as l } from "./app-CgKRbBlK.js";
import { l as u } from "./logger-BpyELtLr.js";
import { d, h } from "./player-CSjsURvI.js";
const t = {
  message: {
    header: "Please check your answers",
    body: `<p>Before moving on, attempt all questions and click the "Check Answer" button.</p>
            <p>Note: the "Check Answer" button may not appear on every question.</p>`
  }
};
function m(e) {
  e && e?.message && (t.message?.header.length && (t.message.header = e.message.header), t.message?.body.length && (t.message.body = e.message.body)), c().on("item:beforeunload", (s) => {
    p(s);
  });
}
function p(e) {
  f() && (b() || (u.debug("Disabling navigation."), e.preventDefault(), g()));
}
function f() {
  const e = o();
  let s = !1;
  for (const a of e) {
    const i = a.response_id;
    if (r(i)) {
      s = !0;
      break;
    }
  }
  return s;
}
function b() {
  const e = o();
  for (const s of e) {
    const a = s.response_id;
    if (r(a) && (!n(a) || !n(a).hasOwnProperty("feedbackAttemptsCount")))
      return !1;
  }
  return !0;
}
function g() {
  d({
    header: t.message.header,
    body: t.message.body,
    buttons: [
      {
        button_id: "lt__check_answer_validation",
        label: "Close",
        is_primary: !1
      }
    ]
  }), l().on("button:lt__check_answer_validation:clicked", () => {
    h();
  });
}
const y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: m
}, Symbol.toStringTag, { value: "Module" }));
export {
  y as c,
  m as r
};
