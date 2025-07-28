import { c as K, f as Q } from "./app-CnMVZMul.js";
import { w as Y, s as Z } from "./lodash-DCdxklKz.js";
import { l as O } from "./logger-BpyELtLr.js";
import { g as nn, a as rn } from "./_commonjsHelpers-1BW40pRg.js";
var M = { exports: {} }, en = M.exports, F;
function tn() {
  return F || (F = 1, function(l) {
    (function(d, s, f) {
      function v(n) {
        var e = this, i = o();
        e.next = function() {
          var r = 2091639 * e.s0 + e.c * 23283064365386963e-26;
          return e.s0 = e.s1, e.s1 = e.s2, e.s2 = r - (e.c = r | 0);
        }, e.c = 1, e.s0 = i(" "), e.s1 = i(" "), e.s2 = i(" "), e.s0 -= i(n), e.s0 < 0 && (e.s0 += 1), e.s1 -= i(n), e.s1 < 0 && (e.s1 += 1), e.s2 -= i(n), e.s2 < 0 && (e.s2 += 1), i = null;
      }
      function x(n, e) {
        return e.c = n.c, e.s0 = n.s0, e.s1 = n.s1, e.s2 = n.s2, e;
      }
      function c(n, e) {
        var i = new v(n), r = e && e.state, t = i.next;
        return t.int32 = function() {
          return i.next() * 4294967296 | 0;
        }, t.double = function() {
          return t() + (t() * 2097152 | 0) * 11102230246251565e-32;
        }, t.quick = t, r && (typeof r == "object" && x(r, i), t.state = function() {
          return x(i, {});
        }), t;
      }
      function o() {
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
      s && s.exports ? s.exports = c : f && f.amd ? f(function() {
        return c;
      }) : this.alea = c;
    })(
      en,
      l,
      // present in node.js
      !1
      // present with an AMD loader
    );
  }(M)), M.exports;
}
var N = { exports: {} }, on = N.exports, I;
function un() {
  return I || (I = 1, function(l) {
    (function(d, s, f) {
      function v(o) {
        var n = this, e = "";
        n.x = 0, n.y = 0, n.z = 0, n.w = 0, n.next = function() {
          var r = n.x ^ n.x << 11;
          return n.x = n.y, n.y = n.z, n.z = n.w, n.w ^= n.w >>> 19 ^ r ^ r >>> 8;
        }, o === (o | 0) ? n.x = o : e += o;
        for (var i = 0; i < e.length + 64; i++)
          n.x ^= e.charCodeAt(i) | 0, n.next();
      }
      function x(o, n) {
        return n.x = o.x, n.y = o.y, n.z = o.z, n.w = o.w, n;
      }
      function c(o, n) {
        var e = new v(o), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, u = (e.next() >>> 0) / 4294967296, a = (t + u) / (1 << 21);
          while (a === 0);
          return a;
        }, r.int32 = e.next, r.quick = r, i && (typeof i == "object" && x(i, e), r.state = function() {
          return x(e, {});
        }), r;
      }
      s && s.exports ? s.exports = c : f && f.amd ? f(function() {
        return c;
      }) : this.xor128 = c;
    })(
      on,
      l,
      // present in node.js
      !1
      // present with an AMD loader
    );
  }(N)), N.exports;
}
var T = { exports: {} }, an = T.exports, L;
function fn() {
  return L || (L = 1, function(l) {
    (function(d, s, f) {
      function v(o) {
        var n = this, e = "";
        n.next = function() {
          var r = n.x ^ n.x >>> 2;
          return n.x = n.y, n.y = n.z, n.z = n.w, n.w = n.v, (n.d = n.d + 362437 | 0) + (n.v = n.v ^ n.v << 4 ^ (r ^ r << 1)) | 0;
        }, n.x = 0, n.y = 0, n.z = 0, n.w = 0, n.v = 0, o === (o | 0) ? n.x = o : e += o;
        for (var i = 0; i < e.length + 64; i++)
          n.x ^= e.charCodeAt(i) | 0, i == e.length && (n.d = n.x << 10 ^ n.x >>> 4), n.next();
      }
      function x(o, n) {
        return n.x = o.x, n.y = o.y, n.z = o.z, n.w = o.w, n.v = o.v, n.d = o.d, n;
      }
      function c(o, n) {
        var e = new v(o), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, u = (e.next() >>> 0) / 4294967296, a = (t + u) / (1 << 21);
          while (a === 0);
          return a;
        }, r.int32 = e.next, r.quick = r, i && (typeof i == "object" && x(i, e), r.state = function() {
          return x(e, {});
        }), r;
      }
      s && s.exports ? s.exports = c : f && f.amd ? f(function() {
        return c;
      }) : this.xorwow = c;
    })(
      an,
      l,
      // present in node.js
      !1
      // present with an AMD loader
    );
  }(T)), T.exports;
}
var B = { exports: {} }, cn = B.exports, P;
function sn() {
  return P || (P = 1, function(l) {
    (function(d, s, f) {
      function v(o) {
        var n = this;
        n.next = function() {
          var i = n.x, r = n.i, t, u, a;
          return t = i[r], t ^= t >>> 7, u = t ^ t << 24, t = i[r + 1 & 7], u ^= t ^ t >>> 10, t = i[r + 3 & 7], u ^= t ^ t >>> 3, t = i[r + 4 & 7], u ^= t ^ t << 7, t = i[r + 7 & 7], t = t ^ t << 13, u ^= t ^ t << 9, i[r] = u, n.i = r + 1 & 7, u;
        };
        function e(i, r) {
          var t, u, a = [];
          if (r === (r | 0))
            u = a[0] = r;
          else
            for (r = "" + r, t = 0; t < r.length; ++t)
              a[t & 7] = a[t & 7] << 15 ^ r.charCodeAt(t) + a[t + 1 & 7] << 13;
          for (; a.length < 8; ) a.push(0);
          for (t = 0; t < 8 && a[t] === 0; ++t) ;
          for (t == 8 ? u = a[7] = -1 : u = a[t], i.x = a, i.i = 0, t = 256; t > 0; --t)
            i.next();
        }
        e(n, o);
      }
      function x(o, n) {
        return n.x = o.x.slice(), n.i = o.i, n;
      }
      function c(o, n) {
        o == null && (o = +/* @__PURE__ */ new Date());
        var e = new v(o), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, u = (e.next() >>> 0) / 4294967296, a = (t + u) / (1 << 21);
          while (a === 0);
          return a;
        }, r.int32 = e.next, r.quick = r, i && (i.x && x(i, e), r.state = function() {
          return x(e, {});
        }), r;
      }
      s && s.exports ? s.exports = c : f && f.amd ? f(function() {
        return c;
      }) : this.xorshift7 = c;
    })(
      cn,
      l,
      // present in node.js
      !1
      // present with an AMD loader
    );
  }(B)), B.exports;
}
var G = { exports: {} }, ln = G.exports, k;
function xn() {
  return k || (k = 1, function(l) {
    (function(d, s, f) {
      function v(o) {
        var n = this;
        n.next = function() {
          var i = n.w, r = n.X, t = n.i, u, a;
          return n.w = i = i + 1640531527 | 0, a = r[t + 34 & 127], u = r[t = t + 1 & 127], a ^= a << 13, u ^= u << 17, a ^= a >>> 15, u ^= u >>> 12, a = r[t] = a ^ u, n.i = t, a + (i ^ i >>> 16) | 0;
        };
        function e(i, r) {
          var t, u, a, m, S, A = [], $ = 128;
          for (r === (r | 0) ? (u = r, r = null) : (r = r + "\0", u = 0, $ = Math.max($, r.length)), a = 0, m = -32; m < $; ++m)
            r && (u ^= r.charCodeAt((m + 32) % r.length)), m === 0 && (S = u), u ^= u << 10, u ^= u >>> 15, u ^= u << 4, u ^= u >>> 13, m >= 0 && (S = S + 1640531527 | 0, t = A[m & 127] ^= u + S, a = t == 0 ? a + 1 : 0);
          for (a >= 128 && (A[(r && r.length || 0) & 127] = -1), a = 127, m = 4 * 128; m > 0; --m)
            u = A[a + 34 & 127], t = A[a = a + 1 & 127], u ^= u << 13, t ^= t << 17, u ^= u >>> 15, t ^= t >>> 12, A[a] = u ^ t;
          i.w = S, i.X = A, i.i = a;
        }
        e(n, o);
      }
      function x(o, n) {
        return n.i = o.i, n.w = o.w, n.X = o.X.slice(), n;
      }
      function c(o, n) {
        o == null && (o = +/* @__PURE__ */ new Date());
        var e = new v(o), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, u = (e.next() >>> 0) / 4294967296, a = (t + u) / (1 << 21);
          while (a === 0);
          return a;
        }, r.int32 = e.next, r.quick = r, i && (i.X && x(i, e), r.state = function() {
          return x(e, {});
        }), r;
      }
      s && s.exports ? s.exports = c : f && f.amd ? f(function() {
        return c;
      }) : this.xor4096 = c;
    })(
      ln,
      l,
      // present in node.js
      !1
      // present with an AMD loader
    );
  }(G)), G.exports;
}
var D = { exports: {} }, pn = D.exports, U;
function vn() {
  return U || (U = 1, function(l) {
    (function(d, s, f) {
      function v(o) {
        var n = this, e = "";
        n.next = function() {
          var r = n.b, t = n.c, u = n.d, a = n.a;
          return r = r << 25 ^ r >>> 7 ^ t, t = t - u | 0, u = u << 24 ^ u >>> 8 ^ a, a = a - r | 0, n.b = r = r << 20 ^ r >>> 12 ^ t, n.c = t = t - u | 0, n.d = u << 16 ^ t >>> 16 ^ a, n.a = a - r | 0;
        }, n.a = 0, n.b = 0, n.c = -1640531527, n.d = 1367130551, o === Math.floor(o) ? (n.a = o / 4294967296 | 0, n.b = o | 0) : e += o;
        for (var i = 0; i < e.length + 20; i++)
          n.b ^= e.charCodeAt(i) | 0, n.next();
      }
      function x(o, n) {
        return n.a = o.a, n.b = o.b, n.c = o.c, n.d = o.d, n;
      }
      function c(o, n) {
        var e = new v(o), i = n && n.state, r = function() {
          return (e.next() >>> 0) / 4294967296;
        };
        return r.double = function() {
          do
            var t = e.next() >>> 11, u = (e.next() >>> 0) / 4294967296, a = (t + u) / (1 << 21);
          while (a === 0);
          return a;
        }, r.int32 = e.next, r.quick = r, i && (typeof i == "object" && x(i, e), r.state = function() {
          return x(e, {});
        }), r;
      }
      s && s.exports ? s.exports = c : f && f.amd ? f(function() {
        return c;
      }) : this.tychei = c;
    })(
      pn,
      l,
      // present in node.js
      !1
      // present with an AMD loader
    );
  }(D)), D.exports;
}
var H = { exports: {} };
const hn = {}, dn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hn
}, Symbol.toStringTag, { value: "Module" })), gn = /* @__PURE__ */ nn(dn);
var wn = H.exports, W;
function yn() {
  return W || (W = 1, function(l) {
    (function(d, s, f) {
      var v = 256, x = 6, c = 52, o = "random", n = f.pow(v, x), e = f.pow(2, c), i = e * 2, r = v - 1, t;
      function u(p, h, y) {
        var w = [];
        h = h == !0 ? { entropy: !0 } : h || {};
        var g = A(S(
          h.entropy ? [p, z(s)] : p ?? $(),
          3
        ), w), b = new a(w), X = function() {
          for (var j = b.g(x), q = n, _ = 0; j < e; )
            j = (j + _) * v, q *= v, _ = b.g(1);
          for (; j >= i; )
            j /= 2, q /= 2, _ >>>= 1;
          return (j + _) / q;
        };
        return X.int32 = function() {
          return b.g(4) | 0;
        }, X.quick = function() {
          return b.g(4) / 4294967296;
        }, X.double = X, A(z(b.S), s), (h.pass || y || function(j, q, _, C) {
          return C && (C.S && m(C, b), j.state = function() {
            return m(b, {});
          }), _ ? (f[o] = j, q) : j;
        })(
          X,
          g,
          "global" in h ? h.global : this == f,
          h.state
        );
      }
      function a(p) {
        var h, y = p.length, w = this, g = 0, b = w.i = w.j = 0, X = w.S = [];
        for (y || (p = [y++]); g < v; )
          X[g] = g++;
        for (g = 0; g < v; g++)
          X[g] = X[b = r & b + p[g % y] + (h = X[g])], X[b] = h;
        (w.g = function(j) {
          for (var q, _ = 0, C = w.i, R = w.j, E = w.S; j--; )
            q = E[C = r & C + 1], _ = _ * v + E[r & (E[C] = E[R = r & R + q]) + (E[R] = q)];
          return w.i = C, w.j = R, _;
        })(v);
      }
      function m(p, h) {
        return h.i = p.i, h.j = p.j, h.S = p.S.slice(), h;
      }
      function S(p, h) {
        var y = [], w = typeof p, g;
        if (h && w == "object")
          for (g in p)
            try {
              y.push(S(p[g], h - 1));
            } catch {
            }
        return y.length ? y : w == "string" ? p : p + "\0";
      }
      function A(p, h) {
        for (var y = p + "", w, g = 0; g < y.length; )
          h[r & g] = r & (w ^= h[r & g] * 19) + y.charCodeAt(g++);
        return z(h);
      }
      function $() {
        try {
          var p;
          return t && (p = t.randomBytes) ? p = p(v) : (p = new Uint8Array(v), (d.crypto || d.msCrypto).getRandomValues(p)), z(p);
        } catch {
          var h = d.navigator, y = h && h.plugins;
          return [+/* @__PURE__ */ new Date(), d, y, d.screen, z(s)];
        }
      }
      function z(p) {
        return String.fromCharCode.apply(0, p);
      }
      if (A(f.random(), s), l.exports) {
        l.exports = u;
        try {
          t = gn;
        } catch {
        }
      } else f["seed" + o] = u;
    })(
      // global: `self` in browsers (including strict mode and web workers),
      // otherwise `this` in Node and other environments
      typeof self < "u" ? self : wn,
      [],
      // pool: entropy pool starts empty
      Math
      // math: package containing random, pow, and seedrandom
    );
  }(H)), H.exports;
}
var V, J;
function mn() {
  if (J) return V;
  J = 1;
  var l = tn(), d = un(), s = fn(), f = sn(), v = xn(), x = vn(), c = yn();
  return c.alea = l, c.xor128 = d, c.xorwow = s, c.xorshift7 = f, c.xor4096 = v, c.tychei = x, V = c, V;
}
var bn = mn();
const jn = /* @__PURE__ */ rn(bn);
function Xn(l) {
  const d = l || 1, s = "mcq", f = "LRN Hide Alternatives:";
  K().on("item:load", () => {
    const v = Q();
    Object.values(v).forEach((x) => {
      if (x.type === s)
        if (An(x))
          if (_n(x, d))
            if (qn(x))
              if (Sn(x.validation)) {
                const c = [], o = Cn(x.validation);
                Object.values(o).forEach((e) => {
                  Object.values(x.options).forEach((i) => {
                    e !== i.value && c.push(String(i.value));
                  });
                });
                const n = [];
                for (let e = 0; e < d; e++)
                  n.push($n(c, x.response_id)[e]);
                Y(x.response_id, (e) => {
                  if (!e)
                    return;
                  const i = e.getElementsByClassName("lrn_mcqgroup");
                  if (i.length !== 0)
                    for (let r = 0; r < i[0].children.length; r++) {
                      const t = i[0].children[r].getElementsByClassName("lrn-input");
                      if (t.length !== 0)
                        for (const u of n)
                          t[0].getAttribute("value") === u && (i[0].children[r].style.display = "none");
                    }
                });
              } else
                O.info(f, "No correct answer found in validation object");
            else
              O.info(f, " No validation object found");
          else
            O.info(f, "Invalid number of options to hide:", d);
        else
          O.info(f, "Only supports single response mode");
    });
  });
}
function An(l) {
  return !l.multiple_responses || l.multiple_responses === !1;
}
function _n(l, d) {
  return l.options.length - d > 1;
}
function qn(l) {
  return "validation" in l ? l.validation : !1;
}
function Sn(l) {
  return !!(l.valid_response.value && l.valid_response.value.length);
}
function Cn(l) {
  return l.valid_response.value;
}
function $n(l, d) {
  const s = jn(d);
  return Z(l.map((f) => ({ value: f, sort: s() }))).sort((f, v) => f.sort - v.sort).map(({ value: f }) => f);
}
const Mn = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: Xn
}, Symbol.toStringTag, { value: "Module" }));
export {
  Mn as h,
  Xn as r
};
