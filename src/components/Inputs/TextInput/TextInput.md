```jsx
import validateMinMaxFactory from '../../../validators/validateMinMax'
import validateTruthy from '../../../validators/validateTruthy'
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<TextInput
  name="example"
  labelCopy="Validation happens after first blur ('touched')—Value's length % 2"
  data-tid="the-text-input"
  formChangeHandler={formChangeHandlerStub}
  validator={(x) => {
    const truthyErr = validateTruthy(x)
    if (!!truthyErr) return truthyErr
    const minMaxErr = validateMinMaxFactory(5, 20)(x)
    if (!!minMaxErr) return minMaxErr
    return x.length % 2 ? 'Text does not have an even number of characters' : ''
  }}
/>
```
