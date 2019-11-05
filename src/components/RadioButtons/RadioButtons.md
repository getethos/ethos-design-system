```jsx
const READY_TODAY = `I'm ready today`
const NEXT_7_DAYS = 'In the next 7 days'
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
    value: 'In 1 to 2 months',
    label: 'In 1 to 2 months',
    description: 'In 1 to 2 months',
  },
  {
    value: 'After 3 months',
    label: 'After 3 months',
    description: 'After 3 months',
  },
];

<RadioButtonGroup
  name='intent'
  initialValue={READY_TODAY}
  onChange={({ value }) => console.log(value)}
  options={IntentOptions.map((t) => ({
    name: t.value,
    value: t.value,
    label: t.description,
  }))}
/>
```
