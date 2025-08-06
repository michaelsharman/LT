import { c as a, f as i, z as p } from "./app-C0Ni2tF_.js";
import l from "./logger.js";
const s = {
  class: "lrn__resetResponse",
  label: "Reset question",
  logPrefix: "LRN Reset Responses:",
  renderedCss: !1,
  types: ["mcq"]
};
function d(e, t) {
  e && typeof e == "string" && (s.label = e), t && Array.isArray(t) && (s.types = t), s.renderedCss || f(), a().on("item:changed", u);
}
function u() {
  const e = i();
  try {
    for (const t of e)
      if (s.types.includes("*") || s.types.includes(t.type)) {
        const o = t.response_id, n = document.getElementById(o);
        if (n) {
          const c = n.querySelector(".lrn_response");
          let r = n.querySelector(`.${s.class}`);
          r || (c.append(m()), r = n.querySelector(`.${s.class}`), r.addEventListener("click", y));
        } else
          l.warn(s.logPrefix, "Question element not found");
      }
  } catch (t) {
    l.error(t);
  }
}
function f() {
  const e = document.createElement("style"), t = `
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
function m() {
  const e = document.createElement("button"), t = document.createElement("span");
  return e.classList.add("lds-btn", "lds-btn-secondary", "lrn_btn", s.class), t.append(s.label), e.append(t), e;
}
function y(e) {
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
