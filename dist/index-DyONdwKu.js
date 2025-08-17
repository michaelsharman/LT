import { a as d } from "./app-BFYad37a.js";
import { c as p } from "./extensionsFactory-DRAOPv5d.js";
import y from "./logger.js";
import { i as v } from "./isSymbol-BPiEP3ls.js";
function L(t) {
  return t;
}
function E(t, e) {
  return t > e;
}
function _(t, e, s) {
  for (var i = -1, a = t.length; ++i < a; ) {
    var u = t[i], r = e(u);
    if (r != null && (c === void 0 ? r === r && !v(r) : s(r, c)))
      var c = r, o = u;
  }
  return o;
}
function f(t) {
  return t && t.length ? _(t, L, E) : void 0;
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
function S(t = {}) {
  n.renderedCss || (N(), n.renderedCss = !0), w(t), d().on("render:item", () => {
    n.columns.numTabsLeft = 2, n.columns.numTabsRight = 2, n.dirty = !1;
  }), d().on("navigate", () => {
    d().getItem() ? e() : setTimeout(e, 1500);
  });
  function e() {
    setTimeout(() => {
      if (["items/:reference/settings/:tab", "items/:reference/settings", void 0].includes(d().getLocation().route)) {
        const s = d().getLocation().location.split("/").pop();
        ["layout", "settings"].includes(s) && x();
      }
    }, 100);
  }
}
function x() {
  const t = document.querySelector('[data-authorapi-selector="lrn-author-tabs-col1"]'), e = document.querySelector('[data-authorapi-selector="lrn-author-tabs-col2"]'), s = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Left"]'), i = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Right"]'), a = document.getElementById("lt__nativeTabs-col1"), u = document.getElementById("lt__nativeTabs-col2"), r = document.querySelector('[data-authorapi-selector="lrn-author-apply-settings"]'), c = d().getItem(), o = k(c.item.definition);
  if (n.columns.numTabsLeft = f([o[0], n.columns.numTabsLeft]), n.columns.numTabsRight = f([o[1], n.columns.numTabsRight]), r) {
    if (!a && t && t.querySelector(".lrn-author-layout-content").insertAdjacentHTML("beforeend", b("col1", n.columns.numTabsLeft)), !u && e && e.querySelector(".lrn-author-layout-content").insertAdjacentHTML("beforeend", b("col2", n.columns.numTabsRight)), R(), r.addEventListener("click", () => {
      I(o);
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
    y.warn(`${n.logPrefix}Settings apply button not found`);
  function b(l, g) {
    return `
            <label class="lrn-author-checkbox-label" for="lt__nativeTabs-${l}">
                <span class="label-full">Number of tabs</span>
                <span class="label-short">Num tabs</span>
            </label>
            <div class="lrn-form-group">
                <input id="lt__nativeTabs-${l}" type="number" min="2" max="${n.options.maxTabs}" value="${g}" class="lrn-author-form-control lt__nativeTabsInput lrn-form-control lt__width-sm" disabled>
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
function k(t) {
  const e = [0, 0];
  function s(a) {
    let u = 0;
    function r(c) {
      if (Array.isArray(c))
        c.forEach(r);
      else if (typeof c == "object" && c !== null) {
        c.type === "tab" && u++;
        for (const o in c)
          c.hasOwnProperty(o) && r(c[o]);
      }
    }
    return r(a), u;
  }
  const i = t.regions?.filter((a) => a.type === "column") || [];
  for (let a = 0; a < 2; a++)
    i[a] && (e[a] = s(i[a]));
  return e;
}
function I(t) {
  const e = m();
  setTimeout(() => {
    const i = d().getItem(), a = i.item.definition;
    s(0, n.columns.numTabsLeft, e.leftEnabled, t[0], a), s(1, n.columns.numTabsRight, e.rightEnabled, t[1], a), i.item.definition = a, d().setItemJson(i);
  }, 100);
  function s(i, a, u, r, c) {
    if (a >= 2 && u) {
      const o = c.regions[i].regions[0].regions;
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
function R() {
  const t = document.getElementById("lt__nativeTabs-col1"), e = document.getElementById("lt__nativeTabs-col2");
  t.addEventListener("change", () => {
    n.columns.numTabsLeft = T(+t.value), n.dirty = !0, h();
  }), e.addEventListener("change", () => {
    n.columns.numTabsRight = T(+e.value), n.dirty = !0, h();
  });
}
function T(t) {
  return t < 2 ? 2 : t > n.options.maxTabs ? n.options.maxTabs : t;
}
function w(t) {
  ["maxTabs"].forEach((e) => {
    typeof t?.[e] == "number" && t?.[e] >= 2 && t?.[e] <= 10 && (n.options[e] = t[e]);
  });
}
function N() {
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
const q = p("nativeTabs", S), O = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  nativeTabs: q
}, Symbol.toStringTag, { value: "Module" }));
export {
  q as a,
  O as n
};
