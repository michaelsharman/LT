import { c as l, L as i } from "../../extensionsFactory-CJF5B414.js";
function u() {
  i.itemsApp().on("item:load", f);
}
function f() {
  const s = i.itemReference(), n = document.querySelector(`.learnosity-item[data-reference="${s}"]`).querySelectorAll(".lrn_widget .resource");
  n.length && n.forEach((t) => {
    const r = t.querySelector("a").getAttribute("href");
    if (r.substring(r.length - 3) === "pdf") {
      let c = function(e) {
        if (!document.getElementById(e)) {
          const o = document.createElement("div"), a = document.createElement("iframe");
          o.setAttribute("id", e), o.setAttribute("class", "lt__renderPDF_pdf"), t.before(o), a.setAttribute("class", "pdf-viewer"), a.setAttribute("src", `${r}#sidebarViewOnLoad=0&_pagemode=none&_toolbar=0&view=FitH`), o.appendChild(a);
        }
      };
      t.classList.add("sr-only"), m(r).then((e) => {
        c(e);
      });
    }
  });
}
async function m(s) {
  const n = new TextEncoder().encode(s), t = await crypto.subtle.digest("SHA-256", n);
  return Array.from(new Uint8Array(t)).map((e) => e.toString(16).padStart(2, "0")).join("");
}
function h() {
  return `
        /* Learnosity render PDF styles */
        .lt__renderPDF_pdf .pdf-viewer {
            border: none;
            width: 100%;
            height: 650px;
        }
    `;
}
const y = l("renderPDF", u, {
  getStyles: h
});
export {
  y as renderPDF
};
