The BirthdateInput takes a validator, but will also internally validate that the
date string corresponds with `dateFormat` (once the field has been `touched` similar
to [redux-form](https://redux-form.com/8.2.2/docs/api/field.md/#2-a-stateless-function))

```jsx
import { getMinMaxDateValidator } from './BirthdateInputValidator.js'
;<BirthdateInput
  name="birthDate"
  allCaps={true}
  labelCopy="Birthdate"
  data-tid="the-birthdate-input"
  minAge={20}
  maxAge={65}
  validator={(value) => {
    return getMinMaxDateValidator({
      minAge: 20,
      maxAge: 65,
      dateFormat: 'mm/dd/yyyy',
    })(value)
  }}
/>
```

```jsx
<BirthdateInput
  name="birthDate"
  allCaps={true}
  labelCopy="Birthdate"
  data-tid="the-birthdate-input"
  minAge={20}
  maxAge={65}
  forcedErrorMessage="Forced"
  validator={(value) => {}}
/>
```
