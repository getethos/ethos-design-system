```
const enterHandler = (value) => {
  console.log('SearchInput consumer\'s enterHandler called with: ', value) 
}
<SearchInput
  onEnter={enterHandler}
  data-tid="search-input-tid"
  name="search-input" />
```