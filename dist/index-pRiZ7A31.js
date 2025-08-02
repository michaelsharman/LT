import { c as pr, f as xr } from "./app-DzUv0oqG.js";
import { w as vr } from "./dom-WlatGxUZ.js";
import R from "./logger.js";
import { g as gr, a as hr } from "./_commonjsHelpers-DQNKXVTB.js";
import { b as V, i as H, r as dr, f as yr } from "./isObjectLike-B0-0sm4Y.js";
import { i as br } from "./isObject-B53jY8Qg.js";
var B = { exports: {} }, mr = B.exports, K;
function wr() {
  return K || (K = 1, function(e) {
    (function(s, f, l) {
      function x(r) {
        var t = this, i = a();
        t.next = function() {
          var n = 2091639 * t.s0 + t.c * 23283064365386963e-26;
          return t.s0 = t.s1, t.s1 = t.s2, t.s2 = n - (t.c = n | 0);
        }, t.c = 1, t.s0 = i(" "), t.s1 = i(" "), t.s2 = i(" "), t.s0 -= i(r), t.s0 < 0 && (t.s0 += 1), t.s1 -= i(r), t.s1 < 0 && (t.s1 += 1), t.s2 -= i(r), t.s2 < 0 && (t.s2 += 1), i = null;
      }
      function p(r, t) {
        return t.c = r.c, t.s0 = r.s0, t.s1 = r.s1, t.s2 = r.s2, t;
      }
      function v(r, t) {
        var i = new x(r), n = t && t.state, o = i.next;
        return o.int32 = function() {
          return i.next() * 4294967296 | 0;
        }, o.double = function() {
          return o() + (o() * 2097152 | 0) * 11102230246251565e-32;
        }, o.quick = o, n && (typeof n == "object" && p(n, i), o.state = function() {
          return p(i, {});
        }), o;
      }
      function a() {
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
      f.exports ? f.exports = v : this.alea = v;
    })(
      mr,
      e
    );
  }(B)), B.exports;
}
var P = { exports: {} }, jr = P.exports, W;
function Ar() {
  return W || (W = 1, function(e) {
    (function(s, f, l) {
      function x(a) {
        var r = this, t = "";
        r.x = 0, r.y = 0, r.z = 0, r.w = 0, r.next = function() {
          var n = r.x ^ r.x << 11;
          return r.x = r.y, r.y = r.z, r.z = r.w, r.w ^= r.w >>> 19 ^ n ^ n >>> 8;
        }, a === (a | 0) ? r.x = a : t += a;
        for (var i = 0; i < t.length + 64; i++)
          r.x ^= t.charCodeAt(i) | 0, r.next();
      }
      function p(a, r) {
        return r.x = a.x, r.y = a.y, r.z = a.z, r.w = a.w, r;
      }
      function v(a, r) {
        var t = new x(a), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, u = (t.next() >>> 0) / 4294967296, c = (o + u) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (typeof i == "object" && p(i, t), n.state = function() {
          return p(t, {});
        }), n;
      }
      f.exports ? f.exports = v : this.xor128 = v;
    })(
      jr,
      e
    );
  }(P)), P.exports;
}
var F = { exports: {} }, Tr = F.exports, J;
function Sr() {
  return J || (J = 1, function(e) {
    (function(s, f, l) {
      function x(a) {
        var r = this, t = "";
        r.next = function() {
          var n = r.x ^ r.x >>> 2;
          return r.x = r.y, r.y = r.z, r.z = r.w, r.w = r.v, (r.d = r.d + 362437 | 0) + (r.v = r.v ^ r.v << 4 ^ (n ^ n << 1)) | 0;
        }, r.x = 0, r.y = 0, r.z = 0, r.w = 0, r.v = 0, a === (a | 0) ? r.x = a : t += a;
        for (var i = 0; i < t.length + 64; i++)
          r.x ^= t.charCodeAt(i) | 0, i == t.length && (r.d = r.x << 10 ^ r.x >>> 4), r.next();
      }
      function p(a, r) {
        return r.x = a.x, r.y = a.y, r.z = a.z, r.w = a.w, r.v = a.v, r.d = a.d, r;
      }
      function v(a, r) {
        var t = new x(a), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, u = (t.next() >>> 0) / 4294967296, c = (o + u) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (typeof i == "object" && p(i, t), n.state = function() {
          return p(t, {});
        }), n;
      }
      f.exports ? f.exports = v : this.xorwow = v;
    })(
      Tr,
      e
    );
  }(F)), F.exports;
}
var G = { exports: {} }, Er = G.exports, Q;
function Or() {
  return Q || (Q = 1, function(e) {
    (function(s, f, l) {
      function x(a) {
        var r = this;
        r.next = function() {
          var i = r.x, n = r.i, o, u;
          return o = i[n], o ^= o >>> 7, u = o ^ o << 24, o = i[n + 1 & 7], u ^= o ^ o >>> 10, o = i[n + 3 & 7], u ^= o ^ o >>> 3, o = i[n + 4 & 7], u ^= o ^ o << 7, o = i[n + 7 & 7], o = o ^ o << 13, u ^= o ^ o << 9, i[n] = u, r.i = n + 1 & 7, u;
        };
        function t(i, n) {
          var o, u = [];
          if (n === (n | 0))
            u[0] = n;
          else
            for (n = "" + n, o = 0; o < n.length; ++o)
              u[o & 7] = u[o & 7] << 15 ^ n.charCodeAt(o) + u[o + 1 & 7] << 13;
          for (; u.length < 8; ) u.push(0);
          for (o = 0; o < 8 && u[o] === 0; ++o) ;
          for (o == 8 ? u[7] = -1 : u[o], i.x = u, i.i = 0, o = 256; o > 0; --o)
            i.next();
        }
        t(r, a);
      }
      function p(a, r) {
        return r.x = a.x.slice(), r.i = a.i, r;
      }
      function v(a, r) {
        a == null && (a = +/* @__PURE__ */ new Date());
        var t = new x(a), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, u = (t.next() >>> 0) / 4294967296, c = (o + u) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (i.x && p(i, t), n.state = function() {
          return p(t, {});
        }), n;
      }
      f.exports ? f.exports = v : this.xorshift7 = v;
    })(
      Er,
      e
    );
  }(G)), G.exports;
}
var N = { exports: {} }, $r = N.exports, Y;
function Xr() {
  return Y || (Y = 1, function(e) {
    (function(s, f, l) {
      function x(a) {
        var r = this;
        r.next = function() {
          var i = r.w, n = r.X, o = r.i, u, c;
          return r.w = i = i + 1640531527 | 0, c = n[o + 34 & 127], u = n[o = o + 1 & 127], c ^= c << 13, u ^= u << 17, c ^= c >>> 15, u ^= u >>> 12, c = n[o] = c ^ u, r.i = o, c + (i ^ i >>> 16) | 0;
        };
        function t(i, n) {
          var o, u, c, w, $, S = [], _ = 128;
          for (n === (n | 0) ? (u = n, n = null) : (n = n + "\0", u = 0, _ = Math.max(_, n.length)), c = 0, w = -32; w < _; ++w)
            n && (u ^= n.charCodeAt((w + 32) % n.length)), w === 0 && ($ = u), u ^= u << 10, u ^= u >>> 15, u ^= u << 4, u ^= u >>> 13, w >= 0 && ($ = $ + 1640531527 | 0, o = S[w & 127] ^= u + $, c = o == 0 ? c + 1 : 0);
          for (c >= 128 && (S[(n && n.length || 0) & 127] = -1), c = 127, w = 512; w > 0; --w)
            u = S[c + 34 & 127], o = S[c = c + 1 & 127], u ^= u << 13, o ^= o << 17, u ^= u >>> 15, o ^= o >>> 12, S[c] = u ^ o;
          i.w = $, i.X = S, i.i = c;
        }
        t(r, a);
      }
      function p(a, r) {
        return r.i = a.i, r.w = a.w, r.X = a.X.slice(), r;
      }
      function v(a, r) {
        a == null && (a = +/* @__PURE__ */ new Date());
        var t = new x(a), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, u = (t.next() >>> 0) / 4294967296, c = (o + u) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (i.X && p(i, t), n.state = function() {
          return p(t, {});
        }), n;
      }
      f.exports ? f.exports = v : this.xor4096 = v;
    })(
      $r,
      // window object or global
      e
    );
  }(N)), N.exports;
}
var z = { exports: {} }, _r = z.exports, Z;
function qr() {
  return Z || (Z = 1, function(e) {
    (function(s, f, l) {
      function x(a) {
        var r = this, t = "";
        r.next = function() {
          var n = r.b, o = r.c, u = r.d, c = r.a;
          return n = n << 25 ^ n >>> 7 ^ o, o = o - u | 0, u = u << 24 ^ u >>> 8 ^ c, c = c - n | 0, r.b = n = n << 20 ^ n >>> 12 ^ o, r.c = o = o - u | 0, r.d = u << 16 ^ o >>> 16 ^ c, r.a = c - n | 0;
        }, r.a = 0, r.b = 0, r.c = -1640531527, r.d = 1367130551, a === Math.floor(a) ? (r.a = a / 4294967296 | 0, r.b = a | 0) : t += a;
        for (var i = 0; i < t.length + 20; i++)
          r.b ^= t.charCodeAt(i) | 0, r.next();
      }
      function p(a, r) {
        return r.a = a.a, r.b = a.b, r.c = a.c, r.d = a.d, r;
      }
      function v(a, r) {
        var t = new x(a), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, u = (t.next() >>> 0) / 4294967296, c = (o + u) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (typeof i == "object" && p(i, t), n.state = function() {
          return p(t, {});
        }), n;
      }
      f.exports ? f.exports = v : this.tychei = v;
    })(
      _r,
      e
    );
  }(z)), z.exports;
}
var U = { exports: {} };
const Cr = {}, Ir = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Cr
}, Symbol.toStringTag, { value: "Module" })), Mr = /* @__PURE__ */ gr(Ir);
var Rr = U.exports, k;
function Br() {
  return k || (k = 1, function(e) {
    (function(s, f, l) {
      var x = 256, p = 6, v = 52, a = "random", r = l.pow(x, p), t = l.pow(2, v), i = t * 2, n = x - 1, o;
      function u(g, h, m) {
        var b = [];
        h = h == !0 ? { entropy: !0 } : h || {};
        var y = S($(
          h.entropy ? [g, q(f)] : g ?? _(),
          3
        ), b), j = new c(b), T = function() {
          for (var A = j.g(p), O = r, E = 0; A < t; )
            A = (A + E) * x, O *= x, E = j.g(1);
          for (; A >= i; )
            A /= 2, O /= 2, E >>>= 1;
          return (A + E) / O;
        };
        return T.int32 = function() {
          return j.g(4) | 0;
        }, T.quick = function() {
          return j.g(4) / 4294967296;
        }, T.double = T, S(q(j.S), f), (h.pass || m || function(A, O, E, X) {
          return X && (X.S && w(X, j), A.state = function() {
            return w(j, {});
          }), E ? (l[a] = A, O) : A;
        })(
          T,
          y,
          "global" in h ? h.global : this == l,
          h.state
        );
      }
      function c(g) {
        var h, m = g.length, b = this, y = 0, j = b.i = b.j = 0, T = b.S = [];
        for (m || (g = [m++]); y < x; )
          T[y] = y++;
        for (y = 0; y < x; y++)
          T[y] = T[j = n & j + g[y % m] + (h = T[y])], T[j] = h;
        (b.g = function(A) {
          for (var O, E = 0, X = b.i, M = b.j, C = b.S; A--; )
            O = C[X = n & X + 1], E = E * x + C[n & (C[X] = C[M = n & M + O]) + (C[M] = O)];
          return b.i = X, b.j = M, E;
        })(x);
      }
      function w(g, h) {
        return h.i = g.i, h.j = g.j, h.S = g.S.slice(), h;
      }
      function $(g, h) {
        var m = [], b = typeof g, y;
        if (h && b == "object")
          for (y in g)
            try {
              m.push($(g[y], h - 1));
            } catch {
            }
        return m.length ? m : b == "string" ? g : g + "\0";
      }
      function S(g, h) {
        for (var m = g + "", b, y = 0; y < m.length; )
          h[n & y] = n & (b ^= h[n & y] * 19) + m.charCodeAt(y++);
        return q(h);
      }
      function _() {
        try {
          var g;
          return o && (g = o.randomBytes) ? g = g(x) : (g = new Uint8Array(x), (s.crypto || s.msCrypto).getRandomValues(g)), q(g);
        } catch {
          var h = s.navigator, m = h && h.plugins;
          return [+/* @__PURE__ */ new Date(), s, m, s.screen, q(f)];
        }
      }
      function q(g) {
        return String.fromCharCode.apply(0, g);
      }
      if (S(l.random(), f), e.exports) {
        e.exports = u;
        try {
          o = Mr;
        } catch {
        }
      } else
        l["seed" + a] = u;
    })(
      // global: `self` in browsers (including strict mode and web workers),
      // otherwise `this` in Node and other environments
      typeof self < "u" ? self : Rr,
      [],
      // pool: entropy pool starts empty
      Math
      // math: package containing random, pow, and seedrandom
    );
  }(U)), U.exports;
}
var L, rr;
function Pr() {
  if (rr) return L;
  rr = 1;
  var e = wr(), s = Ar(), f = Sr(), l = Or(), x = Xr(), p = qr(), v = Br();
  return v.alea = e, v.xor128 = s, v.xorwow = f, v.xorshift7 = l, v.xor4096 = x, v.tychei = p, L = v, L;
}
var Fr = Pr();
const Gr = /* @__PURE__ */ hr(Fr);
function Nr(e, s) {
  for (var f = -1, l = e == null ? 0 : e.length, x = Array(l); ++f < l; )
    x[f] = s(e[f], f, e);
  return x;
}
var ar = Array.isArray, zr = "[object AsyncFunction]", Ur = "[object Function]", Lr = "[object GeneratorFunction]", Dr = "[object Proxy]";
function Vr(e) {
  if (!br(e))
    return !1;
  var s = V(e);
  return s == Ur || s == Lr || s == zr || s == Dr;
}
function Hr(e, s) {
  var f = -1, l = e.length;
  for (s || (s = Array(l)); ++f < l; )
    s[f] = e[f];
  return s;
}
var Kr = 9007199254740991, Wr = /^(?:0|[1-9]\d*)$/;
function Jr(e, s) {
  var f = typeof e;
  return s = s ?? Kr, !!s && (f == "number" || f != "symbol" && Wr.test(e)) && e > -1 && e % 1 == 0 && e < s;
}
var Qr = 9007199254740991;
function ur(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= Qr;
}
function Yr(e) {
  return e != null && ur(e.length) && !Vr(e);
}
var Zr = Object.prototype;
function kr(e) {
  var s = e && e.constructor, f = typeof s == "function" && s.prototype || Zr;
  return e === f;
}
function re(e, s) {
  for (var f = -1, l = Array(e); ++f < e; )
    l[f] = s(f);
  return l;
}
var ee = "[object Arguments]";
function er(e) {
  return H(e) && V(e) == ee;
}
var sr = Object.prototype, te = sr.hasOwnProperty, ne = sr.propertyIsEnumerable, oe = er(/* @__PURE__ */ function() {
  return arguments;
}()) ? er : function(e) {
  return H(e) && te.call(e, "callee") && !ne.call(e, "callee");
};
function ie() {
  return !1;
}
var fr = typeof exports == "object" && exports && !exports.nodeType && exports, tr = fr && typeof module == "object" && module && !module.nodeType && module, ae = tr && tr.exports === fr, nr = ae ? dr.Buffer : void 0, ue = nr ? nr.isBuffer : void 0, se = ue || ie, fe = "[object Arguments]", ce = "[object Array]", le = "[object Boolean]", pe = "[object Date]", xe = "[object Error]", ve = "[object Function]", ge = "[object Map]", he = "[object Number]", de = "[object Object]", ye = "[object RegExp]", be = "[object Set]", me = "[object String]", we = "[object WeakMap]", je = "[object ArrayBuffer]", Ae = "[object DataView]", Te = "[object Float32Array]", Se = "[object Float64Array]", Ee = "[object Int8Array]", Oe = "[object Int16Array]", $e = "[object Int32Array]", Xe = "[object Uint8Array]", _e = "[object Uint8ClampedArray]", qe = "[object Uint16Array]", Ce = "[object Uint32Array]", d = {};
d[Te] = d[Se] = d[Ee] = d[Oe] = d[$e] = d[Xe] = d[_e] = d[qe] = d[Ce] = !0;
d[fe] = d[ce] = d[je] = d[le] = d[Ae] = d[pe] = d[xe] = d[ve] = d[ge] = d[he] = d[de] = d[ye] = d[be] = d[me] = d[we] = !1;
function Ie(e) {
  return H(e) && ur(e.length) && !!d[V(e)];
}
function Me(e) {
  return function(s) {
    return e(s);
  };
}
var cr = typeof exports == "object" && exports && !exports.nodeType && exports, I = cr && typeof module == "object" && module && !module.nodeType && module, Re = I && I.exports === cr, D = Re && yr.process, or = function() {
  try {
    var e = I && I.require && I.require("util").types;
    return e || D && D.binding && D.binding("util");
  } catch {
  }
}(), ir = or && or.isTypedArray, Be = ir ? Me(ir) : Ie, Pe = Object.prototype, Fe = Pe.hasOwnProperty;
function Ge(e, s) {
  var f = ar(e), l = !f && oe(e), x = !f && !l && se(e), p = !f && !l && !x && Be(e), v = f || l || x || p, a = v ? re(e.length, String) : [], r = a.length;
  for (var t in e)
    Fe.call(e, t) && !(v && // Safari 9 has enumerable `arguments.length` in strict mode.
    (t == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    x && (t == "offset" || t == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    p && (t == "buffer" || t == "byteLength" || t == "byteOffset") || // Skip index properties.
    Jr(t, r))) && a.push(t);
  return a;
}
function Ne(e, s) {
  return function(f) {
    return e(s(f));
  };
}
var ze = Ne(Object.keys, Object), Ue = Object.prototype, Le = Ue.hasOwnProperty;
function De(e) {
  if (!kr(e))
    return ze(e);
  var s = [];
  for (var f in Object(e))
    Le.call(e, f) && f != "constructor" && s.push(f);
  return s;
}
function Ve(e) {
  return Yr(e) ? Ge(e) : De(e);
}
function He(e, s) {
  return Nr(s, function(f) {
    return e[f];
  });
}
function Ke(e) {
  return e == null ? [] : He(e, Ve(e));
}
var We = Math.floor, Je = Math.random;
function Qe(e, s) {
  return e + We(Je() * (s - e + 1));
}
function lr(e, s) {
  var f = -1, l = e.length, x = l - 1;
  for (s = s === void 0 ? l : s; ++f < s; ) {
    var p = Qe(f, x), v = e[p];
    e[p] = e[f], e[f] = v;
  }
  return e.length = s, e;
}
function Ye(e) {
  return lr(Hr(e));
}
function Ze(e) {
  return lr(Ke(e));
}
function ke(e) {
  var s = ar(e) ? Ye : Ze;
  return s(e);
}
function rt(e) {
  const s = e || 1, f = "mcq", l = "LRN Hide Alternatives:";
  pr().on("item:load", () => {
    const x = xr();
    Object.values(x).forEach((p) => {
      if (p.type === f)
        if (et(p))
          if (tt(p, s))
            if (nt(p))
              if (ot(p.validation)) {
                const v = [], a = it(p.validation);
                Object.values(a).forEach((t) => {
                  Object.values(p.options).forEach((i) => {
                    t !== i.value && v.push(String(i.value));
                  });
                });
                const r = [];
                for (let t = 0; t < s; t++)
                  r.push(at(v, p.response_id)[t]);
                vr(p.response_id, (t) => {
                  if (!t)
                    return;
                  const i = t.getElementsByClassName("lrn_mcqgroup");
                  if (i.length !== 0)
                    for (let n = 0; n < i[0].children.length; n++) {
                      const o = i[0].children[n].getElementsByClassName("lrn-input");
                      if (o.length !== 0)
                        for (const u of r)
                          o[0].getAttribute("value") === u && (i[0].children[n].style.display = "none");
                    }
                });
              } else
                R.info(l, "No correct answer found in validation object");
            else
              R.info(l, " No validation object found");
          else
            R.info(l, "Invalid number of options to hide:", s);
        else
          R.info(l, "Only supports single response mode");
    });
  });
}
function et(e) {
  return !e.multiple_responses || e.multiple_responses === !1;
}
function tt(e, s) {
  return e.options.length - s > 1;
}
function nt(e) {
  return "validation" in e ? e.validation : !1;
}
function ot(e) {
  return !!(e.valid_response.value && e.valid_response.value.length);
}
function it(e) {
  return e.valid_response.value;
}
function at(e, s) {
  const f = Gr(s);
  return ke(e.map((l) => ({ value: l, sort: f() }))).sort((l, x) => l.sort - x.sort).map(({ value: l }) => l);
}
const xt = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: rt
}, Symbol.toStringTag, { value: "Module" }));
export {
  xt as h,
  rt as r
};
