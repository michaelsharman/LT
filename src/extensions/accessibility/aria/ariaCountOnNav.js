import * as app from '../../../app';
import * as activity from '../../../assessment/activity';

/**
 * Listens for the item load event and appends
 * ` of {totalItems}` to the aria-label for the
 * previous and next buttons.
 * @module Ext/a11y/ariaCountOnNav
 */

/**
 * Executes on item load to add custom label.
 * @since 0.3.0
 */
export function run() {
    app.appInstance().on('item:load', () => {
        let numItems = activity.totalItems();
        let elPrevious = Array.from(document.getElementsByClassName('item-prev'));
        let elNext = Array.from(document.getElementsByClassName('item-next'));
        let elNav = elPrevious.concat(elNext);

        for (let i = 0; i < elNav.length; i++) {
            let attr = elNav[i].getAttribute('aria-label');
            elNav[i].setAttribute('aria-live', attr + ' of ' + numItems);
        }
    });
}
