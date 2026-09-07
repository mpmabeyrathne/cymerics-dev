import { describe, expect, it } from 'vitest';
import { z } from 'zod';

import { ValidationError } from '../../../src/errors/index.js';
import { validate } from '../../../src/validation/validate.js';

describe('validate', () => {
    it('returns validated data when the data is valid', () => {
        const schema = z.object({
            name: z.string(),
            age: z.number(),
        });

        const data = {
            name: 'Pasindu',
            age: 25,
        };

        const result = validate(schema, data);

        expect(result).toEqual(data);
    });

    it('throws ValidationError when the data is invalid', () => {
        const schema = z.object({
            name: z.string(),
            age: z.number(),
        });

        const invalidData = {
            name: 'Pasindu',
            age: 'invalid',
        };

        expect(() => validate(schema, invalidData)).toThrow(ValidationError);
    });
});
