We leverage [React-Select]() for our single and multi selects. For example, you can add
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
];
<Select
  placeholder='Custom placeholder...'
  onChange={onSelected}
  options={options}
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
}];

<Select
  defaultValue={[colourOptions[3]]}
  isMulti
  name="colors"
  options={colourOptions}
/>
```
