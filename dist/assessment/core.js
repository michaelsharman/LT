var e={7738:(e,t,n)=>{n.r(t),n.d(t,{activity:()=>r,activityId:()=>a,activitySubTitle:()=>p,activityTags:()=>f,activityTemplateId:()=>c,activityTitle:()=>u,adaptiveType:()=>l,annotationsConfig:()=>d,autoSaveConfig:()=>m,elapsedTime:()=>g,hasActivityTemplate:()=>v,hasAnnotations:()=>h,hasAutoSave:()=>y,hasEvents:()=>b,hasItemPool:()=>A,hasResourceItems:()=>_,hasSections:()=>w,hasShuffledItems:()=>I,hasTryAgain:()=>S,isAdaptive:()=>P,isResuming:()=>T,itemBank:()=>x,itemPool:()=>q,maxTime:()=>k,region:()=>O,resourceItems:()=>R,sessionId:()=>B,state:()=>E,timeRemaining:()=>C,totalItems:()=>F,userId:()=>W});var i=n(2844),o=n(8511),s=n(7484);function r(){return i.appInstance().getActivity()}function a(){return r().activity_id}function c(){return r().activity_template_id}function u(){return r().config.title}function p(){return r().config.subtitle}function f(){return i.appInstance().getTags()}function l(){return P()&&r().adaptive.hasOwnProperty("type")?r().adaptive.type:""}function d(){return h()&&r()?.config?.annotations_api_init_options?r().config.annotations_api_init_options:{}}function m(){const e=r();return e?.config?.navigation?.auto_save?e.config.navigation.auto_save:{}}function g(){return i.appInstance().getTime()}function v(){return r().hasOwnProperty("activity_template_id")}function h(){const e=r();return Boolean(!0===e?.config?.annotations||e?.config?.annotations_api_init_options)}function y(){const e=r();return e.hasOwnProperty("config")&&e.config.hasOwnProperty("navigation")&&e.config.navigation.hasOwnProperty("auto_save")&&!1!==e.config.navigation.auto_save}function I(){return Boolean(r()?.config?.configuration?.shuffle_items)}function b(){const e=r();return e.hasOwnProperty("events")&&!1!==e.events}function A(){return r().hasOwnProperty("item_pool_id")}function _(){return Boolean(r()?.config?.navigation?.resource_items)}function w(){return r().hasOwnProperty("sections")}function S(){return r()?.dynamic_items.hasOwnProperty("try_again")}function P(){return r().hasOwnProperty("adaptive")}function T(){return r().existing_session}function x(){return r()?.organisation_id}function q(){return r()?.item_pool_id}function k(){return r()?.config?.time?.max_time?r().config.time.max_time:0}function O(){return r()?.config?.regions}function R(){return r()?.config?.navigation?.resource_items}function B(){return r()?.session_id}function E(){let e;return e=void 0===r()?.state?"initial":r().state,e}function C(){return 0===k()?null:k()-g()}function F(){if(w()){let e=0,t=o.sections();for(let n=0;n<t.length;n++)e+=t[n].items.length;return e}return P()?r().hasOwnProperty("items")?r().items.length:(s.A.info("This is an adaptive session, no items array found"),0):r().items.length}function W(){return r()?.user_id}},2844:(e,t,n)=>{n.r(t),n.d(t,{annotationsApp:()=>c,appInstance:()=>a,assessApp:()=>u,eventsApp:()=>p,init:()=>r,questionsApp:()=>f});var i=n(1634),o=n(7066);const s={};function r(e){s.app=e,s.app.on("all",(e=>{(0,i.handleEvent)(e)})),s.app.on("item:load",(e=>{(0,o.questionResponseIds)().forEach((e=>{s.app.question(e).on("changed",(e=>{(0,i.handleEvent)("changed")}))}))}))}function a(){return s.app}function c(){return void 0!==a().annotationsApp()?a().annotationsApp():null}function u(){return a().assessApp()}function p(){return a().eventsApp()}function f(){return a().questionsApp()}},1634:(e,t,n)=>{n.r(t),n.d(t,{diagnostics:()=>c,filterEvent:()=>u,handleEvent:()=>p,listen:()=>f});var i=n(2844),o=n(7738),s=n(7484);const r="2.9.0",a={events:{broadcast:!1,listenFor:"item"}};function c(){let e=window.LearnosityApp?LearnosityApp.versions:{};return{apps:{annotations:{app:i.annotationsApp(),config:o.annotationsConfig(),enabled:o.hasAnnotations()},assess:{app:i.assessApp()},events:{app:i.eventsApp(),enabled:o.hasEvents()},items:{app:i.appInstance(),metadata:o.activity().config.metadata},questions:{app:i.questionsApp()}},activity:{activity:o.activityId(),activityTemplate:o.activityTemplateId(),autoSave:{config:o.autoSaveConfig(),enabled:o.hasAutoSave()},itemBank:o.itemBank(),itemPool:o.itemPool(),session:o.sessionId(),state:o.state(),type:o.activity().type,user:o.userId()},LT:{version:r},versions:e}}function u(e){/^[a-zA-Z:*]*$/.test(e)?a.events.listenFor=e:s.A.warn("Invalid event type")}function p(e){if(a.events.broadcast){const t=a.events.listenFor,n=t.replaceAll("*","");1===t.length&&"*"===t||"all"===t?s.A.info(e):t.startsWith("*")&&!t.endsWith("*")?e.endsWith(n)&&s.A.info(e):t.endsWith("*")&&!t.startsWith("*")?e.startsWith(n)&&s.A.info(e):t.startsWith("*")&&t.endsWith("*")?e.includes(n)&&s.A.info(e):e.startsWith(n)&&s.A.info(e)}}function f(e=!0){a.events.broadcast=Boolean(e),Boolean(e)?s.A.info(`👂 listening for '${a.events.listenFor}'`):s.A.info("🚫👂 not listening")}},3191:(e,t,n)=>{n.r(t),n.d(t,{dynamic:()=>a,flag:()=>c,isDynamicItem:()=>u,isFirstItem:()=>p,isFlagged:()=>l,isItemFullyAttempted:()=>d,isLastItem:()=>f,isMaskingEnabled:()=>m,item:()=>g,itemAttemptStatus:()=>v,itemByResponseId:()=>h,itemElement:()=>y,itemPosition:()=>I,itemReference:()=>b,itemTags:()=>A});var i=n(2844),o=n(7738),s=n(7066),r=n(8511);function a(){const e=b();return i.assessApp().item(e).dynamic||{}}function c(){const e=b();i.assessApp().item(e).flag()}function u(){return g()?.source.hasOwnProperty("data_table_seed")}function p(){let e;return o.hasSections()?(e="object"==typeof r.sections()[0].items[0]?r.sections()[0].items[0].reference:r.sections()[0].items[0],e===g().reference):(e="object"==typeof o.activity().items[0]?o.activity().items[0].reference:o.activity().items[0],e===g().reference)}function f(){return g().is_last_item}function l(){return g().user_flagged}function d(e){let t,n,o;if(t=e?i.appInstance().getItems()[e].questions:s.questions(),Array.isArray(t)&&t.length)for(let e=0;e<t.length;e++){let i=t[e];if(o=s.questionResponse(i.response_id),!o)return!1;if(i.hasOwnProperty("metadata")&&i.metadata.hasOwnProperty("valid_response_count")&&Array.isArray(o.value)){if(o.value.filter((e=>void 0===e)).length)return!1;if(o.value.filter((e=>null===e)).length)return!1}n=!0}else n=!0;return n}function m(){return Boolean(document.querySelector(".lrn-masking"))}function g(e){return e?i.appInstance().getItems()[e]:i.appInstance().getCurrentItem()}function v(){return i.appInstance().getCurrentItem().attempt_status}function h(e){const t=i.appInstance().getItems();let n;for(const i in t)if(t[i].response_ids.includes(e)){n=t[i];break}return n}function y(){return document.querySelector(`div[data-reference='${b()}']`)}function I(){return i.appInstance().assessApp().getItemPosition(b())+1}function b(){return i.appInstance().getCurrentItem().reference}function A(e){return i.appInstance().getTags()[e||b()]||[]}},1570:(e,t,n)=>{n.r(t),n.d(t,{dialog:()=>r,hideDialog:()=>a,isResponsiveMode:()=>c,isReviewScreen:()=>u,navigate:()=>p,next:()=>f,previous:()=>l,review:()=>d,submit:()=>m});var i=n(2844),o=n(3191),s=n(7484);function r(e){i.assessApp().dialogs().custom.show(e)}function a(){i.assessApp().dialogs().custom.hide()}function c(){return Boolean(document.querySelector(".has-menu-region"))}function u(){let e=!1;setTimeout((()=>(null===document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden")&&(e=!0),e)),500)}function p(e){switch(e){case"previous":i.appInstance().items().previous();break;case"next":o.isLastItem()||i.appInstance().items().next();break;case"review":null===document.getElementsByClassName("review-screen")[0].getAttribute("aria-hidden")?i.appInstance().dialogs().reviewScreen.hide():i.appInstance().dialogs().reviewScreen.show();break;case"submit":let t={show_submit_confirmation:!0,show_submit_ui:!0,success:function(e){alert("Test saved!")},error:function(e){alert("Test submit failed...check browser log"),console.log("Submission failed: ",e)}};i.appInstance().submit(t);break;default:"number"==typeof Number(e)&&Number(e)>=0?i.appInstance().items().goto(Number(e)):s.A.warn(`Invalid target (${e})`)}}function f(){p("next")}function l(){p("previous")}function d(){p("review")}function m(){p("submit")}},7066:(e,t,n)=>{n.r(t),n.d(t,{question:()=>r,questionInstance:()=>a,questionResponse:()=>u,questionResponseIds:()=>p,questionScore:()=>f,questions:()=>c});var i=n(2844),o=n(3191),s=n(7484);function r(e){let t=e||p()[0];return t?i.appInstance().question(t).getQuestion():(s.A.error(`Question not found (index ${t})`),{})}function a(e){let t=e||p()[0];return t?i.appInstance().question(t):{}}function c(){return o.item().questions}function u(e){let t=e||p()[0];return t?function(e){return i.appInstance().question(e)?i.appInstance().question(e).getResponse():void s.A.error(`Response not found ${e}`)}(t):{}}function p(){return c().map((e=>e.response_id))}function f(e){let t=e||p()[0];return t&&i.appInstance().getScores()[t]||{}}},8511:(e,t,n)=>{n.r(t),n.d(t,{isFirstItemInSection:()=>s,isLastItemInSection:()=>r,section:()=>a,sectionHasShuffledItems:()=>c,sectionIndex:()=>u,sectionItemPosition:()=>p,sections:()=>f,totalItemsInSection:()=>l});var i=n(7738),o=n(3191);function s(){return 1===p()}function r(){return p()===l()}function a(){if(i.hasSections()){const e=o.itemReference(),t=f();let n=-1,i=!1;for(let o=0;o<t.length&&!i;o++){++n;for(let n=0;n<t[o].items.length;n++)if(e===t[o].items[n].reference){i=!0;break}}return f()[n]}return{}}function c(){return Boolean(a()?.config?.configuration?.shuffle_items)}function u(){if(i.hasSections()){const e=o.itemReference(),t=t();let n=0,i=!1;for(let o=0;o<t.length&&!i;o++){++n;for(let n=0;n<t[o].items.length;n++)if(e===t[o].items[n].reference){i=!0;break}}return n}return 0}function p(){const e=o.itemReference(),t=a();let n=0;if(!Object.keys(t).length)return null;for(let i=0;i<t.items.length&&(++n,e!==t.items[i].reference);i++);return n}function f(){return i.hasSections()?i.activity().sections:[]}function l(){return a()?.items?.length||null}},7484:(e,t,n)=>{n.d(t,{A:()=>i});const i={error:function(e){console.error("%cError:%c "+e,"display:inline-block;background-color:#e0005a;color:#fff;font-weight:bold;padding:3px 7px;border-radius:3px","")},info:function(e){console.info("%cInfo:%c "+e,"display:inline-block;background-color:#46C0FF;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px","")},log:function(e){console.log(e)},warn:function(e,t="log"){console.warn("%cWarning:%c "+e,"display:inline-block;background-color:gold;color:#000;font-weight:bold;padding:3px 7px;border-radius:3px","")}}}},t={};function n(i){var o=t[i];if(void 0!==o)return o.exports;var s=t[i]={exports:{}};return e[i](s,s.exports,n),s.exports}n.d=(e,t)=>{for(var i in t)n.o(t,i)&&!n.o(e,i)&&Object.defineProperty(e,i,{enumerable:!0,get:t[i]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var i={};(()=>{n.d(i,{LT:()=>s});var e=n(2844),t=n(7738),o=n(1634);const s={...e,...n(3191),...t,...n(1570),...n(7066),...n(8511),...o,utils:{logger:n(7484).A}}})();var o=i.LT;export{o as LT};