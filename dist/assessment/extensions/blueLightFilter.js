import { c as o, L as u } from "../../extensionsFactory-BHOEyOSK.js";
const e = {
  blueLightFilter: null,
  color: "rgba(250, 170, 140, 0.5)",
  zindex: 99999
};
function d(r) {
  const { customColor: i, customZIndex: l } = r || {};
  i && typeof i == "string" && (e.color = i), l && typeof l == "number" && (e.zindex = l);
  let t = document.getElementById("lt__blue-light-filter");
  t || (t = document.createElement("div"), t.id = "lt__blue-light-filter", t.hidden = !0, t.classList.add("lt__blue-light-filter"), document.querySelector(".lrn-assess").appendChild(t)), e.blueLightFilter = t;
}
function s() {
  e.blueLightFilter?.hidden && n();
}
function h() {
  e.blueLightFilter?.hidden || n();
}
function n() {
  if (!e.blueLightFilter) {
    u.utils.logger.warn("[BlueLightFilter] visibility called before run()");
    return;
  }
  e.blueLightFilter.hidden = !e.blueLightFilter.hidden;
}
function c() {
  return `
        /* Learnosity blue light filter styles */
        .lt__blue-light-filter {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: ${e.color};
            z-index: ${e.zindex};
            pointer-events: none;
        }
    `;
}
const b = o("blueLightFilter", d, {
  getStyles: c,
  show: s,
  hide: h,
  toggle: n
});
export {
  b as blueLightFilter
};
