```jsx
const READY_TODAY = `I'm ready today`
const NEXT_7_DAYS = 'In the next 7 days'
const IN_1_TO_2 = 'In 1 to 2 months'
const AFTER_3 = 'After 3 months'
const IntentOptions = [
  {
    value: READY_TODAY,
    label: READY_TODAY,
    description: READY_TODAY,
  },
  {
    value: NEXT_7_DAYS,
    label: NEXT_7_DAYS,
    description: NEXT_7_DAYS,
  },
  {
    value: IN_1_TO_2,
    label: IN_1_TO_2,
    description: IN_1_TO_2,
  },
  {
    value: AFTER_3,
    label: AFTER_3,
    description: AFTER_3,
  },
]

;<RadioButtonGroup
  name="intent"
  initialValue={READY_TODAY}
  onChange={({ value }) => console.log(value)}
  validator={(x) => (x === NEXT_7_DAYS ? 'This one is invalid.' : '')}
  options={IntentOptions.map((t) => ({
    name: t.value,
    value: t.value,
    label: t.description,
  }))}
/>
```
