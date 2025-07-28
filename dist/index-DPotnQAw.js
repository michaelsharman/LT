import { b as i, r as c, a as m } from "./app-CgKRbBlK.js";
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
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: u
}, Symbol.toStringTag, { value: "Module" }));
export {
  b,
  u as r
};
