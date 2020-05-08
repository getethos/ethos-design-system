```jsx
;<>
  <Body.Regular400 color="BrandSalamander">
    Body is in the process of being deprecated, please avoid introducing new instances!
  </Body.Regular400>
  <br />
  <Body.Medium500>
    <a href="/#/Components/Body2">Body2</a> is now available as part of Type2!
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
<Body.Regular400>
  We offer modern, ethical life insurance to protect the life you're building
  and the people you love
</Body.Regular400>
```

```jsx
<Body.Regular400 element="label">I should be a label element</Body.Regular400>
```

```jsx
<Body.Medium500>
  We offer modern, ethical life insurance to protect the life you're building
  and the people you love
</Body.Medium500>
```

```jsx
import { COLORS } from './Colors'
;<>
  <Body.Regular400 color={COLORS.BRAND_FOREST}>
    Brand Forest color
  </Body.Regular400>
  <Body.Regular400 color={COLORS.BRAND_SALAMANDER}>
    Brand Salamander color
  </Body.Regular400>
</>
```
