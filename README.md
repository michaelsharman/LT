# Learnosity Toolkit (LT)

This is a utility library of helper modules and extensions that may be useful if you're developing with Learnosity APIs.

Modules and extensions are separated between Assessment (when using Items API) and Authoring (when using Author API).

See [documentation here](https://michaelsharman.github.io/LT/).

## Important

This package is unofficial and wasn't created by Learnosity.

No code contained within:

- ever have access to the consumer private key (i.e. `consumer_secret`)
- tracks any usage or personal information

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

The `bundle` module contains everything in `core` along with _all_ extensions except themes. This is the largest file size (around 280kB for assessment and 1330kB for authoring). This is useful in development if you want to browse the extensions, but also if you happen to use all the extensions in your project.

### How extensions are loaded

The `core` and `bundle` entry points handle extensions differently:

|                         | `core`                                                            | `bundle`                                                              |
| ----------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| **Import**              | `@caspingus/lt/assessment/core` or `@caspingus/lt/authoring/core` | `@caspingus/lt/assessment/bundle` or `@caspingus/lt/authoring/bundle` |
| **Extensions included** | None — you import only what you need                              | All extensions pre-loaded                                             |
| **Tree-shakeable**      | Yes                                                               | No                                                                    |
| **String identifiers**  | Deprecated (triggers a console warning)                           | Supported (resolved via the built-in registry)                        |
| **Recommended for**     | Production                                                        | Development / rapid prototyping                                       |

### Tree-shakeable extensions

When using `core`, import extension modules directly and pass them as objects. This gives your bundler full tree-shaking capability and avoids the deprecation warning.

**Assessment example:**

```javascript
import { LT } from '@caspingus/lt/assessment/core';
import { renderPDF } from '@caspingus/lt/assessment/extensions/renderPDF';
import { networkStatus } from '@caspingus/lt/assessment/extensions/networkStatus';

LT.init(itemsApp, {
    extensions: [renderPDF, { module: networkStatus, args: { pollingInterval: 5000 } }],
});
```

**Authoring example:**

```javascript
import { LT } from '@caspingus/lt/authoring/core';
import { contentTabs } from '@caspingus/lt/authoring/extensions/contentTabs';
import { imageUploader } from '@caspingus/lt/authoring/extensions/imageUploader';
import { createTags } from '@caspingus/lt/authoring/extensions/createTags';

LT.init(authorApp, {
    extensions: [{ module: contentTabs, args: { theme: 'rounded' } }, { module: imageUploader, args: { security, request } }, createTags],
});
```

Extensions without configuration are passed directly as the imported module. Extensions that require arguments use the `{ module, args }` descriptor format.

### Using bundle (string identifiers)

With `bundle`, you can pass extension names as strings or legacy `{ id, args }` objects. The bundle includes a full registry so it resolves them internally without any deprecation warning.

```javascript
import { LT } from '@caspingus/lt/assessment/bundle';

LT.init(itemsApp, {
    extensions: ['renderPDF', { id: 'networkStatus', args: { pollingInterval: 5000 } }],
});
```

> **Note:** Passing string identifiers to `core` still works (resolved via a dynamic fallback registry), but will log a deprecation warning in the console. Migrate to direct module imports for the best experience with `core`.

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
const unsubscribe = LT.eventBus.on('section:changed', data => {
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
