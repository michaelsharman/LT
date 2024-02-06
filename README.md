# LT - Learnosity Toolkit

This is a utility library of helper modules useful if you're developing with Learnosity APIs.

Modules are separated between Assessment (when using Items API) and Authoring (when using Author API).

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
import { LT } from '@caspingus/lt/src/assessment/index';
LT.init(itemsApp);


// Optionally call any extensions you might want
LT.extensions.keyboardShortcuts.run();


// Optionally add to the global scope (for development)
window.LT = LT;
```

## Usage examples

```
import { LT } from '@caspingus/lt/src/assessment/index';

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
import { LT } from '@caspingus/lt/src/authoring/index';
LT.init(authorApp);


// Optionally add to the global scope (for development)
window.LT = LT;
```

## Usage examples

```
import { LT } from '@caspingus/lt/src/authoring/index';

// Injects a route hash to the URI so SPAs can load to a deep view from a full page refresh.
LT.routingHash();
```
