import { a as ie } from "../../_commonjsHelpers-DQNKXVTB.js";
import { c as se, L as T } from "../../extensionsFactory-BHOEyOSK.js";
function ae(n, p) {
  for (var s = 0; s < p.length; s++) {
    const o = p[s];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const a in o)
        if (a !== "default" && !(a in n)) {
          const b = Object.getOwnPropertyDescriptor(o, a);
          b && Object.defineProperty(n, a, b.get ? b : {
            enumerable: !0,
            get: () => o[a]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var F = { exports: {} }, ce = F.exports, X;
function le() {
  return X || (X = 1, (function(n, p) {
    (function(s, o) {
      n.exports = o();
    })(ce, function() {
      function s(c, _) {
        var M = window.matchMedia(c);
        _(M.matches);
        var O = function() {
          return _(M.matches);
        };
        return M.addListener(O), function() {
          return M.removeListener(O);
        };
      }
      function o(c, _) {
        return e[c] !== _ && (e[c] = _, k(c, _), !0);
      }
      var a = typeof navigator < "u" && typeof window < "u";
      if (a && typeof nw < "u") try {
        nw.Window.get();
      } catch {
        a = !1;
      }
      var b = !a, u = a ? navigator.userAgent : void 0, e = { gui: a, terminal: b, registerQuery: s };
      e.node = typeof process < "u" && !!process.versions && !!process.versions.node, e.pwa = e.gui && window.matchMedia("(display-mode: standalone)").matches && document.head.querySelector('[rel="manifest"]') !== null, e.uwp = typeof Windows < "u" && typeof MSApp < "u", e.nwjs = !(!e.node || !process.versions.nw), e.electron = !(!e.node || !process.versions.electron), e.cordova = !(!e.gui || !window.cordova), e.packaged = e.uwp || e.nwjs || e.electron || e.cordova, e.web = !e.node && !e.packaged, e.browser = e.web, e.website = e.web && !e.pwa, e.worker = !e.gui && typeof self < "u" && self.importScripts !== void 0, e.serviceWorker = e.worker && !!navigator.serviceWorker.controller || !1, e.android = !!e.gui && u.includes("Android"), e.chromeos = !!e.gui && u.includes("CrOS"), e.tizen = !!e.gui && u.includes("Tizen"), e.ios = e.gui && /iPad|iPhone|iPod/.test(u) && !window.MSStream || !1, e.linuxBased = e.android || e.tizen, e.windows = e.node ? process.platform === "win32" : u.includes("Windows"), e.macos = e.node ? process.platform === "darwin" : u.includes("Macintosh"), e.linux = e.node ? process.platform === "linux" : u.includes("Linux") && !e.linuxBased && !e.macos, e.edgeHtml = e.gui && u.includes("Edge/"), e.edgeChromium = e.gui && u.includes("Edg/"), e.edgeAndroid = e.gui && u.includes("EdgA/"), e.edgeIos = e.gui && u.includes("EdgiOS/"), e.chromeIos = e.gui && u.includes("CriOS/"), e.firefoxIos = e.gui && u.includes("FxiOS/"), e.edge = e.edgeHtml || e.edgeChromium || e.edgeAndroid || e.edgeIos, e.samsungBrowser = e.gui && u.includes("SamsungBrowser/"), e.opera = e.gui && (u.includes("Opera") || u.includes("OPR/")), e.firefox = e.gui && (u.includes("Firefox") || e.firefoxIos), e.chrome = e.gui && (u.includes("Chrome") || e.chromeIos) && !e.edge && !e.opera && !e.samsungBrowser, e.safari = e.gui && u.includes("Safari") && !e.chrome && !e.edge && !e.firefox && !e.opera && !e.samsungBrowser || e.edgeIos || e.chromeIos || e.firefoxIos, e.ie = e.trident = e.gui && u.includes("Trident"), e.blink = e.chrome && !e.chromeIos || e.edgeChromium || e.edgeAndroid || e.samsungBrowser, e.webkit = e.blink || e.safari, e.gecko = e.firefox && !e.firefoxIos && !e.webkit && !e.safari;
      var x = {};
      e.on = function(c, _) {
        x[c] = x[c] || /* @__PURE__ */ new Set(), x[c].add(_);
      }, e.off = e.removeListener = function(c, _) {
        x[c] && x[c].delete(_);
      };
      var k = e.emit = function(c, _) {
        x[c] && x[c].forEach(function(M) {
          return M(_);
        });
      };
      if (e.gui) {
        e.pixelRatio = parseFloat(window.devicePixelRatio.toFixed(2)), e.gameconsole = u.includes("Xbox") || u.includes("PlayStation");
        var A = 0;
        if (window.addEventListener("gamepadconnected", function(c) {
          return A++;
        }), window.addEventListener("gamepaddisconnected", function(c) {
          return A--;
        }), e.gameconsole) e.gamepad = !0, e.mouse = !0, e.touch = !1, e.tv = !0, e.battery = !1, e.phone = e.tablet = e.hybrid = e.laptop = e.desktop = !1, e.formfactor = "gameconsole";
        else {
          var L = function() {
            o("tv", e.formfactor === "tv"), o("phone", e.formfactor === "phone"), o("tablet", e.formfactor === "tablet"), o("hybrid", e.formfactor === "hybrid"), o("laptop", e.formfactor === "laptop"), o("desktop", e.formfactor === "desktop");
          }, K = function() {
            var c = Math.min(window.screen.width, window.screen.height);
            return e.tv ? "tv" : e.touch && c < 600 ? "phone" : e.touch && !e.mouse ? "tablet" : e.touch && e.mouse ? "hybrid" : e.battery ? "laptop" : "desktop";
          };
          e.touch = navigator.maxTouchPoints > 0, e.tv = u.includes("TV"), A = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(function(c) {
            return c != null;
          }).length : 0, e.gamepad = A > 0, s("(orientation: portrait)", function(c) {
            e.portrait = c, e.landscape = !c, e.orientation = c ? "portrait" : "landscape", k("portrait", e.portrait), k("landscape", e.landscape), k("orientation", e.orientation);
          }), s("(any-pointer: coarse)", function(c) {
            o("touch", c), o("formfactor", K()) && L();
          }), s("(hover: hover)", function(c) {
            o("mouse", c), o("input", c ? "mouse" : "touch"), o("formfactor", K()) && L();
          });
        }
      }
      return e.csp = e.uwp || !1, e.nwjs ? e.dev = process.versions["nw-flavor"] === "sdk" : e.electron ? e.dev = process.execPath.replace(/\\/g, "/").includes("node_modules/electron/") : e.uwp ? e.dev = Windows.ApplicationModel.Package.current.isDevelopmentMode : e.node ? e.dev = process.env.NODE_ENV !== "production" : e.dev = void 0, e;
    });
  })(F)), F.exports;
}
var U = le();
const fe = /* @__PURE__ */ ie(U), ue = /* @__PURE__ */ ae({
  __proto__: null,
  default: fe
}, [U]);
var W = { exports: {} }, G;
function de() {
  return G || (G = 1, (function(n) {
    (function(p, s, o) {
      if (!p)
        return;
      for (var a = {
        8: "backspace",
        9: "tab",
        13: "enter",
        16: "shift",
        17: "ctrl",
        18: "alt",
        20: "capslock",
        27: "esc",
        32: "space",
        33: "pageup",
        34: "pagedown",
        35: "end",
        36: "home",
        37: "left",
        38: "up",
        39: "right",
        40: "down",
        45: "ins",
        46: "del",
        91: "meta",
        93: "meta",
        224: "meta"
      }, b = {
        106: "*",
        107: "+",
        109: "-",
        110: ".",
        111: "/",
        186: ";",
        187: "=",
        188: ",",
        189: "-",
        190: ".",
        191: "/",
        192: "`",
        219: "[",
        220: "\\",
        221: "]",
        222: "'"
      }, u = {
        "~": "`",
        "!": "1",
        "@": "2",
        "#": "3",
        $: "4",
        "%": "5",
        "^": "6",
        "&": "7",
        "*": "8",
        "(": "9",
        ")": "0",
        _: "-",
        "+": "=",
        ":": ";",
        '"': "'",
        "<": ",",
        ">": ".",
        "?": "/",
        "|": "\\"
      }, e = {
        option: "alt",
        command: "meta",
        return: "enter",
        escape: "esc",
        plus: "+",
        mod: /Mac|iPod|iPhone|iPad/.test(navigator.platform) ? "meta" : "ctrl"
      }, x, k = 1; k < 20; ++k)
        a[111 + k] = "f" + k;
      for (k = 0; k <= 9; ++k)
        a[k + 96] = k.toString();
      function A(t, r, l) {
        if (t.addEventListener) {
          t.addEventListener(r, l, !1);
          return;
        }
        t.attachEvent("on" + r, l);
      }
      function L(t) {
        if (t.type == "keypress") {
          var r = String.fromCharCode(t.which);
          return t.shiftKey || (r = r.toLowerCase()), r;
        }
        return a[t.which] ? a[t.which] : b[t.which] ? b[t.which] : String.fromCharCode(t.which).toLowerCase();
      }
      function K(t, r) {
        return t.sort().join(",") === r.sort().join(",");
      }
      function c(t) {
        var r = [];
        return t.shiftKey && r.push("shift"), t.altKey && r.push("alt"), t.ctrlKey && r.push("ctrl"), t.metaKey && r.push("meta"), r;
      }
      function _(t) {
        if (t.preventDefault) {
          t.preventDefault();
          return;
        }
        t.returnValue = !1;
      }
      function M(t) {
        if (t.stopPropagation) {
          t.stopPropagation();
          return;
        }
        t.cancelBubble = !0;
      }
      function O(t) {
        return t == "shift" || t == "ctrl" || t == "alt" || t == "meta";
      }
      function J() {
        if (!x) {
          x = {};
          for (var t in a)
            t > 95 && t < 112 || a.hasOwnProperty(t) && (x[a[t]] = t);
        }
        return x;
      }
      function Z(t, r, l) {
        return l || (l = J()[t] ? "keydown" : "keypress"), l == "keypress" && r.length && (l = "keydown"), l;
      }
      function ee(t) {
        return t === "+" ? ["+"] : (t = t.replace(/\+{2}/g, "+plus"), t.split("+"));
      }
      function z(t, r) {
        var l, v, q, C = [];
        for (l = ee(t), q = 0; q < l.length; ++q)
          v = l[q], e[v] && (v = e[v]), r && r != "keypress" && u[v] && (v = u[v], C.push("shift")), O(v) && C.push(v);
        return r = Z(v, C, r), {
          key: v,
          modifiers: C,
          action: r
        };
      }
      function V(t, r) {
        return t === null || t === s ? !1 : t === r ? !0 : V(t.parentNode, r);
      }
      function w(t) {
        var r = this;
        if (t = t || s, !(r instanceof w))
          return new w(t);
        r.target = t, r._callbacks = {}, r._directMap = {};
        var l = {}, v, q = !1, C = !1, B = !1;
        function N(i) {
          i = i || {};
          var d = !1, g;
          for (g in l) {
            if (i[g]) {
              d = !0;
              continue;
            }
            l[g] = 0;
          }
          d || (B = !1);
        }
        function $(i, d, g, f, h, S) {
          var m, y, I = [], P = g.type;
          if (!r._callbacks[i])
            return [];
          for (P == "keyup" && O(i) && (d = [i]), m = 0; m < r._callbacks[i].length; ++m)
            if (y = r._callbacks[i][m], !(!f && y.seq && l[y.seq] != y.level) && P == y.action && (P == "keypress" && !g.metaKey && !g.ctrlKey || K(d, y.modifiers))) {
              var ne = !f && y.combo == h, oe = f && y.seq == f && y.level == S;
              (ne || oe) && r._callbacks[i].splice(m, 1), I.push(y);
            }
          return I;
        }
        function R(i, d, g, f) {
          r.stopCallback(d, d.target || d.srcElement, g, f) || i(d, g) === !1 && (_(d), M(d));
        }
        r._handleKey = function(i, d, g) {
          var f = $(i, d, g), h, S = {}, m = 0, y = !1;
          for (h = 0; h < f.length; ++h)
            f[h].seq && (m = Math.max(m, f[h].level));
          for (h = 0; h < f.length; ++h) {
            if (f[h].seq) {
              if (f[h].level != m)
                continue;
              y = !0, S[f[h].seq] = 1, R(f[h].callback, g, f[h].combo, f[h].seq);
              continue;
            }
            y || R(f[h].callback, g, f[h].combo);
          }
          var I = g.type == "keypress" && C;
          g.type == B && !O(i) && !I && N(S), C = y && g.type == "keydown";
        };
        function j(i) {
          typeof i.which != "number" && (i.which = i.keyCode);
          var d = L(i);
          if (d) {
            if (i.type == "keyup" && q === d) {
              q = !1;
              return;
            }
            r.handleKey(d, c(i), i);
          }
        }
        function te() {
          clearTimeout(v), v = setTimeout(N, 1e3);
        }
        function re(i, d, g, f) {
          l[i] = 0;
          function h(P) {
            return function() {
              B = P, ++l[i], te();
            };
          }
          function S(P) {
            R(g, P, i), f !== "keyup" && (q = L(P)), setTimeout(N, 10);
          }
          for (var m = 0; m < d.length; ++m) {
            var y = m + 1 === d.length, I = y ? S : h(f || z(d[m + 1]).action);
            H(d[m], I, f, i, m);
          }
        }
        function H(i, d, g, f, h) {
          r._directMap[i + ":" + g] = d, i = i.replace(/\s+/g, " ");
          var S = i.split(" "), m;
          if (S.length > 1) {
            re(i, S, d, g);
            return;
          }
          m = z(i, g), r._callbacks[m.key] = r._callbacks[m.key] || [], $(m.key, m.modifiers, { type: m.action }, f, i, h), r._callbacks[m.key][f ? "unshift" : "push"]({
            callback: d,
            modifiers: m.modifiers,
            action: m.action,
            seq: f,
            level: h,
            combo: i
          });
        }
        r._bindMultiple = function(i, d, g) {
          for (var f = 0; f < i.length; ++f)
            H(i[f], d, g);
        }, A(t, "keypress", j), A(t, "keydown", j), A(t, "keyup", j);
      }
      w.prototype.bind = function(t, r, l) {
        var v = this;
        return t = t instanceof Array ? t : [t], v._bindMultiple.call(v, t, r, l), v;
      }, w.prototype.unbind = function(t, r) {
        var l = this;
        return l.bind.call(l, t, function() {
        }, r);
      }, w.prototype.trigger = function(t, r) {
        var l = this;
        return l._directMap[t + ":" + r] && l._directMap[t + ":" + r]({}, t), l;
      }, w.prototype.reset = function() {
        var t = this;
        return t._callbacks = {}, t._directMap = {}, t;
      }, w.prototype.stopCallback = function(t, r) {
        var l = this;
        if ((" " + r.className + " ").indexOf(" mousetrap ") > -1 || V(r, l.target))
          return !1;
        if ("composedPath" in t && typeof t.composedPath == "function") {
          var v = t.composedPath()[0];
          v !== t.target && (r = v);
        }
        return r.tagName == "INPUT" || r.tagName == "SELECT" || r.tagName == "TEXTAREA" || r.isContentEditable;
      }, w.prototype.handleKey = function() {
        var t = this;
        return t._handleKey.apply(t, arguments);
      }, w.addKeycodes = function(t) {
        for (var r in t)
          t.hasOwnProperty(r) && (a[r] = t[r]);
        x = null;
      }, w.init = function() {
        var t = w(s);
        for (var r in t)
          r.charAt(0) !== "_" && (w[r] = /* @__PURE__ */ (function(l) {
            return function() {
              return t[l].apply(t, arguments);
            };
          })(r));
      }, w.init(), p.Mousetrap = w, n.exports && (n.exports = w);
    })(typeof window < "u" ? window : null, typeof window < "u" ? document : null);
  })(W)), W.exports;
}
var D = de();
function pe(n) {
  return Object.keys(n).length === 0;
}
const E = {
  bound: !1,
  effective: null,
  overrideDone: !1,
  platform: null,
  supportedPlatforms: ["chromeos", "macos", "windows"]
};
function me(n = xe()) {
  E.platform || (E.platform = ke()), E.platform && (E.overrideDone || (_e(), E.overrideDone = !0), E.effective || (E.effective = we(n, E.platform)), E.bound || (ge(E.effective), E.bound = !0));
}
function ge(n) {
  n.global.itemFlag.length && D.bind(n.global.itemFlag, he), n.global.maskingEnable.length && D.bind(n.global.maskingEnable, ve), n.item.responseSet.length && D.bind(n.item.responseSet, ye), n.item.responseMask.length && D.bind(n.item.responseMask, be);
}
function he() {
  T.items.flag();
}
function ve() {
  const n = T.questions.questionInstance();
  !pe(n) && typeof n.isMaskable == "function" && n.isMaskable() && T.itemsApp().questionsApp().masking(!T.items.isMaskingEnabled());
}
function ye(n, p) {
  const s = Y();
  if (!s)
    return;
  const o = Q(p);
  if (o != null && Array.isArray(s.options) && s.options.length >= o) {
    const a = document.getElementById(s.response_id);
    if (!a)
      return;
    const b = a.querySelectorAll(".lrn-input");
    b && b[o - 1] && b[o - 1].click();
  }
}
function be(n, p) {
  if (!T.items.isMaskingEnabled() || !Y())
    return;
  const o = Q(p);
  if (o == null)
    return;
  const a = T.items.itemElement();
  if (!a)
    return;
  const b = a.querySelectorAll(".lrn-mcq-option"), u = b && b[o - 1];
  if (!u)
    return;
  const e = u.querySelector(".lrn-mask");
  e && e.click();
}
function Q(n) {
  const p = /(\d)$/.exec(n);
  if (!p)
    return null;
  const s = Number(p[1]);
  return Number.isFinite(s) ? s : null;
}
function Y() {
  const n = T.questions();
  let p = null;
  for (const s of n)
    if (s && s.type === "mcq") {
      if (p)
        return null;
      p = s;
    }
  return p;
}
function we(n, p) {
  const s = {
    global: {
      itemFlag: [],
      maskingEnable: []
    },
    item: {
      responseSet: [],
      responseMask: []
    }
  };
  if (n && Array.isArray(n.global))
    for (const o of n.global) {
      if (!o || !o.type || !o.bindings)
        continue;
      const a = o.bindings[p] || [];
      !Array.isArray(a) || a.length === 0 || (o.type === "item.flag" ? s.global.itemFlag.push(...a) : o.type === "masking.enable" && s.global.maskingEnable.push(...a));
    }
  if (n && Array.isArray(n.item))
    for (const o of n.item) {
      if (!o || !o.type || !o.bindings)
        continue;
      const a = o.bindings[p] || [];
      !Array.isArray(a) || a.length === 0 || (o.type === "response.set" ? s.item.responseSet.push(...a) : o.type === "response.mask" && s.item.responseMask.push(...a));
    }
  return s;
}
function ke() {
  for (const n of E.supportedPlatforms)
    if (ue[n])
      return n;
  return null;
}
function _e() {
  D.prototype.stopCallback = (n, p) => {
    const s = document.activeElement;
    return s && (s.getAttribute("type") === "radio" || s.getAttribute("type") === "checkbox") || (" " + p.className + " ").indexOf(" mousetrap ") > -1 ? !1 : p.tagName === "INPUT" || p.tagName === "SELECT" || p.tagName === "TEXTAREA" || p.contentEditable && p.contentEditable === "true";
  };
}
function xe() {
  return {
    global: [
      {
        bindings: {
          chromeos: ["ctrl+shift+v"],
          macos: ["command+shift+v"],
          windows: ["ctrl+shift+v"]
        },
        type: "item.flag"
      },
      {
        bindings: {
          chromeos: ["ctrl+alt+0"],
          macos: ["command+option+0"],
          windows: ["ctrl+alt+0"]
        },
        type: "masking.enable"
      }
    ],
    item: [
      {
        bindings: {
          chromeos: ["ctrl+shift+1", "ctrl+shift+2", "ctrl+shift+3", "ctrl+shift+4", "ctrl+shift+5", "ctrl+shift+6"],
          macos: ["command+ctrl+1", "command+ctrl+2", "command+ctrl+3", "command+ctrl+4", "command+ctrl+5", "command+ctrl+6"],
          windows: ["ctrl+shift+1", "ctrl+shift+2", "ctrl+shift+3", "ctrl+shift+4", "ctrl+shift+5", "ctrl+shift+6"]
        },
        restrictTo: ["mcq"],
        type: "response.set"
      },
      {
        bindings: {
          chromeos: ["ctrl+alt+1", "ctrl+alt+2", "ctrl+alt+3", "ctrl+alt+4", "ctrl+alt+5", "ctrl+alt+6"],
          macos: ["command+option+1", "command+option+2", "command+option+3", "command+option+4", "command+option+5", "command+option+6"],
          windows: ["ctrl+alt+1", "ctrl+alt+2", "ctrl+alt+3", "ctrl+alt+4", "ctrl+alt+5", "ctrl+alt+6"]
        },
        type: "response.mask"
      }
    ]
  };
}
const Ae = se("keyboardShortcuts", me);
export {
  Ae as keyboardShortcuts
};
