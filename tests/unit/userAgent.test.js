/**
 * Unit tests for src/utils/userAgent.js.
 *
 * parseUA() is pure. detectEnvSync() and detectEnv() read from
 * globalThis.navigator, so we stub navigator per-test rather than relying on
 * the happy-dom UA.
 */
import { describe, test, expect, beforeEach, afterEach } from 'vitest';
import { parseUA, detectEnvSync, detectEnv } from '../../src/utils/userAgent.js';

const UA = {
    chromeWin: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    chromeMac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    edgeWin: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 Edg/120.0.0.0',
    firefoxWin: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:120.0) Gecko/20100101 Firefox/120.0',
    safariMac: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Safari/605.1.15',
    samsungAndroid: 'Mozilla/5.0 (Linux; Android 13; SM-S901U) AppleWebKit/537.36 (KHTML, like Gecko) SamsungBrowser/24.0 Chrome/120.0.0.0 Mobile Safari/537.36',
    operaWin: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36 OPR/106.0.0.0',
    androidMobile: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Mobile Safari/537.36',
    iPadReal: 'Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    iPadMasquerade: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 Mobile/15E148 Safari/604.1',
    chromeOS: 'Mozilla/5.0 (X11; CrOS x86_64 14541.0.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    bot: 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
};

describe('parseUA() - browser', () => {
    test('detects Chrome with major version', () => {
        const r = parseUA(UA.chromeWin);
        expect(r.browser.name).toBe('Chrome');
        expect(r.browser.versionMajor).toBe('120');
    });

    test('Edge takes precedence over Chrome', () => {
        const r = parseUA(UA.edgeWin);
        expect(r.browser.name).toBe('Edge');
        expect(r.browser.versionMajor).toBe('120');
    });

    test('Opera takes precedence over Chrome', () => {
        const r = parseUA(UA.operaWin);
        expect(r.browser.name).toBe('Opera');
        expect(r.browser.versionMajor).toBe('106');
    });

    test('Samsung Internet takes precedence over Chrome', () => {
        const r = parseUA(UA.samsungAndroid);
        expect(r.browser.name).toBe('Samsung Internet');
        expect(r.browser.versionMajor).toBe('24');
    });

    test('detects Firefox', () => {
        const r = parseUA(UA.firefoxWin);
        expect(r.browser.name).toBe('Firefox');
        expect(r.browser.versionMajor).toBe('120');
    });

    test('detects Safari using Version/ token', () => {
        const r = parseUA(UA.safariMac);
        expect(r.browser.name).toBe('Safari');
        expect(r.browser.version).toBe('17.0');
        expect(r.browser.versionMajor).toBe('17');
    });

    test('returns empty browser object for a bot UA', () => {
        const r = parseUA(UA.bot);
        expect(r.browser).toEqual({});
    });

    test('returns default shape for empty UA', () => {
        const r = parseUA('');
        expect(r).toEqual({
            ua: '',
            browser: {},
            os: {},
            deviceType: 'desktop',
            engine: {},
            reducedUA: false,
        });
    });

    test('handles missing UA (undefined) without throwing', () => {
        const r = parseUA();
        expect(r.ua).toBe('');
        expect(r.browser).toEqual({});
    });
});

describe('parseUA() - OS', () => {
    test('Windows version is raw NT value', () => {
        const r = parseUA(UA.chromeWin);
        expect(r.os).toEqual({ name: 'Windows', version: '10.0' });
    });

    test('macOS version is normalized with dots', () => {
        const r = parseUA(UA.chromeMac);
        expect(r.os).toEqual({ name: 'macOS', version: '10.15.7' });
    });

    test('Android detected with version', () => {
        const r = parseUA(UA.androidMobile);
        expect(r.os).toEqual({ name: 'Android', version: '13' });
    });

    test('iPad real device is iOS', () => {
        const r = parseUA(UA.iPadReal);
        expect(r.os.name).toBe('iOS');
        expect(r.os.version).toBe('17.0');
    });

    test('iPadOS masquerading as macOS is reported as iOS (no version)', () => {
        const r = parseUA(UA.iPadMasquerade);
        expect(r.os.name).toBe('iOS');
        expect(r.os.version).toBeUndefined();
    });

    test('Chrome OS detected with version', () => {
        const r = parseUA(UA.chromeOS);
        expect(r.os).toEqual({ name: 'Chrome OS', version: '14541.0.0' });
    });
});

describe('parseUA() - deviceType', () => {
    test.each([
        ['Chrome on Windows is desktop', UA.chromeWin, 'desktop'],
        ['Chrome on Android is mobile', UA.androidMobile, 'mobile'],
        ['Samsung on Android is mobile', UA.samsungAndroid, 'mobile'],
        ['iPad is tablet', UA.iPadReal, 'tablet'],
        ['Googlebot is bot', UA.bot, 'bot'],
    ])('%s', (_label, ua, expected) => {
        expect(parseUA(ua).deviceType).toBe(expected);
    });
});

describe('parseUA() - engine', () => {
    test('Chromium UAs report WebKit (AppleWebKit wins)', () => {
        const r = parseUA(UA.chromeWin);
        expect(r.engine.name).toBe('WebKit');
        expect(r.engine.version).toBe('537.36');
    });

    test('Firefox reports Gecko', () => {
        const r = parseUA(UA.firefoxWin);
        expect(r.engine.name).toBe('Gecko');
        expect(r.engine.version).toBe('120.0');
    });

    test('bot UA reports no engine', () => {
        expect(parseUA(UA.bot).engine).toEqual({});
    });
});

