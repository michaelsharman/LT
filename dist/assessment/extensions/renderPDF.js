import { c as m, L as a } from "../../extensionsFactory-BHOEyOSK.js";
function h() {
  a.eventBus.on("item:load", l, "renderPDF"), queueMicrotask(l);
}
function l() {
  const c = a.itemReference(), o = document.querySelector(`.learnosity-item[data-reference="${c}"]`);
  if (!o)
    return;
  const t = o.querySelectorAll(".lrn_widget .resource");
  t.length && t.forEach((e) => {
    const s = e.querySelector("a");
    if (!s)
      return;
    const i = s.getAttribute("href") || "";
    i.toLowerCase().endsWith(".pdf") && e.dataset.ltRenderedPdf !== "1" && (e.dataset.ltRenderedPdf = "1", u(e, i));
  });
}
function u(c, o) {
  const t = document.createElement("div");
  t.className = "lt__renderPDF_pdf";
  const e = document.createElement("iframe");
  e.className = "pdf-viewer", e.allow = "fullscreen", e.setAttribute("allowfullscreen", ""), t.appendChild(e), c.before(t);
  const s = (n) => {
    const r = n.getBoundingClientRect();
    return r.width <= 0 || r.height <= 0 ? !1 : !!(n.ownerDocument && n.ownerDocument.defaultView);
  }, i = () => {
    const n = o.includes("?") ? "&" : "?", r = `v=${Date.now()}`, d = `${o}${n}${r}#view=FitH`;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        e.src = d;
      });
    });
  };
  if (s(t))
    i();
  else {
    const n = new IntersectionObserver(
      (r) => {
        r.some((f) => f.isIntersecting) && (n.disconnect(), i());
      },
      { root: null, threshold: 0.01 }
    );
    n.observe(t);
  }
}
function w() {
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
  getStyles: w,
  mountNativePdf: u
});
export {
  b as renderPDF
};
