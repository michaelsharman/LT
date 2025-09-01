import { c as p, L as l } from "../../extensionsFactory-CJF5B414.js";
const r = {
  options: {
    theme: "api-column-tabs"
  },
  visitedItems: /* @__PURE__ */ new Set()
};
function u(t = {}) {
  r.options = c(t), l.itemsApp().on("item:load", () => {
    const o = l.itemReference();
    if (!r.visitedItems.has(o)) {
      const n = document.querySelector(`div[data-reference="${o}"]`).querySelectorAll("ul.lt__nav-tabs");
      if (n)
        for (const s of n)
          s.querySelectorAll("li[role=tab]").forEach((a, i) => {
            i === 0 ? a.classList.add("active") : a.classList.remove("active");
          }), s.querySelectorAll("a[data-tab-target]").forEach((a) => {
            if (!a.hasAttribute("title") || a.getAttribute("title") === "") {
              const i = b(a.textContent.trim());
              a.setAttribute("title", i);
            }
          });
      r.visitedItems.add(o);
    }
  });
}
function b(t) {
  return t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function c(t) {
  const o = ["rounded", "api-column-tabs"], e = {};
  return t && typeof t == "object" && o.includes(t.theme) ? e.theme = t.theme : e.theme = "api-column-tabs", e;
}
function f() {
  return "/* Learnosity content tab styles */".concat(`
`, d(r.options.theme));
}
function d(t) {
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
  let e = "", n = "";
  switch (t || r.options.theme) {
    case "default":
    case "api-column-tabs":
      n = `
            /* API column tabs theme */
            :root {
                --tab-border: #d9d9d9;
                --tab-color: #333333;
            }`, e = `
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
      n = `
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
  return n.concat(`
`, o, `
`, e);
}
const g = p("contentTabs", u, {
  getStyles: f,
  escapeHTML: b,
  getTabsTheme: d,
  validateOptions: c
});
export {
  g as contentTabs
};
