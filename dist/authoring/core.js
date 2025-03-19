var n={2147:(n,e,t)=>{t.r(e),t.d(e,{diagnostics:()=>a,filterEvent:()=>c,handleEvent:()=>l,listen:()=>p});var o=t(5059);const r={rE:"2.23.0"};var i={events:{broadcast:!1,listenFor:"all"}};function a(){var n=window.LearnosityApp?LearnosityApp.versions:{};return{apps:{},LT:{version:r.rE},versions:n}}function c(n){/^[a-zA-Z:*]*$/.test(n)?i.events.listenFor=n:o.A.warn("Invalid event type")}function l(n){if(i.events.broadcast){var e=i.events.listenFor,t=e.replaceAll("*","");1===e.length&&"*"===e||"all"===e?o.A.info(n):e.startsWith("*")&&!e.endsWith("*")?n.endsWith(t)&&o.A.info(n):e.endsWith("*")&&!e.startsWith("*")?n.startsWith(t)&&o.A.info(n):e.startsWith("*")&&e.endsWith("*")?n.includes(t)&&o.A.info(n):n.startsWith(t)&&o.A.info(n)}}function p(){var n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];i.events.broadcast=Boolean(n),Boolean(n)?o.A.info("👂 listening for '".concat(i.events.listenFor,"'")):o.A.info("🚫👂 not listening")}},2530:(n,e,t)=>{t.r(e),t.d(e,{type:()=>r});var o=t(5716);function r(){var n;return null===(n=o.appInstance().getWidget())||void 0===n?void 0:n.type}},5059:(n,e,t)=>{t.d(e,{A:()=>o});const o={debug:function(){for(var n,e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];(n=console).debug.apply(n,["%cDebug:","display:inline-block;background-color:purple;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))},error:function(){for(var n,e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];(n=console).error.apply(n,["%cError:","display:inline-block;background-color:#e0005a;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))},info:function(){for(var n,e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];(n=console).info.apply(n,["%cInfo:","display:inline-block;background-color:#46C0FF;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))},log:function(){var n;(n=console).log.apply(n,arguments)},warn:function(){for(var n,e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];(n=console).warn.apply(n,["%cWarning:","display:inline-block;background-color:gold;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))}}},5716:(n,e,t)=>{t.r(e),t.d(e,{appInstance:()=>a,init:()=>i,questionEditorApp:()=>c});var o=t(2147),r={};function i(n){r.app=n,r.app.on("all",(function(n){(0,o.handleEvent)(n)})),r.app.on("widgetedit:editor:ready",(function(n){(0,o.handleEvent)("widgetedit:editor:ready")})),r.app.on("widgetedit:widget:ready",(function(n){(0,o.handleEvent)("widgetedit:widget:ready")})),r.app.on("widgetedit:preview:changed",(function(n){(0,o.handleEvent)("widgetedit:preview:changed")})),r.app.on("widgetedit:widget:changed",(function(n){(0,o.handleEvent)("widgetedit:widget:changed")}))}function a(){return r.app}function c(){return void 0!==a().editorApp()?a().editorApp():null}}},e={};function t(o){var r=e[o];if(void 0!==r)return r.exports;var i=e[o]={exports:{}};return n[o](i,i.exports,t),i.exports}t.d=(n,e)=>{for(var o in e)t.o(e,o)&&!t.o(n,o)&&Object.defineProperty(n,o,{enumerable:!0,get:e[o]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})};var o={};t.d(o,{LT:()=>g});var r={};t.r(r),t.d(r,{routingHash:()=>c});var i=t(5716),a=t(2147);function c(){i.appInstance().on("navigate",(function(n){window.location.hash="#"+n.data.locationEncoded})),i.appInstance().navigate(window.location.hash.replace(/^#/,"")),window.onhashchange=function(){i.appInstance().navigate(window.location.hash.replace(/^#/,""))}}var l=t(2530);function p(n){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},p(n)}function d(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(n);e&&(o=o.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,o)}return t}function s(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?d(Object(t),!0).forEach((function(e){f(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function f(n,e,t){return(e=function(n){var e=function(n){if("object"!=p(n)||!n)return n;var e=n[Symbol.toPrimitive];if(void 0!==e){var t=e.call(n,"string");if("object"!=p(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(n)}(n);return"symbol"==p(e)?e:e+""}(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var u={utils:{logger:t(5059).A}},g=s(s(s(s(s({},i),a),r),l),u),v=o.LT;export{v as LT};