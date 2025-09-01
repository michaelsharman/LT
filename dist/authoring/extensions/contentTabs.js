import { contentTabs as u } from "../../assessment/extensions/contentTabs.js";
import { c as v, L as c } from "../../extensionsFactory-CJF5B414.js";
const s = {
  events: {
    keydownRegistered: !1
  },
  options: {
    theme: "default",
    maxTabs: 5
  }
};
function f(a) {
  s.options = u.validateOptions(a), document.querySelector(".lrn-author").classList.add("lt__contenttabs"), c.authorApp().on("widgetedit:editor:ready", () => {
    document.removeEventListener("keydown", p), s.events.keydownRegistered = !1;
  }), c.authorApp().on("widgetedit:preview:changed", _);
}
function m(a, t) {
  const e = `
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
  document.querySelector(".learnosity-question-editor").insertAdjacentHTML("beforeEnd", e);
  const l = [];
  l.push(document.querySelector("#lt__addTabs .lrn-qe-btn-default")), l.push(document.querySelector("#lt__addTabs .lrn-qe-modal-btn-close"));
  for (let n = 0; n < l.length; n++)
    l[n].addEventListener("click", () => (b("lt__addTabs"), t("")));
  document.querySelector("#lt__addTabs .lrn-qe-btn-primary").addEventListener("click", () => {
    const n = document.getElementById("numtabs").value;
    return b("lt__addTabs"), t(h(n));
  });
}
function _() {
  document.querySelectorAll(".lrn-qe-col-edit-inner .lt__nav-tabs li a").forEach((t) => {
    t.setAttribute("title", ""), t.setAttribute("contenteditable", "false"), t.addEventListener("focus", (e) => e.target.blur()), t.addEventListener("dblclick", (e) => {
      e.preventDefault();
      const l = window.prompt("Edit tab label:", t.textContent);
      l !== null && (t.textContent = l);
    });
  });
  const a = document.querySelector(".lrn-qe-col-edit-inner .lt__tab-content");
  a && (a.querySelectorAll(".lrn-qe-col-edit-inner .lt__tab-pane").forEach((t) => {
    if (!t.querySelector(".lt__guard")) {
      const e = document.createElement("p");
      e.className = "lt__guard", e.setAttribute("contenteditable", "false"), e.setAttribute("aria-hidden", "true"), e.setAttribute("tabindex", "-1"), e.innerHTML = "&#8204;", t.insertBefore(e, t.firstChild);
    }
  }), s.events.keydownRegistered || (document.addEventListener("keydown", p), s.events.keydownRegistered = !0));
}
function p(a) {
  if (a.key === "Backspace" && !!g()?.querySelector(".lt__tabs")) {
    const e = document.querySelector(".lrn-qe-col-edit-inner .lt__tab-content"), l = q(), o = e.querySelector(".lt__tab-pane.active");
    if (l === 0) {
      const n = window.getSelection();
      if (!(!n.isCollapsed && n.toString().length > 0) && (a.preventDefault(), o.firstChild)) {
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
function q() {
  const a = window.getSelection();
  if (!a.rangeCount)
    return 0;
  const t = a.getRangeAt(0);
  let e = t.startContainer.nodeType === Node.TEXT_NODE ? t.startContainer : t.startContainer.firstChild;
  if (!e)
    return 0;
  let l = t.startOffset;
  for (; e && e.previousSibling; )
    e = e.previousSibling, l += e.textContent.length;
  return l;
}
function g() {
  const a = window.getSelection();
  if (!a.rangeCount)
    return null;
  let t = a.getRangeAt(0).startContainer;
  return t.nodeType !== Node.ELEMENT_NODE && (t = t.parentElement), t.closest(".cke_editable");
}
function h(a) {
  let t = '<div class="tabs lt__tabs"><ul class="nav nav-tabs lt__nav-tabs" role="tablist">', e = ' class="active"', l = " active";
  const o = "_" + y();
  for (let n = 1; n <= a; n++)
    t += `<li role="presentation"${e} aria-controls="${n}${o}"><a role="tab" data-tab-target="[data-tab-id='${n}${o}']" data-toggle="tab" href="#">Tab ${n}</a></li>`, n === 1 && (e = "");
  t += '</ul><div class="tab-content lt__tab-content">';
  for (let n = 1; n <= a; n++)
    t += `<div class="tab-pane lt__tab-pane${l}" data-tab-id="${n}${o}" id="${n}${o}"><p>Tab ${n} content</p></div>`, n === 1 && (l = "");
  return t += "</div></div>", t;
}
function y() {
  return Math.floor(Math.random() * Date.now()).toString(36);
}
function b(a) {
  document.getElementById(a)?.remove();
}
function w() {
  return "".concat(
    u.getTabsTheme(s.options.theme).concat(
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
    )
  );
}
const E = v("contentTabs", f, {
  addContentTabs: m,
  getStyles: w
});
export {
  E as contentTabs
};
