const puppeteer = require('puppeteer');
const server = require('./api-server/src/server');

describe('LT Core', () => {
    let browser;
    let page;

    beforeAll(async () => {
        server.startServer();

        browser = await puppeteer.launch();
        page = await browser.newPage();

        await page.goto('http://localhost:5150/itemsapi');
        await page.waitForSelector('.has-loaded', { timeout: 6000 });
    });

    afterAll(async () => {
        await browser.close();
        server.stopServer();
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
