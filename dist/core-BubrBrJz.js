import n from "./logger.js";
const l = "3.0.0-beta.3", o = {
  events: {
    broadcast: !1,
    listenFor: "all"
  }
};
function d() {
  const t = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {},
    LT: {
      version: l
    },
    versions: t
  };
}
function c(t) {
  /^[a-zA-Z:*]*$/.test(t) ? o.events.listenFor = t : n.warn("Invalid event type");
}
function r(t) {
  if (o.events.broadcast) {
    const e = o.events.listenFor, s = e.replaceAll("*", "");
    e.length === 1 && e === "*" || e === "all" ? n.info(t) : e.startsWith("*") && !e.endsWith("*") ? t.endsWith(s) && n.info(t) : e.endsWith("*") && !e.startsWith("*") ? t.startsWith(s) && n.info(t) : e.startsWith("*") && e.endsWith("*") ? t.includes(s) && n.info(t) : t.startsWith(s) && n.info(t);
  }
}
function f(t = !0) {
  o.events.broadcast = !!t, t ? n.info(`👂 listening for '${o.events.listenFor}'`) : n.info("🚫👂 not listening");
}
const p = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: d,
  filterEvent: c,
  handleEvent: r,
  listen: f
}, Symbol.toStringTag, { value: "Module" })), a = {};
function g(t) {
  a.app = t, h();
}
function i() {
  return a.app;
}
function u() {
  return i().editorApp() !== void 0 ? i().editorApp() : null;
}
function h() {
  a.app.on("all", r), ["widgetedit:editor:ready", "widgetedit:widget:ready", "widgetedit:preview:changed", "widgetedit:widget:changed"].forEach((e) => a.app.on(e, () => r(e)));
}
const w = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appInstance: i,
  init: g,
  questionEditorApp: u
}, Symbol.toStringTag, { value: "Module" }));
function v() {
  i().on("navigate", (t) => {
    window.location.hash = "#" + t.data.locationEncoded;
  }), i().navigate(window.location.hash.replace(/^#/, "")), window.onhashchange = () => {
    i().navigate(window.location.hash.replace(/^#/, ""));
  };
}
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routingHash: v
}, Symbol.toStringTag, { value: "Module" }));
function _() {
  return i().getWidget()?.type;
}
const y = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  type: _
}, Symbol.toStringTag, { value: "Module" })), W = {
  utils: {
    logger: n
  }
}, O = { ...w, ...p, ...b, ...y, ...W };
export {
  O as L,
  i as a,
  d,
  _ as t
};
