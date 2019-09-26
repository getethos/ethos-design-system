```jsx
import validateMinMaxFactory from '../../../validators/validateMinMax'
;<TextInput
  name="example"
  labelCopy="Validation happens after first blur ('touched')—Value's length % 2"
  data-tid="the-text-input"
  validator={(x) => {
    const minMaxErr = validateMinMaxFactory(5, 20)(x)
    if (!!minMaxErr) return minMaxErr
    return x.length % 2 ? 'Text does not have an even number of characters' : ''
  }}
/>
```
