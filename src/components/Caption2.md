```jsx
<Caption2.Regular400>
  We offer modern, ethical life insurance to protect the life you're building
  and the people you love
</Caption2.Regular400>
```

```jsx
<Caption2.Medium500>
  We offer modern, ethical life insurance to protect the life you're building
  and the people you love
</Caption2.Medium500>
```

This example configures the caption to be a label with "all-caps":

```jsx
<Caption2.Medium500 allCaps={true} element="label">
  All-Caps Label
</Caption2.Medium500>
```

Note that any `TypeBase.PUBLIC_PROPS` are available for you to _pass through_
if you should need it. For exapmple, to have a

```jsx
import { COLORS } from './index'
;<Caption2.Regular400 color={COLORS.GRAY_STROKE_AND_DISABLED}>
  I am ghosted :)
</Caption2.Regular400>
```
