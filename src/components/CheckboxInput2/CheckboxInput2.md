```jsx
// formChangeHandler gets wired up automatically if using <Form /> component
import validateExists from '../../validators/validateExists'
const formChangeHandlerStub = () => {}
;<CheckboxInput2
  name="le-check-unchecked"
  data-tid="le-tid-unchecked"
  formChangeHandler={formChangeHandlerStub}
  validator={(n) => {
    // We only will accept the value of true!
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
</CheckboxInput2>
```

Set to checked and disabled immediately:

```jsx
<CheckboxInput2
  initialValue={true}
  name="le-check2"
  disabled={true}
  data-tid="le-tid2"
>
  I answered for you...mwa ha ha. I agree to the{' '}
  <a href="/" target="_blank">
    Agreement
  </a>
</CheckboxInput2>
```

This one sets an `intialValue` which results in the field being considered as
already `touched`. This means you do not have to `blur` for field hint error
messages to appear. _Note, you can think of initialValue as "checked" if that
helps—true results in a checked checkbox, false results in unchecked._

```jsx
import validateExists from '../../validators/validateExists'
const formChangeHandlerStub = () => {}

;<CheckboxInput2
  initialValue={true}
  name="le-check3"
  data-tid="le-tid-checked"
  formChangeHandler={formChangeHandlerStub}
  validator={(n) => {
    // We only will accept the value of true!
    if (n === true) {
      return ''
    }
    return 'You must agree to submit form'
  }}
>
  I agree to the{' '}
  <a href="/" target="_blank">
    Agreement
  </a>
</CheckboxInput2>
```

Multiple example

```jsx
;<div>
  <CheckboxInput2
    name="stacked-1"
    validator={(n) => {
      // We only will accept the value of true!
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
  </CheckboxInput2>
  <div style={{ marginBottom: '10px' }} />
  <CheckboxInput2 name="stacked-2">Default</CheckboxInput2>
  <div style={{ marginBottom: '10px' }} />
  <CheckboxInput2
    name="stacked-3"
    tooltip={{ label: 'label', details: 'details' }}
  >
    With tooltip
  </CheckboxInput2>
  <div style={{ marginBottom: '10px' }} />
  <CheckboxInput2 name="stacked-4" variant="textonly">
    With no checkbox
  </CheckboxInput2>
  <div style={{ marginBottom: '10px' }} />
  <CheckboxInput2
    name="stacked-5"
    variant="textonly"
    tooltip={{ label: 'label', details: 'details' }}
  >
    With no checkbox and tooltip
  </CheckboxInput2>
</div>
```
