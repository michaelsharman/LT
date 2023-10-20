import * as app from '../../../app';
import * as questions from '../../../assessment/questions';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Adds a UI border in between the left and right columns (for
 * items with 2 columns) providing the ability for the end user
 * to resize the layout by dragging the element left or right.
 * <p><img src="https://raw.githubusercontent.com/michaelsharman/LT/main/src/assets/images/resize.gif" alt="" width="900"></p>
 * @module _Extensions/horizontalQuestionRender
 */

const state = {
    resize: {
        triggered: false,
    },
};

/**
 * Sets up an item load listener to add a UI element allowing
 * users to drag to resize the column divider.
 * @example
 * import { LT } from '@caspingus/lt/src/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.columnResizer.run();
 * @since 0.7.0
 */
export function run() {
    injectCSS();
    app.appInstance().on('item:load', () => {
        setup();
    });
}

function setup() {
    let qs = questions.questions();

    for (let q of qs) {
        let elQuestion = document.getElementById(q.response_id);
        elQuestion.classList.add('lrn-horizontal-question');
    }
}

/**
 * Injects the necessary CSS to the header
 * @since 0.7.0
 * @ignore
 */
function injectCSS() {
    const elStyle = document.createElement('style');
    const css = `
/* Learnosity horizontal question render styles */
.lrn-horizontal-question {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    justify-content: center;
}
.lrn-horizontal-question.lrn_widget.lrn_mcq .lrn_mcqgroup.lrn_mcqgroup-horizontal .lrn-mcq-option,
.lrn-horizontal-question.lrn_widget.lrn_mcq .lrn_mcqgroup.lrn_mcqgroup-vertical .lrn-mcq-option {
    display: block;
}
`;

    elStyle.textContent = css;
    document.head.append(elStyle);
}
