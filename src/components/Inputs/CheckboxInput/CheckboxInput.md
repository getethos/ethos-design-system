```jsx
// formChangeHandler gets wired up automatically if using <Form /> component
import validateTruthy from '../../../validators/validateTruthy'
const formChangeHandlerStub = () => {}
<CheckboxInput
  name="le-check"
  data-tid="le-tid"
  formChangeHandler={formChangeHandlerStub}
  validator={(x) => {
    const truthyErr = validateTruthy(x)
    if (!!truthyErr) return truthyErr
    return ''
  }}
>
  I agree to the{' '}
  <a href="/" target="_blank">
    Agreement
  </a>
  {' '}, and the{' '}
  <a href="/" target="_blank">
    Other Agreement
  </a>
</CheckboxInput>
```

Set to checked and disabled immediately:
```jsx
<CheckboxInput
  checked={true}
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


Setting to `checked` should have similar behavior as `TextInput`'s when you set an `intialValue`, in that
it resulsts in the field being considered as already `touched`. This means you do not have to `blur` for
field hint error messages to appear. Try unchecking and it should immediately display the error message.

```jsx
import validateTruthy from '../../../validators/validateTruthy'
const formChangeHandlerStub = () => {}

<CheckboxInput
  checked={true}
  name="le-check2"
  data-tid="le-tid2"
  formChangeHandler={formChangeHandlerStub}
  validator={(x) => {
    const truthyErr = validateTruthy(x)
    if (!!truthyErr) return truthyErr
    return ''
  }}
>
  I agree to the{' '}
  <a href="/" target="_blank">
    Agreement
  </a>
</CheckboxInput>
```
