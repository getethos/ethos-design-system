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
