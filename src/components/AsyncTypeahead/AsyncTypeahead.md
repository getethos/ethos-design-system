```jsx
import { useState } from 'react'
const API = 'http://restcountries.eu/rest/v2/name/'
const [location, setLocation] = useState({})
import { SearchInput } from '../index'

const getLocations = (name) => {
  return fetch(`${API}${name || 'a'}`, {
    params: { fields: 'name' },
  })
}

const handleOnChange = (value) => {
  console.log('Example handleOnChange called w/val: ', value)
  setLocation(value)
}

;<AsyncTypeahead
  renderInput={SearchInput}
  minChars={2}
  // The restcountries.eu schema puts the dropdown options
  // displayable field in `name` as in `item.name`
  dataKey="name"
  value={location}
  onChange={handleOnChange}
  placeholder="Find locations..."
  fetchCallback={getLocations}
/>
```
