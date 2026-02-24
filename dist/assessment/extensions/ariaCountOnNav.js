import { c as r, L as n } from "../../extensionsFactory-BHOEyOSK.js";
const e = {
  initialised: !1,
  totalItems: 0
};
function l() {
  e.initialised || (e.initialised = !0, e.totalItems = Number(n.totalItems()) || 0, n.eventBus.on("item:load", () => {
    const i = Array.from(document.getElementsByClassName("item-prev")), o = Array.from(document.getElementsByClassName("item-next")), a = i.concat(o);
    for (let t = 0; t < a.length; t++) {
      const s = a[t].getAttribute("aria-label");
      a[t].setAttribute("aria-live", s + " of " + e.totalItems);
    }
  }, "ariaCountOnNav"));
}
const u = r("ariaCountOnNav", l);
export {
  u as ariaCountOnNav
};
