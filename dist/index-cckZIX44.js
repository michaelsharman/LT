import { e as i, h as c, c as m } from "./app-BC_Cj6Pt.js";
import { c as f } from "./extensionsFactory-DRAOPv5d.js";
function u() {
  const t = m(), a = i();
  t.on("item:load", r), c() && ["notepad:toggleVisibility", "stickynote:add"].forEach((n) => a.on(n, r));
}
function r() {
  let t = [], a = [];
  const s = ["lrn_texteditor_editable"], n = document.getElementById("learnosity_assess");
  for (let e = 0; e < s.length; e++)
    if (t = n.getElementsByClassName(s[e]), t.length)
      for (let o = 0; o < t.length; o++)
        l(t[o]);
  a = n.getElementsByTagName("textarea");
  for (let e = 0; e < a.length; e++)
    l(a[e]);
}
function l(t) {
  t.setAttribute("data-gramm", "false"), t.setAttribute("data-gramm_editor", "false"), t.setAttribute("data-enable-grammarly", "false"), t.setAttribute("spellcheck", "false"), t.setAttribute("autocorrect", "false"), t.setAttribute("autocomplete", "false"), t.setAttribute("autocapitalize", "false");
}
const b = f("blockGrammarChecks", u), g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  blockGrammarChecks: b
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as a,
  g as b
};
