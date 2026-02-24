process.on('unhandledRejection', (reason, promise) => {
    console.error('== Unhandled Rejection:', reason);
});

process.on('uncaughtException', err => {
    console.error('== Uncaught Exception:', err);
});

import puppeteer from 'puppeteer';
import { startServer, stopServer } from './api-server/src/server.js';

let browser;
let page;

beforeAll(async () => {
    await startServer();

    // browser = await puppeteer.launch({
    //     headless: false, // show the browser window
    //     devtools: true, // auto-open the devtools
    //     slowMo: 500, // slow down operations by 500ms (optional)
    //     defaultViewport: null, // use the full available screen
    //     args: [
    //         '--start-maximized', // open maximized
    //     ],
    // });

    browser = await puppeteer.launch();
    page = await browser.newPage();

    // Log all console messages from the test page
    page.on('console', consoleMsg => {
        if (!consoleMsg.text().includes('Learnosity developer version')) {
            console.log(`== From test page console: ${consoleMsg.text()}`);
        }
    });
    page.on('requestfailed', request => {
        console.log(`${request.url()} failed to load. Reason: ${request.failure().errorText}`);
    });
    page.on('pageerror', error => {
        console.log(`Page error: ${error}`);
    });
    page.on('response', response => {
        if (!response.ok()) {
            console.log(`HTTP error: ${response.status()} on ${response.url()}`);
        }
    });

    console.time('page-load-complete');
    await page.goto('http://localhost:5150/itemsapi');
    console.timeEnd('page-load-complete');

    console.time('selector-lookup');
    await page.waitForSelector('.has-loaded', { timeout: 10000 });
    console.timeEnd('selector-lookup');
}, 30_000);

afterAll(async () => {
    await browser.close();
    stopServer();
});

