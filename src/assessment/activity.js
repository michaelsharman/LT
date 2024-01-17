import * as app from './app';
import * as sections from './sections';
import * as logger from '../utils/logger';

/**
 * Everything relating to the activity currently
 * loaded by Items API.
 * @module Activity
 */

/**
 * The activity configuration object, including anything
 * overridden at runtime if using activity templates.
 * @since 0.1.0
 * @returns {object}
 */
export function activity() {
    return app.appInstance().getActivity();
}

/**
 * The activity id used for this activity instance.
 * @since 0.1.0
 * @returns {string}
 */
export function activityId() {
    return activity().activity_id;
}

/**
 * The `activity_template_id` if templates are used.
 * Returns '' if templates aren't being used.
 * @since 0.1.0
 * @returns {string}
 */
export function activityTemplateId() {
    return activity().activity_template_id;
}

/**
 * The visible title from the configuration.
 * @since 0.1.0
 * @returns {string}
 */
export function activityTitle() {
    return activity().config.title;
}

/**
 * The visible subtitle from the configuration.
 * @since 0.1.0
 * @returns {string}
 */
export function activitySubTitle() {
    return activity().config.subtitle;
}

/**
 * The adaptive type as defined in the configuration.
 * Returns '' if the activity isn't adaptive.
 * @since 0.1.0
 * @returns {string}
 */
export function adaptiveType() {
    if (isAdaptive() && activity().adaptive.hasOwnProperty('type')) {
        return activity().adaptive.type;
    } else {
        return '';
    }
}

/**
 * The annotations configuration object.
 * @since 0.1.0
 * @returns {object}
 */
export function annotationsConfig() {
    return hasAnnotations() ? activity().config.annotations : {};
}

/**
 * The auto-save configuration object.
 * @since 0.1.0
 * @returns {object}
 */
export function autoSaveConfig() {
    const a = activity();
    const autoSave =
        a.hasOwnProperty('config') && a.config.hasOwnProperty('navigation') && a.config.navigation.hasOwnProperty('auto_save')
            ? a.config.navigation.auto_save
            : {};
    return autoSave;
}

/**
 * Whether this activity was loaded from an activity template.
 * @since 0.1.0
 * @returns {boolean}
 */
export function hasActivityTemplate() {
    return activity().hasOwnProperty('activity_template_id');
}

/**
 * Whether annotations have been configured with this activity.
 * @since 0.1.0
 * @returns {boolean}
 */
export function hasAnnotations() {
    const a = activity();
    return a.hasOwnProperty('config') && a.config.hasOwnProperty('annotations') && a.config.navigation.annotations !== false;
}

/**
 * Whether auto-save is configured with this activity.
 * @since 0.1.0
 * @returns {boolean}
 */
export function hasAutoSave() {
    const a = activity();
    return (
        a.hasOwnProperty('config') &&
        a.config.hasOwnProperty('navigation') &&
        a.config.navigation.hasOwnProperty('auto_save') &&
        a.config.navigation.auto_save !== false
    );
}

/**
 * Whether items have been shuffled within this activity.
 * @since 0.1.0
 * @returns {boolean}
 */
export function hasShuffledItems() {
    return Boolean(activity()?.config?.configuration?.shuffle_items);
}

/**
 * Whether events have been configured with this activity.
 * @since 0.1.0
 * @returns {boolean}
 */
export function hasEvents() {
    const a = activity();
    return a.hasOwnProperty('events') && a.events !== false;
}

/**
 * Whether an item pool has been configured with this activity.
 * @since 0.1.0
 * @returns {boolean}
 */
export function hasItemPool() {
    const a = activity();
    return a.hasOwnProperty('item_pool_id');
}

/**
 * Whether this activity contains resource item(s).
 * @since 0.1.0
 * @returns {boolean}
 */
export function hasResourceItems() {
    return Boolean(activity()?.config?.navigation?.resource_items);
}

/**
 * Whether this activity contains sections.
 * @since 0.1.0
 * @returns {boolean}
 */
export function hasSections() {
    return activity().hasOwnProperty('sections');
}

/**
 * Whether the activity has try again enabled.
 * @since 1.4.0
 * @returns {boolean}
 */
export function hasTryAgain() {
    return activity()?.dynamic_items.hasOwnProperty('try_again');
}

/**
 * Whether this activity is adaptive.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isAdaptive() {
    return activity().hasOwnProperty('adaptive');
}

/**
 * Whether the user is resuming the session.
 * @since 0.1.0
 * @returns {boolean}
 */
export function isResuming() {
    return activity().existing_session;
}

/**
 * The global `organisation_id` used for this activity instance.
 * @since 0.1.0
 * @returns {string}
 */
export function itemBank() {
    return activity()?.organisation_id;
}

/**
 * The `item_pool_id` used for this activity instance.
 * @since 0.1.0
 * @returns {string}
 */
export function itemPool() {
    return activity()?.item_pool_id;
}

/**
 * Which UI region the session was set up with. Values include:
 * - `main`
 * - `horizontal`
 * - `horizontal-fixed`
 *
 * `undefined` will mean that no `regions` key was found in the
 * Items API configuration, meaning the player defaults to the
 * legacy UI region (not recommended).
 * @since 1.1.0
 * @returns {string}
 */
export function region() {
    return activity()?.config?.regions;
}

/**
 * The resource item references used for this activity instance.
 * @since 0.1.0
 * @returns {array}
 */
export function resourceItems() {
    return activity()?.config?.navigation?.resource_items;
}

/**
 * The `session_id` used for this activity instance.
 * @since 0.1.0
 * @returns {string}
 */
export function sessionId() {
    return activity()?.session_id;
}

/**
 * The current `state` of this activity instance. Possible
 * values:
 *  - `initial`
 *  - `resume`
 *  - `review`
 *  - `preview`
 * @since 0.1.0
 * @returns {string}
 */
export function state() {
    let s;
    switch (activity()?.state) {
        case undefined:
            s = 'initial';
            break;
        default:
            s = activity().state;
            break;
    }
    return s;
}

/**
 * The total number of items in the activity, including
 * items within sections if relevant.
 * @since 0.1.0
 * @returns {number}
 */
export function totalItems() {
    if (hasSections()) {
        let numItems = 0;
        let allSections = sections.sections();
        for (let i = 0; i < allSections.length; i++) {
            numItems += allSections[i].items.length;
        }
        return numItems;
    } else if (isAdaptive()) {
        if (activity().hasOwnProperty('items')) {
            return activity().items.length;
        } else {
            logger.info('This is an adaptive session, no items array found');
            return 0;
        }
    } else {
        return activity().items.length;
    }
}

/**
 * The `user_id` as defined in the configuration.
 * @since 0.1.0
 * @returns {string}
 */
export function userId() {
    return activity()?.user_id;
}
