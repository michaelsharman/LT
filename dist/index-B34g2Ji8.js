import { c as i, z as c, A as m } from "./app-CnMVZMul.js";
function u() {
  const t = i(), a = c();
  t.on("item:load", l), m() && ["notepad:toggleVisibility", "stickynote:add"].forEach((n) => a.on(n, l));
}
function l() {
  let t = [], a = [];
  const s = ["lrn_texteditor_editable"], n = document.getElementById("learnosity_assess");
  for (let e = 0; e < s.length; e++)
    if (t = n.getElementsByClassName(s[e]), t.length)
      for (let o = 0; o < t.length; o++)
        r(t[o]);
  a = n.getElementsByTagName("textarea");
  for (let e = 0; e < a.length; e++)
    r(a[e]);
}
function r(t) {
  t.setAttribute("data-gramm", "false"), t.setAttribute("data-gramm_editor", "false"), t.setAttribute("data-enable-grammarly", "false"), t.setAttribute("spellcheck", "false"), t.setAttribute("autocorrect", "false"), t.setAttribute("autocomplete", "false"), t.setAttribute("autocapitalize", "false");
}
const d = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: u
}, Symbol.toStringTag, { value: "Module" }));
export {
  d as b,
  u as r
};
