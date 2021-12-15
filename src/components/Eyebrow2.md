```jsx
<Eyebrow2.Sans.Medium500>
  BIOGRAPHICAL INFORMATION
</Eyebrow2.Sans.Medium500>
```

This example configures the eyebrow to be a label with "all-caps":

```jsx
<Eyebrow2.Sans.Medium500 allCaps={true} element="label">
  All-Caps Label
</Eyebrow2.Sans.Medium500>
```

Note that any `TypeBase.PUBLIC_PROPS` are available for you to _pass through_
if you should need it.

```jsx
import { COLORS } from './index'
;<Eyebrow2.Sans.Medium500 color={COLORS.GRAY_SECONDARY}>
  I am a different color
</Eyebrow2.Sans.Medium500>
```