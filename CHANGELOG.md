# Change Log
All notable changes to this project will be documented in this file.
It starts at:
-  version "1.1.5-g"
-  resolved "https://codeload.github.com/getethos/ethos-design-system/tar.gz/01d7a4a7fc867ace3f55a50fbc59c563d433385b"
Above is what the CMS points to at time of first writing this.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).
Although we may at times add pre-release change entries, most updates
will track minor and up.

## [Unreleased]
<details>
  <summary>
    Changes that have landed in master but are not yet released.
    Click to see more.
  </summary>
</details>

## 1.1.8-b (October 30, 2019)
- Add aria-hidden, tests to Spacer (a11y fix)
- Travis CI to run Cypress e2e integration specs
- hide becomes markHidden (#117)
- Add eslint
- Add husky hooks
- Add textarea input
- remove max-width on fullWidth phone viewport buttons (#109)
- Move Link to CSS modules
- Remove validateTruthy completely
- Add 'column' property which stacks buttons
- Convert RadioButtons.js to CSS modules (#97)
- Fix button select group initial falsy value not working (#98)
- Add Email Input and Email Validation
- Convert Type to CSS modules (#82)
- Dynamic fields support
- Adds the Light300 font
- Convert Layout components to CSS modules
- Move Layout components to CSS modules
- Measure CSS stats
- Creates a validateExists and comments deprecated for validateTruthy
- Refactors ButtonSelectGroup.js to properly handle false as a valid option value. Add a Boolean yes/no with corresponding true/false in Form example.
- Convert InfoMessage to css module
- ButtonSelectGroup now has a fullWidth prop, defaults to true
- Remove radius from Images
- Support Initial Field Values. `intialValue` now prefills and sets touched for fields
- BirthdateInput now uses TextMaskedInput. Also, fix example which was missing formChangeHandlerStub
- Support pipe and placeholder in the TextMaskedInput component
- Fixes the validation in ButtonSelectGroup.js which never appeared to show form hint errors. Made a better example in Form.md which shows how this all works.
- Adds onKeyPress / ENTER support for the checkbox so we can toggle with keyboard only interaction


## 1.1.5-h (October 13, 2019)
- EDS now offers a `TextMaskedInput` which can be used as a primitive for building things like...wait for it:
- Last 4 SSN—this is in the `TextMaskedInput` .md example
- ZipInput should have not changed in terms of API, but was refactored to delegate to `TextMaskedInput` for rendering the masked input
Checkbox
