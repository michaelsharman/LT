import { a as n } from "./app-Cp7l631V.js";
import T from "./logger.js";
const r = {
  options: {
    heading: "Required tag{s} missing",
    headingLevel: 3,
    messageStart: "Please add the following tag{s} before publishing:",
    messageEnd: "",
    requiredTags: []
  },
  renderedCss: !1
};
function I(t = {}) {
  r.options = { ...r.options, ...t }, n().on("render:item", () => {
    n().getLocation()?.route === "items/new" && C("unpublished");
  }), n().on("itemsettings:applied", () => {
    n().getItem()?.item?.status === "published" && y();
  }), n().on("save", (e) => {
    n().getItem()?.item?.status === "published" && (y(!0) || e.preventDefault());
  });
}
function S() {
  if (document.getElementById("lt__error-dialog"))
    return;
  const t = document.querySelector(".lrn-author");
  if (!t) {
    T.error("No Author API element found");
    return;
  }
  const e = document.createElement("dialog");
  e.id = "lt__error-dialog", e.className = "lt__error-dialog", e.innerHTML = `
        <h${r.options.headingLevel} id="lt__error-heading"></h${r.options.headingLevel}>
        <div id="lt__error-message"></div>
        <div id="lt__tags-ui"></div>
        <div id="lt__dialog-footer">
            <button id="lt__error-close" class="lds-btn lds-btn-secondary">Close</button>
            <button id="lt__tags-save" class="lds-btn lds-btn-primary">Add tags</button>
        </div>
    `, t.appendChild(e), r.renderedCss || (x(), r.renderedCss = !0);
}
function b(t, e = !1) {
  S();
  const s = document.getElementById("lt__error-dialog"), l = document.getElementById("lt__error-heading"), i = document.getElementById("lt__error-message"), d = document.getElementById("lt__tags-ui"), c = document.getElementById("lt__error-close"), o = document.getElementById("lt__tags-save"), a = n().renderComponent("tags", d), u = t.length > 1 ? "s" : "";
  l.innerHTML = `${r.options.heading.replace("{s}", u)}`, i.innerHTML = `
        <p>${r.options.messageStart.replace("{s}", u)}</p>
        <ul>${t.map((g) => `<li>${g}</li>`).join("")}</ul>
        <p>${r.options.messageEnd}</p>
    `, c.onclick = () => s.close(), s.oncancel = null, o.onclick = () => {
    const g = a.getSelectedTags(), m = n().getItemTags(), p = [...m, ...g.filter((f) => !m.some((h) => h.type === f.type && h.name === f.name))], _ = v(p);
    if (n().setItemTags(p), !_.valid) {
      b(_.message);
      return;
    }
    e && n().save(), s.close();
  }, s.open || s.showModal();
}
function y(t = !1) {
  const e = v(n().getItemTags());
  return e?.valid ? !0 : (b(e.message, t), !1);
}
function C(t = "unpublished") {
  n().setStatus(t);
}
function v(t) {
  const e = (o) => String(o).trim().toLowerCase(), s = new Set(r.options.requiredTags.map(e)), l = new Set(
    (Array.isArray(t) ? t : []).map((o) => o?.type).filter((o) => typeof o == "string" && o.trim() !== "").map(e)
  ), i = [...s].filter((o) => !l.has(o)), d = i.map((o) => r.options.requiredTags.find((a) => e(a) === o) || o).sort((o, a) => o.localeCompare(a, void 0, { sensitivity: "base" }));
  return {
    valid: i.length === 0,
    message: d
  };
}
function x() {
  const t = document.querySelector(".lrn-author"), e = document.createElement("style"), s = `
/* Learnosity required tags styles */
.lt__error-dialog {
    border: none;
    border-radius: 4px;
    padding: 1.5rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.4);
    background-color: #fff;
    width: 600px;
    max-width: 90%;
    font-size: 1.1em;

    &[open] {
        display: flex;
        flex-direction: column;
    }

    &::backdrop {
        background: rgba(0, 0, 0, 0.6);
    }

    .lt__error-dialog > #lt__error-message,
    .lt__error-dialog > #lt__tags-ui {
        overflow-y: auto;
    }

    #lt__dialog-footer {
        margin-top: auto;
        display: flex;
        justify-content: flex-start;
        gap: 0.5rem;
        padding-top: 1rem;
    }

    h2, h3, h4 {
        margin-top: 0;
        color: #d93025;
    }

    #lt__tags-ui {
        padding-top: 1em;
    }

    .lrn-author {
        min-height: 22em;

        .lrn-author-api-react-container .lrn-author-settings-tags-container {
            min-height: 15em;
        }
    }
}
`;
  e.setAttribute("data-style", "LT Required Tags"), e.textContent = s, t.appendChild(e), r.renderedCss = !0;
}
const w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: I
}, Symbol.toStringTag, { value: "Module" }));
export {
  I as a,
  w as r
};
