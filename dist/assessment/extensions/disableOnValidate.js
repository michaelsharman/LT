import { c as t, L as e } from "../../extensionsFactory-BHOEyOSK.js";
function o() {
  e.eventBus.on("item:load", i, "disableOnValidate");
}
function i() {
  const n = e.questionResponseIds();
  for (const s of n)
    e.hasCheckAnswer(s) && e.itemsApp().question(s).on("validated", () => {
      e.questionInstance(s).disable();
    });
}
const d = t("disableOnValidate", o);
export {
  d as disableOnValidate
};
