import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const LearnositySDK = require('learnosity-sdk-nodejs/index');

export function itemsApi() {
    const signature = new LearnositySDK().init(
        'items',
        {
            consumer_key: 'yis0TYCu7U9V4o7M',
            domain: 'localhost',
        },
        '74c5fd430cf1242a527f6223aebd42d30464be22',
        {
            user_id: 'lt-user',
            session_id: '4ca30e35-d73a-4135-af33-f9cad7d01652',
            activity_id: 'lt_integration_testing',
            rendering_type: 'assess',
            type: 'local_practice',
            name: 'LT integration testing',
            items: ['itembranching-demo-open1', 'itembranching-demo-open2', 'itembranching-demo-open3'],
            config: {
                regions: 'main',
                navigation: {
                    show_intro: false,
                },
            },
        }
    );

    return signature;
}
