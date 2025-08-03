import { c as u, f as m } from "./app-Cwqt7Ekx.js";
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
function y(t = "upperAlpha", r = ".", n) {
  e.prefixMask.hasOwnProperty(t) && (e.chosenMask = t), r && typeof r == "string" && (e.suffix = r), n && Array.isArray(n) && (e.explicitPrefixes = n), e.renderedCss || h(), u().on("item:changed", () => {
    g(m());
  });
}
function g(t) {
  const r = e.prefixMask[e.chosenMask], n = e.suffix;
  try {
    for (const i of t)
      if (i.type === "mcq" && i?.ui_style?.type !== "block" && i?.ui_style?.type !== "horizontal-input-bottom") {
        const d = i.response_id, p = document.getElementById(d).querySelectorAll(".lrn-mcq-option");
        if (p) {
          let s = 0;
          for (const f of p) {
            const c = f.querySelector(".lrn-possible-answer").children;
            if (!f.querySelector(".lrn-prefix-label")) {
              let l;
              Array.isArray(e.explicitPrefixes) && e.explicitPrefixes.length && typeof e.explicitPrefixes[s] == "string" ? l = e.explicitPrefixes[s] : l = String.fromCharCode(r + s);
              for (let o = 0; o < c.length; o++) {
                const a = document.createElement("span");
                a.classList.add("lrn-prefix-label"), a.append(`${l}${n}`), c[o].prepend(a);
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
function h() {
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
const C = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: y
}, Symbol.toStringTag, { value: "Module" }));
export {
  C as m,
  y as r
};
