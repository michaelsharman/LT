import { jest } from '@jest/globals';
import * as logger from '../src/utils/logger';

jest.test('calls warn method', () => {
    const loggerSpy = jest.spyOn(logger, 'warn');

    logger.warn('hello');

    expect(loggerSpy).toHaveBeenCalledWith('hello');
});
