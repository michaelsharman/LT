import { c as T, L as b } from "../../extensionsFactory-CJF5B414.js";
import { i as y } from "../../isSymbol-BPiEP3ls.js";
function L(t) {
  return t;
}
function v(t, e) {
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
function h(t) {
  return t && t.length ? E(t, L, v) : void 0;
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
  }
};
function _(t = {}) {
  R(t), b.authorApp().on("render:item", () => {
    n.columns.numTabsLeft = 2, n.columns.numTabsRight = 2, n.dirty = !1;
  }), b.authorApp().on("navigate", () => {
    b.authorApp().getItem() ? e() : setTimeout(e, 1500);
  });
  function e() {
    setTimeout(() => {
      if (["items/:reference/settings/:tab", "items/:reference/settings", void 0].includes(b.authorApp().getLocation().route)) {
        const s = b.authorApp().getLocation().location.split("/").pop();
        ["layout", "settings"].includes(s) && x();
      }
    }, 100);
  }
}
function x() {
  const t = document.querySelector('[data-authorapi-selector="lrn-author-tabs-col1"]'), e = document.querySelector('[data-authorapi-selector="lrn-author-tabs-col2"]'), s = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Left"]'), i = document.querySelector('[data-authorapi-selector="itemLayoutTabLabel - Right"]'), a = document.getElementById("lt__nativeTabs-col1"), c = document.getElementById("lt__nativeTabs-col2"), r = document.querySelector('[data-authorapi-selector="lrn-author-apply-settings"]'), u = b.authorApp().getItem(), o = A(u.item.definition);
  if (n.columns.numTabsLeft = h([o[0], n.columns.numTabsLeft]), n.columns.numTabsRight = h([o[1], n.columns.numTabsRight]), r) {
    if (!a && t && t.querySelector(".lrn-author-layout-content").insertAdjacentHTML("beforeend", d("col1", n.columns.numTabsLeft)), !c && e && e.querySelector(".lrn-author-layout-content").insertAdjacentHTML("beforeend", d("col2", n.columns.numTabsRight)), k(), r.addEventListener("click", () => {
      S(o);
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
    b.utils.logger.warn(`${n.logPrefix}Settings apply button not found`);
  function d(l, g) {
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
function f() {
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
function A(t) {
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
function S(t) {
  const e = m();
  setTimeout(() => {
    const i = b.authorApp().getItem(), a = i.item.definition;
    s(0, n.columns.numTabsLeft, e.leftEnabled, t[0], a), s(1, n.columns.numTabsRight, e.rightEnabled, t[1], a), i.item.definition = a, b.authorApp().setItemJson(i);
  }, 100);
  function s(i, a, c, r, u) {
    if (a >= 2 && c) {
      const o = u.regions[i].regions[0].regions;
      if (a < o.length) {
        const d = o.length - a;
        for (let l = o.length; l > o.length - d; l--)
          o[l - 1].hasOwnProperty("widgets") && (o[0].hasOwnProperty("widgets") ? o[0].widgets.push(o[l - 1].widgets) : o[0].widgets = o[l - 1].widgets);
        o.splice(-d);
      } else {
        const d = (r || 2) + 1;
        for (let l = d; l <= a; l++)
          o.push({
            label: `Tab ${l}`,
            type: "tab"
          });
      }
    }
  }
}
function k() {
  const t = document.getElementById("lt__nativeTabs-col1"), e = document.getElementById("lt__nativeTabs-col2");
  t.addEventListener("change", () => {
    n.columns.numTabsLeft = p(+t.value), n.dirty = !0, f();
  }), e.addEventListener("change", () => {
    n.columns.numTabsRight = p(+e.value), n.dirty = !0, f();
  });
}
function p(t) {
  return t < 2 ? 2 : t > n.options.maxTabs ? n.options.maxTabs : t;
}
function R(t) {
  ["maxTabs"].forEach((e) => {
    typeof t?.[e] == "number" && t?.[e] >= 2 && t?.[e] <= 10 && (n.options[e] = t[e]);
  });
}
function w() {
  return `
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
}
const N = T("nativeTabs", _, {
  getStyles: w
});
export {
  N as nativeTabs
};
