# Ethos Design System

A collection of reusable [React](https://reactjs.org/) components, patterns, and design guidelines we use at
[Ethos](https://ethoslife.com) to build our digital products.

## Setup

1. See `package.json` for node `engines` – you need to have that version of node installed specifically, e.g. via `nvm`:

```shell
nvm install v10.16.3  # then do `nvm list` to ensure version is available
nvm use               # use the version specified in `.nvmrc`, if installed
```

2. Download `fonts.zip` (pinned to #dev-design-system) and unzip it.
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

Run an individual test:

```
yarn test -t "valid single keys do not throw"
```

Debug `console.log` and `debugger` statements in Chrome:

```
yarn test:debug
```

Then do following to setup debugging in Chrome:

- Open Chrome and type following in the address bar: chrome://inspect
- Click on "Open dedicated DevTools for Node"

### Cypress E2E

Our end to end integration tests use Cypress. To run Cypress locally do:

```
yarn e2e:dev
```

The Cypress application will open up and it should be self evident how to run the specs by just clicking around the Cypress interface.

_Our CI/CD is setup via Travis—you can find its configuration at `.travis.yml`_

## Releasing

> TLDR: Run `yarn release` and `git push origin tagname` when your PR is ready.

Each PR that merges to `master` should update the `package.json` version one way or another, and ideally create a corresponding git tag.

To use your new release downstream, update your app's `package.json` as follows:

```
  "ethos-design-system": "github:getethos/ethos-design-system#v1.2.3",
```

For this to work, there must be a `v1.2.3` git tag on GitHub. The easiest way to do this is to run `yarn version` in your branch and push. This will:

- Prompt you for the new version number
- Update `package.json` with the version number
- Commit the change in a new commit
- Add the version number to the commit as a tag

You can then just `git push`. For more granular control:

```
$ git tag v1.2.3 [-f]               # add a lightweight tag locally
$ git tag -d v1.2.3                 # delete tag v1.2.3 locally
$ git push origin v1.2.3            # push tag v1.2.3
$ git push -d origin v1.2.3         # delete tag v1.2.3 remotely
```
