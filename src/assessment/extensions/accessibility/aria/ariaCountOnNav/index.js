import { createExtension, LT } from '../../../../../utils/extensionsFactory.js';

/**
 * Appends ` of {totalItems}` to the aria-label for the previous and next buttons.
 *
 * Does not work for adaptive sessions (including branching) or sections.
 *
 * @example
 * LT.init(itemsApp, {
 *     extensions: ['ariaCountOnNav'],
 * });
 *
 * @module Extensions/Assessment/ariaCountOnNav
 */

const state = {
    initialised: false,
    totalItems: 0,
};

/**
 * Executes on item load to add custom label.
 * @since 0.3.0
 * @ignore
 */
function run() {
    if (state.initialised) {
        return;
    }

    state.initialised = true;
    state.totalItems = Number(LT.totalItems()) || 0;

    LT.eventBus.on('item:load', () => {
        const elPrevious = Array.from(document.getElementsByClassName('item-prev'));
        const elNext = Array.from(document.getElementsByClassName('item-next'));
        const elNav = elPrevious.concat(elNext);

        for (let i = 0; i < elNav.length; i++) {
            const attr = elNav[i].getAttribute('aria-label');
            elNav[i].setAttribute('aria-live', attr + ' of ' + state.totalItems);
        }
    }, 'ariaCountOnNav');
}

export const ariaCountOnNav = createExtension('ariaCountOnNav', run);
