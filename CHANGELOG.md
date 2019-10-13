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

## 1.1.5-h (October 13, 2019)
- EDS now offers a `TextMaskedInput` which can be used as a primitive for building things like...wait for it:
- Last 4 SSN—this is in the `TextMaskedInput` .md example
- ZipInput should have not changed in terms of API, but was refactored to delegate to `TextMaskedInput` for rendering the masked input
Checkbox
