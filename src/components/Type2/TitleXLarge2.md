```jsx
<TitleXLarge2.Serif.Medium500>
  We offer modern, ethical life insurance
</TitleXLarge2.Serif.Medium500>
```

```jsx
<TitleXLarge2.Serif.Book500>
  We offer modern, ethical life insurance
</TitleXLarge2.Serif.Book500>
```

```jsx
<TitleXLarge2.Serif.Medium500 element="label">
  I should be a label element. Inspect me to see :)
</TitleXLarge2.Serif.Medium500>
```

Note that any `TypeBase.PUBLIC_PROPS` are available for you to _pass through_
if you should need it. For exapmple, to have a

```jsx
import { COLORS } from '../index'
;<TitleXLarge2.Serif.Medium500
  element="label"
  color={COLORS.GRAY_STROKE_AND_DISABLED}
>
  I should be ghosted :)
</TitleXLarge2.Serif.Medium500>
```
