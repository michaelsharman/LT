import { c as o, a as s, V as u } from "./app-CgKRbBlK.js";
import { l as a } from "./logger-BpyELtLr.js";
const n = {
  answerMasking: {
    enabled: null
  },
  lineReader: {
    enabled: null,
    id: null
  }
};
function m(e) {
  n.answerMasking.enabled === null && (document.querySelector(".test-answer-masking") ? n.answerMasking.enabled = !0 : n.answerMasking.enabled = !1), n.answerMasking.enabled ? e !== void 0 && s().questionsApp().masking(e) : a.warn("Answer masking is not enabled in the Items API configuration.");
}
function b(e) {
  o().dialogs().custom.show(e);
}
function f() {
  o().dialogs().custom.hide();
}
function g() {
  return !!document.querySelector(".has-menu-region");
}
function w() {
  let e = !1;
  setTimeout(() => (document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden") === null && (e = !0), e), 500);
}
function h(e) {
  if (n.lineReader.enabled === null) {
    const i = document.querySelector(".lrn_linereader-toggle");
    if (i) {
      n.lineReader.enabled = !0;
      const l = i.querySelector("[data-lrn-widget-container]").getAttribute("data-lrn-widget-container").match(/\d+$/);
      l ? n.lineReader.id = l[0] : a.warn("Could not find the line reader unique id.");
    } else
      n.lineReader.enabled = !1;
  }
  if (n.lineReader.enabled && n.lineReader.id !== null) {
    const i = s().features()[`lrn-assessapp-feature_${n.lineReader.id}`];
    switch (e) {
      case "show":
        i.show();
        break;
      case "hide":
        i.hide();
        break;
      default:
        i.toggle();
    }
  } else
    a.warn("Line reader is not enabled in the Items API configuration.");
}
function t(e) {
  switch (e) {
    case "previous":
      s().items().previous();
      break;
    case "next":
      u() || s().items().next();
      break;
    case "review":
      document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden") === null ? s().dialogs().reviewScreen.hide() : s().dialogs().reviewScreen.show();
      break;
    case "submit":
      const i = {
        show_submit_confirmation: !0,
        show_submit_ui: !0,
        success: () => {
          alert("Test saved!");
        },
        error: (r) => {
          alert("Test submit failed...check browser log"), a.error("Submission failed: ", r);
        }
      };
      s().submit(i);
      break;
    default:
      typeof Number(e) == "number" && Number(e) >= 0 ? s().items().goto(Number(e)) : a.warn(`Invalid target (${e})`);
  }
}
function p() {
  t("next");
}
function k() {
  t("previous");
}
function v() {
  t("review");
}
function R() {
  t("submit");
}
export {
  m as a,
  w as b,
  p as c,
  b as d,
  f as h,
  g as i,
  h as l,
  t as n,
  k as p,
  v as r,
  R as s
};
