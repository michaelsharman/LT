import { c as i, L as r } from "../../extensionsFactory-CJF5B414.js";
const t = {
  class: "lrn__resetResponse",
  label: "Reset question",
  logPrefix: "LRN Reset Responses:",
  types: ["mcq"]
};
function a(s) {
  const { label: e, types: n } = s || {};
  e && typeof e == "string" && (t.label = e), n && Array.isArray(n) && (t.types = n), r.itemsApp().on("item:changed", p);
}
function p() {
  const s = r.questions();
  try {
    for (const e of s)
      if (t.types.includes("*") || t.types.includes(e.type)) {
        const n = e.response_id, o = document.getElementById(n);
        if (o) {
          const c = o.querySelector(".lrn_response");
          let l = o.querySelector(`.${t.class}`);
          l || (c.append(u()), l = o.querySelector(`.${t.class}`), l.addEventListener("click", d));
        } else
          r.utils.logger.warn(t.logPrefix, "Question element not found");
      }
  } catch (e) {
    r.utils.logger.error(e);
  }
}
function u() {
  const s = document.createElement("button"), e = document.createElement("span");
  return s.classList.add("lds-btn", "lds-btn-secondary", "lrn_btn", t.class), e.append(t.label), s.append(e), s;
}
function d(s) {
  const n = s.srcElement.closest(".lrn_widget").getAttribute("id");
  r.questionsApp().question(n).resetResponse();
}
function m() {
  return `
        /* Learnosity reset question styles */
        .lrn .lrn_btn.${t.class} {
            margin-top: 1em;
            margin-bottom: 0.5em;
            clear: both;
            display: block;
        }
    `;
}
const f = i("resetResponse", a, {
  getStyles: m
});
export {
  f as resetResponse
};
