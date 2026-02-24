import { c, L as o } from "../../extensionsFactory-BHOEyOSK.js";
function m() {
  o.eventBus.on("item:load", l, "blockGrammarChecks"), o.hasAnnotations() && ["notepad:toggleVisibility", "stickynote:add"].forEach((a) => o.annotationsApp().on(a, l));
}
function l() {
  const t = ["lrn_texteditor_editable"], a = document.getElementById("learnosity_assess");
  for (let e = 0; e < t.length; e++) {
    const s = a.getElementsByClassName(t[e]);
    if (s.length)
      for (let n = 0; n < s.length; n++)
        i(s[n]);
  }
  const r = a.getElementsByTagName("textarea");
  for (let e = 0; e < r.length; e++)
    i(r[e]);
}
function i(t) {
  t.setAttribute("data-gramm", "false"), t.setAttribute("data-gramm_editor", "false"), t.setAttribute("data-enable-grammarly", "false"), t.setAttribute("spellcheck", "false"), t.setAttribute("autocorrect", "false"), t.setAttribute("autocomplete", "false"), t.setAttribute("autocapitalize", "false");
}
const f = c("blockGrammarChecks", m);
export {
  f as blockGrammarChecks
};
