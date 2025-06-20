import { c as Q, f as Y } from "./app-c1Nmxn4r.js";
import { k as Z, c as nn, i as rn, w as en } from "./keys-DsUdP_cB.js";
import { l as O } from "./logger-BpyELtLr.js";
import { g as tn, a as on } from "./_commonjsHelpers-BItOPCY9.js";
var z = { exports: {} }, an = z.exports, k;
function un() {
  return k || (k = 1, function(u) {
    (function(c, s, p) {
      function x(n) {
        var e = this, i = a();
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
      function a() {
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
      s && s.exports ? s.exports = v : this.alea = v;
    })(
      an,
      u
    );
  }(z)), z.exports;
}
var N = { exports: {} }, sn = N.exports, F;
function fn() {
  return F || (F = 1, function(u) {
    (function(c, s, p) {
      function x(a) {
        var n = this, e = "";
        n.x = 0, n.y = 0, n.z = 0, n.w = 0, n.next = function() {
          var r = n.x ^ n.x << 11;
          return n.x = n.y, n.y = n.z, n.z = n.w, n.w ^= n.w >>> 19 ^ r ^ r >>> 8;
        }, a === (a | 0) ? n.x = a : e += a;
        for (var i = 0; i < e.length + 64; i++)
          n.x ^= e.charCodeAt(i) | 0, n.next();
      }
      function l(a, n) {
        return n.x = a.x, n.y = a.y, n.z = a.z, n.w = a.w, n;
      }
      function v(a, n) {
        var e = new x(a), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, o = (e.next() >>> 0) / 4294967296, f = (t + o) / (1 << 21);
          while (f === 0);
          return f;
        }, r.int32 = e.next, r.quick = r, i && (typeof i == "object" && l(i, e), r.state = function() {
          return l(e, {});
        }), r;
      }
      s && s.exports ? s.exports = v : this.xor128 = v;
    })(
      sn,
      u
    );
  }(N)), N.exports;
}
var T = { exports: {} }, cn = T.exports, I;
function ln() {
  return I || (I = 1, function(u) {
    (function(c, s, p) {
      function x(a) {
        var n = this, e = "";
        n.next = function() {
          var r = n.x ^ n.x >>> 2;
          return n.x = n.y, n.y = n.z, n.z = n.w, n.w = n.v, (n.d = n.d + 362437 | 0) + (n.v = n.v ^ n.v << 4 ^ (r ^ r << 1)) | 0;
        }, n.x = 0, n.y = 0, n.z = 0, n.w = 0, n.v = 0, a === (a | 0) ? n.x = a : e += a;
        for (var i = 0; i < e.length + 64; i++)
          n.x ^= e.charCodeAt(i) | 0, i == e.length && (n.d = n.x << 10 ^ n.x >>> 4), n.next();
      }
      function l(a, n) {
        return n.x = a.x, n.y = a.y, n.z = a.z, n.w = a.w, n.v = a.v, n.d = a.d, n;
      }
      function v(a, n) {
        var e = new x(a), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, o = (e.next() >>> 0) / 4294967296, f = (t + o) / (1 << 21);
          while (f === 0);
          return f;
        }, r.int32 = e.next, r.quick = r, i && (typeof i == "object" && l(i, e), r.state = function() {
          return l(e, {});
        }), r;
      }
      s && s.exports ? s.exports = v : this.xorwow = v;
    })(
      cn,
      u
    );
  }(T)), T.exports;
}
var B = { exports: {} }, xn = B.exports, L;
function vn() {
  return L || (L = 1, function(u) {
    (function(c, s, p) {
      function x(a) {
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
        e(n, a);
      }
      function l(a, n) {
        return n.x = a.x.slice(), n.i = a.i, n;
      }
      function v(a, n) {
        a == null && (a = +/* @__PURE__ */ new Date());
        var e = new x(a), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, o = (e.next() >>> 0) / 4294967296, f = (t + o) / (1 << 21);
          while (f === 0);
          return f;
        }, r.int32 = e.next, r.quick = r, i && (i.x && l(i, e), r.state = function() {
          return l(e, {});
        }), r;
      }
      s && s.exports ? s.exports = v : this.xorshift7 = v;
    })(
      xn,
      u
    );
  }(B)), B.exports;
}
var G = { exports: {} }, pn = G.exports, P;
function hn() {
  return P || (P = 1, function(u) {
    (function(c, s, p) {
      function x(a) {
        var n = this;
        n.next = function() {
          var i = n.w, r = n.X, t = n.i, o, f;
          return n.w = i = i + 1640531527 | 0, f = r[t + 34 & 127], o = r[t = t + 1 & 127], f ^= f << 13, o ^= o << 17, f ^= f >>> 15, o ^= o >>> 12, f = r[t] = f ^ o, n.i = t, f + (i ^ i >>> 16) | 0;
        };
        function e(i, r) {
          var t, o, f, m, q, X = [], R = 128;
          for (r === (r | 0) ? (o = r, r = null) : (r = r + "\0", o = 0, R = Math.max(R, r.length)), f = 0, m = -32; m < R; ++m)
            r && (o ^= r.charCodeAt((m + 32) % r.length)), m === 0 && (q = o), o ^= o << 10, o ^= o >>> 15, o ^= o << 4, o ^= o >>> 13, m >= 0 && (q = q + 1640531527 | 0, t = X[m & 127] ^= o + q, f = t == 0 ? f + 1 : 0);
          for (f >= 128 && (X[(r && r.length || 0) & 127] = -1), f = 127, m = 4 * 128; m > 0; --m)
            o = X[f + 34 & 127], t = X[f = f + 1 & 127], o ^= o << 13, t ^= t << 17, o ^= o >>> 15, t ^= t >>> 12, X[f] = o ^ t;
          i.w = q, i.X = X, i.i = f;
        }
        e(n, a);
      }
      function l(a, n) {
        return n.i = a.i, n.w = a.w, n.X = a.X.slice(), n;
      }
      function v(a, n) {
        a == null && (a = +/* @__PURE__ */ new Date());
        var e = new x(a), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, o = (e.next() >>> 0) / 4294967296, f = (t + o) / (1 << 21);
          while (f === 0);
          return f;
        }, r.int32 = e.next, r.quick = r, i && (i.X && l(i, e), r.state = function() {
          return l(e, {});
        }), r;
      }
      s && s.exports ? s.exports = v : this.xor4096 = v;
    })(
      pn,
      // window object or global
      u
    );
  }(G)), G.exports;
}
var D = { exports: {} }, dn = D.exports, U;
function gn() {
  return U || (U = 1, function(u) {
    (function(c, s, p) {
      function x(a) {
        var n = this, e = "";
        n.next = function() {
          var r = n.b, t = n.c, o = n.d, f = n.a;
          return r = r << 25 ^ r >>> 7 ^ t, t = t - o | 0, o = o << 24 ^ o >>> 8 ^ f, f = f - r | 0, n.b = r = r << 20 ^ r >>> 12 ^ t, n.c = t = t - o | 0, n.d = o << 16 ^ t >>> 16 ^ f, n.a = f - r | 0;
        }, n.a = 0, n.b = 0, n.c = -1640531527, n.d = 1367130551, a === Math.floor(a) ? (n.a = a / 4294967296 | 0, n.b = a | 0) : e += a;
        for (var i = 0; i < e.length + 20; i++)
          n.b ^= e.charCodeAt(i) | 0, n.next();
      }
      function l(a, n) {
        return n.a = a.a, n.b = a.b, n.c = a.c, n.d = a.d, n;
      }
      function v(a, n) {
        var e = new x(a), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, o = (e.next() >>> 0) / 4294967296, f = (t + o) / (1 << 21);
          while (f === 0);
          return f;
        }, r.int32 = e.next, r.quick = r, i && (typeof i == "object" && l(i, e), r.state = function() {
          return l(e, {});
        }), r;
      }
      s && s.exports ? s.exports = v : this.tychei = v;
    })(
      dn,
      u
    );
  }(D)), D.exports;
}
var H = { exports: {} };
const wn = {}, yn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: wn
}, Symbol.toStringTag, { value: "Module" })), mn = /* @__PURE__ */ tn(yn);
var bn = H.exports, W;
function An() {
  return W || (W = 1, function(u) {
    (function(c, s, p) {
      var x = 256, l = 6, v = 52, a = "random", n = p.pow(x, l), e = p.pow(2, v), i = e * 2, r = x - 1, t;
      function o(h, d, y) {
        var w = [];
        d = d == !0 ? { entropy: !0 } : d || {};
        var g = X(q(
          d.entropy ? [h, $(s)] : h ?? R(),
          3
        ), w), b = new f(w), S = function() {
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
        }, S.double = S, X($(b.S), s), (d.pass || y || function(A, _, j, C) {
          return C && (C.S && m(C, b), A.state = function() {
            return m(b, {});
          }), j ? (p[a] = A, _) : A;
        })(
          S,
          g,
          "global" in d ? d.global : this == p,
          d.state
        );
      }
      function f(h) {
        var d, y = h.length, w = this, g = 0, b = w.i = w.j = 0, S = w.S = [];
        for (y || (h = [y++]); g < x; )
          S[g] = g++;
        for (g = 0; g < x; g++)
          S[g] = S[b = r & b + h[g % y] + (d = S[g])], S[b] = d;
        (w.g = function(A) {
          for (var _, j = 0, C = w.i, M = w.j, E = w.S; A--; )
            _ = E[C = r & C + 1], j = j * x + E[r & (E[C] = E[M = r & M + _]) + (E[M] = _)];
          return w.i = C, w.j = M, j;
        })(x);
      }
      function m(h, d) {
        return d.i = h.i, d.j = h.j, d.S = h.S.slice(), d;
      }
      function q(h, d) {
        var y = [], w = typeof h, g;
        if (d && w == "object")
          for (g in h)
            try {
              y.push(q(h[g], d - 1));
            } catch {
            }
        return y.length ? y : w == "string" ? h : h + "\0";
      }
      function X(h, d) {
        for (var y = h + "", w, g = 0; g < y.length; )
          d[r & g] = r & (w ^= d[r & g] * 19) + y.charCodeAt(g++);
        return $(d);
      }
      function R() {
        try {
          var h;
          return t && (h = t.randomBytes) ? h = h(x) : (h = new Uint8Array(x), (c.crypto || c.msCrypto).getRandomValues(h)), $(h);
        } catch {
          var d = c.navigator, y = d && d.plugins;
          return [+/* @__PURE__ */ new Date(), c, y, c.screen, $(s)];
        }
      }
      function $(h) {
        return String.fromCharCode.apply(0, h);
      }
      if (X(p.random(), s), u.exports) {
        u.exports = o;
        try {
          t = mn;
        } catch {
        }
      } else
        p["seed" + a] = o;
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
  var u = un(), c = fn(), s = ln(), p = vn(), x = hn(), l = gn(), v = An();
  return v.alea = u, v.xor128 = c, v.xorwow = s, v.xorshift7 = p, v.xor4096 = x, v.tychei = l, V = v, V;
}
var Xn = Sn();
const jn = /* @__PURE__ */ on(Xn);
function _n(u, c) {
  for (var s = -1, p = u == null ? 0 : u.length, x = Array(p); ++s < p; )
    x[s] = c(u[s], s, u);
  return x;
}
function qn(u, c) {
  return _n(c, function(s) {
    return u[s];
  });
}
function Cn(u) {
  return u == null ? [] : qn(u, Z(u));
}
var Rn = Math.floor, $n = Math.random;
function En(u, c) {
  return u + Rn($n() * (c - u + 1));
}
function K(u, c) {
  var s = -1, p = u.length, x = p - 1;
  for (c = c === void 0 ? p : c; ++s < c; ) {
    var l = En(s, x), v = u[l];
    u[l] = u[s], u[s] = v;
  }
  return u.length = c, u;
}
function Mn(u) {
  return K(nn(u));
}
function On(u) {
  return K(Cn(u));
}
function zn(u) {
  var c = rn(u) ? Mn : On;
  return c(u);
}
function Nn(u) {
  const c = u || 1, s = "mcq", p = "LRN Hide Alternatives:";
  Q().on("item:load", () => {
    const x = Y();
    Object.values(x).forEach((l) => {
      if (l.type === s)
        if (Tn(l))
          if (Bn(l, c))
            if (Gn(l))
              if (Dn(l.validation)) {
                const v = [], a = Hn(l.validation);
                Object.values(a).forEach((e) => {
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
function Tn(u) {
  return !u.multiple_responses || u.multiple_responses === !1;
}
function Bn(u, c) {
  return u.options.length - c > 1;
}
function Gn(u) {
  return "validation" in u ? u.validation : !1;
}
function Dn(u) {
  return !!(u.valid_response.value && u.valid_response.value.length);
}
function Hn(u) {
  return u.valid_response.value;
}
function Vn(u, c) {
  const s = jn(c);
  return zn(u.map((p) => ({ value: p, sort: s() }))).sort((p, x) => p.sort - x.sort).map(({ value: p }) => p);
}
const Pn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: Nn
}, Symbol.toStringTag, { value: "Module" }));
export {
  Pn as h,
  Nn as r
};
