```jsx
import { EmailFormatValidator } from '../../../validators/EmailValidator'
import { EmailInput } from './index.js'
const formChangeHandlerStub = () => {}
;<EmailInput
  name="the-email-input-example"
  allCaps={true}
  labelCopy="Your email"
  data-tid="the-email-input"
  placeholder="example@ethoslife.com"
  formChangeHandler={formChangeHandlerStub}
/>
```
