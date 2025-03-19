var n={77:(n,e,t)=>{t.r(e),t.d(e,{answerMasking:()=>s,dialog:()=>u,hideDialog:()=>c,isResponsiveMode:()=>l,isReviewScreen:()=>f,lineReader:()=>d,navigate:()=>p,next:()=>v,previous:()=>g,review:()=>m,submit:()=>y}),t(173);var i=t(4113),o=t(7518),r=t(5059),a={answerMasking:{enabled:null},lineReader:{enabled:null,id:null}};function s(n){if(null===a.answerMasking.enabled){var e=document.querySelector(".test-answer-masking");a.answerMasking.enabled=!!e}a.answerMasking.enabled?void 0!==n&&i.appInstance().questionsApp().masking(n):r.A.warn("Answer masking is not enabled in the Items API configuration.")}function u(n){i.assessApp().dialogs().custom.show(n)}function c(){i.assessApp().dialogs().custom.hide()}function l(){return Boolean(document.querySelector(".has-menu-region"))}function f(){var n=!1;setTimeout((function(){return null===document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden")&&(n=!0),n}),500)}function d(n){if(null===a.lineReader.enabled){var e=document.querySelector(".lrn_linereader-toggle");if(e){a.lineReader.enabled=!0;var t=e.querySelector("[data-lrn-widget-container]").getAttribute("data-lrn-widget-container").match(/\d+$/);t?a.lineReader.id=t[0]:r.A.warn("Could not find the line reader unique id.")}else a.lineReader.enabled=!1}if(a.lineReader.enabled&&null!==a.lineReader.id){var o=i.appInstance().features()["lrn-assessapp-feature_".concat(a.lineReader.id)];switch(n){case"show":o.show();break;case"hide":o.hide();break;default:o.toggle()}}else r.A.warn("Line reader is not enabled in the Items API configuration.")}function p(n){switch(n){case"previous":i.appInstance().items().previous();break;case"next":o.isLastItem()||i.appInstance().items().next();break;case"review":null===document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden")?i.appInstance().dialogs().reviewScreen.hide():i.appInstance().dialogs().reviewScreen.show();break;case"submit":var e={show_submit_confirmation:!0,show_submit_ui:!0,success:function(n){alert("Test saved!")},error:function(n){alert("Test submit failed...check browser log"),console.log("Submission failed: ",n)}};i.appInstance().submit(e);break;default:"number"==typeof Number(n)&&Number(n)>=0?i.appInstance().items().goto(Number(n)):r.A.warn("Invalid target (".concat(n,")"))}}function v(){p("next")}function g(){p("previous")}function m(){p("review")}function y(){p("submit")}},173:(n,e,t)=>{t.r(e),t.d(e,{activity:()=>a,activityId:()=>s,activitySubTitle:()=>l,activityTags:()=>f,activityTemplateId:()=>u,activityTitle:()=>c,adaptiveType:()=>d,annotationsConfig:()=>p,autoSaveConfig:()=>v,elapsedTime:()=>g,hasActivityTemplate:()=>m,hasAnnotations:()=>y,hasAnswerMasking:()=>b,hasAutoSave:()=>h,hasEvents:()=>w,hasItemPool:()=>I,hasLineReader:()=>A,hasResourceItems:()=>S,hasSections:()=>k,hasShuffledItems:()=>_,hasTryAgain:()=>O,isAdaptive:()=>P,isResuming:()=>q,itemBank:()=>x,itemPool:()=>R,maxTime:()=>T,region:()=>j,resourceItems:()=>E,sessionId:()=>B,state:()=>C,timeRemaining:()=>L,totalItems:()=>F,userId:()=>M});var i=t(4113),o=t(7028),r=t(5059);function a(){return i.appInstance().getActivity()}function s(){return a().activity_id}function u(){return a().activity_template_id}function c(){return a().config.title}function l(){return a().config.subtitle}function f(){return i.appInstance().getTags()}function d(){return P()&&a().adaptive.hasOwnProperty("type")?a().adaptive.type:""}function p(){var n;return y()&&null!==(n=a())&&void 0!==n&&null!==(n=n.config)&&void 0!==n&&n.annotations_api_init_options?a().config.annotations_api_init_options:{}}function v(){var n,e=a();return null!=e&&null!==(n=e.config)&&void 0!==n&&null!==(n=n.navigation)&&void 0!==n&&n.auto_save?e.config.navigation.auto_save:{}}function g(){return i.appInstance().getTime()}function m(){return a().hasOwnProperty("activity_template_id")}function y(){var n,e,t=a();return Boolean(!0===(null==t||null===(n=t.config)||void 0===n?void 0:n.annotations)||(null==t||null===(e=t.config)||void 0===e?void 0:e.annotations_api_init_options))}function b(){return!!document.querySelector(".test-answer-masking")}function h(){var n=a();return n.hasOwnProperty("config")&&n.config.hasOwnProperty("navigation")&&n.config.navigation.hasOwnProperty("auto_save")&&!1!==n.config.navigation.auto_save}function _(){var n;return Boolean(null===(n=a())||void 0===n||null===(n=n.config)||void 0===n||null===(n=n.configuration)||void 0===n?void 0:n.shuffle_items)}function w(){var n=a();return n.hasOwnProperty("events")&&!1!==n.events}function I(){return a().hasOwnProperty("item_pool_id")}function A(){return!!document.querySelector(".lrn_linereader-toggle")}function S(){var n;return Boolean(null===(n=a())||void 0===n||null===(n=n.config)||void 0===n||null===(n=n.navigation)||void 0===n?void 0:n.resource_items)}function k(){return a().hasOwnProperty("sections")}function O(){var n;return null===(n=a())||void 0===n?void 0:n.dynamic_items.hasOwnProperty("try_again")}function P(){return a().hasOwnProperty("adaptive")}function q(){return a().existing_session}function x(){var n;return null===(n=a())||void 0===n?void 0:n.organisation_id}function R(){var n;return null===(n=a())||void 0===n?void 0:n.item_pool_id}function T(){var n;return null!==(n=a())&&void 0!==n&&null!==(n=n.config)&&void 0!==n&&null!==(n=n.time)&&void 0!==n&&n.max_time?a().config.time.max_time:0}function j(){var n;return null===(n=a())||void 0===n||null===(n=n.config)||void 0===n?void 0:n.regions}function E(){var n;return null===(n=a())||void 0===n||null===(n=n.config)||void 0===n||null===(n=n.navigation)||void 0===n?void 0:n.resource_items}function B(){var n;return null===(n=a())||void 0===n?void 0:n.session_id}function C(){var n;return void 0===(null===(n=a())||void 0===n?void 0:n.state)?"initial":a().state}function L(){return 0===T()?null:T()-g()}function F(){if(k()){for(var n=0,e=o.sections(),t=0;t<e.length;t++)n+=e[t].items.length;return n}return P()?a().hasOwnProperty("items")?a().items.length:(r.A.info("This is an adaptive session, no items array found"),0):a().items.length}function M(){var n;return null===(n=a())||void 0===n?void 0:n.user_id}},2201:(n,e,t)=>{t.d(e,{r:()=>i});var i="2.23.0"},3674:(n,e,t)=>{t.r(e),t.d(e,{diagnostics:()=>u,filterEvent:()=>c,handleEvent:()=>l,listen:()=>f});var i=t(4113),o=t(173),r=t(5059),a=t(2201),s={events:{broadcast:!1,listenFor:"item"}};function u(){var n=window.LearnosityApp?LearnosityApp.versions:{};return{apps:{annotations:{app:i.annotationsApp(),config:o.annotationsConfig(),enabled:o.hasAnnotations()},assess:{app:i.assessApp()},events:{app:i.eventsApp(),enabled:o.hasEvents()},items:{app:i.appInstance(),metadata:o.activity().config.metadata},questions:{app:i.questionsApp()}},activity:{activity:o.activityId(),activityTemplate:o.activityTemplateId(),autoSave:{config:o.autoSaveConfig(),enabled:o.hasAutoSave()},itemBank:o.itemBank(),itemPool:o.itemPool(),session:o.sessionId(),state:o.state(),type:o.activity().type,user:o.userId()},LT:{version:a.r},versions:n}}function c(n){/^[a-zA-Z:*]*$/.test(n)?s.events.listenFor=n:r.A.warn("Invalid event type")}function l(n){if(s.events.broadcast){var e=s.events.listenFor,t=e.replaceAll("*","");1===e.length&&"*"===e||"all"===e?r.A.info(n):e.startsWith("*")&&!e.endsWith("*")?n.endsWith(t)&&r.A.info(n):e.endsWith("*")&&!e.startsWith("*")?n.startsWith(t)&&r.A.info(n):e.startsWith("*")&&e.endsWith("*")?n.includes(t)&&r.A.info(n):n.startsWith(t)&&r.A.info(n)}}function f(){var n=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];s.events.broadcast=Boolean(n),Boolean(n)?r.A.info("👂 listening for '".concat(s.events.listenFor,"'")):r.A.info("🚫👂 not listening")}},3963:(n,e,t)=>{t.r(e),t.d(e,{hasCheckAnswer:()=>s,isAutoScorable:()=>u,question:()=>c,questionInstance:()=>l,questionResponse:()=>d,questionResponseIds:()=>p,questionScore:()=>v,questions:()=>f});var i=t(4113),o=t(7518),r=t(173),a=t(5059);function s(n){var e;if(!u(n))return!1;var t=(null===(e=(0,r.activity)())||void 0===e||null===(e=e.config)||void 0===e||null===(e=e.questions_api_init_options)||void 0===e?void 0:e.attribute_overrides)&&(0,r.activity)().config.questions_api_init_options.attribute_overrides.hasOwnProperty("instant_feedback")&&"boolean"==typeof(0,r.activity)().config.questions_api_init_options.attribute_overrides.instant_feedback,i=c(n);return t?(0,r.activity)().config.questions_api_init_options.attribute_overrides.instant_feedback:!(!i.hasOwnProperty("instant_feedback")||"boolean"!=typeof i.instant_feedback)&&i.instant_feedback}function u(n){return c(n),l(n).checkValidation().has_validation}function c(n){var e=n||p()[0];return e?i.appInstance().question(e).getQuestion():(a.A.error("Question not found (index ".concat(e,")")),{})}function l(n){var e=n||p()[0];return e?i.appInstance().question(e):{}}function f(){return o.item().questions}function d(n){var e=n||p()[0];return e?function(n){return i.appInstance().question(n)?i.appInstance().question(n).getResponse():void a.A.error("Response not found ".concat(n))}(e):{}}function p(){return f().map((function(n){return n.response_id}))}function v(n){var e=n||p()[0];return e&&i.appInstance().getScores()[e]||{}}},4113:(n,e,t)=>{t.r(e),t.d(e,{annotationsApp:()=>u,appInstance:()=>s,assessApp:()=>c,eventsApp:()=>l,init:()=>a,questionsApp:()=>f});var i=t(3674),o=t(3963),r={};function a(n){r.app=n,r.app.on("all",(function(n){(0,i.handleEvent)(n)})),r.app.on("item:load",(function(n){(0,o.questionResponseIds)().forEach((function(n){r.app.question(n).on("changed",(function(n){(0,i.handleEvent)("changed")})),r.app.question(n).on("beforeValidate",(function(n){(0,i.handleEvent)("beforeValidate")})),r.app.question(n).on("rendered",(function(n){(0,i.handleEvent)("rendered")})),r.app.question(n).on("validated",(function(n){(0,i.handleEvent)("validated")}))}))}))}function s(){return r.app}function u(){return void 0!==s().annotationsApp()?s().annotationsApp():null}function c(){return s().assessApp()}function l(){return s().eventsApp()}function f(){return s().questionsApp()}},5059:(n,e,t)=>{t.d(e,{A:()=>i});const i={debug:function(){for(var n,e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];(n=console).debug.apply(n,["%cDebug:","display:inline-block;background-color:purple;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))},error:function(){for(var n,e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];(n=console).error.apply(n,["%cError:","display:inline-block;background-color:#e0005a;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))},info:function(){for(var n,e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];(n=console).info.apply(n,["%cInfo:","display:inline-block;background-color:#46C0FF;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))},log:function(){var n;(n=console).log.apply(n,arguments)},warn:function(){for(var n,e=arguments.length,t=new Array(e),i=0;i<e;i++)t[i]=arguments[i];(n=console).warn.apply(n,["%cWarning:","display:inline-block;background-color:gold;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))}}},7028:(n,e,t)=>{t.r(e),t.d(e,{isFirstItemInSection:()=>r,isLastItemInSection:()=>a,section:()=>s,sectionHasShuffledItems:()=>u,sectionIndex:()=>c,sectionItemPosition:()=>l,sections:()=>f,totalItemsInSection:()=>d});var i=t(173),o=t(7518);function r(){return 1===l()}function a(){return l()===d()}function s(){if(i.hasSections()){for(var n=o.itemReference(),e=f(),t=-1,r=!1,a=0;a<e.length&&!r;a++){++t;for(var s=0;s<e[a].items.length;s++)if(n===e[a].items[s].reference){r=!0;break}}return f()[t]}return{}}function u(){var n;return Boolean(null===(n=s())||void 0===n||null===(n=n.config)||void 0===n||null===(n=n.configuration)||void 0===n?void 0:n.shuffle_items)}function c(){if(i.hasSections()){for(var n=o.itemReference(),e=e(),t=0,r=!1,a=0;a<e.length&&!r;a++){++t;for(var s=0;s<e[a].items.length;s++)if(n===e[a].items[s].reference){r=!0;break}}return t}return 0}function l(){var n=o.itemReference(),e=s(),t=0;if(!Object.keys(e).length)return null;for(var i=0;i<e.items.length&&(++t,n!==e.items[i].reference);i++);return t}function f(){return i.hasSections()?i.activity().sections:[]}function d(){var n;return(null===(n=s())||void 0===n||null===(n=n.items)||void 0===n?void 0:n.length)||null}},7518:(n,e,t)=>{t.r(e),t.d(e,{dynamic:()=>u,flag:()=>c,isDynamicItem:()=>l,isFirstItem:()=>f,isFlagged:()=>p,isItemFullyAttempted:()=>v,isLastItem:()=>d,isMaskingEnabled:()=>g,item:()=>m,itemAttemptStatus:()=>y,itemByResponseId:()=>b,itemElement:()=>h,itemPosition:()=>_,itemReference:()=>w,itemTags:()=>I});var i=t(4113),o=t(173),r=t(3963),a=t(7028);function s(n){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},s(n)}function u(){var n=w();return i.assessApp().item(n).dynamic||{}}function c(){var n=w();i.assessApp().item(n).flag()}function l(){var n;return null===(n=m())||void 0===n?void 0:n.source.hasOwnProperty("data_table_seed")}function f(){return o.hasSections()?("object"===s(a.sections()[0].items[0])?a.sections()[0].items[0].reference:a.sections()[0].items[0])===m().reference:("object"===s(o.activity().items[0])?o.activity().items[0].reference:o.activity().items[0])===m().reference}function d(){return m().is_last_item}function p(){return m().user_flagged}function v(n){var e,t,o;if(e=n?i.appInstance().getItems()[n].questions:r.questions(),Array.isArray(e)&&e.length)for(var a=0;a<e.length;a++){var s=e[a];if(!(o=r.questionResponse(s.response_id)))return!1;if(s.hasOwnProperty("metadata")&&s.metadata.hasOwnProperty("valid_response_count")&&Array.isArray(o.value)){if(o.value.filter((function(n){return void 0===n})).length)return!1;if(o.value.filter((function(n){return null===n})).length)return!1}t=!0}else t=!0;return t}function g(){return Boolean(document.querySelector(".lrn-masking"))}function m(n){return n?i.appInstance().getItems()[n]:i.appInstance().getCurrentItem()}function y(){return i.appInstance().getCurrentItem().attempt_status}function b(n){var e,t=i.appInstance().getItems();for(var o in t)if(t[o].response_ids.includes(n)){e=t[o];break}return e}function h(){return document.querySelector("div[data-reference='".concat(w(),"']"))}function _(){return i.appInstance().assessApp().getItemPosition(w())+1}function w(){return i.appInstance().getCurrentItem().reference}function I(n){return i.appInstance().getTags()[n||w()]||[]}}},e={};function t(i){var o=e[i];if(void 0!==o)return o.exports;var r=e[i]={exports:{}};return n[i](r,r.exports,t),r.exports}t.d=(n,e)=>{for(var i in e)t.o(e,i)&&!t.o(n,i)&&Object.defineProperty(n,i,{enumerable:!0,get:e[i]})},t.o=(n,e)=>Object.prototype.hasOwnProperty.call(n,e),t.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})};var i={};t.d(i,{LT:()=>m});var o=t(4113),r=t(173),a=t(3674),s=t(7518),u=t(77),c=t(3963),l=t(7028);function f(n){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},f(n)}function d(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(n);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,i)}return t}function p(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?d(Object(t),!0).forEach((function(e){v(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):d(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}function v(n,e,t){return(e=function(n){var e=function(n){if("object"!=f(n)||!n)return n;var e=n[Symbol.toPrimitive];if(void 0!==e){var t=e.call(n,"string");if("object"!=f(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(n)}(n);return"symbol"==f(e)?e:e+""}(e))in n?Object.defineProperty(n,e,{value:t,enumerable:!0,configurable:!0,writable:!0}):n[e]=t,n}var g={utils:{logger:t(5059).A}},m=p(p(p(p(p(p(p(p({},o),s),r),u),c),l),a),g),y=i.LT;export{y as LT};