describe('LT - Assessment Core', () => {
    describe('Return data types', () => {
        describe.each([
            ['activity', 'object'],
            ['activityId', 'string'],
            ['activitySubTitle', 'string|null'],
            ['activityTags', 'object'],
            ['activityTemplateId', 'string|null'],
            ['activityTitle', 'string|null'],
            ['adaptiveType', 'string|null'],
            ['annotationsApp', 'object'],
            ['annotationsConfig', 'object'],
            ['itemsApp', 'object'],
            ['assessApp', 'object'],
            ['autoSaveConfig', 'object'],
            ['diagnostics', 'object'],
            ['dynamic'],
            ['elapsedTime', 'number'],
            ['eventsApp', 'object'],
            ['hasActivityTemplate', 'boolean'],
            ['hasAnnotations', 'boolean'],
            ['hasAnswerMasking', 'boolean'],
            ['hasAutoSave', 'boolean'],
            ['hasCheckAnswer', 'boolean'],
            ['hasEvents', 'boolean'],
            ['hasItemPool', 'boolean'],
            ['hasLineReader', 'boolean'],
            ['hasResourceItems', 'boolean'],
            ['hasSections', 'boolean'],
            ['hasShuffledItems', 'boolean'],
            ['hasTryAgain', 'boolean'],
            ['isAdaptive', 'boolean'],
            ['isAutoScorable', 'boolean'],
            ['isDynamicItem', 'boolean'],
            ['isFirstItem', 'boolean'],
            ['isFirstItemInSection', 'boolean'],
            ['isFlagged', 'boolean'],
            ['isItemFullyAttempted', 'boolean'],
            ['isLastItem', 'boolean'],
            ['isLastItemInSection', 'boolean'],
            ['isMaskingEnabled', 'boolean'],
            ['isResponsiveMode', 'boolean'],
            ['isResuming', 'boolean'],
            ['isReviewScreen', 'boolean'],
            ['isVerticalLayout', 'boolean'],
            ['item', 'object'],
            ['itemAttemptStatus', 'string'],
            ['itemBank', 'number'],
            // ['itemByResponseId', 'object'],
            ['itemElement', 'object'],
            ['itemPool', 'string|null'],
            ['itemPosition', 'number'],
            ['itemReference', 'string'],
            ['itemTags'],
            ['maxTime', 'number'],
            ['question', 'object'],
            // ['questionInstance', 'object'],
            ['questionResponse', 'object'],
            ['questionResponseIds', 'object'],
            ['questionScore', 'object'],
            ['questions', 'object'],
            ['questionsApp', 'object'],
            ['region', 'string'],
            ['resourceItems', 'object'],
            ['section', 'object'],
            ['sectionHasShuffledItems', 'boolean'],
            ['sectionIndex', 'number'],
            ['sectionItemPosition', 'number'],
            ['sections', 'object'],
            ['sessionId', 'string'],
            ['state', 'string'],
            ['timeRemaining'],
            ['totalItems', 'number'],
            ['totalItemsInSection', 'number'],
            ['userId', 'string'],
        ])('%s()', (methodKey, expectedType = 'object') => {
            test(`returns a ${expectedType}`, async () => {
                const val = await page.evaluate(m => window.LT[m](), methodKey);
                // console.log(`→ window.LT.${methodKey}() returned:`, val);

                // Handle nullable types (e.g., 'string|null')
                if (expectedType.includes('|null')) {
                    const baseType = expectedType.split('|')[0];
                    expect(val === null || typeof val === baseType).toBe(true);
                } else {
                    expect(typeof val).toBe(expectedType);
                }
            });
        });
    });

    describe('Activity module', () => {
        describe('activity()', () => {
            test('is an object', async () => {
                const value = await page.evaluate(() => {
                    return window.LT.activity();
                });
                expect(value).toEqual(expect.any(Object));
            });

            test('has the correct activity_id', async () => {
                const value = await page.evaluate(() => {
                    return window.LT.activity().activity_id;
                });
                expect(value).toEqual('lt_integration_testing');
            });
        });
    });

    describe('Items module', () => {
        describe('isFirstItem()', () => {
            test('is a boolean', async () => {
                const value = await page.evaluate(() => {
                    return window.LT.isFirstItem();
                });
                expect(value).toEqual(expect.any(Boolean));
            });

            test('is true (when on first item)', async () => {
                const value = await page.evaluate(() => {
                    return window.LT.itemReference();
                });
                expect(value).toBeTruthy();
            });

            test('is false (when not on first item)', async () => {
                const value = await page.evaluate(() => {
                    return new Promise((resolve, reject) => {
                        itemsApp.on('item:changed', () => {
                            resolve(window.LT.isFirstItem());
                        });
                        window.LT.navigate(1);
                    });
                });
                expect(value).toBeFalsy();
            });
        });

        describe('isLastItem()', () => {
            test('is a boolean', async () => {
                const value = await page.evaluate(() => {
                    return window.LT.isLastItem();
                });
                expect(value).toEqual(expect.any(Boolean));
            });

            test('is false (when not on last item)', async () => {
                const value = await page.evaluate(() => {
                    return window.LT.isLastItem();
                });
                expect(value).toBeFalsy();
            });

            test('is true (when on last item)', async () => {
                const value = await page.evaluate(() => {
                    return new Promise((resolve, reject) => {
                        itemsApp.on('item:changed', () => {
                            resolve(window.LT.isLastItem());
                        });
                        window.LT.navigate(LT.totalItems() - 1);
                    });
                });
                expect(value).toBeTruthy();
            });
        });

        describe('itemReference()', () => {
            test('is a string', async () => {
                const value = await page.evaluate(() => {
                    return window.LT.itemReference();
                });
                expect(value).toEqual(expect.any(String));
            });

            test('matches an exact value', async () => {
                const value = await page.evaluate(() => {
                    return new Promise((resolve, reject) => {
                        itemsApp.on('item:changed', () => {
                            resolve(window.LT.itemReference());
                        });
                        window.LT.navigate(0);
                    });
                });
                expect(value).toBe('itembranching-demo-open1');
            });
        });

        describe('itemPosition()', () => {
            test('is a number', async () => {
                const value = await page.evaluate(() => {
                    return window.LT.itemPosition();
                });
                expect(value).toEqual(expect.any(Number));
            });

            test('matches an exact value of 1', async () => {
                const value = await page.evaluate(() => {
                    // We assume we're already on item 1 from the test above
                    return window.LT.itemPosition();
                });
                expect(value).toBe(1);
            });

            test('matches an exact value of 2', async () => {
                const value = await page.evaluate(() => {
                    return new Promise((resolve, reject) => {
                        itemsApp.on('item:changed', () => {
                            resolve(window.LT.itemPosition());
                        });
                        window.LT.navigate(1);
                    });
                });
                expect(value).toBe(2);
            });
        });

        describe('itemElement()', () => {
            test('is an element', async () => {
                const value = await page.evaluate(() => {
                    return window.LT.itemElement();
                });
                expect.stringContaining('<div');
            });
        });

        describe('dynamic()', () => {
            test('is an empty object', async () => {
                const value = await page.evaluate(() => {
                    return window.LT.dynamic();
                });
                expect(value).toEqual({});
            });

            // TODO: item with dynamic content
        });

        describe('flag()', () => {
            test('is a flagged item', async () => {
                const value = await page.evaluate(() => {
                    window.LT.flag();
                    return window.LT.item().user_flagged;
                });
                expect(value).toBeTruthy();
                expect(typeof value).toBe('boolean');
            });

            test('is not a flagged item', async () => {
                const value = await page.evaluate(() => {
                    window.LT.flag();
                    return window.LT.item().user_flagged;
                });
                expect(value).toBeFalsy();
            });
        });

        describe('isFlagged()', () => {
            test('is a flagged item', async () => {
                const value = await page.evaluate(() => {
                    return window.LT.isFlagged();
                });
                expect(value).toBeFalsy();
            });

            test('is not a flagged item', async () => {
                const value = await page.evaluate(() => {
                    window.LT.flag();
                    return window.LT.isFlagged();
                });
                expect(value).toBeTruthy();
            });
        });
    });
});
