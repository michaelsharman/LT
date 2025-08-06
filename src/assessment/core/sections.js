import { activity, hasSections } from './activity.js';
import { itemReference } from './items.js';

/**
 * Everything relating to any sections defined
 * in the activity.
 * @module Assessment/Sections
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
    if (hasSections()) {
        const currentRef = itemReference();
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
    if (hasSections()) {
        const currentRef = itemReference();
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
 * Returns `-1` if the activity isn't using sections.
 * @since 0.1.0
 * @returns {number}
 */
export function sectionItemPosition() {
    const currentRef = itemReference();
    const currentSection = section();
    let itemPos = 0;

    if (!Object.keys(currentSection).length) {
        return -1;
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
    return activity()?.sections ?? [];
}

/**
 * The total number of items in the current section.
 *
 * Returns `-1` if sections aren't being used.
 * @since 0.1.0
 * @returns {number}
 */
export function totalItemsInSection() {
    return section()?.items?.length || -1;
}
