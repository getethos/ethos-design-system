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
