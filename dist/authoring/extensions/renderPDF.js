import { c as o, L as n } from "../../extensionsFactory-CJF5B414.js";
function l() {
  n.authorApp().on("widgetedit:widget:ready", () => {
    document.querySelectorAll(".cke_button__lrnresource").forEach((e) => {
      n.utils.logger.debug("Found resource button in editor"), e.addEventListener("click", () => {
        d();
      });
    });
  });
}
function d() {
  const r = document.querySelector(".lrn-adv-options-group"), e = a(), t = `<div class="lrn-row">
        <div class="lrn-col-xs-12">
            <label for="lt__renderPDF-Id_${e}" class="lrn-author-asset-upload lrn-form-label-name">
                <span class="lrn-author-asset-upload lrn-form-label-name">Render PDF inline?</span>
            </label>
            <div class="lrn-form-control-wrapper">
                <input id="lt__renderPDF-Id_${e}" name="renderPDF" value="true" type="checkbox" class="lrn-form-control lt__renderPDFOption">
            </div>
        </div>
    </div>`;
  r && r.insertAdjacentHTML("beforeend", t);
}
function a() {
  return Math.floor(Math.random() * Date.now()).toString(36);
}
function s() {
  return `
        /* Learnosity language text direction styles */
        /* Used to style render PDF options added to the resource upload panel */
        .lrn .lrn-author-ui .lrn-form-control.lt__renderPDFOption {
            width: auto;
        }
    `;
}
const c = o("renderPDF", l, {
  getStyles: s
});
export {
  c as renderPDF
};
