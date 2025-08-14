import { a as Ps } from "./app-DSq6w2-y.js";
import { c as Cs } from "./styling-Clo4owDN.js";
import { c as Bs } from "./moduleFactory-Ck7axszi.js";
import U from "./logger.js";
import { c as ht, g as $e } from "./_commonjsHelpers-ByX85dGu.js";
function Is(i, e, t) {
  const r = [];
  return i.forEach((a) => typeof a != "string" ? r.push(a) : e[Symbol.split](a).forEach((o, s, n) => {
    o !== "" && r.push(o), s < n.length - 1 && r.push(t);
  })), r;
}
/**
 * Takes a string with placeholder variables like `%{smart_count} file selected`
 * and replaces it with values from options `{smart_count: 5}`
 *
 * @license https://github.com/airbnb/polyglot.js/blob/master/LICENSE
 * taken from https://github.com/airbnb/polyglot.js/blob/master/lib/polyglot.js#L299
 *
 * @param phrase that needs interpolation, with placeholders
 * @param options with values that will be used to replace placeholders
 */
function br(i, e) {
  const t = /\$/g, r = "$$$$";
  let a = [i];
  if (e == null)
    return a;
  for (const o of Object.keys(e))
    if (o !== "_") {
      let s = e[o];
      typeof s == "string" && (s = t[Symbol.replace](s, r)), a = Is(a, new RegExp(`%\\{${o}\\}`, "g"), s);
    }
  return a;
}
const Fs = (i) => {
  throw new Error(`missing string: ${i}`);
};
class no {
  locale;
  constructor(e, { onMissingKey: t = Fs } = {}) {
    this.locale = {
      strings: {},
      pluralize(r) {
        return r === 1 ? 0 : 1;
      }
    }, Array.isArray(e) ? e.forEach(this.#t, this) : this.#t(e), this.#e = t;
  }
  #e;
  #t(e) {
    if (!e?.strings)
      return;
    const t = this.locale;
    Object.assign(this.locale, {
      strings: { ...t.strings, ...e.strings },
      pluralize: e.pluralize || t.pluralize
    });
  }
  /**
   * Public translate method
   *
   * @param key
   * @param options with values that will be used later to replace placeholders in string
   * @returns string translated (and interpolated)
   */
  translate(e, t) {
    return this.translateArray(e, t).join("");
  }
  /**
   * Get a translation and return the translated and interpolated parts as an array.
   *
   * @returns The translated and interpolated parts, in order.
   */
  translateArray(e, t) {
    let r = this.locale.strings[e];
    if (r == null && (this.#e(e), r = e), typeof r == "object") {
      if (t && typeof t.smart_count < "u") {
        const o = this.locale.pluralize(t.smart_count);
        return br(r[o], t);
      }
      throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
    }
    if (typeof r != "string")
      throw new Error("string was not a string");
    return br(r, t);
  }
}
class lo {
  uppy;
  opts;
  id;
  defaultLocale;
  i18n;
  i18nArray;
  type;
  VERSION;
  constructor(e, t) {
    this.uppy = e, this.opts = t ?? {};
  }
  getPluginState() {
    const { plugins: e } = this.uppy.getState();
    return e?.[this.id] || {};
  }
  setPluginState(e) {
    const { plugins: t } = this.uppy.getState();
    this.uppy.setState({
      plugins: {
        ...t,
        [this.id]: {
          ...t[this.id],
          ...e
        }
      }
    });
  }
  setOptions(e) {
    this.opts = { ...this.opts, ...e }, this.setPluginState(void 0), this.i18nInit();
  }
  i18nInit() {
    const e = new no([
      this.defaultLocale,
      this.uppy.locale,
      this.opts.locale
    ]);
    this.i18n = e.translate.bind(e), this.i18nArray = e.translateArray.bind(e), this.setPluginState(void 0);
  }
  /**
   * Extendable methods
   * ==================
   * These methods are here to serve as an overview of the extendable methods as well as
   * making them not conditional in use, such as `if (this.afterUpdate)`.
   */
  addTarget(e) {
    throw new Error("Extend the addTarget method to add your plugin to another plugin's target");
  }
  install() {
  }
  uninstall() {
  }
  update(e) {
  }
  // Called after every state update, after everything's mounted. Debounced.
  afterUpdate() {
  }
}
function Lt(i) {
  return i < 10 ? `0${i}` : i.toString();
}
function It() {
  const i = /* @__PURE__ */ new Date(), e = Lt(i.getHours()), t = Lt(i.getMinutes()), r = Lt(i.getSeconds());
  return `${e}:${t}:${r}`;
}
const Ts = {
  debug: () => {
  },
  warn: () => {
  },
  error: (...i) => console.error(`[Uppy] [${It()}]`, ...i)
}, Es = {
  debug: (...i) => console.debug(`[Uppy] [${It()}]`, ...i),
  warn: (...i) => console.warn(`[Uppy] [${It()}]`, ...i),
  error: (...i) => console.error(`[Uppy] [${It()}]`, ...i)
};
function po(i) {
  return typeof i != "object" || i === null || !("nodeType" in i) ? !1 : i.nodeType === Node.ELEMENT_NODE;
}
function As(i, e = document) {
  return typeof i == "string" ? e.querySelector(i) : po(i) ? i : null;
}
function uo(i) {
  for (; i && !i.dir; )
    i = i.parentNode;
  return i?.dir;
}
var pt, P, co, Be, vr, ho, fo, mo, qi, Di, ki, it = {}, go = [], Os = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, dt = Array.isArray;
function le(i, e) {
  for (var t in e) i[t] = e[t];
  return i;
}
function Wi(i) {
  i && i.parentNode && i.parentNode.removeChild(i);
}
function rt(i, e, t) {
  var r, a, o, s = {};
  for (o in e) o == "key" ? r = e[o] : o == "ref" ? a = e[o] : s[o] = e[o];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? pt.call(arguments, 2) : t), typeof i == "function" && i.defaultProps != null) for (o in i.defaultProps) s[o] === void 0 && (s[o] = i.defaultProps[o]);
  return Je(i, s, r, a, null);
}
function Je(i, e, t, r, a) {
  var o = { type: i, props: e, key: t, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: a ?? ++co, __i: -1, __u: 0 };
  return a == null && P.vnode != null && P.vnode(o), o;
}
function Ms() {
  return { current: null };
}
function re(i) {
  return i.children;
}
function X(i, e) {
  this.props = i, this.context = e;
}
function Ue(i, e) {
  if (e == null) return i.__ ? Ue(i.__, i.__i + 1) : null;
  for (var t; e < i.__k.length; e++) if ((t = i.__k[e]) != null && t.__e != null) return t.__e;
  return typeof i.type == "function" ? Ue(i) : null;
}
function yo(i) {
  var e, t;
  if ((i = i.__) != null && i.__c != null) {
    for (i.__e = i.__c.base = null, e = 0; e < i.__k.length; e++) if ((t = i.__k[e]) != null && t.__e != null) {
      i.__e = i.__c.base = t.__e;
      break;
    }
    return yo(i);
  }
}
function wr(i) {
  (!i.__d && (i.__d = !0) && Be.push(i) && !Et.__r++ || vr != P.debounceRendering) && ((vr = P.debounceRendering) || ho)(Et);
}
function Et() {
  for (var i, e, t, r, a, o, s, n = 1; Be.length; ) Be.length > n && Be.sort(fo), i = Be.shift(), n = Be.length, i.__d && (t = void 0, a = (r = (e = i).__v).__e, o = [], s = [], e.__P && ((t = le({}, r)).__v = r.__v + 1, P.vnode && P.vnode(t), Vi(e.__P, t, r, e.__n, e.__P.namespaceURI, 32 & r.__u ? [a] : null, o, a ?? Ue(r), !!(32 & r.__u), s), t.__v = r.__v, t.__.__k[t.__i] = t, wo(o, t, s), t.__e != a && yo(t)));
  Et.__r = 0;
}
function bo(i, e, t, r, a, o, s, n, p, l, c) {
  var d, h, m, f, y, b, w = r && r.__k || go, x = e.length;
  for (p = zs(t, e, w, p, x), d = 0; d < x; d++) (m = t.__k[d]) != null && (h = m.__i == -1 ? it : w[m.__i] || it, m.__i = d, b = Vi(i, m, h, a, o, s, n, p, l, c), f = m.__e, m.ref && h.ref != m.ref && (h.ref && Gi(h.ref, null, m), c.push(m.ref, m.__c || f, m)), y == null && f != null && (y = f), 4 & m.__u || h.__k === m.__k ? p = vo(m, p, i) : typeof m.type == "function" && b !== void 0 ? p = b : f && (p = f.nextSibling), m.__u &= -7);
  return t.__e = y, p;
}
function zs(i, e, t, r, a) {
  var o, s, n, p, l, c = t.length, d = c, h = 0;
  for (i.__k = new Array(a), o = 0; o < a; o++) (s = e[o]) != null && typeof s != "boolean" && typeof s != "function" ? (p = o + h, (s = i.__k[o] = typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? Je(null, s, null, null, null) : dt(s) ? Je(re, { children: s }, null, null, null) : s.constructor == null && s.__b > 0 ? Je(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : s).__ = i, s.__b = i.__b + 1, n = null, (l = s.__i = Rs(s, t, p, d)) != -1 && (d--, (n = t[l]) && (n.__u |= 2)), n == null || n.__v == null ? (l == -1 && (a > c ? h-- : a < c && h++), typeof s.type != "function" && (s.__u |= 4)) : l != p && (l == p - 1 ? h-- : l == p + 1 ? h++ : (l > p ? h-- : h++, s.__u |= 4))) : i.__k[o] = null;
  if (d) for (o = 0; o < c; o++) (n = t[o]) != null && (2 & n.__u) == 0 && (n.__e == r && (r = Ue(n)), _o(n, n));
  return r;
}
function vo(i, e, t) {
  var r, a;
  if (typeof i.type == "function") {
    for (r = i.__k, a = 0; r && a < r.length; a++) r[a] && (r[a].__ = i, e = vo(r[a], e, t));
    return e;
  }
  i.__e != e && (e && i.type && !t.contains(e) && (e = Ue(i)), t.insertBefore(i.__e, e || null), e = i.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function te(i, e) {
  return e = e || [], i == null || typeof i == "boolean" || (dt(i) ? i.some(function(t) {
    te(t, e);
  }) : e.push(i)), e;
}
function Rs(i, e, t, r) {
  var a, o, s, n = i.key, p = i.type, l = e[t], c = l != null && (2 & l.__u) == 0;
  if (l === null && i.key == null || c && n == l.key && p == l.type) return t;
  if (r > (c ? 1 : 0)) {
    for (a = t - 1, o = t + 1; a >= 0 || o < e.length; ) if ((l = e[s = a >= 0 ? a-- : o++]) != null && (2 & l.__u) == 0 && n == l.key && p == l.type) return s;
  }
  return -1;
}
function xr(i, e, t) {
  e[0] == "-" ? i.setProperty(e, t ?? "") : i[e] = t == null ? "" : typeof t != "number" || Os.test(e) ? t : t + "px";
}
function ft(i, e, t, r, a) {
  var o, s;
  e: if (e == "style") if (typeof t == "string") i.style.cssText = t;
  else {
    if (typeof r == "string" && (i.style.cssText = r = ""), r) for (e in r) t && e in t || xr(i.style, e, "");
    if (t) for (e in t) r && t[e] == r[e] || xr(i.style, e, t[e]);
  }
  else if (e[0] == "o" && e[1] == "n") o = e != (e = e.replace(mo, "$1")), s = e.toLowerCase(), e = s in i || e == "onFocusOut" || e == "onFocusIn" ? s.slice(2) : e.slice(2), i.l || (i.l = {}), i.l[e + o] = t, t ? r ? t.u = r.u : (t.u = qi, i.addEventListener(e, o ? ki : Di, o)) : i.removeEventListener(e, o ? ki : Di, o);
  else {
    if (a == "http://www.w3.org/2000/svg") e = e.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s");
    else if (e != "width" && e != "height" && e != "href" && e != "list" && e != "form" && e != "tabIndex" && e != "download" && e != "rowSpan" && e != "colSpan" && e != "role" && e != "popover" && e in i) try {
      i[e] = t ?? "";
      break e;
    } catch {
    }
    typeof t == "function" || (t == null || t === !1 && e[4] != "-" ? i.removeAttribute(e) : i.setAttribute(e, e == "popover" && t == 1 ? "" : t));
  }
}
function _r(i) {
  return function(e) {
    if (this.l) {
      var t = this.l[e.type + i];
      if (e.t == null) e.t = qi++;
      else if (e.t < t.u) return;
      return t(P.event ? P.event(e) : e);
    }
  };
}
function Vi(i, e, t, r, a, o, s, n, p, l) {
  var c, d, h, m, f, y, b, w, x, _, C, B, g, D, k, S, O, T = e.type;
  if (e.constructor != null) return null;
  128 & t.__u && (p = !!(32 & t.__u), o = [n = e.__e = t.__e]), (c = P.__b) && c(e);
  e: if (typeof T == "function") try {
    if (w = e.props, x = "prototype" in T && T.prototype.render, _ = (c = T.contextType) && r[c.__c], C = c ? _ ? _.props.value : c.__ : r, t.__c ? b = (d = e.__c = t.__c).__ = d.__E : (x ? e.__c = d = new T(w, C) : (e.__c = d = new X(w, C), d.constructor = T, d.render = Us), _ && _.sub(d), d.props = w, d.state || (d.state = {}), d.context = C, d.__n = r, h = d.__d = !0, d.__h = [], d._sb = []), x && d.__s == null && (d.__s = d.state), x && T.getDerivedStateFromProps != null && (d.__s == d.state && (d.__s = le({}, d.__s)), le(d.__s, T.getDerivedStateFromProps(w, d.__s))), m = d.props, f = d.state, d.__v = e, h) x && T.getDerivedStateFromProps == null && d.componentWillMount != null && d.componentWillMount(), x && d.componentDidMount != null && d.__h.push(d.componentDidMount);
    else {
      if (x && T.getDerivedStateFromProps == null && w !== m && d.componentWillReceiveProps != null && d.componentWillReceiveProps(w, C), !d.__e && d.shouldComponentUpdate != null && d.shouldComponentUpdate(w, d.__s, C) === !1 || e.__v == t.__v) {
        for (e.__v != t.__v && (d.props = w, d.state = d.__s, d.__d = !1), e.__e = t.__e, e.__k = t.__k, e.__k.some(function(M) {
          M && (M.__ = e);
        }), B = 0; B < d._sb.length; B++) d.__h.push(d._sb[B]);
        d._sb = [], d.__h.length && s.push(d);
        break e;
      }
      d.componentWillUpdate != null && d.componentWillUpdate(w, d.__s, C), x && d.componentDidUpdate != null && d.__h.push(function() {
        d.componentDidUpdate(m, f, y);
      });
    }
    if (d.context = C, d.props = w, d.__P = i, d.__e = !1, g = P.__r, D = 0, x) {
      for (d.state = d.__s, d.__d = !1, g && g(e), c = d.render(d.props, d.state, d.context), k = 0; k < d._sb.length; k++) d.__h.push(d._sb[k]);
      d._sb = [];
    } else do
      d.__d = !1, g && g(e), c = d.render(d.props, d.state, d.context), d.state = d.__s;
    while (d.__d && ++D < 25);
    d.state = d.__s, d.getChildContext != null && (r = le(le({}, r), d.getChildContext())), x && !h && d.getSnapshotBeforeUpdate != null && (y = d.getSnapshotBeforeUpdate(m, f)), S = c, c != null && c.type === re && c.key == null && (S = xo(c.props.children)), n = bo(i, dt(S) ? S : [S], e, t, r, a, o, s, n, p, l), d.base = e.__e, e.__u &= -161, d.__h.length && s.push(d), b && (d.__E = d.__ = null);
  } catch (M) {
    if (e.__v = null, p || o != null) if (M.then) {
      for (e.__u |= p ? 160 : 128; n && n.nodeType == 8 && n.nextSibling; ) n = n.nextSibling;
      o[o.indexOf(n)] = null, e.__e = n;
    } else {
      for (O = o.length; O--; ) Wi(o[O]);
      Si(e);
    }
    else e.__e = t.__e, e.__k = t.__k, M.then || Si(e);
    P.__e(M, e, t);
  }
  else o == null && e.__v == t.__v ? (e.__k = t.__k, e.__e = t.__e) : n = e.__e = Ns(t.__e, e, t, r, a, o, s, p, l);
  return (c = P.diffed) && c(e), 128 & e.__u ? void 0 : n;
}
function Si(i) {
  i && i.__c && (i.__c.__e = !0), i && i.__k && i.__k.forEach(Si);
}
function wo(i, e, t) {
  for (var r = 0; r < t.length; r++) Gi(t[r], t[++r], t[++r]);
  P.__c && P.__c(e, i), i.some(function(a) {
    try {
      i = a.__h, a.__h = [], i.some(function(o) {
        o.call(a);
      });
    } catch (o) {
      P.__e(o, a.__v);
    }
  });
}
function xo(i) {
  return typeof i != "object" || i == null || i.__b && i.__b > 0 ? i : dt(i) ? i.map(xo) : le({}, i);
}
function Ns(i, e, t, r, a, o, s, n, p) {
  var l, c, d, h, m, f, y, b = t.props, w = e.props, x = e.type;
  if (x == "svg" ? a = "http://www.w3.org/2000/svg" : x == "math" ? a = "http://www.w3.org/1998/Math/MathML" : a || (a = "http://www.w3.org/1999/xhtml"), o != null) {
    for (l = 0; l < o.length; l++) if ((m = o[l]) && "setAttribute" in m == !!x && (x ? m.localName == x : m.nodeType == 3)) {
      i = m, o[l] = null;
      break;
    }
  }
  if (i == null) {
    if (x == null) return document.createTextNode(w);
    i = document.createElementNS(a, x, w.is && w), n && (P.__m && P.__m(e, o), n = !1), o = null;
  }
  if (x == null) b === w || n && i.data == w || (i.data = w);
  else {
    if (o = o && pt.call(i.childNodes), b = t.props || it, !n && o != null) for (b = {}, l = 0; l < i.attributes.length; l++) b[(m = i.attributes[l]).name] = m.value;
    for (l in b) if (m = b[l], l != "children") {
      if (l == "dangerouslySetInnerHTML") d = m;
      else if (!(l in w)) {
        if (l == "value" && "defaultValue" in w || l == "checked" && "defaultChecked" in w) continue;
        ft(i, l, null, m, a);
      }
    }
    for (l in w) m = w[l], l == "children" ? h = m : l == "dangerouslySetInnerHTML" ? c = m : l == "value" ? f = m : l == "checked" ? y = m : n && typeof m != "function" || b[l] === m || ft(i, l, m, b[l], a);
    if (c) n || d && (c.__html == d.__html || c.__html == i.innerHTML) || (i.innerHTML = c.__html), e.__k = [];
    else if (d && (i.innerHTML = ""), bo(e.type == "template" ? i.content : i, dt(h) ? h : [h], e, t, r, x == "foreignObject" ? "http://www.w3.org/1999/xhtml" : a, o, s, o ? o[0] : t.__k && Ue(t, 0), n, p), o != null) for (l = o.length; l--; ) Wi(o[l]);
    n || (l = "value", x == "progress" && f == null ? i.removeAttribute("value") : f != null && (f !== i[l] || x == "progress" && !f || x == "option" && f != b[l]) && ft(i, l, f, b[l], a), l = "checked", y != null && y != i[l] && ft(i, l, y, b[l], a));
  }
  return i;
}
function Gi(i, e, t) {
  try {
    if (typeof i == "function") {
      var r = typeof i.__u == "function";
      r && i.__u(), r && e == null || (i.__u = i(e));
    } else i.current = e;
  } catch (a) {
    P.__e(a, t);
  }
}
function _o(i, e, t) {
  var r, a;
  if (P.unmount && P.unmount(i), (r = i.ref) && (r.current && r.current != i.__e || Gi(r, null, e)), (r = i.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (o) {
      P.__e(o, e);
    }
    r.base = r.__P = null;
  }
  if (r = i.__k) for (a = 0; a < r.length; a++) r[a] && _o(r[a], e, t || typeof i.type != "function");
  t || Wi(i.__e), i.__c = i.__ = i.__e = void 0;
}
function Us(i, e, t) {
  return this.constructor(i, t);
}
function $s(i, e, t) {
  var r, a, o, s;
  e == document && (e = document.documentElement), P.__ && P.__(i, e), a = (r = typeof t == "function") ? null : e.__k, o = [], s = [], Vi(e, i = e.__k = rt(re, null, [i]), a || it, it, e.namespaceURI, a ? null : e.firstChild ? pt.call(e.childNodes) : null, o, a ? a.__e : e.firstChild, r, s), wo(o, i, s);
}
function Do(i, e, t) {
  var r, a, o, s, n = le({}, i.props);
  for (o in i.type && i.type.defaultProps && (s = i.type.defaultProps), e) o == "key" ? r = e[o] : o == "ref" ? a = e[o] : n[o] = e[o] === void 0 && s != null ? s[o] : e[o];
  return arguments.length > 2 && (n.children = arguments.length > 3 ? pt.call(arguments, 2) : t), Je(i.type, n, r || i.key, a || i.ref, null);
}
pt = go.slice, P = { __e: function(i, e, t, r) {
  for (var a, o, s; e = e.__; ) if ((a = e.__c) && !a.__) try {
    if ((o = a.constructor) && o.getDerivedStateFromError != null && (a.setState(o.getDerivedStateFromError(i)), s = a.__d), a.componentDidCatch != null && (a.componentDidCatch(i, r || {}), s = a.__d), s) return a.__E = a;
  } catch (n) {
    i = n;
  }
  throw i;
} }, co = 0, X.prototype.setState = function(i, e) {
  var t;
  t = this.__s != null && this.__s != this.state ? this.__s : this.__s = le({}, this.state), typeof i == "function" && (i = i(le({}, t), this.props)), i && le(t, i), i != null && this.__v && (e && this._sb.push(e), wr(this));
}, X.prototype.forceUpdate = function(i) {
  this.__v && (this.__e = !0, i && this.__h.push(i), wr(this));
}, X.prototype.render = re, Be = [], ho = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, fo = function(i, e) {
  return i.__v.__b - e.__v.__b;
}, Et.__r = 0, mo = /(PointerCapture)$|Capture$/i, qi = 0, Di = _r(!1), ki = _r(!0);
var at, $, Ht, Dr, ot = 0, ko = [], L = P, kr = L.__b, Sr = L.__r, Pr = L.diffed, Cr = L.__c, Br = L.unmount, Ir = L.__;
function Xi(i, e) {
  L.__h && L.__h($, i, ot || e), ot = 0;
  var t = $.__H || ($.__H = { __: [], __h: [] });
  return i >= t.__.length && t.__.push({}), t.__[i];
}
function At(i) {
  return ot = 1, Ls(Po, i);
}
function Ls(i, e, t) {
  var r = Xi(at++, 2);
  if (r.t = i, !r.__c && (r.__ = [t ? t(e) : Po(void 0, e), function(n) {
    var p = r.__N ? r.__N[0] : r.__[0], l = r.t(p, n);
    p !== l && (r.__N = [l, r.__[1]], r.__c.setState({}));
  }], r.__c = $, !$.__f)) {
    var a = function(n, p, l) {
      if (!r.__c.__H) return !0;
      var c = r.__c.__H.__.filter(function(h) {
        return !!h.__c;
      });
      if (c.every(function(h) {
        return !h.__N;
      })) return !o || o.call(this, n, p, l);
      var d = r.__c.props !== n;
      return c.forEach(function(h) {
        if (h.__N) {
          var m = h.__[0];
          h.__ = h.__N, h.__N = void 0, m !== h.__[0] && (d = !0);
        }
      }), o && o.call(this, n, p, l) || d;
    };
    $.__f = !0;
    var o = $.shouldComponentUpdate, s = $.componentWillUpdate;
    $.componentWillUpdate = function(n, p, l) {
      if (this.__e) {
        var c = o;
        o = void 0, a(n, p, l), o = c;
      }
      s && s.call(this, n, p, l);
    }, $.shouldComponentUpdate = a;
  }
  return r.__N || r.__;
}
function Pi(i, e) {
  var t = Xi(at++, 3);
  !L.__s && So(t.__H, e) && (t.__ = i, t.u = e, $.__H.__h.push(t));
}
function Ft(i) {
  return ot = 5, Yi(function() {
    return { current: i };
  }, []);
}
function Yi(i, e) {
  var t = Xi(at++, 7);
  return So(t.__H, e) && (t.__ = i(), t.__H = e, t.__h = i), t.__;
}
function Hs(i, e) {
  return ot = 8, Yi(function() {
    return i;
  }, e);
}
function js() {
  for (var i; i = ko.shift(); ) if (i.__P && i.__H) try {
    i.__H.__h.forEach(Tt), i.__H.__h.forEach(Ci), i.__H.__h = [];
  } catch (e) {
    i.__H.__h = [], L.__e(e, i.__v);
  }
}
L.__b = function(i) {
  $ = null, kr && kr(i);
}, L.__ = function(i, e) {
  i && e.__k && e.__k.__m && (i.__m = e.__k.__m), Ir && Ir(i, e);
}, L.__r = function(i) {
  Sr && Sr(i), at = 0;
  var e = ($ = i.__c).__H;
  e && (Ht === $ ? (e.__h = [], $.__h = [], e.__.forEach(function(t) {
    t.__N && (t.__ = t.__N), t.u = t.__N = void 0;
  })) : (e.__h.forEach(Tt), e.__h.forEach(Ci), e.__h = [], at = 0)), Ht = $;
}, L.diffed = function(i) {
  Pr && Pr(i);
  var e = i.__c;
  e && e.__H && (e.__H.__h.length && (ko.push(e) !== 1 && Dr === L.requestAnimationFrame || ((Dr = L.requestAnimationFrame) || qs)(js)), e.__H.__.forEach(function(t) {
    t.u && (t.__H = t.u), t.u = void 0;
  })), Ht = $ = null;
}, L.__c = function(i, e) {
  e.some(function(t) {
    try {
      t.__h.forEach(Tt), t.__h = t.__h.filter(function(r) {
        return !r.__ || Ci(r);
      });
    } catch (r) {
      e.some(function(a) {
        a.__h && (a.__h = []);
      }), e = [], L.__e(r, t.__v);
    }
  }), Cr && Cr(i, e);
}, L.unmount = function(i) {
  Br && Br(i);
  var e, t = i.__c;
  t && t.__H && (t.__H.__.forEach(function(r) {
    try {
      Tt(r);
    } catch (a) {
      e = a;
    }
  }), t.__H = void 0, e && L.__e(e, t.__v));
};
var Fr = typeof requestAnimationFrame == "function";
function qs(i) {
  var e, t = function() {
    clearTimeout(r), Fr && cancelAnimationFrame(e), setTimeout(i);
  }, r = setTimeout(t, 35);
  Fr && (e = requestAnimationFrame(t));
}
function Tt(i) {
  var e = $, t = i.__c;
  typeof t == "function" && (i.__c = void 0, t()), $ = e;
}
function Ci(i) {
  var e = $;
  i.__c = i.__(), $ = e;
}
function So(i, e) {
  return !i || i.length !== e.length || e.some(function(t, r) {
    return t !== i[r];
  });
}
function Po(i, e) {
  return typeof e == "function" ? e(i) : e;
}
function Ws(i, e) {
  for (var t in e) i[t] = e[t];
  return i;
}
function Tr(i, e) {
  for (var t in i) if (t !== "__source" && !(t in e)) return !0;
  for (var r in e) if (r !== "__source" && i[r] !== e[r]) return !0;
  return !1;
}
function Er(i, e) {
  this.props = i, this.context = e;
}
(Er.prototype = new X()).isPureReactComponent = !0, Er.prototype.shouldComponentUpdate = function(i, e) {
  return Tr(this.props, i) || Tr(this.state, e);
};
var Ar = P.__b;
P.__b = function(i) {
  i.type && i.type.__f && i.ref && (i.props.ref = i.ref, i.ref = null), Ar && Ar(i);
};
var Vs = P.__e;
P.__e = function(i, e, t, r) {
  if (i.then) {
    for (var a, o = e; o = o.__; ) if ((a = o.__c) && a.__c) return e.__e == null && (e.__e = t.__e, e.__k = t.__k), a.__c(i, e);
  }
  Vs(i, e, t, r);
};
var Or = P.unmount;
function Co(i, e, t) {
  return i && (i.__c && i.__c.__H && (i.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), i.__c.__H = null), (i = Ws({}, i)).__c != null && (i.__c.__P === t && (i.__c.__P = e), i.__c.__e = !0, i.__c = null), i.__k = i.__k && i.__k.map(function(r) {
    return Co(r, e, t);
  })), i;
}
function Bo(i, e, t) {
  return i && t && (i.__v = null, i.__k = i.__k && i.__k.map(function(r) {
    return Bo(r, e, t);
  }), i.__c && i.__c.__P === e && (i.__e && t.appendChild(i.__e), i.__c.__e = !0, i.__c.__P = t)), i;
}
function jt() {
  this.__u = 0, this.o = null, this.__b = null;
}
function Io(i) {
  var e = i.__.__c;
  return e && e.__a && e.__a(i);
}
function mt() {
  this.i = null, this.l = null;
}
P.unmount = function(i) {
  var e = i.__c;
  e && e.__R && e.__R(), e && 32 & i.__u && (i.type = null), Or && Or(i);
}, (jt.prototype = new X()).__c = function(i, e) {
  var t = e.__c, r = this;
  r.o == null && (r.o = []), r.o.push(t);
  var a = Io(r.__v), o = !1, s = function() {
    o || (o = !0, t.__R = null, a ? a(n) : n());
  };
  t.__R = s;
  var n = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var p = r.state.__a;
        r.__v.__k[0] = Bo(p, p.__c.__P, p.__c.__O);
      }
      var l;
      for (r.setState({ __a: r.__b = null }); l = r.o.pop(); ) l.forceUpdate();
    }
  };
  r.__u++ || 32 & e.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), i.then(s, s);
}, jt.prototype.componentWillUnmount = function() {
  this.o = [];
}, jt.prototype.render = function(i, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = Co(this.__b, t, r.__O = r.__P);
    }
    this.__b = null;
  }
  var a = e.__a && rt(re, null, i.fallback);
  return a && (a.__u &= -33), [rt(re, null, e.__a ? null : i.children), a];
};
var Mr = function(i, e, t) {
  if (++t[1] === t[0] && i.l.delete(e), i.props.revealOrder && (i.props.revealOrder[0] !== "t" || !i.l.size)) for (t = i.i; t; ) {
    for (; t.length > 3; ) t.pop()();
    if (t[1] < t[0]) break;
    i.i = t = t[2];
  }
};
(mt.prototype = new X()).__a = function(i) {
  var e = this, t = Io(e.__v), r = e.l.get(i);
  return r[0]++, function(a) {
    var o = function() {
      e.props.revealOrder ? (r.push(a), Mr(e, i, r)) : a();
    };
    t ? t(o) : o();
  };
}, mt.prototype.render = function(i) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var e = te(i.children);
  i.revealOrder && i.revealOrder[0] === "b" && e.reverse();
  for (var t = e.length; t--; ) this.l.set(e[t], this.i = [1, 0, this.i]);
  return i.children;
}, mt.prototype.componentDidUpdate = mt.prototype.componentDidMount = function() {
  var i = this;
  this.l.forEach(function(e, t) {
    Mr(i, t, e);
  });
};
var Gs = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Xs = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Ys = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Ks = /[A-Z0-9]/g, Zs = typeof document < "u", Qs = function(i) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(i);
};
function zr(i, e, t) {
  return e.__k == null && (e.textContent = ""), $s(i, e), typeof t == "function" && t(), i ? i.__c : null;
}
X.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(i) {
  Object.defineProperty(X.prototype, i, { configurable: !0, get: function() {
    return this["UNSAFE_" + i];
  }, set: function(e) {
    Object.defineProperty(this, i, { configurable: !0, writable: !0, value: e });
  } });
});
var Rr = P.event;
function Js() {
}
function en() {
  return this.cancelBubble;
}
function tn() {
  return this.defaultPrevented;
}
P.event = function(i) {
  return Rr && (i = Rr(i)), i.persist = Js, i.isPropagationStopped = en, i.isDefaultPrevented = tn, i.nativeEvent = i;
};
var rn = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, Nr = P.vnode;
P.vnode = function(i) {
  typeof i.type == "string" && function(e) {
    var t = e.props, r = e.type, a = {}, o = r.indexOf("-") === -1;
    for (var s in t) {
      var n = t[s];
      if (!(s === "value" && "defaultValue" in t && n == null || Zs && s === "children" && r === "noscript" || s === "class" || s === "className")) {
        var p = s.toLowerCase();
        s === "defaultValue" && "value" in t && t.value == null ? s = "value" : s === "download" && n === !0 ? n = "" : p === "translate" && n === "no" ? n = !1 : p[0] === "o" && p[1] === "n" ? p === "ondoubleclick" ? s = "ondblclick" : p !== "onchange" || r !== "input" && r !== "textarea" || Qs(t.type) ? p === "onfocus" ? s = "onfocusin" : p === "onblur" ? s = "onfocusout" : Ys.test(s) && (s = p) : p = s = "oninput" : o && Xs.test(s) ? s = s.replace(Ks, "-$&").toLowerCase() : n === null && (n = void 0), p === "oninput" && a[s = p] && (s = "oninputCapture"), a[s] = n;
      }
    }
    r == "select" && a.multiple && Array.isArray(a.value) && (a.value = te(t.children).forEach(function(l) {
      l.props.selected = a.value.indexOf(l.props.value) != -1;
    })), r == "select" && a.defaultValue != null && (a.value = te(t.children).forEach(function(l) {
      l.props.selected = a.multiple ? a.defaultValue.indexOf(l.props.value) != -1 : a.defaultValue == l.props.value;
    })), t.class && !t.className ? (a.class = t.class, Object.defineProperty(a, "className", rn)) : (t.className && !t.class || t.class && t.className) && (a.class = a.className = t.className), e.props = a;
  }(i), i.$$typeof = Gs, Nr && Nr(i);
};
var Ur = P.__r;
P.__r = function(i) {
  Ur && Ur(i), i.__c;
};
var $r = P.diffed;
P.diffed = function(i) {
  $r && $r(i);
  var e = i.props, t = i.__e;
  t != null && i.type === "textarea" && "value" in e && e.value !== t.value && (t.value = e.value == null ? "" : e.value);
};
function an(i) {
  let e = null, t;
  return (...r) => (t = r, e || (e = Promise.resolve().then(() => (e = null, i(...t)))), e);
}
class ve extends lo {
  #e;
  isTargetDOMEl;
  el;
  parent;
  title;
  getTargetPlugin(e) {
    let t;
    if (typeof e?.addTarget == "function")
      t = e, t instanceof ve || console.warn(new Error("The provided plugin is not an instance of UIPlugin. This is an indication of a bug with the way Uppy is bundled.", { cause: { targetPlugin: t, UIPlugin: ve } }));
    else if (typeof e == "function") {
      const r = e;
      this.uppy.iteratePlugins((a) => {
        a instanceof r && (t = a);
      });
    }
    return t;
  }
  /**
   * Check if supplied `target` is a DOM element or an `object`.
   * If it’s an object — target is a plugin, and we search `plugins`
   * for a plugin with same name and return its target.
   */
  mount(e, t) {
    const r = t.id, a = As(e);
    if (a) {
      this.isTargetDOMEl = !0;
      const n = document.createElement("div");
      return n.classList.add("uppy-Root"), this.#e = an((p) => {
        this.uppy.getPlugin(this.id) && (zr(this.render(p, n), n), this.afterUpdate());
      }), this.uppy.log(`Installing ${r} to a DOM element '${e}'`), this.opts.replaceTargetContent && (a.innerHTML = ""), zr(this.render(this.uppy.getState(), n), n), this.el = n, a.appendChild(n), n.dir = this.opts.direction || uo(n) || "ltr", this.onMount(), this.el;
    }
    const o = this.getTargetPlugin(e);
    if (o)
      return this.uppy.log(`Installing ${r} to ${o.id}`), this.parent = o, this.el = o.addTarget(t), this.onMount(), this.el;
    this.uppy.log(`Not installing ${r}`);
    let s = `Invalid target option given to ${r}.`;
    throw typeof e == "function" ? s += " The given target is not a Plugin class. Please check that you're not specifying a React Component instead of a plugin. If you are using @uppy/* packages directly, make sure you have only 1 version of @uppy/core installed: run `npm ls @uppy/core` on the command line and verify that all the versions match and are deduped correctly." : s += "If you meant to target an HTML element, please make sure that the element exists. Check that the <script> tag initializing Uppy is right before the closing </body> tag at the end of the page. (see https://github.com/transloadit/uppy/issues/1042)\n\nIf you meant to target a plugin, please confirm that your `import` statements or `require` calls are correct.", new Error(s);
  }
  /**
   * Called when plugin is mounted, whether in DOM or into another plugin.
   * Needed because sometimes plugins are mounted separately/after `install`,
   * so this.el and this.parent might not be available in `install`.
   * This is the case with @uppy/react plugins, for example.
   */
  render(e, t) {
    throw new Error("Extend the render method to add your plugin to a DOM element");
  }
  update(e) {
    this.el != null && this.#e?.(e);
  }
  unmount() {
    this.isTargetDOMEl && this.el?.remove(), this.onUnmount();
  }
  onMount() {
  }
  onUnmount() {
  }
}
const on = "@uppy/store-default", sn = "The default simple object-based store for Uppy.", nn = "4.3.2", ln = "MIT", pn = "lib/index.js", dn = "module", un = { build: "tsc --build tsconfig.build.json", typecheck: "tsc --build", test: "vitest run --environment=jsdom --silent='passed-only'" }, cn = ["file uploader", "uppy", "uppy-store"], hn = "https://uppy.io", fn = { url: "https://github.com/transloadit/uppy/issues" }, mn = { jsdom: "^26.1.0", typescript: "^5.8.3", vitest: "^3.2.4" }, gn = { type: "git", url: "git+https://github.com/transloadit/uppy.git" }, yn = ["src", "lib", "dist", "CHANGELOG.md"], bn = {
  name: on,
  description: sn,
  version: nn,
  license: ln,
  main: pn,
  type: dn,
  scripts: un,
  keywords: cn,
  homepage: hn,
  bugs: fn,
  devDependencies: mn,
  repository: gn,
  files: yn
};
class vn {
  static VERSION = bn.version;
  state = {};
  #e = /* @__PURE__ */ new Set();
  getState() {
    return this.state;
  }
  setState(e) {
    const t = { ...this.state }, r = { ...this.state, ...e };
    this.state = r, this.#t(t, r, e);
  }
  subscribe(e) {
    return this.#e.add(e), () => {
      this.#e.delete(e);
    };
  }
  #t(...e) {
    this.#e.forEach((t) => {
      t(...e);
    });
  }
}
function Ot(i) {
  const e = i.lastIndexOf(".");
  return e === -1 || e === i.length - 1 ? {
    name: i,
    extension: void 0
  } : {
    name: i.slice(0, e),
    extension: i.slice(e + 1)
  };
}
const Lr = {
  __proto__: null,
  md: "text/markdown",
  markdown: "text/markdown",
  mp4: "video/mp4",
  mp3: "audio/mp3",
  svg: "image/svg+xml",
  jpg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  gif: "image/gif",
  heic: "image/heic",
  heif: "image/heif",
  yaml: "text/yaml",
  yml: "text/yaml",
  csv: "text/csv",
  tsv: "text/tab-separated-values",
  tab: "text/tab-separated-values",
  avi: "video/x-msvideo",
  mks: "video/x-matroska",
  mkv: "video/x-matroska",
  mov: "video/quicktime",
  dicom: "application/dicom",
  doc: "application/msword",
  msg: "application/vnd.ms-outlook",
  docm: "application/vnd.ms-word.document.macroenabled.12",
  docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  dot: "application/msword",
  dotm: "application/vnd.ms-word.template.macroenabled.12",
  dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  xla: "application/vnd.ms-excel",
  xlam: "application/vnd.ms-excel.addin.macroenabled.12",
  xlc: "application/vnd.ms-excel",
  xlf: "application/x-xliff+xml",
  xlm: "application/vnd.ms-excel",
  xls: "application/vnd.ms-excel",
  xlsb: "application/vnd.ms-excel.sheet.binary.macroenabled.12",
  xlsm: "application/vnd.ms-excel.sheet.macroenabled.12",
  xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  xlt: "application/vnd.ms-excel",
  xltm: "application/vnd.ms-excel.template.macroenabled.12",
  xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  xlw: "application/vnd.ms-excel",
  txt: "text/plain",
  text: "text/plain",
  conf: "text/plain",
  log: "text/plain",
  pdf: "application/pdf",
  zip: "application/zip",
  "7z": "application/x-7z-compressed",
  rar: "application/x-rar-compressed",
  tar: "application/x-tar",
  gz: "application/gzip",
  dmg: "application/x-apple-diskimage"
};
function Fo(i) {
  if (i.type)
    return i.type;
  const e = i.name ? Ot(i.name).extension?.toLowerCase() : null;
  return e && e in Lr ? Lr[e] : "application/octet-stream";
}
function wn(i) {
  return i.charCodeAt(0).toString(32);
}
function Hr(i) {
  let e = "";
  return i.replace(/[^A-Z0-9]/gi, (t) => (e += `-${wn(t)}`, "/")) + e;
}
function xn(i, e) {
  let t = e || "uppy";
  return typeof i.name == "string" && (t += `-${Hr(i.name.toLowerCase())}`), i.type !== void 0 && (t += `-${i.type}`), i.meta && typeof i.meta.relativePath == "string" && (t += `-${Hr(i.meta.relativePath.toLowerCase())}`), i.data.size !== void 0 && (t += `-${i.data.size}`), i.data.lastModified !== void 0 && (t += `-${i.data.lastModified}`), t;
}
function _n(i) {
  return !i.isRemote || !i.remote ? !1 : (/* @__PURE__ */ new Set([
    "box",
    "dropbox",
    "drive",
    "facebook",
    "unsplash"
  ])).has(i.remote.provider);
}
function Dn(i, e) {
  if (_n(i))
    return i.id;
  const t = Fo(i);
  return xn({
    ...i,
    type: t
  }, e);
}
var qt, jr;
function Ki() {
  if (jr) return qt;
  jr = 1;
  function i(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  return qt = i, qt;
}
var Wt, qr;
function kn() {
  if (qr) return Wt;
  qr = 1;
  var i = typeof ht == "object" && ht && ht.Object === Object && ht;
  return Wt = i, Wt;
}
var Vt, Wr;
function To() {
  if (Wr) return Vt;
  Wr = 1;
  var i = kn(), e = typeof self == "object" && self && self.Object === Object && self, t = i || e || Function("return this")();
  return Vt = t, Vt;
}
var Gt, Vr;
function Sn() {
  if (Vr) return Gt;
  Vr = 1;
  var i = To(), e = function() {
    return i.Date.now();
  };
  return Gt = e, Gt;
}
var Xt, Gr;
function Pn() {
  if (Gr) return Xt;
  Gr = 1;
  var i = /\s/;
  function e(t) {
    for (var r = t.length; r-- && i.test(t.charAt(r)); )
      ;
    return r;
  }
  return Xt = e, Xt;
}
var Yt, Xr;
function Cn() {
  if (Xr) return Yt;
  Xr = 1;
  var i = Pn(), e = /^\s+/;
  function t(r) {
    return r && r.slice(0, i(r) + 1).replace(e, "");
  }
  return Yt = t, Yt;
}
var Kt, Yr;
function Eo() {
  if (Yr) return Kt;
  Yr = 1;
  var i = To(), e = i.Symbol;
  return Kt = e, Kt;
}
var Zt, Kr;
function Bn() {
  if (Kr) return Zt;
  Kr = 1;
  var i = Eo(), e = Object.prototype, t = e.hasOwnProperty, r = e.toString, a = i ? i.toStringTag : void 0;
  function o(s) {
    var n = t.call(s, a), p = s[a];
    try {
      s[a] = void 0;
      var l = !0;
    } catch {
    }
    var c = r.call(s);
    return l && (n ? s[a] = p : delete s[a]), c;
  }
  return Zt = o, Zt;
}
var Qt, Zr;
function In() {
  if (Zr) return Qt;
  Zr = 1;
  var i = Object.prototype, e = i.toString;
  function t(r) {
    return e.call(r);
  }
  return Qt = t, Qt;
}
var Jt, Qr;
function Fn() {
  if (Qr) return Jt;
  Qr = 1;
  var i = Eo(), e = Bn(), t = In(), r = "[object Null]", a = "[object Undefined]", o = i ? i.toStringTag : void 0;
  function s(n) {
    return n == null ? n === void 0 ? a : r : o && o in Object(n) ? e(n) : t(n);
  }
  return Jt = s, Jt;
}
var ei, Jr;
function Tn() {
  if (Jr) return ei;
  Jr = 1;
  function i(e) {
    return e != null && typeof e == "object";
  }
  return ei = i, ei;
}
var ti, ea;
function En() {
  if (ea) return ti;
  ea = 1;
  var i = Fn(), e = Tn(), t = "[object Symbol]";
  function r(a) {
    return typeof a == "symbol" || e(a) && i(a) == t;
  }
  return ti = r, ti;
}
var ii, ta;
function An() {
  if (ta) return ii;
  ta = 1;
  var i = Cn(), e = Ki(), t = En(), r = NaN, a = /^[-+]0x[0-9a-f]+$/i, o = /^0b[01]+$/i, s = /^0o[0-7]+$/i, n = parseInt;
  function p(l) {
    if (typeof l == "number")
      return l;
    if (t(l))
      return r;
    if (e(l)) {
      var c = typeof l.valueOf == "function" ? l.valueOf() : l;
      l = e(c) ? c + "" : c;
    }
    if (typeof l != "string")
      return l === 0 ? l : +l;
    l = i(l);
    var d = o.test(l);
    return d || s.test(l) ? n(l.slice(2), d ? 2 : 8) : a.test(l) ? r : +l;
  }
  return ii = p, ii;
}
var ri, ia;
function Ao() {
  if (ia) return ri;
  ia = 1;
  var i = Ki(), e = Sn(), t = An(), r = "Expected a function", a = Math.max, o = Math.min;
  function s(n, p, l) {
    var c, d, h, m, f, y, b = 0, w = !1, x = !1, _ = !0;
    if (typeof n != "function")
      throw new TypeError(r);
    p = t(p) || 0, i(l) && (w = !!l.leading, x = "maxWait" in l, h = x ? a(t(l.maxWait) || 0, p) : h, _ = "trailing" in l ? !!l.trailing : _);
    function C(F) {
      var z = c, A = d;
      return c = d = void 0, b = F, m = n.apply(A, z), m;
    }
    function B(F) {
      return b = F, f = setTimeout(k, p), w ? C(F) : m;
    }
    function g(F) {
      var z = F - y, A = F - b, V = p - z;
      return x ? o(V, h - A) : V;
    }
    function D(F) {
      var z = F - y, A = F - b;
      return y === void 0 || z >= p || z < 0 || x && A >= h;
    }
    function k() {
      var F = e();
      if (D(F))
        return S(F);
      f = setTimeout(k, g(F));
    }
    function S(F) {
      return f = void 0, _ && c ? C(F) : (c = d = void 0, m);
    }
    function O() {
      f !== void 0 && clearTimeout(f), b = 0, c = y = d = f = void 0;
    }
    function T() {
      return f === void 0 ? m : S(e());
    }
    function M() {
      var F = e(), z = D(F);
      if (c = arguments, d = this, y = F, z) {
        if (f === void 0)
          return B(y);
        if (x)
          return clearTimeout(f), f = setTimeout(k, p), C(y);
      }
      return f === void 0 && (f = setTimeout(k, p)), m;
    }
    return M.cancel = O, M.flush = T, M;
  }
  return ri = s, ri;
}
var ai, ra;
function On() {
  if (ra) return ai;
  ra = 1;
  var i = Ao(), e = Ki(), t = "Expected a function";
  function r(a, o, s) {
    var n = !0, p = !0;
    if (typeof a != "function")
      throw new TypeError(t);
    return e(s) && (n = "leading" in s ? !!s.leading : n, p = "trailing" in s ? !!s.trailing : p), i(a, o, {
      leading: n,
      maxWait: o,
      trailing: p
    });
  }
  return ai = r, ai;
}
var Mn = On();
const zn = /* @__PURE__ */ $e(Mn);
var oi, aa;
function Rn() {
  return aa || (aa = 1, oi = function() {
    var e = {}, t = e._fns = {};
    e.emit = function(s, n, p, l, c, d, h) {
      var m = r(s);
      m.length && a(s, m, [n, p, l, c, d, h]);
    }, e.on = function(s, n) {
      t[s] || (t[s] = []), t[s].push(n);
    }, e.once = function(s, n) {
      function p() {
        n.apply(this, arguments), e.off(s, p);
      }
      this.on(s, p);
    }, e.off = function(s, n) {
      var p = [];
      if (s && n) {
        var l = this._fns[s], c = 0, d = l ? l.length : 0;
        for (c; c < d; c++)
          l[c] !== n && p.push(l[c]);
      }
      p.length ? this._fns[s] = p : delete this._fns[s];
    };
    function r(o) {
      var s = t[o] ? t[o] : [], n = o.indexOf(":"), p = n === -1 ? [o] : [o.substring(0, n), o.substring(n + 1)], l = Object.keys(t), c = 0, d = l.length;
      for (c; c < d; c++) {
        var h = l[c];
        if (h === "*" && (s = s.concat(t[h])), p.length === 2 && p[0] === h) {
          s = s.concat(t[h]);
          break;
        }
      }
      return s;
    }
    function a(o, s, n) {
      var p = 0, l = s.length;
      for (p; p < l && s[p]; p++)
        s[p].event = o, s[p].apply(s[p], n);
    }
    return e;
  }), oi;
}
var Nn = Rn();
const Un = /* @__PURE__ */ $e(Nn);
let $n = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", Zi = (i = 21) => {
  let e = "", t = i | 0;
  for (; t--; )
    e += $n[Math.random() * 64 | 0];
  return e;
};
const Ln = "@uppy/core", Hn = "Core module for the extensible JavaScript file upload widget with support for drag&drop, resumable uploads, previews, restrictions, file processing/encoding, remote providers like Instagram, Dropbox, Google Drive, S3 and more :dog:", jn = "4.5.2", qn = "MIT", Wn = "lib/index.js", Vn = "dist/style.min.css", Gn = "module", Xn = ["*.css"], Yn = { build: "tsc --build tsconfig.build.json", "build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css", typecheck: "tsc --build", test: "vitest run --environment=jsdom --silent='passed-only'" }, Kn = ["file uploader", "uppy", "uppy-plugin"], Zn = "https://uppy.io", Qn = { url: "https://github.com/transloadit/uppy/issues" }, Jn = { type: "git", url: "git+https://github.com/transloadit/uppy.git" }, el = ["src", "lib", "dist", "CHANGELOG.md"], tl = { "@transloadit/prettier-bytes": "^0.3.4", "@uppy/store-default": "^4.3.2", "@uppy/utils": "^6.2.2", lodash: "^4.17.21", "mime-match": "^1.0.2", "namespace-emitter": "^2.0.1", nanoid: "^5.0.9", preact: "^10.5.13" }, il = { "@types/deep-freeze": "^0", cssnano: "^7.0.7", "deep-freeze": "^0.0.1", jsdom: "^26.1.0", postcss: "^8.5.6", "postcss-cli": "^11.0.1", sass: "^1.89.2", typescript: "^5.8.3", vitest: "^3.2.4" }, rl = {
  name: Ln,
  description: Hn,
  version: jn,
  license: qn,
  main: Wn,
  style: Vn,
  type: Gn,
  sideEffects: Xn,
  scripts: Yn,
  keywords: Kn,
  homepage: Zn,
  bugs: Qn,
  repository: Jn,
  files: el,
  dependencies: tl,
  devDependencies: il
};
function al(i, e) {
  return e.name ? e.name : i.split("/")[0] === "image" ? `${i.split("/")[0]}.${i.split("/")[1]}` : "noname";
}
const ol = {
  strings: {
    addBulkFilesFailed: {
      0: "Failed to add %{smart_count} file due to an internal error",
      1: "Failed to add %{smart_count} files due to internal errors"
    },
    youCanOnlyUploadX: {
      0: "You can only upload %{smart_count} file",
      1: "You can only upload %{smart_count} files"
    },
    youHaveToAtLeastSelectX: {
      0: "You have to select at least %{smart_count} file",
      1: "You have to select at least %{smart_count} files"
    },
    aggregateExceedsSize: "You selected %{size} of files, but maximum allowed size is %{sizeAllowed}",
    exceedsSize: "%{file} exceeds maximum allowed size of %{size}",
    missingRequiredMetaField: "Missing required meta fields",
    missingRequiredMetaFieldOnFile: "Missing required meta fields in %{fileName}",
    inferiorSize: "This file is smaller than the allowed size of %{size}",
    youCanOnlyUploadFileTypes: "You can only upload: %{types}",
    noMoreFilesAllowed: "Cannot add more files",
    noDuplicates: "Cannot add the duplicate file '%{fileName}', it already exists",
    companionError: "Connection with Companion failed",
    authAborted: "Authentication aborted",
    companionUnauthorizeHint: "To unauthorize to your %{provider} account, please go to %{url}",
    failedToUpload: "Failed to upload %{file}",
    noInternetConnection: "No Internet connection",
    connectedToInternet: "Connected to the Internet",
    // Strings for remote providers
    noFilesFound: "You have no files or folders here",
    noSearchResults: "Unfortunately, there are no results for this search",
    selectX: {
      0: "Select %{smart_count}",
      1: "Select %{smart_count}"
    },
    allFilesFromFolderNamed: "All files from folder %{name}",
    openFolderNamed: "Open folder %{name}",
    cancel: "Cancel",
    logOut: "Log out",
    logIn: "Log in",
    pickFiles: "Pick files",
    pickPhotos: "Pick photos",
    filter: "Filter",
    resetFilter: "Reset filter",
    loading: "Loading...",
    loadedXFiles: "Loaded %{numFiles} files",
    authenticateWithTitle: "Please authenticate with %{pluginName} to select files",
    authenticateWith: "Connect to %{pluginName}",
    signInWithGoogle: "Sign in with Google",
    searchImages: "Search for images",
    enterTextToSearch: "Enter text to search for images",
    search: "Search",
    resetSearch: "Reset search",
    emptyFolderAdded: "No files were added from empty folder",
    addedNumFiles: "Added %{numFiles} file(s)",
    folderAlreadyAdded: 'The folder "%{folder}" was already added',
    folderAdded: {
      0: "Added %{smart_count} file from %{folder}",
      1: "Added %{smart_count} files from %{folder}"
    },
    additionalRestrictionsFailed: "%{count} additional restrictions were not fulfilled",
    unnamed: "Unnamed",
    pleaseWait: "Please wait"
  }
};
var si, oa;
function sl() {
  return oa || (oa = 1, si = function(e) {
    if (typeof e != "number" || Number.isNaN(e))
      throw new TypeError(`Expected a number, got ${typeof e}`);
    const t = e < 0;
    let r = Math.abs(e);
    if (t && (r = -r), r === 0)
      return "0 B";
    const a = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], o = Math.min(Math.floor(Math.log(r) / Math.log(1024)), a.length - 1), s = Number(r / 1024 ** o), n = a[o];
    return `${s >= 10 || s % 1 === 0 ? Math.round(s) : s.toFixed(1)} ${n}`;
  }), si;
}
var nl = sl();
const ce = /* @__PURE__ */ $e(nl);
var ni, sa;
function ll() {
  if (sa) return ni;
  sa = 1;
  function i(e, t) {
    this.text = e = e || "", this.hasWild = ~e.indexOf("*"), this.separator = t, this.parts = e.split(t);
  }
  return i.prototype.match = function(e) {
    var t = !0, r = this.parts, a, o = r.length, s;
    if (typeof e == "string" || e instanceof String)
      if (!this.hasWild && this.text != e)
        t = !1;
      else {
        for (s = (e || "").split(this.separator), a = 0; t && a < o; a++)
          r[a] !== "*" && (a < s.length ? t = r[a] === s[a] : t = !1);
        t = t && s;
      }
    else if (typeof e.splice == "function")
      for (t = [], a = e.length; a--; )
        this.match(e[a]) && (t[t.length] = e[a]);
    else if (typeof e == "object") {
      t = {};
      for (var n in e)
        this.match(n) && (t[n] = e[n]);
    }
    return t;
  }, ni = function(e, t, r) {
    var a = new i(e, r || /[\/\.]/);
    return typeof t < "u" ? a.match(t) : a;
  }, ni;
}
var li, na;
function pl() {
  if (na) return li;
  na = 1;
  var i = ll(), e = /[\/\+\.]/;
  return li = function(t, r) {
    function a(o) {
      var s = i(o, t, e);
      return s && s.length >= 2;
    }
    return r ? a(r.split(";")[0]) : a;
  }, li;
}
var dl = pl();
const ul = /* @__PURE__ */ $e(dl), cl = {
  maxFileSize: null,
  minFileSize: null,
  maxTotalFileSize: null,
  maxNumberOfFiles: null,
  minNumberOfFiles: null,
  allowedFileTypes: null,
  requiredMetaFields: []
};
class J extends Error {
  isUserFacing;
  file;
  constructor(e, t) {
    super(e), this.isUserFacing = t?.isUserFacing ?? !0, t?.file && (this.file = t.file);
  }
  isRestriction = !0;
}
class hl {
  getI18n;
  getOpts;
  constructor(e, t) {
    this.getI18n = t, this.getOpts = () => {
      const r = e();
      if (r.restrictions?.allowedFileTypes != null && !Array.isArray(r.restrictions.allowedFileTypes))
        throw new TypeError("`restrictions.allowedFileTypes` must be an array");
      return r;
    };
  }
  // Because these operations are slow, we cannot run them for every file (if we are adding multiple files)
  validateAggregateRestrictions(e, t) {
    const { maxTotalFileSize: r, maxNumberOfFiles: a } = this.getOpts().restrictions;
    if (a && e.filter((s) => !s.isGhost).length + t.length > a)
      throw new J(`${this.getI18n()("youCanOnlyUploadX", {
        smart_count: a
      })}`);
    if (r) {
      const o = [...e, ...t].reduce((s, n) => s + (n.size ?? 0), 0);
      if (o > r)
        throw new J(this.getI18n()("aggregateExceedsSize", {
          sizeAllowed: ce(r),
          size: ce(o)
        }));
    }
  }
  validateSingleFile(e) {
    const { maxFileSize: t, minFileSize: r, allowedFileTypes: a } = this.getOpts().restrictions;
    if (a && !a.some((s) => s.includes("/") ? e.type ? ul(e.type.replace(/;.*?$/, ""), s) : !1 : s[0] === "." && e.extension ? e.extension.toLowerCase() === s.slice(1).toLowerCase() : !1)) {
      const s = a.join(", ");
      throw new J(this.getI18n()("youCanOnlyUploadFileTypes", {
        types: s
      }), { file: e });
    }
    if (t && e.size != null && e.size > t)
      throw new J(this.getI18n()("exceedsSize", {
        size: ce(t),
        file: e.name ?? this.getI18n()("unnamed")
      }), { file: e });
    if (r && e.size != null && e.size < r)
      throw new J(this.getI18n()("inferiorSize", {
        size: ce(r)
      }), { file: e });
  }
  validate(e, t) {
    t.forEach((r) => {
      this.validateSingleFile(r);
    }), this.validateAggregateRestrictions(e, t);
  }
  validateMinNumberOfFiles(e) {
    const { minNumberOfFiles: t } = this.getOpts().restrictions;
    if (t && Object.keys(e).length < t)
      throw new J(this.getI18n()("youHaveToAtLeastSelectX", {
        smart_count: t
      }));
  }
  getMissingRequiredMetaFields(e) {
    const t = new J(this.getI18n()("missingRequiredMetaFieldOnFile", {
      fileName: e.name ?? this.getI18n()("unnamed")
    })), { requiredMetaFields: r } = this.getOpts().restrictions, a = [];
    for (const o of r)
      (!Object.hasOwn(e.meta, o) || e.meta[o] === "") && a.push(o);
    return { missingFields: a, error: t };
  }
}
function fl(i) {
  if (i == null && typeof navigator < "u" && (i = navigator.userAgent), !i)
    return !0;
  const e = /Edge\/(\d+\.\d+)/.exec(i);
  if (!e)
    return !0;
  const r = e[1].split(".", 2), a = parseInt(r[0], 10), o = parseInt(r[1], 10);
  return a < 15 || a === 15 && o < 15063 || a > 18 || a === 18 && o >= 18218;
}
const gt = {
  totalProgress: 0,
  allowNewUpload: !0,
  error: null,
  recoveredState: null
};
class Qi {
  static VERSION = rl.version;
  #e = /* @__PURE__ */ Object.create(null);
  #t;
  #r;
  #i = Un();
  #a = /* @__PURE__ */ new Set();
  #s = /* @__PURE__ */ new Set();
  #n = /* @__PURE__ */ new Set();
  defaultLocale;
  locale;
  // The user optionally passes in options, but we set defaults for missing options.
  // We consider all options present after the contructor has run.
  opts;
  store;
  // Warning: do not use this from a plugin, as it will cause the plugins' translations to be missing
  i18n;
  i18nArray;
  scheduledAutoProceed = null;
  wasOffline = !1;
  /**
   * Instantiate Uppy
   */
  constructor(e) {
    this.defaultLocale = ol;
    const t = {
      id: "uppy",
      autoProceed: !1,
      allowMultipleUploadBatches: !0,
      debug: !1,
      restrictions: cl,
      meta: {},
      onBeforeFileAdded: (a, o) => !Object.hasOwn(o, a.id),
      onBeforeUpload: (a) => a,
      store: new vn(),
      logger: Ts,
      infoTimeout: 5e3
    }, r = { ...t, ...e };
    this.opts = {
      ...r,
      restrictions: {
        ...t.restrictions,
        ...e?.restrictions
      }
    }, e?.logger && e.debug ? this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning") : e?.debug && (this.opts.logger = Es), this.log(`Using Core v${Qi.VERSION}`), this.i18nInit(), this.store = this.opts.store, this.setState({
      ...gt,
      plugins: {},
      files: {},
      currentUploads: {},
      capabilities: {
        uploadProgress: fl(),
        individualCancellation: !0,
        resumableUploads: !1
      },
      meta: { ...this.opts.meta },
      info: []
    }), this.#t = new hl(() => this.opts, () => this.i18n), this.#r = this.store.subscribe((a, o, s) => {
      this.emit("state-update", a, o, s), this.updateAll(o);
    }), this.opts.debug && typeof window < "u" && (window[this.opts.id] = this), this.#S();
  }
  emit(e, ...t) {
    this.#i.emit(e, ...t);
  }
  on(e, t) {
    return this.#i.on(e, t), this;
  }
  once(e, t) {
    return this.#i.once(e, t), this;
  }
  off(e, t) {
    return this.#i.off(e, t), this;
  }
  /**
   * Iterate on all plugins and run `update` on them.
   * Called each time state changes.
   *
   */
  updateAll(e) {
    this.iteratePlugins((t) => {
      t.update(e);
    });
  }
  /**
   * Updates state with a patch
   */
  setState(e) {
    this.store.setState(e);
  }
  /**
   * Returns current state.
   */
  getState() {
    return this.store.getState();
  }
  patchFilesState(e) {
    const t = this.getState().files;
    this.setState({
      files: {
        ...t,
        ...Object.fromEntries(Object.entries(e).map(([r, a]) => [
          r,
          {
            ...t[r],
            ...a
          }
        ]))
      }
    });
  }
  /**
   * Shorthand to set state for a specific file.
   */
  setFileState(e, t) {
    if (!this.getState().files[e])
      throw new Error(`Can’t set state for ${e} (the file could have been removed)`);
    this.patchFilesState({ [e]: t });
  }
  i18nInit() {
    const e = (r) => this.log(`Missing i18n string: ${r}`, "error"), t = new no([this.defaultLocale, this.opts.locale], {
      onMissingKey: e
    });
    this.i18n = t.translate.bind(t), this.i18nArray = t.translateArray.bind(t), this.locale = t.locale;
  }
  setOptions(e) {
    this.opts = {
      ...this.opts,
      ...e,
      restrictions: {
        ...this.opts.restrictions,
        ...e?.restrictions
      }
    }, e.meta && this.setMeta(e.meta), this.i18nInit(), e.locale && this.iteratePlugins((t) => {
      t.setOptions(e);
    }), this.setState(void 0);
  }
  resetProgress() {
    const e = {
      percentage: 0,
      bytesUploaded: !1,
      uploadComplete: !1,
      uploadStarted: null
    }, t = { ...this.getState().files }, r = /* @__PURE__ */ Object.create(null);
    Object.keys(t).forEach((a) => {
      r[a] = {
        ...t[a],
        progress: {
          ...t[a].progress,
          ...e
        },
        // @ts-expect-error these typed are inserted
        // into the namespace in their respective packages
        // but core isn't ware of those
        tus: void 0,
        transloadit: void 0
      };
    }), this.setState({ files: r, ...gt });
  }
  clear() {
    const { capabilities: e, currentUploads: t } = this.getState();
    if (Object.keys(t).length > 0 && !e.individualCancellation)
      throw new Error("The installed uploader plugin does not allow removing files during an upload.");
    this.setState({ ...gt, files: {} });
  }
  addPreProcessor(e) {
    this.#a.add(e);
  }
  removePreProcessor(e) {
    return this.#a.delete(e);
  }
  addPostProcessor(e) {
    this.#n.add(e);
  }
  removePostProcessor(e) {
    return this.#n.delete(e);
  }
  addUploader(e) {
    this.#s.add(e);
  }
  removeUploader(e) {
    return this.#s.delete(e);
  }
  setMeta(e) {
    const t = { ...this.getState().meta, ...e }, r = { ...this.getState().files };
    Object.keys(r).forEach((a) => {
      r[a] = {
        ...r[a],
        meta: { ...r[a].meta, ...e }
      };
    }), this.log("Adding metadata:"), this.log(e), this.setState({
      meta: t,
      files: r
    });
  }
  setFileMeta(e, t) {
    const r = { ...this.getState().files };
    if (!r[e]) {
      this.log(`Was trying to set metadata for a file that has been removed: ${e}`);
      return;
    }
    const a = { ...r[e].meta, ...t };
    r[e] = { ...r[e], meta: a }, this.setState({ files: r });
  }
  /**
   * Get a file object.
   */
  getFile(e) {
    return this.getState().files[e];
  }
  /**
   * Get all files in an array.
   */
  getFiles() {
    const { files: e } = this.getState();
    return Object.values(e);
  }
  getFilesByIds(e) {
    return e.map((t) => this.getFile(t));
  }
  getObjectOfFilesPerState() {
    const { files: e, totalProgress: t, error: r } = this.getState(), a = Object.values(e), o = [], s = [], n = [], p = [], l = [], c = [], d = [], h = [], m = [];
    for (const f of a) {
      const { progress: y } = f;
      !y.uploadComplete && y.uploadStarted && (o.push(f), f.isPaused || h.push(f)), y.uploadStarted || s.push(f), (y.uploadStarted || y.preprocess || y.postprocess) && n.push(f), y.uploadStarted && p.push(f), f.isPaused && l.push(f), y.uploadComplete && c.push(f), f.error && d.push(f), (y.preprocess || y.postprocess) && m.push(f);
    }
    return {
      newFiles: s,
      startedFiles: n,
      uploadStartedFiles: p,
      pausedFiles: l,
      completeFiles: c,
      erroredFiles: d,
      inProgressFiles: o,
      inProgressNotPausedFiles: h,
      processingFiles: m,
      isUploadStarted: p.length > 0,
      isAllComplete: t === 100 && c.length === a.length && m.length === 0,
      isAllErrored: !!r && d.length === a.length,
      isAllPaused: o.length !== 0 && l.length === o.length,
      isUploadInProgress: o.length > 0,
      isSomeGhost: a.some((f) => f.isGhost)
    };
  }
  #o(e) {
    for (const s of e)
      s.isRestriction ? this.emit("restriction-failed", s.file, s) : this.emit("error", s, s.file), this.log(s, "warning");
    const t = e.filter((s) => s.isUserFacing), r = 4, a = t.slice(0, r), o = t.slice(r);
    a.forEach(({ message: s, details: n = "" }) => {
      this.info({ message: s, details: n }, "error", this.opts.infoTimeout);
    }), o.length > 0 && this.info({
      message: this.i18n("additionalRestrictionsFailed", {
        count: o.length
      })
    });
  }
  validateRestrictions(e, t = this.getFiles()) {
    try {
      this.#t.validate(t, [e]);
    } catch (r) {
      return r;
    }
    return null;
  }
  validateSingleFile(e) {
    try {
      this.#t.validateSingleFile(e);
    } catch (t) {
      return t.message;
    }
    return null;
  }
  validateAggregateRestrictions(e) {
    const t = this.getFiles();
    try {
      this.#t.validateAggregateRestrictions(t, e);
    } catch (r) {
      return r.message;
    }
    return null;
  }
  #l(e) {
    const { missingFields: t, error: r } = this.#t.getMissingRequiredMetaFields(e);
    return t.length > 0 ? (this.setFileState(e.id, { missingRequiredMetaFields: t }), this.log(r.message), this.emit("restriction-failed", e, r), !1) : (t.length === 0 && e.missingRequiredMetaFields && this.setFileState(e.id, { missingRequiredMetaFields: [] }), !0);
  }
  #h(e) {
    let t = !0;
    for (const r of Object.values(e))
      this.#l(r) || (t = !1);
    return t;
  }
  #p(e) {
    const { allowNewUpload: t } = this.getState();
    if (t === !1) {
      const r = new J(this.i18n("noMoreFilesAllowed"), {
        file: e
      });
      throw this.#o([r]), r;
    }
  }
  checkIfFileAlreadyExists(e) {
    const { files: t } = this.getState();
    return !!(t[e] && !t[e].isGhost);
  }
  /**
   * Create a file state object based on user-provided `addFile()` options.
   */
  #c(e) {
    const t = e instanceof File ? {
      name: e.name,
      type: e.type,
      size: e.size,
      data: e
    } : e, r = Fo(t), a = al(r, t), o = Ot(a).extension, s = Dn(t, this.getID()), n = t.meta || {};
    n.name = a, n.type = r;
    const p = Number.isFinite(t.data.size) ? t.data.size : null;
    return {
      source: t.source || "",
      id: s,
      name: a,
      extension: o || "",
      meta: {
        ...this.getState().meta,
        ...n
      },
      type: r,
      data: t.data,
      progress: {
        percentage: 0,
        bytesUploaded: !1,
        bytesTotal: p,
        uploadComplete: !1,
        uploadStarted: null
      },
      size: p,
      isGhost: !1,
      isRemote: t.isRemote || !1,
      remote: t.remote,
      preview: t.preview
    };
  }
  // Schedule an upload if `autoProceed` is enabled.
  #u() {
    this.opts.autoProceed && !this.scheduledAutoProceed && (this.scheduledAutoProceed = setTimeout(() => {
      this.scheduledAutoProceed = null, this.upload().catch((e) => {
        e.isRestriction || this.log(e.stack || e.message || e);
      });
    }, 4));
  }
  #d(e) {
    let { files: t } = this.getState(), r = { ...t };
    const a = [], o = [];
    for (const s of e)
      try {
        let n = this.#c(s);
        const p = t[n.id]?.isGhost;
        p && (n = {
          ...t[n.id],
          isGhost: !1,
          data: s.data
        }, this.log(`Replaced the blob in the restored ghost file: ${n.name}, ${n.id}`));
        const l = this.opts.onBeforeFileAdded(n, r);
        if (t = this.getState().files, r = { ...t, ...r }, !l && this.checkIfFileAlreadyExists(n.id))
          throw new J(this.i18n("noDuplicates", {
            fileName: n.name ?? this.i18n("unnamed")
          }), { file: s });
        if (l === !1 && !p)
          throw new J("Cannot add the file because onBeforeFileAdded returned false.", { isUserFacing: !1, file: s });
        typeof l == "object" && l !== null && (n = l), this.#t.validateSingleFile(n), r[n.id] = n, a.push(n);
      } catch (n) {
        o.push(n);
      }
    try {
      this.#t.validateAggregateRestrictions(Object.values(t), a);
    } catch (s) {
      return o.push(s), {
        nextFilesState: t,
        validFilesToAdd: [],
        errors: o
      };
    }
    return {
      nextFilesState: r,
      validFilesToAdd: a,
      errors: o
    };
  }
  /**
   * Add a new file to `state.files`. This will run `onBeforeFileAdded`,
   * try to guess file type in a clever way, check file against restrictions,
   * and start an upload if `autoProceed === true`.
   */
  addFile(e) {
    this.#p(e);
    const { nextFilesState: t, validFilesToAdd: r, errors: a } = this.#d([e]), o = a.filter((n) => n.isRestriction);
    if (this.#o(o), a.length > 0)
      throw a[0];
    this.setState({ files: t });
    const [s] = r;
    return this.emit("file-added", s), this.emit("files-added", r), this.log(`Added file: ${s.name}, ${s.id}, mime type: ${s.type}`), this.#u(), s.id;
  }
  /**
   * Add multiple files to `state.files`. See the `addFile()` documentation.
   *
   * If an error occurs while adding a file, it is logged and the user is notified.
   * This is good for UI plugins, but not for programmatic use.
   * Programmatic users should usually still use `addFile()` on individual files.
   */
  addFiles(e) {
    this.#p();
    const { nextFilesState: t, validFilesToAdd: r, errors: a } = this.#d(e), o = a.filter((n) => n.isRestriction);
    this.#o(o);
    const s = a.filter((n) => !n.isRestriction);
    if (s.length > 0) {
      let n = `Multiple errors occurred while adding files:
`;
      if (s.forEach((p) => {
        n += `
 * ${p.message}`;
      }), this.info({
        message: this.i18n("addBulkFilesFailed", {
          smart_count: s.length
        }),
        details: n
      }, "error", this.opts.infoTimeout), typeof AggregateError == "function")
        throw new AggregateError(s, n);
      {
        const p = new Error(n);
        throw p.errors = s, p;
      }
    }
    this.setState({ files: t }), r.forEach((n) => {
      this.emit("file-added", n);
    }), this.emit("files-added", r), r.length > 5 ? this.log(`Added batch of ${r.length} files`) : Object.values(r).forEach((n) => {
      this.log(`Added file: ${n.name}
 id: ${n.id}
 type: ${n.type}`);
    }), r.length > 0 && this.#u();
  }
  removeFiles(e) {
    const { files: t, currentUploads: r } = this.getState(), a = { ...t }, o = { ...r }, s = /* @__PURE__ */ Object.create(null);
    e.forEach((c) => {
      t[c] && (s[c] = t[c], delete a[c]);
    });
    function n(c) {
      return s[c] === void 0;
    }
    Object.keys(o).forEach((c) => {
      const d = r[c].fileIDs.filter(n);
      if (d.length === 0) {
        delete o[c];
        return;
      }
      const { capabilities: h } = this.getState();
      if (d.length !== r[c].fileIDs.length && !h.individualCancellation)
        throw new Error("The installed uploader plugin does not allow removing files during an upload.");
      o[c] = {
        ...r[c],
        fileIDs: d
      };
    });
    const p = {
      currentUploads: o,
      files: a
    };
    Object.keys(a).length === 0 && (p.allowNewUpload = !0, p.error = null, p.recoveredState = null), this.setState(p), this.#y();
    const l = Object.keys(s);
    l.forEach((c) => {
      this.emit("file-removed", s[c]);
    }), l.length > 5 ? this.log(`Removed ${l.length} files`) : this.log(`Removed files: ${l.join(", ")}`);
  }
  removeFile(e) {
    this.removeFiles([e]);
  }
  pauseResume(e) {
    if (!this.getState().capabilities.resumableUploads || this.getFile(e).progress.uploadComplete)
      return;
    const t = this.getFile(e), a = !(t.isPaused || !1);
    return this.setFileState(e, {
      isPaused: a
    }), this.emit("upload-pause", t, a), a;
  }
  pauseAll() {
    const e = { ...this.getState().files };
    Object.keys(e).filter((r) => !e[r].progress.uploadComplete && e[r].progress.uploadStarted).forEach((r) => {
      const a = { ...e[r], isPaused: !0 };
      e[r] = a;
    }), this.setState({ files: e }), this.emit("pause-all");
  }
  resumeAll() {
    const e = { ...this.getState().files };
    Object.keys(e).filter((r) => !e[r].progress.uploadComplete && e[r].progress.uploadStarted).forEach((r) => {
      const a = {
        ...e[r],
        isPaused: !1,
        error: null
      };
      e[r] = a;
    }), this.setState({ files: e }), this.emit("resume-all");
  }
  #f() {
    const { files: e } = this.getState();
    return Object.keys(e).filter((t) => e[t].error);
  }
  async #m() {
    const e = this.#f(), t = { ...this.getState().files };
    if (e.forEach((a) => {
      t[a] = {
        ...t[a],
        isPaused: !1,
        error: null
      };
    }), this.setState({
      files: t,
      error: null
    }), this.emit("retry-all", this.getFilesByIds(e)), e.length === 0)
      return {
        successful: [],
        failed: []
      };
    const r = this.#b(e, {
      forceAllowNewUpload: !0
      // create new upload even if allowNewUpload: false
    });
    return this.#v(r);
  }
  async retryAll() {
    const e = await this.#m();
    return this.emit("complete", e), e;
  }
  cancelAll() {
    this.emit("cancel-all");
    const { files: e } = this.getState(), t = Object.keys(e);
    t.length && this.removeFiles(t), this.setState(gt);
  }
  retryUpload(e) {
    this.setFileState(e, {
      error: null,
      isPaused: !1
    }), this.emit("upload-retry", this.getFile(e));
    const t = this.#b([e], {
      forceAllowNewUpload: !0
      // create new upload even if allowNewUpload: false
    });
    return this.#v(t);
  }
  logout() {
    this.iteratePlugins((e) => {
      e.provider?.logout?.();
    });
  }
  #w = (e, t) => {
    const r = e ? this.getFile(e.id) : void 0;
    if (e == null || !r) {
      this.log(`Not setting progress for a file that has been removed: ${e?.id}`);
      return;
    }
    if (r.progress.percentage === 100) {
      this.log(`Not setting progress for a file that has been already uploaded: ${e.id}`);
      return;
    }
    const a = {
      bytesTotal: t.bytesTotal,
      // bytesTotal may be null or zero; in that case we can't divide by it
      percentage: t.bytesTotal != null && Number.isFinite(t.bytesTotal) && t.bytesTotal > 0 ? Math.round(t.bytesUploaded / t.bytesTotal * 100) : void 0
    };
    r.progress.uploadStarted != null ? this.setFileState(e.id, {
      progress: {
        ...r.progress,
        ...a,
        bytesUploaded: t.bytesUploaded
      }
    }) : this.setFileState(e.id, {
      progress: {
        ...r.progress,
        ...a
      }
    }), this.#y();
  };
  #_() {
    const e = this.#k();
    let t = null;
    e != null && (t = Math.round(e * 100), t > 100 ? t = 100 : t < 0 && (t = 0)), this.emit("progress", t ?? 0), this.setState({
      totalProgress: t ?? 0
    });
  }
  // ___Why throttle at 500ms?
  //    - We must throttle at >250ms for superfocus in Dashboard to work well
  //    (because animation takes 0.25s, and we want to wait for all animations to be over before refocusing).
  //    [Practical Check]: if thottle is at 100ms, then if you are uploading a file,
  //    and click 'ADD MORE FILES', - focus won't activate in Firefox.
  //    - We must throttle at around >500ms to avoid performance lags.
  //    [Practical Check] Firefox, try to upload a big file for a prolonged period of time. Laptop will start to heat up.
  #y = zn(() => this.#_(), 500, { leading: !0, trailing: !0 });
  [Symbol.for("uppy test: updateTotalProgress")]() {
    return this.#_();
  }
  #k() {
    const t = this.getFiles().filter((p) => p.progress.uploadStarted || p.progress.preprocess || p.progress.postprocess);
    if (t.length === 0)
      return 0;
    if (t.every((p) => p.progress.uploadComplete))
      return 1;
    const r = (p) => p.progress.bytesTotal != null && p.progress.bytesTotal !== 0, a = t.filter(r), o = t.filter((p) => !r(p));
    if (a.every((p) => p.progress.uploadComplete) && o.length > 0 && !o.every((p) => p.progress.uploadComplete))
      return null;
    const s = a.reduce((p, l) => p + (l.progress.bytesTotal ?? 0), 0), n = a.reduce((p, l) => p + (l.progress.bytesUploaded || 0), 0);
    return s === 0 ? 0 : n / s;
  }
  /**
   * Registers listeners for all global actions, like:
   * `error`, `file-removed`, `upload-progress`
   */
  #S() {
    const e = (a, o, s) => {
      let n = a.message || "Unknown error";
      a.details && (n += ` ${a.details}`), this.setState({ error: n }), o != null && o.id in this.getState().files && this.setFileState(o.id, {
        error: n,
        response: s
      });
    };
    this.on("error", e), this.on("upload-error", (a, o, s) => {
      if (e(o, a, s), typeof o == "object" && o.message) {
        this.log(o.message, "error");
        const n = new Error(this.i18n("failedToUpload", { file: a?.name ?? "" }));
        n.isUserFacing = !0, n.details = o.message, o.details && (n.details += ` ${o.details}`), this.#o([n]);
      } else
        this.#o([o]);
    });
    let t = null;
    this.on("upload-stalled", (a, o) => {
      const { message: s } = a, n = o.map((p) => p.meta.name).join(", ");
      t || (this.info({ message: s, details: n }, "warning", this.opts.infoTimeout), t = setTimeout(() => {
        t = null;
      }, this.opts.infoTimeout)), this.log(`${s} ${n}`.trim(), "warning");
    }), this.on("upload", () => {
      this.setState({ error: null });
    });
    const r = (a) => {
      const o = a.filter((n) => {
        const p = n != null && this.getFile(n.id);
        return p || this.log(`Not setting progress for a file that has been removed: ${n?.id}`), p;
      }), s = Object.fromEntries(o.map((n) => [
        n.id,
        {
          progress: {
            uploadStarted: Date.now(),
            uploadComplete: !1,
            bytesUploaded: 0,
            bytesTotal: n.size
          }
        }
      ]));
      this.patchFilesState(s);
    };
    this.on("upload-start", r), this.on("upload-progress", this.#w), this.on("upload-success", (a, o) => {
      if (a == null || !this.getFile(a.id)) {
        this.log(`Not setting progress for a file that has been removed: ${a?.id}`);
        return;
      }
      const s = this.getFile(a.id).progress;
      this.setFileState(a.id, {
        progress: {
          ...s,
          postprocess: this.#n.size > 0 ? {
            mode: "indeterminate"
          } : void 0,
          uploadComplete: !0,
          percentage: 100,
          bytesUploaded: s.bytesTotal
        },
        response: o,
        uploadURL: o.uploadURL,
        isPaused: !1
      }), a.size == null && this.setFileState(a.id, {
        size: o.bytesUploaded || s.bytesTotal
      }), this.#y();
    }), this.on("preprocess-progress", (a, o) => {
      if (a == null || !this.getFile(a.id)) {
        this.log(`Not setting progress for a file that has been removed: ${a?.id}`);
        return;
      }
      this.setFileState(a.id, {
        progress: { ...this.getFile(a.id).progress, preprocess: o }
      });
    }), this.on("preprocess-complete", (a) => {
      if (a == null || !this.getFile(a.id)) {
        this.log(`Not setting progress for a file that has been removed: ${a?.id}`);
        return;
      }
      const o = { ...this.getState().files };
      o[a.id] = {
        ...o[a.id],
        progress: { ...o[a.id].progress }
      }, delete o[a.id].progress.preprocess, this.setState({ files: o });
    }), this.on("postprocess-progress", (a, o) => {
      if (a == null || !this.getFile(a.id)) {
        this.log(`Not setting progress for a file that has been removed: ${a?.id}`);
        return;
      }
      this.setFileState(a.id, {
        progress: {
          ...this.getState().files[a.id].progress,
          postprocess: o
        }
      });
    }), this.on("postprocess-complete", (a) => {
      if (a == null || !this.getFile(a.id)) {
        this.log(`Not setting progress for a file that has been removed: ${a?.id}`);
        return;
      }
      const o = {
        ...this.getState().files
      };
      o[a.id] = {
        ...o[a.id],
        progress: {
          ...o[a.id].progress
        }
      }, delete o[a.id].progress.postprocess, this.setState({ files: o });
    }), this.on("restored", () => {
      this.#y();
    }), this.on("dashboard:file-edit-complete", (a) => {
      a && this.#l(a);
    }), typeof window < "u" && window.addEventListener && (window.addEventListener("online", this.#g), window.addEventListener("offline", this.#g), setTimeout(this.#g, 3e3));
  }
  updateOnlineStatus() {
    window.navigator.onLine ?? !0 ? (this.emit("is-online"), this.wasOffline && (this.emit("back-online"), this.info(this.i18n("connectedToInternet"), "success", 3e3), this.wasOffline = !1)) : (this.emit("is-offline"), this.info(this.i18n("noInternetConnection"), "error", 0), this.wasOffline = !0);
  }
  #g = this.updateOnlineStatus.bind(this);
  getID() {
    return this.opts.id;
  }
  /**
   * Registers a plugin with Core.
   */
  use(e, ...t) {
    if (typeof e != "function") {
      const s = `Expected a plugin class, but got ${e === null ? "null" : typeof e}. Please verify that the plugin was imported and spelled correctly.`;
      throw new TypeError(s);
    }
    const r = new e(this, ...t), a = r.id;
    if (!a)
      throw new Error("Your plugin must have an id");
    if (!r.type)
      throw new Error("Your plugin must have a type");
    const o = this.getPlugin(a);
    if (o) {
      const s = `Already found a plugin named '${o.id}'. Tried to use: '${a}'.
Uppy plugins must have unique \`id\` options.`;
      throw new Error(s);
    }
    return e.VERSION && this.log(`Using ${a} v${e.VERSION}`), r.type in this.#e ? this.#e[r.type].push(r) : this.#e[r.type] = [r], r.install(), this.emit("plugin-added", r), this;
  }
  /**
   * Find one Plugin by name.
   */
  getPlugin(e) {
    for (const t of Object.values(this.#e)) {
      const r = t.find((a) => a.id === e);
      if (r != null)
        return r;
    }
  }
  [Symbol.for("uppy test: getPlugins")](e) {
    return this.#e[e];
  }
  /**
   * Iterate through all `use`d plugins.
   *
   */
  iteratePlugins(e) {
    Object.values(this.#e).flat(1).forEach(e);
  }
  /**
   * Uninstall and remove a plugin.
   *
   * @param {object} instance The plugin instance to remove.
   */
  removePlugin(e) {
    this.log(`Removing plugin ${e.id}`), this.emit("plugin-remove", e), e.uninstall && e.uninstall();
    const t = this.#e[e.type], r = t.findIndex((s) => s.id === e.id);
    r !== -1 && t.splice(r, 1);
    const o = {
      plugins: {
        ...this.getState().plugins,
        [e.id]: void 0
      }
    };
    this.setState(o);
  }
  /**
   * Uninstall all plugins and close down this Uppy instance.
   */
  destroy() {
    this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`), this.cancelAll(), this.#r(), this.iteratePlugins((e) => {
      this.removePlugin(e);
    }), typeof window < "u" && window.removeEventListener && (window.removeEventListener("online", this.#g), window.removeEventListener("offline", this.#g));
  }
  hideInfo() {
    const { info: e } = this.getState();
    this.setState({ info: e.slice(1) }), this.emit("info-hidden");
  }
  /**
   * Set info message in `state.info`, so that UI plugins like `Informer`
   * can display the message.
   */
  info(e, t = "info", r = 3e3) {
    const a = typeof e == "object";
    this.setState({
      info: [
        ...this.getState().info,
        {
          type: t,
          message: a ? e.message : e,
          details: a ? e.details : null
        }
      ]
    }), setTimeout(() => this.hideInfo(), r), this.emit("info-visible");
  }
  /**
   * Passes messages to a function, provided in `opts.logger`.
   * If `opts.logger: Uppy.debugLogger` or `opts.debug: true`, logs to the browser console.
   */
  log(e, t) {
    const { logger: r } = this.opts;
    switch (t) {
      case "error":
        r.error(e);
        break;
      case "warning":
        r.warn(e);
        break;
      default:
        r.debug(e);
        break;
    }
  }
  // We need to store request clients by a unique ID, so we can share RequestClient instances across files
  // this allows us to do rate limiting and synchronous operations like refreshing provider tokens
  // example: refreshing tokens: if each file has their own requestclient,
  // we don't have any way to synchronize all requests in order to
  // - block all requests
  // - refresh the token
  // - unblock all requests and allow them to run with a the new access token
  // back when we had a requestclient per file, once an access token expired,
  // all 6 files would go ahead and refresh the token at the same time
  // (calling /refresh-token up to 6 times), which will probably fail for some providers
  #D = /* @__PURE__ */ new Map();
  registerRequestClient(e, t) {
    this.#D.set(e, t);
  }
  /** @protected */
  getRequestClientForFile(e) {
    if (!e.remote)
      throw new Error(`Tried to get RequestClient for a non-remote file ${e.id}`);
    const t = this.#D.get(e.remote.requestClientId);
    if (t == null)
      throw new Error(`requestClientId "${e.remote.requestClientId}" not registered for file "${e.id}"`);
    return t;
  }
  /**
   * Restore an upload by its ID.
   */
  restore(e) {
    return this.log(`Core: attempting to restore upload "${e}"`), this.getState().currentUploads[e] ? this.#v(e) : (this.#x(e), Promise.reject(new Error("Nonexistent upload")));
  }
  /**
   * Create an upload for a bunch of files.
   *
   */
  #b(e, t = {}) {
    const { forceAllowNewUpload: r = !1 } = t, { allowNewUpload: a, currentUploads: o } = this.getState();
    if (!a && !r)
      throw new Error("Cannot create a new upload: already uploading.");
    const s = Zi();
    return this.emit("upload", s, this.getFilesByIds(e)), this.setState({
      allowNewUpload: this.opts.allowMultipleUploadBatches !== !1 && this.opts.allowMultipleUploads !== !1,
      currentUploads: {
        ...o,
        [s]: {
          fileIDs: e,
          step: 0,
          result: {}
        }
      }
    }), s;
  }
  [Symbol.for("uppy test: createUpload")](...e) {
    return this.#b(...e);
  }
  #P(e) {
    const { currentUploads: t } = this.getState();
    return t[e];
  }
  /**
   * Add data to an upload's result object.
   */
  addResultData(e, t) {
    if (!this.#P(e)) {
      this.log(`Not setting result for an upload that has been removed: ${e}`);
      return;
    }
    const { currentUploads: r } = this.getState(), a = {
      ...r[e],
      result: { ...r[e].result, ...t }
    };
    this.setState({
      currentUploads: { ...r, [e]: a }
    });
  }
  /**
   * Remove an upload, eg. if it has been canceled or completed.
   *
   */
  #x(e) {
    const t = { ...this.getState().currentUploads };
    delete t[e], this.setState({
      currentUploads: t
    });
  }
  /**
   * Run an upload. This picks up where it left off in case the upload is being restored.
   */
  async #v(e) {
    const t = () => {
      const { currentUploads: s } = this.getState();
      return s[e];
    };
    let r = t();
    const a = [
      ...this.#a,
      ...this.#s,
      ...this.#n
    ];
    try {
      for (let s = r.step || 0; s < a.length && r; s++) {
        const n = a[s];
        this.setState({
          currentUploads: {
            ...this.getState().currentUploads,
            [e]: {
              ...r,
              step: s
            }
          }
        });
        const { fileIDs: p } = r;
        await n(p, e), r = t();
      }
    } catch (s) {
      throw this.#x(e), s;
    }
    if (r) {
      r.fileIDs.forEach((l) => {
        const c = this.getFile(l);
        c?.progress.postprocess && this.emit("postprocess-complete", c);
      });
      const s = r.fileIDs.map((l) => this.getFile(l)), n = s.filter((l) => !l.error), p = s.filter((l) => l.error);
      this.addResultData(e, { successful: n, failed: p, uploadID: e }), r = t();
    }
    let o;
    return r && (o = r.result, this.#x(e)), o == null && (this.log(`Not setting result for an upload that has been removed: ${e}`), o = {
      successful: [],
      failed: [],
      uploadID: e
    }), o;
  }
  /**
   * Start an upload for all the files that are not currently being uploaded.
   */
  async upload() {
    this.#e.uploader?.length || this.log("No uploader type plugins are used", "warning");
    let { files: e } = this.getState();
    if (this.#f().length > 0) {
      const a = await this.#m();
      if (!(this.getFiles().filter((s) => s.progress.uploadStarted == null).length > 0))
        return this.emit("complete", a), a;
      ({ files: e } = this.getState());
    }
    const r = this.opts.onBeforeUpload(e);
    return r === !1 ? Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false")) : (r && typeof r == "object" && (e = r, this.setState({
      files: e
    })), Promise.resolve().then(() => this.#t.validateMinNumberOfFiles(e)).catch((a) => {
      throw this.#o([a]), a;
    }).then(() => {
      if (!this.#h(e))
        throw new J(this.i18n("missingRequiredMetaField"));
    }).catch((a) => {
      throw a;
    }).then(async () => {
      const { currentUploads: a } = this.getState(), o = Object.values(a).flatMap((l) => l.fileIDs), s = [];
      Object.keys(e).forEach((l) => {
        const c = this.getFile(l);
        !c.progress.uploadStarted && o.indexOf(l) === -1 && s.push(c.id);
      });
      const n = this.#b(s), p = await this.#v(n);
      return this.emit("complete", p), p;
    }).catch((a) => {
      throw this.emit("error", a), this.log(a, "error"), a;
    }));
  }
}
var ml = 0;
function u(i, e, t, r, a, o) {
  e || (e = {});
  var s, n, p = e;
  if ("ref" in p) for (n in p = {}, e) n == "ref" ? s = e[n] : p[n] = e[n];
  var l = { type: i, props: p, key: t, ref: s, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: --ml, __i: -1, __u: 0, __source: a, __self: o };
  if (typeof i == "function" && (s = i.defaultProps)) for (n in s) p[n] === void 0 && (p[n] = s[n]);
  return P.vnode && P.vnode(l), l;
}
const gl = "@uppy/informer", yl = "A notification and error pop-up bar for Uppy.", bl = "4.3.2", vl = "MIT", wl = "lib/index.js", xl = "dist/style.min.css", _l = "module", Dl = { build: "tsc --build tsconfig.build.json", "build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css", typecheck: "tsc --build" }, kl = ["file uploader", "uppy", "uppy-plugin", "notification", "bar", "ui"], Sl = "https://uppy.io", Pl = { url: "https://github.com/transloadit/uppy/issues" }, Cl = { type: "git", url: "git+https://github.com/transloadit/uppy.git" }, Bl = ["src", "lib", "dist", "CHANGELOG.md"], Il = { "@uppy/utils": "^6.2.2", preact: "^10.5.13" }, Fl = { "@uppy/core": "^4.5.2" }, Tl = { cssnano: "^7.0.7", postcss: "^8.5.6", "postcss-cli": "^11.0.1", sass: "^1.89.2", typescript: "^5.8.3" }, El = {
  name: gl,
  description: yl,
  version: bl,
  license: vl,
  main: wl,
  style: xl,
  type: _l,
  scripts: Dl,
  keywords: kl,
  homepage: Sl,
  bugs: Pl,
  repository: Cl,
  files: Bl,
  dependencies: Il,
  peerDependencies: Fl,
  devDependencies: Tl
}, la = 300;
class Al extends X {
  ref = Ms();
  componentWillEnter(e) {
    this.ref.current.style.opacity = "1", this.ref.current.style.transform = "none", setTimeout(e, la);
  }
  componentWillLeave(e) {
    this.ref.current.style.opacity = "0", this.ref.current.style.transform = "translateY(350%)", setTimeout(e, la);
  }
  render() {
    const { children: e } = this.props;
    return u("div", { className: "uppy-Informer-animated", ref: this.ref, children: e });
  }
}
function Ol(i, e) {
  return Object.assign(i, e);
}
function Ml(i, e) {
  return i?.key ?? e;
}
function zl(i, e) {
  const t = i._ptgLinkedRefs || (i._ptgLinkedRefs = {});
  return t[e] || // biome-ignore lint/suspicious/noAssignInExpressions: ...
  (t[e] = (r) => {
    i.refs[e] = r;
  });
}
function qe(i) {
  const e = {};
  for (let t = 0; t < i.length; t++)
    if (i[t] != null) {
      const r = Ml(i[t], t.toString(36));
      e[r] = i[t];
    }
  return e;
}
function Rl(i, e) {
  i = i || {}, e = e || {};
  const t = (s) => Object.hasOwn(e, s) ? e[s] : i[s], r = {};
  let a = [];
  for (const s in i)
    Object.hasOwn(e, s) ? a.length && (r[s] = a, a = []) : a.push(s);
  const o = {};
  for (const s in e) {
    if (Object.hasOwn(r, s))
      for (let n = 0; n < r[s].length; n++) {
        const p = r[s][n];
        o[r[s][n]] = t(p);
      }
    o[s] = t(s);
  }
  for (let s = 0; s < a.length; s++)
    o[a[s]] = t(a[s]);
  return o;
}
const Nl = (i) => i;
class Oo extends X {
  constructor(e, t) {
    super(e, t), this.refs = {}, this.state = {
      children: qe(te(te(this.props.children)) || [])
    }, this.performAppear = this.performAppear.bind(this), this.performEnter = this.performEnter.bind(this), this.performLeave = this.performLeave.bind(this);
  }
  componentWillMount() {
    this.currentlyTransitioningKeys = {}, this.keysToAbortLeave = [], this.keysToEnter = [], this.keysToLeave = [];
  }
  componentDidMount() {
    const e = this.state.children;
    for (const t in e)
      e[t] && this.performAppear(t);
  }
  componentWillReceiveProps(e) {
    const t = qe(te(e.children) || []), r = this.state.children;
    this.setState((o) => ({
      children: Rl(o.children, t)
    }));
    let a;
    for (a in t)
      if (Object.hasOwn(t, a)) {
        const o = r && Object.hasOwn(r, a);
        t[a] && o && this.currentlyTransitioningKeys[a] ? (this.keysToEnter.push(a), this.keysToAbortLeave.push(a)) : t[a] && !o && !this.currentlyTransitioningKeys[a] && this.keysToEnter.push(a);
      }
    for (a in r)
      if (Object.hasOwn(r, a)) {
        const o = t && Object.hasOwn(t, a);
        r[a] && !o && !this.currentlyTransitioningKeys[a] && this.keysToLeave.push(a);
      }
  }
  componentDidUpdate() {
    const { keysToEnter: e } = this;
    this.keysToEnter = [], e.forEach(this.performEnter);
    const { keysToLeave: t } = this;
    this.keysToLeave = [], t.forEach(this.performLeave);
  }
  _finishAbort(e) {
    const t = this.keysToAbortLeave.indexOf(e);
    t !== -1 && this.keysToAbortLeave.splice(t, 1);
  }
  performAppear(e) {
    this.currentlyTransitioningKeys[e] = !0;
    const t = this.refs[e];
    t?.componentWillAppear ? t.componentWillAppear(this._handleDoneAppearing.bind(this, e)) : this._handleDoneAppearing(e);
  }
  _handleDoneAppearing(e) {
    const t = this.refs[e];
    t?.componentDidAppear && t.componentDidAppear(), delete this.currentlyTransitioningKeys[e], this._finishAbort(e);
    const r = qe(te(this.props.children) || []);
    (!r || !Object.hasOwn(r, e)) && this.performLeave(e);
  }
  performEnter(e) {
    this.currentlyTransitioningKeys[e] = !0;
    const t = this.refs[e];
    t?.componentWillEnter ? t.componentWillEnter(this._handleDoneEntering.bind(this, e)) : this._handleDoneEntering(e);
  }
  _handleDoneEntering(e) {
    const t = this.refs[e];
    t?.componentDidEnter && t.componentDidEnter(), delete this.currentlyTransitioningKeys[e], this._finishAbort(e);
    const r = qe(te(this.props.children) || []);
    (!r || !Object.hasOwn(r, e)) && this.performLeave(e);
  }
  performLeave(e) {
    if (this.keysToAbortLeave.indexOf(e) !== -1)
      return;
    this.currentlyTransitioningKeys[e] = !0;
    const r = this.refs[e];
    r?.componentWillLeave ? r.componentWillLeave(this._handleDoneLeaving.bind(this, e)) : this._handleDoneLeaving(e);
  }
  _handleDoneLeaving(e) {
    if (this.keysToAbortLeave.indexOf(e) !== -1)
      return;
    const r = this.refs[e];
    r?.componentDidLeave && r.componentDidLeave(), delete this.currentlyTransitioningKeys[e];
    const a = qe(te(this.props.children) || []);
    if (a && Object.hasOwn(a, e))
      this.performEnter(e);
    else {
      const o = Ol({}, this.state.children);
      delete o[e], this.setState({ children: o });
    }
  }
  render({ childFactory: e, transitionLeave: t, transitionName: r, transitionAppear: a, transitionEnter: o, transitionLeaveTimeout: s, transitionEnterTimeout: n, transitionAppearTimeout: p, component: l, ...c }, { children: d }) {
    const h = Object.entries(d).map(([m, f]) => {
      if (!f)
        return;
      const y = zl(this, m);
      return Do(e(f), { ref: y, key: m });
    }).filter(Boolean);
    return rt(l, c, h);
  }
}
Oo.defaultProps = {
  component: "span",
  childFactory: Nl
};
class Ul extends ve {
  static VERSION = El.version;
  constructor(e, t) {
    super(e, t), this.type = "progressindicator", this.id = this.opts.id || "Informer", this.title = "Informer";
  }
  render = (e) => u("div", { className: "uppy uppy-Informer", children: u(Oo, { children: e.info.map((t) => u(Al, { children: u("p", { role: "alert", children: [t.message, " ", t.details && // biome-ignore lint/a11y/useKeyWithClickEvents: ...
  u("span", { "aria-label": t.details, "data-microtip-position": "top-left", "data-microtip-size": "medium", role: "tooltip", onClick: () => alert(`${t.message} 

 ${t.details}`), children: "?" })] }) }, t.message)) }) });
  install() {
    const { target: e } = this.opts;
    e && this.mount(e, this);
  }
}
var pi = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var pa;
function $l() {
  return pa || (pa = 1, function(i) {
    (function() {
      var e = {}.hasOwnProperty;
      function t() {
        for (var o = "", s = 0; s < arguments.length; s++) {
          var n = arguments[s];
          n && (o = a(o, r(n)));
        }
        return o;
      }
      function r(o) {
        if (typeof o == "string" || typeof o == "number")
          return o;
        if (typeof o != "object")
          return "";
        if (Array.isArray(o))
          return t.apply(null, o);
        if (o.toString !== Object.prototype.toString && !o.toString.toString().includes("[native code]"))
          return o.toString();
        var s = "";
        for (var n in o)
          e.call(o, n) && o[n] && (s = a(s, n));
        return s;
      }
      function a(o, s) {
        return s ? o ? o + " " + s : o + s : o;
      }
      i.exports ? (t.default = t, i.exports = t) : window.classNames = t;
    })();
  }(pi)), pi.exports;
}
var Ll = $l();
const ae = /* @__PURE__ */ $e(Ll), Hl = {
  position: "relative",
  // Disabled for our use case: the wrapper elements around FileList already deal with overflow,
  // and this additional property would hide things that we want to show.
  //
  // overflow: 'hidden',
  width: "100%",
  minHeight: "100%"
}, jl = {
  position: "absolute",
  top: 0,
  left: 0,
  // Because the `top` value gets set to some offset, this `height` being 100% would make the scrollbar
  // stretch far beyond the content. For our use case, the content div actually can get its height from
  // the elements inside it, so we don't need to specify a `height` property at all.
  //
  // height: '100%',
  width: "100%",
  overflow: "visible"
};
class ql extends X {
  constructor(e) {
    super(e), this.focusElement = null, this.state = {
      offset: 0,
      height: 0
    };
  }
  componentDidMount() {
    this.resize(), window.addEventListener("resize", this.handleResize);
  }
  // TODO: refactor to stable lifecycle method
  componentWillUpdate() {
    this.base.contains(document.activeElement) && (this.focusElement = document.activeElement);
  }
  componentDidUpdate() {
    this.focusElement?.parentNode && document.activeElement !== this.focusElement && this.focusElement.focus(), this.focusElement = null, this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  handleScroll = () => {
    this.setState({ offset: this.base.scrollTop });
  };
  handleResize = () => {
    this.resize();
  };
  resize() {
    const { height: e } = this.state;
    e !== this.base.offsetHeight && this.setState({
      height: this.base.offsetHeight
    });
  }
  render({ data: e, rowHeight: t, renderRow: r, overscanCount: a = 10, ...o }) {
    const { offset: s, height: n } = this.state;
    let p = Math.floor(s / t), l = Math.floor(n / t);
    a && (p = Math.max(0, p - p % a), l += a);
    const c = p + l + 4, d = e.slice(p, c), h = { ...Hl, height: e.length * t }, m = { ...jl, top: p * t };
    return u("div", { onScroll: this.handleScroll, ...o, children: u("div", { role: "presentation", style: h, children: u("div", { role: "presentation", style: m, children: d.map(r) }) }) });
  }
}
function Wl() {
  return u("svg", { "aria-hidden": "true", focusable: "false", width: "30", height: "30", viewBox: "0 0 30 30", children: u("path", { d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z" }) });
}
function da(i, e, t, r) {
  return i === e ? i : r === 0 ? e : i + (e - i) * 2 ** (-r / t);
}
const Vl = "@uppy/status-bar", Gl = "A progress bar for Uppy, with many bells and whistles.", Xl = "4.2.3", Yl = "MIT", Kl = "lib/index.js", Zl = "dist/style.min.css", Ql = "module", Jl = { build: "tsc --build tsconfig.build.json", "build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css", typecheck: "tsc --build" }, ep = ["file uploader", "uppy", "uppy-plugin", "progress bar", "status bar", "progress", "upload", "eta", "speed"], tp = "https://uppy.io", ip = { url: "https://github.com/transloadit/uppy/issues" }, rp = { type: "git", url: "git+https://github.com/transloadit/uppy.git" }, ap = ["src", "lib", "dist", "CHANGELOG.md"], op = { "@transloadit/prettier-bytes": "^0.3.4", "@uppy/utils": "^6.2.2", classnames: "^2.2.6", preact: "^10.5.13" }, sp = { "@uppy/core": "^4.5.2" }, np = { cssnano: "^7.0.7", postcss: "^8.5.6", "postcss-cli": "^11.0.1", sass: "^1.89.2", typescript: "^5.8.3" }, lp = {
  name: Vl,
  description: Gl,
  version: Xl,
  license: Yl,
  main: Kl,
  style: Zl,
  type: Ql,
  scripts: Jl,
  keywords: ep,
  homepage: tp,
  bugs: ip,
  repository: rp,
  files: ap,
  dependencies: op,
  peerDependencies: sp,
  devDependencies: np
}, pp = {
  strings: {
    // Shown in the status bar while files are being uploaded.
    uploading: "Uploading",
    // Shown in the status bar once all files have been uploaded.
    complete: "Complete",
    // Shown in the status bar if an upload failed.
    uploadFailed: "Upload failed",
    // Shown in the status bar while the upload is paused.
    paused: "Paused",
    // Used as the label for the button that retries an upload.
    retry: "Retry",
    // Used as the label for the button that cancels an upload.
    cancel: "Cancel",
    // Used as the label for the button that pauses an upload.
    pause: "Pause",
    // Used as the label for the button that resumes an upload.
    resume: "Resume",
    // Used as the label for the button that resets the upload state after an upload
    done: "Done",
    // When `showProgressDetails` is set, shows the number of files that have been fully uploaded so far.
    filesUploadedOfTotal: {
      0: "%{complete} of %{smart_count} file uploaded",
      1: "%{complete} of %{smart_count} files uploaded"
    },
    // When `showProgressDetails` is set, shows the amount of bytes that have been uploaded so far.
    dataUploadedOfTotal: "%{complete} of %{total}",
    dataUploadedOfUnknown: "%{complete} of unknown",
    // When `showProgressDetails` is set, shows an estimation of how long the upload will take to complete.
    xTimeLeft: "%{time} left",
    // Used as the label for the button that starts an upload.
    uploadXFiles: {
      0: "Upload %{smart_count} file",
      1: "Upload %{smart_count} files"
    },
    // Used as the label for the button that starts an upload, if another upload has been started in the past
    // and new files were added later.
    uploadXNewFiles: {
      0: "Upload +%{smart_count} file",
      1: "Upload +%{smart_count} files"
    },
    upload: "Upload",
    retryUpload: "Retry upload",
    xMoreFilesAdded: {
      0: "%{smart_count} more file added",
      1: "%{smart_count} more files added"
    },
    showErrorDetails: "Show error details"
  }
}, ne = {
  STATE_ERROR: "error",
  STATE_WAITING: "waiting",
  STATE_PREPROCESSING: "preprocessing",
  STATE_UPLOADING: "uploading",
  STATE_POSTPROCESSING: "postprocessing",
  STATE_COMPLETE: "complete"
};
function dp(i) {
  const e = Math.floor(i / 3600) % 24, t = Math.floor(i / 60) % 60, r = Math.floor(i % 60);
  return { hours: e, minutes: t, seconds: r };
}
function up(i) {
  const e = dp(i), t = e.hours === 0 ? "" : `${e.hours}h`, r = e.minutes === 0 ? "" : `${e.hours === 0 ? e.minutes : ` ${e.minutes.toString(10).padStart(2, "0")}`}m`, a = e.hours !== 0 ? "" : `${e.minutes === 0 ? e.seconds : ` ${e.seconds.toString(10).padStart(2, "0")}`}s`;
  return `${t}${r}${a}`;
}
const cp = "·", ua = () => ` ${cp} `;
function hp(i) {
  const { newFiles: e, isUploadStarted: t, recoveredState: r, i18n: a, uploadState: o, isSomeGhost: s, startUpload: n } = i, p = ae("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
    "uppy-c-btn-primary": o === ne.STATE_WAITING
  }, { "uppy-StatusBar-actionBtn--disabled": s }), l = e && t && !r ? a("uploadXNewFiles", { smart_count: e }) : a("uploadXFiles", { smart_count: e });
  return u("button", { type: "button", className: p, "aria-label": a("uploadXFiles", { smart_count: e }), onClick: n, disabled: s, "data-uppy-super-focusable": !0, children: l });
}
function fp(i) {
  const { i18n: e, uppy: t } = i;
  return u("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry", "aria-label": e("retryUpload"), onClick: () => t.retryAll().catch(() => {
  }), "data-uppy-super-focusable": !0, "data-cy": "retry", children: [u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "8", height: "10", viewBox: "0 0 8 10", children: u("path", { d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z" }) }), e("retry")] });
}
function mp(i) {
  const { i18n: e, uppy: t } = i;
  return u("button", { type: "button", className: "uppy-u-reset uppy-StatusBar-actionCircleBtn", title: e("cancel"), "aria-label": e("cancel"), onClick: () => t.cancelAll(), "data-cy": "cancel", "data-uppy-super-focusable": !0, children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "16", height: "16", viewBox: "0 0 16 16", children: u("g", { fill: "none", fillRule: "evenodd", children: [u("circle", { fill: "#888", cx: "8", cy: "8", r: "8" }), u("path", { fill: "#FFF", d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z" })] }) }) });
}
function gp(i) {
  const { isAllPaused: e, i18n: t, isAllComplete: r, resumableUploads: a, uppy: o } = i, s = t(e ? "resume" : "pause");
  function n() {
    if (!r) {
      if (!a) {
        o.cancelAll();
        return;
      }
      if (e) {
        o.resumeAll();
        return;
      }
      o.pauseAll();
    }
  }
  return u("button", { title: s, "aria-label": s, className: "uppy-u-reset uppy-StatusBar-actionCircleBtn", type: "button", onClick: n, "data-cy": "togglePauseResume", "data-uppy-super-focusable": !0, children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "16", height: "16", viewBox: "0 0 16 16", children: u("g", { fill: "none", fillRule: "evenodd", children: [u("circle", { fill: "#888", cx: "8", cy: "8", r: "8" }), u("path", { fill: "#FFF", d: e ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z" })] }) }) });
}
function yp(i) {
  const { i18n: e, doneButtonHandler: t } = i;
  return u("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done", onClick: t, "data-uppy-super-focusable": !0, children: e("done") });
}
function Mo() {
  return u("svg", { className: "uppy-StatusBar-spinner", "aria-hidden": "true", focusable: "false", width: "14", height: "14", children: u("path", { d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0", fillRule: "evenodd" }) });
}
function bp(i) {
  const { progress: e } = i, { value: t, mode: r, message: a } = e;
  return u("div", { className: "uppy-StatusBar-content", children: [u(Mo, {}), r === "determinate" ? `${Math.round(t * 100)}% · ` : "", a] });
}
function vp(i) {
  const { numUploads: e, complete: t, totalUploadedSize: r, totalSize: a, totalETA: o, i18n: s } = i, n = e > 1, p = ce(r);
  return u("div", { className: "uppy-StatusBar-statusSecondary", children: [n && s("filesUploadedOfTotal", {
    complete: t,
    smart_count: e
  }), u("span", { className: "uppy-StatusBar-additionalInfo", children: [n && ua(), a != null ? s("dataUploadedOfTotal", {
    complete: p,
    total: ce(a)
  }) : s("dataUploadedOfUnknown", { complete: p }), ua(), o != null && s("xTimeLeft", {
    time: up(o)
  })] })] });
}
function zo(i) {
  const { i18n: e, complete: t, numUploads: r } = i;
  return u("div", { className: "uppy-StatusBar-statusSecondary", children: e("filesUploadedOfTotal", { complete: t, smart_count: r }) });
}
function wp(i) {
  const { i18n: e, newFiles: t, startUpload: r } = i, a = ae("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
  return u("div", { className: "uppy-StatusBar-statusSecondary", children: [u("div", { className: "uppy-StatusBar-statusSecondaryHint", children: e("xMoreFilesAdded", { smart_count: t }) }), u("button", { type: "button", className: a, "aria-label": e("uploadXFiles", { smart_count: t }), onClick: r, children: e("upload") })] });
}
function xp(i) {
  const { i18n: e, supportsUploadProgress: t, totalProgress: r, showProgressDetails: a, isUploadStarted: o, isAllComplete: s, isAllPaused: n, newFiles: p, numUploads: l, complete: c, totalUploadedSize: d, totalSize: h, totalETA: m, startUpload: f } = i, y = p && o;
  if (!o || s)
    return null;
  const b = e(n ? "paused" : "uploading");
  function w() {
    return !n && !y && a ? t ? u(vp, { numUploads: l, complete: c, totalUploadedSize: d, totalSize: h, totalETA: m, i18n: e }) : u(zo, { i18n: e, complete: c, numUploads: l }) : null;
  }
  return u("div", { className: "uppy-StatusBar-content", title: b, children: [n ? null : u(Mo, {}), u("div", { className: "uppy-StatusBar-status", children: [u("div", { className: "uppy-StatusBar-statusPrimary", children: t && r !== 0 ? `${b}: ${r}%` : b }), w(), y ? u(wp, { i18n: e, newFiles: p, startUpload: f }) : null] })] });
}
function _p(i) {
  const { i18n: e } = i;
  return u("div", {
    className: "uppy-StatusBar-content",
    // biome-ignore lint/a11y/useSemanticElements: ...
    role: "status",
    title: e("complete"),
    children: u("div", { className: "uppy-StatusBar-status", children: u("div", { className: "uppy-StatusBar-statusPrimary", children: [u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-StatusBar-statusIndicator uppy-c-icon", width: "15", height: "11", viewBox: "0 0 15 11", children: u("path", { d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z" }) }), e("complete")] }) })
  });
}
function Dp(i) {
  const { error: e, i18n: t, complete: r, numUploads: a } = i;
  function o() {
    const s = `${t("uploadFailed")} 

 ${e}`;
    alert(s);
  }
  return u("div", { className: "uppy-StatusBar-content", title: t("uploadFailed"), children: [u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-StatusBar-statusIndicator uppy-c-icon", width: "11", height: "11", viewBox: "0 0 11 11", children: u("path", { d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z" }) }), u("div", { className: "uppy-StatusBar-status", children: [u("div", { className: "uppy-StatusBar-statusPrimary", children: [t("uploadFailed"), u("button", { className: "uppy-u-reset uppy-StatusBar-details", "aria-label": t("showErrorDetails"), "data-microtip-position": "top-right", "data-microtip-size": "medium", onClick: o, type: "button", children: "?" })] }), u(zo, { i18n: t, complete: r, numUploads: a })] })] });
}
function di(i) {
  const e = [];
  let t = "indeterminate", r;
  for (const { progress: o } of Object.values(i)) {
    const { preprocess: s, postprocess: n } = o;
    r == null && (s || n) && ({ mode: t, message: r } = s || n), s?.mode === "determinate" && e.push(s.value), n?.mode === "determinate" && e.push(n.value);
  }
  const a = e.reduce((o, s) => o + s / e.length, 0);
  return {
    mode: t,
    message: r,
    value: a
  };
}
const { STATE_ERROR: ca, STATE_WAITING: kp, STATE_PREPROCESSING: ui, STATE_UPLOADING: yt, STATE_POSTPROCESSING: ci, STATE_COMPLETE: bt } = ne;
function Sp({ newFiles: i, allowNewUpload: e, isUploadInProgress: t, isAllPaused: r, resumableUploads: a, error: o, hideUploadButton: s = void 0, hidePauseResumeButton: n = !1, hideCancelButton: p = !1, hideRetryButton: l = !1, recoveredState: c, uploadState: d, totalProgress: h, files: m, supportsUploadProgress: f, hideAfterFinish: y = !1, isSomeGhost: b, doneButtonHandler: w = void 0, isUploadStarted: x, i18n: _, startUpload: C, uppy: B, isAllComplete: g, showProgressDetails: D = void 0, numUploads: k, complete: S, totalSize: O, totalETA: T, totalUploadedSize: M }) {
  function F() {
    switch (d) {
      case ci:
      case ui: {
        const ke = di(m);
        return ke.mode === "determinate" ? ke.value * 100 : h;
      }
      case ca:
        return null;
      case yt:
        return f ? h : null;
      default:
        return h;
    }
  }
  function z() {
    switch (d) {
      case ci:
      case ui: {
        const { mode: ke } = di(m);
        return ke === "indeterminate";
      }
      case yt:
        return !f;
      default:
        return !1;
    }
  }
  const A = F(), V = A ?? 100, oe = !o && i && (!t && !r || c) && e && !s, ue = !p && d !== kp && d !== bt, he = a && !n && d === yt, xe = o && !g && !l, _e = w && d === bt, Fe = ae("uppy-StatusBar-progress", {
    "is-indeterminate": z()
  }), fe = ae("uppy-StatusBar", `is-${d}`, { "has-ghosts": b }), De = (() => {
    switch (d) {
      case ui:
      case ci:
        return u(bp, { progress: di(m) });
      case bt:
        return u(_p, { i18n: _ });
      case ca:
        return u(Dp, { error: o, i18n: _, numUploads: k, complete: S });
      case yt:
        return u(xp, { i18n: _, supportsUploadProgress: f, totalProgress: h, showProgressDetails: D, isUploadStarted: x, isAllComplete: g, isAllPaused: r, newFiles: i, numUploads: k, complete: S, totalUploadedSize: M, totalSize: O, totalETA: T, startUpload: C });
      default:
        return null;
    }
  })();
  return !(oe || xe || he || ue || _e) && !De || d === bt && y ? null : u("div", { className: fe, children: [u("div", { className: Fe, style: { width: `${V}%` }, role: "progressbar", "aria-label": `${V}%`, "aria-valuetext": `${V}%`, "aria-valuemin": 0, "aria-valuemax": 100, "aria-valuenow": A }), De, u("div", { className: "uppy-StatusBar-actions", children: [oe ? u(hp, { newFiles: i, isUploadStarted: x, recoveredState: c, i18n: _, isSomeGhost: b, startUpload: C, uploadState: d }) : null, xe ? u(fp, { i18n: _, uppy: B }) : null, he ? u(gp, { isAllPaused: r, i18n: _, isAllComplete: g, resumableUploads: a, uppy: B }) : null, ue ? u(mp, { i18n: _, uppy: B }) : null, _e ? u(yp, { i18n: _, doneButtonHandler: w }) : null] })] });
}
const Pp = 2e3, Cp = 2e3;
function Bp(i, e, t, r) {
  if (i)
    return ne.STATE_ERROR;
  if (e)
    return ne.STATE_COMPLETE;
  if (t)
    return ne.STATE_WAITING;
  let a = ne.STATE_WAITING;
  const o = Object.keys(r);
  for (let s = 0; s < o.length; s++) {
    const { progress: n } = r[o[s]];
    if (n.uploadStarted && !n.uploadComplete)
      return ne.STATE_UPLOADING;
    n.preprocess && (a = ne.STATE_PREPROCESSING), n.postprocess && a !== ne.STATE_PREPROCESSING && (a = ne.STATE_POSTPROCESSING);
  }
  return a;
}
const Ip = {
  hideUploadButton: !1,
  hideRetryButton: !1,
  hidePauseResumeButton: !1,
  hideCancelButton: !1,
  showProgressDetails: !1,
  hideAfterFinish: !0,
  doneButtonHandler: null
};
class Fp extends ve {
  static VERSION = lp.version;
  #e;
  #t;
  #r;
  #i;
  constructor(e, t) {
    super(e, { ...Ip, ...t }), this.id = this.opts.id || "StatusBar", this.title = "StatusBar", this.type = "progressindicator", this.defaultLocale = pp, this.i18nInit(), this.render = this.render.bind(this), this.install = this.install.bind(this);
  }
  #a(e) {
    if (e.total == null || e.total === 0)
      return null;
    const t = e.total - e.uploaded;
    if (t <= 0)
      return null;
    this.#e ??= performance.now();
    const r = performance.now() - this.#e;
    if (r === 0)
      return Math.round((this.#i ?? 0) / 100) / 10;
    const a = e.uploaded - this.#t;
    if (this.#t = e.uploaded, a <= 0)
      return Math.round((this.#i ?? 0) / 100) / 10;
    const o = a / r, s = this.#r == null ? o : da(o, this.#r, Pp, r);
    this.#r = s;
    const n = t / s, p = Math.max(this.#i - r, 0), l = this.#i == null ? n : da(n, p, Cp, r);
    return this.#i = l, this.#e = performance.now(), Math.round(l / 100) / 10;
  }
  startUpload = () => this.uppy.upload().catch(() => {
  });
  render(e) {
    const { capabilities: t, files: r, allowNewUpload: a, totalProgress: o, error: s, recoveredState: n } = e, { newFiles: p, startedFiles: l, completeFiles: c, isUploadStarted: d, isAllComplete: h, isAllPaused: m, isUploadInProgress: f, isSomeGhost: y } = this.uppy.getObjectOfFilesPerState(), b = n ? Object.values(r) : p, w = !!t.resumableUploads, x = t.uploadProgress !== !1;
    let _ = null, C = 0;
    l.every((g) => g.progress.bytesTotal != null && g.progress.bytesTotal !== 0) ? (_ = 0, l.forEach((g) => {
      _ += g.progress.bytesTotal || 0, C += g.progress.bytesUploaded || 0;
    })) : l.forEach((g) => {
      C += g.progress.bytesUploaded || 0;
    });
    const B = this.#a({
      uploaded: C,
      total: _
    });
    return Sp({
      error: s,
      uploadState: Bp(s, h, n, e.files || {}),
      allowNewUpload: a,
      totalProgress: o,
      totalSize: _,
      totalUploadedSize: C,
      isAllComplete: !1,
      isAllPaused: m,
      isUploadStarted: d,
      isUploadInProgress: f,
      isSomeGhost: y,
      recoveredState: n,
      complete: c.length,
      newFiles: b.length,
      numUploads: l.length,
      totalETA: B,
      files: r,
      i18n: this.i18n,
      uppy: this.uppy,
      startUpload: this.startUpload,
      doneButtonHandler: this.opts.doneButtonHandler,
      resumableUploads: w,
      supportsUploadProgress: x,
      showProgressDetails: this.opts.showProgressDetails,
      hideUploadButton: this.opts.hideUploadButton,
      hideRetryButton: this.opts.hideRetryButton,
      hidePauseResumeButton: this.opts.hidePauseResumeButton,
      hideCancelButton: this.opts.hideCancelButton,
      hideAfterFinish: this.opts.hideAfterFinish
    });
  }
  onMount() {
    const e = this.el;
    uo(e) || (e.dir = "ltr");
  }
  #s = () => {
    const { recoveredState: e } = this.uppy.getState();
    if (this.#r = null, this.#i = null, e) {
      this.#t = Object.values(e.files).reduce((t, { progress: r }) => t + r.bytesUploaded, 0), this.uppy.emit("restore-confirmed");
      return;
    }
    this.#e = performance.now(), this.#t = 0;
  };
  install() {
    const { target: e } = this.opts;
    e && this.mount(e, this), this.uppy.on("upload", this.#s), this.#e = performance.now(), this.#t = this.uppy.getFiles().reduce((t, r) => t + r.progress.bytesUploaded, 0);
  }
  uninstall() {
    this.unmount(), this.uppy.off("upload", this.#s);
  }
}
const Tp = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
function Ep(i, e, t) {
  const r = Tp.exec(i), a = e.mimeType ?? r?.[1] ?? "plain/text";
  let o;
  if (r?.[2] != null) {
    const s = atob(decodeURIComponent(r[3])), n = new Uint8Array(s.length);
    for (let p = 0; p < s.length; p++)
      n[p] = s.charCodeAt(p);
    o = [n];
  } else r?.[3] != null && (o = [decodeURIComponent(r[3])]);
  return new Blob(o, { type: a });
}
function ha(i) {
  return i.startsWith("blob:");
}
function fa(i) {
  return i ? /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(i) : !1;
}
function E(i, e, t) {
  return e in i ? Object.defineProperty(i, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : i[e] = t, i;
}
var Ro = typeof self < "u" ? self : global;
const st = typeof navigator < "u", Ap = st && typeof HTMLImageElement > "u", ma = !(typeof global > "u" || typeof process > "u" || !process.versions || !process.versions.node), No = Ro.Buffer, Uo = !!No, Op = (i) => i !== void 0;
function $o(i) {
  return i === void 0 || (i instanceof Map ? i.size === 0 : Object.values(i).filter(Op).length === 0);
}
function W(i) {
  let e = new Error(i);
  throw delete e.stack, e;
}
function ga(i) {
  let e = function(t) {
    let r = 0;
    return t.ifd0.enabled && (r += 1024), t.exif.enabled && (r += 2048), t.makerNote && (r += 2048), t.userComment && (r += 1024), t.gps.enabled && (r += 512), t.interop.enabled && (r += 100), t.ifd1.enabled && (r += 1024), r + 2048;
  }(i);
  return i.jfif.enabled && (e += 50), i.xmp.enabled && (e += 2e4), i.iptc.enabled && (e += 14e3), i.icc.enabled && (e += 6e3), e;
}
const hi = (i) => String.fromCharCode.apply(null, i), ya = typeof TextDecoder < "u" ? new TextDecoder("utf-8") : void 0;
class ie {
  static from(e, t) {
    return e instanceof this && e.le === t ? e : new ie(e, void 0, void 0, t);
  }
  constructor(e, t = 0, r, a) {
    if (typeof a == "boolean" && (this.le = a), Array.isArray(e) && (e = new Uint8Array(e)), e === 0) this.byteOffset = 0, this.byteLength = 0;
    else if (e instanceof ArrayBuffer) {
      r === void 0 && (r = e.byteLength - t);
      let o = new DataView(e, t, r);
      this._swapDataView(o);
    } else if (e instanceof Uint8Array || e instanceof DataView || e instanceof ie) {
      r === void 0 && (r = e.byteLength - t), (t += e.byteOffset) + r > e.byteOffset + e.byteLength && W("Creating view outside of available memory in ArrayBuffer");
      let o = new DataView(e.buffer, t, r);
      this._swapDataView(o);
    } else if (typeof e == "number") {
      let o = new DataView(new ArrayBuffer(e));
      this._swapDataView(o);
    } else W("Invalid input argument for BufferView: " + e);
  }
  _swapArrayBuffer(e) {
    this._swapDataView(new DataView(e));
  }
  _swapBuffer(e) {
    this._swapDataView(new DataView(e.buffer, e.byteOffset, e.byteLength));
  }
  _swapDataView(e) {
    this.dataView = e, this.buffer = e.buffer, this.byteOffset = e.byteOffset, this.byteLength = e.byteLength;
  }
  _lengthToEnd(e) {
    return this.byteLength - e;
  }
  set(e, t, r = ie) {
    return e instanceof DataView || e instanceof ie ? e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : e instanceof ArrayBuffer && (e = new Uint8Array(e)), e instanceof Uint8Array || W("BufferView.set(): Invalid data argument."), this.toUint8().set(e, t), new r(this, t, e.byteLength);
  }
  subarray(e, t) {
    return t = t || this._lengthToEnd(e), new ie(this, e, t);
  }
  toUint8() {
    return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
  }
  getUint8Array(e, t) {
    return new Uint8Array(this.buffer, this.byteOffset + e, t);
  }
  getString(e = 0, t = this.byteLength) {
    return a = this.getUint8Array(e, t), ya ? ya.decode(a) : Uo ? Buffer.from(a).toString("utf8") : decodeURIComponent(escape(hi(a)));
    var a;
  }
  getLatin1String(e = 0, t = this.byteLength) {
    let r = this.getUint8Array(e, t);
    return hi(r);
  }
  getUnicodeString(e = 0, t = this.byteLength) {
    const r = [];
    for (let a = 0; a < t && e + a < this.byteLength; a += 2) r.push(this.getUint16(e + a));
    return hi(r);
  }
  getInt8(e) {
    return this.dataView.getInt8(e);
  }
  getUint8(e) {
    return this.dataView.getUint8(e);
  }
  getInt16(e, t = this.le) {
    return this.dataView.getInt16(e, t);
  }
  getInt32(e, t = this.le) {
    return this.dataView.getInt32(e, t);
  }
  getUint16(e, t = this.le) {
    return this.dataView.getUint16(e, t);
  }
  getUint32(e, t = this.le) {
    return this.dataView.getUint32(e, t);
  }
  getFloat32(e, t = this.le) {
    return this.dataView.getFloat32(e, t);
  }
  getFloat64(e, t = this.le) {
    return this.dataView.getFloat64(e, t);
  }
  getFloat(e, t = this.le) {
    return this.dataView.getFloat32(e, t);
  }
  getDouble(e, t = this.le) {
    return this.dataView.getFloat64(e, t);
  }
  getUintBytes(e, t, r) {
    switch (t) {
      case 1:
        return this.getUint8(e, r);
      case 2:
        return this.getUint16(e, r);
      case 4:
        return this.getUint32(e, r);
      case 8:
        return this.getUint64 && this.getUint64(e, r);
    }
  }
  getUint(e, t, r) {
    switch (t) {
      case 8:
        return this.getUint8(e, r);
      case 16:
        return this.getUint16(e, r);
      case 32:
        return this.getUint32(e, r);
      case 64:
        return this.getUint64 && this.getUint64(e, r);
    }
  }
  toString(e) {
    return this.dataView.toString(e, this.constructor.name);
  }
  ensureChunk() {
  }
}
function Bi(i, e) {
  W(`${i} '${e}' was not loaded, try using full build of exifr.`);
}
class Ji extends Map {
  constructor(e) {
    super(), this.kind = e;
  }
  get(e, t) {
    return this.has(e) || Bi(this.kind, e), t && (e in t || function(r, a) {
      W(`Unknown ${r} '${a}'.`);
    }(this.kind, e), t[e].enabled || Bi(this.kind, e)), super.get(e);
  }
  keyList() {
    return Array.from(this.keys());
  }
}
var Lo = new Ji("file parser"), ee = new Ji("segment parser"), er = new Ji("file reader");
let Mp = Ro.fetch;
function ba(i, e) {
  return (t = i).startsWith("data:") || t.length > 1e4 ? Fi(i, e, "base64") : ma && i.includes("://") ? Ii(i, e, "url", va) : ma ? Fi(i, e, "fs") : st ? Ii(i, e, "url", va) : void W("Invalid input argument");
  var t;
}
async function Ii(i, e, t, r) {
  return er.has(t) ? Fi(i, e, t) : r ? async function(a, o) {
    let s = await o(a);
    return new ie(s);
  }(i, r) : void W(`Parser ${t} is not loaded`);
}
async function Fi(i, e, t) {
  let r = new (er.get(t))(i, e);
  return await r.read(), r;
}
const va = (i) => Mp(i).then((e) => e.arrayBuffer()), Ti = (i) => new Promise((e, t) => {
  let r = new FileReader();
  r.onloadend = () => e(r.result || new ArrayBuffer()), r.onerror = t, r.readAsArrayBuffer(i);
}), tr = /* @__PURE__ */ new Map(), zp = /* @__PURE__ */ new Map(), Rp = /* @__PURE__ */ new Map(), vt = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"], Ho = ["jfif", "xmp", "icc", "iptc", "ihdr"], Ei = ["tiff", ...Ho], j = ["ifd0", "ifd1", "exif", "gps", "interop"], wt = [...Ei, ...j], xt = ["makerNote", "userComment"], jo = ["translateKeys", "translateValues", "reviveValues", "multiSegment"], _t = [...jo, "sanitize", "mergeOutput", "silentErrors"];
class qo {
  get translate() {
    return this.translateKeys || this.translateValues || this.reviveValues;
  }
}
class We extends qo {
  get needed() {
    return this.enabled || this.deps.size > 0;
  }
  constructor(e, t, r, a) {
    if (super(), E(this, "enabled", !1), E(this, "skip", /* @__PURE__ */ new Set()), E(this, "pick", /* @__PURE__ */ new Set()), E(this, "deps", /* @__PURE__ */ new Set()), E(this, "translateKeys", !1), E(this, "translateValues", !1), E(this, "reviveValues", !1), this.key = e, this.enabled = t, this.parse = this.enabled, this.applyInheritables(a), this.canBeFiltered = j.includes(e), this.canBeFiltered && (this.dict = tr.get(e)), r !== void 0) if (Array.isArray(r)) this.parse = this.enabled = !0, this.canBeFiltered && r.length > 0 && this.translateTagSet(r, this.pick);
    else if (typeof r == "object") {
      if (this.enabled = !0, this.parse = r.parse !== !1, this.canBeFiltered) {
        let { pick: o, skip: s } = r;
        o && o.length > 0 && this.translateTagSet(o, this.pick), s && s.length > 0 && this.translateTagSet(s, this.skip);
      }
      this.applyInheritables(r);
    } else r === !0 || r === !1 ? this.parse = this.enabled = r : W(`Invalid options argument: ${r}`);
  }
  applyInheritables(e) {
    let t, r;
    for (t of jo) r = e[t], r !== void 0 && (this[t] = r);
  }
  translateTagSet(e, t) {
    if (this.dict) {
      let r, a, { tagKeys: o, tagValues: s } = this.dict;
      for (r of e) typeof r == "string" ? (a = s.indexOf(r), a === -1 && (a = o.indexOf(Number(r))), a !== -1 && t.add(Number(o[a]))) : t.add(r);
    } else for (let r of e) t.add(r);
  }
  finalizeFilters() {
    !this.enabled && this.deps.size > 0 ? (this.enabled = !0, Mt(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && Mt(this.pick, this.deps);
  }
}
var G = { jfif: !1, tiff: !0, xmp: !1, icc: !1, iptc: !1, ifd0: !0, ifd1: !1, exif: !0, gps: !0, interop: !1, ihdr: void 0, makerNote: !1, userComment: !1, multiSegment: !1, skip: [], pick: [], translateKeys: !0, translateValues: !0, reviveValues: !0, sanitize: !0, mergeOutput: !0, silentErrors: !0, chunked: !0, firstChunkSize: void 0, firstChunkSizeNode: 512, firstChunkSizeBrowser: 65536, chunkSize: 65536, chunkLimit: 5 }, wa = /* @__PURE__ */ new Map();
class ir extends qo {
  static useCached(e) {
    let t = wa.get(e);
    return t !== void 0 || (t = new this(e), wa.set(e, t)), t;
  }
  constructor(e) {
    super(), e === !0 ? this.setupFromTrue() : e === void 0 ? this.setupFromUndefined() : Array.isArray(e) ? this.setupFromArray(e) : typeof e == "object" ? this.setupFromObject(e) : W(`Invalid options argument ${e}`), this.firstChunkSize === void 0 && (this.firstChunkSize = st ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = !1), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
  }
  setupFromUndefined() {
    let e;
    for (e of vt) this[e] = G[e];
    for (e of _t) this[e] = G[e];
    for (e of xt) this[e] = G[e];
    for (e of wt) this[e] = new We(e, G[e], void 0, this);
  }
  setupFromTrue() {
    let e;
    for (e of vt) this[e] = G[e];
    for (e of _t) this[e] = G[e];
    for (e of xt) this[e] = !0;
    for (e of wt) this[e] = new We(e, !0, void 0, this);
  }
  setupFromArray(e) {
    let t;
    for (t of vt) this[t] = G[t];
    for (t of _t) this[t] = G[t];
    for (t of xt) this[t] = G[t];
    for (t of wt) this[t] = new We(t, !1, void 0, this);
    this.setupGlobalFilters(e, void 0, j);
  }
  setupFromObject(e) {
    let t;
    for (t of (j.ifd0 = j.ifd0 || j.image, j.ifd1 = j.ifd1 || j.thumbnail, Object.assign(this, e), vt)) this[t] = fi(e[t], G[t]);
    for (t of _t) this[t] = fi(e[t], G[t]);
    for (t of xt) this[t] = fi(e[t], G[t]);
    for (t of Ei) this[t] = new We(t, G[t], e[t], this);
    for (t of j) this[t] = new We(t, G[t], e[t], this.tiff);
    this.setupGlobalFilters(e.pick, e.skip, j, wt), e.tiff === !0 ? this.batchEnableWithBool(j, !0) : e.tiff === !1 ? this.batchEnableWithUserValue(j, e) : Array.isArray(e.tiff) ? this.setupGlobalFilters(e.tiff, void 0, j) : typeof e.tiff == "object" && this.setupGlobalFilters(e.tiff.pick, e.tiff.skip, j);
  }
  batchEnableWithBool(e, t) {
    for (let r of e) this[r].enabled = t;
  }
  batchEnableWithUserValue(e, t) {
    for (let r of e) {
      let a = t[r];
      this[r].enabled = a !== !1 && a !== void 0;
    }
  }
  setupGlobalFilters(e, t, r, a = r) {
    if (e && e.length) {
      for (let s of a) this[s].enabled = !1;
      let o = xa(e, r);
      for (let [s, n] of o) Mt(this[s].pick, n), this[s].enabled = !0;
    } else if (t && t.length) {
      let o = xa(t, r);
      for (let [s, n] of o) Mt(this[s].skip, n);
    }
  }
  filterNestedSegmentTags() {
    let { ifd0: e, exif: t, xmp: r, iptc: a, icc: o } = this;
    this.makerNote ? t.deps.add(37500) : t.skip.add(37500), this.userComment ? t.deps.add(37510) : t.skip.add(37510), r.enabled || e.skip.add(700), a.enabled || e.skip.add(33723), o.enabled || e.skip.add(34675);
  }
  traverseTiffDependencyTree() {
    let { ifd0: e, exif: t, gps: r, interop: a } = this;
    a.needed && (t.deps.add(40965), e.deps.add(40965)), t.needed && e.deps.add(34665), r.needed && e.deps.add(34853), this.tiff.enabled = j.some((o) => this[o].enabled === !0) || this.makerNote || this.userComment;
    for (let o of j) this[o].finalizeFilters();
  }
  get onlyTiff() {
    return !Ho.map((e) => this[e].enabled).some((e) => e === !0) && this.tiff.enabled;
  }
  checkLoadedPlugins() {
    for (let e of Ei) this[e].enabled && !ee.has(e) && Bi("segment parser", e);
  }
}
function xa(i, e) {
  let t, r, a, o, s = [];
  for (a of e) {
    for (o of (t = tr.get(a), r = [], t)) (i.includes(o[0]) || i.includes(o[1])) && r.push(o[0]);
    r.length && s.push([a, r]);
  }
  return s;
}
function fi(i, e) {
  return i !== void 0 ? i : e !== void 0 ? e : void 0;
}
function Mt(i, e) {
  for (let t of e) i.add(t);
}
E(ir, "default", G);
class Np {
  constructor(e) {
    E(this, "parsers", {}), E(this, "output", {}), E(this, "errors", []), E(this, "pushToErrors", (t) => this.errors.push(t)), this.options = ir.useCached(e);
  }
  async read(e) {
    this.file = await function(t, r) {
      return typeof t == "string" ? ba(t, r) : st && !Ap && t instanceof HTMLImageElement ? ba(t.src, r) : t instanceof Uint8Array || t instanceof ArrayBuffer || t instanceof DataView ? new ie(t) : st && t instanceof Blob ? Ii(t, r, "blob", Ti) : void W("Invalid input argument");
    }(e, this.options);
  }
  setup() {
    if (this.fileParser) return;
    let { file: e } = this, t = e.getUint16(0);
    for (let [r, a] of Lo) if (a.canHandle(e, t)) return this.fileParser = new a(this.options, this.file, this.parsers), e[r] = !0;
    this.file.close && this.file.close(), W("Unknown file format");
  }
  async parse() {
    let { output: e, errors: t } = this;
    return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t.length > 0 && (e.errors = t), $o(r = e) ? void 0 : r;
    var r;
  }
  async executeParsers() {
    let { output: e } = this;
    await this.fileParser.parse();
    let t = Object.values(this.parsers).map(async (r) => {
      let a = await r.parse();
      r.assignToOutput(e, a);
    });
    this.options.silentErrors && (t = t.map((r) => r.catch(this.pushToErrors))), await Promise.all(t);
  }
  async extractThumbnail() {
    this.setup();
    let { options: e, file: t } = this, r = ee.get("tiff", e);
    var a;
    if (t.tiff ? a = { start: 0, type: "tiff" } : t.jpeg && (a = await this.fileParser.getOrFindSegment("tiff")), a === void 0) return;
    let o = await this.fileParser.ensureSegmentChunk(a), s = this.parsers.tiff = new r(o, e, t), n = await s.extractThumbnail();
    return t.close && t.close(), n;
  }
}
class Oe {
  static findPosition(e, t) {
    let r = e.getUint16(t + 2) + 2, a = typeof this.headerLength == "function" ? this.headerLength(e, t, r) : this.headerLength, o = t + a, s = r - a;
    return { offset: t, length: r, headerLength: a, start: o, size: s, end: o + s };
  }
  static parse(e, t = {}) {
    return new this(e, new ir({ [this.type]: t }), e).parse();
  }
  normalizeInput(e) {
    return e instanceof ie ? e : new ie(e);
  }
  constructor(e, t = {}, r) {
    E(this, "errors", []), E(this, "raw", /* @__PURE__ */ new Map()), E(this, "handleError", (a) => {
      if (!this.options.silentErrors) throw a;
      this.errors.push(a.message);
    }), this.chunk = this.normalizeInput(e), this.file = r, this.type = this.constructor.type, this.globalOptions = this.options = t, this.localOptions = t[this.type], this.canTranslate = this.localOptions && this.localOptions.translate;
  }
  translate() {
    this.canTranslate && (this.translated = this.translateBlock(this.raw, this.type));
  }
  get output() {
    return this.translated ? this.translated : this.raw ? Object.fromEntries(this.raw) : void 0;
  }
  translateBlock(e, t) {
    let r = Rp.get(t), a = zp.get(t), o = tr.get(t), s = this.options[t], n = s.reviveValues && !!r, p = s.translateValues && !!a, l = s.translateKeys && !!o, c = {};
    for (let [d, h] of e) n && r.has(d) ? h = r.get(d)(h) : p && a.has(d) && (h = this.translateValue(h, a.get(d))), l && o.has(d) && (d = o.get(d) || d), c[d] = h;
    return c;
  }
  translateValue(e, t) {
    return t[e] || t.DEFAULT || e;
  }
  assignToOutput(e, t) {
    this.assignObjectToOutput(e, this.constructor.type, t);
  }
  assignObjectToOutput(e, t, r) {
    if (this.globalOptions.mergeOutput) return Object.assign(e, r);
    e[t] ? Object.assign(e[t], r) : e[t] = r;
  }
}
E(Oe, "headerLength", 4), E(Oe, "type", void 0), E(Oe, "multiSegment", !1), E(Oe, "canHandle", () => !1);
function Up(i) {
  return i === 192 || i === 194 || i === 196 || i === 219 || i === 221 || i === 218 || i === 254;
}
function $p(i) {
  return i >= 224 && i <= 239;
}
function Lp(i, e, t) {
  for (let [r, a] of ee) if (a.canHandle(i, e, t)) return r;
}
class _a extends class {
  constructor(e, t, r) {
    E(this, "errors", []), E(this, "ensureSegmentChunk", async (a) => {
      let o = a.start, s = a.size || 65536;
      if (this.file.chunked) if (this.file.available(o, s)) a.chunk = this.file.subarray(o, s);
      else try {
        a.chunk = await this.file.readChunk(o, s);
      } catch (n) {
        W(`Couldn't read segment: ${JSON.stringify(a)}. ${n.message}`);
      }
      else this.file.byteLength > o + s ? a.chunk = this.file.subarray(o, s) : a.size === void 0 ? a.chunk = this.file.subarray(o) : W("Segment unreachable: " + JSON.stringify(a));
      return a.chunk;
    }), this.extendOptions && this.extendOptions(e), this.options = e, this.file = t, this.parsers = r;
  }
  injectSegment(e, t) {
    this.options[e].enabled && this.createParser(e, t);
  }
  createParser(e, t) {
    let r = new (ee.get(e))(t, this.options, this.file);
    return this.parsers[e] = r;
  }
  createParsers(e) {
    for (let t of e) {
      let { type: r, chunk: a } = t, o = this.options[r];
      if (o && o.enabled) {
        let s = this.parsers[r];
        s && s.append || s || this.createParser(r, a);
      }
    }
  }
  async readSegments(e) {
    let t = e.map(this.ensureSegmentChunk);
    await Promise.all(t);
  }
} {
  constructor(...e) {
    super(...e), E(this, "appSegments", []), E(this, "jpegSegments", []), E(this, "unknownSegments", []);
  }
  static canHandle(e, t) {
    return t === 65496;
  }
  async parse() {
    await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
  }
  setupSegmentFinderArgs(e) {
    e === !0 ? (this.findAll = !0, this.wanted = new Set(ee.keyList())) : (e = e === void 0 ? ee.keyList().filter((t) => this.options[t].enabled) : e.filter((t) => this.options[t].enabled && ee.has(t)), this.findAll = !1, this.remaining = new Set(e), this.wanted = new Set(e)), this.unfinishedMultiSegment = !1;
  }
  async findAppSegments(e = 0, t) {
    this.setupSegmentFinderArgs(t);
    let { file: r, findAll: a, wanted: o, remaining: s } = this;
    if (!a && this.file.chunked && (a = Array.from(o).some((n) => {
      let p = ee.get(n), l = this.options[n];
      return p.multiSegment && l.multiSegment;
    }), a && await this.file.readWhole()), e = this.findAppSegmentsInRange(e, r.byteLength), !this.options.onlyTiff && r.chunked) {
      let n = !1;
      for (; s.size > 0 && !n && (r.canReadNextChunk || this.unfinishedMultiSegment); ) {
        let { nextChunkOffset: p } = r, l = this.appSegments.some((c) => !this.file.available(c.offset || c.start, c.length || c.size));
        if (n = e > p && !l ? !await r.readNextChunk(e) : !await r.readNextChunk(p), (e = this.findAppSegmentsInRange(e, r.byteLength)) === void 0) return;
      }
    }
  }
  findAppSegmentsInRange(e, t) {
    t -= 2;
    let r, a, o, s, n, p, { file: l, findAll: c, wanted: d, remaining: h, options: m } = this;
    for (; e < t; e++) if (l.getUint8(e) === 255) {
      if (r = l.getUint8(e + 1), $p(r)) {
        if (a = l.getUint16(e + 2), o = Lp(l, e, a), o && d.has(o) && (s = ee.get(o), n = s.findPosition(l, e), p = m[o], n.type = o, this.appSegments.push(n), !c && (s.multiSegment && p.multiSegment ? (this.unfinishedMultiSegment = n.chunkNumber < n.chunkCount, this.unfinishedMultiSegment || h.delete(o)) : h.delete(o), h.size === 0))) break;
        m.recordUnknownSegments && (n = Oe.findPosition(l, e), n.marker = r, this.unknownSegments.push(n)), e += a + 1;
      } else if (Up(r)) {
        if (a = l.getUint16(e + 2), r === 218 && m.stopAfterSos !== !1) return;
        m.recordJpegSegments && this.jpegSegments.push({ offset: e, length: a, marker: r }), e += a + 1;
      }
    }
    return e;
  }
  mergeMultiSegments() {
    if (!this.appSegments.some((t) => t.multiSegment)) return;
    let e = function(t, r) {
      let a, o, s, n = /* @__PURE__ */ new Map();
      for (let p = 0; p < t.length; p++) a = t[p], o = a[r], n.has(o) ? s = n.get(o) : n.set(o, s = []), s.push(a);
      return Array.from(n);
    }(this.appSegments, "type");
    this.mergedAppSegments = e.map(([t, r]) => {
      let a = ee.get(t, this.options);
      return a.handleMultiSegments ? { type: t, chunk: a.handleMultiSegments(r) } : r[0];
    });
  }
  getSegment(e) {
    return this.appSegments.find((t) => t.type === e);
  }
  async getOrFindSegment(e) {
    let t = this.getSegment(e);
    return t === void 0 && (await this.findAppSegments(0, [e]), t = this.getSegment(e)), t;
  }
}
E(_a, "type", "jpeg"), Lo.set("jpeg", _a);
const Hp = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4];
class jp extends Oe {
  parseHeader() {
    var e = this.chunk.getUint16();
    e === 18761 ? this.le = !0 : e === 19789 && (this.le = !1), this.chunk.le = this.le, this.headerParsed = !0;
  }
  parseTags(e, t, r = /* @__PURE__ */ new Map()) {
    let { pick: a, skip: o } = this.options[t];
    a = new Set(a);
    let s = a.size > 0, n = o.size === 0, p = this.chunk.getUint16(e);
    e += 2;
    for (let l = 0; l < p; l++) {
      let c = this.chunk.getUint16(e);
      if (s) {
        if (a.has(c) && (r.set(c, this.parseTag(e, c, t)), a.delete(c), a.size === 0)) break;
      } else !n && o.has(c) || r.set(c, this.parseTag(e, c, t));
      e += 12;
    }
    return r;
  }
  parseTag(e, t, r) {
    let { chunk: a } = this, o = a.getUint16(e + 2), s = a.getUint32(e + 4), n = Hp[o];
    if (n * s <= 4 ? e += 8 : e = a.getUint32(e + 8), (o < 1 || o > 13) && W(`Invalid TIFF value type. block: ${r.toUpperCase()}, tag: ${t.toString(16)}, type: ${o}, offset ${e}`), e > a.byteLength && W(`Invalid TIFF value offset. block: ${r.toUpperCase()}, tag: ${t.toString(16)}, type: ${o}, offset ${e} is outside of chunk size ${a.byteLength}`), o === 1) return a.getUint8Array(e, s);
    if (o === 2) return (p = function(l) {
      for (; l.endsWith("\0"); ) l = l.slice(0, -1);
      return l;
    }(p = a.getString(e, s)).trim()) === "" ? void 0 : p;
    var p;
    if (o === 7) return a.getUint8Array(e, s);
    if (s === 1) return this.parseTagValue(o, e);
    {
      let l = new (function(d) {
        switch (d) {
          case 1:
            return Uint8Array;
          case 3:
            return Uint16Array;
          case 4:
            return Uint32Array;
          case 5:
            return Array;
          case 6:
            return Int8Array;
          case 8:
            return Int16Array;
          case 9:
            return Int32Array;
          case 10:
            return Array;
          case 11:
            return Float32Array;
          case 12:
            return Float64Array;
          default:
            return Array;
        }
      }(o))(s), c = n;
      for (let d = 0; d < s; d++) l[d] = this.parseTagValue(o, e), e += c;
      return l;
    }
  }
  parseTagValue(e, t) {
    let { chunk: r } = this;
    switch (e) {
      case 1:
        return r.getUint8(t);
      case 3:
        return r.getUint16(t);
      case 4:
        return r.getUint32(t);
      case 5:
        return r.getUint32(t) / r.getUint32(t + 4);
      case 6:
        return r.getInt8(t);
      case 8:
        return r.getInt16(t);
      case 9:
        return r.getInt32(t);
      case 10:
        return r.getInt32(t) / r.getInt32(t + 4);
      case 11:
        return r.getFloat(t);
      case 12:
        return r.getDouble(t);
      case 13:
        return r.getUint32(t);
      default:
        W(`Invalid tiff type ${e}`);
    }
  }
}
class mi extends jp {
  static canHandle(e, t) {
    return e.getUint8(t + 1) === 225 && e.getUint32(t + 4) === 1165519206 && e.getUint16(t + 8) === 0;
  }
  async parse() {
    this.parseHeader();
    let { options: e } = this;
    return e.ifd0.enabled && await this.parseIfd0Block(), e.exif.enabled && await this.safeParse("parseExifBlock"), e.gps.enabled && await this.safeParse("parseGpsBlock"), e.interop.enabled && await this.safeParse("parseInteropBlock"), e.ifd1.enabled && await this.safeParse("parseThumbnailBlock"), this.createOutput();
  }
  safeParse(e) {
    let t = this[e]();
    return t.catch !== void 0 && (t = t.catch(this.handleError)), t;
  }
  findIfd0Offset() {
    this.ifd0Offset === void 0 && (this.ifd0Offset = this.chunk.getUint32(4));
  }
  findIfd1Offset() {
    if (this.ifd1Offset === void 0) {
      this.findIfd0Offset();
      let e = this.chunk.getUint16(this.ifd0Offset), t = this.ifd0Offset + 2 + 12 * e;
      this.ifd1Offset = this.chunk.getUint32(t);
    }
  }
  parseBlock(e, t) {
    let r = /* @__PURE__ */ new Map();
    return this[t] = r, this.parseTags(e, t, r), r;
  }
  async parseIfd0Block() {
    if (this.ifd0) return;
    let { file: e } = this;
    this.findIfd0Offset(), this.ifd0Offset < 8 && W("Malformed EXIF data"), !e.chunked && this.ifd0Offset > e.byteLength && W(`IFD0 offset points to outside of file.
this.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e.byteLength}`), e.tiff && await e.ensureChunk(this.ifd0Offset, ga(this.options));
    let t = this.parseBlock(this.ifd0Offset, "ifd0");
    return t.size !== 0 ? (this.exifOffset = t.get(34665), this.interopOffset = t.get(40965), this.gpsOffset = t.get(34853), this.xmp = t.get(700), this.iptc = t.get(33723), this.icc = t.get(34675), this.options.sanitize && (t.delete(34665), t.delete(40965), t.delete(34853), t.delete(700), t.delete(33723), t.delete(34675)), t) : void 0;
  }
  async parseExifBlock() {
    if (this.exif || (this.ifd0 || await this.parseIfd0Block(), this.exifOffset === void 0)) return;
    this.file.tiff && await this.file.ensureChunk(this.exifOffset, ga(this.options));
    let e = this.parseBlock(this.exifOffset, "exif");
    return this.interopOffset || (this.interopOffset = e.get(40965)), this.makerNote = e.get(37500), this.userComment = e.get(37510), this.options.sanitize && (e.delete(40965), e.delete(37500), e.delete(37510)), this.unpack(e, 41728), this.unpack(e, 41729), e;
  }
  unpack(e, t) {
    let r = e.get(t);
    r && r.length === 1 && e.set(t, r[0]);
  }
  async parseGpsBlock() {
    if (this.gps || (this.ifd0 || await this.parseIfd0Block(), this.gpsOffset === void 0)) return;
    let e = this.parseBlock(this.gpsOffset, "gps");
    return e && e.has(2) && e.has(4) && (e.set("latitude", Da(...e.get(2), e.get(1))), e.set("longitude", Da(...e.get(4), e.get(3)))), e;
  }
  async parseInteropBlock() {
    if (!this.interop && (this.ifd0 || await this.parseIfd0Block(), this.interopOffset !== void 0 || this.exif || await this.parseExifBlock(), this.interopOffset !== void 0)) return this.parseBlock(this.interopOffset, "interop");
  }
  async parseThumbnailBlock(e = !1) {
    if (!this.ifd1 && !this.ifd1Parsed && (!this.options.mergeOutput || e)) return this.findIfd1Offset(), this.ifd1Offset > 0 && (this.parseBlock(this.ifd1Offset, "ifd1"), this.ifd1Parsed = !0), this.ifd1;
  }
  async extractThumbnail() {
    if (this.headerParsed || this.parseHeader(), this.ifd1Parsed || await this.parseThumbnailBlock(!0), this.ifd1 === void 0) return;
    let e = this.ifd1.get(513), t = this.ifd1.get(514);
    return this.chunk.getUint8Array(e, t);
  }
  get image() {
    return this.ifd0;
  }
  get thumbnail() {
    return this.ifd1;
  }
  createOutput() {
    let e, t, r, a = {};
    for (t of j) if (e = this[t], !$o(e)) if (r = this.canTranslate ? this.translateBlock(e, t) : Object.fromEntries(e), this.options.mergeOutput) {
      if (t === "ifd1") continue;
      Object.assign(a, r);
    } else a[t] = r;
    return this.makerNote && (a.makerNote = this.makerNote), this.userComment && (a.userComment = this.userComment), a;
  }
  assignToOutput(e, t) {
    if (this.globalOptions.mergeOutput) Object.assign(e, t);
    else for (let [r, a] of Object.entries(t)) this.assignObjectToOutput(e, r, a);
  }
}
function Da(i, e, t, r) {
  var a = i + e / 60 + t / 3600;
  return r !== "S" && r !== "W" || (a *= -1), a;
}
E(mi, "type", "tiff"), E(mi, "headerLength", 10), ee.set("tiff", mi);
const rr = { ifd0: !1, ifd1: !1, exif: !1, gps: !1, interop: !1, sanitize: !1, reviveValues: !0, translateKeys: !1, translateValues: !1, mergeOutput: !1 };
Object.assign({}, rr, { firstChunkSize: 4e4, gps: [1, 2, 3, 4] });
Object.assign({}, rr, { tiff: !1, ifd1: !0, mergeOutput: !1 });
const qp = Object.assign({}, rr, { firstChunkSize: 4e4, ifd0: [274] });
async function Wp(i) {
  let e = new Np(qp);
  await e.read(i);
  let t = await e.parse();
  if (t && t.ifd0) return t.ifd0[274];
}
const Vp = Object.freeze({ 1: { dimensionSwapped: !1, scaleX: 1, scaleY: 1, deg: 0, rad: 0 }, 2: { dimensionSwapped: !1, scaleX: -1, scaleY: 1, deg: 0, rad: 0 }, 3: { dimensionSwapped: !1, scaleX: 1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 4: { dimensionSwapped: !1, scaleX: -1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 5: { dimensionSwapped: !0, scaleX: 1, scaleY: -1, deg: 90, rad: 90 * Math.PI / 180 }, 6: { dimensionSwapped: !0, scaleX: 1, scaleY: 1, deg: 90, rad: 90 * Math.PI / 180 }, 7: { dimensionSwapped: !0, scaleX: 1, scaleY: -1, deg: 270, rad: 270 * Math.PI / 180 }, 8: { dimensionSwapped: !0, scaleX: 1, scaleY: 1, deg: 270, rad: 270 * Math.PI / 180 } });
let Ze = !0, Qe = !0;
if (typeof navigator == "object") {
  let i = navigator.userAgent;
  if (i.includes("iPad") || i.includes("iPhone")) {
    let e = i.match(/OS (\d+)_(\d+)/);
    if (e) {
      let [, t, r] = e;
      Ze = Number(t) + 0.1 * Number(r) < 13.4, Qe = !1;
    }
  } else if (i.includes("OS X 10")) {
    let [, e] = i.match(/OS X 10[_.](\d+)/);
    Ze = Qe = Number(e) < 15;
  }
  if (i.includes("Chrome/")) {
    let [, e] = i.match(/Chrome\/(\d+)/);
    Ze = Qe = Number(e) < 81;
  } else if (i.includes("Firefox/")) {
    let [, e] = i.match(/Firefox\/(\d+)/);
    Ze = Qe = Number(e) < 77;
  }
}
async function Gp(i) {
  let e = await Wp(i);
  return Object.assign({ canvas: Ze, css: Qe }, Vp[e]);
}
class Xp extends ie {
  constructor(...e) {
    super(...e), E(this, "ranges", new Yp()), this.byteLength !== 0 && this.ranges.add(0, this.byteLength);
  }
  _tryExtend(e, t, r) {
    if (e === 0 && this.byteLength === 0 && r) {
      let a = new DataView(r.buffer || r, r.byteOffset, r.byteLength);
      this._swapDataView(a);
    } else {
      let a = e + t;
      if (a > this.byteLength) {
        let { dataView: o } = this._extend(a);
        this._swapDataView(o);
      }
    }
  }
  _extend(e) {
    let t;
    t = Uo ? No.allocUnsafe(e) : new Uint8Array(e);
    let r = new DataView(t.buffer, t.byteOffset, t.byteLength);
    return t.set(new Uint8Array(this.buffer, this.byteOffset, this.byteLength), 0), { uintView: t, dataView: r };
  }
  subarray(e, t, r = !1) {
    return t = t || this._lengthToEnd(e), r && this._tryExtend(e, t), this.ranges.add(e, t), super.subarray(e, t);
  }
  set(e, t, r = !1) {
    r && this._tryExtend(t, e.byteLength, e);
    let a = super.set(e, t);
    return this.ranges.add(t, a.byteLength), a;
  }
  async ensureChunk(e, t) {
    this.chunked && (this.ranges.available(e, t) || await this.readChunk(e, t));
  }
  available(e, t) {
    return this.ranges.available(e, t);
  }
}
class Yp {
  constructor() {
    E(this, "list", []);
  }
  get length() {
    return this.list.length;
  }
  add(e, t, r = 0) {
    let a = e + t, o = this.list.filter((s) => ka(e, s.offset, a) || ka(e, s.end, a));
    if (o.length > 0) {
      e = Math.min(e, ...o.map((n) => n.offset)), a = Math.max(a, ...o.map((n) => n.end)), t = a - e;
      let s = o.shift();
      s.offset = e, s.length = t, s.end = a, this.list = this.list.filter((n) => !o.includes(n));
    } else this.list.push({ offset: e, length: t, end: a });
  }
  available(e, t) {
    let r = e + t;
    return this.list.some((a) => a.offset <= e && r <= a.end);
  }
}
function ka(i, e, t) {
  return i <= e && e <= t;
}
class Kp extends Xp {
  constructor(e, t) {
    super(0), E(this, "chunksRead", 0), this.input = e, this.options = t;
  }
  async readWhole() {
    this.chunked = !1, await this.readChunk(this.nextChunkOffset);
  }
  async readChunked() {
    this.chunked = !0, await this.readChunk(0, this.options.firstChunkSize);
  }
  async readNextChunk(e = this.nextChunkOffset) {
    if (this.fullyRead) return this.chunksRead++, !1;
    let t = this.options.chunkSize, r = await this.readChunk(e, t);
    return !!r && r.byteLength === t;
  }
  async readChunk(e, t) {
    if (this.chunksRead++, (t = this.safeWrapAddress(e, t)) !== 0) return this._readChunk(e, t);
  }
  safeWrapAddress(e, t) {
    return this.size !== void 0 && e + t > this.size ? Math.max(0, this.size - e) : t;
  }
  get nextChunkOffset() {
    if (this.ranges.list.length !== 0) return this.ranges.list[0].length;
  }
  get canReadNextChunk() {
    return this.chunksRead < this.options.chunkLimit;
  }
  get fullyRead() {
    return this.size !== void 0 && this.nextChunkOffset === this.size;
  }
  read() {
    return this.options.chunked ? this.readChunked() : this.readWhole();
  }
  close() {
  }
}
er.set("blob", class extends Kp {
  async readWhole() {
    this.chunked = !1;
    let i = await Ti(this.input);
    this._swapArrayBuffer(i);
  }
  readChunked() {
    return this.chunked = !0, this.size = this.input.size, super.readChunked();
  }
  async _readChunk(i, e) {
    let t = e ? i + e : void 0, r = this.input.slice(i, t), a = await Ti(r);
    return this.set(a, i, !0);
  }
});
const Zp = "@uppy/thumbnail-generator", Qp = "Uppy plugin that generates small previews of images to show on your upload UI.", Jp = "4.2.2", ed = "MIT", td = "lib/index.js", id = "module", rd = { build: "tsc --build tsconfig.build.json", typecheck: "tsc --build", test: "vitest run --environment=jsdom --silent='passed-only'" }, ad = ["file uploader", "uppy", "uppy-plugin", "thumbnail", "preview", "resize"], od = "https://uppy.io", sd = { url: "https://github.com/transloadit/uppy/issues" }, nd = { type: "git", url: "git+https://github.com/transloadit/uppy.git" }, ld = ["src", "lib", "dist", "CHANGELOG.md"], pd = { "@uppy/utils": "^6.2.2", exifr: "^7.0.0" }, dd = { jsdom: "^26.1.0", "namespace-emitter": "2.0.1", typescript: "^5.8.3", vitest: "^3.2.4" }, ud = { "@uppy/core": "^4.5.2" }, cd = {
  name: Zp,
  description: Qp,
  version: Jp,
  license: ed,
  main: td,
  type: id,
  scripts: rd,
  keywords: ad,
  homepage: od,
  bugs: sd,
  repository: nd,
  files: ld,
  dependencies: pd,
  devDependencies: dd,
  peerDependencies: ud
}, hd = {
  strings: {
    generatingThumbnails: "Generating thumbnails..."
  }
};
function fd(i, e, t) {
  try {
    i.getContext("2d").getImageData(0, 0, 1, 1);
  } catch (r) {
    if (r.code === 18)
      return Promise.reject(new Error("cannot read image, probably an svg with external resources"));
  }
  return i.toBlob ? new Promise((r) => {
    i.toBlob(r, e, t);
  }).then((r) => {
    if (r === null)
      throw new Error("cannot read image, probably an svg with external resources");
    return r;
  }) : Promise.resolve().then(() => Ep(i.toDataURL(e, t), {})).then((r) => {
    if (r === null)
      throw new Error("could not extract blob, probably an old browser");
    return r;
  });
}
function md(i, e) {
  let t = i.width, r = i.height;
  (e.deg === 90 || e.deg === 270) && (t = i.height, r = i.width);
  const a = document.createElement("canvas");
  a.width = t, a.height = r;
  const o = a.getContext("2d");
  return o.translate(t / 2, r / 2), e.canvas && (o.rotate(e.rad), o.scale(e.scaleX, e.scaleY)), o.drawImage(i, -i.width / 2, -i.height / 2, i.width, i.height), a;
}
function gd(i) {
  const e = i.width / i.height, t = 5e6, r = 4096;
  let a = Math.floor(Math.sqrt(t * e)), o = Math.floor(t / Math.sqrt(t * e));
  if (a > r && (a = r, o = Math.round(a / e)), o > r && (o = r, a = Math.round(e * o)), i.width > a) {
    const s = document.createElement("canvas");
    return s.width = a, s.height = o, s.getContext("2d").drawImage(i, 0, 0, a, o), s;
  }
  return i;
}
const yd = {
  thumbnailWidth: null,
  thumbnailHeight: null,
  thumbnailType: "image/jpeg",
  waitForThumbnailsBeforeUpload: !1,
  lazy: !1
};
class bd extends ve {
  static VERSION = cd.version;
  queue;
  queueProcessing;
  defaultThumbnailDimension;
  thumbnailType;
  constructor(e, t) {
    if (super(e, { ...yd, ...t }), this.type = "modifier", this.id = this.opts.id || "ThumbnailGenerator", this.title = "Thumbnail Generator", this.queue = [], this.queueProcessing = !1, this.defaultThumbnailDimension = 200, this.thumbnailType = this.opts.thumbnailType, this.defaultLocale = hd, this.i18nInit(), this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload)
      throw new Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
  }
  createThumbnail(e, t, r) {
    const a = URL.createObjectURL(e.data), o = new Promise((n, p) => {
      const l = new Image();
      l.src = a, l.addEventListener("load", () => {
        URL.revokeObjectURL(a), n(l);
      }), l.addEventListener("error", (c) => {
        URL.revokeObjectURL(a), p(c.error || new Error("Could not create thumbnail"));
      });
    }), s = Gp(e.data).catch(() => 1);
    return Promise.all([o, s]).then(([n, p]) => {
      const l = this.getProportionalDimensions(n, t, r, p.deg), c = md(n, p), d = this.resizeImage(c, l.width, l.height);
      return fd(d, this.thumbnailType, 80);
    }).then((n) => URL.createObjectURL(n));
  }
  /**
   * Get the new calculated dimensions for the given image and a target width
   * or height. If both width and height are given, only width is taken into
   * account. If neither width nor height are given, the default dimension
   * is used.
   */
  getProportionalDimensions(e, t, r, a) {
    let o = e.width / e.height;
    return (a === 90 || a === 270) && (o = e.height / e.width), t != null ? {
      width: t,
      height: Math.round(t / o)
    } : r != null ? {
      width: Math.round(r * o),
      height: r
    } : {
      width: this.defaultThumbnailDimension,
      height: Math.round(this.defaultThumbnailDimension / o)
    };
  }
  /**
   * Resize an image to the target `width` and `height`.
   *
   * Returns a Canvas with the resized image on it.
   */
  resizeImage(e, t, r) {
    let a = gd(e), o = Math.ceil(Math.log2(a.width / t));
    o < 1 && (o = 1);
    let s = t * 2 ** (o - 1), n = r * 2 ** (o - 1);
    const p = 2;
    for (; o--; ) {
      const l = document.createElement("canvas");
      l.width = s, l.height = n, l.getContext("2d").drawImage(a, 0, 0, s, n), a = l, s = Math.round(s / p), n = Math.round(n / p);
    }
    return a;
  }
  /**
   * Set the preview URL for a file.
   */
  setPreviewURL(e, t) {
    this.uppy.setFileState(e, { preview: t });
  }
  addToQueue(e) {
    this.queue.push(e), this.queueProcessing === !1 && this.processQueue();
  }
  processQueue() {
    if (this.queueProcessing = !0, this.queue.length > 0) {
      const e = this.uppy.getFile(this.queue.shift());
      return e ? this.requestThumbnail(e).catch(() => {
      }).then(() => this.processQueue()) : (this.uppy.log("[ThumbnailGenerator] file was removed before a thumbnail could be generated, but not removed from the queue. This is probably a bug", "error"), Promise.resolve());
    }
    return this.queueProcessing = !1, this.uppy.log("[ThumbnailGenerator] Emptied thumbnail queue"), this.uppy.emit("thumbnail:all-generated"), Promise.resolve();
  }
  requestThumbnail(e) {
    return fa(e.type) && !e.isRemote ? this.createThumbnail(e, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((t) => {
      this.setPreviewURL(e.id, t), this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${e.id}`), this.uppy.emit("thumbnail:generated", this.uppy.getFile(e.id), t);
    }).catch((t) => {
      this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${e.id}:`, "warning"), this.uppy.log(t, "warning"), this.uppy.emit("thumbnail:error", this.uppy.getFile(e.id), t);
    }) : Promise.resolve();
  }
  onFileAdded = (e) => {
    !e.preview && e.data && fa(e.type) && !e.isRemote && this.addToQueue(e.id);
  };
  /**
   * Cancel a lazy request for a thumbnail if the thumbnail has not yet been generated.
   */
  onCancelRequest = (e) => {
    const t = this.queue.indexOf(e.id);
    t !== -1 && this.queue.splice(t, 1);
  };
  /**
   * Clean up the thumbnail for a file. Cancel lazy requests and free the thumbnail URL.
   */
  onFileRemoved = (e) => {
    const t = this.queue.indexOf(e.id);
    t !== -1 && this.queue.splice(t, 1), e.preview && ha(e.preview) && URL.revokeObjectURL(e.preview);
  };
  onRestored = () => {
    this.uppy.getFiles().filter((t) => t.isRestored).forEach((t) => {
      (!t.preview || ha(t.preview)) && this.addToQueue(t.id);
    });
  };
  onAllFilesRemoved = () => {
    this.queue = [];
  };
  waitUntilAllProcessed = (e) => {
    e.forEach((r) => {
      const a = this.uppy.getFile(r);
      this.uppy.emit("preprocess-progress", a, {
        mode: "indeterminate",
        message: this.i18n("generatingThumbnails")
      });
    });
    const t = () => {
      e.forEach((r) => {
        const a = this.uppy.getFile(r);
        this.uppy.emit("preprocess-complete", a);
      });
    };
    return new Promise((r) => {
      this.queueProcessing ? this.uppy.once("thumbnail:all-generated", () => {
        t(), r();
      }) : (t(), r());
    });
  };
  install() {
    this.uppy.on("file-removed", this.onFileRemoved), this.uppy.on("cancel-all", this.onAllFilesRemoved), this.opts.lazy ? (this.uppy.on("thumbnail:request", this.onFileAdded), this.uppy.on("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.on("thumbnail:request", this.onFileAdded), this.uppy.on("file-added", this.onFileAdded), this.uppy.on("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.addPreProcessor(this.waitUntilAllProcessed);
  }
  uninstall() {
    this.uppy.off("file-removed", this.onFileRemoved), this.uppy.off("cancel-all", this.onAllFilesRemoved), this.opts.lazy ? (this.uppy.off("thumbnail:request", this.onFileAdded), this.uppy.off("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.off("thumbnail:request", this.onFileAdded), this.uppy.off("file-added", this.onFileAdded), this.uppy.off("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.removePreProcessor(this.waitUntilAllProcessed);
  }
}
function Sa(i) {
  if (typeof i == "string") {
    const e = document.querySelectorAll(i);
    return e.length === 0 ? null : Array.from(e);
  }
  return typeof i == "object" && po(i) ? [i] : null;
}
const et = Array.from;
function vd(i) {
  const e = et(i.files);
  return Promise.resolve(e);
}
function Wo(i, e, t, { onSuccess: r }) {
  i.readEntries(
    (a) => {
      const o = [...e, ...a];
      a.length ? queueMicrotask(() => {
        Wo(i, o, t, { onSuccess: r });
      }) : r(o);
    },
    // Make sure we resolve on error anyway, it's fine if only one directory couldn't be parsed!
    (a) => {
      t(a), r(e);
    }
  );
}
function Vo(i, e) {
  return i == null ? i : {
    kind: i.isFile ? "file" : i.isDirectory ? "directory" : void 0,
    name: i.name,
    getFile() {
      return new Promise((t, r) => i.file(t, r));
    },
    async *values() {
      const t = i.createReader();
      yield* await new Promise((a) => {
        Wo(t, [], e, {
          onSuccess: (o) => a(o.map((s) => Vo(s, e)))
        });
      });
    },
    isSameEntry: void 0
  };
}
async function* Go(i, e, t = void 0) {
  const r = () => `${e}/${i.name}`;
  if (i.kind === "file") {
    const a = await i.getFile();
    a != null ? (a.relativePath = e ? r() : null, yield a) : t != null && (yield t);
  } else if (i.kind === "directory")
    for await (const a of i.values())
      yield* Go(a, e ? r() : i.name);
  else t != null && (yield t);
}
async function* wd(i, e) {
  const t = await Promise.all(Array.from(i.items, async (r) => {
    let a;
    return a ??= Vo(typeof r.getAsEntry == "function" ? r.getAsEntry() : r.webkitGetAsEntry(), e), {
      fileSystemHandle: a,
      lastResortFile: r.getAsFile()
      // can be used as a fallback in case other methods fail
    };
  }));
  for (const { lastResortFile: r, fileSystemHandle: a } of t)
    if (a != null)
      try {
        yield* Go(a, "", r);
      } catch (o) {
        r != null ? yield r : e(o);
      }
    else r != null && (yield r);
}
async function xd(i, e) {
  const t = e?.logDropError;
  try {
    const r = [];
    for await (const a of wd(i, t))
      r.push(a);
    return r;
  } catch {
    return vd(i);
  }
}
const _d = "@uppy/dashboard", Dd = "Universal UI plugin for Uppy.", kd = "4.4.3", Sd = "MIT", Pd = "lib/index.js", Cd = "dist/style.min.css", Bd = "module", Id = { build: "tsc --build tsconfig.build.json", "build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css", typecheck: "tsc --build", test: "vitest run --silent='passed-only'", "test:e2e": "vitest watch --project browser --browser.headless false" }, Fd = ["file uploader", "uppy", "uppy-plugin", "dashboard", "ui"], Td = "https://uppy.io", Ed = { url: "https://github.com/transloadit/uppy/issues" }, Ad = { type: "git", url: "git+https://github.com/transloadit/uppy.git" }, Od = ["src", "lib", "dist", "CHANGELOG.md"], Md = { "@transloadit/prettier-bytes": "^0.3.4", "@uppy/informer": "^4.3.2", "@uppy/provider-views": "^4.5.2", "@uppy/status-bar": "^4.2.3", "@uppy/thumbnail-generator": "^4.2.2", "@uppy/utils": "^6.2.2", classnames: "^2.2.6", lodash: "^4.17.21", nanoid: "^5.0.9", preact: "^10.5.13", "shallow-equal": "^3.0.0" }, zd = { "@uppy/core": "^4.5.2", "@uppy/google-drive": "^4.4.2", "@uppy/status-bar": "^4.2.3", "@uppy/url": "^4.3.2", "@uppy/webcam": "^4.3.2", "@vitest/browser": "^3.2.4", cssnano: "^7.0.7", jsdom: "^26.1.0", postcss: "^8.5.6", "postcss-cli": "^11.0.1", "resize-observer-polyfill": "^1.5.0", sass: "^1.89.2", typescript: "^5.8.3", vitest: "^3.2.4" }, Rd = { "@uppy/core": "^4.5.2" }, Nd = {
  name: _d,
  description: Dd,
  version: kd,
  license: Sd,
  main: Pd,
  style: Cd,
  type: Bd,
  scripts: Id,
  keywords: Fd,
  homepage: Td,
  bugs: Ed,
  repository: Ad,
  files: Od,
  dependencies: Md,
  devDependencies: zd,
  peerDependencies: Rd
};
function Ud() {
  const i = document.body;
  return !(!("draggable" in i) || !("ondragstart" in i && "ondrop" in i) || !("FormData" in window) || !("FileReader" in window));
}
class Xo extends X {
  fileInput = null;
  folderInput = null;
  mobilePhotoFileInput = null;
  mobileVideoFileInput = null;
  triggerFileInputClick = () => {
    this.fileInput?.click();
  };
  triggerFolderInputClick = () => {
    this.folderInput?.click();
  };
  triggerVideoCameraInputClick = () => {
    this.mobileVideoFileInput?.click();
  };
  triggerPhotoCameraInputClick = () => {
    this.mobilePhotoFileInput?.click();
  };
  onFileInputChange = (e) => {
    this.props.handleInputChange(e), e.currentTarget.value = "";
  };
  renderHiddenInput = (e, t) => u("input", {
    className: "uppy-Dashboard-input",
    hidden: !0,
    "aria-hidden": "true",
    tabIndex: -1,
    // @ts-expect-error default types don't yet know about the `webkitdirectory` property
    webkitdirectory: e,
    type: "file",
    name: "files[]",
    multiple: this.props.maxNumberOfFiles !== 1,
    onChange: this.onFileInputChange,
    accept: this.props.allowedFileTypes?.join(", "),
    ref: t
  });
  renderHiddenCameraInput = (e, t, r) => {
    const o = { photo: "image/*", video: "video/*" }[e];
    return u("input", { className: "uppy-Dashboard-input", hidden: !0, "aria-hidden": "true", tabIndex: -1, type: "file", name: `camera-${e}`, onChange: this.onFileInputChange, capture: t === "" ? "environment" : t, accept: o, ref: r });
  };
  renderMyDeviceAcquirer = () => u("div", { className: "uppy-DashboardTab", role: "presentation", "data-uppy-acquirer-id": "MyDevice", children: u("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn", role: "tab", tabIndex: 0, "data-uppy-super-focusable": !0, onClick: this.triggerFileInputClick, children: [u("div", { className: "uppy-DashboardTab-inner", children: u("svg", { className: "uppy-DashboardTab-iconMyDevice", "aria-hidden": "true", focusable: "false", width: "32", height: "32", viewBox: "0 0 32 32", children: u("path", { d: "M8.45 22.087l-1.305-6.674h17.678l-1.572 6.674H8.45zm4.975-12.412l1.083 1.765a.823.823 0 00.715.386h7.951V13.5H8.587V9.675h4.838zM26.043 13.5h-1.195v-2.598c0-.463-.336-.75-.798-.75h-8.356l-1.082-1.766A.823.823 0 0013.897 8H7.728c-.462 0-.815.256-.815.718V13.5h-.956a.97.97 0 00-.746.37.972.972 0 00-.19.81l1.724 8.565c.095.44.484.755.933.755H24c.44 0 .824-.3.929-.727l2.043-8.568a.972.972 0 00-.176-.825.967.967 0 00-.753-.38z", fill: "currentcolor", "fill-rule": "evenodd" }) }) }), u("div", { className: "uppy-DashboardTab-name", children: this.props.i18n("myDevice") })] }) });
  renderPhotoCamera = () => u("div", { className: "uppy-DashboardTab", role: "presentation", "data-uppy-acquirer-id": "MobilePhotoCamera", children: u("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn", role: "tab", tabIndex: 0, "data-uppy-super-focusable": !0, onClick: this.triggerPhotoCameraInputClick, children: [u("div", { className: "uppy-DashboardTab-inner", children: u("svg", { "aria-hidden": "true", focusable: "false", width: "32", height: "32", viewBox: "0 0 32 32", children: u("path", { d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z", fill: "#02B383", "fill-rule": "nonzero" }) }) }), u("div", { className: "uppy-DashboardTab-name", children: this.props.i18n("takePictureBtn") })] }) });
  renderVideoCamera = () => u("div", { className: "uppy-DashboardTab", role: "presentation", "data-uppy-acquirer-id": "MobileVideoCamera", children: u("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn", role: "tab", tabIndex: 0, "data-uppy-super-focusable": !0, onClick: this.triggerVideoCameraInputClick, children: [u("div", { className: "uppy-DashboardTab-inner", children: u("svg", { "aria-hidden": "true", width: "32", height: "32", viewBox: "0 0 32 32", children: u("path", { fill: "#FF675E", fillRule: "nonzero", d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z " }) }) }), u("div", { className: "uppy-DashboardTab-name", children: this.props.i18n("recordVideoBtn") })] }) });
  renderBrowseButton = (e, t) => {
    const r = this.props.acquirers.length;
    return u("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-Dashboard-browse", onClick: t, "data-uppy-super-focusable": r === 0, children: e });
  };
  renderDropPasteBrowseTagline = (e) => {
    const t = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick), r = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick), a = this.props.fileManagerSelectionType, o = a.charAt(0).toUpperCase() + a.slice(1);
    return u("div", { class: "uppy-Dashboard-AddFiles-title", children: this.props.disableLocalFiles ? this.props.i18n("importFiles") : e > 0 ? this.props.i18nArray(`dropPasteImport${o}`, {
      browseFiles: t,
      browseFolders: r,
      browse: t
    }) : this.props.i18nArray(`dropPaste${o}`, {
      browseFiles: t,
      browseFolders: r,
      browse: t
    }) });
  };
  [Symbol.for("uppy test: disable unused locale key warning")]() {
    this.props.i18nArray("dropPasteBoth"), this.props.i18nArray("dropPasteFiles"), this.props.i18nArray("dropPasteFolders"), this.props.i18nArray("dropPasteImportBoth"), this.props.i18nArray("dropPasteImportFiles"), this.props.i18nArray("dropPasteImportFolders");
  }
  renderAcquirer = (e) => u("div", { className: "uppy-DashboardTab", role: "presentation", "data-uppy-acquirer-id": e.id, children: u("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn", role: "tab", tabIndex: 0, "data-cy": e.id, "aria-controls": `uppy-DashboardContent-panel--${e.id}`, "aria-selected": this.props.activePickerPanel?.id === e.id, "data-uppy-super-focusable": !0, onClick: () => this.props.showPanel(e.id), children: [u("div", { className: "uppy-DashboardTab-inner", children: e.icon() }), u("div", { className: "uppy-DashboardTab-name", children: e.name })] }) });
  renderAcquirers = (e) => {
    const t = [...e], r = t.splice(e.length - 2, e.length);
    return u(re, { children: [t.map((a) => this.renderAcquirer(a)), u("span", { role: "presentation", style: { "white-space": "nowrap" }, children: r.map((a) => this.renderAcquirer(a)) })] });
  };
  renderSourcesList = (e, t) => {
    const { showNativePhotoCameraButton: r, showNativeVideoCameraButton: a } = this.props;
    let o = [];
    const s = "myDevice";
    t || o.push({
      key: s,
      elements: this.renderMyDeviceAcquirer()
    }), r && o.push({
      key: "nativePhotoCameraButton",
      elements: this.renderPhotoCamera()
    }), a && o.push({
      key: "nativePhotoCameraButton",
      elements: this.renderVideoCamera()
    }), o.push(...e.map((c) => ({
      key: c.id,
      elements: this.renderAcquirer(c)
    }))), o.length === 1 && o[0].key === s && (o = []);
    const p = [...o], l = p.splice(o.length - 2, o.length);
    return u(re, { children: [this.renderDropPasteBrowseTagline(o.length), u("div", { className: "uppy-Dashboard-AddFiles-list", role: "tablist", children: [p.map(({ key: c, elements: d }) => u(re, { children: d }, c)), u("span", { role: "presentation", style: { "white-space": "nowrap" }, children: l.map(({ key: c, elements: d }) => u(re, { children: d }, c)) })] })] });
  };
  renderPoweredByUppy() {
    const { i18nArray: e } = this.props, t = u("span", { children: [u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon uppy-Dashboard-poweredByIcon", width: "11", height: "11", viewBox: "0 0 11 11", children: u("path", { d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z", fillRule: "evenodd" }) }), u("span", { className: "uppy-Dashboard-poweredByUppy", children: "Uppy" })] }), r = e("poweredBy", { uppy: t });
    return u("a", { tabIndex: -1, href: "https://uppy.io", rel: "noreferrer noopener", target: "_blank", className: "uppy-Dashboard-poweredBy", children: r });
  }
  render() {
    const { showNativePhotoCameraButton: e, showNativeVideoCameraButton: t, nativeCameraFacingMode: r } = this.props;
    return u("div", { className: "uppy-Dashboard-AddFiles", children: [this.renderHiddenInput(!1, (a) => {
      this.fileInput = a;
    }), this.renderHiddenInput(!0, (a) => {
      this.folderInput = a;
    }), e && this.renderHiddenCameraInput("photo", r, (a) => {
      this.mobilePhotoFileInput = a;
    }), t && this.renderHiddenCameraInput("video", r, (a) => {
      this.mobileVideoFileInput = a;
    }), this.renderSourcesList(this.props.acquirers, this.props.disableLocalFiles), u("div", { className: "uppy-Dashboard-AddFiles-info", children: [this.props.note && u("div", { className: "uppy-Dashboard-note", children: this.props.note }), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy()] })] });
  }
}
const $d = (i) => u("div", { className: ae("uppy-Dashboard-AddFilesPanel", i.className), "data-uppy-panelType": "AddFiles", "aria-hidden": !i.showAddFilesPanel, children: [u("div", { className: "uppy-DashboardContent-bar", children: [u("div", {
  className: "uppy-DashboardContent-title",
  // biome-ignore lint/a11y/useSemanticElements: ...
  role: "heading",
  "aria-level": 1,
  children: i.i18n("addingMoreFiles")
}), u("button", { className: "uppy-DashboardContent-back", type: "button", onClick: () => i.toggleAddFilesPanel(!1), children: i.i18n("back") })] }), u(Xo, { ...i })] });
function Ld(i) {
  const e = i.files[i.fileCardFor], t = () => {
    i.uppy.emit("file-editor:cancel", e), i.closeFileEditor();
  };
  return u("div", { className: ae("uppy-DashboardContent-panel", i.className), role: "tabpanel", "data-uppy-panelType": "FileEditor", id: "uppy-DashboardContent-panel--editor", children: [u("div", { className: "uppy-DashboardContent-bar", children: [u("div", {
    className: "uppy-DashboardContent-title",
    // biome-ignore lint/a11y/useSemanticElements: ...
    role: "heading",
    "aria-level": 1,
    children: i.i18nArray("editing", {
      file: u("span", { className: "uppy-DashboardContent-titleFile", children: e.meta ? e.meta.name : e.name })
    })
  }), u("button", { className: "uppy-DashboardContent-back", type: "button", onClick: t, children: i.i18n("cancel") }), u("button", { className: "uppy-DashboardContent-save", type: "button", onClick: i.saveFileEditor, children: i.i18n("save") })] }), u("div", { className: "uppy-DashboardContent-panelBody", children: i.editors.map((r) => i.uppy.getPlugin(r.id).render(i.state)) })] });
}
function Hd() {
  return u("svg", { "aria-hidden": "true", focusable: "false", width: "25", height: "25", viewBox: "0 0 25 25", children: u("g", { fill: "#686DE0", fillRule: "evenodd", children: [u("path", { d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z", fillRule: "nonzero" }), u("path", { d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z", fillRule: "nonzero" }), u("circle", { cx: "7.5", cy: "9.5", r: "1.5" })] }) });
}
function jd() {
  return u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "25", height: "25", viewBox: "0 0 25 25", children: u("path", { d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z", fill: "#049BCF", fillRule: "nonzero" }) });
}
function qd() {
  return u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "25", height: "25", viewBox: "0 0 25 25", children: u("path", { d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z", fill: "#19AF67", fillRule: "nonzero" }) });
}
function Wd() {
  return u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "25", height: "25", viewBox: "0 0 25 25", children: u("path", { d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z", fill: "#E2514A", fillRule: "nonzero" }) });
}
function Vd() {
  return u("svg", { "aria-hidden": "true", focusable: "false", width: "25", height: "25", viewBox: "0 0 25 25", children: u("path", { d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z", fill: "#00C469", fillRule: "nonzero" }) });
}
function Gd() {
  return u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "25", height: "25", viewBox: "0 0 25 25", children: u("g", { fill: "#A7AFB7", fillRule: "nonzero", children: [u("path", { d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z" }), u("path", { d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z" })] }) });
}
function Xd() {
  return u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "25", height: "25", viewBox: "0 0 25 25", children: u("path", { d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z", fill: "#5A5E69", fillRule: "nonzero" }) });
}
function ar(i) {
  const e = {
    color: "#838999",
    icon: Gd()
  };
  if (!i)
    return e;
  const t = i.split("/")[0], r = i.split("/")[1];
  return t === "text" ? {
    color: "#5a5e69",
    icon: Xd()
  } : t === "image" ? {
    color: "#686de0",
    icon: Hd()
  } : t === "audio" ? {
    color: "#068dbb",
    icon: jd()
  } : t === "video" ? {
    color: "#19af67",
    icon: qd()
  } : t === "application" && r === "pdf" ? {
    color: "#e25149",
    icon: Wd()
  } : t === "application" && [
    "zip",
    "x-7z-compressed",
    "x-zip-compressed",
    "x-rar-compressed",
    "x-tar",
    "x-gzip",
    "x-apple-diskimage"
  ].indexOf(r) !== -1 ? {
    color: "#00C469",
    icon: Vd()
  } : e;
}
function ge(i) {
  const { tagName: e } = i.target;
  if (e === "INPUT" || e === "TEXTAREA") {
    i.stopPropagation();
    return;
  }
  i.preventDefault(), i.stopPropagation();
}
function Yo(i) {
  const { file: e } = i;
  if (e.preview)
    return u("img", { draggable: !1, className: "uppy-Dashboard-Item-previewImg", alt: e.name, src: e.preview });
  const { color: t, icon: r } = ar(e.type);
  return u("div", { className: "uppy-Dashboard-Item-previewIconWrap", children: [u("span", { className: "uppy-Dashboard-Item-previewIcon", style: { color: t }, children: r }), u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-Dashboard-Item-previewIconBg", width: "58", height: "76", viewBox: "0 0 58 76", children: u("rect", { fill: "#FFF", width: "58", height: "76", rx: "3", fillRule: "evenodd" }) })] });
}
function Yd(i) {
  const { computedMetaFields: e, requiredMetaFields: t, updateMeta: r, form: a, formState: o } = i, s = {
    text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input"
  };
  return e.map((n) => {
    const p = `uppy-Dashboard-FileCard-input-${n.id}`, l = t.includes(n.id);
    return u("fieldset", { className: "uppy-Dashboard-FileCard-fieldset", children: [u("label", { className: "uppy-Dashboard-FileCard-label", htmlFor: p, children: n.name }), n.render !== void 0 ? n.render({
      value: o[n.id],
      onChange: (c) => r(c, n.id),
      fieldCSSClasses: s,
      required: l,
      form: a.id
    }, rt) : u("input", { className: s.text, id: p, form: a.id, type: n.type || "text", required: l, value: o[n.id], placeholder: n.placeholder, onInput: (c) => r(c.target.value, n.id), "data-uppy-super-focusable": !0 })] }, n.id);
  });
}
function Kd(i) {
  const { files: e, fileCardFor: t, toggleFileCard: r, saveFileCard: a, metaFields: o, requiredMetaFields: s, openFileEditor: n, i18n: p, i18nArray: l, className: c, canEditFile: d } = i, h = () => typeof o == "function" ? o(e[t]) : o, m = e[t], f = h() ?? [], y = d(m), b = {};
  f.forEach((D) => {
    b[D.id] = m.meta[D.id] ?? "";
  });
  const [w, x] = At(b), _ = Hs((D) => {
    D.preventDefault(), a(w, t);
  }, [a, w, t]), C = (D, k) => {
    x({
      ...w,
      [k]: D
    });
  }, B = () => {
    r(!1);
  }, [g] = At(() => {
    const D = document.createElement("form");
    return D.setAttribute("tabindex", "-1"), D.id = Zi(), D;
  });
  return Pi(() => (document.body.appendChild(g), g.addEventListener("submit", _), () => {
    g.removeEventListener("submit", _), document.body.removeChild(g);
  }), [g, _]), // biome-ignore lint/a11y/noStaticElementInteractions: ...
  u("div", { className: ae("uppy-Dashboard-FileCard", c), "data-uppy-panelType": "FileCard", onDragOver: ge, onDragLeave: ge, onDrop: ge, onPaste: ge, children: [u("div", { className: "uppy-DashboardContent-bar", children: [u("div", {
    className: "uppy-DashboardContent-title",
    // biome-ignore lint/a11y/useSemanticElements: ...
    role: "heading",
    "aria-level": 1,
    children: l("editing", {
      file: u("span", { className: "uppy-DashboardContent-titleFile", children: m.meta ? m.meta.name : m.name })
    })
  }), u("button", { className: "uppy-DashboardContent-back", type: "button", form: g.id, title: p("finishEditingFile"), onClick: B, children: p("cancel") })] }), u("div", { className: "uppy-Dashboard-FileCard-inner", children: [u("div", { className: "uppy-Dashboard-FileCard-preview", style: { backgroundColor: ar(m.type).color }, children: [u(Yo, { file: m }), y && u("button", { type: "button", className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit", onClick: (D) => {
    _(D), n(m);
  }, children: p("editImage") })] }), u("div", { className: "uppy-Dashboard-FileCard-info", children: u(Yd, { computedMetaFields: f, requiredMetaFields: s, updateMeta: C, form: g, formState: w }) }), u("div", { className: "uppy-Dashboard-FileCard-actions", children: [u("button", {
    className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
    // If `form` attribute is supported, we want a submit button to trigger the form validation.
    // Otherwise, fallback to a classic button with a onClick event handler.
    type: "submit",
    form: g.id,
    children: p("saveChanges")
  }), u("button", { className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn", type: "button", onClick: B, form: g.id, children: p("cancel") })] })] })] });
}
function Zd(i, e) {
  if (i === e)
    return !0;
  if (!i || !e)
    return !1;
  const t = Object.keys(i), r = Object.keys(e), a = t.length;
  if (r.length !== a)
    return !1;
  for (let o = 0; o < a; o++) {
    const s = t[o];
    if (i[s] !== e[s] || !Object.prototype.hasOwnProperty.call(e, s))
      return !1;
  }
  return !0;
}
function Qd(i, e = "Copy the URL below") {
  return new Promise((t) => {
    const r = document.createElement("textarea");
    r.setAttribute("style", {
      position: "fixed",
      top: 0,
      left: 0,
      width: "2em",
      height: "2em",
      padding: 0,
      border: "none",
      outline: "none",
      boxShadow: "none",
      background: "transparent"
    }), r.value = i, document.body.appendChild(r), r.select();
    const a = () => {
      document.body.removeChild(r), window.prompt(e, i), t();
    };
    try {
      return document.execCommand("copy") ? (document.body.removeChild(r), t()) : a();
    } catch {
      return document.body.removeChild(r), a();
    }
  });
}
function Jd({ file: i, uploadInProgressOrComplete: e, metaFields: t, canEditFile: r, i18n: a, onClick: o }) {
  return !e && t && t.length > 0 || !e && r(i) ? u("button", { className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit", type: "button", "aria-label": a("editFileWithFilename", { file: i.meta.name }), title: a("editFileWithFilename", { file: i.meta.name }), onClick: () => o(), children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "14", height: "14", viewBox: "0 0 14 14", children: u("g", { fillRule: "evenodd", children: [u("path", { d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z", fillRule: "nonzero" }), u("rect", { x: "1", y: "12.293", width: "11", height: "1", rx: ".5" }), u("path", { fillRule: "nonzero", d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z" })] }) }) }) : null;
}
function eu({ i18n: i, onClick: e, file: t }) {
  return u("button", { className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove", type: "button", "aria-label": i("removeFile", { file: t.meta.name }), title: i("removeFile", { file: t.meta.name }), onClick: () => e(), children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "18", height: "18", viewBox: "0 0 18 18", children: [u("path", { d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z" }), u("path", { fill: "#FFF", d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z" })] }) });
}
function tu({ file: i, uppy: e, i18n: t }) {
  const r = (a) => {
    Qd(i.uploadURL, t("copyLinkToClipboardFallback")).then(() => {
      e.log("Link copied to clipboard."), e.info(t("copyLinkToClipboardSuccess"), "info", 3e3);
    }).catch(e.log).then(() => a.target.focus({ preventScroll: !0 }));
  };
  return u("button", { className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink", type: "button", "aria-label": t("copyLink"), title: t("copyLink"), onClick: (a) => r(a), children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "14", height: "14", viewBox: "0 0 14 12", children: u("path", { d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z" }) }) });
}
function iu(i) {
  const { uppy: e, file: t, uploadInProgressOrComplete: r, canEditFile: a, metaFields: o, showLinkToFileUploadResult: s, showRemoveButton: n, i18n: p, toggleFileCard: l, openFileEditor: c } = i;
  return u("div", { className: "uppy-Dashboard-Item-actionWrapper", children: [u(Jd, { i18n: p, file: t, uploadInProgressOrComplete: r, canEditFile: a, metaFields: o, onClick: () => {
    o && o.length > 0 ? l(!0, t.id) : c(t);
  } }), s && t.uploadURL ? u(tu, { file: t, uppy: e, i18n: p }) : null, n ? u(eu, { i18n: p, file: t, onClick: () => e.removeFile(t.id) }) : null] });
}
const gi = "...";
function Ko(i, e) {
  if (e === 0)
    return "";
  if (i.length <= e)
    return i;
  if (e <= gi.length + 1)
    return `${i.slice(0, e - 1)}…`;
  const t = e - gi.length, r = Math.ceil(t / 2), a = Math.floor(t / 2);
  return i.slice(0, r) + gi + i.slice(-a);
}
const ru = (i, e) => (typeof e == "function" ? e() : e).filter((a) => a.id === i)[0].name;
function Zo(i) {
  const { file: e, toggleFileCard: t, i18n: r, metaFields: a } = i, { missingRequiredMetaFields: o } = e;
  if (!o?.length)
    return null;
  const s = o.map((n) => ru(n, a)).join(", ");
  return u("div", { className: "uppy-Dashboard-Item-errorMessage", children: [r("missingRequiredMetaFields", {
    smart_count: o.length,
    fields: s
  }), " ", u("button", { type: "button", class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn", onClick: () => t(!0, e.id), children: r("editFile") })] });
}
const au = (i) => {
  const { author: e, name: t } = i.file.meta;
  function r() {
    return i.isSingleFile && i.containerHeight >= 350 ? 90 : i.containerWidth <= 352 ? 35 : i.containerWidth <= 576 ? 60 : e ? 20 : 30;
  }
  return u("div", { className: "uppy-Dashboard-Item-name", title: t, children: Ko(t, r()) });
}, ou = (i) => {
  const { author: e } = i.file.meta, t = i.file.remote?.providerName, r = "·";
  return e ? u("div", { className: "uppy-Dashboard-Item-author", children: [u("a", { href: `${e.url}?utm_source=Companion&utm_medium=referral`, target: "_blank", rel: "noopener noreferrer", children: Ko(e.name, 13) }), t ? u(re, { children: [` ${r} `, t, ` ${r} `] }) : null] }) : null;
}, su = (i) => i.file.size && u("div", { className: "uppy-Dashboard-Item-statusSize", children: ce(i.file.size) }), nu = (i) => i.file.isGhost && u("span", { children: [" • ", u("button", { className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect", type: "button", onClick: () => i.toggleAddFilesPanel(!0), children: i.i18n("reSelect") })] }), lu = ({ file: i, onClick: e }) => i.error ? u("button", { className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-errorDetails", "aria-label": i.error, "data-microtip-position": "bottom", "data-microtip-size": "medium", onClick: e, type: "button", children: "?" }) : null;
function pu(i) {
  const { file: e, i18n: t, toggleFileCard: r, metaFields: a, toggleAddFilesPanel: o, isSingleFile: s, containerHeight: n, containerWidth: p } = i;
  return u("div", { className: "uppy-Dashboard-Item-fileInfo", "data-uppy-file-source": e.source, children: [u("div", { className: "uppy-Dashboard-Item-fileName", children: [au({
    file: e,
    isSingleFile: s,
    containerHeight: n,
    containerWidth: p
  }), u(lu, { file: e, onClick: () => alert(e.error) })] }), u("div", { className: "uppy-Dashboard-Item-status", children: [ou({ file: e }), su({ file: e }), nu({ file: e, toggleAddFilesPanel: o, i18n: t })] }), u(Zo, { file: e, i18n: t, toggleFileCard: r, metaFields: a })] });
}
function du(i) {
  const { file: e, i18n: t, toggleFileCard: r, metaFields: a, showLinkToFileUploadResult: o } = i, n = e.preview ? "rgba(255, 255, 255, 0.5)" : ar(e.type).color;
  return u("div", { className: "uppy-Dashboard-Item-previewInnerWrap", style: { backgroundColor: n }, children: [o && e.uploadURL && u("a", { className: "uppy-Dashboard-Item-previewLink", href: e.uploadURL, rel: "noreferrer noopener", target: "_blank", "aria-label": e.meta.name, children: u("span", { hidden: !0, children: e.meta.name }) }), u(Yo, { file: e }), u(Zo, { file: e, i18n: t, toggleFileCard: r, metaFields: a })] });
}
function uu(i) {
  if (!i.isUploaded) {
    if (i.error && !i.hideRetryButton) {
      i.uppy.retryUpload(i.file.id);
      return;
    }
    i.resumableUploads && !i.hidePauseResumeButton ? i.uppy.pauseResume(i.file.id) : i.individualCancellation && !i.hideCancelButton && i.uppy.removeFile(i.file.id);
  }
}
function Pa(i) {
  return i.isUploaded ? i.i18n("uploadComplete") : i.error ? i.i18n("retryUpload") : i.resumableUploads ? i.file.isPaused ? i.i18n("resumeUpload") : i.i18n("pauseUpload") : i.individualCancellation ? i.i18n("cancelUpload") : "";
}
function yi(i) {
  return u("div", { className: "uppy-Dashboard-Item-progress", children: u("button", { className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-progressIndicator", type: "button", "aria-label": Pa(i), title: Pa(i), onClick: () => uu(i), children: i.children }) });
}
function Dt({ children: i }) {
  return u("svg", { "aria-hidden": "true", focusable: "false", width: "70", height: "70", viewBox: "0 0 36 36", className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle", children: i });
}
function bi({ progress: i }) {
  const e = 2 * Math.PI * 15;
  return u("g", { children: [u("circle", { className: "uppy-Dashboard-Item-progressIcon--bg", r: "15", cx: "18", cy: "18", "stroke-width": "2", fill: "none" }), u("circle", { className: "uppy-Dashboard-Item-progressIcon--progress", r: "15", cx: "18", cy: "18", transform: "rotate(-90, 18, 18)", fill: "none", "stroke-width": "2", "stroke-dasharray": e, "stroke-dashoffset": e - e / 100 * i })] });
}
function cu(i) {
  return !i.file.progress.uploadStarted || i.file.progress.percentage === void 0 ? null : i.isUploaded ? u("div", { className: "uppy-Dashboard-Item-progress", children: u("div", { className: "uppy-Dashboard-Item-progressIndicator", children: u(Dt, { children: [u("circle", { r: "15", cx: "18", cy: "18", fill: "#1bb240" }), u("polygon", { className: "uppy-Dashboard-Item-progressIcon--check", transform: "translate(2, 3)", points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634" })] }) }) }) : i.recoveredState ? null : i.error && !i.hideRetryButton ? u(yi, { ...i, children: u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry", width: "28", height: "31", viewBox: "0 0 16 19", children: [u("path", { d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z" }), u("path", { d: "M7.9 3H10v2H7.9z" }), u("path", { d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z" }), u("path", { d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z" })] }) }) : i.resumableUploads && !i.hidePauseResumeButton ? u(yi, { ...i, children: u(Dt, { children: [u(bi, { progress: i.file.progress.percentage }), i.file.isPaused ? u("polygon", { className: "uppy-Dashboard-Item-progressIcon--play", transform: "translate(3, 3)", points: "12 20 12 10 20 15" }) : u("g", { className: "uppy-Dashboard-Item-progressIcon--pause", transform: "translate(14.5, 13)", children: [u("rect", { x: "0", y: "0", width: "2", height: "10", rx: "0" }), u("rect", { x: "5", y: "0", width: "2", height: "10", rx: "0" })] })] }) }) : !i.resumableUploads && i.individualCancellation && !i.hideCancelButton ? u(yi, { ...i, children: u(Dt, { children: [u(bi, { progress: i.file.progress.percentage }), u("polygon", { className: "cancel", transform: "translate(2, 2)", points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12" })] }) }) : u("div", { className: "uppy-Dashboard-Item-progress", children: u("div", { className: "uppy-Dashboard-Item-progressIndicator", children: u(Dt, { children: u(bi, { progress: i.file.progress.percentage }) }) }) });
}
class hu extends X {
  componentDidMount() {
    const { file: e } = this.props;
    e.preview || this.props.handleRequestThumbnail(e);
  }
  shouldComponentUpdate(e) {
    return !Zd(this.props, e);
  }
  // VirtualList mounts FileItems again and they emit `thumbnail:request`
  // Otherwise thumbnails are broken or missing after Golden Retriever restores files
  componentDidUpdate() {
    const { file: e } = this.props;
    e.preview || this.props.handleRequestThumbnail(e);
  }
  componentWillUnmount() {
    const { file: e } = this.props;
    e.preview || this.props.handleCancelThumbnail(e);
  }
  render() {
    const { file: e } = this.props, t = e.progress.preprocess || e.progress.postprocess, r = !!e.progress.uploadComplete && !t && !e.error, a = !!e.progress.uploadStarted || !!t, o = e.progress.uploadStarted && !e.progress.uploadComplete || t, s = e.error || !1, { isGhost: n } = e;
    let p = (this.props.individualCancellation || !o) && !r;
    r && this.props.showRemoveButtonAfterComplete && (p = !0);
    const l = ae({
      "uppy-Dashboard-Item": !0,
      "is-inprogress": o && !this.props.recoveredState,
      "is-processing": t,
      "is-complete": r,
      "is-error": !!s,
      "is-resumable": this.props.resumableUploads,
      "is-noIndividualCancellation": !this.props.individualCancellation,
      "is-ghost": n
    });
    return u("div", { className: l, id: `uppy_${e.id}`, role: this.props.role, children: [u("div", { className: "uppy-Dashboard-Item-preview", children: [u(du, { file: e, showLinkToFileUploadResult: this.props.showLinkToFileUploadResult, i18n: this.props.i18n, toggleFileCard: this.props.toggleFileCard, metaFields: this.props.metaFields }), u(cu, { uppy: this.props.uppy, file: e, error: s, isUploaded: r, hideRetryButton: this.props.hideRetryButton, hideCancelButton: this.props.hideCancelButton, hidePauseResumeButton: this.props.hidePauseResumeButton, recoveredState: this.props.recoveredState, resumableUploads: this.props.resumableUploads, individualCancellation: this.props.individualCancellation, i18n: this.props.i18n })] }), u("div", { className: "uppy-Dashboard-Item-fileInfoAndButtons", children: [u(pu, { file: e, containerWidth: this.props.containerWidth, containerHeight: this.props.containerHeight, i18n: this.props.i18n, toggleAddFilesPanel: this.props.toggleAddFilesPanel, toggleFileCard: this.props.toggleFileCard, metaFields: this.props.metaFields, isSingleFile: this.props.isSingleFile }), u(iu, { file: e, metaFields: this.props.metaFields, showLinkToFileUploadResult: this.props.showLinkToFileUploadResult, showRemoveButton: p, canEditFile: this.props.canEditFile, uploadInProgressOrComplete: a, toggleFileCard: this.props.toggleFileCard, openFileEditor: this.props.openFileEditor, uppy: this.props.uppy, i18n: this.props.i18n })] })] });
  }
}
function fu(i, e) {
  const t = [];
  let r = [];
  return i.forEach((a) => {
    r.length < e ? r.push(a) : (t.push(r), r = [a]);
  }), r.length && t.push(r), t;
}
function mu({ id: i, i18n: e, uppy: t, files: r, resumableUploads: a, hideRetryButton: o, hidePauseResumeButton: s, hideCancelButton: n, showLinkToFileUploadResult: p, showRemoveButtonAfterComplete: l, metaFields: c, isSingleFile: d, toggleFileCard: h, handleRequestThumbnail: m, handleCancelThumbnail: f, recoveredState: y, individualCancellation: b, itemsPerRow: w, openFileEditor: x, canEditFile: _, toggleAddFilesPanel: C, containerWidth: B, containerHeight: g }) {
  const D = w === 1 ? (
    // Mobile
    71
  ) : (
    // 190px height + 2 * 5px margin
    200
  ), k = Yi(() => {
    const O = (M, F) => Number(r[F].isGhost) - Number(r[M].isGhost), T = Object.keys(r);
    return y && T.sort(O), fu(T, w);
  }, [r, w, y]), S = (O) => u("div", {
    class: "uppy-Dashboard-filesInner",
    // The `role="presentation` attribute ensures that the list items are properly
    // associated with the `VirtualList` element.
    role: "presentation",
    children: O.map((T) => u(hu, {
      uppy: t,
      // FIXME This is confusing, it's actually the Dashboard's plugin ID
      id: i,
      // TODO move this to context
      i18n: e,
      // features
      resumableUploads: a,
      individualCancellation: b,
      // visual options
      hideRetryButton: o,
      hidePauseResumeButton: s,
      hideCancelButton: n,
      showLinkToFileUploadResult: p,
      showRemoveButtonAfterComplete: l,
      metaFields: c,
      recoveredState: y,
      isSingleFile: d,
      containerWidth: B,
      containerHeight: g,
      // callbacks
      toggleFileCard: h,
      handleRequestThumbnail: m,
      handleCancelThumbnail: f,
      role: "listitem",
      openFileEditor: x,
      canEditFile: _,
      toggleAddFilesPanel: C,
      file: r[T]
    }, T))
  }, O[0]);
  return d ? u("div", { class: "uppy-Dashboard-files", children: S(k[0]) }) : u(ql, { class: "uppy-Dashboard-files", role: "list", data: k, renderRow: S, rowHeight: D });
}
function gu({ activePickerPanel: i, className: e, hideAllPanels: t, i18n: r, state: a, uppy: o }) {
  const s = Ft(null);
  return u("div", { className: ae("uppy-DashboardContent-panel", e), role: "tabpanel", "data-uppy-panelType": "PickerPanel", id: `uppy-DashboardContent-panel--${i.id}`, onDragOver: ge, onDragLeave: ge, onDrop: ge, onPaste: ge, children: [u("div", { className: "uppy-DashboardContent-bar", children: [u("div", {
    className: "uppy-DashboardContent-title",
    // biome-ignore lint/a11y/useSemanticElements: ...
    role: "heading",
    "aria-level": 1,
    children: r("importFrom", { name: i.name })
  }), u("button", { className: "uppy-DashboardContent-back", type: "button", onClick: t, children: r("cancel") })] }), u("div", { ref: s, className: "uppy-DashboardContent-panelBody", children: o.getPlugin(i.id).render(a, s.current) })] });
}
const se = {
  STATE_ERROR: "error",
  STATE_WAITING: "waiting",
  STATE_PREPROCESSING: "preprocessing",
  STATE_UPLOADING: "uploading",
  STATE_POSTPROCESSING: "postprocessing",
  STATE_COMPLETE: "complete",
  STATE_PAUSED: "paused"
};
function yu(i, e, t, r = {}) {
  if (i)
    return se.STATE_ERROR;
  if (e)
    return se.STATE_COMPLETE;
  if (t)
    return se.STATE_PAUSED;
  let a = se.STATE_WAITING;
  const o = Object.keys(r);
  for (let s = 0; s < o.length; s++) {
    const { progress: n } = r[o[s]];
    if (n.uploadStarted && !n.uploadComplete)
      return se.STATE_UPLOADING;
    n.preprocess && a !== se.STATE_UPLOADING && (a = se.STATE_PREPROCESSING), n.postprocess && a !== se.STATE_UPLOADING && a !== se.STATE_PREPROCESSING && (a = se.STATE_POSTPROCESSING);
  }
  return a;
}
function bu({ files: i, i18n: e, isAllComplete: t, isAllErrored: r, isAllPaused: a, inProgressNotPausedFiles: o, newFiles: s, processingFiles: n }) {
  switch (yu(r, t, a, i)) {
    case "uploading":
      return e("uploadingXFiles", {
        smart_count: o.length
      });
    case "preprocessing":
    case "postprocessing":
      return e("processingXFiles", { smart_count: n.length });
    case "paused":
      return e("uploadPaused");
    case "waiting":
      return e("xFilesSelected", { smart_count: s.length });
    case "complete":
      return e("uploadComplete");
    case "error":
      return e("error");
  }
}
function vu(i) {
  const { i18n: e, isAllComplete: t, hideCancelButton: r, maxNumberOfFiles: a, toggleAddFilesPanel: o, uppy: s } = i;
  let { allowNewUpload: n } = i;
  return n && a && (n = i.totalFileCount < i.maxNumberOfFiles), u("div", { className: "uppy-DashboardContent-bar", children: [!t && !r ? u("button", { className: "uppy-DashboardContent-back", type: "button", onClick: () => s.cancelAll(), children: e("cancel") }) : u("div", {}), u("div", { className: "uppy-DashboardContent-title", children: u(bu, { ...i }) }), n ? u("button", { className: "uppy-DashboardContent-addMore", type: "button", "aria-label": e("addMoreFiles"), title: e("addMoreFiles"), onClick: () => o(!0), children: [u("svg", { "aria-hidden": "true", focusable: "false", className: "uppy-c-icon", width: "15", height: "15", viewBox: "0 0 15 15", children: u("path", { d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z" }) }), u("span", { className: "uppy-DashboardContent-addMoreCaption", children: e("addMore") })] }) : u("div", {})] });
}
const Ee = "uppy-transition-slideDownUp", Ca = 250;
function kt({ children: i }) {
  const [e, t] = At(null), [r, a] = At(""), o = Ft(), s = Ft(), n = Ft(), p = () => {
    a(`${Ee}-enter`), cancelAnimationFrame(n.current), clearTimeout(s.current), s.current = void 0, n.current = requestAnimationFrame(() => {
      a(`${Ee}-enter ${Ee}-enter-active`), o.current = setTimeout(() => {
        a("");
      }, Ca);
    });
  }, l = () => {
    a(`${Ee}-leave`), cancelAnimationFrame(n.current), clearTimeout(o.current), o.current = void 0, n.current = requestAnimationFrame(() => {
      a(`${Ee}-leave ${Ee}-leave-active`), s.current = setTimeout(() => {
        t(null), a("");
      }, Ca);
    });
  };
  return Pi(() => {
    const c = te(i)[0];
    e !== c && (c && !e ? p() : e && !c && !s.current && l(), t(c));
  }, [i, e]), Pi(() => () => {
    clearTimeout(o.current), clearTimeout(s.current), cancelAnimationFrame(n.current);
  }, []), e ? Do(e, {
    className: ae(r, e.props.className)
  }) : null;
}
const Ba = 900, Ia = 700, vi = 576, Fa = 330;
function wu(i) {
  const e = i.totalFileCount === 0, t = i.totalFileCount === 1, r = i.containerWidth > vi, a = i.containerHeight > Fa, o = ae({
    "uppy-Dashboard": !0,
    "uppy-Dashboard--isDisabled": i.disabled,
    "uppy-Dashboard--animateOpenClose": i.animateOpenClose,
    "uppy-Dashboard--isClosing": i.isClosing,
    "uppy-Dashboard--isDraggingOver": i.isDraggingOver,
    "uppy-Dashboard--modal": !i.inline,
    "uppy-size--md": i.containerWidth > vi,
    "uppy-size--lg": i.containerWidth > Ia,
    "uppy-size--xl": i.containerWidth > Ba,
    "uppy-size--height-md": i.containerHeight > Fa,
    // We might want to enable this in the future
    // 'uppy-size--height-lg': props.containerHeight > HEIGHT_LG,
    // 'uppy-size--height-xl': props.containerHeight > HEIGHT_XL,
    "uppy-Dashboard--isAddFilesPanelVisible": i.showAddFilesPanel,
    "uppy-Dashboard--isInnerWrapVisible": i.areInsidesReadyToBeVisible,
    // Only enable “centered single file” mode when Dashboard is tall enough
    "uppy-Dashboard--singleFile": i.singleFileFullScreen && t && a
  });
  let s = 1;
  i.containerWidth > Ba ? s = 5 : i.containerWidth > Ia ? s = 4 : i.containerWidth > vi && (s = 3);
  const n = i.showSelectedFiles && !e, p = i.recoveredState ? Object.keys(i.recoveredState.files).length : null, l = i.files ? Object.keys(i.files).filter((h) => i.files[h].isGhost).length : 0, c = () => l > 0 ? i.i18n("recoveredXFiles", {
    smart_count: l
  }) : i.i18n("recoveredAllFiles");
  return (
    // biome-ignore lint/a11y/useAriaPropsSupportedByRole: ...
    u("div", { className: o, "data-uppy-theme": i.theme, "data-uppy-num-acquirers": i.acquirers.length, "data-uppy-drag-drop-supported": !i.disableLocalFiles && Ud(), "aria-hidden": i.inline ? "false" : i.isHidden, "aria-disabled": i.disabled, "aria-label": i.inline ? i.i18n("dashboardTitle") : i.i18n("dashboardWindowTitle"), onPaste: i.handlePaste, onDragOver: i.handleDragOver, onDragLeave: i.handleDragLeave, onDrop: i.handleDrop, children: [u("div", { "aria-hidden": "true", className: "uppy-Dashboard-overlay", tabIndex: -1, onClick: i.handleClickOutside }), u("div", { className: "uppy-Dashboard-inner", role: i.inline ? void 0 : "dialog", style: {
      width: i.inline && i.width ? i.width : "",
      height: i.inline && i.height ? i.height : ""
    }, children: [i.inline ? null : u("button", { className: "uppy-u-reset uppy-Dashboard-close", type: "button", "aria-label": i.i18n("closeModal"), title: i.i18n("closeModal"), onClick: i.closeModal, children: u("span", { "aria-hidden": "true", children: "×" }) }), u("div", { className: "uppy-Dashboard-innerWrap", children: [u("div", { className: "uppy-Dashboard-dropFilesHereHint", children: i.i18n("dropHint") }), n && u(vu, { ...i }), p && u("div", { className: "uppy-Dashboard-serviceMsg", children: [u("svg", { className: "uppy-Dashboard-serviceMsg-icon", "aria-hidden": "true", focusable: "false", width: "21", height: "16", viewBox: "0 0 24 19", children: u("g", { transform: "translate(0 -1)", fill: "none", fillRule: "evenodd", children: [u("path", { d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z", fill: "#FFD300" }), u("path", { fill: "#000", d: "M11 6h2l-.3 8h-1.4z" }), u("circle", { fill: "#000", cx: "12", cy: "17", r: "1" })] }) }), u("strong", { className: "uppy-Dashboard-serviceMsg-title", children: i.i18n("sessionRestored") }), u("div", { className: "uppy-Dashboard-serviceMsg-text", children: c() })] }), n ? u(mu, { id: i.id, i18n: i.i18n, uppy: i.uppy, files: i.files, resumableUploads: i.resumableUploads, hideRetryButton: i.hideRetryButton, hidePauseResumeButton: i.hidePauseResumeButton, hideCancelButton: i.hideCancelButton, showLinkToFileUploadResult: i.showLinkToFileUploadResult, showRemoveButtonAfterComplete: i.showRemoveButtonAfterComplete, metaFields: i.metaFields, toggleFileCard: i.toggleFileCard, handleRequestThumbnail: i.handleRequestThumbnail, handleCancelThumbnail: i.handleCancelThumbnail, recoveredState: i.recoveredState, individualCancellation: i.individualCancellation, openFileEditor: i.openFileEditor, canEditFile: i.canEditFile, toggleAddFilesPanel: i.toggleAddFilesPanel, isSingleFile: t, itemsPerRow: s, containerWidth: i.containerWidth, containerHeight: i.containerHeight }) : u(Xo, { i18n: i.i18n, i18nArray: i.i18nArray, acquirers: i.acquirers, handleInputChange: i.handleInputChange, maxNumberOfFiles: i.maxNumberOfFiles, allowedFileTypes: i.allowedFileTypes, showNativePhotoCameraButton: i.showNativePhotoCameraButton, showNativeVideoCameraButton: i.showNativeVideoCameraButton, nativeCameraFacingMode: i.nativeCameraFacingMode, showPanel: i.showPanel, activePickerPanel: i.activePickerPanel, disableLocalFiles: i.disableLocalFiles, fileManagerSelectionType: i.fileManagerSelectionType, note: i.note, proudlyDisplayPoweredByUppy: i.proudlyDisplayPoweredByUppy }), u(kt, { children: i.showAddFilesPanel ? u($d, { ...i, isSizeMD: r }, "AddFiles") : null }), u(kt, { children: i.fileCardFor ? u(Kd, { ...i }, "FileCard") : null }), u(kt, { children: i.activePickerPanel ? u(gu, { ...i }, "Picker") : null }), u(kt, { children: i.showFileEditor ? u(Ld, { ...i }, "Editor") : null }), u("div", { className: "uppy-Dashboard-progressindicators", children: i.progressindicators.map((h) => i.uppy.getPlugin(h.id).render(i.state)) })] })] })] })
  );
}
const xu = {
  strings: {
    // When `inline: false`, used as the screen reader label for the button that closes the modal.
    closeModal: "Close Modal",
    // Used as the screen reader label for the plus (+) button that shows the “Add more files” screen
    addMoreFiles: "Add more files",
    addingMoreFiles: "Adding more files",
    // Used as the header for import panels, e.g., “Import from Google Drive”.
    importFrom: "Import from %{name}",
    // When `inline: false`, used as the screen reader label for the dashboard modal.
    dashboardWindowTitle: "Uppy Dashboard Window (Press escape to close)",
    // When `inline: true`, used as the screen reader label for the dashboard area.
    dashboardTitle: "Uppy Dashboard",
    // Shown in the Informer when a link to a file was copied to the clipboard.
    copyLinkToClipboardSuccess: "Link copied to clipboard.",
    // Used when a link cannot be copied automatically — the user has to select the text from the
    // input element below this string.
    copyLinkToClipboardFallback: "Copy the URL below",
    // Used as the hover title and screen reader label for buttons that copy a file link.
    copyLink: "Copy link",
    back: "Back",
    // Used as the screen reader label for buttons that remove a file.
    removeFile: "Remove file",
    // Used as the screen reader label for buttons that open the metadata editor panel for a file.
    editFile: "Edit file",
    editImage: "Edit image",
    // Shown in the panel header for the metadata editor. Rendered as “Editing image.png”.
    editing: "Editing %{file}",
    // Shown on the main upload screen when an upload error occurs
    error: "Error",
    // Used as the screen reader label for the button that saves metadata edits and returns to the
    // file list view.
    finishEditingFile: "Finish editing file",
    saveChanges: "Save changes",
    // Used as the label for the tab button that opens the system file selection dialog.
    myDevice: "My Device",
    dropHint: "Drop your files here",
    // Used as the hover text and screen reader label for file progress indicators when
    // they have been fully uploaded.
    uploadComplete: "Upload complete",
    uploadPaused: "Upload paused",
    // Used as the hover text and screen reader label for the buttons to resume paused uploads.
    resumeUpload: "Resume upload",
    // Used as the hover text and screen reader label for the buttons to pause uploads.
    pauseUpload: "Pause upload",
    // Used as the hover text and screen reader label for the buttons to retry failed uploads.
    retryUpload: "Retry upload",
    // Used as the hover text and screen reader label for the buttons to cancel uploads.
    cancelUpload: "Cancel upload",
    // Used in a title, how many files are currently selected
    xFilesSelected: {
      0: "%{smart_count} file selected",
      1: "%{smart_count} files selected"
    },
    uploadingXFiles: {
      0: "Uploading %{smart_count} file",
      1: "Uploading %{smart_count} files"
    },
    processingXFiles: {
      0: "Processing %{smart_count} file",
      1: "Processing %{smart_count} files"
    },
    // The "powered by Uppy" link at the bottom of the Dashboard.
    poweredBy: "Powered by %{uppy}",
    addMore: "Add more",
    editFileWithFilename: "Edit file %{file}",
    save: "Save",
    cancel: "Cancel",
    dropPasteFiles: "Drop files here or %{browseFiles}",
    dropPasteFolders: "Drop files here or %{browseFolders}",
    dropPasteBoth: "Drop files here, %{browseFiles} or %{browseFolders}",
    dropPasteImportFiles: "Drop files here, %{browseFiles} or import from:",
    dropPasteImportFolders: "Drop files here, %{browseFolders} or import from:",
    dropPasteImportBoth: "Drop files here, %{browseFiles}, %{browseFolders} or import from:",
    importFiles: "Import files from:",
    browseFiles: "browse files",
    browseFolders: "browse folders",
    recoveredXFiles: {
      0: "We could not fully recover 1 file. Please re-select it and resume the upload.",
      1: "We could not fully recover %{smart_count} files. Please re-select them and resume the upload."
    },
    recoveredAllFiles: "We restored all files. You can now resume the upload.",
    sessionRestored: "Session restored",
    reSelect: "Re-select",
    missingRequiredMetaFields: {
      0: "Missing required meta field: %{fields}.",
      1: "Missing required meta fields: %{fields}."
    },
    // Used for native device camera buttons on mobile
    takePictureBtn: "Take Picture",
    recordVideoBtn: "Record Video"
  }
}, Qo = [
  'a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  "input:not([disabled]):not([inert]):not([aria-hidden])",
  "select:not([disabled]):not([inert]):not([aria-hidden])",
  "textarea:not([disabled]):not([inert]):not([aria-hidden])",
  "button:not([disabled]):not([inert]):not([aria-hidden])",
  'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])',
  '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'
];
var _u = Ao();
const Du = /* @__PURE__ */ $e(_u);
function Jo(i, e) {
  if (e) {
    const t = i.querySelector(`[data-uppy-paneltype="${e}"]`);
    if (t)
      return t;
  }
  return i;
}
function ku() {
  let i = !1;
  return Du((t, r) => {
    const a = Jo(t, r), o = a.contains(document.activeElement);
    if (o && i)
      return;
    const s = a.querySelector("[data-uppy-super-focusable]");
    o && !s || (s ? (s.focus({ preventScroll: !0 }), i = !0) : (a.querySelector(Qo)?.focus({ preventScroll: !0 }), i = !1));
  }, 260);
}
function Ta(i, e) {
  const t = e[0];
  t && (t.focus(), i.preventDefault());
}
function Su(i, e) {
  const t = e[e.length - 1];
  t && (t.focus(), i.preventDefault());
}
function Pu(i) {
  return i.contains(document.activeElement);
}
function es(i, e, t) {
  const r = Jo(t, e), a = et(r.querySelectorAll(Qo)), o = a.indexOf(document.activeElement);
  Pu(r) ? i.shiftKey && o === 0 ? Su(i, a) : !i.shiftKey && o === a.length - 1 && Ta(i, a) : Ta(i, a);
}
function Cu(i, e, t) {
  e === null || es(i, e, t);
}
const Ea = 9, Bu = 27;
function Aa() {
  const i = {};
  return i.promise = new Promise((e, t) => {
    i.resolve = e, i.reject = t;
  }), i;
}
const Iu = {
  target: "body",
  metaFields: [],
  thumbnailWidth: 280,
  thumbnailType: "image/jpeg",
  waitForThumbnailsBeforeUpload: !1,
  defaultPickerIcon: Wl,
  showLinkToFileUploadResult: !1,
  showProgressDetails: !1,
  hideUploadButton: !1,
  hideCancelButton: !1,
  hideRetryButton: !1,
  hidePauseResumeButton: !1,
  hideProgressAfterFinish: !1,
  note: null,
  singleFileFullScreen: !0,
  disableStatusBar: !1,
  disableInformer: !1,
  disableThumbnailGenerator: !1,
  fileManagerSelectionType: "files",
  proudlyDisplayPoweredByUppy: !0,
  showSelectedFiles: !0,
  showRemoveButtonAfterComplete: !1,
  showNativePhotoCameraButton: !1,
  showNativeVideoCameraButton: !1,
  theme: "light",
  autoOpen: null,
  disabled: !1,
  disableLocalFiles: !1,
  nativeCameraFacingMode: "",
  onDragLeave: () => {
  },
  onDragOver: () => {
  },
  onDrop: () => {
  },
  plugins: [],
  // Dynamic default options, they have to be defined in the constructor (because
  // they require access to the `this` keyword), but we still want them to
  // appear in the default options so TS knows they'll be defined.
  doneButtonHandler: void 0,
  onRequestCloseModal: null,
  // defaultModalOptions
  inline: !1,
  animateOpenClose: !0,
  browserBackButtonClose: !1,
  closeAfterFinish: !1,
  closeModalOnClickOutside: !1,
  disablePageScrollWhenModalOpen: !0,
  trigger: null,
  // defaultInlineOptions
  width: 750,
  height: 550
};
class Oa extends ve {
  static VERSION = Nd.version;
  #e;
  modalName = `uppy-Dashboard-${Zi()}`;
  superFocus = ku();
  ifFocusedOnUppyRecently = !1;
  dashboardIsDisabled;
  savedScrollPosition;
  savedActiveElement;
  resizeObserver;
  darkModeMediaQuery;
  // Timeouts
  makeDashboardInsidesVisibleAnywayTimeout;
  constructor(e, t) {
    const r = t?.autoOpen ?? null;
    super(e, { ...Iu, ...t, autoOpen: r }), this.id = this.opts.id || "Dashboard", this.title = "Dashboard", this.type = "orchestrator", this.defaultLocale = xu, this.opts.doneButtonHandler === void 0 && (this.opts.doneButtonHandler = () => {
      this.uppy.clear(), this.requestCloseModal();
    }), this.opts.onRequestCloseModal ??= () => this.closeModal(), this.i18nInit();
  }
  removeTarget = (e) => {
    const r = this.getPluginState().targets.filter((a) => a.id !== e.id);
    this.setPluginState({
      targets: r
    });
  };
  addTarget = (e) => {
    const t = e.id || e.constructor.name, r = e.title || t, a = e.type;
    if (a !== "acquirer" && a !== "progressindicator" && a !== "editor")
      return this.uppy.log("Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor", "error"), null;
    const o = {
      id: t,
      name: r,
      type: a
    }, n = this.getPluginState().targets.slice();
    return n.push(o), this.setPluginState({
      targets: n
    }), this.el;
  };
  hideAllPanels = () => {
    const e = this.getPluginState(), t = {
      activePickerPanel: void 0,
      showAddFilesPanel: !1,
      activeOverlayType: null,
      fileCardFor: null,
      showFileEditor: !1
    };
    e.activePickerPanel === t.activePickerPanel && e.showAddFilesPanel === t.showAddFilesPanel && e.showFileEditor === t.showFileEditor && e.activeOverlayType === t.activeOverlayType || (this.setPluginState(t), this.uppy.emit("dashboard:close-panel", e.activePickerPanel?.id));
  };
  showPanel = (e) => {
    const { targets: t } = this.getPluginState(), r = t.find((a) => a.type === "acquirer" && a.id === e);
    this.setPluginState({
      activePickerPanel: r,
      activeOverlayType: "PickerPanel"
    }), this.uppy.emit("dashboard:show-panel", e);
  };
  canEditFile = (e) => {
    const { targets: t } = this.getPluginState();
    return this.#o(t).some((a) => this.uppy.getPlugin(a.id).canEditFile(e));
  };
  openFileEditor = (e) => {
    const { targets: t } = this.getPluginState(), r = this.#o(t);
    this.setPluginState({
      showFileEditor: !0,
      fileCardFor: e.id || null,
      activeOverlayType: "FileEditor"
    }), r.forEach((a) => {
      this.uppy.getPlugin(a.id).selectFile(e);
    });
  };
  closeFileEditor = () => {
    const { metaFields: e } = this.getPluginState();
    e && e.length > 0 ? this.setPluginState({
      showFileEditor: !1,
      activeOverlayType: "FileCard"
    }) : this.setPluginState({
      showFileEditor: !1,
      fileCardFor: null,
      activeOverlayType: "AddFiles"
    });
  };
  saveFileEditor = () => {
    const { targets: e } = this.getPluginState();
    this.#o(e).forEach((r) => {
      this.uppy.getPlugin(r.id).save();
    }), this.closeFileEditor();
  };
  openModal = () => {
    const { promise: e, resolve: t } = Aa();
    if (this.savedScrollPosition = window.pageYOffset, this.savedActiveElement = document.activeElement, this.opts.disablePageScrollWhenModalOpen && document.body.classList.add("uppy-Dashboard-isFixed"), this.opts.animateOpenClose && this.getPluginState().isClosing) {
      const r = () => {
        this.setPluginState({
          isHidden: !1
        }), this.el.removeEventListener("animationend", r, !1), t();
      };
      this.el.addEventListener("animationend", r, !1);
    } else
      this.setPluginState({
        isHidden: !1
      }), t();
    return this.opts.browserBackButtonClose && this.updateBrowserHistory(), document.addEventListener("keydown", this.handleKeyDownInModal), this.uppy.emit("dashboard:modal-open"), e;
  };
  closeModal = (e) => {
    const t = e?.manualClose ?? !0, { isHidden: r, isClosing: a } = this.getPluginState();
    if (r || a)
      return;
    const { promise: o, resolve: s } = Aa();
    if (this.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), this.opts.animateOpenClose) {
      this.setPluginState({
        isClosing: !0
      });
      const n = () => {
        this.setPluginState({
          isHidden: !0,
          isClosing: !1
        }), this.superFocus.cancel(), this.savedActiveElement.focus(), this.el.removeEventListener("animationend", n, !1), s();
      };
      this.el.addEventListener("animationend", n, !1);
    } else
      this.setPluginState({
        isHidden: !0
      }), this.superFocus.cancel(), this.savedActiveElement.focus(), s();
    return document.removeEventListener("keydown", this.handleKeyDownInModal), t && this.opts.browserBackButtonClose && history.state?.[this.modalName] && history.back(), this.uppy.emit("dashboard:modal-closed"), o;
  };
  isModalOpen = () => !this.getPluginState().isHidden || !1;
  requestCloseModal = () => this.opts.onRequestCloseModal ? this.opts.onRequestCloseModal() : this.closeModal();
  setDarkModeCapability = (e) => {
    const { capabilities: t } = this.uppy.getState();
    this.uppy.setState({
      capabilities: {
        ...t,
        darkMode: e
      }
    });
  };
  handleSystemDarkModeChange = (e) => {
    const t = e.matches;
    this.uppy.log(`[Dashboard] Dark mode is ${t ? "on" : "off"}`), this.setDarkModeCapability(t);
  };
  toggleFileCard = (e, t) => {
    const r = this.uppy.getFile(t);
    e ? this.uppy.emit("dashboard:file-edit-start", r) : this.uppy.emit("dashboard:file-edit-complete", r), this.setPluginState({
      fileCardFor: e ? t : null,
      activeOverlayType: e ? "FileCard" : null
    });
  };
  toggleAddFilesPanel = (e) => {
    this.setPluginState({
      showAddFilesPanel: e,
      activeOverlayType: e ? "AddFiles" : null
    });
  };
  addFiles = (e) => {
    const t = e.map((r) => ({
      source: this.id,
      name: r.name,
      type: r.type,
      data: r,
      meta: {
        // path of the file relative to the ancestor directory the user selected.
        // e.g. 'docs/Old Prague/airbnb.pdf'
        relativePath: r.relativePath || r.webkitRelativePath || null
      }
    }));
    try {
      this.uppy.addFiles(t);
    } catch (r) {
      this.uppy.log(r);
    }
  };
  // ___Why make insides of Dashboard invisible until first ResizeObserver event is emitted?
  //    ResizeOberserver doesn't emit the first resize event fast enough, users can see the jump from one .uppy-size-- to
  //    another (e.g. in Safari)
  // ___Why not apply visibility property to .uppy-Dashboard-inner?
  //    Because ideally, acc to specs, ResizeObserver should see invisible elements as of width 0. So even though applying
  //    invisibility to .uppy-Dashboard-inner works now, it may not work in the future.
  startListeningToResize = () => {
    this.resizeObserver = new ResizeObserver((e) => {
      const t = e[0], { width: r, height: a } = t.contentRect;
      this.setPluginState({
        containerWidth: r,
        containerHeight: a,
        areInsidesReadyToBeVisible: !0
      });
    }), this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner")), this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(() => {
      const e = this.getPluginState(), t = !this.opts.inline && e.isHidden;
      // We might want to enable this in the future
      // if ResizeObserver hasn't yet fired,
      !e.areInsidesReadyToBeVisible && // and it's not due to the modal being closed
      !t && (this.uppy.log("[Dashboard] resize event didn’t fire on time: defaulted to mobile layout", "warning"), this.setPluginState({
        areInsidesReadyToBeVisible: !0
      }));
    }, 1e3);
  };
  stopListeningToResize = () => {
    this.resizeObserver.disconnect(), clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout);
  };
  // Records whether we have been interacting with uppy right now,
  // which is then used to determine whether state updates should trigger a refocusing.
  recordIfFocusedOnUppyRecently = (e) => {
    this.el.contains(e.target) ? this.ifFocusedOnUppyRecently = !0 : (this.ifFocusedOnUppyRecently = !1, this.superFocus.cancel());
  };
  disableInteractiveElements = (e) => {
    const t = [
      "a[href]",
      "input:not([disabled])",
      "select:not([disabled])",
      "textarea:not([disabled])",
      "button:not([disabled])",
      '[role="button"]:not([disabled])'
    ], r = this.#e ?? et(this.el.querySelectorAll(t)).filter((a) => !a.classList.contains("uppy-Dashboard-close"));
    for (const a of r)
      a.tagName === "A" ? a.setAttribute("aria-disabled", e) : a.disabled = e;
    e ? this.#e = r : this.#e = null, this.dashboardIsDisabled = e;
  };
  updateBrowserHistory = () => {
    history.state?.[this.modalName] || history.pushState({
      ...history.state,
      [this.modalName]: !0
    }, ""), window.addEventListener("popstate", this.handlePopState, !1);
  };
  handlePopState = (e) => {
    this.isModalOpen() && (!e.state || !e.state[this.modalName]) && this.closeModal({ manualClose: !1 }), !this.isModalOpen() && e.state?.[this.modalName] && history.back();
  };
  handleKeyDownInModal = (e) => {
    e.keyCode === Bu && this.requestCloseModal(), e.keyCode === Ea && es(e, this.getPluginState().activeOverlayType, this.el);
  };
  handleClickOutside = () => {
    this.opts.closeModalOnClickOutside && this.requestCloseModal();
  };
  handlePaste = (e) => {
    this.uppy.iteratePlugins((r) => {
      r.type === "acquirer" && r.handleRootPaste?.(e);
    });
    const t = et(e.clipboardData.files);
    t.length > 0 && (this.uppy.log("[Dashboard] Files pasted"), this.addFiles(t));
  };
  handleInputChange = (e) => {
    e.preventDefault();
    const t = et(e.currentTarget.files || []);
    t.length > 0 && (this.uppy.log("[Dashboard] Files selected through input"), this.addFiles(t));
  };
  handleDragOver = (e) => {
    e.preventDefault(), e.stopPropagation();
    const t = () => {
      let s = !0;
      return this.uppy.iteratePlugins((n) => {
        n.canHandleRootDrop?.(e) && (s = !0);
      }), s;
    }, r = () => {
      const { types: s } = e.dataTransfer;
      return s.some((n) => n === "Files");
    }, a = t(), o = r();
    if (!a && !o || this.opts.disabled || // opts.disableLocalFiles should only be taken into account if no plugins
    // can handle the datatransfer
    this.opts.disableLocalFiles && (o || !a) || !this.uppy.getState().allowNewUpload) {
      e.dataTransfer.dropEffect = "none";
      return;
    }
    e.dataTransfer.dropEffect = "copy", this.setPluginState({ isDraggingOver: !0 }), this.opts.onDragOver(e);
  };
  handleDragLeave = (e) => {
    e.preventDefault(), e.stopPropagation(), this.setPluginState({ isDraggingOver: !1 }), this.opts.onDragLeave(e);
  };
  handleDrop = async (e) => {
    e.preventDefault(), e.stopPropagation(), this.setPluginState({ isDraggingOver: !1 }), this.uppy.iteratePlugins((o) => {
      o.type === "acquirer" && o.handleRootDrop?.(e);
    });
    let t = !1;
    const r = (o) => {
      this.uppy.log(o, "error"), t || (this.uppy.info(o.message, "error"), t = !0);
    };
    this.uppy.log("[Dashboard] Processing dropped files");
    const a = await xd(e.dataTransfer, { logDropError: r });
    a.length > 0 && (this.uppy.log("[Dashboard] Files dropped"), this.addFiles(a)), this.opts.onDrop(e);
  };
  handleRequestThumbnail = (e) => {
    this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:request", e);
  };
  /**
   * We cancel thumbnail requests when a file item component unmounts to avoid
   * clogging up the queue when the user scrolls past many elements.
   */
  handleCancelThumbnail = (e) => {
    this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:cancel", e);
  };
  handleKeyDownInInline = (e) => {
    e.keyCode === Ea && Cu(e, this.getPluginState().activeOverlayType, this.el);
  };
  // ___Why do we listen to the 'paste' event on a document instead of onPaste={props.handlePaste} prop,
  //    or this.el.addEventListener('paste')?
  //    Because (at least) Chrome doesn't handle paste if focus is on some button, e.g. 'My Device'.
  //    => Therefore, the best option is to listen to all 'paste' events, and only react to them when we are focused on our
  //       particular Uppy instance.
  // ___Why do we still need onPaste={props.handlePaste} for the DashboardUi?
  //    Because if we click on the 'Drop files here' caption e.g., `document.activeElement` will be 'body'. Which means our
  //    standard determination of whether we're pasting into our Uppy instance won't work.
  //    => Therefore, we need a traditional onPaste={props.handlePaste} handler too.
  handlePasteOnBody = (e) => {
    this.el.contains(document.activeElement) && this.handlePaste(e);
  };
  handleComplete = ({ failed: e }) => {
    this.opts.closeAfterFinish && !e?.length && this.requestCloseModal();
  };
  handleCancelRestore = () => {
    this.uppy.emit("restore-canceled");
  };
  #t = () => {
    if (this.opts.disableThumbnailGenerator)
      return;
    const e = 600, t = this.uppy.getFiles();
    if (t.length === 1) {
      const r = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
      r?.setOptions({ thumbnailWidth: e });
      const a = { ...t[0], preview: void 0 };
      r?.requestThumbnail(a).then(() => {
        r?.setOptions({
          thumbnailWidth: this.opts.thumbnailWidth
        });
      });
    }
  };
  #r = (e) => {
    const t = e[0], { metaFields: r } = this.getPluginState(), a = r && r.length > 0, o = this.canEditFile(t);
    a && this.opts.autoOpen === "metaEditor" ? this.toggleFileCard(!0, t.id) : o && this.opts.autoOpen === "imageEditor" && this.openFileEditor(t);
  };
  initEvents = () => {
    if (this.opts.trigger && !this.opts.inline) {
      const e = Sa(this.opts.trigger);
      e ? e.forEach((t) => t.addEventListener("click", this.openModal)) : this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning");
    }
    this.startListeningToResize(), document.addEventListener("paste", this.handlePasteOnBody), this.uppy.on("plugin-added", this.#p), this.uppy.on("plugin-remove", this.removeTarget), this.uppy.on("file-added", this.hideAllPanels), this.uppy.on("dashboard:modal-closed", this.hideAllPanels), this.uppy.on("complete", this.handleComplete), this.uppy.on("files-added", this.#t), this.uppy.on("file-removed", this.#t), document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, !0), document.addEventListener("click", this.recordIfFocusedOnUppyRecently, !0), this.opts.inline && this.el.addEventListener("keydown", this.handleKeyDownInInline), this.opts.autoOpen && this.uppy.on("files-added", this.#r);
  };
  removeEvents = () => {
    const e = Sa(this.opts.trigger);
    !this.opts.inline && e && e.forEach((t) => t.removeEventListener("click", this.openModal)), this.stopListeningToResize(), document.removeEventListener("paste", this.handlePasteOnBody), window.removeEventListener("popstate", this.handlePopState, !1), this.uppy.off("plugin-added", this.#p), this.uppy.off("plugin-remove", this.removeTarget), this.uppy.off("file-added", this.hideAllPanels), this.uppy.off("dashboard:modal-closed", this.hideAllPanels), this.uppy.off("complete", this.handleComplete), this.uppy.off("files-added", this.#t), this.uppy.off("file-removed", this.#t), document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently), document.removeEventListener("click", this.recordIfFocusedOnUppyRecently), this.opts.inline && this.el.removeEventListener("keydown", this.handleKeyDownInInline), this.opts.autoOpen && this.uppy.off("files-added", this.#r);
  };
  superFocusOnEachUpdate = () => {
    const e = this.el.contains(document.activeElement), t = document.activeElement === document.body || document.activeElement === null, r = this.uppy.getState().info.length === 0, a = !this.opts.inline;
    // If update is connected to showing the Informer - let the screen reader calmly read it.
    r && // If we are in a modal - always superfocus without concern for other elements
    // on the page (user is unlikely to want to interact with the rest of the page)
    (a || // If we are already inside of Uppy, or
    e || // If we are not focused on anything BUT we have already, at least once, focused on uppy
    //   1. We focus when isFocusNowhere, because when the element we were focused
    //      on disappears (e.g. an overlay), - focus gets lost. If user is typing
    //      something somewhere else on the page, - focus won't be 'nowhere'.
    //   2. We only focus when focus is nowhere AND this.ifFocusedOnUppyRecently,
    //      to avoid focus jumps if we do something else on the page.
    //   [Practical check] Without '&& this.ifFocusedOnUppyRecently', in Safari, in inline mode,
    //                     when file is uploading, - navigate via tab to the checkbox,
    //                     try to press space multiple times. Focus will jump to Uppy.
    t && this.ifFocusedOnUppyRecently) ? this.superFocus(this.el, this.getPluginState().activeOverlayType) : this.superFocus.cancel();
  };
  afterUpdate = () => {
    if (this.opts.disabled && !this.dashboardIsDisabled) {
      this.disableInteractiveElements(!0);
      return;
    }
    !this.opts.disabled && this.dashboardIsDisabled && this.disableInteractiveElements(!1), this.superFocusOnEachUpdate();
  };
  saveFileCard = (e, t) => {
    this.uppy.setFileMeta(t, e), this.toggleFileCard(!1, t);
  };
  #i = (e) => {
    const t = this.uppy.getPlugin(e.id);
    return {
      ...e,
      icon: t.icon || this.opts.defaultPickerIcon,
      render: t.render
    };
  };
  #a = (e) => {
    const t = this.uppy.getPlugin(e.id);
    return typeof t.isSupported != "function" ? !0 : t.isSupported();
  };
  #s = (e) => e.filter((t) => t.type === "acquirer" && this.#a(t)).map(this.#i);
  #n = (e) => e.filter((t) => t.type === "progressindicator").map(this.#i);
  #o = (e) => e.filter((t) => t.type === "editor").map(this.#i);
  render = (e) => {
    const t = this.getPluginState(), { files: r, capabilities: a, allowNewUpload: o } = e, { newFiles: s, uploadStartedFiles: n, completeFiles: p, erroredFiles: l, inProgressFiles: c, inProgressNotPausedFiles: d, processingFiles: h, isUploadStarted: m, isAllComplete: f, isAllPaused: y } = this.uppy.getObjectOfFilesPerState(), b = this.#s(t.targets), w = this.#n(t.targets), x = this.#o(t.targets);
    let _;
    return this.opts.theme === "auto" ? _ = a.darkMode ? "dark" : "light" : _ = this.opts.theme, ["files", "folders", "both"].indexOf(this.opts.fileManagerSelectionType) < 0 && (this.opts.fileManagerSelectionType = "files", console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`)), wu({
      state: e,
      isHidden: t.isHidden,
      files: r,
      newFiles: s,
      uploadStartedFiles: n,
      completeFiles: p,
      erroredFiles: l,
      inProgressFiles: c,
      inProgressNotPausedFiles: d,
      processingFiles: h,
      isUploadStarted: m,
      isAllComplete: f,
      isAllPaused: y,
      totalFileCount: Object.keys(r).length,
      totalProgress: e.totalProgress,
      allowNewUpload: o,
      acquirers: b,
      theme: _,
      disabled: this.opts.disabled,
      disableLocalFiles: this.opts.disableLocalFiles,
      direction: this.opts.direction,
      activePickerPanel: t.activePickerPanel,
      showFileEditor: t.showFileEditor,
      saveFileEditor: this.saveFileEditor,
      closeFileEditor: this.closeFileEditor,
      disableInteractiveElements: this.disableInteractiveElements,
      animateOpenClose: this.opts.animateOpenClose,
      isClosing: t.isClosing,
      progressindicators: w,
      editors: x,
      autoProceed: this.uppy.opts.autoProceed,
      id: this.id,
      closeModal: this.requestCloseModal,
      handleClickOutside: this.handleClickOutside,
      handleInputChange: this.handleInputChange,
      handlePaste: this.handlePaste,
      inline: this.opts.inline,
      showPanel: this.showPanel,
      hideAllPanels: this.hideAllPanels,
      i18n: this.i18n,
      i18nArray: this.i18nArray,
      uppy: this.uppy,
      note: this.opts.note,
      recoveredState: e.recoveredState,
      metaFields: t.metaFields,
      resumableUploads: a.resumableUploads || !1,
      individualCancellation: a.individualCancellation,
      isMobileDevice: a.isMobileDevice,
      fileCardFor: t.fileCardFor,
      toggleFileCard: this.toggleFileCard,
      toggleAddFilesPanel: this.toggleAddFilesPanel,
      showAddFilesPanel: t.showAddFilesPanel,
      saveFileCard: this.saveFileCard,
      openFileEditor: this.openFileEditor,
      canEditFile: this.canEditFile,
      width: this.opts.width,
      height: this.opts.height,
      showLinkToFileUploadResult: this.opts.showLinkToFileUploadResult,
      fileManagerSelectionType: this.opts.fileManagerSelectionType,
      proudlyDisplayPoweredByUppy: this.opts.proudlyDisplayPoweredByUppy,
      hideCancelButton: this.opts.hideCancelButton,
      hideRetryButton: this.opts.hideRetryButton,
      hidePauseResumeButton: this.opts.hidePauseResumeButton,
      showRemoveButtonAfterComplete: this.opts.showRemoveButtonAfterComplete,
      containerWidth: t.containerWidth,
      containerHeight: t.containerHeight,
      areInsidesReadyToBeVisible: t.areInsidesReadyToBeVisible,
      parentElement: this.el,
      allowedFileTypes: this.uppy.opts.restrictions.allowedFileTypes,
      maxNumberOfFiles: this.uppy.opts.restrictions.maxNumberOfFiles,
      requiredMetaFields: this.uppy.opts.restrictions.requiredMetaFields,
      showSelectedFiles: this.opts.showSelectedFiles,
      showNativePhotoCameraButton: this.opts.showNativePhotoCameraButton,
      showNativeVideoCameraButton: this.opts.showNativeVideoCameraButton,
      nativeCameraFacingMode: this.opts.nativeCameraFacingMode,
      singleFileFullScreen: this.opts.singleFileFullScreen,
      handleCancelRestore: this.handleCancelRestore,
      handleRequestThumbnail: this.handleRequestThumbnail,
      handleCancelThumbnail: this.handleCancelThumbnail,
      // drag props
      isDraggingOver: t.isDraggingOver,
      handleDragOver: this.handleDragOver,
      handleDragLeave: this.handleDragLeave,
      handleDrop: this.handleDrop
    });
  };
  #l = () => {
    const { plugins: e } = this.opts;
    e.forEach((t) => {
      const r = this.uppy.getPlugin(t);
      r ? r.mount(this, r) : this.uppy.log(`[Uppy] Dashboard could not find plugin '${t}', make sure to uppy.use() the plugins you are specifying`, "warning");
    });
  };
  #h = () => {
    this.uppy.iteratePlugins(this.#p);
  };
  #p = (e) => {
    const t = ["acquirer", "editor"];
    e && !e.opts?.target && t.includes(e.type) && (this.getPluginState().targets.some((a) => e.id === a.id) || e.mount(this, e));
  };
  #c() {
    const { hideUploadButton: e, hideRetryButton: t, hidePauseResumeButton: r, hideCancelButton: a, showProgressDetails: o, hideProgressAfterFinish: s, locale: n, doneButtonHandler: p } = this.opts;
    return {
      hideUploadButton: e,
      hideRetryButton: t,
      hidePauseResumeButton: r,
      hideCancelButton: a,
      showProgressDetails: o,
      hideAfterFinish: s,
      locale: n,
      doneButtonHandler: p
    };
  }
  #u() {
    const { thumbnailWidth: e, thumbnailHeight: t, thumbnailType: r, waitForThumbnailsBeforeUpload: a } = this.opts;
    return {
      thumbnailWidth: e,
      thumbnailHeight: t,
      thumbnailType: r,
      waitForThumbnailsBeforeUpload: a,
      // If we don't block on thumbnails, we can lazily generate them
      lazy: !a
    };
  }
  #d() {
    return {
      // currently no options
    };
  }
  setOptions(e) {
    super.setOptions(e), this.uppy.getPlugin(this.#f())?.setOptions(this.#c()), this.uppy.getPlugin(this.#m())?.setOptions(this.#u());
  }
  #f() {
    return `${this.id}:StatusBar`;
  }
  #m() {
    return `${this.id}:ThumbnailGenerator`;
  }
  #w() {
    return `${this.id}:Informer`;
  }
  install = () => {
    this.setPluginState({
      isHidden: !0,
      fileCardFor: null,
      activeOverlayType: null,
      showAddFilesPanel: !1,
      activePickerPanel: void 0,
      showFileEditor: !1,
      metaFields: this.opts.metaFields,
      targets: [],
      // We'll make them visible once .containerWidth is determined
      areInsidesReadyToBeVisible: !1,
      isDraggingOver: !1
    });
    const { inline: e, closeAfterFinish: t } = this.opts;
    if (e && t)
      throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
    const { allowMultipleUploads: r, allowMultipleUploadBatches: a } = this.uppy.opts;
    (r || a) && t && this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
    const { target: o } = this.opts;
    o && this.mount(o, this), this.opts.disableStatusBar || this.uppy.use(Fp, {
      id: this.#f(),
      target: this,
      ...this.#c()
    }), this.opts.disableInformer || this.uppy.use(Ul, {
      id: this.#w(),
      target: this,
      ...this.#d()
    }), this.opts.disableThumbnailGenerator || this.uppy.use(bd, {
      id: this.#m(),
      ...this.#u()
    }), this.darkModeMediaQuery = typeof window < "u" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
    const s = this.darkModeMediaQuery ? this.darkModeMediaQuery.matches : !1;
    this.uppy.log(`[Dashboard] Dark mode is ${s ? "on" : "off"}`), this.setDarkModeCapability(s), this.opts.theme === "auto" && this.darkModeMediaQuery?.addListener(this.handleSystemDarkModeChange), this.#l(), this.#h(), this.initEvents();
  };
  uninstall = () => {
    if (!this.opts.disableInformer) {
      const t = this.uppy.getPlugin(`${this.id}:Informer`);
      t && this.uppy.removePlugin(t);
    }
    if (!this.opts.disableStatusBar) {
      const t = this.uppy.getPlugin(`${this.id}:StatusBar`);
      t && this.uppy.removePlugin(t);
    }
    if (!this.opts.disableThumbnailGenerator) {
      const t = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
      t && this.uppy.removePlugin(t);
    }
    const { plugins: e } = this.opts;
    e.forEach((t) => {
      const r = this.uppy.getPlugin(t);
      r && r.unmount();
    }), this.opts.theme === "auto" && this.darkModeMediaQuery?.removeListener(this.handleSystemDarkModeChange), this.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), this.unmount(), this.removeEvents();
  };
}
function Fu(i) {
  return new Error("Cancelled", { cause: i });
}
function Ma(i) {
  if (i != null) {
    const e = () => this.abort(i.reason);
    i.addEventListener("abort", e, { once: !0 });
    const t = () => {
      i.removeEventListener("abort", e);
    };
    this.then?.(t, t);
  }
  return this;
}
class Tu {
  #e = 0;
  #t = [];
  #r = !1;
  #i;
  #a = 1;
  #s;
  #n;
  limit;
  constructor(e) {
    typeof e != "number" || e === 0 ? this.limit = 1 / 0 : this.limit = e;
  }
  #o(e) {
    this.#e += 1;
    let t = !1, r;
    try {
      r = e();
    } catch (a) {
      throw this.#e -= 1, a;
    }
    return {
      abort: (a) => {
        t || (t = !0, this.#e -= 1, r?.(a), this.#l());
      },
      done: () => {
        t || (t = !0, this.#e -= 1, this.#l());
      }
    };
  }
  #l() {
    queueMicrotask(() => this.#h());
  }
  #h() {
    if (this.#r || this.#e >= this.limit || this.#t.length === 0)
      return;
    const e = this.#t.shift();
    if (e == null)
      throw new Error("Invariant violation: next is null");
    const t = this.#o(e.fn);
    e.abort = t.abort, e.done = t.done;
  }
  #p(e, t) {
    const r = {
      fn: e,
      priority: t?.priority || 0,
      abort: () => {
        this.#c(r);
      },
      done: () => {
        throw new Error("Cannot mark a queued request as done: this indicates a bug");
      }
    }, a = this.#t.findIndex((o) => r.priority > o.priority);
    return a === -1 ? this.#t.push(r) : this.#t.splice(a, 0, r), r;
  }
  #c(e) {
    const t = this.#t.indexOf(e);
    t !== -1 && this.#t.splice(t, 1);
  }
  run(e, t) {
    return !this.#r && this.#e < this.limit ? this.#o(e) : this.#p(e, t);
  }
  wrapSyncFunction(e, t) {
    return (...r) => {
      const a = this.run(() => (e(...r), queueMicrotask(() => a.done()), () => {
      }), t);
      return {
        abortOn: Ma,
        abort() {
          a.abort();
        }
      };
    };
  }
  wrapPromiseFunction(e, t) {
    return (...r) => {
      let a;
      const o = new Promise((s, n) => {
        a = this.run(() => {
          let p, l;
          try {
            l = Promise.resolve(e(...r));
          } catch (c) {
            l = Promise.reject(c);
          }
          return l.then((c) => {
            p ? n(p) : (a.done(), s(c));
          }, (c) => {
            p ? n(p) : (a.done(), n(c));
          }), (c) => {
            p = Fu(c);
          };
        }, t);
      });
      return o.abort = (s) => {
        a.abort(s);
      }, o.abortOn = Ma, o;
    };
  }
  resume() {
    this.#r = !1, clearTimeout(this.#i);
    for (let e = 0; e < this.limit; e++)
      this.#l();
  }
  #u = () => this.resume();
  /**
   * Freezes the queue for a while or indefinitely.
   *
   * @param {number | null } [duration] Duration for the pause to happen, in milliseconds.
   *                                    If omitted, the queue won't resume automatically.
   */
  pause(e = null) {
    this.#r = !0, clearTimeout(this.#i), e != null && (this.#i = setTimeout(this.#u, e));
  }
  /**
   * Pauses the queue for a duration, and lower the limit of concurrent requests
   * when the queue resumes. When the queue resumes, it tries to progressively
   * increase the limit in `this.#increaseLimit` until another call is made to
   * `this.rateLimit`.
   * Call this function when using the RateLimitedQueue for network requests and
   * the remote server responds with 429 HTTP code.
   *
   * @param {number} duration in milliseconds.
   */
  rateLimit(e) {
    clearTimeout(this.#n), this.pause(e), this.limit > 1 && Number.isFinite(this.limit) && (this.#s = this.limit - 1, this.limit = this.#a, this.#n = setTimeout(this.#d, e));
  }
  #d = () => {
    if (this.#r) {
      this.#n = setTimeout(this.#d, 0);
      return;
    }
    this.#a = this.limit, this.limit = Math.ceil((this.#s + this.#a) / 2);
    for (let e = this.#a; e <= this.limit; e++)
      this.#l();
    this.#s - this.#a > 3 ? this.#n = setTimeout(this.#d, 2e3) : this.#a = Math.floor(this.#a / 2);
  };
  get isPaused() {
    return this.#r;
  }
}
/*!
 * Compressor.js v1.2.1
 * https://fengyuanchen.github.io/compressorjs
 *
 * Copyright 2018-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2023-02-28T14:09:41.732Z
 */
function za(i, e) {
  var t = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(i);
    e && (r = r.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function St(i) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? za(Object(t), !0).forEach(function(r) {
      Ou(i, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(t)) : za(Object(t)).forEach(function(r) {
      Object.defineProperty(i, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return i;
}
function Eu(i, e) {
  if (!(i instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function Ra(i, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(i, ts(r.key), r);
  }
}
function Au(i, e, t) {
  return Ra(i.prototype, e), Ra(i, t), Object.defineProperty(i, "prototype", {
    writable: !1
  }), i;
}
function Ou(i, e, t) {
  return e = ts(e), e in i ? Object.defineProperty(i, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[e] = t, i;
}
function zt() {
  return zt = Object.assign ? Object.assign.bind() : function(i) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r]);
    }
    return i;
  }, zt.apply(this, arguments);
}
function Mu(i, e) {
  if (typeof i != "object" || i === null) return i;
  var t = i[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(i, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(i);
}
function ts(i) {
  var e = Mu(i, "string");
  return typeof e == "symbol" ? e : String(e);
}
var is = { exports: {} };
(function(i) {
  typeof window > "u" || function(e) {
    var t = e.HTMLCanvasElement && e.HTMLCanvasElement.prototype, r = e.Blob && function() {
      try {
        return !!new Blob();
      } catch {
        return !1;
      }
    }(), a = r && e.Uint8Array && function() {
      try {
        return new Blob([new Uint8Array(100)]).size === 100;
      } catch {
        return !1;
      }
    }(), o = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder, s = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, n = (r || o) && e.atob && e.ArrayBuffer && e.Uint8Array && function(p) {
      var l, c, d, h, m, f, y, b, w;
      if (l = p.match(s), !l)
        throw new Error("invalid data URI");
      for (c = l[2] ? l[1] : "text/plain" + (l[3] || ";charset=US-ASCII"), d = !!l[4], h = p.slice(l[0].length), d ? m = atob(h) : m = decodeURIComponent(h), f = new ArrayBuffer(m.length), y = new Uint8Array(f), b = 0; b < m.length; b += 1)
        y[b] = m.charCodeAt(b);
      return r ? new Blob([a ? y : f], {
        type: c
      }) : (w = new o(), w.append(f), w.getBlob(c));
    };
    e.HTMLCanvasElement && !t.toBlob && (t.mozGetAsFile ? t.toBlob = function(p, l, c) {
      var d = this;
      setTimeout(function() {
        c && t.toDataURL && n ? p(n(d.toDataURL(l, c))) : p(d.mozGetAsFile("blob", l));
      });
    } : t.toDataURL && n && (t.msToBlob ? t.toBlob = function(p, l, c) {
      var d = this;
      setTimeout(function() {
        (l && l !== "image/png" || c) && t.toDataURL && n ? p(n(d.toDataURL(l, c))) : p(d.msToBlob(l));
      });
    } : t.toBlob = function(p, l, c) {
      var d = this;
      setTimeout(function() {
        p(n(d.toDataURL(l, c)));
      });
    })), i.exports ? i.exports = n : e.dataURLtoBlob = n;
  }(window);
})(is);
var Na = is.exports, zu = function(e) {
  return typeof Blob > "u" ? !1 : e instanceof Blob || Object.prototype.toString.call(e) === "[object Blob]";
}, Ua = {
  /**
   * Indicates if output the original image instead of the compressed one
   * when the size of the compressed image is greater than the original one's
   * @type {boolean}
   */
  strict: !0,
  /**
   * Indicates if read the image's Exif Orientation information,
   * and then rotate or flip the image automatically.
   * @type {boolean}
   */
  checkOrientation: !0,
  /**
   * Indicates if retain the image's Exif information after compressed.
   * @type {boolean}
  */
  retainExif: !1,
  /**
   * The max width of the output image.
   * @type {number}
   */
  maxWidth: 1 / 0,
  /**
   * The max height of the output image.
   * @type {number}
   */
  maxHeight: 1 / 0,
  /**
   * The min width of the output image.
   * @type {number}
   */
  minWidth: 0,
  /**
   * The min height of the output image.
   * @type {number}
   */
  minHeight: 0,
  /**
   * The width of the output image.
   * If not specified, the natural width of the source image will be used.
   * @type {number}
   */
  width: void 0,
  /**
   * The height of the output image.
   * If not specified, the natural height of the source image will be used.
   * @type {number}
   */
  height: void 0,
  /**
   * Sets how the size of the image should be resized to the container
   * specified by the `width` and `height` options.
   * @type {string}
   */
  resize: "none",
  /**
   * The quality of the output image.
   * It must be a number between `0` and `1`,
   * and only available for `image/jpeg` and `image/webp` images.
   * Check out {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toBlob canvas.toBlob}.
   * @type {number}
   */
  quality: 0.8,
  /**
   * The mime type of the output image.
   * By default, the original mime type of the source image file will be used.
   * @type {string}
   */
  mimeType: "auto",
  /**
   * Files whose file type is included in this list,
   * and whose file size exceeds the `convertSize` value will be converted to JPEGs.
   * @type {string｜Array}
   */
  convertTypes: ["image/png"],
  /**
   * PNG files over this size (5 MB by default) will be converted to JPEGs.
   * To disable this, just set the value to `Infinity`.
   * @type {number}
   */
  convertSize: 5e6,
  /**
   * The hook function to execute before draw the image into the canvas for compression.
   * @type {Function}
   * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
   * @param {HTMLCanvasElement} canvas - The canvas for compression.
   * @example
   * function (context, canvas) {
   *   context.fillStyle = '#fff';
   * }
   */
  beforeDraw: null,
  /**
   * The hook function to execute after drew the image into the canvas for compression.
   * @type {Function}
   * @param {CanvasRenderingContext2D} context - The 2d rendering context of the canvas.
   * @param {HTMLCanvasElement} canvas - The canvas for compression.
   * @example
   * function (context, canvas) {
   *   context.filter = 'grayscale(100%)';
   * }
   */
  drew: null,
  /**
   * The hook function to execute when success to compress the image.
   * @type {Function}
   * @param {File} file - The compressed image File object.
   * @example
   * function (file) {
   *   console.log(file);
   * }
   */
  success: null,
  /**
   * The hook function to execute when fail to compress the image.
   * @type {Function}
   * @param {Error} err - An Error object.
   * @example
   * function (err) {
   *   console.log(err.message);
   * }
   */
  error: null
}, Ru = typeof window < "u" && typeof window.document < "u", we = Ru ? window : {}, Rt = function(e) {
  return e > 0 && e < 1 / 0;
}, Nu = Array.prototype.slice;
function or(i) {
  return Array.from ? Array.from(i) : Nu.call(i);
}
var Uu = /^image\/.+$/;
function Ai(i) {
  return Uu.test(i);
}
function $u(i) {
  var e = Ai(i) ? i.substr(6) : "";
  return e === "jpeg" && (e = "jpg"), ".".concat(e);
}
var rs = String.fromCharCode;
function Lu(i, e, t) {
  var r = "", a;
  for (t += e, a = e; a < t; a += 1)
    r += rs(i.getUint8(a));
  return r;
}
var Hu = we.btoa;
function $a(i, e) {
  for (var t = [], r = 8192, a = new Uint8Array(i); a.length > 0; )
    t.push(rs.apply(null, or(a.subarray(0, r)))), a = a.subarray(r);
  return "data:".concat(e, ";base64,").concat(Hu(t.join("")));
}
function ju(i) {
  var e = new DataView(i), t;
  try {
    var r, a, o;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var s = e.byteLength, n = 2; n + 1 < s; ) {
        if (e.getUint8(n) === 255 && e.getUint8(n + 1) === 225) {
          a = n;
          break;
        }
        n += 1;
      }
    if (a) {
      var p = a + 4, l = a + 10;
      if (Lu(e, p, 4) === "Exif") {
        var c = e.getUint16(l);
        if (r = c === 18761, (r || c === 19789) && e.getUint16(l + 2, r) === 42) {
          var d = e.getUint32(l + 4, r);
          d >= 8 && (o = l + d);
        }
      }
    }
    if (o) {
      var h = e.getUint16(o, r), m, f;
      for (f = 0; f < h; f += 1)
        if (m = o + f * 12 + 2, e.getUint16(m, r) === 274) {
          m += 8, t = e.getUint16(m, r), e.setUint16(m, 1, r);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function qu(i) {
  var e = 0, t = 1, r = 1;
  switch (i) {
    // Flip horizontal
    case 2:
      t = -1;
      break;
    // Rotate left 180°
    case 3:
      e = -180;
      break;
    // Flip vertical
    case 4:
      r = -1;
      break;
    // Flip vertical and rotate right 90°
    case 5:
      e = 90, r = -1;
      break;
    // Rotate right 90°
    case 6:
      e = 90;
      break;
    // Flip horizontal and rotate right 90°
    case 7:
      e = 90, t = -1;
      break;
    // Rotate left 90°
    case 8:
      e = -90;
      break;
  }
  return {
    rotate: e,
    scaleX: t,
    scaleY: r
  };
}
var Wu = /\.\d*(?:0|9){12}\d*$/;
function La(i) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return Wu.test(i) ? Math.round(i * e) / e : i;
}
function Ve(i) {
  var e = i.aspectRatio, t = i.height, r = i.width, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "none", o = Rt(r), s = Rt(t);
  if (o && s) {
    var n = t * e;
    (a === "contain" || a === "none") && n > r || a === "cover" && n < r ? t = r / e : r = t * e;
  } else o ? t = r / e : s && (r = t * e);
  return {
    width: r,
    height: t
  };
}
function Vu(i) {
  for (var e = or(new Uint8Array(i)), t = e.length, r = [], a = 0; a + 3 < t; ) {
    var o = e[a], s = e[a + 1];
    if (o === 255 && s === 218)
      break;
    if (o === 255 && s === 216)
      a += 2;
    else {
      var n = e[a + 2] * 256 + e[a + 3], p = a + n + 2, l = e.slice(a, p);
      r.push(l), a = p;
    }
  }
  return r.reduce(function(c, d) {
    return d[0] === 255 && d[1] === 225 ? c.concat(d) : c;
  }, []);
}
function Gu(i, e) {
  var t = or(new Uint8Array(i));
  if (t[2] !== 255 || t[3] !== 224)
    return i;
  var r = t[4] * 256 + t[5], a = [255, 216].concat(e, t.slice(4 + r));
  return new Uint8Array(a);
}
var Xu = we.ArrayBuffer, wi = we.FileReader, Se = we.URL || we.webkitURL, Yu = /\.\w+$/, Ku = we.Compressor, Zu = /* @__PURE__ */ function() {
  function i(e, t) {
    Eu(this, i), this.file = e, this.exif = [], this.image = new Image(), this.options = St(St({}, Ua), t), this.aborted = !1, this.result = null, this.init();
  }
  return Au(i, [{
    key: "init",
    value: function() {
      var t = this, r = this.file, a = this.options;
      if (!zu(r)) {
        this.fail(new Error("The first argument must be a File or Blob object."));
        return;
      }
      var o = r.type;
      if (!Ai(o)) {
        this.fail(new Error("The first argument must be an image File or Blob object."));
        return;
      }
      if (!Se || !wi) {
        this.fail(new Error("The current browser does not support image compression."));
        return;
      }
      Xu || (a.checkOrientation = !1, a.retainExif = !1);
      var s = o === "image/jpeg", n = s && a.checkOrientation, p = s && a.retainExif;
      if (Se && !n && !p)
        this.load({
          url: Se.createObjectURL(r)
        });
      else {
        var l = new wi();
        this.reader = l, l.onload = function(c) {
          var d = c.target, h = d.result, m = {}, f = 1;
          n && (f = ju(h), f > 1 && zt(m, qu(f))), p && (t.exif = Vu(h)), n || p ? !Se || f > 1 ? m.url = $a(h, o) : m.url = Se.createObjectURL(r) : m.url = h, t.load(m);
        }, l.onabort = function() {
          t.fail(new Error("Aborted to read the image with FileReader."));
        }, l.onerror = function() {
          t.fail(new Error("Failed to read the image with FileReader."));
        }, l.onloadend = function() {
          t.reader = null;
        }, n || p ? l.readAsArrayBuffer(r) : l.readAsDataURL(r);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var r = this, a = this.file, o = this.image;
      o.onload = function() {
        r.draw(St(St({}, t), {}, {
          naturalWidth: o.naturalWidth,
          naturalHeight: o.naturalHeight
        }));
      }, o.onabort = function() {
        r.fail(new Error("Aborted to load the image."));
      }, o.onerror = function() {
        r.fail(new Error("Failed to load the image."));
      }, we.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(we.navigator.userAgent) && (o.crossOrigin = "anonymous"), o.alt = a.name, o.src = t.url;
    }
  }, {
    key: "draw",
    value: function(t) {
      var r = this, a = t.naturalWidth, o = t.naturalHeight, s = t.rotate, n = s === void 0 ? 0 : s, p = t.scaleX, l = p === void 0 ? 1 : p, c = t.scaleY, d = c === void 0 ? 1 : c, h = this.file, m = this.image, f = this.options, y = document.createElement("canvas"), b = y.getContext("2d"), w = Math.abs(n) % 180 === 90, x = (f.resize === "contain" || f.resize === "cover") && Rt(f.width) && Rt(f.height), _ = Math.max(f.maxWidth, 0) || 1 / 0, C = Math.max(f.maxHeight, 0) || 1 / 0, B = Math.max(f.minWidth, 0) || 0, g = Math.max(f.minHeight, 0) || 0, D = a / o, k = f.width, S = f.height;
      if (w) {
        var O = [C, _];
        _ = O[0], C = O[1];
        var T = [g, B];
        B = T[0], g = T[1];
        var M = [S, k];
        k = M[0], S = M[1];
      }
      x && (D = k / S);
      var F = Ve({
        aspectRatio: D,
        width: _,
        height: C
      }, "contain");
      _ = F.width, C = F.height;
      var z = Ve({
        aspectRatio: D,
        width: B,
        height: g
      }, "cover");
      if (B = z.width, g = z.height, x) {
        var A = Ve({
          aspectRatio: D,
          width: k,
          height: S
        }, f.resize);
        k = A.width, S = A.height;
      } else {
        var V = Ve({
          aspectRatio: D,
          width: k,
          height: S
        }), oe = V.width;
        k = oe === void 0 ? a : oe;
        var ue = V.height;
        S = ue === void 0 ? o : ue;
      }
      k = Math.floor(La(Math.min(Math.max(k, B), _))), S = Math.floor(La(Math.min(Math.max(S, g), C)));
      var he = -k / 2, xe = -S / 2, _e = k, Fe = S, fe = [];
      if (x) {
        var De = 0, Le = 0, ut = a, ct = o, ke = Ve({
          aspectRatio: D,
          width: a,
          height: o
        }, {
          contain: "cover",
          cover: "contain"
        }[f.resize]);
        ut = ke.width, ct = ke.height, De = (a - ut) / 2, Le = (o - ct) / 2, fe.push(De, Le, ut, ct);
      }
      if (fe.push(he, xe, _e, Fe), w) {
        var cr = [S, k];
        k = cr[0], S = cr[1];
      }
      y.width = k, y.height = S, Ai(f.mimeType) || (f.mimeType = h.type);
      var hr = "transparent";
      h.size > f.convertSize && f.convertTypes.indexOf(f.mimeType) >= 0 && (f.mimeType = "image/jpeg");
      var fr = f.mimeType === "image/jpeg";
      if (fr && (hr = "#fff"), b.fillStyle = hr, b.fillRect(0, 0, k, S), f.beforeDraw && f.beforeDraw.call(this, b, y), !this.aborted && (b.save(), b.translate(k / 2, S / 2), b.rotate(n * Math.PI / 180), b.scale(l, d), b.drawImage.apply(b, [m].concat(fe)), b.restore(), f.drew && f.drew.call(this, b, y), !this.aborted)) {
        var mr = function(He) {
          if (!r.aborted) {
            var gr = function(je) {
              return r.done({
                naturalWidth: a,
                naturalHeight: o,
                result: je
              });
            };
            if (He && fr && f.retainExif && r.exif && r.exif.length > 0) {
              var yr = function(je) {
                return gr(Na($a(Gu(je, r.exif), f.mimeType)));
              };
              if (He.arrayBuffer)
                He.arrayBuffer().then(yr).catch(function() {
                  r.fail(new Error("Failed to read the compressed image with Blob.arrayBuffer()."));
                });
              else {
                var Te = new wi();
                r.reader = Te, Te.onload = function($t) {
                  var je = $t.target;
                  yr(je.result);
                }, Te.onabort = function() {
                  r.fail(new Error("Aborted to read the compressed image with FileReader."));
                }, Te.onerror = function() {
                  r.fail(new Error("Failed to read the compressed image with FileReader."));
                }, Te.onloadend = function() {
                  r.reader = null;
                }, Te.readAsArrayBuffer(He);
              }
            } else
              gr(He);
          }
        };
        y.toBlob ? y.toBlob(mr, f.mimeType, f.quality) : mr(Na(y.toDataURL(f.mimeType, f.quality)));
      }
    }
  }, {
    key: "done",
    value: function(t) {
      var r = t.naturalWidth, a = t.naturalHeight, o = t.result, s = this.file, n = this.image, p = this.options;
      if (Se && n.src.indexOf("blob:") === 0 && Se.revokeObjectURL(n.src), o)
        if (p.strict && !p.retainExif && o.size > s.size && p.mimeType === s.type && !(p.width > r || p.height > a || p.minWidth > r || p.minHeight > a || p.maxWidth < r || p.maxHeight < a))
          o = s;
        else {
          var l = /* @__PURE__ */ new Date();
          o.lastModified = l.getTime(), o.lastModifiedDate = l, o.name = s.name, o.name && o.type !== s.type && (o.name = o.name.replace(Yu, $u(o.type)));
        }
      else
        o = s;
      this.result = o, p.success && p.success.call(this, o);
    }
  }, {
    key: "fail",
    value: function(t) {
      var r = this.options;
      if (r.error)
        r.error.call(this, t);
      else
        throw t;
    }
  }, {
    key: "abort",
    value: function() {
      this.aborted || (this.aborted = !0, this.reader ? this.reader.abort() : this.image.complete ? this.fail(new Error("The compression process has been aborted.")) : (this.image.onload = null, this.image.onabort()));
    }
    /**
     * Get the no conflict compressor class.
     * @returns {Compressor} The compressor class.
     */
  }], [{
    key: "noConflict",
    value: function() {
      return window.Compressor = Ku, i;
    }
    /**
     * Change the default options.
     * @param {Object} options - The new default options.
     */
  }, {
    key: "setDefaults",
    value: function(t) {
      zt(Ua, t);
    }
  }]), i;
}();
const Qu = {
  strings: {
    // Shown in the Status Bar
    compressingImages: "Compressing images...",
    compressedX: "Saved %{size} by compressing images"
  }
}, Ju = {
  quality: 0.6,
  limit: 10
};
class ec extends lo {
  #e;
  constructor(e, t) {
    super(e, { ...Ju, ...t }), this.id = this.opts.id || "Compressor", this.type = "modifier", this.defaultLocale = Qu, this.#e = new Tu(this.opts.limit), this.i18nInit(), this.prepareUpload = this.prepareUpload.bind(this), this.compress = this.compress.bind(this);
  }
  compress(e) {
    return new Promise((t, r) => {
      new Zu(e, {
        ...this.opts,
        success: t,
        error: r
      });
    });
  }
  async prepareUpload(e) {
    let t = 0;
    const r = [], a = this.#e.wrapPromiseFunction(async (s) => {
      try {
        const n = await this.compress(s.data), p = s.data.size - n.size;
        this.uppy.log(`[Image Compressor] Image ${s.id} compressed by ${ce(p)}`), t += p;
        const { name: l, type: c, size: d } = n, h = Ot(l), f = `${Ot(s.meta.name).name}.${h.extension}`;
        this.uppy.setFileState(s.id, {
          ...l && { name: l },
          ...h.extension && {
            extension: h.extension
          },
          ...c && { type: c },
          ...d && { size: d },
          data: n,
          meta: {
            ...s.meta,
            type: c,
            name: f
          }
        }), r.push(s);
      } catch (n) {
        this.uppy.log(`[Image Compressor] Failed to compress ${s.id}:`, "warning"), this.uppy.log(n, "warning");
      }
    }), o = e.map((s) => {
      const n = this.uppy.getFile(s);
      return this.uppy.emit("preprocess-progress", n, {
        mode: "indeterminate",
        message: this.i18n("compressingImages")
      }), n.isRemote || (n.data.type || (n.data = n.data.slice(0, n.data.size, n.type)), !n.type?.startsWith("image/")) ? Promise.resolve() : a(n);
    });
    await Promise.all(o), this.uppy.emit("compressor:complete", r), t > 1024 && this.uppy.info(this.i18n("compressedX", {
      size: ce(t)
    }), "info");
    for (const s of e) {
      const n = this.uppy.getFile(s);
      this.uppy.emit("preprocess-complete", n);
    }
  }
  install() {
    this.uppy.addPreProcessor(this.prepareUpload);
  }
  uninstall() {
    this.uppy.removePreProcessor(this.prepareUpload);
  }
}
const tc = "@uppy/image-editor", ic = "Image editor and cropping UI", rc = "3.4.2", ac = "MIT", oc = "lib/index.js", sc = "dist/style.min.css", nc = "module", lc = { build: "tsc --build tsconfig.build.json", "build:css": "sass --load-path=../../ src/style.scss dist/style.css && postcss dist/style.css -u cssnano -o dist/style.min.css", typecheck: "tsc --build" }, pc = ["file uploader", "upload", "uppy", "uppy-plugin", "image editor", "cropper", "crop", "rotate", "resize"], dc = "https://uppy.io", uc = { url: "https://github.com/transloadit/uppy/issues" }, cc = { type: "git", url: "git+https://github.com/transloadit/uppy.git" }, hc = ["src", "lib", "dist", "CHANGELOG.md"], fc = { "@uppy/utils": "^6.2.2", cropperjs: "^1.6.2", preact: "^10.5.13" }, mc = { "@uppy/core": "^4.5.2" }, gc = { access: "public" }, yc = { cssnano: "^7.0.7", postcss: "^8.5.6", "postcss-cli": "^11.0.1", sass: "^1.89.2", typescript: "^5.8.3" }, bc = {
  name: tc,
  description: ic,
  version: rc,
  license: ac,
  main: oc,
  style: sc,
  type: nc,
  scripts: lc,
  keywords: pc,
  homepage: dc,
  bugs: uc,
  repository: cc,
  files: hc,
  dependencies: fc,
  peerDependencies: mc,
  publishConfig: gc,
  devDependencies: yc
};
/*!
 * Cropper.js v1.6.2
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2024-04-21T07:43:05.335Z
 */
function Ha(i, e) {
  var t = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(i);
    e && (r = r.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function as(i) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? Ha(Object(t), !0).forEach(function(r) {
      _c(i, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(t)) : Ha(Object(t)).forEach(function(r) {
      Object.defineProperty(i, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return i;
}
function vc(i, e) {
  if (typeof i != "object" || !i) return i;
  var t = i[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(i, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(i);
}
function os(i) {
  var e = vc(i, "string");
  return typeof e == "symbol" ? e : e + "";
}
function Oi(i) {
  "@babel/helpers - typeof";
  return Oi = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, Oi(i);
}
function wc(i, e) {
  if (!(i instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function ja(i, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(i, os(r.key), r);
  }
}
function xc(i, e, t) {
  return ja(i.prototype, e), ja(i, t), Object.defineProperty(i, "prototype", {
    writable: !1
  }), i;
}
function _c(i, e, t) {
  return e = os(e), e in i ? Object.defineProperty(i, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[e] = t, i;
}
function ss(i) {
  return Dc(i) || kc(i) || Sc(i) || Pc();
}
function Dc(i) {
  if (Array.isArray(i)) return Mi(i);
}
function kc(i) {
  if (typeof Symbol < "u" && i[Symbol.iterator] != null || i["@@iterator"] != null) return Array.from(i);
}
function Sc(i, e) {
  if (i) {
    if (typeof i == "string") return Mi(i, e);
    var t = Object.prototype.toString.call(i).slice(8, -1);
    if (t === "Object" && i.constructor && (t = i.constructor.name), t === "Map" || t === "Set") return Array.from(i);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return Mi(i, e);
  }
}
function Mi(i, e) {
  (e == null || e > i.length) && (e = i.length);
  for (var t = 0, r = new Array(e); t < e; t++) r[t] = i[t];
  return r;
}
function Pc() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Ut = typeof window < "u" && typeof window.document < "u", de = Ut ? window : {}, sr = Ut && de.document.documentElement ? "ontouchstart" in de.document.documentElement : !1, nr = Ut ? "PointerEvent" in de : !1, R = "cropper", lr = "all", ns = "crop", ls = "move", ps = "zoom", Pe = "e", Ce = "w", Ae = "s", me = "n", Ge = "ne", Xe = "nw", Ye = "se", Ke = "sw", zi = "".concat(R, "-crop"), qa = "".concat(R, "-disabled"), K = "".concat(R, "-hidden"), Wa = "".concat(R, "-hide"), Cc = "".concat(R, "-invisible"), Nt = "".concat(R, "-modal"), Ri = "".concat(R, "-move"), nt = "".concat(R, "Action"), Pt = "".concat(R, "Preview"), pr = "crop", ds = "move", us = "none", Ni = "crop", Ui = "cropend", $i = "cropmove", Li = "cropstart", Va = "dblclick", Bc = sr ? "touchstart" : "mousedown", Ic = sr ? "touchmove" : "mousemove", Fc = sr ? "touchend touchcancel" : "mouseup", Ga = nr ? "pointerdown" : Bc, Xa = nr ? "pointermove" : Ic, Ya = nr ? "pointerup pointercancel" : Fc, Ka = "ready", Za = "resize", Qa = "wheel", Hi = "zoom", Ja = "image/jpeg", Tc = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Ec = /^data:/, Ac = /^data:image\/jpeg;base64,/, Oc = /^img|canvas$/i, cs = 200, hs = 100, eo = {
  // Define the view mode of the cropper
  viewMode: 0,
  // 0, 1, 2, 3
  // Define the dragging mode of the cropper
  dragMode: pr,
  // 'crop', 'move' or 'none'
  // Define the initial aspect ratio of the crop box
  initialAspectRatio: NaN,
  // Define the aspect ratio of the crop box
  aspectRatio: NaN,
  // An object with the previous cropping result data
  data: null,
  // A selector for adding extra containers to preview
  preview: "",
  // Re-render the cropper when resize the window
  responsive: !0,
  // Restore the cropped area after resize the window
  restore: !0,
  // Check if the current image is a cross-origin image
  checkCrossOrigin: !0,
  // Check the current image's Exif Orientation information
  checkOrientation: !0,
  // Show the black modal
  modal: !0,
  // Show the dashed lines for guiding
  guides: !0,
  // Show the center indicator for guiding
  center: !0,
  // Show the white modal to highlight the crop box
  highlight: !0,
  // Show the grid background
  background: !0,
  // Enable to crop the image automatically when initialize
  autoCrop: !0,
  // Define the percentage of automatic cropping area when initializes
  autoCropArea: 0.8,
  // Enable to move the image
  movable: !0,
  // Enable to rotate the image
  rotatable: !0,
  // Enable to scale the image
  scalable: !0,
  // Enable to zoom the image
  zoomable: !0,
  // Enable to zoom the image by dragging touch
  zoomOnTouch: !0,
  // Enable to zoom the image by wheeling mouse
  zoomOnWheel: !0,
  // Define zoom ratio when zoom the image by wheeling mouse
  wheelZoomRatio: 0.1,
  // Enable to move the crop box
  cropBoxMovable: !0,
  // Enable to resize the crop box
  cropBoxResizable: !0,
  // Toggle drag mode between "crop" and "move" when click twice on the cropper
  toggleDragModeOnDblclick: !0,
  // Size limitation
  minCanvasWidth: 0,
  minCanvasHeight: 0,
  minCropBoxWidth: 0,
  minCropBoxHeight: 0,
  minContainerWidth: cs,
  minContainerHeight: hs,
  // Shortcuts of events
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, Mc = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', zc = Number.isNaN || de.isNaN;
function I(i) {
  return typeof i == "number" && !zc(i);
}
var to = function(e) {
  return e > 0 && e < 1 / 0;
};
function xi(i) {
  return typeof i > "u";
}
function Ie(i) {
  return Oi(i) === "object" && i !== null;
}
var Rc = Object.prototype.hasOwnProperty;
function Me(i) {
  if (!Ie(i))
    return !1;
  try {
    var e = i.constructor, t = e.prototype;
    return e && t && Rc.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function Y(i) {
  return typeof i == "function";
}
var Nc = Array.prototype.slice;
function fs(i) {
  return Array.from ? Array.from(i) : Nc.call(i);
}
function H(i, e) {
  return i && Y(e) && (Array.isArray(i) || I(i.length) ? fs(i).forEach(function(t, r) {
    e.call(i, t, r, i);
  }) : Ie(i) && Object.keys(i).forEach(function(t) {
    e.call(i, i[t], t, i);
  })), i;
}
var N = Object.assign || function(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    r[a - 1] = arguments[a];
  return Ie(e) && r.length > 0 && r.forEach(function(o) {
    Ie(o) && Object.keys(o).forEach(function(s) {
      e[s] = o[s];
    });
  }), e;
}, Uc = /\.\d*(?:0|9){12}\d*$/;
function Re(i) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return Uc.test(i) ? Math.round(i * e) / e : i;
}
var $c = /^width|height|left|top|marginLeft|marginTop$/;
function ye(i, e) {
  var t = i.style;
  H(e, function(r, a) {
    $c.test(a) && I(r) && (r = "".concat(r, "px")), t[a] = r;
  });
}
function Lc(i, e) {
  return i.classList ? i.classList.contains(e) : i.className.indexOf(e) > -1;
}
function q(i, e) {
  if (e) {
    if (I(i.length)) {
      H(i, function(r) {
        q(r, e);
      });
      return;
    }
    if (i.classList) {
      i.classList.add(e);
      return;
    }
    var t = i.className.trim();
    t ? t.indexOf(e) < 0 && (i.className = "".concat(t, " ").concat(e)) : i.className = e;
  }
}
function pe(i, e) {
  if (e) {
    if (I(i.length)) {
      H(i, function(t) {
        pe(t, e);
      });
      return;
    }
    if (i.classList) {
      i.classList.remove(e);
      return;
    }
    i.className.indexOf(e) >= 0 && (i.className = i.className.replace(e, ""));
  }
}
function ze(i, e, t) {
  if (e) {
    if (I(i.length)) {
      H(i, function(r) {
        ze(r, e, t);
      });
      return;
    }
    t ? q(i, e) : pe(i, e);
  }
}
var Hc = /([a-z\d])([A-Z])/g;
function dr(i) {
  return i.replace(Hc, "$1-$2").toLowerCase();
}
function ji(i, e) {
  return Ie(i[e]) ? i[e] : i.dataset ? i.dataset[e] : i.getAttribute("data-".concat(dr(e)));
}
function lt(i, e, t) {
  Ie(t) ? i[e] = t : i.dataset ? i.dataset[e] = t : i.setAttribute("data-".concat(dr(e)), t);
}
function jc(i, e) {
  if (Ie(i[e]))
    try {
      delete i[e];
    } catch {
      i[e] = void 0;
    }
  else if (i.dataset)
    try {
      delete i.dataset[e];
    } catch {
      i.dataset[e] = void 0;
    }
  else
    i.removeAttribute("data-".concat(dr(e)));
}
var ms = /\s\s*/, gs = function() {
  var i = !1;
  if (Ut) {
    var e = !1, t = function() {
    }, r = Object.defineProperty({}, "once", {
      get: function() {
        return i = !0, e;
      },
      /**
       * This setter can fix a `TypeError` in strict mode
       * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Errors/Getter_only}
       * @param {boolean} value - The value to set
       */
      set: function(o) {
        e = o;
      }
    });
    de.addEventListener("test", t, r), de.removeEventListener("test", t, r);
  }
  return i;
}();
function Q(i, e, t) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(ms).forEach(function(o) {
    if (!gs) {
      var s = i.listeners;
      s && s[o] && s[o][t] && (a = s[o][t], delete s[o][t], Object.keys(s[o]).length === 0 && delete s[o], Object.keys(s).length === 0 && delete i.listeners);
    }
    i.removeEventListener(o, a, r);
  });
}
function Z(i, e, t) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(ms).forEach(function(o) {
    if (r.once && !gs) {
      var s = i.listeners, n = s === void 0 ? {} : s;
      a = function() {
        delete n[o][t], i.removeEventListener(o, a, r);
        for (var l = arguments.length, c = new Array(l), d = 0; d < l; d++)
          c[d] = arguments[d];
        t.apply(i, c);
      }, n[o] || (n[o] = {}), n[o][t] && i.removeEventListener(o, n[o][t], r), n[o][t] = a, i.listeners = n;
    }
    i.addEventListener(o, a, r);
  });
}
function Ne(i, e, t) {
  var r;
  return Y(Event) && Y(CustomEvent) ? r = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (r = document.createEvent("CustomEvent"), r.initCustomEvent(e, !0, !0, t)), i.dispatchEvent(r);
}
function ys(i) {
  var e = i.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var _i = de.location, qc = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function io(i) {
  var e = i.match(qc);
  return e !== null && (e[1] !== _i.protocol || e[2] !== _i.hostname || e[3] !== _i.port);
}
function ro(i) {
  var e = "timestamp=".concat((/* @__PURE__ */ new Date()).getTime());
  return i + (i.indexOf("?") === -1 ? "?" : "&") + e;
}
function tt(i) {
  var e = i.rotate, t = i.scaleX, r = i.scaleY, a = i.translateX, o = i.translateY, s = [];
  I(a) && a !== 0 && s.push("translateX(".concat(a, "px)")), I(o) && o !== 0 && s.push("translateY(".concat(o, "px)")), I(e) && e !== 0 && s.push("rotate(".concat(e, "deg)")), I(t) && t !== 1 && s.push("scaleX(".concat(t, ")")), I(r) && r !== 1 && s.push("scaleY(".concat(r, ")"));
  var n = s.length ? s.join(" ") : "none";
  return {
    WebkitTransform: n,
    msTransform: n,
    transform: n
  };
}
function Wc(i) {
  var e = as({}, i), t = 0;
  return H(i, function(r, a) {
    delete e[a], H(e, function(o) {
      var s = Math.abs(r.startX - o.startX), n = Math.abs(r.startY - o.startY), p = Math.abs(r.endX - o.endX), l = Math.abs(r.endY - o.endY), c = Math.sqrt(s * s + n * n), d = Math.sqrt(p * p + l * l), h = (d - c) / c;
      Math.abs(h) > Math.abs(t) && (t = h);
    });
  }), t;
}
function Ct(i, e) {
  var t = i.pageX, r = i.pageY, a = {
    endX: t,
    endY: r
  };
  return e ? a : as({
    startX: t,
    startY: r
  }, a);
}
function Vc(i) {
  var e = 0, t = 0, r = 0;
  return H(i, function(a) {
    var o = a.startX, s = a.startY;
    e += o, t += s, r += 1;
  }), e /= r, t /= r, {
    pageX: e,
    pageY: t
  };
}
function be(i) {
  var e = i.aspectRatio, t = i.height, r = i.width, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", o = to(r), s = to(t);
  if (o && s) {
    var n = t * e;
    a === "contain" && n > r || a === "cover" && n < r ? t = r / e : r = t * e;
  } else o ? t = r / e : s && (r = t * e);
  return {
    width: r,
    height: t
  };
}
function Gc(i) {
  var e = i.width, t = i.height, r = i.degree;
  if (r = Math.abs(r) % 180, r === 90)
    return {
      width: t,
      height: e
    };
  var a = r % 90 * Math.PI / 180, o = Math.sin(a), s = Math.cos(a), n = e * s + t * o, p = e * o + t * s;
  return r > 90 ? {
    width: p,
    height: n
  } : {
    width: n,
    height: p
  };
}
function Xc(i, e, t, r) {
  var a = e.aspectRatio, o = e.naturalWidth, s = e.naturalHeight, n = e.rotate, p = n === void 0 ? 0 : n, l = e.scaleX, c = l === void 0 ? 1 : l, d = e.scaleY, h = d === void 0 ? 1 : d, m = t.aspectRatio, f = t.naturalWidth, y = t.naturalHeight, b = r.fillColor, w = b === void 0 ? "transparent" : b, x = r.imageSmoothingEnabled, _ = x === void 0 ? !0 : x, C = r.imageSmoothingQuality, B = C === void 0 ? "low" : C, g = r.maxWidth, D = g === void 0 ? 1 / 0 : g, k = r.maxHeight, S = k === void 0 ? 1 / 0 : k, O = r.minWidth, T = O === void 0 ? 0 : O, M = r.minHeight, F = M === void 0 ? 0 : M, z = document.createElement("canvas"), A = z.getContext("2d"), V = be({
    aspectRatio: m,
    width: D,
    height: S
  }), oe = be({
    aspectRatio: m,
    width: T,
    height: F
  }, "cover"), ue = Math.min(V.width, Math.max(oe.width, f)), he = Math.min(V.height, Math.max(oe.height, y)), xe = be({
    aspectRatio: a,
    width: D,
    height: S
  }), _e = be({
    aspectRatio: a,
    width: T,
    height: F
  }, "cover"), Fe = Math.min(xe.width, Math.max(_e.width, o)), fe = Math.min(xe.height, Math.max(_e.height, s)), De = [-Fe / 2, -fe / 2, Fe, fe];
  return z.width = Re(ue), z.height = Re(he), A.fillStyle = w, A.fillRect(0, 0, ue, he), A.save(), A.translate(ue / 2, he / 2), A.rotate(p * Math.PI / 180), A.scale(c, h), A.imageSmoothingEnabled = _, A.imageSmoothingQuality = B, A.drawImage.apply(A, [i].concat(ss(De.map(function(Le) {
    return Math.floor(Re(Le));
  })))), A.restore(), z;
}
var bs = String.fromCharCode;
function Yc(i, e, t) {
  var r = "";
  t += e;
  for (var a = e; a < t; a += 1)
    r += bs(i.getUint8(a));
  return r;
}
var Kc = /^data:.*,/;
function Zc(i) {
  var e = i.replace(Kc, ""), t = atob(e), r = new ArrayBuffer(t.length), a = new Uint8Array(r);
  return H(a, function(o, s) {
    a[s] = t.charCodeAt(s);
  }), r;
}
function Qc(i, e) {
  for (var t = [], r = 8192, a = new Uint8Array(i); a.length > 0; )
    t.push(bs.apply(null, fs(a.subarray(0, r)))), a = a.subarray(r);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function Jc(i) {
  var e = new DataView(i), t;
  try {
    var r, a, o;
    if (e.getUint8(0) === 255 && e.getUint8(1) === 216)
      for (var s = e.byteLength, n = 2; n + 1 < s; ) {
        if (e.getUint8(n) === 255 && e.getUint8(n + 1) === 225) {
          a = n;
          break;
        }
        n += 1;
      }
    if (a) {
      var p = a + 4, l = a + 10;
      if (Yc(e, p, 4) === "Exif") {
        var c = e.getUint16(l);
        if (r = c === 18761, (r || c === 19789) && e.getUint16(l + 2, r) === 42) {
          var d = e.getUint32(l + 4, r);
          d >= 8 && (o = l + d);
        }
      }
    }
    if (o) {
      var h = e.getUint16(o, r), m, f;
      for (f = 0; f < h; f += 1)
        if (m = o + f * 12 + 2, e.getUint16(m, r) === 274) {
          m += 8, t = e.getUint16(m, r), e.setUint16(m, 1, r);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function eh(i) {
  var e = 0, t = 1, r = 1;
  switch (i) {
    // Flip horizontal
    case 2:
      t = -1;
      break;
    // Rotate left 180°
    case 3:
      e = -180;
      break;
    // Flip vertical
    case 4:
      r = -1;
      break;
    // Flip vertical and rotate right 90°
    case 5:
      e = 90, r = -1;
      break;
    // Rotate right 90°
    case 6:
      e = 90;
      break;
    // Flip horizontal and rotate right 90°
    case 7:
      e = 90, t = -1;
      break;
    // Rotate left 90°
    case 8:
      e = -90;
      break;
  }
  return {
    rotate: e,
    scaleX: t,
    scaleY: r
  };
}
var th = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, r = this.container, a = this.cropper, o = Number(t.minContainerWidth), s = Number(t.minContainerHeight);
    q(a, K), pe(e, K);
    var n = {
      width: Math.max(r.offsetWidth, o >= 0 ? o : cs),
      height: Math.max(r.offsetHeight, s >= 0 ? s : hs)
    };
    this.containerData = n, ye(a, {
      width: n.width,
      height: n.height
    }), q(e, K), pe(a, K);
  },
  // Canvas (image wrapper)
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, r = this.options.viewMode, a = Math.abs(t.rotate) % 180 === 90, o = a ? t.naturalHeight : t.naturalWidth, s = a ? t.naturalWidth : t.naturalHeight, n = o / s, p = e.width, l = e.height;
    e.height * n > e.width ? r === 3 ? p = e.height * n : l = e.width / n : r === 3 ? l = e.width / n : p = e.height * n;
    var c = {
      aspectRatio: n,
      naturalWidth: o,
      naturalHeight: s,
      width: p,
      height: l
    };
    this.canvasData = c, this.limited = r === 1 || r === 2, this.limitCanvas(!0, !0), c.width = Math.min(Math.max(c.width, c.minWidth), c.maxWidth), c.height = Math.min(Math.max(c.height, c.minHeight), c.maxHeight), c.left = (e.width - c.width) / 2, c.top = (e.height - c.height) / 2, c.oldLeft = c.left, c.oldTop = c.top, this.initialCanvasData = N({}, c);
  },
  limitCanvas: function(e, t) {
    var r = this.options, a = this.containerData, o = this.canvasData, s = this.cropBoxData, n = r.viewMode, p = o.aspectRatio, l = this.cropped && s;
    if (e) {
      var c = Number(r.minCanvasWidth) || 0, d = Number(r.minCanvasHeight) || 0;
      n > 1 ? (c = Math.max(c, a.width), d = Math.max(d, a.height), n === 3 && (d * p > c ? c = d * p : d = c / p)) : n > 0 && (c ? c = Math.max(c, l ? s.width : 0) : d ? d = Math.max(d, l ? s.height : 0) : l && (c = s.width, d = s.height, d * p > c ? c = d * p : d = c / p));
      var h = be({
        aspectRatio: p,
        width: c,
        height: d
      });
      c = h.width, d = h.height, o.minWidth = c, o.minHeight = d, o.maxWidth = 1 / 0, o.maxHeight = 1 / 0;
    }
    if (t)
      if (n > (l ? 0 : 1)) {
        var m = a.width - o.width, f = a.height - o.height;
        o.minLeft = Math.min(0, m), o.minTop = Math.min(0, f), o.maxLeft = Math.max(0, m), o.maxTop = Math.max(0, f), l && this.limited && (o.minLeft = Math.min(s.left, s.left + (s.width - o.width)), o.minTop = Math.min(s.top, s.top + (s.height - o.height)), o.maxLeft = s.left, o.maxTop = s.top, n === 2 && (o.width >= a.width && (o.minLeft = Math.min(0, m), o.maxLeft = Math.max(0, m)), o.height >= a.height && (o.minTop = Math.min(0, f), o.maxTop = Math.max(0, f))));
      } else
        o.minLeft = -o.width, o.minTop = -o.height, o.maxLeft = a.width, o.maxTop = a.height;
  },
  renderCanvas: function(e, t) {
    var r = this.canvasData, a = this.imageData;
    if (t) {
      var o = Gc({
        width: a.naturalWidth * Math.abs(a.scaleX || 1),
        height: a.naturalHeight * Math.abs(a.scaleY || 1),
        degree: a.rotate || 0
      }), s = o.width, n = o.height, p = r.width * (s / r.naturalWidth), l = r.height * (n / r.naturalHeight);
      r.left -= (p - r.width) / 2, r.top -= (l - r.height) / 2, r.width = p, r.height = l, r.aspectRatio = s / n, r.naturalWidth = s, r.naturalHeight = n, this.limitCanvas(!0, !1);
    }
    (r.width > r.maxWidth || r.width < r.minWidth) && (r.left = r.oldLeft), (r.height > r.maxHeight || r.height < r.minHeight) && (r.top = r.oldTop), r.width = Math.min(Math.max(r.width, r.minWidth), r.maxWidth), r.height = Math.min(Math.max(r.height, r.minHeight), r.maxHeight), this.limitCanvas(!1, !0), r.left = Math.min(Math.max(r.left, r.minLeft), r.maxLeft), r.top = Math.min(Math.max(r.top, r.minTop), r.maxTop), r.oldLeft = r.left, r.oldTop = r.top, ye(this.canvas, N({
      width: r.width,
      height: r.height
    }, tt({
      translateX: r.left,
      translateY: r.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, r = this.imageData, a = r.naturalWidth * (t.width / t.naturalWidth), o = r.naturalHeight * (t.height / t.naturalHeight);
    N(r, {
      width: a,
      height: o,
      left: (t.width - a) / 2,
      top: (t.height - o) / 2
    }), ye(this.image, N({
      width: r.width,
      height: r.height
    }, tt(N({
      translateX: r.left,
      translateY: r.top
    }, r)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, r = e.aspectRatio || e.initialAspectRatio, a = Number(e.autoCropArea) || 0.8, o = {
      width: t.width,
      height: t.height
    };
    r && (t.height * r > t.width ? o.height = o.width / r : o.width = o.height * r), this.cropBoxData = o, this.limitCropBox(!0, !0), o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth), o.height = Math.min(Math.max(o.height, o.minHeight), o.maxHeight), o.width = Math.max(o.minWidth, o.width * a), o.height = Math.max(o.minHeight, o.height * a), o.left = t.left + (t.width - o.width) / 2, o.top = t.top + (t.height - o.height) / 2, o.oldLeft = o.left, o.oldTop = o.top, this.initialCropBoxData = N({}, o);
  },
  limitCropBox: function(e, t) {
    var r = this.options, a = this.containerData, o = this.canvasData, s = this.cropBoxData, n = this.limited, p = r.aspectRatio;
    if (e) {
      var l = Number(r.minCropBoxWidth) || 0, c = Number(r.minCropBoxHeight) || 0, d = n ? Math.min(a.width, o.width, o.width + o.left, a.width - o.left) : a.width, h = n ? Math.min(a.height, o.height, o.height + o.top, a.height - o.top) : a.height;
      l = Math.min(l, a.width), c = Math.min(c, a.height), p && (l && c ? c * p > l ? c = l / p : l = c * p : l ? c = l / p : c && (l = c * p), h * p > d ? h = d / p : d = h * p), s.minWidth = Math.min(l, d), s.minHeight = Math.min(c, h), s.maxWidth = d, s.maxHeight = h;
    }
    t && (n ? (s.minLeft = Math.max(0, o.left), s.minTop = Math.max(0, o.top), s.maxLeft = Math.min(a.width, o.left + o.width) - s.width, s.maxTop = Math.min(a.height, o.top + o.height) - s.height) : (s.minLeft = 0, s.minTop = 0, s.maxLeft = a.width - s.width, s.maxTop = a.height - s.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, r = this.cropBoxData;
    (r.width > r.maxWidth || r.width < r.minWidth) && (r.left = r.oldLeft), (r.height > r.maxHeight || r.height < r.minHeight) && (r.top = r.oldTop), r.width = Math.min(Math.max(r.width, r.minWidth), r.maxWidth), r.height = Math.min(Math.max(r.height, r.minHeight), r.maxHeight), this.limitCropBox(!1, !0), r.left = Math.min(Math.max(r.left, r.minLeft), r.maxLeft), r.top = Math.min(Math.max(r.top, r.minTop), r.maxTop), r.oldLeft = r.left, r.oldTop = r.top, e.movable && e.cropBoxMovable && lt(this.face, nt, r.width >= t.width && r.height >= t.height ? ls : lr), ye(this.cropBox, N({
      width: r.width,
      height: r.height
    }, tt({
      translateX: r.left,
      translateY: r.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), Ne(this.element, Ni, this.getData());
  }
}, ih = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, r = this.options.preview, a = t ? this.crossOriginUrl : this.url, o = e.alt || "The image to preview", s = document.createElement("img");
    if (t && (s.crossOrigin = t), s.src = a, s.alt = o, this.viewBox.appendChild(s), this.viewBoxImage = s, !!r) {
      var n = r;
      typeof r == "string" ? n = e.ownerDocument.querySelectorAll(r) : r.querySelector && (n = [r]), this.previews = n, H(n, function(p) {
        var l = document.createElement("img");
        lt(p, Pt, {
          width: p.offsetWidth,
          height: p.offsetHeight,
          html: p.innerHTML
        }), t && (l.crossOrigin = t), l.src = a, l.alt = o, l.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', p.innerHTML = "", p.appendChild(l);
      });
    }
  },
  resetPreview: function() {
    H(this.previews, function(e) {
      var t = ji(e, Pt);
      ye(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, jc(e, Pt);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, r = this.cropBoxData, a = r.width, o = r.height, s = e.width, n = e.height, p = r.left - t.left - e.left, l = r.top - t.top - e.top;
    !this.cropped || this.disabled || (ye(this.viewBoxImage, N({
      width: s,
      height: n
    }, tt(N({
      translateX: -p,
      translateY: -l
    }, e)))), H(this.previews, function(c) {
      var d = ji(c, Pt), h = d.width, m = d.height, f = h, y = m, b = 1;
      a && (b = h / a, y = o * b), o && y > m && (b = m / o, f = a * b, y = m), ye(c, {
        width: f,
        height: y
      }), ye(c.getElementsByTagName("img")[0], N({
        width: s * b,
        height: n * b
      }, tt(N({
        translateX: -p * b,
        translateY: -l * b
      }, e))));
    }));
  }
}, rh = {
  bind: function() {
    var e = this.element, t = this.options, r = this.cropper;
    Y(t.cropstart) && Z(e, Li, t.cropstart), Y(t.cropmove) && Z(e, $i, t.cropmove), Y(t.cropend) && Z(e, Ui, t.cropend), Y(t.crop) && Z(e, Ni, t.crop), Y(t.zoom) && Z(e, Hi, t.zoom), Z(r, Ga, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && Z(r, Qa, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && Z(r, Va, this.onDblclick = this.dblclick.bind(this)), Z(e.ownerDocument, Xa, this.onCropMove = this.cropMove.bind(this)), Z(e.ownerDocument, Ya, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && Z(window, Za, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, r = this.cropper;
    Y(t.cropstart) && Q(e, Li, t.cropstart), Y(t.cropmove) && Q(e, $i, t.cropmove), Y(t.cropend) && Q(e, Ui, t.cropend), Y(t.crop) && Q(e, Ni, t.crop), Y(t.zoom) && Q(e, Hi, t.zoom), Q(r, Ga, this.onCropStart), t.zoomable && t.zoomOnWheel && Q(r, Qa, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && Q(r, Va, this.onDblclick), Q(e.ownerDocument, Xa, this.onCropMove), Q(e.ownerDocument, Ya, this.onCropEnd), t.responsive && Q(window, Za, this.onResize);
  }
}, ah = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, r = this.containerData, a = t.offsetWidth / r.width, o = t.offsetHeight / r.height, s = Math.abs(a - 1) > Math.abs(o - 1) ? a : o;
      if (s !== 1) {
        var n, p;
        e.restore && (n = this.getCanvasData(), p = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(H(n, function(l, c) {
          n[c] = l * s;
        })), this.setCropBoxData(H(p, function(l, c) {
          p[c] = l * s;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === us || this.setDragMode(Lc(this.dragBox, zi) ? ds : pr);
  },
  wheel: function(e) {
    var t = this, r = Number(this.options.wheelZoomRatio) || 0.1, a = 1;
    this.disabled || (e.preventDefault(), !this.wheeling && (this.wheeling = !0, setTimeout(function() {
      t.wheeling = !1;
    }, 50), e.deltaY ? a = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? a = -e.wheelDelta / 120 : e.detail && (a = e.detail > 0 ? 1 : -1), this.zoom(-a * r, e)));
  },
  cropStart: function(e) {
    var t = e.buttons, r = e.button;
    if (!(this.disabled || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && // No primary button (Usually the left button)
    (I(t) && t !== 1 || I(r) && r !== 0 || e.ctrlKey))) {
      var a = this.options, o = this.pointers, s;
      e.changedTouches ? H(e.changedTouches, function(n) {
        o[n.identifier] = Ct(n);
      }) : o[e.pointerId || 0] = Ct(e), Object.keys(o).length > 1 && a.zoomable && a.zoomOnTouch ? s = ps : s = ji(e.target, nt), Tc.test(s) && Ne(this.element, Li, {
        originalEvent: e,
        action: s
      }) !== !1 && (e.preventDefault(), this.action = s, this.cropping = !1, s === ns && (this.cropping = !0, q(this.dragBox, Nt)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var r = this.pointers;
      e.preventDefault(), Ne(this.element, $i, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? H(e.changedTouches, function(a) {
        N(r[a.identifier] || {}, Ct(a, !0));
      }) : N(r[e.pointerId || 0] || {}, Ct(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, r = this.pointers;
      e.changedTouches ? H(e.changedTouches, function(a) {
        delete r[a.identifier];
      }) : delete r[e.pointerId || 0], t && (e.preventDefault(), Object.keys(r).length || (this.action = ""), this.cropping && (this.cropping = !1, ze(this.dragBox, Nt, this.cropped && this.options.modal)), Ne(this.element, Ui, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, oh = {
  change: function(e) {
    var t = this.options, r = this.canvasData, a = this.containerData, o = this.cropBoxData, s = this.pointers, n = this.action, p = t.aspectRatio, l = o.left, c = o.top, d = o.width, h = o.height, m = l + d, f = c + h, y = 0, b = 0, w = a.width, x = a.height, _ = !0, C;
    !p && e.shiftKey && (p = d && h ? d / h : 1), this.limited && (y = o.minLeft, b = o.minTop, w = y + Math.min(a.width, r.width, r.left + r.width), x = b + Math.min(a.height, r.height, r.top + r.height));
    var B = s[Object.keys(s)[0]], g = {
      x: B.endX - B.startX,
      y: B.endY - B.startY
    }, D = function(S) {
      switch (S) {
        case Pe:
          m + g.x > w && (g.x = w - m);
          break;
        case Ce:
          l + g.x < y && (g.x = y - l);
          break;
        case me:
          c + g.y < b && (g.y = b - c);
          break;
        case Ae:
          f + g.y > x && (g.y = x - f);
          break;
      }
    };
    switch (n) {
      // Move crop box
      case lr:
        l += g.x, c += g.y;
        break;
      // Resize crop box
      case Pe:
        if (g.x >= 0 && (m >= w || p && (c <= b || f >= x))) {
          _ = !1;
          break;
        }
        D(Pe), d += g.x, d < 0 && (n = Ce, d = -d, l -= d), p && (h = d / p, c += (o.height - h) / 2);
        break;
      case me:
        if (g.y <= 0 && (c <= b || p && (l <= y || m >= w))) {
          _ = !1;
          break;
        }
        D(me), h -= g.y, c += g.y, h < 0 && (n = Ae, h = -h, c -= h), p && (d = h * p, l += (o.width - d) / 2);
        break;
      case Ce:
        if (g.x <= 0 && (l <= y || p && (c <= b || f >= x))) {
          _ = !1;
          break;
        }
        D(Ce), d -= g.x, l += g.x, d < 0 && (n = Pe, d = -d, l -= d), p && (h = d / p, c += (o.height - h) / 2);
        break;
      case Ae:
        if (g.y >= 0 && (f >= x || p && (l <= y || m >= w))) {
          _ = !1;
          break;
        }
        D(Ae), h += g.y, h < 0 && (n = me, h = -h, c -= h), p && (d = h * p, l += (o.width - d) / 2);
        break;
      case Ge:
        if (p) {
          if (g.y <= 0 && (c <= b || m >= w)) {
            _ = !1;
            break;
          }
          D(me), h -= g.y, c += g.y, d = h * p;
        } else
          D(me), D(Pe), g.x >= 0 ? m < w ? d += g.x : g.y <= 0 && c <= b && (_ = !1) : d += g.x, g.y <= 0 ? c > b && (h -= g.y, c += g.y) : (h -= g.y, c += g.y);
        d < 0 && h < 0 ? (n = Ke, h = -h, d = -d, c -= h, l -= d) : d < 0 ? (n = Xe, d = -d, l -= d) : h < 0 && (n = Ye, h = -h, c -= h);
        break;
      case Xe:
        if (p) {
          if (g.y <= 0 && (c <= b || l <= y)) {
            _ = !1;
            break;
          }
          D(me), h -= g.y, c += g.y, d = h * p, l += o.width - d;
        } else
          D(me), D(Ce), g.x <= 0 ? l > y ? (d -= g.x, l += g.x) : g.y <= 0 && c <= b && (_ = !1) : (d -= g.x, l += g.x), g.y <= 0 ? c > b && (h -= g.y, c += g.y) : (h -= g.y, c += g.y);
        d < 0 && h < 0 ? (n = Ye, h = -h, d = -d, c -= h, l -= d) : d < 0 ? (n = Ge, d = -d, l -= d) : h < 0 && (n = Ke, h = -h, c -= h);
        break;
      case Ke:
        if (p) {
          if (g.x <= 0 && (l <= y || f >= x)) {
            _ = !1;
            break;
          }
          D(Ce), d -= g.x, l += g.x, h = d / p;
        } else
          D(Ae), D(Ce), g.x <= 0 ? l > y ? (d -= g.x, l += g.x) : g.y >= 0 && f >= x && (_ = !1) : (d -= g.x, l += g.x), g.y >= 0 ? f < x && (h += g.y) : h += g.y;
        d < 0 && h < 0 ? (n = Ge, h = -h, d = -d, c -= h, l -= d) : d < 0 ? (n = Ye, d = -d, l -= d) : h < 0 && (n = Xe, h = -h, c -= h);
        break;
      case Ye:
        if (p) {
          if (g.x >= 0 && (m >= w || f >= x)) {
            _ = !1;
            break;
          }
          D(Pe), d += g.x, h = d / p;
        } else
          D(Ae), D(Pe), g.x >= 0 ? m < w ? d += g.x : g.y >= 0 && f >= x && (_ = !1) : d += g.x, g.y >= 0 ? f < x && (h += g.y) : h += g.y;
        d < 0 && h < 0 ? (n = Xe, h = -h, d = -d, c -= h, l -= d) : d < 0 ? (n = Ke, d = -d, l -= d) : h < 0 && (n = Ge, h = -h, c -= h);
        break;
      // Move canvas
      case ls:
        this.move(g.x, g.y), _ = !1;
        break;
      // Zoom canvas
      case ps:
        this.zoom(Wc(s), e), _ = !1;
        break;
      // Create crop box
      case ns:
        if (!g.x || !g.y) {
          _ = !1;
          break;
        }
        C = ys(this.cropper), l = B.startX - C.left, c = B.startY - C.top, d = o.minWidth, h = o.minHeight, g.x > 0 ? n = g.y > 0 ? Ye : Ge : g.x < 0 && (l -= d, n = g.y > 0 ? Ke : Xe), g.y < 0 && (c -= h), this.cropped || (pe(this.cropBox, K), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    _ && (o.width = d, o.height = h, o.left = l, o.top = c, this.action = n, this.renderCropBox()), H(s, function(k) {
      k.startX = k.endX, k.startY = k.endY;
    });
  }
}, sh = {
  // Show the crop box manually
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && q(this.dragBox, Nt), pe(this.cropBox, K), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  // Reset the image and crop box to their initial states
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = N({}, this.initialImageData), this.canvasData = N({}, this.initialCanvasData), this.cropBoxData = N({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  // Clear the crop box
  clear: function() {
    return this.cropped && !this.disabled && (N(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), pe(this.dragBox, Nt), q(this.cropBox, K)), this;
  },
  /**
   * Replace the image's src and rebuild the cropper
   * @param {string} url - The new URL.
   * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
   * @returns {Cropper} this
   */
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, H(this.previews, function(r) {
      r.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  // Enable (unfreeze) the cropper
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, pe(this.cropper, qa)), this;
  },
  // Disable (freeze) the cropper
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, q(this.cropper, qa)), this;
  },
  /**
   * Destroy the cropper and remove the instance from the image
   * @returns {Cropper} this
   */
  destroy: function() {
    var e = this.element;
    return e[R] ? (e[R] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  /**
   * Move the canvas with relative offsets
   * @param {number} offsetX - The relative offset distance on the x-axis.
   * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
   * @returns {Cropper} this
   */
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = this.canvasData, a = r.left, o = r.top;
    return this.moveTo(xi(e) ? e : a + Number(e), xi(t) ? t : o + Number(t));
  },
  /**
   * Move the canvas to an absolute point
   * @param {number} x - The x-axis coordinate.
   * @param {number} [y=x] - The y-axis coordinate.
   * @returns {Cropper} this
   */
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = this.canvasData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (I(e) && (r.left = e, a = !0), I(t) && (r.top = t, a = !0), a && this.renderCanvas(!0)), this;
  },
  /**
   * Zoom the canvas with a relative ratio
   * @param {number} ratio - The target ratio.
   * @param {Event} _originalEvent - The original event if any.
   * @returns {Cropper} this
   */
  zoom: function(e, t) {
    var r = this.canvasData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(r.width * e / r.naturalWidth, null, t);
  },
  /**
   * Zoom the canvas to an absolute ratio
   * @param {number} ratio - The target ratio.
   * @param {Object} pivot - The zoom pivot point coordinate.
   * @param {Event} _originalEvent - The original event if any.
   * @returns {Cropper} this
   */
  zoomTo: function(e, t, r) {
    var a = this.options, o = this.canvasData, s = o.width, n = o.height, p = o.naturalWidth, l = o.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && a.zoomable) {
      var c = p * e, d = l * e;
      if (Ne(this.element, Hi, {
        ratio: e,
        oldRatio: s / p,
        originalEvent: r
      }) === !1)
        return this;
      if (r) {
        var h = this.pointers, m = ys(this.cropper), f = h && Object.keys(h).length ? Vc(h) : {
          pageX: r.pageX,
          pageY: r.pageY
        };
        o.left -= (c - s) * ((f.pageX - m.left - o.left) / s), o.top -= (d - n) * ((f.pageY - m.top - o.top) / n);
      } else Me(t) && I(t.x) && I(t.y) ? (o.left -= (c - s) * ((t.x - o.left) / s), o.top -= (d - n) * ((t.y - o.top) / n)) : (o.left -= (c - s) / 2, o.top -= (d - n) / 2);
      o.width = c, o.height = d, this.renderCanvas(!0);
    }
    return this;
  },
  /**
   * Rotate the canvas with a relative degree
   * @param {number} degree - The rotate degree.
   * @returns {Cropper} this
   */
  rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e));
  },
  /**
   * Rotate the canvas to an absolute degree
   * @param {number} degree - The rotate degree.
   * @returns {Cropper} this
   */
  rotateTo: function(e) {
    return e = Number(e), I(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  /**
   * Scale the image on the x-axis.
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @returns {Cropper} this
   */
  scaleX: function(e) {
    var t = this.imageData.scaleY;
    return this.scale(e, I(t) ? t : 1);
  },
  /**
   * Scale the image on the y-axis.
   * @param {number} scaleY - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scaleY: function(e) {
    var t = this.imageData.scaleX;
    return this.scale(I(t) ? t : 1, e);
  },
  /**
   * Scale the image
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scale: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = this.imageData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (I(e) && (r.scaleX = e, a = !0), I(t) && (r.scaleY = t, a = !0), a && this.renderCanvas(!0, !0)), this;
  },
  /**
   * Get the cropped area position and size data (base on the original image)
   * @param {boolean} [rounded=false] - Indicate if round the data values or not.
   * @returns {Object} The result cropped data.
   */
  getData: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : !1, t = this.options, r = this.imageData, a = this.canvasData, o = this.cropBoxData, s;
    if (this.ready && this.cropped) {
      s = {
        x: o.left - a.left,
        y: o.top - a.top,
        width: o.width,
        height: o.height
      };
      var n = r.width / r.naturalWidth;
      if (H(s, function(c, d) {
        s[d] = c / n;
      }), e) {
        var p = Math.round(s.y + s.height), l = Math.round(s.x + s.width);
        s.x = Math.round(s.x), s.y = Math.round(s.y), s.width = l - s.x, s.height = p - s.y;
      }
    } else
      s = {
        x: 0,
        y: 0,
        width: 0,
        height: 0
      };
    return t.rotatable && (s.rotate = r.rotate || 0), t.scalable && (s.scaleX = r.scaleX || 1, s.scaleY = r.scaleY || 1), s;
  },
  /**
   * Set the cropped area position and size with new data
   * @param {Object} data - The new data.
   * @returns {Cropper} this
   */
  setData: function(e) {
    var t = this.options, r = this.imageData, a = this.canvasData, o = {};
    if (this.ready && !this.disabled && Me(e)) {
      var s = !1;
      t.rotatable && I(e.rotate) && e.rotate !== r.rotate && (r.rotate = e.rotate, s = !0), t.scalable && (I(e.scaleX) && e.scaleX !== r.scaleX && (r.scaleX = e.scaleX, s = !0), I(e.scaleY) && e.scaleY !== r.scaleY && (r.scaleY = e.scaleY, s = !0)), s && this.renderCanvas(!0, !0);
      var n = r.width / r.naturalWidth;
      I(e.x) && (o.left = e.x * n + a.left), I(e.y) && (o.top = e.y * n + a.top), I(e.width) && (o.width = e.width * n), I(e.height) && (o.height = e.height * n), this.setCropBoxData(o);
    }
    return this;
  },
  /**
   * Get the container size data.
   * @returns {Object} The result container data.
   */
  getContainerData: function() {
    return this.ready ? N({}, this.containerData) : {};
  },
  /**
   * Get the image position and size data.
   * @returns {Object} The result image data.
   */
  getImageData: function() {
    return this.sized ? N({}, this.imageData) : {};
  },
  /**
   * Get the canvas position and size data.
   * @returns {Object} The result canvas data.
   */
  getCanvasData: function() {
    var e = this.canvasData, t = {};
    return this.ready && H(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(r) {
      t[r] = e[r];
    }), t;
  },
  /**
   * Set the canvas position and size with new data.
   * @param {Object} data - The new canvas data.
   * @returns {Cropper} this
   */
  setCanvasData: function(e) {
    var t = this.canvasData, r = t.aspectRatio;
    return this.ready && !this.disabled && Me(e) && (I(e.left) && (t.left = e.left), I(e.top) && (t.top = e.top), I(e.width) ? (t.width = e.width, t.height = e.width / r) : I(e.height) && (t.height = e.height, t.width = e.height * r), this.renderCanvas(!0)), this;
  },
  /**
   * Get the crop box position and size data.
   * @returns {Object} The result crop box data.
   */
  getCropBoxData: function() {
    var e = this.cropBoxData, t;
    return this.ready && this.cropped && (t = {
      left: e.left,
      top: e.top,
      width: e.width,
      height: e.height
    }), t || {};
  },
  /**
   * Set the crop box position and size with new data.
   * @param {Object} data - The new crop box data.
   * @returns {Cropper} this
   */
  setCropBoxData: function(e) {
    var t = this.cropBoxData, r = this.options.aspectRatio, a, o;
    return this.ready && this.cropped && !this.disabled && Me(e) && (I(e.left) && (t.left = e.left), I(e.top) && (t.top = e.top), I(e.width) && e.width !== t.width && (a = !0, t.width = e.width), I(e.height) && e.height !== t.height && (o = !0, t.height = e.height), r && (a ? t.height = t.width / r : o && (t.width = t.height * r)), this.renderCropBox()), this;
  },
  /**
   * Get a canvas drawn the cropped image.
   * @param {Object} [options={}] - The config options.
   * @returns {HTMLCanvasElement} - The result canvas.
   */
  getCroppedCanvas: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    if (!this.ready || !window.HTMLCanvasElement)
      return null;
    var t = this.canvasData, r = Xc(this.image, this.imageData, t, e);
    if (!this.cropped)
      return r;
    var a = this.getData(e.rounded), o = a.x, s = a.y, n = a.width, p = a.height, l = r.width / Math.floor(t.naturalWidth);
    l !== 1 && (o *= l, s *= l, n *= l, p *= l);
    var c = n / p, d = be({
      aspectRatio: c,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), h = be({
      aspectRatio: c,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), m = be({
      aspectRatio: c,
      width: e.width || (l !== 1 ? r.width : n),
      height: e.height || (l !== 1 ? r.height : p)
    }), f = m.width, y = m.height;
    f = Math.min(d.width, Math.max(h.width, f)), y = Math.min(d.height, Math.max(h.height, y));
    var b = document.createElement("canvas"), w = b.getContext("2d");
    b.width = Re(f), b.height = Re(y), w.fillStyle = e.fillColor || "transparent", w.fillRect(0, 0, f, y);
    var x = e.imageSmoothingEnabled, _ = x === void 0 ? !0 : x, C = e.imageSmoothingQuality;
    w.imageSmoothingEnabled = _, C && (w.imageSmoothingQuality = C);
    var B = r.width, g = r.height, D = o, k = s, S, O, T, M, F, z;
    D <= -n || D > B ? (D = 0, S = 0, T = 0, F = 0) : D <= 0 ? (T = -D, D = 0, S = Math.min(B, n + D), F = S) : D <= B && (T = 0, S = Math.min(n, B - D), F = S), S <= 0 || k <= -p || k > g ? (k = 0, O = 0, M = 0, z = 0) : k <= 0 ? (M = -k, k = 0, O = Math.min(g, p + k), z = O) : k <= g && (M = 0, O = Math.min(p, g - k), z = O);
    var A = [D, k, S, O];
    if (F > 0 && z > 0) {
      var V = f / n;
      A.push(T * V, M * V, F * V, z * V);
    }
    return w.drawImage.apply(w, [r].concat(ss(A.map(function(oe) {
      return Math.floor(Re(oe));
    })))), b;
  },
  /**
   * Change the aspect ratio of the crop box.
   * @param {number} aspectRatio - The new aspect ratio.
   * @returns {Cropper} this
   */
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !xi(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  /**
   * Change the drag mode.
   * @param {string} mode - The new drag mode.
   * @returns {Cropper} this
   */
  setDragMode: function(e) {
    var t = this.options, r = this.dragBox, a = this.face;
    if (this.ready && !this.disabled) {
      var o = e === pr, s = t.movable && e === ds;
      e = o || s ? e : us, t.dragMode = e, lt(r, nt, e), ze(r, zi, o), ze(r, Ri, s), t.cropBoxMovable || (lt(a, nt, e), ze(a, zi, o), ze(a, Ri, s));
    }
    return this;
  }
}, nh = de.Cropper, vs = /* @__PURE__ */ function() {
  function i(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (wc(this, i), !e || !Oc.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = N({}, eo, Me(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return xc(i, [{
    key: "init",
    value: function() {
      var t = this.element, r = t.tagName.toLowerCase(), a;
      if (!t[R]) {
        if (t[R] = this, r === "img") {
          if (this.isImg = !0, a = t.getAttribute("src") || "", this.originalUrl = a, !a)
            return;
          a = t.src;
        } else r === "canvas" && window.HTMLCanvasElement && (a = t.toDataURL());
        this.load(a);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var r = this;
      if (t) {
        this.url = t, this.imageData = {};
        var a = this.element, o = this.options;
        if (!o.rotatable && !o.scalable && (o.checkOrientation = !1), !o.checkOrientation || !window.ArrayBuffer) {
          this.clone();
          return;
        }
        if (Ec.test(t)) {
          Ac.test(t) ? this.read(Zc(t)) : this.clone();
          return;
        }
        var s = new XMLHttpRequest(), n = this.clone.bind(this);
        this.reloading = !0, this.xhr = s, s.onabort = n, s.onerror = n, s.ontimeout = n, s.onprogress = function() {
          s.getResponseHeader("content-type") !== Ja && s.abort();
        }, s.onload = function() {
          r.read(s.response);
        }, s.onloadend = function() {
          r.reloading = !1, r.xhr = null;
        }, o.checkCrossOrigin && io(t) && a.crossOrigin && (t = ro(t)), s.open("GET", t, !0), s.responseType = "arraybuffer", s.withCredentials = a.crossOrigin === "use-credentials", s.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var r = this.options, a = this.imageData, o = Jc(t), s = 0, n = 1, p = 1;
      if (o > 1) {
        this.url = Qc(t, Ja);
        var l = eh(o);
        s = l.rotate, n = l.scaleX, p = l.scaleY;
      }
      r.rotatable && (a.rotate = s), r.scalable && (a.scaleX = n, a.scaleY = p), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, r = this.url, a = t.crossOrigin, o = r;
      this.options.checkCrossOrigin && io(r) && (a || (a = "anonymous"), o = ro(r)), this.crossOrigin = a, this.crossOriginUrl = o;
      var s = document.createElement("img");
      a && (s.crossOrigin = a), s.src = o || r, s.alt = t.alt || "The image to crop", this.image = s, s.onload = this.start.bind(this), s.onerror = this.stop.bind(this), q(s, Wa), t.parentNode.insertBefore(s, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, r = this.image;
      r.onload = null, r.onerror = null, this.sizing = !0;
      var a = de.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(de.navigator.userAgent), o = function(l, c) {
        N(t.imageData, {
          naturalWidth: l,
          naturalHeight: c,
          aspectRatio: l / c
        }), t.initialImageData = N({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
      };
      if (r.naturalWidth && !a) {
        o(r.naturalWidth, r.naturalHeight);
        return;
      }
      var s = document.createElement("img"), n = document.body || document.documentElement;
      this.sizingImage = s, s.onload = function() {
        o(s.width, s.height), a || n.removeChild(s);
      }, s.src = r.src, a || (s.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", n.appendChild(s));
    }
  }, {
    key: "stop",
    value: function() {
      var t = this.image;
      t.onload = null, t.onerror = null, t.parentNode.removeChild(t), this.image = null;
    }
  }, {
    key: "build",
    value: function() {
      if (!(!this.sized || this.ready)) {
        var t = this.element, r = this.options, a = this.image, o = t.parentNode, s = document.createElement("div");
        s.innerHTML = Mc;
        var n = s.querySelector(".".concat(R, "-container")), p = n.querySelector(".".concat(R, "-canvas")), l = n.querySelector(".".concat(R, "-drag-box")), c = n.querySelector(".".concat(R, "-crop-box")), d = c.querySelector(".".concat(R, "-face"));
        this.container = o, this.cropper = n, this.canvas = p, this.dragBox = l, this.cropBox = c, this.viewBox = n.querySelector(".".concat(R, "-view-box")), this.face = d, p.appendChild(a), q(t, K), o.insertBefore(n, t.nextSibling), pe(a, Wa), this.initPreview(), this.bind(), r.initialAspectRatio = Math.max(0, r.initialAspectRatio) || NaN, r.aspectRatio = Math.max(0, r.aspectRatio) || NaN, r.viewMode = Math.max(0, Math.min(3, Math.round(r.viewMode))) || 0, q(c, K), r.guides || q(c.getElementsByClassName("".concat(R, "-dashed")), K), r.center || q(c.getElementsByClassName("".concat(R, "-center")), K), r.background && q(n, "".concat(R, "-bg")), r.highlight || q(d, Cc), r.cropBoxMovable && (q(d, Ri), lt(d, nt, lr)), r.cropBoxResizable || (q(c.getElementsByClassName("".concat(R, "-line")), K), q(c.getElementsByClassName("".concat(R, "-point")), K)), this.render(), this.ready = !0, this.setDragMode(r.dragMode), r.autoCrop && this.crop(), this.setData(r.data), Y(r.ready) && Z(t, Ka, r.ready, {
          once: !0
        }), Ne(t, Ka);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      if (this.ready) {
        this.ready = !1, this.unbind(), this.resetPreview();
        var t = this.cropper.parentNode;
        t && t.removeChild(this.cropper), pe(this.element, K);
      }
    }
  }, {
    key: "uncreate",
    value: function() {
      this.ready ? (this.unbuild(), this.ready = !1, this.cropped = !1) : this.sizing ? (this.sizingImage.onload = null, this.sizing = !1, this.sized = !1) : this.reloading ? (this.xhr.onabort = null, this.xhr.abort()) : this.image && this.stop();
    }
    /**
     * Get the no conflict cropper class.
     * @returns {Cropper} The cropper class.
     */
  }], [{
    key: "noConflict",
    value: function() {
      return window.Cropper = nh, i;
    }
    /**
     * Change the default options.
     * @param {Object} options - The new default options.
     */
  }, {
    key: "setDefaults",
    value: function(t) {
      N(eo, Me(t) && t);
    }
  }]);
}();
N(vs.prototype, th, ih, rh, ah, oh, sh);
function lh(i, e) {
  const t = i.width / e.width, r = i.height / e.height, a = Math.min(t, r), o = e.width * a, s = e.height * a, n = (i.width - o) / 2, p = (i.height - s) / 2;
  return {
    width: o,
    height: s,
    left: n,
    top: p
  };
}
function ph(i) {
  return i * (Math.PI / 180);
}
function dh(i, e, t) {
  const r = Math.abs(ph(t));
  return Math.max((Math.sin(r) * i + Math.cos(r) * e) / e, (Math.sin(r) * e + Math.cos(r) * i) / i);
}
function uh(i, e, t) {
  return e.left < i.left ? {
    left: i.left,
    width: t.width
  } : e.top < i.top ? {
    top: i.top,
    height: t.height
  } : e.left + e.width > i.left + i.width ? {
    left: i.left + i.width - t.width,
    width: t.width
  } : e.top + e.height > i.top + i.height ? {
    top: i.top + i.height - t.height,
    height: t.height
  } : null;
}
function ch(i, e, t) {
  return e.left < i.left ? {
    left: i.left,
    width: t.left + t.width - i.left
  } : e.top < i.top ? {
    top: i.top,
    height: t.top + t.height - i.top
  } : e.left + e.width > i.left + i.width ? {
    left: t.left,
    width: i.left + i.width - t.left
  } : e.top + e.height > i.top + i.height ? {
    top: t.top,
    height: i.top + i.height - t.top
  } : null;
}
class hh extends X {
  imgElement;
  cropper;
  constructor(e) {
    super(e), this.state = {
      angle90Deg: 0,
      angleGranular: 0,
      prevCropboxData: null
    }, this.storePrevCropboxData = this.storePrevCropboxData.bind(this), this.limitCropboxMovement = this.limitCropboxMovement.bind(this);
  }
  componentDidMount() {
    const { opts: e, storeCropperInstance: t } = this.props;
    this.cropper = new vs(this.imgElement, e.cropperOptions), this.imgElement.addEventListener("cropstart", this.storePrevCropboxData), this.imgElement.addEventListener("cropend", this.limitCropboxMovement), t(this.cropper);
  }
  componentWillUnmount() {
    this.cropper.destroy(), this.imgElement.removeEventListener("cropstart", this.storePrevCropboxData), this.imgElement.removeEventListener("cropend", this.limitCropboxMovement);
  }
  storePrevCropboxData() {
    this.setState({ prevCropboxData: this.cropper.getCropBoxData() });
  }
  limitCropboxMovement(e) {
    const t = this.cropper.getCanvasData(), r = this.cropper.getCropBoxData(), { prevCropboxData: a } = this.state;
    if (e.detail.action === "all") {
      const o = uh(t, r, a);
      o && this.cropper.setCropBoxData(o);
    } else {
      const o = ch(t, r, a);
      o && this.cropper.setCropBoxData(o);
    }
  }
  onRotate90Deg = () => {
    const { angle90Deg: e } = this.state, t = e - 90;
    this.setState({
      angle90Deg: t,
      angleGranular: 0
    }), this.cropper.scale(1), this.cropper.rotateTo(t);
    const r = this.cropper.getCanvasData(), a = this.cropper.getContainerData(), o = lh(a, r);
    this.cropper.setCanvasData(o), this.cropper.setCropBoxData(o);
  };
  onRotateGranular = (e) => {
    const t = Number(e.target.value);
    this.setState({ angleGranular: t });
    const { angle90Deg: r } = this.state, a = r + t;
    this.cropper.rotateTo(a);
    const o = this.cropper.getImageData(), s = dh(o.naturalWidth, o.naturalHeight, t), n = this.cropper.getImageData().scaleX < 0 ? -s : s;
    this.cropper.scale(n, s);
  };
  renderGranularRotate() {
    const { i18n: e } = this.props, { angleGranular: t } = this.state;
    return u("label", { role: "tooltip", "aria-label": `${t}º`, "data-microtip-position": "top", className: "uppy-ImageCropper-rangeWrapper", children: u("input", { className: "uppy-ImageCropper-range uppy-u-reset", type: "range", onInput: this.onRotateGranular, onChange: this.onRotateGranular, value: t, min: "-45", max: "45", "aria-label": e("rotate") }) });
  }
  renderRevert() {
    const { i18n: e, opts: t } = this.props;
    return u("button", { "data-microtip-position": "top", type: "button", className: "uppy-u-reset uppy-c-btn", "aria-label": e("revert"), onClick: () => {
      this.cropper.reset(), this.cropper.setAspectRatio(t.cropperOptions.initialAspectRatio), this.setState({ angle90Deg: 0, angleGranular: 0 });
    }, children: u("svg", { "aria-hidden": "true", className: "uppy-c-icon", width: "24", height: "24", viewBox: "0 0 24 24", children: [u("path", { d: "M0 0h24v24H0z", fill: "none" }), u("path", { d: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z" })] }) });
  }
  renderRotate() {
    const { i18n: e } = this.props;
    return u("button", { "data-microtip-position": "top", type: "button", className: "uppy-u-reset uppy-c-btn", "aria-label": e("rotate"), onClick: this.onRotate90Deg, children: u("svg", { "aria-hidden": "true", className: "uppy-c-icon", width: "24", height: "24", viewBox: "0 0 24 24", children: [u("path", { d: "M0 0h24v24H0V0zm0 0h24v24H0V0z", fill: "none" }), u("path", { d: "M14 10a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h8zm0 1.75H6a.25.25 0 00-.243.193L5.75 12v7a.25.25 0 00.193.243L6 19.25h8a.25.25 0 00.243-.193L14.25 19v-7a.25.25 0 00-.193-.243L14 11.75zM12 .76V4c2.3 0 4.61.88 6.36 2.64a8.95 8.95 0 012.634 6.025L21 13a1 1 0 01-1.993.117L19 13h-.003a6.979 6.979 0 00-2.047-4.95 6.97 6.97 0 00-4.652-2.044L12 6v3.24L7.76 5 12 .76z" })] }) });
  }
  renderFlip() {
    const { i18n: e } = this.props;
    return u("button", { "data-microtip-position": "top", type: "button", className: "uppy-u-reset uppy-c-btn", "aria-label": e("flipHorizontal"), onClick: () => this.cropper.scaleX(-this.cropper.getData().scaleX || -1), children: u("svg", { "aria-hidden": "true", className: "uppy-c-icon", width: "24", height: "24", viewBox: "0 0 24 24", children: [u("path", { d: "M0 0h24v24H0z", fill: "none" }), u("path", { d: "M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z" })] }) });
  }
  renderZoomIn() {
    const { i18n: e } = this.props;
    return u("button", { "data-microtip-position": "top", type: "button", className: "uppy-u-reset uppy-c-btn", "aria-label": e("zoomIn"), onClick: () => this.cropper.zoom(0.1), children: u("svg", { "aria-hidden": "true", className: "uppy-c-icon", height: "24", viewBox: "0 0 24 24", width: "24", children: [u("path", { d: "M0 0h24v24H0V0z", fill: "none" }), u("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" }), u("path", { d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z" })] }) });
  }
  renderZoomOut() {
    const { i18n: e } = this.props;
    return u("button", { "data-microtip-position": "top", type: "button", className: "uppy-u-reset uppy-c-btn", "aria-label": e("zoomOut"), onClick: () => this.cropper.zoom(-0.1), children: u("svg", { "aria-hidden": "true", className: "uppy-c-icon", width: "24", height: "24", viewBox: "0 0 24 24", children: [u("path", { d: "M0 0h24v24H0V0z", fill: "none" }), u("path", { d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z" })] }) });
  }
  renderCropSquare() {
    const { i18n: e } = this.props;
    return u("button", { "data-microtip-position": "top", type: "button", className: "uppy-u-reset uppy-c-btn", "aria-label": e("aspectRatioSquare"), onClick: () => this.cropper.setAspectRatio(1), children: u("svg", { "aria-hidden": "true", className: "uppy-c-icon", width: "24", height: "24", viewBox: "0 0 24 24", children: [u("path", { d: "M0 0h24v24H0z", fill: "none" }), u("path", { d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z" })] }) });
  }
  renderCropWidescreen() {
    const { i18n: e } = this.props;
    return u("button", { "data-microtip-position": "top", type: "button", className: "uppy-u-reset uppy-c-btn", "aria-label": e("aspectRatioLandscape"), onClick: () => this.cropper.setAspectRatio(16 / 9), children: u("svg", { "aria-hidden": "true", className: "uppy-c-icon", width: "24", height: "24", viewBox: "0 0 24 24", children: [u("path", { d: "M 19,4.9999992 V 17.000001 H 4.9999998 V 6.9999992 H 19 m 0,-2 H 4.9999998 c -1.0999999,0 -1.9999999,0.9000001 -1.9999999,2 V 17.000001 c 0,1.1 0.9,2 1.9999999,2 H 19 c 1.1,0 2,-0.9 2,-2 V 6.9999992 c 0,-1.0999999 -0.9,-2 -2,-2 z" }), u("path", { fill: "none", d: "M0 0h24v24H0z" })] }) });
  }
  renderCropWidescreenVertical() {
    const { i18n: e } = this.props;
    return u("button", { "data-microtip-position": "top", type: "button", "aria-label": e("aspectRatioPortrait"), className: "uppy-u-reset uppy-c-btn", onClick: () => this.cropper.setAspectRatio(9 / 16), children: u("svg", { "aria-hidden": "true", className: "uppy-c-icon", width: "24", height: "24", viewBox: "0 0 24 24", children: [u("path", { d: "M 19.000001,19 H 6.999999 V 5 h 10.000002 v 14 m 2,0 V 5 c 0,-1.0999999 -0.9,-1.9999999 -2,-1.9999999 H 6.999999 c -1.1,0 -2,0.9 -2,1.9999999 v 14 c 0,1.1 0.9,2 2,2 h 10.000002 c 1.1,0 2,-0.9 2,-2 z" }), u("path", { d: "M0 0h24v24H0z", fill: "none" })] }) });
  }
  render() {
    const { currentImage: e, opts: t } = this.props, { actions: r } = t, a = URL.createObjectURL(e.data);
    return u("div", { className: "uppy-ImageCropper", children: [u("div", { className: "uppy-ImageCropper-container", children: u("img", { className: "uppy-ImageCropper-image", alt: e.name, src: a, ref: (o) => {
      this.imgElement = o;
    } }) }), u("div", { className: "uppy-ImageCropper-controls", children: [r.revert && this.renderRevert(), r.rotate && this.renderRotate(), r.granularRotate && this.renderGranularRotate(), r.flip && this.renderFlip(), r.zoomIn && this.renderZoomIn(), r.zoomOut && this.renderZoomOut(), r.cropSquare && this.renderCropSquare(), r.cropWidescreen && this.renderCropWidescreen(), r.cropWidescreenVertical && this.renderCropWidescreenVertical()] })] });
  }
}
const fh = {
  strings: {
    revert: "Reset",
    rotate: "Rotate 90°",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    flipHorizontal: "Flip horizontally",
    aspectRatioSquare: "Crop square",
    aspectRatioLandscape: "Crop landscape (16:9)",
    aspectRatioPortrait: "Crop portrait (9:16)"
  }
}, ws = {
  viewMode: 0,
  background: !1,
  autoCropArea: 1,
  responsive: !0,
  minCropBoxWidth: 70,
  minCropBoxHeight: 70,
  croppedCanvasOptions: {},
  initialAspectRatio: 0
}, xs = {
  revert: !0,
  rotate: !0,
  granularRotate: !0,
  flip: !0,
  zoomIn: !0,
  zoomOut: !0,
  cropSquare: !0,
  cropWidescreen: !0,
  cropWidescreenVertical: !0
}, mh = {
  // `quality: 1` increases the image size by orders of magnitude - 0.8 seems to be the sweet spot.
  // see https://github.com/fengyuanchen/cropperjs/issues/538#issuecomment-1776279427
  quality: 0.8,
  actions: xs,
  cropperOptions: ws
};
class gh extends ve {
  static VERSION = bc.version;
  cropper;
  constructor(e, t) {
    super(e, {
      ...mh,
      ...t,
      actions: {
        ...xs,
        ...t?.actions
      },
      cropperOptions: {
        ...ws,
        ...t?.cropperOptions
      }
    }), this.id = this.opts.id || "ImageEditor", this.title = "Image Editor", this.type = "editor", this.defaultLocale = fh, this.i18nInit();
  }
  canEditFile(e) {
    if (!e.type || e.isRemote)
      return !1;
    const t = e.type.split("/")[1];
    return !!/^(jpe?g|gif|png|bmp|webp)$/.test(t);
  }
  save = () => {
    const e = (a) => {
      const { currentImage: o } = this.getPluginState();
      this.uppy.setFileState(o.id, {
        // Reinserting image's name and type, because .toBlob loses both.
        data: new File([a], o.name ?? this.i18n("unnamed"), {
          type: a.type
        }),
        size: a.size,
        preview: void 0
      });
      const s = this.uppy.getFile(o.id);
      this.uppy.emit("thumbnail:request", s), this.setPluginState({
        currentImage: s
      }), this.uppy.emit("file-editor:complete", s);
    }, { currentImage: t } = this.getPluginState(), r = this.cropper.getCroppedCanvas({});
    r.width % 2 !== 0 && this.cropper.setData({ width: r.width - 1 }), r.height % 2 !== 0 && this.cropper.setData({ height: r.height - 1 }), this.cropper.getCroppedCanvas(this.opts.cropperOptions.croppedCanvasOptions).toBlob(e, t.type, this.opts.quality);
  };
  storeCropperInstance = (e) => {
    this.cropper = e;
  };
  selectFile = (e) => {
    this.uppy.emit("file-editor:start", e), this.setPluginState({
      currentImage: e
    });
  };
  install() {
    this.setPluginState({
      currentImage: null
    });
    const { target: e } = this.opts;
    e && this.mount(e, this);
  }
  uninstall() {
    const { currentImage: e } = this.getPluginState();
    if (e) {
      const t = this.uppy.getFile(e.id);
      this.uppy.emit("file-editor:cancel", t);
    }
    this.unmount();
  }
  render() {
    const { currentImage: e } = this.getPluginState();
    return e === null || e.isRemote ? null : u(hh, { currentImage: e, storeCropperInstance: this.storeCropperInstance, save: this.save, opts: this.opts, i18n: this.i18n });
  }
}
const yh = ".uppy-Root{box-sizing:border-box;color:#333;font-family:-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Segoe UI Symbol,Segoe UI Emoji,Apple Color Emoji,Roboto,Helvetica,Arial,sans-serif;line-height:1;position:relative;text-align:left;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.uppy-Root[dir=rtl],[dir=rtl] .uppy-Root{text-align:right}.uppy-Root *,.uppy-Root :after,.uppy-Root :before{box-sizing:inherit}.uppy-Root [hidden]{display:none}.uppy-u-reset{all:initial;appearance:none;box-sizing:border-box;font-family:-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Segoe UI Symbol,Segoe UI Emoji,Apple Color Emoji,Roboto,Helvetica,Arial,sans-serif;line-height:1}[dir=rtl] .uppy-u-reset{text-align:right}.uppy-c-textInput{background-color:#fff;border:1px solid #ddd;border-radius:4px;font-family:inherit;font-size:14px;line-height:1.5;padding:6px 8px}.uppy-size--md .uppy-c-textInput{padding:8px 10px}.uppy-c-textInput:focus{border-color:#1269cf99;box-shadow:0 0 0 3px #1269cf26;outline:none}[data-uppy-theme=dark] .uppy-c-textInput{background-color:#333;border-color:#333;color:#eaeaea}[data-uppy-theme=dark] .uppy-c-textInput:focus{border-color:#525252;box-shadow:none}.uppy-c-icon{display:inline-block;max-height:100%;max-width:100%;overflow:hidden;fill:currentColor}.uppy-c-btn{align-items:center;color:inherit;display:inline-flex;font-family:inherit;font-size:inherit;font-weight:500;justify-content:center;line-height:1;transition-duration:.3s;transition-property:background-color,color;user-select:none;white-space:nowrap}.uppy-c-btn,[dir=rtl] .uppy-c-btn{text-align:center}.uppy-c-btn:not(:disabled):not(.disabled){cursor:pointer}.uppy-c-btn::-moz-focus-inner{border:0}.uppy-c-btn-primary{background-color:#1269cf;border-radius:4px;color:#fff;font-size:14px;padding:10px 18px}.uppy-c-btn-primary:not(:disabled):hover{background-color:#0e51a0}.uppy-c-btn-primary:focus{box-shadow:0 0 0 3px #1269cf66;outline:none}.uppy-size--md .uppy-c-btn-primary{padding:13px 22px}[data-uppy-theme=dark] .uppy-c-btn-primary{color:#eaeaea}[data-uppy-theme=dark] .uppy-c-btn-primary:focus{outline:none}[data-uppy-theme=dark] .uppy-c-btn-primary::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-c-btn-primary:focus{box-shadow:0 0 0 2px #aae1ffd9}.uppy-c-btn-primary.uppy-c-btn--disabled{background-color:#8eb2db}.uppy-c-btn-link{background-color:initial;border-radius:4px;color:#525252;font-size:14px;line-height:1;padding:10px 15px}.uppy-c-btn-link:hover{color:#333}.uppy-c-btn-link:focus{box-shadow:0 0 0 3px #1269cf40;outline:none}.uppy-size--md .uppy-c-btn-link{padding:13px 18px}[data-uppy-theme=dark] .uppy-c-btn-link{color:#eaeaea}[data-uppy-theme=dark] .uppy-c-btn-link:focus{outline:none}[data-uppy-theme=dark] .uppy-c-btn-link::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-c-btn-link:focus{box-shadow:0 0 0 2px #aae1ffd9}[data-uppy-theme=dark] .uppy-c-btn-link:hover{color:#939393}", bh = `@charset "UTF-8";.uppy-Informer{bottom:60px;left:0;position:absolute;right:0;text-align:center;z-index:1005}.uppy-Informer span>div{margin-bottom:6px}.uppy-Informer-animated{opacity:0;transform:translateY(350%);transition:all .3s ease-in;z-index:-1000}.uppy-Informer p{background-color:#757575;border-radius:18px;color:#fff;display:inline-block;font-size:12px;font-weight:400;line-height:1.4;margin:0;max-width:90%;padding:6px 15px}.uppy-size--md .uppy-Informer p{font-size:14px;line-height:1.3;max-width:500px;padding:10px 20px}[data-uppy-theme=dark] .uppy-Informer p{background-color:#333}.uppy-Informer p span{background-color:#fff;border-radius:50%;color:#525252;display:inline-block;font-size:10px;height:13px;inset-inline-start:3px;line-height:12px;margin-inline-start:-1px;position:relative;top:-1px;vertical-align:middle;width:13px}.uppy-Informer p span:hover{cursor:help}.uppy-Informer p span:after{line-height:1.3;word-wrap:break-word}.uppy-Root [aria-label][role~=tooltip]{position:relative}.uppy-Root [aria-label][role~=tooltip]:after,.uppy-Root [aria-label][role~=tooltip]:before{-webkit-backface-visibility:hidden;backface-visibility:hidden;box-sizing:border-box;opacity:0;pointer-events:none;position:absolute;transform:translateZ(0);transform-origin:top;transition:all var(--microtip-transition-duration,.18s) var(--microtip-transition-easing,ease-in-out) var(--microtip-transition-delay,0s);will-change:transform;z-index:10}.uppy-Root [aria-label][role~=tooltip]:before{background-size:100% auto!important;content:""}.uppy-Root [aria-label][role~=tooltip]:after{background:#111111e6;border-radius:4px;box-sizing:initial;color:#fff;content:attr(aria-label);font-size:var(--microtip-font-size,13px);font-weight:var(--microtip-font-weight,normal);padding:.5em 1em;text-transform:var(--microtip-text-transform,none);white-space:nowrap}.uppy-Root [aria-label][role~=tooltip]:focus:after,.uppy-Root [aria-label][role~=tooltip]:focus:before,.uppy-Root [aria-label][role~=tooltip]:hover:after,.uppy-Root [aria-label][role~=tooltip]:hover:before{opacity:1;pointer-events:auto}.uppy-Root [role~=tooltip][data-microtip-position|=top]:before{background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='12'%3E%3Cpath fill='rgba(17, 17, 17, 0.9)' d='M2.658 0h32.004c-6 0-11.627 12.002-16.002 12.002S8.594 0 2.658 0'/%3E%3C/svg%3E") no-repeat;bottom:100%;height:6px;left:50%;margin-bottom:5px;transform:translate3d(-50%,0,0);width:18px}.uppy-Root [role~=tooltip][data-microtip-position|=top]:after{bottom:100%;left:50%;margin-bottom:11px;transform:translate3d(-50%,0,0)}.uppy-Root [role~=tooltip][data-microtip-position=top]:hover:after,.uppy-Root [role~=tooltip][data-microtip-position|=top]:hover:before{transform:translate3d(-50%,-5px,0)}.uppy-Root [role~=tooltip][data-microtip-position=top-left]:after{bottom:100%;transform:translate3d(calc(-100% + 16px),0,0)}.uppy-Root [role~=tooltip][data-microtip-position=top-left]:hover:after{transform:translate3d(calc(-100% + 16px),-5px,0)}.uppy-Root [role~=tooltip][data-microtip-position=top-right]:after{bottom:100%;transform:translate3d(-16px,0,0)}.uppy-Root [role~=tooltip][data-microtip-position=top-right]:hover:after{transform:translate3d(-16px,-5px,0)}.uppy-Root [role~=tooltip][data-microtip-position|=bottom]:before{background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='12'%3E%3Cpath fill='rgba(17, 17, 17, 0.9)' d='M33.342 12H1.338c6 0 11.627-12.002 16.002-12.002S27.406 12 33.342 12'/%3E%3C/svg%3E") no-repeat;bottom:auto;height:6px;left:50%;margin-bottom:0;margin-top:5px;top:100%;transform:translate3d(-50%,-10px,0);width:18px}.uppy-Root [role~=tooltip][data-microtip-position|=bottom]:after{left:50%;margin-top:11px;top:100%;transform:translate3d(-50%,-10px,0)}.uppy-Root [role~=tooltip][data-microtip-position=bottom]:hover:after,.uppy-Root [role~=tooltip][data-microtip-position|=bottom]:hover:before{transform:translate3d(-50%,0,0)}.uppy-Root [role~=tooltip][data-microtip-position=bottom-left]:after{top:100%;transform:translate3d(calc(-100% + 16px),-10px,0)}.uppy-Root [role~=tooltip][data-microtip-position=bottom-left]:hover:after{transform:translate3d(calc(-100% + 16px),0,0)}.uppy-Root [role~=tooltip][data-microtip-position=bottom-right]:after{top:100%;transform:translate3d(-16px,-10px,0)}.uppy-Root [role~=tooltip][data-microtip-position=bottom-right]:hover:after{transform:translate3d(-16px,0,0)}.uppy-Root [role~=tooltip][data-microtip-position=left]:after,.uppy-Root [role~=tooltip][data-microtip-position=left]:before{inset:50% 100% auto auto;transform:translate3d(10px,-50%,0)}.uppy-Root [role~=tooltip][data-microtip-position=left]:before{background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='36'%3E%3Cpath fill='rgba(17, 17, 17, 0.9)' d='M0 33.342V1.338c0 6 12.002 11.627 12.002 16.002S0 27.406 0 33.342'/%3E%3C/svg%3E") no-repeat;height:18px;margin-bottom:0;margin-right:5px;width:6px}.uppy-Root [role~=tooltip][data-microtip-position=left]:after{margin-right:11px}.uppy-Root [role~=tooltip][data-microtip-position=left]:hover:after,.uppy-Root [role~=tooltip][data-microtip-position=left]:hover:before{transform:translate3d(0,-50%,0)}.uppy-Root [role~=tooltip][data-microtip-position=right]:after,.uppy-Root [role~=tooltip][data-microtip-position=right]:before{bottom:auto;left:100%;top:50%;transform:translate3d(-10px,-50%,0)}.uppy-Root [role~=tooltip][data-microtip-position=right]:before{background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='36'%3E%3Cpath fill='rgba(17, 17, 17, 0.9)' d='M12 2.658v32.004c0-6-12.002-11.627-12.002-16.002S12 8.594 12 2.658'/%3E%3C/svg%3E") no-repeat;height:18px;margin-bottom:0;margin-left:5px;width:6px}.uppy-Root [role~=tooltip][data-microtip-position=right]:after{margin-left:11px}.uppy-Root [role~=tooltip][data-microtip-position=right]:hover:after,.uppy-Root [role~=tooltip][data-microtip-position=right]:hover:before{transform:translate3d(0,-50%,0)}.uppy-Root [role~=tooltip][data-microtip-size=small]:after{white-space:normal;width:80px}.uppy-Root [role~=tooltip][data-microtip-size=medium]:after{white-space:normal;width:150px}.uppy-Root [role~=tooltip][data-microtip-size=large]:after{white-space:normal;width:260px}.uppy-StatusBar{background-color:#fff;color:#fff;display:flex;font-size:12px;font-weight:400;height:46px;line-height:40px;position:relative;transition:height .2s;z-index:1001}[data-uppy-theme=dark] .uppy-StatusBar{background-color:#1f1f1f}.uppy-StatusBar:before{background-color:#eaeaea;content:"";height:2px;inset:0;position:absolute;width:100%}[data-uppy-theme=dark] .uppy-StatusBar:before{background-color:#757575}.uppy-StatusBar[aria-hidden=true]{height:0;overflow-y:hidden}.uppy-StatusBar.is-complete .uppy-StatusBar-progress{background-color:#1bb240}.uppy-StatusBar.is-error .uppy-StatusBar-progress{background-color:#e32437}.uppy-StatusBar.is-complete .uppy-StatusBar-statusIndicator{color:#1bb240}.uppy-StatusBar.is-error .uppy-StatusBar-statusIndicator{color:#e32437}.uppy-StatusBar:not([aria-hidden=true]).is-waiting{background-color:#fff;border-top:1px solid #eaeaea;height:65px}[data-uppy-theme=dark] .uppy-StatusBar:not([aria-hidden=true]).is-waiting{background-color:#1f1f1f;border-top:1px solid #333}.uppy-StatusBar-progress{background-color:#1269cf;height:2px;position:absolute;transition:background-color,width .3s ease-out;z-index:1001}.uppy-StatusBar-progress.is-indeterminate{animation:uppy-StatusBar-ProgressStripes 1s linear infinite;background-image:linear-gradient(45deg,#0000004d 25%,#0000 0 50%,#0000004d 0 75%,#0000 0,#0000);background-size:64px 64px}@keyframes uppy-StatusBar-ProgressStripes{0%{background-position:0 0}to{background-position:64px 0}}.uppy-StatusBar.is-postprocessing .uppy-StatusBar-progress,.uppy-StatusBar.is-preprocessing .uppy-StatusBar-progress{background-color:#f6a623}.uppy-StatusBar.is-waiting .uppy-StatusBar-progress{display:none}.uppy-StatusBar-content{align-items:center;color:#333;display:flex;height:100%;padding-inline-start:10px;position:relative;text-overflow:ellipsis;white-space:nowrap;z-index:1002}.uppy-size--md .uppy-StatusBar-content{padding-inline-start:15px}[data-uppy-theme=dark] .uppy-StatusBar-content{color:#eaeaea}.uppy-StatusBar-status{display:flex;flex-direction:column;font-weight:400;justify-content:center;line-height:1.4;padding-inline-end:.3em}.uppy-StatusBar-statusPrimary{display:flex;font-weight:500;line-height:1}.uppy-StatusBar-statusPrimary button.uppy-StatusBar-details{margin-left:5px}[data-uppy-theme=dark] .uppy-StatusBar-statusPrimary{color:#eaeaea}.uppy-StatusBar-statusSecondary{color:#757575;display:inline-block;font-size:11px;line-height:1.2;margin-top:1px;white-space:nowrap}[data-uppy-theme=dark] .uppy-StatusBar-statusSecondary{color:#bbb}.uppy-StatusBar-statusSecondaryHint{display:inline-block;line-height:1;margin-inline-end:5px;vertical-align:middle}.uppy-size--md .uppy-StatusBar-statusSecondaryHint{margin-inline-end:8px}.uppy-StatusBar-statusIndicator{color:#525252;margin-inline-end:7px;position:relative;top:1px}.uppy-StatusBar-statusIndicator svg{vertical-align:text-bottom}.uppy-StatusBar-actions{align-items:center;bottom:0;display:flex;inset-inline-end:10px;position:absolute;top:0;z-index:1004}.uppy-StatusBar.is-waiting .uppy-StatusBar-actions{background-color:#fafafa;height:100%;padding:0 15px;position:static;width:100%}[data-uppy-theme=dark] .uppy-StatusBar.is-waiting .uppy-StatusBar-actions{background-color:#1f1f1f}.uppy-StatusBar:not([aria-hidden=true]).is-waiting.has-ghosts{flex-direction:column;height:90px}.uppy-size--md .uppy-StatusBar:not([aria-hidden=true]).is-waiting.has-ghosts{flex-direction:row;height:65px}.uppy-StatusBar:not([aria-hidden=true]).is-waiting.has-ghosts .uppy-StatusBar-actions{flex-direction:column;justify-content:center}.uppy-size--md .uppy-StatusBar:not([aria-hidden=true]).is-waiting.has-ghosts .uppy-StatusBar-actions{flex-direction:row;justify-content:normal}.uppy-StatusBar-actionCircleBtn{cursor:pointer;line-height:1;margin:3px;opacity:.9}.uppy-StatusBar-actionCircleBtn:focus{outline:none}.uppy-StatusBar-actionCircleBtn::-moz-focus-inner{border:0}.uppy-StatusBar-actionCircleBtn:focus{box-shadow:0 0 0 3px #1269cf80}[data-uppy-theme=dark] .uppy-StatusBar-actionCircleBtn:focus{outline:none}[data-uppy-theme=dark] .uppy-StatusBar-actionCircleBtn::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-StatusBar-actionCircleBtn:focus{box-shadow:0 0 0 2px #aae1ffd9}.uppy-StatusBar-actionCircleBtn:hover{opacity:1}.uppy-StatusBar-actionCircleBtn:focus{border-radius:50%}.uppy-StatusBar-actionCircleBtn svg{vertical-align:bottom}.uppy-StatusBar-actionBtn{color:#1269cf;display:inline-block;font-size:10px;line-height:inherit;vertical-align:middle}.uppy-size--md .uppy-StatusBar-actionBtn{font-size:11px}.uppy-StatusBar-actionBtn--disabled{opacity:.4}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--disabled{opacity:.7}.uppy-StatusBar-actionBtn--retry{background-color:#ff4b23;border-radius:8px;color:#fff;height:16px;line-height:1;margin-inline-end:6px;padding:1px 6px 3px 18px;position:relative}.uppy-StatusBar-actionBtn--retry:focus{outline:none}.uppy-StatusBar-actionBtn--retry::-moz-focus-inner{border:0}.uppy-StatusBar-actionBtn--retry:focus{box-shadow:0 0 0 3px #1269cf80}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--retry:focus{outline:none}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--retry::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--retry:focus{box-shadow:0 0 0 2px #aae1ffd9}.uppy-StatusBar-actionBtn--retry:hover{background-color:#f92d00}.uppy-StatusBar-actionBtn--retry svg{inset-inline-start:6px;position:absolute;top:3px}.uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload{background-color:#1bb240;color:#fff;font-size:14px;line-height:1;padding:15px 10px;width:100%}.uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload:hover{background-color:#189c38}[data-uppy-theme=dark] .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload{background-color:#1c8b37}[data-uppy-theme=dark] .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload:hover{background-color:#18762f}.uppy-size--md .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload{padding:13px 22px;width:auto}.uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload.uppy-StatusBar-actionBtn--disabled:hover{background-color:#1bb240;cursor:not-allowed}[data-uppy-theme=dark] .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload.uppy-StatusBar-actionBtn--disabled:hover{background-color:#1c8b37}.uppy-StatusBar:not(.is-waiting) .uppy-StatusBar-actionBtn--upload{background-color:initial;color:#1269cf}.uppy-StatusBar-actionBtn--uploadNewlyAdded{border-radius:3px;padding-inline-end:3px;padding-bottom:1px;padding-inline-start:3px}.uppy-StatusBar-actionBtn--uploadNewlyAdded:focus{outline:none}.uppy-StatusBar-actionBtn--uploadNewlyAdded::-moz-focus-inner{border:0}.uppy-StatusBar-actionBtn--uploadNewlyAdded:focus{box-shadow:0 0 0 3px #1269cf80}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--uploadNewlyAdded:focus{outline:none}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--uploadNewlyAdded::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--uploadNewlyAdded:focus{box-shadow:0 0 0 2px #aae1ffd9}.uppy-StatusBar.is-postprocessing .uppy-StatusBar-actionBtn--uploadNewlyAdded,.uppy-StatusBar.is-preprocessing .uppy-StatusBar-actionBtn--uploadNewlyAdded{display:none}.uppy-StatusBar-actionBtn--done{border-radius:3px;line-height:1;padding:7px 8px}.uppy-StatusBar-actionBtn--done:focus{outline:none}.uppy-StatusBar-actionBtn--done::-moz-focus-inner{border:0}.uppy-StatusBar-actionBtn--done:hover{color:#0e51a0}.uppy-StatusBar-actionBtn--done:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--done:focus{background-color:#333}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--done{color:#02baf2}.uppy-size--md .uppy-StatusBar-actionBtn--done{font-size:14px}.uppy-StatusBar-serviceMsg{color:#000;font-size:11px;line-height:1.1;padding-left:10px}.uppy-size--md .uppy-StatusBar-serviceMsg{font-size:14px;padding-left:15px}[data-uppy-theme=dark] .uppy-StatusBar-serviceMsg{color:#eaeaea}.uppy-StatusBar-serviceMsg-ghostsIcon{left:6px;opacity:.5;position:relative;top:2px;vertical-align:text-bottom;width:10px}.uppy-size--md .uppy-StatusBar-serviceMsg-ghostsIcon{left:10px;top:1px;width:15px}.uppy-StatusBar-details{appearance:none;background-color:#939393;border-radius:50%;color:#fff;cursor:help;display:inline-block;font-size:10px;font-weight:600;height:13px;inset-inline-start:2px;line-height:12px;position:relative;text-align:center;top:0;vertical-align:middle;width:13px}.uppy-StatusBar-details:after{line-height:1.3;word-wrap:break-word}.uppy-StatusBar-spinner{animation-duration:1s;animation-iteration-count:infinite;animation-name:uppy-StatusBar-spinnerAnimation;animation-timing-function:linear;fill:#1269cf;margin-inline-end:10px}.uppy-StatusBar.is-postprocessing .uppy-StatusBar-spinner,.uppy-StatusBar.is-preprocessing .uppy-StatusBar-spinner{fill:#f6a623}@keyframes uppy-StatusBar-spinnerAnimation{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.uppy-ProviderBrowser-viewType--grid ul.uppy-ProviderBrowser-list,.uppy-ProviderBrowser-viewType--unsplash ul.uppy-ProviderBrowser-list{align-items:flex-start;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;padding:6px}.uppy-ProviderBrowser-viewType--grid ul.uppy-ProviderBrowser-list:after,.uppy-ProviderBrowser-viewType--unsplash ul.uppy-ProviderBrowser-list:after{content:"";flex:auto}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem{margin:0;position:relative;width:50%}.uppy-size--md .uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem,.uppy-size--md .uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem{width:33.3333%}.uppy-size--lg .uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem,.uppy-size--lg .uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem{width:25%}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem:before,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem:before{content:"";display:block;padding-top:100%}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--selected img,.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--selected svg,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--selected img,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--selected svg{opacity:.85}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--disabled,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--disabled{opacity:.5}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--noPreview .uppy-ProviderBrowserItem-inner,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--noPreview .uppy-ProviderBrowserItem-inner{background-color:#93939333}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--noPreview .uppy-ProviderBrowserItem-inner,[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--noPreview .uppy-ProviderBrowserItem-inner{background-color:#eaeaea33}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--noPreview svg,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--noPreview svg{height:30%;width:30%;fill:#000000b3}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--noPreview svg,[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--noPreview svg{fill:#fffc}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-inner,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-inner{border-radius:4px;height:calc(100% - 14px);inset:7px;overflow:hidden;position:absolute;text-align:center;width:calc(100% - 14px)}@media (hover:none){.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-inner .uppy-ProviderBrowserItem-author,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-inner .uppy-ProviderBrowserItem-author{display:block}}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-inner,[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-inner{box-shadow:0 0 0 3px #aae1ffb3}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-inner img,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-inner img{border-radius:4px;height:100%;object-fit:cover;width:100%}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-author,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-author{background:#0000004d;bottom:0;color:#fff;display:none;font-size:12px;font-weight:500;left:0;margin:0;padding:5px;position:absolute;text-decoration:none;width:100%}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-author:hover,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-author:hover{background:#0006;text-decoration:underline}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox{background-color:#1269cf;border-radius:50%;height:26px;opacity:0;position:absolute;right:16px;top:16px;width:26px;z-index:1002}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox:after,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox:after{height:7px;inset-inline-start:7px;top:8px;width:12px}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox{opacity:1}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox--grid:focus+label .uppy-ProviderBrowserItem-author,.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox--grid:hover+label .uppy-ProviderBrowserItem-author,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox--grid:focus+label .uppy-ProviderBrowserItem-author,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox--grid:hover+label .uppy-ProviderBrowserItem-author{display:block}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox--grid:focus+label,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox--grid:focus+label{box-shadow:0 0 0 3px #1269cf80}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox--grid:focus+label:focus,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox--grid:focus+label:focus{outline:none}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox--grid:focus+label::-moz-focus-inner,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox--grid:focus+label::-moz-focus-inner{border:0}.uppy-ProviderBrowser-viewType--list{background-color:#fff}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--list{background-color:#1f1f1f}.uppy-ProviderBrowser-viewType--list li.uppy-ProviderBrowserItem{align-items:center;display:flex;margin:0;padding:7px 15px}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--list li.uppy-ProviderBrowserItem{color:#eaeaea}.uppy-ProviderBrowser-viewType--list li.uppy-ProviderBrowserItem--disabled{opacity:.6}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox{background-color:#fff;border:1px solid #cfcfcf;border-radius:3px;height:17px;margin-inline-end:15px;width:17px}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox:focus{border:1px solid #1269cf;box-shadow:0 0 0 3px #1269cf40;outline:none}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox:after{height:5px;inset-inline-start:3px;opacity:0;top:4px;width:9px}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox:focus{border-color:#02baf2b3;box-shadow:0 0 0 3px #02baf233}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox,.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem--is-partial .uppy-ProviderBrowserItem-checkbox{background-color:#1269cf;border-color:#1269cf}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox:after,.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem--is-partial .uppy-ProviderBrowserItem-checkbox:after{opacity:1}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner{align-items:center;color:inherit;display:flex;font-family:-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Segoe UI Symbol,Segoe UI Emoji,Apple Color Emoji,Roboto,Helvetica,Arial,sans-serif;overflow:hidden;padding:2px;text-overflow:ellipsis;white-space:nowrap}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner:focus{outline:none;text-decoration:underline}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner img,.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner svg{margin-inline-end:8px}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner span{line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem--disabled .uppy-ProviderBrowserItem-inner{cursor:default}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-iconWrap{margin-inline-end:7px;width:20px}.uppy-ProviderBrowserItem-checkbox{cursor:pointer;flex-shrink:0;position:relative}.uppy-ProviderBrowserItem-checkbox:disabled,.uppy-ProviderBrowserItem-checkbox:disabled:after{cursor:default}[data-uppy-theme=dark] .uppy-ProviderBrowserItem-checkbox{background-color:#1f1f1f;border-color:#939393}[data-uppy-theme=dark] .uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox{background-color:#333}.uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox:after{border-bottom:2px solid #eaeaea;border-left:2px solid #eaeaea;content:"";cursor:pointer;position:absolute;transform:rotate(-45deg)}.uppy-ProviderBrowserItem--is-partial .uppy-ProviderBrowserItem-checkbox:after{background-color:#eaeaea!important;content:""!important;height:2px!important;left:20%!important;position:absolute!important;right:20%!important;top:50%!important;transform:translateY(-50%)!important}.uppy-SearchProvider{align-items:center;display:flex;flex:1;flex-direction:column;height:100%;justify-content:center;width:100%}[data-uppy-theme=dark] .uppy-SearchProvider{background-color:#1f1f1f}.uppy-SearchProvider-input{margin-bottom:15px;max-width:650px;width:90%}.uppy-size--md .uppy-SearchProvider-input{margin-bottom:20px}.uppy-SearchProvider-input::-webkit-search-cancel-button{display:none}.uppy-SearchProvider-searchButton{padding:13px 25px}.uppy-size--md .uppy-SearchProvider-searchButton{padding:13px 30px}.uppy-DashboardContent-panelBody{align-items:center;display:flex;flex:1;justify-content:center}[data-uppy-theme=dark] .uppy-DashboardContent-panelBody{background-color:#1f1f1f}.uppy-Provider-auth,.uppy-Provider-empty,.uppy-Provider-error,.uppy-Provider-loading{align-items:center;color:#939393;display:flex;flex:1;flex-flow:column wrap;justify-content:center}.uppy-Provider-empty{color:#939393}.uppy-Provider-authIcon svg{height:75px;width:100px}.uppy-Provider-authTitle{color:#757575;font-size:17px;font-weight:400;line-height:1.4;margin-bottom:30px;max-width:500px;padding:0 15px;text-align:center}.uppy-size--md .uppy-Provider-authTitle{font-size:20px}[data-uppy-theme=dark] .uppy-Provider-authTitle{color:#cfcfcf}.uppy-Provider-btn-google{align-items:center;background:#4285f4;display:flex;padding:8px 12px!important}.uppy-Provider-btn-google:hover{background-color:#1266f1}.uppy-Provider-btn-google:focus{box-shadow:0 0 0 3px #4285f466;outline:none}.uppy-Provider-btn-google svg{margin-right:8px}.uppy-Provider-breadcrumbs{color:#525252;flex:1;font-size:12px;margin-bottom:10px;text-align:start}.uppy-size--md .uppy-Provider-breadcrumbs{margin-bottom:0}[data-uppy-theme=dark] .uppy-Provider-breadcrumbs{color:#eaeaea}.uppy-Provider-breadcrumbsIcon{color:#525252;display:inline-block;line-height:1;margin-inline-end:4px;vertical-align:middle}.uppy-Provider-breadcrumbsIcon svg{height:13px;width:13px;fill:#525252}.uppy-Provider-breadcrumbs button{border-radius:3px;display:inline-block;line-height:inherit;padding:4px}.uppy-Provider-breadcrumbs button:focus{outline:none}.uppy-Provider-breadcrumbs button::-moz-focus-inner{border:0}.uppy-Provider-breadcrumbs button:hover{color:#0e51a0}.uppy-Provider-breadcrumbs button:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-Provider-breadcrumbs button:focus{background-color:#333}.uppy-Provider-breadcrumbs button:not(:last-of-type){text-decoration:underline}.uppy-Provider-breadcrumbs button:last-of-type{color:#333;cursor:normal;font-weight:500;pointer-events:none}.uppy-Provider-breadcrumbs button:hover{cursor:pointer}[data-uppy-theme=dark] .uppy-Provider-breadcrumbs button{color:#eaeaea}.uppy-ProviderBrowser{display:flex;flex:1;flex-direction:column;font-size:14px;font-weight:400;height:100%}.uppy-ProviderBrowser-user{color:#333;font-weight:500;margin:0 8px 0 0}[data-uppy-theme=dark] .uppy-ProviderBrowser-user{color:#eaeaea}.uppy-ProviderBrowser-user:after{color:#939393;content:"·";font-weight:400;inset-inline-start:4px;position:relative}.uppy-ProviderBrowser-header{border-bottom:1px solid #eaeaea;position:relative;z-index:1001}[data-uppy-theme=dark] .uppy-ProviderBrowser-header{border-bottom:1px solid #333}.uppy-ProviderBrowser-headerBar{background-color:#fafafa;color:#757575;font-size:12px;line-height:1.4;padding:7px 15px;z-index:1001}.uppy-size--md .uppy-ProviderBrowser-headerBar{align-items:center;display:flex}[data-uppy-theme=dark] .uppy-ProviderBrowser-headerBar{background-color:#1f1f1f}.uppy-ProviderBrowser-headerBar--simple{display:block;justify-content:center;text-align:center}.uppy-ProviderBrowser-headerBar--simple .uppy-Provider-breadcrumbsWrap{display:inline-block;flex:none;vertical-align:middle}.uppy-ProviderBrowser-searchFilter{align-items:center;display:flex;height:30px;margin-bottom:15px;margin-top:15px;padding-left:8px;padding-right:8px;position:relative;width:100%}.uppy-ProviderBrowser-searchFilterInput{background-color:#eaeaea;border:0;border-radius:4px;color:#333;font-family:-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Segoe UI Symbol,Segoe UI Emoji,Apple Color Emoji,Roboto,Helvetica,Arial,sans-serif;font-size:13px;height:30px;line-height:1.4;outline:0;padding-inline-end:30px;padding-inline-start:30px;width:100%;z-index:1001}.uppy-ProviderBrowser-searchFilterInput::-webkit-search-cancel-button{display:none}[data-uppy-theme=dark] .uppy-ProviderBrowser-searchFilterInput{background-color:#1f1f1f;color:#eaeaea}.uppy-ProviderBrowser-searchFilterInput:focus{background-color:#cfcfcf;border:0}[data-uppy-theme=dark] .uppy-ProviderBrowser-searchFilterInput:focus{background-color:#333}.uppy-ProviderBrowser-searchFilterIcon{color:#757575;height:12px;inset-inline-start:16px;position:absolute;width:12px;z-index:1002}.uppy-ProviderBrowser-searchFilterInput::placeholder{color:#939393;opacity:1}.uppy-ProviderBrowser-searchFilterReset{border-radius:3px;color:#939393;cursor:pointer;height:22px;inset-inline-end:16px;padding:6px;position:absolute;width:22px;z-index:1002}.uppy-ProviderBrowser-searchFilterReset:focus{outline:none}.uppy-ProviderBrowser-searchFilterReset::-moz-focus-inner{border:0}.uppy-ProviderBrowser-searchFilterReset:focus{box-shadow:0 0 0 3px #1269cf80}.uppy-ProviderBrowser-searchFilterReset:hover{color:#757575}.uppy-ProviderBrowser-searchFilterReset svg{vertical-align:text-top}.uppy-ProviderBrowser-userLogout{border-radius:3px;color:#1269cf;cursor:pointer;line-height:inherit;padding:4px}.uppy-ProviderBrowser-userLogout:focus{outline:none}.uppy-ProviderBrowser-userLogout::-moz-focus-inner{border:0}.uppy-ProviderBrowser-userLogout:hover{color:#0e51a0}.uppy-ProviderBrowser-userLogout:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-ProviderBrowser-userLogout:focus{background-color:#333}.uppy-ProviderBrowser-userLogout:hover{text-decoration:underline}[data-uppy-theme=dark] .uppy-ProviderBrowser-userLogout{color:#eaeaea}.uppy-ProviderBrowser-body{flex:1;position:relative}.uppy-ProviderBrowser-list{background-color:#fff;border-spacing:0;display:block;flex:1;height:100%;inset:0;list-style:none;margin:0;overflow-x:hidden;overflow-y:auto;padding:0;position:absolute;width:100%;-webkit-overflow-scrolling:touch}[data-uppy-theme=dark] .uppy-ProviderBrowser-list{background-color:#1f1f1f}.uppy-ProviderBrowser-list:focus{outline:none}.uppy-ProviderBrowserItem-inner{cursor:pointer;font-size:13px;font-weight:500}.uppy-ProviderBrowser-footer{align-items:center;background-color:#fff;border-top:1px solid #eaeaea;display:flex;justify-content:space-between;padding:15px}.uppy-ProviderBrowser-footer button{margin-inline-end:8px}[data-uppy-theme=dark] .uppy-ProviderBrowser-footer{background-color:#1f1f1f;border-top:1px solid #333}.uppy-ProviderBrowser-footer-buttons{flex-shrink:0}.uppy-ProviderBrowser-footer-error{color:#e32437;line-height:18px}@media (max-width:426px){.uppy-ProviderBrowser-footer{align-items:stretch;flex-direction:column-reverse}.uppy-ProviderBrowser-footer-error{padding-bottom:10px}}.picker-dialog-bg{z-index:20000!important}.picker-dialog{z-index:20001!important}.uppy-Dashboard-Item-previewInnerWrap{align-items:center;border-radius:3px;box-shadow:0 0 2px #0006;display:flex;flex-direction:column;height:100%;justify-content:center;overflow:hidden;position:relative;width:100%}.uppy-size--md .uppy-Dashboard-Item-previewInnerWrap{box-shadow:0 1px 2px #00000026}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-previewInnerWrap{box-shadow:none}.uppy-Dashboard-Item-previewInnerWrap:after{background-color:#000000a6;content:"";display:none;inset:0;position:absolute;z-index:1001}.uppy-Dashboard-Item-previewLink{inset:0;position:absolute;z-index:1002}.uppy-Dashboard-Item-previewLink:focus{box-shadow:inset 0 0 0 3px #579df0}[data-uppy-theme=dark] .uppy-Dashboard-Item-previewLink:focus{box-shadow:inset 0 0 0 3px #016c8d}.uppy-Dashboard-Item-preview img.uppy-Dashboard-Item-previewImg{border-radius:3px;height:100%;object-fit:cover;transform:translateZ(0);width:100%}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-preview img.uppy-Dashboard-Item-previewImg{height:auto;max-height:100%;max-width:100%;object-fit:contain;padding:10px;width:auto}.uppy-Dashboard-Item-progress{color:#fff;left:50%;position:absolute;text-align:center;top:50%;transform:translate(-50%,-50%);transition:all .35 ease;width:120px;z-index:1002}.uppy-Dashboard-Item-progressIndicator{color:#fff;display:inline-block;height:38px;opacity:.9;width:38px}.uppy-size--md .uppy-Dashboard-Item-progressIndicator{height:55px;width:55px}button.uppy-Dashboard-Item-progressIndicator{cursor:pointer}button.uppy-Dashboard-Item-progressIndicator:focus{outline:none}button.uppy-Dashboard-Item-progressIndicator::-moz-focus-inner{border:0}button.uppy-Dashboard-Item-progressIndicator:focus .uppy-Dashboard-Item-progressIcon--bg,button.uppy-Dashboard-Item-progressIndicator:focus .uppy-Dashboard-Item-progressIcon--retry{fill:#579df0}.uppy-Dashboard-Item-progressIcon--circle{height:100%;width:100%}.uppy-Dashboard-Item-progressIcon--bg{stroke:#fff6}.uppy-Dashboard-Item-progressIcon--progress{transition:stroke-dashoffset .5s ease-out;stroke:#fff}.uppy-Dashboard-Item-progressIcon--play{transition:all .2s;fill:#fff;stroke:#fff}.uppy-Dashboard-Item-progressIcon--cancel{transition:all .2s;fill:#fff}.uppy-Dashboard-Item-progressIcon--pause{transition:all .2s;fill:#fff;stroke:#fff}.uppy-Dashboard-Item-progressIcon--check{transition:all .2s;fill:#fff}.uppy-Dashboard-Item-progressIcon--retry{fill:#fff}.uppy-Dashboard-Item.is-complete .uppy-Dashboard-Item-progress{inset-inline-end:-8px;inset-inline-start:auto;top:-9px;transform:none;width:auto}.uppy-Dashboard-Item.is-error .uppy-Dashboard-Item-progressIndicator{height:18px;width:18px}.uppy-size--md .uppy-Dashboard-Item.is-error .uppy-Dashboard-Item-progressIndicator{height:28px;width:28px}.uppy-Dashboard-Item.is-complete .uppy-Dashboard-Item-progressIndicator{height:18px;opacity:1;width:18px}.uppy-size--md .uppy-Dashboard-Item.is-complete .uppy-Dashboard-Item-progressIndicator{height:22px;width:22px}.uppy-Dashboard-Item.is-processing .uppy-Dashboard-Item-progress{opacity:0}.uppy-Dashboard-Item-fileInfo{padding-inline-end:5px}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-fileInfo{padding-inline-end:10px}.uppy-size--md.uppy-Dashboard--singleFile .uppy-Dashboard-Item-fileInfo{padding-inline-end:15px}.uppy-Dashboard-Item-name{font-size:12px;font-weight:500;line-height:1.3;margin-bottom:5px;word-wrap:anywhere;word-break:break-all}[data-uppy-theme=dark] .uppy-Dashboard-Item-name{color:#eaeaea}.uppy-size--md.uppy-Dashboard--singleFile .uppy-Dashboard-Item-name{font-size:14px;line-height:1.4}.uppy-Dashboard-Item-fileName{align-items:baseline;display:flex}.uppy-Dashboard-Item-fileName button{margin-left:5px}.uppy-Dashboard-Item-author{color:#757575;display:inline-block;font-size:11px;font-weight:400;line-height:1;margin-bottom:5px;vertical-align:bottom}.uppy-Dashboard-Item-author a{color:#757575}.uppy-Dashboard-Item-status{color:#757575;font-size:11px;font-weight:400;line-height:1}[data-uppy-theme=dark] .uppy-Dashboard-Item-status{color:#bbb}.uppy-Dashboard-Item-statusSize{display:inline-block;margin-bottom:5px;text-transform:uppercase;vertical-align:bottom}.uppy-Dashboard-Item-reSelect{color:#1269cf;font-family:inherit;font-size:inherit;font-weight:600}.uppy-Dashboard-Item-errorMessage{background-color:#fdeff1;color:#a51523;font-size:11px;font-weight:500;line-height:1.3;padding:5px 6px}.uppy-Dashboard-Item-errorMessageBtn{color:#a51523;cursor:pointer;font-size:11px;font-weight:500;text-decoration:underline}.uppy-Dashboard-Item-preview .uppy-Dashboard-Item-errorMessage{display:none}.uppy-size--md .uppy-Dashboard-Item-preview .uppy-Dashboard-Item-errorMessage{border-bottom-left-radius:3px;border-bottom-right-radius:3px;border-top:1px solid #f7c2c8;bottom:0;display:block;left:0;line-height:1.4;padding:6px 8px;position:absolute;right:0}.uppy-Dashboard-Item-fileInfo .uppy-Dashboard-Item-errorMessage{border:1px solid #f7c2c8;border-radius:3px;display:inline-block;position:static}.uppy-size--md .uppy-Dashboard-Item-fileInfo .uppy-Dashboard-Item-errorMessage{display:none}.uppy-Dashboard-Item-action{color:#939393;cursor:pointer}.uppy-Dashboard-Item-action:focus{outline:none}.uppy-Dashboard-Item-action::-moz-focus-inner{border:0}.uppy-Dashboard-Item-action:focus{box-shadow:0 0 0 3px #1269cf80}.uppy-Dashboard-Item-action:hover{color:#1f1f1f;opacity:1}[data-uppy-theme=dark] .uppy-Dashboard-Item-action{color:#cfcfcf}[data-uppy-theme=dark] .uppy-Dashboard-Item-action:focus{outline:none}[data-uppy-theme=dark] .uppy-Dashboard-Item-action::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-Dashboard-Item-action:focus{box-shadow:0 0 0 2px #aae1ffd9}[data-uppy-theme=dark] .uppy-Dashboard-Item-action:hover{color:#eaeaea}.uppy-Dashboard-Item-action--remove{color:#1f1f1f;opacity:.95}.uppy-Dashboard-Item-action--remove:hover{color:#000;opacity:1}.uppy-size--md .uppy-Dashboard-Item-action--remove{height:18px;inset-inline-end:-8px;padding:0;position:absolute;top:-8px;width:18px;z-index:1002}.uppy-size--md .uppy-Dashboard-Item-action--remove:focus{border-radius:50%}.uppy-Dashboard--singleFile.uppy-size--height-md .uppy-Dashboard-Item-action--remove{inset-inline-end:8px;position:absolute;top:8px}[data-uppy-theme=dark] .uppy-Dashboard-Item-action--remove{color:#525252}[data-uppy-theme=dark] .uppy-Dashboard-Item-action--remove:hover{color:#333}.uppy-Dashboard:not(.uppy-size--md):not(.uppy-Dashboard--singleFile.uppy-size--height-md) .uppy-Dashboard-Item-actionWrapper{align-items:center;display:flex}.uppy-Dashboard:not(.uppy-size--md):not(.uppy-Dashboard--singleFile.uppy-size--height-md) .uppy-Dashboard-Item-action{height:22px;margin-left:3px;padding:3px;width:22px}.uppy-Dashboard:not(.uppy-size--md):not(.uppy-Dashboard--singleFile.uppy-size--height-md) .uppy-Dashboard-Item-action:focus{border-radius:3px}.uppy-size--md .uppy-Dashboard-Item-action--copyLink,.uppy-size--md .uppy-Dashboard-Item-action--edit{height:16px;padding:0;width:16px}.uppy-size--md .uppy-Dashboard-Item-action--copyLink:focus,.uppy-size--md .uppy-Dashboard-Item-action--edit:focus{border-radius:3px}.uppy-Dashboard-Item{align-items:center;border-bottom:1px solid #eaeaea;display:flex;padding:10px}.uppy-Dashboard:not(.uppy-Dashboard--singleFile) .uppy-Dashboard-Item{padding-inline-end:0}[data-uppy-theme=dark] .uppy-Dashboard-Item{border-bottom:1px solid #333}.uppy-size--md .uppy-Dashboard-Item{border-bottom:0;display:block;float:inline-start;height:215px;margin:5px 15px;padding:0;position:relative;width:calc(33.333% - 30px)}.uppy-size--lg .uppy-Dashboard-Item{height:190px;margin:5px 15px;padding:0;width:calc(25% - 30px)}.uppy-size--xl .uppy-Dashboard-Item{height:210px;padding:0;width:calc(20% - 30px)}.uppy-Dashboard--singleFile .uppy-Dashboard-Item{border-bottom:0;display:flex;flex-direction:column;height:100%;max-width:400px;padding:15px;position:relative;width:100%}.uppy-Dashboard-Item.is-ghost .uppy-Dashboard-Item-previewInnerWrap{opacity:.2}.uppy-Dashboard-Item.is-ghost .uppy-Dashboard-Item-name{opacity:.7}.uppy-Dashboard-Item.is-ghost .uppy-Dashboard-Item-preview:before{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='39' viewBox='0 0 35 39'%3E%3Cpath fill='%2523000' d='M1.708 38.66c1.709 0 3.417-3.417 6.834-3.417s5.125 3.417 8.61 3.417c3.348 0 5.056-3.417 8.473-3.417 4.305 0 5.125 3.417 6.833 3.417.889 0 1.709-.889 1.709-1.709v-19.68C34.167-5.757 0-5.757 0 17.271v19.68c0 .82.888 1.709 1.708 1.709m8.542-17.084a3.383 3.383 0 0 1-3.417-3.416 3.383 3.383 0 0 1 3.417-3.417 3.383 3.383 0 0 1 3.417 3.417 3.383 3.383 0 0 1-3.417 3.416m13.667 0A3.383 3.383 0 0 1 20.5 18.16a3.383 3.383 0 0 1 3.417-3.417 3.383 3.383 0 0 1 3.416 3.417 3.383 3.383 0 0 1-3.416 3.416'/%3E%3C/svg%3E");background-position:50% 10px;background-repeat:no-repeat;background-size:25px;content:"";inset:0;opacity:.5;position:absolute;z-index:1005}.uppy-size--md .uppy-Dashboard-Item.is-ghost .uppy-Dashboard-Item-preview:before{background-position:50% 50%;background-size:40px}.uppy-Dashboard--singleFile .uppy-Dashboard-Item.is-ghost .uppy-Dashboard-Item-preview:before{background-position:50% 50%;background-size:30%}.uppy-Dashboard-Item-preview{flex-grow:0;flex-shrink:0;height:50px;position:relative;width:50px}.uppy-size--md .uppy-Dashboard-Item-preview{height:140px;width:100%}.uppy-size--lg .uppy-Dashboard-Item-preview{height:120px}.uppy-size--xl .uppy-Dashboard-Item-preview{height:140px}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-preview{flex-grow:1;max-height:75%;width:100%}.uppy-Dashboard--singleFile.uppy-size--md .uppy-Dashboard-Item-preview{max-height:100%}.uppy-Dashboard-Item-fileInfoAndButtons{align-items:center;display:flex;flex-grow:1;justify-content:space-between;padding-inline-end:8px;padding-inline-start:12px}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-fileInfoAndButtons,.uppy-size--md .uppy-Dashboard-Item-fileInfoAndButtons{align-items:flex-start;padding:9px 0 0}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-fileInfoAndButtons{flex-grow:0;width:100%}.uppy-Dashboard-Item-fileInfo{flex-grow:1;flex-shrink:1}.uppy-Dashboard-Item-actionWrapper{flex-grow:0;flex-shrink:0}.uppy-Dashboard-Item.is-error .uppy-Dashboard-Item-previewInnerWrap:after,.uppy-Dashboard-Item.is-inprogress .uppy-Dashboard-Item-previewInnerWrap:after{display:block}.uppy-Dashboard-Item-errorDetails{appearance:none;background-color:#939393;border:none;border-radius:50%;color:#fff;cursor:help;flex-shrink:0;font-size:10px;font-weight:600;height:13px;inset-inline-start:2px;line-height:12px;position:relative;text-align:center;top:0;width:13px}.uppy-Dashboard-Item-errorDetails:after{line-height:1.3;word-wrap:break-word}.uppy-Dashboard-FileCard{background-color:#fff;border-radius:5px;box-shadow:0 0 10px 4px #0000001a;display:flex;flex-direction:column;height:100%;inset:0;position:absolute;width:100%;z-index:1005}.uppy-Dashboard-FileCard .uppy-DashboardContent-bar{border-top-left-radius:5px;border-top-right-radius:5px}.uppy-Dashboard-FileCard .uppy-Dashboard-FileCard-actions{border-bottom-left-radius:5px;border-bottom-right-radius:5px}.uppy-Dashboard-FileCard-inner{display:flex;flex-direction:column;flex-grow:1;flex-shrink:1;height:100%;min-height:0}.uppy-Dashboard-FileCard-preview{align-items:center;border-bottom:1px solid #eaeaea;display:flex;flex-grow:0;flex-shrink:1;height:60%;justify-content:center;min-height:0;position:relative}[data-uppy-theme=dark] .uppy-Dashboard-FileCard-preview{background-color:#333;border-bottom:0}.uppy-Dashboard-FileCard-preview img.uppy-Dashboard-Item-previewImg{border-radius:3px;box-shadow:0 3px 20px #00000026;flex:0 0 auto;max-height:90%;max-width:90%;object-fit:cover}.uppy-Dashboard-FileCard-edit{background-color:#00000080;border-radius:50px;color:#fff;font-size:13px;inset-inline-end:10px;padding:7px 15px;position:absolute;top:10px}.uppy-Dashboard-FileCard-edit:focus{outline:none}.uppy-Dashboard-FileCard-edit::-moz-focus-inner{border:0}.uppy-Dashboard-FileCard-edit:focus{box-shadow:0 0 0 3px #1269cf80}.uppy-Dashboard-FileCard-edit:hover{background-color:#000c}.uppy-Dashboard-FileCard-info{flex-grow:0;flex-shrink:0;height:40%;overflow-y:auto;padding:30px 20px 20px;-webkit-overflow-scrolling:touch}[data-uppy-theme=dark] .uppy-Dashboard-FileCard-info{background-color:#1f1f1f}.uppy-Dashboard-FileCard-fieldset{border:0;font-size:0;margin:auto auto 12px;max-width:640px;padding:0}.uppy-Dashboard-FileCard-label{color:#525252;display:inline-block;font-size:12px;vertical-align:middle;width:22%}.uppy-size--md .uppy-Dashboard-FileCard-label{font-size:14px}[data-uppy-theme=dark] .uppy-Dashboard-FileCard-label{color:#eaeaea}.uppy-Dashboard-FileCard-input{display:inline-block;vertical-align:middle;width:78%}.uppy-Dashboard-FileCard-actions{align-items:center;background-color:#fafafa;border-top:1px solid #eaeaea;display:flex;flex-grow:0;flex-shrink:0;height:55px;padding:0 15px}.uppy-size--md .uppy-Dashboard-FileCard-actions{height:65px}[data-uppy-theme=dark] .uppy-Dashboard-FileCard-actions{background-color:#1f1f1f;border-top:1px solid #333}.uppy-Dashboard-FileCard-actionsBtn{margin-inline-end:10px}.uppy-transition-slideDownUp-enter{opacity:.01;transform:translate3d(0,-105%,0);transition:transform .25s ease-in-out,opacity .25s ease-in-out}.uppy-transition-slideDownUp-enter.uppy-transition-slideDownUp-enter-active{opacity:1;transform:translateZ(0)}.uppy-transition-slideDownUp-leave{opacity:1;transform:translateZ(0);transition:transform .25s ease-in-out,opacity .25s ease-in-out}.uppy-transition-slideDownUp-leave.uppy-transition-slideDownUp-leave-active{opacity:.01;transform:translate3d(0,-105%,0)}@keyframes uppy-Dashboard-fadeIn{0%{opacity:0}to{opacity:1}}@keyframes uppy-Dashboard-fadeOut{0%{opacity:1}to{opacity:0}}@keyframes uppy-Dashboard-slideDownAndFadeIn{0%{opacity:0;transform:translate3d(-50%,-70%,0)}to{opacity:1;transform:translate3d(-50%,-50%,0)}}@keyframes uppy-Dashboard-slideDownAndFadeIn--small{0%{opacity:0;transform:translate3d(0,-20%,0)}to{opacity:1;transform:translateZ(0)}}@keyframes uppy-Dashboard-slideUpFadeOut{0%{opacity:1;transform:translate3d(-50%,-50%,0)}to{opacity:0;transform:translate3d(-50%,-70%,0)}}@keyframes uppy-Dashboard-slideUpFadeOut--small{0%{opacity:1;transform:translateZ(0)}to{opacity:0;transform:translate3d(0,-20%,0)}}.uppy-Dashboard--modal{z-index:1001}.uppy-Dashboard--modal[aria-hidden=true]{display:none}.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose>.uppy-Dashboard-inner{animation:uppy-Dashboard-slideDownAndFadeIn--small .3s cubic-bezier(0,0,.2,1)}@media only screen and (min-width:820px){.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose>.uppy-Dashboard-inner{animation:uppy-Dashboard-slideDownAndFadeIn .3s cubic-bezier(0,0,.2,1)}}.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose>.uppy-Dashboard-overlay{animation:uppy-Dashboard-fadeIn .3s cubic-bezier(0,0,.2,1)}.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose.uppy-Dashboard--isClosing>.uppy-Dashboard-inner{animation:uppy-Dashboard-slideUpFadeOut--small .3s cubic-bezier(0,0,.2,1)}@media only screen and (min-width:820px){.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose.uppy-Dashboard--isClosing>.uppy-Dashboard-inner{animation:uppy-Dashboard-slideUpFadeOut .3s cubic-bezier(0,0,.2,1)}}.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose.uppy-Dashboard--isClosing>.uppy-Dashboard-overlay{animation:uppy-Dashboard-fadeOut .3s cubic-bezier(0,0,.2,1)}.uppy-Dashboard-isFixed{height:100vh;overflow:hidden}.uppy-Dashboard--modal .uppy-Dashboard-overlay{background-color:#00000080;inset:0;position:fixed;z-index:1001}.uppy-Dashboard-inner{background-color:#f4f4f4;border:1px solid #eaeaea;border-radius:5px;max-height:100%;max-width:100%;outline:none;position:relative}.uppy-size--md .uppy-Dashboard-inner{min-height:auto}@media only screen and (min-width:820px){.uppy-Dashboard-inner{height:500px;width:650px}}.uppy-Dashboard--modal .uppy-Dashboard-inner{z-index:1002}[data-uppy-theme=dark] .uppy-Dashboard-inner{background-color:#1f1f1f}.uppy-Dashboard--isDisabled .uppy-Dashboard-inner{cursor:not-allowed}.uppy-Dashboard-innerWrap{border-radius:5px;display:flex;flex-direction:column;height:100%;opacity:0;overflow:hidden;position:relative}.uppy-Dashboard--isInnerWrapVisible .uppy-Dashboard-innerWrap{opacity:1}.uppy-Dashboard--isDisabled .uppy-Dashboard-innerWrap{cursor:not-allowed;filter:grayscale(100%);opacity:.6;user-select:none}.uppy-Dashboard--isDisabled .uppy-ProviderIconBg{fill:#9f9f9f}.uppy-Dashboard--isDisabled [aria-disabled],.uppy-Dashboard--isDisabled [disabled]{cursor:not-allowed;pointer-events:none}.uppy-Dashboard--modal .uppy-Dashboard-inner{border:none;inset:35px 15px 15px;position:fixed}@media only screen and (min-width:820px){.uppy-Dashboard--modal .uppy-Dashboard-inner{box-shadow:0 5px 15px 4px #00000026;left:50%;right:auto;top:50%;transform:translate(-50%,-50%)}}.uppy-Dashboard-close{color:#ffffffe6;cursor:pointer;display:block;font-size:27px;inset-inline-end:-2px;position:absolute;top:-33px;z-index:1005}.uppy-Dashboard-close:focus{outline:none}.uppy-Dashboard-close::-moz-focus-inner{border:0}.uppy-Dashboard-close:focus{color:#6eabf2}@media only screen and (min-width:820px){.uppy-Dashboard-close{font-size:35px;inset-inline-end:-35px;top:-10px}}.uppy-Dashboard-serviceMsg{background-color:#fffbf7;border-bottom:1px solid #edd4b9;border-top:1px solid #edd4b9;font-size:12px;font-weight:500;line-height:1.3;padding:12px 0;position:relative;top:-1px;z-index:1004}.uppy-size--md .uppy-Dashboard-serviceMsg{font-size:14px;line-height:1.4}[data-uppy-theme=dark] .uppy-Dashboard-serviceMsg{background-color:#1f1f1f;border-bottom:1px solid #333;border-top:1px solid #333;color:#eaeaea}.uppy-Dashboard-serviceMsg-title{display:block;line-height:1;margin-bottom:4px;padding-left:42px}.uppy-Dashboard-serviceMsg-text{padding:0 15px}.uppy-Dashboard-serviceMsg-actionBtn{color:#1269cf;font-size:inherit;font-weight:inherit;vertical-align:initial}[data-uppy-theme=dark] .uppy-Dashboard-serviceMsg-actionBtn{color:#02baf2e6}.uppy-Dashboard-serviceMsg-icon{left:15px;position:absolute;top:10px}.uppy-Dashboard-AddFiles{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:center;position:relative;text-align:center}[data-uppy-drag-drop-supported=true] .uppy-Dashboard-AddFiles{border:1px dashed #dfdfdf;border-radius:3px;height:calc(100% - 14px);margin:7px}.uppy-Dashboard-AddFilesPanel .uppy-Dashboard-AddFiles{border:none;height:calc(100% - 54px)}.uppy-Dashboard--modal .uppy-Dashboard-AddFiles{border-color:#cfcfcf}[data-uppy-theme=dark] .uppy-Dashboard-AddFiles{border-color:#757575}.uppy-Dashboard-AddFiles-info{display:none;margin-top:auto;padding-bottom:15px;padding-top:15px}.uppy-size--height-md .uppy-Dashboard-AddFiles-info{display:block}.uppy-size--md .uppy-Dashboard-AddFiles-info{bottom:25px;left:0;padding-bottom:0;padding-top:30px;position:absolute;right:0}[data-uppy-num-acquirers="0"] .uppy-Dashboard-AddFiles-info{margin-top:0}.uppy-Dashboard-browse{color:#1269cf;cursor:pointer}.uppy-Dashboard-browse:focus{outline:none}.uppy-Dashboard-browse::-moz-focus-inner{border:0}.uppy-Dashboard-browse:focus,.uppy-Dashboard-browse:hover{border-bottom:1px solid #1269cf}[data-uppy-theme=dark] .uppy-Dashboard-browse{color:#02baf2e6}[data-uppy-theme=dark] .uppy-Dashboard-browse:focus,[data-uppy-theme=dark] .uppy-Dashboard-browse:hover{border-bottom:1px solid #02baf2}.uppy-Dashboard-browseBtn{display:block;font-size:14px;font-weight:500;margin-bottom:5px;margin-top:8px;width:100%}.uppy-size--md .uppy-Dashboard-browseBtn{font-size:15px;margin:15px auto;padding:13px 44px;width:auto}.uppy-Dashboard-AddFiles-list{display:flex;flex:1;flex-direction:column;margin-top:2px;overflow-y:auto;padding:2px 0;width:100%;-webkit-overflow-scrolling:touch}.uppy-size--md .uppy-Dashboard-AddFiles-list{flex:none;flex-direction:row;flex-wrap:wrap;justify-content:center;margin-top:15px;max-width:600px;overflow-y:visible;padding-top:0}.uppy-DashboardTab{border-bottom:1px solid #eaeaea;text-align:center;width:100%}[data-uppy-theme=dark] .uppy-DashboardTab{border-bottom:1px solid #333}.uppy-size--md .uppy-DashboardTab{border-bottom:none;display:inline-block;margin-bottom:10px;width:auto}.uppy-DashboardTab-btn{align-items:center;-webkit-appearance:none;appearance:none;background-color:initial;color:#525252;cursor:pointer;flex-direction:row;height:100%;justify-content:left;padding:12px 15px;width:100%}.uppy-DashboardTab-btn:focus{outline:none}.uppy-size--md .uppy-DashboardTab-btn{border-radius:5px;flex-direction:column;margin-inline-end:1px;padding:10px 3px;width:86px}[data-uppy-theme=dark] .uppy-DashboardTab-btn{color:#eaeaea}.uppy-DashboardTab-btn::-moz-focus-inner{border:0}.uppy-DashboardTab-btn:hover{background-color:#e9ecef}[data-uppy-theme=dark] .uppy-DashboardTab-btn:hover{background-color:#333}.uppy-DashboardTab-btn:active,.uppy-DashboardTab-btn:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-DashboardTab-btn:active,[data-uppy-theme=dark] .uppy-DashboardTab-btn:focus{background-color:#525252}.uppy-DashboardTab-btn svg{display:inline-block;max-height:100%;max-width:100%;overflow:hidden;transition:transform .15s ease-in-out;vertical-align:text-top}.uppy-DashboardTab-inner{align-items:center;background-color:#fff;border-radius:8px;box-shadow:0 1px 1px #0000001a,0 1px 2px #0000001a,0 2px 3px #00000005;display:flex;height:32px;justify-content:center;margin-inline-end:10px;width:32px}.uppy-size--md .uppy-DashboardTab-inner{margin-inline-end:0}[data-uppy-theme=dark] .uppy-DashboardTab-inner{background-color:#323232;box-shadow:0 1px 1px #0003,0 1px 2px #0003,0 2px 3px #00000014}.uppy-DashboardTab-name{font-size:14px;font-weight:400}.uppy-size--md .uppy-DashboardTab-name{font-size:12px;line-height:15px;margin-bottom:0;margin-top:8px}.uppy-DashboardTab-iconMyDevice{color:#1269cf}[data-uppy-theme=dark] .uppy-DashboardTab-iconMyDevice{color:#02baf2}.uppy-DashboardTab-iconBox{color:#0061d5}[data-uppy-theme=dark] .uppy-DashboardTab-iconBox{color:#eaeaea}.uppy-DashboardTab-iconDropbox{color:#0061fe}[data-uppy-theme=dark] .uppy-DashboardTab-iconDropbox{color:#eaeaea}.uppy-DashboardTab-iconUnsplash{color:#111}[data-uppy-theme=dark] .uppy-DashboardTab-iconUnsplash{color:#eaeaea}.uppy-DashboardTab-iconWebdav{color:#111}[data-uppy-theme=dark] .uppy-DashboardTab-iconWebdav{color:#eaeaea}.uppy-DashboardTab-iconScreenRec{color:#2c3e50}[data-uppy-theme=dark] .uppy-DashboardTab-iconScreenRec{color:#eaeaea}.uppy-DashboardTab-iconAudio{color:#8030a3}[data-uppy-theme=dark] .uppy-DashboardTab-iconAudio{color:#bf6ee3}.uppy-Dashboard-input{height:.1px;opacity:0;overflow:hidden;position:absolute;width:.1px;z-index:-1}.uppy-DashboardContent-bar{align-items:center;background-color:#fafafa;border-bottom:1px solid #eaeaea;display:flex;flex-shrink:0;height:40px;justify-content:space-between;padding:0 10px;position:relative;width:100%;z-index:1004}.uppy-size--md .uppy-DashboardContent-bar{height:50px;padding:0 15px}[data-uppy-theme=dark] .uppy-DashboardContent-bar{background-color:#1f1f1f;border-bottom:1px solid #333}.uppy-DashboardContent-title{font-size:12px;font-weight:500;left:0;line-height:40px;margin:auto;max-width:170px;overflow-x:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0;white-space:nowrap;width:100%}.uppy-size--md .uppy-DashboardContent-title{font-size:14px;line-height:50px;max-width:300px}[data-uppy-theme=dark] .uppy-DashboardContent-title{color:#eaeaea}.uppy-DashboardContent-back,.uppy-DashboardContent-save{-webkit-appearance:none;background:none;border:0;border-radius:3px;color:inherit;color:#1269cf;cursor:pointer;font-family:inherit;font-size:inherit;font-size:12px;font-weight:400;line-height:1;margin:0;margin-inline-start:-6px;padding:7px 6px}.uppy-DashboardContent-back:focus,.uppy-DashboardContent-save:focus{outline:none}.uppy-DashboardContent-back::-moz-focus-inner,.uppy-DashboardContent-save::-moz-focus-inner{border:0}.uppy-DashboardContent-back:hover,.uppy-DashboardContent-save:hover{color:#0e51a0}.uppy-DashboardContent-back:focus,.uppy-DashboardContent-save:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-DashboardContent-back:focus,[data-uppy-theme=dark] .uppy-DashboardContent-save:focus{background-color:#333}.uppy-size--md .uppy-DashboardContent-back,.uppy-size--md .uppy-DashboardContent-save{font-size:14px}[data-uppy-theme=dark] .uppy-DashboardContent-back,[data-uppy-theme=dark] .uppy-DashboardContent-save{color:#02baf2}.uppy-DashboardContent-addMore{-webkit-appearance:none;background:none;border:0;border-radius:3px;color:inherit;color:#1269cf;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:500;height:29px;line-height:1;margin:0;margin-inline-end:-5px;padding:7px 8px;width:29px}.uppy-DashboardContent-addMore:focus{outline:none}.uppy-DashboardContent-addMore::-moz-focus-inner{border:0}.uppy-DashboardContent-addMore:hover{color:#0e51a0}.uppy-DashboardContent-addMore:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-DashboardContent-addMore:focus{background-color:#333}.uppy-size--md .uppy-DashboardContent-addMore{font-size:14px;height:auto;margin-inline-end:-8px;width:auto}[data-uppy-theme=dark] .uppy-DashboardContent-addMore{color:#02baf2}.uppy-DashboardContent-addMore svg{margin-inline-end:4px;vertical-align:initial}.uppy-size--md .uppy-DashboardContent-addMore svg{height:11px;width:11px}.uppy-DashboardContent-addMoreCaption{display:none}.uppy-size--md .uppy-DashboardContent-addMoreCaption{display:inline}.uppy-DashboardContent-panel{background-color:#f5f5f5;flex:1}.uppy-Dashboard-AddFilesPanel,.uppy-DashboardContent-panel{border-radius:5px;display:flex;flex-direction:column;inset:0;overflow:hidden;position:absolute;z-index:1005}.uppy-Dashboard-AddFilesPanel{background:#fafafa;background:linear-gradient(0deg,#fafafa 35%,#fafafad9);box-shadow:0 0 10px 5px #00000026}[data-uppy-theme=dark] .uppy-Dashboard-AddFilesPanel{background-color:#333;background-image:linear-gradient(0deg,#1f1f1f 35%,#1f1f1fd9)}.uppy-Dashboard--isAddFilesPanelVisible .uppy-Dashboard-files{filter:blur(2px)}.uppy-Dashboard-progress{bottom:0;height:12%;left:0;position:absolute;width:100%}.uppy-Dashboard-progressBarContainer.is-active{height:100%;left:0;position:absolute;top:0;width:100%;z-index:1004}.uppy-Dashboard-filesContainer{flex:1;margin:0;overflow-y:hidden;position:relative}.uppy-Dashboard-filesContainer:after{clear:both;content:"";display:table}.uppy-Dashboard-files{flex:1;margin:0;overflow-y:auto;padding:0 0 10px;-webkit-overflow-scrolling:touch}.uppy-size--md .uppy-Dashboard-files{padding-top:10px}.uppy-Dashboard--singleFile .uppy-Dashboard-filesInner{align-items:center;display:flex;height:100%;justify-content:center}.uppy-Dashboard-dropFilesHereHint{align-items:center;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath fill='%231269CF' d='M24 1v1C11.85 2 2 11.85 2 24s9.85 22 22 22 22-9.85 22-22S36.15 2 24 2zm0 0V0c13.254 0 24 10.746 24 24S37.254 48 24 48 0 37.254 0 24 10.746 0 24 0zm7.707 19.293a.999.999 0 1 1-1.414 1.414L25 16.414V34a1 1 0 1 1-2 0V16.414l-5.293 5.293a.999.999 0 1 1-1.414-1.414l7-7a1 1 0 0 1 1.414 0z'/%3E%3C/svg%3E");background-position:50% 50%;background-repeat:no-repeat;border:1px dashed #1269cf;border-radius:3px;color:#757575;display:flex;font-size:16px;justify-content:center;inset:7px;padding-top:90px;position:absolute;text-align:center;visibility:hidden;z-index:2000}[data-uppy-theme=dark] .uppy-Dashboard-dropFilesHereHint{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath fill='%2302BAF2' d='M24 1v1C11.85 2 2 11.85 2 24s9.85 22 22 22 22-9.85 22-22S36.15 2 24 2zm0 0V0c13.254 0 24 10.746 24 24S37.254 48 24 48 0 37.254 0 24 10.746 0 24 0zm7.707 19.293a.999.999 0 1 1-1.414 1.414L25 16.414V34a1 1 0 1 1-2 0V16.414l-5.293 5.293a.999.999 0 1 1-1.414-1.414l7-7a1 1 0 0 1 1.414 0z'/%3E%3C/svg%3E");border-color:#02baf2;color:#bbb}.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-Dashboard-dropFilesHereHint{pointer-events:none;visibility:visible}.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-Dashboard-files,.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-Dashboard-progressindicators,.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-Dashboard-serviceMsg,.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-DashboardContent-bar{opacity:.15}.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-Dashboard-AddFiles{opacity:.03}.uppy-Dashboard-AddFiles-title{color:#000;font-size:17px;font-weight:500;line-height:1.35;margin-bottom:5px;margin-top:15px;padding:0 15px;text-align:inline-start;width:100%}.uppy-size--md .uppy-Dashboard-AddFiles-title{font-size:21px;font-weight:400;margin-top:5px;max-width:480px;padding:0 35px;text-align:center}[data-uppy-num-acquirers="0"] .uppy-Dashboard-AddFiles-title{text-align:center}[data-uppy-theme=dark] .uppy-Dashboard-AddFiles-title{color:#eaeaea}.uppy-Dashboard-AddFiles-title button{font-weight:500}.uppy-size--md .uppy-Dashboard-AddFiles-title button{font-weight:400}.uppy-Dashboard-note{color:#757575;font-size:14px;line-height:1.25;margin:auto;max-width:350px;padding:0 15px;text-align:center}.uppy-size--md .uppy-Dashboard-note{line-height:1.35;max-width:600px}[data-uppy-theme=dark] .uppy-Dashboard-note{color:#cfcfcf}a.uppy-Dashboard-poweredBy{color:#939393;display:inline-block;font-size:11px;margin-top:8px;text-align:center;text-decoration:none}.uppy-Dashboard-poweredByIcon{margin-left:1px;margin-right:1px;opacity:.9;position:relative;top:1px;vertical-align:text-top;fill:none;stroke:#939393}.uppy-Dashboard-Item-previewIcon{height:25px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:25px;z-index:100}.uppy-size--md .uppy-Dashboard-Item-previewIcon{height:38px;width:38px}.uppy-Dashboard-Item-previewIcon svg{height:100%;width:100%}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-previewIcon{height:100%;max-height:60%;max-width:60%;width:100%}.uppy-Dashboard-Item-previewIconWrap{height:76px;max-height:75%;position:relative}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-previewIconWrap{height:100%;width:100%}.uppy-Dashboard-Item-previewIconBg{filter:drop-shadow(rgba(0,0,0,.1) 0 1px 1px);height:100%;width:100%}.uppy-Dashboard-upload{height:50px;position:relative;width:50px}.uppy-size--md .uppy-Dashboard-upload{height:60px;width:60px}.uppy-Dashboard-upload .uppy-c-icon{position:relative;top:1px;width:50%}.uppy-Dashboard-uploadCount{background-color:#1bb240;border-radius:50%;color:#fff;font-size:8px;height:16px;inset-inline-end:-12px;line-height:16px;position:absolute;top:-12px;width:16px}.uppy-size--md .uppy-Dashboard-uploadCount{font-size:9px;height:18px;line-height:18px;width:18px}`, vh = `.uppy-ImageCropper-range{-webkit-appearance:none;background:#0000;margin:8px 0;width:100%}.uppy-ImageCropper-range::-moz-focus-outer{border:0}.uppy-ImageCropper-range:focus{outline:0}.uppy-ImageCropper-range:focus::-webkit-slider-runnable-track{background:#fff3}.uppy-ImageCropper-range:focus::-ms-fill-lower,.uppy-ImageCropper-range:focus::-ms-fill-upper{background:#fff3}.uppy-ImageCropper-range::-webkit-slider-runnable-track{background:#fff3;border:0 solid #0000;border-radius:5px;box-shadow:0 0 #0000,0 0 #0d0d0d00;cursor:default;height:4px;transition:all .2s ease;width:100%}.uppy-ImageCropper-range::-webkit-slider-thumb{-webkit-appearance:none;background:#fff;border:0 solid #0000;border-radius:9px;box-shadow:0 0 4px #0003,0 0 #0d0d0d33;box-sizing:border-box;cursor:default;height:16px;margin-top:-6px;width:16px}.uppy-ImageCropper-range::-moz-range-track{background:#fff3;border:0 solid #0000;border-radius:5px;box-shadow:0 0 #0000,0 0 #0d0d0d00;cursor:default;height:2px;transition:all .2s ease;width:100%}.uppy-ImageCropper-range::-moz-range-thumb{background:#fff;border:0 solid #0000;border-radius:9px;box-shadow:0 0 4px #0003,0 0 #0d0d0d33;box-sizing:border-box;cursor:default;height:16px;width:16px}.uppy-ImageCropper-range::-ms-track{background:#0000;border-color:#0000;border-width:8px 0;color:#0000;cursor:default;height:4px;transition:all .2s ease;width:100%}.uppy-ImageCropper-range::-ms-fill-lower{background:#f2f2f233;border:0 solid #0000;border-radius:10px;box-shadow:0 0 #0000,0 0 #0d0d0d00}.uppy-ImageCropper-range::-ms-fill-upper{background:#fff3;border:0 solid #0000;border-radius:10px;box-shadow:0 0 #0000,0 0 #0d0d0d00}.uppy-ImageCropper-range::-ms-thumb{background:#fff;border:0 solid #0000;border-radius:9px;box-shadow:0 0 4px #0003,0 0 #0d0d0d33;box-sizing:border-box;cursor:default;height:16px;margin-top:1px;width:16px}.uppy-ImageCropper-range:disabled::-moz-range-thumb,.uppy-ImageCropper-range:disabled::-ms-fill-lower,.uppy-ImageCropper-range:disabled::-ms-fill-upper,.uppy-ImageCropper-range:disabled::-ms-thumb,.uppy-ImageCropper-range:disabled::-webkit-slider-runnable-track,.uppy-ImageCropper-range:disabled::-webkit-slider-thumb{cursor:not-allowed}/*!
* Cropper.js v1.5.6
* https://fengyuanchen.github.io/cropperjs
*
* Copyright 2015-present Chen Fengyuan
* Released under the MIT license
*
* Date: 2019-10-04T04:33:44.164Z
*/.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;-ms-touch-action:none;touch-action:none;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{inset:0;position:absolute}.cropper-canvas,.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline:1px solid #39f;outline-color:#3399ffbf;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:33.3333333333%;left:0;top:33.3333333333%;width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:33.3333333333%;top:0;width:33.3333333333%}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:after,.cropper-center:before{background-color:#eee;content:" ";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:" ";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}.uppy-ImageCropper{display:flex;flex-direction:column;height:100%;width:100%}.uppy-ImageCropper-container{flex-grow:1}.uppy-ImageCropper-image{display:block;max-height:400px;max-width:100%}.uppy-ImageCropper-controls{align-items:center;background-color:#0009;border-radius:5px;bottom:15px;color:#fff;display:flex;justify-content:center;left:50%;padding-top:38px;position:absolute;transform:translate(-50%)}.uppy-size--md .uppy-ImageCropper-controls{padding-top:0}.uppy-ImageCropper-controls button{border-radius:5px;height:35px;width:35px}.uppy-ImageCropper-controls button svg{padding:3px}.uppy-size--md .uppy-ImageCropper-controls button{height:40px;width:40px}.uppy-size--md .uppy-ImageCropper-controls button svg{padding:1px}.uppy-ImageCropper-controls button:hover{background-color:#ffffff80}.uppy-ImageCropper-controls button:focus{background-color:#ffffff80;outline:none}.uppy-Dashboard:not(.uppy-size--md) .uppy-ImageCropper-rangeWrapper{height:38px;left:10px;position:absolute!important;right:10px;top:0}.uppy-size--md .uppy-ImageCropper-range{margin-left:5px;margin-right:5px;width:180px}.uppy-ImageCropper .cropper-point{height:8px;width:8px}.uppy-ImageCropper .cropper-view-box{background:repeating-conic-gradient(#bdbdbd33 0 25%,#fff 0 50%) 50%/16px 16px;outline:2px solid #39f}[data-uppy-theme=dark] .uppy-ImageCropper .cropper-view-box{background:repeating-conic-gradient(#2b2a2a 0 25%,#000 0 50%) 50%/16px 16px}.uppy-ImageCropper .cropper-modal{background-color:#fff;opacity:.9}[data-uppy-theme=dark] .uppy-ImageCropper .cropper-modal{background-color:#000;opacity:.7}.uppy-ImageCropper .cropper-face{opacity:0}.uppy-ImageCropper-range::-moz-range-track{height:4px}.uppy-ImageCropper-range:focus::-webkit-slider-runnable-track,.uppy-ImageCropper-range:hover::-webkit-slider-runnable-track{background:#ffffff80}.uppy-ImageCropper-range:focus::-ms-fill-lower,.uppy-ImageCropper-range:focus::-ms-fill-upper,.uppy-ImageCropper-range:hover::-ms-fill-lower,.uppy-ImageCropper-range:hover::-ms-fill-upper{background:#ffffff80}.uppy-ImageCropper-range:focus::-moz-range-track,.uppy-ImageCropper-range:hover::-moz-range-track{background:#ffffff80}`, v = {
  classNamePrefix: null,
  logPrefix: "LT Image Uploader: ",
  observer: null,
  observedElements: /* @__PURE__ */ new Map(),
  renderedCss: !1,
  options: {
    quality: 0.7,
    maxWidth: 1500,
    maxHeight: 1500
  },
  upload: {
    request: null,
    security: null,
    uriUploadForm: Sh("https://authorapi.learnosity.com/latest-lts/assets/uploadform")
  },
  uppy: null
};
function wh(i, e, t = {}) {
  v.renderedCss || (Bh(), v.renderedCss = !0), v.upload.security = i, v.upload.request = e, Ph(t), Ch() && Ps().on("widgetedit:widget:ready", xh);
}
function xh() {
  U.debug(`${v.logPrefix}setupModalObserver()`), v.classNamePrefix = Cs(v.classNamePrefix), ao();
  const i = (e) => {
    for (const t of e)
      if (t.type === "childList") {
        const r = document.querySelector(
          '[data-authorapi-selector="asset-uploader-iframe-outlet"]:not(.lrn-author-slide-pane [data-authorapi-selector="asset-uploader-iframe-outlet"]):not(.lrn-qe-slide-pane [data-authorapi-selector="asset-uploader-iframe-outlet"])'
        ), a = document.querySelector('[data-authorapi-selector="asset-display-name"]');
        if (r && !a) {
          U.debug(`${v.logPrefix}Disconnecting observer`), ao(), _h();
          break;
        }
      }
  };
  v.observedElements.size ? U.debug(`${v.logPrefix}Observed elements full`) : (v.observer = new MutationObserver(i), _s());
}
function _s() {
  U.debug(`${v.logPrefix}Looking to activate observer`);
  const i = document.querySelector(".lrn-author-item");
  v.observedElements.has(i) || (U.debug(`${v.logPrefix}Activated observer`), v.observer.observe(i, { childList: !0, subtree: !0 }), v.observedElements.set(i, v.observer));
}
function ao() {
  v.observer?.disconnect(), v.observedElements.clear();
}
function _h() {
  const i = document.querySelector('[data-authorapi-selector="asset-uploader-alignment"]'), e = document.querySelector(`.lrn-${v.classNamePrefix}image-uploader-preview`);
  setTimeout(() => {
    const r = document.querySelector('[data-authorapi-selector="asset-uploader-iframe-outlet"]'), a = r.querySelector("iframe"), o = document.querySelector(`.lrn-${v.classNamePrefix}adv-options`), s = document.createElement("div");
    s.setAttribute("id", "uppy-dashboard"), a.setAttribute("hidden", ""), r.insertAdjacentElement("afterbegin", s), kh(), ur(), o.removeAttribute("hidden"), Dh();
  }, !i && !e ? 0 : 500);
}
function Dh() {
  v.uppy = new Qi({
    debug: !1,
    autoProceed: !1,
    restrictions: { maxNumberOfFiles: 1, minNumberOfFiles: 1, allowedFileTypes: ["image/gif", "image/jpeg", "image/png", "image/svg+xml"] }
  }).use(Oa, {
    inline: !0,
    width: 790,
    height: 350,
    autoOpen: null,
    disableStatusBar: !0,
    target: "#uppy-dashboard",
    showProgressDetails: !1,
    proudlyDisplayPoweredByUppy: !1
  }).use(ec, {
    quality: v.options.quality,
    convertSize: 5e5,
    convertTypes: ["image/png"],
    maxHeight: v.options.maxHeight,
    maxWidth: v.options.maxWidth
  }).use(gh, { target: Oa }), v.uppy.on("file-added", (i) => {
    U.debug(`${v.logPrefix}file-added: ${i.source}`), document.querySelector(`.lrn-${v.classNamePrefix}adv-options`).setAttribute("hidden", ""), i.source === "Dashboard" && oo(i);
  }), v.uppy.on("file-removed", () => {
    U.debug(`${v.logPrefix}file-removed`), Bt("lt__image-uploader-upload-btn", "remove");
  }), v.uppy.on("file-editor:start", () => {
    U.debug(`${v.logPrefix}file-editor:start`), Bt("lt__image-uploader-upload-btn", "disable");
  }), v.uppy.on("file-editor:complete", (i) => {
    U.debug(`${v.logPrefix}file-editor:complete`), oo(i), Bt("lt__image-uploader-upload-btn", "enable");
  }), v.uppy.on("file-editor:cancel", () => {
    U.debug(`${v.logPrefix}file-editor:cancel`), Bt("lt__image-uploader-upload-btn", "enable");
  }), v.uppy.on("error", (i) => {
    U.error(i.stack);
  });
}
function oo(i) {
  const e = i.name, t = i.meta, r = i.type;
  r !== "image/svg+xml" ? (U.debug(`${v.logPrefix}Compressing image`), v.uppy.getPlugin("Compressor").compress(i.data).then((a) => {
    setTimeout(() => {
      v.uppy.removeFile(i.id), v.uppy.addFile({
        name: e,
        type: r,
        meta: t,
        data: a,
        source: "Local"
      });
      const o = v.uppy.store.state.files;
      let s;
      for (const n in o)
        s = n;
      so(s);
    }, 50);
  })) : so(i.id);
}
function so(i) {
  const e = document.querySelector(`.lrn-${v.classNamePrefix}modal-footer`);
  Ds();
  const t = document.createElement("button"), r = v.classNamePrefix ? "-old" : "";
  t.setAttribute(
    "class",
    `lrn-${v.classNamePrefix}btn${r} lrn-${v.classNamePrefix}btn${r}-legacy lt__image-uploader-upload-btn`
  ), t.textContent = "Upload", e.insertAdjacentElement("afterbegin", t), t.addEventListener("click", () => ks(i));
}
function Ds() {
  const i = document.querySelector(".lt__image-uploader-upload-btn");
  i && (U.debug(`${v.logPrefix}Removing existing upload button`), i.remove());
}
function ks(i) {
  document.querySelector(".lt__image-uploader-upload-btn").removeEventListener("click", () => ks(i)), document.querySelector(".uppy-Dashboard-Item-action--edit")?.setAttribute("disabled", "");
  const r = v.uppy.getFile(i), a = document.querySelector(".lt__image-uploader-upload-btn");
  a.setAttribute("style", "width:105px;"), a.innerHTML = '<span class="lt__upload-spinner"><svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_6kVp{transform-origin:center;animation:spinner_irSm .75s infinite linear}@keyframes spinner_irSm{100%{transform:rotate(360deg)};fill:#ffffff;}</style><path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" class="spinner_6kVp" style="fill: white"/></svg></span>', a.setAttribute("disabled", "");
  const o = new FormData(), s = {
    usrequest: { assetName: r.name, mimeType: r.type, fileType: "image" },
    action: "get",
    security: v.upload.security,
    request: v.upload.request
  };
  o.append("usrequest", JSON.stringify(s.usrequest)), o.append("action", s.action), o.append("security", JSON.stringify(s.security)), o.append("request", JSON.stringify(s.request));
  async function n() {
    return (await fetch(v.upload.uriUploadForm, {
      method: "POST",
      body: o
    })).json();
  }
  n().then((p) => {
    const l = new FormData();
    l.append("key", p.data.formInputs.key), l.append("Content-Type", p.data.formInputs["Content-Type"]), l.append("X-Amz-Security-Token", p.data.formInputs["X-Amz-Security-Token"]), l.append("X-Amz-Credential", p.data.formInputs["X-Amz-Credential"]), l.append("X-Amz-Algorithm", p.data.formInputs["X-Amz-Algorithm"]), l.append("X-Amz-Date", p.data.formInputs["X-Amz-Date"]), l.append("Policy", p.data.formInputs.Policy), l.append("X-Amz-Signature", p.data.formInputs["X-Amz-Signature"]), l.append("file", r.data);
    async function c() {
      return await fetch(p.data.formAttributes.action, {
        method: "POST",
        body: l
      });
    }
    c().then(() => {
      const d = p.data.assetUrl, h = document.querySelector('[data-authorapi-selector="asset-uploader-source"]');
      h.value = d.trim(), h.dispatchEvent(new Event("input", { bubbles: !0 })), U.debug(`${v.logPrefix}Added image path to URI`), setTimeout(() => {
        Ds();
        const m = document.querySelector(
          `.lrn-author-item .lrn-${v.classNamePrefix}delete-btn-wrapper [data-authorapi-action="asset-uploader-delete"]`
        ), f = document.querySelector(
          `.lrn-author-item .lrn-${v.classNamePrefix}image-uploader [data-authorapi-selector="asset-uploader-alignment"]`
        );
        if (m && !f) {
          const y = document.querySelector('[data-authorapi-selector="asset-uploader-okay"]');
          y && (y.click(), U.debug(`${v.logPrefix}Clicked OK button for background images`));
        }
        ur();
      }, 1500);
    }).catch((d) => console.error("Error in uploading image:", d));
  }).catch((p) => console.error("Error in fetching tokens:", p));
}
function kh() {
  U.debug(`${v.logPrefix}listenForSelfHostedImages()`), setTimeout(() => {
    const i = document.querySelector('[data-authorapi-selector="asset-uploader-source"]');
    i && i.addEventListener("input", Ss);
  }, 500);
}
function Ss() {
  U.debug(`${v.logPrefix}handleSelfHostedImage()`), setTimeout(() => {
    ur();
  }, 1500);
}
function ur() {
  U.debug(`${v.logPrefix}prepareModalButtons()`);
  const i = [
    `lrn-${v.classNamePrefix}modal-button-close`,
    `lrn-${v.classNamePrefix}btn-default`,
    `lrn-${v.classNamePrefix}btn-primary-legacy`,
    `lrn-${v.classNamePrefix}btn-sec`
  ], e = document.querySelector(`.lrn-${v.classNamePrefix}modal`);
  a();
  function t(o, s, n) {
    const p = new MutationObserver((c, d) => {
      for (const h of c)
        if (h.type === "childList") {
          const m = document.querySelector(s);
          m && (n(m), d.disconnect());
        }
    });
    p.observe(o, { childList: !0, subtree: !0 });
    const l = document.querySelector(s);
    l && (n(l), p.disconnect());
  }
  setTimeout(() => {
    t(e, `.lrn-${v.classNamePrefix}modal-footer .lrn-${v.classNamePrefix}delete-btn-wrapper`, () => {
      U.debug(`${v.logPrefix}waitForElement() observed`);
      for (const o of i) {
        const s = e.querySelector(`.lrn-${v.classNamePrefix}modal-dialog button.${o}`);
        s && (s.addEventListener("click", r), U.debug(`Adding clickHanders for: ${o}`), U.debug(s));
      }
    });
  }, 100);
  function r() {
    U.debug(`${v.logPrefix}clickHandler()`), a(), setTimeout(() => {
      _s();
    }, 1e3);
  }
  function a() {
    for (const s of i) {
      const n = e.querySelector(`.lrn-${v.classNamePrefix}modal-dialog button.${s}`);
      n && (U.debug(`${v.logPrefix}Removed clickHandler`), n.removeEventListener("click", r));
    }
    const o = document.querySelector('[data-authorapi-selector="asset-uploader-source"]');
    o && o.removeEventListener("input", Ss);
  }
}
function Sh(i) {
  const e = new URLSearchParams(window.location.search), t = window.location.hostname, r = e.get("env");
  return t.includes("learnosity.com") && r === "staging" ? i.replace("authorapi.", "authorapi.staging.") : i;
}
function Ph(i) {
  ["quality", "maxWidth", "maxHeight"].forEach((e) => {
    typeof i?.[e] == "number" && (v.options[e] = i[e]);
  });
}
function Ch() {
  return !v.upload.security || !v.upload.request || typeof v.upload.security != "object" || typeof v.upload.request != "object" ? (U.error(`${v.logPrefix}imageUploader extension failed to run - Missing/invalid security or request parameters`), !1) : !0;
}
function Bt(i, e) {
  const t = document.querySelector(`.${i}`);
  t && (e === "disable" ? t.setAttribute("disabled", "") : e === "enable" ? t.removeAttribute("disabled") : e === "remove" && t.remove());
}
function Bh() {
  const i = document.createElement("style"), e = [yh, bh, vh].join(`
`), t = `
/* Learnosity custom image uploader (DAM) */
/* Used to style content tabs added by via rich-text editor */
.lrn .lrn-author-ui-no-preview .uppy-c-btn,
.lrn .lrn-author-ui-no-preview button.uppy-c-btn {
    color: #fff;
}
.lrn .lrn-author-ui-no-preview button.uppy-Dashboard-browse {
    color: #1269cf;
}
.lrn .uppy-Dashboard-inner {
    margin-bottom: 15px;
}
.lrn .lrn-author-ui-no-preview .uppy-Dashboard-Item-actionWrapper button {
    color: inherit;
}
.lrn .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload,
.lrn .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload:hover {
    background-color: #1877b1;
}
.lrn .lrn-author-ui-no-preview button.lt__image-uploader-upload-btn {
    color: #fff;
    background: #1877b1;
}
.lrn .lrn-author-ui-no-preview button.lt__image-uploader-upload-btn[disabled],
.lrn .lrn-author-ui-no-preview button.lt__image-uploader-upload-btn[disabled]:hover,
.lrn .lrn-author-ui-no-preview button.lt__image-uploader-upload-btn[disabled]:focus {
    color: #d9d9d9;
    border-color: #96b7cb;
    background: #96b7cb;
}

.lrn .uppy-Dashboard-input[type=file] {
    display: none;
}
`;
  i.setAttribute("data-style", "LT Image Uploader"), i.textContent = `${e}

${t}`, document.head.append(i), v.renderedCss = !0;
}
const Ih = Bs("imageUploader", wh), zh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  imageUploader: Ih
}, Symbol.toStringTag, { value: "Module" }));
export {
  Ih as a,
  zh as i
};
