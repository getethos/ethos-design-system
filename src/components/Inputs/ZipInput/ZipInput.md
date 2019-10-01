The `ZipInput` takes a `validator`, and `ZipInputValidator` gives you validation for valid zip format. You can pass that directly, or, wrap it
for any custom or additional logic you may wish to use.
```jsx
import { ZipInput, ZipInputValidator } from './index.js';
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}
<ZipInput
  name="this-zip-input-example"
  allCaps={true} 
  labelCopy="What is your zip code?"
  data-tid='the-zip-input'
  formChangeHandler={formChangeHandlerStub}
  validator={(zip) => {
    const errors = ZipInputValidator(zip)
    // More custom logic here should you wish
    return errors
  }}
/>
```
