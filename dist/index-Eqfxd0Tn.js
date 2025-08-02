import { c as l } from "./app-C9b6PwWF.js";
import { V as u } from "./activity-DZI4ByCR.js";
const i = {
  renderedCss: !1
};
function f() {
  i.renderedCss || p(), l().on("item:load", m);
}
function m() {
  const e = u(), o = document.querySelector(`.learnosity-item[data-reference="${e}"]`).querySelectorAll(".lrn_widget .resource");
  o.length && o.forEach((r) => {
    const n = r.querySelector("a").getAttribute("href");
    if (n.substring(n.length - 3) === "pdf") {
      let d = function(t) {
        if (!document.getElementById(t)) {
          const s = document.createElement("div"), c = document.createElement("iframe");
          s.setAttribute("id", t), s.setAttribute("class", "lt__renderPDF_pdf"), r.before(s), c.setAttribute("class", "pdf-viewer"), c.setAttribute("src", `${n}#sidebarViewOnLoad=0&_pagemode=none&_toolbar=0&view=FitH`), s.appendChild(c);
        }
      };
      r.classList.add("sr-only"), h(n).then((t) => {
        d(t);
      });
    }
  });
}
async function h(e) {
  const o = new TextEncoder().encode(e), r = await crypto.subtle.digest("SHA-256", o);
  return Array.from(new Uint8Array(r)).map((t) => t.toString(16).padStart(2, "0")).join("");
}
function p() {
  const e = document.createElement("style"), a = `
/* Learnosity render PDF styles */
.lt__renderPDF_pdf .pdf-viewer {
    border: none;
    width: 100%;
    height: 650px;
}
`;
  e.setAttribute("data-style", "LT Render PDF"), e.textContent = a, document.head.append(e), i.renderedCss = !0;
}
const _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: f
}, Symbol.toStringTag, { value: "Module" }));
export {
  f as a,
  _ as r
};
