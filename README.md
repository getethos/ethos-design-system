# Ethos Design System

A collection of reusable [React](https://reactjs.org/) components, patterns, and design guidelines we use at
[Ethos](https://ethoslife.com) to build our digital products.

## Installation

```
yarn add @ethos/ethos-design-system
```

Then, get fonts and add to /src/fonts.
They are gitignored for copyright reasons.

## Committing

When you've made changes, make sure to run `yarn release` to build the js and css bundles. This is the code which other repos actually use, and as a result we need to commit it for the updates to actually appear.

## Running the Design System

```
yarn && yarn styleguide
```

Then open [http://localhost:6060](http://localhost:6060) in your browser.

## Kitchen Sink spot check ;)

```
yarn spotcheck
```

Then open [http://localhost:8080/spotcheck.html](http://localhost:8080/spotcheck.html) in your browser.

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

## Verify that the Design System works within CMS

Subject to change.

1. Push to a non-master branch on ethos-design-system, probably named after the current task
1. Change package.json line `"ethos-design-system": "getethos/ethos-design-system#master",` to track your new branch name instead of master.
1. IN THE CMS REPO, run `yarn upgrade-ds` to pull from that branch
1. IN THE CMS REPO, regularly run `yarn build` and make sure it doesn't throw errors.

The biggest gotcha so far for causing issues in the CMS `yarn build` command is that it fails if you ever import a .scss file in javascript. Instead you should import them all in src/components/index.scss, then `yarn release` will compile the js and css into bundles.
