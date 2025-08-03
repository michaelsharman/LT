import { a as d } from "./app-CxUsV76e.js";
import p from "./logger.js";
import { i as y } from "./isSymbol-BPiEP3ls.js";
function v(t) {
  return t;
}
function L(t, e) {
  return t > e;
}
function E(t, e, s) {
  for (var i = -1, a = t.length; ++i < a; ) {
    var c = t[i], r = e(c);
    if (r != null && (u === void 0 ? r === r && !y(r) : s(r, u)))
      var u = r, o = c;
  }
  return o;
}
function f(t) {
  return t && t.length ? E(t, v, L) : void 0;
}
const n = {
  columns: {
    numTabsLeft: 2,
    numTabsRight: 2
  },
  dirty: !1,
  logPrefix: "LT Native Tabs: ",
  options: {
    maxTabs: 5
  },
  renderedCss: !1
};
function _(t = {}) {
  n.renderedCss || w(), R(t), d().on("render:item", () => {
    n.columns.numTabsLeft = 2, n.columns.numTabsRight = 2, n.dirty = !1;
  }), d().on("navigate", () => {
    d().getItem() ? e() : setTimeout(e, 1500);
  });
  function e() {
    setTimeout(() => {
      if (["items/:reference/settings/:tab", "items/:reference/settings", void 0].includes(d().getLocation().route)) {
        const s = d().getLocation().location.split("/").pop();
        ["layout", "settings"].includes(s) && S();
      }
    }, 100);
  }
}
function S() {
  const t = document.querySelector('[data-authorapi-selector="lrn-author-tabs-col1"]'), e = document.querySelector('[data-authorapi-selector="lrn-author-tabs-col2"]'), s = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Left"]'), i = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Right"]'), a = document.getElementById("lt__nativeTabs-col1"), c = document.getElementById("lt__nativeTabs-col2"), r = document.querySelector('[data-authorapi-selector="lrn-author-apply-settings"]'), u = d().getItem(), o = x(u.item.definition);
  if (n.columns.numTabsLeft = f([o[0], n.columns.numTabsLeft]), n.columns.numTabsRight = f([o[1], n.columns.numTabsRight]), r) {
    if (!a && t && t.querySelector(".lrn-author-layout-content").insertAdjacentHTML("beforeend", b("col1", n.columns.numTabsLeft)), !c && e && e.querySelector(".lrn-author-layout-content").insertAdjacentHTML("beforeend", b("col2", n.columns.numTabsRight)), I(), r.addEventListener("click", () => {
      k(o);
    }), !s.hasAttribute("data-lt-event")) {
      const l = document.getElementById("lt__nativeTabs-col1");
      l.disabled = !m().leftEnabled, s.addEventListener("change", () => {
        l.disabled = !m().leftEnabled;
      }), s.setAttribute("data-lt-event", "true");
    }
    if (!i.hasAttribute("data-lt-event")) {
      const l = document.getElementById("lt__nativeTabs-col2");
      l.disabled = !m().rightEnabled, i.addEventListener("change", () => {
        l.disabled = !m().rightEnabled;
      }), i.setAttribute("data-lt-event", "true");
    }
  } else
    p.warn(`${n.logPrefix}Settings apply button not found`);
  function b(l, T) {
    return `
            <label class="lrn-author-checkbox-label" for="lt__nativeTabs-${l}">
                <span class="label-full">Number of tabs</span>
                <span class="label-short">Num tabs</span>
            </label>
            <div class="lrn-form-group">
                <input id="lt__nativeTabs-${l}" type="number" min="2" max="${n.options.maxTabs}" value="${T}" class="lrn-author-form-control lt__nativeTabsInput lrn-form-control lt__width-sm" disabled>
            </div>
        `;
  }
}
function h() {
  if (n.dirty) {
    const t = document.querySelector('[data-authorapi-selector="lrn-author-apply-settings"]');
    if (t && t.disabled) {
      const e = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Left"]'), s = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Right"]');
      if (e.checked) {
        e.click(), e.click();
        return;
      }
      s.checked && (s.click(), s.click());
    }
  }
}
function m() {
  const t = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Left"]'), e = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Right"]');
  return t.checked || (n.columns.numTabsLeft = 2), e.checked || (n.columns.numTabsRight = 2), {
    leftEnabled: t.checked,
    rightEnabled: e.checked
  };
}
function x(t) {
  const e = [0, 0];
  function s(a) {
    let c = 0;
    function r(u) {
      if (Array.isArray(u))
        u.forEach(r);
      else if (typeof u == "object" && u !== null) {
        u.type === "tab" && c++;
        for (const o in u)
          u.hasOwnProperty(o) && r(u[o]);
      }
    }
    return r(a), c;
  }
  const i = t.regions?.filter((a) => a.type === "column") || [];
  for (let a = 0; a < 2; a++)
    i[a] && (e[a] = s(i[a]));
  return e;
}
function k(t) {
  const e = m();
  setTimeout(() => {
    const i = d().getItem(), a = i.item.definition;
    s(0, n.columns.numTabsLeft, e.leftEnabled, t[0], a), s(1, n.columns.numTabsRight, e.rightEnabled, t[1], a), i.item.definition = a, d().setItemJson(i);
  }, 100);
  function s(i, a, c, r, u) {
    if (a >= 2 && c) {
      const o = u.regions[i].regions[0].regions;
      if (a < o.length) {
        const b = o.length - a;
        for (let l = o.length; l > o.length - b; l--)
          o[l - 1].hasOwnProperty("widgets") && (o[0].hasOwnProperty("widgets") ? o[0].widgets.push(o[l - 1].widgets) : o[0].widgets = o[l - 1].widgets);
        o.splice(-b);
      } else {
        const b = (r || 2) + 1;
        for (let l = b; l <= a; l++)
          o.push({
            label: `Tab ${l}`,
            type: "tab"
          });
      }
    }
  }
}
function I() {
  const t = document.getElementById("lt__nativeTabs-col1"), e = document.getElementById("lt__nativeTabs-col2");
  t.addEventListener("change", () => {
    n.columns.numTabsLeft = g(+t.value), n.dirty = !0, h();
  }), e.addEventListener("change", () => {
    n.columns.numTabsRight = g(+e.value), n.dirty = !0, h();
  });
}
function g(t) {
  return t < 2 ? 2 : t > n.options.maxTabs ? n.options.maxTabs : t;
}
function R(t) {
  ["maxTabs"].forEach((e) => {
    typeof t?.[e] == "number" && t?.[e] >= 2 && t?.[e] <= 10 && (n.options[e] = t[e]);
  });
}
function w() {
  const t = document.createElement("style"), e = `
/* Learnosity native tab styles */
.lrn .lrn-author-ui,
.lrn.lrn-author {
    .lrn-author-api-react-container .lrn-author-item-settings .lrn-author-layout-settings .lrn-author-layout-tab .lrn-author-layout-content,
    .lrn-author-api-react-container .lrn-author-activity-labels .lrn-author-layout-settings .lrn-author-layout-tab .lrn-author-layout-content {
        padding: 9px;
    }

    .lrn-form-control.lt__width-sm,
    .lrn-author-form-control.lt__nativeTabsInput {
        width: 80px;
    }

    .lrn-author-checkbox-label {
        padding-bottom: .5714285714em;
    }

    [data-authorapi-selector="lrn-author-tabs-col1"],
    [data-authorapi-selector="lrn-author-tabs-col2"] {
        .lrn-author-layout-content {
            container-type: inline-size;

            .label-short {
                display: none;
            }

            @container (max-width: 120px) {
                .label-full {
                    display: none;
                }

                .label-short {
                    display: inline;
                }
            }
        }
    }
}
`;
  t.setAttribute("data-style", "LT Native Tabs"), t.textContent = e, document.head.append(t), n.renderedCss = !0;
}
const j = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: _
}, Symbol.toStringTag, { value: "Module" }));
export {
  j as n,
  _ as r
};
