# Ethos Design System

A collection of reusable [React](https://reactjs.org/) components, patterns, and design guidelines we use at
[Ethos](https://ethoslife.com) to build our digital products.

## Prequisites

See the `package.json` for node `engines`—you need to have that version of node installed via `nvm` specifically:

```shell
nvm install v10.16.3 # then do `nvm list` to ensure version is available
```

## Installing fonts for local development

1. Download `fonts.zip` (pinned to #dev-design-system) and unzip it.
2. Copy the contents to `src/fonts`, e.g.:
```
$ mkdir -p path/to/ethos-design-system/src/fonts/
$ cp -a ~/Downloads/fonts/ path/to/ethos-design-system/src/fonts/
```

## Committing

When you've made changes, make sure to run `yarn release` to build the js and css bundles. This is the code which other repos actually use, and as a result we need to commit it for the updates to actually appear.

## Running the Design System

First, you'll need to install the fonts to `src/`. See instructions above.

```
yarn && yarn styleguide
```

Then open [http://localhost:9008](http://localhost:9008) in your browser.

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
yarn e2e:ci
```

The Cypress application will open up and it should be self evident how to run the specs by just clicking around the Cypress interface.

_Our CI/CD is setup via Travis—you can find its configuration at `.travis.yml`_

## Verify that the Design System works within CMS

Subject to change.

1. Push to a non-master branch on ethos-design-system, probably named after the current task
1. Change package.json line `"ethos-design-system": "getethos/ethos-design-system#master",` to track your new branch name instead of master.
1. IN THE CMS REPO, run `yarn upgrade-ds` to pull from that branch
1. IN THE CMS REPO, regularly run `yarn build` and make sure it doesn't throw errors.

The biggest gotcha so far for causing issues in the CMS `yarn build` command is that it fails if you ever import a .scss file in javascript. Instead you should import them all in src/components/index.scss, then `yarn release` will compile the js and css into bundles.
