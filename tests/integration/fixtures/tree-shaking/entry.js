/**
 * Tree-shaking test fixture entry point.
 * Imports core + 2 specific extensions (magnifier and contentTabs).
 * The build output should NOT contain code from any other extensions.
 */
import { LT } from '../../../../src/assessment/core.js';
import { magnifier } from '../../../../src/assessment/extensions/accessibility/ux/magnifier/index.js';
import { contentTabs } from '../../../../src/assessment/extensions/ui/contentTabs/index.js';

// Export to prevent dead code elimination
export { LT, magnifier, contentTabs };
