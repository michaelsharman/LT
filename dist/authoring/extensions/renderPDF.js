import { c as l } from "../../styling-B1v3AcrI.js";
import { c as a, L as t } from "../../extensionsFactory-BHOEyOSK.js";
const n = {
  classNamePrefix: null
};
function s() {
  n.classNamePrefix = l(n.classNamePrefix), t.authorApp().on("widgetedit:widget:ready", () => {
    document.querySelectorAll(".cke_button__lrnresource").forEach((e) => {
      t.utils.logger.debug("Found resource button in editor"), e.addEventListener("click", () => {
        d();
      });
    });
  });
}
function d() {
  const r = document.querySelector(`.lrn-${n.classNamePrefix}adv-options-group`), e = c(), o = `<div class="lrn-row">
        <div class="lrn-col-xs-12 lrn-author-padding-top-sm">
            <label for="lt__renderPDF-Id_${e}" class="lrn-author-asset-upload lrn-form-label-name">
                <span class="lrn-author-asset-upload lrn-form-label-name">Render PDF inline?</span>
            </label>
            <div class="lrn-form-control-wrapper">
                <input id="lt__renderPDF-Id_${e}" name="renderPDF" value="true" type="checkbox" class="lrn-form-control lt__renderPDFOption">
            </div>
        </div>
    </div>`;
  r && r.insertAdjacentHTML("beforeend", o);
}
function c() {
  return Math.floor(Math.random() * Date.now()).toString(36);
}
function i() {
  return `
        /* Learnosity language text direction styles */
        /* Used to style render PDF options added to the resource upload panel */
        .lrn .lrn-author-ui .lrn-form-control.lt__renderPDFOption {
            width: auto;
        }
    `;
}
const m = a("renderPDF", s, {
  getStyles: i
});
export {
  m as renderPDF
};
