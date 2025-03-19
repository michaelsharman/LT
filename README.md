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

From either the assessment or authoring folders, you can import `src/core` or `src/index` into your project.

### core vs index

**Recommendation** - use `core` in all production settings.

The `core` module contains the LT toolkit only, no extensions. This is the smallest file size (around 12kB for assessment and 5kB for authoring) and may be all you need.

If you want 1 or 2 extensions, you can import them manually to keep the overall file size down.

```
import { LT } from '@caspingus/lt/src/assessment/core';
import * as columnResizer from '@caspingus/lt/src/assessment/extensions/accessibility/ux/columnResizer';
```

The `index` module contains everything in `core` along with _all_ extensions except themes. This is the largest file size (around 520kB for assessment and 740kB for authoring) This is useful in development if you want to browse the extensions, but also if you happen to use all the extensions in your project.

```
import { LT } from '@caspingus/lt/src/assessment/index';
```

^^ Importing `index` puts all extensions in `LT.extensions`.

### src vs dist

**Recommendation** - use `src` and have your local build process bundle LT along with your application.

As this library will be imported into existing projects, it's recommended to use the `src` folder and include LT as a part of your build process.

In which case, import from the `src` folder and you're good to go. Another option is to import from `dist` which has been prod bundled by Webpack, but then you need to exclude this from your build process.

## Initialize

Everything is written using ES6 modules. By default we use `LT` as a variable for
the toolkit. If you want to change this, use named imports.

`LT` expects to be given the application instance in the `readyListener`, either Items API
or Author API. From there you can call any method you want off the `LT` object.

## Items API

```
// Declare and set your variable with the Items API LearnosityItems.init() method
const itemsApp = LearnosityItems.init(signedConfigObject);


// Pass that app instance to the Toolkit constructor
import { LT } from '@caspingus/lt/src/assessment/core';
import * as renderPDF from '@caspingus/lt/src/assessment/extensions/ui/renderPDF/index';

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
import { LT } from '@caspingus/lt/src/assessment/core';

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


// Pass that app instance to the Toolkit constructor
import { LT } from '@caspingus/lt/src/authoring/core';
LT.init(authorApp);


// Optionally add to the global scope (for development)
window.LT = LT;
```

## Usage examples

```
import { LT } from '@caspingus/lt/src/authoring/core';

// Injects a route hash to the URI so SPAs can load to a deep view from a full page refresh.
LT.routingHash();
```

# Building

You should import from `@caspingus/lt/src/*` and let your build tool handle minifying and tree shaking etc.

Right now, the Authoring extension ssmlEditor requires that css be imported. Here is an example webpack.config:

```
{
    module: {
        rules: [
            {
                test: /\.((c|s[ac])ss)$/i,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
};
```
