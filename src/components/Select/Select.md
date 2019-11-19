```jsx
const onSelected = selectedOption => {
  console.log('Option selected: ', selectedOption)
};
const options = [
  { value: 'nyc', label: 'New York' },
  { value: 'sf', label: 'San Francisco' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'phoenix', label: 'Phoenix' },
];
<Select
  placeholder='Custom placeholder...'
  onChange={onSelected}
  options={options}
/>
```
