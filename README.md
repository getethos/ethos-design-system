# Ethos Design System

A collection of reusable [React](https://reactjs.org/) components, patterns, and design guidelines we use at
[Ethos](https://ethoslife.com)  to build our digital products.

## Installation

  ```
  yarn add @ethos/ethos-design-system
  ```

Then, get fonts and add to /src/fonts. 
They are gitignored for copyright reasons.

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
* Open Chrome and type following in the address bar: chrome://inspect
* Click on "Open dedicated DevTools for Node"
