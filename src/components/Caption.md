```jsx
import { Body } from './Body'
;<>
  <Body.Regular400 color="BrandSalamander">
    Caption is in the process of being deprecated, please avoid introducing new
    instances!
  </Body.Regular400>
  <br />
  <Body.Medium500>
    <a href="/#/Components/Caption2">Caption2</a> is now available as part of
    Type2!
  </Body.Medium500>
  <br />
  <Body.Regular400>
    Check with your Figma designer to see if you can use Type2!
    <br />
    What is Type2 you ask? <br />
    <a
      href="https://github.com/getethos/ethos-design-system#typography-type-vs-type2-vs-typebase"
      target="_blank"
    >
      Ask and you shall receive! README#Typography: Type vs Type2 vs TypeBase
    </a>
  </Body.Regular400>
</>
```

```jsx
<Caption.Regular400>
  We offer modern, ethical life insurance to protect the life you're building
  and the people you love
</Caption.Regular400>
```

```jsx
<Caption.Medium500>
  We offer modern, ethical life insurance to protect the life you're building
  and the people you love
</Caption.Medium500>
```

This example configures the caption to be a label with "all-caps":

```jsx
<Caption.Medium500 allCaps={true} element="label">
  All-Caps Label
</Caption.Medium500>
```
