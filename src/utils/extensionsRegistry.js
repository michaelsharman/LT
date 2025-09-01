const assessment = {
    ariaCountOnNav: () => import('../assessment/extensions/accessibility/aria/ariaCountOnNav/index.js'),
    blockGrammarChecks: () => import('../assessment/extensions/validation/blockGrammarChecks/index.js'),
    blueLightFilter: () => import('../assessment/extensions/accessibility/ux/blueLightFilter/index.js'),
    checkAnswerValidation: () => import('../assessment/extensions/validation/checkAnswerValidation/index.js'),
    columnResizer: () => import('../assessment/extensions/accessibility/ux/columnResizer/index.js'),
    contentTabs: () => import('../assessment/extensions/ui/contentTabs/index.js'),
    disableOnValidate: () => import('../assessment/extensions/validation/disableOnValidate/index.js'),
    events: () => import('../assessment/extensions/events/index.js'),
    hideAlternatives: () => import('../assessment/extensions/accessibility/ux/hideAlternatives/index.js'),
    keyboardShortcuts: () => import('../assessment/extensions/accessibility/ux/keyboardShortcuts/index.js'),
    magnifier: () => import('../assessment/extensions/accessibility/ux/magnifier/index.js'),
    mcqLabelPrefix: () => import('../assessment/extensions/accessibility/ux/mcqLabelPrefix/index.js'),
    networkStatus: () => import('../assessment/extensions/ui/networkStatus/index.js'),
    periodicTable: () => import('../assessment/extensions/ui/resources/periodicTable/index.js'),
    readingMask: () => import('../assessment/extensions/accessibility/ux/readingMask/index.js'),
    renderPDF: () => import('../assessment/extensions/ui/renderPDF/index.js'),
    resetResponse: () => import('../assessment/extensions/accessibility/ux/resetResponse/index.js'),
    toggleTimer: () => import('../assessment/extensions/accessibility/ux/toggleTimer/index.js'),
    whiteNoise: () => import('../assessment/extensions/accessibility/ux/whiteNoise/index.js'),
};

const authoring = {
    contentTabs: () => import('../authoring/extensions/ui/contentTabs/index.js'),
    createTags: () => import('../authoring/extensions/ui/createTags/index.js'),
    dynamicContent: () => import('../authoring/extensions/ui/dynamicContent/index.js'),
    essayMaxLength: () => import('../authoring/extensions/validation/essayMaxLength/index.js'),
    imageUploader: () => import('../authoring/extensions/ui/imageUploader/index.js'),
    languageTextDirection: () => import('../authoring/extensions/ui/languageTextDirection/index.js'),
    nativeTabs: () => import('../authoring/extensions/ui/nativeTabs/index.js'),
    renderPDF: () => import('../authoring/extensions/ui/renderPDF/index.js'),
    requiredTags: () => import('../authoring/extensions/validation/requiredTags/index.js'),
    singleQuestion: () => import('../authoring/extensions/validation/singleQuestion/index.js'),
};

export const EXTENSIONS = { assessment, authoring };
