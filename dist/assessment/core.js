var e={77:(e,n,t)=>{t.r(n),t.d(n,{answerMasking:()=>s,dialog:()=>u,hideDialog:()=>c,isResponsiveMode:()=>l,isReviewScreen:()=>f,lineReader:()=>p,navigate:()=>d,next:()=>v,previous:()=>m,review:()=>g,submit:()=>y});var i=t(4113),o=t(7518),r=t(5059),a={answerMasking:{enabled:null},lineReader:{enabled:null,id:null}};function s(e){if(null===a.answerMasking.enabled){var n=document.querySelector(".test-answer-masking");a.answerMasking.enabled=!!n}a.answerMasking.enabled?void 0!==e&&i.appInstance().questionsApp().masking(e):r.A.warn("Answer masking is not enabled in the Items API configuration.")}function u(e){i.assessApp().dialogs().custom.show(e)}function c(){i.assessApp().dialogs().custom.hide()}function l(){return Boolean(document.querySelector(".has-menu-region"))}function f(){var e=!1;setTimeout((function(){return null===document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden")&&(e=!0),e}),500)}function p(e){if(null===a.lineReader.enabled){var n=document.querySelector(".lrn_linereader-toggle");if(n){a.lineReader.enabled=!0;var t=n.querySelector("[data-lrn-widget-container]").getAttribute("data-lrn-widget-container").match(/\d+$/);t?a.lineReader.id=t[0]:r.A.warn("Could not find the line reader unique id.")}else a.lineReader.enabled=!1}if(a.lineReader.enabled&&null!==a.lineReader.id){var o=i.appInstance().features()["lrn-assessapp-feature_".concat(a.lineReader.id)];switch(e){case"show":o.show();break;case"hide":o.hide();break;default:o.toggle()}}else r.A.warn("Line reader is not enabled in the Items API configuration.")}function d(e){switch(e){case"previous":i.appInstance().items().previous();break;case"next":o.isLastItem()||i.appInstance().items().next();break;case"review":null===document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden")?i.appInstance().dialogs().reviewScreen.hide():i.appInstance().dialogs().reviewScreen.show();break;case"submit":var n={show_submit_confirmation:!0,show_submit_ui:!0,success:function(){alert("Test saved!")},error:function(e){alert("Test submit failed...check browser log"),r.A.error("Submission failed: ",e)}};i.appInstance().submit(n);break;default:"number"==typeof Number(e)&&Number(e)>=0?i.appInstance().items().goto(Number(e)):r.A.warn("Invalid target (".concat(e,")"))}}function v(){d("next")}function m(){d("previous")}function g(){d("review")}function y(){d("submit")}},173:(e,n,t)=>{t.r(n),t.d(n,{activity:()=>a,activityId:()=>s,activitySubTitle:()=>l,activityTags:()=>f,activityTemplateId:()=>u,activityTitle:()=>c,adaptiveType:()=>p,annotationsConfig:()=>d,autoSaveConfig:()=>v,elapsedTime:()=>m,hasActivityTemplate:()=>g,hasAnnotations:()=>y,hasAnswerMasking:()=>b,hasAutoSave:()=>h,hasEvents:()=>w,hasItemPool:()=>I,hasLineReader:()=>A,hasResourceItems:()=>S,hasSections:()=>k,hasShuffledItems:()=>_,hasTryAgain:()=>O,isAdaptive:()=>P,isResuming:()=>q,itemBank:()=>x,itemPool:()=>R,maxTime:()=>T,region:()=>j,resourceItems:()=>E,sessionId:()=>B,state:()=>C,timeRemaining:()=>L,totalItems:()=>F,userId:()=>M});var i=t(4113),o=t(7028),r=t(5059);function a(){return i.appInstance().getActivity()}function s(){return a().activity_id}function u(){return a().activity_template_id}function c(){return a().config.title}function l(){return a().config.subtitle}function f(){return i.appInstance().getTags()}function p(){return P()&&a().adaptive.hasOwnProperty("type")?a().adaptive.type:""}function d(){var e;return y()&&null!==(e=a())&&void 0!==e&&null!==(e=e.config)&&void 0!==e&&e.annotations_api_init_options?a().config.annotations_api_init_options:{}}function v(){var e,n=a();return null!=n&&null!==(e=n.config)&&void 0!==e&&null!==(e=e.navigation)&&void 0!==e&&e.auto_save?n.config.navigation.auto_save:{}}function m(){return i.appInstance().getTime()}function g(){return a().hasOwnProperty("activity_template_id")}function y(){var e,n,t=a();return Boolean(!0===(null==t||null===(e=t.config)||void 0===e?void 0:e.annotations)||(null==t||null===(n=t.config)||void 0===n?void 0:n.annotations_api_init_options))}function b(){return!!document.querySelector(".test-answer-masking")}function h(){var e=a();return e.hasOwnProperty("config")&&e.config.hasOwnProperty("navigation")&&e.config.navigation.hasOwnProperty("auto_save")&&!1!==e.config.navigation.auto_save}function _(){var e;return Boolean(null===(e=a())||void 0===e||null===(e=e.config)||void 0===e||null===(e=e.configuration)||void 0===e?void 0:e.shuffle_items)}function w(){var e=a();return e.hasOwnProperty("events")&&!1!==e.events}function I(){return a().hasOwnProperty("item_pool_id")}function A(){return!!document.querySelector(".lrn_linereader-toggle")}function S(){var e;return Boolean(null===(e=a())||void 0===e||null===(e=e.config)||void 0===e||null===(e=e.navigation)||void 0===e?void 0:e.resource_items)}function k(){return a().hasOwnProperty("sections")}function O(){var e;return null===(e=a())||void 0===e?void 0:e.dynamic_items.hasOwnProperty("try_again")}function P(){return a().hasOwnProperty("adaptive")}function q(){return a().existing_session}function x(){var e;return null===(e=a())||void 0===e?void 0:e.organisation_id}function R(){var e;return null===(e=a())||void 0===e?void 0:e.item_pool_id}function T(){var e;return null!==(e=a())&&void 0!==e&&null!==(e=e.config)&&void 0!==e&&null!==(e=e.time)&&void 0!==e&&e.max_time?a().config.time.max_time:0}function j(){var e;return null===(e=a())||void 0===e||null===(e=e.config)||void 0===e?void 0:e.regions}function E(){var e;return null===(e=a())||void 0===e||null===(e=e.config)||void 0===e||null===(e=e.navigation)||void 0===e?void 0:e.resource_items}function B(){var e;return null===(e=a())||void 0===e?void 0:e.session_id}function C(){var e;return void 0===(null===(e=a())||void 0===e?void 0:e.state)?"initial":a().state}function L(){return 0===T()?null:T()-m()}function F(){if(k()){for(var e=0,n=o.sections(),t=0;t<n.length;t++)e+=n[t].items.length;return e}return P()?a().hasOwnProperty("items")?a().items.length:(r.A.info("This is an adaptive session, no items array found"),0):a().items.length}function M(){var e;return null===(e=a())||void 0===e?void 0:e.user_id}},2201:(e,n,t)=>{t.d(n,{r:()=>i});var i="2.24.0"},3674:(e,n,t)=>{t.r(n),t.d(n,{diagnostics:()=>u,filterEvent:()=>c,handleEvent:()=>l,listen:()=>f});var i=t(4113),o=t(173),r=t(5059),a=t(2201),s={events:{broadcast:!1,listenFor:"item"}};function u(){var e=window.LearnosityApp?LearnosityApp.versions:{};return{apps:{annotations:{app:i.annotationsApp(),config:o.annotationsConfig(),enabled:o.hasAnnotations()},assess:{app:i.assessApp()},events:{app:i.eventsApp(),enabled:o.hasEvents()},items:{app:i.appInstance(),metadata:o.activity().config.metadata},questions:{app:i.questionsApp()}},activity:{activity:o.activityId(),activityTemplate:o.activityTemplateId(),autoSave:{config:o.autoSaveConfig(),enabled:o.hasAutoSave()},itemBank:o.itemBank(),itemPool:o.itemPool(),session:o.sessionId(),state:o.state(),type:o.activity().type,user:o.userId()},LT:{version:a.r},versions:e}}function c(e){/^[a-zA-Z:*]*$/.test(e)?s.events.listenFor=e:r.A.warn("Invalid event type")}function l(e){if(s.events.broadcast){var n=s.events.listenFor,t=n.replaceAll("*","");1===n.length&&"*"===n||"all"===n?r.A.info(e):n.startsWith("*")&&!n.endsWith("*")?e.endsWith(t)&&r.A.info(e):n.endsWith("*")&&!n.startsWith("*")?e.startsWith(t)&&r.A.info(e):n.startsWith("*")&&n.endsWith("*")?e.includes(t)&&r.A.info(e):e.startsWith(t)&&r.A.info(e)}}function f(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0];s.events.broadcast=Boolean(e),Boolean(e)?r.A.info("👂 listening for '".concat(s.events.listenFor,"'")):r.A.info("🚫👂 not listening")}},3963:(e,n,t)=>{t.r(n),t.d(n,{hasCheckAnswer:()=>s,isAutoScorable:()=>u,question:()=>c,questionInstance:()=>l,questionResponse:()=>p,questionResponseIds:()=>d,questionScore:()=>v,questions:()=>f});var i=t(4113),o=t(7518),r=t(173),a=t(5059);function s(e){var n;if(!u(e))return!1;var t=(null===(n=(0,r.activity)())||void 0===n||null===(n=n.config)||void 0===n||null===(n=n.questions_api_init_options)||void 0===n?void 0:n.attribute_overrides)&&(0,r.activity)().config.questions_api_init_options.attribute_overrides.hasOwnProperty("instant_feedback")&&"boolean"==typeof(0,r.activity)().config.questions_api_init_options.attribute_overrides.instant_feedback,i=c(e);return t?(0,r.activity)().config.questions_api_init_options.attribute_overrides.instant_feedback:!(!i.hasOwnProperty("instant_feedback")||"boolean"!=typeof i.instant_feedback)&&i.instant_feedback}function u(e){return l(e).checkValidation().has_validation}function c(e){var n=e||d()[0];return n?i.appInstance().question(n).getQuestion():(a.A.error("Question not found (index ".concat(n,")")),{})}function l(e){var n=e||d()[0];return n?i.appInstance().question(n):{}}function f(){return o.item().questions}function p(e){var n=e||d()[0];return n?function(e){return i.appInstance().question(e)?i.appInstance().question(e).getResponse():void a.A.error("Response not found ".concat(e))}(n):{}}function d(){return f().map((function(e){return e.response_id}))}function v(e){var n=e||d()[0];return n&&i.appInstance().getScores()[n]||{}}},4113:(e,n,t)=>{t.r(n),t.d(n,{annotationsApp:()=>u,appInstance:()=>s,assessApp:()=>c,eventsApp:()=>l,init:()=>a,questionsApp:()=>f});var i=t(3674),o=t(3963),r={};function a(e){r.app=e,r.app.on("all",(function(e){(0,i.handleEvent)(e)})),r.app.on("item:load",(function(){(0,o.questionResponseIds)().forEach((function(e){var n=r.app.question(e);["changed","beforeValidate","rendered","validated"].forEach((function(e){n.on(e,(function(){return(0,i.handleEvent)(e)}))}))}))}))}function s(){return r.app}function u(){return void 0!==s().annotationsApp()?s().annotationsApp():null}function c(){return s().assessApp()}function l(){return s().eventsApp()}function f(){return s().questionsApp()}},5059:(e,n,t)=>{t.d(n,{A:()=>i});const i={debug:function(){for(var e,n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];(e=console).debug.apply(e,["%cDebug:","display:inline-block;background-color:purple;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))},error:function(){for(var e,n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];(e=console).error.apply(e,["%cError:","display:inline-block;background-color:#e0005a;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))},info:function(){for(var e,n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];(e=console).info.apply(e,["%cInfo:","display:inline-block;background-color:#46C0FF;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))},log:function(){var e;(e=console).log.apply(e,arguments)},warn:function(){for(var e,n=arguments.length,t=new Array(n),i=0;i<n;i++)t[i]=arguments[i];(e=console).warn.apply(e,["%cWarning:","display:inline-block;background-color:gold;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px",""].concat(t))}}},7028:(e,n,t)=>{t.r(n),t.d(n,{isFirstItemInSection:()=>r,isLastItemInSection:()=>a,section:()=>s,sectionHasShuffledItems:()=>u,sectionIndex:()=>c,sectionItemPosition:()=>l,sections:()=>f,totalItemsInSection:()=>p});var i=t(173),o=t(7518);function r(){return 1===l()}function a(){return l()===p()}function s(){if(i.hasSections()){for(var e=o.itemReference(),n=f(),t=-1,r=!1,a=0;a<n.length&&!r;a++){++t;for(var s=0;s<n[a].items.length;s++)if(e===n[a].items[s].reference){r=!0;break}}return f()[t]}return{}}function u(){var e;return Boolean(null===(e=s())||void 0===e||null===(e=e.config)||void 0===e||null===(e=e.configuration)||void 0===e?void 0:e.shuffle_items)}function c(){if(i.hasSections()){for(var e=o.itemReference(),n=n(),t=0,r=!1,a=0;a<n.length&&!r;a++){++t;for(var s=0;s<n[a].items.length;s++)if(e===n[a].items[s].reference){r=!0;break}}return t}return 0}function l(){var e=o.itemReference(),n=s(),t=0;if(!Object.keys(n).length)return null;for(var i=0;i<n.items.length&&(++t,e!==n.items[i].reference);i++);return t}function f(){return i.hasSections()?i.activity().sections:[]}function p(){var e;return(null===(e=s())||void 0===e||null===(e=e.items)||void 0===e?void 0:e.length)||null}},7518:(e,n,t)=>{t.r(n),t.d(n,{dynamic:()=>u,flag:()=>c,isDynamicItem:()=>l,isFirstItem:()=>f,isFlagged:()=>d,isItemFullyAttempted:()=>v,isLastItem:()=>p,isMaskingEnabled:()=>m,item:()=>g,itemAttemptStatus:()=>y,itemByResponseId:()=>b,itemElement:()=>h,itemPosition:()=>_,itemReference:()=>w,itemTags:()=>I});var i=t(4113),o=t(173),r=t(3963),a=t(7028);function s(e){return s="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},s(e)}function u(){var e=w();return i.assessApp().item(e).dynamic||{}}function c(){var e=w();i.assessApp().item(e).flag()}function l(){var e;return null===(e=g())||void 0===e?void 0:e.source.hasOwnProperty("data_table_seed")}function f(){return o.hasSections()?("object"===s(a.sections()[0].items[0])?a.sections()[0].items[0].reference:a.sections()[0].items[0])===g().reference:("object"===s(o.activity().items[0])?o.activity().items[0].reference:o.activity().items[0])===g().reference}function p(){return g().is_last_item}function d(){return g().user_flagged}function v(e){var n,t,o;if(n=e?i.appInstance().getItems()[e].questions:r.questions(),Array.isArray(n)&&n.length)for(var a=0;a<n.length;a++){var s=n[a];if(!(o=r.questionResponse(s.response_id)))return!1;if(s.hasOwnProperty("metadata")&&s.metadata.hasOwnProperty("valid_response_count")&&Array.isArray(o.value)){if(o.value.filter((function(e){return void 0===e})).length)return!1;if(o.value.filter((function(e){return null===e})).length)return!1}t=!0}else t=!0;return t}function m(){return Boolean(document.querySelector(".lrn-masking"))}function g(e){return e?i.appInstance().getItems()[e]:i.appInstance().getCurrentItem()}function y(){return i.appInstance().getCurrentItem().attempt_status}function b(e){var n,t=i.appInstance().getItems();for(var o in t)if(t[o].response_ids.includes(e)){n=t[o];break}return n}function h(){return document.querySelector("div[data-reference='".concat(w(),"']"))}function _(){return i.appInstance().assessApp().getItemPosition(w())+1}function w(){return i.appInstance().getCurrentItem().reference}function I(e){return i.appInstance().getTags()[e||w()]||[]}}},n={};function t(i){var o=n[i];if(void 0!==o)return o.exports;var r=n[i]={exports:{}};return e[i](r,r.exports,t),r.exports}t.d=(e,n)=>{for(var i in n)t.o(n,i)&&!t.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:n[i]})},t.o=(e,n)=>Object.prototype.hasOwnProperty.call(e,n),t.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};t.d(i,{LT:()=>g});var o=t(4113),r=t(173),a=t(3674),s=t(7518),u=t(77),c=t(3963),l=t(7028);function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function p(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);n&&(i=i.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,i)}return t}function d(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?p(Object(t),!0).forEach((function(n){v(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):p(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function v(e,n,t){return(n=function(e){var n=function(e){if("object"!=f(e)||!e)return e;var n=e[Symbol.toPrimitive];if(void 0!==n){var t=n.call(e,"string");if("object"!=f(t))return t;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e);return"symbol"==f(n)?n:n+""}(n))in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var m={utils:{logger:t(5059).A}},g=d(d(d(d(d(d(d(d({},o),s),r),u),c),l),a),m),y=i.LT;export{y as LT};