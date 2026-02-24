import { c as i, L as e } from "../../extensionsFactory-BHOEyOSK.js";
const o = {
  message: {
    header: "Please check your answers",
    body: `<p>Before moving on, attempt all questions and click the "Check Answer" button.</p>
            <p>Note: the "Check Answer" button may not appear on every question.</p>`
  }
};
function r(t) {
  const { header: s, body: n } = t?.message || {};
  s?.length && (o.message.header = s), n?.length && (o.message.body = n), e.eventBus.on("item:beforeunload", (a) => {
    c(a);
  });
}
function c(t) {
  u() && (h() || (e.utils.logger.debug("Disabling navigation."), t.preventDefault(), l()));
}
function u() {
  const t = e.questions();
  let s = !1;
  for (const n of t) {
    const a = n.response_id;
    if (e.hasCheckAnswer(a)) {
      s = !0;
      break;
    }
  }
  return s;
}
function h() {
  const t = e.questions();
  for (const s of t) {
    const n = s.response_id;
    if (e.hasCheckAnswer(n) && (!e.questionResponse(n) || !e.questionResponse(n).hasOwnProperty("feedbackAttemptsCount")))
      return !1;
  }
  return !0;
}
function l() {
  e.dialog({
    header: o.message.header,
    body: o.message.body,
    buttons: [
      {
        button_id: "lt__check_answer_validation",
        label: "Close",
        is_primary: !1
      }
    ]
  }), e.assessApp().on("button:lt__check_answer_validation:clicked", () => {
    e.hideDialog();
  });
}
const f = i("checkAnswerValidation", r);
export {
  f as checkAnswerValidation
};
