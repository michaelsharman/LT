import { c as d, L as l } from "../../extensionsFactory-BHOEyOSK.js";
const e = {
  chosenMask: "upperAlpha",
  logPrefix: "LRN MCQ Label Prefix:",
  prefixMask: {
    lowerAlpha: 97,
    upperAlpha: 65,
    numeric: 49
  },
  explicitPrefixes: [],
  suffix: "."
};
function g(n) {
  const { mask: t, suffix: r, prefixes: i } = n || {};
  e.prefixMask.hasOwnProperty(t) && (e.chosenMask = t), r && typeof r == "string" && (e.suffix = r), i && Array.isArray(i) && (e.explicitPrefixes = i), l.eventBus.on("item:load", () => {
    m(l.questions());
  }, "mcqLabelPrefix");
}
function m(n) {
  const t = e.prefixMask[e.chosenMask], r = e.suffix;
  try {
    for (const i of n)
      if (i.type === "mcq" && i?.ui_style?.type !== "block" && i?.ui_style?.type !== "horizontal-input-bottom") {
        const u = i.response_id, p = document.getElementById(u).querySelectorAll(".lrn-mcq-option");
        if (p) {
          let s = 0;
          for (const x of p) {
            const c = x.querySelector(".lrn-possible-answer").children;
            if (!x.querySelector(".lrn-prefix-label")) {
              let o;
              Array.isArray(e.explicitPrefixes) && e.explicitPrefixes.length && typeof e.explicitPrefixes[s] == "string" ? o = e.explicitPrefixes[s] : o = String.fromCharCode(t + s);
              for (let f = 0; f < c.length; f++) {
                const a = document.createElement("span");
                a.classList.add("lrn-prefix-label"), a.append(`${o}${r}`), c[f].prepend(a);
              }
              s++;
            }
          }
        } else
          l.utils.logger.warn(e.logPrefix, "Options element not found");
      }
  } catch (i) {
    l.utils.logger.error(i);
  }
}
function y() {
  return `
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
}
const b = d("mcqLabelPrefix", g, { getStyles: y });
export {
  b as mcqLabelPrefix
};
