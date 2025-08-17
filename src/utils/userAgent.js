const RE = {
    // Browsers
    edge: /Edg(?:A|iOS)?\/([\d.]+)/,
    opr: /OPR\/([\d.]+)/,
    samsung: /SamsungBrowser\/([\d.]+)/,
    chrome: /Chrome\/([\d.]+)/,
    firefox: /Firefox\/([\d.]+)/,
    safariTail: /\bSafari\/[\d.]+$/, // UA ends with Safari token
    version: /Version\/([\d.]+)/, // Safari version is in Version/x.y.z

    // OS
    win: /Windows NT ([\d.]+)/,
    mac: /Mac OS X (\d+[_.]\d+(?:[_.]\d+)?)/,
    ios: /(?:iPhone|iPad|iPod).*OS (\d+[_.]\d+(?:[_.]\d+)?)/,
    android: /Android ([\d.]+)/,
    cros: /CrOS [\w_]+ ([\d.]+)/,
    linux: /\bLinux\b/,

    // Heuristics
    mobileHint: /\bMobi\b/,
    ipad: /\biPad\b/,
    tablet: /\bTablet\b/,
    bot: /\b(bot|crawler|spider|crawling)\b/i,

    // Engines
    webkit: /AppleWebKit\/([\d.]+)/,
};

/**
 * Browser / OS / Device / Engine from UA
 */
function detectBrowserFromUA(ua) {
    // Order matters: Edge → Opera → Samsung → Chrome → Firefox → Safari
    if (RE.edge.test(ua)) {
        return withVersionMajor({ name: 'Edge', version: first(RE.edge, ua) });
    }
    if (RE.opr.test(ua)) {
        return withVersionMajor({ name: 'Opera', version: first(RE.opr, ua) });
    }
    if (RE.samsung.test(ua)) {
        return withVersionMajor({ name: 'Samsung Internet', version: first(RE.samsung, ua) });
    }
    if (/Chrome\//.test(ua) && !RE.edge.test(ua) && !RE.opr.test(ua) && !RE.samsung.test(ua)) {
        return withVersionMajor({ name: 'Chrome', version: first(RE.chrome, ua) });
    }
    if (RE.firefox.test(ua)) {
        return withVersionMajor({ name: 'Firefox', version: first(RE.firefox, ua) });
    }

    // Safari: ensure we’re not in a Chromium UA and that it ends with Safari/x
    if (!/Chrome|Chromium|Edg|OPR|SamsungBrowser/.test(ua) && RE.safariTail.test(ua)) {
        return withVersionMajor({ name: 'Safari', version: first(RE.version, ua) });
    }

    return {};
}

function detectOSFromUA(ua) {
    // iPadOS masquerading as Mac: "Macintosh; Intel Mac OS X" + Mobile/Safari tokens
    const isIPadOSMasquerade = /Macintosh/.test(ua) && /Mobile\//.test(ua) && /Safari/.test(ua);
    if (isIPadOSMasquerade) {
        return { name: 'iOS', version: undefined };
    }

    if (RE.win.test(ua)) {
        const raw = first(RE.win, ua);
        return { name: 'Windows', version: raw || undefined };
    }
    if (/iPhone|iPad|iPod/.test(ua)) {
        return { name: 'iOS', version: normalize(first(RE.ios, ua)) };
    }
    if (RE.android.test(ua)) {
        return { name: 'Android', version: first(RE.android, ua) };
    }
    if (RE.cros.test(ua)) {
        return { name: 'Chrome OS', version: first(RE.cros, ua) };
    }
    if (RE.mac.test(ua)) {
        return { name: 'macOS', version: normalize(first(RE.mac, ua)) };
    }
    if (RE.linux.test(ua)) {
        return { name: 'Linux', version: undefined };
    }

    return {};
}

function detectDeviceTypeFromUA(ua) {
    if (RE.bot.test(ua)) {
        return 'bot';
    }
    if (RE.ipad.test(ua) || RE.tablet.test(ua)) {
        return 'tablet';
    }
    if (RE.mobileHint.test(ua) || (/Android/.test(ua) && !/Tablet|iPad/.test(ua))) {
        return 'mobile';
    }
    return 'desktop';
}

function detectEngineFromUA(ua) {
    if (RE.webkit.test(ua)) {
        return { name: 'WebKit', version: first(RE.webkit, ua) };
    }
    if (/Gecko\/\d/.test(ua) && /Firefox\/([\d.]+)/.test(ua)) {
        return { name: 'Gecko', version: first(RE.firefox, ua) };
    }
    if (/Chrome\/|Edg\/|OPR\/|SamsungBrowser\//.test(ua)) {
        return { name: 'Blink' };
    }
    return {};
}

/**
 * UA-CH refinements (synchronous brands)
 */
