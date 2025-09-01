import { c as d, L as n } from "../../extensionsFactory-CJF5B414.js";
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
function g(l) {
  const { mask: t, suffix: r, prefixes: i } = l || {};
  e.prefixMask.hasOwnProperty(t) && (e.chosenMask = t), r && typeof r == "string" && (e.suffix = r), i && Array.isArray(i) && (e.explicitPrefixes = i), n.itemsApp().on("item:changed", () => {
    m(n.questions());
  });
}
function m(l) {
  const t = e.prefixMask[e.chosenMask], r = e.suffix;
  try {
    for (const i of l)
      if (i.type === "mcq" && i?.ui_style?.type !== "block" && i?.ui_style?.type !== "horizontal-input-bottom") {
        const u = i.response_id, a = document.getElementById(u).querySelectorAll(".lrn-mcq-option");
        if (a) {
          let s = 0;
          for (const x of a) {
            const c = x.querySelector(".lrn-possible-answer").children;
            if (!x.querySelector(".lrn-prefix-label")) {
              let o;
              Array.isArray(e.explicitPrefixes) && e.explicitPrefixes.length && typeof e.explicitPrefixes[s] == "string" ? o = e.explicitPrefixes[s] : o = String.fromCharCode(t + s);
              for (let f = 0; f < c.length; f++) {
                const p = document.createElement("span");
                p.classList.add("lrn-prefix-label"), p.append(`${o}${r}`), c[f].prepend(p);
              }
              s++;
            }
          }
        } else
          n.utils.logger.warn(e.logPrefix, "Options element not found");
      }
  } catch (i) {
    n.utils.logger.error(i);
  }
}
function h() {
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
const b = d("mcqLabelPrefix", g, { getStyles: h });
export {
  b as mcqLabelPrefix
};
