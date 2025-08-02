import { c as j } from "./app-C9b6PwWF.js";
import { _ as ie, P as G, $ as U, T as ae, J as se } from "./activity-DZI4ByCR.js";
import { a as ce } from "./_commonjsHelpers-DQNKXVTB.js";
function fe(m, a) {
  for (var i = 0; i < a.length; i++) {
    const s = a[i];
    if (typeof s != "string" && !Array.isArray(s)) {
      for (const g in s)
        if (g !== "default" && !(g in m)) {
          const x = Object.getOwnPropertyDescriptor(s, g);
          x && Object.defineProperty(m, g, x.get ? x : {
            enumerable: !0,
            get: () => s[g]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(m, Symbol.toStringTag, { value: "Module" }));
}
var D = { exports: {} }, le = D.exports, Q;
function ue() {
  return Q || (Q = 1, function(m, a) {
    (function(i, s) {
      m.exports = s();
    })(le, function() {
      function i(o, _) {
        var M = window.matchMedia(o);
        _(M.matches);
        var C = function() {
          return _(M.matches);
        };
        return M.addListener(C), function() {
          return M.removeListener(C);
        };
      }
      function s(o, _) {
        return e[o] !== _ && (e[o] = _, y(o, _), !0);
      }
      var g = typeof navigator < "u" && typeof window < "u";
      if (g && typeof nw < "u") try {
        nw.Window.get();
      } catch {
        g = !1;
      }
      var x = !g, l = g ? navigator.userAgent : void 0, e = { gui: g, terminal: x, registerQuery: i };
      e.node = typeof process < "u" && !!process.versions && !!process.versions.node, e.pwa = e.gui && window.matchMedia("(display-mode: standalone)").matches && document.head.querySelector('[rel="manifest"]') !== null, e.uwp = typeof Windows < "u" && typeof MSApp < "u", e.nwjs = !(!e.node || !process.versions.nw), e.electron = !(!e.node || !process.versions.electron), e.cordova = !(!e.gui || !window.cordova), e.packaged = e.uwp || e.nwjs || e.electron || e.cordova, e.web = !e.node && !e.packaged, e.browser = e.web, e.website = e.web && !e.pwa, e.worker = !e.gui && typeof self < "u" && self.importScripts !== void 0, e.serviceWorker = e.worker && !!navigator.serviceWorker.controller || !1, e.android = !!e.gui && l.includes("Android"), e.chromeos = !!e.gui && l.includes("CrOS"), e.tizen = !!e.gui && l.includes("Tizen"), e.ios = e.gui && /iPad|iPhone|iPod/.test(l) && !window.MSStream || !1, e.linuxBased = e.android || e.tizen, e.windows = e.node ? process.platform === "win32" : l.includes("Windows"), e.macos = e.node ? process.platform === "darwin" : l.includes("Macintosh"), e.linux = e.node ? process.platform === "linux" : l.includes("Linux") && !e.linuxBased && !e.macos, e.edgeHtml = e.gui && l.includes("Edge/"), e.edgeChromium = e.gui && l.includes("Edg/"), e.edgeAndroid = e.gui && l.includes("EdgA/"), e.edgeIos = e.gui && l.includes("EdgiOS/"), e.chromeIos = e.gui && l.includes("CriOS/"), e.firefoxIos = e.gui && l.includes("FxiOS/"), e.edge = e.edgeHtml || e.edgeChromium || e.edgeAndroid || e.edgeIos, e.samsungBrowser = e.gui && l.includes("SamsungBrowser/"), e.opera = e.gui && (l.includes("Opera") || l.includes("OPR/")), e.firefox = e.gui && (l.includes("Firefox") || e.firefoxIos), e.chrome = e.gui && (l.includes("Chrome") || e.chromeIos) && !e.edge && !e.opera && !e.samsungBrowser, e.safari = e.gui && l.includes("Safari") && !e.chrome && !e.edge && !e.firefox && !e.opera && !e.samsungBrowser || e.edgeIos || e.chromeIos || e.firefoxIos, e.ie = e.trident = e.gui && l.includes("Trident"), e.blink = e.chrome && !e.chromeIos || e.edgeChromium || e.edgeAndroid || e.samsungBrowser, e.webkit = e.blink || e.safari, e.gecko = e.firefox && !e.firefoxIos && !e.webkit && !e.safari;
      var k = {};
      e.on = function(o, _) {
        k[o] = k[o] || /* @__PURE__ */ new Set(), k[o].add(_);
      }, e.off = e.removeListener = function(o, _) {
        k[o] && k[o].delete(_);
      };
      var y = e.emit = function(o, _) {
        k[o] && k[o].forEach(function(M) {
          return M(_);
        });
      };
      if (e.gui) {
        e.pixelRatio = parseFloat(window.devicePixelRatio.toFixed(2)), e.gameconsole = l.includes("Xbox") || l.includes("PlayStation");
        var P = 0;
        if (window.addEventListener("gamepadconnected", function(o) {
          return P++;
        }), window.addEventListener("gamepaddisconnected", function(o) {
          return P--;
        }), e.gameconsole) e.gamepad = !0, e.mouse = !0, e.touch = !1, e.tv = !0, e.battery = !1, e.phone = e.tablet = e.hybrid = e.laptop = e.desktop = !1, e.formfactor = "gameconsole";
        else {
          var I = function() {
            s("tv", e.formfactor === "tv"), s("phone", e.formfactor === "phone"), s("tablet", e.formfactor === "tablet"), s("hybrid", e.formfactor === "hybrid"), s("laptop", e.formfactor === "laptop"), s("desktop", e.formfactor === "desktop");
          }, L = function() {
            var o = Math.min(window.screen.width, window.screen.height);
            return e.tv ? "tv" : e.touch && o < 600 ? "phone" : e.touch && !e.mouse ? "tablet" : e.touch && e.mouse ? "hybrid" : e.battery ? "laptop" : "desktop";
          };
          e.touch = navigator.maxTouchPoints > 0, e.tv = l.includes("TV"), P = navigator.getGamepads ? Array.from(navigator.getGamepads()).filter(function(o) {
            return o != null;
          }).length : 0, e.gamepad = P > 0, i("(orientation: portrait)", function(o) {
            e.portrait = o, e.landscape = !o, e.orientation = o ? "portrait" : "landscape", y("portrait", e.portrait), y("landscape", e.landscape), y("orientation", e.orientation);
          }), i("(any-pointer: coarse)", function(o) {
            s("touch", o), s("formfactor", L()) && I();
          }), i("(hover: hover)", function(o) {
            s("mouse", o), s("input", o ? "mouse" : "touch"), s("formfactor", L()) && I();
          });
        }
      }
      return e.csp = e.uwp || !1, e.nwjs ? e.dev = process.versions["nw-flavor"] === "sdk" : e.electron ? e.dev = process.execPath.replace(/\\/g, "/").includes("node_modules/electron/") : e.uwp ? e.dev = Windows.ApplicationModel.Package.current.isDevelopmentMode : e.node ? e.dev = process.env.NODE_ENV !== "production" : e.dev = void 0, e;
    });
  }(D)), D.exports;
}
var J = ue();
const de = /* @__PURE__ */ ce(J), pe = /* @__PURE__ */ fe({
  __proto__: null,
  default: de
}, [J]);
var F = { exports: {} }, X;
function me() {
  return X || (X = 1, function(m) {
    (function(a, i, s) {
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
      }, l = {
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
      function L(t, r) {
        return t.sort().join(",") === r.sort().join(",");
      }
      function o(t) {
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
      function Y() {
        if (!k) {
          k = {};
          for (var t in g)
            t > 95 && t < 112 || g.hasOwnProperty(t) && (k[g[t]] = t);
        }
        return k;
      }
      function Z(t, r, c) {
        return c || (c = Y()[t] ? "keydown" : "keypress"), c == "keypress" && r.length && (c = "keydown"), c;
      }
      function ee(t) {
        return t === "+" ? ["+"] : (t = t.replace(/\+{2}/g, "+plus"), t.split("+"));
      }
      function z(t, r) {
        var c, v, S, q = [];
        for (c = ee(t), S = 0; S < c.length; ++S)
          v = c[S], e[v] && (v = e[v]), r && r != "keypress" && l[v] && (v = l[v], q.push("shift")), C(v) && q.push(v);
        return r = Z(v, q, r), {
          key: v,
          modifiers: q,
          action: r
        };
      }
      function $(t, r) {
        return t === null || t === i ? !1 : t === r ? !0 : $(t.parentNode, r);
      }
      function b(t) {
        var r = this;
        if (t = t || i, !(r instanceof b))
          return new b(t);
        r.target = t, r._callbacks = {}, r._directMap = {};
        var c = {}, v, S = !1, q = !1, B = !1;
        function N(n) {
          n = n || {};
          var u = !1, p;
          for (p in c) {
            if (n[p]) {
              u = !0;
              continue;
            }
            c[p] = 0;
          }
          u || (B = !1);
        }
        function V(n, u, p, f, h, E) {
          var d, w, T = [], A = p.type;
          if (!r._callbacks[n])
            return [];
          for (A == "keyup" && C(n) && (u = [n]), d = 0; d < r._callbacks[n].length; ++d)
            if (w = r._callbacks[n][d], !(!f && w.seq && c[w.seq] != w.level) && A == w.action && (A == "keypress" && !p.metaKey && !p.ctrlKey || L(u, w.modifiers))) {
              var ne = !f && w.combo == h, oe = f && w.seq == f && w.level == E;
              (ne || oe) && r._callbacks[n].splice(d, 1), T.push(w);
            }
          return T;
        }
        function R(n, u, p, f) {
          r.stopCallback(u, u.target || u.srcElement, p, f) || n(u, p) === !1 && (_(u), M(u));
        }
        r._handleKey = function(n, u, p) {
          var f = V(n, u, p), h, E = {}, d = 0, w = !1;
          for (h = 0; h < f.length; ++h)
            f[h].seq && (d = Math.max(d, f[h].level));
          for (h = 0; h < f.length; ++h) {
            if (f[h].seq) {
              if (f[h].level != d)
                continue;
              w = !0, E[f[h].seq] = 1, R(f[h].callback, p, f[h].combo, f[h].seq);
              continue;
            }
            w || R(f[h].callback, p, f[h].combo);
          }
          var T = p.type == "keypress" && q;
          p.type == B && !C(n) && !T && N(E), q = w && p.type == "keydown";
        };
        function W(n) {
          typeof n.which != "number" && (n.which = n.keyCode);
          var u = I(n);
          if (u) {
            if (n.type == "keyup" && S === u) {
              S = !1;
              return;
            }
            r.handleKey(u, o(n), n);
          }
        }
        function te() {
          clearTimeout(v), v = setTimeout(N, 1e3);
        }
        function re(n, u, p, f) {
          c[n] = 0;
          function h(A) {
            return function() {
              B = A, ++c[n], te();
            };
          }
          function E(A) {
            R(p, A, n), f !== "keyup" && (S = I(A)), setTimeout(N, 10);
          }
          for (var d = 0; d < u.length; ++d) {
            var w = d + 1 === u.length, T = w ? E : h(f || z(u[d + 1]).action);
            H(u[d], T, f, n, d);
          }
        }
        function H(n, u, p, f, h) {
          r._directMap[n + ":" + p] = u, n = n.replace(/\s+/g, " ");
          var E = n.split(" "), d;
          if (E.length > 1) {
            re(n, E, u, p);
            return;
          }
          d = z(n, p), r._callbacks[d.key] = r._callbacks[d.key] || [], V(d.key, d.modifiers, { type: d.action }, f, n, h), r._callbacks[d.key][f ? "unshift" : "push"]({
            callback: u,
            modifiers: d.modifiers,
            action: d.action,
            seq: f,
            level: h,
            combo: n
          });
        }
        r._bindMultiple = function(n, u, p) {
          for (var f = 0; f < n.length; ++f)
            H(n[f], u, p);
        }, P(t, "keypress", W), P(t, "keydown", W), P(t, "keyup", W);
      }
      b.prototype.bind = function(t, r, c) {
        var v = this;
        return t = t instanceof Array ? t : [t], v._bindMultiple.call(v, t, r, c), v;
      }, b.prototype.unbind = function(t, r) {
        var c = this;
        return c.bind.call(c, t, function() {
        }, r);
      }, b.prototype.trigger = function(t, r) {
        var c = this;
        return c._directMap[t + ":" + r] && c._directMap[t + ":" + r]({}, t), c;
      }, b.prototype.reset = function() {
        var t = this;
        return t._callbacks = {}, t._directMap = {}, t;
      }, b.prototype.stopCallback = function(t, r) {
        var c = this;
        if ((" " + r.className + " ").indexOf(" mousetrap ") > -1 || $(r, c.target))
          return !1;
        if ("composedPath" in t && typeof t.composedPath == "function") {
          var v = t.composedPath()[0];
          v !== t.target && (r = v);
        }
        return r.tagName == "INPUT" || r.tagName == "SELECT" || r.tagName == "TEXTAREA" || r.isContentEditable;
      }, b.prototype.handleKey = function() {
        var t = this;
        return t._handleKey.apply(t, arguments);
      }, b.addKeycodes = function(t) {
        for (var r in t)
          t.hasOwnProperty(r) && (g[r] = t[r]);
        k = null;
      }, b.init = function() {
        var t = b(i);
        for (var r in t)
          r.charAt(0) !== "_" && (b[r] = /* @__PURE__ */ function(c) {
            return function() {
              return t[c].apply(t, arguments);
            };
          }(r));
      }, b.init(), a.Mousetrap = b, m.exports && (m.exports = b);
    })(typeof window < "u" ? window : null, typeof window < "u" ? document : null);
  }(F)), F.exports;
}
var K = me();
function ge(m) {
  return Object.keys(m).length === 0;
}
const O = {
  supportedPlatforms: ["chromeos", "macos", "windows"]
};
function he(m = ye()) {
  const a = we();
  O.bindings = m, a && (be(), O.bindings.hasOwnProperty("global") && Array.isArray(O.bindings.global) && O.bindings.global.forEach((i) => {
    if (i.hasOwnProperty("type"))
      switch (i.type) {
        case "item.flag":
          xe(i.bindings[a]);
          break;
        case "masking.enable":
          ve(i.bindings[a]);
          break;
      }
  }), O.bindings.hasOwnProperty("item") && Array.isArray(O.bindings.item) && j().on("item:load", () => {
    O.bindings.item.forEach((i) => {
      if (i.hasOwnProperty("type"))
        switch (i.type) {
          case "response.mask":
            _e(i.bindings[a]);
            break;
          case "response.set":
            ke(i.bindings[a]);
            break;
        }
    });
  }));
}
function ve(m) {
  j().on("item:load", () => {
    const a = ie();
    !ge(a) && a.isMaskable() && K.bind(m, () => {
      j().questionsApp().masking(!G());
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
  K.prototype.stopCallback = (m, a) => {
    const i = document.activeElement;
    return i.getAttribute("type") === "radio" || i.getAttribute("type") === "checkbox" || (" " + a.className + " ").indexOf(" mousetrap ") > -1 ? !1 : a.tagName == "INPUT" || a.tagName == "SELECT" || a.tagName == "TEXTAREA" || a.contentEditable && a.contentEditable == "true";
  };
}
function ke(m) {
  const a = U();
  let i = 0;
  a.forEach((s) => {
    s.type === "mcq" && i++;
  }), i === 1 && Object.values(a).forEach((s) => {
    s.type === "mcq" && K.bind(m, (g) => {
      s.options?.length >= g.key && document.getElementById(`${s.response_id}`).querySelectorAll(".lrn-input")[g.key - 1].click();
    });
  });
}
function _e(m) {
  const a = U();
  let i = 0;
  a.forEach((s) => {
    s.type === "mcq" && i++;
  }), i === 1 && Object.values(a).forEach((s) => {
    s.type === "mcq" && K.bind(m, (g, x) => {
      if (G()) {
        const l = Number(x.at(-1));
        if (s.options?.length >= l) {
          const y = ae().querySelectorAll(".lrn-mcq-option")[l - 1].querySelector(".lrn-mask");
          y && y.click();
        }
      }
    });
  });
}
function xe(m) {
  K.bind(m, se);
}
const Se = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: he
}, Symbol.toStringTag, { value: "Module" }));
export {
  Se as k,
  he as r
};
