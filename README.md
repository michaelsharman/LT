# LT - Learnosity Toolkit

This is a utility library of helper modules useful if you're developing with Learnosity APIs.

## Important

This package is unofficial and wasn't created by Learnosity.

No modules contained within:

-   ever have access to the consumer private key
-   track any usage or personal information

Everything is open source under the MIT license. Feel free to use/abuse/fork as you see fit.

## Installation

```
npm install @caspingus/lt
```

### Initialize

By default we use `LT` as a variable for the toolkit. If you want to change this, use named imports.

```
// Declare and set your variable with the Items API LearnosityItems.init() method
const itemsApp = LearnosityItems.init(signedConfigObject);

// Pass that app instance to the Toolkit constructor
import { LT } from '@caspingus/lt/src/js/index';
LT.init(itemsApp);

// Can be handy in the global scope for development
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