describe('parseUA() - reducedUA flag', () => {
    test('true when Chrome major.0.0.0 pattern present', () => {
        expect(parseUA(UA.chromeWin).reducedUA).toBe(true);
    });

    test('true when Edge major.0.0.0 pattern present', () => {
        expect(parseUA(UA.edgeWin).reducedUA).toBe(true);
    });

    test('false for Firefox', () => {
        expect(parseUA(UA.firefoxWin).reducedUA).toBe(false);
    });
});

describe('detectEnvSync()', () => {
    const originalNavigator = globalThis.navigator;

    beforeEach(() => {
        // Stub navigator so results are deterministic regardless of happy-dom's UA.
        Object.defineProperty(globalThis, 'navigator', {
            value: { userAgent: UA.chromeWin },
            configurable: true,
            writable: true,
        });
    });

    afterEach(() => {
        Object.defineProperty(globalThis, 'navigator', {
            value: originalNavigator,
            configurable: true,
            writable: true,
        });
    });

    test('parses the current navigator.userAgent', () => {
        const env = detectEnvSync();
        expect(env.browser.name).toBe('Chrome');
        expect(env.os.name).toBe('Windows');
    });

    test('populates meta with source and isReducedUA', () => {
        const env = detectEnvSync();
        expect(env.meta.usedHighEntropy).toBe(false);
        expect(env.meta.source).toBe('ua');
        expect(env.meta.isReducedUA).toBe(true);
    });

    test('does not expose the internal reducedUA field', () => {
        const env = detectEnvSync();
        expect('reducedUA' in env).toBe(false);
    });
});


function setNavigator(value) {
    Object.defineProperty(globalThis, 'navigator', {
        value,
        configurable: true,
        writable: true,
    });
}

describe('detectEnvSync() - UA-CH brand refinement', () => {
    const originalNavigator = globalThis.navigator;

    afterEach(() => {
        setNavigator(originalNavigator);
    });

    test('refines browser.name from uaData.brands (highest major, ignoring Not.A.Brand)', () => {
        setNavigator({
            userAgent: UA.chromeWin,
            userAgentData: {
                brands: [
                    { brand: 'Not A Brand', version: '99' },
                    { brand: 'Chromium', version: '120' },
                    { brand: 'Google Chrome', version: '120' },
                ],
            },
        });

        const env = detectEnvSync();
        expect(['Chromium', 'Google Chrome']).toContain(env.browser.name);
        expect(env.meta.source).toBe('ua-ch-low');
    });

    test('leaves browser alone when brands array is empty', () => {
        setNavigator({ userAgent: UA.chromeWin, userAgentData: { brands: [] } });
        const env = detectEnvSync();
        expect(env.browser.name).toBe('Chrome');
    });

    test('swallows errors from getBrands() and keeps UA-parsed browser', () => {
        setNavigator({
            userAgent: UA.chromeWin,
            userAgentData: {
                getBrands: () => {
                    throw new Error('nope');
                },
            },
        });
        const env = detectEnvSync();
        expect(env.browser.name).toBe('Chrome');
    });
});

describe('detectEnv() (async)', () => {
    const originalNavigator = globalThis.navigator;

    afterEach(() => {
        setNavigator(originalNavigator);
    });

    test('uses high-entropy hints when getHighEntropyValues resolves', async () => {
        setNavigator({
            userAgent: UA.chromeWin,
            userAgentData: {
                brands: [{ brand: 'Google Chrome', version: '120' }],
                getHighEntropyValues: async () => ({
                    platform: 'Windows',
                    platformVersion: '15.0.0',
                    uaFullVersion: '120.0.6099.71',
                    architecture: 'x86',
                    bitness: '64',
                    model: '',
                    fullVersionList: [
                        { brand: 'Google Chrome', version: '120.0.6099.71' },
                        { brand: 'Not A Brand', version: '99.0.0.0' },
                    ],
                }),
            },
        });

        const env = await detectEnv();
        expect(env.browser.name).toBe('Google Chrome');
        expect(env.browser.version).toBe('120.0.6099.71');
        expect(env.browser.versionMajor).toBe('120');
        expect(env.os).toEqual({ name: 'Windows', version: '15.0.0' });
        expect(env.deviceType).toBe('desktop');
        expect(env.arch).toBe('x86');
        expect(env.bitness).toBe('64');
        expect(env.meta).toEqual(expect.objectContaining({ source: 'ua-ch-high', usedHighEntropy: true }));
    });

    test('maps Android platform hint to mobile deviceType', async () => {
        setNavigator({
            userAgent: UA.androidMobile,
            userAgentData: {
                brands: [{ brand: 'Google Chrome', version: '120' }],
                getHighEntropyValues: async () => ({
                    platform: 'Android',
                    platformVersion: '13',
                    fullVersionList: [{ brand: 'Google Chrome', version: '120.0.0.0' }],
                }),
            },
        });

        const env = await detectEnv();
        expect(env.os.name).toBe('Android');
        expect(env.deviceType).toBe('mobile');
    });

    test('falls back to sync parsing when getHighEntropyValues rejects', async () => {
        setNavigator({
            userAgent: UA.firefoxWin,
            userAgentData: {
                getHighEntropyValues: async () => {
                    throw new Error('nope');
                },
            },
        });

        const env = await detectEnv();
        expect(env.browser.name).toBe('Firefox');
        expect(env.meta.usedHighEntropy).toBe(false);
    });

    test('uses detectEnvSync when navigator has no userAgentData', async () => {
        setNavigator({ userAgent: UA.safariMac });

        const env = await detectEnv();
        expect(env.browser.name).toBe('Safari');
        expect(env.meta.source).toBe('ua');
        expect(env.meta.usedHighEntropy).toBe(false);
    });
});