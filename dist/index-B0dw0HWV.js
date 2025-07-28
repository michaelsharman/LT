import { c as u, f as y } from "./app-DUd3UChQ.js";
import { l as d } from "./logger-BpyELtLr.js";
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
function m(t = "upperAlpha", r = ".", n) {
  e.prefixMask.hasOwnProperty(t) && (e.chosenMask = t), r && typeof r == "string" && (e.suffix = r), n && Array.isArray(n) && (e.explicitPrefixes = n), e.renderedCss || h(), u().on("item:changed", () => {
    g(y());
  });
}
function g(t) {
  const r = e.prefixMask[e.chosenMask], n = e.suffix;
  try {
    for (const i of t)
      if (i.type === "mcq" && i?.ui_style?.type !== "block" && i?.ui_style?.type !== "horizontal-input-bottom") {
        const p = i.response_id;
        u().question(p).on("rendered", () => {
          const f = document.getElementById(p).querySelectorAll(".lrn-mcq-option");
          if (f) {
            let s = 0;
            for (const c of f) {
              const x = c.querySelector(".lrn-possible-answer").children;
              if (!c.querySelector(".lrn-prefix-label")) {
                let l;
                Array.isArray(e.explicitPrefixes) && e.explicitPrefixes.length && typeof e.explicitPrefixes[s] == "string" ? l = e.explicitPrefixes[s] : l = String.fromCharCode(r + s);
                for (let o = 0; o < x.length; o++) {
                  const a = document.createElement("span");
                  a.classList.add("lrn-prefix-label"), a.append(`${l}${n}`), x[o].prepend(a);
                }
                s++;
              }
            }
          } else
            d.warn(e.logPrefix, "Options element not found");
        });
      }
  } catch (i) {
    d.error(i);
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
const C = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: m
}, Symbol.toStringTag, { value: "Module" }));
export {
  C as m,
  m as r
};
