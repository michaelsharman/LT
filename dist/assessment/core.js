var t={7738:(t,e,n)=>{n.r(e),n.d(e,{activity:()=>r,activityId:()=>a,activitySubTitle:()=>f,activityTags:()=>p,activityTemplateId:()=>c,activityTitle:()=>u,adaptiveType:()=>l,annotationsConfig:()=>d,autoSaveConfig:()=>m,elapsedTime:()=>g,hasActivityTemplate:()=>v,hasAnnotations:()=>h,hasAutoSave:()=>y,hasEvents:()=>b,hasItemPool:()=>I,hasResourceItems:()=>A,hasSections:()=>w,hasShuffledItems:()=>_,hasTryAgain:()=>S,isAdaptive:()=>k,isResuming:()=>q,itemBank:()=>P,itemPool:()=>T,maxTime:()=>x,region:()=>O,resourceItems:()=>R,sessionId:()=>B,state:()=>E,timeRemaining:()=>C,totalItems:()=>F,userId:()=>W});var i=n(2844),o=n(8511),s=n(7484);function r(){return i.appInstance().getActivity()}function a(){return r().activity_id}function c(){return r().activity_template_id}function u(){return r().config.title}function f(){return r().config.subtitle}function p(){return i.appInstance().getTags()}function l(){return k()&&r().adaptive.hasOwnProperty("type")?r().adaptive.type:""}function d(){return h()&&r()?.config?.annotations_api_init_options?r().config.annotations_api_init_options:{}}function m(){const t=r();return t?.config?.navigation?.auto_save?t.config.navigation.auto_save:{}}function g(){return i.appInstance().getTime()}function v(){return r().hasOwnProperty("activity_template_id")}function h(){const t=r();return Boolean(!0===t?.config?.annotations||t?.config?.annotations_api_init_options)}function y(){const t=r();return t.hasOwnProperty("config")&&t.config.hasOwnProperty("navigation")&&t.config.navigation.hasOwnProperty("auto_save")&&!1!==t.config.navigation.auto_save}function _(){return Boolean(r()?.config?.configuration?.shuffle_items)}function b(){const t=r();return t.hasOwnProperty("events")&&!1!==t.events}function I(){return r().hasOwnProperty("item_pool_id")}function A(){return Boolean(r()?.config?.navigation?.resource_items)}function w(){return r().hasOwnProperty("sections")}function S(){return r()?.dynamic_items.hasOwnProperty("try_again")}function k(){return r().hasOwnProperty("adaptive")}function q(){return r().existing_session}function P(){return r()?.organisation_id}function T(){return r()?.item_pool_id}function x(){return r()?.config?.time?.max_time?r().config.time.max_time:0}function O(){return r()?.config?.regions}function R(){return r()?.config?.navigation?.resource_items}function B(){return r()?.session_id}function E(){let t;return t=void 0===r()?.state?"initial":r().state,t}function C(){return 0===x()?null:x()-g()}function F(){if(w()){let t=0,e=o.sections();for(let n=0;n<e.length;n++)t+=e[n].items.length;return t}return k()?r().hasOwnProperty("items")?r().items.length:(s.A.info("This is an adaptive session, no items array found"),0):r().items.length}function W(){return r()?.user_id}},2844:(t,e,n)=>{n.r(e),n.d(e,{annotationsApp:()=>c,appInstance:()=>a,assessApp:()=>u,eventsApp:()=>f,init:()=>r,questionsApp:()=>p});var i=n(1634),o=n(7066);const s={};function r(t){s.app=t,s.app.on("all",(t=>{(0,i.handleEvent)(t)})),s.app.on("item:load",(t=>{(0,o.questionResponseIds)().forEach((t=>{s.app.question(t).on("changed",(t=>{(0,i.handleEvent)("changed")}))}))}))}function a(){return s.app}function c(){return void 0!==a().annotationsApp()?a().annotationsApp():null}function u(){return a().assessApp()}function f(){return a().eventsApp()}function p(){return a().questionsApp()}},1634:(t,e,n)=>{n.r(e),n.d(e,{diagnostics:()=>c,filterEvent:()=>u,handleEvent:()=>f,listen:()=>p});var i=n(2844),o=n(7738),s=n(7484);const r="2.14.1",a={events:{broadcast:!1,listenFor:"item"}};function c(){let t=window.LearnosityApp?LearnosityApp.versions:{};return{apps:{annotations:{app:i.annotationsApp(),config:o.annotationsConfig(),enabled:o.hasAnnotations()},assess:{app:i.assessApp()},events:{app:i.eventsApp(),enabled:o.hasEvents()},items:{app:i.appInstance(),metadata:o.activity().config.metadata},questions:{app:i.questionsApp()}},activity:{activity:o.activityId(),activityTemplate:o.activityTemplateId(),autoSave:{config:o.autoSaveConfig(),enabled:o.hasAutoSave()},itemBank:o.itemBank(),itemPool:o.itemPool(),session:o.sessionId(),state:o.state(),type:o.activity().type,user:o.userId()},LT:{version:r},versions:t}}function u(t){/^[a-zA-Z:*]*$/.test(t)?a.events.listenFor=t:s.A.warn("Invalid event type")}function f(t){if(a.events.broadcast){const e=a.events.listenFor,n=e.replaceAll("*","");1===e.length&&"*"===e||"all"===e?s.A.info(t):e.startsWith("*")&&!e.endsWith("*")?t.endsWith(n)&&s.A.info(t):e.endsWith("*")&&!e.startsWith("*")?t.startsWith(n)&&s.A.info(t):e.startsWith("*")&&e.endsWith("*")?t.includes(n)&&s.A.info(t):t.startsWith(n)&&s.A.info(t)}}function p(t=!0){a.events.broadcast=Boolean(t),Boolean(t)?s.A.info(`👂 listening for '${a.events.listenFor}'`):s.A.info("🚫👂 not listening")}},3191:(t,e,n)=>{n.r(e),n.d(e,{dynamic:()=>a,flag:()=>c,isDynamicItem:()=>u,isFirstItem:()=>f,isFlagged:()=>l,isItemFullyAttempted:()=>d,isLastItem:()=>p,isMaskingEnabled:()=>m,item:()=>g,itemAttemptStatus:()=>v,itemByResponseId:()=>h,itemElement:()=>y,itemPosition:()=>_,itemReference:()=>b,itemTags:()=>I});var i=n(2844),o=n(7738),s=n(7066),r=n(8511);function a(){const t=b();return i.assessApp().item(t).dynamic||{}}function c(){const t=b();i.assessApp().item(t).flag()}function u(){return g()?.source.hasOwnProperty("data_table_seed")}function f(){let t;return o.hasSections()?(t="object"==typeof r.sections()[0].items[0]?r.sections()[0].items[0].reference:r.sections()[0].items[0],t===g().reference):(t="object"==typeof o.activity().items[0]?o.activity().items[0].reference:o.activity().items[0],t===g().reference)}function p(){return g().is_last_item}function l(){return g().user_flagged}function d(t){let e,n,o;if(e=t?i.appInstance().getItems()[t].questions:s.questions(),Array.isArray(e)&&e.length)for(let t=0;t<e.length;t++){let i=e[t];if(o=s.questionResponse(i.response_id),!o)return!1;if(i.hasOwnProperty("metadata")&&i.metadata.hasOwnProperty("valid_response_count")&&Array.isArray(o.value)){if(o.value.filter((t=>void 0===t)).length)return!1;if(o.value.filter((t=>null===t)).length)return!1}n=!0}else n=!0;return n}function m(){return Boolean(document.querySelector(".lrn-masking"))}function g(t){return t?i.appInstance().getItems()[t]:i.appInstance().getCurrentItem()}function v(){return i.appInstance().getCurrentItem().attempt_status}function h(t){const e=i.appInstance().getItems();let n;for(const i in e)if(e[i].response_ids.includes(t)){n=e[i];break}return n}function y(){return document.querySelector(`div[data-reference='${b()}']`)}function _(){return i.appInstance().assessApp().getItemPosition(b())+1}function b(){return i.appInstance().getCurrentItem().reference}function I(t){return i.appInstance().getTags()[t||b()]||[]}},1570:(t,e,n)=>{n.r(e),n.d(e,{dialog:()=>r,hideDialog:()=>a,isResponsiveMode:()=>c,isReviewScreen:()=>u,navigate:()=>f,next:()=>p,previous:()=>l,review:()=>d,submit:()=>m});var i=n(2844),o=n(3191),s=n(7484);function r(t){i.assessApp().dialogs().custom.show(t)}function a(){i.assessApp().dialogs().custom.hide()}function c(){return Boolean(document.querySelector(".has-menu-region"))}function u(){let t=!1;setTimeout((()=>(null===document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden")&&(t=!0),t)),500)}function f(t){switch(t){case"previous":i.appInstance().items().previous();break;case"next":o.isLastItem()||i.appInstance().items().next();break;case"review":null===document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden")?i.appInstance().dialogs().reviewScreen.hide():i.appInstance().dialogs().reviewScreen.show();break;case"submit":let e={show_submit_confirmation:!0,show_submit_ui:!0,success:function(t){alert("Test saved!")},error:function(t){alert("Test submit failed...check browser log"),console.log("Submission failed: ",t)}};i.appInstance().submit(e);break;default:"number"==typeof Number(t)&&Number(t)>=0?i.appInstance().items().goto(Number(t)):s.A.warn(`Invalid target (${t})`)}}function p(){f("next")}function l(){f("previous")}function d(){f("review")}function m(){f("submit")}},7066:(t,e,n)=>{n.r(e),n.d(e,{hasCheckAnswer:()=>a,isAutoScorable:()=>c,question:()=>u,questionInstance:()=>f,questionResponse:()=>l,questionResponseIds:()=>d,questionScore:()=>m,questions:()=>p});var i=n(2844),o=n(3191),s=n(7738),r=n(7484);function a(t){if(!c(t))return!1;const e=(0,s.activity)()?.config?.questions_api_init_options?.attribute_overrides&&(0,s.activity)().config.questions_api_init_options.attribute_overrides.hasOwnProperty("instant_feedback")&&"boolean"==typeof(0,s.activity)().config.questions_api_init_options.attribute_overrides.instant_feedback,n=u(t);return e?(0,s.activity)().config.questions_api_init_options.attribute_overrides.instant_feedback:!(!n.hasOwnProperty("instant_feedback")||"boolean"!=typeof n.instant_feedback)&&n.instant_feedback}function c(t){return u(t),f(t).checkValidation().has_validation}function u(t){let e=t||d()[0];return e?i.appInstance().question(e).getQuestion():(r.A.error(`Question not found (index ${e})`),{})}function f(t){let e=t||d()[0];return e?i.appInstance().question(e):{}}function p(){return o.item().questions}function l(t){let e=t||d()[0];return e?function(t){return i.appInstance().question(t)?i.appInstance().question(t).getResponse():void r.A.error(`Response not found ${t}`)}(e):{}}function d(){return p().map((t=>t.response_id))}function m(t){let e=t||d()[0];return e&&i.appInstance().getScores()[e]||{}}},8511:(t,e,n)=>{n.r(e),n.d(e,{isFirstItemInSection:()=>s,isLastItemInSection:()=>r,section:()=>a,sectionHasShuffledItems:()=>c,sectionIndex:()=>u,sectionItemPosition:()=>f,sections:()=>p,totalItemsInSection:()=>l});var i=n(7738),o=n(3191);function s(){return 1===f()}function r(){return f()===l()}function a(){if(i.hasSections()){const t=o.itemReference(),e=p();let n=-1,i=!1;for(let o=0;o<e.length&&!i;o++){++n;for(let n=0;n<e[o].items.length;n++)if(t===e[o].items[n].reference){i=!0;break}}return p()[n]}return{}}function c(){return Boolean(a()?.config?.configuration?.shuffle_items)}function u(){if(i.hasSections()){const t=o.itemReference(),e=e();let n=0,i=!1;for(let o=0;o<e.length&&!i;o++){++n;for(let n=0;n<e[o].items.length;n++)if(t===e[o].items[n].reference){i=!0;break}}return n}return 0}function f(){const t=o.itemReference(),e=a();let n=0;if(!Object.keys(e).length)return null;for(let i=0;i<e.items.length&&(++n,t!==e.items[i].reference);i++);return n}function p(){return i.hasSections()?i.activity().sections:[]}function l(){return a()?.items?.length||null}},7484:(t,e,n)=>{n.d(e,{A:()=>i});const i={debug:function(t,e){"DEBUG"===e&&console.log(t)},error:function(t){console.error("%cError:%c "+t,"display:inline-block;background-color:#e0005a;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px","")},info:function(t){console.info("%cInfo:%c "+t,"display:inline-block;background-color:#46C0FF;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px","")},log:function(t){console.log(t)},warn:function(t,e="log"){console.warn("%cWarning:%c "+t,"display:inline-block;background-color:gold;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px","")}}}},e={};function n(i){var o=e[i];if(void 0!==o)return o.exports;var s=e[i]={exports:{}};return t[i](s,s.exports,n),s.exports}n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})};var i={};n.d(i,{LT:()=>a});var o=n(2844),s=n(7738),r=n(1634);const a={...o,...n(3191),...s,...n(1570),...n(7066),...n(8511),...r,utils:{logger:n(7484).A}};var c=i.LT;export{c as LT};