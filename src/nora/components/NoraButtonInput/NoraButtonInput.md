```jsx
import validateMinMaxFactory from '../../../validators/validateMinMax'
import validateExists from '../../../validators/validateExists'
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<NoraButtonInput
  name="example"
  data-tid="the-button-input"
  formChangeHandler={formChangeHandlerStub}
  buttonDisabled
  iconName="trash-alt"
  iconPrefix="far"
  side="right"
  validator={(x) => {
    const truthyErr = validateExists(x)
    if (!!truthyErr) return truthyErr
    const minMaxErr = validateMinMaxFactory(5, 20)(x)
    if (!!minMaxErr) return minMaxErr
    return x.length % 2 ? 'Text does not have an even number of characters' : ''
  }}
></NoraButtonInput>
```

```jsx
import validateMinMaxFactory from '../../../validators/validateMinMax'
import validateExists from '../../../validators/validateExists'
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<NoraButtonInput
  name="example"
  data-tid="the-button-input"
  formChangeHandler={formChangeHandlerStub}
  iconName="trash-alt"
  buttonDisabled
  iconPrefix="far"
  side="left"
  validator={(x) => {
    const truthyErr = validateExists(x)
    if (!!truthyErr) return truthyErr
    const minMaxErr = validateMinMaxFactory(5, 20)(x)
    if (!!minMaxErr) return minMaxErr
    return x.length % 2 ? 'Text does not have an even number of characters' : ''
  }}
></NoraButtonInput>
```
