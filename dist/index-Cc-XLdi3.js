import { c as u, f as y } from "./app-DV5bcV_K.js";
import f from "./logger.js";
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
  e.prefixMask.hasOwnProperty(t) && (e.chosenMask = t), r && typeof r == "string" && (e.suffix = r), n && Array.isArray(n) && (e.explicitPrefixes = n), e.renderedCss || h(), u().on("item:changed", () => {
    m(y());
  });
}
function m(t) {
  const r = e.prefixMask[e.chosenMask], n = e.suffix;
  try {
    for (const i of t)
      if (i.type === "mcq" && i?.ui_style?.type !== "block" && i?.ui_style?.type !== "horizontal-input-bottom") {
        const l = i.response_id;
        u().question(l).on("rendered", () => {
          f.info(e.logPrefix, `Adding prefix to question ${l}`);
          const c = document.getElementById(l).querySelectorAll(".lrn-mcq-option");
          if (c) {
            let s = 0;
            for (const x of c) {
              const d = x.querySelector(".lrn-possible-answer").children;
              if (!x.querySelector(".lrn-prefix-label")) {
                let o;
                Array.isArray(e.explicitPrefixes) && e.explicitPrefixes.length && typeof e.explicitPrefixes[s] == "string" ? o = e.explicitPrefixes[s] : o = String.fromCharCode(r + s);
                for (let a = 0; a < d.length; a++) {
                  const p = document.createElement("span");
                  p.classList.add("lrn-prefix-label"), p.append(`${o}${n}`), d[a].prepend(p);
                }
                s++;
              }
            }
          } else
            f.warn(e.logPrefix, "Options element not found");
        });
      }
  } catch (i) {
    f.error(i);
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
  run: g
}, Symbol.toStringTag, { value: "Module" }));
export {
  C as m,
  g as r
};
