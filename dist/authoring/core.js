var e={5716:(e,n,t)=>{t.r(n),t.d(n,{appInstance:()=>a,init:()=>i,questionEditorApp:()=>c});var o=t(2147),r={};function i(e){r.app=e,r.app.on("all",(function(e){(0,o.handleEvent)(e)})),r.app.on("widgetedit:editor:ready",(function(e){(0,o.handleEvent)("widgetedit:editor:ready")})),r.app.on("widgetedit:widget:ready",(function(e){(0,o.handleEvent)("widgetedit:widget:ready")})),r.app.on("widgetedit:preview:changed",(function(e){(0,o.handleEvent)("widgetedit:preview:changed")})),r.app.on("widgetedit:widget:changed",(function(e){(0,o.handleEvent)("widgetedit:widget:changed")}))}function a(){return r.app}function c(){return void 0!==a().editorApp()?a().editorApp():null}},2147:(e,n,t)=>{t.r(n),t.d(n,{diagnostics:()=>a,filterEvent:()=>c,handleEvent:()=>d,listen:()=>l});var o=t(5059);const r={rE:"2.20.0"};var i={events:{broadcast:!1,listenFor:"all"}};function a(){var e=window.LearnosityApp?LearnosityApp.versions:{};return{apps:{},LT:{version:r.rE},versions:e}}function c(e){/^[a-zA-Z:*]*$/.test(e)?i.events.listenFor=e:o.A.warn("Invalid event type")}function d(e){if(i.events.broadcast){var n=i.events.listenFor,t=n.replaceAll("*","");1===n.length&&"*"===n||"all"===n?o.A.info(e):n.startsWith("*")&&!n.endsWith("*")?e.endsWith(t)&&o.A.info(e):n.endsWith("*")&&!n.startsWith("*")?e.startsWith(t)&&o.A.info(e):n.startsWith("*")&&n.endsWith("*")?e.includes(t)&&o.A.info(e):e.startsWith(t)&&o.A.info(e)}}function l(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];i.events.broadcast=Boolean(e),Boolean(e)?o.A.info("👂 listening for '".concat(i.events.listenFor,"'")):o.A.info("🚫👂 not listening")}},2530:(e,n,t)=>{t.r(n),t.d(n,{type:()=>r});var o=t(5716);function r(){var e;return null===(e=o.appInstance().getWidget())||void 0===e?void 0:e.type}},5059:(e,n,t)=>{t.d(n,{A:()=>o});const o={debug:function(e,n){"DEBUG"===n&&console.log(e)},error:function(e){console.error("%cError:%c "+e,"display:inline-block;background-color:#e0005a;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px","")},info:function(e){console.info("%cInfo:%c "+e,"display:inline-block;background-color:#46C0FF;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px","")},log:function(e){console.log(e)},warn:function(e){console.warn("%cWarning:%c "+e,"display:inline-block;background-color:gold;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px","")}}}},n={};function t(o){var r=n[o];if(void 0!==r)return r.exports;var i=n[o]={exports:{}};return e[o](i,i.exports,t),i.exports}t.d=(e,n)=>{for(var o in n)t.o(n,o)&&!t.o(e,o)&&Object.defineProperty(e,o,{enumerable:!0,get:n[o]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var o={};t.d(o,{LT:()=>g});var r={};t.r(r),t.d(r,{routingHash:()=>c});var i=t(5716),a=t(2147);function c(){i.appInstance().on("navigate",(function(e){window.location.hash="#"+e.data.locationEncoded})),i.appInstance().navigate(window.location.hash.replace(/^#/,"")),window.onhashchange=function(){i.appInstance().navigate(window.location.hash.replace(/^#/,""))}}var d=t(2530);function l(e){return l="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},l(e)}function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function s(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){u(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function u(e,n,t){return(n=function(e){var n=function(e){if("object"!=l(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var t=n.call(e,"string");if("object"!=l(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==l(n)?n:n+""}(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var f={utils:{logger:t(5059).A}},g=s(s(s(s(s({},i),a),r),d),f),v=o.LT;export{v as LT};