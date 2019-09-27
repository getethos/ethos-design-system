```jsx
import validateMinMaxFactory from '../../../validators/validateMinMax'
import validateTruthy from '../../../validators/validateTruthy'
;<TextInput
  name="example"
  labelCopy="Validation happens after first blur ('touched')—Value's length % 2"
  data-tid="the-text-input"
  validator={(x) => {
    const truthyErr = validateTruthy(x)
    if (!!truthyErr) return truthyErr
    const minMaxErr = validateMinMaxFactory(5, 20)(x)
    if (!!minMaxErr) return minMaxErr
    return x.length % 2 ? 'Text does not have an even number of characters' : ''
  }}
/>
```
