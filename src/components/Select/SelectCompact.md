We leverage [React-Select](https://github.com/JedWatson/react-select) for our single and multi selects. For example, you can add
`menuIsOpen={true}` below as an attribute to `<Select>` and the menu will remain open.

```jsx
const onSelected = (selectedOption) => {
  console.log('Option selected: ', selectedOption)
}
const options = [
  { value: 'nyc', label: 'New York' },
  { value: 'sf', label: 'San Francisco' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'la', label: 'Los Angeles' },
  { value: 'seattle', label: 'Seattle' },
  { value: 'Portland', label: 'Portland' },
  { value: 'Miami', label: 'Miami' },
]
;<SelectCompact
  placeholder="Custom placeholder..."
  onChange={onSelected}
  options={options}
  className="StyledReactSelect-Compact"
/>
```
