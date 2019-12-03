The BirthdateInput takes a validator, but will also internally validate that the
date string corresponds with `dateFormat` (once the field has been `touched` similar
to [redux-form](https://redux-form.com/8.2.2/docs/api/field.md/#2-a-stateless-function))

Important to note that `getMinBirthdate` should take the argument of `maximumEligibleAge` and
`getMaxBirthdate` takes the argument of `minimumEligibleAge`

```jsx
import { validateMinMaxDateFactory } from '../../validators/BirthdateInputValidator'
import dayjs from '../../helpers/getDayjs.js'

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

// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<BirthdateInput
  name="birthDate"
  labelCopy="Birthdate"
  allCaps={true}
  data-tid="the-birthdate-input"
  formChangeHandler={formChangeHandlerStub}
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

This one sets an `intialValue` which results in the field being considered as
already `touched`. This means you do not have to `blur` for field hint error
messages to appear.

```jsx
import { validateMinMaxDateFactory } from '../../validators/BirthdateInputValidator'
import dayjs from '../../helpers/getDayjs.js'

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

// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<BirthdateInput
  initialValue="09/12/"
  name="birthDate"
  labelCopy="Birthdate"
  allCaps={true}
  data-tid="the-birthdate-input"
  formChangeHandler={formChangeHandlerStub}
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

BirthdateInput used as a single field form that's prefilled

```jsx
import validateExists from '../../validators/validateExists'

import {
  TitleLarge,
  Form,
  Spacer,
  Button,
  InfoMessage,
} from '../index'

;<Form
  config={{
    formName: 'Prefilled w/Birthdate',
    formId: '1',
    fields: {
      birthdate: {
        component: (props, options) => {
          return (
            <BirthdateInput
              initialValue='08/19/2019'
              {...props}
            />
          )
        },
        labelCopy: ' ',
        tid: 'birthdate-prefilled-tid',
        validators: [validateExists],
      },
    },
    onSubmit: async (formData) => {},
  }}
>
  {(api) => {
    const {
      field,
      getFormErrorMessage,
      getFormIsValid,
      getFormInteractedWith,
    } = api
    return (
      <div>
        <TitleLarge.Serif.Book500>
          Example Birthdate Prefilled
        </TitleLarge.Serif.Book500>

        <Spacer.H16 />

        {field('birthdate')}

        <Spacer.H16 />

        <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
          Continue
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```
