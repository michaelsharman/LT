import { l as u } from "./logger-BpyELtLr.js";
function q(e, t, r = 5) {
  const o = document.getElementById(e);
  o ? t(o) : r > 0 ? setTimeout(() => q(e, t, r - 1), 10) : console.warn(`Element with ID "${e}" not found after ${r} attempts.`);
}
function ke(e, t, r) {
  const o = r.dispatchEvent || !1, s = r.name || "lt:datatable", c = r.root || document.body, a = r.state || { activeObservers: /* @__PURE__ */ new Set() }, b = {
    childList: !0,
    subtree: !0,
    ...r.observeConfig
  };
  if (a.activeObservers.has(e))
    return u.debug(`${a.logPrefix}Already observing`, e), () => {
    };
  const d = c.querySelector(e);
  if (d)
    return u.debug(`${a.logPrefix}Element already in DOM`, e), t(d), () => {
    };
  a.activeObservers.add(e);
  const i = new MutationObserver((L, v) => {
    for (const m of L)
      if (m.type === "childList") {
        for (const f of m.addedNodes)
          if (f.nodeType === 1) {
            if (u.debug(`${a.logPrefix}Observing changes: `, c, f), f.matches && f.matches(e)) {
              v.disconnect(), u.debug(`${a.logPrefix}Disconnecting ${e}`), a.activeObservers.delete(e), A(e, s, o), t(f);
              return;
            }
            if (f.querySelector) {
              const O = f.querySelector(e);
              if (O) {
                v.disconnect(), u.debug(`${a.logPrefix}Disconnecting ${e}`), a.activeObservers.delete(e), A(e, s, o), t(O);
                return;
              }
            }
          }
      }
  });
  u.debug(`${a.logPrefix}Observing for ${e}`), i.observe(c, b);
}
function A(e, t, r) {
  if (!r)
    return;
  const o = new CustomEvent(t);
  document.dispatchEvent(o);
}
var S = typeof global == "object" && global && global.Object === Object && global, D = typeof self == "object" && self && self.Object === Object && self, I = S || D || Function("return this")(), y = I.Symbol, F = Object.prototype, G = F.hasOwnProperty, N = F.toString, g = y ? y.toStringTag : void 0;
function R(e) {
  var t = G.call(e, g), r = e[g];
  try {
    e[g] = void 0;
    var o = !0;
  } catch {
  }
  var s = N.call(e);
  return o && (t ? e[g] = r : delete e[g]), s;
}
var _ = Object.prototype, K = _.toString;
function V(e) {
  return K.call(e);
}
var X = "[object Null]", W = "[object Undefined]", h = y ? y.toStringTag : void 0;
function j(e) {
  return e == null ? e === void 0 ? W : X : h && h in Object(e) ? R(e) : V(e);
}
function T(e) {
  return e != null && typeof e == "object";
}
var z = Array.isArray;
function H(e) {
  var t = typeof e;
  return e != null && (t == "object" || t == "function");
}
var J = "[object AsyncFunction]", Q = "[object Function]", Y = "[object GeneratorFunction]", Z = "[object Proxy]";
function k(e) {
  if (!H(e))
    return !1;
  var t = j(e);
  return t == Q || t == Y || t == J || t == Z;
}
function et(e, t) {
  var r = -1, o = e.length;
  for (t || (t = Array(o)); ++r < o; )
    t[r] = e[r];
  return t;
}
var ee = 9007199254740991, te = /^(?:0|[1-9]\d*)$/;
function re(e, t) {
  var r = typeof e;
  return t = t ?? ee, !!t && (r == "number" || r != "symbol" && te.test(e)) && e > -1 && e % 1 == 0 && e < t;
}
var ne = 9007199254740991;
function B(e) {
  return typeof e == "number" && e > -1 && e % 1 == 0 && e <= ne;
}
function oe(e) {
  return e != null && B(e.length) && !k(e);
}
var ae = Object.prototype;
function ie(e) {
  var t = e && e.constructor, r = typeof t == "function" && t.prototype || ae;
  return e === r;
}
function se(e, t) {
  for (var r = -1, o = Array(e); ++r < e; )
    o[r] = t(r);
  return o;
}
var ce = "[object Arguments]";
function x(e) {
  return T(e) && j(e) == ce;
}
var M = Object.prototype, fe = M.hasOwnProperty, ue = M.propertyIsEnumerable, be = x(/* @__PURE__ */ function() {
  return arguments;
}()) ? x : function(e) {
  return T(e) && fe.call(e, "callee") && !ue.call(e, "callee");
};
function ge() {
  return !1;
}
var U = typeof exports == "object" && exports && !exports.nodeType && exports, $ = U && typeof module == "object" && module && !module.nodeType && module, pe = $ && $.exports === U, E = pe ? I.Buffer : void 0, de = E ? E.isBuffer : void 0, ye = de || ge, le = "[object Arguments]", je = "[object Array]", Te = "[object Boolean]", ve = "[object Date]", me = "[object Error]", Oe = "[object Function]", Ae = "[object Map]", he = "[object Number]", xe = "[object Object]", $e = "[object RegExp]", Ee = "[object Set]", Pe = "[object String]", we = "[object WeakMap]", Se = "[object ArrayBuffer]", Ie = "[object DataView]", Fe = "[object Float32Array]", Be = "[object Float64Array]", Me = "[object Int8Array]", Ue = "[object Int16Array]", Ce = "[object Int32Array]", Le = "[object Uint8Array]", qe = "[object Uint8ClampedArray]", De = "[object Uint16Array]", Ge = "[object Uint32Array]", n = {};
n[Fe] = n[Be] = n[Me] = n[Ue] = n[Ce] = n[Le] = n[qe] = n[De] = n[Ge] = !0;
n[le] = n[je] = n[Se] = n[Te] = n[Ie] = n[ve] = n[me] = n[Oe] = n[Ae] = n[he] = n[xe] = n[$e] = n[Ee] = n[Pe] = n[we] = !1;
function Ne(e) {
  return T(e) && B(e.length) && !!n[j(e)];
}
function Re(e) {
  return function(t) {
    return e(t);
  };
}
var C = typeof exports == "object" && exports && !exports.nodeType && exports, p = C && typeof module == "object" && module && !module.nodeType && module, _e = p && p.exports === C, l = _e && S.process, P = function() {
  try {
    var e = p && p.require && p.require("util").types;
    return e || l && l.binding && l.binding("util");
  } catch {
  }
}(), w = P && P.isTypedArray, Ke = w ? Re(w) : Ne, Ve = Object.prototype, Xe = Ve.hasOwnProperty;
function We(e, t) {
  var r = z(e), o = !r && be(e), s = !r && !o && ye(e), c = !r && !o && !s && Ke(e), a = r || o || s || c, b = a ? se(e.length, String) : [], d = b.length;
  for (var i in e)
    (t || Xe.call(e, i)) && !(a && // Safari 9 has enumerable `arguments.length` in strict mode.
    (i == "length" || // Node.js 0.10 has enumerable non-index properties on buffers.
    s && (i == "offset" || i == "parent") || // PhantomJS 2 has enumerable non-index properties on typed arrays.
    c && (i == "buffer" || i == "byteLength" || i == "byteOffset") || // Skip index properties.
    re(i, d))) && b.push(i);
  return b;
}
function ze(e, t) {
  return function(r) {
    return e(t(r));
  };
}
var He = ze(Object.keys, Object), Je = Object.prototype, Qe = Je.hasOwnProperty;
function Ye(e) {
  if (!ie(e))
    return He(e);
  var t = [];
  for (var r in Object(e))
    Qe.call(e, r) && r != "constructor" && t.push(r);
  return t;
}
function tt(e) {
  return oe(e) ? We(e) : Ye(e);
}
export {
  y as S,
  T as a,
  j as b,
  et as c,
  H as d,
  k as e,
  oe as f,
  re as g,
  ie as h,
  z as i,
  We as j,
  tt as k,
  Re as l,
  ye as m,
  P as n,
  ze as o,
  Ke as p,
  be as q,
  I as r,
  ke as s,
  q as w
};
