import { c as o } from "../../../app-C2_EjRb0.js";
const s = {
  elements: {},
  theme: "canvas"
};
function w() {
  m(), p(), d(), g(), h();
}
function p() {
  const e = s.elements.apiWrapper, t = document.createElement("main");
  t.className = `lt__theme lt__theme-${s.theme}`, e.parentNode.insertBefore(t, e), t.appendChild(e);
}
function m() {
  s.elements.apiWrapper = document.querySelector(".lrn-assess"), s.elements.items = document.querySelectorAll(".inline-item");
}
function d() {
  s.elements.items.forEach((n) => {
    const r = n.getAttribute("data-reference");
    n.querySelector(".lrn-assess-content").insertAdjacentHTML("afterbegin", t(r));
  }), document.querySelectorAll(".item-flag").forEach((n) => {
    n.addEventListener("click", f);
  });
  function t(n) {
    return `<button type="button" class="item-flag" aria-label="Flag item" data-reference="${n}">
            <span class="btn-label sr-only">Flag</span>
            <svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" role="img" aria-label="Flag item">
                <defs></defs>
                <g stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M68.2505357,3.69288674 C69.3983251,2.54509738 71.2585777,2.54441581 72.4113235,3.69716157 L95.9533021,27.2391402 C97.1034524,28.3892904 97.1016597,30.2558452 95.9575769,31.399928 L93.1873296,34.1701753 C92.0395402,35.3179647 90.1792875,35.3186462 89.0265418,34.1659005 L65.4845632,10.6239219 C64.3344129,9.47377159 64.3362056,7.60721684 65.4802884,6.46313407 L68.2505357,3.69288674 L68.2505357,3.69288674 Z" stroke-width="4"></path>
                    <path d="M65.0919375,57.6126738 L85.7185269,30.8578856 L68.8818314,14.0211901 L42.0592684,34.5649228 C47.335976,36.1382935 52.3084627,39.0083833 56.4752716,43.1751921 C60.6477335,47.3476541 63.5199555,52.3279816 65.0919375,57.6126738 L65.0919375,57.6126738 L65.0919375,57.6126738 Z" stroke-width="4"></path>
                    <path d="M56.4752716,43.1751921 C43.0858673,29.7857878 21.3773537,29.7857878 7.98794943,43.1751921 L56.4752716,91.6625142 C69.8646759,78.2731099 69.8646759,56.5645964 56.4752716,43.1751921 L56.4752716,43.1751921 Z" stroke-width="4"></path>
                    <path d="M32.2316105,68.1115292 L2.44654118,97.8965985" stroke-width="4"></path>
                </g>
            </svg>
        </button>`;
  }
}
function f(e) {
  const t = e.target.getAttribute("data-reference");
  o().assessApp().item(t).flag(), e.target.classList.toggle("flagged");
}
function g() {
  s.elements.items.forEach((e) => {
    const t = e.getAttribute("data-reference");
    o().getItems()[t].questions.forEach((a, l) => {
      const c = o().question(a.response_id).checkValidation().has_validation && a?.validation?.valid_response?.score || a?.validation?.max_score || 0;
      e.querySelectorAll(".question-number")[l].insertAdjacentHTML("afterend", u(c));
      function u(i) {
        return `<span class="question-score">${i} point${i !== 1 ? "s" : ""}</span>`;
      }
    });
  });
}
function h() {
  s.elements.items.forEach((e) => {
    if (!e.querySelector(".row")) {
      const n = e.querySelector(".numbered-question"), r = e.querySelector(".question-number");
      n.classList.add("position-relative"), r.classList.add("extra-left-position");
    }
  });
}
export {
  w as run
};
