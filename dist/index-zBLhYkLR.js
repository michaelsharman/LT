import { c as l, z as u } from "./app-BC_Cj6Pt.js";
import { c as f } from "./extensionsFactory-DRAOPv5d.js";
const d = {
  renderedCss: !1
};
function m() {
  d.renderedCss || (y(), d.renderedCss = !0), l().on("item:load", h);
}
function h() {
  const e = u(), s = document.querySelector(`.learnosity-item[data-reference="${e}"]`).querySelectorAll(".lrn_widget .resource");
  s.length && s.forEach((r) => {
    const n = r.querySelector("a").getAttribute("href");
    if (n.substring(n.length - 3) === "pdf") {
      let i = function(t) {
        if (!document.getElementById(t)) {
          const o = document.createElement("div"), c = document.createElement("iframe");
          o.setAttribute("id", t), o.setAttribute("class", "lt__renderPDF_pdf"), r.before(o), c.setAttribute("class", "pdf-viewer"), c.setAttribute("src", `${n}#sidebarViewOnLoad=0&_pagemode=none&_toolbar=0&view=FitH`), o.appendChild(c);
        }
      };
      r.classList.add("sr-only"), p(n).then((t) => {
        i(t);
      });
    }
  });
}
async function p(e) {
  const s = new TextEncoder().encode(e), r = await crypto.subtle.digest("SHA-256", s);
  return Array.from(new Uint8Array(r)).map((t) => t.toString(16).padStart(2, "0")).join("");
}
function y() {
  const e = document.createElement("style"), a = `
/* Learnosity render PDF styles */
.lt__renderPDF_pdf .pdf-viewer {
    border: none;
    width: 100%;
    height: 650px;
}
`;
  e.setAttribute("data-style", "LT Render PDF"), e.textContent = a, document.head.append(e), d.renderedCss = !0;
}
const b = f("renderPDF", m), A = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  renderPDF: b
}, Symbol.toStringTag, { value: "Module" }));
export {
  b as a,
  A as r
};
