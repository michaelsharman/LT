import { c as l, n as u } from "./app-CLzv4RuI.js";
const i = {
  renderedCss: !1
};
function f() {
  i.renderedCss || p(), l().on("item:load", m);
}
function m() {
  const e = u(), s = document.querySelector(`.learnosity-item[data-reference="${e}"]`).querySelectorAll(".lrn_widget .resource");
  s.length && s.forEach((n) => {
    const r = n.querySelector("a").getAttribute("href");
    if (r.substring(r.length - 3) === "pdf") {
      let d = function(t) {
        if (!document.getElementById(t)) {
          const o = document.createElement("div"), c = document.createElement("iframe");
          o.setAttribute("id", t), o.setAttribute("class", "lt__renderPDF_pdf"), n.before(o), c.setAttribute("class", "pdf-viewer"), c.setAttribute("src", `${r}#sidebarViewOnLoad=0&_pagemode=none&_toolbar=0&view=FitH`), o.appendChild(c);
        }
      };
      n.classList.add("sr-only"), h(r).then((t) => {
        d(t);
      });
    }
  });
}
async function h(e) {
  const s = new TextEncoder().encode(e), n = await crypto.subtle.digest("SHA-256", s);
  return Array.from(new Uint8Array(n)).map((t) => t.toString(16).padStart(2, "0")).join("");
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
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: f
}, Symbol.toStringTag, { value: "Module" }));
export {
  f as a,
  b as r
};
