Search Input is a simple primitive. Please also see `AsyncTypeahead`.

```
const handleOnChange = (ev) => {
  console.log('SearchInput consumer\'s handleOnChange called with: ', ev.target.value)
}
<SearchInput
  onChange={handleOnChange}
  data-tid="search-input-tid"
  name="search-input"
/>
```

Compact

```
const handleOnChange = (ev) => {
  console.log('SearchInput consumer\'s handleOnChange called with: ', ev.target.value)
}
<SearchInput
  onChange={handleOnChange}
  data-tid="search-input-tid"
  name="search-input"
  compact />
```
