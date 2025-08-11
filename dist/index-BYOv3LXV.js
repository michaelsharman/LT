import { a as o } from "./app-Cp7l631V.js";
import l from "./logger.js";
const n = {
  renderedCss: !1
};
function d() {
  n.renderedCss || (c(), n.renderedCss = !0), o().on("widgetedit:widget:ready", () => {
    document.querySelectorAll(".cke_button__lrnresource").forEach((r) => {
      l.debug("Found resource button in editor"), r.addEventListener("click", () => {
        s();
      });
    });
  });
}
function s() {
  const e = document.querySelector(".lrn-adv-options-group"), r = a(), t = `<div class="lrn-row">
        <div class="lrn-col-xs-12">
            <label for="lt__renderPDF-Id_${r}" class="lrn-author-asset-upload lrn-form-label-name">
                <span class="lrn-author-asset-upload lrn-form-label-name">Render PDF inline?</span>
            </label>
            <div class="lrn-form-control-wrapper">
                <input id="lt__renderPDF-Id_${r}" name="renderPDF" value="true" type="checkbox" class="lrn-form-control lt__renderPDFOption">
            </div>
        </div>
    </div>`;
  e && e.insertAdjacentHTML("beforeend", t);
}
function a() {
  return Math.floor(Math.random() * Date.now()).toString(36);
}
function c() {
  const e = document.createElement("style"), r = `
/* Learnosity language text direction styles */
/* Used to style render PDF options added to the resource upload panel */
.lrn .lrn-author-ui .lrn-form-control.lt__renderPDFOption {
    width: auto;
}
`;
  e.textContent = r, document.head.append(e), n.renderedCss = !0;
}
const p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: d
}, Symbol.toStringTag, { value: "Module" }));
export {
  d as a,
  p as r
};
