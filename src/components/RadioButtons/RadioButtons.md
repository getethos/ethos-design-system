```jsx
import { RadioButtonGroup } from './RadioButtonGroup'
const READY_TODAY = `I'm ready today`
const NEXT_7_DAYS = 'In the next 7 days'
const IntentOptions = [
  { value: READY_TODAY },
  { value: NEXT_7_DAYS },
  { value: 'In 1 to 2 months' },
  { value: 'After 3 months' },
]

;<RadioButtonGroup
  name="intent-to-apply"
  labelCopy="When would you like to apply?"
  onChange={({ value }) => console.log(value)}
  validator={(x) => (x === NEXT_7_DAYS ? 'This one is invalid.' : '')}
  options={IntentOptions.map((t) => ({
    name: t.value,
    value: t.value,
    label: t.value,
  }))}
/>
```
