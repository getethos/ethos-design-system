The `ZipInput` takes an optional `validator`, but does prevalidatiiin via the `ZipInputValidator` which validates a valid zip format.
```jsx
import { ZipInput } from './index.js';
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}
<ZipInput
  name="this-zip-input-example"
  allCaps={true} 
  labelCopy="What is your zip code?"
  data-tid='the-zip-input'
  formChangeHandler={formChangeHandlerStub}
  validator={(zip) => {
    console.log('ZipInput prevalidates valid zipCode, so we\'d only do this if we wanted to add additional validation')
    return ''
  }}
/>
```

This one sets an `intialValue` which results in the field being considered as
already `touched`. This means you do not have to `blur` for field hint error
messages to appear.

```jsx
import { ZipInput } from './index.js';
const formChangeHandlerStub = () => {}
<ZipInput
  initialValue="94544"
  name="this-zip-input-example2"
  allCaps={true}
  labelCopy="What is your zip code?"
  data-tid='the-zip-input2'
  formChangeHandler={formChangeHandlerStub}
  validator={(zip) => {
    console.log('ZipInput prevalidates valid zipCode, so we\'d only do this if we wanted to add additional validation')
    return ''
  }}
/>
```
