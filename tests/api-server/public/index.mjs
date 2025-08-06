import { LT } from './dist/assessment/core.js';

window.launch = function (app) {
    LT.init(app);
    window.LT = LT;
};
