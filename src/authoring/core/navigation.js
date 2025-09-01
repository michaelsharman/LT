import { authorApp } from './app.js';

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
    authorApp().on('navigate', event => {
        window.location.hash = '#' + event.data.locationEncoded;
    });

    authorApp().navigate(window.location.hash.replace(/^#/, ''));

    window.onhashchange = () => {
        authorApp().navigate(window.location.hash.replace(/^#/, ''));
    };
}
