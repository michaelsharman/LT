import { c, L as o } from "../../extensionsFactory-CJF5B414.js";
function m() {
  o.itemsApp().on("item:load", i), o.hasAnnotations() && ["notepad:toggleVisibility", "stickynote:add"].forEach((a) => o.annotationsApp.on(a, i));
}
function i() {
  const t = ["lrn_texteditor_editable"], a = document.getElementById("learnosity_assess");
  for (let e = 0; e < t.length; e++) {
    const s = a.getElementsByClassName(t[e]);
    if (s.length)
      for (let n = 0; n < s.length; n++)
        l(s[n]);
  }
  const r = a.getElementsByTagName("textarea");
  for (let e = 0; e < r.length; e++)
    l(r[e]);
}
function l(t) {
  t.setAttribute("data-gramm", "false"), t.setAttribute("data-gramm_editor", "false"), t.setAttribute("data-enable-grammarly", "false"), t.setAttribute("spellcheck", "false"), t.setAttribute("autocorrect", "false"), t.setAttribute("autocomplete", "false"), t.setAttribute("autocapitalize", "false");
}
const u = c("blockGrammarChecks", m);
export {
  u as blockGrammarChecks
};
