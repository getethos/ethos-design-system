```jsx
import { NumberInput } from './index.js';
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}
<NumberInput
  initialValue="123"
  name="the-number-input-example"
  allCaps={true} 
  labelCopy="Enter a number (must be even to validate)"
  data-tid='the-number-input'
  placeholder='number input'
  formChangeHandler={formChangeHandlerStub}
  validator={(n) => {
    return n % 2 === 0 ? '' : 'Must be an even number'
  }}
/>
