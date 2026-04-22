import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        environment: 'happy-dom',
        include: ['tests/unit/**/*.test.js'],
        globals: false,
        clearMocks: true,
        restoreMocks: true,
        coverage: {
            provider: 'v8',
            reporter: ['text', 'html'],
            reportsDirectory: 'coverage',
            include: [
                'src/utils/dom.js',
                'src/utils/eventBus.js',
                'src/utils/extensionsFactory.js',
                'src/utils/logger.js',
                'src/utils/memoryMonitor.js',
                'src/utils/userAgent.js',
                'src/utils/validation.js',
            ],
        },
    },
});
