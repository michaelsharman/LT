import { c as u, f as g } from "./app-DV5bcV_K.js";
import l from "./logger.js";
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
function m(t = "upperAlpha", r = ".", i) {
  e.prefixMask.hasOwnProperty(t) && (e.chosenMask = t), r && typeof r == "string" && (e.suffix = r), i && Array.isArray(i) && (e.explicitPrefixes = i), e.renderedCss || h(), u().on("item:changed", () => {
    y(g());
  });
}
function y(t) {
  const r = e.prefixMask[e.chosenMask], i = e.suffix;
  try {
    for (const n of t)
      if (n.type === "mcq" && n?.ui_style?.type !== "block" && n?.ui_style?.type !== "horizontal-input-bottom") {
        const s = n.response_id;
        l.info(e.logPrefix, `Adding prefix to question ${s} with mask ${e.chosenMask} and suffix "${i}"`), u().question(s).on("rendered", () => {
          l.info(e.logPrefix, `Adding prefix to question ${s}`);
          const c = document.getElementById(s).querySelectorAll(".lrn-mcq-option");
          if (c) {
            let o = 0;
            for (const x of c) {
              const d = x.querySelector(".lrn-possible-answer").children;
              if (!x.querySelector(".lrn-prefix-label")) {
                let a;
                Array.isArray(e.explicitPrefixes) && e.explicitPrefixes.length && typeof e.explicitPrefixes[o] == "string" ? a = e.explicitPrefixes[o] : a = String.fromCharCode(r + o);
                for (let p = 0; p < d.length; p++) {
                  const f = document.createElement("span");
                  f.classList.add("lrn-prefix-label"), f.append(`${a}${i}`), d[p].prepend(f);
                }
                o++;
              }
            }
          } else
            l.warn(e.logPrefix, "Options element not found");
        });
      }
  } catch (n) {
    l.error(n);
  }
}
function h() {
  const t = document.createElement("style");
  t.setAttribute("data-style", "LT MCQ Label Prefix");
  const r = `
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
const M = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: m
}, Symbol.toStringTag, { value: "Module" }));
export {
  M as m,
  m as r
};
