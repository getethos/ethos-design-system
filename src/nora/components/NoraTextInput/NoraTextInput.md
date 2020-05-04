```jsx
import validateMinMaxFactory from '../../../validators/validateMinMax'
import validateExists from '../../../validators/validateExists'
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<NoraTextInput
  name="example"
  data-tid="the-text-input"
  formChangeHandler={formChangeHandlerStub}
  validator={(x) => {
    const truthyErr = validateExists(x)
    if (!!truthyErr) return truthyErr
    const minMaxErr = validateMinMaxFactory(5, 20)(x)
    if (!!minMaxErr) return minMaxErr
    return x.length % 2 ? 'Text does not have an even number of characters' : ''
  }}
/>
```
