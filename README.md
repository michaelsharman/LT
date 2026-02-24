# Learnosity Toolkit (LT)

This is a utility library of helper modules and extensions that may be useful if you're developing with Learnosity APIs.

Modules and extensions are separated between Assessment (when using Items API) and Authoring (when using Author API).

See [documentation here](https://michaelsharman.github.io/LT/).

## Important

This package is unofficial and wasn't created by Learnosity.

No code contained within:

-   ever have access to the consumer private key (i.e. `consumer_secret`)
-   tracks any usage or personal information

Everything is open source under the MIT license. Feel free to use as you see fit.

## Installation

The easiest way to get running is to install via npm:

```
npm install @caspingus/lt
```

You could alternatively checkout directly from Github on the `main` branch, which may be slightly ahead of npm.

## Usage

Depending on which API you are working with, you will be importing either the assessment or authoring modules into your project. You can import `core` or `bundle` from both areas.

## core vs bundle

**Recommendation** - use `core` in all production settings for greater control on file size.

The `core` module contains the LT toolkit only, no extensions. This is the smallest file size (around 23kB for assessment and 11kB for authoring) and may be all you need.

If you want 1 or 2 extensions, you should import them individually to keep the overall file size down.

```
import { LT } from '@caspingus/lt/assessment/core';

LT.init(itemsApp, {
    extensions: [
        'blockGrammarChecks',
        'columnResizer',
        'disableOnValidate',
    ],
});
```

The `bundle` module contains everything in `core` along with _all_ extensions except themes. This is the largest file size (around 280kB for assessment and 1330kB for authoring) This is useful in development if you want to browse the extensions, but also if you happen to use all the extensions in your project.

```
import { LT } from '@caspingus/lt/assessment/bundle';
```

## Initialize

Everything is written using ES6 modules. By default we use `LT` as a variable for
the toolkit. If you want to change this, use named imports.

`LT` expects to be given the API application instance in the `readyListener`, either Items API
or Author API. From there you can call any method you want off the `LT` object.

## Items API

```
// Declare and set your variable with the Items API LearnosityItems.init() method
const itemsApp = LearnosityItems.init(signedConfigObject);

// The rest of your API set-up code

// Pass that app instance to the Toolkit constructor
import { LT } from '@caspingus/lt/assessment/core';

LT.init(itemsApp, {
    extensions: ['renderPDF'],
});

// Optionally add to the global scope (handy for development)
window.LT = LT;
```

## Usage examples

```
import { LT } from '@caspingus/lt/assessment/core';

// See if the item was _fully_ attempted
LT.isItemFullyAttempted();

// See if we're on the last item in a section
LT.isLastItemInSection();

// See the question response object
LT.questionResponse();
```

## Event Bus

LT includes an event bus that solves race condition issues where extensions might miss early events from the Learnosity API (such as `item:load` or `test:start` that fire before extensions are ready).

### How it works

When you call `LT.init()`, Learnosity API events are automatically routed through `LT.eventBus`. Critical events that fire before extensions are ready are buffered and automatically replayed when extensions subscribe.

### Usage

Extensions should listen to events via `LT.eventBus.on()`:

```javascript
// Listen to item:load - will receive buffered event if it already fired
LT.eventBus.on('item:load', () => {
    console.log('Item loaded');
});

// The on() method returns an unsubscribe function
const unsubscribe = LT.eventBus.on('section:changed', (data) => {
    console.log('Section changed', data);
});

// Later, to stop listening
unsubscribe();
```

### Buffered Events

The following critical events are buffered for replay: `item:load`, `item:changed`, `test:start`, `test:reading:start`.

### Routed Events

These events are routed through the event bus: `item:load`, `item:changed`, `test:start`, `test:reading:start`, `test:reading:end`, `unfocused`, `focused`, `item:warningOnChange`, `items:fetch:done`, `section:changed`, `test:panel:show`, `test:panel:shown`, `test:pause`, `test:resume`, `test:save`, `test:save:success`, `test:save:error`, `test:submit`, `test:submit:success`, `test:submit:error`, `test:finished:save`, `test:finished:submit`, `test:finished:discard`, `time:end`, `item:beforeunload`.

## Author API

```
// Declare and set your variable with the Author API LearnosityItems.init() method
const authorApp = LearnosityAuthor.init(signedConfigObject);

// The rest of your API set-up code

// Pass that app instance to the Toolkit constructor
import { LT } from '@caspingus/lt/authoring/core';
LT.init(authorApp);

// Optionally add to the global scope (for development)
window.LT = LT;
```

## Usage examples

```
import { LT } from '@caspingus/lt/authoring/core';

// Injects a route hash to the URI so SPAs can load to a deep view from a full page refresh.
LT.routingHash();
```

# CDN

If you don't have a build system, or want to get up and running quickly, you can import LT via a CDN.

You will still need to have a module to initialize, eg:

```
<script src="./src/my-module.js" type="module"></script>
<script src="https://items.learnosity.com"></script>
<script>
const initializationObject = mySignedRequest;
const callbacks = {
    readyListener: init,
    errorListener: error
};

function init() {
    // widow.launch() is an example method that is inside my-module.js
    window.launch(itemsApp);
}

function error(err) {
    console.error(err);
}

const itemsApp = LearnosityItems.init(initializationObject, callbacks);
</script>

// my-module.js
import { LT } from 'https://cdn.jsdelivr.net/npm/@caspingus/lt/dist/assessment/bundle.js';

window.launch = function (app) {
    LT.init(app, {
        extensions: ['toggleTimer']
    });
    window.LT = LT;
};
```
