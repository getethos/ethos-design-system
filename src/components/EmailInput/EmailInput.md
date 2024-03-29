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

labelWeight, labelColor and more!
classOverrides is typically a string of tailwind styles, implemented by the consumer of the component:

```jsx
import EmailFormatValidator from '../../validators/EmailValidator'
import { EmailInput } from './index.js'
import { COLORS } from '../Colors.js'
const formChangeHandlerStub = () => {}
;<EmailInput
  name="the-email-input-example"
  allCaps={false}
  labelCopy="Email address"
  labelColor={COLORS.GRAY_SECONDARY}
  labelWeight="regular"
  data-tid="floating-email-input"
  classOverrides="bg-gray-1 rounded-sm border-none"
  validator={EmailFormatValidator}
  formChangeHandler={formChangeHandlerStub}
/>
```

This one sets a `solid lock icon`. Currently allowed icons are defined by VALID_ICONS at src/helpers/constants.js.
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
  icon="lock"
/>
```

This one sets a `regular eye-slash icon`. Currently allowed icons are defined by VALID_ICONS at src/helpers/constants.js.
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
  icon="eye_slash"
/>
```


This one sets a random/invalid input for icon, which results in the email input with NO icon. Currently allowed icons are defined by VALID_ICONS at src/helpers/constants.js
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
  icon="4dsagag"
/>
```