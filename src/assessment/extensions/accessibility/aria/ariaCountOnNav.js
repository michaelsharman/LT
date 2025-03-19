import * as app from '../../../core/app';
import * as activity from '../../../core/activity';

/**
 * Extensions add specific functionality to Items API.
 * They rely on modules within LT being available.
 *
 * --
 *
 * Listens for the item load event and appends
 * ` of {totalItems}` to the aria-label for the
 * previous and next buttons.
 * @module Extensions/Assessment/ariaCountOnNav
 */

/**
 * Executes on item load to add custom label.
 * @example
 * import { LT } from '@caspingus/lt/src/assessment/index';
 *
 * LT.init(itemsApp); // Set up LT with the Items API application instance variable
 * LT.extensions.ariaCountOnNav.run();
 * @since 0.3.0
 */
export function run() {
    app.appInstance().on('item:load', () => {
        const numItems = activity.totalItems();
        const elPrevious = Array.from(document.getElementsByClassName('item-prev'));
        const elNext = Array.from(document.getElementsByClassName('item-next'));
        const elNav = elPrevious.concat(elNext);

        for (let i = 0; i < elNav.length; i++) {
            const attr = elNav[i].getAttribute('aria-label');
            elNav[i].setAttribute('aria-live', attr + ' of ' + numItems);
        }
    });
}
