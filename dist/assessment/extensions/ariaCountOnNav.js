import { c as r, L as i } from "../../extensionsFactory-BHOEyOSK.js";
const e = {
  initialised: !1,
  totalItems: 0
};
function l() {
  e.initialised || (e.initialised = !0, e.totalItems = Number(i.totalItems()) || 0, i.itemsApp().on("item:load", () => {
    const n = Array.from(document.getElementsByClassName("item-prev")), o = Array.from(document.getElementsByClassName("item-next")), a = n.concat(o);
    for (let t = 0; t < a.length; t++) {
      const s = a[t].getAttribute("aria-label");
      a[t].setAttribute("aria-live", s + " of " + e.totalItems);
    }
  }));
}
const c = r("ariaCountOnNav", l);
export {
  c as ariaCountOnNav
};
