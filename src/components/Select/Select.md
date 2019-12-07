We leverage [React-Select](https://github.com/JedWatson/react-select) for our single and multi selects. For example, you can add
`menuIsOpen={true}` below as an attribute to `<Select>` and the menu will remain open.
```jsx
const onSelected = selectedOption => {
  console.log('Option selected: ', selectedOption)
};
const options = [
  { value: 'nyc', label: 'New York' },
  { value: 'sf', label: 'San Francisco' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'la', label: 'Los Angeles' },
  { value: 'seattle', label: 'Seattle' },
  { value: 'Portland', label: 'Portland' },
  { value: 'Miami', label: 'Miami' },
];
<Select
  placeholder='Custom placeholder...'
  onChange={onSelected}
  options={options}
/>
```

An optional title may be included on the input box
```jsx
const onSelected = selectedOption => {
  console.log('Option selected: ', selectedOption)
};
const options = [
  { value: 'nyc', label: 'New York' },
  { value: 'sf', label: 'San Francisco' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'la', label: 'Los Angeles' },
  { value: 'seattle', label: 'Seattle' },
  { value: 'Portland', label: 'Portland' },
  { value: 'Miami', label: 'Miami' },
];
<Select
  placeholder='Custom placeholder...'
  onChange={onSelected}
  options={options}
  title={'Input Title (optional)'}
/>
```

```jsx
import { COLORS } from '../Colors'
const colourOptions = [{
  value: 'brandforest',
  label: 'Brand Forest',
  color: COLORS.BRAND_FOREST,
  isFixed: true
}, {
  value: 'salamander',
  label: 'Brand Salamander (Disabled)',
  color: COLORS.BRAND_SALAMANDER,
  isDisabled: true
}, {
  value: 'grayprimary',
  label: 'Gray Primary',
  color: COLORS.GRAY_PRIMARY,
}, {
  value: 'graystrokedisabled',
  label: 'Gray Stroke and Disabled',
  color: COLORS.GRAY_STROKE_AND_DISABLED,
}, {
  value: 'pink',
  label: 'Pink',
  color: 'pink'
}, {
  value: 'green',
  label: 'Green',
  color: 'green'
}, {
  value: 'red',
  label: 'Red',
  color: 'red'
}, {
  value: 'blue',
  label: 'Blue',
  color: 'blue',
}];

<Select
  defaultValue={[colourOptions[3]]}
  isMulti
  name="colors"
  options={colourOptions}
  menuIsOpen={true}
/>
```
