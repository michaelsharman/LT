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
 *
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
 *
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
 *
 * Returns `null` if the activity isn't using sections.
 * @since 0.1.0
 * @returns {number|null}
 */
export function sectionItemPosition() {
    const currentRef = items.itemReference();
    const currentSection = section();
    let itemPos = 0;

    if (!Object.keys(currentSection).length) {
        return null;
    }

    for (let i = 0; i < currentSection.items.length; i++) {
        ++itemPos;
        if (currentRef === currentSection.items[i].reference) {
            break;
        }
    }
    return itemPos;
}

/**
 * An array of section objects.
 *
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
 *
 * Returns `null` if sections aren't being used.
 * @since 0.1.0
 * @returns {number|null}
 */
export function totalItemsInSection() {
    return section()?.items?.length || null;
}
