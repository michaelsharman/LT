import { c as o, L as e } from "../../extensionsFactory-CJF5B414.js";
function t() {
  e.itemsApp().on("item:load", i);
}
function i() {
  const n = e.questionResponseIds();
  for (const s of n)
    e.hasCheckAnswer(s) && e.itemsApp().question(s).on("validated", () => {
      e.questionInstance(s).disable();
    });
}
const d = o("disableOnValidate", t);
export {
  d as disableOnValidate
};
