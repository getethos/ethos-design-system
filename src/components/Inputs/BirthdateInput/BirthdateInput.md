The BirthdateInput takes a validator, but will also internally validate that the
date string corresponds with `dateFormat` (once the field has been `touched` similar
to [redux-form](https://redux-form.com/8.2.2/docs/api/field.md/#2-a-stateless-function))

Important to note that `getMinBirthdate` should take the argument of `maximumEligibleAge` and
`getMaxBirthdate` takes the argument of `minimumEligibleAge`

```jsx
import { validateMinMaxDateFactory } from '../../../validators/BirthdateInputValidator'
import dayjs from '../../../helpers/getDayjs.js'

const minimumEligibleAge = 20
const maximumEligibleAge = 65

const getMinBirthdateLga = (maxAge) => {
  // Max age determines the earliest (minimum) allowable birthdate
  const minBirthdate = dayjs()
    .subtract(maxAge, 'years')
    .subtract(6, 'months')
    .add(1, 'days')
    .startOf('day')
    .toDate()
  return minBirthdate
}

const getMaxBirthdateLga = (minAge) => {
  // Min age determines the latest (maximum) allowable birthdate
  const maxBirthdate = dayjs()
    .subtract(minAge, 'years')
    .add(6, 'months')
    .subtract(1, 'day')
    .endOf('day')
    .toDate()
  return maxBirthdate
}

;<BirthdateInput
  name="birthDate"
  labelCopy="Birthdate"
  data-tid="the-birthdate-input"
  validator={(value) => {
    return validateMinMaxDateFactory({
      minAge: minimumEligibleAge,
      maxAge: maximumEligibleAge,
      minBirthdate: getMinBirthdateLga(maximumEligibleAge),
      maxBirthdate: getMaxBirthdateLga(minimumEligibleAge),
      dateFormat: 'mm/dd/yyyy',
    })(value)
  }}
/>
```
