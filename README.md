# LT - Learnosity Toolkit

This is a utility library of helper modules useful if you're developing with Learnosity APIs.

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

`LT` expects to be given the Items API application instance in the `readyListener`.
From there you can call any method you want off the `LT` object.

```
// Declare and set your variable with the Items API LearnosityItems.init() method
const itemsApp = LearnosityItems.init(signedConfigObject);


// Pass that app instance to the Toolkit constructor
import { LT } from '@caspingus/lt/src/js/index';
LT.init(itemsApp);


// Optionally call any extensions you might want
LT.extensions.keyboardShortcuts.run();


// Optionally add to the global scope (for development)
window.LT = LT;
```

## Usage examples

```
import { LT } from '@caspingus/lt/src/js/index';

// See if the item was _fully_ attempted
LT.isItemFullyAttempted();

// See if we're on the last item in a section
LT.isLastItemInSection();

// See the question response object
LT.questionResponse();
```
