# @getethos/design-system

## Development

To build or develop styles, run `yarn build` or `yarn develop`.

No special commands are needed to develop React components.

## Usage

Import React components as needed, and `design-system.css` once per app:

```
import { Button } from '@getethos/design-system'

export const FooPage = (props) => (
  <div>
    <Button.Large.Blue>
      Click me
    </Button.Large.Blue>
  </div>
)

// Elsewhere
import '@getethos/design-system/design-system.css' // JS
@import '~@getethos/design-system/design-system.css' // Sass
```
