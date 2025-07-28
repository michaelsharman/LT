import { l as t } from "./logger-BpyELtLr.js";
const l = "@caspingus/lt", d = "3.0.0-beta.2", c = "module", p = "A utility library of helpers and extensions useful when working with Learnosity APIs.", u = ["learnosity", "assessment", "edtech"], g = "MIT", h = "michael@learnosity.com", f = "https://michaelsharman.github.io/LT/", m = { type: "git", url: "git+https://github.com/michaelsharman/LT.git" }, b = { url: "https://github.com/michaelsharman/LT/issues" }, v = { ".": null, "./assessment": "./dist/assessment/index.js", "./assessment/core": "./dist/assessment/core.js", "./assessment/extensions/*": "./dist/assessment/extensions/*", "./authoring": "./dist/authoring/index.js", "./authoring/core": "./dist/authoring/core.js", "./authoring/extensions/*": "./dist/authoring/extensions/*" }, y = ["**/*.css"], j = { dev: "vite build --watch -l info", build: "vite build", lint: "npx eslint --format table", docs: "jsdoc -c jsdoc.json -R README.md --verbose", test: "node --experimental-vm-modules node_modules/.bin/jest --verbose --detectOpenHandles --logHeapUsage --runInBand", "start:server": "nodemon ./tests/api-server/src/server.js", "start:server:background": "nodemon ./tests/api-server/src/server.js &" }, w = { "@caspingus/ssml-editor": "^0.1.1", "@uppy/compressor": "^2.2.1", "@uppy/core": "^4.4.3", "@uppy/dashboard": "^4.3.2", "@uppy/drag-drop": "^4.1.1", "@uppy/image-editor": "^3.3.1", "active-table": "^1.1.6", entities: "^6.0.0", howler: "^2.2.4", "lodash-es": "^4.17.21", mousetrap: "^1.6.5", papaparse: "^5.5.2", "pdfjs-dist": "^5.2.133", "platform-detect": "^3.0.1", postcss: "^8.5.4", "postcss-import": "^16.1.0", seedrandom: "^3.0.5", xlsx: "https://cdn.sheetjs.com/xlsx-0.20.3/xlsx-0.20.3.tgz" }, x = { "@babel/core": "^7.26.10", "@babel/preset-env": "^7.26.9", "@eslint/js": "^9.24.0", "@stylistic/eslint-plugin-js": "^4.2.0", "@types/jest": "^30.0.0", "babel-jest": "^30.0.0", "babel-loader": "^10.0.0", "css-loader": "^7.1.2", docdash: "^2.0.2", ejs: "^3.1.10", eslint: "^9.24.0", "eslint-formatter-table": "^7.32.1", express: "^5.1.0", globals: "^16.0.0", jest: "^30.0.0", "learnosity-sdk-nodejs": "github:Learnosity/learnosity-sdk-nodejs", nodemon: "^3.1.9", npm: "^11.2.0", puppeteer: "^24.8.0", "style-loader": "^4.0.0", "svg-inline-loader": "^0.8.2", vite: "7.0.3" }, _ = { rollup: "4.29.1" }, L = {
  name: l,
  version: d,
  private: !1,
  type: c,
  description: p,
  keywords: u,
  license: g,
  author: h,
  homepage: f,
  repository: m,
  bugs: b,
  exports: v,
  sideEffects: y,
  scripts: j,
  dependencies: w,
  devDependencies: x,
  overrides: _
}, o = {
  events: {
    broadcast: !1,
    listenFor: "all"
  }
};
function A() {
  const e = window.LearnosityApp ? LearnosityApp.versions : {};
  return {
    apps: {},
    LT: {
      version: L.version
    },
    versions: e
  };
}
function O(e) {
  /^[a-zA-Z:*]*$/.test(e) ? o.events.listenFor = e : t.warn("Invalid event type");
}
function r(e) {
  if (o.events.broadcast) {
    const s = o.events.listenFor, i = s.replaceAll("*", "");
    s.length === 1 && s === "*" || s === "all" ? t.info(e) : s.startsWith("*") && !s.endsWith("*") ? e.endsWith(i) && t.info(e) : s.endsWith("*") && !s.startsWith("*") ? e.startsWith(i) && t.info(e) : s.startsWith("*") && s.endsWith("*") ? e.includes(i) && t.info(e) : e.startsWith(i) && t.info(e);
  }
}
function T(e = !0) {
  o.events.broadcast = !!e, e ? t.info(`👂 listening for '${o.events.listenFor}'`) : t.info("🚫👂 not listening");
}
const W = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  diagnostics: A,
  filterEvent: O,
  handleEvent: r,
  listen: T
}, Symbol.toStringTag, { value: "Module" })), a = {};
function S(e) {
  a.app = e, k();
}
function n() {
  return a.app;
}
function E() {
  return n().editorApp() !== void 0 ? n().editorApp() : null;
}
function k() {
  a.app.on("all", r), ["widgetedit:editor:ready", "widgetedit:widget:ready", "widgetedit:preview:changed", "widgetedit:widget:changed"].forEach((s) => a.app.on(s, () => r(s)));
}
const z = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  appInstance: n,
  init: S,
  questionEditorApp: E
}, Symbol.toStringTag, { value: "Module" }));
function M() {
  n().on("navigate", (e) => {
    window.location.hash = "#" + e.data.locationEncoded;
  }), n().navigate(window.location.hash.replace(/^#/, "")), window.onhashchange = () => {
    n().navigate(window.location.hash.replace(/^#/, ""));
  };
}
const P = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  routingHash: M
}, Symbol.toStringTag, { value: "Module" }));
function F() {
  return n().getWidget()?.type;
}
const I = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  type: F
}, Symbol.toStringTag, { value: "Module" })), $ = {
  utils: {
    logger: t
  }
}, H = { ...z, ...W, ...P, ...I, ...$ };
export {
  H as L,
  n as a,
  A as d,
  F as t
};
