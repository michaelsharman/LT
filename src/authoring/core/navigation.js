import * as app from './app';

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
    app.appInstance().on('navigate', event => {
        window.location.hash = '#' + event.data.locationEncoded;
    });

    app.appInstance().navigate(window.location.hash.replace(/^#/, ''));

    window.onhashchange = () => {
        app.appInstance().navigate(window.location.hash.replace(/^#/, ''));
    };
}
