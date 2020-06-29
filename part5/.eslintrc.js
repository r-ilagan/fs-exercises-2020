module.exports = {
  env: {
    browser: true,
    es6: true,
    'jest/globals': true,
    'cypress/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:prettier/recommended',
    'plugin:cypress/recommended',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  plugins: ['react', 'jest', 'cypress', 'prettier'],
  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
    eqeqeq: 'error',
    'no-trailing-spaces': 'error',
    'object-curly-spacing': ['error', 'always'],
    'arrow-spacing': ['error', { before: true, after: true }],
    'no-console': 0,
    'react/prop-types': 0,
    'prettier/prettier': ['error', { singleQuote: true }],
  },
};
