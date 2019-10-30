// https://prettier.io/docs/en/integrating-with-linters.html

module.exports = {
  // The environment settings determine what globals are predefined.
  // https://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    browser: true,
    es6: true,
  },

  // Inherit the configs of following plugins:
  extends: [
    // A few dozen recommended rules (see √s on https://eslint.org/docs/rules/).
    'eslint:recommended',

    // Configuration for jest test files (e.g. globals) and testing lint rules.
    // https://www.npmjs.com/package/eslint-plugin-jest
    'plugin:jest/recommended',

    // React- and JSX-specific linting rules.
    // https://github.com/yannickcr/eslint-plugin-react#configuration
    'plugin:react/recommended',

    // This one should remain last, so it can disable any conflicting rules.
    // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
    'plugin:prettier/recommended',
  ],

  rules: {
    // TODO: (1) fix these warnings, (2) remove --max-warnings in package.json.
    'no-unused-vars': 'warn',
    'react/prop-types': 'warn',
  },

  // https://eslint.org/docs/user-guide/configuring#specifying-parser
  // This is necessary for various ES language features we use.
  parser: 'babel-eslint',

  // https://eslint.org/docs/user-guide/configuring#specifying-parser-options
  parserOptions: {
    ecmaVersion: 7,
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    sourceType: 'module',
  },

  settings: {
    // https://github.com/yannickcr/eslint-plugin-react#configuration
    react: {
      version: 'detect',
    },
  },
}
