# LT - Learnosity Toolkit

This is a utility library of helper modules and extensions that may be useful if you're developing with Learnosity APIs.

Modules and extensions are separated between Assessment (when using Items API) and Authoring (when using Author API).

See [documentation here](https://michaelsharman.github.io/LT/).

## Important

This package is unofficial and wasn't created by Learnosity.

No modules contained within:

-   ever have access to the consumer private key
-   track any usage or personal information

Everything is open source under the MIT license. Feel free to use as you see fit.

## Installation

```
npm install @caspingus/lt
```

## Usage

Depending on where you are, import either the assessment or authoring into your project. You can import `core` or `bundle` from both areas.

## core vs bundle

**Recommendation** - use `core` in all production settings for greater control on file size.

The `core` module contains the LT toolkit only, no extensions. This is the smallest file size (around 16kB for assessment and 3kB for authoring) and may be all you need.

If you want 1 or 2 extensions, you should import them individually to keep the overall file size down.

```
import { LT } from '@caspingus/lt/assessment/core';
import { columnResizer } from '@caspingus/lt/assessment/extensions/columnResizer';
```

The `bundle` module contains everything in `core` along with _all_ extensions except themes. This is the largest file size (around 240kB for assessment and 1400kB for authoring) This is useful in development if you want to browse the extensions, but also if you happen to use all the extensions in your project.

```
import { LT } from '@caspingus/lt/assessment/bundle';
```

^^ Importing `bundle` puts all extensions in `LT.extensions`.

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
import { renderPDF } from '@caspingus/lt/assessment/extensions/renderPDF';

LT.init(itemsApp);

// Optionally call any extensions you might want
renderPDF.run();

// Put individual extensions in the LT object if that makes your life easier
LT.extensions = {
    renderPDF,
};
LT.extensions.renderPDF.run();

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
    LT.init(app);
    window.LT = LT;

    LT.extensions.toggleTimer.run();
};
```
