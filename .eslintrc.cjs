/* eslint-env node */

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'eslint-config-prettier',
    'prettier',
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:security/recommended'
  ],
  plugins: ['prettier', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        ts: 'never'
      }
    ],
    'no-nested-ternary': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    camelcase: 'off'
  },
  parser: '@typescript-eslint/parser',
  ignorePatterns: ['.eslintrc.cjs'],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.ts', '.js']
      }
    }
  },
  env: {
    es6: true,
    node: true
  }
}
