```jsx
import EmailFormatValidator from '../../validators/EmailValidator'
import { EmailInput } from './index.js'
const formChangeHandlerStub = () => {}
;<EmailInput
  name="the-email-input-example"
  allCaps={true}
  labelCopy="Your email"
  data-tid="the-email-input"
  placeholder="example@ethoslife.com"
  validator={EmailFormatValidator}
  formChangeHandler={formChangeHandlerStub}
/>
```

In the case where someone is returning to a form and you already have their email (i.e. editing a profile page), you can set `initialValue` which will prepopulate the form.

```jsx
import EmailFormatValidator from '../../validators/EmailValidator'
import { EmailInput } from './index.js'
const formChangeHandlerStub = () => {}
;<EmailInput
  name="the-email-input-example"
  allCaps={true}
  labelCopy="Your email"
  initialValue="rob@ethoslife.com"
  data-tid="the-email-input"
  placeholder="example@ethoslife.com"
  validator={EmailFormatValidator}
  formChangeHandler={formChangeHandlerStub}
/>
```
