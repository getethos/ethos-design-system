### Essentially deprecated

90% of uses for a spacer component in design specs is at least slightly responsive (16px at phone width, 24 at tablet, etc.)

The ideal version of Spacer is probably `<Spacer width={[16, 24, 24, 32]}/>` or something else which encourages programmers to double check the spacing at every breakpoint.

Leftover code:

```jsx
import { Body } from '../Type'
;<div>
  <Body.Regular400>Some text above a spacer</Body.Regular400>
  <Spacer.H24 />
  <Body.Regular400>Some more text</Body.Regular400>
</div>
```

```jsx
import { Body } from '../Type'
;<div>
  <Body.Regular400>
    Some text.
    <Spacer.W8 />
    Some more text.
  </Body.Regular400>
</div>
```
