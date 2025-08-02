import { a as i, c } from "./app-C9b6PwWF.js";
import { h as m } from "./activity-DZI4ByCR.js";
function f() {
  const t = c(), a = i();
  t.on("item:load", r), m() && ["notepad:toggleVisibility", "stickynote:add"].forEach((n) => a.on(n, r));
}
function r() {
  let t = [], a = [];
  const o = ["lrn_texteditor_editable"], n = document.getElementById("learnosity_assess");
  for (let e = 0; e < o.length; e++)
    if (t = n.getElementsByClassName(o[e]), t.length)
      for (let s = 0; s < t.length; s++)
        l(t[s]);
  a = n.getElementsByTagName("textarea");
  for (let e = 0; e < a.length; e++)
    l(a[e]);
}
function l(t) {
  t.setAttribute("data-gramm", "false"), t.setAttribute("data-gramm_editor", "false"), t.setAttribute("data-enable-grammarly", "false"), t.setAttribute("spellcheck", "false"), t.setAttribute("autocorrect", "false"), t.setAttribute("autocomplete", "false"), t.setAttribute("autocapitalize", "false");
}
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: f
}, Symbol.toStringTag, { value: "Module" }));
export {
  d as b,
  f as r
};
