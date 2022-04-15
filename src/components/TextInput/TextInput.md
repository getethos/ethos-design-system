```jsx
import validateMinMaxFactory from '../../validators/validateMinMax'
import validateExists from '../../validators/validateExists'
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<TextInput
  name="example"
  labelCopy="Validation happens after first blur ('touched')—Value's length % 2"
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

This one sets an `intialValue` which results in the field being considered as
already `touched`. This means you do not have to `blur` for field hint error
messages to appear.

```jsx
import validateMinMaxFactory from '../../validators/validateMinMax'
import validateExists from '../../validators/validateExists'
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<TextInput
  initialValue="hi"
  name="example"
  labelCopy="Validation happens after first blur ('touched')—Value's length % 2"
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

This one sets a `solid lock icon`. Currently allowed icons are defined by VALID_ICONS at src/helpers/constants.js.

```jsx
import validateMinMaxFactory from '../../validators/validateMinMax'
import validateExists from '../../validators/validateExists'
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<TextInput
  name="example"
  labelCopy="Validation happens after first blur ('touched')—Value's length % 2"
  data-tid="the-text-input"
  formChangeHandler={formChangeHandlerStub}
  validator={(x) => {
    const truthyErr = validateExists(x)
    if (!!truthyErr) return truthyErr
    const minMaxErr = validateMinMaxFactory(5, 20)(x)
    if (!!minMaxErr) return minMaxErr
    return x.length % 2 ? 'Text does not have an even number of characters' : ''
  }}
  icon='lock'
/>
```

This one sets a `regular eye-slash icon`. Currently allowed icons are defined by VALID_ICONS at src/helpers/constants.js.

```jsx
import validateMinMaxFactory from '../../validators/validateMinMax'
import validateExists from '../../validators/validateExists'
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<TextInput
  name="example"
  labelCopy="Validation happens after first blur ('touched')—Value's length % 2"
  data-tid="the-text-input"
  formChangeHandler={formChangeHandlerStub}
  validator={(x) => {
    const truthyErr = validateExists(x)
    if (!!truthyErr) return truthyErr
    const minMaxErr = validateMinMaxFactory(5, 20)(x)
    if (!!minMaxErr) return minMaxErr
    return x.length % 2 ? 'Text does not have an even number of characters' : ''
  }}
  icon='eye_slash'
/>
```

This one sets a random/invalid input for icon, which results in the text input with NO icon. Currently allowed icons are defined by VALID_ICONS at src/helpers/constants.js

```jsx
import validateMinMaxFactory from '../../validators/validateMinMax'
import validateExists from '../../validators/validateExists'
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<TextInput
  name="example"
  labelCopy="Validation happens after first blur ('touched')—Value's length % 2"
  data-tid="the-text-input"
  formChangeHandler={formChangeHandlerStub}
  validator={(x) => {
    const truthyErr = validateExists(x)
    if (!!truthyErr) return truthyErr
    const minMaxErr = validateMinMaxFactory(5, 20)(x)
    if (!!minMaxErr) return minMaxErr
    return x.length % 2 ? 'Text does not have an even number of characters' : ''
  }}
  icon='notallowed'
/>
```
