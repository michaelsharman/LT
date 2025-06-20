import { l as n } from "./logger-BpyELtLr.js";
const l = "3.0.0", c = {
  version: l
}, o = {
  events: {
    broadcast: !1,
    listenFor: "all"
  }
};
function d() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {},
    LT: {
      version: c.version
    },
    versions: e
  };
}
function p(e) {
  /^[a-zA-Z:*]*$/.test(e) ? o.events.listenFor = e : n.warn("Invalid event type");
}
function r(e) {
  if (o.events.broadcast) {
    const t = o.events.listenFor, s = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? n.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(s) && n.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(s) && n.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(s) && n.info(e) : e.startsWith(s) && n.info(e);
  }
}
function f(e = !0) {
  o.events.broadcast = !!e, e ? n.info(`👂 listening for '${o.events.listenFor}'`) : n.info("🚫👂 not listening");
}
const g = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: d,
  filterEvent: p,
  handleEvent: r,
  listen: f
}, Symbol.toStringTag, { value: "Module" })), a = {};
function u(e) {
  a.app = e, v();
}
function i() {
  return a.app;
}
function h() {
  return i().editorApp() !== void 0 ? i().editorApp() : null;
}
function v() {
  a.app.on("all", r), ["widgetedit:editor:ready", "widgetedit:widget:ready", "widgetedit:preview:changed", "widgetedit:widget:changed"].forEach((t) => a.app.on(t, () => r(t)));
}
const w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appInstance: i,
  init: u,
  questionEditorApp: h
}, Symbol.toStringTag, { value: "Module" }));
function _() {
  i().on("navigate", (e) => {
    window.location.hash = "#" + e.data.locationEncoded;
  }), i().navigate(window.location.hash.replace(/^#/, "")), window.onhashchange = () => {
    i().navigate(window.location.hash.replace(/^#/, ""));
  };
}
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routingHash: _
}, Symbol.toStringTag, { value: "Module" }));
function y() {
  return i().getWidget()?.type;
}
const W = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  type: y
}, Symbol.toStringTag, { value: "Module" })), O = {
  utils: {
    logger: n
  }
}, j = { ...w, ...g, ...b, ...W, ...O };
export {
  j as L,
  i as a,
  d,
  y as t
};
