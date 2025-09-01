import { c as xr, L as q } from "../../extensionsFactory-CJF5B414.js";
import { w as pr } from "../../dom-WlatGxUZ.js";
import { g as vr, a as gr } from "../../_commonjsHelpers-DQNKXVTB.js";
import { b as V, i as H, r as hr, f as dr } from "../../isObjectLike-B0-0sm4Y.js";
import { i as yr } from "../../isObject-B53jY8Qg.js";
function br(e, s) {
  for (var f = -1, l = e == null ? 0 : e.length, p = Array(l); ++f < l; )
    p[f] = s(e[f], f, e);
  return p;
}
var ar = Array.isArray, mr = "[object AsyncFunction]", wr = "[object Function]", jr = "[object GeneratorFunction]", Ar = "[object Proxy]";
function Tr(e) {
  if (!yr(e))
    return !1;
  var s = V(e);
  return s == wr || s == jr || s == mr || s == Ar;
}
function Er(e, s) {
  var f = -1, l = e.length;
  for (s || (s = Array(l)); ++f < l; )
    s[f] = e[f];
  return s;
}
var $r = 9007199254740991, Sr = /^(?:0|[1-9]\d*)$/;
function Or(e, s) {
  var f = typeof e;
  return s = s ?? $r, !!s && (f == "number" || f != "symbol" && Sr.test(e)) && e > -1 && e % 1 == 0 && e < s;
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
  var s = e && e.constructor, f = typeof s == "function" && s.prototype || _r;
  return e === f;
}
function Rr(e, s) {
  for (var f = -1, l = Array(e); ++f < e; )
    l[f] = s(f);
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
  return function(s) {
    return e(s);
  };
}
var cr = typeof exports == "object" && exports && !exports.nodeType && exports, I = cr && typeof module == "object" && module && !module.nodeType && module, ve = I && I.exports === cr, z = ve && dr.process, Q = function() {
  try {
    var e = I && I.require && I.require("util").types;
    return e || z && z.binding && z.binding("util");
  } catch {
  }
}(), Y = Q && Q.isTypedArray, ge = Y ? pe(Y) : xe, he = Object.prototype, de = he.hasOwnProperty;
function ye(e, s) {
  var f = ar(e), l = !f && Pr(e), p = !f && !l && Lr(e), x = !f && !l && !p && ge(e), v = f || l || p || x, a = v ? Rr(e.length, String) : [], r = a.length;
  for (var t in e)
    de.call(e, t) && !(v && // Safari 9 has enumerable `arguments.length` in strict mode.
    (t == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    p && (t == "offset" || t == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    x && (t == "buffer" || t == "byteLength" || t == "byteOffset") || // Skip index properties.
    Or(t, r))) && a.push(t);
  return a;
}
function be(e, s) {
  return function(f) {
    return e(s(f));
  };
}
var me = be(Object.keys, Object), we = Object.prototype, je = we.hasOwnProperty;
function Ae(e) {
  if (!Cr(e))
    return me(e);
  var s = [];
  for (var f in Object(e))
    je.call(e, f) && f != "constructor" && s.push(f);
  return s;
}
function Te(e) {
  return qr(e) ? ye(e) : Ae(e);
}
function Ee(e, s) {
  return br(s, function(f) {
    return e[f];
  });
}
function $e(e) {
  return e == null ? [] : Ee(e, Te(e));
}
var Se = Math.floor, Oe = Math.random;
function Xe(e, s) {
  return e + Se(Oe() * (s - e + 1));
}
function lr(e, s) {
  var f = -1, l = e.length, p = l - 1;
  for (s = s === void 0 ? l : s; ++f < s; ) {
    var x = Xe(f, p), v = e[x];
    e[x] = e[f], e[f] = v;
  }
  return e.length = s, e;
}
function qe(e) {
  return lr(Er(e));
}
function _e(e) {
  return lr($e(e));
}
function Ce(e) {
  var s = ar(e) ? qe : _e;
  return s(e);
}
var B = { exports: {} }, Re = B.exports, Z;
function Ie() {
  return Z || (Z = 1, function(e) {
    (function(s, f, l) {
      function p(r) {
        var t = this, i = a();
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
      Re,
      e
    );
  }(B)), B.exports;
}
var P = { exports: {} }, Me = P.exports, k;
function Be() {
  return k || (k = 1, function(e) {
    (function(s, f, l) {
      function p(a) {
        var r = this, t = "";
        r.x = 0, r.y = 0, r.z = 0, r.w = 0, r.next = function() {
          var n = r.x ^ r.x << 11;
          return r.x = r.y, r.y = r.z, r.z = r.w, r.w ^= r.w >>> 19 ^ n ^ n >>> 8;
        }, a === (a | 0) ? r.x = a : t += a;
        for (var i = 0; i < t.length + 64; i++)
          r.x ^= t.charCodeAt(i) | 0, r.next();
      }
      function x(a, r) {
        return r.x = a.x, r.y = a.y, r.z = a.z, r.w = a.w, r;
      }
      function v(a, r) {
        var t = new p(a), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, u = (t.next() >>> 0) / 4294967296, c = (o + u) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (typeof i == "object" && x(i, t), n.state = function() {
          return x(t, {});
        }), n;
      }
      f.exports ? f.exports = v : this.xor128 = v;
    })(
      Me,
      e
    );
  }(P)), P.exports;
}
var F = { exports: {} }, Pe = F.exports, rr;
function Fe() {
  return rr || (rr = 1, function(e) {
    (function(s, f, l) {
      function p(a) {
        var r = this, t = "";
        r.next = function() {
          var n = r.x ^ r.x >>> 2;
          return r.x = r.y, r.y = r.z, r.z = r.w, r.w = r.v, (r.d = r.d + 362437 | 0) + (r.v = r.v ^ r.v << 4 ^ (n ^ n << 1)) | 0;
        }, r.x = 0, r.y = 0, r.z = 0, r.w = 0, r.v = 0, a === (a | 0) ? r.x = a : t += a;
        for (var i = 0; i < t.length + 64; i++)
          r.x ^= t.charCodeAt(i) | 0, i == t.length && (r.d = r.x << 10 ^ r.x >>> 4), r.next();
      }
      function x(a, r) {
        return r.x = a.x, r.y = a.y, r.z = a.z, r.w = a.w, r.v = a.v, r.d = a.d, r;
      }
      function v(a, r) {
        var t = new p(a), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, u = (t.next() >>> 0) / 4294967296, c = (o + u) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (typeof i == "object" && x(i, t), n.state = function() {
          return x(t, {});
        }), n;
      }
      f.exports ? f.exports = v : this.xorwow = v;
    })(
      Pe,
      e
    );
  }(F)), F.exports;
}
var G = { exports: {} }, Ge = G.exports, er;
function Ne() {
  return er || (er = 1, function(e) {
    (function(s, f, l) {
      function p(a) {
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
      function x(a, r) {
        return r.x = a.x.slice(), r.i = a.i, r;
      }
      function v(a, r) {
        a == null && (a = +/* @__PURE__ */ new Date());
        var t = new p(a), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, u = (t.next() >>> 0) / 4294967296, c = (o + u) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (i.x && x(i, t), n.state = function() {
          return x(t, {});
        }), n;
      }
      f.exports ? f.exports = v : this.xorshift7 = v;
    })(
      Ge,
      e
    );
  }(G)), G.exports;
}
var N = { exports: {} }, Le = N.exports, tr;
function Ue() {
  return tr || (tr = 1, function(e) {
    (function(s, f, l) {
      function p(a) {
        var r = this;
        r.next = function() {
          var i = r.w, n = r.X, o = r.i, u, c;
          return r.w = i = i + 1640531527 | 0, c = n[o + 34 & 127], u = n[o = o + 1 & 127], c ^= c << 13, u ^= u << 17, c ^= c >>> 15, u ^= u >>> 12, c = n[o] = c ^ u, r.i = o, c + (i ^ i >>> 16) | 0;
        };
        function t(i, n) {
          var o, u, c, w, O, E = [], _ = 128;
          for (n === (n | 0) ? (u = n, n = null) : (n = n + "\0", u = 0, _ = Math.max(_, n.length)), c = 0, w = -32; w < _; ++w)
            n && (u ^= n.charCodeAt((w + 32) % n.length)), w === 0 && (O = u), u ^= u << 10, u ^= u >>> 15, u ^= u << 4, u ^= u >>> 13, w >= 0 && (O = O + 1640531527 | 0, o = E[w & 127] ^= u + O, c = o == 0 ? c + 1 : 0);
          for (c >= 128 && (E[(n && n.length || 0) & 127] = -1), c = 127, w = 512; w > 0; --w)
            u = E[c + 34 & 127], o = E[c = c + 1 & 127], u ^= u << 13, o ^= o << 17, u ^= u >>> 15, o ^= o >>> 12, E[c] = u ^ o;
          i.w = O, i.X = E, i.i = c;
        }
        t(r, a);
      }
      function x(a, r) {
        return r.i = a.i, r.w = a.w, r.X = a.X.slice(), r;
      }
      function v(a, r) {
        a == null && (a = +/* @__PURE__ */ new Date());
        var t = new p(a), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, u = (t.next() >>> 0) / 4294967296, c = (o + u) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (i.X && x(i, t), n.state = function() {
          return x(t, {});
        }), n;
      }
      f.exports ? f.exports = v : this.xor4096 = v;
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
    (function(s, f, l) {
      function p(a) {
        var r = this, t = "";
        r.next = function() {
          var n = r.b, o = r.c, u = r.d, c = r.a;
          return n = n << 25 ^ n >>> 7 ^ o, o = o - u | 0, u = u << 24 ^ u >>> 8 ^ c, c = c - n | 0, r.b = n = n << 20 ^ n >>> 12 ^ o, r.c = o = o - u | 0, r.d = u << 16 ^ o >>> 16 ^ c, r.a = c - n | 0;
        }, r.a = 0, r.b = 0, r.c = -1640531527, r.d = 1367130551, a === Math.floor(a) ? (r.a = a / 4294967296 | 0, r.b = a | 0) : t += a;
        for (var i = 0; i < t.length + 20; i++)
          r.b ^= t.charCodeAt(i) | 0, r.next();
      }
      function x(a, r) {
        return r.a = a.a, r.b = a.b, r.c = a.c, r.d = a.d, r;
      }
      function v(a, r) {
        var t = new p(a), i = r && r.state, n = function() {
          return (t.next() >>> 0) / 4294967296;
        };
        return n.double = function() {
          do
            var o = t.next() >>> 11, u = (t.next() >>> 0) / 4294967296, c = (o + u) / (1 << 21);
          while (c === 0);
          return c;
        }, n.int32 = t.next, n.quick = n, i && (typeof i == "object" && x(i, t), n.state = function() {
          return x(t, {});
        }), n;
      }
      f.exports ? f.exports = v : this.tychei = v;
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
    (function(s, f, l) {
      var p = 256, x = 6, v = 52, a = "random", r = l.pow(p, x), t = l.pow(2, v), i = t * 2, n = p - 1, o;
      function u(g, h, m) {
        var b = [];
        h = h == !0 ? { entropy: !0 } : h || {};
        var y = E(O(
          h.entropy ? [g, C(f)] : g ?? _(),
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
        }, T.double = T, E(C(j.S), f), (h.pass || m || function(A, S, $, X) {
          return X && (X.S && w(X, j), A.state = function() {
            return w(j, {});
          }), $ ? (l[a] = A, S) : A;
        })(
          T,
          y,
          "global" in h ? h.global : this == l,
          h.state
        );
      }
      function c(g) {
        var h, m = g.length, b = this, y = 0, j = b.i = b.j = 0, T = b.S = [];
        for (m || (g = [m++]); y < p; )
          T[y] = y++;
        for (y = 0; y < p; y++)
          T[y] = T[j = n & j + g[y % m] + (h = T[y])], T[j] = h;
        (b.g = function(A) {
          for (var S, $ = 0, X = b.i, M = b.j, R = b.S; A--; )
            S = R[X = n & X + 1], $ = $ * p + R[n & (R[X] = R[M = n & M + S]) + (R[M] = S)];
          return b.i = X, b.j = M, $;
        })(p);
      }
      function w(g, h) {
        return h.i = g.i, h.j = g.j, h.S = g.S.slice(), h;
      }
      function O(g, h) {
        var m = [], b = typeof g, y;
        if (h && b == "object")
          for (y in g)
            try {
              m.push(O(g[y], h - 1));
            } catch {
            }
        return m.length ? m : b == "string" ? g : g + "\0";
      }
      function E(g, h) {
        for (var m = g + "", b, y = 0; y < m.length; )
          h[n & y] = n & (b ^= h[n & y] * 19) + m.charCodeAt(y++);
        return C(h);
      }
      function _() {
        try {
          var g;
          return o && (g = o.randomBytes) ? g = g(p) : (g = new Uint8Array(p), (s.crypto || s.msCrypto).getRandomValues(g)), C(g);
        } catch {
          var h = s.navigator, m = h && h.plugins;
          return [+/* @__PURE__ */ new Date(), s, m, s.screen, C(f)];
        }
      }
      function C(g) {
        return String.fromCharCode.apply(0, g);
      }
      if (E(l.random(), f), e.exports) {
        e.exports = u;
        try {
          o = Ke;
        } catch {
        }
      } else
        l["seed" + a] = u;
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
  var e = Ie(), s = Be(), f = Fe(), l = Ne(), p = Ue(), x = De(), v = Je();
  return v.alea = e, v.xor128 = s, v.xorwow = f, v.xorshift7 = l, v.xor4096 = p, v.tychei = x, D = v, D;
}
var Ye = Qe();
const Ze = /* @__PURE__ */ gr(Ye);
function ke(e) {
  const { numToHide: s = 1 } = e || {}, f = "mcq", l = "LRN Hide Alternatives:";
  q.itemsApp().on("item:load", () => {
    const p = q.questions();
    Object.values(p).forEach((x) => {
      if (x.type === f)
        if (rt(x))
          if (et(x, s))
            if (tt(x))
              if (nt(x.validation)) {
                const v = [], a = ot(x.validation);
                Object.values(a).forEach((t) => {
                  Object.values(x.options).forEach((i) => {
                    t !== i.value && v.push(String(i.value));
                  });
                });
                const r = [];
                for (let t = 0; t < s; t++)
                  r.push(it(v, x.response_id)[t]);
                pr(x.response_id, (t) => {
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
                q.utils.logger.info(l, "No correct answer found in validation object");
            else
              q.utils.logger.info(l, " No validation object found");
          else
            q.utils.logger.info(l, "Invalid number of options to hide:", s);
        else
          q.utils.logger.info(l, "Only supports single response mode");
    });
  });
}
function rt(e) {
  return !e.multiple_responses || e.multiple_responses === !1;
}
function et(e, s) {
  return e.options.length - s > 1;
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
function it(e, s) {
  const f = Ze(s);
  return Ce(e.map((l) => ({ value: l, sort: f() }))).sort((l, p) => l.sort - p.sort).map(({ value: l }) => l);
}
const lt = xr("hideAlternatives", ke);
export {
  lt as hideAlternatives
};
