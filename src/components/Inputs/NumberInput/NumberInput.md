```jsx
import { NumberInput } from './index.js';
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}
;<NumberInput
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
```

You may use your own mask and we suggest you leverage the `text-mask-addons` library for doing so.

```jsx
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import { NumberInput } from './index.js';
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

const dollarMaskFunction = createNumberMask({
  allowDecimal: false,
  allowLeadingZeroes: false,
  guide: false,
  includeThousandsSeparator: true,
  prefix: '$',
})

;<NumberInput
  mask={dollarMaskFunction}
  name="dollar-input-example"
  allCaps={true}
  labelCopy="Enter a number (must be even to validate)"
  data-tid='dollar-number-input'
  placeholder='Dollar via number input...'
  formChangeHandler={formChangeHandlerStub}
  validator={(n) => {
    return n > 0 && n < 100000 ? '' : 'Must be less then $100,000'
  }}
/>
```
