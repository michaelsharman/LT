import { c as F, g as ie, h as G, f as U, e as se, j as ae } from "./app-CnMVZMul.js";
import { a as ce } from "./_commonjsHelpers-1BW40pRg.js";
function fe(m, a) {
  for (var s = 0; s < a.length; s++) {
    const o = a[s];
    if (typeof o != "string" && !Array.isArray(o)) {
      for (const g in o)
        if (g !== "default" && !(g in m)) {
          const x = Object.getOwnPropertyDescriptor(o, g);
          x && Object.defineProperty(m, g, x.get ? x : {
            enumerable: !0,
            get: () => o[g]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(m, Symbol.toStringTag, { value: "Module" }));
}
var K = { exports: {} }, ue = K.exports, X;
function le() {
  return X || (X = 1, function(m, a) {
    (function(s, o) {
      m.exports = o();
    })(ue, function() {
      "use strict";
      function s(i, _) {
        var M = window.matchMedia(i);
        _(M.matches);
        var C = function() {
          return _(M.matches);
        };
        return M.addListener(C), function() {
          return M.removeListener(C);
        };
      }
      function o(i, _) {
        return e[i] !== _ && (e[i] = _, y(i, _), !0);
      }
      var g = typeof navigator < "u" && typeof window < "u";
      if (g && typeof nw < "u") try {
        nw.Window.get();
      } catch {
        g = !1;
      }
      var x = !g, u = g ? navigator.userAgent : void 0, e = { gui: g, terminal: x, registerQuery: s };
      e.node = typeof process < "u" && !!process.versions && !!process.versions.node, e.pwa = e.gui && window.matchMedia("(display-mode: standalone)").matches && document.head.querySelector('[rel="manifest"]') !== null, e.uwp = typeof Windows < "u" && typeof MSApp < "u", e.nwjs = !(!e.node || !process.versions.nw), e.electron = !(!e.node || !process.versions.electron), e.cordova = !(!e.gui || !window.cordova), e.packaged = e.uwp || e.nwjs || e.electron || e.cordova, e.web = !e.node && !e.packaged, e.browser = e.web, e.website = e.web && !e.pwa, e.worker = !e.gui && typeof self < "u" && self.importScripts !== void 0, e.serviceWorker = e.worker && !!navigator.serviceWorker.controller || !1, e.android = !!e.gui && u.includes("Android"), e.chromeos = !!e.gui && u.includes("CrOS"), e.tizen = !!e.gui && u.includes("Tizen"), e.ios = e.gui && /iPad|iPhone|iPod/.test(u) && !window.MSStream || !1, e.linuxBased = e.android || e.tizen, e.windows = e.node ? process.platform === "win32" : u.includes("Windows"), e.macos = e.node ? process.platform === "darwin" : u.includes("Macintosh"), e.linux = e.node ? process.platform === "linux" : u.includes("Linux") && !e.linuxBased && !e.macos, e.edgeHtml = e.gui && u.includes("Edge/"), e.edgeChromium = e.gui && u.includes("Edg/"), e.edgeAndroid = e.gui && u.includes("EdgA/"), e.edgeIos = e.gui && u.includes("EdgiOS/"), e.chromeIos = e.gui && u.includes("CriOS/"), e.firefoxIos = e.gui && u.includes("FxiOS/"), e.edge = e.edgeHtml || e.edgeChromium || e.edgeAndroid || e.edgeIos, e.samsungBrowser = e.gui && u.includes("SamsungBrowser/"), e.opera = e.gui && (u.includes("Opera") || u.includes("OPR/")), e.firefox = e.gui && (u.includes("Firefox") || e.firefoxIos), e.chrome = e.gui && (u.includes("Chrome") || e.chromeIos) && !e.edge && !e.opera && !e.samsungBrowser, e.safari = e.gui && u.includes("Safari") && !e.chrome && !e.edge && !e.firefox && !e.opera && !e.samsungBrowser || e.edgeIos || e.chromeIos || e.firefoxIos, e.ie = e.trident = e.gui && u.includes("Trident"), e.blink = e.chrome && !e.chromeIos || e.edgeChromium || e.edgeAndroid || e.samsungBrowser, e.webkit = e.blink || e.safari, e.gecko = e.firefox && !e.firefoxIos && !e.webkit && !e.safari;
      var k = {};
      e.on = function(i, _) {
        k[i] = k[i] || /* @__PURE__ */ new Set(), k[i].add(_);
      }, e.off = e.removeListener = function(i, _) {
        k[i] && k[i].delete(_);
      };
      var y = e.emit = function(i, _) {
        k[i] && k[i].forEach(function(M) {
          return M(_);
        });
      };
      if (e.gui) {
        e.pixelRatio = parseFloat(window.devicePixelRatio.toFixed(2)), e.gameconsole = u.includes("Xbox") || u.includes("PlayStation");
        var P = 0;
        if (window.addEventListener("gamepadconnected", function(i) {
          return P++;
        }), window.addEventListener("gamepaddisconnected", function(i) {
          return P--;
        }), e.gameconsole) e.gamepad = !0, e.mouse = !0, e.touch = !1, e.tv = !0, e.battery = !1, e.phone = e.tablet = e.hybrid = e.laptop = e.desktop = !1, e.formfactor = "gameconsole";
        else {
          var I = function() {
            o("tv", e.formfactor === "tv"), o("phone", e.formfactor === "phone"), o("tablet", e.formfactor === "tablet"), o("hybrid", e.formfactor === "hybrid"), o("laptop", e.formfactor === "laptop"), o("desktop", e.formfactor === "desktop");
          }, D = function() {
            var i = Math.min(window.screen.width, window.screen.height);
            return e.tv ? "tv" : e.touch && i < 600 ? "phone" : e.touch && !e.mouse ? "tablet" : e.touch && e.mouse ? "hybrid" : e.battery ? "laptop" : "desktop";
          };
          e.touch = navigator.maxTouchPoints > 0, e.tv = u.includes("TV"), P = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(function(i) {
            return i != null;
          }).length : 0, e.gamepad = P > 0, s("(orientation: portrait)", function(i) {
            e.portrait = i, e.landscape = !i, e.orientation = i ? "portrait" : "landscape", y("portrait", e.portrait), y("landscape", e.landscape), y("orientation", e.orientation);
          }), s("(any-pointer: coarse)", function(i) {
            o("touch", i), o("formfactor", D()) && I();
          }), s("(hover: hover)", function(i) {
            o("mouse", i), o("input", i ? "mouse" : "touch"), o("formfactor", D()) && I();
          });
        }
      }
      return e.csp = e.uwp || !1, e.nwjs ? e.dev = process.versions["nw-flavor"] === "sdk" : e.electron ? e.dev = process.execPath.replace(/\\/g, "/").includes("node_modules/electron/") : e.uwp ? e.dev = Windows.ApplicationModel.Package.current.isDevelopmentMode : e.node ? e.dev = process.env.NODE_ENV !== "production" : e.dev = void 0, e;
    });
  }(K, K.exports)), K.exports;
}
var Y = le();
const de = /* @__PURE__ */ ce(Y), pe = /* @__PURE__ */ fe({
  __proto__: null,
  default: de
}, [Y]);
var j = { exports: {} }, Me = j.exports, $;
function me() {
  return $ || ($ = 1, function(m) {
    (function(a, s, o) {
      if (!a)
        return;
      for (var g = {
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
      }, x = {
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
      }, k, y = 1; y < 20; ++y)
        g[111 + y] = "f" + y;
      for (y = 0; y <= 9; ++y)
        g[y + 96] = y.toString();
      function P(t, r, c) {
        if (t.addEventListener) {
          t.addEventListener(r, c, !1);
          return;
        }
        t.attachEvent("on" + r, c);
      }
      function I(t) {
        if (t.type == "keypress") {
          var r = String.fromCharCode(t.which);
          return t.shiftKey || (r = r.toLowerCase()), r;
        }
        return g[t.which] ? g[t.which] : x[t.which] ? x[t.which] : String.fromCharCode(t.which).toLowerCase();
      }
      function D(t, r) {
        return t.sort().join(",") === r.sort().join(",");
      }
      function i(t) {
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
      function C(t) {
        return t == "shift" || t == "ctrl" || t == "alt" || t == "meta";
      }
      function J() {
        if (!k) {
          k = {};
          for (var t in g)
            t > 95 && t < 112 || g.hasOwnProperty(t) && (k[g[t]] = t);
        }
        return k;
      }
      function Z(t, r, c) {
        return c || (c = J()[t] ? "keydown" : "keypress"), c == "keypress" && r.length && (c = "keydown"), c;
      }
      function ee(t) {
        return t === "+" ? ["+"] : (t = t.replace(/\+{2}/g, "+plus"), t.split("+"));
      }
      function z(t, r) {
        var c, v, S, q = [];
        for (c = ee(t), S = 0; S < c.length; ++S)
          v = c[S], e[v] && (v = e[v]), r && r != "keypress" && u[v] && (v = u[v], q.push("shift")), C(v) && q.push(v);
        return r = Z(v, q, r), {
          key: v,
          modifiers: q,
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
        var c = {}, v, S = !1, q = !1, B = !1;
        function N(n) {
          n = n || {};
          var l = !1, p;
          for (p in c) {
            if (n[p]) {
              l = !0;
              continue;
            }
            c[p] = 0;
          }
          l || (B = !1);
        }
        function H(n, l, p, f, h, E) {
          var d, b, T = [], A = p.type;
          if (!r._callbacks[n])
            return [];
          for (A == "keyup" && C(n) && (l = [n]), d = 0; d < r._callbacks[n].length; ++d)
            if (b = r._callbacks[n][d], !(!f && b.seq && c[b.seq] != b.level) && A == b.action && (A == "keypress" && !p.metaKey && !p.ctrlKey || D(l, b.modifiers))) {
              var ne = !f && b.combo == h, oe = f && b.seq == f && b.level == E;
              (ne || oe) && r._callbacks[n].splice(d, 1), T.push(b);
            }
          return T;
        }
        function R(n, l, p, f) {
          r.stopCallback(l, l.target || l.srcElement, p, f) || n(l, p) === !1 && (_(l), M(l));
        }
        r._handleKey = function(n, l, p) {
          var f = H(n, l, p), h, E = {}, d = 0, b = !1;
          for (h = 0; h < f.length; ++h)
            f[h].seq && (d = Math.max(d, f[h].level));
          for (h = 0; h < f.length; ++h) {
            if (f[h].seq) {
              if (f[h].level != d)
                continue;
              b = !0, E[f[h].seq] = 1, R(f[h].callback, p, f[h].combo, f[h].seq);
              continue;
            }
            b || R(f[h].callback, p, f[h].combo);
          }
          var T = p.type == "keypress" && q;
          p.type == B && !C(n) && !T && N(E), q = b && p.type == "keydown";
        };
        function W(n) {
          typeof n.which != "number" && (n.which = n.keyCode);
          var l = I(n);
          if (l) {
            if (n.type == "keyup" && S === l) {
              S = !1;
              return;
            }
            r.handleKey(l, i(n), n);
          }
        }
        function te() {
          clearTimeout(v), v = setTimeout(N, 1e3);
        }
        function re(n, l, p, f) {
          c[n] = 0;
          function h(A) {
            return function() {
              B = A, ++c[n], te();
            };
          }
          function E(A) {
            R(p, A, n), f !== "keyup" && (S = I(A)), setTimeout(N, 10);
          }
          for (var d = 0; d < l.length; ++d) {
            var b = d + 1 === l.length, T = b ? E : h(f || z(l[d + 1]).action);
            Q(l[d], T, f, n, d);
          }
        }
        function Q(n, l, p, f, h) {
          r._directMap[n + ":" + p] = l, n = n.replace(/\s+/g, " ");
          var E = n.split(" "), d;
          if (E.length > 1) {
            re(n, E, l, p);
            return;
          }
          d = z(n, p), r._callbacks[d.key] = r._callbacks[d.key] || [], H(d.key, d.modifiers, { type: d.action }, f, n, h), r._callbacks[d.key][f ? "unshift" : "push"]({
            callback: l,
            modifiers: d.modifiers,
            action: d.action,
            seq: f,
            level: h,
            combo: n
          });
        }
        r._bindMultiple = function(n, l, p) {
          for (var f = 0; f < n.length; ++f)
            Q(n[f], l, p);
        }, P(t, "keypress", W), P(t, "keydown", W), P(t, "keyup", W);
      }
      w.prototype.bind = function(t, r, c) {
        var v = this;
        return t = t instanceof Array ? t : [t], v._bindMultiple.call(v, t, r, c), v;
      }, w.prototype.unbind = function(t, r) {
        var c = this;
        return c.bind.call(c, t, function() {
        }, r);
      }, w.prototype.trigger = function(t, r) {
        var c = this;
        return c._directMap[t + ":" + r] && c._directMap[t + ":" + r]({}, t), c;
      }, w.prototype.reset = function() {
        var t = this;
        return t._callbacks = {}, t._directMap = {}, t;
      }, w.prototype.stopCallback = function(t, r) {
        var c = this;
        if ((" " + r.className + " ").indexOf(" mousetrap ") > -1 || V(r, c.target))
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
          t.hasOwnProperty(r) && (g[r] = t[r]);
        k = null;
      }, w.init = function() {
        var t = w(s);
        for (var r in t)
          r.charAt(0) !== "_" && (w[r] = /* @__PURE__ */ function(c) {
            return function() {
              return t[c].apply(t, arguments);
            };
          }(r));
      }, w.init(), a.Mousetrap = w, m.exports && (m.exports = w), typeof o == "function" && o.amd && o(function() {
        return w;
      });
    })(typeof window < "u" ? window : null, typeof window < "u" ? document : null);
  }(j)), j.exports;
}
var L = me();
function ge(m) {
  return Object.keys(m).length === 0;
}
const O = {
  supportedPlatforms: ["chromeos", "macos", "windows"]
};
function he(m = ye()) {
  const a = we();
  O.bindings = m, a && (be(), O.bindings.hasOwnProperty("global") && Array.isArray(O.bindings.global) && O.bindings.global.forEach((s) => {
    if (s.hasOwnProperty("type"))
      switch (s.type) {
        case "item.flag":
          xe(s.bindings[a]);
          break;
        case "masking.enable":
          ve(s.bindings[a]);
          break;
        default:
          break;
      }
  }), O.bindings.hasOwnProperty("item") && Array.isArray(O.bindings.item) && F().on("item:load", () => {
    O.bindings.item.forEach((s) => {
      if (s.hasOwnProperty("type"))
        switch (s.type) {
          case "response.mask":
            _e(s.bindings[a]);
            break;
          case "response.set":
            ke(s.bindings[a]);
            break;
          default:
            break;
        }
    });
  }));
}
function ve(m) {
  F().on("item:load", () => {
    const a = ie();
    !ge(a) && a.isMaskable() && L.bind(m, () => {
      F().questionsApp().masking(!G());
    });
  });
}
function ye() {
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
function we() {
  let m;
  return O.supportedPlatforms.forEach((a) => {
    pe[a] && (m = a);
  }), m;
}
function be() {
  L.prototype.stopCallback = (m, a) => {
    const s = document.activeElement;
    return s.getAttribute("type") === "radio" || s.getAttribute("type") === "checkbox" || (" " + a.className + " ").indexOf(" mousetrap ") > -1 ? !1 : a.tagName == "INPUT" || a.tagName == "SELECT" || a.tagName == "TEXTAREA" || a.contentEditable && a.contentEditable == "true";
  };
}
function ke(m) {
  const a = U();
  let s = 0;
  a.forEach((o) => {
    o.type === "mcq" && s++;
  }), s === 1 && Object.values(a).forEach((o) => {
    o.type === "mcq" && L.bind(m, (g) => {
      o.options?.length >= g.key && document.getElementById(`${o.response_id}`).querySelectorAll(".lrn-input")[g.key - 1].click();
    });
  });
}
function _e(m) {
  const a = U();
  let s = 0;
  a.forEach((o) => {
    o.type === "mcq" && s++;
  }), s === 1 && Object.values(a).forEach((o) => {
    o.type === "mcq" && L.bind(m, (g, x) => {
      if (G()) {
        const u = Number(x.at(-1));
        if (o.options?.length >= u) {
          const y = se().querySelectorAll(".lrn-mcq-option")[u - 1].querySelector(".lrn-mask");
          y && y.click();
        }
      }
    });
  });
}
function xe(m) {
  L.bind(m, ae);
}
const Se = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: he
}, Symbol.toStringTag, { value: "Module" }));
export {
  Se as k,
  he as r
};
