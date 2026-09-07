import js from '@eslint/js'
import globals from 'globals'
import react from 'eslint-plugin-react'
import reactHooks from 'eslint-plugin-react-hooks'
import jsxA11y from 'eslint-plugin-jsx-a11y'
import prettier from 'eslint-config-prettier'

export default [
  { ignores: ['dist/**', 'coverage/**', 'playwright-report/**', 'test-results/**'] },

  js.configs.recommended,

  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: 'detect' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'jsx-a11y': jsxA11y,
    },
    rules: {
      ...react.configs.flat.recommended.rules,
      ...react.configs.flat['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.flatConfigs.recommended.rules,
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],

      // React 19 removed PropTypes from the package entirely, so this rule
      // would push us toward a deleted API. Prop contracts are documented in
      // JSDoc instead; a TypeScript migration is the real fix (Phase 2).
      'react/prop-types': 'off',
    },
  },

  // Node context, ESM: package.json sets "type": "module"
  {
    files: ['*.config.js', 'scripts/**/*.{js,mjs}'],
    languageOptions: { globals: { ...globals.node } },
  },

  // Node context, CommonJS: only .cjs escapes "type": "module"
  {
    files: ['**/*.cjs'],
    languageOptions: {
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
  },

  // Test context: Jest globals
  {
    files: ['tests/**/*.{js,jsx,cjs}'],
    languageOptions: { globals: { ...globals.jest, ...globals.node } },
    rules: {
      // `import it from '.../it/site.js'` silently shadows Jest's `it()` and
      // fails the whole suite with "(0, _site.default) is not a function".
      'no-restricted-syntax': [
        'error',
        {
          selector: "ImportDefaultSpecifier[local.name='it']",
          message: "Importing as `it` shadows Jest's it(). Use `itContent` instead.",
        },
      ],
    },
  },

  // Prettier last so it can switch off stylistic rules
  prettier,
]
