```jsx
// formChangeHandler gets wired up automatically if using <Form /> component
import validateExists from '../../../validators/validateExists'
const formChangeHandlerStub = () => {}
;<CheckboxInput
  name="le-check-unchecked"
  data-tid="le-tid-unchecked"
  formChangeHandler={formChangeHandlerStub}
  validator={validateExists}
>
  I agree to the{' '}
  <a href="/" target="_blank">
    Agreement
  </a>{' '}
  , and the{' '}
  <a href="/" target="_blank">
    Other Agreement
  </a>
</CheckboxInput>
```

Set to checked and disabled immediately:

```jsx
<CheckboxInput
  initialValue={true}
  name="le-check2"
  disabled={true}
  data-tid="le-tid2"
>
  I answered for you...mwa ha ha. I agree to the{' '}
  <a href="/" target="_blank">
    Agreement
  </a>
</CheckboxInput>
```

This one sets an `intialValue` which results in the field being considered as
already `touched`. This means you do not have to `blur` for field hint error
messages to appear. _Note, you can think of initialValue as "checked" if that
helps—true results in a checked checkbox, false results in unchecked._

```jsx
import validateExists from '../../../validators/validateExists'
const formChangeHandlerStub = () => {}

;<CheckboxInput
  initialValue={true}
  name="le-check3"
  data-tid="le-tid-checked"
  formChangeHandler={formChangeHandlerStub}
  validator={validateExists}
>
  I agree to the{' '}
  <a href="/" target="_blank">
    Agreement
  </a>
</CheckboxInput>
```
