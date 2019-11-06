```jsx
const READY_TODAY = `I'm ready today`
const IntentOptions = [
  { value: READY_TODAY, },
  { value: 'In the next 7 days', },
  { value: 'In 1 to 2 months', },
  { value: 'After 3 months', },
];

<RadioButtonGroup
  name='intent-to-apply'
  labelCopy='When would you like to apply?'
  onChange={({ value }) => console.log(value)}
  options={IntentOptions.map((t) => ({
    name: t.value,
    value: t.value,
    label: t.value,
  }))}
/>
```
