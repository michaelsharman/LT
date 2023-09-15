import * as activity from './activity';
import * as items from './items';

/**
 * Everything relating to any sections defined
 * in the activity.
 * @module Sections
 */

/**
 * Whether the current item is the first in this section.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isFirstItemInSection() {
    return sectionItemPosition() === 1;
}

/**
 * Whether the current item is the last in this section.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isLastItemInSection() {
    return sectionItemPosition() === totalItemsInSection();
}

/**
 * The current section of the activity.
 * Returns {} if sections aren't being used.
 * @since 0.1.0
 * @returns {object}
 */
export function section() {
    if (activity.hasSections()) {
        const currentRef = items.itemReference();
        const allSections = sections();
        let section = -1;
        let found = false;
        for (let s = 0; s < allSections.length; s++) {
            if (found) {
                break;
            }
            ++section;
            for (let i = 0; i < allSections[s].items.length; i++) {
                if (currentRef === allSections[s].items[i].reference) {
                    found = true;
                    break;
                }
            }
        }
        return sections()[section];
    } else {
        return {};
    }
}

/**
 * Whether items have been shuffled within this section.
 * @since 0.1.0
 * @returns {boolean}
 */
export function sectionHasShuffledItems() {
    return Boolean(section()?.config?.configuration?.shuffle_items);
}

/**
 * The index of the current section, 1-based.
 * Returns 0 if sections aren't being used.
 * @since 0.1.0
 * @returns {number}
 */
export function sectionIndex() {
    if (activity.hasSections()) {
        const currentRef = items.itemReference();
        const sections = sections();
        let section = 0;
        let found = false;
        for (let s = 0; s < sections.length; s++) {
            if (found) {
                break;
            }
            ++section;
            for (let i = 0; i < sections[s].items.length; i++) {
                if (currentRef === sections[s].items[i].reference) {
                    found = true;
                    break;
                }
            }
        }
        return section;
    } else {
        return 0;
    }
}

/**
 * The item position in the current section.
 * @since 0.1.0
 * @returns {number}
 */
export function sectionItemPosition() {
    const currentRef = items.itemReference();
    const section = section();
    let itemPos = 0;
    for (let i = 0; i < section.items.length; i++) {
        ++itemPos;
        if (currentRef === section.items[i].reference) {
            break;
        }
    }
    return itemPos;
}

/**
 * An array of section objects.
 * Returns [] if sections aren't being used.
 * @since 0.1.0
 * @returns {array}
 */
export function sections() {
    if (activity.hasSections()) {
        return activity.activity().sections;
    } else {
        return [];
    }
}

/**
 * The total number of items in the current section.
 * @since 0.1.0
 * @returns {number}
 */
export function totalItemsInSection() {
    return section().items.length;
}
