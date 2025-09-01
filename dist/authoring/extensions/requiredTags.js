import { c as A, L as r } from "../../extensionsFactory-CJF5B414.js";
const n = {
  options: {
    heading: "Required tag{s} missing",
    headingLevel: 3,
    messageStart: "Please add the following tag{s} before publishing:",
    messageEnd: "",
    requiredTags: []
  }
};
function T(o = {}) {
  n.options = { ...n.options, ...o }, r.authorApp().on("render:item", () => {
    r.authorApp().getLocation()?.route === "items/new" && S("unpublished");
  }), r.authorApp().on("itemsettings:applied", () => {
    r.authorApp().getItem()?.item?.status === "published" && y();
  }), r.authorApp().on("save", (e) => {
    r.authorApp().getItem()?.item?.status === "published" && (y(!0) || e.preventDefault());
  });
}
function I() {
  if (document.getElementById("lt__error-dialog"))
    return;
  const o = document.querySelector(".lrn-author");
  if (!o) {
    r.utils.logger.error("No Author API element found");
    return;
  }
  const e = document.createElement("dialog");
  e.id = "lt__error-dialog", e.className = "lt__error-dialog", e.innerHTML = `
        <h${n.options.headingLevel} id="lt__error-heading"></h${n.options.headingLevel}>
        <div id="lt__error-message"></div>
        <div id="lt__tags-ui"></div>
        <div id="lt__dialog-footer">
            <button id="lt__error-close" class="lds-btn lds-btn-secondary">Close</button>
            <button id="lt__tags-save" class="lds-btn lds-btn-primary">Add tags</button>
        </div>
    `, o.appendChild(e);
}
function b(o, e = !1) {
  I();
  const a = document.getElementById("lt__error-dialog"), l = document.getElementById("lt__error-heading"), i = document.getElementById("lt__error-message"), d = document.getElementById("lt__tags-ui"), u = document.getElementById("lt__error-close"), t = document.getElementById("lt__tags-save"), s = r.authorApp().renderComponent("tags", d), p = o.length > 1 ? "s" : "";
  l.innerHTML = `${n.options.heading.replace("{s}", p)}`, i.innerHTML = `
        <p>${n.options.messageStart.replace("{s}", p)}</p>
        <ul>${o.map((g) => `<li>${g}</li>`).join("")}</ul>
        <p>${n.options.messageEnd}</p>
    `, u.onclick = () => a.close(), a.oncancel = null, t.onclick = () => {
    const g = s.getSelectedTags(), c = r.authorApp().getItemTags(), m = [...c, ...g.filter((_) => !c.some((f) => f.type === _.type && f.name === _.name))], h = v(m);
    if (r.authorApp().setItemTags(m), !h.valid) {
      b(h.message);
      return;
    }
    e && r.authorApp().save(), a.close();
  }, a.open || a.showModal();
}
function y(o = !1) {
  const e = v(r.authorApp().getItemTags());
  return e?.valid ? !0 : (b(e.message, o), !1);
}
function S(o = "unpublished") {
  r.authorApp().setStatus(o);
}
function v(o) {
  const e = (t) => String(t).trim().toLowerCase(), a = new Set(n.options.requiredTags.map(e)), l = new Set(
    (Array.isArray(o) ? o : []).map((t) => t?.type).filter((t) => typeof t == "string" && t.trim() !== "").map(e)
  ), i = [...a].filter((t) => !l.has(t)), d = i.map((t) => n.options.requiredTags.find((s) => e(s) === t) || t).sort((t, s) => t.localeCompare(s, void 0, { sensitivity: "base" }));
  return {
    valid: i.length === 0,
    message: d
  };
}
function x() {
  return `
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
}
const L = A("requiredTags", T, {
  getStyles: x
});
export {
  L as requiredTags
};
