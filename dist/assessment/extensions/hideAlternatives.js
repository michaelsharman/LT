import { c as xr, L as q } from "../../extensionsFactory-BHOEyOSK.js";
import { w as pr } from "../../dom-WlatGxUZ.js";
import { g as vr, a as gr } from "../../_commonjsHelpers-DQNKXVTB.js";
import { b as V, i as H, r as hr, f as dr } from "../../isObjectLike-B0-0sm4Y.js";
import { i as yr } from "../../isObject-B53jY8Qg.js";
function br(e, f) {
  for (var a = -1, l = e == null ? 0 : e.length, p = Array(l); ++a < l; )
    p[a] = f(e[a], a, e);
  return p;
}
var ar = Array.isArray, wr = "[object AsyncFunction]", mr = "[object Function]", jr = "[object GeneratorFunction]", Ar = "[object Proxy]";
function Tr(e) {
  if (!yr(e))
    return !1;
  var f = V(e);
  return f == mr || f == jr || f == wr || f == Ar;
}
function Er(e, f) {
  var a = -1, l = e.length;
  for (f || (f = Array(l)); ++a < l; )
    f[a] = e[a];
  return f;
}
var $r = 9007199254740991, Sr = /^(?:0|[1-9]\d*)$/;
function Or(e, f) {
  var a = typeof e;
  return f = f ?? $r, !!f && (a == "number" || a != "symbol" && Sr.test(e)) && e > -1 && e % 1 == 0 && e < f;
}
var Xr = 9007199254740991;
function ur(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Xr;
}
function qr(e) {
  return e != null && ur(e.length) && !Tr(e);
}
var _r = Object.prototype;
function Cr(e) {
  var f = e && e.constructor, a = typeof f == "function" && f.prototype || _r;
  return e === a;
}
function Rr(e, f) {
  for (var a = -1, l = Array(e); ++a < e; )
    l[a] = f(a);
  return l;
}
var Ir = "[object Arguments]";
function K(e) {
  return H(e) && V(e) == Ir;
}
var sr = Object.prototype, Mr = sr.hasOwnProperty, Br = sr.propertyIsEnumerable, Pr = K(/* @__PURE__ */ function() {
  return arguments;
}()) ? K : function(e) {
  return H(e) && Mr.call(e, "callee") && !Br.call(e, "callee");
};
function Fr() {
  return !1;
}
var fr = typeof exports == "object" && exports && !exports.nodeType && exports, W = fr && typeof module == "object" && module && !module.nodeType && module, Gr = W && W.exports === fr, J = Gr ? hr.Buffer : void 0, Nr = J ? J.isBuffer : void 0, Lr = Nr || Fr, Ur = "[object Arguments]", zr = "[object Array]", Dr = "[object Boolean]", Vr = "[object Date]", Hr = "[object Error]", Kr = "[object Function]", Wr = "[object Map]", Jr = "[object Number]", Qr = "[object Object]", Yr = "[object RegExp]", Zr = "[object Set]", kr = "[object String]", re = "[object WeakMap]", ee = "[object ArrayBuffer]", te = "[object DataView]", ne = "[object Float32Array]", oe = "[object Float64Array]", ie = "[object Int8Array]", ae = "[object Int16Array]", ue = "[object Int32Array]", se = "[object Uint8Array]", fe = "[object Uint8ClampedArray]", ce = "[object Uint16Array]", le = "[object Uint32Array]", d = {};
d[ne] = d[oe] = d[ie] = d[ae] = d[ue] = d[se] = d[fe] = d[ce] = d[le] = !0;
d[Ur] = d[zr] = d[ee] = d[Dr] = d[te] = d[Vr] = d[Hr] = d[Kr] = d[Wr] = d[Jr] = d[Qr] = d[Yr] = d[Zr] = d[kr] = d[re] = !1;
function xe(e) {
  return H(e) && ur(e.length) && !!d[V(e)];
}
function pe(e) {
  return function(f) {
    return e(f);
  };
}
var cr = typeof exports == "object" && exports && !exports.nodeType && exports, I = cr && typeof module == "object" && module && !module.nodeType && module, ve = I && I.exports === cr, z = ve && dr.process, Q = function() {
  try {
    var e = I && I.require && I.require("util").types;
    return e || z && z.binding && z.binding("util");
  } catch {
  }
}(), Y = Q && Q.isTypedArray, ge = Y ? pe(Y) : xe, he = Object.prototype, de = he.hasOwnProperty;
function ye(e, f) {
  var a = ar(e), l = !a && Pr(e), p = !a && !l && Lr(e), x = !a && !l && !p && ge(e), v = a || l || p || x, u = v ? Rr(e.length, String) : [], r = u.length;
  for (var t in e)
    de.call(e, t) && !(v && // Safari 9 has enumerable `arguments.length` in strict mode.
    (t == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    p && (t == "offset" || t == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    x && (t == "buffer" || t == "byteLength" || t == "byteOffset") || // Skip index properties.
    Or(t, r))) && u.push(t);
  return u;
}
function be(e, f) {
  return function(a) {
    return e(f(a));
  };
}
var we = be(Object.keys, Object), me = Object.prototype, je = me.hasOwnProperty;
function Ae(e) {
  if (!Cr(e))
    return we(e);
  var f = [];
  for (var a in Object(e))
    je.call(e, a) && a != "constructor" && f.push(a);
  return f;
}
function Te(e) {
  return qr(e) ? ye(e) : Ae(e);
}
function Ee(e, f) {
  return br(f, function(a) {
    return e[a];
  });
}
function $e(e) {
  return e == null ? [] : Ee(e, Te(e));
}
var Se = Math.floor, Oe = Math.random;
function Xe(e, f) {
  return e + Se(Oe() * (f - e + 1));
}
function lr(e, f) {
  var a = -1, l = e.length, p = l - 1;
  for (f = f === void 0 ? l : f; ++a < f; ) {
    var x = Xe(a, p), v = e[x];
    e[x] = e[a], e[a] = v;
  }
  return e.length = f, e;
}
function qe(e) {
  return lr(Er(e));
}
function _e(e) {
  return lr($e(e));
}
function Ce(e) {
  var f = ar(e) ? qe : _e;
  return f(e);
}
var B = { exports: {} }, Re = B.exports, Z;
function Ie() {
  return Z || (Z = 1, function(e) {
    (function(f, a, l) {
      function p(r) {
        var t = this, i = u();
        t.next = function() {
          var n = 2091639 * t.s0 + t.c * 23283064365386963e-26;
          return t.s0 = t.s1, t.s1 = t.s2, t.s2 = n - (t.c = n | 0);
        }, t.c = 1, t.s0 = i(" "), t.s1 = i(" "), t.s2 = i(" "), t.s0 -= i(r), t.s0 < 0 && (t.s0 += 1), t.s1 -= i(r), t.s1 < 0 && (t.s1 += 1), t.s2 -= i(r), t.s2 < 0 && (t.s2 += 1), i = null;
      }
      function x(r, t) {
        return t.c = r.c, t.s0 = r.s0, t.s1 = r.s1, t.s2 = r.s2, t;
      }
      function v(r, t) {
        var i = new p(r), n = t && t.state, o = i.next;
        return o.int32 = function() {
          return i.next() * 4294967296 | 0;
        }, o.double = function() {
          return o() + (o() * 2097152 | 0) * 11102230246251565e-32;
        }, o.quick = o, n && (typeof n == "object" && x(n, i), o.state = function() {
          return x(i, {});
        }), o;
      }
      function u() {
        var r = 4022871197, t = function(i) {
          i = String(i);
          for (var n = 0; n < i.length; n++) {
            r += i.charCodeAt(n);
            var o = 0.02519603282416938 * r;
            r = o >>> 0, o -= r, o *= r, r = o >>> 0, o -= r, r += o * 4294967296;
          }
          return (r >>> 0) * 23283064365386963e-26;
        };
        return t;
      }
      a && a.exports ? a.exports = v : this.alea = v;
    })(
      Re,
      e
    );
  }(B)), B.exports;
}
var P = { exports: {} }, Me = P.exports, k;
function Be() {
  return k || (k = 1, function(e) {
    (function(f, a, l) {
      function p(u) {
        var r = this, t = "";
        r.x = 0, r.y = 0, r.z = 0, r.w = 0, r.next = function() {
          var n = r.x ^ r.x << 11;
          return r.x = r.y, r.y = r.z, r.z = r.w, r.w ^= r.w >>> 19 ^ n ^ n >>> 8;
        }, u === (u | 0) ? r.x = u : t += u;
        for (var i = 0; i < t.length + 64; i++)
          r.x ^= t.charCodeAt(i) | 0, r.next();
      }
      function x(u, r) {
        return r.x = u.x, r.y = u.y, r.z = u.z, r.w = u.w, r;
      }
      function v(u, r) {
        var t = new p(u), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, s = (t.next() >>> 0) / 4294967296, c = (o + s) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (typeof i == "object" && x(i, t), n.state = function() {
          return x(t, {});
        }), n;
      }
      a && a.exports ? a.exports = v : this.xor128 = v;
    })(
      Me,
      e
    );
  }(P)), P.exports;
}
var F = { exports: {} }, Pe = F.exports, rr;
function Fe() {
  return rr || (rr = 1, function(e) {
    (function(f, a, l) {
      function p(u) {
        var r = this, t = "";
        r.next = function() {
          var n = r.x ^ r.x >>> 2;
          return r.x = r.y, r.y = r.z, r.z = r.w, r.w = r.v, (r.d = r.d + 362437 | 0) + (r.v = r.v ^ r.v << 4 ^ (n ^ n << 1)) | 0;
        }, r.x = 0, r.y = 0, r.z = 0, r.w = 0, r.v = 0, u === (u | 0) ? r.x = u : t += u;
        for (var i = 0; i < t.length + 64; i++)
          r.x ^= t.charCodeAt(i) | 0, i == t.length && (r.d = r.x << 10 ^ r.x >>> 4), r.next();
      }
      function x(u, r) {
        return r.x = u.x, r.y = u.y, r.z = u.z, r.w = u.w, r.v = u.v, r.d = u.d, r;
      }
      function v(u, r) {
        var t = new p(u), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, s = (t.next() >>> 0) / 4294967296, c = (o + s) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (typeof i == "object" && x(i, t), n.state = function() {
          return x(t, {});
        }), n;
      }
      a && a.exports ? a.exports = v : this.xorwow = v;
    })(
      Pe,
      e
    );
  }(F)), F.exports;
}
var G = { exports: {} }, Ge = G.exports, er;
function Ne() {
  return er || (er = 1, function(e) {
    (function(f, a, l) {
      function p(u) {
        var r = this;
        r.next = function() {
          var i = r.x, n = r.i, o, s;
          return o = i[n], o ^= o >>> 7, s = o ^ o << 24, o = i[n + 1 & 7], s ^= o ^ o >>> 10, o = i[n + 3 & 7], s ^= o ^ o >>> 3, o = i[n + 4 & 7], s ^= o ^ o << 7, o = i[n + 7 & 7], o = o ^ o << 13, s ^= o ^ o << 9, i[n] = s, r.i = n + 1 & 7, s;
        };
        function t(i, n) {
          var o, s = [];
          if (n === (n | 0))
            s[0] = n;
          else
            for (n = "" + n, o = 0; o < n.length; ++o)
              s[o & 7] = s[o & 7] << 15 ^ n.charCodeAt(o) + s[o + 1 & 7] << 13;
          for (; s.length < 8; ) s.push(0);
          for (o = 0; o < 8 && s[o] === 0; ++o) ;
          for (o == 8 ? s[7] = -1 : s[o], i.x = s, i.i = 0, o = 256; o > 0; --o)
            i.next();
        }
        t(r, u);
      }
      function x(u, r) {
        return r.x = u.x.slice(), r.i = u.i, r;
      }
      function v(u, r) {
        u == null && (u = +/* @__PURE__ */ new Date());
        var t = new p(u), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, s = (t.next() >>> 0) / 4294967296, c = (o + s) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (i.x && x(i, t), n.state = function() {
          return x(t, {});
        }), n;
      }
      a && a.exports ? a.exports = v : this.xorshift7 = v;
    })(
      Ge,
      e
    );
  }(G)), G.exports;
}
var N = { exports: {} }, Le = N.exports, tr;
function Ue() {
  return tr || (tr = 1, function(e) {
    (function(f, a, l) {
      function p(u) {
        var r = this;
        r.next = function() {
          var i = r.w, n = r.X, o = r.i, s, c;
          return r.w = i = i + 1640531527 | 0, c = n[o + 34 & 127], s = n[o = o + 1 & 127], c ^= c << 13, s ^= s << 17, c ^= c >>> 15, s ^= s >>> 12, c = n[o] = c ^ s, r.i = o, c + (i ^ i >>> 16) | 0;
        };
        function t(i, n) {
          var o, s, c, m, O, E = [], _ = 128;
          for (n === (n | 0) ? (s = n, n = null) : (n = n + "\0", s = 0, _ = Math.max(_, n.length)), c = 0, m = -32; m < _; ++m)
            n && (s ^= n.charCodeAt((m + 32) % n.length)), m === 0 && (O = s), s ^= s << 10, s ^= s >>> 15, s ^= s << 4, s ^= s >>> 13, m >= 0 && (O = O + 1640531527 | 0, o = E[m & 127] ^= s + O, c = o == 0 ? c + 1 : 0);
          for (c >= 128 && (E[(n && n.length || 0) & 127] = -1), c = 127, m = 512; m > 0; --m)
            s = E[c + 34 & 127], o = E[c = c + 1 & 127], s ^= s << 13, o ^= o << 17, s ^= s >>> 15, o ^= o >>> 12, E[c] = s ^ o;
          i.w = O, i.X = E, i.i = c;
        }
        t(r, u);
      }
      function x(u, r) {
        return r.i = u.i, r.w = u.w, r.X = u.X.slice(), r;
      }
      function v(u, r) {
        u == null && (u = +/* @__PURE__ */ new Date());
        var t = new p(u), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, s = (t.next() >>> 0) / 4294967296, c = (o + s) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (i.X && x(i, t), n.state = function() {
          return x(t, {});
        }), n;
      }
      a && a.exports ? a.exports = v : this.xor4096 = v;
    })(
      Le,
      // window object or global
      e
    );
  }(N)), N.exports;
}
var L = { exports: {} }, ze = L.exports, nr;
function De() {
  return nr || (nr = 1, function(e) {
    (function(f, a, l) {
      function p(u) {
        var r = this, t = "";
        r.next = function() {
          var n = r.b, o = r.c, s = r.d, c = r.a;
          return n = n << 25 ^ n >>> 7 ^ o, o = o - s | 0, s = s << 24 ^ s >>> 8 ^ c, c = c - n | 0, r.b = n = n << 20 ^ n >>> 12 ^ o, r.c = o = o - s | 0, r.d = s << 16 ^ o >>> 16 ^ c, r.a = c - n | 0;
        }, r.a = 0, r.b = 0, r.c = -1640531527, r.d = 1367130551, u === Math.floor(u) ? (r.a = u / 4294967296 | 0, r.b = u | 0) : t += u;
        for (var i = 0; i < t.length + 20; i++)
          r.b ^= t.charCodeAt(i) | 0, r.next();
      }
      function x(u, r) {
        return r.a = u.a, r.b = u.b, r.c = u.c, r.d = u.d, r;
      }
      function v(u, r) {
        var t = new p(u), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, s = (t.next() >>> 0) / 4294967296, c = (o + s) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (typeof i == "object" && x(i, t), n.state = function() {
          return x(t, {});
        }), n;
      }
      a && a.exports ? a.exports = v : this.tychei = v;
    })(
      ze,
      e
    );
  }(L)), L.exports;
}
var U = { exports: {} };
const Ve = {}, He = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Ve
}, Symbol.toStringTag, { value: "Module" })), Ke = /* @__PURE__ */ vr(He);
var We = U.exports, or;
function Je() {
  return or || (or = 1, function(e) {
    (function(f, a, l) {
      var p = 256, x = 6, v = 52, u = "random", r = l.pow(p, x), t = l.pow(2, v), i = t * 2, n = p - 1, o;
      function s(g, h, w) {
        var b = [];
        h = h == !0 ? { entropy: !0 } : h || {};
        var y = E(O(
          h.entropy ? [g, C(a)] : g ?? _(),
          3
        ), b), j = new c(b), T = function() {
          for (var A = j.g(x), S = r, $ = 0; A < t; )
            A = (A + $) * p, S *= p, $ = j.g(1);
          for (; A >= i; )
            A /= 2, S /= 2, $ >>>= 1;
          return (A + $) / S;
        };
        return T.int32 = function() {
          return j.g(4) | 0;
        }, T.quick = function() {
          return j.g(4) / 4294967296;
        }, T.double = T, E(C(j.S), a), (h.pass || w || function(A, S, $, X) {
          return X && (X.S && m(X, j), A.state = function() {
            return m(j, {});
          }), $ ? (l[u] = A, S) : A;
        })(
          T,
          y,
          "global" in h ? h.global : this == l,
          h.state
        );
      }
      function c(g) {
        var h, w = g.length, b = this, y = 0, j = b.i = b.j = 0, T = b.S = [];
        for (w || (g = [w++]); y < p; )
          T[y] = y++;
        for (y = 0; y < p; y++)
          T[y] = T[j = n & j + g[y % w] + (h = T[y])], T[j] = h;
        (b.g = function(A) {
          for (var S, $ = 0, X = b.i, M = b.j, R = b.S; A--; )
            S = R[X = n & X + 1], $ = $ * p + R[n & (R[X] = R[M = n & M + S]) + (R[M] = S)];
          return b.i = X, b.j = M, $;
        })(p);
      }
      function m(g, h) {
        return h.i = g.i, h.j = g.j, h.S = g.S.slice(), h;
      }
      function O(g, h) {
        var w = [], b = typeof g, y;
        if (h && b == "object")
          for (y in g)
            try {
              w.push(O(g[y], h - 1));
            } catch {
            }
        return w.length ? w : b == "string" ? g : g + "\0";
      }
      function E(g, h) {
        for (var w = g + "", b, y = 0; y < w.length; )
          h[n & y] = n & (b ^= h[n & y] * 19) + w.charCodeAt(y++);
        return C(h);
      }
      function _() {
        try {
          var g;
          return o && (g = o.randomBytes) ? g = g(p) : (g = new Uint8Array(p), (f.crypto || f.msCrypto).getRandomValues(g)), C(g);
        } catch {
          var h = f.navigator, w = h && h.plugins;
          return [+/* @__PURE__ */ new Date(), f, w, f.screen, C(a)];
        }
      }
      function C(g) {
        return String.fromCharCode.apply(0, g);
      }
      if (E(l.random(), a), e.exports) {
        e.exports = s;
        try {
          o = Ke;
        } catch {
        }
      } else
        l["seed" + u] = s;
    })(
      // global: `self` in browsers (including strict mode and web workers),
      // otherwise `this` in Node and other environments
      typeof self < "u" ? self : We,
      [],
      // pool: entropy pool starts empty
      Math
      // math: package containing random, pow, and seedrandom
    );
  }(U)), U.exports;
}
var D, ir;
function Qe() {
  if (ir) return D;
  ir = 1;
  var e = Ie(), f = Be(), a = Fe(), l = Ne(), p = Ue(), x = De(), v = Je();
  return v.alea = e, v.xor128 = f, v.xorwow = a, v.xorshift7 = l, v.xor4096 = p, v.tychei = x, D = v, D;
}
var Ye = Qe();
const Ze = /* @__PURE__ */ gr(Ye);
function ke(e) {
  const { numToHide: f = 1 } = e || {}, a = "mcq", l = "LRN Hide Alternatives:";
  q.itemsApp().on("item:load", () => {
    const p = q.questions();
    Object.values(p).forEach((x) => {
      if (x.type === a)
        if (rt(x))
          if (et(x, f))
            if (tt(x))
              if (nt(x.validation)) {
                const v = [], u = ot(x.validation);
                Object.values(u).forEach((t) => {
                  Object.values(x.options).forEach((i) => {
                    t !== i.value && v.push(String(i.value));
                  });
                });
                const r = [];
                for (let t = 0; t < f; t++)
                  r.push(it(v, x.response_id)[t]);
                pr(x.response_id, (t) => {
                  if (!t)
                    return;
                  const i = t.getElementsByClassName("lrn_mcqgroup");
                  if (i.length !== 0)
                    for (let n = 0; n < i[0].children.length; n++) {
                      const o = i[0].children[n].getElementsByClassName("lrn-input");
                      if (o.length !== 0)
                        for (const s of r)
                          o[0].getAttribute("value") === s && (i[0].children[n].style.display = "none");
                    }
                });
              } else
                q.utils.logger.info(l, "No correct answer found in validation object");
            else
              q.utils.logger.info(l, " No validation object found");
          else
            q.utils.logger.info(l, "Invalid number of options to hide:", f);
        else
          q.utils.logger.info(l, "Only supports single response mode");
    });
  });
}
function rt(e) {
  return !e.multiple_responses || e.multiple_responses === !1;
}
function et(e, f) {
  return e.options.length - f > 1;
}
function tt(e) {
  return "validation" in e ? e.validation : !1;
}
function nt(e) {
  return !!(e.valid_response.value && e.valid_response.value.length);
}
function ot(e) {
  return e.valid_response.value;
}
function it(e, f) {
  const a = Ze(f);
  return Ce(e.map((l) => ({ value: l, sort: a() }))).sort((l, p) => l.sort - p.sort).map(({ value: l }) => l);
}
const lt = xr("hideAlternatives", ke);
export {
  lt as hideAlternatives
};
