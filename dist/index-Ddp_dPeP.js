import { c as d, z as p } from "./app-BC_Cj6Pt.js";
import { c as u } from "./extensionsFactory-DRAOPv5d.js";
const e = {
  options: {
    theme: "api-column-tabs"
  },
  renderedCss: !1,
  visitedItems: /* @__PURE__ */ new Set()
};
function f(t) {
  e.options = c(t), e.renderedCss || (m(), e.renderedCss = !0), d().on("item:load", () => {
    const o = p();
    if (!e.visitedItems.has(o)) {
      const r = document.querySelector(`div[data-reference="${o}"]`).querySelectorAll("ul.lt__nav-tabs");
      if (r)
        for (const i of r)
          i.querySelectorAll("li[role=tab]").forEach((n, s) => {
            s === 0 ? n.classList.add("active") : n.classList.remove("active");
          }), i.querySelectorAll("a[data-tab-target]").forEach((n) => {
            if (!n.hasAttribute("title") || n.getAttribute("title") === "") {
              const s = l(n.textContent.trim());
              n.setAttribute("title", s);
            }
          });
      e.visitedItems.add(o);
    }
  });
}
function l(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function c(t) {
  const o = ["rounded", "api-column-tabs"];
  let a = t || {};
  return t && typeof t == "object" ? (a = { ...e.options, ...t }, o.includes(a.theme) || (a.theme = "api-column-tabs")) : a = { ...e.options }, a;
}
function m() {
  const t = document.createElement("style"), o = "/* Learnosity content tab styles */";
  t.setAttribute("data-style", "LT Content Tabs"), t.textContent = o.concat(`
`, b(e.options.theme)), document.head.append(t), e.renderedCss = !0;
}
function b(t) {
  const o = `/* Base tabs styles */
        .lrn.lrn-assess .lt__tabs,
        .lrn-author-item-content-wrapper .lt__tabs {
            container-type: inline-size;

            .lt__nav-tabs {
                display: flex;
                box-shadow: none;
                flex-wrap: nowrap;
                overflow: hidden;
                padding-top: 1px;

                li {
                    flex: 0 1 auto; /* don't grow, but shrink if needed */
                    border: 1px solid var(--tab-border);
                    border-top-left-radius: 10px;
                    border-top-right-radius: 10px;
                    margin-right: 6px;
                    background-color: var(--bg-grey);
                    box-shadow: none;
                    min-width: 0;

                    a {
                        text-decoration: none;
                        font-weight: bold;
                        color: var(--tab-color);
                        text-overflow: ellipsis;
                        white-space: nowrap;
                        display: block;
                        overflow: hidden;
                    }
                }

                li.active {
                    border-bottom: none;
                    background: var(--tab-bg-active);
                    color: var(--color-active);
                    border-bottom: none;
                }

                > li:after,
                .nav-tabs:after {
                    background: none;
                }
            }

            .lt__tab-content {
                border: 1px solid var(--tab-border);
                padding: 15px;
                margin-top: -1px; /* Fix for the tabs bottom border */

                .lt__guard {
                    user-select: none;
                    width: 0;
                    height: 0;
                    margin: 0;
                }

                .lt__tab-pane p:last-child {
                    margin-bottom: 0;
                }
            }

            .tab-content>.active {
                padding-top: 0;
            }
        }

        .lrn-author-item-content-wrapper .lt__tabs .lt__tab-pane {
            padding-top: 10px;
        }
    `;
  let a = "", r = "";
  switch (t || e.options.theme) {
    case "default":
    case "api-column-tabs":
      r = `
            /* API column tabs theme */
            :root {
                --tab-border: #d9d9d9;
                --tab-color: #333333;
            }`, a = `
            .lrn.lrn-assess .lt__tabs {
                .lt__nav-tabs {
                    overflow: initial;

                    li {
                        border: none;

                        a {
                            text-decoration: none;
                            font-weight: normal;
                        }
                    }
                }

                .nav-tabs {
                    -webkit-box-shadow: 0 4px 2px -2px rgba(0, 0, 0, .2);
                    box-shadow: 0 4px 2px -2px rgba(0, 0, 0, .2);
                    text-align: center;
                }

                .nav-tabs>li:after, .nav-tabs .nav-tab:after {
                    background: #1877b1;
                    border: none;
                    content: "";
                    display: block;
                    height: 2px;
                    outline: none;
                    transition: all .2s ease-in-out;
                    width: 100%;
                }

                .nav-tabs>li:focus-within {
                    outline: none;
                }

                .lt__tab-content {
                    border: none;
                    padding: 15px;
                    margin-top: -1px;
                }
            }`;
      break;
    case "rounded":
      r = `
            /* Rounded tabs theme */
            :root {
                --color-active: #333333;
                --customer-bg-blue: #e6f1ff;
                --bg-grey: #f0f0f0;
                --tab-bg-active: #ffffff;
                --tab-border: #d9d9d9;
                --tab-border-bottom: #eeeeee;
                --tab-color: inherit;
                --input-border: #898989;
            }`;
      break;
  }
  return r.concat(`
`, o, `
`, a);
}
const g = u("contentTabs", f, {
  escapeHTML: l,
  getTabsTheme: b,
  validateOptions: c
}), x = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  contentTabs: g
}, Symbol.toStringTag, { value: "Module" }));
export {
  g as a,
  x as c
};
