import { c as i, L as r } from "../../extensionsFactory-BHOEyOSK.js";
const s = {
  class: "lrn__resetResponse",
  label: "Reset question",
  logPrefix: "LRN Reset Responses:",
  types: ["mcq"]
};
function a(t) {
  const { label: e, types: n } = t || {};
  e && typeof e == "string" && (s.label = e), n && Array.isArray(n) && (s.types = n), r.eventBus.on("item:load", u, "resetResponse");
}
function u() {
  const t = r.questions();
  try {
    for (const e of t)
      if (s.types.includes("*") || s.types.includes(e.type)) {
        const n = e.response_id, o = document.getElementById(n);
        if (o) {
          const c = o.querySelector(".lrn_response");
          let l = o.querySelector(`.${s.class}`);
          l || (c.append(p()), l = o.querySelector(`.${s.class}`), l.addEventListener("click", d));
        } else
          r.utils.logger.warn(s.logPrefix, "Question element not found");
      }
  } catch (e) {
    r.utils.logger.error(e);
  }
}
function p() {
  const t = document.createElement("button"), e = document.createElement("span");
  return t.classList.add("lds-btn", "lds-btn-secondary", "lrn_btn", s.class), e.append(s.label), t.append(e), t;
}
function d(t) {
  const n = t.srcElement.closest(".lrn_widget").getAttribute("id");
  r.questionsApp().question(n).resetResponse();
}
function y() {
  return `
        /* Learnosity reset question styles */
        .lrn .lrn_btn.${s.class} {
            margin-top: 1em;
            margin-bottom: 0.5em;
            clear: both;
            display: block;
        }
    `;
}
const f = i("resetResponse", a, {
  getStyles: y
});
export {
  f as resetResponse
};
