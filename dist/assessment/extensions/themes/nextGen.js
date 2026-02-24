import { c as t } from "../../../extensionsFactory-BHOEyOSK.js";
const i = ':root{--font-stack--base: "LearnosityMath", "Helvetica", "Calibri", "Arial", sans-serif;--font-size--base: 16px}.lt__theme-nextGen{.lrn{font-family:var(--font-stack--base);font-size:var(--font-size--base);h1,h2,h3,h4,h5,h6,.lrn-annotations-c-modal--notepad,input,select,textarea .lds_btn,.lds-btn{font-family:var(--font-stack--base)}}}.lrn{.lrn_ratingInfo .lrn_ratingInfo_inner .lrn_ratingInfo_row span,.lrn_ratingInfo .lrn_ratingInfo_inner .lrn_ratingInfo_row .lrn_ratingInfo_description,.lrn_rating_tooltip{font-family:var(--font-stack--base)}}:root{--lt__theme-main-focus-border: #1877b1}.lt__theme{.lrn{.inline-item{.lrn-assess-content{.lrn_cloze_response:focus,.lrn-gridded-input:focus,.lrn_widget.lrn_shorttext .lrn_textinput input:focus{box-shadow:0 0 0 2px var(--lt__theme-main-focus-border)}}.lrn_qr.lrn_association .lrn_response .lrn_arrows .lrn_arrow:before,.lrn_qr.lrn_association .lrn_response .lrn_arrows .lrn_arrow:after{top:-.235em}.lrn_btn.lrn_validate{float:none}.lrn_widget.lrn_association .lrn_possibilityList .lrn_btn_drag .lrn_icon:before,.lrn_widget.lrn_association .lrn_possibilityListContainer .lrn_btn_drag .lrn_icon:before,.lrn_widget.lrn_sortlist .lrn_possibilityList .lrn_btn_drag .lrn_icon:before,.lrn_widget.lrn_sortlist .lrn_possibilityListContainer .lrn_btn_drag .lrn_icon:before,.lrn_widget.lrn_orderlist .lrn_possibilityList .lrn_btn_drag .lrn_icon:before,.lrn_widget.lrn_orderlist .lrn_possibilityListContainer .lrn_btn_drag .lrn_icon:before,.lrn_widget.lrn_classification .lrn_possibilityList .lrn_btn_drag .lrn_icon:before,.lrn_widget.lrn_classification .lrn_possibilityListContainer .lrn_btn_drag .lrn_icon:before,.lrn_widget.lrn_clozeassociation .lrn_possibilityList .lrn_btn_drag .lrn_icon:before,.lrn_widget.lrn_clozeassociation .lrn_possibilityListContainer .lrn_btn_drag .lrn_icon:before,.lrn_widget.lrn_imageclozeassociationV2 .lrn_possibilityList .lrn_btn_drag .lrn_icon:before,.lrn_widget.lrn_imageclozeassociationV2 .lrn_possibilityListContainer .lrn_btn_drag .lrn_icon:before{top:.06em}}.lrn-assess-item{.lrn-assess-content{.lrn_cloze_response:focus,.lrn-gridded-input:focus,.lrn_widget.lrn_shorttext .lrn_textinput input:focus,.lrn_widget .lrn_texteditor_editable:focus{box-shadow:0 0 0 2px var(--lt__theme-main-focus-border);position:relative}}}}@media(width<700px){.lrn{.inline-item{.lrn_qr.lrn_association .lrn_response .lrn_arrows .lrn_arrow:before,.lrn_qr.lrn_association .lrn_response .lrn_arrows .lrn_arrow:after{top:-.2em}}}}@media(width<550px){.lrn{.inline-item{.lrn_qr.lrn_association .lrn_response .lrn_arrows .lrn_arrow:before,.lrn_qr.lrn_association .lrn_response .lrn_arrows .lrn_arrow:after{top:-.15em}}}}}', e = {
  elements: {},
  theme: "nextGen"
};
function l() {
  s(), o();
}
function o() {
  const n = e.elements.apiWrapper, r = document.createElement("main");
  r.className = `lt__theme lt__theme-${e.theme}`, n.parentNode.insertBefore(r, n), r.appendChild(n);
}
function s() {
  e.elements.apiWrapper = document.querySelector(".lrn-assess");
}
function _() {
  return i;
}
const c = t("nextGen", l, {
  getStyles: _
});
export {
  c as nextGen
};
