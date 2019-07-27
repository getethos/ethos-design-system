# @getethos/design-system

## Live documentation

https://ethos-frontend-docs.netlify.com/design-system
https://ethos-frontend-docs.netlify.com/design-system-index

## Development

To build or develop styles, run `yarn build` or `yarn develop`.

No special commands are needed to develop React components.

## Usage

Import React components as needed, and `design-system.css` once per app:

```
import { Button } from 'frontend/packages/design-system'

export const FooPage = (props) => (
  <div>
    <Button.Medium.Black>
      Click me
    </Button.Medium.Black>
  </div>
)
```

## Media queries

In general you shouldn't need to import the Sass files, except for Media.scss for media query mixins:

```
// Foo.module.scss
@import 'packages/design-system/Media';

@include for-phone-only {
  // ...
}

@include for-laptop-and-up {
  // ...
}
```

You may also, if necessary, use the React `Media` export to access the comparable functionality in JS. This component should be considered **beta** quality. Media queries are bulletproof in CSS, and comparatively buggy in JS.

To minimize the chance of bugs, try to only use these helpers at the root of the markup tree, like so:

```
// Foo.js
import { Media } from 'frontend/packages/design-system'

function Foo() {
  return (
    <div>
      <Media.PhoneOnly>
        {/* phone markup */}
      </Media.PhoneOnly>
      
      <Media.TabletOnly>
        {/* tablet markup */}
      </Media.TabletOnly>
    </div>
  )
}
```


