import { c as u, f as m } from "./app-DrpANbC0.js";
import { c as y } from "./moduleFactory-Ck7axszi.js";
import x from "./logger.js";
const e = {
  chosenMask: "upperAlpha",
  logPrefix: "LRN MCQ Label Prefix:",
  prefixMask: {
    lowerAlpha: 97,
    upperAlpha: 65,
    numeric: 49
  },
  explicitPrefixes: [],
  renderedCss: !1,
  suffix: "."
};
function g(t = "upperAlpha", r = ".", n) {
  e.prefixMask.hasOwnProperty(t) && (e.chosenMask = t), r && typeof r == "string" && (e.suffix = r), n && Array.isArray(n) && (e.explicitPrefixes = n), e.renderedCss || (b(), e.renderedCss = !0), u().on("item:changed", () => {
    h(m());
  });
}
function h(t) {
  const r = e.prefixMask[e.chosenMask], n = e.suffix;
  try {
    for (const i of t)
      if (i.type === "mcq" && i?.ui_style?.type !== "block" && i?.ui_style?.type !== "horizontal-input-bottom") {
        const d = i.response_id, p = document.getElementById(d).querySelectorAll(".lrn-mcq-option");
        if (p) {
          let s = 0;
          for (const c of p) {
            const f = c.querySelector(".lrn-possible-answer").children;
            if (!c.querySelector(".lrn-prefix-label")) {
              let l;
              Array.isArray(e.explicitPrefixes) && e.explicitPrefixes.length && typeof e.explicitPrefixes[s] == "string" ? l = e.explicitPrefixes[s] : l = String.fromCharCode(r + s);
              for (let o = 0; o < f.length; o++) {
                const a = document.createElement("span");
                a.classList.add("lrn-prefix-label"), a.append(`${l}${n}`), f[o].prepend(a);
              }
              s++;
            }
          }
        } else
          x.warn(e.logPrefix, "Options element not found");
      }
  } catch (i) {
    x.error(i);
  }
}
function b() {
  const t = document.createElement("style"), r = `
/* Learnosity MCQ label prefix styles */
.lrn-prefix-label {
    padding-right: 15px;
    font-weight: 500;
}
@media (max-width: 750px) {
    .lrn-prefix-label {
        padding-right: 10px;
    }
}
@media (max-width: 650px) {
    .lrn-prefix-label {
        padding-right: 5px;
    }
}
`;
  t.setAttribute("data-style", "LT MCQ Label Prefix"), t.textContent = r, document.head.append(t), e.renderedCss = !0;
}
const P = y("mcqLabelPrefix", g), L = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  mcqLabelPrefix: P
}, Symbol.toStringTag, { value: "Module" }));
export {
  P as a,
  L as m
};
