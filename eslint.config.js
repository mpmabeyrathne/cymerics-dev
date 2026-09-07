import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default tseslint.config(
    {
        ignores: ['node_modules/**', 'dist/**', 'coverage/**'],
    },

    js.configs.recommended,

    ...tseslint.configs.recommended,

    {
        plugins: {
            import: importPlugin,
        },

        settings: {
            'import/resolver': {
                typescript: true,
            },
        },

        rules: {
            'no-unused-vars': 'off',

            '@typescript-eslint/no-unused-vars': [
                'error',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                },
            ],

            'import/no-unresolved': 'error',
            'import/no-duplicates': 'error',
        },
    },
);
