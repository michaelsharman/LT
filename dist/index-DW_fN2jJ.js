import { c, f as a, k as p } from "./app-DV5bcV_K.js";
import l from "./logger.js";
const s = {
  class: "lrn__resetResponse",
  label: "Reset question",
  logPrefix: "LRN Reset Responses:",
  renderedCss: !1,
  types: ["mcq"]
};
function d(e, t) {
  e && typeof e == "string" && (s.label = e), t && Array.isArray(t) && (s.types = t), s.renderedCss || y(), c().on("item:changed", u);
}
function u() {
  const e = a();
  try {
    for (const t of e)
      if (console.log(`Checking question type: ${t.type}`), s.types.includes("*") || s.types.includes(t.type)) {
        const o = t.response_id;
        c().question(o).on("rendered", () => {
          const n = document.getElementById(o);
          if (n) {
            const i = n.querySelector(".lrn_response");
            let r = n.querySelector(`.${s.class}`);
            r || (i.append(f()), r = n.querySelector(`.${s.class}`), r.addEventListener("click", m));
          } else
            l.warn(s.logPrefix, "Question element not found");
        });
      }
  } catch (t) {
    l.error(t);
  }
}
function y() {
  const e = document.createElement("style");
  e.setAttribute("data-style", "LT Reset Response");
  const t = `
/* Learnosity reset question styles */
.lrn .lrn_btn.${s.class} {
    margin-top: 1em;
    margin-bottom: 0.5em;
    clear: both;
    display: block;
}
`;
  e.setAttribute("data-style", "LT Reset Response"), e.textContent = t, document.head.append(e), s.renderedCss = !0;
}
function f() {
  const e = document.createElement("button"), t = document.createElement("span");
  return e.classList.add("lds-btn", "lds-btn-secondary", "lrn_btn", s.class), t.append(s.label), e.append(t), e;
}
function m(e) {
  const o = e.srcElement.closest(".lrn_widget").getAttribute("id");
  p().question(o).resetResponse();
}
const R = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  d as a,
  R as r
};
