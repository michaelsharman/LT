import { a } from "./app-Cp7l631V.js";
import { d as l } from "./debounce-CqEeJcMa.js";
const i = {
  renderedCss: !1
};
function c() {
  i.renderedCss || (h(), i.renderedCss = !0), setTimeout(() => {
    e();
  }, 1500), a().on("navigate", e);
  function e() {
    setTimeout(() => {
      a().getLocation().route === "items/:reference/settings/:tab" && d();
    }, 300);
  }
}
function d() {
  const e = document.querySelector('[data-authorapi-selector="tag-search-input"]'), t = document.querySelector(".lrn-author-tag-suggestion-list");
  e && e.addEventListener("input", l(n, 750));
  function n() {
    const s = t.querySelector("li.lrn-author-tag-no-suggestions");
    s && u(s);
  }
}
function u(e) {
  const t = e.querySelector(".lt__createTagsContainer"), n = document.querySelector(".lt__error");
  t || e.insertAdjacentHTML("beforeend", `
        <div class="lt__createTagsContainer">
            <span class="lt__error hidden">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <span class="lt__errorMessage">Invalid format. Use [type]:[name]</span>
            </span>
            <button type="button" id="lt__createTagsBtn" class="lt__btn lrn-author-btn lrn-author-btn-primary lds-btn lds-btn-primary lds-btn-sm">Create</button>
        </div>

    `), n && n.classList.add("hidden"), document.getElementById("lt__createTagsBtn").addEventListener("click", g);
}
function g() {
  const e = document.querySelector('[data-authorapi-selector="tag-search-input"]'), t = document.querySelector(".lt__error"), n = a().getItemTags(), s = e.value;
  if (m(s)) {
    const r = s.split(":").map((o) => o.trim());
    if (p(n, { type: r[0], name: r[1] }))
      n.push({ type: r[0], name: r[1] }), a().setItemTags(n);
    else {
      const o = t.querySelector(".lt__errorMessage");
      o.textContent = "Tag already exists", t.classList.remove("hidden");
    }
  } else
    t.classList.remove("hidden");
}
function p(e, t) {
  const n = (r) => JSON.stringify(r) === JSON.stringify(t);
  return !(e.length && e.some(n));
}
function m(e) {
  return /^[^:\s]+:\s*\S+$/.test(e);
}
function h() {
  const e = document.createElement("style"), t = `
/* Learnosity create tags styles */
.lt__createTagsContainer {
    position: relative;
    top: -21px;
    float: right;
    font-size: 85%;
    height: 1px;
}
:is(#lds, body) .lds-btn.lt__btn {
    font-size: 115%;
}
.lt__error {
    color: #dd002f;
    padding-right: 2px;

    :is(svg) {
        vertical-align: middle;
    }
}
.lrn.lrn-author .lrn-author-api-react-container .lrn-author-settings-tag-search span.lt__errorMessage {
    margin-left: 0;
}
`;
  e.setAttribute("data-style", "LT Create Tags"), e.textContent = t, document.head.append(e), i.renderedCss = !0;
}
const y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: c
}, Symbol.toStringTag, { value: "Module" }));
export {
  y as c,
  c as r
};
