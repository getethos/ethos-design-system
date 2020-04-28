Button on the right side and disabled:

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

Button on the left side and enabled:

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
  iconPrefix="far"
  side="left"
  onClick={(ev) => console.log('NoraButtonInput onclick called with: ', ev)}
  validator={(x) => {
    const truthyErr = validateExists(x)
    if (!!truthyErr) return truthyErr
    const minMaxErr = validateMinMaxFactory(5, 20)(x)
    if (!!minMaxErr) return minMaxErr
    return x.length % 2 ? 'Text does not have an even number of characters' : ''
  }}
></NoraButtonInput>
```
