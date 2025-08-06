import { a as c } from "./app-Cp7l631V.js";
import { v as p, g as v } from "./index-D4k4NeBN.js";
const s = {
  events: {
    keydownRegistered: !1
  },
  options: {
    theme: "default",
    maxTabs: 5
  },
  renderedCss: !1
};
function f(n) {
  s.options = p(n), s.renderedCss || w(), document.querySelector(".lrn-author").classList.add("lt__contenttabs"), c().on("widgetedit:editor:ready", () => {
    document.removeEventListener("keydown", u), s.events.keydownRegistered = !1;
  }), c().on("widgetedit:preview:changed", _);
}
function m(n, e) {
  const t = `
    <div class="lrn-qe lrn-qe-modal" style="display: block;" id="lt__addTabs">
        <div class="lrn-qe-ui">
            <div class="lrn-qe-modal-dialog">
                <div class="lrn-qe-modal-dialog-inner">
                    <div class="lrn-qe-modal-header">
                        <div class="lrn-qe-form-label lrn-qe-h4 lrn-qe-section-header">
                            <h4 class="lrn-qe-heading"><label class="lrn-qe-label lrn-qe-form-label-name">Choose number of tabs</label></h4>
                        </div>
                        <button type="button" class="lrn-qe-btn lrn-qe-modal-btn-close" aria-label="Close" tabindex="0">
                            <span class="lrn-qe-sr-only">Close</span>
                            <span aria-role="presentation" class="lrn-qe-i-cross"></span>
                        </button>
                    </div>
                    <div data-lrn-qe-selector="modal-outlet">
                        <div class="lrn-qe-modal-content" data-lrn-qe-modal-section="content">
                            <div class="lrn-qe-edit-aria-label">
                                <div class="lrn-qe-form-group-wrapper">
                                    <label class="lrn-qe-label lrn-qe-form-label" for="numtabs">Number of tabs</label>
                                    <input class="lrn-qe-input lrn-qe-form-control" type="number" id="numtabs" value="2" min="1" max="${s.options.maxTabs}" required>
                                </div>
                            </div>
                        </div>
                        <div class="lrn-qe-modal-footer">
                            <ul class="lrn-qe-ul">
                                <li class="lrn-qe-li lrn-qe-modal-footer-item">
                                    <button type="button" class="lrn-qe-btn lrn-qe-btn-default"><span>Cancel</span></button>
                                </li>&nbsp;
                                <li class="lrn-qe-li lrn-qe-modal-footer-item">
                                    <button type="button" class="lrn-qe-btn lrn-qe-btn-primary" data-lrn-qe-modal-action="confirm"><span>Add tabs</span></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
  document.querySelector(".learnosity-question-editor").insertAdjacentHTML("beforeEnd", t);
  const l = [];
  l.push(document.querySelector("#lt__addTabs .lrn-qe-btn-default")), l.push(document.querySelector("#lt__addTabs .lrn-qe-modal-btn-close"));
  for (let a = 0; a < l.length; a++)
    l[a].addEventListener("click", () => (b("lt__addTabs"), e("")));
  document.querySelector("#lt__addTabs .lrn-qe-btn-primary").addEventListener("click", () => {
    const a = document.getElementById("numtabs").value;
    return b("lt__addTabs"), e(h(a));
  });
}
function _() {
  document.querySelectorAll(".lrn-qe-col-edit-inner .lt__nav-tabs li a").forEach((e) => {
    e.setAttribute("title", ""), e.setAttribute("contenteditable", "false"), e.addEventListener("focus", (t) => t.target.blur()), e.addEventListener("dblclick", (t) => {
      t.preventDefault();
      const l = window.prompt("Edit tab label:", e.textContent);
      l !== null && (e.textContent = l);
    });
  });
  const n = document.querySelector(".lrn-qe-col-edit-inner .lt__tab-content");
  n && (n.querySelectorAll(".lrn-qe-col-edit-inner .lt__tab-pane").forEach((e) => {
    if (!e.querySelector(".lt__guard")) {
      const t = document.createElement("p");
      t.className = "lt__guard", t.setAttribute("contenteditable", "false"), t.setAttribute("aria-hidden", "true"), t.setAttribute("tabindex", "-1"), t.innerHTML = "&#8204;", e.insertBefore(t, e.firstChild);
    }
  }), s.events.keydownRegistered || (document.addEventListener("keydown", u), s.events.keydownRegistered = !0));
}
function u(n) {
  if (n.key === "Backspace" && !!q()?.querySelector(".lt__tabs")) {
    const t = document.querySelector(".lrn-qe-col-edit-inner .lt__tab-content"), l = g(), o = t.querySelector(".lt__tab-pane.active");
    if (l === 0) {
      const a = window.getSelection();
      if (!(!a.isCollapsed && a.toString().length > 0) && (n.preventDefault(), o.firstChild)) {
        const r = document.createTextNode("​");
        o.appendChild(r);
        const i = document.createRange();
        i.setStart(r, r.textContent.length), i.collapse(!0);
        const d = window.getSelection();
        d.removeAllRanges(), d.addRange(i);
      }
    }
  }
}
function g() {
  const n = window.getSelection();
  if (!n.rangeCount)
    return 0;
  const e = n.getRangeAt(0);
  let t = e.startContainer.nodeType === Node.TEXT_NODE ? e.startContainer : e.startContainer.firstChild;
  if (!t)
    return 0;
  let l = e.startOffset;
  for (; t && t.previousSibling; )
    t = t.previousSibling, l += t.textContent.length;
  return l;
}
function q() {
  const n = window.getSelection();
  if (!n.rangeCount)
    return null;
  let e = n.getRangeAt(0).startContainer;
  return e.nodeType !== Node.ELEMENT_NODE && (e = e.parentElement), e.closest(".cke_editable");
}
function h(n) {
  let e = '<div class="tabs lt__tabs"><ul class="nav nav-tabs lt__nav-tabs" role="tablist">', t = ' class="active"', l = " active";
  const o = "_" + y();
  for (let a = 1; a <= n; a++)
    e += `<li role="presentation"${t} aria-controls="${a}${o}"><a role="tab" data-tab-target="[data-tab-id='${a}${o}']" data-toggle="tab" href="#">Tab ${a}</a></li>`, a === 1 && (t = "");
  e += '</ul><div class="tab-content lt__tab-content">';
  for (let a = 1; a <= n; a++)
    e += `<div class="tab-pane lt__tab-pane${l}" data-tab-id="${a}${o}" id="${a}${o}"><p>Tab ${a} content</p></div>`, a === 1 && (l = "");
  return e += "</div></div>", e;
}
function y() {
  return Math.floor(Math.random() * Date.now()).toString(36);
}
function b(n) {
  document.getElementById(n)?.remove();
}
function w() {
  const n = document.createElement("style"), e = v(s.options.theme).concat(
    `
`,
    `/* Learnosity content tab authoring styles */
        .lrn.lrn-author .lrn-author-item-content-wrapper .lrn-qe-col-edit-inner {
            .lt__tabs.nav-tabs>li>a,
            .lt__tabs.nav-tabs>li>a:focus,
            .lt__tabs.nav-tabs>li.active>a,
            .lt__tabs.nav-tabs>li.active>a:hover,
            .lt__tabs.nav-tabs>li.active>a:focus {
                cursor: pointer;
            }

            .lrn-qe-form-el-wrapper .lt__tabs.nav-tabs>li>a {
                position: relative; /* Needed so that the pseudo-element is positioned relative to the <a> */
                cursor: pointer;
            }

            .lt__tabs .lt__nav-tabs {
                overflow: visible;
                border-bottom: 1px solid transparent;

                > li > a {
                    overflow: visible;
                }
            }

            /* Tooltip text */
            .lt__nav-tabs.nav-tabs > li > a::after {
                content: "Double‑click to edit label";
                position: absolute;
                bottom: 65%;
                left: 110%;
                transform: translateX(-50%);
                background-color: rgba(0, 0, 0, 0.8);
                color: #fff;
                padding: 4px 8px;
                border-radius: 4px;
                font-size: 12px;
                white-space: nowrap;
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
                pointer-events: none;
                z-index: 100;
                display: block; /* Ensure block-level display */
            }

            /* Tooltip arrow */
            .lt__nav-tabs.nav-tabs > li > a::before {
                content: "";
                position: absolute;
                display: block; /* Ensure it shows up */
                bottom: calc(120% - 5px); /* Adjust so the arrow is just below the tooltip */
                left: 85%;
                bottom: calc(65% - 5px);
                transform: translateX(-50%);
                width: 0;
                height: 0;
                border-left: 5px solid transparent;
                border-right: 5px solid transparent;
                border-top: 5px solid rgba(0, 0, 0, 0.8);
                opacity: 0;
                visibility: hidden;
                transition: opacity 0.2s ease-in-out, visibility 0.2s ease-in-out;
                pointer-events: none;
                z-index: 100;
            }

            /* Show tooltip on hover */
            .lt__nav-tabs.nav-tabs > li > a:hover::after,
            .lt__nav-tabs.nav-tabs > li > a:hover::before {
                opacity: 1;
                visibility: visible;
            }
        }
    `
  );
  n.setAttribute("data-style", "LT Content Tabs"), n.textContent = e, document.head.append(n), s.renderedCss = !0;
}
const E = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addContentTabs: m,
  run: f
}, Symbol.toStringTag, { value: "Module" }));
export {
  m as a,
  E as c,
  f as r
};
