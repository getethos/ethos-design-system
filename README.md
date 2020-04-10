# Ethos Design System

A collection of reusable [React](https://reactjs.org/) components, patterns, and design guidelines we use at
[Ethos](https://ethoslife.com) to build our digital products.

## Setup

1. See `package.json` for node `engines` – you need to have that version of node installed specifically, e.g. via `nvm`:

```shell
nvm install v10.16.3  # then do `nvm list` to ensure version is available
nvm use               # use the version specified in `.nvmrc`, if installed
```

2. Download `fonts.zip` from [Google Drive](https://drive.google.com/drive/u/0/folders/1hvAAEUWEsz2Hq-Wmj09xOvCYeixkJ4_c) and unzip it.
3. Copy the contents to `src/fonts`, e.g.:

```
$ mkdir -p ethos-design-system/src/fonts/
$ cp -a ~/Downloads/fonts/ ethos-design-system/src/fonts/
```

## Development

1. Run `yarn css:develop` if you're editing global CSS (optional).
2. Run the live style guide with `yarn styleguide`.
3. Open [http://localhost:9008](http://localhost:9008) in your browser.

## Tests

```
yarn test
```

Debug `console.log` and `debugger` statements in Chrome:

```
yarn test:debug
```

Then do following to setup debugging in Chrome:

- Open Chrome and type following in the address bar: chrome://inspect
- Click on "Open dedicated DevTools for Node"

### Jest Tips

These tips are from the [Jest CLI docs](https://jestjs.io/docs/en/22.x/cli#running-from-the-command-line)

Run only tests related to changed files based on git:

```shell
yarn test -o
```

Find tests related to `fileA.js`:

```shell
jest --findRelatedTests path/to/fileA.js
```

Run an individual test:

```
yarn test -t "valid single keys do not throw"
```

### Update Snapshots

`yarn test:update` (runs `jest --updateSnapshot`)

### Cypress E2E

Our end to end integration tests use Cypress. To run Cypress locally do:

```
yarn e2e:dev
```

The Cypress application will open up and it should be self evident how to run the specs by just clicking around the Cypress interface.

_Our CI/CD is setup via Travis—you can find its configuration at `.travis.yml`_

## Usage

To use a release downstream, update your app's `package.json` as follows:

```json
  "ethos-design-system": "github:getethos/ethos-design-system#v1.2.3",
```

## Releases

> TLDR: Run `yarn version` and `git push origin tagname` when you need to create a new release.

Each time you need to consume recent EDS changes elsewhere, you need to bump the version and create a new git release:

1. To bump the package.json version, run `yarn version` in your branch, This will:
  - Prompt you for the new version number
  - Update `package.json` with the version number
  - Commit the change in a new commit
2. To create and push a git tag, do one of these:
  - Run `git tag v1.2.3 && git push origin v1.2.3` on your branch.
  - Create a release `v1.2.3` on GitHub, if it's already in trunk.
3. Never force push a tag, to avoid confusing yarn or Jenkins later. Cut a new version instead.

For more granular control:

```
$ git tag v1.2.3 [-f]               # add a lightweight tag locally
$ git tag -d v1.2.3                 # delete tag v1.2.3 locally
$ git push origin v1.2.3            # push tag v1.2.3
$ git push -d origin v1.2.3         # delete tag v1.2.3 remotely
```

## Design patterns

#### JS concepts

- The repo is set up to import individual components as necessary.
- Preference for hooks and functional components over classes.
- Please try to avoid using `<Media>` and `<Spacer>` components for now, they are deprecated. For media queries, import `@include` rules from the media scss file as described below.

#### CSS/SCSS concepts

- CSS variables are the core of styling in the EDS.
  - All CSS variables are available on all pages in both monorepo and cms; they are the single source of truth for brand colors, breakpoints, and other commonly reused bits of css.
- The EDS is (to an extent) designed as a set of immutable components in terms of interior JS logic as well as styling. New styling of existing components should be handled by PR's on the EDS, not by writing local overrides in files.
- We encourage a limited subset of SCSS features for the EDS.
  - The primary reason for using scss is to import @include statements from the media scss file for reusable media queries, like this:
    - `@import '~ethos-design-system/src/components/Media/Media.scss';`
    - `@include for-phone-and-tablet {`
  - CSS variables don't always work nicely with scss; we have a preference for calc over scss math operations.

#### Typography: Type vs Type2 vs TypeBase
_(TitleLarge/Small/etc, Body, Caption, Footnote)_
As of Q1 2020 we're undergoing a transition to make some new `Type` components available. If you're wondering what `Type2`, `TypeBase` or any of the new `Type` like components are, checkout `src/components/Type2/Blueprint.js`.

If you have a Figma spec that uses the "new" `Type` styles, your designer should be able to let you know which components to use from `Type2`. They share the same name as Type components but are suffixed with `2` and usually smaller than their original `Type` counterpart.

Type2 components are available for use in production. Be aware that some components no longer resize on smaller viewports and a reduced number of weights are available.

New/existing weights:
```
Sans.Medium500
Sans.Regular400
Serif.Book500 / Serif.Medium500 (same thing)
```

Deprecated weights:
```
Serif.Demi600
Serif.Regular400
*.Light300
```

Deprecated sizes:
`Footnote` (use `Caption` instead)
`TitleXXL`
`TitleXL.Sans` (`Serif` still available)

The core functionality of `Type` has been migrated to `TypeBase` as we transition. Ideally in the later quarters of 2020 we will begin to deprecate the original `Type` component and move all typography components already in use to `Type2`.

## CI/CD

We have a light-weight CI/CD process via Travis and deployment to eds.ethoslabs.io via GitHub actions. The important files to look at to understand these are:

- [deploy script](https://github.com/getethos/ethos-design-system/blob/master/.github/workflows/deploy.yml)
- [travis yaml](https://github.com/getethos/ethos-design-system/blob/master/.travis.yml)

