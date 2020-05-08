```jsx
<TitleMedium2.Serif.Medium500>
  We offer modern, ethical life insurance
</TitleMedium2.Serif.Medium500>
```

```jsx
<TitleMedium2.Serif.Book500>
  We offer modern, ethical life insurance
</TitleMedium2.Serif.Book500>
```

```jsx
<TitleMedium2.Sans.Medium500>
  We offer modern, ethical life insurance
</TitleMedium2.Sans.Medium500>
```

```jsx
<TitleMedium2.Sans.Regular400>
  We offer modern, ethical life insurance
</TitleMedium2.Sans.Regular400>
```

```jsx
<TitleMedium2.Sans.Regular400 element="label">
  I should be a label element. Inspect me to see :)
</TitleMedium2.Sans.Regular400>
```

Note that any `TypeBase.PUBLIC_PROPS` are available for you to _pass through_
if you should need it. For exapmple, to have a

```jsx
import { COLORS } from '../index'
;<TitleMedium2.Sans.Regular400
  element="label"
  color={COLORS.GRAY_STROKE_AND_DISABLED}
>
  I should be ghosted :)
</TitleMedium2.Sans.Regular400>
```
