const g = {
  renderedCss: !1
};
function m() {
  g.renderedCss || y();
}
function h(a, o) {
  const e = q(), d = LRNCKEDITOR.currentInstance.getSelectedHtml().getHtml(), l = LRNCKEDITOR.currentInstance.getData(), i = b();
  document.querySelector(".learnosity-question-editor").insertAdjacentHTML("beforeend", i);
  const r = document.getElementById("lrn__ltd_language"), u = document.getElementById("lrn__ltd_notranslate");
  for (let t = 0; t < e.length; t++) {
    let n;
    t === 0 && (n = document.createElement("option"), n.value = "", n.text = "--", r.add(n)), n = document.createElement("option"), n.value = e[t].code, n.text = e[t].language, n.setAttribute("data-dir", e[t].direction), r.add(n);
  }
  const c = [];
  c.push(document.querySelector("#ltLanguageModal .lrn-qe-btn-default")), c.push(document.querySelector("#ltLanguageModal .lrn-qe-modal-btn-close"));
  for (let t = 0; t < c.length; t++)
    c[t].addEventListener("click", () => {
      o(d), document.getElementById("ltLanguageModal").remove();
    });
  document.querySelector("#ltLanguageModal .lrn-qe-btn-primary").addEventListener("click", () => {
    const t = v(d), n = {};
    document.getElementById("ltLanguageModal").remove(), r.selectedIndex > 0 && (n.direction = r.options[r.selectedIndex].getAttribute("data-dir"), n.code = r.options[r.selectedIndex].value), u.checked && (n.noTranslate = !0);
    const p = f(n, t, d, l);
    return o(p);
  });
}
function b() {
  return `
    <div class="lrn-qe lrn-qe-modal lt__languageModal" style="display: block;" id="ltLanguageModal">
        <div class="lrn-qe-ui">
            <div class="lrn-qe-modal-dialog">
                <div class="lrn-qe-modal-dialog-inner">
                    <div class="lrn-qe-modal-header">
                        <div class="lrn-qe-form-label lrn-qe-h4 lrn-qe-section-header">
                            <h4 class="lrn-qe-heading">Language support</h4>
                        </div>
                        <button type="button" class="lrn-qe-btn lrn-qe-modal-btn-close" aria-label="Close" tabindex="0">
                            <span class="lrn-qe-sr-only">Close</span>
                            <span aria-role="presentation" class="lrn-qe-i-cross"></span>
                        </button>
                    </div>
                    <div data-lrn-qe-selector="modal-outlet">
                        <div class="lrn-qe-modal-content" data-lrn-qe-modal-section="content">
                            <div class="lrn-qe-form-group-wrapper">
                                <div class="lrn-qe-form-group">
                                    <p><label class="lrn-qe-label lrn-qe-form-label" for="lrn__ltd_language">Choose language</label></p>
                                    <p>Specify the language for different parts of your content to enable accurate reading by screen
                                    readers and other accessibility tools.</p>
                                    <div class="lrn-qe-custom-select">
                                        <select name="lrn__ltd_language" id="lrn__ltd_language" class="lrn__combobox lrn-qe-select lrn-qe-form-control"></select>
                                    </div>
                                </div>
                                <div class="lrn-qe-form-group lrn-qe-padding-sm lt__border lrn-qe-margin-top-md">
                                    <p><input id="lrn__ltd_notranslate" type="checkbox" class="lrn-qe-input">
                                    <label class="lrn-qe-label lrn-qe-form-label lrn-qe-padding-left-xs" for="lrn__ltd_notranslate">Disable translation</label></p>
                                    <p>Adding this flag will turn off translation, preventing Google Translate and
                                    Author Aide from translating selected text.</p>
                                </div>
                            </div>
                            <p class="lrn-qe-padding-top-sm"><label class="lrn-qe-label lrn-qe-form-label">Removing these settings</label></p>
                            <ul>
                                <li>For words or sentences, highlight the text and use the clear formatting button in the toolbar.</li>
                                <li>For entire paragraph(s), right click anywhere in the text and choose "Remove Style" from the menu.</li>
                            </ul>
                        </div>
                        <div class="lrn-qe-modal-footer">
                            <ul class="lrn-qe-ul">
                                <li class="lrn-qe-li lrn-qe-modal-footer-item lrn-qe-float-left">
                                    <button type="button" class="lrn-qe-btn lrn-qe-btn-default"><span>Cancel</span></button>
                                </li>&nbsp;
                                <li class="lrn-qe-li lrn-qe-modal-footer-item">
                                    <button type="button" class="lrn-qe-btn lrn-qe-btn-primary" data-lrn-qe-modal-action="confirm"><span>Apply</span></button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
}
function f(a, o, e, d) {
  let l = "", i = "";
  if (a?.code && (l += ` lang="${a.code}" dir="${a.direction}"`), a?.noTranslate && (l += ' translate="no"'), o === "block")
    switch (s(e)) {
      // Selecting a single line strips the surrounding <p></p>.
      // We add an empty <p> so that we can add the correct
      // attributes to the <p> element.
      case 0:
        i = `<p${l}>${e}</p><p>&nbsp;</p>`;
        break;
      case 1:
        i = e.replace("<p", `<p${l}`);
        break;
      default:
        i = `<div${l}>${e}</div>`;
        break;
    }
  else
    d.replace(/&nbsp;/g, "").includes(`<p>${e.replace(/&nbsp;/g, "")}</p>`) ? i = `<div${l}><p>${e}</p></div>` : e.length && (i = `<span${l}>${e}</span>`);
  return i;
}
function q() {
  return [
    {
      language: "Afrikaans",
      code: "af",
      direction: "ltr"
    },
    {
      language: "Albanian",
      code: "sq",
      direction: "ltr"
    },
    {
      language: "Amharic",
      code: "am",
      direction: "ltr"
    },
    {
      language: "Arabic",
      code: "ar",
      direction: "rtl"
    },
    {
      language: "Armenian",
      code: "hy",
      direction: "ltr"
    },
    {
      language: "Azerbaijani",
      code: "az",
      direction: "ltr"
    },
    {
      language: "Basque",
      code: "eu",
      direction: "ltr"
    },
    {
      language: "Belarusian",
      code: "be",
      direction: "ltr"
    },
    {
      language: "Bengali",
      code: "bn",
      direction: "ltr"
    },
    {
      language: "Bosnian",
      code: "bs",
      direction: "ltr"
    },
    {
      language: "Bulgarian",
      code: "bg",
      direction: "ltr"
    },
    {
      language: "Catalan",
      code: "ca",
      direction: "ltr"
    },
    {
      language: "Cebuano",
      code: "ceb",
      direction: "ltr"
    },
    {
      language: "Chichewa",
      code: "ny",
      direction: "ltr"
    },
    {
      language: "Chinese (Simplified)",
      code: "zh-Hans",
      direction: "ltr"
    },
    {
      language: "Chinese (Traditional)",
      code: "zh-Hant",
      direction: "ltr"
    },
    {
      language: "Corsican",
      code: "co",
      direction: "ltr"
    },
    {
      language: "Haitian Creole",
      code: "ht",
      direction: "ltr"
    },
    {
      language: "Croatian",
      code: "hr",
      direction: "ltr"
    },
    {
      language: "Czech",
      code: "cs",
      direction: "ltr"
    },
    {
      language: "Danish",
      code: "da",
      direction: "ltr"
    },
    {
      language: "Dutch",
      code: "nl",
      direction: "ltr"
    },
    {
      language: "English",
      code: "en",
      direction: "ltr"
    },
    {
      language: "Esperanto",
      code: "eo",
      direction: "ltr"
    },
    {
      language: "Estonian",
      code: "et",
      direction: "ltr"
    },
    {
      language: "Finnish",
      code: "fi",
      direction: "ltr"
    },
    {
      language: "French",
      code: "fr",
      direction: "ltr"
    },
    {
      language: "Frisian",
      code: "fy",
      direction: "ltr"
    },
    {
      language: "Galician",
      code: "gl",
      direction: "ltr"
    },
    {
      language: "Georgian",
      code: "ka",
      direction: "ltr"
    },
    {
      language: "German",
      code: "de",
      direction: "ltr"
    },
    {
      language: "Greek",
      code: "el",
      direction: "ltr"
    },
    {
      language: "Gujarati",
      code: "gu",
      direction: "ltr"
    },
    {
      language: "Hausa",
      code: "ha",
      direction: "ltr"
    },
    {
      language: "Hawaiian",
      code: "haw",
      direction: "ltr"
    },
    {
      language: "Hebrew",
      code: "he",
      direction: "rtl"
    },
    {
      language: "Hindi",
      code: "hi",
      direction: "ltr"
    },
    {
      language: "Hmong",
      code: "hmn",
      direction: "ltr"
    },
    {
      language: "Hungarian",
      code: "hu",
      direction: "ltr"
    },
    {
      language: "Icelandic",
      code: "is",
      direction: "ltr"
    },
    {
      language: "Igbo",
      code: "ig",
      direction: "ltr"
    },
    {
      language: "Indonesian",
      code: "id",
      direction: "ltr"
    },
    {
      language: "Irish",
      code: "ga",
      direction: "ltr"
    },
    {
      language: "Italian",
      code: "it",
      direction: "ltr"
    },
    {
      language: "Japanese",
      code: "ja",
      direction: "ltr"
    },
    {
      language: "Javanese",
      code: "jv",
      direction: "ltr"
    },
    {
      language: "Kannada",
      code: "kn",
      direction: "ltr"
    },
    {
      language: "Kazakh",
      code: "kk",
      direction: "ltr"
    },
    {
      language: "Khmer",
      code: "km",
      direction: "ltr"
    },
    {
      language: "Kinyarwanda",
      code: "rw",
      direction: "ltr"
    },
    {
      language: "Korean",
      code: "ko",
      direction: "ltr"
    },
    {
      language: "Kurdish (Kurmanji)",
      code: "ku",
      direction: "ltr"
    },
    {
      language: "Kyrgyz",
      code: "ky",
      direction: "ltr"
    },
    {
      language: "Lao",
      code: "lo",
      direction: "ltr"
    },
    {
      language: "Latin",
      code: "la",
      direction: "ltr"
    },
    {
      language: "Latvian",
      code: "lv",
      direction: "ltr"
    },
    {
      language: "Lithuanian",
      code: "lt",
      direction: "ltr"
    },
    {
      language: "Luxembourgish",
      code: "lb",
      direction: "ltr"
    },
    {
      language: "Macedonian",
      code: "mk",
      direction: "ltr"
    },
    {
      language: "Malagasy",
      code: "mg",
      direction: "ltr"
    },
    {
      language: "Malay",
      code: "ms",
      direction: "ltr"
    },
    {
      language: "Malayalam",
      code: "ml",
      direction: "ltr"
    },
    {
      language: "Maltese",
      code: "mt",
      direction: "ltr"
    },
    {
      language: "Maori",
      code: "mi",
      direction: "ltr"
    },
    {
      language: "Marathi",
      code: "mr",
      direction: "ltr"
    },
    {
      language: "Mongolian",
      code: "mn",
      direction: "ltr"
    },
    {
      language: "Myanmar (Burmese)",
      code: "my",
      direction: "ltr"
    },
    {
      language: "Nepali",
      code: "ne",
      direction: "ltr"
    },
    {
      language: "Norwegian",
      code: "no",
      direction: "ltr"
    },
    {
      language: "Odia",
      code: "or",
      direction: "ltr"
    },
    {
      language: "Pashto",
      code: "ps",
      direction: "rtl"
    },
    {
      language: "Persian",
      code: "fa",
      direction: "rtl"
    },
    {
      language: "Polish",
      code: "pl",
      direction: "ltr"
    },
    {
      language: "Portuguese",
      code: "pt",
      direction: "ltr"
    },
    {
      language: "Punjabi",
      code: "pa",
      direction: "ltr"
    },
    {
      language: "Romanian",
      code: "ro",
      direction: "ltr"
    },
    {
      language: "Russian",
      code: "ru",
      direction: "ltr"
    },
    {
      language: "Samoan",
      code: "sm",
      direction: "ltr"
    },
    {
      language: "Scots Gaelic",
      code: "gd",
      direction: "ltr"
    },
    {
      language: "Serbian Cyrilic",
      code: "sr-Cyrl",
      direction: "ltr"
    },
    {
      language: "Sesotho",
      code: "st",
      direction: "ltr"
    },
    {
      language: "Shona",
      code: "sn",
      direction: "ltr"
    },
    {
      language: "Sindhi",
      code: "sd",
      direction: "rtl"
    },
    {
      language: "Sinhala",
      code: "si",
      direction: "ltr"
    },
    {
      language: "Slovak",
      code: "sk",
      direction: "ltr"
    },
    {
      language: "Slovenian",
      code: "sl",
      direction: "ltr"
    },
    {
      language: "Somali",
      code: "so",
      direction: "ltr"
    },
    {
      language: "Spanish",
      code: "es",
      direction: "ltr"
    },
    {
      language: "Sundanese",
      code: "su",
      direction: "ltr"
    },
    {
      language: "Swahili",
      code: "sw",
      direction: "ltr"
    },
    {
      language: "Swedish",
      code: "sv",
      direction: "ltr"
    },
    {
      language: "Filipino (Tagalog)",
      code: "tl",
      direction: "ltr"
    },
    {
      language: "Tajik",
      code: "tg",
      direction: "ltr"
    },
    {
      language: "Tamil",
      code: "ta",
      direction: "ltr"
    },
    {
      language: "Tatar",
      code: "tt",
      direction: "ltr"
    },
    {
      language: "Telugu",
      code: "te",
      direction: "ltr"
    },
    {
      language: "Thai",
      code: "th",
      direction: "ltr"
    },
    {
      language: "Turkish",
      code: "tr",
      direction: "ltr"
    },
    {
      language: "Turkmen",
      code: "tk",
      direction: "ltr"
    },
    {
      language: "Ukrainian",
      code: "uk",
      direction: "ltr"
    },
    {
      language: "Urdu",
      code: "ur",
      direction: "rtl"
    },
    {
      language: "Uyghur",
      code: "ug",
      direction: "rtl"
    },
    {
      language: "Uzbek",
      code: "uz",
      direction: "ltr"
    },
    {
      language: "Vietnamese",
      code: "vi",
      direction: "ltr"
    },
    {
      language: "Welsh",
      code: "cy",
      direction: "ltr"
    },
    {
      language: "Xhosa",
      code: "xh",
      direction: "ltr"
    },
    {
      language: "Yiddish",
      code: "yi",
      direction: "rtl"
    },
    {
      language: "Yoruba",
      code: "yo",
      direction: "ltr"
    },
    {
      language: "Zulu",
      code: "zu",
      direction: "ltr"
    }
  ];
}
function s(a) {
  const o = /<p>.*?<\/p>/gs, e = a.match(o);
  return e ? e.length : 0;
}
function v(a) {
  return s(a) <= 1 ? "inline" : "block";
}
function y() {
  const a = document.createElement("style"), o = `
/* Learnosity language and no translation styles */
/* Used to see elements inside the rich-text editor that have language or translate styles applied */
.lrn.lrn-author .lt__languageModal {
    h4 {
        font-size: 1.43em;
    }

    label {
        font-weight: bold;
    }

    input[type="checkbox"] {
        height: 16px;
        width: 16px;
        vertical-align: text-bottom;
        margin: 0;
    }

    .lt__border {
        border: 1px solid #eaeaea;
    }
}

.lrn-qe-form-group-wrapper {
    .lrn-qe-form-control-ckeditor *[translate],
    .lrn-qe-form-control-ckeditor *[lang] {
        border: 2px dashed #696969;
        padding: 5px;
        position: relative;
    }

    .lrn-qe .lrn-qe-ui div[translate],
    .lrn-qe .lrn-qe-ui div[lang] {
        margin-bottom: 1em;

        p:last-child {
            margin-bottom: 0;
        }
    }

    .lrn-qe-form-control-ckeditor *[translate]::after,
    .lrn-qe-form-control-ckeditor *[lang]::after {
        content: "No translate";
        position: absolute;
        left: 100px;
        top: 0;
        transform: translateX(-50%);
        background-color: #333;
        color: #fff;
        padding: 5px;
        border-radius: 4px;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: opacity 0.3s;
        z-index: 10000000;
    }

    .lrn-qe-form-control-ckeditor *[lang]::after {
        content: "Language";
    }

    .lrn-qe-form-control-ckeditor *[translate][lang]::after {
        content: "No translate and Language";
    }

    /* Show tooltip on hover */
    .lrn-qe-form-control-ckeditor *[translate]:hover::after,
    .lrn-qe-form-control-ckeditor *[lang]:hover::after {
        opacity: 1;
        visibility: visible;
    }

    /* Force the icon to be the right size */
    .lrn-qe-ckeditor-toolbar .cke_button__addlanguageattribute .cke_button__addlanguageattribute_icon {
        background-position: -3px !important;
        background-size: 22px !important;
    }

    /* Size the "content" textarea and make is resizable */
    .lrn-qe .lrn-qe-modal-content .lrn-qe-form-group-wrapper textarea#lrn__ltd_content {
        resize: vertical;
        min-height: 4em;
    }
}
`;
  a.setAttribute("data-style", "LT Language Text Direction"), a.textContent = o, document.head.append(a), g.renderedCss = !0;
}
const _ = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  addLanguageAttribute: h,
  run: m
}, Symbol.toStringTag, { value: "Module" }));
export {
  h as a,
  _ as l,
  m as r
};
