`NoraCheckboxInput` is a simple wrapper component over `CheckboxInput`
that accounts for the generally smaller font sizes we use in Nora.

```jsx
<NoraCheckboxInput
  name="le-check-unchecked"
  data-tid="le-tid-unchecked"
  validator={(n) => {
    console.log('yo yo')
    if (n === true) {
      return ''
    }
    return 'You must agree to submit form'
  }}
>
  I agree to the{' '}
  <a href="/" target="_blank">
    Agreement
  </a>{' '}
  , and the{' '}
  <a href="/" target="_blank">
    Other Agreement
  </a>
</NoraCheckboxInput>
```

Example with one checkbox setting the value of another

```jsx
import React, { useState } from 'react'

function NoraCheckboxExample() {

  const [labSelected, setLabSelected] = useState(true);
  const [ceaSelected, setCeaSelected] = useState(false);

  // Instead of a validator setting the state of the labs, we can also consider disabling the checkbox if one of the children are selected
  return (
    <>
      <NoraCheckboxInput
        name="labs"
        data-tid="labs-checkbox"
        initialValue={labSelected}
        validator={(val) => {
          if (val === false && ceaSelected === true) {
            setLabSelected(true);
          }
          return ''
        }}
      >
        Labs
        <NoraCheckboxInput
          name="cea"
          data-tid="cea-checkbox"
          initialValue={ceaSelected}
          validator={(val) => {
            setCeaSelected(val);
            if (val === true) {
              setLabSelected(true)
            }
            return ''
          }}
        >
          CEA
        </NoraCheckboxInput>
      </NoraCheckboxInput>
    </>
  )
}

<NoraCheckboxExample />
```