function refineBrowserNameFromBrands(current, uaData) {
    try {
        const brands = uaData && (uaData.brands || uaData.getBrands?.());
        if (!brands || !brands.length) {
            return current;
        }
        const major = brands.filter(b => !/Not.?A.?Brand/i.test(b.brand)).sort((a, b) => parseInt(b.version, 10) - parseInt(a.version, 10))[0];
        if (major && major.brand) {
            // Keep version from UA if that’s all we have; just improve the name.
            return withVersionMajor({ name: major.brand, version: current.version });
        }
    } catch {
        /* ignore */
    }
    return current;
}

/**
 * Public: pure UA parser (works in Node or browser)
 */
export function parseUA(ua) {
    ua = ua || '';
    return {
        ua,
        browser: detectBrowserFromUA(ua),
        os: detectOSFromUA(ua),
        deviceType: detectDeviceTypeFromUA(ua),
        engine: detectEngineFromUA(ua),
        reducedUA: /\bChrome\/\d+\.0\.0\.0\b/.test(ua) || /\bEdg\/\d+\.0\.0\.0\b/.test(ua) || false,
    };
}

/**
 * Public: sync detector (UA + low-entropy only)
 */
export function detectEnvSync() {
    const ua = typeof navigator !== 'undefined' && navigator.userAgent ? navigator.userAgent : '';
    const uaData = typeof navigator !== 'undefined' ? navigator.userAgentData : undefined;
    const env = parseUA(ua);

    // Refine browser name from UA-CH brands, if present (Chromium)
    if (uaData && (uaData.brands || uaData.getBrands)) {
        env.browser = refineBrowserNameFromBrands(env.browser, uaData);
    }

    env.meta = {
        source: uaData && (uaData.brands || uaData.getBrands) ? 'ua-ch-low' : 'ua',
        usedHighEntropy: false,
        isReducedUA: isReducedUAString(ua),
    };

    delete env.reducedUA;

    return env;
}

/**
 * Public: async detector (uses high-entropy if supported; otherwise falls back)
 */
export async function detectEnv() {
    const ua = typeof navigator !== 'undefined' && navigator.userAgent ? navigator.userAgent : '';
    const uaData = typeof navigator !== 'undefined' ? navigator.userAgentData : undefined;

    // If high-entropy hints are available, use them for full fidelity.
    if (uaData && typeof uaData.getHighEntropyValues === 'function') {
        try {
            const hi = await uaData.getHighEntropyValues([
                'platform', // "Windows", "macOS", "Android", "Chrome OS", "Linux", "iOS"
                'platformVersion', // e.g., "15.0.0"
                'uaFullVersion', // e.g., "138.0.7204.50"
                'architecture', // e.g., "arm" | "x86"
                'bitness', // "64" | "32"
                'model', // device model (mobile)
                'fullVersionList', // array of { brand, version }
            ]);

            const brands = hi.fullVersionList || uaData.brands || uaData.getBrands?.() || [];
            const preferred = ['Chrome', 'Google Chrome', 'Microsoft Edge', 'Edge', 'Chromium', 'Opera', 'OPR', 'Samsung Internet', 'Firefox'];
            const pick =
                brands.find(b => preferred.some(p => b.brand.toLowerCase().includes(p.toLowerCase()))) ||
                brands.find(b => !/Not.?A.?Brand/i.test(b.brand)) ||
                null;

            const browserName = pick?.brand || (brands[0] && brands[0].brand) || undefined;
            const versionFull = pick?.version || hi.uaFullVersion || undefined;

            // OS from hints
            const osName = hi.platform || undefined;
            const osVersion = hi.platformVersion || undefined;

            // Coarse device type
            let deviceType;
            if (/Android/i.test(osName)) {
                deviceType = 'mobile';
            } else if (/Windows|macOS|Chrome OS|Linux|iOS/i.test(osName)) {
                deviceType = 'desktop';
            }

            return {
                ua,
                browser: withVersionMajor({ name: browserName, version: versionFull }),
                os: { name: osName, version: osVersion },
                deviceType,
                engine: undefined,
                arch: hi.architecture,
                bitness: hi.bitness,
                model: hi.model,
                meta: {
                    source: 'ua-ch-high',
                    usedHighEntropy: true,
                    isReducedUA: isReducedUAString(ua),
                },
            };
        } catch {
            // fall through to low-entropy / UA parsing
        }
    }

    // Fallback: low-entropy brands + UA parsing
    const env = detectEnvSync();
    // ensure meta.source reflects the fallback accurately
    env.meta.source = (env.meta && env.meta.source) || 'ua';

    return env;
}

function first(rx, ua) {
    const m = ua.match(rx);
    return m ? m[1] : undefined;
}

function isReducedUAString(ua) {
    return /\bChrome\/\d+\.0\.0\.0\b/.test(ua) || /\bEdg\/\d+\.0\.0\.0\b/.test(ua);
}

function normalize(v) {
    return v ? v.replace(/_/g, '.') : undefined;
}

function withVersionMajor(obj) {
    if (obj && obj.version && typeof obj.version === 'string') {
        const major = obj.version.split('.')[0];
        if (major) {
            obj.versionMajor = major;
        }
    }
    return obj;
}

export default { detectEnv, detectEnvSync, parseUA };
