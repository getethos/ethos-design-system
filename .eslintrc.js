// https://prettier.io/docs/en/integrating-with-linters.html

module.exports = {
  // The environment settings determine what globals are predefined.
  // https://eslint.org/docs/user-guide/configuring#specifying-environments
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  // Inherit the configs of following plugins:
  extends: [
    // A few dozen recommended rules (see √s on https://eslint.org/docs/rules/).
    'eslint:recommended',

    // Configuration for jest test files (e.g. globals) and testing lint rules.
    // https://www.npmjs.com/package/eslint-plugin-jest
    'plugin:jest/recommended',

    // Accessibility rules (e.g. aria tags)
    // https://www.npmjs.com/package/eslint-plugin-jsx-a11y
    'plugin:jsx-a11y/recommended',

    // React- and JSX-specific linting rules.
    // https://github.com/yannickcr/eslint-plugin-react#configuration
    'plugin:react/recommended',

    // This one should remain last, so it can disable any conflicting rules.
    // https://github.com/prettier/eslint-plugin-prettier#recommended-configuration
    'plugin:prettier/recommended',
  ],

  rules: {
    // These downgrades are added to allow us to add `jsx-a11y` and cap further
    // issues with --max-warnings, while not immediately breaking CI.
    // TODO: (1) fix the issues; (2) remove these downgrades.
    'jsx-a11y/no-noninteractive-element-to-interactive-role': 'warn',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/anchor-has-content': 'warn',
    'react/display-name': 'off',
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

  overrides: [
    {
      parser: '@typescript-eslint/parser',
      files: ['**/*.tsx', '**/*.ts'],
      parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
      },
      extends: ['plugin:@typescript-eslint/recommended'],
      plugins: ['@typescript-eslint'],
      rules: {
        'react/prop-types': 'off',
      },
    },
  ],
}
