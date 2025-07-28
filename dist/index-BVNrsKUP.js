import { a as ul } from "./app-BXKmoa_A.js";
import { c as hl } from "./styling-CgOepzZE.js";
import H from "./logger.js";
import { a as kt, c as bi } from "./_commonjsHelpers-DQNKXVTB.js";
function vi(i, e) {
  if (!{}.hasOwnProperty.call(i, e)) throw new TypeError("attempted to use private field on non-instance");
  return i;
}
var cl = 0;
function Us(i) {
  return "__private_" + cl++ + "_" + i;
}
function fl(i, e, t) {
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
function Va(i, e) {
  const t = /\$/g, r = "$$$$";
  let a = [i];
  if (e == null) return a;
  for (const o of Object.keys(e))
    if (o !== "_") {
      let s = e[o];
      typeof s == "string" && (s = t[Symbol.replace](s, r)), a = fl(a, new RegExp(`%\\{${o}\\}`, "g"), s);
    }
  return a;
}
const ml = (i) => {
  throw new Error(`missing string: ${i}`);
};
var Ct = /* @__PURE__ */ Us("onMissingKey"), Tt = /* @__PURE__ */ Us("apply");
class Ls {
  constructor(e, t) {
    let {
      onMissingKey: r = ml
    } = t === void 0 ? {} : t;
    Object.defineProperty(this, Tt, {
      value: gl
    }), Object.defineProperty(this, Ct, {
      writable: !0,
      value: void 0
    }), this.locale = {
      strings: {},
      pluralize(a) {
        return a === 1 ? 0 : 1;
      }
    }, Array.isArray(e) ? e.forEach(vi(this, Tt)[Tt], this) : vi(this, Tt)[Tt](e), vi(this, Ct)[Ct] = r;
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
    if (r == null && (vi(this, Ct)[Ct](e), r = e), typeof r == "object") {
      if (t && typeof t.smart_count < "u") {
        const o = this.locale.pluralize(t.smart_count);
        return Va(r[o], t);
      }
      throw new Error("Attempted to use a string with plural forms, but no value was given for %{smart_count}");
    }
    if (typeof r != "string")
      throw new Error("string was not a string");
    return Va(r, t);
  }
}
function gl(i) {
  if (!(i != null && i.strings))
    return;
  const e = this.locale;
  Object.assign(this.locale, {
    strings: {
      ...e.strings,
      ...i.strings
    },
    pluralize: i.pluralize || e.pluralize
  });
}
var Ki, Ga;
function yl() {
  return Ga || (Ga = 1, Ki = function() {
    var e = {}, t = e._fns = {};
    e.emit = function(s, n, l, p, u, d, c) {
      var f = r(s);
      f.length && a(s, f, [n, l, p, u, d, c]);
    }, e.on = function(s, n) {
      t[s] || (t[s] = []), t[s].push(n);
    }, e.once = function(s, n) {
      function l() {
        n.apply(this, arguments), e.off(s, l);
      }
      this.on(s, l);
    }, e.off = function(s, n) {
      var l = [];
      if (s && n) {
        var p = this._fns[s], u = 0, d = p ? p.length : 0;
        for (u; u < d; u++)
          p[u] !== n && l.push(p[u]);
      }
      l.length ? this._fns[s] = l : delete this._fns[s];
    };
    function r(o) {
      var s = t[o] ? t[o] : [], n = o.indexOf(":"), l = n === -1 ? [o] : [o.substring(0, n), o.substring(n + 1)], p = Object.keys(t), u = 0, d = p.length;
      for (u; u < d; u++) {
        var c = p[u];
        if (c === "*" && (s = s.concat(t[c])), l.length === 2 && l[0] === c) {
          s = s.concat(t[c]);
          break;
        }
      }
      return s;
    }
    function a(o, s, n) {
      var l = 0, p = s.length;
      for (l; l < p && s[l]; l++)
        s[l].event = o, s[l].apply(s[l], n);
    }
    return e;
  }), Ki;
}
var bl = yl();
const vl = /* @__PURE__ */ kt(bl);
let wl = "useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict", wa = (i = 21) => {
  let e = "", t = i | 0;
  for (; t--; )
    e += wl[Math.random() * 64 | 0];
  return e;
};
var Zi, Xa;
function xa() {
  if (Xa) return Zi;
  Xa = 1;
  function i(e) {
    var t = typeof e;
    return e != null && (t == "object" || t == "function");
  }
  return Zi = i, Zi;
}
var Qi, Ya;
function xl() {
  if (Ya) return Qi;
  Ya = 1;
  var i = typeof bi == "object" && bi && bi.Object === Object && bi;
  return Qi = i, Qi;
}
var Ji, Ka;
function $s() {
  if (Ka) return Ji;
  Ka = 1;
  var i = xl(), e = typeof self == "object" && self && self.Object === Object && self, t = i || e || Function("return this")();
  return Ji = t, Ji;
}
var er, Za;
function _l() {
  if (Za) return er;
  Za = 1;
  var i = $s(), e = function() {
    return i.Date.now();
  };
  return er = e, er;
}
var tr, Qa;
function Pl() {
  if (Qa) return tr;
  Qa = 1;
  var i = /\s/;
  function e(t) {
    for (var r = t.length; r-- && i.test(t.charAt(r)); )
      ;
    return r;
  }
  return tr = e, tr;
}
var ir, Ja;
function Sl() {
  if (Ja) return ir;
  Ja = 1;
  var i = Pl(), e = /^\s+/;
  function t(r) {
    return r && r.slice(0, i(r) + 1).replace(e, "");
  }
  return ir = t, ir;
}
var rr, eo;
function js() {
  if (eo) return rr;
  eo = 1;
  var i = $s(), e = i.Symbol;
  return rr = e, rr;
}
var ar, to;
function Dl() {
  if (to) return ar;
  to = 1;
  var i = js(), e = Object.prototype, t = e.hasOwnProperty, r = e.toString, a = i ? i.toStringTag : void 0;
  function o(s) {
    var n = t.call(s, a), l = s[a];
    try {
      s[a] = void 0;
      var p = !0;
    } catch {
    }
    var u = r.call(s);
    return p && (n ? s[a] = l : delete s[a]), u;
  }
  return ar = o, ar;
}
var or, io;
function kl() {
  if (io) return or;
  io = 1;
  var i = Object.prototype, e = i.toString;
  function t(r) {
    return e.call(r);
  }
  return or = t, or;
}
var sr, ro;
function Bl() {
  if (ro) return sr;
  ro = 1;
  var i = js(), e = Dl(), t = kl(), r = "[object Null]", a = "[object Undefined]", o = i ? i.toStringTag : void 0;
  function s(n) {
    return n == null ? n === void 0 ? a : r : o && o in Object(n) ? e(n) : t(n);
  }
  return sr = s, sr;
}
var nr, ao;
function Il() {
  if (ao) return nr;
  ao = 1;
  function i(e) {
    return e != null && typeof e == "object";
  }
  return nr = i, nr;
}
var lr, oo;
function Fl() {
  if (oo) return lr;
  oo = 1;
  var i = Bl(), e = Il(), t = "[object Symbol]";
  function r(a) {
    return typeof a == "symbol" || e(a) && i(a) == t;
  }
  return lr = r, lr;
}
var pr, so;
function Cl() {
  if (so) return pr;
  so = 1;
  var i = Sl(), e = xa(), t = Fl(), r = NaN, a = /^[-+]0x[0-9a-f]+$/i, o = /^0b[01]+$/i, s = /^0o[0-7]+$/i, n = parseInt;
  function l(p) {
    if (typeof p == "number")
      return p;
    if (t(p))
      return r;
    if (e(p)) {
      var u = typeof p.valueOf == "function" ? p.valueOf() : p;
      p = e(u) ? u + "" : u;
    }
    if (typeof p != "string")
      return p === 0 ? p : +p;
    p = i(p);
    var d = o.test(p);
    return d || s.test(p) ? n(p.slice(2), d ? 2 : 8) : a.test(p) ? r : +p;
  }
  return pr = l, pr;
}
var dr, no;
function Hs() {
  if (no) return dr;
  no = 1;
  var i = xa(), e = _l(), t = Cl(), r = "Expected a function", a = Math.max, o = Math.min;
  function s(n, l, p) {
    var u, d, c, f, m, y, b = 0, x = !1, _ = !1, B = !0;
    if (typeof n != "function")
      throw new TypeError(r);
    l = t(l) || 0, i(p) && (x = !!p.leading, _ = "maxWait" in p, c = _ ? a(t(p.maxWait) || 0, l) : c, B = "trailing" in p ? !!p.trailing : B);
    function k(A) {
      var N = u, U = d;
      return u = d = void 0, b = A, f = n.apply(U, N), f;
    }
    function C(A) {
      return b = A, m = setTimeout(P, l), x ? k(A) : f;
    }
    function g(A) {
      var N = A - y, U = A - b, Z = l - N;
      return _ ? o(Z, c - U) : Z;
    }
    function S(A) {
      var N = A - y, U = A - b;
      return y === void 0 || N >= l || N < 0 || _ && U >= c;
    }
    function P() {
      var A = e();
      if (S(A))
        return D(A);
      m = setTimeout(P, g(A));
    }
    function D(A) {
      return m = void 0, B && u ? k(A) : (u = d = void 0, f);
    }
    function L() {
      m !== void 0 && clearTimeout(m), b = 0, u = y = d = m = void 0;
    }
    function O() {
      return m === void 0 ? f : D(e());
    }
    function M() {
      var A = e(), N = S(A);
      if (u = arguments, d = this, y = A, N) {
        if (m === void 0)
          return C(y);
        if (_)
          return clearTimeout(m), m = setTimeout(P, l), k(y);
      }
      return m === void 0 && (m = setTimeout(P, l)), f;
    }
    return M.cancel = L, M.flush = O, M;
  }
  return dr = s, dr;
}
var ur, lo;
function Tl() {
  if (lo) return ur;
  lo = 1;
  var i = Hs(), e = xa(), t = "Expected a function";
  function r(a, o, s) {
    var n = !0, l = !0;
    if (typeof a != "function")
      throw new TypeError(t);
    return e(s) && (n = "leading" in s ? !!s.leading : n, l = "trailing" in s ? !!s.trailing : l), i(a, o, {
      leading: n,
      maxWait: o,
      trailing: l
    });
  }
  return ur = r, ur;
}
var Al = Tl();
const El = /* @__PURE__ */ kt(Al);
function zi(i, e) {
  if (!{}.hasOwnProperty.call(i, e)) throw new TypeError("attempted to use private field on non-instance");
  return i;
}
var Ol = 0;
function qs(i) {
  return "__private_" + Ol++ + "_" + i;
}
const zl = {
  version: "4.2.0"
};
var pt = /* @__PURE__ */ qs("callbacks"), hr = /* @__PURE__ */ qs("publish");
class Ws {
  constructor() {
    Object.defineProperty(this, hr, {
      value: Ml
    }), this.state = {}, Object.defineProperty(this, pt, {
      writable: !0,
      value: /* @__PURE__ */ new Set()
    });
  }
  getState() {
    return this.state;
  }
  setState(e) {
    const t = {
      ...this.state
    }, r = {
      ...this.state,
      ...e
    };
    this.state = r, zi(this, hr)[hr](t, r, e);
  }
  subscribe(e) {
    return zi(this, pt)[pt].add(e), () => {
      zi(this, pt)[pt].delete(e);
    };
  }
}
function Ml() {
  for (var i = arguments.length, e = new Array(i), t = 0; t < i; t++)
    e[t] = arguments[t];
  zi(this, pt)[pt].forEach((r) => {
    r(...e);
  });
}
Ws.VERSION = zl.version;
function Ui(i) {
  const e = i.lastIndexOf(".");
  return e === -1 || e === i.length - 1 ? {
    name: i,
    extension: void 0
  } : {
    name: i.slice(0, e),
    extension: i.slice(e + 1)
  };
}
const po = {
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
function Vs(i) {
  var e;
  if (i.type) return i.type;
  const t = i.name ? (e = Ui(i.name).extension) == null ? void 0 : e.toLowerCase() : null;
  return t && t in po ? po[t] : "application/octet-stream";
}
function Rl(i) {
  return i.charCodeAt(0).toString(32);
}
function uo(i) {
  let e = "";
  return i.replace(/[^A-Z0-9]/gi, (t) => (e += `-${Rl(t)}`, "/")) + e;
}
function Nl(i, e) {
  let t = e || "uppy";
  return typeof i.name == "string" && (t += `-${uo(i.name.toLowerCase())}`), i.type !== void 0 && (t += `-${i.type}`), i.meta && typeof i.meta.relativePath == "string" && (t += `-${uo(i.meta.relativePath.toLowerCase())}`), i.data.size !== void 0 && (t += `-${i.data.size}`), i.data.lastModified !== void 0 && (t += `-${i.data.lastModified}`), t;
}
function Ul(i) {
  return !i.isRemote || !i.remote ? !1 : (/* @__PURE__ */ new Set(["box", "dropbox", "drive", "facebook", "unsplash"])).has(i.remote.provider);
}
function Ll(i, e) {
  if (Ul(i)) return i.id;
  const t = Vs(i);
  return Nl({
    ...i,
    type: t
  }, e);
}
function $l(i) {
  if (i == null && typeof navigator < "u" && (i = navigator.userAgent), !i) return !0;
  const e = /Edge\/(\d+\.\d+)/.exec(i);
  if (!e) return !0;
  const r = e[1].split(".", 2), a = parseInt(r[0], 10), o = parseInt(r[1], 10);
  return a < 15 || a === 15 && o < 15063 || a > 18 || a === 18 && o >= 18218;
}
function jl(i, e) {
  return e.name ? e.name : i.split("/")[0] === "image" ? `${i.split("/")[0]}.${i.split("/")[1]}` : "noname";
}
function cr(i) {
  return i < 10 ? `0${i}` : i.toString();
}
function Mi() {
  const i = /* @__PURE__ */ new Date(), e = cr(i.getHours()), t = cr(i.getMinutes()), r = cr(i.getSeconds());
  return `${e}:${t}:${r}`;
}
const Hl = {
  debug: () => {
  },
  warn: () => {
  },
  error: function() {
    for (var i = arguments.length, e = new Array(i), t = 0; t < i; t++)
      e[t] = arguments[t];
    return console.error(`[Uppy] [${Mi()}]`, ...e);
  }
}, ql = {
  debug: function() {
    for (var i = arguments.length, e = new Array(i), t = 0; t < i; t++)
      e[t] = arguments[t];
    return console.debug(`[Uppy] [${Mi()}]`, ...e);
  },
  warn: function() {
    for (var i = arguments.length, e = new Array(i), t = 0; t < i; t++)
      e[t] = arguments[t];
    return console.warn(`[Uppy] [${Mi()}]`, ...e);
  },
  error: function() {
    for (var i = arguments.length, e = new Array(i), t = 0; t < i; t++)
      e[t] = arguments[t];
    return console.error(`[Uppy] [${Mi()}]`, ...e);
  }
};
var fr, ho;
function Wl() {
  return ho || (ho = 1, fr = function(e) {
    if (typeof e != "number" || Number.isNaN(e))
      throw new TypeError(`Expected a number, got ${typeof e}`);
    const t = e < 0;
    let r = Math.abs(e);
    if (t && (r = -r), r === 0)
      return "0 B";
    const a = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"], o = Math.min(Math.floor(Math.log(r) / Math.log(1024)), a.length - 1), s = Number(r / 1024 ** o), n = a[o];
    return `${s >= 10 || s % 1 === 0 ? Math.round(s) : s.toFixed(1)} ${n}`;
  }), fr;
}
var Vl = Wl();
const Le = /* @__PURE__ */ kt(Vl);
var mr, co;
function Gl() {
  if (co) return mr;
  co = 1;
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
  }, mr = function(e, t, r) {
    var a = new i(e, r || /[\/\.]/);
    return typeof t < "u" ? a.match(t) : a;
  }, mr;
}
var gr, fo;
function Xl() {
  if (fo) return gr;
  fo = 1;
  var i = Gl(), e = /[\/\+\.]/;
  return gr = function(t, r) {
    function a(o) {
      var s = i(o, t, e);
      return s && s.length >= 2;
    }
    return r ? a(r.split(";")[0]) : a;
  }, gr;
}
var Yl = Xl();
const Kl = /* @__PURE__ */ kt(Yl), Zl = {
  maxFileSize: null,
  minFileSize: null,
  maxTotalFileSize: null,
  maxNumberOfFiles: null,
  minNumberOfFiles: null,
  allowedFileTypes: null,
  requiredMetaFields: []
};
class ge extends Error {
  constructor(e, t) {
    var r;
    super(e), this.isRestriction = !0, this.isUserFacing = (r = t?.isUserFacing) != null ? r : !0, t != null && t.file && (this.file = t.file);
  }
}
class Ql {
  constructor(e, t) {
    this.getI18n = t, this.getOpts = () => {
      var r;
      const a = e();
      if (((r = a.restrictions) == null ? void 0 : r.allowedFileTypes) != null && !Array.isArray(a.restrictions.allowedFileTypes))
        throw new TypeError("`restrictions.allowedFileTypes` must be an array");
      return a;
    };
  }
  // Because these operations are slow, we cannot run them for every file (if we are adding multiple files)
  validateAggregateRestrictions(e, t) {
    const {
      maxTotalFileSize: r,
      maxNumberOfFiles: a
    } = this.getOpts().restrictions;
    if (a && e.filter((s) => !s.isGhost).length + t.length > a)
      throw new ge(`${this.getI18n()("youCanOnlyUploadX", {
        smart_count: a
      })}`);
    if (r) {
      const o = [...e, ...t].reduce((s, n) => {
        var l;
        return s + ((l = n.size) != null ? l : 0);
      }, 0);
      if (o > r)
        throw new ge(this.getI18n()("aggregateExceedsSize", {
          sizeAllowed: Le(r),
          size: Le(o)
        }));
    }
  }
  validateSingleFile(e) {
    const {
      maxFileSize: t,
      minFileSize: r,
      allowedFileTypes: a
    } = this.getOpts().restrictions;
    if (a && !a.some((n) => n.includes("/") ? e.type ? Kl(e.type.replace(/;.*?$/, ""), n) : !1 : n[0] === "." && e.extension ? e.extension.toLowerCase() === n.slice(1).toLowerCase() : !1)) {
      const n = a.join(", ");
      throw new ge(this.getI18n()("youCanOnlyUploadFileTypes", {
        types: n
      }), {
        file: e
      });
    }
    if (t && e.size != null && e.size > t) {
      var o;
      throw new ge(this.getI18n()("exceedsSize", {
        size: Le(t),
        file: (o = e.name) != null ? o : this.getI18n()("unnamed")
      }), {
        file: e
      });
    }
    if (r && e.size != null && e.size < r)
      throw new ge(this.getI18n()("inferiorSize", {
        size: Le(r)
      }), {
        file: e
      });
  }
  validate(e, t) {
    t.forEach((r) => {
      this.validateSingleFile(r);
    }), this.validateAggregateRestrictions(e, t);
  }
  validateMinNumberOfFiles(e) {
    const {
      minNumberOfFiles: t
    } = this.getOpts().restrictions;
    if (t && Object.keys(e).length < t)
      throw new ge(this.getI18n()("youHaveToAtLeastSelectX", {
        smart_count: t
      }));
  }
  getMissingRequiredMetaFields(e) {
    var t;
    const r = new ge(this.getI18n()("missingRequiredMetaFieldOnFile", {
      fileName: (t = e.name) != null ? t : this.getI18n()("unnamed")
    })), {
      requiredMetaFields: a
    } = this.getOpts().restrictions, o = [];
    for (const s of a)
      (!Object.hasOwn(e.meta, s) || e.meta[s] === "") && o.push(s);
    return {
      missingFields: o,
      error: r
    };
  }
}
const Jl = {
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
function v(i, e) {
  if (!{}.hasOwnProperty.call(i, e)) throw new TypeError("attempted to use private field on non-instance");
  return i;
}
var ep = 0;
function R(i) {
  return "__private_" + ep++ + "_" + i;
}
const tp = {
  version: "4.4.7"
}, wi = {
  totalProgress: 0,
  allowNewUpload: !0,
  error: null,
  recoveredState: null
};
var Q = /* @__PURE__ */ R("plugins"), J = /* @__PURE__ */ R("restricter"), At = /* @__PURE__ */ R("storeUnsubscribe"), Ce = /* @__PURE__ */ R("emitter"), dt = /* @__PURE__ */ R("preProcessors"), ut = /* @__PURE__ */ R("uploaders"), Re = /* @__PURE__ */ R("postProcessors"), ue = /* @__PURE__ */ R("informAndEmit"), ni = /* @__PURE__ */ R("checkRequiredMetaFieldsOnFile"), yr = /* @__PURE__ */ R("checkRequiredMetaFields"), Et = /* @__PURE__ */ R("assertNewUploadAllowed"), Gr = /* @__PURE__ */ R("transformFile"), Ot = /* @__PURE__ */ R("startIfAutoProceed"), zt = /* @__PURE__ */ R("checkAndUpdateFileState"), ii = /* @__PURE__ */ R("getFilesToRetry"), Mt = /* @__PURE__ */ R("doRetryAll"), Xr = /* @__PURE__ */ R("handleUploadProgress"), Rt = /* @__PURE__ */ R("updateTotalProgress"), Ne = /* @__PURE__ */ R("updateTotalProgressThrottled"), Yr = /* @__PURE__ */ R("calculateTotalProgress"), br = /* @__PURE__ */ R("addListeners"), ve = /* @__PURE__ */ R("updateOnlineStatus"), Nt = /* @__PURE__ */ R("requestClientById"), Oe = /* @__PURE__ */ R("createUpload"), vr = /* @__PURE__ */ R("getUpload"), ct = /* @__PURE__ */ R("removeUpload"), ze = /* @__PURE__ */ R("runUpload");
class Vi {
  /**
   * Instantiate Uppy
   */
  constructor(e) {
    Object.defineProperty(this, ze, {
      value: yp
    }), Object.defineProperty(this, ct, {
      value: gp
    }), Object.defineProperty(this, vr, {
      value: mp
    }), Object.defineProperty(this, Oe, {
      value: fp
    }), Object.defineProperty(this, br, {
      value: cp
    }), Object.defineProperty(this, Yr, {
      value: hp
    }), Object.defineProperty(this, Rt, {
      value: up
    }), Object.defineProperty(this, Mt, {
      value: dp
    }), Object.defineProperty(this, ii, {
      value: pp
    }), Object.defineProperty(this, zt, {
      value: lp
    }), Object.defineProperty(this, Ot, {
      value: np
    }), Object.defineProperty(this, Gr, {
      value: sp
    }), Object.defineProperty(this, Et, {
      value: op
    }), Object.defineProperty(this, yr, {
      value: ap
    }), Object.defineProperty(this, ni, {
      value: rp
    }), Object.defineProperty(this, ue, {
      value: ip
    }), Object.defineProperty(this, Q, {
      writable: !0,
      value: /* @__PURE__ */ Object.create(null)
    }), Object.defineProperty(this, J, {
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, At, {
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, Ce, {
      writable: !0,
      value: vl()
    }), Object.defineProperty(this, dt, {
      writable: !0,
      value: /* @__PURE__ */ new Set()
    }), Object.defineProperty(this, ut, {
      writable: !0,
      value: /* @__PURE__ */ new Set()
    }), Object.defineProperty(this, Re, {
      writable: !0,
      value: /* @__PURE__ */ new Set()
    }), this.scheduledAutoProceed = null, this.wasOffline = !1, Object.defineProperty(this, Xr, {
      writable: !0,
      value: (a, o) => {
        const s = a ? this.getFile(a.id) : void 0;
        if (a == null || !s) {
          this.log(`Not setting progress for a file that has been removed: ${a?.id}`);
          return;
        }
        if (s.progress.percentage === 100) {
          this.log(`Not setting progress for a file that has been already uploaded: ${a.id}`);
          return;
        }
        const n = {
          bytesTotal: o.bytesTotal,
          // bytesTotal may be null or zero; in that case we can't divide by it
          percentage: o.bytesTotal != null && Number.isFinite(o.bytesTotal) && o.bytesTotal > 0 ? Math.round(o.bytesUploaded / o.bytesTotal * 100) : void 0
        };
        s.progress.uploadStarted != null ? this.setFileState(a.id, {
          progress: {
            ...s.progress,
            ...n,
            bytesUploaded: o.bytesUploaded
          }
        }) : this.setFileState(a.id, {
          progress: {
            ...s.progress,
            ...n
          }
        }), v(this, Ne)[Ne]();
      }
    }), Object.defineProperty(this, Ne, {
      writable: !0,
      value: El(() => v(this, Rt)[Rt](), 500, {
        leading: !0,
        trailing: !0
      })
    }), Object.defineProperty(this, ve, {
      writable: !0,
      value: this.updateOnlineStatus.bind(this)
    }), Object.defineProperty(this, Nt, {
      writable: !0,
      value: /* @__PURE__ */ new Map()
    }), this.defaultLocale = Jl;
    const t = {
      id: "uppy",
      autoProceed: !1,
      allowMultipleUploadBatches: !0,
      debug: !1,
      restrictions: Zl,
      meta: {},
      onBeforeFileAdded: (a, o) => !Object.hasOwn(o, a.id),
      onBeforeUpload: (a) => a,
      store: new Ws(),
      logger: Hl,
      infoTimeout: 5e3
    }, r = {
      ...t,
      ...e
    };
    this.opts = {
      ...r,
      restrictions: {
        ...t.restrictions,
        ...e && e.restrictions
      }
    }, e && e.logger && e.debug ? this.log("You are using a custom `logger`, but also set `debug: true`, which uses built-in logger to output logs to console. Ignoring `debug: true` and using your custom `logger`.", "warning") : e && e.debug && (this.opts.logger = ql), this.log(`Using Core v${Vi.VERSION}`), this.i18nInit(), this.store = this.opts.store, this.setState({
      ...wi,
      plugins: {},
      files: {},
      currentUploads: {},
      capabilities: {
        uploadProgress: $l(),
        individualCancellation: !0,
        resumableUploads: !1
      },
      meta: {
        ...this.opts.meta
      },
      info: []
    }), v(this, J)[J] = new Ql(() => this.opts, () => this.i18n), v(this, At)[At] = this.store.subscribe((a, o, s) => {
      this.emit("state-update", a, o, s), this.updateAll(o);
    }), this.opts.debug && typeof window < "u" && (window[this.opts.id] = this), v(this, br)[br]();
  }
  emit(e) {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
      r[a - 1] = arguments[a];
    v(this, Ce)[Ce].emit(e, ...r);
  }
  on(e, t) {
    return v(this, Ce)[Ce].on(e, t), this;
  }
  once(e, t) {
    return v(this, Ce)[Ce].once(e, t), this;
  }
  off(e, t) {
    return v(this, Ce)[Ce].off(e, t), this;
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
        ...Object.fromEntries(Object.entries(e).map((r) => {
          let [a, o] = r;
          return [a, {
            ...t[a],
            ...o
          }];
        }))
      }
    });
  }
  /**
   * Shorthand to set state for a specific file.
   */
  setFileState(e, t) {
    if (!this.getState().files[e])
      throw new Error(`Can’t set state for ${e} (the file could have been removed)`);
    this.patchFilesState({
      [e]: t
    });
  }
  i18nInit() {
    const e = (r) => this.log(`Missing i18n string: ${r}`, "error"), t = new Ls([this.defaultLocale, this.opts.locale], {
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
    }, t = {
      ...this.getState().files
    }, r = /* @__PURE__ */ Object.create(null);
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
    }), this.setState({
      files: r,
      ...wi
    });
  }
  clear() {
    const {
      capabilities: e,
      currentUploads: t
    } = this.getState();
    if (Object.keys(t).length > 0 && !e.individualCancellation)
      throw new Error("The installed uploader plugin does not allow removing files during an upload.");
    this.setState({
      ...wi,
      files: {}
    });
  }
  addPreProcessor(e) {
    v(this, dt)[dt].add(e);
  }
  removePreProcessor(e) {
    return v(this, dt)[dt].delete(e);
  }
  addPostProcessor(e) {
    v(this, Re)[Re].add(e);
  }
  removePostProcessor(e) {
    return v(this, Re)[Re].delete(e);
  }
  addUploader(e) {
    v(this, ut)[ut].add(e);
  }
  removeUploader(e) {
    return v(this, ut)[ut].delete(e);
  }
  setMeta(e) {
    const t = {
      ...this.getState().meta,
      ...e
    }, r = {
      ...this.getState().files
    };
    Object.keys(r).forEach((a) => {
      r[a] = {
        ...r[a],
        meta: {
          ...r[a].meta,
          ...e
        }
      };
    }), this.log("Adding metadata:"), this.log(e), this.setState({
      meta: t,
      files: r
    });
  }
  setFileMeta(e, t) {
    const r = {
      ...this.getState().files
    };
    if (!r[e]) {
      this.log(`Was trying to set metadata for a file that has been removed: ${e}`);
      return;
    }
    const a = {
      ...r[e].meta,
      ...t
    };
    r[e] = {
      ...r[e],
      meta: a
    }, this.setState({
      files: r
    });
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
    const {
      files: e
    } = this.getState();
    return Object.values(e);
  }
  getFilesByIds(e) {
    return e.map((t) => this.getFile(t));
  }
  getObjectOfFilesPerState() {
    const {
      files: e,
      totalProgress: t,
      error: r
    } = this.getState(), a = Object.values(e), o = [], s = [], n = [], l = [], p = [], u = [], d = [], c = [], f = [];
    for (const m of a) {
      const {
        progress: y
      } = m;
      !y.uploadComplete && y.uploadStarted && (o.push(m), m.isPaused || c.push(m)), y.uploadStarted || s.push(m), (y.uploadStarted || y.preprocess || y.postprocess) && n.push(m), y.uploadStarted && l.push(m), m.isPaused && p.push(m), y.uploadComplete && u.push(m), m.error && d.push(m), (y.preprocess || y.postprocess) && f.push(m);
    }
    return {
      newFiles: s,
      startedFiles: n,
      uploadStartedFiles: l,
      pausedFiles: p,
      completeFiles: u,
      erroredFiles: d,
      inProgressFiles: o,
      inProgressNotPausedFiles: c,
      processingFiles: f,
      isUploadStarted: l.length > 0,
      isAllComplete: t === 100 && u.length === a.length && f.length === 0,
      isAllErrored: !!r && d.length === a.length,
      isAllPaused: o.length !== 0 && p.length === o.length,
      isUploadInProgress: o.length > 0,
      isSomeGhost: a.some((m) => m.isGhost)
    };
  }
  validateRestrictions(e, t) {
    t === void 0 && (t = this.getFiles());
    try {
      v(this, J)[J].validate(t, [e]);
    } catch (r) {
      return r;
    }
    return null;
  }
  validateSingleFile(e) {
    try {
      v(this, J)[J].validateSingleFile(e);
    } catch (t) {
      return t.message;
    }
    return null;
  }
  validateAggregateRestrictions(e) {
    const t = this.getFiles();
    try {
      v(this, J)[J].validateAggregateRestrictions(t, e);
    } catch (r) {
      return r.message;
    }
    return null;
  }
  checkIfFileAlreadyExists(e) {
    const {
      files: t
    } = this.getState();
    return !!(t[e] && !t[e].isGhost);
  }
  /**
   * Add a new file to `state.files`. This will run `onBeforeFileAdded`,
   * try to guess file type in a clever way, check file against restrictions,
   * and start an upload if `autoProceed === true`.
   */
  addFile(e) {
    v(this, Et)[Et](e);
    const {
      nextFilesState: t,
      validFilesToAdd: r,
      errors: a
    } = v(this, zt)[zt]([e]), o = a.filter((n) => n.isRestriction);
    if (v(this, ue)[ue](o), a.length > 0) throw a[0];
    this.setState({
      files: t
    });
    const [s] = r;
    return this.emit("file-added", s), this.emit("files-added", r), this.log(`Added file: ${s.name}, ${s.id}, mime type: ${s.type}`), v(this, Ot)[Ot](), s.id;
  }
  /**
   * Add multiple files to `state.files`. See the `addFile()` documentation.
   *
   * If an error occurs while adding a file, it is logged and the user is notified.
   * This is good for UI plugins, but not for programmatic use.
   * Programmatic users should usually still use `addFile()` on individual files.
   */
  addFiles(e) {
    v(this, Et)[Et]();
    const {
      nextFilesState: t,
      validFilesToAdd: r,
      errors: a
    } = v(this, zt)[zt](e), o = a.filter((n) => n.isRestriction);
    v(this, ue)[ue](o);
    const s = a.filter((n) => !n.isRestriction);
    if (s.length > 0) {
      let n = `Multiple errors occurred while adding files:
`;
      if (s.forEach((l) => {
        n += `
 * ${l.message}`;
      }), this.info({
        message: this.i18n("addBulkFilesFailed", {
          smart_count: s.length
        }),
        details: n
      }, "error", this.opts.infoTimeout), typeof AggregateError == "function")
        throw new AggregateError(s, n);
      {
        const l = new Error(n);
        throw l.errors = s, l;
      }
    }
    this.setState({
      files: t
    }), r.forEach((n) => {
      this.emit("file-added", n);
    }), this.emit("files-added", r), r.length > 5 ? this.log(`Added batch of ${r.length} files`) : Object.values(r).forEach((n) => {
      this.log(`Added file: ${n.name}
 id: ${n.id}
 type: ${n.type}`);
    }), r.length > 0 && v(this, Ot)[Ot]();
  }
  removeFiles(e) {
    const {
      files: t,
      currentUploads: r
    } = this.getState(), a = {
      ...t
    }, o = {
      ...r
    }, s = /* @__PURE__ */ Object.create(null);
    e.forEach((u) => {
      t[u] && (s[u] = t[u], delete a[u]);
    });
    function n(u) {
      return s[u] === void 0;
    }
    Object.keys(o).forEach((u) => {
      const d = r[u].fileIDs.filter(n);
      if (d.length === 0) {
        delete o[u];
        return;
      }
      const {
        capabilities: c
      } = this.getState();
      if (d.length !== r[u].fileIDs.length && !c.individualCancellation)
        throw new Error("The installed uploader plugin does not allow removing files during an upload.");
      o[u] = {
        ...r[u],
        fileIDs: d
      };
    });
    const l = {
      currentUploads: o,
      files: a
    };
    Object.keys(a).length === 0 && (l.allowNewUpload = !0, l.error = null, l.recoveredState = null), this.setState(l), v(this, Ne)[Ne]();
    const p = Object.keys(s);
    p.forEach((u) => {
      this.emit("file-removed", s[u]);
    }), p.length > 5 ? this.log(`Removed ${p.length} files`) : this.log(`Removed files: ${p.join(", ")}`);
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
    const e = {
      ...this.getState().files
    };
    Object.keys(e).filter((r) => !e[r].progress.uploadComplete && e[r].progress.uploadStarted).forEach((r) => {
      const a = {
        ...e[r],
        isPaused: !0
      };
      e[r] = a;
    }), this.setState({
      files: e
    }), this.emit("pause-all");
  }
  resumeAll() {
    const e = {
      ...this.getState().files
    };
    Object.keys(e).filter((r) => !e[r].progress.uploadComplete && e[r].progress.uploadStarted).forEach((r) => {
      const a = {
        ...e[r],
        isPaused: !1,
        error: null
      };
      e[r] = a;
    }), this.setState({
      files: e
    }), this.emit("resume-all");
  }
  async retryAll() {
    const e = await v(this, Mt)[Mt]();
    return this.emit("complete", e), e;
  }
  cancelAll() {
    this.emit("cancel-all");
    const {
      files: e
    } = this.getState(), t = Object.keys(e);
    t.length && this.removeFiles(t), this.setState(wi);
  }
  retryUpload(e) {
    this.setFileState(e, {
      error: null,
      isPaused: !1
    }), this.emit("upload-retry", this.getFile(e));
    const t = v(this, Oe)[Oe]([e], {
      forceAllowNewUpload: !0
      // create new upload even if allowNewUpload: false
    });
    return v(this, ze)[ze](t);
  }
  logout() {
    this.iteratePlugins((e) => {
      var t;
      (t = e.provider) == null || t.logout == null || t.logout();
    });
  }
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/explicit-module-boundary-types
  [Symbol.for("uppy test: updateTotalProgress")]() {
    return v(this, Rt)[Rt]();
  }
  updateOnlineStatus() {
    var e;
    ((e = window.navigator.onLine) != null ? e : !0) ? (this.emit("is-online"), this.wasOffline && (this.emit("back-online"), this.info(this.i18n("connectedToInternet"), "success", 3e3), this.wasOffline = !1)) : (this.emit("is-offline"), this.info(this.i18n("noInternetConnection"), "error", 0), this.wasOffline = !0);
  }
  getID() {
    return this.opts.id;
  }
  /**
   * Registers a plugin with Core.
   */
  use(e) {
    if (typeof e != "function") {
      const l = `Expected a plugin class, but got ${e === null ? "null" : typeof e}. Please verify that the plugin was imported and spelled correctly.`;
      throw new TypeError(l);
    }
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
      r[a - 1] = arguments[a];
    const o = new e(this, ...r), s = o.id;
    if (!s)
      throw new Error("Your plugin must have an id");
    if (!o.type)
      throw new Error("Your plugin must have a type");
    const n = this.getPlugin(s);
    if (n) {
      const l = `Already found a plugin named '${n.id}'. Tried to use: '${s}'.
Uppy plugins must have unique \`id\` options.`;
      throw new Error(l);
    }
    return e.VERSION && this.log(`Using ${s} v${e.VERSION}`), o.type in v(this, Q)[Q] ? v(this, Q)[Q][o.type].push(o) : v(this, Q)[Q][o.type] = [o], o.install(), this.emit("plugin-added", o), this;
  }
  /**
   * Find one Plugin by name.
   */
  getPlugin(e) {
    for (const t of Object.values(v(this, Q)[Q])) {
      const r = t.find((a) => a.id === e);
      if (r != null) return r;
    }
  }
  [Symbol.for("uppy test: getPlugins")](e) {
    return v(this, Q)[Q][e];
  }
  /**
   * Iterate through all `use`d plugins.
   *
   */
  iteratePlugins(e) {
    Object.values(v(this, Q)[Q]).flat(1).forEach(e);
  }
  /**
   * Uninstall and remove a plugin.
   *
   * @param {object} instance The plugin instance to remove.
   */
  removePlugin(e) {
    this.log(`Removing plugin ${e.id}`), this.emit("plugin-remove", e), e.uninstall && e.uninstall();
    const t = v(this, Q)[Q][e.type], r = t.findIndex((s) => s.id === e.id);
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
    this.log(`Closing Uppy instance ${this.opts.id}: removing all files and uninstalling plugins`), this.cancelAll(), v(this, At)[At](), this.iteratePlugins((e) => {
      this.removePlugin(e);
    }), typeof window < "u" && window.removeEventListener && (window.removeEventListener("online", v(this, ve)[ve]), window.removeEventListener("offline", v(this, ve)[ve]));
  }
  hideInfo() {
    const {
      info: e
    } = this.getState();
    this.setState({
      info: e.slice(1)
    }), this.emit("info-hidden");
  }
  /**
   * Set info message in `state.info`, so that UI plugins like `Informer`
   * can display the message.
   */
  info(e, t, r) {
    t === void 0 && (t = "info"), r === void 0 && (r = 3e3);
    const a = typeof e == "object";
    this.setState({
      info: [...this.getState().info, {
        type: t,
        message: a ? e.message : e,
        details: a ? e.details : null
      }]
    }), setTimeout(() => this.hideInfo(), r), this.emit("info-visible");
  }
  /**
   * Passes messages to a function, provided in `opts.logger`.
   * If `opts.logger: Uppy.debugLogger` or `opts.debug: true`, logs to the browser console.
   */
  log(e, t) {
    const {
      logger: r
    } = this.opts;
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
  registerRequestClient(e, t) {
    v(this, Nt)[Nt].set(e, t);
  }
  /** @protected */
  getRequestClientForFile(e) {
    if (!e.remote) throw new Error(`Tried to get RequestClient for a non-remote file ${e.id}`);
    const t = v(this, Nt)[Nt].get(e.remote.requestClientId);
    if (t == null) throw new Error(`requestClientId "${e.remote.requestClientId}" not registered for file "${e.id}"`);
    return t;
  }
  /**
   * Restore an upload by its ID.
   */
  restore(e) {
    return this.log(`Core: attempting to restore upload "${e}"`), this.getState().currentUploads[e] ? v(this, ze)[ze](e) : (v(this, ct)[ct](e), Promise.reject(new Error("Nonexistent upload")));
  }
  [Symbol.for("uppy test: createUpload")]() {
    return v(this, Oe)[Oe](...arguments);
  }
  /**
   * Add data to an upload's result object.
   */
  addResultData(e, t) {
    if (!v(this, vr)[vr](e)) {
      this.log(`Not setting result for an upload that has been removed: ${e}`);
      return;
    }
    const {
      currentUploads: r
    } = this.getState(), a = {
      ...r[e],
      result: {
        ...r[e].result,
        ...t
      }
    };
    this.setState({
      currentUploads: {
        ...r,
        [e]: a
      }
    });
  }
  /**
   * Start an upload for all the files that are not currently being uploaded.
   */
  async upload() {
    var e;
    (e = v(this, Q)[Q].uploader) != null && e.length || this.log("No uploader type plugins are used", "warning");
    let {
      files: t
    } = this.getState();
    if (v(this, ii)[ii]().length > 0) {
      const o = await v(this, Mt)[Mt]();
      if (!(this.getFiles().filter((n) => n.progress.uploadStarted == null).length > 0))
        return this.emit("complete", o), o;
      ({
        files: t
      } = this.getState());
    }
    const a = this.opts.onBeforeUpload(t);
    return a === !1 ? Promise.reject(new Error("Not starting the upload because onBeforeUpload returned false")) : (a && typeof a == "object" && (t = a, this.setState({
      files: t
    })), Promise.resolve().then(() => v(this, J)[J].validateMinNumberOfFiles(t)).catch((o) => {
      throw v(this, ue)[ue]([o]), o;
    }).then(() => {
      if (!v(this, yr)[yr](t))
        throw new ge(this.i18n("missingRequiredMetaField"));
    }).catch((o) => {
      throw o;
    }).then(async () => {
      const {
        currentUploads: o
      } = this.getState(), s = Object.values(o).flatMap((u) => u.fileIDs), n = [];
      Object.keys(t).forEach((u) => {
        const d = this.getFile(u);
        !d.progress.uploadStarted && s.indexOf(u) === -1 && n.push(d.id);
      });
      const l = v(this, Oe)[Oe](n), p = await v(this, ze)[ze](l);
      return this.emit("complete", p), p;
    }).catch((o) => {
      throw this.emit("error", o), this.log(o, "error"), o;
    }));
  }
}
function ip(i) {
  for (const o of i)
    o.isRestriction ? this.emit("restriction-failed", o.file, o) : this.emit("error", o, o.file), this.log(o, "warning");
  const e = i.filter((o) => o.isUserFacing), t = 4, r = e.slice(0, t), a = e.slice(t);
  r.forEach((o) => {
    let {
      message: s,
      details: n = ""
    } = o;
    this.info({
      message: s,
      details: n
    }, "error", this.opts.infoTimeout);
  }), a.length > 0 && this.info({
    message: this.i18n("additionalRestrictionsFailed", {
      count: a.length
    })
  });
}
function rp(i) {
  const {
    missingFields: e,
    error: t
  } = v(this, J)[J].getMissingRequiredMetaFields(i);
  return e.length > 0 ? (this.setFileState(i.id, {
    missingRequiredMetaFields: e
  }), this.log(t.message), this.emit("restriction-failed", i, t), !1) : (e.length === 0 && i.missingRequiredMetaFields && this.setFileState(i.id, {
    missingRequiredMetaFields: []
  }), !0);
}
function ap(i) {
  let e = !0;
  for (const t of Object.values(i))
    v(this, ni)[ni](t) || (e = !1);
  return e;
}
function op(i) {
  const {
    allowNewUpload: e
  } = this.getState();
  if (e === !1) {
    const t = new ge(this.i18n("noMoreFilesAllowed"), {
      file: i
    });
    throw v(this, ue)[ue]([t]), t;
  }
}
function sp(i) {
  const e = i instanceof File ? {
    name: i.name,
    type: i.type,
    size: i.size,
    data: i
  } : i, t = Vs(e), r = jl(t, e), a = Ui(r).extension, o = Ll(e, this.getID()), s = e.meta || {};
  s.name = r, s.type = t;
  const n = Number.isFinite(e.data.size) ? e.data.size : null;
  return {
    source: e.source || "",
    id: o,
    name: r,
    extension: a || "",
    meta: {
      ...this.getState().meta,
      ...s
    },
    type: t,
    data: e.data,
    progress: {
      percentage: 0,
      bytesUploaded: !1,
      bytesTotal: n,
      uploadComplete: !1,
      uploadStarted: null
    },
    size: n,
    isGhost: !1,
    isRemote: e.isRemote || !1,
    remote: e.remote,
    preview: e.preview
  };
}
function np() {
  this.opts.autoProceed && !this.scheduledAutoProceed && (this.scheduledAutoProceed = setTimeout(() => {
    this.scheduledAutoProceed = null, this.upload().catch((i) => {
      i.isRestriction || this.log(i.stack || i.message || i);
    });
  }, 4));
}
function lp(i) {
  const {
    files: e
  } = this.getState(), t = {
    ...e
  }, r = [], a = [];
  for (const n of i)
    try {
      var o;
      let l = v(this, Gr)[Gr](n);
      const p = (o = e[l.id]) == null ? void 0 : o.isGhost;
      p && (l = {
        ...e[l.id],
        isGhost: !1,
        data: n.data
      }, this.log(`Replaced the blob in the restored ghost file: ${l.name}, ${l.id}`));
      const u = this.opts.onBeforeFileAdded(l, t);
      if (!u && this.checkIfFileAlreadyExists(l.id)) {
        var s;
        throw new ge(this.i18n("noDuplicates", {
          fileName: (s = l.name) != null ? s : this.i18n("unnamed")
        }), {
          file: n
        });
      }
      if (u === !1 && !p)
        throw new ge("Cannot add the file because onBeforeFileAdded returned false.", {
          isUserFacing: !1,
          file: n
        });
      typeof u == "object" && u !== null && (l = u), v(this, J)[J].validateSingleFile(l), t[l.id] = l, r.push(l);
    } catch (l) {
      a.push(l);
    }
  try {
    v(this, J)[J].validateAggregateRestrictions(Object.values(e), r);
  } catch (n) {
    return a.push(n), {
      nextFilesState: e,
      validFilesToAdd: [],
      errors: a
    };
  }
  return {
    nextFilesState: t,
    validFilesToAdd: r,
    errors: a
  };
}
function pp() {
  const {
    files: i
  } = this.getState();
  return Object.keys(i).filter((e) => i[e].error);
}
async function dp() {
  const i = v(this, ii)[ii](), e = {
    ...this.getState().files
  };
  if (i.forEach((r) => {
    e[r] = {
      ...e[r],
      isPaused: !1,
      error: null
    };
  }), this.setState({
    files: e,
    error: null
  }), this.emit("retry-all", this.getFilesByIds(i)), i.length === 0)
    return {
      successful: [],
      failed: []
    };
  const t = v(this, Oe)[Oe](i, {
    forceAllowNewUpload: !0
    // create new upload even if allowNewUpload: false
  });
  return v(this, ze)[ze](t);
}
function up() {
  var i, e;
  const t = v(this, Yr)[Yr]();
  let r = null;
  t != null && (r = Math.round(t * 100), r > 100 ? r = 100 : r < 0 && (r = 0)), this.emit("progress", (i = r) != null ? i : 0), this.setState({
    totalProgress: (e = r) != null ? e : 0
  });
}
function hp() {
  const e = this.getFiles().filter((n) => n.progress.uploadStarted || n.progress.preprocess || n.progress.postprocess);
  if (e.length === 0)
    return 0;
  if (e.every((n) => n.progress.uploadComplete))
    return 1;
  const t = (n) => n.progress.bytesTotal != null && n.progress.bytesTotal !== 0, r = e.filter(t), a = e.filter((n) => !t(n));
  if (r.every((n) => n.progress.uploadComplete) && a.length > 0 && !a.every((n) => n.progress.uploadComplete))
    return null;
  const o = r.reduce((n, l) => {
    var p;
    return n + ((p = l.progress.bytesTotal) != null ? p : 0);
  }, 0), s = r.reduce((n, l) => n + (l.progress.bytesUploaded || 0), 0);
  return o === 0 ? 0 : s / o;
}
function cp() {
  const i = (r, a, o) => {
    let s = r.message || "Unknown error";
    r.details && (s += ` ${r.details}`), this.setState({
      error: s
    }), a != null && a.id in this.getState().files && this.setFileState(a.id, {
      error: s,
      response: o
    });
  };
  this.on("error", i), this.on("upload-error", (r, a, o) => {
    if (i(a, r, o), typeof a == "object" && a.message) {
      var s;
      this.log(a.message, "error");
      const n = new Error(this.i18n("failedToUpload", {
        file: (s = r?.name) != null ? s : ""
      }));
      n.isUserFacing = !0, n.details = a.message, a.details && (n.details += ` ${a.details}`), v(this, ue)[ue]([n]);
    } else
      v(this, ue)[ue]([a]);
  });
  let e = null;
  this.on("upload-stalled", (r, a) => {
    const {
      message: o
    } = r, s = a.map((n) => n.meta.name).join(", ");
    e || (this.info({
      message: o,
      details: s
    }, "warning", this.opts.infoTimeout), e = setTimeout(() => {
      e = null;
    }, this.opts.infoTimeout)), this.log(`${o} ${s}`.trim(), "warning");
  }), this.on("upload", () => {
    this.setState({
      error: null
    });
  });
  const t = (r) => {
    const a = r.filter((s) => {
      const n = s != null && this.getFile(s.id);
      return n || this.log(`Not setting progress for a file that has been removed: ${s?.id}`), n;
    }), o = Object.fromEntries(a.map((s) => [s.id, {
      progress: {
        uploadStarted: Date.now(),
        uploadComplete: !1,
        bytesUploaded: 0,
        bytesTotal: s.size
      }
    }]));
    this.patchFilesState(o);
  };
  this.on("upload-start", t), this.on("upload-progress", v(this, Xr)[Xr]), this.on("upload-success", (r, a) => {
    if (r == null || !this.getFile(r.id)) {
      this.log(`Not setting progress for a file that has been removed: ${r?.id}`);
      return;
    }
    const o = this.getFile(r.id).progress;
    this.setFileState(r.id, {
      progress: {
        ...o,
        postprocess: v(this, Re)[Re].size > 0 ? {
          mode: "indeterminate"
        } : void 0,
        uploadComplete: !0,
        percentage: 100,
        bytesUploaded: o.bytesTotal
      },
      response: a,
      uploadURL: a.uploadURL,
      isPaused: !1
    }), r.size == null && this.setFileState(r.id, {
      size: a.bytesUploaded || o.bytesTotal
    }), v(this, Ne)[Ne]();
  }), this.on("preprocess-progress", (r, a) => {
    if (r == null || !this.getFile(r.id)) {
      this.log(`Not setting progress for a file that has been removed: ${r?.id}`);
      return;
    }
    this.setFileState(r.id, {
      progress: {
        ...this.getFile(r.id).progress,
        preprocess: a
      }
    });
  }), this.on("preprocess-complete", (r) => {
    if (r == null || !this.getFile(r.id)) {
      this.log(`Not setting progress for a file that has been removed: ${r?.id}`);
      return;
    }
    const a = {
      ...this.getState().files
    };
    a[r.id] = {
      ...a[r.id],
      progress: {
        ...a[r.id].progress
      }
    }, delete a[r.id].progress.preprocess, this.setState({
      files: a
    });
  }), this.on("postprocess-progress", (r, a) => {
    if (r == null || !this.getFile(r.id)) {
      this.log(`Not setting progress for a file that has been removed: ${r?.id}`);
      return;
    }
    this.setFileState(r.id, {
      progress: {
        ...this.getState().files[r.id].progress,
        postprocess: a
      }
    });
  }), this.on("postprocess-complete", (r) => {
    if (r == null || !this.getFile(r.id)) {
      this.log(`Not setting progress for a file that has been removed: ${r?.id}`);
      return;
    }
    const a = {
      ...this.getState().files
    };
    a[r.id] = {
      ...a[r.id],
      progress: {
        ...a[r.id].progress
      }
    }, delete a[r.id].progress.postprocess, this.setState({
      files: a
    });
  }), this.on("restored", () => {
    v(this, Ne)[Ne]();
  }), this.on("dashboard:file-edit-complete", (r) => {
    r && v(this, ni)[ni](r);
  }), typeof window < "u" && window.addEventListener && (window.addEventListener("online", v(this, ve)[ve]), window.addEventListener("offline", v(this, ve)[ve]), setTimeout(v(this, ve)[ve], 3e3));
}
function fp(i, e) {
  e === void 0 && (e = {});
  const {
    forceAllowNewUpload: t = !1
  } = e, {
    allowNewUpload: r,
    currentUploads: a
  } = this.getState();
  if (!r && !t)
    throw new Error("Cannot create a new upload: already uploading.");
  const o = wa();
  return this.emit("upload", o, this.getFilesByIds(i)), this.setState({
    allowNewUpload: this.opts.allowMultipleUploadBatches !== !1 && this.opts.allowMultipleUploads !== !1,
    currentUploads: {
      ...a,
      [o]: {
        fileIDs: i,
        step: 0,
        result: {}
      }
    }
  }), o;
}
function mp(i) {
  const {
    currentUploads: e
  } = this.getState();
  return e[i];
}
function gp(i) {
  const e = {
    ...this.getState().currentUploads
  };
  delete e[i], this.setState({
    currentUploads: e
  });
}
async function yp(i) {
  const e = () => {
    const {
      currentUploads: o
    } = this.getState();
    return o[i];
  };
  let t = e();
  const r = [...v(this, dt)[dt], ...v(this, ut)[ut], ...v(this, Re)[Re]];
  try {
    for (let o = t.step || 0; o < r.length && t; o++) {
      const s = r[o];
      this.setState({
        currentUploads: {
          ...this.getState().currentUploads,
          [i]: {
            ...t,
            step: o
          }
        }
      });
      const {
        fileIDs: n
      } = t;
      await s(n, i), t = e();
    }
  } catch (o) {
    throw v(this, ct)[ct](i), o;
  }
  if (t) {
    t.fileIDs.forEach((l) => {
      const p = this.getFile(l);
      p && p.progress.postprocess && this.emit("postprocess-complete", p);
    });
    const o = t.fileIDs.map((l) => this.getFile(l)), s = o.filter((l) => !l.error), n = o.filter((l) => l.error);
    this.addResultData(i, {
      successful: s,
      failed: n,
      uploadID: i
    }), t = e();
  }
  let a;
  return t && (a = t.result, v(this, ct)[ct](i)), a == null && (this.log(`Not setting result for an upload that has been removed: ${i}`), a = {
    successful: [],
    failed: [],
    uploadID: i
  }), a;
}
Vi.VERSION = tp.version;
var fi, F, Gs, ht, mo, Xs, Ys, Ks, _a, Kr, Zr, li = {}, Zs = [], bp = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, mi = Array.isArray;
function De(i, e) {
  for (var t in e) i[t] = e[t];
  return i;
}
function Pa(i) {
  i && i.parentNode && i.parentNode.removeChild(i);
}
function h(i, e, t) {
  var r, a, o, s = {};
  for (o in e) o == "key" ? r = e[o] : o == "ref" ? a = e[o] : s[o] = e[o];
  if (arguments.length > 2 && (s.children = arguments.length > 3 ? fi.call(arguments, 2) : t), typeof i == "function" && i.defaultProps != null) for (o in i.defaultProps) s[o] === void 0 && (s[o] = i.defaultProps[o]);
  return ri(i, s, r, a, null);
}
function ri(i, e, t, r, a) {
  var o = { type: i, props: e, key: t, ref: r, __k: null, __: null, __b: 0, __e: null, __c: null, constructor: void 0, __v: a ?? ++Gs, __i: -1, __u: 0 };
  return a == null && F.vnode != null && F.vnode(o), o;
}
function vp() {
  return { current: null };
}
function ke(i) {
  return i.children;
}
function ae(i, e) {
  this.props = i, this.context = e;
}
function Dt(i, e) {
  if (e == null) return i.__ ? Dt(i.__, i.__i + 1) : null;
  for (var t; e < i.__k.length; e++) if ((t = i.__k[e]) != null && t.__e != null) return t.__e;
  return typeof i.type == "function" ? Dt(i) : null;
}
function Qs(i) {
  var e, t;
  if ((i = i.__) != null && i.__c != null) {
    for (i.__e = i.__c.base = null, e = 0; e < i.__k.length; e++) if ((t = i.__k[e]) != null && t.__e != null) {
      i.__e = i.__c.base = t.__e;
      break;
    }
    return Qs(i);
  }
}
function go(i) {
  (!i.__d && (i.__d = !0) && ht.push(i) && !Li.__r++ || mo != F.debounceRendering) && ((mo = F.debounceRendering) || Xs)(Li);
}
function Li() {
  for (var i, e, t, r, a, o, s, n = 1; ht.length; ) ht.length > n && ht.sort(Ys), i = ht.shift(), n = ht.length, i.__d && (t = void 0, a = (r = (e = i).__v).__e, o = [], s = [], e.__P && ((t = De({}, r)).__v = r.__v + 1, F.vnode && F.vnode(t), Sa(e.__P, t, r, e.__n, e.__P.namespaceURI, 32 & r.__u ? [a] : null, o, a ?? Dt(r), !!(32 & r.__u), s), t.__v = r.__v, t.__.__k[t.__i] = t, tn(o, t, s), t.__e != a && Qs(t)));
  Li.__r = 0;
}
function Js(i, e, t, r, a, o, s, n, l, p, u) {
  var d, c, f, m, y, b, x = r && r.__k || Zs, _ = e.length;
  for (l = wp(t, e, x, l, _), d = 0; d < _; d++) (f = t.__k[d]) != null && (c = f.__i == -1 ? li : x[f.__i] || li, f.__i = d, b = Sa(i, f, c, a, o, s, n, l, p, u), m = f.__e, f.ref && c.ref != f.ref && (c.ref && Da(c.ref, null, f), u.push(f.ref, f.__c || m, f)), y == null && m != null && (y = m), 4 & f.__u || c.__k === f.__k ? l = en(f, l, i) : typeof f.type == "function" && b !== void 0 ? l = b : m && (l = m.nextSibling), f.__u &= -7);
  return t.__e = y, l;
}
function wp(i, e, t, r, a) {
  var o, s, n, l, p, u = t.length, d = u, c = 0;
  for (i.__k = new Array(a), o = 0; o < a; o++) (s = e[o]) != null && typeof s != "boolean" && typeof s != "function" ? (l = o + c, (s = i.__k[o] = typeof s == "string" || typeof s == "number" || typeof s == "bigint" || s.constructor == String ? ri(null, s, null, null, null) : mi(s) ? ri(ke, { children: s }, null, null, null) : s.constructor == null && s.__b > 0 ? ri(s.type, s.props, s.key, s.ref ? s.ref : null, s.__v) : s).__ = i, s.__b = i.__b + 1, n = null, (p = s.__i = xp(s, t, l, d)) != -1 && (d--, (n = t[p]) && (n.__u |= 2)), n == null || n.__v == null ? (p == -1 && (a > u ? c-- : a < u && c++), typeof s.type != "function" && (s.__u |= 4)) : p != l && (p == l - 1 ? c-- : p == l + 1 ? c++ : (p > l ? c-- : c++, s.__u |= 4))) : i.__k[o] = null;
  if (d) for (o = 0; o < u; o++) (n = t[o]) != null && (2 & n.__u) == 0 && (n.__e == r && (r = Dt(n)), an(n, n));
  return r;
}
function en(i, e, t) {
  var r, a;
  if (typeof i.type == "function") {
    for (r = i.__k, a = 0; r && a < r.length; a++) r[a] && (r[a].__ = i, e = en(r[a], e, t));
    return e;
  }
  i.__e != e && (e && i.type && !t.contains(e) && (e = Dt(i)), t.insertBefore(i.__e, e || null), e = i.__e);
  do
    e = e && e.nextSibling;
  while (e != null && e.nodeType == 8);
  return e;
}
function we(i, e) {
  return e = e || [], i == null || typeof i == "boolean" || (mi(i) ? i.some(function(t) {
    we(t, e);
  }) : e.push(i)), e;
}
function xp(i, e, t, r) {
  var a, o, s = i.key, n = i.type, l = e[t];
  if (l === null && i.key == null || l && s == l.key && n == l.type && (2 & l.__u) == 0) return t;
  if (r > (l != null && (2 & l.__u) == 0 ? 1 : 0)) for (a = t - 1, o = t + 1; a >= 0 || o < e.length; ) {
    if (a >= 0) {
      if ((l = e[a]) && (2 & l.__u) == 0 && s == l.key && n == l.type) return a;
      a--;
    }
    if (o < e.length) {
      if ((l = e[o]) && (2 & l.__u) == 0 && s == l.key && n == l.type) return o;
      o++;
    }
  }
  return -1;
}
function yo(i, e, t) {
  e[0] == "-" ? i.setProperty(e, t ?? "") : i[e] = t == null ? "" : typeof t != "number" || bp.test(e) ? t : t + "px";
}
function xi(i, e, t, r, a) {
  var o, s;
  e: if (e == "style") if (typeof t == "string") i.style.cssText = t;
  else {
    if (typeof r == "string" && (i.style.cssText = r = ""), r) for (e in r) t && e in t || yo(i.style, e, "");
    if (t) for (e in t) r && t[e] == r[e] || yo(i.style, e, t[e]);
  }
  else if (e[0] == "o" && e[1] == "n") o = e != (e = e.replace(Ks, "$1")), s = e.toLowerCase(), e = s in i || e == "onFocusOut" || e == "onFocusIn" ? s.slice(2) : e.slice(2), i.l || (i.l = {}), i.l[e + o] = t, t ? r ? t.u = r.u : (t.u = _a, i.addEventListener(e, o ? Zr : Kr, o)) : i.removeEventListener(e, o ? Zr : Kr, o);
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
function bo(i) {
  return function(e) {
    if (this.l) {
      var t = this.l[e.type + i];
      if (e.t == null) e.t = _a++;
      else if (e.t < t.u) return;
      return t(F.event ? F.event(e) : e);
    }
  };
}
function Sa(i, e, t, r, a, o, s, n, l, p) {
  var u, d, c, f, m, y, b, x, _, B, k, C, g, S, P, D, L, O = e.type;
  if (e.constructor != null) return null;
  128 & t.__u && (l = !!(32 & t.__u), o = [n = e.__e = t.__e]), (u = F.__b) && u(e);
  e: if (typeof O == "function") try {
    if (x = e.props, _ = "prototype" in O && O.prototype.render, B = (u = O.contextType) && r[u.__c], k = u ? B ? B.props.value : u.__ : r, t.__c ? b = (d = e.__c = t.__c).__ = d.__E : (_ ? e.__c = d = new O(x, k) : (e.__c = d = new ae(x, k), d.constructor = O, d.render = Pp), B && B.sub(d), d.props = x, d.state || (d.state = {}), d.context = k, d.__n = r, c = d.__d = !0, d.__h = [], d._sb = []), _ && d.__s == null && (d.__s = d.state), _ && O.getDerivedStateFromProps != null && (d.__s == d.state && (d.__s = De({}, d.__s)), De(d.__s, O.getDerivedStateFromProps(x, d.__s))), f = d.props, m = d.state, d.__v = e, c) _ && O.getDerivedStateFromProps == null && d.componentWillMount != null && d.componentWillMount(), _ && d.componentDidMount != null && d.__h.push(d.componentDidMount);
    else {
      if (_ && O.getDerivedStateFromProps == null && x !== f && d.componentWillReceiveProps != null && d.componentWillReceiveProps(x, k), !d.__e && d.shouldComponentUpdate != null && d.shouldComponentUpdate(x, d.__s, k) === !1 || e.__v == t.__v) {
        for (e.__v != t.__v && (d.props = x, d.state = d.__s, d.__d = !1), e.__e = t.__e, e.__k = t.__k, e.__k.some(function(M) {
          M && (M.__ = e);
        }), C = 0; C < d._sb.length; C++) d.__h.push(d._sb[C]);
        d._sb = [], d.__h.length && s.push(d);
        break e;
      }
      d.componentWillUpdate != null && d.componentWillUpdate(x, d.__s, k), _ && d.componentDidUpdate != null && d.__h.push(function() {
        d.componentDidUpdate(f, m, y);
      });
    }
    if (d.context = k, d.props = x, d.__P = i, d.__e = !1, g = F.__r, S = 0, _) {
      for (d.state = d.__s, d.__d = !1, g && g(e), u = d.render(d.props, d.state, d.context), P = 0; P < d._sb.length; P++) d.__h.push(d._sb[P]);
      d._sb = [];
    } else do
      d.__d = !1, g && g(e), u = d.render(d.props, d.state, d.context), d.state = d.__s;
    while (d.__d && ++S < 25);
    d.state = d.__s, d.getChildContext != null && (r = De(De({}, r), d.getChildContext())), _ && !c && d.getSnapshotBeforeUpdate != null && (y = d.getSnapshotBeforeUpdate(f, m)), D = u, u != null && u.type === ke && u.key == null && (D = rn(u.props.children)), n = Js(i, mi(D) ? D : [D], e, t, r, a, o, s, n, l, p), d.base = e.__e, e.__u &= -161, d.__h.length && s.push(d), b && (d.__E = d.__ = null);
  } catch (M) {
    if (e.__v = null, l || o != null) if (M.then) {
      for (e.__u |= l ? 160 : 128; n && n.nodeType == 8 && n.nextSibling; ) n = n.nextSibling;
      o[o.indexOf(n)] = null, e.__e = n;
    } else for (L = o.length; L--; ) Pa(o[L]);
    else e.__e = t.__e, e.__k = t.__k;
    F.__e(M, e, t);
  }
  else o == null && e.__v == t.__v ? (e.__k = t.__k, e.__e = t.__e) : n = e.__e = _p(t.__e, e, t, r, a, o, s, l, p);
  return (u = F.diffed) && u(e), 128 & e.__u ? void 0 : n;
}
function tn(i, e, t) {
  for (var r = 0; r < t.length; r++) Da(t[r], t[++r], t[++r]);
  F.__c && F.__c(e, i), i.some(function(a) {
    try {
      i = a.__h, a.__h = [], i.some(function(o) {
        o.call(a);
      });
    } catch (o) {
      F.__e(o, a.__v);
    }
  });
}
function rn(i) {
  return typeof i != "object" || i == null || i.__b && i.__b > 0 ? i : mi(i) ? i.map(rn) : De({}, i);
}
function _p(i, e, t, r, a, o, s, n, l) {
  var p, u, d, c, f, m, y, b = t.props, x = e.props, _ = e.type;
  if (_ == "svg" ? a = "http://www.w3.org/2000/svg" : _ == "math" ? a = "http://www.w3.org/1998/Math/MathML" : a || (a = "http://www.w3.org/1999/xhtml"), o != null) {
    for (p = 0; p < o.length; p++) if ((f = o[p]) && "setAttribute" in f == !!_ && (_ ? f.localName == _ : f.nodeType == 3)) {
      i = f, o[p] = null;
      break;
    }
  }
  if (i == null) {
    if (_ == null) return document.createTextNode(x);
    i = document.createElementNS(a, _, x.is && x), n && (F.__m && F.__m(e, o), n = !1), o = null;
  }
  if (_ == null) b === x || n && i.data == x || (i.data = x);
  else {
    if (o = o && fi.call(i.childNodes), b = t.props || li, !n && o != null) for (b = {}, p = 0; p < i.attributes.length; p++) b[(f = i.attributes[p]).name] = f.value;
    for (p in b) if (f = b[p], p != "children") {
      if (p == "dangerouslySetInnerHTML") d = f;
      else if (!(p in x)) {
        if (p == "value" && "defaultValue" in x || p == "checked" && "defaultChecked" in x) continue;
        xi(i, p, null, f, a);
      }
    }
    for (p in x) f = x[p], p == "children" ? c = f : p == "dangerouslySetInnerHTML" ? u = f : p == "value" ? m = f : p == "checked" ? y = f : n && typeof f != "function" || b[p] === f || xi(i, p, f, b[p], a);
    if (u) n || d && (u.__html == d.__html || u.__html == i.innerHTML) || (i.innerHTML = u.__html), e.__k = [];
    else if (d && (i.innerHTML = ""), Js(e.type == "template" ? i.content : i, mi(c) ? c : [c], e, t, r, _ == "foreignObject" ? "http://www.w3.org/1999/xhtml" : a, o, s, o ? o[0] : t.__k && Dt(t, 0), n, l), o != null) for (p = o.length; p--; ) Pa(o[p]);
    n || (p = "value", _ == "progress" && m == null ? i.removeAttribute("value") : m != null && (m !== i[p] || _ == "progress" && !m || _ == "option" && m != b[p]) && xi(i, p, m, b[p], a), p = "checked", y != null && y != i[p] && xi(i, p, y, b[p], a));
  }
  return i;
}
function Da(i, e, t) {
  try {
    if (typeof i == "function") {
      var r = typeof i.__u == "function";
      r && i.__u(), r && e == null || (i.__u = i(e));
    } else i.current = e;
  } catch (a) {
    F.__e(a, t);
  }
}
function an(i, e, t) {
  var r, a;
  if (F.unmount && F.unmount(i), (r = i.ref) && (r.current && r.current != i.__e || Da(r, null, e)), (r = i.__c) != null) {
    if (r.componentWillUnmount) try {
      r.componentWillUnmount();
    } catch (o) {
      F.__e(o, e);
    }
    r.base = r.__P = null;
  }
  if (r = i.__k) for (a = 0; a < r.length; a++) r[a] && an(r[a], e, t || typeof i.type != "function");
  t || Pa(i.__e), i.__c = i.__ = i.__e = void 0;
}
function Pp(i, e, t) {
  return this.constructor(i, t);
}
function Sp(i, e, t) {
  var r, a, o, s;
  e == document && (e = document.documentElement), F.__ && F.__(i, e), a = (r = typeof t == "function") ? null : e.__k, o = [], s = [], Sa(e, i = e.__k = h(ke, null, [i]), a || li, li, e.namespaceURI, a ? null : e.firstChild ? fi.call(e.childNodes) : null, o, a ? a.__e : e.firstChild, r, s), tn(o, i, s);
}
function on(i, e, t) {
  var r, a, o, s, n = De({}, i.props);
  for (o in i.type && i.type.defaultProps && (s = i.type.defaultProps), e) o == "key" ? r = e[o] : o == "ref" ? a = e[o] : n[o] = e[o] === void 0 && s != null ? s[o] : e[o];
  return arguments.length > 2 && (n.children = arguments.length > 3 ? fi.call(arguments, 2) : t), ri(i.type, n, r || i.key, a || i.ref, null);
}
fi = Zs.slice, F = { __e: function(i, e, t, r) {
  for (var a, o, s; e = e.__; ) if ((a = e.__c) && !a.__) try {
    if ((o = a.constructor) && o.getDerivedStateFromError != null && (a.setState(o.getDerivedStateFromError(i)), s = a.__d), a.componentDidCatch != null && (a.componentDidCatch(i, r || {}), s = a.__d), s) return a.__E = a;
  } catch (n) {
    i = n;
  }
  throw i;
} }, Gs = 0, ae.prototype.setState = function(i, e) {
  var t;
  t = this.__s != null && this.__s != this.state ? this.__s : this.__s = De({}, this.state), typeof i == "function" && (i = i(De({}, t), this.props)), i && De(t, i), i != null && this.__v && (e && this._sb.push(e), go(this));
}, ae.prototype.forceUpdate = function(i) {
  this.__v && (this.__e = !0, i && this.__h.push(i), go(this));
}, ae.prototype.render = ke, ht = [], Xs = typeof Promise == "function" ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, Ys = function(i, e) {
  return i.__v.__b - e.__v.__b;
}, Li.__r = 0, Ks = /(PointerCapture)$|Capture$/i, _a = 0, Kr = bo(!1), Zr = bo(!0);
var pi, W, wr, vo, di = 0, sn = [], V = F, wo = V.__b, xo = V.__r, _o = V.diffed, Po = V.__c, So = V.unmount, Do = V.__;
function ka(i, e) {
  V.__h && V.__h(W, i, di || e), di = 0;
  var t = W.__H || (W.__H = { __: [], __h: [] });
  return i >= t.__.length && t.__.push({}), t.__[i];
}
function $i(i) {
  return di = 1, Dp(ln, i);
}
function Dp(i, e, t) {
  var r = ka(pi++, 2);
  if (r.t = i, !r.__c && (r.__ = [t ? t(e) : ln(void 0, e), function(n) {
    var l = r.__N ? r.__N[0] : r.__[0], p = r.t(l, n);
    l !== p && (r.__N = [p, r.__[1]], r.__c.setState({}));
  }], r.__c = W, !W.__f)) {
    var a = function(n, l, p) {
      if (!r.__c.__H) return !0;
      var u = r.__c.__H.__.filter(function(c) {
        return !!c.__c;
      });
      if (u.every(function(c) {
        return !c.__N;
      })) return !o || o.call(this, n, l, p);
      var d = r.__c.props !== n;
      return u.forEach(function(c) {
        if (c.__N) {
          var f = c.__[0];
          c.__ = c.__N, c.__N = void 0, f !== c.__[0] && (d = !0);
        }
      }), o && o.call(this, n, l, p) || d;
    };
    W.__f = !0;
    var o = W.shouldComponentUpdate, s = W.componentWillUpdate;
    W.componentWillUpdate = function(n, l, p) {
      if (this.__e) {
        var u = o;
        o = void 0, a(n, l, p), o = u;
      }
      s && s.call(this, n, l, p);
    }, W.shouldComponentUpdate = a;
  }
  return r.__N || r.__;
}
function Qr(i, e) {
  var t = ka(pi++, 3);
  !V.__s && nn(t.__H, e) && (t.__ = i, t.u = e, W.__H.__h.push(t));
}
function Ri(i) {
  return di = 5, Ba(function() {
    return { current: i };
  }, []);
}
function Ba(i, e) {
  var t = ka(pi++, 7);
  return nn(t.__H, e) && (t.__ = i(), t.__H = e, t.__h = i), t.__;
}
function kp(i, e) {
  return di = 8, Ba(function() {
    return i;
  }, e);
}
function Bp() {
  for (var i; i = sn.shift(); ) if (i.__P && i.__H) try {
    i.__H.__h.forEach(Ni), i.__H.__h.forEach(Jr), i.__H.__h = [];
  } catch (e) {
    i.__H.__h = [], V.__e(e, i.__v);
  }
}
V.__b = function(i) {
  W = null, wo && wo(i);
}, V.__ = function(i, e) {
  i && e.__k && e.__k.__m && (i.__m = e.__k.__m), Do && Do(i, e);
}, V.__r = function(i) {
  xo && xo(i), pi = 0;
  var e = (W = i.__c).__H;
  e && (wr === W ? (e.__h = [], W.__h = [], e.__.forEach(function(t) {
    t.__N && (t.__ = t.__N), t.u = t.__N = void 0;
  })) : (e.__h.forEach(Ni), e.__h.forEach(Jr), e.__h = [], pi = 0)), wr = W;
}, V.diffed = function(i) {
  _o && _o(i);
  var e = i.__c;
  e && e.__H && (e.__H.__h.length && (sn.push(e) !== 1 && vo === V.requestAnimationFrame || ((vo = V.requestAnimationFrame) || Ip)(Bp)), e.__H.__.forEach(function(t) {
    t.u && (t.__H = t.u), t.u = void 0;
  })), wr = W = null;
}, V.__c = function(i, e) {
  e.some(function(t) {
    try {
      t.__h.forEach(Ni), t.__h = t.__h.filter(function(r) {
        return !r.__ || Jr(r);
      });
    } catch (r) {
      e.some(function(a) {
        a.__h && (a.__h = []);
      }), e = [], V.__e(r, t.__v);
    }
  }), Po && Po(i, e);
}, V.unmount = function(i) {
  So && So(i);
  var e, t = i.__c;
  t && t.__H && (t.__H.__.forEach(function(r) {
    try {
      Ni(r);
    } catch (a) {
      e = a;
    }
  }), t.__H = void 0, e && V.__e(e, t.__v));
};
var ko = typeof requestAnimationFrame == "function";
function Ip(i) {
  var e, t = function() {
    clearTimeout(r), ko && cancelAnimationFrame(e), setTimeout(i);
  }, r = setTimeout(t, 35);
  ko && (e = requestAnimationFrame(t));
}
function Ni(i) {
  var e = W, t = i.__c;
  typeof t == "function" && (i.__c = void 0, t()), W = e;
}
function Jr(i) {
  var e = W;
  i.__c = i.__(), W = e;
}
function nn(i, e) {
  return !i || i.length !== e.length || e.some(function(t, r) {
    return t !== i[r];
  });
}
function ln(i, e) {
  return typeof e == "function" ? e(i) : e;
}
function Fp(i, e) {
  for (var t in e) i[t] = e[t];
  return i;
}
function Bo(i, e) {
  for (var t in i) if (t !== "__source" && !(t in e)) return !0;
  for (var r in e) if (r !== "__source" && i[r] !== e[r]) return !0;
  return !1;
}
function Io(i, e) {
  this.props = i, this.context = e;
}
(Io.prototype = new ae()).isPureReactComponent = !0, Io.prototype.shouldComponentUpdate = function(i, e) {
  return Bo(this.props, i) || Bo(this.state, e);
};
var Fo = F.__b;
F.__b = function(i) {
  i.type && i.type.__f && i.ref && (i.props.ref = i.ref, i.ref = null), Fo && Fo(i);
};
var Cp = F.__e;
F.__e = function(i, e, t, r) {
  if (i.then) {
    for (var a, o = e; o = o.__; ) if ((a = o.__c) && a.__c) return e.__e == null && (e.__e = t.__e, e.__k = t.__k), a.__c(i, e);
  }
  Cp(i, e, t, r);
};
var Co = F.unmount;
function pn(i, e, t) {
  return i && (i.__c && i.__c.__H && (i.__c.__H.__.forEach(function(r) {
    typeof r.__c == "function" && r.__c();
  }), i.__c.__H = null), (i = Fp({}, i)).__c != null && (i.__c.__P === t && (i.__c.__P = e), i.__c.__e = !0, i.__c = null), i.__k = i.__k && i.__k.map(function(r) {
    return pn(r, e, t);
  })), i;
}
function dn(i, e, t) {
  return i && t && (i.__v = null, i.__k = i.__k && i.__k.map(function(r) {
    return dn(r, e, t);
  }), i.__c && i.__c.__P === e && (i.__e && t.appendChild(i.__e), i.__c.__e = !0, i.__c.__P = t)), i;
}
function xr() {
  this.__u = 0, this.o = null, this.__b = null;
}
function un(i) {
  var e = i.__.__c;
  return e && e.__a && e.__a(i);
}
function _i() {
  this.i = null, this.l = null;
}
F.unmount = function(i) {
  var e = i.__c;
  e && e.__R && e.__R(), e && 32 & i.__u && (i.type = null), Co && Co(i);
}, (xr.prototype = new ae()).__c = function(i, e) {
  var t = e.__c, r = this;
  r.o == null && (r.o = []), r.o.push(t);
  var a = un(r.__v), o = !1, s = function() {
    o || (o = !0, t.__R = null, a ? a(n) : n());
  };
  t.__R = s;
  var n = function() {
    if (!--r.__u) {
      if (r.state.__a) {
        var l = r.state.__a;
        r.__v.__k[0] = dn(l, l.__c.__P, l.__c.__O);
      }
      var p;
      for (r.setState({ __a: r.__b = null }); p = r.o.pop(); ) p.forceUpdate();
    }
  };
  r.__u++ || 32 & e.__u || r.setState({ __a: r.__b = r.__v.__k[0] }), i.then(s, s);
}, xr.prototype.componentWillUnmount = function() {
  this.o = [];
}, xr.prototype.render = function(i, e) {
  if (this.__b) {
    if (this.__v.__k) {
      var t = document.createElement("div"), r = this.__v.__k[0].__c;
      this.__v.__k[0] = pn(this.__b, t, r.__O = r.__P);
    }
    this.__b = null;
  }
  var a = e.__a && h(ke, null, i.fallback);
  return a && (a.__u &= -33), [h(ke, null, e.__a ? null : i.children), a];
};
var To = function(i, e, t) {
  if (++t[1] === t[0] && i.l.delete(e), i.props.revealOrder && (i.props.revealOrder[0] !== "t" || !i.l.size)) for (t = i.i; t; ) {
    for (; t.length > 3; ) t.pop()();
    if (t[1] < t[0]) break;
    i.i = t = t[2];
  }
};
(_i.prototype = new ae()).__a = function(i) {
  var e = this, t = un(e.__v), r = e.l.get(i);
  return r[0]++, function(a) {
    var o = function() {
      e.props.revealOrder ? (r.push(a), To(e, i, r)) : a();
    };
    t ? t(o) : o();
  };
}, _i.prototype.render = function(i) {
  this.i = null, this.l = /* @__PURE__ */ new Map();
  var e = we(i.children);
  i.revealOrder && i.revealOrder[0] === "b" && e.reverse();
  for (var t = e.length; t--; ) this.l.set(e[t], this.i = [1, 0, this.i]);
  return i.children;
}, _i.prototype.componentDidUpdate = _i.prototype.componentDidMount = function() {
  var i = this;
  this.l.forEach(function(e, t) {
    To(i, t, e);
  });
};
var Tp = typeof Symbol < "u" && Symbol.for && Symbol.for("react.element") || 60103, Ap = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, Ep = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Op = /[A-Z0-9]/g, zp = typeof document < "u", Mp = function(i) {
  return (typeof Symbol < "u" && typeof Symbol() == "symbol" ? /fil|che|rad/ : /fil|che|ra/).test(i);
};
function Ao(i, e, t) {
  return e.__k == null && (e.textContent = ""), Sp(i, e), typeof t == "function" && t(), i ? i.__c : null;
}
ae.prototype.isReactComponent = {}, ["componentWillMount", "componentWillReceiveProps", "componentWillUpdate"].forEach(function(i) {
  Object.defineProperty(ae.prototype, i, { configurable: !0, get: function() {
    return this["UNSAFE_" + i];
  }, set: function(e) {
    Object.defineProperty(this, i, { configurable: !0, writable: !0, value: e });
  } });
});
var Eo = F.event;
function Rp() {
}
function Np() {
  return this.cancelBubble;
}
function Up() {
  return this.defaultPrevented;
}
F.event = function(i) {
  return Eo && (i = Eo(i)), i.persist = Rp, i.isPropagationStopped = Np, i.isDefaultPrevented = Up, i.nativeEvent = i;
};
var Lp = { enumerable: !1, configurable: !0, get: function() {
  return this.class;
} }, Oo = F.vnode;
F.vnode = function(i) {
  typeof i.type == "string" && function(e) {
    var t = e.props, r = e.type, a = {}, o = r.indexOf("-") === -1;
    for (var s in t) {
      var n = t[s];
      if (!(s === "value" && "defaultValue" in t && n == null || zp && s === "children" && r === "noscript" || s === "class" || s === "className")) {
        var l = s.toLowerCase();
        s === "defaultValue" && "value" in t && t.value == null ? s = "value" : s === "download" && n === !0 ? n = "" : l === "translate" && n === "no" ? n = !1 : l[0] === "o" && l[1] === "n" ? l === "ondoubleclick" ? s = "ondblclick" : l !== "onchange" || r !== "input" && r !== "textarea" || Mp(t.type) ? l === "onfocus" ? s = "onfocusin" : l === "onblur" ? s = "onfocusout" : Ep.test(s) && (s = l) : l = s = "oninput" : o && Ap.test(s) ? s = s.replace(Op, "-$&").toLowerCase() : n === null && (n = void 0), l === "oninput" && a[s = l] && (s = "oninputCapture"), a[s] = n;
      }
    }
    r == "select" && a.multiple && Array.isArray(a.value) && (a.value = we(t.children).forEach(function(p) {
      p.props.selected = a.value.indexOf(p.props.value) != -1;
    })), r == "select" && a.defaultValue != null && (a.value = we(t.children).forEach(function(p) {
      p.props.selected = a.multiple ? a.defaultValue.indexOf(p.props.value) != -1 : a.defaultValue == p.props.value;
    })), t.class && !t.className ? (a.class = t.class, Object.defineProperty(a, "className", Lp)) : (t.className && !t.class || t.class && t.className) && (a.class = a.className = t.className), e.props = a;
  }(i), i.$$typeof = Tp, Oo && Oo(i);
};
var zo = F.__r;
F.__r = function(i) {
  zo && zo(i), i.__c;
};
var Mo = F.diffed;
F.diffed = function(i) {
  Mo && Mo(i);
  var e = i.props, t = i.__e;
  t != null && i.type === "textarea" && "value" in e && e.value !== t.value && (t.value = e.value == null ? "" : e.value);
};
function hn(i) {
  return typeof i != "object" || i === null || !("nodeType" in i) ? !1 : i.nodeType === Node.ELEMENT_NODE;
}
function $p(i, e) {
  return e === void 0 && (e = document), typeof i == "string" ? e.querySelector(i) : hn(i) ? i : null;
}
function cn(i) {
  for (var e; i && !i.dir; )
    i = i.parentNode;
  return (e = i) == null ? void 0 : e.dir;
}
class fn {
  constructor(e, t) {
    this.uppy = e, this.opts = t ?? {};
  }
  getPluginState() {
    const {
      plugins: e
    } = this.uppy.getState();
    return e?.[this.id] || {};
  }
  setPluginState(e) {
    const {
      plugins: t
    } = this.uppy.getState();
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
    this.opts = {
      ...this.opts,
      ...e
    }, this.setPluginState(void 0), this.i18nInit();
  }
  i18nInit() {
    const e = new Ls([this.defaultLocale, this.uppy.locale, this.opts.locale]);
    this.i18n = e.translate.bind(e), this.i18nArray = e.translateArray.bind(e), this.setPluginState(void 0);
  }
  /**
   * Extendable methods
   * ==================
   * These methods are here to serve as an overview of the extendable methods as well as
   * making them not conditional in use, such as `if (this.afterUpdate)`.
   */
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  addTarget(e) {
    throw new Error("Extend the addTarget method to add your plugin to another plugin's target");
  }
  install() {
  }
  uninstall() {
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  update(e) {
  }
  // Called after every state update, after everything's mounted. Debounced.
  afterUpdate() {
  }
}
function Ro(i, e) {
  if (!{}.hasOwnProperty.call(i, e)) throw new TypeError("attempted to use private field on non-instance");
  return i;
}
var jp = 0;
function Hp(i) {
  return "__private_" + jp++ + "_" + i;
}
function qp(i) {
  let e = null, t;
  return function() {
    for (var r = arguments.length, a = new Array(r), o = 0; o < r; o++)
      a[o] = arguments[o];
    return t = a, e || (e = Promise.resolve().then(() => (e = null, i(...t)))), e;
  };
}
var Ut = /* @__PURE__ */ Hp("updateUI");
class Ge extends fn {
  constructor() {
    super(...arguments), Object.defineProperty(this, Ut, {
      writable: !0,
      value: void 0
    });
  }
  getTargetPlugin(e) {
    let t;
    if (typeof e?.addTarget == "function")
      t = e, t instanceof Ge || console.warn(new Error("The provided plugin is not an instance of UIPlugin. This is an indication of a bug with the way Uppy is bundled.", {
        cause: {
          targetPlugin: t,
          UIPlugin: Ge
        }
      }));
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
    const r = t.id, a = $p(e);
    if (a) {
      this.isTargetDOMEl = !0;
      const n = document.createElement("div");
      return n.classList.add("uppy-Root"), Ro(this, Ut)[Ut] = qp((l) => {
        this.uppy.getPlugin(this.id) && (Ao(this.render(l, n), n), this.afterUpdate());
      }), this.uppy.log(`Installing ${r} to a DOM element '${e}'`), this.opts.replaceTargetContent && (a.innerHTML = ""), Ao(this.render(this.uppy.getState(), n), n), this.el = n, a.appendChild(n), n.dir = this.opts.direction || cn(n) || "ltr", this.onMount(), this.el;
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
    if (this.el != null) {
      var t, r;
      (t = (r = Ro(this, Ut))[Ut]) == null || t.call(r, e);
    }
  }
  unmount() {
    if (this.isTargetDOMEl) {
      var e;
      (e = this.el) == null || e.remove();
    }
    this.onUnmount();
  }
  onMount() {
  }
  onUnmount() {
  }
}
function No(i, e, t, r) {
  return i === e ? i : r === 0 ? e : i + (e - i) * 2 ** (-r / t);
}
const Se = {
  STATE_ERROR: "error",
  STATE_WAITING: "waiting",
  STATE_PREPROCESSING: "preprocessing",
  STATE_UPLOADING: "uploading",
  STATE_POSTPROCESSING: "postprocessing",
  STATE_COMPLETE: "complete"
};
var _r = { exports: {} };
/*!
	Copyright (c) 2018 Jed Watson.
	Licensed under the MIT License (MIT), see
	http://jedwatson.github.io/classnames
*/
var Uo;
function Wp() {
  return Uo || (Uo = 1, function(i) {
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
  }(_r)), _r.exports;
}
var Vp = Wp();
const _e = /* @__PURE__ */ kt(Vp);
function Pr(i) {
  const e = [];
  let t = "indeterminate", r;
  for (const {
    progress: o
  } of Object.values(i)) {
    const {
      preprocess: s,
      postprocess: n
    } = o;
    r == null && (s || n) && ({
      mode: t,
      message: r
    } = s || n), s?.mode === "determinate" && e.push(s.value), n?.mode === "determinate" && e.push(n.value);
  }
  const a = e.reduce((o, s) => o + s / e.length, 0);
  return {
    mode: t,
    message: r,
    value: a
  };
}
function Gp(i) {
  const e = Math.floor(i / 3600) % 24, t = Math.floor(i / 60) % 60, r = Math.floor(i % 60);
  return {
    hours: e,
    minutes: t,
    seconds: r
  };
}
function Xp(i) {
  const e = Gp(i), t = e.hours === 0 ? "" : `${e.hours}h`, r = e.minutes === 0 ? "" : `${e.hours === 0 ? e.minutes : ` ${e.minutes.toString(10).padStart(2, "0")}`}m`, a = e.hours !== 0 ? "" : `${e.minutes === 0 ? e.seconds : ` ${e.seconds.toString(10).padStart(2, "0")}`}s`;
  return `${t}${r}${a}`;
}
const Yp = "·", Lo = () => ` ${Yp} `;
function Kp(i) {
  const {
    newFiles: e,
    isUploadStarted: t,
    recoveredState: r,
    i18n: a,
    uploadState: o,
    isSomeGhost: s,
    startUpload: n
  } = i, l = _e("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--upload", {
    "uppy-c-btn-primary": o === Se.STATE_WAITING
  }, {
    "uppy-StatusBar-actionBtn--disabled": s
  }), p = e && t && !r ? a("uploadXNewFiles", {
    smart_count: e
  }) : a("uploadXFiles", {
    smart_count: e
  });
  return h("button", {
    type: "button",
    className: l,
    "aria-label": a("uploadXFiles", {
      smart_count: e
    }),
    onClick: n,
    disabled: s,
    "data-uppy-super-focusable": !0
  }, p);
}
function Zp(i) {
  const {
    i18n: e,
    uppy: t
  } = i;
  return h("button", {
    type: "button",
    className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--retry",
    "aria-label": e("retryUpload"),
    onClick: () => t.retryAll().catch(() => {
    }),
    "data-uppy-super-focusable": !0,
    "data-cy": "retry"
  }, h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "8",
    height: "10",
    viewBox: "0 0 8 10"
  }, h("path", {
    d: "M4 2.408a2.75 2.75 0 1 0 2.75 2.75.626.626 0 0 1 1.25.018v.023a4 4 0 1 1-4-4.041V.25a.25.25 0 0 1 .389-.208l2.299 1.533a.25.25 0 0 1 0 .416l-2.3 1.533A.25.25 0 0 1 4 3.316v-.908z"
  })), e("retry"));
}
function Qp(i) {
  const {
    i18n: e,
    uppy: t
  } = i;
  return h("button", {
    type: "button",
    className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
    title: e("cancel"),
    "aria-label": e("cancel"),
    onClick: () => t.cancelAll(),
    "data-cy": "cancel",
    "data-uppy-super-focusable": !0
  }, h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, h("g", {
    fill: "none",
    fillRule: "evenodd"
  }, h("circle", {
    fill: "#888",
    cx: "8",
    cy: "8",
    r: "8"
  }), h("path", {
    fill: "#FFF",
    d: "M9.283 8l2.567 2.567-1.283 1.283L8 9.283 5.433 11.85 4.15 10.567 6.717 8 4.15 5.433 5.433 4.15 8 6.717l2.567-2.567 1.283 1.283z"
  }))));
}
function Jp(i) {
  const {
    isAllPaused: e,
    i18n: t,
    isAllComplete: r,
    resumableUploads: a,
    uppy: o
  } = i, s = t(e ? "resume" : "pause");
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
  return h("button", {
    title: s,
    "aria-label": s,
    className: "uppy-u-reset uppy-StatusBar-actionCircleBtn",
    type: "button",
    onClick: n,
    "data-cy": "togglePauseResume",
    "data-uppy-super-focusable": !0
  }, h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "16",
    height: "16",
    viewBox: "0 0 16 16"
  }, h("g", {
    fill: "none",
    fillRule: "evenodd"
  }, h("circle", {
    fill: "#888",
    cx: "8",
    cy: "8",
    r: "8"
  }), h("path", {
    fill: "#FFF",
    d: e ? "M6 4.25L11.5 8 6 11.75z" : "M5 4.5h2v7H5v-7zm4 0h2v7H9v-7z"
  }))));
}
function ed(i) {
  const {
    i18n: e,
    doneButtonHandler: t
  } = i;
  return h("button", {
    type: "button",
    className: "uppy-u-reset uppy-c-btn uppy-StatusBar-actionBtn uppy-StatusBar-actionBtn--done",
    onClick: t,
    "data-uppy-super-focusable": !0
  }, e("done"));
}
function mn() {
  return h("svg", {
    className: "uppy-StatusBar-spinner",
    "aria-hidden": "true",
    focusable: "false",
    width: "14",
    height: "14"
  }, h("path", {
    d: "M13.983 6.547c-.12-2.509-1.64-4.893-3.939-5.936-2.48-1.127-5.488-.656-7.556 1.094C.524 3.367-.398 6.048.162 8.562c.556 2.495 2.46 4.52 4.94 5.183 2.932.784 5.61-.602 7.256-3.015-1.493 1.993-3.745 3.309-6.298 2.868-2.514-.434-4.578-2.349-5.153-4.84a6.226 6.226 0 0 1 2.98-6.778C6.34.586 9.74 1.1 11.373 3.493c.407.596.693 1.282.842 1.988.127.598.073 1.197.161 1.794.078.525.543 1.257 1.15.864.525-.341.49-1.05.456-1.592-.007-.15.02.3 0 0",
    fillRule: "evenodd"
  }));
}
function td(i) {
  const {
    progress: e
  } = i, {
    value: t,
    mode: r,
    message: a
  } = e;
  return h("div", {
    className: "uppy-StatusBar-content"
  }, h(mn, null), r === "determinate" ? `${Math.round(t * 100)}% · ` : "", a);
}
function id(i) {
  const {
    numUploads: e,
    complete: t,
    totalUploadedSize: r,
    totalSize: a,
    totalETA: o,
    i18n: s
  } = i, n = e > 1, l = Le(r);
  return h("div", {
    className: "uppy-StatusBar-statusSecondary"
  }, n && s("filesUploadedOfTotal", {
    complete: t,
    smart_count: e
  }), h("span", {
    className: "uppy-StatusBar-additionalInfo"
  }, n && Lo(), a != null ? s("dataUploadedOfTotal", {
    complete: l,
    total: Le(a)
  }) : s("dataUploadedOfUnknown", {
    complete: l
  }), Lo(), o != null && s("xTimeLeft", {
    time: Xp(o)
  })));
}
function gn(i) {
  const {
    i18n: e,
    complete: t,
    numUploads: r
  } = i;
  return h("div", {
    className: "uppy-StatusBar-statusSecondary"
  }, e("filesUploadedOfTotal", {
    complete: t,
    smart_count: r
  }));
}
function rd(i) {
  const {
    i18n: e,
    newFiles: t,
    startUpload: r
  } = i, a = _e("uppy-u-reset", "uppy-c-btn", "uppy-StatusBar-actionBtn", "uppy-StatusBar-actionBtn--uploadNewlyAdded");
  return h("div", {
    className: "uppy-StatusBar-statusSecondary"
  }, h("div", {
    className: "uppy-StatusBar-statusSecondaryHint"
  }, e("xMoreFilesAdded", {
    smart_count: t
  })), h("button", {
    type: "button",
    className: a,
    "aria-label": e("uploadXFiles", {
      smart_count: t
    }),
    onClick: r
  }, e("upload")));
}
function ad(i) {
  const {
    i18n: e,
    supportsUploadProgress: t,
    totalProgress: r,
    showProgressDetails: a,
    isUploadStarted: o,
    isAllComplete: s,
    isAllPaused: n,
    newFiles: l,
    numUploads: p,
    complete: u,
    totalUploadedSize: d,
    totalSize: c,
    totalETA: f,
    startUpload: m
  } = i, y = l && o;
  if (!o || s)
    return null;
  const b = e(n ? "paused" : "uploading");
  function x() {
    return !n && !y && a ? t ? h(id, {
      numUploads: p,
      complete: u,
      totalUploadedSize: d,
      totalSize: c,
      totalETA: f,
      i18n: e
    }) : h(gn, {
      i18n: e,
      complete: u,
      numUploads: p
    }) : null;
  }
  return h("div", {
    className: "uppy-StatusBar-content",
    "aria-label": b,
    title: b
  }, n ? null : h(mn, null), h("div", {
    className: "uppy-StatusBar-status"
  }, h("div", {
    className: "uppy-StatusBar-statusPrimary"
  }, t && r !== 0 ? `${b}: ${r}%` : b), x(), y ? h(rd, {
    i18n: e,
    newFiles: l,
    startUpload: m
  }) : null));
}
function od(i) {
  const {
    i18n: e
  } = i;
  return h("div", {
    className: "uppy-StatusBar-content",
    role: "status",
    title: e("complete")
  }, h("div", {
    className: "uppy-StatusBar-status"
  }, h("div", {
    className: "uppy-StatusBar-statusPrimary"
  }, h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-StatusBar-statusIndicator uppy-c-icon",
    width: "15",
    height: "11",
    viewBox: "0 0 15 11"
  }, h("path", {
    d: "M.414 5.843L1.627 4.63l3.472 3.472L13.202 0l1.212 1.213L5.1 10.528z"
  })), e("complete"))));
}
function sd(i) {
  const {
    error: e,
    i18n: t,
    complete: r,
    numUploads: a
  } = i;
  function o() {
    const s = `${t("uploadFailed")} 

 ${e}`;
    alert(s);
  }
  return h("div", {
    className: "uppy-StatusBar-content",
    title: t("uploadFailed")
  }, h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-StatusBar-statusIndicator uppy-c-icon",
    width: "11",
    height: "11",
    viewBox: "0 0 11 11"
  }, h("path", {
    d: "M4.278 5.5L0 1.222 1.222 0 5.5 4.278 9.778 0 11 1.222 6.722 5.5 11 9.778 9.778 11 5.5 6.722 1.222 11 0 9.778z"
  })), h("div", {
    className: "uppy-StatusBar-status"
  }, h("div", {
    className: "uppy-StatusBar-statusPrimary"
  }, t("uploadFailed"), h("button", {
    className: "uppy-u-reset uppy-StatusBar-details",
    "aria-label": t("showErrorDetails"),
    "data-microtip-position": "top-right",
    "data-microtip-size": "medium",
    onClick: o,
    type: "button"
  }, "?")), h(gn, {
    i18n: t,
    complete: r,
    numUploads: a
  })));
}
const {
  STATE_ERROR: $o,
  STATE_WAITING: nd,
  STATE_PREPROCESSING: Sr,
  STATE_UPLOADING: Pi,
  STATE_POSTPROCESSING: Dr,
  STATE_COMPLETE: Si
} = Se;
function ld(i) {
  let {
    newFiles: e,
    allowNewUpload: t,
    isUploadInProgress: r,
    isAllPaused: a,
    resumableUploads: o,
    error: s,
    hideUploadButton: n = void 0,
    hidePauseResumeButton: l = !1,
    hideCancelButton: p = !1,
    hideRetryButton: u = !1,
    recoveredState: d,
    uploadState: c,
    totalProgress: f,
    files: m,
    supportsUploadProgress: y,
    hideAfterFinish: b = !1,
    isSomeGhost: x,
    doneButtonHandler: _ = void 0,
    isUploadStarted: B,
    i18n: k,
    startUpload: C,
    uppy: g,
    isAllComplete: S,
    showProgressDetails: P = void 0,
    numUploads: D,
    complete: L,
    totalSize: O,
    totalETA: M,
    totalUploadedSize: A
  } = i;
  function N() {
    switch (c) {
      case Dr:
      case Sr: {
        const Je = Pr(m);
        return Je.mode === "determinate" ? Je.value * 100 : f;
      }
      case $o:
        return null;
      case Pi:
        return y ? f : null;
      default:
        return f;
    }
  }
  function U() {
    switch (c) {
      case Dr:
      case Sr: {
        const {
          mode: Je
        } = Pr(m);
        return Je === "indeterminate";
      }
      case Pi:
        return !y;
      default:
        return !1;
    }
  }
  const Z = N(), fe = Z ?? 100, Fe = !s && e && (!r && !a || d) && t && !n, $e = !p && c !== nd && c !== Si, Ye = o && !l && c === Pi, Ke = s && !S && !u, Ze = _ && c === Si, je = _e("uppy-StatusBar-progress", {
    "is-indeterminate": U()
  }), mt = _e("uppy-StatusBar", `is-${c}`, {
    "has-ghosts": x
  }), Qe = (() => {
    switch (c) {
      case Sr:
      case Dr:
        return h(td, {
          progress: Pr(m)
        });
      case Si:
        return h(od, {
          i18n: k
        });
      case $o:
        return h(sd, {
          error: s,
          i18n: k,
          numUploads: D,
          complete: L
        });
      case Pi:
        return h(ad, {
          i18n: k,
          supportsUploadProgress: y,
          totalProgress: f,
          showProgressDetails: P,
          isUploadStarted: B,
          isAllComplete: S,
          isAllPaused: a,
          newFiles: e,
          numUploads: D,
          complete: L,
          totalUploadedSize: A,
          totalSize: O,
          totalETA: M,
          startUpload: C
        });
      default:
        return null;
    }
  })();
  return !(Fe || Ke || Ye || $e || Ze) && !Qe || c === Si && b ? null : h("div", {
    className: mt
  }, h("div", {
    className: je,
    style: {
      width: `${fe}%`
    },
    role: "progressbar",
    "aria-label": `${fe}%`,
    "aria-valuetext": `${fe}%`,
    "aria-valuemin": 0,
    "aria-valuemax": 100,
    "aria-valuenow": Z
  }), Qe, h("div", {
    className: "uppy-StatusBar-actions"
  }, Fe ? h(Kp, {
    newFiles: e,
    isUploadStarted: B,
    recoveredState: d,
    i18n: k,
    isSomeGhost: x,
    startUpload: C,
    uploadState: c
  }) : null, Ke ? h(Zp, {
    i18n: k,
    uppy: g
  }) : null, Ye ? h(Jp, {
    isAllPaused: a,
    i18n: k,
    isAllComplete: S,
    resumableUploads: o,
    uppy: g
  }) : null, $e ? h(Qp, {
    i18n: k,
    uppy: g
  }) : null, Ze ? h(ed, {
    i18n: k,
    doneButtonHandler: _
  }) : null));
}
const pd = {
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
};
function q(i, e) {
  if (!{}.hasOwnProperty.call(i, e)) throw new TypeError("attempted to use private field on non-instance");
  return i;
}
var dd = 0;
function Bt(i) {
  return "__private_" + dd++ + "_" + i;
}
const ud = {
  version: "4.1.3"
}, hd = 2e3, cd = 2e3;
function fd(i, e, t, r) {
  if (i)
    return Se.STATE_ERROR;
  if (e)
    return Se.STATE_COMPLETE;
  if (t)
    return Se.STATE_WAITING;
  let a = Se.STATE_WAITING;
  const o = Object.keys(r);
  for (let s = 0; s < o.length; s++) {
    const {
      progress: n
    } = r[o[s]];
    if (n.uploadStarted && !n.uploadComplete)
      return Se.STATE_UPLOADING;
    n.preprocess && (a = Se.STATE_PREPROCESSING), n.postprocess && a !== Se.STATE_PREPROCESSING && (a = Se.STATE_POSTPROCESSING);
  }
  return a;
}
const md = {
  hideUploadButton: !1,
  hideRetryButton: !1,
  hidePauseResumeButton: !1,
  hideCancelButton: !1,
  showProgressDetails: !1,
  hideAfterFinish: !0,
  doneButtonHandler: null
};
var ce = /* @__PURE__ */ Bt("lastUpdateTime"), ye = /* @__PURE__ */ Bt("previousUploadedBytes"), Me = /* @__PURE__ */ Bt("previousSpeed"), pe = /* @__PURE__ */ Bt("previousETA"), kr = /* @__PURE__ */ Bt("computeSmoothETA"), Lt = /* @__PURE__ */ Bt("onUploadStart");
class yn extends Ge {
  constructor(e, t) {
    super(e, {
      ...md,
      ...t
    }), Object.defineProperty(this, kr, {
      value: gd
    }), Object.defineProperty(this, ce, {
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, ye, {
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, Me, {
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, pe, {
      writable: !0,
      value: void 0
    }), this.startUpload = () => this.uppy.upload().catch(() => {
    }), Object.defineProperty(this, Lt, {
      writable: !0,
      value: () => {
        const {
          recoveredState: r
        } = this.uppy.getState();
        if (q(this, Me)[Me] = null, q(this, pe)[pe] = null, r) {
          q(this, ye)[ye] = Object.values(r.files).reduce((a, o) => {
            let {
              progress: s
            } = o;
            return a + s.bytesUploaded;
          }, 0), this.uppy.emit("restore-confirmed");
          return;
        }
        q(this, ce)[ce] = performance.now(), q(this, ye)[ye] = 0;
      }
    }), this.id = this.opts.id || "StatusBar", this.title = "StatusBar", this.type = "progressindicator", this.defaultLocale = pd, this.i18nInit(), this.render = this.render.bind(this), this.install = this.install.bind(this);
  }
  render(e) {
    const {
      capabilities: t,
      files: r,
      allowNewUpload: a,
      totalProgress: o,
      error: s,
      recoveredState: n
    } = e, {
      newFiles: l,
      startedFiles: p,
      completeFiles: u,
      isUploadStarted: d,
      isAllComplete: c,
      isAllPaused: f,
      isUploadInProgress: m,
      isSomeGhost: y
    } = this.uppy.getObjectOfFilesPerState(), b = n ? Object.values(r) : l, x = !!t.resumableUploads, _ = t.uploadProgress !== !1;
    let B = null, k = 0;
    p.every((g) => g.progress.bytesTotal != null && g.progress.bytesTotal !== 0) ? (B = 0, p.forEach((g) => {
      B += g.progress.bytesTotal || 0, k += g.progress.bytesUploaded || 0;
    })) : p.forEach((g) => {
      k += g.progress.bytesUploaded || 0;
    });
    const C = q(this, kr)[kr]({
      uploaded: k,
      total: B
    });
    return ld({
      error: s,
      uploadState: fd(s, c, n, e.files || {}),
      allowNewUpload: a,
      totalProgress: o,
      totalSize: B,
      totalUploadedSize: k,
      isAllComplete: !1,
      isAllPaused: f,
      isUploadStarted: d,
      isUploadInProgress: m,
      isSomeGhost: y,
      recoveredState: n,
      complete: u.length,
      newFiles: b.length,
      numUploads: p.length,
      totalETA: C,
      files: r,
      i18n: this.i18n,
      uppy: this.uppy,
      startUpload: this.startUpload,
      doneButtonHandler: this.opts.doneButtonHandler,
      resumableUploads: x,
      supportsUploadProgress: _,
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
    cn(e) || (e.dir = "ltr");
  }
  install() {
    const {
      target: e
    } = this.opts;
    e && this.mount(e, this), this.uppy.on("upload", q(this, Lt)[Lt]), q(this, ce)[ce] = performance.now(), q(this, ye)[ye] = this.uppy.getFiles().reduce((t, r) => t + r.progress.bytesUploaded, 0);
  }
  uninstall() {
    this.unmount(), this.uppy.off("upload", q(this, Lt)[Lt]);
  }
}
function gd(i) {
  var e, t;
  if (i.total == null || i.total === 0)
    return null;
  const r = i.total - i.uploaded;
  if (r <= 0)
    return null;
  (t = (e = q(this, ce))[ce]) != null || (e[ce] = performance.now());
  const a = performance.now() - q(this, ce)[ce];
  if (a === 0) {
    var o;
    return Math.round(((o = q(this, pe)[pe]) != null ? o : 0) / 100) / 10;
  }
  const s = i.uploaded - q(this, ye)[ye];
  if (q(this, ye)[ye] = i.uploaded, s <= 0) {
    var n;
    return Math.round(((n = q(this, pe)[pe]) != null ? n : 0) / 100) / 10;
  }
  const l = s / a, p = q(this, Me)[Me] == null ? l : No(l, q(this, Me)[Me], hd, a);
  q(this, Me)[Me] = p;
  const u = r / p, d = Math.max(q(this, pe)[pe] - a, 0), c = q(this, pe)[pe] == null ? u : No(u, d, cd, a);
  return q(this, pe)[pe] = c, q(this, ce)[ce] = performance.now(), Math.round(c / 100) / 10;
}
yn.VERSION = ud.version;
const jo = 300;
class yd extends ae {
  constructor() {
    super(...arguments), this.ref = vp();
  }
  componentWillEnter(e) {
    this.ref.current.style.opacity = "1", this.ref.current.style.transform = "none", setTimeout(e, jo);
  }
  componentWillLeave(e) {
    this.ref.current.style.opacity = "0", this.ref.current.style.transform = "translateY(350%)", setTimeout(e, jo);
  }
  render() {
    const {
      children: e
    } = this.props;
    return h("div", {
      className: "uppy-Informer-animated",
      ref: this.ref
    }, e);
  }
}
function bd(i, e) {
  return Object.assign(i, e);
}
function vd(i, e) {
  var t;
  return (t = i?.key) != null ? t : e;
}
function wd(i, e) {
  const t = i._ptgLinkedRefs || (i._ptgLinkedRefs = {});
  return t[e] || (t[e] = (r) => {
    i.refs[e] = r;
  });
}
function $t(i) {
  const e = {};
  for (let t = 0; t < i.length; t++)
    if (i[t] != null) {
      const r = vd(i[t], t.toString(36));
      e[r] = i[t];
    }
  return e;
}
function xd(i, e) {
  i = i || {}, e = e || {};
  const t = (s) => e.hasOwnProperty(s) ? e[s] : i[s], r = {};
  let a = [];
  for (const s in i)
    e.hasOwnProperty(s) ? a.length && (r[s] = a, a = []) : a.push(s);
  const o = {};
  for (const s in e) {
    if (r.hasOwnProperty(s))
      for (let n = 0; n < r[s].length; n++) {
        const l = r[s][n];
        o[r[s][n]] = t(l);
      }
    o[s] = t(s);
  }
  for (let s = 0; s < a.length; s++)
    o[a[s]] = t(a[s]);
  return o;
}
const _d = (i) => i;
class bn extends ae {
  constructor(e, t) {
    super(e, t), this.refs = {}, this.state = {
      children: $t(we(we(this.props.children)) || [])
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
    const t = $t(we(e.children) || []), r = this.state.children;
    this.setState((o) => ({
      children: xd(o.children, t)
    }));
    let a;
    for (a in t)
      if (t.hasOwnProperty(a)) {
        const o = r && r.hasOwnProperty(a);
        t[a] && o && this.currentlyTransitioningKeys[a] ? (this.keysToEnter.push(a), this.keysToAbortLeave.push(a)) : t[a] && !o && !this.currentlyTransitioningKeys[a] && this.keysToEnter.push(a);
      }
    for (a in r)
      if (r.hasOwnProperty(a)) {
        const o = t && t.hasOwnProperty(a);
        r[a] && !o && !this.currentlyTransitioningKeys[a] && this.keysToLeave.push(a);
      }
  }
  componentDidUpdate() {
    const {
      keysToEnter: e
    } = this;
    this.keysToEnter = [], e.forEach(this.performEnter);
    const {
      keysToLeave: t
    } = this;
    this.keysToLeave = [], t.forEach(this.performLeave);
  }
  _finishAbort(e) {
    const t = this.keysToAbortLeave.indexOf(e);
    t !== -1 && this.keysToAbortLeave.splice(t, 1);
  }
  performAppear(e) {
    this.currentlyTransitioningKeys[e] = !0;
    const t = this.refs[e];
    t != null && t.componentWillAppear ? t.componentWillAppear(this._handleDoneAppearing.bind(this, e)) : this._handleDoneAppearing(e);
  }
  _handleDoneAppearing(e) {
    const t = this.refs[e];
    t != null && t.componentDidAppear && t.componentDidAppear(), delete this.currentlyTransitioningKeys[e], this._finishAbort(e);
    const r = $t(we(this.props.children) || []);
    (!r || !r.hasOwnProperty(e)) && this.performLeave(e);
  }
  performEnter(e) {
    this.currentlyTransitioningKeys[e] = !0;
    const t = this.refs[e];
    t != null && t.componentWillEnter ? t.componentWillEnter(this._handleDoneEntering.bind(this, e)) : this._handleDoneEntering(e);
  }
  _handleDoneEntering(e) {
    const t = this.refs[e];
    t != null && t.componentDidEnter && t.componentDidEnter(), delete this.currentlyTransitioningKeys[e], this._finishAbort(e);
    const r = $t(we(this.props.children) || []);
    (!r || !r.hasOwnProperty(e)) && this.performLeave(e);
  }
  performLeave(e) {
    if (this.keysToAbortLeave.indexOf(e) !== -1)
      return;
    this.currentlyTransitioningKeys[e] = !0;
    const r = this.refs[e];
    r != null && r.componentWillLeave ? r.componentWillLeave(this._handleDoneLeaving.bind(this, e)) : this._handleDoneLeaving(e);
  }
  _handleDoneLeaving(e) {
    if (this.keysToAbortLeave.indexOf(e) !== -1)
      return;
    const r = this.refs[e];
    r != null && r.componentDidLeave && r.componentDidLeave(), delete this.currentlyTransitioningKeys[e];
    const a = $t(we(this.props.children) || []);
    if (a && a.hasOwnProperty(e))
      this.performEnter(e);
    else {
      const o = bd({}, this.state.children);
      delete o[e], this.setState({
        children: o
      });
    }
  }
  render(e, t) {
    let {
      childFactory: r,
      transitionLeave: a,
      transitionName: o,
      transitionAppear: s,
      transitionEnter: n,
      transitionLeaveTimeout: l,
      transitionEnterTimeout: p,
      transitionAppearTimeout: u,
      component: d,
      ...c
    } = e, {
      children: f
    } = t;
    const m = Object.entries(f).map((y) => {
      let [b, x] = y;
      if (!x) return;
      const _ = wd(this, b);
      return on(r(x), {
        ref: _,
        key: b
      });
    }).filter(Boolean);
    return h(d, c, m);
  }
}
bn.defaultProps = {
  component: "span",
  childFactory: _d
};
const Pd = {
  version: "4.2.1"
};
class vn extends Ge {
  constructor(e, t) {
    super(e, t), this.render = (r) => h("div", {
      className: "uppy uppy-Informer"
    }, h(bn, null, r.info.map((a) => h(yd, {
      key: a.message
    }, h("p", {
      role: "alert"
    }, a.message, " ", a.details && h("span", {
      "aria-label": a.details,
      "data-microtip-position": "top-left",
      "data-microtip-size": "medium",
      role: "tooltip",
      onClick: () => (
        // eslint-disable-next-line no-alert
        alert(`${a.message} 

 ${a.details}`)
      )
    }, "?")))))), this.type = "progressindicator", this.id = this.opts.id || "Informer", this.title = "Informer";
  }
  install() {
    const {
      target: e
    } = this.opts;
    e && this.mount(e, this);
  }
}
vn.VERSION = Pd.version;
const Sd = /^data:([^/]+\/[^,;]+(?:[^,]*?))(;base64)?,([\s\S]*)$/;
function Dd(i, e, t) {
  var r, a;
  const o = Sd.exec(i), s = (r = (a = e.mimeType) != null ? a : o?.[1]) != null ? r : "plain/text";
  let n;
  if (o?.[2] != null) {
    const l = atob(decodeURIComponent(o[3])), p = new Uint8Array(l.length);
    for (let u = 0; u < l.length; u++)
      p[u] = l.charCodeAt(u);
    n = [p];
  } else o?.[3] != null && (n = [decodeURIComponent(o[3])]);
  return new Blob(n, {
    type: s
  });
}
function Ho(i) {
  return i.startsWith("blob:");
}
function qo(i) {
  return i ? /^[^/]+\/(jpe?g|gif|png|svg|svg\+xml|bmp|webp|avif)$/.test(i) : !1;
}
function z(i, e, t) {
  return e in i ? Object.defineProperty(i, e, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : i[e] = t, i;
}
var wn = typeof self < "u" ? self : global;
const ui = typeof navigator < "u", kd = ui && typeof HTMLImageElement > "u", Wo = !(typeof global > "u" || typeof process > "u" || !process.versions || !process.versions.node), xn = wn.Buffer, _n = !!xn, Bd = (i) => i !== void 0;
function Pn(i) {
  return i === void 0 || (i instanceof Map ? i.size === 0 : Object.values(i).filter(Bd).length === 0);
}
function K(i) {
  let e = new Error(i);
  throw delete e.stack, e;
}
function Vo(i) {
  let e = function(t) {
    let r = 0;
    return t.ifd0.enabled && (r += 1024), t.exif.enabled && (r += 2048), t.makerNote && (r += 2048), t.userComment && (r += 1024), t.gps.enabled && (r += 512), t.interop.enabled && (r += 100), t.ifd1.enabled && (r += 1024), r + 2048;
  }(i);
  return i.jfif.enabled && (e += 50), i.xmp.enabled && (e += 2e4), i.iptc.enabled && (e += 14e3), i.icc.enabled && (e += 6e3), e;
}
const Br = (i) => String.fromCharCode.apply(null, i), Go = typeof TextDecoder < "u" ? new TextDecoder("utf-8") : void 0;
class xe {
  static from(e, t) {
    return e instanceof this && e.le === t ? e : new xe(e, void 0, void 0, t);
  }
  constructor(e, t = 0, r, a) {
    if (typeof a == "boolean" && (this.le = a), Array.isArray(e) && (e = new Uint8Array(e)), e === 0) this.byteOffset = 0, this.byteLength = 0;
    else if (e instanceof ArrayBuffer) {
      r === void 0 && (r = e.byteLength - t);
      let o = new DataView(e, t, r);
      this._swapDataView(o);
    } else if (e instanceof Uint8Array || e instanceof DataView || e instanceof xe) {
      r === void 0 && (r = e.byteLength - t), (t += e.byteOffset) + r > e.byteOffset + e.byteLength && K("Creating view outside of available memory in ArrayBuffer");
      let o = new DataView(e.buffer, t, r);
      this._swapDataView(o);
    } else if (typeof e == "number") {
      let o = new DataView(new ArrayBuffer(e));
      this._swapDataView(o);
    } else K("Invalid input argument for BufferView: " + e);
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
  set(e, t, r = xe) {
    return e instanceof DataView || e instanceof xe ? e = new Uint8Array(e.buffer, e.byteOffset, e.byteLength) : e instanceof ArrayBuffer && (e = new Uint8Array(e)), e instanceof Uint8Array || K("BufferView.set(): Invalid data argument."), this.toUint8().set(e, t), new r(this, t, e.byteLength);
  }
  subarray(e, t) {
    return t = t || this._lengthToEnd(e), new xe(this, e, t);
  }
  toUint8() {
    return new Uint8Array(this.buffer, this.byteOffset, this.byteLength);
  }
  getUint8Array(e, t) {
    return new Uint8Array(this.buffer, this.byteOffset + e, t);
  }
  getString(e = 0, t = this.byteLength) {
    return a = this.getUint8Array(e, t), Go ? Go.decode(a) : _n ? Buffer.from(a).toString("utf8") : decodeURIComponent(escape(Br(a)));
    var a;
  }
  getLatin1String(e = 0, t = this.byteLength) {
    let r = this.getUint8Array(e, t);
    return Br(r);
  }
  getUnicodeString(e = 0, t = this.byteLength) {
    const r = [];
    for (let a = 0; a < t && e + a < this.byteLength; a += 2) r.push(this.getUint16(e + a));
    return Br(r);
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
function ea(i, e) {
  K(`${i} '${e}' was not loaded, try using full build of exifr.`);
}
class Ia extends Map {
  constructor(e) {
    super(), this.kind = e;
  }
  get(e, t) {
    return this.has(e) || ea(this.kind, e), t && (e in t || function(r, a) {
      K(`Unknown ${r} '${a}'.`);
    }(this.kind, e), t[e].enabled || ea(this.kind, e)), super.get(e);
  }
  keyList() {
    return Array.from(this.keys());
  }
}
var Sn = new Ia("file parser"), be = new Ia("segment parser"), Fa = new Ia("file reader");
let Id = wn.fetch;
function Xo(i, e) {
  return (t = i).startsWith("data:") || t.length > 1e4 ? ia(i, e, "base64") : Wo && i.includes("://") ? ta(i, e, "url", Yo) : Wo ? ia(i, e, "fs") : ui ? ta(i, e, "url", Yo) : void K("Invalid input argument");
  var t;
}
async function ta(i, e, t, r) {
  return Fa.has(t) ? ia(i, e, t) : r ? async function(a, o) {
    let s = await o(a);
    return new xe(s);
  }(i, r) : void K(`Parser ${t} is not loaded`);
}
async function ia(i, e, t) {
  let r = new (Fa.get(t))(i, e);
  return await r.read(), r;
}
const Yo = (i) => Id(i).then((e) => e.arrayBuffer()), ra = (i) => new Promise((e, t) => {
  let r = new FileReader();
  r.onloadend = () => e(r.result || new ArrayBuffer()), r.onerror = t, r.readAsArrayBuffer(i);
}), Ca = /* @__PURE__ */ new Map(), Fd = /* @__PURE__ */ new Map(), Cd = /* @__PURE__ */ new Map(), Di = ["chunked", "firstChunkSize", "firstChunkSizeNode", "firstChunkSizeBrowser", "chunkSize", "chunkLimit"], Dn = ["jfif", "xmp", "icc", "iptc", "ihdr"], aa = ["tiff", ...Dn], X = ["ifd0", "ifd1", "exif", "gps", "interop"], ki = [...aa, ...X], Bi = ["makerNote", "userComment"], kn = ["translateKeys", "translateValues", "reviveValues", "multiSegment"], Ii = [...kn, "sanitize", "mergeOutput", "silentErrors"];
class Bn {
  get translate() {
    return this.translateKeys || this.translateValues || this.reviveValues;
  }
}
class jt extends Bn {
  get needed() {
    return this.enabled || this.deps.size > 0;
  }
  constructor(e, t, r, a) {
    if (super(), z(this, "enabled", !1), z(this, "skip", /* @__PURE__ */ new Set()), z(this, "pick", /* @__PURE__ */ new Set()), z(this, "deps", /* @__PURE__ */ new Set()), z(this, "translateKeys", !1), z(this, "translateValues", !1), z(this, "reviveValues", !1), this.key = e, this.enabled = t, this.parse = this.enabled, this.applyInheritables(a), this.canBeFiltered = X.includes(e), this.canBeFiltered && (this.dict = Ca.get(e)), r !== void 0) if (Array.isArray(r)) this.parse = this.enabled = !0, this.canBeFiltered && r.length > 0 && this.translateTagSet(r, this.pick);
    else if (typeof r == "object") {
      if (this.enabled = !0, this.parse = r.parse !== !1, this.canBeFiltered) {
        let { pick: o, skip: s } = r;
        o && o.length > 0 && this.translateTagSet(o, this.pick), s && s.length > 0 && this.translateTagSet(s, this.skip);
      }
      this.applyInheritables(r);
    } else r === !0 || r === !1 ? this.parse = this.enabled = r : K(`Invalid options argument: ${r}`);
  }
  applyInheritables(e) {
    let t, r;
    for (t of kn) r = e[t], r !== void 0 && (this[t] = r);
  }
  translateTagSet(e, t) {
    if (this.dict) {
      let r, a, { tagKeys: o, tagValues: s } = this.dict;
      for (r of e) typeof r == "string" ? (a = s.indexOf(r), a === -1 && (a = o.indexOf(Number(r))), a !== -1 && t.add(Number(o[a]))) : t.add(r);
    } else for (let r of e) t.add(r);
  }
  finalizeFilters() {
    !this.enabled && this.deps.size > 0 ? (this.enabled = !0, ji(this.pick, this.deps)) : this.enabled && this.pick.size > 0 && ji(this.pick, this.deps);
  }
}
var ie = { jfif: !1, tiff: !0, xmp: !1, icc: !1, iptc: !1, ifd0: !0, ifd1: !1, exif: !0, gps: !0, interop: !1, ihdr: void 0, makerNote: !1, userComment: !1, multiSegment: !1, skip: [], pick: [], translateKeys: !0, translateValues: !0, reviveValues: !0, sanitize: !0, mergeOutput: !0, silentErrors: !0, chunked: !0, firstChunkSize: void 0, firstChunkSizeNode: 512, firstChunkSizeBrowser: 65536, chunkSize: 65536, chunkLimit: 5 }, Ko = /* @__PURE__ */ new Map();
class Ta extends Bn {
  static useCached(e) {
    let t = Ko.get(e);
    return t !== void 0 || (t = new this(e), Ko.set(e, t)), t;
  }
  constructor(e) {
    super(), e === !0 ? this.setupFromTrue() : e === void 0 ? this.setupFromUndefined() : Array.isArray(e) ? this.setupFromArray(e) : typeof e == "object" ? this.setupFromObject(e) : K(`Invalid options argument ${e}`), this.firstChunkSize === void 0 && (this.firstChunkSize = ui ? this.firstChunkSizeBrowser : this.firstChunkSizeNode), this.mergeOutput && (this.ifd1.enabled = !1), this.filterNestedSegmentTags(), this.traverseTiffDependencyTree(), this.checkLoadedPlugins();
  }
  setupFromUndefined() {
    let e;
    for (e of Di) this[e] = ie[e];
    for (e of Ii) this[e] = ie[e];
    for (e of Bi) this[e] = ie[e];
    for (e of ki) this[e] = new jt(e, ie[e], void 0, this);
  }
  setupFromTrue() {
    let e;
    for (e of Di) this[e] = ie[e];
    for (e of Ii) this[e] = ie[e];
    for (e of Bi) this[e] = !0;
    for (e of ki) this[e] = new jt(e, !0, void 0, this);
  }
  setupFromArray(e) {
    let t;
    for (t of Di) this[t] = ie[t];
    for (t of Ii) this[t] = ie[t];
    for (t of Bi) this[t] = ie[t];
    for (t of ki) this[t] = new jt(t, !1, void 0, this);
    this.setupGlobalFilters(e, void 0, X);
  }
  setupFromObject(e) {
    let t;
    for (t of (X.ifd0 = X.ifd0 || X.image, X.ifd1 = X.ifd1 || X.thumbnail, Object.assign(this, e), Di)) this[t] = Ir(e[t], ie[t]);
    for (t of Ii) this[t] = Ir(e[t], ie[t]);
    for (t of Bi) this[t] = Ir(e[t], ie[t]);
    for (t of aa) this[t] = new jt(t, ie[t], e[t], this);
    for (t of X) this[t] = new jt(t, ie[t], e[t], this.tiff);
    this.setupGlobalFilters(e.pick, e.skip, X, ki), e.tiff === !0 ? this.batchEnableWithBool(X, !0) : e.tiff === !1 ? this.batchEnableWithUserValue(X, e) : Array.isArray(e.tiff) ? this.setupGlobalFilters(e.tiff, void 0, X) : typeof e.tiff == "object" && this.setupGlobalFilters(e.tiff.pick, e.tiff.skip, X);
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
      let o = Zo(e, r);
      for (let [s, n] of o) ji(this[s].pick, n), this[s].enabled = !0;
    } else if (t && t.length) {
      let o = Zo(t, r);
      for (let [s, n] of o) ji(this[s].skip, n);
    }
  }
  filterNestedSegmentTags() {
    let { ifd0: e, exif: t, xmp: r, iptc: a, icc: o } = this;
    this.makerNote ? t.deps.add(37500) : t.skip.add(37500), this.userComment ? t.deps.add(37510) : t.skip.add(37510), r.enabled || e.skip.add(700), a.enabled || e.skip.add(33723), o.enabled || e.skip.add(34675);
  }
  traverseTiffDependencyTree() {
    let { ifd0: e, exif: t, gps: r, interop: a } = this;
    a.needed && (t.deps.add(40965), e.deps.add(40965)), t.needed && e.deps.add(34665), r.needed && e.deps.add(34853), this.tiff.enabled = X.some((o) => this[o].enabled === !0) || this.makerNote || this.userComment;
    for (let o of X) this[o].finalizeFilters();
  }
  get onlyTiff() {
    return !Dn.map((e) => this[e].enabled).some((e) => e === !0) && this.tiff.enabled;
  }
  checkLoadedPlugins() {
    for (let e of aa) this[e].enabled && !be.has(e) && ea("segment parser", e);
  }
}
function Zo(i, e) {
  let t, r, a, o, s = [];
  for (a of e) {
    for (o of (t = Ca.get(a), r = [], t)) (i.includes(o[0]) || i.includes(o[1])) && r.push(o[0]);
    r.length && s.push([a, r]);
  }
  return s;
}
function Ir(i, e) {
  return i !== void 0 ? i : e !== void 0 ? e : void 0;
}
function ji(i, e) {
  for (let t of e) i.add(t);
}
z(Ta, "default", ie);
class Td {
  constructor(e) {
    z(this, "parsers", {}), z(this, "output", {}), z(this, "errors", []), z(this, "pushToErrors", (t) => this.errors.push(t)), this.options = Ta.useCached(e);
  }
  async read(e) {
    this.file = await function(t, r) {
      return typeof t == "string" ? Xo(t, r) : ui && !kd && t instanceof HTMLImageElement ? Xo(t.src, r) : t instanceof Uint8Array || t instanceof ArrayBuffer || t instanceof DataView ? new xe(t) : ui && t instanceof Blob ? ta(t, r, "blob", ra) : void K("Invalid input argument");
    }(e, this.options);
  }
  setup() {
    if (this.fileParser) return;
    let { file: e } = this, t = e.getUint16(0);
    for (let [r, a] of Sn) if (a.canHandle(e, t)) return this.fileParser = new a(this.options, this.file, this.parsers), e[r] = !0;
    this.file.close && this.file.close(), K("Unknown file format");
  }
  async parse() {
    let { output: e, errors: t } = this;
    return this.setup(), this.options.silentErrors ? (await this.executeParsers().catch(this.pushToErrors), t.push(...this.fileParser.errors)) : await this.executeParsers(), this.file.close && this.file.close(), this.options.silentErrors && t.length > 0 && (e.errors = t), Pn(r = e) ? void 0 : r;
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
    let { options: e, file: t } = this, r = be.get("tiff", e);
    var a;
    if (t.tiff ? a = { start: 0, type: "tiff" } : t.jpeg && (a = await this.fileParser.getOrFindSegment("tiff")), a === void 0) return;
    let o = await this.fileParser.ensureSegmentChunk(a), s = this.parsers.tiff = new r(o, e, t), n = await s.extractThumbnail();
    return t.close && t.close(), n;
  }
}
class vt {
  static findPosition(e, t) {
    let r = e.getUint16(t + 2) + 2, a = typeof this.headerLength == "function" ? this.headerLength(e, t, r) : this.headerLength, o = t + a, s = r - a;
    return { offset: t, length: r, headerLength: a, start: o, size: s, end: o + s };
  }
  static parse(e, t = {}) {
    return new this(e, new Ta({ [this.type]: t }), e).parse();
  }
  normalizeInput(e) {
    return e instanceof xe ? e : new xe(e);
  }
  constructor(e, t = {}, r) {
    z(this, "errors", []), z(this, "raw", /* @__PURE__ */ new Map()), z(this, "handleError", (a) => {
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
    let r = Cd.get(t), a = Fd.get(t), o = Ca.get(t), s = this.options[t], n = s.reviveValues && !!r, l = s.translateValues && !!a, p = s.translateKeys && !!o, u = {};
    for (let [d, c] of e) n && r.has(d) ? c = r.get(d)(c) : l && a.has(d) && (c = this.translateValue(c, a.get(d))), p && o.has(d) && (d = o.get(d) || d), u[d] = c;
    return u;
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
z(vt, "headerLength", 4), z(vt, "type", void 0), z(vt, "multiSegment", !1), z(vt, "canHandle", () => !1);
function Ad(i) {
  return i === 192 || i === 194 || i === 196 || i === 219 || i === 221 || i === 218 || i === 254;
}
function Ed(i) {
  return i >= 224 && i <= 239;
}
function Od(i, e, t) {
  for (let [r, a] of be) if (a.canHandle(i, e, t)) return r;
}
class Qo extends class {
  constructor(e, t, r) {
    z(this, "errors", []), z(this, "ensureSegmentChunk", async (a) => {
      let o = a.start, s = a.size || 65536;
      if (this.file.chunked) if (this.file.available(o, s)) a.chunk = this.file.subarray(o, s);
      else try {
        a.chunk = await this.file.readChunk(o, s);
      } catch (n) {
        K(`Couldn't read segment: ${JSON.stringify(a)}. ${n.message}`);
      }
      else this.file.byteLength > o + s ? a.chunk = this.file.subarray(o, s) : a.size === void 0 ? a.chunk = this.file.subarray(o) : K("Segment unreachable: " + JSON.stringify(a));
      return a.chunk;
    }), this.extendOptions && this.extendOptions(e), this.options = e, this.file = t, this.parsers = r;
  }
  injectSegment(e, t) {
    this.options[e].enabled && this.createParser(e, t);
  }
  createParser(e, t) {
    let r = new (be.get(e))(t, this.options, this.file);
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
    super(...e), z(this, "appSegments", []), z(this, "jpegSegments", []), z(this, "unknownSegments", []);
  }
  static canHandle(e, t) {
    return t === 65496;
  }
  async parse() {
    await this.findAppSegments(), await this.readSegments(this.appSegments), this.mergeMultiSegments(), this.createParsers(this.mergedAppSegments || this.appSegments);
  }
  setupSegmentFinderArgs(e) {
    e === !0 ? (this.findAll = !0, this.wanted = new Set(be.keyList())) : (e = e === void 0 ? be.keyList().filter((t) => this.options[t].enabled) : e.filter((t) => this.options[t].enabled && be.has(t)), this.findAll = !1, this.remaining = new Set(e), this.wanted = new Set(e)), this.unfinishedMultiSegment = !1;
  }
  async findAppSegments(e = 0, t) {
    this.setupSegmentFinderArgs(t);
    let { file: r, findAll: a, wanted: o, remaining: s } = this;
    if (!a && this.file.chunked && (a = Array.from(o).some((n) => {
      let l = be.get(n), p = this.options[n];
      return l.multiSegment && p.multiSegment;
    }), a && await this.file.readWhole()), e = this.findAppSegmentsInRange(e, r.byteLength), !this.options.onlyTiff && r.chunked) {
      let n = !1;
      for (; s.size > 0 && !n && (r.canReadNextChunk || this.unfinishedMultiSegment); ) {
        let { nextChunkOffset: l } = r, p = this.appSegments.some((u) => !this.file.available(u.offset || u.start, u.length || u.size));
        if (n = e > l && !p ? !await r.readNextChunk(e) : !await r.readNextChunk(l), (e = this.findAppSegmentsInRange(e, r.byteLength)) === void 0) return;
      }
    }
  }
  findAppSegmentsInRange(e, t) {
    t -= 2;
    let r, a, o, s, n, l, { file: p, findAll: u, wanted: d, remaining: c, options: f } = this;
    for (; e < t; e++) if (p.getUint8(e) === 255) {
      if (r = p.getUint8(e + 1), Ed(r)) {
        if (a = p.getUint16(e + 2), o = Od(p, e, a), o && d.has(o) && (s = be.get(o), n = s.findPosition(p, e), l = f[o], n.type = o, this.appSegments.push(n), !u && (s.multiSegment && l.multiSegment ? (this.unfinishedMultiSegment = n.chunkNumber < n.chunkCount, this.unfinishedMultiSegment || c.delete(o)) : c.delete(o), c.size === 0))) break;
        f.recordUnknownSegments && (n = vt.findPosition(p, e), n.marker = r, this.unknownSegments.push(n)), e += a + 1;
      } else if (Ad(r)) {
        if (a = p.getUint16(e + 2), r === 218 && f.stopAfterSos !== !1) return;
        f.recordJpegSegments && this.jpegSegments.push({ offset: e, length: a, marker: r }), e += a + 1;
      }
    }
    return e;
  }
  mergeMultiSegments() {
    if (!this.appSegments.some((t) => t.multiSegment)) return;
    let e = function(t, r) {
      let a, o, s, n = /* @__PURE__ */ new Map();
      for (let l = 0; l < t.length; l++) a = t[l], o = a[r], n.has(o) ? s = n.get(o) : n.set(o, s = []), s.push(a);
      return Array.from(n);
    }(this.appSegments, "type");
    this.mergedAppSegments = e.map(([t, r]) => {
      let a = be.get(t, this.options);
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
z(Qo, "type", "jpeg"), Sn.set("jpeg", Qo);
const zd = [void 0, 1, 1, 2, 4, 8, 1, 1, 2, 4, 8, 4, 8, 4];
class Md extends vt {
  parseHeader() {
    var e = this.chunk.getUint16();
    e === 18761 ? this.le = !0 : e === 19789 && (this.le = !1), this.chunk.le = this.le, this.headerParsed = !0;
  }
  parseTags(e, t, r = /* @__PURE__ */ new Map()) {
    let { pick: a, skip: o } = this.options[t];
    a = new Set(a);
    let s = a.size > 0, n = o.size === 0, l = this.chunk.getUint16(e);
    e += 2;
    for (let p = 0; p < l; p++) {
      let u = this.chunk.getUint16(e);
      if (s) {
        if (a.has(u) && (r.set(u, this.parseTag(e, u, t)), a.delete(u), a.size === 0)) break;
      } else !n && o.has(u) || r.set(u, this.parseTag(e, u, t));
      e += 12;
    }
    return r;
  }
  parseTag(e, t, r) {
    let { chunk: a } = this, o = a.getUint16(e + 2), s = a.getUint32(e + 4), n = zd[o];
    if (n * s <= 4 ? e += 8 : e = a.getUint32(e + 8), (o < 1 || o > 13) && K(`Invalid TIFF value type. block: ${r.toUpperCase()}, tag: ${t.toString(16)}, type: ${o}, offset ${e}`), e > a.byteLength && K(`Invalid TIFF value offset. block: ${r.toUpperCase()}, tag: ${t.toString(16)}, type: ${o}, offset ${e} is outside of chunk size ${a.byteLength}`), o === 1) return a.getUint8Array(e, s);
    if (o === 2) return (l = function(p) {
      for (; p.endsWith("\0"); ) p = p.slice(0, -1);
      return p;
    }(l = a.getString(e, s)).trim()) === "" ? void 0 : l;
    var l;
    if (o === 7) return a.getUint8Array(e, s);
    if (s === 1) return this.parseTagValue(o, e);
    {
      let p = new (function(d) {
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
      }(o))(s), u = n;
      for (let d = 0; d < s; d++) p[d] = this.parseTagValue(o, e), e += u;
      return p;
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
        K(`Invalid tiff type ${e}`);
    }
  }
}
class Fr extends Md {
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
    this.findIfd0Offset(), this.ifd0Offset < 8 && K("Malformed EXIF data"), !e.chunked && this.ifd0Offset > e.byteLength && K(`IFD0 offset points to outside of file.
this.ifd0Offset: ${this.ifd0Offset}, file.byteLength: ${e.byteLength}`), e.tiff && await e.ensureChunk(this.ifd0Offset, Vo(this.options));
    let t = this.parseBlock(this.ifd0Offset, "ifd0");
    return t.size !== 0 ? (this.exifOffset = t.get(34665), this.interopOffset = t.get(40965), this.gpsOffset = t.get(34853), this.xmp = t.get(700), this.iptc = t.get(33723), this.icc = t.get(34675), this.options.sanitize && (t.delete(34665), t.delete(40965), t.delete(34853), t.delete(700), t.delete(33723), t.delete(34675)), t) : void 0;
  }
  async parseExifBlock() {
    if (this.exif || (this.ifd0 || await this.parseIfd0Block(), this.exifOffset === void 0)) return;
    this.file.tiff && await this.file.ensureChunk(this.exifOffset, Vo(this.options));
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
    return e && e.has(2) && e.has(4) && (e.set("latitude", Jo(...e.get(2), e.get(1))), e.set("longitude", Jo(...e.get(4), e.get(3)))), e;
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
    for (t of X) if (e = this[t], !Pn(e)) if (r = this.canTranslate ? this.translateBlock(e, t) : Object.fromEntries(e), this.options.mergeOutput) {
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
function Jo(i, e, t, r) {
  var a = i + e / 60 + t / 3600;
  return r !== "S" && r !== "W" || (a *= -1), a;
}
z(Fr, "type", "tiff"), z(Fr, "headerLength", 10), be.set("tiff", Fr);
const Aa = { ifd0: !1, ifd1: !1, exif: !1, gps: !1, interop: !1, sanitize: !1, reviveValues: !0, translateKeys: !1, translateValues: !1, mergeOutput: !1 };
Object.assign({}, Aa, { firstChunkSize: 4e4, gps: [1, 2, 3, 4] });
Object.assign({}, Aa, { tiff: !1, ifd1: !0, mergeOutput: !1 });
const Rd = Object.assign({}, Aa, { firstChunkSize: 4e4, ifd0: [274] });
async function Nd(i) {
  let e = new Td(Rd);
  await e.read(i);
  let t = await e.parse();
  if (t && t.ifd0) return t.ifd0[274];
}
const Ud = Object.freeze({ 1: { dimensionSwapped: !1, scaleX: 1, scaleY: 1, deg: 0, rad: 0 }, 2: { dimensionSwapped: !1, scaleX: -1, scaleY: 1, deg: 0, rad: 0 }, 3: { dimensionSwapped: !1, scaleX: 1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 4: { dimensionSwapped: !1, scaleX: -1, scaleY: 1, deg: 180, rad: 180 * Math.PI / 180 }, 5: { dimensionSwapped: !0, scaleX: 1, scaleY: -1, deg: 90, rad: 90 * Math.PI / 180 }, 6: { dimensionSwapped: !0, scaleX: 1, scaleY: 1, deg: 90, rad: 90 * Math.PI / 180 }, 7: { dimensionSwapped: !0, scaleX: 1, scaleY: -1, deg: 270, rad: 270 * Math.PI / 180 }, 8: { dimensionSwapped: !0, scaleX: 1, scaleY: 1, deg: 270, rad: 270 * Math.PI / 180 } });
let ei = !0, ti = !0;
if (typeof navigator == "object") {
  let i = navigator.userAgent;
  if (i.includes("iPad") || i.includes("iPhone")) {
    let e = i.match(/OS (\d+)_(\d+)/);
    if (e) {
      let [, t, r] = e;
      ei = Number(t) + 0.1 * Number(r) < 13.4, ti = !1;
    }
  } else if (i.includes("OS X 10")) {
    let [, e] = i.match(/OS X 10[_.](\d+)/);
    ei = ti = Number(e) < 15;
  }
  if (i.includes("Chrome/")) {
    let [, e] = i.match(/Chrome\/(\d+)/);
    ei = ti = Number(e) < 81;
  } else if (i.includes("Firefox/")) {
    let [, e] = i.match(/Firefox\/(\d+)/);
    ei = ti = Number(e) < 77;
  }
}
async function Ld(i) {
  let e = await Nd(i);
  return Object.assign({ canvas: ei, css: ti }, Ud[e]);
}
class $d extends xe {
  constructor(...e) {
    super(...e), z(this, "ranges", new jd()), this.byteLength !== 0 && this.ranges.add(0, this.byteLength);
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
    t = _n ? xn.allocUnsafe(e) : new Uint8Array(e);
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
class jd {
  constructor() {
    z(this, "list", []);
  }
  get length() {
    return this.list.length;
  }
  add(e, t, r = 0) {
    let a = e + t, o = this.list.filter((s) => es(e, s.offset, a) || es(e, s.end, a));
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
function es(i, e, t) {
  return i <= e && e <= t;
}
class Hd extends $d {
  constructor(e, t) {
    super(0), z(this, "chunksRead", 0), this.input = e, this.options = t;
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
Fa.set("blob", class extends Hd {
  async readWhole() {
    this.chunked = !1;
    let i = await ra(this.input);
    this._swapArrayBuffer(i);
  }
  readChunked() {
    return this.chunked = !0, this.size = this.input.size, super.readChunked();
  }
  async _readChunk(i, e) {
    let t = e ? i + e : void 0, r = this.input.slice(i, t), a = await ra(r);
    return this.set(a, i, !0);
  }
});
const qd = {
  strings: {
    generatingThumbnails: "Generating thumbnails..."
  }
}, Wd = {
  version: "4.1.1"
};
function Vd(i, e, t) {
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
  }) : Promise.resolve().then(() => Dd(i.toDataURL(e, t), {})).then((r) => {
    if (r === null)
      throw new Error("could not extract blob, probably an old browser");
    return r;
  });
}
function Gd(i, e) {
  let t = i.width, r = i.height;
  (e.deg === 90 || e.deg === 270) && (t = i.height, r = i.width);
  const a = document.createElement("canvas");
  a.width = t, a.height = r;
  const o = a.getContext("2d");
  return o.translate(t / 2, r / 2), e.canvas && (o.rotate(e.rad), o.scale(e.scaleX, e.scaleY)), o.drawImage(i, -i.width / 2, -i.height / 2, i.width, i.height), a;
}
function Xd(i) {
  const e = i.width / i.height, t = 5e6, r = 4096;
  let a = Math.floor(Math.sqrt(t * e)), o = Math.floor(t / Math.sqrt(t * e));
  if (a > r && (a = r, o = Math.round(a / e)), o > r && (o = r, a = Math.round(e * o)), i.width > a) {
    const s = document.createElement("canvas");
    return s.width = a, s.height = o, s.getContext("2d").drawImage(i, 0, 0, a, o), s;
  }
  return i;
}
const Yd = {
  thumbnailWidth: null,
  thumbnailHeight: null,
  thumbnailType: "image/jpeg",
  waitForThumbnailsBeforeUpload: !1,
  lazy: !1
};
class In extends Ge {
  constructor(e, t) {
    if (super(e, {
      ...Yd,
      ...t
    }), this.onFileAdded = (r) => {
      !r.preview && r.data && qo(r.type) && !r.isRemote && this.addToQueue(r.id);
    }, this.onCancelRequest = (r) => {
      const a = this.queue.indexOf(r.id);
      a !== -1 && this.queue.splice(a, 1);
    }, this.onFileRemoved = (r) => {
      const a = this.queue.indexOf(r.id);
      a !== -1 && this.queue.splice(a, 1), r.preview && Ho(r.preview) && URL.revokeObjectURL(r.preview);
    }, this.onRestored = () => {
      this.uppy.getFiles().filter((a) => a.isRestored).forEach((a) => {
        (!a.preview || Ho(a.preview)) && this.addToQueue(a.id);
      });
    }, this.onAllFilesRemoved = () => {
      this.queue = [];
    }, this.waitUntilAllProcessed = (r) => {
      r.forEach((o) => {
        const s = this.uppy.getFile(o);
        this.uppy.emit("preprocess-progress", s, {
          mode: "indeterminate",
          message: this.i18n("generatingThumbnails")
        });
      });
      const a = () => {
        r.forEach((o) => {
          const s = this.uppy.getFile(o);
          this.uppy.emit("preprocess-complete", s);
        });
      };
      return new Promise((o) => {
        this.queueProcessing ? this.uppy.once("thumbnail:all-generated", () => {
          a(), o();
        }) : (a(), o());
      });
    }, this.type = "modifier", this.id = this.opts.id || "ThumbnailGenerator", this.title = "Thumbnail Generator", this.queue = [], this.queueProcessing = !1, this.defaultThumbnailDimension = 200, this.thumbnailType = this.opts.thumbnailType, this.defaultLocale = qd, this.i18nInit(), this.opts.lazy && this.opts.waitForThumbnailsBeforeUpload)
      throw new Error("ThumbnailGenerator: The `lazy` and `waitForThumbnailsBeforeUpload` options are mutually exclusive. Please ensure at most one of them is set to `true`.");
  }
  createThumbnail(e, t, r) {
    const a = URL.createObjectURL(e.data), o = new Promise((n, l) => {
      const p = new Image();
      p.src = a, p.addEventListener("load", () => {
        URL.revokeObjectURL(a), n(p);
      }), p.addEventListener("error", (u) => {
        URL.revokeObjectURL(a), l(u.error || new Error("Could not create thumbnail"));
      });
    }), s = Ld(e.data).catch(() => 1);
    return Promise.all([o, s]).then((n) => {
      let [l, p] = n;
      const u = this.getProportionalDimensions(l, t, r, p.deg), d = Gd(l, p), c = this.resizeImage(d, u.width, u.height);
      return Vd(c, this.thumbnailType, 80);
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
  // eslint-disable-next-line class-methods-use-this
  resizeImage(e, t, r) {
    let a = Xd(e), o = Math.ceil(Math.log2(a.width / t));
    o < 1 && (o = 1);
    let s = t * 2 ** (o - 1), n = r * 2 ** (o - 1);
    const l = 2;
    for (; o--; ) {
      const p = document.createElement("canvas");
      p.width = s, p.height = n, p.getContext("2d").drawImage(a, 0, 0, s, n), a = p, s = Math.round(s / l), n = Math.round(n / l);
    }
    return a;
  }
  /**
   * Set the preview URL for a file.
   */
  setPreviewURL(e, t) {
    this.uppy.setFileState(e, {
      preview: t
    });
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
    return qo(e.type) && !e.isRemote ? this.createThumbnail(e, this.opts.thumbnailWidth, this.opts.thumbnailHeight).then((t) => {
      this.setPreviewURL(e.id, t), this.uppy.log(`[ThumbnailGenerator] Generated thumbnail for ${e.id}`), this.uppy.emit("thumbnail:generated", this.uppy.getFile(e.id), t);
    }).catch((t) => {
      this.uppy.log(`[ThumbnailGenerator] Failed thumbnail for ${e.id}:`, "warning"), this.uppy.log(t, "warning"), this.uppy.emit("thumbnail:error", this.uppy.getFile(e.id), t);
    }) : Promise.resolve();
  }
  install() {
    this.uppy.on("file-removed", this.onFileRemoved), this.uppy.on("cancel-all", this.onAllFilesRemoved), this.opts.lazy ? (this.uppy.on("thumbnail:request", this.onFileAdded), this.uppy.on("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.on("thumbnail:request", this.onFileAdded), this.uppy.on("file-added", this.onFileAdded), this.uppy.on("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.addPreProcessor(this.waitUntilAllProcessed);
  }
  uninstall() {
    this.uppy.off("file-removed", this.onFileRemoved), this.uppy.off("cancel-all", this.onAllFilesRemoved), this.opts.lazy ? (this.uppy.off("thumbnail:request", this.onFileAdded), this.uppy.off("thumbnail:cancel", this.onCancelRequest)) : (this.uppy.off("thumbnail:request", this.onFileAdded), this.uppy.off("file-added", this.onFileAdded), this.uppy.off("restored", this.onRestored)), this.opts.waitForThumbnailsBeforeUpload && this.uppy.removePreProcessor(this.waitUntilAllProcessed);
  }
}
In.VERSION = Wd.version;
function ts(i) {
  if (typeof i == "string") {
    const e = document.querySelectorAll(i);
    return e.length === 0 ? null : Array.from(e);
  }
  return typeof i == "object" && hn(i) ? [i] : null;
}
const ai = Array.from;
function Fn(i, e, t, r) {
  let {
    onSuccess: a
  } = r;
  i.readEntries(
    (o) => {
      const s = [...e, ...o];
      o.length ? queueMicrotask(() => {
        Fn(i, s, t, {
          onSuccess: a
        });
      }) : a(s);
    },
    // Make sure we resolve on error anyway, it's fine if only one directory couldn't be parsed!
    (o) => {
      t(o), a(e);
    }
  );
}
function Cn(i, e) {
  return i == null ? i : {
    kind: (
      // eslint-disable-next-line no-nested-ternary
      i.isFile ? "file" : i.isDirectory ? "directory" : void 0
    ),
    name: i.name,
    getFile() {
      return new Promise((t, r) => i.file(t, r));
    },
    async *values() {
      const t = i.createReader();
      yield* await new Promise((a) => {
        Fn(t, [], e, {
          onSuccess: (o) => a(o.map((s) => Cn(s, e)))
        });
      });
    },
    isSameEntry: void 0
  };
}
function Tn(i, e, t) {
  try {
    return t === void 0 && (t = void 0), async function* () {
      const r = () => `${e}/${i.name}`;
      if (i.kind === "file") {
        const a = await i.getFile();
        a != null ? (a.relativePath = e ? r() : null, yield a) : t != null && (yield t);
      } else if (i.kind === "directory")
        for await (const a of i.values())
          yield* Tn(a, e ? r() : i.name);
      else t != null && (yield t);
    }();
  } catch (r) {
    return Promise.reject(r);
  }
}
async function* Kd(i, e) {
  const t = await Promise.all(Array.from(i.items, async (r) => {
    let a;
    return a ?? (a = Cn(typeof r.getAsEntry == "function" ? r.getAsEntry() : r.webkitGetAsEntry(), e)), {
      fileSystemHandle: a,
      lastResortFile: r.getAsFile()
      // can be used as a fallback in case other methods fail
    };
  }));
  for (const {
    lastResortFile: r,
    fileSystemHandle: a
  } of t)
    if (a != null)
      try {
        yield* Tn(a, "", r);
      } catch (o) {
        r != null ? yield r : e(o);
      }
    else r != null && (yield r);
}
function Zd(i) {
  const e = ai(i.files);
  return Promise.resolve(e);
}
async function Qd(i, e) {
  var t;
  const r = (t = e?.logDropError) != null ? t : Function.prototype;
  try {
    const a = [];
    for await (const o of Kd(i, r))
      a.push(o);
    return a;
  } catch {
    return Zd(i);
  }
}
function oa() {
  return oa = Object.assign ? Object.assign.bind() : function(i) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (i[r] = t[r]);
    }
    return i;
  }, oa.apply(null, arguments);
}
const Jd = {
  position: "relative",
  // Disabled for our use case: the wrapper elements around FileList already deal with overflow,
  // and this additional property would hide things that we want to show.
  //
  // overflow: 'hidden',
  width: "100%",
  minHeight: "100%"
}, eu = {
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
class tu extends ae {
  constructor(e) {
    super(e), this.handleScroll = () => {
      this.setState({
        offset: this.base.scrollTop
      });
    }, this.handleResize = () => {
      this.resize();
    }, this.focusElement = null, this.state = {
      offset: 0,
      height: 0
    };
  }
  componentDidMount() {
    this.resize(), window.addEventListener("resize", this.handleResize);
  }
  // TODO: refactor to stable lifecycle method
  // eslint-disable-next-line
  componentWillUpdate() {
    this.base.contains(document.activeElement) && (this.focusElement = document.activeElement);
  }
  componentDidUpdate() {
    this.focusElement && this.focusElement.parentNode && document.activeElement !== this.focusElement && this.focusElement.focus(), this.focusElement = null, this.resize();
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }
  resize() {
    const {
      height: e
    } = this.state;
    e !== this.base.offsetHeight && this.setState({
      height: this.base.offsetHeight
    });
  }
  render(e) {
    let {
      data: t,
      rowHeight: r,
      renderRow: a,
      overscanCount: o = 10,
      ...s
    } = e;
    const {
      offset: n,
      height: l
    } = this.state;
    let p = Math.floor(n / r), u = Math.floor(l / r);
    o && (p = Math.max(0, p - p % o), u += o);
    const d = p + u + 4, c = t.slice(p, d), f = {
      ...Jd,
      height: t.length * r
    }, m = {
      ...eu,
      top: p * r
    };
    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      h("div", oa({
        onScroll: this.handleScroll
      }, s), h("div", {
        role: "presentation",
        style: f
      }, h("div", {
        role: "presentation",
        style: m
      }, c.map(a))))
    );
  }
}
function iu() {
  return h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "30",
    height: "30",
    viewBox: "0 0 30 30"
  }, h("path", {
    d: "M15 30c8.284 0 15-6.716 15-15 0-8.284-6.716-15-15-15C6.716 0 0 6.716 0 15c0 8.284 6.716 15 15 15zm4.258-12.676v6.846h-8.426v-6.846H5.204l9.82-12.364 9.82 12.364H19.26z"
  }));
}
var is = Number.isNaN || function(e) {
  return typeof e == "number" && e !== e;
};
function ru(i, e) {
  return !!(i === e || is(i) && is(e));
}
function au(i, e) {
  if (i.length !== e.length)
    return !1;
  for (var t = 0; t < i.length; t++)
    if (!ru(i[t], e[t]))
      return !1;
  return !0;
}
function rs(i, e) {
  e === void 0 && (e = au);
  var t = null;
  function r() {
    for (var a = [], o = 0; o < arguments.length; o++)
      a[o] = arguments[o];
    if (t && t.lastThis === this && e(a, t.lastArgs))
      return t.lastResult;
    var s = i.apply(this, a);
    return t = {
      lastResult: s,
      lastArgs: a,
      lastThis: this
    }, s;
  }
  return r.clear = function() {
    t = null;
  }, r;
}
const An = ['a[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'area[href]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', "input:not([disabled]):not([inert]):not([aria-hidden])", "select:not([disabled]):not([inert]):not([aria-hidden])", "textarea:not([disabled]):not([inert]):not([aria-hidden])", "button:not([disabled]):not([inert]):not([aria-hidden])", 'iframe:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'object:not([tabindex^="-"]):not([inert]):not([aria-hidden])', 'embed:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[contenteditable]:not([tabindex^="-"]):not([inert]):not([aria-hidden])', '[tabindex]:not([tabindex^="-"]):not([inert]):not([aria-hidden])'];
function En(i, e) {
  if (e) {
    const t = i.querySelector(`[data-uppy-paneltype="${e}"]`);
    if (t) return t;
  }
  return i;
}
function as(i, e) {
  const t = e[0];
  t && (t.focus(), i.preventDefault());
}
function ou(i, e) {
  const t = e[e.length - 1];
  t && (t.focus(), i.preventDefault());
}
function su(i) {
  return i.contains(document.activeElement);
}
function On(i, e, t) {
  const r = En(t, e), a = ai(r.querySelectorAll(An)), o = a.indexOf(document.activeElement);
  su(r) ? i.shiftKey && o === 0 ? ou(i, a) : !i.shiftKey && o === a.length - 1 && as(i, a) : as(i, a);
}
function nu(i, e, t) {
  e === null || On(i, e, t);
}
var lu = Hs();
const pu = /* @__PURE__ */ kt(lu);
function du() {
  let i = !1;
  return pu((t, r) => {
    const a = En(t, r), o = a.contains(document.activeElement);
    if (o && i) return;
    const s = a.querySelector("[data-uppy-super-focusable]");
    if (!(o && !s))
      if (s)
        s.focus({
          preventScroll: !0
        }), i = !0;
      else {
        const n = a.querySelector(An);
        n?.focus({
          preventScroll: !0
        }), i = !1;
      }
  }, 260);
}
function uu() {
  const i = document.body;
  return !(!("draggable" in i) || !("ondragstart" in i && "ondrop" in i) || !("FormData" in window) || !("FileReader" in window));
}
function hu(i, e) {
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
function cu() {
  return h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, h("g", {
    fill: "#686DE0",
    fillRule: "evenodd"
  }, h("path", {
    d: "M5 7v10h15V7H5zm0-1h15a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z",
    fillRule: "nonzero"
  }), h("path", {
    d: "M6.35 17.172l4.994-5.026a.5.5 0 0 1 .707 0l2.16 2.16 3.505-3.505a.5.5 0 0 1 .707 0l2.336 2.31-.707.72-1.983-1.97-3.505 3.505a.5.5 0 0 1-.707 0l-2.16-2.159-3.938 3.939-1.409.026z",
    fillRule: "nonzero"
  }), h("circle", {
    cx: "7.5",
    cy: "9.5",
    r: "1.5"
  })));
}
function fu() {
  return h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, h("path", {
    d: "M9.5 18.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V7.25a.5.5 0 0 1 .379-.485l9-2.25A.5.5 0 0 1 18.5 5v11.64c0 1.14-1.145 2-2.5 2s-2.5-.86-2.5-2c0-1.14 1.145-2 2.5-2 .557 0 1.079.145 1.5.396V8.67l-8 2v7.97zm8-11v-2l-8 2v2l8-2zM7 19.64c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1zm9-2c.855 0 1.5-.484 1.5-1s-.645-1-1.5-1-1.5.484-1.5 1 .645 1 1.5 1z",
    fill: "#049BCF",
    fillRule: "nonzero"
  }));
}
function mu() {
  return h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, h("path", {
    d: "M16 11.834l4.486-2.691A1 1 0 0 1 22 10v6a1 1 0 0 1-1.514.857L16 14.167V17a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v2.834zM15 9H5v8h10V9zm1 4l5 3v-6l-5 3z",
    fill: "#19AF67",
    fillRule: "nonzero"
  }));
}
function gu() {
  return h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, h("path", {
    d: "M9.766 8.295c-.691-1.843-.539-3.401.747-3.726 1.643-.414 2.505.938 2.39 3.299-.039.79-.194 1.662-.537 3.148.324.49.66.967 1.055 1.51.17.231.382.488.629.757 1.866-.128 3.653.114 4.918.655 1.487.635 2.192 1.685 1.614 2.84-.566 1.133-1.839 1.084-3.416.249-1.141-.604-2.457-1.634-3.51-2.707a13.467 13.467 0 0 0-2.238.426c-1.392 4.051-4.534 6.453-5.707 4.572-.986-1.58 1.38-4.206 4.914-5.375.097-.322.185-.656.264-1.001.08-.353.306-1.31.407-1.737-.678-1.059-1.2-2.031-1.53-2.91zm2.098 4.87c-.033.144-.068.287-.104.427l.033-.01-.012.038a14.065 14.065 0 0 1 1.02-.197l-.032-.033.052-.004a7.902 7.902 0 0 1-.208-.271c-.197-.27-.38-.526-.555-.775l-.006.028-.002-.003c-.076.323-.148.632-.186.8zm5.77 2.978c1.143.605 1.832.632 2.054.187.26-.519-.087-1.034-1.113-1.473-.911-.39-2.175-.608-3.55-.608.845.766 1.787 1.459 2.609 1.894zM6.559 18.789c.14.223.693.16 1.425-.413.827-.648 1.61-1.747 2.208-3.206-2.563 1.064-4.102 2.867-3.633 3.62zm5.345-10.97c.088-1.793-.351-2.48-1.146-2.28-.473.119-.564 1.05-.056 2.405.213.566.52 1.188.908 1.859.18-.858.268-1.453.294-1.984z",
    fill: "#E2514A",
    fillRule: "nonzero"
  }));
}
function yu() {
  return h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, h("path", {
    d: "M10.45 2.05h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V2.55a.5.5 0 0 1 .5-.5zm2.05 1.024h1.05a.5.5 0 0 1 .5.5V3.6a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5v-.001zM10.45 0h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5V.5a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 3.074h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-2.05 1.024h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm-2.05 1.025h1.05a.5.5 0 0 1 .5.5v.025a.5.5 0 0 1-.5.5h-1.05a.5.5 0 0 1-.5-.5v-.025a.5.5 0 0 1 .5-.5zm2.05 1.025h1.05a.5.5 0 0 1 .5.5v.024a.5.5 0 0 1-.5.5H12.5a.5.5 0 0 1-.5-.5v-.024a.5.5 0 0 1 .5-.5zm-1.656 3.074l-.82 5.946c.52.302 1.174.458 1.976.458.803 0 1.455-.156 1.975-.458l-.82-5.946h-2.311zm0-1.025h2.312c.512 0 .946.378 1.015.885l.82 5.946c.056.412-.142.817-.501 1.026-.686.398-1.515.597-2.49.597-.974 0-1.804-.199-2.49-.597a1.025 1.025 0 0 1-.5-1.026l.819-5.946c.07-.507.503-.885 1.015-.885zm.545 6.6a.5.5 0 0 1-.397-.561l.143-.999a.5.5 0 0 1 .495-.429h.74a.5.5 0 0 1 .495.43l.143.998a.5.5 0 0 1-.397.561c-.404.08-.819.08-1.222 0z",
    fill: "#00C469",
    fillRule: "nonzero"
  }));
}
function bu() {
  return h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, h("g", {
    fill: "#A7AFB7",
    fillRule: "nonzero"
  }, h("path", {
    d: "M5.5 22a.5.5 0 0 1-.5-.5v-18a.5.5 0 0 1 .5-.5h10.719a.5.5 0 0 1 .367.16l3.281 3.556a.5.5 0 0 1 .133.339V21.5a.5.5 0 0 1-.5.5h-14zm.5-1h13V7.25L16 4H6v17z"
  }), h("path", {
    d: "M15 4v3a1 1 0 0 0 1 1h3V7h-3V4h-1z"
  })));
}
function vu() {
  return h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "25",
    height: "25",
    viewBox: "0 0 25 25"
  }, h("path", {
    d: "M4.5 7h13a.5.5 0 1 1 0 1h-13a.5.5 0 0 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 3h10a.5.5 0 1 1 0 1h-10a.5.5 0 1 1 0-1z",
    fill: "#5A5E69",
    fillRule: "nonzero"
  }));
}
function Ea(i) {
  const e = {
    color: "#838999",
    icon: bu()
  };
  if (!i) return e;
  const t = i.split("/")[0], r = i.split("/")[1];
  return t === "text" ? {
    color: "#5a5e69",
    icon: vu()
  } : t === "image" ? {
    color: "#686de0",
    icon: cu()
  } : t === "audio" ? {
    color: "#068dbb",
    icon: fu()
  } : t === "video" ? {
    color: "#19af67",
    icon: mu()
  } : t === "application" && r === "pdf" ? {
    color: "#e25149",
    icon: gu()
  } : t === "application" && ["zip", "x-7z-compressed", "x-zip-compressed", "x-rar-compressed", "x-tar", "x-gzip", "x-apple-diskimage"].indexOf(r) !== -1 ? {
    color: "#00C469",
    icon: yu()
  } : e;
}
function zn(i) {
  const {
    file: e
  } = i;
  if (e.preview)
    return h("img", {
      draggable: !1,
      className: "uppy-Dashboard-Item-previewImg",
      alt: e.name,
      src: e.preview
    });
  const {
    color: t,
    icon: r
  } = Ea(e.type);
  return h("div", {
    className: "uppy-Dashboard-Item-previewIconWrap"
  }, h("span", {
    className: "uppy-Dashboard-Item-previewIcon",
    style: {
      color: t
    }
  }, r), h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-Dashboard-Item-previewIconBg",
    width: "58",
    height: "76",
    viewBox: "0 0 58 76"
  }, h("rect", {
    fill: "#FFF",
    width: "58",
    height: "76",
    rx: "3",
    fillRule: "evenodd"
  })));
}
const wu = (i, e) => (typeof e == "function" ? e() : e).filter((a) => a.id === i)[0].name;
function Mn(i) {
  const {
    file: e,
    toggleFileCard: t,
    i18n: r,
    metaFields: a
  } = i, {
    missingRequiredMetaFields: o
  } = e;
  if (!(o != null && o.length))
    return null;
  const s = o.map((n) => wu(n, a)).join(", ");
  return h("div", {
    className: "uppy-Dashboard-Item-errorMessage"
  }, r("missingRequiredMetaFields", {
    smart_count: o.length,
    fields: s
  }), " ", h("button", {
    type: "button",
    class: "uppy-u-reset uppy-Dashboard-Item-errorMessageBtn",
    onClick: () => t(!0, e.id)
  }, r("editFile")));
}
function xu(i) {
  const {
    file: e,
    i18n: t,
    toggleFileCard: r,
    metaFields: a,
    showLinkToFileUploadResult: o
  } = i, n = e.preview ? "rgba(255, 255, 255, 0.5)" : Ea(e.type).color;
  return h("div", {
    className: "uppy-Dashboard-Item-previewInnerWrap",
    style: {
      backgroundColor: n
    }
  }, o && e.uploadURL && h("a", {
    className: "uppy-Dashboard-Item-previewLink",
    href: e.uploadURL,
    rel: "noreferrer noopener",
    target: "_blank",
    "aria-label": e.meta.name
  }, h("span", {
    hidden: !0
  }, e.meta.name)), h(zn, {
    file: e
  }), h(Mn, {
    file: e,
    i18n: t,
    toggleFileCard: r,
    metaFields: a
  }));
}
function _u(i) {
  if (!i.isUploaded) {
    if (i.error && !i.hideRetryButton) {
      i.uppy.retryUpload(i.file.id);
      return;
    }
    i.resumableUploads && !i.hidePauseResumeButton ? i.uppy.pauseResume(i.file.id) : i.individualCancellation && !i.hideCancelButton && i.uppy.removeFile(i.file.id);
  }
}
function os(i) {
  return i.isUploaded ? i.i18n("uploadComplete") : i.error ? i.i18n("retryUpload") : i.resumableUploads ? i.file.isPaused ? i.i18n("resumeUpload") : i.i18n("pauseUpload") : i.individualCancellation ? i.i18n("cancelUpload") : "";
}
function Cr(i) {
  return h("div", {
    className: "uppy-Dashboard-Item-progress"
  }, h("button", {
    className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-progressIndicator",
    type: "button",
    "aria-label": os(i),
    title: os(i),
    onClick: () => _u(i)
  }, i.children));
}
function Fi(i) {
  let {
    children: e
  } = i;
  return h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    width: "70",
    height: "70",
    viewBox: "0 0 36 36",
    className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--circle"
  }, e);
}
function Tr(i) {
  let {
    progress: e
  } = i;
  const t = 2 * Math.PI * 15;
  return h("g", null, h("circle", {
    className: "uppy-Dashboard-Item-progressIcon--bg",
    r: "15",
    cx: "18",
    cy: "18",
    "stroke-width": "2",
    fill: "none"
  }), h("circle", {
    className: "uppy-Dashboard-Item-progressIcon--progress",
    r: "15",
    cx: "18",
    cy: "18",
    transform: "rotate(-90, 18, 18)",
    fill: "none",
    "stroke-width": "2",
    "stroke-dasharray": t,
    "stroke-dashoffset": t - t / 100 * e
  }));
}
function Pu(i) {
  return !i.file.progress.uploadStarted || i.file.progress.percentage === void 0 ? null : i.isUploaded ? h("div", {
    className: "uppy-Dashboard-Item-progress"
  }, h("div", {
    className: "uppy-Dashboard-Item-progressIndicator"
  }, h(Fi, null, h("circle", {
    r: "15",
    cx: "18",
    cy: "18",
    fill: "#1bb240"
  }), h("polygon", {
    className: "uppy-Dashboard-Item-progressIcon--check",
    transform: "translate(2, 3)",
    points: "14 22.5 7 15.2457065 8.99985857 13.1732815 14 18.3547104 22.9729883 9 25 11.1005634"
  })))) : i.recoveredState ? null : i.error && !i.hideRetryButton ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    h(Cr, i, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon uppy-Dashboard-Item-progressIcon--retry",
      width: "28",
      height: "31",
      viewBox: "0 0 16 19"
    }, h("path", {
      d: "M16 11a8 8 0 1 1-8-8v2a6 6 0 1 0 6 6h2z"
    }), h("path", {
      d: "M7.9 3H10v2H7.9z"
    }), h("path", {
      d: "M8.536.5l3.535 3.536-1.414 1.414L7.12 1.914z"
    }), h("path", {
      d: "M10.657 2.621l1.414 1.415L8.536 7.57 7.12 6.157z"
    })))
  ) : i.resumableUploads && !i.hidePauseResumeButton ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    h(Cr, i, h(Fi, null, h(Tr, {
      progress: i.file.progress.percentage
    }), i.file.isPaused ? h("polygon", {
      className: "uppy-Dashboard-Item-progressIcon--play",
      transform: "translate(3, 3)",
      points: "12 20 12 10 20 15"
    }) : h("g", {
      className: "uppy-Dashboard-Item-progressIcon--pause",
      transform: "translate(14.5, 13)"
    }, h("rect", {
      x: "0",
      y: "0",
      width: "2",
      height: "10",
      rx: "0"
    }), h("rect", {
      x: "5",
      y: "0",
      width: "2",
      height: "10",
      rx: "0"
    }))))
  ) : !i.resumableUploads && i.individualCancellation && !i.hideCancelButton ? (
    // eslint-disable-next-line react/jsx-props-no-spreading
    h(Cr, i, h(Fi, null, h(Tr, {
      progress: i.file.progress.percentage
    }), h("polygon", {
      className: "cancel",
      transform: "translate(2, 2)",
      points: "19.8856516 11.0625 16 14.9481516 12.1019737 11.0625 11.0625 12.1143484 14.9481516 16 11.0625 19.8980263 12.1019737 20.9375 16 17.0518484 19.8856516 20.9375 20.9375 19.8980263 17.0518484 16 20.9375 12"
    })))
  ) : h("div", {
    className: "uppy-Dashboard-Item-progress"
  }, h("div", {
    className: "uppy-Dashboard-Item-progressIndicator"
  }, h(Fi, null, h(Tr, {
    progress: i.file.progress.percentage
  }))));
}
const Ar = "...";
function Rn(i, e) {
  if (e === 0) return "";
  if (i.length <= e) return i;
  if (e <= Ar.length + 1) return `${i.slice(0, e - 1)}…`;
  const t = e - Ar.length, r = Math.ceil(t / 2), a = Math.floor(t / 2);
  return i.slice(0, r) + Ar + i.slice(-a);
}
const Su = (i) => {
  const {
    author: e,
    name: t
  } = i.file.meta;
  function r() {
    return i.isSingleFile && i.containerHeight >= 350 ? 90 : i.containerWidth <= 352 ? 35 : i.containerWidth <= 576 ? 60 : e ? 20 : 30;
  }
  return h("div", {
    className: "uppy-Dashboard-Item-name",
    title: t
  }, Rn(t, r()));
}, Du = (i) => {
  var e;
  const {
    author: t
  } = i.file.meta, r = (e = i.file.remote) == null ? void 0 : e.providerName, a = "·";
  return t ? h("div", {
    className: "uppy-Dashboard-Item-author"
  }, h("a", {
    href: `${t.url}?utm_source=Companion&utm_medium=referral`,
    target: "_blank",
    rel: "noopener noreferrer"
  }, Rn(t.name, 13)), r ? h(Fragment, null, ` ${a} `, r, ` ${a} `) : null) : null;
}, ku = (i) => i.file.size && h("div", {
  className: "uppy-Dashboard-Item-statusSize"
}, Le(i.file.size)), Bu = (i) => i.file.isGhost && h("span", null, " • ", h("button", {
  className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-reSelect",
  type: "button",
  onClick: () => i.toggleAddFilesPanel(!0)
}, i.i18n("reSelect"))), Iu = (i) => {
  let {
    file: e,
    onClick: t
  } = i;
  return e.error ? h("button", {
    className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-errorDetails",
    "aria-label": e.error,
    "data-microtip-position": "bottom",
    "data-microtip-size": "medium",
    onClick: t,
    type: "button"
  }, "?") : null;
};
function Fu(i) {
  const {
    file: e,
    i18n: t,
    toggleFileCard: r,
    metaFields: a,
    toggleAddFilesPanel: o,
    isSingleFile: s,
    containerHeight: n,
    containerWidth: l
  } = i;
  return h("div", {
    className: "uppy-Dashboard-Item-fileInfo",
    "data-uppy-file-source": e.source
  }, h("div", {
    className: "uppy-Dashboard-Item-fileName"
  }, Su({
    file: e,
    isSingleFile: s,
    containerHeight: n,
    containerWidth: l
  }), h(Iu, {
    file: e,
    onClick: () => alert(e.error)
  })), h("div", {
    className: "uppy-Dashboard-Item-status"
  }, Du({
    file: e
  }), ku({
    file: e
  }), Bu({
    file: e,
    toggleAddFilesPanel: o,
    i18n: t
  })), h(Mn, {
    file: e,
    i18n: t,
    toggleFileCard: r,
    metaFields: a
  }));
}
function Cu(i, e) {
  return e === void 0 && (e = "Copy the URL below"), new Promise((t) => {
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
function Tu(i) {
  let {
    file: e,
    uploadInProgressOrComplete: t,
    metaFields: r,
    canEditFile: a,
    i18n: o,
    onClick: s
  } = i;
  return !t && r && r.length > 0 || !t && a(e) ? h("button", {
    className: "uppy-u-reset uppy-c-btn uppy-Dashboard-Item-action uppy-Dashboard-Item-action--edit",
    type: "button",
    "aria-label": o("editFileWithFilename", {
      file: e.meta.name
    }),
    title: o("editFileWithFilename", {
      file: e.meta.name
    }),
    onClick: () => s()
  }, h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "14",
    height: "14",
    viewBox: "0 0 14 14"
  }, h("g", {
    fillRule: "evenodd"
  }, h("path", {
    d: "M1.5 10.793h2.793A1 1 0 0 0 5 10.5L11.5 4a1 1 0 0 0 0-1.414L9.707.793a1 1 0 0 0-1.414 0l-6.5 6.5A1 1 0 0 0 1.5 8v2.793zm1-1V8L9 1.5l1.793 1.793-6.5 6.5H2.5z",
    fillRule: "nonzero"
  }), h("rect", {
    x: "1",
    y: "12.293",
    width: "11",
    height: "1",
    rx: ".5"
  }), h("path", {
    fillRule: "nonzero",
    d: "M6.793 2.5L9.5 5.207l.707-.707L7.5 1.793z"
  })))) : null;
}
function Au(i) {
  let {
    i18n: e,
    onClick: t,
    file: r
  } = i;
  return h("button", {
    className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--remove",
    type: "button",
    "aria-label": e("removeFile", {
      file: r.meta.name
    }),
    title: e("removeFile", {
      file: r.meta.name
    }),
    onClick: () => t()
  }, h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "18",
    height: "18",
    viewBox: "0 0 18 18"
  }, h("path", {
    d: "M9 0C4.034 0 0 4.034 0 9s4.034 9 9 9 9-4.034 9-9-4.034-9-9-9z"
  }), h("path", {
    fill: "#FFF",
    d: "M13 12.222l-.778.778L9 9.778 5.778 13 5 12.222 8.222 9 5 5.778 5.778 5 9 8.222 12.222 5l.778.778L9.778 9z"
  })));
}
function Eu(i) {
  let {
    file: e,
    uppy: t,
    i18n: r
  } = i;
  const a = (o) => {
    Cu(e.uploadURL, r("copyLinkToClipboardFallback")).then(() => {
      t.log("Link copied to clipboard."), t.info(r("copyLinkToClipboardSuccess"), "info", 3e3);
    }).catch(t.log).then(() => o.target.focus({
      preventScroll: !0
    }));
  };
  return h("button", {
    className: "uppy-u-reset uppy-Dashboard-Item-action uppy-Dashboard-Item-action--copyLink",
    type: "button",
    "aria-label": r("copyLink"),
    title: r("copyLink"),
    onClick: (o) => a(o)
  }, h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "14",
    height: "14",
    viewBox: "0 0 14 12"
  }, h("path", {
    d: "M7.94 7.703a2.613 2.613 0 0 1-.626 2.681l-.852.851a2.597 2.597 0 0 1-1.849.766A2.616 2.616 0 0 1 2.764 7.54l.852-.852a2.596 2.596 0 0 1 2.69-.625L5.267 7.099a1.44 1.44 0 0 0-.833.407l-.852.851a1.458 1.458 0 0 0 1.03 2.486c.39 0 .755-.152 1.03-.426l.852-.852c.231-.231.363-.522.406-.824l1.04-1.038zm4.295-5.937A2.596 2.596 0 0 0 10.387 1c-.698 0-1.355.272-1.849.766l-.852.851a2.614 2.614 0 0 0-.624 2.688l1.036-1.036c.041-.304.173-.6.407-.833l.852-.852c.275-.275.64-.426 1.03-.426a1.458 1.458 0 0 1 1.03 2.486l-.852.851a1.442 1.442 0 0 1-.824.406l-1.04 1.04a2.596 2.596 0 0 0 2.683-.628l.851-.85a2.616 2.616 0 0 0 0-3.697zm-6.88 6.883a.577.577 0 0 0 .82 0l3.474-3.474a.579.579 0 1 0-.819-.82L5.355 7.83a.579.579 0 0 0 0 .819z"
  })));
}
function Ou(i) {
  const {
    uppy: e,
    file: t,
    uploadInProgressOrComplete: r,
    canEditFile: a,
    metaFields: o,
    showLinkToFileUploadResult: s,
    showRemoveButton: n,
    i18n: l,
    toggleFileCard: p,
    openFileEditor: u
  } = i;
  return h("div", {
    className: "uppy-Dashboard-Item-actionWrapper"
  }, h(Tu, {
    i18n: l,
    file: t,
    uploadInProgressOrComplete: r,
    canEditFile: a,
    metaFields: o,
    onClick: () => {
      o && o.length > 0 ? p(!0, t.id) : u(t);
    }
  }), s && t.uploadURL ? h(Eu, {
    file: t,
    uppy: e,
    i18n: l
  }) : null, n ? h(Au, {
    i18n: l,
    file: t,
    onClick: () => e.removeFile(t.id)
  }) : null);
}
class zu extends ae {
  componentDidMount() {
    const {
      file: e
    } = this.props;
    e.preview || this.props.handleRequestThumbnail(e);
  }
  shouldComponentUpdate(e) {
    return !hu(this.props, e);
  }
  // VirtualList mounts FileItems again and they emit `thumbnail:request`
  // Otherwise thumbnails are broken or missing after Golden Retriever restores files
  componentDidUpdate() {
    const {
      file: e
    } = this.props;
    e.preview || this.props.handleRequestThumbnail(e);
  }
  componentWillUnmount() {
    const {
      file: e
    } = this.props;
    e.preview || this.props.handleCancelThumbnail(e);
  }
  render() {
    const {
      file: e
    } = this.props, t = e.progress.preprocess || e.progress.postprocess, r = !!e.progress.uploadComplete && !t && !e.error, a = !!e.progress.uploadStarted || !!t, o = e.progress.uploadStarted && !e.progress.uploadComplete || t, s = e.error || !1, {
      isGhost: n
    } = e;
    let l = (this.props.individualCancellation || !o) && !r;
    r && this.props.showRemoveButtonAfterComplete && (l = !0);
    const p = _e({
      "uppy-Dashboard-Item": !0,
      "is-inprogress": o && !this.props.recoveredState,
      "is-processing": t,
      "is-complete": r,
      "is-error": !!s,
      "is-resumable": this.props.resumableUploads,
      "is-noIndividualCancellation": !this.props.individualCancellation,
      "is-ghost": n
    });
    return h("div", {
      className: p,
      id: `uppy_${e.id}`,
      role: this.props.role
    }, h("div", {
      className: "uppy-Dashboard-Item-preview"
    }, h(xu, {
      file: e,
      showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
      i18n: this.props.i18n,
      toggleFileCard: this.props.toggleFileCard,
      metaFields: this.props.metaFields
    }), h(Pu, {
      uppy: this.props.uppy,
      file: e,
      error: s,
      isUploaded: r,
      hideRetryButton: this.props.hideRetryButton,
      hideCancelButton: this.props.hideCancelButton,
      hidePauseResumeButton: this.props.hidePauseResumeButton,
      recoveredState: this.props.recoveredState,
      resumableUploads: this.props.resumableUploads,
      individualCancellation: this.props.individualCancellation,
      i18n: this.props.i18n
    })), h("div", {
      className: "uppy-Dashboard-Item-fileInfoAndButtons"
    }, h(Fu, {
      file: e,
      containerWidth: this.props.containerWidth,
      containerHeight: this.props.containerHeight,
      i18n: this.props.i18n,
      toggleAddFilesPanel: this.props.toggleAddFilesPanel,
      toggleFileCard: this.props.toggleFileCard,
      metaFields: this.props.metaFields,
      isSingleFile: this.props.isSingleFile
    }), h(Ou, {
      file: e,
      metaFields: this.props.metaFields,
      showLinkToFileUploadResult: this.props.showLinkToFileUploadResult,
      showRemoveButton: l,
      canEditFile: this.props.canEditFile,
      uploadInProgressOrComplete: a,
      toggleFileCard: this.props.toggleFileCard,
      openFileEditor: this.props.openFileEditor,
      uppy: this.props.uppy,
      i18n: this.props.i18n
    })));
  }
}
function Mu(i, e) {
  const t = [];
  let r = [];
  return i.forEach((a) => {
    r.length < e ? r.push(a) : (t.push(r), r = [a]);
  }), r.length && t.push(r), t;
}
function Ru(i) {
  let {
    id: e,
    i18n: t,
    uppy: r,
    files: a,
    resumableUploads: o,
    hideRetryButton: s,
    hidePauseResumeButton: n,
    hideCancelButton: l,
    showLinkToFileUploadResult: p,
    showRemoveButtonAfterComplete: u,
    metaFields: d,
    isSingleFile: c,
    toggleFileCard: f,
    handleRequestThumbnail: m,
    handleCancelThumbnail: y,
    recoveredState: b,
    individualCancellation: x,
    itemsPerRow: _,
    openFileEditor: B,
    canEditFile: k,
    toggleAddFilesPanel: C,
    containerWidth: g,
    containerHeight: S
  } = i;
  const P = _ === 1 ? (
    // Mobile
    71
  ) : 200, D = Ba(() => {
    const O = (A, N) => Number(a[N].isGhost) - Number(a[A].isGhost), M = Object.keys(a);
    return b && M.sort(O), Mu(M, _);
  }, [a, _, b]), L = (O) => h("div", {
    class: "uppy-Dashboard-filesInner",
    role: "presentation",
    key: O[0]
  }, O.map((M) => h(zu, {
    key: M,
    uppy: r,
    id: e,
    i18n: t,
    resumableUploads: o,
    individualCancellation: x,
    hideRetryButton: s,
    hidePauseResumeButton: n,
    hideCancelButton: l,
    showLinkToFileUploadResult: p,
    showRemoveButtonAfterComplete: u,
    metaFields: d,
    recoveredState: b,
    isSingleFile: c,
    containerWidth: g,
    containerHeight: S,
    toggleFileCard: f,
    handleRequestThumbnail: m,
    handleCancelThumbnail: y,
    role: "listitem",
    openFileEditor: B,
    canEditFile: k,
    toggleAddFilesPanel: C,
    file: a[M]
  })));
  return c ? h("div", {
    class: "uppy-Dashboard-files"
  }, L(D[0])) : h(tu, {
    class: "uppy-Dashboard-files",
    role: "list",
    data: D,
    renderRow: L,
    rowHeight: P
  });
}
class Nn extends ae {
  constructor() {
    super(...arguments), this.fileInput = null, this.folderInput = null, this.mobilePhotoFileInput = null, this.mobileVideoFileInput = null, this.triggerFileInputClick = () => {
      var e;
      (e = this.fileInput) == null || e.click();
    }, this.triggerFolderInputClick = () => {
      var e;
      (e = this.folderInput) == null || e.click();
    }, this.triggerVideoCameraInputClick = () => {
      var e;
      (e = this.mobileVideoFileInput) == null || e.click();
    }, this.triggerPhotoCameraInputClick = () => {
      var e;
      (e = this.mobilePhotoFileInput) == null || e.click();
    }, this.onFileInputChange = (e) => {
      this.props.handleInputChange(e), e.currentTarget.value = "";
    }, this.renderHiddenInput = (e, t) => {
      var r;
      return h("input", {
        className: "uppy-Dashboard-input",
        hidden: !0,
        "aria-hidden": "true",
        tabIndex: -1,
        webkitdirectory: e,
        type: "file",
        name: "files[]",
        multiple: this.props.maxNumberOfFiles !== 1,
        onChange: this.onFileInputChange,
        accept: (r = this.props.allowedFileTypes) == null ? void 0 : r.join(", "),
        ref: t
      });
    }, this.renderHiddenCameraInput = (e, t, r) => {
      const o = {
        photo: "image/*",
        video: "video/*"
      }[e];
      return h("input", {
        className: "uppy-Dashboard-input",
        hidden: !0,
        "aria-hidden": "true",
        tabIndex: -1,
        type: "file",
        name: `camera-${e}`,
        onChange: this.onFileInputChange,
        capture: t,
        accept: o,
        ref: r
      });
    }, this.renderMyDeviceAcquirer = () => h("div", {
      className: "uppy-DashboardTab",
      role: "presentation",
      "data-uppy-acquirer-id": "MyDevice"
    }, h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
      role: "tab",
      tabIndex: 0,
      "data-uppy-super-focusable": !0,
      onClick: this.triggerFileInputClick
    }, h("div", {
      className: "uppy-DashboardTab-inner"
    }, h("svg", {
      className: "uppy-DashboardTab-iconMyDevice",
      "aria-hidden": "true",
      focusable: "false",
      width: "32",
      height: "32",
      viewBox: "0 0 32 32"
    }, h("path", {
      d: "M8.45 22.087l-1.305-6.674h17.678l-1.572 6.674H8.45zm4.975-12.412l1.083 1.765a.823.823 0 00.715.386h7.951V13.5H8.587V9.675h4.838zM26.043 13.5h-1.195v-2.598c0-.463-.336-.75-.798-.75h-8.356l-1.082-1.766A.823.823 0 0013.897 8H7.728c-.462 0-.815.256-.815.718V13.5h-.956a.97.97 0 00-.746.37.972.972 0 00-.19.81l1.724 8.565c.095.44.484.755.933.755H24c.44 0 .824-.3.929-.727l2.043-8.568a.972.972 0 00-.176-.825.967.967 0 00-.753-.38z",
      fill: "currentcolor",
      "fill-rule": "evenodd"
    }))), h("div", {
      className: "uppy-DashboardTab-name"
    }, this.props.i18n("myDevice")))), this.renderPhotoCamera = () => h("div", {
      className: "uppy-DashboardTab",
      role: "presentation",
      "data-uppy-acquirer-id": "MobilePhotoCamera"
    }, h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
      role: "tab",
      tabIndex: 0,
      "data-uppy-super-focusable": !0,
      onClick: this.triggerPhotoCameraInputClick
    }, h("div", {
      className: "uppy-DashboardTab-inner"
    }, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      width: "32",
      height: "32",
      viewBox: "0 0 32 32"
    }, h("path", {
      d: "M23.5 9.5c1.417 0 2.5 1.083 2.5 2.5v9.167c0 1.416-1.083 2.5-2.5 2.5h-15c-1.417 0-2.5-1.084-2.5-2.5V12c0-1.417 1.083-2.5 2.5-2.5h2.917l1.416-2.167C13 7.167 13.25 7 13.5 7h5c.25 0 .5.167.667.333L20.583 9.5H23.5zM16 11.417a4.706 4.706 0 00-4.75 4.75 4.704 4.704 0 004.75 4.75 4.703 4.703 0 004.75-4.75c0-2.663-2.09-4.75-4.75-4.75zm0 7.825c-1.744 0-3.076-1.332-3.076-3.074 0-1.745 1.333-3.077 3.076-3.077 1.744 0 3.074 1.333 3.074 3.076s-1.33 3.075-3.074 3.075z",
      fill: "#02B383",
      "fill-rule": "nonzero"
    }))), h("div", {
      className: "uppy-DashboardTab-name"
    }, this.props.i18n("takePictureBtn")))), this.renderVideoCamera = () => h("div", {
      className: "uppy-DashboardTab",
      role: "presentation",
      "data-uppy-acquirer-id": "MobileVideoCamera"
    }, h("button", {
      type: "button",
      className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
      role: "tab",
      tabIndex: 0,
      "data-uppy-super-focusable": !0,
      onClick: this.triggerVideoCameraInputClick
    }, h("div", {
      className: "uppy-DashboardTab-inner"
    }, h("svg", {
      "aria-hidden": "true",
      width: "32",
      height: "32",
      viewBox: "0 0 32 32"
    }, h("path", {
      fill: "#FF675E",
      fillRule: "nonzero",
      d: "m21.254 14.277 2.941-2.588c.797-.313 1.243.818 1.09 1.554-.01 2.094.02 4.189-.017 6.282-.126.915-1.145 1.08-1.58.34l-2.434-2.142c-.192.287-.504 1.305-.738.468-.104-1.293-.028-2.596-.05-3.894.047-.312.381.823.426 1.069.063-.384.206-.744.362-1.09zm-12.939-3.73c3.858.013 7.717-.025 11.574.02.912.129 1.492 1.237 1.351 2.217-.019 2.412.04 4.83-.03 7.239-.17 1.025-1.166 1.59-2.029 1.429-3.705-.012-7.41.025-11.114-.019-.913-.129-1.492-1.237-1.352-2.217.018-2.404-.036-4.813.029-7.214.136-.82.83-1.473 1.571-1.454z "
    }))), h("div", {
      className: "uppy-DashboardTab-name"
    }, this.props.i18n("recordVideoBtn")))), this.renderBrowseButton = (e, t) => {
      const r = this.props.acquirers.length;
      return h("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn uppy-Dashboard-browse",
        onClick: t,
        "data-uppy-super-focusable": r === 0
      }, e);
    }, this.renderDropPasteBrowseTagline = (e) => {
      const t = this.renderBrowseButton(this.props.i18n("browseFiles"), this.triggerFileInputClick), r = this.renderBrowseButton(this.props.i18n("browseFolders"), this.triggerFolderInputClick), a = this.props.fileManagerSelectionType, o = a.charAt(0).toUpperCase() + a.slice(1);
      return h(
        "div",
        {
          class: "uppy-Dashboard-AddFiles-title"
        },
        // eslint-disable-next-line no-nested-ternary
        this.props.disableLocalFiles ? this.props.i18n("importFiles") : e > 0 ? this.props.i18nArray(`dropPasteImport${o}`, {
          browseFiles: t,
          browseFolders: r,
          browse: t
        }) : this.props.i18nArray(`dropPaste${o}`, {
          browseFiles: t,
          browseFolders: r,
          browse: t
        })
      );
    }, this.renderAcquirer = (e) => {
      var t;
      return h("div", {
        className: "uppy-DashboardTab",
        role: "presentation",
        "data-uppy-acquirer-id": e.id
      }, h("button", {
        type: "button",
        className: "uppy-u-reset uppy-c-btn uppy-DashboardTab-btn",
        role: "tab",
        tabIndex: 0,
        "data-cy": e.id,
        "aria-controls": `uppy-DashboardContent-panel--${e.id}`,
        "aria-selected": ((t = this.props.activePickerPanel) == null ? void 0 : t.id) === e.id,
        "data-uppy-super-focusable": !0,
        onClick: () => this.props.showPanel(e.id)
      }, h("div", {
        className: "uppy-DashboardTab-inner"
      }, e.icon()), h("div", {
        className: "uppy-DashboardTab-name"
      }, e.name)));
    }, this.renderAcquirers = (e) => {
      const t = [...e], r = t.splice(e.length - 2, e.length);
      return h(ke, null, t.map((a) => this.renderAcquirer(a)), h("span", {
        role: "presentation",
        style: {
          "white-space": "nowrap"
        }
      }, r.map((a) => this.renderAcquirer(a))));
    }, this.renderSourcesList = (e, t) => {
      const {
        showNativePhotoCameraButton: r,
        showNativeVideoCameraButton: a
      } = this.props;
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
      }), o.push(...e.map((u) => ({
        key: u.id,
        elements: this.renderAcquirer(u)
      }))), o.length === 1 && o[0].key === s && (o = []);
      const l = [...o], p = l.splice(o.length - 2, o.length);
      return h(ke, null, this.renderDropPasteBrowseTagline(o.length), h("div", {
        className: "uppy-Dashboard-AddFiles-list",
        role: "tablist"
      }, l.map((u) => {
        let {
          key: d,
          elements: c
        } = u;
        return h(ke, {
          key: d
        }, c);
      }), h("span", {
        role: "presentation",
        style: {
          "white-space": "nowrap"
        }
      }, p.map((u) => {
        let {
          key: d,
          elements: c
        } = u;
        return h(ke, {
          key: d
        }, c);
      }))));
    };
  }
  [Symbol.for("uppy test: disable unused locale key warning")]() {
    this.props.i18nArray("dropPasteBoth"), this.props.i18nArray("dropPasteFiles"), this.props.i18nArray("dropPasteFolders"), this.props.i18nArray("dropPasteImportBoth"), this.props.i18nArray("dropPasteImportFiles"), this.props.i18nArray("dropPasteImportFolders");
  }
  renderPoweredByUppy() {
    const {
      i18nArray: e
    } = this.props, t = h("span", null, h("svg", {
      "aria-hidden": "true",
      focusable: "false",
      className: "uppy-c-icon uppy-Dashboard-poweredByIcon",
      width: "11",
      height: "11",
      viewBox: "0 0 11 11"
    }, h("path", {
      d: "M7.365 10.5l-.01-4.045h2.612L5.5.806l-4.467 5.65h2.604l.01 4.044h3.718z",
      fillRule: "evenodd"
    })), h("span", {
      className: "uppy-Dashboard-poweredByUppy"
    }, "Uppy")), r = e("poweredBy", {
      uppy: t
    });
    return h("a", {
      tabIndex: -1,
      href: "https://uppy.io",
      rel: "noreferrer noopener",
      target: "_blank",
      className: "uppy-Dashboard-poweredBy"
    }, r);
  }
  render() {
    const {
      showNativePhotoCameraButton: e,
      showNativeVideoCameraButton: t,
      nativeCameraFacingMode: r
    } = this.props;
    return h("div", {
      className: "uppy-Dashboard-AddFiles"
    }, this.renderHiddenInput(!1, (a) => {
      this.fileInput = a;
    }), this.renderHiddenInput(!0, (a) => {
      this.folderInput = a;
    }), e && this.renderHiddenCameraInput("photo", r, (a) => {
      this.mobilePhotoFileInput = a;
    }), t && this.renderHiddenCameraInput("video", r, (a) => {
      this.mobileVideoFileInput = a;
    }), this.renderSourcesList(this.props.acquirers, this.props.disableLocalFiles), h("div", {
      className: "uppy-Dashboard-AddFiles-info"
    }, this.props.note && h("div", {
      className: "uppy-Dashboard-note"
    }, this.props.note), this.props.proudlyDisplayPoweredByUppy && this.renderPoweredByUppy()));
  }
}
const Nu = (i) => h("div", {
  className: _e("uppy-Dashboard-AddFilesPanel", i.className),
  "data-uppy-panelType": "AddFiles",
  "aria-hidden": !i.showAddFilesPanel
}, h("div", {
  className: "uppy-DashboardContent-bar"
}, h("div", {
  className: "uppy-DashboardContent-title",
  role: "heading",
  "aria-level": "1"
}, i.i18n("addingMoreFiles")), h("button", {
  className: "uppy-DashboardContent-back",
  type: "button",
  onClick: () => i.toggleAddFilesPanel(!1)
}, i.i18n("back"))), h(Nn, i));
function qe(i) {
  const {
    tagName: e
  } = i.target;
  if (e === "INPUT" || e === "TEXTAREA") {
    i.stopPropagation();
    return;
  }
  i.preventDefault(), i.stopPropagation();
}
function Uu(i) {
  let {
    activePickerPanel: e,
    className: t,
    hideAllPanels: r,
    i18n: a,
    state: o,
    uppy: s
  } = i;
  const n = Ri(null);
  return h("div", {
    className: _e("uppy-DashboardContent-panel", t),
    role: "tabpanel",
    "data-uppy-panelType": "PickerPanel",
    id: `uppy-DashboardContent-panel--${e.id}`,
    onDragOver: qe,
    onDragLeave: qe,
    onDrop: qe,
    onPaste: qe
  }, h("div", {
    className: "uppy-DashboardContent-bar"
  }, h("div", {
    className: "uppy-DashboardContent-title",
    role: "heading",
    "aria-level": "1"
  }, a("importFrom", {
    name: e.name
  })), h("button", {
    className: "uppy-DashboardContent-back",
    type: "button",
    onClick: r
  }, a("cancel"))), h("div", {
    ref: n,
    className: "uppy-DashboardContent-panelBody"
  }, s.getPlugin(e.id).render(o, n.current)));
}
function Lu(i) {
  const e = i.files[i.fileCardFor], t = () => {
    i.uppy.emit("file-editor:cancel", e), i.closeFileEditor();
  };
  return h("div", {
    className: _e("uppy-DashboardContent-panel", i.className),
    role: "tabpanel",
    "data-uppy-panelType": "FileEditor",
    id: "uppy-DashboardContent-panel--editor"
  }, h("div", {
    className: "uppy-DashboardContent-bar"
  }, h("div", {
    className: "uppy-DashboardContent-title",
    role: "heading",
    "aria-level": "1"
  }, i.i18nArray("editing", {
    file: h("span", {
      className: "uppy-DashboardContent-titleFile"
    }, e.meta ? e.meta.name : e.name)
  })), h("button", {
    className: "uppy-DashboardContent-back",
    type: "button",
    onClick: t
  }, i.i18n("cancel")), h("button", {
    className: "uppy-DashboardContent-save",
    type: "button",
    onClick: i.saveFileEditor
  }, i.i18n("save"))), h("div", {
    className: "uppy-DashboardContent-panelBody"
  }, i.editors.map((r) => i.uppy.getPlugin(r.id).render(i.state))));
}
const Pe = {
  STATE_ERROR: "error",
  STATE_WAITING: "waiting",
  STATE_PREPROCESSING: "preprocessing",
  STATE_UPLOADING: "uploading",
  STATE_POSTPROCESSING: "postprocessing",
  STATE_COMPLETE: "complete",
  STATE_PAUSED: "paused"
};
function $u(i, e, t, r) {
  if (r === void 0 && (r = {}), i)
    return Pe.STATE_ERROR;
  if (e)
    return Pe.STATE_COMPLETE;
  if (t)
    return Pe.STATE_PAUSED;
  let a = Pe.STATE_WAITING;
  const o = Object.keys(r);
  for (let s = 0; s < o.length; s++) {
    const {
      progress: n
    } = r[o[s]];
    if (n.uploadStarted && !n.uploadComplete)
      return Pe.STATE_UPLOADING;
    n.preprocess && a !== Pe.STATE_UPLOADING && (a = Pe.STATE_PREPROCESSING), n.postprocess && a !== Pe.STATE_UPLOADING && a !== Pe.STATE_PREPROCESSING && (a = Pe.STATE_POSTPROCESSING);
  }
  return a;
}
function ju(i) {
  let {
    files: e,
    i18n: t,
    isAllComplete: r,
    isAllErrored: a,
    isAllPaused: o,
    inProgressNotPausedFiles: s,
    newFiles: n,
    processingFiles: l
  } = i;
  switch ($u(a, r, o, e)) {
    case "uploading":
      return t("uploadingXFiles", {
        smart_count: s.length
      });
    case "preprocessing":
    case "postprocessing":
      return t("processingXFiles", {
        smart_count: l.length
      });
    case "paused":
      return t("uploadPaused");
    case "waiting":
      return t("xFilesSelected", {
        smart_count: n.length
      });
    case "complete":
      return t("uploadComplete");
    case "error":
      return t("error");
  }
}
function Hu(i) {
  const {
    i18n: e,
    isAllComplete: t,
    hideCancelButton: r,
    maxNumberOfFiles: a,
    toggleAddFilesPanel: o,
    uppy: s
  } = i;
  let {
    allowNewUpload: n
  } = i;
  return n && a && (n = i.totalFileCount < i.maxNumberOfFiles), h("div", {
    className: "uppy-DashboardContent-bar"
  }, !t && !r ? h("button", {
    className: "uppy-DashboardContent-back",
    type: "button",
    onClick: () => s.cancelAll()
  }, e("cancel")) : h("div", null), h("div", {
    className: "uppy-DashboardContent-title",
    role: "heading",
    "aria-level": "1"
  }, h(ju, i)), n ? h("button", {
    className: "uppy-DashboardContent-addMore",
    type: "button",
    "aria-label": e("addMoreFiles"),
    title: e("addMoreFiles"),
    onClick: () => o(!0)
  }, h("svg", {
    "aria-hidden": "true",
    focusable: "false",
    className: "uppy-c-icon",
    width: "15",
    height: "15",
    viewBox: "0 0 15 15"
  }, h("path", {
    d: "M8 6.5h6a.5.5 0 0 1 .5.5v.5a.5.5 0 0 1-.5.5H8v6a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5V8h-6a.5.5 0 0 1-.5-.5V7a.5.5 0 0 1 .5-.5h6v-6A.5.5 0 0 1 7 0h.5a.5.5 0 0 1 .5.5v6z"
  })), h("span", {
    className: "uppy-DashboardContent-addMoreCaption"
  }, e("addMore"))) : h("div", null));
}
function qu(i) {
  const {
    computedMetaFields: e,
    requiredMetaFields: t,
    updateMeta: r,
    form: a,
    formState: o
  } = i, s = {
    text: "uppy-u-reset uppy-c-textInput uppy-Dashboard-FileCard-input"
  };
  return e.map((n) => {
    const l = `uppy-Dashboard-FileCard-input-${n.id}`, p = t.includes(n.id);
    return h("fieldset", {
      key: n.id,
      className: "uppy-Dashboard-FileCard-fieldset"
    }, h("label", {
      className: "uppy-Dashboard-FileCard-label",
      htmlFor: l
    }, n.name), n.render !== void 0 ? n.render({
      value: o[n.id],
      onChange: (u) => r(u, n.id),
      fieldCSSClasses: s,
      required: p,
      form: a.id
    }, h) : h("input", {
      className: s.text,
      id: l,
      form: a.id,
      type: n.type || "text",
      required: p,
      value: o[n.id],
      placeholder: n.placeholder,
      onInput: (u) => r(u.target.value, n.id),
      "data-uppy-super-focusable": !0
    }));
  });
}
function Wu(i) {
  var e;
  const {
    files: t,
    fileCardFor: r,
    toggleFileCard: a,
    saveFileCard: o,
    metaFields: s,
    requiredMetaFields: n,
    openFileEditor: l,
    i18n: p,
    i18nArray: u,
    className: d,
    canEditFile: c
  } = i, f = () => typeof s == "function" ? s(t[r]) : s, m = t[r], y = (e = f()) != null ? e : [], b = c(m), x = {};
  y.forEach((P) => {
    var D;
    x[P.id] = (D = m.meta[P.id]) != null ? D : "";
  });
  const [_, B] = $i(x), k = kp((P) => {
    P.preventDefault(), o(_, r);
  }, [o, _, r]), C = (P, D) => {
    B({
      ..._,
      [D]: P
    });
  }, g = () => {
    a(!1);
  }, [S] = $i(() => {
    const P = document.createElement("form");
    return P.setAttribute("tabindex", "-1"), P.id = wa(), P;
  });
  return Qr(() => (document.body.appendChild(S), S.addEventListener("submit", k), () => {
    S.removeEventListener("submit", k), document.body.removeChild(S);
  }), [S, k]), h("div", {
    className: _e("uppy-Dashboard-FileCard", d),
    "data-uppy-panelType": "FileCard",
    onDragOver: qe,
    onDragLeave: qe,
    onDrop: qe,
    onPaste: qe
  }, h("div", {
    className: "uppy-DashboardContent-bar"
  }, h("div", {
    className: "uppy-DashboardContent-title",
    role: "heading",
    "aria-level": "1"
  }, u("editing", {
    file: h("span", {
      className: "uppy-DashboardContent-titleFile"
    }, m.meta ? m.meta.name : m.name)
  })), h("button", {
    className: "uppy-DashboardContent-back",
    type: "button",
    form: S.id,
    title: p("finishEditingFile"),
    onClick: g
  }, p("cancel"))), h("div", {
    className: "uppy-Dashboard-FileCard-inner"
  }, h("div", {
    className: "uppy-Dashboard-FileCard-preview",
    style: {
      backgroundColor: Ea(m.type).color
    }
  }, h(zn, {
    file: m
  }), b && h("button", {
    type: "button",
    className: "uppy-u-reset uppy-c-btn uppy-Dashboard-FileCard-edit",
    onClick: (P) => {
      k(P), l(m);
    }
  }, p("editImage"))), h("div", {
    className: "uppy-Dashboard-FileCard-info"
  }, h(qu, {
    computedMetaFields: y,
    requiredMetaFields: n,
    updateMeta: C,
    form: S,
    formState: _
  })), h("div", {
    className: "uppy-Dashboard-FileCard-actions"
  }, h("button", {
    className: "uppy-u-reset uppy-c-btn uppy-c-btn-primary uppy-Dashboard-FileCard-actionsBtn",
    type: "submit",
    form: S.id
  }, p("saveChanges")), h("button", {
    className: "uppy-u-reset uppy-c-btn uppy-c-btn-link uppy-Dashboard-FileCard-actionsBtn",
    type: "button",
    onClick: g,
    form: S.id
  }, p("cancel")))));
}
const yt = "uppy-transition-slideDownUp", ss = 250;
function Ci(i) {
  let {
    children: e
  } = i;
  const [t, r] = $i(null), [a, o] = $i(""), s = Ri(), n = Ri(), l = Ri(), p = () => {
    o(`${yt}-enter`), cancelAnimationFrame(l.current), clearTimeout(n.current), n.current = void 0, l.current = requestAnimationFrame(() => {
      o(`${yt}-enter ${yt}-enter-active`), s.current = setTimeout(() => {
        o("");
      }, ss);
    });
  }, u = () => {
    o(`${yt}-leave`), cancelAnimationFrame(l.current), clearTimeout(s.current), s.current = void 0, l.current = requestAnimationFrame(() => {
      o(`${yt}-leave ${yt}-leave-active`), n.current = setTimeout(() => {
        r(null), o("");
      }, ss);
    });
  };
  return Qr(() => {
    const d = we(e)[0];
    t !== d && (d && !t ? p() : t && !d && !n.current && u(), r(d));
  }, [e, t]), Qr(() => () => {
    clearTimeout(s.current), clearTimeout(n.current), cancelAnimationFrame(l.current);
  }, []), t ? on(t, {
    className: _e(a, t.props.className)
  }) : null;
}
function wt() {
  return wt = Object.assign ? Object.assign.bind() : function(i) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t) ({}).hasOwnProperty.call(t, r) && (i[r] = t[r]);
    }
    return i;
  }, wt.apply(null, arguments);
}
const ns = 900, ls = 700, Er = 576, ps = 330;
function Vu(i) {
  const e = i.totalFileCount === 0, t = i.totalFileCount === 1, r = i.containerWidth > Er, a = i.containerHeight > ps, o = _e({
    "uppy-Dashboard": !0,
    "uppy-Dashboard--isDisabled": i.disabled,
    "uppy-Dashboard--animateOpenClose": i.animateOpenClose,
    "uppy-Dashboard--isClosing": i.isClosing,
    "uppy-Dashboard--isDraggingOver": i.isDraggingOver,
    "uppy-Dashboard--modal": !i.inline,
    "uppy-size--md": i.containerWidth > Er,
    "uppy-size--lg": i.containerWidth > ls,
    "uppy-size--xl": i.containerWidth > ns,
    "uppy-size--height-md": i.containerHeight > ps,
    // We might want to enable this in the future
    // 'uppy-size--height-lg': props.containerHeight > HEIGHT_LG,
    // 'uppy-size--height-xl': props.containerHeight > HEIGHT_XL,
    "uppy-Dashboard--isAddFilesPanelVisible": i.showAddFilesPanel,
    "uppy-Dashboard--isInnerWrapVisible": i.areInsidesReadyToBeVisible,
    // Only enable “centered single file” mode when Dashboard is tall enough
    "uppy-Dashboard--singleFile": i.singleFileFullScreen && t && a
  });
  let s = 1;
  i.containerWidth > ns ? s = 5 : i.containerWidth > ls ? s = 4 : i.containerWidth > Er && (s = 3);
  const n = i.showSelectedFiles && !e, l = i.recoveredState ? Object.keys(i.recoveredState.files).length : null, p = i.files ? Object.keys(i.files).filter((c) => i.files[c].isGhost).length : 0, u = () => p > 0 ? i.i18n("recoveredXFiles", {
    smart_count: p
  }) : i.i18n("recoveredAllFiles");
  return h("div", {
    className: o,
    "data-uppy-theme": i.theme,
    "data-uppy-num-acquirers": i.acquirers.length,
    "data-uppy-drag-drop-supported": !i.disableLocalFiles && uu(),
    "aria-hidden": i.inline ? "false" : i.isHidden,
    "aria-disabled": i.disabled,
    "aria-label": i.inline ? i.i18n("dashboardTitle") : i.i18n("dashboardWindowTitle"),
    onPaste: i.handlePaste,
    onDragOver: i.handleDragOver,
    onDragLeave: i.handleDragLeave,
    onDrop: i.handleDrop
  }, h("div", {
    "aria-hidden": "true",
    className: "uppy-Dashboard-overlay",
    tabIndex: -1,
    onClick: i.handleClickOutside
  }), h("div", {
    className: "uppy-Dashboard-inner",
    "aria-modal": !i.inline && "true",
    role: i.inline ? void 0 : "dialog",
    style: {
      width: i.inline && i.width ? i.width : "",
      height: i.inline && i.height ? i.height : ""
    }
  }, i.inline ? null : h("button", {
    className: "uppy-u-reset uppy-Dashboard-close",
    type: "button",
    "aria-label": i.i18n("closeModal"),
    title: i.i18n("closeModal"),
    onClick: i.closeModal
  }, h("span", {
    "aria-hidden": "true"
  }, "×")), h("div", {
    className: "uppy-Dashboard-innerWrap"
  }, h("div", {
    className: "uppy-Dashboard-dropFilesHereHint"
  }, i.i18n("dropHint")), n && h(Hu, i), l && h("div", {
    className: "uppy-Dashboard-serviceMsg"
  }, h("svg", {
    className: "uppy-Dashboard-serviceMsg-icon",
    "aria-hidden": "true",
    focusable: "false",
    width: "21",
    height: "16",
    viewBox: "0 0 24 19"
  }, h("g", {
    transform: "translate(0 -1)",
    fill: "none",
    fillRule: "evenodd"
  }, h("path", {
    d: "M12.857 1.43l10.234 17.056A1 1 0 0122.234 20H1.766a1 1 0 01-.857-1.514L11.143 1.429a1 1 0 011.714 0z",
    fill: "#FFD300"
  }), h("path", {
    fill: "#000",
    d: "M11 6h2l-.3 8h-1.4z"
  }), h("circle", {
    fill: "#000",
    cx: "12",
    cy: "17",
    r: "1"
  }))), h("strong", {
    className: "uppy-Dashboard-serviceMsg-title"
  }, i.i18n("sessionRestored")), h("div", {
    className: "uppy-Dashboard-serviceMsg-text"
  }, u())), n ? h(Ru, {
    id: i.id,
    i18n: i.i18n,
    uppy: i.uppy,
    files: i.files,
    resumableUploads: i.resumableUploads,
    hideRetryButton: i.hideRetryButton,
    hidePauseResumeButton: i.hidePauseResumeButton,
    hideCancelButton: i.hideCancelButton,
    showLinkToFileUploadResult: i.showLinkToFileUploadResult,
    showRemoveButtonAfterComplete: i.showRemoveButtonAfterComplete,
    metaFields: i.metaFields,
    toggleFileCard: i.toggleFileCard,
    handleRequestThumbnail: i.handleRequestThumbnail,
    handleCancelThumbnail: i.handleCancelThumbnail,
    recoveredState: i.recoveredState,
    individualCancellation: i.individualCancellation,
    openFileEditor: i.openFileEditor,
    canEditFile: i.canEditFile,
    toggleAddFilesPanel: i.toggleAddFilesPanel,
    isSingleFile: t,
    itemsPerRow: s,
    containerWidth: i.containerWidth,
    containerHeight: i.containerHeight
  }) : h(Nn, {
    i18n: i.i18n,
    i18nArray: i.i18nArray,
    acquirers: i.acquirers,
    handleInputChange: i.handleInputChange,
    maxNumberOfFiles: i.maxNumberOfFiles,
    allowedFileTypes: i.allowedFileTypes,
    showNativePhotoCameraButton: i.showNativePhotoCameraButton,
    showNativeVideoCameraButton: i.showNativeVideoCameraButton,
    nativeCameraFacingMode: i.nativeCameraFacingMode,
    showPanel: i.showPanel,
    activePickerPanel: i.activePickerPanel,
    disableLocalFiles: i.disableLocalFiles,
    fileManagerSelectionType: i.fileManagerSelectionType,
    note: i.note,
    proudlyDisplayPoweredByUppy: i.proudlyDisplayPoweredByUppy
  }), h(Ci, null, i.showAddFilesPanel ? h(Nu, wt({
    key: "AddFiles"
  }, i, {
    isSizeMD: r
  })) : null), h(Ci, null, i.fileCardFor ? h(Wu, wt({
    key: "FileCard"
  }, i)) : null), h(Ci, null, i.activePickerPanel ? h(Uu, wt({
    key: "Picker"
  }, i)) : null), h(Ci, null, i.showFileEditor ? h(Lu, wt({
    key: "Editor"
  }, i)) : null), h("div", {
    className: "uppy-Dashboard-progressindicators"
  }, i.progressindicators.map((c) => i.uppy.getPlugin(c.id).render(i.state))))));
}
const Gu = {
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
};
function E(i, e) {
  if (!{}.hasOwnProperty.call(i, e)) throw new TypeError("attempted to use private field on non-instance");
  return i;
}
var Xu = 0;
function ee(i) {
  return "__private_" + Xu++ + "_" + i;
}
const Yu = {
  version: "4.3.4"
}, Or = rs.default || rs, ds = 9, Ku = 27;
function us() {
  const i = {};
  return i.promise = new Promise((e, t) => {
    i.resolve = e, i.reject = t;
  }), i;
}
const Zu = {
  target: "body",
  metaFields: [],
  thumbnailWidth: 280,
  thumbnailType: "image/jpeg",
  waitForThumbnailsBeforeUpload: !1,
  defaultPickerIcon: iu,
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
var et = /* @__PURE__ */ ee("disabledNodes"), Te = /* @__PURE__ */ ee("generateLargeThumbnailIfSingleFile"), Ht = /* @__PURE__ */ ee("openFileEditorWhenFilesAdded"), tt = /* @__PURE__ */ ee("attachRenderFunctionToTarget"), zr = /* @__PURE__ */ ee("isTargetSupported"), Mr = /* @__PURE__ */ ee("getAcquirers"), Rr = /* @__PURE__ */ ee("getProgressIndicators"), Ae = /* @__PURE__ */ ee("getEditors"), Nr = /* @__PURE__ */ ee("addSpecifiedPluginsFromOptions"), Ur = /* @__PURE__ */ ee("autoDiscoverPlugins"), it = /* @__PURE__ */ ee("addSupportedPluginIfNoTarget"), qt = /* @__PURE__ */ ee("getStatusBarOpts"), Wt = /* @__PURE__ */ ee("getThumbnailGeneratorOpts"), Lr = /* @__PURE__ */ ee("getInformerOpts"), Vt = /* @__PURE__ */ ee("getStatusBarId"), Gt = /* @__PURE__ */ ee("getThumbnailGeneratorId"), $r = /* @__PURE__ */ ee("getInformerId");
class sa extends Ge {
  // Timeouts
  constructor(e, t) {
    var r, a, o;
    const s = (r = t?.autoOpen) != null ? r : null;
    super(e, {
      ...Zu,
      ...t,
      autoOpen: s
    }), Object.defineProperty(this, $r, {
      value: rh
    }), Object.defineProperty(this, Gt, {
      value: ih
    }), Object.defineProperty(this, Vt, {
      value: th
    }), Object.defineProperty(this, Lr, {
      value: eh
    }), Object.defineProperty(this, Wt, {
      value: Ju
    }), Object.defineProperty(this, qt, {
      value: Qu
    }), Object.defineProperty(this, et, {
      writable: !0,
      value: void 0
    }), this.modalName = `uppy-Dashboard-${wa()}`, this.superFocus = du(), this.ifFocusedOnUppyRecently = !1, this.removeTarget = (n) => {
      const p = this.getPluginState().targets.filter((u) => u.id !== n.id);
      this.setPluginState({
        targets: p
      });
    }, this.addTarget = (n) => {
      const l = n.id || n.constructor.name, p = n.title || l, u = n.type;
      if (u !== "acquirer" && u !== "progressindicator" && u !== "editor")
        return this.uppy.log("Dashboard: can only be targeted by plugins of types: acquirer, progressindicator, editor", "error"), null;
      const d = {
        id: l,
        name: p,
        type: u
      }, f = this.getPluginState().targets.slice();
      return f.push(d), this.setPluginState({
        targets: f
      }), this.el;
    }, this.hideAllPanels = () => {
      var n;
      const l = this.getPluginState(), p = {
        activePickerPanel: void 0,
        showAddFilesPanel: !1,
        activeOverlayType: null,
        fileCardFor: null,
        showFileEditor: !1
      };
      l.activePickerPanel === p.activePickerPanel && l.showAddFilesPanel === p.showAddFilesPanel && l.showFileEditor === p.showFileEditor && l.activeOverlayType === p.activeOverlayType || (this.setPluginState(p), this.uppy.emit("dashboard:close-panel", (n = l.activePickerPanel) == null ? void 0 : n.id));
    }, this.showPanel = (n) => {
      const {
        targets: l
      } = this.getPluginState(), p = l.find((u) => u.type === "acquirer" && u.id === n);
      this.setPluginState({
        activePickerPanel: p,
        activeOverlayType: "PickerPanel"
      }), this.uppy.emit("dashboard:show-panel", n);
    }, this.canEditFile = (n) => {
      const {
        targets: l
      } = this.getPluginState();
      return E(this, Ae)[Ae](l).some((u) => this.uppy.getPlugin(u.id).canEditFile(n));
    }, this.openFileEditor = (n) => {
      const {
        targets: l
      } = this.getPluginState(), p = E(this, Ae)[Ae](l);
      this.setPluginState({
        showFileEditor: !0,
        fileCardFor: n.id || null,
        activeOverlayType: "FileEditor"
      }), p.forEach((u) => {
        this.uppy.getPlugin(u.id).selectFile(n);
      });
    }, this.closeFileEditor = () => {
      const {
        metaFields: n
      } = this.getPluginState();
      n && n.length > 0 ? this.setPluginState({
        showFileEditor: !1,
        activeOverlayType: "FileCard"
      }) : this.setPluginState({
        showFileEditor: !1,
        fileCardFor: null,
        activeOverlayType: "AddFiles"
      });
    }, this.saveFileEditor = () => {
      const {
        targets: n
      } = this.getPluginState();
      E(this, Ae)[Ae](n).forEach((p) => {
        this.uppy.getPlugin(p.id).save();
      }), this.closeFileEditor();
    }, this.openModal = () => {
      const {
        promise: n,
        resolve: l
      } = us();
      if (this.savedScrollPosition = window.pageYOffset, this.savedActiveElement = document.activeElement, this.opts.disablePageScrollWhenModalOpen && document.body.classList.add("uppy-Dashboard-isFixed"), this.opts.animateOpenClose && this.getPluginState().isClosing) {
        const p = () => {
          this.setPluginState({
            isHidden: !1
          }), this.el.removeEventListener("animationend", p, !1), l();
        };
        this.el.addEventListener("animationend", p, !1);
      } else
        this.setPluginState({
          isHidden: !1
        }), l();
      return this.opts.browserBackButtonClose && this.updateBrowserHistory(), document.addEventListener("keydown", this.handleKeyDownInModal), this.uppy.emit("dashboard:modal-open"), n;
    }, this.closeModal = (n) => {
      var l;
      const p = (l = n?.manualClose) != null ? l : !0, {
        isHidden: u,
        isClosing: d
      } = this.getPluginState();
      if (u || d)
        return;
      const {
        promise: c,
        resolve: f
      } = us();
      if (this.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), this.opts.animateOpenClose) {
        this.setPluginState({
          isClosing: !0
        });
        const y = () => {
          this.setPluginState({
            isHidden: !0,
            isClosing: !1
          }), this.superFocus.cancel(), this.savedActiveElement.focus(), this.el.removeEventListener("animationend", y, !1), f();
        };
        this.el.addEventListener("animationend", y, !1);
      } else
        this.setPluginState({
          isHidden: !0
        }), this.superFocus.cancel(), this.savedActiveElement.focus(), f();
      if (document.removeEventListener("keydown", this.handleKeyDownInModal), p && this.opts.browserBackButtonClose) {
        var m;
        (m = history.state) != null && m[this.modalName] && history.back();
      }
      return this.uppy.emit("dashboard:modal-closed"), c;
    }, this.isModalOpen = () => !this.getPluginState().isHidden || !1, this.requestCloseModal = () => this.opts.onRequestCloseModal ? this.opts.onRequestCloseModal() : this.closeModal(), this.setDarkModeCapability = (n) => {
      const {
        capabilities: l
      } = this.uppy.getState();
      this.uppy.setState({
        capabilities: {
          ...l,
          darkMode: n
        }
      });
    }, this.handleSystemDarkModeChange = (n) => {
      const l = n.matches;
      this.uppy.log(`[Dashboard] Dark mode is ${l ? "on" : "off"}`), this.setDarkModeCapability(l);
    }, this.toggleFileCard = (n, l) => {
      const p = this.uppy.getFile(l);
      n ? this.uppy.emit("dashboard:file-edit-start", p) : this.uppy.emit("dashboard:file-edit-complete", p), this.setPluginState({
        fileCardFor: n ? l : null,
        activeOverlayType: n ? "FileCard" : null
      });
    }, this.toggleAddFilesPanel = (n) => {
      this.setPluginState({
        showAddFilesPanel: n,
        activeOverlayType: n ? "AddFiles" : null
      });
    }, this.addFiles = (n) => {
      const l = n.map((p) => ({
        source: this.id,
        name: p.name,
        type: p.type,
        data: p,
        meta: {
          // path of the file relative to the ancestor directory the user selected.
          // e.g. 'docs/Old Prague/airbnb.pdf'
          relativePath: p.relativePath || p.webkitRelativePath || null
        }
      }));
      try {
        this.uppy.addFiles(l);
      } catch (p) {
        this.uppy.log(p);
      }
    }, this.startListeningToResize = () => {
      this.resizeObserver = new ResizeObserver((n) => {
        const l = n[0], {
          width: p,
          height: u
        } = l.contentRect;
        this.setPluginState({
          containerWidth: p,
          containerHeight: u,
          areInsidesReadyToBeVisible: !0
        });
      }), this.resizeObserver.observe(this.el.querySelector(".uppy-Dashboard-inner")), this.makeDashboardInsidesVisibleAnywayTimeout = setTimeout(() => {
        const n = this.getPluginState(), l = !this.opts.inline && n.isHidden;
        // We might want to enable this in the future
        // if ResizeObserver hasn't yet fired,
        !n.areInsidesReadyToBeVisible && // and it's not due to the modal being closed
        !l && (this.uppy.log("[Dashboard] resize event didn’t fire on time: defaulted to mobile layout", "warning"), this.setPluginState({
          areInsidesReadyToBeVisible: !0
        }));
      }, 1e3);
    }, this.stopListeningToResize = () => {
      this.resizeObserver.disconnect(), clearTimeout(this.makeDashboardInsidesVisibleAnywayTimeout);
    }, this.recordIfFocusedOnUppyRecently = (n) => {
      this.el.contains(n.target) ? this.ifFocusedOnUppyRecently = !0 : (this.ifFocusedOnUppyRecently = !1, this.superFocus.cancel());
    }, this.disableInteractiveElements = (n) => {
      var l;
      const p = ["a[href]", "input:not([disabled])", "select:not([disabled])", "textarea:not([disabled])", "button:not([disabled])", '[role="button"]:not([disabled])'], u = (l = E(this, et)[et]) != null ? l : ai(this.el.querySelectorAll(p)).filter((d) => !d.classList.contains("uppy-Dashboard-close"));
      for (const d of u)
        d.tagName === "A" ? d.setAttribute("aria-disabled", n) : d.disabled = n;
      n ? E(this, et)[et] = u : E(this, et)[et] = null, this.dashboardIsDisabled = n;
    }, this.updateBrowserHistory = () => {
      var n;
      (n = history.state) != null && n[this.modalName] || history.pushState({
        // eslint-disable-next-line no-restricted-globals
        ...history.state,
        [this.modalName]: !0
      }, ""), window.addEventListener("popstate", this.handlePopState, !1);
    }, this.handlePopState = (n) => {
      var l;
      this.isModalOpen() && (!n.state || !n.state[this.modalName]) && this.closeModal({
        manualClose: !1
      }), !this.isModalOpen() && (l = n.state) != null && l[this.modalName] && history.back();
    }, this.handleKeyDownInModal = (n) => {
      n.keyCode === Ku && this.requestCloseModal(), n.keyCode === ds && On(n, this.getPluginState().activeOverlayType, this.el);
    }, this.handleClickOutside = () => {
      this.opts.closeModalOnClickOutside && this.requestCloseModal();
    }, this.handlePaste = (n) => {
      this.uppy.iteratePlugins((p) => {
        p.type === "acquirer" && (p.handleRootPaste == null || p.handleRootPaste(n));
      });
      const l = ai(n.clipboardData.files);
      l.length > 0 && (this.uppy.log("[Dashboard] Files pasted"), this.addFiles(l));
    }, this.handleInputChange = (n) => {
      n.preventDefault();
      const l = ai(n.currentTarget.files || []);
      l.length > 0 && (this.uppy.log("[Dashboard] Files selected through input"), this.addFiles(l));
    }, this.handleDragOver = (n) => {
      n.preventDefault(), n.stopPropagation();
      const l = () => {
        let c = !0;
        return this.uppy.iteratePlugins((f) => {
          f.canHandleRootDrop != null && f.canHandleRootDrop(n) && (c = !0);
        }), c;
      }, p = () => {
        const {
          types: c
        } = n.dataTransfer;
        return c.some((f) => f === "Files");
      }, u = l(), d = p();
      if (!u && !d || this.opts.disabled || // opts.disableLocalFiles should only be taken into account if no plugins
      // can handle the datatransfer
      this.opts.disableLocalFiles && (d || !u) || !this.uppy.getState().allowNewUpload) {
        n.dataTransfer.dropEffect = "none";
        return;
      }
      n.dataTransfer.dropEffect = "copy", this.setPluginState({
        isDraggingOver: !0
      }), this.opts.onDragOver(n);
    }, this.handleDragLeave = (n) => {
      n.preventDefault(), n.stopPropagation(), this.setPluginState({
        isDraggingOver: !1
      }), this.opts.onDragLeave(n);
    }, this.handleDrop = async (n) => {
      n.preventDefault(), n.stopPropagation(), this.setPluginState({
        isDraggingOver: !1
      }), this.uppy.iteratePlugins((d) => {
        d.type === "acquirer" && (d.handleRootDrop == null || d.handleRootDrop(n));
      });
      let l = !1;
      const p = (d) => {
        this.uppy.log(d, "error"), l || (this.uppy.info(d.message, "error"), l = !0);
      };
      this.uppy.log("[Dashboard] Processing dropped files");
      const u = await Qd(n.dataTransfer, {
        logDropError: p
      });
      u.length > 0 && (this.uppy.log("[Dashboard] Files dropped"), this.addFiles(u)), this.opts.onDrop(n);
    }, this.handleRequestThumbnail = (n) => {
      this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:request", n);
    }, this.handleCancelThumbnail = (n) => {
      this.opts.waitForThumbnailsBeforeUpload || this.uppy.emit("thumbnail:cancel", n);
    }, this.handleKeyDownInInline = (n) => {
      n.keyCode === ds && nu(n, this.getPluginState().activeOverlayType, this.el);
    }, this.handlePasteOnBody = (n) => {
      this.el.contains(document.activeElement) && this.handlePaste(n);
    }, this.handleComplete = (n) => {
      let {
        failed: l
      } = n;
      this.opts.closeAfterFinish && !(l != null && l.length) && this.requestCloseModal();
    }, this.handleCancelRestore = () => {
      this.uppy.emit("restore-canceled");
    }, Object.defineProperty(this, Te, {
      writable: !0,
      value: () => {
        if (this.opts.disableThumbnailGenerator)
          return;
        const n = 600, l = this.uppy.getFiles();
        if (l.length === 1) {
          const p = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
          p?.setOptions({
            thumbnailWidth: n
          });
          const u = {
            ...l[0],
            preview: void 0
          };
          p?.requestThumbnail(u).then(() => {
            p?.setOptions({
              thumbnailWidth: this.opts.thumbnailWidth
            });
          });
        }
      }
    }), Object.defineProperty(this, Ht, {
      writable: !0,
      value: (n) => {
        const l = n[0], {
          metaFields: p
        } = this.getPluginState(), u = p && p.length > 0, d = this.canEditFile(l);
        u && this.opts.autoOpen === "metaEditor" ? this.toggleFileCard(!0, l.id) : d && this.opts.autoOpen === "imageEditor" && this.openFileEditor(l);
      }
    }), this.initEvents = () => {
      if (this.opts.trigger && !this.opts.inline) {
        const n = ts(this.opts.trigger);
        n ? n.forEach((l) => l.addEventListener("click", this.openModal)) : this.uppy.log("Dashboard modal trigger not found. Make sure `trigger` is set in Dashboard options, unless you are planning to call `dashboard.openModal()` method yourself", "warning");
      }
      this.startListeningToResize(), document.addEventListener("paste", this.handlePasteOnBody), this.uppy.on("plugin-added", E(this, it)[it]), this.uppy.on("plugin-remove", this.removeTarget), this.uppy.on("file-added", this.hideAllPanels), this.uppy.on("dashboard:modal-closed", this.hideAllPanels), this.uppy.on("complete", this.handleComplete), this.uppy.on("files-added", E(this, Te)[Te]), this.uppy.on("file-removed", E(this, Te)[Te]), document.addEventListener("focus", this.recordIfFocusedOnUppyRecently, !0), document.addEventListener("click", this.recordIfFocusedOnUppyRecently, !0), this.opts.inline && this.el.addEventListener("keydown", this.handleKeyDownInInline), this.opts.autoOpen && this.uppy.on("files-added", E(this, Ht)[Ht]);
    }, this.removeEvents = () => {
      const n = ts(this.opts.trigger);
      !this.opts.inline && n && n.forEach((l) => l.removeEventListener("click", this.openModal)), this.stopListeningToResize(), document.removeEventListener("paste", this.handlePasteOnBody), window.removeEventListener("popstate", this.handlePopState, !1), this.uppy.off("plugin-added", E(this, it)[it]), this.uppy.off("plugin-remove", this.removeTarget), this.uppy.off("file-added", this.hideAllPanels), this.uppy.off("dashboard:modal-closed", this.hideAllPanels), this.uppy.off("complete", this.handleComplete), this.uppy.off("files-added", E(this, Te)[Te]), this.uppy.off("file-removed", E(this, Te)[Te]), document.removeEventListener("focus", this.recordIfFocusedOnUppyRecently), document.removeEventListener("click", this.recordIfFocusedOnUppyRecently), this.opts.inline && this.el.removeEventListener("keydown", this.handleKeyDownInInline), this.opts.autoOpen && this.uppy.off("files-added", E(this, Ht)[Ht]);
    }, this.superFocusOnEachUpdate = () => {
      const n = this.el.contains(document.activeElement), l = document.activeElement === document.body || document.activeElement === null, p = this.uppy.getState().info.length === 0, u = !this.opts.inline;
      // If update is connected to showing the Informer - let the screen reader calmly read it.
      p && // If we are in a modal - always superfocus without concern for other elements
      // on the page (user is unlikely to want to interact with the rest of the page)
      (u || // If we are already inside of Uppy, or
      n || // If we are not focused on anything BUT we have already, at least once, focused on uppy
      //   1. We focus when isFocusNowhere, because when the element we were focused
      //      on disappears (e.g. an overlay), - focus gets lost. If user is typing
      //      something somewhere else on the page, - focus won't be 'nowhere'.
      //   2. We only focus when focus is nowhere AND this.ifFocusedOnUppyRecently,
      //      to avoid focus jumps if we do something else on the page.
      //   [Practical check] Without '&& this.ifFocusedOnUppyRecently', in Safari, in inline mode,
      //                     when file is uploading, - navigate via tab to the checkbox,
      //                     try to press space multiple times. Focus will jump to Uppy.
      l && this.ifFocusedOnUppyRecently) ? this.superFocus(this.el, this.getPluginState().activeOverlayType) : this.superFocus.cancel();
    }, this.afterUpdate = () => {
      if (this.opts.disabled && !this.dashboardIsDisabled) {
        this.disableInteractiveElements(!0);
        return;
      }
      !this.opts.disabled && this.dashboardIsDisabled && this.disableInteractiveElements(!1), this.superFocusOnEachUpdate();
    }, this.saveFileCard = (n, l) => {
      this.uppy.setFileMeta(l, n), this.toggleFileCard(!1, l);
    }, Object.defineProperty(this, tt, {
      writable: !0,
      value: (n) => {
        const l = this.uppy.getPlugin(n.id);
        return {
          ...n,
          icon: l.icon || this.opts.defaultPickerIcon,
          render: l.render
        };
      }
    }), Object.defineProperty(this, zr, {
      writable: !0,
      value: (n) => {
        const l = this.uppy.getPlugin(n.id);
        return typeof l.isSupported != "function" ? !0 : l.isSupported();
      }
    }), Object.defineProperty(this, Mr, {
      writable: !0,
      value: Or((n) => n.filter((l) => l.type === "acquirer" && E(this, zr)[zr](l)).map(E(this, tt)[tt]))
    }), Object.defineProperty(this, Rr, {
      writable: !0,
      value: Or((n) => n.filter((l) => l.type === "progressindicator").map(E(this, tt)[tt]))
    }), Object.defineProperty(this, Ae, {
      writable: !0,
      value: Or((n) => n.filter((l) => l.type === "editor").map(E(this, tt)[tt]))
    }), this.render = (n) => {
      const l = this.getPluginState(), {
        files: p,
        capabilities: u,
        allowNewUpload: d
      } = n, {
        newFiles: c,
        uploadStartedFiles: f,
        completeFiles: m,
        erroredFiles: y,
        inProgressFiles: b,
        inProgressNotPausedFiles: x,
        processingFiles: _,
        isUploadStarted: B,
        isAllComplete: k,
        isAllPaused: C
      } = this.uppy.getObjectOfFilesPerState(), g = E(this, Mr)[Mr](l.targets), S = E(this, Rr)[Rr](l.targets), P = E(this, Ae)[Ae](l.targets);
      let D;
      return this.opts.theme === "auto" ? D = u.darkMode ? "dark" : "light" : D = this.opts.theme, ["files", "folders", "both"].indexOf(this.opts.fileManagerSelectionType) < 0 && (this.opts.fileManagerSelectionType = "files", console.warn(`Unsupported option for "fileManagerSelectionType". Using default of "${this.opts.fileManagerSelectionType}".`)), Vu({
        state: n,
        isHidden: l.isHidden,
        files: p,
        newFiles: c,
        uploadStartedFiles: f,
        completeFiles: m,
        erroredFiles: y,
        inProgressFiles: b,
        inProgressNotPausedFiles: x,
        processingFiles: _,
        isUploadStarted: B,
        isAllComplete: k,
        isAllPaused: C,
        totalFileCount: Object.keys(p).length,
        totalProgress: n.totalProgress,
        allowNewUpload: d,
        acquirers: g,
        theme: D,
        disabled: this.opts.disabled,
        disableLocalFiles: this.opts.disableLocalFiles,
        direction: this.opts.direction,
        activePickerPanel: l.activePickerPanel,
        showFileEditor: l.showFileEditor,
        saveFileEditor: this.saveFileEditor,
        closeFileEditor: this.closeFileEditor,
        disableInteractiveElements: this.disableInteractiveElements,
        animateOpenClose: this.opts.animateOpenClose,
        isClosing: l.isClosing,
        progressindicators: S,
        editors: P,
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
        recoveredState: n.recoveredState,
        metaFields: l.metaFields,
        resumableUploads: u.resumableUploads || !1,
        individualCancellation: u.individualCancellation,
        isMobileDevice: u.isMobileDevice,
        fileCardFor: l.fileCardFor,
        toggleFileCard: this.toggleFileCard,
        toggleAddFilesPanel: this.toggleAddFilesPanel,
        showAddFilesPanel: l.showAddFilesPanel,
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
        containerWidth: l.containerWidth,
        containerHeight: l.containerHeight,
        areInsidesReadyToBeVisible: l.areInsidesReadyToBeVisible,
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
        isDraggingOver: l.isDraggingOver,
        handleDragOver: this.handleDragOver,
        handleDragLeave: this.handleDragLeave,
        handleDrop: this.handleDrop
      });
    }, Object.defineProperty(this, Nr, {
      writable: !0,
      value: () => {
        const {
          plugins: n
        } = this.opts;
        n.forEach((l) => {
          const p = this.uppy.getPlugin(l);
          p ? p.mount(this, p) : this.uppy.log(`[Uppy] Dashboard could not find plugin '${l}', make sure to uppy.use() the plugins you are specifying`, "warning");
        });
      }
    }), Object.defineProperty(this, Ur, {
      writable: !0,
      value: () => {
        this.uppy.iteratePlugins(E(this, it)[it]);
      }
    }), Object.defineProperty(this, it, {
      writable: !0,
      value: (n) => {
        var l;
        const p = ["acquirer", "editor"];
        n && !((l = n.opts) != null && l.target) && p.includes(n.type) && (this.getPluginState().targets.some((d) => n.id === d.id) || n.mount(this, n));
      }
    }), this.install = () => {
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
      const {
        inline: n,
        closeAfterFinish: l
      } = this.opts;
      if (n && l)
        throw new Error("[Dashboard] `closeAfterFinish: true` cannot be used on an inline Dashboard, because an inline Dashboard cannot be closed at all. Either set `inline: false`, or disable the `closeAfterFinish` option.");
      const {
        allowMultipleUploads: p,
        allowMultipleUploadBatches: u
      } = this.uppy.opts;
      (p || u) && l && this.uppy.log("[Dashboard] When using `closeAfterFinish`, we recommended setting the `allowMultipleUploadBatches` option to `false` in the Uppy constructor. See https://uppy.io/docs/uppy/#allowMultipleUploads-true", "warning");
      const {
        target: d
      } = this.opts;
      d && this.mount(d, this), this.opts.disableStatusBar || this.uppy.use(yn, {
        id: E(this, Vt)[Vt](),
        target: this,
        ...E(this, qt)[qt]()
      }), this.opts.disableInformer || this.uppy.use(vn, {
        id: E(this, $r)[$r](),
        target: this,
        ...E(this, Lr)[Lr]()
      }), this.opts.disableThumbnailGenerator || this.uppy.use(In, {
        id: E(this, Gt)[Gt](),
        ...E(this, Wt)[Wt]()
      }), this.darkModeMediaQuery = typeof window < "u" && window.matchMedia ? window.matchMedia("(prefers-color-scheme: dark)") : null;
      const c = this.darkModeMediaQuery ? this.darkModeMediaQuery.matches : !1;
      if (this.uppy.log(`[Dashboard] Dark mode is ${c ? "on" : "off"}`), this.setDarkModeCapability(c), this.opts.theme === "auto") {
        var f;
        (f = this.darkModeMediaQuery) == null || f.addListener(this.handleSystemDarkModeChange);
      }
      E(this, Nr)[Nr](), E(this, Ur)[Ur](), this.initEvents();
    }, this.uninstall = () => {
      if (!this.opts.disableInformer) {
        const p = this.uppy.getPlugin(`${this.id}:Informer`);
        p && this.uppy.removePlugin(p);
      }
      if (!this.opts.disableStatusBar) {
        const p = this.uppy.getPlugin(`${this.id}:StatusBar`);
        p && this.uppy.removePlugin(p);
      }
      if (!this.opts.disableThumbnailGenerator) {
        const p = this.uppy.getPlugin(`${this.id}:ThumbnailGenerator`);
        p && this.uppy.removePlugin(p);
      }
      const {
        plugins: n
      } = this.opts;
      if (n.forEach((p) => {
        const u = this.uppy.getPlugin(p);
        u && u.unmount();
      }), this.opts.theme === "auto") {
        var l;
        (l = this.darkModeMediaQuery) == null || l.removeListener(this.handleSystemDarkModeChange);
      }
      this.opts.disablePageScrollWhenModalOpen && document.body.classList.remove("uppy-Dashboard-isFixed"), this.unmount(), this.removeEvents();
    }, this.id = this.opts.id || "Dashboard", this.title = "Dashboard", this.type = "orchestrator", this.defaultLocale = Gu, this.opts.doneButtonHandler === void 0 && (this.opts.doneButtonHandler = () => {
      this.uppy.clear(), this.requestCloseModal();
    }), (o = (a = this.opts).onRequestCloseModal) != null || (a.onRequestCloseModal = () => this.closeModal()), this.i18nInit();
  }
  setOptions(e) {
    var t, r;
    super.setOptions(e), (t = this.uppy.getPlugin(E(this, Vt)[Vt]())) == null || t.setOptions(E(this, qt)[qt]()), (r = this.uppy.getPlugin(E(this, Gt)[Gt]())) == null || r.setOptions(E(this, Wt)[Wt]());
  }
}
function Qu() {
  const {
    hideUploadButton: i,
    hideRetryButton: e,
    hidePauseResumeButton: t,
    hideCancelButton: r,
    showProgressDetails: a,
    hideProgressAfterFinish: o,
    locale: s,
    doneButtonHandler: n
  } = this.opts;
  return {
    hideUploadButton: i,
    hideRetryButton: e,
    hidePauseResumeButton: t,
    hideCancelButton: r,
    showProgressDetails: a,
    hideAfterFinish: o,
    locale: s,
    doneButtonHandler: n
  };
}
function Ju() {
  const {
    thumbnailWidth: i,
    thumbnailHeight: e,
    thumbnailType: t,
    waitForThumbnailsBeforeUpload: r
  } = this.opts;
  return {
    thumbnailWidth: i,
    thumbnailHeight: e,
    thumbnailType: t,
    waitForThumbnailsBeforeUpload: r,
    // If we don't block on thumbnails, we can lazily generate them
    lazy: !r
  };
}
function eh() {
  return {
    // currently no options
  };
}
function th() {
  return `${this.id}:StatusBar`;
}
function ih() {
  return `${this.id}:ThumbnailGenerator`;
}
function rh() {
  return `${this.id}:Informer`;
}
sa.VERSION = Yu.version;
function I(i, e) {
  if (!{}.hasOwnProperty.call(i, e)) throw new TypeError("attempted to use private field on non-instance");
  return i;
}
var ah = 0;
function ne(i) {
  return "__private_" + ah++ + "_" + i;
}
function oh(i) {
  return new Error("Cancelled", {
    cause: i
  });
}
function hs(i) {
  if (i != null) {
    var e;
    const t = () => this.abort(i.reason);
    i.addEventListener("abort", t, {
      once: !0
    });
    const r = () => {
      i.removeEventListener("abort", t);
    };
    (e = this.then) == null || e.call(this, r, r);
  }
  return this;
}
var de = /* @__PURE__ */ ne("activeRequests"), re = /* @__PURE__ */ ne("queuedHandlers"), le = /* @__PURE__ */ ne("paused"), rt = /* @__PURE__ */ ne("pauseTimer"), te = /* @__PURE__ */ ne("downLimit"), at = /* @__PURE__ */ ne("upperLimit"), Ee = /* @__PURE__ */ ne("rateLimitingTimer"), oi = /* @__PURE__ */ ne("call"), Ue = /* @__PURE__ */ ne("queueNext"), na = /* @__PURE__ */ ne("next"), jr = /* @__PURE__ */ ne("queue"), la = /* @__PURE__ */ ne("dequeue"), Hr = /* @__PURE__ */ ne("resume"), ot = /* @__PURE__ */ ne("increaseLimit");
class sh {
  constructor(e) {
    Object.defineProperty(this, la, {
      value: uh
    }), Object.defineProperty(this, jr, {
      value: dh
    }), Object.defineProperty(this, na, {
      value: ph
    }), Object.defineProperty(this, Ue, {
      value: lh
    }), Object.defineProperty(this, oi, {
      value: nh
    }), Object.defineProperty(this, de, {
      writable: !0,
      value: 0
    }), Object.defineProperty(this, re, {
      writable: !0,
      value: []
    }), Object.defineProperty(this, le, {
      writable: !0,
      value: !1
    }), Object.defineProperty(this, rt, {
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, te, {
      writable: !0,
      value: 1
    }), Object.defineProperty(this, at, {
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, Ee, {
      writable: !0,
      value: void 0
    }), Object.defineProperty(this, Hr, {
      writable: !0,
      value: () => this.resume()
    }), Object.defineProperty(this, ot, {
      writable: !0,
      value: () => {
        if (I(this, le)[le]) {
          I(this, Ee)[Ee] = setTimeout(I(this, ot)[ot], 0);
          return;
        }
        I(this, te)[te] = this.limit, this.limit = Math.ceil((I(this, at)[at] + I(this, te)[te]) / 2);
        for (let t = I(this, te)[te]; t <= this.limit; t++)
          I(this, Ue)[Ue]();
        I(this, at)[at] - I(this, te)[te] > 3 ? I(this, Ee)[Ee] = setTimeout(I(this, ot)[ot], 2e3) : I(this, te)[te] = Math.floor(I(this, te)[te] / 2);
      }
    }), typeof e != "number" || e === 0 ? this.limit = 1 / 0 : this.limit = e;
  }
  run(e, t) {
    return !I(this, le)[le] && I(this, de)[de] < this.limit ? I(this, oi)[oi](e) : I(this, jr)[jr](e, t);
  }
  wrapSyncFunction(e, t) {
    var r = this;
    return function() {
      for (var a = arguments.length, o = new Array(a), s = 0; s < a; s++)
        o[s] = arguments[s];
      const n = r.run(() => (e(...o), queueMicrotask(() => n.done()), () => {
      }), t);
      return {
        abortOn: hs,
        abort() {
          n.abort();
        }
      };
    };
  }
  wrapPromiseFunction(e, t) {
    var r = this;
    return function() {
      for (var a = arguments.length, o = new Array(a), s = 0; s < a; s++)
        o[s] = arguments[s];
      let n;
      const l = new Promise((p, u) => {
        n = r.run(() => {
          let d, c;
          try {
            c = Promise.resolve(e(...o));
          } catch (f) {
            c = Promise.reject(f);
          }
          return c.then((f) => {
            d ? u(d) : (n.done(), p(f));
          }, (f) => {
            d ? u(d) : (n.done(), u(f));
          }), (f) => {
            d = oh(f);
          };
        }, t);
      });
      return l.abort = (p) => {
        n.abort(p);
      }, l.abortOn = hs, l;
    };
  }
  resume() {
    I(this, le)[le] = !1, clearTimeout(I(this, rt)[rt]);
    for (let e = 0; e < this.limit; e++)
      I(this, Ue)[Ue]();
  }
  /**
   * Freezes the queue for a while or indefinitely.
   *
   * @param {number | null } [duration] Duration for the pause to happen, in milliseconds.
   *                                    If omitted, the queue won't resume automatically.
   */
  pause(e) {
    e === void 0 && (e = null), I(this, le)[le] = !0, clearTimeout(I(this, rt)[rt]), e != null && (I(this, rt)[rt] = setTimeout(I(this, Hr)[Hr], e));
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
    clearTimeout(I(this, Ee)[Ee]), this.pause(e), this.limit > 1 && Number.isFinite(this.limit) && (I(this, at)[at] = this.limit - 1, this.limit = I(this, te)[te], I(this, Ee)[Ee] = setTimeout(I(this, ot)[ot], e));
  }
  get isPaused() {
    return I(this, le)[le];
  }
}
function nh(i) {
  I(this, de)[de] += 1;
  let e = !1, t;
  try {
    t = i();
  } catch (r) {
    throw I(this, de)[de] -= 1, r;
  }
  return {
    abort: (r) => {
      e || (e = !0, I(this, de)[de] -= 1, t?.(r), I(this, Ue)[Ue]());
    },
    done: () => {
      e || (e = !0, I(this, de)[de] -= 1, I(this, Ue)[Ue]());
    }
  };
}
function lh() {
  queueMicrotask(() => I(this, na)[na]());
}
function ph() {
  if (I(this, le)[le] || I(this, de)[de] >= this.limit || I(this, re)[re].length === 0)
    return;
  const i = I(this, re)[re].shift();
  if (i == null)
    throw new Error("Invariant violation: next is null");
  const e = I(this, oi)[oi](i.fn);
  i.abort = e.abort, i.done = e.done;
}
function dh(i, e) {
  const t = {
    fn: i,
    priority: e?.priority || 0,
    abort: () => {
      I(this, la)[la](t);
    },
    done: () => {
      throw new Error("Cannot mark a queued request as done: this indicates a bug");
    }
  }, r = I(this, re)[re].findIndex((a) => t.priority > a.priority);
  return r === -1 ? I(this, re)[re].push(t) : I(this, re)[re].splice(r, 0, t), t;
}
function uh(i) {
  const e = I(this, re)[re].indexOf(i);
  e !== -1 && I(this, re)[re].splice(e, 1);
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
function cs(i, e) {
  var t = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(i);
    e && (r = r.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function Ti(i) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? cs(Object(t), !0).forEach(function(r) {
      fh(i, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(t)) : cs(Object(t)).forEach(function(r) {
      Object.defineProperty(i, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return i;
}
function hh(i, e) {
  if (!(i instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function fs(i, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(i, Un(r.key), r);
  }
}
function ch(i, e, t) {
  return fs(i.prototype, e), fs(i, t), Object.defineProperty(i, "prototype", {
    writable: !1
  }), i;
}
function fh(i, e, t) {
  return e = Un(e), e in i ? Object.defineProperty(i, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[e] = t, i;
}
function Hi() {
  return Hi = Object.assign ? Object.assign.bind() : function(i) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e];
      for (var r in t)
        Object.prototype.hasOwnProperty.call(t, r) && (i[r] = t[r]);
    }
    return i;
  }, Hi.apply(this, arguments);
}
function mh(i, e) {
  if (typeof i != "object" || i === null) return i;
  var t = i[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(i, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(i);
}
function Un(i) {
  var e = mh(i, "string");
  return typeof e == "symbol" ? e : String(e);
}
var Ln = { exports: {} };
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
    }(), o = e.BlobBuilder || e.WebKitBlobBuilder || e.MozBlobBuilder || e.MSBlobBuilder, s = /^data:((.*?)(;charset=.*?)?)(;base64)?,/, n = (r || o) && e.atob && e.ArrayBuffer && e.Uint8Array && function(l) {
      var p, u, d, c, f, m, y, b, x;
      if (p = l.match(s), !p)
        throw new Error("invalid data URI");
      for (u = p[2] ? p[1] : "text/plain" + (p[3] || ";charset=US-ASCII"), d = !!p[4], c = l.slice(p[0].length), d ? f = atob(c) : f = decodeURIComponent(c), m = new ArrayBuffer(f.length), y = new Uint8Array(m), b = 0; b < f.length; b += 1)
        y[b] = f.charCodeAt(b);
      return r ? new Blob([a ? y : m], {
        type: u
      }) : (x = new o(), x.append(m), x.getBlob(u));
    };
    e.HTMLCanvasElement && !t.toBlob && (t.mozGetAsFile ? t.toBlob = function(l, p, u) {
      var d = this;
      setTimeout(function() {
        u && t.toDataURL && n ? l(n(d.toDataURL(p, u))) : l(d.mozGetAsFile("blob", p));
      });
    } : t.toDataURL && n && (t.msToBlob ? t.toBlob = function(l, p, u) {
      var d = this;
      setTimeout(function() {
        (p && p !== "image/png" || u) && t.toDataURL && n ? l(n(d.toDataURL(p, u))) : l(d.msToBlob(p));
      });
    } : t.toBlob = function(l, p, u) {
      var d = this;
      setTimeout(function() {
        l(n(d.toDataURL(p, u)));
      });
    })), i.exports ? i.exports = n : e.dataURLtoBlob = n;
  }(window);
})(Ln);
var ms = Ln.exports, gh = function(e) {
  return typeof Blob > "u" ? !1 : e instanceof Blob || Object.prototype.toString.call(e) === "[object Blob]";
}, gs = {
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
}, yh = typeof window < "u" && typeof window.document < "u", Xe = yh ? window : {}, qi = function(e) {
  return e > 0 && e < 1 / 0;
}, bh = Array.prototype.slice;
function Oa(i) {
  return Array.from ? Array.from(i) : bh.call(i);
}
var vh = /^image\/.+$/;
function pa(i) {
  return vh.test(i);
}
function wh(i) {
  var e = pa(i) ? i.substr(6) : "";
  return e === "jpeg" && (e = "jpg"), ".".concat(e);
}
var $n = String.fromCharCode;
function xh(i, e, t) {
  var r = "", a;
  for (t += e, a = e; a < t; a += 1)
    r += $n(i.getUint8(a));
  return r;
}
var _h = Xe.btoa;
function ys(i, e) {
  for (var t = [], r = 8192, a = new Uint8Array(i); a.length > 0; )
    t.push($n.apply(null, Oa(a.subarray(0, r)))), a = a.subarray(r);
  return "data:".concat(e, ";base64,").concat(_h(t.join("")));
}
function Ph(i) {
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
      var l = a + 4, p = a + 10;
      if (xh(e, l, 4) === "Exif") {
        var u = e.getUint16(p);
        if (r = u === 18761, (r || u === 19789) && e.getUint16(p + 2, r) === 42) {
          var d = e.getUint32(p + 4, r);
          d >= 8 && (o = p + d);
        }
      }
    }
    if (o) {
      var c = e.getUint16(o, r), f, m;
      for (m = 0; m < c; m += 1)
        if (f = o + m * 12 + 2, e.getUint16(f, r) === 274) {
          f += 8, t = e.getUint16(f, r), e.setUint16(f, 1, r);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function Sh(i) {
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
var Dh = /\.\d*(?:0|9){12}\d*$/;
function bs(i) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return Dh.test(i) ? Math.round(i * e) / e : i;
}
function Xt(i) {
  var e = i.aspectRatio, t = i.height, r = i.width, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "none", o = qi(r), s = qi(t);
  if (o && s) {
    var n = t * e;
    (a === "contain" || a === "none") && n > r || a === "cover" && n < r ? t = r / e : r = t * e;
  } else o ? t = r / e : s && (r = t * e);
  return {
    width: r,
    height: t
  };
}
function kh(i) {
  for (var e = Oa(new Uint8Array(i)), t = e.length, r = [], a = 0; a + 3 < t; ) {
    var o = e[a], s = e[a + 1];
    if (o === 255 && s === 218)
      break;
    if (o === 255 && s === 216)
      a += 2;
    else {
      var n = e[a + 2] * 256 + e[a + 3], l = a + n + 2, p = e.slice(a, l);
      r.push(p), a = l;
    }
  }
  return r.reduce(function(u, d) {
    return d[0] === 255 && d[1] === 225 ? u.concat(d) : u;
  }, []);
}
function Bh(i, e) {
  var t = Oa(new Uint8Array(i));
  if (t[2] !== 255 || t[3] !== 224)
    return i;
  var r = t[4] * 256 + t[5], a = [255, 216].concat(e, t.slice(4 + r));
  return new Uint8Array(a);
}
var Ih = Xe.ArrayBuffer, qr = Xe.FileReader, st = Xe.URL || Xe.webkitURL, Fh = /\.\w+$/, Ch = Xe.Compressor, Th = /* @__PURE__ */ function() {
  function i(e, t) {
    hh(this, i), this.file = e, this.exif = [], this.image = new Image(), this.options = Ti(Ti({}, gs), t), this.aborted = !1, this.result = null, this.init();
  }
  return ch(i, [{
    key: "init",
    value: function() {
      var t = this, r = this.file, a = this.options;
      if (!gh(r)) {
        this.fail(new Error("The first argument must be a File or Blob object."));
        return;
      }
      var o = r.type;
      if (!pa(o)) {
        this.fail(new Error("The first argument must be an image File or Blob object."));
        return;
      }
      if (!st || !qr) {
        this.fail(new Error("The current browser does not support image compression."));
        return;
      }
      Ih || (a.checkOrientation = !1, a.retainExif = !1);
      var s = o === "image/jpeg", n = s && a.checkOrientation, l = s && a.retainExif;
      if (st && !n && !l)
        this.load({
          url: st.createObjectURL(r)
        });
      else {
        var p = new qr();
        this.reader = p, p.onload = function(u) {
          var d = u.target, c = d.result, f = {}, m = 1;
          n && (m = Ph(c), m > 1 && Hi(f, Sh(m))), l && (t.exif = kh(c)), n || l ? !st || m > 1 ? f.url = ys(c, o) : f.url = st.createObjectURL(r) : f.url = c, t.load(f);
        }, p.onabort = function() {
          t.fail(new Error("Aborted to read the image with FileReader."));
        }, p.onerror = function() {
          t.fail(new Error("Failed to read the image with FileReader."));
        }, p.onloadend = function() {
          t.reader = null;
        }, n || l ? p.readAsArrayBuffer(r) : p.readAsDataURL(r);
      }
    }
  }, {
    key: "load",
    value: function(t) {
      var r = this, a = this.file, o = this.image;
      o.onload = function() {
        r.draw(Ti(Ti({}, t), {}, {
          naturalWidth: o.naturalWidth,
          naturalHeight: o.naturalHeight
        }));
      }, o.onabort = function() {
        r.fail(new Error("Aborted to load the image."));
      }, o.onerror = function() {
        r.fail(new Error("Failed to load the image."));
      }, Xe.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(Xe.navigator.userAgent) && (o.crossOrigin = "anonymous"), o.alt = a.name, o.src = t.url;
    }
  }, {
    key: "draw",
    value: function(t) {
      var r = this, a = t.naturalWidth, o = t.naturalHeight, s = t.rotate, n = s === void 0 ? 0 : s, l = t.scaleX, p = l === void 0 ? 1 : l, u = t.scaleY, d = u === void 0 ? 1 : u, c = this.file, f = this.image, m = this.options, y = document.createElement("canvas"), b = y.getContext("2d"), x = Math.abs(n) % 180 === 90, _ = (m.resize === "contain" || m.resize === "cover") && qi(m.width) && qi(m.height), B = Math.max(m.maxWidth, 0) || 1 / 0, k = Math.max(m.maxHeight, 0) || 1 / 0, C = Math.max(m.minWidth, 0) || 0, g = Math.max(m.minHeight, 0) || 0, S = a / o, P = m.width, D = m.height;
      if (x) {
        var L = [k, B];
        B = L[0], k = L[1];
        var O = [g, C];
        C = O[0], g = O[1];
        var M = [D, P];
        P = M[0], D = M[1];
      }
      _ && (S = P / D);
      var A = Xt({
        aspectRatio: S,
        width: B,
        height: k
      }, "contain");
      B = A.width, k = A.height;
      var N = Xt({
        aspectRatio: S,
        width: C,
        height: g
      }, "cover");
      if (C = N.width, g = N.height, _) {
        var U = Xt({
          aspectRatio: S,
          width: P,
          height: D
        }, m.resize);
        P = U.width, D = U.height;
      } else {
        var Z = Xt({
          aspectRatio: S,
          width: P,
          height: D
        }), fe = Z.width;
        P = fe === void 0 ? a : fe;
        var Fe = Z.height;
        D = Fe === void 0 ? o : Fe;
      }
      P = Math.floor(bs(Math.min(Math.max(P, C), B))), D = Math.floor(bs(Math.min(Math.max(D, g), k)));
      var $e = -P / 2, Ye = -D / 2, Ke = P, Ze = D, je = [];
      if (_) {
        var mt = 0, Qe = 0, gi = a, yi = o, Xi = Xt({
          aspectRatio: S,
          width: a,
          height: o
        }, {
          contain: "cover",
          cover: "contain"
        }[m.resize]);
        gi = Xi.width, yi = Xi.height, mt = (a - gi) / 2, Qe = (o - yi) / 2, je.push(mt, Qe, gi, yi);
      }
      if (je.push($e, Ye, Ke, Ze), x) {
        var Je = [D, P];
        P = Je[0], D = Je[1];
      }
      y.width = P, y.height = D, pa(m.mimeType) || (m.mimeType = c.type);
      var $a = "transparent";
      c.size > m.convertSize && m.convertTypes.indexOf(m.mimeType) >= 0 && (m.mimeType = "image/jpeg");
      var ja = m.mimeType === "image/jpeg";
      if (ja && ($a = "#fff"), b.fillStyle = $a, b.fillRect(0, 0, P, D), m.beforeDraw && m.beforeDraw.call(this, b, y), !this.aborted && (b.save(), b.translate(P / 2, D / 2), b.rotate(n * Math.PI / 180), b.scale(p, d), b.drawImage.apply(b, [f].concat(je)), b.restore(), m.drew && m.drew.call(this, b, y), !this.aborted)) {
        var Ha = function(It) {
          if (!r.aborted) {
            var qa = function(Ft) {
              return r.done({
                naturalWidth: a,
                naturalHeight: o,
                result: Ft
              });
            };
            if (It && ja && m.retainExif && r.exif && r.exif.length > 0) {
              var Wa = function(Ft) {
                return qa(ms(ys(Bh(Ft, r.exif), m.mimeType)));
              };
              if (It.arrayBuffer)
                It.arrayBuffer().then(Wa).catch(function() {
                  r.fail(new Error("Failed to read the compressed image with Blob.arrayBuffer()."));
                });
              else {
                var gt = new qr();
                r.reader = gt, gt.onload = function(Yi) {
                  var Ft = Yi.target;
                  Wa(Ft.result);
                }, gt.onabort = function() {
                  r.fail(new Error("Aborted to read the compressed image with FileReader."));
                }, gt.onerror = function() {
                  r.fail(new Error("Failed to read the compressed image with FileReader."));
                }, gt.onloadend = function() {
                  r.reader = null;
                }, gt.readAsArrayBuffer(It);
              }
            } else
              qa(It);
          }
        };
        y.toBlob ? y.toBlob(Ha, m.mimeType, m.quality) : Ha(ms(y.toDataURL(m.mimeType, m.quality)));
      }
    }
  }, {
    key: "done",
    value: function(t) {
      var r = t.naturalWidth, a = t.naturalHeight, o = t.result, s = this.file, n = this.image, l = this.options;
      if (st && n.src.indexOf("blob:") === 0 && st.revokeObjectURL(n.src), o)
        if (l.strict && !l.retainExif && o.size > s.size && l.mimeType === s.type && !(l.width > r || l.height > a || l.minWidth > r || l.minHeight > a || l.maxWidth < r || l.maxHeight < a))
          o = s;
        else {
          var p = /* @__PURE__ */ new Date();
          o.lastModified = p.getTime(), o.lastModifiedDate = p, o.name = s.name, o.name && o.type !== s.type && (o.name = o.name.replace(Fh, wh(o.type)));
        }
      else
        o = s;
      this.result = o, l.success && l.success.call(this, o);
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
      return window.Compressor = Ch, i;
    }
    /**
     * Change the default options.
     * @param {Object} options - The new default options.
     */
  }, {
    key: "setDefaults",
    value: function(t) {
      Hi(gs, t);
    }
  }]), i;
}();
const Ah = {
  strings: {
    // Shown in the Status Bar
    compressingImages: "Compressing images...",
    compressedX: "Saved %{size} by compressing images"
  }
};
function vs(i, e) {
  if (!{}.hasOwnProperty.call(i, e)) throw new TypeError("attempted to use private field on non-instance");
  return i;
}
var Eh = 0;
function Oh(i) {
  return "__private_" + Eh++ + "_" + i;
}
const zh = {
  quality: 0.6,
  limit: 10
};
var Yt = /* @__PURE__ */ Oh("RateLimitedQueue");
class Mh extends fn {
  constructor(e, t) {
    super(e, {
      ...zh,
      ...t
    }), Object.defineProperty(this, Yt, {
      writable: !0,
      value: void 0
    }), this.id = this.opts.id || "Compressor", this.type = "modifier", this.defaultLocale = Ah, vs(this, Yt)[Yt] = new sh(this.opts.limit), this.i18nInit(), this.prepareUpload = this.prepareUpload.bind(this), this.compress = this.compress.bind(this);
  }
  compress(e) {
    return new Promise((t, r) => {
      new Th(e, {
        ...this.opts,
        success: t,
        error: r
      });
    });
  }
  async prepareUpload(e) {
    let t = 0;
    const r = [], a = vs(this, Yt)[Yt].wrapPromiseFunction(async (s) => {
      try {
        const n = await this.compress(s.data), l = s.data.size - n.size;
        this.uppy.log(`[Image Compressor] Image ${s.id} compressed by ${Le(l)}`), t += l;
        const {
          name: p,
          type: u,
          size: d
        } = n, c = Ui(p), m = `${Ui(s.meta.name).name}.${c.extension}`;
        this.uppy.setFileState(s.id, {
          ...p && {
            name: p
          },
          ...c.extension && {
            extension: c.extension
          },
          ...u && {
            type: u
          },
          ...d && {
            size: d
          },
          data: n,
          meta: {
            ...s.meta,
            type: u,
            name: m
          }
        }), r.push(s);
      } catch (n) {
        this.uppy.log(`[Image Compressor] Failed to compress ${s.id}:`, "warning"), this.uppy.log(n, "warning");
      }
    }), o = e.map((s) => {
      var n;
      const l = this.uppy.getFile(s);
      return this.uppy.emit("preprocess-progress", l, {
        mode: "indeterminate",
        message: this.i18n("compressingImages")
      }), l.isRemote || (l.data.type || (l.data = l.data.slice(0, l.data.size, l.type)), !((n = l.type) != null && n.startsWith("image/"))) ? Promise.resolve() : a(l);
    });
    await Promise.all(o), this.uppy.emit("compressor:complete", r), t > 1024 && this.uppy.info(this.i18n("compressedX", {
      size: Le(t)
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
/*!
 * Cropper.js v1.6.2
 * https://fengyuanchen.github.io/cropperjs
 *
 * Copyright 2015-present Chen Fengyuan
 * Released under the MIT license
 *
 * Date: 2024-04-21T07:43:05.335Z
 */
function ws(i, e) {
  var t = Object.keys(i);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(i);
    e && (r = r.filter(function(a) {
      return Object.getOwnPropertyDescriptor(i, a).enumerable;
    })), t.push.apply(t, r);
  }
  return t;
}
function jn(i) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] != null ? arguments[e] : {};
    e % 2 ? ws(Object(t), !0).forEach(function(r) {
      Lh(i, r, t[r]);
    }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(i, Object.getOwnPropertyDescriptors(t)) : ws(Object(t)).forEach(function(r) {
      Object.defineProperty(i, r, Object.getOwnPropertyDescriptor(t, r));
    });
  }
  return i;
}
function Rh(i, e) {
  if (typeof i != "object" || !i) return i;
  var t = i[Symbol.toPrimitive];
  if (t !== void 0) {
    var r = t.call(i, e || "default");
    if (typeof r != "object") return r;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return (e === "string" ? String : Number)(i);
}
function Hn(i) {
  var e = Rh(i, "string");
  return typeof e == "symbol" ? e : e + "";
}
function da(i) {
  "@babel/helpers - typeof";
  return da = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
    return typeof e;
  } : function(e) {
    return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, da(i);
}
function Nh(i, e) {
  if (!(i instanceof e))
    throw new TypeError("Cannot call a class as a function");
}
function xs(i, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || !1, r.configurable = !0, "value" in r && (r.writable = !0), Object.defineProperty(i, Hn(r.key), r);
  }
}
function Uh(i, e, t) {
  return xs(i.prototype, e), xs(i, t), Object.defineProperty(i, "prototype", {
    writable: !1
  }), i;
}
function Lh(i, e, t) {
  return e = Hn(e), e in i ? Object.defineProperty(i, e, {
    value: t,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : i[e] = t, i;
}
function qn(i) {
  return $h(i) || jh(i) || Hh(i) || qh();
}
function $h(i) {
  if (Array.isArray(i)) return ua(i);
}
function jh(i) {
  if (typeof Symbol < "u" && i[Symbol.iterator] != null || i["@@iterator"] != null) return Array.from(i);
}
function Hh(i, e) {
  if (i) {
    if (typeof i == "string") return ua(i, e);
    var t = Object.prototype.toString.call(i).slice(8, -1);
    if (t === "Object" && i.constructor && (t = i.constructor.name), t === "Map" || t === "Set") return Array.from(i);
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) return ua(i, e);
  }
}
function ua(i, e) {
  (e == null || e > i.length) && (e = i.length);
  for (var t = 0, r = new Array(e); t < e; t++) r[t] = i[t];
  return r;
}
function qh() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
var Gi = typeof window < "u" && typeof window.document < "u", Ie = Gi ? window : {}, za = Gi && Ie.document.documentElement ? "ontouchstart" in Ie.document.documentElement : !1, Ma = Gi ? "PointerEvent" in Ie : !1, $ = "cropper", Ra = "all", Wn = "crop", Vn = "move", Gn = "zoom", nt = "e", lt = "w", bt = "s", He = "n", Kt = "ne", Zt = "nw", Qt = "se", Jt = "sw", ha = "".concat($, "-crop"), _s = "".concat($, "-disabled"), se = "".concat($, "-hidden"), Ps = "".concat($, "-hide"), Wh = "".concat($, "-invisible"), Wi = "".concat($, "-modal"), ca = "".concat($, "-move"), hi = "".concat($, "Action"), Ai = "".concat($, "Preview"), Na = "crop", Xn = "move", Yn = "none", fa = "crop", ma = "cropend", ga = "cropmove", ya = "cropstart", Ss = "dblclick", Vh = za ? "touchstart" : "mousedown", Gh = za ? "touchmove" : "mousemove", Xh = za ? "touchend touchcancel" : "mouseup", Ds = Ma ? "pointerdown" : Vh, ks = Ma ? "pointermove" : Gh, Bs = Ma ? "pointerup pointercancel" : Xh, Is = "ready", Fs = "resize", Cs = "wheel", ba = "zoom", Ts = "image/jpeg", Yh = /^e|w|s|n|se|sw|ne|nw|all|crop|move|zoom$/, Kh = /^data:/, Zh = /^data:image\/jpeg;base64,/, Qh = /^img|canvas$/i, Kn = 200, Zn = 100, As = {
  // Define the view mode of the cropper
  viewMode: 0,
  // 0, 1, 2, 3
  // Define the dragging mode of the cropper
  dragMode: Na,
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
  minContainerWidth: Kn,
  minContainerHeight: Zn,
  // Shortcuts of events
  ready: null,
  cropstart: null,
  cropmove: null,
  cropend: null,
  crop: null,
  zoom: null
}, Jh = '<div class="cropper-container" touch-action="none"><div class="cropper-wrap-box"><div class="cropper-canvas"></div></div><div class="cropper-drag-box"></div><div class="cropper-crop-box"><span class="cropper-view-box"></span><span class="cropper-dashed dashed-h"></span><span class="cropper-dashed dashed-v"></span><span class="cropper-center"></span><span class="cropper-face"></span><span class="cropper-line line-e" data-cropper-action="e"></span><span class="cropper-line line-n" data-cropper-action="n"></span><span class="cropper-line line-w" data-cropper-action="w"></span><span class="cropper-line line-s" data-cropper-action="s"></span><span class="cropper-point point-e" data-cropper-action="e"></span><span class="cropper-point point-n" data-cropper-action="n"></span><span class="cropper-point point-w" data-cropper-action="w"></span><span class="cropper-point point-s" data-cropper-action="s"></span><span class="cropper-point point-ne" data-cropper-action="ne"></span><span class="cropper-point point-nw" data-cropper-action="nw"></span><span class="cropper-point point-sw" data-cropper-action="sw"></span><span class="cropper-point point-se" data-cropper-action="se"></span></div></div>', ec = Number.isNaN || Ie.isNaN;
function T(i) {
  return typeof i == "number" && !ec(i);
}
var Es = function(e) {
  return e > 0 && e < 1 / 0;
};
function Wr(i) {
  return typeof i > "u";
}
function ft(i) {
  return da(i) === "object" && i !== null;
}
var tc = Object.prototype.hasOwnProperty;
function xt(i) {
  if (!ft(i))
    return !1;
  try {
    var e = i.constructor, t = e.prototype;
    return e && t && tc.call(t, "isPrototypeOf");
  } catch {
    return !1;
  }
}
function oe(i) {
  return typeof i == "function";
}
var ic = Array.prototype.slice;
function Qn(i) {
  return Array.from ? Array.from(i) : ic.call(i);
}
function G(i, e) {
  return i && oe(e) && (Array.isArray(i) || T(i.length) ? Qn(i).forEach(function(t, r) {
    e.call(i, t, r, i);
  }) : ft(i) && Object.keys(i).forEach(function(t) {
    e.call(i, i[t], t, i);
  })), i;
}
var j = Object.assign || function(e) {
  for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
    r[a - 1] = arguments[a];
  return ft(e) && r.length > 0 && r.forEach(function(o) {
    ft(o) && Object.keys(o).forEach(function(s) {
      e[s] = o[s];
    });
  }), e;
}, rc = /\.\d*(?:0|9){12}\d*$/;
function Pt(i) {
  var e = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 1e11;
  return rc.test(i) ? Math.round(i * e) / e : i;
}
var ac = /^width|height|left|top|marginLeft|marginTop$/;
function We(i, e) {
  var t = i.style;
  G(e, function(r, a) {
    ac.test(a) && T(r) && (r = "".concat(r, "px")), t[a] = r;
  });
}
function oc(i, e) {
  return i.classList ? i.classList.contains(e) : i.className.indexOf(e) > -1;
}
function Y(i, e) {
  if (e) {
    if (T(i.length)) {
      G(i, function(r) {
        Y(r, e);
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
function Be(i, e) {
  if (e) {
    if (T(i.length)) {
      G(i, function(t) {
        Be(t, e);
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
function _t(i, e, t) {
  if (e) {
    if (T(i.length)) {
      G(i, function(r) {
        _t(r, e, t);
      });
      return;
    }
    t ? Y(i, e) : Be(i, e);
  }
}
var sc = /([a-z\d])([A-Z])/g;
function Ua(i) {
  return i.replace(sc, "$1-$2").toLowerCase();
}
function va(i, e) {
  return ft(i[e]) ? i[e] : i.dataset ? i.dataset[e] : i.getAttribute("data-".concat(Ua(e)));
}
function ci(i, e, t) {
  ft(t) ? i[e] = t : i.dataset ? i.dataset[e] = t : i.setAttribute("data-".concat(Ua(e)), t);
}
function nc(i, e) {
  if (ft(i[e]))
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
    i.removeAttribute("data-".concat(Ua(e)));
}
var Jn = /\s\s*/, el = function() {
  var i = !1;
  if (Gi) {
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
    Ie.addEventListener("test", t, r), Ie.removeEventListener("test", t, r);
  }
  return i;
}();
function me(i, e, t) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(Jn).forEach(function(o) {
    if (!el) {
      var s = i.listeners;
      s && s[o] && s[o][t] && (a = s[o][t], delete s[o][t], Object.keys(s[o]).length === 0 && delete s[o], Object.keys(s).length === 0 && delete i.listeners);
    }
    i.removeEventListener(o, a, r);
  });
}
function he(i, e, t) {
  var r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, a = t;
  e.trim().split(Jn).forEach(function(o) {
    if (r.once && !el) {
      var s = i.listeners, n = s === void 0 ? {} : s;
      a = function() {
        delete n[o][t], i.removeEventListener(o, a, r);
        for (var p = arguments.length, u = new Array(p), d = 0; d < p; d++)
          u[d] = arguments[d];
        t.apply(i, u);
      }, n[o] || (n[o] = {}), n[o][t] && i.removeEventListener(o, n[o][t], r), n[o][t] = a, i.listeners = n;
    }
    i.addEventListener(o, a, r);
  });
}
function St(i, e, t) {
  var r;
  return oe(Event) && oe(CustomEvent) ? r = new CustomEvent(e, {
    detail: t,
    bubbles: !0,
    cancelable: !0
  }) : (r = document.createEvent("CustomEvent"), r.initCustomEvent(e, !0, !0, t)), i.dispatchEvent(r);
}
function tl(i) {
  var e = i.getBoundingClientRect();
  return {
    left: e.left + (window.pageXOffset - document.documentElement.clientLeft),
    top: e.top + (window.pageYOffset - document.documentElement.clientTop)
  };
}
var Vr = Ie.location, lc = /^(\w+:)\/\/([^:/?#]*):?(\d*)/i;
function Os(i) {
  var e = i.match(lc);
  return e !== null && (e[1] !== Vr.protocol || e[2] !== Vr.hostname || e[3] !== Vr.port);
}
function zs(i) {
  var e = "timestamp=".concat((/* @__PURE__ */ new Date()).getTime());
  return i + (i.indexOf("?") === -1 ? "?" : "&") + e;
}
function si(i) {
  var e = i.rotate, t = i.scaleX, r = i.scaleY, a = i.translateX, o = i.translateY, s = [];
  T(a) && a !== 0 && s.push("translateX(".concat(a, "px)")), T(o) && o !== 0 && s.push("translateY(".concat(o, "px)")), T(e) && e !== 0 && s.push("rotate(".concat(e, "deg)")), T(t) && t !== 1 && s.push("scaleX(".concat(t, ")")), T(r) && r !== 1 && s.push("scaleY(".concat(r, ")"));
  var n = s.length ? s.join(" ") : "none";
  return {
    WebkitTransform: n,
    msTransform: n,
    transform: n
  };
}
function pc(i) {
  var e = jn({}, i), t = 0;
  return G(i, function(r, a) {
    delete e[a], G(e, function(o) {
      var s = Math.abs(r.startX - o.startX), n = Math.abs(r.startY - o.startY), l = Math.abs(r.endX - o.endX), p = Math.abs(r.endY - o.endY), u = Math.sqrt(s * s + n * n), d = Math.sqrt(l * l + p * p), c = (d - u) / u;
      Math.abs(c) > Math.abs(t) && (t = c);
    });
  }), t;
}
function Ei(i, e) {
  var t = i.pageX, r = i.pageY, a = {
    endX: t,
    endY: r
  };
  return e ? a : jn({
    startX: t,
    startY: r
  }, a);
}
function dc(i) {
  var e = 0, t = 0, r = 0;
  return G(i, function(a) {
    var o = a.startX, s = a.startY;
    e += o, t += s, r += 1;
  }), e /= r, t /= r, {
    pageX: e,
    pageY: t
  };
}
function Ve(i) {
  var e = i.aspectRatio, t = i.height, r = i.width, a = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "contain", o = Es(r), s = Es(t);
  if (o && s) {
    var n = t * e;
    a === "contain" && n > r || a === "cover" && n < r ? t = r / e : r = t * e;
  } else o ? t = r / e : s && (r = t * e);
  return {
    width: r,
    height: t
  };
}
function uc(i) {
  var e = i.width, t = i.height, r = i.degree;
  if (r = Math.abs(r) % 180, r === 90)
    return {
      width: t,
      height: e
    };
  var a = r % 90 * Math.PI / 180, o = Math.sin(a), s = Math.cos(a), n = e * s + t * o, l = e * o + t * s;
  return r > 90 ? {
    width: l,
    height: n
  } : {
    width: n,
    height: l
  };
}
function hc(i, e, t, r) {
  var a = e.aspectRatio, o = e.naturalWidth, s = e.naturalHeight, n = e.rotate, l = n === void 0 ? 0 : n, p = e.scaleX, u = p === void 0 ? 1 : p, d = e.scaleY, c = d === void 0 ? 1 : d, f = t.aspectRatio, m = t.naturalWidth, y = t.naturalHeight, b = r.fillColor, x = b === void 0 ? "transparent" : b, _ = r.imageSmoothingEnabled, B = _ === void 0 ? !0 : _, k = r.imageSmoothingQuality, C = k === void 0 ? "low" : k, g = r.maxWidth, S = g === void 0 ? 1 / 0 : g, P = r.maxHeight, D = P === void 0 ? 1 / 0 : P, L = r.minWidth, O = L === void 0 ? 0 : L, M = r.minHeight, A = M === void 0 ? 0 : M, N = document.createElement("canvas"), U = N.getContext("2d"), Z = Ve({
    aspectRatio: f,
    width: S,
    height: D
  }), fe = Ve({
    aspectRatio: f,
    width: O,
    height: A
  }, "cover"), Fe = Math.min(Z.width, Math.max(fe.width, m)), $e = Math.min(Z.height, Math.max(fe.height, y)), Ye = Ve({
    aspectRatio: a,
    width: S,
    height: D
  }), Ke = Ve({
    aspectRatio: a,
    width: O,
    height: A
  }, "cover"), Ze = Math.min(Ye.width, Math.max(Ke.width, o)), je = Math.min(Ye.height, Math.max(Ke.height, s)), mt = [-Ze / 2, -je / 2, Ze, je];
  return N.width = Pt(Fe), N.height = Pt($e), U.fillStyle = x, U.fillRect(0, 0, Fe, $e), U.save(), U.translate(Fe / 2, $e / 2), U.rotate(l * Math.PI / 180), U.scale(u, c), U.imageSmoothingEnabled = B, U.imageSmoothingQuality = C, U.drawImage.apply(U, [i].concat(qn(mt.map(function(Qe) {
    return Math.floor(Pt(Qe));
  })))), U.restore(), N;
}
var il = String.fromCharCode;
function cc(i, e, t) {
  var r = "";
  t += e;
  for (var a = e; a < t; a += 1)
    r += il(i.getUint8(a));
  return r;
}
var fc = /^data:.*,/;
function mc(i) {
  var e = i.replace(fc, ""), t = atob(e), r = new ArrayBuffer(t.length), a = new Uint8Array(r);
  return G(a, function(o, s) {
    a[s] = t.charCodeAt(s);
  }), r;
}
function gc(i, e) {
  for (var t = [], r = 8192, a = new Uint8Array(i); a.length > 0; )
    t.push(il.apply(null, Qn(a.subarray(0, r)))), a = a.subarray(r);
  return "data:".concat(e, ";base64,").concat(btoa(t.join("")));
}
function yc(i) {
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
      var l = a + 4, p = a + 10;
      if (cc(e, l, 4) === "Exif") {
        var u = e.getUint16(p);
        if (r = u === 18761, (r || u === 19789) && e.getUint16(p + 2, r) === 42) {
          var d = e.getUint32(p + 4, r);
          d >= 8 && (o = p + d);
        }
      }
    }
    if (o) {
      var c = e.getUint16(o, r), f, m;
      for (m = 0; m < c; m += 1)
        if (f = o + m * 12 + 2, e.getUint16(f, r) === 274) {
          f += 8, t = e.getUint16(f, r), e.setUint16(f, 1, r);
          break;
        }
    }
  } catch {
    t = 1;
  }
  return t;
}
function bc(i) {
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
var vc = {
  render: function() {
    this.initContainer(), this.initCanvas(), this.initCropBox(), this.renderCanvas(), this.cropped && this.renderCropBox();
  },
  initContainer: function() {
    var e = this.element, t = this.options, r = this.container, a = this.cropper, o = Number(t.minContainerWidth), s = Number(t.minContainerHeight);
    Y(a, se), Be(e, se);
    var n = {
      width: Math.max(r.offsetWidth, o >= 0 ? o : Kn),
      height: Math.max(r.offsetHeight, s >= 0 ? s : Zn)
    };
    this.containerData = n, We(a, {
      width: n.width,
      height: n.height
    }), Y(e, se), Be(a, se);
  },
  // Canvas (image wrapper)
  initCanvas: function() {
    var e = this.containerData, t = this.imageData, r = this.options.viewMode, a = Math.abs(t.rotate) % 180 === 90, o = a ? t.naturalHeight : t.naturalWidth, s = a ? t.naturalWidth : t.naturalHeight, n = o / s, l = e.width, p = e.height;
    e.height * n > e.width ? r === 3 ? l = e.height * n : p = e.width / n : r === 3 ? p = e.width / n : l = e.height * n;
    var u = {
      aspectRatio: n,
      naturalWidth: o,
      naturalHeight: s,
      width: l,
      height: p
    };
    this.canvasData = u, this.limited = r === 1 || r === 2, this.limitCanvas(!0, !0), u.width = Math.min(Math.max(u.width, u.minWidth), u.maxWidth), u.height = Math.min(Math.max(u.height, u.minHeight), u.maxHeight), u.left = (e.width - u.width) / 2, u.top = (e.height - u.height) / 2, u.oldLeft = u.left, u.oldTop = u.top, this.initialCanvasData = j({}, u);
  },
  limitCanvas: function(e, t) {
    var r = this.options, a = this.containerData, o = this.canvasData, s = this.cropBoxData, n = r.viewMode, l = o.aspectRatio, p = this.cropped && s;
    if (e) {
      var u = Number(r.minCanvasWidth) || 0, d = Number(r.minCanvasHeight) || 0;
      n > 1 ? (u = Math.max(u, a.width), d = Math.max(d, a.height), n === 3 && (d * l > u ? u = d * l : d = u / l)) : n > 0 && (u ? u = Math.max(u, p ? s.width : 0) : d ? d = Math.max(d, p ? s.height : 0) : p && (u = s.width, d = s.height, d * l > u ? u = d * l : d = u / l));
      var c = Ve({
        aspectRatio: l,
        width: u,
        height: d
      });
      u = c.width, d = c.height, o.minWidth = u, o.minHeight = d, o.maxWidth = 1 / 0, o.maxHeight = 1 / 0;
    }
    if (t)
      if (n > (p ? 0 : 1)) {
        var f = a.width - o.width, m = a.height - o.height;
        o.minLeft = Math.min(0, f), o.minTop = Math.min(0, m), o.maxLeft = Math.max(0, f), o.maxTop = Math.max(0, m), p && this.limited && (o.minLeft = Math.min(s.left, s.left + (s.width - o.width)), o.minTop = Math.min(s.top, s.top + (s.height - o.height)), o.maxLeft = s.left, o.maxTop = s.top, n === 2 && (o.width >= a.width && (o.minLeft = Math.min(0, f), o.maxLeft = Math.max(0, f)), o.height >= a.height && (o.minTop = Math.min(0, m), o.maxTop = Math.max(0, m))));
      } else
        o.minLeft = -o.width, o.minTop = -o.height, o.maxLeft = a.width, o.maxTop = a.height;
  },
  renderCanvas: function(e, t) {
    var r = this.canvasData, a = this.imageData;
    if (t) {
      var o = uc({
        width: a.naturalWidth * Math.abs(a.scaleX || 1),
        height: a.naturalHeight * Math.abs(a.scaleY || 1),
        degree: a.rotate || 0
      }), s = o.width, n = o.height, l = r.width * (s / r.naturalWidth), p = r.height * (n / r.naturalHeight);
      r.left -= (l - r.width) / 2, r.top -= (p - r.height) / 2, r.width = l, r.height = p, r.aspectRatio = s / n, r.naturalWidth = s, r.naturalHeight = n, this.limitCanvas(!0, !1);
    }
    (r.width > r.maxWidth || r.width < r.minWidth) && (r.left = r.oldLeft), (r.height > r.maxHeight || r.height < r.minHeight) && (r.top = r.oldTop), r.width = Math.min(Math.max(r.width, r.minWidth), r.maxWidth), r.height = Math.min(Math.max(r.height, r.minHeight), r.maxHeight), this.limitCanvas(!1, !0), r.left = Math.min(Math.max(r.left, r.minLeft), r.maxLeft), r.top = Math.min(Math.max(r.top, r.minTop), r.maxTop), r.oldLeft = r.left, r.oldTop = r.top, We(this.canvas, j({
      width: r.width,
      height: r.height
    }, si({
      translateX: r.left,
      translateY: r.top
    }))), this.renderImage(e), this.cropped && this.limited && this.limitCropBox(!0, !0);
  },
  renderImage: function(e) {
    var t = this.canvasData, r = this.imageData, a = r.naturalWidth * (t.width / t.naturalWidth), o = r.naturalHeight * (t.height / t.naturalHeight);
    j(r, {
      width: a,
      height: o,
      left: (t.width - a) / 2,
      top: (t.height - o) / 2
    }), We(this.image, j({
      width: r.width,
      height: r.height
    }, si(j({
      translateX: r.left,
      translateY: r.top
    }, r)))), e && this.output();
  },
  initCropBox: function() {
    var e = this.options, t = this.canvasData, r = e.aspectRatio || e.initialAspectRatio, a = Number(e.autoCropArea) || 0.8, o = {
      width: t.width,
      height: t.height
    };
    r && (t.height * r > t.width ? o.height = o.width / r : o.width = o.height * r), this.cropBoxData = o, this.limitCropBox(!0, !0), o.width = Math.min(Math.max(o.width, o.minWidth), o.maxWidth), o.height = Math.min(Math.max(o.height, o.minHeight), o.maxHeight), o.width = Math.max(o.minWidth, o.width * a), o.height = Math.max(o.minHeight, o.height * a), o.left = t.left + (t.width - o.width) / 2, o.top = t.top + (t.height - o.height) / 2, o.oldLeft = o.left, o.oldTop = o.top, this.initialCropBoxData = j({}, o);
  },
  limitCropBox: function(e, t) {
    var r = this.options, a = this.containerData, o = this.canvasData, s = this.cropBoxData, n = this.limited, l = r.aspectRatio;
    if (e) {
      var p = Number(r.minCropBoxWidth) || 0, u = Number(r.minCropBoxHeight) || 0, d = n ? Math.min(a.width, o.width, o.width + o.left, a.width - o.left) : a.width, c = n ? Math.min(a.height, o.height, o.height + o.top, a.height - o.top) : a.height;
      p = Math.min(p, a.width), u = Math.min(u, a.height), l && (p && u ? u * l > p ? u = p / l : p = u * l : p ? u = p / l : u && (p = u * l), c * l > d ? c = d / l : d = c * l), s.minWidth = Math.min(p, d), s.minHeight = Math.min(u, c), s.maxWidth = d, s.maxHeight = c;
    }
    t && (n ? (s.minLeft = Math.max(0, o.left), s.minTop = Math.max(0, o.top), s.maxLeft = Math.min(a.width, o.left + o.width) - s.width, s.maxTop = Math.min(a.height, o.top + o.height) - s.height) : (s.minLeft = 0, s.minTop = 0, s.maxLeft = a.width - s.width, s.maxTop = a.height - s.height));
  },
  renderCropBox: function() {
    var e = this.options, t = this.containerData, r = this.cropBoxData;
    (r.width > r.maxWidth || r.width < r.minWidth) && (r.left = r.oldLeft), (r.height > r.maxHeight || r.height < r.minHeight) && (r.top = r.oldTop), r.width = Math.min(Math.max(r.width, r.minWidth), r.maxWidth), r.height = Math.min(Math.max(r.height, r.minHeight), r.maxHeight), this.limitCropBox(!1, !0), r.left = Math.min(Math.max(r.left, r.minLeft), r.maxLeft), r.top = Math.min(Math.max(r.top, r.minTop), r.maxTop), r.oldLeft = r.left, r.oldTop = r.top, e.movable && e.cropBoxMovable && ci(this.face, hi, r.width >= t.width && r.height >= t.height ? Vn : Ra), We(this.cropBox, j({
      width: r.width,
      height: r.height
    }, si({
      translateX: r.left,
      translateY: r.top
    }))), this.cropped && this.limited && this.limitCanvas(!0, !0), this.disabled || this.output();
  },
  output: function() {
    this.preview(), St(this.element, fa, this.getData());
  }
}, wc = {
  initPreview: function() {
    var e = this.element, t = this.crossOrigin, r = this.options.preview, a = t ? this.crossOriginUrl : this.url, o = e.alt || "The image to preview", s = document.createElement("img");
    if (t && (s.crossOrigin = t), s.src = a, s.alt = o, this.viewBox.appendChild(s), this.viewBoxImage = s, !!r) {
      var n = r;
      typeof r == "string" ? n = e.ownerDocument.querySelectorAll(r) : r.querySelector && (n = [r]), this.previews = n, G(n, function(l) {
        var p = document.createElement("img");
        ci(l, Ai, {
          width: l.offsetWidth,
          height: l.offsetHeight,
          html: l.innerHTML
        }), t && (p.crossOrigin = t), p.src = a, p.alt = o, p.style.cssText = 'display:block;width:100%;height:auto;min-width:0!important;min-height:0!important;max-width:none!important;max-height:none!important;image-orientation:0deg!important;"', l.innerHTML = "", l.appendChild(p);
      });
    }
  },
  resetPreview: function() {
    G(this.previews, function(e) {
      var t = va(e, Ai);
      We(e, {
        width: t.width,
        height: t.height
      }), e.innerHTML = t.html, nc(e, Ai);
    });
  },
  preview: function() {
    var e = this.imageData, t = this.canvasData, r = this.cropBoxData, a = r.width, o = r.height, s = e.width, n = e.height, l = r.left - t.left - e.left, p = r.top - t.top - e.top;
    !this.cropped || this.disabled || (We(this.viewBoxImage, j({
      width: s,
      height: n
    }, si(j({
      translateX: -l,
      translateY: -p
    }, e)))), G(this.previews, function(u) {
      var d = va(u, Ai), c = d.width, f = d.height, m = c, y = f, b = 1;
      a && (b = c / a, y = o * b), o && y > f && (b = f / o, m = a * b, y = f), We(u, {
        width: m,
        height: y
      }), We(u.getElementsByTagName("img")[0], j({
        width: s * b,
        height: n * b
      }, si(j({
        translateX: -l * b,
        translateY: -p * b
      }, e))));
    }));
  }
}, xc = {
  bind: function() {
    var e = this.element, t = this.options, r = this.cropper;
    oe(t.cropstart) && he(e, ya, t.cropstart), oe(t.cropmove) && he(e, ga, t.cropmove), oe(t.cropend) && he(e, ma, t.cropend), oe(t.crop) && he(e, fa, t.crop), oe(t.zoom) && he(e, ba, t.zoom), he(r, Ds, this.onCropStart = this.cropStart.bind(this)), t.zoomable && t.zoomOnWheel && he(r, Cs, this.onWheel = this.wheel.bind(this), {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && he(r, Ss, this.onDblclick = this.dblclick.bind(this)), he(e.ownerDocument, ks, this.onCropMove = this.cropMove.bind(this)), he(e.ownerDocument, Bs, this.onCropEnd = this.cropEnd.bind(this)), t.responsive && he(window, Fs, this.onResize = this.resize.bind(this));
  },
  unbind: function() {
    var e = this.element, t = this.options, r = this.cropper;
    oe(t.cropstart) && me(e, ya, t.cropstart), oe(t.cropmove) && me(e, ga, t.cropmove), oe(t.cropend) && me(e, ma, t.cropend), oe(t.crop) && me(e, fa, t.crop), oe(t.zoom) && me(e, ba, t.zoom), me(r, Ds, this.onCropStart), t.zoomable && t.zoomOnWheel && me(r, Cs, this.onWheel, {
      passive: !1,
      capture: !0
    }), t.toggleDragModeOnDblclick && me(r, Ss, this.onDblclick), me(e.ownerDocument, ks, this.onCropMove), me(e.ownerDocument, Bs, this.onCropEnd), t.responsive && me(window, Fs, this.onResize);
  }
}, _c = {
  resize: function() {
    if (!this.disabled) {
      var e = this.options, t = this.container, r = this.containerData, a = t.offsetWidth / r.width, o = t.offsetHeight / r.height, s = Math.abs(a - 1) > Math.abs(o - 1) ? a : o;
      if (s !== 1) {
        var n, l;
        e.restore && (n = this.getCanvasData(), l = this.getCropBoxData()), this.render(), e.restore && (this.setCanvasData(G(n, function(p, u) {
          n[u] = p * s;
        })), this.setCropBoxData(G(l, function(p, u) {
          l[u] = p * s;
        })));
      }
    }
  },
  dblclick: function() {
    this.disabled || this.options.dragMode === Yn || this.setDragMode(oc(this.dragBox, ha) ? Xn : Na);
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
    (T(t) && t !== 1 || T(r) && r !== 0 || e.ctrlKey))) {
      var a = this.options, o = this.pointers, s;
      e.changedTouches ? G(e.changedTouches, function(n) {
        o[n.identifier] = Ei(n);
      }) : o[e.pointerId || 0] = Ei(e), Object.keys(o).length > 1 && a.zoomable && a.zoomOnTouch ? s = Gn : s = va(e.target, hi), Yh.test(s) && St(this.element, ya, {
        originalEvent: e,
        action: s
      }) !== !1 && (e.preventDefault(), this.action = s, this.cropping = !1, s === Wn && (this.cropping = !0, Y(this.dragBox, Wi)));
    }
  },
  cropMove: function(e) {
    var t = this.action;
    if (!(this.disabled || !t)) {
      var r = this.pointers;
      e.preventDefault(), St(this.element, ga, {
        originalEvent: e,
        action: t
      }) !== !1 && (e.changedTouches ? G(e.changedTouches, function(a) {
        j(r[a.identifier] || {}, Ei(a, !0));
      }) : j(r[e.pointerId || 0] || {}, Ei(e, !0)), this.change(e));
    }
  },
  cropEnd: function(e) {
    if (!this.disabled) {
      var t = this.action, r = this.pointers;
      e.changedTouches ? G(e.changedTouches, function(a) {
        delete r[a.identifier];
      }) : delete r[e.pointerId || 0], t && (e.preventDefault(), Object.keys(r).length || (this.action = ""), this.cropping && (this.cropping = !1, _t(this.dragBox, Wi, this.cropped && this.options.modal)), St(this.element, ma, {
        originalEvent: e,
        action: t
      }));
    }
  }
}, Pc = {
  change: function(e) {
    var t = this.options, r = this.canvasData, a = this.containerData, o = this.cropBoxData, s = this.pointers, n = this.action, l = t.aspectRatio, p = o.left, u = o.top, d = o.width, c = o.height, f = p + d, m = u + c, y = 0, b = 0, x = a.width, _ = a.height, B = !0, k;
    !l && e.shiftKey && (l = d && c ? d / c : 1), this.limited && (y = o.minLeft, b = o.minTop, x = y + Math.min(a.width, r.width, r.left + r.width), _ = b + Math.min(a.height, r.height, r.top + r.height));
    var C = s[Object.keys(s)[0]], g = {
      x: C.endX - C.startX,
      y: C.endY - C.startY
    }, S = function(D) {
      switch (D) {
        case nt:
          f + g.x > x && (g.x = x - f);
          break;
        case lt:
          p + g.x < y && (g.x = y - p);
          break;
        case He:
          u + g.y < b && (g.y = b - u);
          break;
        case bt:
          m + g.y > _ && (g.y = _ - m);
          break;
      }
    };
    switch (n) {
      // Move crop box
      case Ra:
        p += g.x, u += g.y;
        break;
      // Resize crop box
      case nt:
        if (g.x >= 0 && (f >= x || l && (u <= b || m >= _))) {
          B = !1;
          break;
        }
        S(nt), d += g.x, d < 0 && (n = lt, d = -d, p -= d), l && (c = d / l, u += (o.height - c) / 2);
        break;
      case He:
        if (g.y <= 0 && (u <= b || l && (p <= y || f >= x))) {
          B = !1;
          break;
        }
        S(He), c -= g.y, u += g.y, c < 0 && (n = bt, c = -c, u -= c), l && (d = c * l, p += (o.width - d) / 2);
        break;
      case lt:
        if (g.x <= 0 && (p <= y || l && (u <= b || m >= _))) {
          B = !1;
          break;
        }
        S(lt), d -= g.x, p += g.x, d < 0 && (n = nt, d = -d, p -= d), l && (c = d / l, u += (o.height - c) / 2);
        break;
      case bt:
        if (g.y >= 0 && (m >= _ || l && (p <= y || f >= x))) {
          B = !1;
          break;
        }
        S(bt), c += g.y, c < 0 && (n = He, c = -c, u -= c), l && (d = c * l, p += (o.width - d) / 2);
        break;
      case Kt:
        if (l) {
          if (g.y <= 0 && (u <= b || f >= x)) {
            B = !1;
            break;
          }
          S(He), c -= g.y, u += g.y, d = c * l;
        } else
          S(He), S(nt), g.x >= 0 ? f < x ? d += g.x : g.y <= 0 && u <= b && (B = !1) : d += g.x, g.y <= 0 ? u > b && (c -= g.y, u += g.y) : (c -= g.y, u += g.y);
        d < 0 && c < 0 ? (n = Jt, c = -c, d = -d, u -= c, p -= d) : d < 0 ? (n = Zt, d = -d, p -= d) : c < 0 && (n = Qt, c = -c, u -= c);
        break;
      case Zt:
        if (l) {
          if (g.y <= 0 && (u <= b || p <= y)) {
            B = !1;
            break;
          }
          S(He), c -= g.y, u += g.y, d = c * l, p += o.width - d;
        } else
          S(He), S(lt), g.x <= 0 ? p > y ? (d -= g.x, p += g.x) : g.y <= 0 && u <= b && (B = !1) : (d -= g.x, p += g.x), g.y <= 0 ? u > b && (c -= g.y, u += g.y) : (c -= g.y, u += g.y);
        d < 0 && c < 0 ? (n = Qt, c = -c, d = -d, u -= c, p -= d) : d < 0 ? (n = Kt, d = -d, p -= d) : c < 0 && (n = Jt, c = -c, u -= c);
        break;
      case Jt:
        if (l) {
          if (g.x <= 0 && (p <= y || m >= _)) {
            B = !1;
            break;
          }
          S(lt), d -= g.x, p += g.x, c = d / l;
        } else
          S(bt), S(lt), g.x <= 0 ? p > y ? (d -= g.x, p += g.x) : g.y >= 0 && m >= _ && (B = !1) : (d -= g.x, p += g.x), g.y >= 0 ? m < _ && (c += g.y) : c += g.y;
        d < 0 && c < 0 ? (n = Kt, c = -c, d = -d, u -= c, p -= d) : d < 0 ? (n = Qt, d = -d, p -= d) : c < 0 && (n = Zt, c = -c, u -= c);
        break;
      case Qt:
        if (l) {
          if (g.x >= 0 && (f >= x || m >= _)) {
            B = !1;
            break;
          }
          S(nt), d += g.x, c = d / l;
        } else
          S(bt), S(nt), g.x >= 0 ? f < x ? d += g.x : g.y >= 0 && m >= _ && (B = !1) : d += g.x, g.y >= 0 ? m < _ && (c += g.y) : c += g.y;
        d < 0 && c < 0 ? (n = Zt, c = -c, d = -d, u -= c, p -= d) : d < 0 ? (n = Jt, d = -d, p -= d) : c < 0 && (n = Kt, c = -c, u -= c);
        break;
      // Move canvas
      case Vn:
        this.move(g.x, g.y), B = !1;
        break;
      // Zoom canvas
      case Gn:
        this.zoom(pc(s), e), B = !1;
        break;
      // Create crop box
      case Wn:
        if (!g.x || !g.y) {
          B = !1;
          break;
        }
        k = tl(this.cropper), p = C.startX - k.left, u = C.startY - k.top, d = o.minWidth, c = o.minHeight, g.x > 0 ? n = g.y > 0 ? Qt : Kt : g.x < 0 && (p -= d, n = g.y > 0 ? Jt : Zt), g.y < 0 && (u -= c), this.cropped || (Be(this.cropBox, se), this.cropped = !0, this.limited && this.limitCropBox(!0, !0));
        break;
    }
    B && (o.width = d, o.height = c, o.left = p, o.top = u, this.action = n, this.renderCropBox()), G(s, function(P) {
      P.startX = P.endX, P.startY = P.endY;
    });
  }
}, Sc = {
  // Show the crop box manually
  crop: function() {
    return this.ready && !this.cropped && !this.disabled && (this.cropped = !0, this.limitCropBox(!0, !0), this.options.modal && Y(this.dragBox, Wi), Be(this.cropBox, se), this.setCropBoxData(this.initialCropBoxData)), this;
  },
  // Reset the image and crop box to their initial states
  reset: function() {
    return this.ready && !this.disabled && (this.imageData = j({}, this.initialImageData), this.canvasData = j({}, this.initialCanvasData), this.cropBoxData = j({}, this.initialCropBoxData), this.renderCanvas(), this.cropped && this.renderCropBox()), this;
  },
  // Clear the crop box
  clear: function() {
    return this.cropped && !this.disabled && (j(this.cropBoxData, {
      left: 0,
      top: 0,
      width: 0,
      height: 0
    }), this.cropped = !1, this.renderCropBox(), this.limitCanvas(!0, !0), this.renderCanvas(), Be(this.dragBox, Wi), Y(this.cropBox, se)), this;
  },
  /**
   * Replace the image's src and rebuild the cropper
   * @param {string} url - The new URL.
   * @param {boolean} [hasSameSize] - Indicate if the new image has the same size as the old one.
   * @returns {Cropper} this
   */
  replace: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : !1;
    return !this.disabled && e && (this.isImg && (this.element.src = e), t ? (this.url = e, this.image.src = e, this.ready && (this.viewBoxImage.src = e, G(this.previews, function(r) {
      r.getElementsByTagName("img")[0].src = e;
    }))) : (this.isImg && (this.replaced = !0), this.options.data = null, this.uncreate(), this.load(e))), this;
  },
  // Enable (unfreeze) the cropper
  enable: function() {
    return this.ready && this.disabled && (this.disabled = !1, Be(this.cropper, _s)), this;
  },
  // Disable (freeze) the cropper
  disable: function() {
    return this.ready && !this.disabled && (this.disabled = !0, Y(this.cropper, _s)), this;
  },
  /**
   * Destroy the cropper and remove the instance from the image
   * @returns {Cropper} this
   */
  destroy: function() {
    var e = this.element;
    return e[$] ? (e[$] = void 0, this.isImg && this.replaced && (e.src = this.originalUrl), this.uncreate(), this) : this;
  },
  /**
   * Move the canvas with relative offsets
   * @param {number} offsetX - The relative offset distance on the x-axis.
   * @param {number} [offsetY=offsetX] - The relative offset distance on the y-axis.
   * @returns {Cropper} this
   */
  move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = this.canvasData, a = r.left, o = r.top;
    return this.moveTo(Wr(e) ? e : a + Number(e), Wr(t) ? t : o + Number(t));
  },
  /**
   * Move the canvas to an absolute point
   * @param {number} x - The x-axis coordinate.
   * @param {number} [y=x] - The y-axis coordinate.
   * @returns {Cropper} this
   */
  moveTo: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = this.canvasData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.movable && (T(e) && (r.left = e, a = !0), T(t) && (r.top = t, a = !0), a && this.renderCanvas(!0)), this;
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
    var a = this.options, o = this.canvasData, s = o.width, n = o.height, l = o.naturalWidth, p = o.naturalHeight;
    if (e = Number(e), e >= 0 && this.ready && !this.disabled && a.zoomable) {
      var u = l * e, d = p * e;
      if (St(this.element, ba, {
        ratio: e,
        oldRatio: s / l,
        originalEvent: r
      }) === !1)
        return this;
      if (r) {
        var c = this.pointers, f = tl(this.cropper), m = c && Object.keys(c).length ? dc(c) : {
          pageX: r.pageX,
          pageY: r.pageY
        };
        o.left -= (u - s) * ((m.pageX - f.left - o.left) / s), o.top -= (d - n) * ((m.pageY - f.top - o.top) / n);
      } else xt(t) && T(t.x) && T(t.y) ? (o.left -= (u - s) * ((t.x - o.left) / s), o.top -= (d - n) * ((t.y - o.top) / n)) : (o.left -= (u - s) / 2, o.top -= (d - n) / 2);
      o.width = u, o.height = d, this.renderCanvas(!0);
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
    return e = Number(e), T(e) && this.ready && !this.disabled && this.options.rotatable && (this.imageData.rotate = e % 360, this.renderCanvas(!0, !0)), this;
  },
  /**
   * Scale the image on the x-axis.
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @returns {Cropper} this
   */
  scaleX: function(e) {
    var t = this.imageData.scaleY;
    return this.scale(e, T(t) ? t : 1);
  },
  /**
   * Scale the image on the y-axis.
   * @param {number} scaleY - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scaleY: function(e) {
    var t = this.imageData.scaleX;
    return this.scale(T(t) ? t : 1, e);
  },
  /**
   * Scale the image
   * @param {number} scaleX - The scale ratio on the x-axis.
   * @param {number} [scaleY=scaleX] - The scale ratio on the y-axis.
   * @returns {Cropper} this
   */
  scale: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = this.imageData, a = !1;
    return e = Number(e), t = Number(t), this.ready && !this.disabled && this.options.scalable && (T(e) && (r.scaleX = e, a = !0), T(t) && (r.scaleY = t, a = !0), a && this.renderCanvas(!0, !0)), this;
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
      if (G(s, function(u, d) {
        s[d] = u / n;
      }), e) {
        var l = Math.round(s.y + s.height), p = Math.round(s.x + s.width);
        s.x = Math.round(s.x), s.y = Math.round(s.y), s.width = p - s.x, s.height = l - s.y;
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
    if (this.ready && !this.disabled && xt(e)) {
      var s = !1;
      t.rotatable && T(e.rotate) && e.rotate !== r.rotate && (r.rotate = e.rotate, s = !0), t.scalable && (T(e.scaleX) && e.scaleX !== r.scaleX && (r.scaleX = e.scaleX, s = !0), T(e.scaleY) && e.scaleY !== r.scaleY && (r.scaleY = e.scaleY, s = !0)), s && this.renderCanvas(!0, !0);
      var n = r.width / r.naturalWidth;
      T(e.x) && (o.left = e.x * n + a.left), T(e.y) && (o.top = e.y * n + a.top), T(e.width) && (o.width = e.width * n), T(e.height) && (o.height = e.height * n), this.setCropBoxData(o);
    }
    return this;
  },
  /**
   * Get the container size data.
   * @returns {Object} The result container data.
   */
  getContainerData: function() {
    return this.ready ? j({}, this.containerData) : {};
  },
  /**
   * Get the image position and size data.
   * @returns {Object} The result image data.
   */
  getImageData: function() {
    return this.sized ? j({}, this.imageData) : {};
  },
  /**
   * Get the canvas position and size data.
   * @returns {Object} The result canvas data.
   */
  getCanvasData: function() {
    var e = this.canvasData, t = {};
    return this.ready && G(["left", "top", "width", "height", "naturalWidth", "naturalHeight"], function(r) {
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
    return this.ready && !this.disabled && xt(e) && (T(e.left) && (t.left = e.left), T(e.top) && (t.top = e.top), T(e.width) ? (t.width = e.width, t.height = e.width / r) : T(e.height) && (t.height = e.height, t.width = e.height * r), this.renderCanvas(!0)), this;
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
    return this.ready && this.cropped && !this.disabled && xt(e) && (T(e.left) && (t.left = e.left), T(e.top) && (t.top = e.top), T(e.width) && e.width !== t.width && (a = !0, t.width = e.width), T(e.height) && e.height !== t.height && (o = !0, t.height = e.height), r && (a ? t.height = t.width / r : o && (t.width = t.height * r)), this.renderCropBox()), this;
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
    var t = this.canvasData, r = hc(this.image, this.imageData, t, e);
    if (!this.cropped)
      return r;
    var a = this.getData(e.rounded), o = a.x, s = a.y, n = a.width, l = a.height, p = r.width / Math.floor(t.naturalWidth);
    p !== 1 && (o *= p, s *= p, n *= p, l *= p);
    var u = n / l, d = Ve({
      aspectRatio: u,
      width: e.maxWidth || 1 / 0,
      height: e.maxHeight || 1 / 0
    }), c = Ve({
      aspectRatio: u,
      width: e.minWidth || 0,
      height: e.minHeight || 0
    }, "cover"), f = Ve({
      aspectRatio: u,
      width: e.width || (p !== 1 ? r.width : n),
      height: e.height || (p !== 1 ? r.height : l)
    }), m = f.width, y = f.height;
    m = Math.min(d.width, Math.max(c.width, m)), y = Math.min(d.height, Math.max(c.height, y));
    var b = document.createElement("canvas"), x = b.getContext("2d");
    b.width = Pt(m), b.height = Pt(y), x.fillStyle = e.fillColor || "transparent", x.fillRect(0, 0, m, y);
    var _ = e.imageSmoothingEnabled, B = _ === void 0 ? !0 : _, k = e.imageSmoothingQuality;
    x.imageSmoothingEnabled = B, k && (x.imageSmoothingQuality = k);
    var C = r.width, g = r.height, S = o, P = s, D, L, O, M, A, N;
    S <= -n || S > C ? (S = 0, D = 0, O = 0, A = 0) : S <= 0 ? (O = -S, S = 0, D = Math.min(C, n + S), A = D) : S <= C && (O = 0, D = Math.min(n, C - S), A = D), D <= 0 || P <= -l || P > g ? (P = 0, L = 0, M = 0, N = 0) : P <= 0 ? (M = -P, P = 0, L = Math.min(g, l + P), N = L) : P <= g && (M = 0, L = Math.min(l, g - P), N = L);
    var U = [S, P, D, L];
    if (A > 0 && N > 0) {
      var Z = m / n;
      U.push(O * Z, M * Z, A * Z, N * Z);
    }
    return x.drawImage.apply(x, [r].concat(qn(U.map(function(fe) {
      return Math.floor(Pt(fe));
    })))), b;
  },
  /**
   * Change the aspect ratio of the crop box.
   * @param {number} aspectRatio - The new aspect ratio.
   * @returns {Cropper} this
   */
  setAspectRatio: function(e) {
    var t = this.options;
    return !this.disabled && !Wr(e) && (t.aspectRatio = Math.max(0, e) || NaN, this.ready && (this.initCropBox(), this.cropped && this.renderCropBox())), this;
  },
  /**
   * Change the drag mode.
   * @param {string} mode - The new drag mode.
   * @returns {Cropper} this
   */
  setDragMode: function(e) {
    var t = this.options, r = this.dragBox, a = this.face;
    if (this.ready && !this.disabled) {
      var o = e === Na, s = t.movable && e === Xn;
      e = o || s ? e : Yn, t.dragMode = e, ci(r, hi, e), _t(r, ha, o), _t(r, ca, s), t.cropBoxMovable || (ci(a, hi, e), _t(a, ha, o), _t(a, ca, s));
    }
    return this;
  }
}, Dc = Ie.Cropper, rl = /* @__PURE__ */ function() {
  function i(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
    if (Nh(this, i), !e || !Qh.test(e.tagName))
      throw new Error("The first argument is required and must be an <img> or <canvas> element.");
    this.element = e, this.options = j({}, As, xt(t) && t), this.cropped = !1, this.disabled = !1, this.pointers = {}, this.ready = !1, this.reloading = !1, this.replaced = !1, this.sized = !1, this.sizing = !1, this.init();
  }
  return Uh(i, [{
    key: "init",
    value: function() {
      var t = this.element, r = t.tagName.toLowerCase(), a;
      if (!t[$]) {
        if (t[$] = this, r === "img") {
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
        if (Kh.test(t)) {
          Zh.test(t) ? this.read(mc(t)) : this.clone();
          return;
        }
        var s = new XMLHttpRequest(), n = this.clone.bind(this);
        this.reloading = !0, this.xhr = s, s.onabort = n, s.onerror = n, s.ontimeout = n, s.onprogress = function() {
          s.getResponseHeader("content-type") !== Ts && s.abort();
        }, s.onload = function() {
          r.read(s.response);
        }, s.onloadend = function() {
          r.reloading = !1, r.xhr = null;
        }, o.checkCrossOrigin && Os(t) && a.crossOrigin && (t = zs(t)), s.open("GET", t, !0), s.responseType = "arraybuffer", s.withCredentials = a.crossOrigin === "use-credentials", s.send();
      }
    }
  }, {
    key: "read",
    value: function(t) {
      var r = this.options, a = this.imageData, o = yc(t), s = 0, n = 1, l = 1;
      if (o > 1) {
        this.url = gc(t, Ts);
        var p = bc(o);
        s = p.rotate, n = p.scaleX, l = p.scaleY;
      }
      r.rotatable && (a.rotate = s), r.scalable && (a.scaleX = n, a.scaleY = l), this.clone();
    }
  }, {
    key: "clone",
    value: function() {
      var t = this.element, r = this.url, a = t.crossOrigin, o = r;
      this.options.checkCrossOrigin && Os(r) && (a || (a = "anonymous"), o = zs(r)), this.crossOrigin = a, this.crossOriginUrl = o;
      var s = document.createElement("img");
      a && (s.crossOrigin = a), s.src = o || r, s.alt = t.alt || "The image to crop", this.image = s, s.onload = this.start.bind(this), s.onerror = this.stop.bind(this), Y(s, Ps), t.parentNode.insertBefore(s, t.nextSibling);
    }
  }, {
    key: "start",
    value: function() {
      var t = this, r = this.image;
      r.onload = null, r.onerror = null, this.sizing = !0;
      var a = Ie.navigator && /(?:iPad|iPhone|iPod).*?AppleWebKit/i.test(Ie.navigator.userAgent), o = function(p, u) {
        j(t.imageData, {
          naturalWidth: p,
          naturalHeight: u,
          aspectRatio: p / u
        }), t.initialImageData = j({}, t.imageData), t.sizing = !1, t.sized = !0, t.build();
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
        s.innerHTML = Jh;
        var n = s.querySelector(".".concat($, "-container")), l = n.querySelector(".".concat($, "-canvas")), p = n.querySelector(".".concat($, "-drag-box")), u = n.querySelector(".".concat($, "-crop-box")), d = u.querySelector(".".concat($, "-face"));
        this.container = o, this.cropper = n, this.canvas = l, this.dragBox = p, this.cropBox = u, this.viewBox = n.querySelector(".".concat($, "-view-box")), this.face = d, l.appendChild(a), Y(t, se), o.insertBefore(n, t.nextSibling), Be(a, Ps), this.initPreview(), this.bind(), r.initialAspectRatio = Math.max(0, r.initialAspectRatio) || NaN, r.aspectRatio = Math.max(0, r.aspectRatio) || NaN, r.viewMode = Math.max(0, Math.min(3, Math.round(r.viewMode))) || 0, Y(u, se), r.guides || Y(u.getElementsByClassName("".concat($, "-dashed")), se), r.center || Y(u.getElementsByClassName("".concat($, "-center")), se), r.background && Y(n, "".concat($, "-bg")), r.highlight || Y(d, Wh), r.cropBoxMovable && (Y(d, ca), ci(d, hi, Ra)), r.cropBoxResizable || (Y(u.getElementsByClassName("".concat($, "-line")), se), Y(u.getElementsByClassName("".concat($, "-point")), se)), this.render(), this.ready = !0, this.setDragMode(r.dragMode), r.autoCrop && this.crop(), this.setData(r.data), oe(r.ready) && he(t, Is, r.ready, {
          once: !0
        }), St(t, Is);
      }
    }
  }, {
    key: "unbuild",
    value: function() {
      if (this.ready) {
        this.ready = !1, this.unbind(), this.resetPreview();
        var t = this.cropper.parentNode;
        t && t.removeChild(this.cropper), Be(this.element, se);
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
      return window.Cropper = Dc, i;
    }
    /**
     * Change the default options.
     * @param {Object} options - The new default options.
     */
  }, {
    key: "setDefaults",
    value: function(t) {
      j(As, xt(t) && t);
    }
  }]);
}();
j(rl.prototype, vc, wc, xc, _c, Pc, Sc);
function kc(i, e) {
  const t = i.width / e.width, r = i.height / e.height, a = Math.min(t, r), o = e.width * a, s = e.height * a, n = (i.width - o) / 2, l = (i.height - s) / 2;
  return {
    width: o,
    height: s,
    left: n,
    top: l
  };
}
function Bc(i) {
  return i * (Math.PI / 180);
}
function Ic(i, e, t) {
  const r = Math.abs(Bc(t));
  return Math.max((Math.sin(r) * i + Math.cos(r) * e) / e, (Math.sin(r) * e + Math.cos(r) * i) / i);
}
function Fc(i, e, t) {
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
function Cc(i, e, t) {
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
class Tc extends ae {
  constructor(e) {
    super(e), this.onRotate90Deg = () => {
      const {
        angle90Deg: t
      } = this.state, r = t - 90;
      this.setState({
        angle90Deg: r,
        angleGranular: 0
      }), this.cropper.scale(1), this.cropper.rotateTo(r);
      const a = this.cropper.getCanvasData(), o = this.cropper.getContainerData(), s = kc(o, a);
      this.cropper.setCanvasData(s), this.cropper.setCropBoxData(s);
    }, this.onRotateGranular = (t) => {
      const r = Number(t.target.value);
      this.setState({
        angleGranular: r
      });
      const {
        angle90Deg: a
      } = this.state, o = a + r;
      this.cropper.rotateTo(o);
      const s = this.cropper.getImageData(), n = Ic(s.naturalWidth, s.naturalHeight, r), l = this.cropper.getImageData().scaleX < 0 ? -n : n;
      this.cropper.scale(l, n);
    }, this.state = {
      angle90Deg: 0,
      angleGranular: 0,
      prevCropboxData: null
    }, this.storePrevCropboxData = this.storePrevCropboxData.bind(this), this.limitCropboxMovement = this.limitCropboxMovement.bind(this);
  }
  componentDidMount() {
    const {
      opts: e,
      storeCropperInstance: t
    } = this.props;
    this.cropper = new rl(this.imgElement, e.cropperOptions), this.imgElement.addEventListener("cropstart", this.storePrevCropboxData), this.imgElement.addEventListener("cropend", this.limitCropboxMovement), t(this.cropper);
  }
  componentWillUnmount() {
    this.cropper.destroy(), this.imgElement.removeEventListener("cropstart", this.storePrevCropboxData), this.imgElement.removeEventListener("cropend", this.limitCropboxMovement);
  }
  // eslint-disable-next-line react/sort-comp
  storePrevCropboxData() {
    this.setState({
      prevCropboxData: this.cropper.getCropBoxData()
    });
  }
  limitCropboxMovement(e) {
    const t = this.cropper.getCanvasData(), r = this.cropper.getCropBoxData(), {
      prevCropboxData: a
    } = this.state;
    if (e.detail.action === "all") {
      const o = Fc(t, r, a);
      o && this.cropper.setCropBoxData(o);
    } else {
      const o = Cc(t, r, a);
      o && this.cropper.setCropBoxData(o);
    }
  }
  renderGranularRotate() {
    const {
      i18n: e
    } = this.props, {
      angleGranular: t
    } = this.state;
    return h("label", {
      role: "tooltip",
      "aria-label": `${t}º`,
      "data-microtip-position": "top",
      className: "uppy-ImageCropper-rangeWrapper"
    }, h("input", {
      className: "uppy-ImageCropper-range uppy-u-reset",
      type: "range",
      onInput: this.onRotateGranular,
      onChange: this.onRotateGranular,
      value: t,
      min: "-45",
      max: "45",
      "aria-label": e("rotate")
    }));
  }
  renderRevert() {
    const {
      i18n: e,
      opts: t
    } = this.props;
    return h("button", {
      role: "button tooltip",
      "data-microtip-position": "top",
      type: "button",
      className: "uppy-u-reset uppy-c-btn",
      "aria-label": e("revert"),
      onClick: () => {
        this.cropper.reset(), this.cropper.setAspectRatio(t.cropperOptions.initialAspectRatio), this.setState({
          angle90Deg: 0,
          angleGranular: 0
        });
      }
    }, h("svg", {
      "aria-hidden": "true",
      className: "uppy-c-icon",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, h("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    }), h("path", {
      d: "M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z"
    })));
  }
  renderRotate() {
    const {
      i18n: e
    } = this.props;
    return h("button", {
      role: "button tooltip",
      "data-microtip-position": "top",
      type: "button",
      className: "uppy-u-reset uppy-c-btn",
      "aria-label": e("rotate"),
      onClick: this.onRotate90Deg
    }, h("svg", {
      "aria-hidden": "true",
      className: "uppy-c-icon",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, h("path", {
      d: "M0 0h24v24H0V0zm0 0h24v24H0V0z",
      fill: "none"
    }), h("path", {
      d: "M14 10a2 2 0 012 2v7a2 2 0 01-2 2H6a2 2 0 01-2-2v-7a2 2 0 012-2h8zm0 1.75H6a.25.25 0 00-.243.193L5.75 12v7a.25.25 0 00.193.243L6 19.25h8a.25.25 0 00.243-.193L14.25 19v-7a.25.25 0 00-.193-.243L14 11.75zM12 .76V4c2.3 0 4.61.88 6.36 2.64a8.95 8.95 0 012.634 6.025L21 13a1 1 0 01-1.993.117L19 13h-.003a6.979 6.979 0 00-2.047-4.95 6.97 6.97 0 00-4.652-2.044L12 6v3.24L7.76 5 12 .76z"
    })));
  }
  renderFlip() {
    const {
      i18n: e
    } = this.props;
    return h("button", {
      role: "button tooltip",
      "data-microtip-position": "top",
      type: "button",
      className: "uppy-u-reset uppy-c-btn",
      "aria-label": e("flipHorizontal"),
      onClick: () => this.cropper.scaleX(-this.cropper.getData().scaleX || -1)
    }, h("svg", {
      "aria-hidden": "true",
      className: "uppy-c-icon",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, h("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    }), h("path", {
      d: "M15 21h2v-2h-2v2zm4-12h2V7h-2v2zM3 5v14c0 1.1.9 2 2 2h4v-2H5V5h4V3H5c-1.1 0-2 .9-2 2zm16-2v2h2c0-1.1-.9-2-2-2zm-8 20h2V1h-2v22zm8-6h2v-2h-2v2zM15 5h2V3h-2v2zm4 8h2v-2h-2v2zm0 8c1.1 0 2-.9 2-2h-2v2z"
    })));
  }
  renderZoomIn() {
    const {
      i18n: e
    } = this.props;
    return h("button", {
      role: "button tooltip",
      "data-microtip-position": "top",
      type: "button",
      className: "uppy-u-reset uppy-c-btn",
      "aria-label": e("zoomIn"),
      onClick: () => this.cropper.zoom(0.1)
    }, h("svg", {
      "aria-hidden": "true",
      className: "uppy-c-icon",
      height: "24",
      viewBox: "0 0 24 24",
      width: "24"
    }, h("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), h("path", {
      d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
    }), h("path", {
      d: "M12 10h-2v2H9v-2H7V9h2V7h1v2h2v1z"
    })));
  }
  renderZoomOut() {
    const {
      i18n: e
    } = this.props;
    return h("button", {
      role: "button tooltip",
      "data-microtip-position": "top",
      type: "button",
      className: "uppy-u-reset uppy-c-btn",
      "aria-label": e("zoomOut"),
      onClick: () => this.cropper.zoom(-0.1)
    }, h("svg", {
      "aria-hidden": "true",
      className: "uppy-c-icon",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, h("path", {
      d: "M0 0h24v24H0V0z",
      fill: "none"
    }), h("path", {
      d: "M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14zM7 9h5v1H7z"
    })));
  }
  renderCropSquare() {
    const {
      i18n: e
    } = this.props;
    return h("button", {
      role: "button tooltip",
      "data-microtip-position": "top",
      type: "button",
      className: "uppy-u-reset uppy-c-btn",
      "aria-label": e("aspectRatioSquare"),
      onClick: () => this.cropper.setAspectRatio(1)
    }, h("svg", {
      "aria-hidden": "true",
      className: "uppy-c-icon",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, h("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    }), h("path", {
      d: "M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"
    })));
  }
  renderCropWidescreen() {
    const {
      i18n: e
    } = this.props;
    return h("button", {
      role: "button tooltip",
      "data-microtip-position": "top",
      type: "button",
      className: "uppy-u-reset uppy-c-btn",
      "aria-label": e("aspectRatioLandscape"),
      onClick: () => this.cropper.setAspectRatio(16 / 9)
    }, h("svg", {
      "aria-hidden": "true",
      className: "uppy-c-icon",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, h("path", {
      d: "M 19,4.9999992 V 17.000001 H 4.9999998 V 6.9999992 H 19 m 0,-2 H 4.9999998 c -1.0999999,0 -1.9999999,0.9000001 -1.9999999,2 V 17.000001 c 0,1.1 0.9,2 1.9999999,2 H 19 c 1.1,0 2,-0.9 2,-2 V 6.9999992 c 0,-1.0999999 -0.9,-2 -2,-2 z"
    }), h("path", {
      fill: "none",
      d: "M0 0h24v24H0z"
    })));
  }
  renderCropWidescreenVertical() {
    const {
      i18n: e
    } = this.props;
    return h("button", {
      role: "button tooltip",
      "data-microtip-position": "top",
      type: "button",
      "aria-label": e("aspectRatioPortrait"),
      className: "uppy-u-reset uppy-c-btn",
      onClick: () => this.cropper.setAspectRatio(9 / 16)
    }, h("svg", {
      "aria-hidden": "true",
      className: "uppy-c-icon",
      width: "24",
      height: "24",
      viewBox: "0 0 24 24"
    }, h("path", {
      d: "M 19.000001,19 H 6.999999 V 5 h 10.000002 v 14 m 2,0 V 5 c 0,-1.0999999 -0.9,-1.9999999 -2,-1.9999999 H 6.999999 c -1.1,0 -2,0.9 -2,1.9999999 v 14 c 0,1.1 0.9,2 2,2 h 10.000002 c 1.1,0 2,-0.9 2,-2 z"
    }), h("path", {
      d: "M0 0h24v24H0z",
      fill: "none"
    })));
  }
  render() {
    const {
      currentImage: e,
      opts: t
    } = this.props, {
      actions: r
    } = t, a = URL.createObjectURL(e.data);
    return h("div", {
      className: "uppy-ImageCropper"
    }, h("div", {
      className: "uppy-ImageCropper-container"
    }, h("img", {
      className: "uppy-ImageCropper-image",
      alt: e.name,
      src: a,
      ref: (o) => {
        this.imgElement = o;
      }
    })), h("div", {
      className: "uppy-ImageCropper-controls"
    }, r.revert && this.renderRevert(), r.rotate && this.renderRotate(), r.granularRotate && this.renderGranularRotate(), r.flip && this.renderFlip(), r.zoomIn && this.renderZoomIn(), r.zoomOut && this.renderZoomOut(), r.cropSquare && this.renderCropSquare(), r.cropWidescreen && this.renderCropWidescreen(), r.cropWidescreenVertical && this.renderCropWidescreenVertical()));
  }
}
const Ac = {
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
}, Ec = {
  version: "3.3.3"
}, al = {
  viewMode: 0,
  background: !1,
  autoCropArea: 1,
  responsive: !0,
  minCropBoxWidth: 70,
  minCropBoxHeight: 70,
  croppedCanvasOptions: {},
  initialAspectRatio: 0
}, ol = {
  revert: !0,
  rotate: !0,
  granularRotate: !0,
  flip: !0,
  zoomIn: !0,
  zoomOut: !0,
  cropSquare: !0,
  cropWidescreen: !0,
  cropWidescreenVertical: !0
}, Oc = {
  // `quality: 1` increases the image size by orders of magnitude - 0.8 seems to be the sweet spot.
  // see https://github.com/fengyuanchen/cropperjs/issues/538#issuecomment-1776279427
  quality: 0.8,
  actions: ol,
  cropperOptions: al
};
class sl extends Ge {
  constructor(e, t) {
    super(e, {
      ...Oc,
      ...t,
      actions: {
        ...ol,
        ...t?.actions
      },
      cropperOptions: {
        ...al,
        ...t?.cropperOptions
      }
    }), this.save = () => {
      const r = (s) => {
        var n;
        const {
          currentImage: l
        } = this.getPluginState();
        this.uppy.setFileState(l.id, {
          // Reinserting image's name and type, because .toBlob loses both.
          data: new File([s], (n = l.name) != null ? n : this.i18n("unnamed"), {
            type: s.type
          }),
          size: s.size,
          preview: void 0
        });
        const p = this.uppy.getFile(l.id);
        this.uppy.emit("thumbnail:request", p), this.setPluginState({
          currentImage: p
        }), this.uppy.emit("file-editor:complete", p);
      }, {
        currentImage: a
      } = this.getPluginState(), o = this.cropper.getCroppedCanvas({});
      o.width % 2 !== 0 && this.cropper.setData({
        width: o.width - 1
      }), o.height % 2 !== 0 && this.cropper.setData({
        height: o.height - 1
      }), this.cropper.getCroppedCanvas(this.opts.cropperOptions.croppedCanvasOptions).toBlob(r, a.type, this.opts.quality);
    }, this.storeCropperInstance = (r) => {
      this.cropper = r;
    }, this.selectFile = (r) => {
      this.uppy.emit("file-editor:start", r), this.setPluginState({
        currentImage: r
      });
    }, this.id = this.opts.id || "ImageEditor", this.title = "Image Editor", this.type = "editor", this.defaultLocale = Ac, this.i18nInit();
  }
  // eslint-disable-next-line class-methods-use-this
  canEditFile(e) {
    if (!e.type || e.isRemote)
      return !1;
    const t = e.type.split("/")[1];
    return !!/^(jpe?g|gif|png|bmp|webp)$/.test(t);
  }
  install() {
    this.setPluginState({
      currentImage: null
    });
    const {
      target: e
    } = this.opts;
    e && this.mount(e, this);
  }
  uninstall() {
    const {
      currentImage: e
    } = this.getPluginState();
    if (e) {
      const t = this.uppy.getFile(e.id);
      this.uppy.emit("file-editor:cancel", t);
    }
    this.unmount();
  }
  render() {
    const {
      currentImage: e
    } = this.getPluginState();
    return e === null || e.isRemote ? null : h(Tc, {
      currentImage: e,
      storeCropperInstance: this.storeCropperInstance,
      save: this.save,
      opts: this.opts,
      i18n: this.i18n
    });
  }
}
sl.VERSION = Ec.version;
const zc = ".uppy-Root{box-sizing:border-box;color:#333;font-family:-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Segoe UI Symbol,Segoe UI Emoji,Apple Color Emoji,Roboto,Helvetica,Arial,sans-serif;line-height:1;position:relative;text-align:left;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.uppy-Root[dir=rtl],[dir=rtl] .uppy-Root{text-align:right}.uppy-Root *,.uppy-Root :after,.uppy-Root :before{box-sizing:inherit}.uppy-Root [hidden]{display:none}.uppy-u-reset{all:initial;-webkit-appearance:none;appearance:none;box-sizing:border-box;font-family:-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Segoe UI Symbol,Segoe UI Emoji,Apple Color Emoji,Roboto,Helvetica,Arial,sans-serif;line-height:1}[dir=rtl] .uppy-u-reset{text-align:right}.uppy-c-textInput{background-color:#fff;border:1px solid #ddd;border-radius:4px;font-family:inherit;font-size:14px;line-height:1.5;padding:6px 8px}.uppy-size--md .uppy-c-textInput{padding:8px 10px}.uppy-c-textInput:focus{border-color:#1269cf99;box-shadow:0 0 0 3px #1269cf26;outline:none}[data-uppy-theme=dark] .uppy-c-textInput{background-color:#333;border-color:#333;color:#eaeaea}[data-uppy-theme=dark] .uppy-c-textInput:focus{border-color:#525252;box-shadow:none}.uppy-c-icon{display:inline-block;max-height:100%;max-width:100%;overflow:hidden;fill:currentColor}.uppy-c-btn{align-items:center;color:inherit;display:inline-flex;font-family:inherit;font-size:inherit;font-weight:500;justify-content:center;line-height:1;transition-duration:.3s;transition-property:background-color,color;-webkit-user-select:none;user-select:none;white-space:nowrap}.uppy-c-btn,[dir=rtl] .uppy-c-btn{text-align:center}.uppy-c-btn:not(:disabled):not(.disabled){cursor:pointer}.uppy-c-btn::-moz-focus-inner{border:0}.uppy-c-btn-primary{background-color:#1269cf;border-radius:4px;color:#fff;font-size:14px;padding:10px 18px}.uppy-c-btn-primary:not(:disabled):hover{background-color:#0e51a0}.uppy-c-btn-primary:focus{box-shadow:0 0 0 3px #1269cf66;outline:none}.uppy-size--md .uppy-c-btn-primary{padding:13px 22px}[data-uppy-theme=dark] .uppy-c-btn-primary{color:#eaeaea}[data-uppy-theme=dark] .uppy-c-btn-primary:focus{outline:none}[data-uppy-theme=dark] .uppy-c-btn-primary::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-c-btn-primary:focus{box-shadow:0 0 0 2px #aae1ffd9}.uppy-c-btn-primary.uppy-c-btn--disabled{background-color:#8eb2db}.uppy-c-btn-link{background-color:initial;border-radius:4px;color:#525252;font-size:14px;line-height:1;padding:10px 15px}.uppy-c-btn-link:hover{color:#333}.uppy-c-btn-link:focus{box-shadow:0 0 0 3px #1269cf40;outline:none}.uppy-size--md .uppy-c-btn-link{padding:13px 18px}[data-uppy-theme=dark] .uppy-c-btn-link{color:#eaeaea}[data-uppy-theme=dark] .uppy-c-btn-link:focus{outline:none}[data-uppy-theme=dark] .uppy-c-btn-link::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-c-btn-link:focus{box-shadow:0 0 0 2px #aae1ffd9}[data-uppy-theme=dark] .uppy-c-btn-link:hover{color:#939393}", Mc = `@charset "UTF-8";.uppy-Informer{bottom:60px;left:0;position:absolute;right:0;text-align:center;z-index:1005}.uppy-Informer span>div{margin-bottom:6px}.uppy-Informer-animated{opacity:0;transform:translateY(350%);transition:all .3s ease-in;z-index:-1000}.uppy-Informer p{background-color:#757575;border-radius:18px;color:#fff;display:inline-block;font-size:12px;font-weight:400;line-height:1.4;margin:0;max-width:90%;padding:6px 15px}.uppy-size--md .uppy-Informer p{font-size:14px;line-height:1.3;max-width:500px;padding:10px 20px}[data-uppy-theme=dark] .uppy-Informer p{background-color:#333}[dir=ltr] .uppy-Informer p span{left:3px}[dir=rtl] .uppy-Informer p span{right:3px}[dir=ltr] .uppy-Informer p span{margin-left:-1px}[dir=rtl] .uppy-Informer p span{margin-right:-1px}.uppy-Informer p span{background-color:#fff;border-radius:50%;color:#525252;display:inline-block;font-size:10px;height:13px;line-height:12px;position:relative;top:-1px;vertical-align:middle;width:13px}.uppy-Informer p span:hover{cursor:help}.uppy-Informer p span:after{line-height:1.3;word-wrap:break-word}.uppy-Root [aria-label][role~=tooltip]{position:relative}.uppy-Root [aria-label][role~=tooltip]:after,.uppy-Root [aria-label][role~=tooltip]:before{-webkit-backface-visibility:hidden;backface-visibility:hidden;box-sizing:border-box;opacity:0;pointer-events:none;position:absolute;transform:translateZ(0);transform-origin:top;transition:all var(--microtip-transition-duration,.18s) var(--microtip-transition-easing,ease-in-out) var(--microtip-transition-delay,0s);will-change:transform;z-index:10}.uppy-Root [aria-label][role~=tooltip]:before{background-size:100% auto!important;content:""}.uppy-Root [aria-label][role~=tooltip]:after{background:#111111e6;border-radius:4px;box-sizing:initial;color:#fff;content:attr(aria-label);font-size:var(--microtip-font-size,13px);font-weight:var(--microtip-font-weight,normal);padding:.5em 1em;text-transform:var(--microtip-text-transform,none);white-space:nowrap}.uppy-Root [aria-label][role~=tooltip]:focus:after,.uppy-Root [aria-label][role~=tooltip]:focus:before,.uppy-Root [aria-label][role~=tooltip]:hover:after,.uppy-Root [aria-label][role~=tooltip]:hover:before{opacity:1;pointer-events:auto}.uppy-Root [role~=tooltip][data-microtip-position|=top]:before{background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='12'%3E%3Cpath fill='rgba(17, 17, 17, 0.9)' d='M2.658 0h32.004c-6 0-11.627 12.002-16.002 12.002S8.594 0 2.658 0'/%3E%3C/svg%3E") no-repeat;bottom:100%;height:6px;left:50%;margin-bottom:5px;transform:translate3d(-50%,0,0);width:18px}.uppy-Root [role~=tooltip][data-microtip-position|=top]:after{bottom:100%;left:50%;margin-bottom:11px;transform:translate3d(-50%,0,0)}.uppy-Root [role~=tooltip][data-microtip-position=top]:hover:after,.uppy-Root [role~=tooltip][data-microtip-position|=top]:hover:before{transform:translate3d(-50%,-5px,0)}.uppy-Root [role~=tooltip][data-microtip-position=top-left]:after{bottom:100%;transform:translate3d(calc(-100% + 16px),0,0)}.uppy-Root [role~=tooltip][data-microtip-position=top-left]:hover:after{transform:translate3d(calc(-100% + 16px),-5px,0)}.uppy-Root [role~=tooltip][data-microtip-position=top-right]:after{bottom:100%;transform:translate3d(-16px,0,0)}.uppy-Root [role~=tooltip][data-microtip-position=top-right]:hover:after{transform:translate3d(-16px,-5px,0)}.uppy-Root [role~=tooltip][data-microtip-position|=bottom]:before{background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='12'%3E%3Cpath fill='rgba(17, 17, 17, 0.9)' d='M33.342 12H1.338c6 0 11.627-12.002 16.002-12.002S27.406 12 33.342 12'/%3E%3C/svg%3E") no-repeat;bottom:auto;height:6px;left:50%;margin-bottom:0;margin-top:5px;top:100%;transform:translate3d(-50%,-10px,0);width:18px}.uppy-Root [role~=tooltip][data-microtip-position|=bottom]:after{left:50%;margin-top:11px;top:100%;transform:translate3d(-50%,-10px,0)}.uppy-Root [role~=tooltip][data-microtip-position=bottom]:hover:after,.uppy-Root [role~=tooltip][data-microtip-position|=bottom]:hover:before{transform:translate3d(-50%,0,0)}.uppy-Root [role~=tooltip][data-microtip-position=bottom-left]:after{top:100%;transform:translate3d(calc(-100% + 16px),-10px,0)}.uppy-Root [role~=tooltip][data-microtip-position=bottom-left]:hover:after{transform:translate3d(calc(-100% + 16px),0,0)}.uppy-Root [role~=tooltip][data-microtip-position=bottom-right]:after{top:100%;transform:translate3d(-16px,-10px,0)}.uppy-Root [role~=tooltip][data-microtip-position=bottom-right]:hover:after{transform:translate3d(-16px,0,0)}.uppy-Root [role~=tooltip][data-microtip-position=left]:after,.uppy-Root [role~=tooltip][data-microtip-position=left]:before{inset:50% 100% auto auto;transform:translate3d(10px,-50%,0)}.uppy-Root [role~=tooltip][data-microtip-position=left]:before{background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='36'%3E%3Cpath fill='rgba(17, 17, 17, 0.9)' d='M0 33.342V1.338c0 6 12.002 11.627 12.002 16.002S0 27.406 0 33.342'/%3E%3C/svg%3E") no-repeat;height:18px;margin-bottom:0;margin-right:5px;width:6px}.uppy-Root [role~=tooltip][data-microtip-position=left]:after{margin-right:11px}.uppy-Root [role~=tooltip][data-microtip-position=left]:hover:after,.uppy-Root [role~=tooltip][data-microtip-position=left]:hover:before{transform:translate3d(0,-50%,0)}.uppy-Root [role~=tooltip][data-microtip-position=right]:after,.uppy-Root [role~=tooltip][data-microtip-position=right]:before{bottom:auto;left:100%;top:50%;transform:translate3d(-10px,-50%,0)}.uppy-Root [role~=tooltip][data-microtip-position=right]:before{background:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='36'%3E%3Cpath fill='rgba(17, 17, 17, 0.9)' d='M12 2.658v32.004c0-6-12.002-11.627-12.002-16.002S12 8.594 12 2.658'/%3E%3C/svg%3E") no-repeat;height:18px;margin-bottom:0;margin-left:5px;width:6px}.uppy-Root [role~=tooltip][data-microtip-position=right]:after{margin-left:11px}.uppy-Root [role~=tooltip][data-microtip-position=right]:hover:after,.uppy-Root [role~=tooltip][data-microtip-position=right]:hover:before{transform:translate3d(0,-50%,0)}.uppy-Root [role~=tooltip][data-microtip-size=small]:after{white-space:normal;width:80px}.uppy-Root [role~=tooltip][data-microtip-size=medium]:after{white-space:normal;width:150px}.uppy-Root [role~=tooltip][data-microtip-size=large]:after{white-space:normal;width:260px}.uppy-StatusBar{background-color:#fff;color:#fff;display:flex;font-size:12px;font-weight:400;height:46px;line-height:40px;position:relative;transition:height .2s;z-index:1001}[data-uppy-theme=dark] .uppy-StatusBar{background-color:#1f1f1f}.uppy-StatusBar:before{background-color:#eaeaea;content:"";height:2px;inset:0;position:absolute;width:100%}[data-uppy-theme=dark] .uppy-StatusBar:before{background-color:#757575}.uppy-StatusBar[aria-hidden=true]{height:0;overflow-y:hidden}.uppy-StatusBar.is-complete .uppy-StatusBar-progress{background-color:#1bb240}.uppy-StatusBar.is-error .uppy-StatusBar-progress{background-color:#e32437}.uppy-StatusBar.is-complete .uppy-StatusBar-statusIndicator{color:#1bb240}.uppy-StatusBar.is-error .uppy-StatusBar-statusIndicator{color:#e32437}.uppy-StatusBar:not([aria-hidden=true]).is-waiting{background-color:#fff;border-top:1px solid #eaeaea;height:65px}[data-uppy-theme=dark] .uppy-StatusBar:not([aria-hidden=true]).is-waiting{background-color:#1f1f1f;border-top:1px solid #333}.uppy-StatusBar-progress{background-color:#1269cf;height:2px;position:absolute;transition:background-color,width .3s ease-out;z-index:1001}.uppy-StatusBar-progress.is-indeterminate{animation:uppy-StatusBar-ProgressStripes 1s linear infinite;background-image:linear-gradient(45deg,#0000004d 25%,#0000 0 50%,#0000004d 0 75%,#0000 0,#0000);background-size:64px 64px}@keyframes uppy-StatusBar-ProgressStripes{0%{background-position:0 0}to{background-position:64px 0}}.uppy-StatusBar.is-postprocessing .uppy-StatusBar-progress,.uppy-StatusBar.is-preprocessing .uppy-StatusBar-progress{background-color:#f6a623}.uppy-StatusBar.is-waiting .uppy-StatusBar-progress{display:none}[dir=ltr] .uppy-StatusBar-content{padding-left:10px}[dir=rtl] .uppy-StatusBar-content{padding-right:10px}.uppy-StatusBar-content{align-items:center;color:#333;display:flex;height:100%;position:relative;text-overflow:ellipsis;white-space:nowrap;z-index:1002}[dir=ltr] .uppy-size--md .uppy-StatusBar-content{padding-left:15px}[dir=rtl] .uppy-size--md .uppy-StatusBar-content{padding-right:15px}[data-uppy-theme=dark] .uppy-StatusBar-content{color:#eaeaea}[dir=ltr] .uppy-StatusBar-status{padding-right:.3em}[dir=rtl] .uppy-StatusBar-status{padding-left:.3em}.uppy-StatusBar-status{display:flex;flex-direction:column;font-weight:400;justify-content:center;line-height:1.4}.uppy-StatusBar-statusPrimary{display:flex;font-weight:500;line-height:1}.uppy-StatusBar-statusPrimary button.uppy-StatusBar-details{margin-left:5px}[data-uppy-theme=dark] .uppy-StatusBar-statusPrimary{color:#eaeaea}.uppy-StatusBar-statusSecondary{color:#757575;display:inline-block;font-size:11px;line-height:1.2;margin-top:1px;white-space:nowrap}[data-uppy-theme=dark] .uppy-StatusBar-statusSecondary{color:#bbb}[dir=ltr] .uppy-StatusBar-statusSecondaryHint{margin-right:5px}[dir=rtl] .uppy-StatusBar-statusSecondaryHint{margin-left:5px}.uppy-StatusBar-statusSecondaryHint{display:inline-block;line-height:1;vertical-align:middle}[dir=ltr] .uppy-size--md .uppy-StatusBar-statusSecondaryHint{margin-right:8px}[dir=rtl] .uppy-size--md .uppy-StatusBar-statusSecondaryHint{margin-left:8px}[dir=ltr] .uppy-StatusBar-statusIndicator{margin-right:7px}[dir=rtl] .uppy-StatusBar-statusIndicator{margin-left:7px}.uppy-StatusBar-statusIndicator{color:#525252;position:relative;top:1px}.uppy-StatusBar-statusIndicator svg{vertical-align:text-bottom}[dir=ltr] .uppy-StatusBar-actions{right:10px}[dir=rtl] .uppy-StatusBar-actions{left:10px}.uppy-StatusBar-actions{align-items:center;bottom:0;display:flex;position:absolute;top:0;z-index:1004}.uppy-StatusBar.is-waiting .uppy-StatusBar-actions{background-color:#fafafa;height:100%;padding:0 15px;position:static;width:100%}[data-uppy-theme=dark] .uppy-StatusBar.is-waiting .uppy-StatusBar-actions{background-color:#1f1f1f}.uppy-StatusBar:not([aria-hidden=true]).is-waiting.has-ghosts{flex-direction:column;height:90px}.uppy-size--md .uppy-StatusBar:not([aria-hidden=true]).is-waiting.has-ghosts{flex-direction:row;height:65px}.uppy-StatusBar:not([aria-hidden=true]).is-waiting.has-ghosts .uppy-StatusBar-actions{flex-direction:column;justify-content:center}.uppy-size--md .uppy-StatusBar:not([aria-hidden=true]).is-waiting.has-ghosts .uppy-StatusBar-actions{flex-direction:row;justify-content:normal}.uppy-StatusBar-actionCircleBtn{cursor:pointer;line-height:1;margin:3px;opacity:.9}.uppy-StatusBar-actionCircleBtn:focus{outline:none}.uppy-StatusBar-actionCircleBtn::-moz-focus-inner{border:0}.uppy-StatusBar-actionCircleBtn:focus{box-shadow:0 0 0 3px #1269cf80}[data-uppy-theme=dark] .uppy-StatusBar-actionCircleBtn:focus{outline:none}[data-uppy-theme=dark] .uppy-StatusBar-actionCircleBtn::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-StatusBar-actionCircleBtn:focus{box-shadow:0 0 0 2px #aae1ffd9}.uppy-StatusBar-actionCircleBtn:hover{opacity:1}.uppy-StatusBar-actionCircleBtn:focus{border-radius:50%}.uppy-StatusBar-actionCircleBtn svg{vertical-align:bottom}.uppy-StatusBar-actionBtn{color:#1269cf;display:inline-block;font-size:10px;line-height:inherit;vertical-align:middle}.uppy-size--md .uppy-StatusBar-actionBtn{font-size:11px}.uppy-StatusBar-actionBtn--disabled{opacity:.4}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--disabled{opacity:.7}[dir=ltr] .uppy-StatusBar-actionBtn--retry{margin-right:6px}[dir=rtl] .uppy-StatusBar-actionBtn--retry{margin-left:6px}.uppy-StatusBar-actionBtn--retry{background-color:#ff4b23;border-radius:8px;color:#fff;height:16px;line-height:1;padding:1px 6px 3px 18px;position:relative}.uppy-StatusBar-actionBtn--retry:focus{outline:none}.uppy-StatusBar-actionBtn--retry::-moz-focus-inner{border:0}.uppy-StatusBar-actionBtn--retry:focus{box-shadow:0 0 0 3px #1269cf80}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--retry:focus{outline:none}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--retry::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--retry:focus{box-shadow:0 0 0 2px #aae1ffd9}.uppy-StatusBar-actionBtn--retry:hover{background-color:#f92d00}[dir=ltr] .uppy-StatusBar-actionBtn--retry svg{left:6px}[dir=rtl] .uppy-StatusBar-actionBtn--retry svg{right:6px}.uppy-StatusBar-actionBtn--retry svg{position:absolute;top:3px}.uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload{background-color:#1bb240;color:#fff;font-size:14px;line-height:1;padding:15px 10px;width:100%}.uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload:hover{background-color:#189c38}[data-uppy-theme=dark] .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload{background-color:#1c8b37}[data-uppy-theme=dark] .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload:hover{background-color:#18762f}.uppy-size--md .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload{padding:13px 22px;width:auto}.uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload.uppy-StatusBar-actionBtn--disabled:hover{background-color:#1bb240;cursor:not-allowed}[data-uppy-theme=dark] .uppy-StatusBar.is-waiting .uppy-StatusBar-actionBtn--upload.uppy-StatusBar-actionBtn--disabled:hover{background-color:#1c8b37}.uppy-StatusBar:not(.is-waiting) .uppy-StatusBar-actionBtn--upload{background-color:initial;color:#1269cf}[dir=ltr] .uppy-StatusBar-actionBtn--uploadNewlyAdded{padding-right:3px}[dir=ltr] .uppy-StatusBar-actionBtn--uploadNewlyAdded,[dir=rtl] .uppy-StatusBar-actionBtn--uploadNewlyAdded{padding-left:3px}[dir=rtl] .uppy-StatusBar-actionBtn--uploadNewlyAdded{padding-right:3px}.uppy-StatusBar-actionBtn--uploadNewlyAdded{border-radius:3px;padding-bottom:1px}.uppy-StatusBar-actionBtn--uploadNewlyAdded:focus{outline:none}.uppy-StatusBar-actionBtn--uploadNewlyAdded::-moz-focus-inner{border:0}.uppy-StatusBar-actionBtn--uploadNewlyAdded:focus{box-shadow:0 0 0 3px #1269cf80}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--uploadNewlyAdded:focus{outline:none}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--uploadNewlyAdded::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--uploadNewlyAdded:focus{box-shadow:0 0 0 2px #aae1ffd9}.uppy-StatusBar.is-postprocessing .uppy-StatusBar-actionBtn--uploadNewlyAdded,.uppy-StatusBar.is-preprocessing .uppy-StatusBar-actionBtn--uploadNewlyAdded{display:none}.uppy-StatusBar-actionBtn--done{border-radius:3px;line-height:1;padding:7px 8px}.uppy-StatusBar-actionBtn--done:focus{outline:none}.uppy-StatusBar-actionBtn--done::-moz-focus-inner{border:0}.uppy-StatusBar-actionBtn--done:hover{color:#0e51a0}.uppy-StatusBar-actionBtn--done:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--done:focus{background-color:#333}[data-uppy-theme=dark] .uppy-StatusBar-actionBtn--done{color:#02baf2}.uppy-size--md .uppy-StatusBar-actionBtn--done{font-size:14px}.uppy-StatusBar-serviceMsg{color:#000;font-size:11px;line-height:1.1;padding-left:10px}.uppy-size--md .uppy-StatusBar-serviceMsg{font-size:14px;padding-left:15px}[data-uppy-theme=dark] .uppy-StatusBar-serviceMsg{color:#eaeaea}.uppy-StatusBar-serviceMsg-ghostsIcon{left:6px;opacity:.5;position:relative;top:2px;vertical-align:text-bottom;width:10px}.uppy-size--md .uppy-StatusBar-serviceMsg-ghostsIcon{left:10px;top:1px;width:15px}[dir=ltr] .uppy-StatusBar-details{left:2px}[dir=rtl] .uppy-StatusBar-details{right:2px}.uppy-StatusBar-details{-webkit-appearance:none;appearance:none;background-color:#939393;border-radius:50%;color:#fff;cursor:help;display:inline-block;font-size:10px;font-weight:600;height:13px;line-height:12px;position:relative;text-align:center;top:0;vertical-align:middle;width:13px}.uppy-StatusBar-details:after{line-height:1.3;word-wrap:break-word}[dir=ltr] .uppy-StatusBar-spinner{margin-right:10px}[dir=rtl] .uppy-StatusBar-spinner{margin-left:10px}.uppy-StatusBar-spinner{animation-duration:1s;animation-iteration-count:infinite;animation-name:uppy-StatusBar-spinnerAnimation;animation-timing-function:linear;fill:#1269cf}.uppy-StatusBar.is-postprocessing .uppy-StatusBar-spinner,.uppy-StatusBar.is-preprocessing .uppy-StatusBar-spinner{fill:#f6a623}@keyframes uppy-StatusBar-spinnerAnimation{0%{transform:rotate(0)}to{transform:rotate(1turn)}}.uppy-ProviderBrowser-viewType--grid ul.uppy-ProviderBrowser-list,.uppy-ProviderBrowser-viewType--unsplash ul.uppy-ProviderBrowser-list{align-items:flex-start;display:flex;flex-direction:row;flex-wrap:wrap;justify-content:space-between;padding:6px}.uppy-ProviderBrowser-viewType--grid ul.uppy-ProviderBrowser-list:after,.uppy-ProviderBrowser-viewType--unsplash ul.uppy-ProviderBrowser-list:after{content:"";flex:auto}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem{margin:0;position:relative;width:50%}.uppy-size--md .uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem,.uppy-size--md .uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem{width:33.3333%}.uppy-size--lg .uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem,.uppy-size--lg .uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem{width:25%}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem:before,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem:before{content:"";display:block;padding-top:100%}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--selected img,.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--selected svg,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--selected img,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--selected svg{opacity:.85}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--disabled,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--disabled{opacity:.5}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--noPreview .uppy-ProviderBrowserItem-inner,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--noPreview .uppy-ProviderBrowserItem-inner{background-color:#93939333}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--noPreview .uppy-ProviderBrowserItem-inner,[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--noPreview .uppy-ProviderBrowserItem-inner{background-color:#eaeaea33}.uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--noPreview svg,.uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--noPreview svg{height:30%;width:30%;fill:#000000b3}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--grid li.uppy-ProviderBrowserItem--noPreview svg,[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--unsplash li.uppy-ProviderBrowserItem--noPreview svg{fill:#fffc}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-inner,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-inner{border-radius:4px;height:calc(100% - 14px);inset:7px;overflow:hidden;position:absolute;text-align:center;width:calc(100% - 14px)}@media (hover:none){.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-inner .uppy-ProviderBrowserItem-author,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-inner .uppy-ProviderBrowserItem-author{display:block}}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-inner,[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-inner{box-shadow:0 0 0 3px #aae1ffb3}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-inner img,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-inner img{border-radius:4px;height:100%;object-fit:cover;width:100%}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-author,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-author{background:#0000004d;bottom:0;color:#fff;display:none;font-size:12px;font-weight:500;left:0;margin:0;padding:5px;position:absolute;text-decoration:none;width:100%}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-author:hover,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-author:hover{background:#0006;text-decoration:underline}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox{background-color:#1269cf;border-radius:50%;height:26px;opacity:0;position:absolute;right:16px;top:16px;width:26px;z-index:1002}[dir=ltr] .uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox:after,[dir=ltr] .uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox:after{left:7px}[dir=rtl] .uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox:after,[dir=rtl] .uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox:after{right:7px}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox:after,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox:after{height:7px;top:8px;width:12px}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox{opacity:1}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox--grid:focus+label .uppy-ProviderBrowserItem-author,.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox--grid:hover+label .uppy-ProviderBrowserItem-author,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox--grid:focus+label .uppy-ProviderBrowserItem-author,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox--grid:hover+label .uppy-ProviderBrowserItem-author{display:block}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox--grid:focus+label,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox--grid:focus+label{box-shadow:0 0 0 3px #1269cf80}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox--grid:focus+label:focus,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox--grid:focus+label:focus{outline:none}.uppy-ProviderBrowser-viewType--grid .uppy-ProviderBrowserItem-checkbox--grid:focus+label::-moz-focus-inner,.uppy-ProviderBrowser-viewType--unsplash .uppy-ProviderBrowserItem-checkbox--grid:focus+label::-moz-focus-inner{border:0}.uppy-ProviderBrowser-viewType--list{background-color:#fff}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--list{background-color:#1f1f1f}.uppy-ProviderBrowser-viewType--list li.uppy-ProviderBrowserItem{align-items:center;display:flex;margin:0;padding:7px 15px}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--list li.uppy-ProviderBrowserItem{color:#eaeaea}.uppy-ProviderBrowser-viewType--list li.uppy-ProviderBrowserItem--disabled{opacity:.6}[dir=ltr] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox{margin-right:15px}[dir=rtl] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox{margin-left:15px}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox{background-color:#fff;border:1px solid #cfcfcf;border-radius:3px;height:17px;width:17px}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox:focus{border:1px solid #1269cf;box-shadow:0 0 0 3px #1269cf40;outline:none}[dir=ltr] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox:after{left:3px}[dir=rtl] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox:after{right:3px}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox:after{height:5px;opacity:0;top:4px;width:9px}[data-uppy-theme=dark] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-checkbox:focus{border-color:#02baf2b3;box-shadow:0 0 0 3px #02baf233}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox,.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem--is-partial .uppy-ProviderBrowserItem-checkbox{background-color:#1269cf;border-color:#1269cf}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox:after,.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem--is-partial .uppy-ProviderBrowserItem-checkbox:after{opacity:1}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner{align-items:center;color:inherit;display:flex;font-family:-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Segoe UI Symbol,Segoe UI Emoji,Apple Color Emoji,Roboto,Helvetica,Arial,sans-serif;overflow:hidden;padding:2px;text-overflow:ellipsis;white-space:nowrap}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner:focus{outline:none;text-decoration:underline}[dir=ltr] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner img,[dir=ltr] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner svg{margin-right:8px}[dir=rtl] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner img,[dir=rtl] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner svg{margin-left:8px}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-inner span{line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem--disabled .uppy-ProviderBrowserItem-inner{cursor:default}[dir=ltr] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-iconWrap{margin-right:7px}[dir=rtl] .uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-iconWrap{margin-left:7px}.uppy-ProviderBrowser-viewType--list .uppy-ProviderBrowserItem-iconWrap{width:20px}.uppy-ProviderBrowserItem-checkbox{cursor:pointer;flex-shrink:0;position:relative}.uppy-ProviderBrowserItem-checkbox:disabled,.uppy-ProviderBrowserItem-checkbox:disabled:after{cursor:default}[data-uppy-theme=dark] .uppy-ProviderBrowserItem-checkbox{background-color:#1f1f1f;border-color:#939393}[data-uppy-theme=dark] .uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox{background-color:#333}.uppy-ProviderBrowserItem--is-checked .uppy-ProviderBrowserItem-checkbox:after{border-bottom:2px solid #eaeaea;border-left:2px solid #eaeaea;content:"";cursor:pointer;position:absolute;transform:rotate(-45deg)}.uppy-ProviderBrowserItem--is-partial .uppy-ProviderBrowserItem-checkbox:after{background-color:#eaeaea!important;content:""!important;height:2px!important;left:20%!important;position:absolute!important;right:20%!important;top:50%!important;transform:translateY(-50%)!important}.uppy-SearchProvider{align-items:center;display:flex;flex:1;flex-direction:column;height:100%;justify-content:center;width:100%}[data-uppy-theme=dark] .uppy-SearchProvider{background-color:#1f1f1f}.uppy-SearchProvider-input{margin-bottom:15px;max-width:650px;width:90%}.uppy-size--md .uppy-SearchProvider-input{margin-bottom:20px}.uppy-SearchProvider-input::-webkit-search-cancel-button{display:none}.uppy-SearchProvider-searchButton{padding:13px 25px}.uppy-size--md .uppy-SearchProvider-searchButton{padding:13px 30px}.uppy-DashboardContent-panelBody{align-items:center;display:flex;flex:1;justify-content:center}[data-uppy-theme=dark] .uppy-DashboardContent-panelBody{background-color:#1f1f1f}.uppy-Provider-auth,.uppy-Provider-empty,.uppy-Provider-error,.uppy-Provider-loading{align-items:center;color:#939393;display:flex;flex:1;flex-flow:column wrap;justify-content:center}.uppy-Provider-empty{color:#939393}.uppy-Provider-authIcon svg{height:75px;width:100px}.uppy-Provider-authTitle{color:#757575;font-size:17px;font-weight:400;line-height:1.4;margin-bottom:30px;max-width:500px;padding:0 15px;text-align:center}.uppy-size--md .uppy-Provider-authTitle{font-size:20px}[data-uppy-theme=dark] .uppy-Provider-authTitle{color:#cfcfcf}.uppy-Provider-btn-google{align-items:center;background:#4285f4;display:flex;padding:8px 12px!important}.uppy-Provider-btn-google:hover{background-color:#1266f1}.uppy-Provider-btn-google:focus{box-shadow:0 0 0 3px #4285f466;outline:none}.uppy-Provider-btn-google svg{margin-right:8px}[dir=ltr] .uppy-Provider-breadcrumbs{text-align:left}[dir=rtl] .uppy-Provider-breadcrumbs{text-align:right}.uppy-Provider-breadcrumbs{color:#525252;flex:1;font-size:12px;margin-bottom:10px}.uppy-size--md .uppy-Provider-breadcrumbs{margin-bottom:0}[data-uppy-theme=dark] .uppy-Provider-breadcrumbs{color:#eaeaea}[dir=ltr] .uppy-Provider-breadcrumbsIcon{margin-right:4px}[dir=rtl] .uppy-Provider-breadcrumbsIcon{margin-left:4px}.uppy-Provider-breadcrumbsIcon{color:#525252;display:inline-block;line-height:1;vertical-align:middle}.uppy-Provider-breadcrumbsIcon svg{height:13px;width:13px;fill:#525252}.uppy-Provider-breadcrumbs button{border-radius:3px;display:inline-block;line-height:inherit;padding:4px}.uppy-Provider-breadcrumbs button:focus{outline:none}.uppy-Provider-breadcrumbs button::-moz-focus-inner{border:0}.uppy-Provider-breadcrumbs button:hover{color:#0e51a0}.uppy-Provider-breadcrumbs button:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-Provider-breadcrumbs button:focus{background-color:#333}.uppy-Provider-breadcrumbs button:not(:last-of-type){text-decoration:underline}.uppy-Provider-breadcrumbs button:last-of-type{color:#333;cursor:normal;font-weight:500;pointer-events:none}.uppy-Provider-breadcrumbs button:hover{cursor:pointer}[data-uppy-theme=dark] .uppy-Provider-breadcrumbs button{color:#eaeaea}.uppy-ProviderBrowser{display:flex;flex:1;flex-direction:column;font-size:14px;font-weight:400;height:100%}.uppy-ProviderBrowser-user{color:#333;font-weight:500;margin:0 8px 0 0}[data-uppy-theme=dark] .uppy-ProviderBrowser-user{color:#eaeaea}[dir=ltr] .uppy-ProviderBrowser-user:after{left:4px}[dir=rtl] .uppy-ProviderBrowser-user:after{right:4px}.uppy-ProviderBrowser-user:after{color:#939393;content:"·";font-weight:400;position:relative}.uppy-ProviderBrowser-header{border-bottom:1px solid #eaeaea;position:relative;z-index:1001}[data-uppy-theme=dark] .uppy-ProviderBrowser-header{border-bottom:1px solid #333}.uppy-ProviderBrowser-headerBar{background-color:#fafafa;color:#757575;font-size:12px;line-height:1.4;padding:7px 15px;z-index:1001}.uppy-size--md .uppy-ProviderBrowser-headerBar{align-items:center;display:flex}[data-uppy-theme=dark] .uppy-ProviderBrowser-headerBar{background-color:#1f1f1f}.uppy-ProviderBrowser-headerBar--simple{display:block;justify-content:center;text-align:center}.uppy-ProviderBrowser-headerBar--simple .uppy-Provider-breadcrumbsWrap{display:inline-block;flex:none;vertical-align:middle}.uppy-ProviderBrowser-searchFilter{align-items:center;display:flex;height:30px;margin-bottom:15px;margin-top:15px;padding-left:8px;padding-right:8px;position:relative;width:100%}[dir=ltr] .uppy-ProviderBrowser-searchFilterInput{padding-left:30px}[dir=ltr] .uppy-ProviderBrowser-searchFilterInput,[dir=rtl] .uppy-ProviderBrowser-searchFilterInput{padding-right:30px}[dir=rtl] .uppy-ProviderBrowser-searchFilterInput{padding-left:30px}.uppy-ProviderBrowser-searchFilterInput{background-color:#eaeaea;border:0;border-radius:4px;color:#333;font-family:-apple-system,system-ui,BlinkMacSystemFont,Segoe UI,Segoe UI Symbol,Segoe UI Emoji,Apple Color Emoji,Roboto,Helvetica,Arial,sans-serif;font-size:13px;height:30px;line-height:1.4;outline:0;width:100%;z-index:1001}.uppy-ProviderBrowser-searchFilterInput::-webkit-search-cancel-button{display:none}[data-uppy-theme=dark] .uppy-ProviderBrowser-searchFilterInput{background-color:#1f1f1f;color:#eaeaea}.uppy-ProviderBrowser-searchFilterInput:focus{background-color:#cfcfcf;border:0}[data-uppy-theme=dark] .uppy-ProviderBrowser-searchFilterInput:focus{background-color:#333}[dir=ltr] .uppy-ProviderBrowser-searchFilterIcon{left:16px}[dir=rtl] .uppy-ProviderBrowser-searchFilterIcon{right:16px}.uppy-ProviderBrowser-searchFilterIcon{color:#757575;height:12px;position:absolute;width:12px;z-index:1002}.uppy-ProviderBrowser-searchFilterInput::placeholder{color:#939393;opacity:1}[dir=ltr] .uppy-ProviderBrowser-searchFilterReset{right:16px}[dir=rtl] .uppy-ProviderBrowser-searchFilterReset{left:16px}.uppy-ProviderBrowser-searchFilterReset{border-radius:3px;color:#939393;cursor:pointer;height:22px;padding:6px;position:absolute;width:22px;z-index:1002}.uppy-ProviderBrowser-searchFilterReset:focus{outline:none}.uppy-ProviderBrowser-searchFilterReset::-moz-focus-inner{border:0}.uppy-ProviderBrowser-searchFilterReset:focus{box-shadow:0 0 0 3px #1269cf80}.uppy-ProviderBrowser-searchFilterReset:hover{color:#757575}.uppy-ProviderBrowser-searchFilterReset svg{vertical-align:text-top}.uppy-ProviderBrowser-userLogout{border-radius:3px;color:#1269cf;cursor:pointer;line-height:inherit;padding:4px}.uppy-ProviderBrowser-userLogout:focus{outline:none}.uppy-ProviderBrowser-userLogout::-moz-focus-inner{border:0}.uppy-ProviderBrowser-userLogout:hover{color:#0e51a0}.uppy-ProviderBrowser-userLogout:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-ProviderBrowser-userLogout:focus{background-color:#333}.uppy-ProviderBrowser-userLogout:hover{text-decoration:underline}[data-uppy-theme=dark] .uppy-ProviderBrowser-userLogout{color:#eaeaea}.uppy-ProviderBrowser-body{flex:1;position:relative}.uppy-ProviderBrowser-list{background-color:#fff;border-spacing:0;display:block;flex:1;height:100%;inset:0;list-style:none;margin:0;overflow-x:hidden;overflow-y:auto;padding:0;position:absolute;width:100%;-webkit-overflow-scrolling:touch}[data-uppy-theme=dark] .uppy-ProviderBrowser-list{background-color:#1f1f1f}.uppy-ProviderBrowser-list:focus{outline:none}.uppy-ProviderBrowserItem-inner{cursor:pointer;font-size:13px;font-weight:500}.uppy-ProviderBrowser-footer{align-items:center;background-color:#fff;border-top:1px solid #eaeaea;display:flex;justify-content:space-between;padding:15px}[dir=ltr] .uppy-ProviderBrowser-footer button{margin-right:8px}[dir=rtl] .uppy-ProviderBrowser-footer button{margin-left:8px}[data-uppy-theme=dark] .uppy-ProviderBrowser-footer{background-color:#1f1f1f;border-top:1px solid #333}.uppy-ProviderBrowser-footer-buttons{flex-shrink:0}.uppy-ProviderBrowser-footer-error{color:#e32437;line-height:18px}@media (max-width:426px){.uppy-ProviderBrowser-footer{align-items:stretch;flex-direction:column-reverse}.uppy-ProviderBrowser-footer-error{padding-bottom:10px}}.picker-dialog-bg{z-index:20000!important}.picker-dialog{z-index:20001!important}.uppy-Dashboard-Item-previewInnerWrap{align-items:center;border-radius:3px;box-shadow:0 0 2px #0006;display:flex;flex-direction:column;height:100%;justify-content:center;overflow:hidden;position:relative;width:100%}.uppy-size--md .uppy-Dashboard-Item-previewInnerWrap{box-shadow:0 1px 2px #00000026}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-previewInnerWrap{box-shadow:none}.uppy-Dashboard-Item-previewInnerWrap:after{background-color:#000000a6;content:"";display:none;inset:0;position:absolute;z-index:1001}.uppy-Dashboard-Item-previewLink{inset:0;position:absolute;z-index:1002}.uppy-Dashboard-Item-previewLink:focus{box-shadow:inset 0 0 0 3px #579df0}[data-uppy-theme=dark] .uppy-Dashboard-Item-previewLink:focus{box-shadow:inset 0 0 0 3px #016c8d}.uppy-Dashboard-Item-preview img.uppy-Dashboard-Item-previewImg{border-radius:3px;height:100%;object-fit:cover;transform:translateZ(0);width:100%}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-preview img.uppy-Dashboard-Item-previewImg{height:auto;max-height:100%;max-width:100%;object-fit:contain;padding:10px;width:auto}.uppy-Dashboard-Item-progress{color:#fff;left:50%;position:absolute;text-align:center;top:50%;transform:translate(-50%,-50%);transition:all .35 ease;width:120px;z-index:1002}.uppy-Dashboard-Item-progressIndicator{color:#fff;display:inline-block;height:38px;opacity:.9;width:38px}.uppy-size--md .uppy-Dashboard-Item-progressIndicator{height:55px;width:55px}button.uppy-Dashboard-Item-progressIndicator{cursor:pointer}button.uppy-Dashboard-Item-progressIndicator:focus{outline:none}button.uppy-Dashboard-Item-progressIndicator::-moz-focus-inner{border:0}button.uppy-Dashboard-Item-progressIndicator:focus .uppy-Dashboard-Item-progressIcon--bg,button.uppy-Dashboard-Item-progressIndicator:focus .uppy-Dashboard-Item-progressIcon--retry{fill:#579df0}.uppy-Dashboard-Item-progressIcon--circle{height:100%;width:100%}.uppy-Dashboard-Item-progressIcon--bg{stroke:#fff6}.uppy-Dashboard-Item-progressIcon--progress{transition:stroke-dashoffset .5s ease-out;stroke:#fff}.uppy-Dashboard-Item-progressIcon--play{transition:all .2s;fill:#fff;stroke:#fff}.uppy-Dashboard-Item-progressIcon--cancel{transition:all .2s;fill:#fff}.uppy-Dashboard-Item-progressIcon--pause{transition:all .2s;fill:#fff;stroke:#fff}.uppy-Dashboard-Item-progressIcon--check{transition:all .2s;fill:#fff}.uppy-Dashboard-Item-progressIcon--retry{fill:#fff}[dir=ltr] .uppy-Dashboard-Item.is-complete .uppy-Dashboard-Item-progress{right:-8px}[dir=rtl] .uppy-Dashboard-Item.is-complete .uppy-Dashboard-Item-progress{left:-8px}[dir=ltr] .uppy-Dashboard-Item.is-complete .uppy-Dashboard-Item-progress{left:auto}[dir=rtl] .uppy-Dashboard-Item.is-complete .uppy-Dashboard-Item-progress{right:auto}.uppy-Dashboard-Item.is-complete .uppy-Dashboard-Item-progress{top:-9px;transform:none;width:auto}.uppy-Dashboard-Item.is-error .uppy-Dashboard-Item-progressIndicator{height:18px;width:18px}.uppy-size--md .uppy-Dashboard-Item.is-error .uppy-Dashboard-Item-progressIndicator{height:28px;width:28px}.uppy-Dashboard-Item.is-complete .uppy-Dashboard-Item-progressIndicator{height:18px;opacity:1;width:18px}.uppy-size--md .uppy-Dashboard-Item.is-complete .uppy-Dashboard-Item-progressIndicator{height:22px;width:22px}.uppy-Dashboard-Item.is-processing .uppy-Dashboard-Item-progress{opacity:0}[dir=ltr] .uppy-Dashboard-Item-fileInfo{padding-right:5px}[dir=rtl] .uppy-Dashboard-Item-fileInfo{padding-left:5px}[dir=ltr] .uppy-Dashboard--singleFile .uppy-Dashboard-Item-fileInfo{padding-right:10px}[dir=rtl] .uppy-Dashboard--singleFile .uppy-Dashboard-Item-fileInfo{padding-left:10px}[dir=ltr] .uppy-size--md.uppy-Dashboard--singleFile .uppy-Dashboard-Item-fileInfo{padding-right:15px}[dir=rtl] .uppy-size--md.uppy-Dashboard--singleFile .uppy-Dashboard-Item-fileInfo{padding-left:15px}.uppy-Dashboard-Item-name{font-size:12px;font-weight:500;line-height:1.3;margin-bottom:5px;word-wrap:anywhere;word-break:break-all}[data-uppy-theme=dark] .uppy-Dashboard-Item-name{color:#eaeaea}.uppy-size--md.uppy-Dashboard--singleFile .uppy-Dashboard-Item-name{font-size:14px;line-height:1.4}.uppy-Dashboard-Item-fileName{align-items:baseline;display:flex}.uppy-Dashboard-Item-fileName button{margin-left:5px}.uppy-Dashboard-Item-author{color:#757575;display:inline-block;font-size:11px;font-weight:400;line-height:1;margin-bottom:5px;vertical-align:bottom}.uppy-Dashboard-Item-author a{color:#757575}.uppy-Dashboard-Item-status{color:#757575;font-size:11px;font-weight:400;line-height:1}[data-uppy-theme=dark] .uppy-Dashboard-Item-status{color:#bbb}.uppy-Dashboard-Item-statusSize{display:inline-block;margin-bottom:5px;text-transform:uppercase;vertical-align:bottom}.uppy-Dashboard-Item-reSelect{color:#1269cf;font-family:inherit;font-size:inherit;font-weight:600}.uppy-Dashboard-Item-errorMessage{background-color:#fdeff1;color:#a51523;font-size:11px;font-weight:500;line-height:1.3;padding:5px 6px}.uppy-Dashboard-Item-errorMessageBtn{color:#a51523;cursor:pointer;font-size:11px;font-weight:500;text-decoration:underline}.uppy-Dashboard-Item-preview .uppy-Dashboard-Item-errorMessage{display:none}.uppy-size--md .uppy-Dashboard-Item-preview .uppy-Dashboard-Item-errorMessage{border-bottom-left-radius:3px;border-bottom-right-radius:3px;border-top:1px solid #f7c2c8;bottom:0;display:block;left:0;line-height:1.4;padding:6px 8px;position:absolute;right:0}.uppy-Dashboard-Item-fileInfo .uppy-Dashboard-Item-errorMessage{border:1px solid #f7c2c8;border-radius:3px;display:inline-block;position:static}.uppy-size--md .uppy-Dashboard-Item-fileInfo .uppy-Dashboard-Item-errorMessage{display:none}.uppy-Dashboard-Item-action{color:#939393;cursor:pointer}.uppy-Dashboard-Item-action:focus{outline:none}.uppy-Dashboard-Item-action::-moz-focus-inner{border:0}.uppy-Dashboard-Item-action:focus{box-shadow:0 0 0 3px #1269cf80}.uppy-Dashboard-Item-action:hover{color:#1f1f1f;opacity:1}[data-uppy-theme=dark] .uppy-Dashboard-Item-action{color:#cfcfcf}[data-uppy-theme=dark] .uppy-Dashboard-Item-action:focus{outline:none}[data-uppy-theme=dark] .uppy-Dashboard-Item-action::-moz-focus-inner{border:0}[data-uppy-theme=dark] .uppy-Dashboard-Item-action:focus{box-shadow:0 0 0 2px #aae1ffd9}[data-uppy-theme=dark] .uppy-Dashboard-Item-action:hover{color:#eaeaea}.uppy-Dashboard-Item-action--remove{color:#1f1f1f;opacity:.95}.uppy-Dashboard-Item-action--remove:hover{color:#000;opacity:1}[dir=ltr] .uppy-size--md .uppy-Dashboard-Item-action--remove{right:-8px}[dir=rtl] .uppy-size--md .uppy-Dashboard-Item-action--remove{left:-8px}.uppy-size--md .uppy-Dashboard-Item-action--remove{height:18px;padding:0;position:absolute;top:-8px;width:18px;z-index:1002}.uppy-size--md .uppy-Dashboard-Item-action--remove:focus{border-radius:50%}[dir=ltr] .uppy-Dashboard--singleFile.uppy-size--height-md .uppy-Dashboard-Item-action--remove{right:8px}[dir=rtl] .uppy-Dashboard--singleFile.uppy-size--height-md .uppy-Dashboard-Item-action--remove{left:8px}.uppy-Dashboard--singleFile.uppy-size--height-md .uppy-Dashboard-Item-action--remove{position:absolute;top:8px}[data-uppy-theme=dark] .uppy-Dashboard-Item-action--remove{color:#525252}[data-uppy-theme=dark] .uppy-Dashboard-Item-action--remove:hover{color:#333}.uppy-Dashboard:not(.uppy-size--md):not(.uppy-Dashboard--singleFile.uppy-size--height-md) .uppy-Dashboard-Item-actionWrapper{align-items:center;display:flex}.uppy-Dashboard:not(.uppy-size--md):not(.uppy-Dashboard--singleFile.uppy-size--height-md) .uppy-Dashboard-Item-action{height:22px;margin-left:3px;padding:3px;width:22px}.uppy-Dashboard:not(.uppy-size--md):not(.uppy-Dashboard--singleFile.uppy-size--height-md) .uppy-Dashboard-Item-action:focus{border-radius:3px}.uppy-size--md .uppy-Dashboard-Item-action--copyLink,.uppy-size--md .uppy-Dashboard-Item-action--edit{height:16px;padding:0;width:16px}.uppy-size--md .uppy-Dashboard-Item-action--copyLink:focus,.uppy-size--md .uppy-Dashboard-Item-action--edit:focus{border-radius:3px}.uppy-Dashboard-Item{align-items:center;border-bottom:1px solid #eaeaea;display:flex;padding:10px}[dir=ltr] .uppy-Dashboard:not(.uppy-Dashboard--singleFile) .uppy-Dashboard-Item{padding-right:0}[dir=rtl] .uppy-Dashboard:not(.uppy-Dashboard--singleFile) .uppy-Dashboard-Item{padding-left:0}[data-uppy-theme=dark] .uppy-Dashboard-Item{border-bottom:1px solid #333}[dir=ltr] .uppy-size--md .uppy-Dashboard-Item{float:left}[dir=rtl] .uppy-size--md .uppy-Dashboard-Item{float:right}.uppy-size--md .uppy-Dashboard-Item{border-bottom:0;display:block;height:215px;margin:5px 15px;padding:0;position:relative;width:calc(33.333% - 30px)}.uppy-size--lg .uppy-Dashboard-Item{height:190px;margin:5px 15px;padding:0;width:calc(25% - 30px)}.uppy-size--xl .uppy-Dashboard-Item{height:210px;padding:0;width:calc(20% - 30px)}.uppy-Dashboard--singleFile .uppy-Dashboard-Item{border-bottom:0;display:flex;flex-direction:column;height:100%;max-width:400px;padding:15px;position:relative;width:100%}.uppy-Dashboard-Item.is-ghost .uppy-Dashboard-Item-previewInnerWrap{opacity:.2}.uppy-Dashboard-Item.is-ghost .uppy-Dashboard-Item-name{opacity:.7}.uppy-Dashboard-Item.is-ghost .uppy-Dashboard-Item-preview:before{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='35' height='39' viewBox='0 0 35 39'%3E%3Cpath fill='%2523000' d='M1.708 38.66c1.709 0 3.417-3.417 6.834-3.417s5.125 3.417 8.61 3.417c3.348 0 5.056-3.417 8.473-3.417 4.305 0 5.125 3.417 6.833 3.417.889 0 1.709-.889 1.709-1.709v-19.68C34.167-5.757 0-5.757 0 17.271v19.68c0 .82.888 1.709 1.708 1.709m8.542-17.084a3.383 3.383 0 0 1-3.417-3.416 3.383 3.383 0 0 1 3.417-3.417 3.383 3.383 0 0 1 3.417 3.417 3.383 3.383 0 0 1-3.417 3.416m13.667 0A3.383 3.383 0 0 1 20.5 18.16a3.383 3.383 0 0 1 3.417-3.417 3.383 3.383 0 0 1 3.416 3.417 3.383 3.383 0 0 1-3.416 3.416'/%3E%3C/svg%3E");background-position:50% 10px;background-repeat:no-repeat;background-size:25px;content:"";inset:0;opacity:.5;position:absolute;z-index:1005}.uppy-size--md .uppy-Dashboard-Item.is-ghost .uppy-Dashboard-Item-preview:before{background-position:50% 50%;background-size:40px}.uppy-Dashboard--singleFile .uppy-Dashboard-Item.is-ghost .uppy-Dashboard-Item-preview:before{background-position:50% 50%;background-size:30%}.uppy-Dashboard-Item-preview{flex-grow:0;flex-shrink:0;height:50px;position:relative;width:50px}.uppy-size--md .uppy-Dashboard-Item-preview{height:140px;width:100%}.uppy-size--lg .uppy-Dashboard-Item-preview{height:120px}.uppy-size--xl .uppy-Dashboard-Item-preview{height:140px}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-preview{flex-grow:1;max-height:75%;width:100%}.uppy-Dashboard--singleFile.uppy-size--md .uppy-Dashboard-Item-preview{max-height:100%}[dir=ltr] .uppy-Dashboard-Item-fileInfoAndButtons{padding-right:8px}[dir=rtl] .uppy-Dashboard-Item-fileInfoAndButtons{padding-left:8px}[dir=ltr] .uppy-Dashboard-Item-fileInfoAndButtons{padding-left:12px}[dir=rtl] .uppy-Dashboard-Item-fileInfoAndButtons{padding-right:12px}.uppy-Dashboard-Item-fileInfoAndButtons{align-items:center;display:flex;flex-grow:1;justify-content:space-between}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-fileInfoAndButtons,.uppy-size--md .uppy-Dashboard-Item-fileInfoAndButtons{align-items:flex-start;padding:9px 0 0}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-fileInfoAndButtons{flex-grow:0;width:100%}.uppy-Dashboard-Item-fileInfo{flex-grow:1;flex-shrink:1}.uppy-Dashboard-Item-actionWrapper{flex-grow:0;flex-shrink:0}.uppy-Dashboard-Item.is-error .uppy-Dashboard-Item-previewInnerWrap:after,.uppy-Dashboard-Item.is-inprogress .uppy-Dashboard-Item-previewInnerWrap:after{display:block}[dir=ltr] .uppy-Dashboard-Item-errorDetails{left:2px}[dir=rtl] .uppy-Dashboard-Item-errorDetails{right:2px}.uppy-Dashboard-Item-errorDetails{-webkit-appearance:none;appearance:none;background-color:#939393;border:none;border-radius:50%;color:#fff;cursor:help;flex-shrink:0;font-size:10px;font-weight:600;height:13px;line-height:12px;position:relative;text-align:center;top:0;width:13px}.uppy-Dashboard-Item-errorDetails:after{line-height:1.3;word-wrap:break-word}.uppy-Dashboard-FileCard{background-color:#fff;border-radius:5px;box-shadow:0 0 10px 4px #0000001a;display:flex;flex-direction:column;height:100%;inset:0;position:absolute;width:100%;z-index:1005}.uppy-Dashboard-FileCard .uppy-DashboardContent-bar{border-top-left-radius:5px;border-top-right-radius:5px}.uppy-Dashboard-FileCard .uppy-Dashboard-FileCard-actions{border-bottom-left-radius:5px;border-bottom-right-radius:5px}.uppy-Dashboard-FileCard-inner{display:flex;flex-direction:column;flex-grow:1;flex-shrink:1;height:100%;min-height:0}.uppy-Dashboard-FileCard-preview{align-items:center;border-bottom:1px solid #eaeaea;display:flex;flex-grow:0;flex-shrink:1;height:60%;justify-content:center;min-height:0;position:relative}[data-uppy-theme=dark] .uppy-Dashboard-FileCard-preview{background-color:#333;border-bottom:0}.uppy-Dashboard-FileCard-preview img.uppy-Dashboard-Item-previewImg{border-radius:3px;box-shadow:0 3px 20px #00000026;flex:0 0 auto;max-height:90%;max-width:90%;object-fit:cover}[dir=ltr] .uppy-Dashboard-FileCard-edit{right:10px}[dir=rtl] .uppy-Dashboard-FileCard-edit{left:10px}.uppy-Dashboard-FileCard-edit{background-color:#00000080;border-radius:50px;color:#fff;font-size:13px;padding:7px 15px;position:absolute;top:10px}.uppy-Dashboard-FileCard-edit:focus{outline:none}.uppy-Dashboard-FileCard-edit::-moz-focus-inner{border:0}.uppy-Dashboard-FileCard-edit:focus{box-shadow:0 0 0 3px #1269cf80}.uppy-Dashboard-FileCard-edit:hover{background-color:#000c}.uppy-Dashboard-FileCard-info{flex-grow:0;flex-shrink:0;height:40%;overflow-y:auto;padding:30px 20px 20px;-webkit-overflow-scrolling:touch}[data-uppy-theme=dark] .uppy-Dashboard-FileCard-info{background-color:#1f1f1f}.uppy-Dashboard-FileCard-fieldset{border:0;font-size:0;margin:auto auto 12px;max-width:640px;padding:0}.uppy-Dashboard-FileCard-label{color:#525252;display:inline-block;font-size:12px;vertical-align:middle;width:22%}.uppy-size--md .uppy-Dashboard-FileCard-label{font-size:14px}[data-uppy-theme=dark] .uppy-Dashboard-FileCard-label{color:#eaeaea}.uppy-Dashboard-FileCard-input{display:inline-block;vertical-align:middle;width:78%}.uppy-Dashboard-FileCard-actions{align-items:center;background-color:#fafafa;border-top:1px solid #eaeaea;display:flex;flex-grow:0;flex-shrink:0;height:55px;padding:0 15px}.uppy-size--md .uppy-Dashboard-FileCard-actions{height:65px}[data-uppy-theme=dark] .uppy-Dashboard-FileCard-actions{background-color:#1f1f1f;border-top:1px solid #333}[dir=ltr] .uppy-Dashboard-FileCard-actionsBtn{margin-right:10px}[dir=rtl] .uppy-Dashboard-FileCard-actionsBtn{margin-left:10px}.uppy-transition-slideDownUp-enter{opacity:.01;transform:translate3d(0,-105%,0);transition:transform .25s ease-in-out,opacity .25s ease-in-out}.uppy-transition-slideDownUp-enter.uppy-transition-slideDownUp-enter-active{opacity:1;transform:translateZ(0)}.uppy-transition-slideDownUp-leave{opacity:1;transform:translateZ(0);transition:transform .25s ease-in-out,opacity .25s ease-in-out}.uppy-transition-slideDownUp-leave.uppy-transition-slideDownUp-leave-active{opacity:.01;transform:translate3d(0,-105%,0)}@keyframes uppy-Dashboard-fadeIn{0%{opacity:0}to{opacity:1}}@keyframes uppy-Dashboard-fadeOut{0%{opacity:1}to{opacity:0}}@keyframes uppy-Dashboard-slideDownAndFadeIn{0%{opacity:0;transform:translate3d(-50%,-70%,0)}to{opacity:1;transform:translate3d(-50%,-50%,0)}}@keyframes uppy-Dashboard-slideDownAndFadeIn--small{0%{opacity:0;transform:translate3d(0,-20%,0)}to{opacity:1;transform:translateZ(0)}}@keyframes uppy-Dashboard-slideUpFadeOut{0%{opacity:1;transform:translate3d(-50%,-50%,0)}to{opacity:0;transform:translate3d(-50%,-70%,0)}}@keyframes uppy-Dashboard-slideUpFadeOut--small{0%{opacity:1;transform:translateZ(0)}to{opacity:0;transform:translate3d(0,-20%,0)}}.uppy-Dashboard--modal{z-index:1001}.uppy-Dashboard--modal[aria-hidden=true]{display:none}.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose>.uppy-Dashboard-inner{animation:uppy-Dashboard-slideDownAndFadeIn--small .3s cubic-bezier(0,0,.2,1)}@media only screen and (min-width:820px){.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose>.uppy-Dashboard-inner{animation:uppy-Dashboard-slideDownAndFadeIn .3s cubic-bezier(0,0,.2,1)}}.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose>.uppy-Dashboard-overlay{animation:uppy-Dashboard-fadeIn .3s cubic-bezier(0,0,.2,1)}.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose.uppy-Dashboard--isClosing>.uppy-Dashboard-inner{animation:uppy-Dashboard-slideUpFadeOut--small .3s cubic-bezier(0,0,.2,1)}@media only screen and (min-width:820px){.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose.uppy-Dashboard--isClosing>.uppy-Dashboard-inner{animation:uppy-Dashboard-slideUpFadeOut .3s cubic-bezier(0,0,.2,1)}}.uppy-Dashboard--modal.uppy-Dashboard--animateOpenClose.uppy-Dashboard--isClosing>.uppy-Dashboard-overlay{animation:uppy-Dashboard-fadeOut .3s cubic-bezier(0,0,.2,1)}.uppy-Dashboard-isFixed{height:100vh;overflow:hidden}.uppy-Dashboard--modal .uppy-Dashboard-overlay{background-color:#00000080;inset:0;position:fixed;z-index:1001}.uppy-Dashboard-inner{background-color:#f4f4f4;border:1px solid #eaeaea;border-radius:5px;max-height:100%;max-width:100%;outline:none;position:relative}.uppy-size--md .uppy-Dashboard-inner{min-height:auto}@media only screen and (min-width:820px){.uppy-Dashboard-inner{height:500px;width:650px}}.uppy-Dashboard--modal .uppy-Dashboard-inner{z-index:1002}[data-uppy-theme=dark] .uppy-Dashboard-inner{background-color:#1f1f1f}.uppy-Dashboard--isDisabled .uppy-Dashboard-inner{cursor:not-allowed}.uppy-Dashboard-innerWrap{border-radius:5px;display:flex;flex-direction:column;height:100%;opacity:0;overflow:hidden;position:relative}.uppy-Dashboard--isInnerWrapVisible .uppy-Dashboard-innerWrap{opacity:1}.uppy-Dashboard--isDisabled .uppy-Dashboard-innerWrap{cursor:not-allowed;filter:grayscale(100%);opacity:.6;-webkit-user-select:none;user-select:none}.uppy-Dashboard--isDisabled .uppy-ProviderIconBg{fill:#9f9f9f}.uppy-Dashboard--isDisabled [aria-disabled],.uppy-Dashboard--isDisabled [disabled]{cursor:not-allowed;pointer-events:none}.uppy-Dashboard--modal .uppy-Dashboard-inner{border:none;inset:35px 15px 15px;position:fixed}@media only screen and (min-width:820px){.uppy-Dashboard--modal .uppy-Dashboard-inner{box-shadow:0 5px 15px 4px #00000026;left:50%;right:auto;top:50%;transform:translate(-50%,-50%)}}[dir=ltr] .uppy-Dashboard-close{right:-2px}[dir=rtl] .uppy-Dashboard-close{left:-2px}.uppy-Dashboard-close{color:#ffffffe6;cursor:pointer;display:block;font-size:27px;position:absolute;top:-33px;z-index:1005}.uppy-Dashboard-close:focus{outline:none}.uppy-Dashboard-close::-moz-focus-inner{border:0}.uppy-Dashboard-close:focus{color:#6eabf2}@media only screen and (min-width:820px){[dir=ltr] .uppy-Dashboard-close{right:-35px}[dir=rtl] .uppy-Dashboard-close{left:-35px}.uppy-Dashboard-close{font-size:35px;top:-10px}}.uppy-Dashboard-serviceMsg{background-color:#fffbf7;border-bottom:1px solid #edd4b9;border-top:1px solid #edd4b9;font-size:12px;font-weight:500;line-height:1.3;padding:12px 0;position:relative;top:-1px;z-index:1004}.uppy-size--md .uppy-Dashboard-serviceMsg{font-size:14px;line-height:1.4}[data-uppy-theme=dark] .uppy-Dashboard-serviceMsg{background-color:#1f1f1f;border-bottom:1px solid #333;border-top:1px solid #333;color:#eaeaea}.uppy-Dashboard-serviceMsg-title{display:block;line-height:1;margin-bottom:4px;padding-left:42px}.uppy-Dashboard-serviceMsg-text{padding:0 15px}.uppy-Dashboard-serviceMsg-actionBtn{color:#1269cf;font-size:inherit;font-weight:inherit;vertical-align:initial}[data-uppy-theme=dark] .uppy-Dashboard-serviceMsg-actionBtn{color:#02baf2e6}.uppy-Dashboard-serviceMsg-icon{left:15px;position:absolute;top:10px}.uppy-Dashboard-AddFiles{align-items:center;display:flex;flex-direction:column;height:100%;justify-content:center;position:relative;text-align:center}[data-uppy-drag-drop-supported=true] .uppy-Dashboard-AddFiles{border:1px dashed #dfdfdf;border-radius:3px;height:calc(100% - 14px);margin:7px}.uppy-Dashboard-AddFilesPanel .uppy-Dashboard-AddFiles{border:none;height:calc(100% - 54px)}.uppy-Dashboard--modal .uppy-Dashboard-AddFiles{border-color:#cfcfcf}[data-uppy-theme=dark] .uppy-Dashboard-AddFiles{border-color:#757575}.uppy-Dashboard-AddFiles-info{display:none;margin-top:auto;padding-bottom:15px;padding-top:15px}.uppy-size--height-md .uppy-Dashboard-AddFiles-info{display:block}.uppy-size--md .uppy-Dashboard-AddFiles-info{bottom:25px;left:0;padding-bottom:0;padding-top:30px;position:absolute;right:0}[data-uppy-num-acquirers="0"] .uppy-Dashboard-AddFiles-info{margin-top:0}.uppy-Dashboard-browse{color:#1269cf;cursor:pointer}.uppy-Dashboard-browse:focus{outline:none}.uppy-Dashboard-browse::-moz-focus-inner{border:0}.uppy-Dashboard-browse:focus,.uppy-Dashboard-browse:hover{border-bottom:1px solid #1269cf}[data-uppy-theme=dark] .uppy-Dashboard-browse{color:#02baf2e6}[data-uppy-theme=dark] .uppy-Dashboard-browse:focus,[data-uppy-theme=dark] .uppy-Dashboard-browse:hover{border-bottom:1px solid #02baf2}.uppy-Dashboard-browseBtn{display:block;font-size:14px;font-weight:500;margin-bottom:5px;margin-top:8px;width:100%}.uppy-size--md .uppy-Dashboard-browseBtn{font-size:15px;margin:15px auto;padding:13px 44px;width:auto}.uppy-Dashboard-AddFiles-list{display:flex;flex:1;flex-direction:column;margin-top:2px;overflow-y:auto;padding:2px 0;width:100%;-webkit-overflow-scrolling:touch}.uppy-size--md .uppy-Dashboard-AddFiles-list{flex:none;flex-direction:row;flex-wrap:wrap;justify-content:center;margin-top:15px;max-width:600px;overflow-y:visible;padding-top:0}.uppy-DashboardTab{border-bottom:1px solid #eaeaea;text-align:center;width:100%}[data-uppy-theme=dark] .uppy-DashboardTab{border-bottom:1px solid #333}.uppy-size--md .uppy-DashboardTab{border-bottom:none;display:inline-block;margin-bottom:10px;width:auto}.uppy-DashboardTab-btn{align-items:center;-webkit-appearance:none;appearance:none;background-color:initial;color:#525252;cursor:pointer;flex-direction:row;height:100%;justify-content:left;padding:12px 15px;width:100%}.uppy-DashboardTab-btn:focus{outline:none}[dir=ltr] .uppy-size--md .uppy-DashboardTab-btn{margin-right:1px}[dir=rtl] .uppy-size--md .uppy-DashboardTab-btn{margin-left:1px}.uppy-size--md .uppy-DashboardTab-btn{border-radius:5px;flex-direction:column;padding:10px 3px;width:86px}[data-uppy-theme=dark] .uppy-DashboardTab-btn{color:#eaeaea}.uppy-DashboardTab-btn::-moz-focus-inner{border:0}.uppy-DashboardTab-btn:hover{background-color:#e9ecef}[data-uppy-theme=dark] .uppy-DashboardTab-btn:hover{background-color:#333}.uppy-DashboardTab-btn:active,.uppy-DashboardTab-btn:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-DashboardTab-btn:active,[data-uppy-theme=dark] .uppy-DashboardTab-btn:focus{background-color:#525252}.uppy-DashboardTab-btn svg{display:inline-block;max-height:100%;max-width:100%;overflow:hidden;transition:transform .15s ease-in-out;vertical-align:text-top}[dir=ltr] .uppy-DashboardTab-inner{margin-right:10px}[dir=rtl] .uppy-DashboardTab-inner{margin-left:10px}.uppy-DashboardTab-inner{align-items:center;background-color:#fff;border-radius:8px;box-shadow:0 1px 1px #0000001a,0 1px 2px #0000001a,0 2px 3px #00000005;display:flex;height:32px;justify-content:center;width:32px}[dir=ltr] .uppy-size--md .uppy-DashboardTab-inner{margin-right:0}[dir=rtl] .uppy-size--md .uppy-DashboardTab-inner{margin-left:0}[data-uppy-theme=dark] .uppy-DashboardTab-inner{background-color:#323232;box-shadow:0 1px 1px #0003,0 1px 2px #0003,0 2px 3px #00000014}.uppy-DashboardTab-name{font-size:14px;font-weight:400}.uppy-size--md .uppy-DashboardTab-name{font-size:12px;line-height:15px;margin-bottom:0;margin-top:8px}.uppy-DashboardTab-iconMyDevice{color:#1269cf}[data-uppy-theme=dark] .uppy-DashboardTab-iconMyDevice{color:#02baf2}.uppy-DashboardTab-iconBox{color:#0061d5}[data-uppy-theme=dark] .uppy-DashboardTab-iconBox{color:#eaeaea}.uppy-DashboardTab-iconDropbox{color:#0061fe}[data-uppy-theme=dark] .uppy-DashboardTab-iconDropbox{color:#eaeaea}.uppy-DashboardTab-iconUnsplash{color:#111}[data-uppy-theme=dark] .uppy-DashboardTab-iconUnsplash{color:#eaeaea}.uppy-DashboardTab-iconWebdav{color:#111}[data-uppy-theme=dark] .uppy-DashboardTab-iconWebdav{color:#eaeaea}.uppy-DashboardTab-iconScreenRec{color:#2c3e50}[data-uppy-theme=dark] .uppy-DashboardTab-iconScreenRec{color:#eaeaea}.uppy-DashboardTab-iconAudio{color:#8030a3}[data-uppy-theme=dark] .uppy-DashboardTab-iconAudio{color:#bf6ee3}.uppy-Dashboard-input{height:.1px;opacity:0;overflow:hidden;position:absolute;width:.1px;z-index:-1}.uppy-DashboardContent-bar{align-items:center;background-color:#fafafa;border-bottom:1px solid #eaeaea;display:flex;flex-shrink:0;height:40px;justify-content:space-between;padding:0 10px;position:relative;width:100%;z-index:1004}.uppy-size--md .uppy-DashboardContent-bar{height:50px;padding:0 15px}[data-uppy-theme=dark] .uppy-DashboardContent-bar{background-color:#1f1f1f;border-bottom:1px solid #333}.uppy-DashboardContent-title{font-size:12px;font-weight:500;left:0;line-height:40px;margin:auto;max-width:170px;overflow-x:hidden;position:absolute;right:0;text-align:center;text-overflow:ellipsis;top:0;white-space:nowrap;width:100%}.uppy-size--md .uppy-DashboardContent-title{font-size:14px;line-height:50px;max-width:300px}[data-uppy-theme=dark] .uppy-DashboardContent-title{color:#eaeaea}[dir=ltr] .uppy-DashboardContent-back,[dir=ltr] .uppy-DashboardContent-save{margin-left:-6px}[dir=rtl] .uppy-DashboardContent-back,[dir=rtl] .uppy-DashboardContent-save{margin-right:-6px}.uppy-DashboardContent-back,.uppy-DashboardContent-save{-webkit-appearance:none;background:none;border:0;border-radius:3px;color:inherit;color:#1269cf;cursor:pointer;font-family:inherit;font-size:inherit;font-size:12px;font-weight:400;line-height:1;margin:0;padding:7px 6px}.uppy-DashboardContent-back:focus,.uppy-DashboardContent-save:focus{outline:none}.uppy-DashboardContent-back::-moz-focus-inner,.uppy-DashboardContent-save::-moz-focus-inner{border:0}.uppy-DashboardContent-back:hover,.uppy-DashboardContent-save:hover{color:#0e51a0}.uppy-DashboardContent-back:focus,.uppy-DashboardContent-save:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-DashboardContent-back:focus,[data-uppy-theme=dark] .uppy-DashboardContent-save:focus{background-color:#333}.uppy-size--md .uppy-DashboardContent-back,.uppy-size--md .uppy-DashboardContent-save{font-size:14px}[data-uppy-theme=dark] .uppy-DashboardContent-back,[data-uppy-theme=dark] .uppy-DashboardContent-save{color:#02baf2}[dir=ltr] .uppy-DashboardContent-addMore{margin-right:-5px}[dir=rtl] .uppy-DashboardContent-addMore{margin-left:-5px}.uppy-DashboardContent-addMore{-webkit-appearance:none;background:none;border:0;border-radius:3px;color:inherit;color:#1269cf;cursor:pointer;font-family:inherit;font-size:inherit;font-weight:500;height:29px;line-height:1;margin:0;padding:7px 8px;width:29px}.uppy-DashboardContent-addMore:focus{outline:none}.uppy-DashboardContent-addMore::-moz-focus-inner{border:0}.uppy-DashboardContent-addMore:hover{color:#0e51a0}.uppy-DashboardContent-addMore:focus{background-color:#dfe6f1}[data-uppy-theme=dark] .uppy-DashboardContent-addMore:focus{background-color:#333}[dir=ltr] .uppy-size--md .uppy-DashboardContent-addMore{margin-right:-8px}[dir=rtl] .uppy-size--md .uppy-DashboardContent-addMore{margin-left:-8px}.uppy-size--md .uppy-DashboardContent-addMore{font-size:14px;height:auto;width:auto}[data-uppy-theme=dark] .uppy-DashboardContent-addMore{color:#02baf2}[dir=ltr] .uppy-DashboardContent-addMore svg{margin-right:4px}[dir=rtl] .uppy-DashboardContent-addMore svg{margin-left:4px}.uppy-DashboardContent-addMore svg{vertical-align:initial}.uppy-size--md .uppy-DashboardContent-addMore svg{height:11px;width:11px}.uppy-DashboardContent-addMoreCaption{display:none}.uppy-size--md .uppy-DashboardContent-addMoreCaption{display:inline}.uppy-DashboardContent-panel{background-color:#f5f5f5;flex:1}.uppy-Dashboard-AddFilesPanel,.uppy-DashboardContent-panel{border-radius:5px;display:flex;flex-direction:column;inset:0;overflow:hidden;position:absolute;z-index:1005}.uppy-Dashboard-AddFilesPanel{background:#fafafa;background:linear-gradient(0deg,#fafafa 35%,#fafafad9);box-shadow:0 0 10px 5px #00000026}[data-uppy-theme=dark] .uppy-Dashboard-AddFilesPanel{background-color:#333;background-image:linear-gradient(0deg,#1f1f1f 35%,#1f1f1fd9)}.uppy-Dashboard--isAddFilesPanelVisible .uppy-Dashboard-files{filter:blur(2px)}.uppy-Dashboard-progress{bottom:0;height:12%;left:0;position:absolute;width:100%}.uppy-Dashboard-progressBarContainer.is-active{height:100%;left:0;position:absolute;top:0;width:100%;z-index:1004}.uppy-Dashboard-filesContainer{flex:1;margin:0;overflow-y:hidden;position:relative}.uppy-Dashboard-filesContainer:after{clear:both;content:"";display:table}.uppy-Dashboard-files{flex:1;margin:0;overflow-y:auto;padding:0 0 10px;-webkit-overflow-scrolling:touch}.uppy-size--md .uppy-Dashboard-files{padding-top:10px}.uppy-Dashboard--singleFile .uppy-Dashboard-filesInner{align-items:center;display:flex;height:100%;justify-content:center}.uppy-Dashboard-dropFilesHereHint{align-items:center;background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath fill='%231269CF' d='M24 1v1C11.85 2 2 11.85 2 24s9.85 22 22 22 22-9.85 22-22S36.15 2 24 2zm0 0V0c13.254 0 24 10.746 24 24S37.254 48 24 48 0 37.254 0 24 10.746 0 24 0zm7.707 19.293a.999.999 0 1 1-1.414 1.414L25 16.414V34a1 1 0 1 1-2 0V16.414l-5.293 5.293a.999.999 0 1 1-1.414-1.414l7-7a1 1 0 0 1 1.414 0z'/%3E%3C/svg%3E");background-position:50% 50%;background-repeat:no-repeat;border:1px dashed #1269cf;border-radius:3px;color:#757575;display:flex;font-size:16px;justify-content:center;inset:7px;padding-top:90px;position:absolute;text-align:center;visibility:hidden;z-index:2000}[data-uppy-theme=dark] .uppy-Dashboard-dropFilesHereHint{background-image:url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48'%3E%3Cpath fill='%2302BAF2' d='M24 1v1C11.85 2 2 11.85 2 24s9.85 22 22 22 22-9.85 22-22S36.15 2 24 2zm0 0V0c13.254 0 24 10.746 24 24S37.254 48 24 48 0 37.254 0 24 10.746 0 24 0zm7.707 19.293a.999.999 0 1 1-1.414 1.414L25 16.414V34a1 1 0 1 1-2 0V16.414l-5.293 5.293a.999.999 0 1 1-1.414-1.414l7-7a1 1 0 0 1 1.414 0z'/%3E%3C/svg%3E");border-color:#02baf2;color:#bbb}.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-Dashboard-dropFilesHereHint{pointer-events:none;visibility:visible}.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-Dashboard-files,.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-Dashboard-progressindicators,.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-Dashboard-serviceMsg,.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-DashboardContent-bar{opacity:.15}.uppy-Dashboard.uppy-Dashboard--isDraggingOver .uppy-Dashboard-AddFiles{opacity:.03}.uppy-Dashboard-AddFiles-title{color:#000;font-size:17px;font-weight:500;line-height:1.35;margin-bottom:5px;margin-top:15px;padding:0 15px;text-align:inline-start;width:100%}.uppy-size--md .uppy-Dashboard-AddFiles-title{font-size:21px;font-weight:400;margin-top:5px;max-width:480px;padding:0 35px;text-align:center}[data-uppy-num-acquirers="0"] .uppy-Dashboard-AddFiles-title{text-align:center}[data-uppy-theme=dark] .uppy-Dashboard-AddFiles-title{color:#eaeaea}.uppy-Dashboard-AddFiles-title button{font-weight:500}.uppy-size--md .uppy-Dashboard-AddFiles-title button{font-weight:400}.uppy-Dashboard-note{color:#757575;font-size:14px;line-height:1.25;margin:auto;max-width:350px;padding:0 15px;text-align:center}.uppy-size--md .uppy-Dashboard-note{line-height:1.35;max-width:600px}[data-uppy-theme=dark] .uppy-Dashboard-note{color:#cfcfcf}a.uppy-Dashboard-poweredBy{color:#939393;display:inline-block;font-size:11px;margin-top:8px;text-align:center;text-decoration:none}.uppy-Dashboard-poweredByIcon{margin-left:1px;margin-right:1px;opacity:.9;position:relative;top:1px;vertical-align:text-top;fill:none;stroke:#939393}.uppy-Dashboard-Item-previewIcon{height:25px;left:50%;position:absolute;top:50%;transform:translate(-50%,-50%);width:25px;z-index:100}.uppy-size--md .uppy-Dashboard-Item-previewIcon{height:38px;width:38px}.uppy-Dashboard-Item-previewIcon svg{height:100%;width:100%}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-previewIcon{height:100%;max-height:60%;max-width:60%;width:100%}.uppy-Dashboard-Item-previewIconWrap{height:76px;max-height:75%;position:relative}.uppy-Dashboard--singleFile .uppy-Dashboard-Item-previewIconWrap{height:100%;width:100%}.uppy-Dashboard-Item-previewIconBg{filter:drop-shadow(rgba(0,0,0,.1) 0 1px 1px);height:100%;width:100%}.uppy-Dashboard-upload{height:50px;position:relative;width:50px}.uppy-size--md .uppy-Dashboard-upload{height:60px;width:60px}.uppy-Dashboard-upload .uppy-c-icon{position:relative;top:1px;width:50%}[dir=ltr] .uppy-Dashboard-uploadCount{right:-12px}[dir=rtl] .uppy-Dashboard-uploadCount{left:-12px}.uppy-Dashboard-uploadCount{background-color:#1bb240;border-radius:50%;color:#fff;font-size:8px;height:16px;line-height:16px;position:absolute;top:-12px;width:16px}.uppy-size--md .uppy-Dashboard-uploadCount{font-size:9px;height:18px;line-height:18px;width:18px}`, Rc = `.uppy-ImageCropper-range{-webkit-appearance:none;background:#0000;margin:8px 0;width:100%}.uppy-ImageCropper-range::-moz-focus-outer{border:0}.uppy-ImageCropper-range:focus{outline:0}.uppy-ImageCropper-range:focus::-webkit-slider-runnable-track{background:#fff3}.uppy-ImageCropper-range:focus::-ms-fill-lower,.uppy-ImageCropper-range:focus::-ms-fill-upper{background:#fff3}.uppy-ImageCropper-range::-webkit-slider-runnable-track{background:#fff3;border:0 solid #0000;border-radius:5px;box-shadow:0 0 #0000,0 0 #0d0d0d00;cursor:default;height:4px;-webkit-transition:all .2s ease;transition:all .2s ease;width:100%}.uppy-ImageCropper-range::-webkit-slider-thumb{-webkit-appearance:none;background:#fff;border:0 solid #0000;border-radius:9px;box-shadow:0 0 4px #0003,0 0 #0d0d0d33;box-sizing:border-box;cursor:default;height:16px;margin-top:-6px;width:16px}.uppy-ImageCropper-range::-moz-range-track{background:#fff3;border:0 solid #0000;border-radius:5px;box-shadow:0 0 #0000,0 0 #0d0d0d00;cursor:default;height:2px;-moz-transition:all .2s ease;transition:all .2s ease;width:100%}.uppy-ImageCropper-range::-moz-range-thumb{background:#fff;border:0 solid #0000;border-radius:9px;box-shadow:0 0 4px #0003,0 0 #0d0d0d33;box-sizing:border-box;cursor:default;height:16px;width:16px}.uppy-ImageCropper-range::-ms-track{background:#0000;border-color:#0000;border-width:8px 0;color:#0000;cursor:default;height:4px;-ms-transition:all .2s ease;transition:all .2s ease;width:100%}.uppy-ImageCropper-range::-ms-fill-lower{background:#f2f2f233;border:0 solid #0000;border-radius:10px;box-shadow:0 0 #0000,0 0 #0d0d0d00}.uppy-ImageCropper-range::-ms-fill-upper{background:#fff3;border:0 solid #0000;border-radius:10px;box-shadow:0 0 #0000,0 0 #0d0d0d00}.uppy-ImageCropper-range::-ms-thumb{background:#fff;border:0 solid #0000;border-radius:9px;box-shadow:0 0 4px #0003,0 0 #0d0d0d33;box-sizing:border-box;cursor:default;height:16px;margin-top:1px;width:16px}.uppy-ImageCropper-range:disabled::-moz-range-thumb,.uppy-ImageCropper-range:disabled::-ms-fill-lower,.uppy-ImageCropper-range:disabled::-ms-fill-upper,.uppy-ImageCropper-range:disabled::-ms-thumb,.uppy-ImageCropper-range:disabled::-webkit-slider-runnable-track,.uppy-ImageCropper-range:disabled::-webkit-slider-thumb{cursor:not-allowed}/*!
* Cropper.js v1.5.6
* https://fengyuanchen.github.io/cropperjs
*
* Copyright 2015-present Chen Fengyuan
* Released under the MIT license
*
* Date: 2019-10-04T04:33:44.164Z
*/.cropper-container{direction:ltr;font-size:0;line-height:0;position:relative;touch-action:none;-webkit-user-select:none;user-select:none}.cropper-container img{display:block;height:100%;image-orientation:0deg;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;width:100%}.cropper-canvas,.cropper-crop-box,.cropper-drag-box,.cropper-modal,.cropper-wrap-box{inset:0;position:absolute}.cropper-canvas,.cropper-wrap-box{overflow:hidden}.cropper-drag-box{background-color:#fff;opacity:0}.cropper-modal{background-color:#000;opacity:.5}.cropper-view-box{display:block;height:100%;outline:1px solid #39f;outline-color:#3399ffbf;overflow:hidden;width:100%}.cropper-dashed{border:0 dashed #eee;display:block;opacity:.5;position:absolute}.cropper-dashed.dashed-h{border-bottom-width:1px;border-top-width:1px;height:33.3333333333%;left:0;top:33.3333333333%;width:100%}.cropper-dashed.dashed-v{border-left-width:1px;border-right-width:1px;height:100%;left:33.3333333333%;top:0;width:33.3333333333%}.cropper-center{display:block;height:0;left:50%;opacity:.75;position:absolute;top:50%;width:0}.cropper-center:after,.cropper-center:before{background-color:#eee;content:" ";display:block;position:absolute}.cropper-center:before{height:1px;left:-3px;top:0;width:7px}.cropper-center:after{height:7px;left:0;top:-3px;width:1px}.cropper-face,.cropper-line,.cropper-point{display:block;height:100%;opacity:.1;position:absolute;width:100%}.cropper-face{background-color:#fff;left:0;top:0}.cropper-line{background-color:#39f}.cropper-line.line-e{cursor:ew-resize;right:-3px;top:0;width:5px}.cropper-line.line-n{cursor:ns-resize;height:5px;left:0;top:-3px}.cropper-line.line-w{cursor:ew-resize;left:-3px;top:0;width:5px}.cropper-line.line-s{bottom:-3px;cursor:ns-resize;height:5px;left:0}.cropper-point{background-color:#39f;height:5px;opacity:.75;width:5px}.cropper-point.point-e{cursor:ew-resize;margin-top:-3px;right:-3px;top:50%}.cropper-point.point-n{cursor:ns-resize;left:50%;margin-left:-3px;top:-3px}.cropper-point.point-w{cursor:ew-resize;left:-3px;margin-top:-3px;top:50%}.cropper-point.point-s{bottom:-3px;cursor:s-resize;left:50%;margin-left:-3px}.cropper-point.point-ne{cursor:nesw-resize;right:-3px;top:-3px}.cropper-point.point-nw{cursor:nwse-resize;left:-3px;top:-3px}.cropper-point.point-sw{bottom:-3px;cursor:nesw-resize;left:-3px}.cropper-point.point-se{bottom:-3px;cursor:nwse-resize;height:20px;opacity:1;right:-3px;width:20px}@media (min-width:768px){.cropper-point.point-se{height:15px;width:15px}}@media (min-width:992px){.cropper-point.point-se{height:10px;width:10px}}@media (min-width:1200px){.cropper-point.point-se{height:5px;opacity:.75;width:5px}}.cropper-point.point-se:before{background-color:#39f;bottom:-50%;content:" ";display:block;height:200%;opacity:0;position:absolute;right:-50%;width:200%}.cropper-invisible{opacity:0}.cropper-bg{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQAQMAAAAlPW0iAAAAA3NCSVQICAjb4U/gAAAABlBMVEXMzMz////TjRV2AAAACXBIWXMAAArrAAAK6wGCiw1aAAAAHHRFWHRTb2Z0d2FyZQBBZG9iZSBGaXJld29ya3MgQ1M26LyyjAAAABFJREFUCJlj+M/AgBVhF/0PAH6/D/HkDxOGAAAAAElFTkSuQmCC)}.cropper-hide{display:block;height:0;position:absolute;width:0}.cropper-hidden{display:none!important}.cropper-move{cursor:move}.cropper-crop{cursor:crosshair}.cropper-disabled .cropper-drag-box,.cropper-disabled .cropper-face,.cropper-disabled .cropper-line,.cropper-disabled .cropper-point{cursor:not-allowed}.uppy-ImageCropper{display:flex;flex-direction:column;height:100%;width:100%}.uppy-ImageCropper-container{flex-grow:1}.uppy-ImageCropper-image{display:block;max-height:400px;max-width:100%}.uppy-ImageCropper-controls{align-items:center;background-color:#0009;border-radius:5px;bottom:15px;color:#fff;display:flex;justify-content:center;left:50%;padding-top:38px;position:absolute;transform:translate(-50%)}.uppy-size--md .uppy-ImageCropper-controls{padding-top:0}.uppy-ImageCropper-controls button{border-radius:5px;height:35px;width:35px}.uppy-ImageCropper-controls button svg{padding:3px}.uppy-size--md .uppy-ImageCropper-controls button{height:40px;width:40px}.uppy-size--md .uppy-ImageCropper-controls button svg{padding:1px}.uppy-ImageCropper-controls button:hover{background-color:#ffffff80}.uppy-ImageCropper-controls button:focus{background-color:#ffffff80;outline:none}.uppy-Dashboard:not(.uppy-size--md) .uppy-ImageCropper-rangeWrapper{height:38px;left:10px;position:absolute!important;right:10px;top:0}.uppy-size--md .uppy-ImageCropper-range{margin-left:5px;margin-right:5px;width:180px}.uppy-ImageCropper .cropper-point{height:8px;width:8px}.uppy-ImageCropper .cropper-view-box{background:repeating-conic-gradient(#bdbdbd33 0 25%,#fff 0 50%) 50%/16px 16px;outline:2px solid #39f}[data-uppy-theme=dark] .uppy-ImageCropper .cropper-view-box{background:repeating-conic-gradient(#2b2a2a 0 25%,#000 0 50%) 50%/16px 16px}.uppy-ImageCropper .cropper-modal{background-color:#fff;opacity:.9}[data-uppy-theme=dark] .uppy-ImageCropper .cropper-modal{background-color:#000;opacity:.7}.uppy-ImageCropper .cropper-face{opacity:0}.uppy-ImageCropper-range::-moz-range-track{height:4px}.uppy-ImageCropper-range:focus::-webkit-slider-runnable-track,.uppy-ImageCropper-range:hover::-webkit-slider-runnable-track{background:#ffffff80}.uppy-ImageCropper-range:focus::-ms-fill-lower,.uppy-ImageCropper-range:focus::-ms-fill-upper,.uppy-ImageCropper-range:hover::-ms-fill-lower,.uppy-ImageCropper-range:hover::-ms-fill-upper{background:#ffffff80}.uppy-ImageCropper-range:focus::-moz-range-track,.uppy-ImageCropper-range:hover::-moz-range-track{background:#ffffff80}`, w = {
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
    uriUploadForm: Hc("https://authorapi.learnosity.com/latest-lts/assets/uploadform")
  },
  uppy: null
};
function Nc(i, e, t = {}) {
  w.renderedCss || Vc(), w.upload.security = i, w.upload.request = e, qc(t), Wc() && ul().on("widgetedit:widget:ready", Uc);
}
function Uc() {
  H.debug(`${w.logPrefix}setupModalObserver()`), w.classNamePrefix = hl(w.classNamePrefix), Ms();
  const i = (e) => {
    for (const t of e)
      if (t.type === "childList") {
        const r = document.querySelector(
          '[data-authorapi-selector="asset-uploader-iframe-outlet"]:not(.lrn-author-slide-pane [data-authorapi-selector="asset-uploader-iframe-outlet"]):not(.lrn-qe-slide-pane [data-authorapi-selector="asset-uploader-iframe-outlet"])'
        ), a = document.querySelector('[data-authorapi-selector="asset-display-name"]');
        if (r && !a) {
          H.debug(`${w.logPrefix}Disconnecting observer`), Ms(), Lc();
          break;
        }
      }
  };
  w.observedElements.size ? H.debug(`${w.logPrefix}Observed elements full`) : (w.observer = new MutationObserver(i), nl());
}
function nl() {
  H.debug(`${w.logPrefix}Looking to activate observer`);
  const i = document.querySelector(".lrn-author-item");
  w.observedElements.has(i) || (H.debug(`${w.logPrefix}Activated observer`), w.observer.observe(i, { childList: !0, subtree: !0 }), w.observedElements.set(i, w.observer));
}
function Ms() {
  w.observer?.disconnect(), w.observedElements.clear();
}
function Lc() {
  const i = document.querySelector('[data-authorapi-selector="asset-uploader-alignment"]'), e = document.querySelector(`.lrn-${w.classNamePrefix}image-uploader-preview`);
  setTimeout(() => {
    const r = document.querySelector('[data-authorapi-selector="asset-uploader-iframe-outlet"]'), a = r.querySelector("iframe"), o = document.querySelector(`.lrn-${w.classNamePrefix}adv-options`), s = document.createElement("div");
    s.setAttribute("id", "uppy-dashboard"), a.setAttribute("hidden", ""), r.insertAdjacentElement("afterbegin", s), jc(), La(), o.removeAttribute("hidden"), $c();
  }, !i && !e ? 0 : 500);
}
function $c() {
  w.uppy = new Vi({
    debug: !1,
    autoProceed: !1,
    restrictions: { maxNumberOfFiles: 1, minNumberOfFiles: 1, allowedFileTypes: ["image/gif", "image/jpeg", "image/png", "image/svg+xml"] }
  }).use(sa, {
    inline: !0,
    width: 790,
    height: 350,
    autoOpen: null,
    disableStatusBar: !0,
    target: "#uppy-dashboard",
    showProgressDetails: !1,
    proudlyDisplayPoweredByUppy: !1
  }).use(Mh, {
    quality: w.options.quality,
    convertSize: 5e5,
    convertTypes: ["image/png"],
    maxHeight: w.options.maxHeight,
    maxWidth: w.options.maxWidth
  }).use(sl, { target: sa }), w.uppy.on("file-added", (i) => {
    H.debug(`${w.logPrefix}file-added: ${i.source}`), document.querySelector(`.lrn-${w.classNamePrefix}adv-options`).setAttribute("hidden", ""), i.source === "Dashboard" && Rs(i);
  }), w.uppy.on("file-removed", () => {
    H.debug(`${w.logPrefix}file-removed`), Oi("lt__image-uploader-upload-btn", "remove");
  }), w.uppy.on("file-editor:start", () => {
    H.debug(`${w.logPrefix}file-editor:start`), Oi("lt__image-uploader-upload-btn", "disable");
  }), w.uppy.on("file-editor:complete", (i) => {
    H.debug(`${w.logPrefix}file-editor:complete`), Rs(i), Oi("lt__image-uploader-upload-btn", "enable");
  }), w.uppy.on("file-editor:cancel", () => {
    H.debug(`${w.logPrefix}file-editor:cancel`), Oi("lt__image-uploader-upload-btn", "enable");
  }), w.uppy.on("error", (i) => {
    H.error(i.stack);
  });
}
function Rs(i) {
  const e = i.name, t = i.meta, r = i.type;
  r !== "image/svg+xml" ? (H.debug(`${w.logPrefix}Compressing image`), w.uppy.getPlugin("Compressor").compress(i.data).then((a) => {
    setTimeout(() => {
      w.uppy.removeFile(i.id), w.uppy.addFile({
        name: e,
        type: r,
        meta: t,
        data: a,
        source: "Local"
      });
      const o = w.uppy.store.state.files;
      let s;
      for (const n in o)
        s = n;
      Ns(s);
    }, 50);
  })) : Ns(i.id);
}
function Ns(i) {
  const e = document.querySelector(`.lrn-${w.classNamePrefix}modal-footer`);
  ll();
  const t = document.createElement("button"), r = w.classNamePrefix ? "-old" : "";
  t.setAttribute(
    "class",
    `lrn-${w.classNamePrefix}btn${r} lrn-${w.classNamePrefix}btn${r}-legacy lt__image-uploader-upload-btn`
  ), t.textContent = "Upload", e.insertAdjacentElement("afterbegin", t), t.addEventListener("click", () => pl(i));
}
function ll() {
  const i = document.querySelector(".lt__image-uploader-upload-btn");
  i && (H.debug(`${w.logPrefix}Removing existing upload button`), i.remove());
}
function pl(i) {
  document.querySelector(".lt__image-uploader-upload-btn").removeEventListener("click", () => pl(i)), document.querySelector(".uppy-Dashboard-Item-action--edit")?.setAttribute("disabled", "");
  const r = w.uppy.getFile(i), a = document.querySelector(".lt__image-uploader-upload-btn");
  a.setAttribute("style", "width:105px;"), a.innerHTML = '<span class="lt__upload-spinner"><svg width="14" height="14" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><style>.spinner_6kVp{transform-origin:center;animation:spinner_irSm .75s infinite linear}@keyframes spinner_irSm{100%{transform:rotate(360deg)};fill:#ffffff;}</style><path d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z" class="spinner_6kVp" style="fill: white"/></svg></span>', a.setAttribute("disabled", "");
  const o = new FormData(), s = {
    usrequest: { assetName: r.name, mimeType: r.type, fileType: "image" },
    action: "get",
    security: w.upload.security,
    request: w.upload.request
  };
  o.append("usrequest", JSON.stringify(s.usrequest)), o.append("action", s.action), o.append("security", JSON.stringify(s.security)), o.append("request", JSON.stringify(s.request));
  async function n() {
    return (await fetch(w.upload.uriUploadForm, {
      method: "POST",
      body: o
    })).json();
  }
  n().then((l) => {
    const p = new FormData();
    p.append("key", l.data.formInputs.key), p.append("Content-Type", l.data.formInputs["Content-Type"]), p.append("X-Amz-Security-Token", l.data.formInputs["X-Amz-Security-Token"]), p.append("X-Amz-Credential", l.data.formInputs["X-Amz-Credential"]), p.append("X-Amz-Algorithm", l.data.formInputs["X-Amz-Algorithm"]), p.append("X-Amz-Date", l.data.formInputs["X-Amz-Date"]), p.append("Policy", l.data.formInputs.Policy), p.append("X-Amz-Signature", l.data.formInputs["X-Amz-Signature"]), p.append("file", r.data);
    async function u() {
      return await fetch(l.data.formAttributes.action, {
        method: "POST",
        body: p
      });
    }
    u().then(() => {
      const d = l.data.assetUrl, c = document.querySelector('[data-authorapi-selector="asset-uploader-source"]');
      c.value = d.trim(), c.dispatchEvent(new Event("input", { bubbles: !0 })), H.debug(`${w.logPrefix}Added image path to URI`), setTimeout(() => {
        ll();
        const f = document.querySelector(
          `.lrn-author-item .lrn-${w.classNamePrefix}delete-btn-wrapper [data-authorapi-action="asset-uploader-delete"]`
        ), m = document.querySelector(
          `.lrn-author-item .lrn-${w.classNamePrefix}image-uploader [data-authorapi-selector="asset-uploader-alignment"]`
        );
        if (f && !m) {
          const y = document.querySelector('[data-authorapi-selector="asset-uploader-okay"]');
          y && (y.click(), H.debug(`${w.logPrefix}Clicked OK button for background images`));
        }
        La();
      }, 1500);
    }).catch((d) => console.error("Error in uploading image:", d));
  }).catch((l) => console.error("Error in fetching tokens:", l));
}
function jc() {
  H.debug(`${w.logPrefix}listenForSelfHostedImages()`), setTimeout(() => {
    const i = document.querySelector('[data-authorapi-selector="asset-uploader-source"]');
    i && i.addEventListener("input", dl);
  }, 500);
}
function dl() {
  H.debug(`${w.logPrefix}handleSelfHostedImage()`), setTimeout(() => {
    La();
  }, 1500);
}
function La() {
  H.debug(`${w.logPrefix}prepareModalButtons()`);
  const i = [
    `lrn-${w.classNamePrefix}modal-button-close`,
    `lrn-${w.classNamePrefix}btn-default`,
    `lrn-${w.classNamePrefix}btn-primary-legacy`,
    `lrn-${w.classNamePrefix}btn-sec`
  ], e = document.querySelector(`.lrn-${w.classNamePrefix}modal`);
  a();
  function t(o, s, n) {
    const l = new MutationObserver((u, d) => {
      for (const c of u)
        if (c.type === "childList") {
          const f = document.querySelector(s);
          f && (n(f), d.disconnect());
        }
    });
    l.observe(o, { childList: !0, subtree: !0 });
    const p = document.querySelector(s);
    p && (n(p), l.disconnect());
  }
  setTimeout(() => {
    t(e, `.lrn-${w.classNamePrefix}modal-footer .lrn-${w.classNamePrefix}delete-btn-wrapper`, () => {
      H.debug(`${w.logPrefix}waitForElement() observed`);
      for (const o of i) {
        const s = e.querySelector(`.lrn-${w.classNamePrefix}modal-dialog button.${o}`);
        s && (s.addEventListener("click", r), H.debug(`Adding clickHanders for: ${o}`), H.debug(s));
      }
    });
  }, 100);
  function r() {
    H.debug(`${w.logPrefix}clickHandler()`), a(), setTimeout(() => {
      nl();
    }, 1e3);
  }
  function a() {
    for (const s of i) {
      const n = e.querySelector(`.lrn-${w.classNamePrefix}modal-dialog button.${s}`);
      n && (H.debug(`${w.logPrefix}Removed clickHandler`), n.removeEventListener("click", r));
    }
    const o = document.querySelector('[data-authorapi-selector="asset-uploader-source"]');
    o && o.removeEventListener("input", dl);
  }
}
function Hc(i) {
  const e = new URLSearchParams(window.location.search), t = window.location.hostname, r = e.get("env");
  return t.includes("learnosity.com") && r === "staging" ? i.replace("authorapi.", "authorapi.staging.") : i;
}
function qc(i) {
  ["quality", "maxWidth", "maxHeight"].forEach((e) => {
    typeof i?.[e] == "number" && (w.options[e] = i[e]);
  });
}
function Wc() {
  return !w.upload.security || !w.upload.request || typeof w.upload.security != "object" || typeof w.upload.request != "object" ? (H.error(`${w.logPrefix}imageUploader extension failed to run - Missing/invalid security or request parameters`), !1) : !0;
}
function Oi(i, e) {
  const t = document.querySelector(`.${i}`);
  t && (e === "disable" ? t.setAttribute("disabled", "") : e === "enable" ? t.removeAttribute("disabled") : e === "remove" && t.remove());
}
function Vc() {
  const i = document.createElement("style"), e = [zc, Mc, Rc].join(`
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

${t}`, document.head.append(i), w.renderedCss = !0;
}
const Qc = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  run: Nc
}, Symbol.toStringTag, { value: "Module" }));
export {
  Qc as i,
  Nc as r
};
