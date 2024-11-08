module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'prettier',
    'next/core-web-vitals',
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'sonarjs'],
  globals: {
    React: true,
  },
  rules: {
    complexity: ['error', 15],
    'max-depth': ['error', 5],
    "max-lines": [
      "error",
      {
        max: 300,
        skipComments: true,
        skipBlankLines: true,
      },
    ],
    'max-nested-callbacks': ['error', 4],
    'max-params': ['error', 5],
    'max-len': ['error', 200],
    'no-shadow': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { args: 'none' }],
    '@typescript-eslint/no-shadow': ['error'],
    'react/jsx-filename-extension': [
      'warn',
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],
    'import/order': [
      'off',
      {
        'newlines-between': 'always',
        alphabetize: { order: 'asc' },
        groups: [
          'builtin',
          'external',
          'internal',
          ['parent', 'sibling'],
          'index',
        ],
      },
    ],
    'react/jsx-props-no-spreading': 0,
    'react/jsx-key': ['error', { warnOnDuplicates: true }],
    'react/react-in-jsx-scope': 0,
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'function-declaration',
        unnamedComponents: 'arrow-function',
      },
    ],
    'import/no-unresolved': [
      'error',
      {
        caseSensitive: true,
        commonjs: true,
      },
    ],
    'import/no-cycle': 'error',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-explicit-any': 'error',
    // sonar
    'sonarjs/cognitive-complexity': ['error', 15],
    'sonarjs/no-all-duplicated-branches': 'error',
    'sonarjs/no-collapsible-if': 'error',
    'sonarjs/no-duplicate-string': ['error', 3],
    'sonarjs/no-duplicated-branches': 'error',
    'sonarjs/no-empty-collection': 'error',
    'sonarjs/no-extra-arguments': 'error',
    'sonarjs/no-gratuitous-expressions': 'error',
    'sonarjs/no-identical-conditions': 'error',
    'sonarjs/no-identical-functions': 'error',
    'sonarjs/no-ignored-return': 'error',
    'sonarjs/no-inverted-boolean-check': 'error',
    'sonarjs/no-nested-switch': 'error',
    'sonarjs/no-nested-template-literals': 'error',
    'sonarjs/no-redundant-boolean': 'error',
    'sonarjs/no-same-line-conditional': 'error',
    'sonarjs/no-small-switch': 'error',
    'sonarjs/no-unused-collection': 'error',
    'sonarjs/no-use-of-empty-return-value': 'error',
    'sonarjs/no-useless-catch': 'error',
    'sonarjs/non-existent-operator': 'error',
    'sonarjs/prefer-immediate-return': 'error',
    'sonarjs/prefer-object-literal': 'error',
    'sonarjs/prefer-single-boolean-return': 'error',

  },
};
