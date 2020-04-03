```jsx
const ReasonsOptions = [
  { value: 'Already fullfilled' },
  { value: 'Already have on file' },
  { value: 'No longer needed' },
]
;<NoraRadioButtonGroup
  name="reasons-test"
  onChange={({ value }) => console.log(value)}
  options={ReasonsOptions.map((t) => ({
    name: t.value,
    value: t.value,
    label: t.value,
  }))}
/>
```
