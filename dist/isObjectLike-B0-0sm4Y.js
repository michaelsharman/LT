var f = typeof global == "object" && global && global.Object === Object && global, l = typeof self == "object" && self && self.Object === Object && self, g = f || l || Function("return this")(), r = g.Symbol, o = Object.prototype, j = o.hasOwnProperty, s = o.toString, e = r ? r.toStringTag : void 0;
function d(t) {
  var a = j.call(t, e), i = t[e];
  try {
    t[e] = void 0;
    var c = !0;
  } catch {
  }
  var b = s.call(t);
  return c && (a ? t[e] = i : delete t[e]), b;
}
var O = Object.prototype, T = O.toString;
function u(t) {
  return T.call(t);
}
var y = "[object Null]", S = "[object Undefined]", n = r ? r.toStringTag : void 0;
function v(t) {
  return t == null ? t === void 0 ? S : y : n && n in Object(t) ? d(t) : u(t);
}
function h(t) {
  return t != null && typeof t == "object";
}
export {
  v as b,
  f,
  h as i,
  g as r
};
