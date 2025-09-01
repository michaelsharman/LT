import { c as i, L as a } from "../../extensionsFactory-CJF5B414.js";
import { d as l } from "../../debounce-CqEeJcMa.js";
function c() {
  setTimeout(() => {
    t();
  }, 1500), a.authorApp().on("navigate", t);
  function t() {
    setTimeout(() => {
      a.authorApp().getLocation().route === "items/:reference/settings/:tab" && u();
    }, 300);
  }
}
function u() {
  const t = document.querySelector('[data-authorapi-selector="tag-search-input"]'), n = document.querySelector(".lrn-author-tag-suggestion-list");
  t && t.addEventListener("input", l(e, 750));
  function e() {
    const r = n.querySelector("li.lrn-author-tag-no-suggestions");
    r && g(r);
  }
}
function g(t) {
  const n = t.querySelector(".lt__createTagsContainer"), e = document.querySelector(".lt__error");
  n || t.insertAdjacentHTML("beforeend", `
        <div class="lt__createTagsContainer">
            <span class="lt__error hidden">
                <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"/>
                </svg>
                <span class="lt__errorMessage">Invalid format. Use [type]:[name]</span>
            </span>
            <button type="button" id="lt__createTagsBtn" class="lt__btn lrn-author-btn lrn-author-btn-primary lds-btn lds-btn-primary lds-btn-sm">Create</button>
        </div>

    `), e && e.classList.add("hidden"), document.getElementById("lt__createTagsBtn").addEventListener("click", d);
}
function d() {
  const t = document.querySelector('[data-authorapi-selector="tag-search-input"]'), n = document.querySelector(".lt__error"), e = a.authorApp().getItemTags(), r = t.value;
  if (h(r)) {
    const s = r.split(":").map((o) => o.trim());
    if (p(e, { type: s[0], name: s[1] }))
      e.push({ type: s[0], name: s[1] }), a.authorApp().setItemTags(e);
    else {
      const o = n.querySelector(".lt__errorMessage");
      o.textContent = "Tag already exists", n.classList.remove("hidden");
    }
  } else
    n.classList.remove("hidden");
}
function p(t, n) {
  const e = (s) => JSON.stringify(s) === JSON.stringify(n);
  return !(t.length && t.some(e));
}
function h(t) {
  return /^[^:\s]+:\s*\S+$/.test(t);
}
function m() {
  return `
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
}
const T = i("createTags", c, {
  getStyles: m
});
export {
  T as createTags
};
