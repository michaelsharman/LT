import n from "./logger.js";
const l = "3.0.0-beta.6", i = {
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
      version: l
    },
    versions: e
  };
}
function f(e) {
  /^[a-zA-Z:*]*$/.test(e) ? i.events.listenFor = e : n.warn("Invalid event type");
}
function r(e) {
  if (i.events.broadcast) {
    const t = i.events.listenFor, s = t.replaceAll("*", "");
    t.length === 1 && t === "*" || t === "all" ? n.info(e) : t.startsWith("*") && !t.endsWith("*") ? e.endsWith(s) && n.info(e) : t.endsWith("*") && !t.startsWith("*") ? e.startsWith(s) && n.info(e) : t.startsWith("*") && t.endsWith("*") ? e.includes(s) && n.info(e) : e.startsWith(s) && n.info(e);
  }
}
function c(e = !0) {
  i.events.broadcast = !!e, e ? n.info(`👂 listening for '${i.events.listenFor}'`) : n.info("🚫👂 not listening");
}
const v = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: d,
  filterEvent: f,
  handleEvent: r,
  listen: c
}, Symbol.toStringTag, { value: "Module" })), o = {};
function p(e) {
  o.app = e, u();
}
function a() {
  return o.app;
}
function g() {
  return a().editorApp() !== void 0 ? a().editorApp() : null;
}
function u() {
  o.app.on("all", r), ["widgetedit:editor:ready", "widgetedit:widget:ready", "widgetedit:preview:changed", "widgetedit:widget:changed"].forEach((t) => o.app.on(t, () => r(t)));
}
const b = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appInstance: a,
  init: p,
  questionEditorApp: g
}, Symbol.toStringTag, { value: "Module" }));
export {
  a,
  b,
  d as c,
  v as d
};
