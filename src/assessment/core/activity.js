import { appInstance } from './app.js';
import { sections } from './sections.js';
import logger from '../../utils/logger.js';

/**
 * Everything relating to the activity currently
 * loaded by Items API.
 * @module Assessment/Activity
 */

const _state = {
    activity: null,
    maxTime: -1,
};

/**
 * The activity configuration object, including anything
 * overridden at runtime if using activity templates.
 * @since 0.1.0
 * @returns {object}
 */
export function activity() {
    if (_state.activity === null) {
        _state.activity = appInstance().getActivity();
    }
    return _state.activity;
}

/**
 * The activity id used for this activity instance
 * used to group related sessions.
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
 * The visible title from the configuration object.
 * @since 0.1.0
 * @returns {string}
 */
export function activityTitle() {
    return activity().config.title;
}

/**
 * The visible subtitle from the configuration object.
 * @since 0.1.0
 * @returns {string}
 */
export function activitySubTitle() {
    return activity().config.subtitle;
}

/**
 * All tags that have been set against items in the activity.
 * Requires `retrieve_tags` to be set to `true` in the
 * Items API configuration.
 * @since 2.9.0
 * @returns {array}
 */
export function activityTags() {
    return appInstance().getTags();
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
    return hasAnnotations() && activity()?.config?.annotations_api_init_options ? activity().config.annotations_api_init_options : {};
}

/**
 * The auto-save configuration object. Returns `true` or an
 * object based on what was in the configuration.
 * @since 0.1.0
 * @returns {boolean | object}
 */
export function autoSaveConfig() {
    const a = activity();
    return a?.config?.navigation?.auto_save ? a.config.navigation.auto_save : {};
}

/**
 * The current elapsed time for the session. Returns whether
 * the timer is visible or not.
 * @since 2.6.0
 * @returns {number}
 */
export function elapsedTime() {
    return appInstance().getTime();
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
    return Boolean(a?.config?.annotations === true || a?.config?.annotations_api_init_options);
}

/**
 * Whether this activity contains answer masking enabled.
 * @since 2.15.0
 * @returns {boolean}
 */
export function hasAnswerMasking() {
    return !!document.querySelector('.test-answer-masking');
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
 * Whether this activity contains the line reader at the player level.
 * @since 2.15.0
 * @returns {boolean}
 */
export function hasLineReader() {
    return !!document.querySelector('.lrn_linereader-toggle');
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
 * Whether the activity is rendered using the vertical layout.
 * In which case, things like `items.item()` are not available.
 * @since 3.0.0
 * @returns {boolean}
 */
export function isVerticalLayout() {
    const itemsRegion = activity().config?.regions?.items;

    if (itemsRegion) {
        return itemsRegion.some(obj => obj.type === 'vertical_element');
    }

    return false;
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
 * The maximum time allowed for this session. If `0`, it
 * means unlimited time.
 * @since 2.6.0
 * @returns {number}
 */
export function maxTime() {
    if (_state.maxTime === -1) {
        _state.maxTime = activity()?.config?.time?.max_time ?? 0;
    }
    return _state.maxTime;
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
 * The time remaining in the session. If `max_time` hasn't
 * been set, the session is unlimited, so this returns `null`.
 * @since 2.6.0
 * @returns {number|null}
 */
export function timeRemaining() {
    const max = maxTime();
    return max ? max - elapsedTime() : null;
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
        const allSections = sections();
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
