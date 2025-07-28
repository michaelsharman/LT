import { appInstance } from './app.js';

/**
 * Everything relating to navigating Author API.
 * @module Authoring/Navigation
 */

/**
 * Injects a route hash to the URI so SPAs can load to
 * a deep view from a full page refresh.
 * @since 2.0.0
 */
export function routingHash() {
    appInstance().on('navigate', event => {
        window.location.hash = '#' + event.data.locationEncoded;
    });

    appInstance().navigate(window.location.hash.replace(/^#/, ''));

    window.onhashchange = () => {
        appInstance().navigate(window.location.hash.replace(/^#/, ''));
    };
}
