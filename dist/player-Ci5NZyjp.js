import { c as i, k as o, v as u } from "./app-nM0lhDJq.js";
import s from "./logger.js";
const n = {
  answerMasking: {
    enabled: null
  },
  lineReader: {
    enabled: null,
    id: null
  }
};
function d(e) {
  n.answerMasking.enabled === null && (document.querySelector(".test-answer-masking") ? n.answerMasking.enabled = !0 : n.answerMasking.enabled = !1), n.answerMasking.enabled ? e !== void 0 && i().questionsApp().masking(e) : s.warn("Answer masking is not enabled in the Items API configuration.");
}
function c(e) {
  o().dialogs().custom.show(e);
}
function f() {
  o().dialogs().custom.hide();
}
function m() {
  return document.querySelector(".lrn-assess")?.classList.contains("lrn-fullscreen") ?? !1;
}
function b() {
  return !!document.querySelector(".has-menu-region");
}
function g() {
  return document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden") === null;
}
function w(e) {
  if (n.lineReader.enabled === null) {
    const t = document.querySelector(".lrn_linereader-toggle");
    if (t) {
      n.lineReader.enabled = !0;
      const l = t.querySelector("[data-lrn-widget-container]").getAttribute("data-lrn-widget-container").match(/\d+$/);
      l ? n.lineReader.id = l[0] : s.warn("Could not find the line reader unique id.");
    } else
      n.lineReader.enabled = !1;
  }
  if (n.lineReader.enabled && n.lineReader.id !== null) {
    const t = i().features()[`lrn-assessapp-feature_${n.lineReader.id}`];
    switch (e) {
      case "show":
        t.show();
        break;
      case "hide":
        t.hide();
        break;
      default:
        t.toggle();
    }
  } else
    s.warn("Line reader is not enabled in the Items API configuration.");
}
function a(e) {
  switch (e) {
    case "previous":
      i().items().previous();
      break;
    case "next":
      u() || i().items().next();
      break;
    case "review":
      document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden") === null ? i().dialogs().reviewScreen.hide() : i().dialogs().reviewScreen.show();
      break;
    case "submit":
      const t = {
        show_submit_confirmation: !0,
        show_submit_ui: !0,
        success: () => {
          alert("Test saved!");
        },
        error: (r) => {
          alert("Test submit failed...check browser log"), s.error("Submission failed: ", r);
        }
      };
      i().submit(t);
      break;
    default:
      typeof Number(e) == "number" && Number(e) >= 0 ? i().items().goto(Number(e)) : s.warn(`Invalid target (${e})`);
  }
}
function h() {
  a("next");
}
function p() {
  a("previous");
}
function v() {
  a("review");
}
function k() {
  a("submit");
}
const S = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  answerMasking: d,
  dialog: c,
  hideDialog: f,
  isFullscreen: m,
  isResponsiveMode: b,
  isReviewScreen: g,
  lineReader: w,
  navigate: a,
  next: h,
  previous: p,
  review: v,
  submit: k
}, Symbol.toStringTag, { value: "Module" }));
export {
  c as d,
  f as h,
  b as i,
  S as p
};
