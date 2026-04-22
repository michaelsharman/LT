/**
 * Unit tests for src/utils/validation.js.
 * Pure functions, no environment setup required.
 */
import { describe, test, expect } from 'vitest';
import { hasValue, isEmptyObject } from '../../src/utils/validation.js';

describe('hasValue()', () => {
    describe('returns false for', () => {
        test.each([
            ['null', null],
            ['undefined', undefined],
            ['empty string', ''],
            ['whitespace-only string', '   '],
            ['empty array', []],
            ['empty object', {}],
        ])('%s', (_label, value) => {
            expect(hasValue(value)).toBe(false);
        });
    });

    describe('returns true for', () => {
        test.each([
            ['non-empty string', 'abc'],
            ['string with surrounding whitespace', '  abc  '],
            ['number zero', 0],
            ['positive number', 42],
            ['negative number', -1],
            ['boolean false', false],
            ['boolean true', true],
            ['non-empty array', [1]],
            ['array with a single falsy value', [0]],
            ['non-empty object', { a: 1 }],
        ])('%s', (_label, value) => {
            expect(hasValue(value)).toBe(true);
        });
    });
});

describe('isEmptyObject()', () => {
    test('returns true for {}', () => {
        expect(isEmptyObject({})).toBe(true);
    });

    test('returns false for { a: 1 }', () => {
        expect(isEmptyObject({ a: 1 })).toBe(false);
    });

    test('returns false for object with multiple keys', () => {
        expect(isEmptyObject({ a: 1, b: 2, c: 3 })).toBe(false);
    });

    test('returns false for object with undefined value', () => {
        expect(isEmptyObject({ a: undefined })).toBe(false);
    });
});
