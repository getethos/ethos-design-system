The BirthdateInput takes a validator, but will also internally validate that the
date string corresponds with `dateFormat` (once the field has been `touched` similar
to [redux-form](https://redux-form.com/8.2.2/docs/api/field.md/#2-a-stateless-function))

```jsx
import { validateMinMaxDateFactory } from '../../../validators/BirthdateInputValidator'
;<BirthdateInput
  name="birthDate"
  labelCopy="Birthdate"
  data-tid="the-birthdate-input"
  validator={(value) => {
    return validateMinMaxDateFactory({
      minAge: 20,
      maxAge: 65,
      dateFormat: 'mm/dd/yyyy',
    })(value)
  }}
/>
```
