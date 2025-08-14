import { e as i, h as c, c as m } from "./app-DrpANbC0.js";
import { c as u } from "./moduleFactory-Ck7axszi.js";
function f() {
  const t = m(), a = i();
  t.on("item:load", r), c() && ["notepad:toggleVisibility", "stickynote:add"].forEach((o) => a.on(o, r));
}
function r() {
  let t = [], a = [];
  const s = ["lrn_texteditor_editable"], o = document.getElementById("learnosity_assess");
  for (let e = 0; e < s.length; e++)
    if (t = o.getElementsByClassName(s[e]), t.length)
      for (let n = 0; n < t.length; n++)
        l(t[n]);
  a = o.getElementsByTagName("textarea");
  for (let e = 0; e < a.length; e++)
    l(a[e]);
}
function l(t) {
  t.setAttribute("data-gramm", "false"), t.setAttribute("data-gramm_editor", "false"), t.setAttribute("data-enable-grammarly", "false"), t.setAttribute("spellcheck", "false"), t.setAttribute("autocorrect", "false"), t.setAttribute("autocomplete", "false"), t.setAttribute("autocapitalize", "false");
}
const b = u("blockGrammarChecks", f), g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  blockGrammarChecks: b
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as a,
  g as b
};
