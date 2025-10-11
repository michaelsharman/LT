import { c as m, L as a } from "../../extensionsFactory-BHOEyOSK.js";
function h() {
  a.itemsApp().on("item:load", l), queueMicrotask(l);
}
function l() {
  const c = a.itemReference(), i = document.querySelector(`.learnosity-item[data-reference="${c}"]`);
  if (!i)
    return;
  const t = i.querySelectorAll(".lrn_widget .resource");
  t.length && t.forEach((e) => {
    const s = e.querySelector("a");
    if (!s)
      return;
    const o = s.getAttribute("href") || "";
    o.toLowerCase().endsWith(".pdf") && e.dataset.ltRenderedPdf !== "1" && (e.dataset.ltRenderedPdf = "1", f(e, o));
  });
}
function f(c, i) {
  const t = document.createElement("div");
  t.className = "lt__renderPDF_pdf";
  const e = document.createElement("iframe");
  e.className = "pdf-viewer", e.allow = "fullscreen", e.setAttribute("allowfullscreen", ""), t.appendChild(e), c.before(t);
  const s = (n) => {
    const r = n.getBoundingClientRect();
    return r.width <= 0 || r.height <= 0 ? !1 : !!(n.ownerDocument && n.ownerDocument.defaultView);
  }, o = () => {
    const n = i.includes("?") ? "&" : "?", r = `v=${Date.now()}`, d = `${i}${n}${r}#view=FitH`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        e.src = d;
      });
    });
  };
  if (s(t))
    o();
  else {
    const n = new IntersectionObserver(
      (r) => {
        r.some((u) => u.isIntersecting) && (n.disconnect(), o());
      },
      { root: null, threshold: 0.01 }
    );
    n.observe(t);
  }
}
function p() {
  return `
        /* Learnosity render PDF styles */
        .lt__renderPDF_pdf {
            display: block;
            width: 100%;
            max-width: 100%;
        }
        .lt__renderPDF_pdf .pdf-viewer {
            display: block;
            width: 100%;
            height: 650px;
            border: 0;
            background: #fff;
        }
    `;
}
const b = m("renderPDF", h, {
  getStyles: p,
  mountNativePdf: f
});
export {
  b as renderPDF
};
