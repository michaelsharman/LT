import { b as Q, S as Y } from "./app-k__14e_y.js";
import { k as Z, c as nn, i as rn, w as en } from "./keys-DsUdP_cB.js";
import { l as O } from "./logger-BpyELtLr.js";
import { g as tn, a as on } from "./_commonjsHelpers-DQNKXVTB.js";
var z = { exports: {} }, un = z.exports, k;
function an() {
  return k || (k = 1, function(a) {
    (function(c, f, p) {
      function x(n) {
        var e = this, i = u();
        e.next = function() {
          var r = 2091639 * e.s0 + e.c * 23283064365386963e-26;
          return e.s0 = e.s1, e.s1 = e.s2, e.s2 = r - (e.c = r | 0);
        }, e.c = 1, e.s0 = i(" "), e.s1 = i(" "), e.s2 = i(" "), e.s0 -= i(n), e.s0 < 0 && (e.s0 += 1), e.s1 -= i(n), e.s1 < 0 && (e.s1 += 1), e.s2 -= i(n), e.s2 < 0 && (e.s2 += 1), i = null;
      }
      function l(n, e) {
        return e.c = n.c, e.s0 = n.s0, e.s1 = n.s1, e.s2 = n.s2, e;
      }
      function v(n, e) {
        var i = new x(n), r = e && e.state, t = i.next;
        return t.int32 = function() {
          return i.next() * 4294967296 | 0;
        }, t.double = function() {
          return t() + (t() * 2097152 | 0) * 11102230246251565e-32;
        }, t.quick = t, r && (typeof r == "object" && l(r, i), t.state = function() {
          return l(i, {});
        }), t;
      }
      function u() {
        var n = 4022871197, e = function(i) {
          i = String(i);
          for (var r = 0; r < i.length; r++) {
            n += i.charCodeAt(r);
            var t = 0.02519603282416938 * n;
            n = t >>> 0, t -= n, t *= n, n = t >>> 0, t -= n, n += t * 4294967296;
          }
          return (n >>> 0) * 23283064365386963e-26;
        };
        return e;
      }
      f.exports ? f.exports = v : this.alea = v;
    })(
      un,
      a
    );
  }(z)), z.exports;
}
var N = { exports: {} }, sn = N.exports, F;
function fn() {
  return F || (F = 1, function(a) {
    (function(c, f, p) {
      function x(u) {
        var n = this, e = "";
        n.x = 0, n.y = 0, n.z = 0, n.w = 0, n.next = function() {
          var r = n.x ^ n.x << 11;
          return n.x = n.y, n.y = n.z, n.z = n.w, n.w ^= n.w >>> 19 ^ r ^ r >>> 8;
        }, u === (u | 0) ? n.x = u : e += u;
        for (var i = 0; i < e.length + 64; i++)
          n.x ^= e.charCodeAt(i) | 0, n.next();
      }
      function l(u, n) {
        return n.x = u.x, n.y = u.y, n.z = u.z, n.w = u.w, n;
      }
      function v(u, n) {
        var e = new x(u), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, o = (e.next() >>> 0) / 4294967296, s = (t + o) / (1 << 21);
          while (s === 0);
          return s;
        }, r.int32 = e.next, r.quick = r, i && (typeof i == "object" && l(i, e), r.state = function() {
          return l(e, {});
        }), r;
      }
      f.exports ? f.exports = v : this.xor128 = v;
    })(
      sn,
      a
    );
  }(N)), N.exports;
}
var T = { exports: {} }, cn = T.exports, I;
function ln() {
  return I || (I = 1, function(a) {
    (function(c, f, p) {
      function x(u) {
        var n = this, e = "";
        n.next = function() {
          var r = n.x ^ n.x >>> 2;
          return n.x = n.y, n.y = n.z, n.z = n.w, n.w = n.v, (n.d = n.d + 362437 | 0) + (n.v = n.v ^ n.v << 4 ^ (r ^ r << 1)) | 0;
        }, n.x = 0, n.y = 0, n.z = 0, n.w = 0, n.v = 0, u === (u | 0) ? n.x = u : e += u;
        for (var i = 0; i < e.length + 64; i++)
          n.x ^= e.charCodeAt(i) | 0, i == e.length && (n.d = n.x << 10 ^ n.x >>> 4), n.next();
      }
      function l(u, n) {
        return n.x = u.x, n.y = u.y, n.z = u.z, n.w = u.w, n.v = u.v, n.d = u.d, n;
      }
      function v(u, n) {
        var e = new x(u), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, o = (e.next() >>> 0) / 4294967296, s = (t + o) / (1 << 21);
          while (s === 0);
          return s;
        }, r.int32 = e.next, r.quick = r, i && (typeof i == "object" && l(i, e), r.state = function() {
          return l(e, {});
        }), r;
      }
      f.exports ? f.exports = v : this.xorwow = v;
    })(
      cn,
      a
    );
  }(T)), T.exports;
}
var B = { exports: {} }, xn = B.exports, L;
function vn() {
  return L || (L = 1, function(a) {
    (function(c, f, p) {
      function x(u) {
        var n = this;
        n.next = function() {
          var i = n.x, r = n.i, t, o;
          return t = i[r], t ^= t >>> 7, o = t ^ t << 24, t = i[r + 1 & 7], o ^= t ^ t >>> 10, t = i[r + 3 & 7], o ^= t ^ t >>> 3, t = i[r + 4 & 7], o ^= t ^ t << 7, t = i[r + 7 & 7], t = t ^ t << 13, o ^= t ^ t << 9, i[r] = o, n.i = r + 1 & 7, o;
        };
        function e(i, r) {
          var t, o = [];
          if (r === (r | 0))
            o[0] = r;
          else
            for (r = "" + r, t = 0; t < r.length; ++t)
              o[t & 7] = o[t & 7] << 15 ^ r.charCodeAt(t) + o[t + 1 & 7] << 13;
          for (; o.length < 8; ) o.push(0);
          for (t = 0; t < 8 && o[t] === 0; ++t) ;
          for (t == 8 ? o[7] = -1 : o[t], i.x = o, i.i = 0, t = 256; t > 0; --t)
            i.next();
        }
        e(n, u);
      }
      function l(u, n) {
        return n.x = u.x.slice(), n.i = u.i, n;
      }
      function v(u, n) {
        u == null && (u = +/* @__PURE__ */ new Date());
        var e = new x(u), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, o = (e.next() >>> 0) / 4294967296, s = (t + o) / (1 << 21);
          while (s === 0);
          return s;
        }, r.int32 = e.next, r.quick = r, i && (i.x && l(i, e), r.state = function() {
          return l(e, {});
        }), r;
      }
      f.exports ? f.exports = v : this.xorshift7 = v;
    })(
      xn,
      a
    );
  }(B)), B.exports;
}
var G = { exports: {} }, pn = G.exports, P;
function hn() {
  return P || (P = 1, function(a) {
    (function(c, f, p) {
      function x(u) {
        var n = this;
        n.next = function() {
          var i = n.w, r = n.X, t = n.i, o, s;
          return n.w = i = i + 1640531527 | 0, s = r[t + 34 & 127], o = r[t = t + 1 & 127], s ^= s << 13, o ^= o << 17, s ^= s >>> 15, o ^= o >>> 12, s = r[t] = s ^ o, n.i = t, s + (i ^ i >>> 16) | 0;
        };
        function e(i, r) {
          var t, o, s, y, q, X = [], R = 128;
          for (r === (r | 0) ? (o = r, r = null) : (r = r + "\0", o = 0, R = Math.max(R, r.length)), s = 0, y = -32; y < R; ++y)
            r && (o ^= r.charCodeAt((y + 32) % r.length)), y === 0 && (q = o), o ^= o << 10, o ^= o >>> 15, o ^= o << 4, o ^= o >>> 13, y >= 0 && (q = q + 1640531527 | 0, t = X[y & 127] ^= o + q, s = t == 0 ? s + 1 : 0);
          for (s >= 128 && (X[(r && r.length || 0) & 127] = -1), s = 127, y = 4 * 128; y > 0; --y)
            o = X[s + 34 & 127], t = X[s = s + 1 & 127], o ^= o << 13, t ^= t << 17, o ^= o >>> 15, t ^= t >>> 12, X[s] = o ^ t;
          i.w = q, i.X = X, i.i = s;
        }
        e(n, u);
      }
      function l(u, n) {
        return n.i = u.i, n.w = u.w, n.X = u.X.slice(), n;
      }
      function v(u, n) {
        u == null && (u = +/* @__PURE__ */ new Date());
        var e = new x(u), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, o = (e.next() >>> 0) / 4294967296, s = (t + o) / (1 << 21);
          while (s === 0);
          return s;
        }, r.int32 = e.next, r.quick = r, i && (i.X && l(i, e), r.state = function() {
          return l(e, {});
        }), r;
      }
      f.exports ? f.exports = v : this.xor4096 = v;
    })(
      pn,
      // window object or global
      a
    );
  }(G)), G.exports;
}
var D = { exports: {} }, dn = D.exports, U;
function gn() {
  return U || (U = 1, function(a) {
    (function(c, f, p) {
      function x(u) {
        var n = this, e = "";
        n.next = function() {
          var r = n.b, t = n.c, o = n.d, s = n.a;
          return r = r << 25 ^ r >>> 7 ^ t, t = t - o | 0, o = o << 24 ^ o >>> 8 ^ s, s = s - r | 0, n.b = r = r << 20 ^ r >>> 12 ^ t, n.c = t = t - o | 0, n.d = o << 16 ^ t >>> 16 ^ s, n.a = s - r | 0;
        }, n.a = 0, n.b = 0, n.c = -1640531527, n.d = 1367130551, u === Math.floor(u) ? (n.a = u / 4294967296 | 0, n.b = u | 0) : e += u;
        for (var i = 0; i < e.length + 20; i++)
          n.b ^= e.charCodeAt(i) | 0, n.next();
      }
      function l(u, n) {
        return n.a = u.a, n.b = u.b, n.c = u.c, n.d = u.d, n;
      }
      function v(u, n) {
        var e = new x(u), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, o = (e.next() >>> 0) / 4294967296, s = (t + o) / (1 << 21);
          while (s === 0);
          return s;
        }, r.int32 = e.next, r.quick = r, i && (typeof i == "object" && l(i, e), r.state = function() {
          return l(e, {});
        }), r;
      }
      f.exports ? f.exports = v : this.tychei = v;
    })(
      dn,
      a
    );
  }(D)), D.exports;
}
var H = { exports: {} };
const wn = {}, mn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wn
}, Symbol.toStringTag, { value: "Module" })), yn = /* @__PURE__ */ tn(mn);
var bn = H.exports, W;
function An() {
  return W || (W = 1, function(a) {
    (function(c, f, p) {
      var x = 256, l = 6, v = 52, u = "random", n = p.pow(x, l), e = p.pow(2, v), i = e * 2, r = x - 1, t;
      function o(h, d, m) {
        var w = [];
        d = d == !0 ? { entropy: !0 } : d || {};
        var g = X(q(
          d.entropy ? [h, $(f)] : h ?? R(),
          3
        ), w), b = new s(w), S = function() {
          for (var A = b.g(l), _ = n, j = 0; A < e; )
            A = (A + j) * x, _ *= x, j = b.g(1);
          for (; A >= i; )
            A /= 2, _ /= 2, j >>>= 1;
          return (A + j) / _;
        };
        return S.int32 = function() {
          return b.g(4) | 0;
        }, S.quick = function() {
          return b.g(4) / 4294967296;
        }, S.double = S, X($(b.S), f), (d.pass || m || function(A, _, j, C) {
          return C && (C.S && y(C, b), A.state = function() {
            return y(b, {});
          }), j ? (p[u] = A, _) : A;
        })(
          S,
          g,
          "global" in d ? d.global : this == p,
          d.state
        );
      }
      function s(h) {
        var d, m = h.length, w = this, g = 0, b = w.i = w.j = 0, S = w.S = [];
        for (m || (h = [m++]); g < x; )
          S[g] = g++;
        for (g = 0; g < x; g++)
          S[g] = S[b = r & b + h[g % m] + (d = S[g])], S[b] = d;
        (w.g = function(A) {
          for (var _, j = 0, C = w.i, M = w.j, E = w.S; A--; )
            _ = E[C = r & C + 1], j = j * x + E[r & (E[C] = E[M = r & M + _]) + (E[M] = _)];
          return w.i = C, w.j = M, j;
        })(x);
      }
      function y(h, d) {
        return d.i = h.i, d.j = h.j, d.S = h.S.slice(), d;
      }
      function q(h, d) {
        var m = [], w = typeof h, g;
        if (d && w == "object")
          for (g in h)
            try {
              m.push(q(h[g], d - 1));
            } catch {
            }
        return m.length ? m : w == "string" ? h : h + "\0";
      }
      function X(h, d) {
        for (var m = h + "", w, g = 0; g < m.length; )
          d[r & g] = r & (w ^= d[r & g] * 19) + m.charCodeAt(g++);
        return $(d);
      }
      function R() {
        try {
          var h;
          return t && (h = t.randomBytes) ? h = h(x) : (h = new Uint8Array(x), (c.crypto || c.msCrypto).getRandomValues(h)), $(h);
        } catch {
          var d = c.navigator, m = d && d.plugins;
          return [+/* @__PURE__ */ new Date(), c, m, c.screen, $(f)];
        }
      }
      function $(h) {
        return String.fromCharCode.apply(0, h);
      }
      if (X(p.random(), f), a.exports) {
        a.exports = o;
        try {
          t = yn;
        } catch {
        }
      } else
        p["seed" + u] = o;
    })(
      // global: `self` in browsers (including strict mode and web workers),
      // otherwise `this` in Node and other environments
      typeof self < "u" ? self : bn,
      [],
      // pool: entropy pool starts empty
      Math
      // math: package containing random, pow, and seedrandom
    );
  }(H)), H.exports;
}
var V, J;
function Sn() {
  if (J) return V;
  J = 1;
  var a = an(), c = fn(), f = ln(), p = vn(), x = hn(), l = gn(), v = An();
  return v.alea = a, v.xor128 = c, v.xorwow = f, v.xorshift7 = p, v.xor4096 = x, v.tychei = l, V = v, V;
}
var Xn = Sn();
const jn = /* @__PURE__ */ on(Xn);
function _n(a, c) {
  for (var f = -1, p = a == null ? 0 : a.length, x = Array(p); ++f < p; )
    x[f] = c(a[f], f, a);
  return x;
}
function qn(a, c) {
  return _n(c, function(f) {
    return a[f];
  });
}
function Cn(a) {
  return a == null ? [] : qn(a, Z(a));
}
var Rn = Math.floor, $n = Math.random;
function En(a, c) {
  return a + Rn($n() * (c - a + 1));
}
function K(a, c) {
  var f = -1, p = a.length, x = p - 1;
  for (c = c === void 0 ? p : c; ++f < c; ) {
    var l = En(f, x), v = a[l];
    a[l] = a[f], a[f] = v;
  }
  return a.length = c, a;
}
function Mn(a) {
  return K(nn(a));
}
function On(a) {
  return K(Cn(a));
}
function zn(a) {
  var c = rn(a) ? Mn : On;
  return c(a);
}
function Nn(a) {
  const c = a || 1, f = "mcq", p = "LRN Hide Alternatives:";
  Q().on("item:load", () => {
    const x = Y();
    Object.values(x).forEach((l) => {
      if (l.type === f)
        if (Tn(l))
          if (Bn(l, c))
            if (Gn(l))
              if (Dn(l.validation)) {
                const v = [], u = Hn(l.validation);
                Object.values(u).forEach((e) => {
                  Object.values(l.options).forEach((i) => {
                    e !== i.value && v.push(String(i.value));
                  });
                });
                const n = [];
                for (let e = 0; e < c; e++)
                  n.push(Vn(v, l.response_id)[e]);
                en(l.response_id, (e) => {
                  if (!e)
                    return;
                  const i = e.getElementsByClassName("lrn_mcqgroup");
                  if (i.length !== 0)
                    for (let r = 0; r < i[0].children.length; r++) {
                      const t = i[0].children[r].getElementsByClassName("lrn-input");
                      if (t.length !== 0)
                        for (const o of n)
                          t[0].getAttribute("value") === o && (i[0].children[r].style.display = "none");
                    }
                });
              } else
                O.info(p, "No correct answer found in validation object");
            else
              O.info(p, " No validation object found");
          else
            O.info(p, "Invalid number of options to hide:", c);
        else
          O.info(p, "Only supports single response mode");
    });
  });
}
function Tn(a) {
  return !a.multiple_responses || a.multiple_responses === !1;
}
function Bn(a, c) {
  return a.options.length - c > 1;
}
function Gn(a) {
  return "validation" in a ? a.validation : !1;
}
function Dn(a) {
  return !!(a.valid_response.value && a.valid_response.value.length);
}
function Hn(a) {
  return a.valid_response.value;
}
function Vn(a, c) {
  const f = jn(c);
  return zn(a.map((p) => ({ value: p, sort: f() }))).sort((p, x) => p.sort - x.sort).map(({ value: p }) => p);
}
const Pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: Nn
}, Symbol.toStringTag, { value: "Module" }));
export {
  Pn as h,
  Nn as r
};
