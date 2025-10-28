import { renderPDF as l } from "../../assessment/extensions/renderPDF.js";
import { c as s } from "../../styling-BAmPgGwX.js";
import { c, L as d } from "../../extensionsFactory-BHOEyOSK.js";
const i = {
  classNamePrefix: null
};
function u() {
  i.classNamePrefix = s(i.classNamePrefix), d.authorApp().on("render:item", () => {
    a(document.querySelector(".lrn-author-item-content-wrapper"));
  }), d.authorApp().on("widgetedit:preview:changed", () => {
    a(document.querySelector(".lrn-question-preview"));
  });
}
function a(r) {
  if (!r)
    return;
  const t = r.querySelectorAll(".lrn_widget .resource");
  t.length && t.forEach((e) => {
    const n = e.querySelector("a");
    if (!n)
      return;
    const o = n.getAttribute("href") || "";
    o.toLowerCase().endsWith(".pdf") && e.dataset.ltRenderedPdf !== "1" && (e.dataset.ltRenderedPdf = "1", l.mountNativePdf(e, o));
  });
}
function f() {
  return `
        /* Learnosity language text direction styles */
        /* Used to style render PDF options added to the resource upload panel */
        .lrn .lrn-author-ui .lrn-form-control.lt__renderPDFOption {
            width: auto;
        }

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
const P = c("renderPDF", u, {
  getStyles: f
});
export {
  P as renderPDF
};
