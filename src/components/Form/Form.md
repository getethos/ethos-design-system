```jsx
import validateExists from '../../validators/validateExists'
import validateMinMaxFactory from '../../validators/validateMinMax'
import EmailFormatValidator from '../../validators/EmailValidator'
import {
  TitleLarge,
  TextInput,
  Spacer,
  Button,
  InfoMessage,
  RadioButtonGroup,
  ZipInput,
  EmailInput,
} from '../index'

;<Form
  config={{
    formName: 'Styleguidist example form',
    autocompleteOff: true,
    formId: '1',
    fields: {
      shorterEvenNumTextInput: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [
          validateExists,
          validateMinMaxFactory.call(null, 3, 5),
        ],
        labelCopy:
          "Value's length is between 3 and 5 characters (validation after first form blur)",
      },
    },
    onSubmit: async (formData) => {
      console.log("In submit handler ... must have clicked 'Next'")
    },
  }}
>
  {(api) => {
    const {
      field,
      getFormErrorMessage,
      getFormIsValid,
      getFormInteractedWith,
    } = api

    const closedGetFormIsValid = getFormIsValid
    const previousClickHandler= (ev) => {
      console.log("In previous handler -- call to closedGetFormIsValid() returns: ", closedGetFormIsValid())
    }

    return (
      <div>
        <TitleLarge.Serif.Book500>Example Form</TitleLarge.Serif.Book500>

        <Spacer.H16 />

        {!!getFormInteractedWith() && (
          <>
            <InfoMessage.Alert.Success>
              {'Form interacted with.'}
            </InfoMessage.Alert.Success>
          </>
        )}

        {getFormErrorMessage() && (
          <>
            <InfoMessage.Alert.Error>
              {getFormErrorMessage()}
            </InfoMessage.Alert.Error>
          </>
        )}

        {field('shorterEvenNumTextInput')}
        <Spacer.H16 />

        <Button.Medium.Black disabled={!getFormIsValid()} onClick={previousClickHandler} name="previous">
          previous
        </Button.Medium.Black>
        
        <Button.Medium.Black disabled={!getFormIsValid()} name="next" type="submit">
          next
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```


```jsx
import validateExists from '../../validators/validateExists'
import validateMinMaxFactory from '../../validators/validateMinMax'
import EmailFormatValidator from '../../validators/EmailValidator'
import {
  TitleLarge,
  TextInput,
  Spacer,
  Button,
  InfoMessage,
  RadioButtonGroup,
  ZipInput,
  EmailInput,
} from '../index'
let count = 0

const READY_TODAY = `I'm ready today`
const NEXT_7_DAYS = 'In the next 7 days'
const IN_1_2_MONTHS = 'In 1 to 2 months'
const AFTER_3_MONTHS = 'After 3 months'

const IntentOptions = [
  {
    value: READY_TODAY,
    description: READY_TODAY,
  },
  {
    value: NEXT_7_DAYS,
    description: NEXT_7_DAYS,
  },
  {
    value: IN_1_2_MONTHS,
    description: IN_1_2_MONTHS,
  },
  {
    value: AFTER_3_MONTHS,
    description: AFTER_3_MONTHS,
  },
]

const validateCustom = (x) => {
  console.log('validateCustom got called...')
  return !!x ? '' : 'Validate custom error'
}

// This will only be called by the form engine after a field is
// validated and no errors were found (empty error messages string)
// Note that it's the consumer's responsibility to keep a table
// lookup or similar to prevent duplicate tracking of valid fields, etc.
const analyticsCustomEvent = (fieldName, fieldValue) => {
  console.log(
    'analyticsCustomEvent got called--field name: ',
    fieldName,
    'fieldValue: ',
    fieldValue,
    "--means no validation errors, so we'd likely call something like sendAnalyticsEvent(fieldName, fieldValue)"
  )
}

;<Form
  config={{
    formName: 'Styleguidist example form',
    autocompleteOff: true,
    formId: '1',
    fields: {
      zipCode: {
        component: (props, options) => {
          return <ZipInput {...props} />
        },
        validationSuccess: [analyticsCustomEvent],
        name: 'this-zip-input-example',
        labelCopy: 'What is your zip code?',
      },
      email: {
        component: (props, options) => {
          return <EmailInput {...props} placeholder="example@ethoslife.com" />
        },
        validators: [EmailFormatValidator],
        validationSuccess: [analyticsCustomEvent],
        name: 'the-email-input-example',
        labelCopy: 'Your email',
        tid: 'the-email-tid',
      },
      intent: {
        component: (props, opts) => {
          return (
            <RadioButtonGroup
              {...props}
              onChange={({ value }) => console.log(value)}
              options={opts.map((t) => ({
                name: t.value,
                value: t.value,
                label: t.description,
              }))}
            />
          )
        },
        name: 'intent',
        tid: 'radioGroup-tid',
        labelCopy: 'Radio Button Intent',
        validators: [validateExists],
        options: IntentOptions,
      },
      shorterEvenNumTextInput: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [
          validateExists,
          validateCustom,
          validateMinMaxFactory.call(null, 3, 5),
        ],
        validationSuccess: [analyticsCustomEvent],
        labelCopy:
          "Value's length is between 3 and 5 characters (validation after first form blur)",
      },
    },
    onSubmit: async (formData) => {
      if (count++ % 2 === 0) {
        throw new Error(
          'API Issue (Try again,, it alternates success & failure)'
        )
      } else {
        alert(
          'form submission successful with values:' + JSON.stringify(formData)
        )
      }
    },
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
        <TitleLarge.Serif.Book500>Example Form</TitleLarge.Serif.Book500>

        <Spacer.H16 />

        {!!getFormInteractedWith() && (
          <>
            <InfoMessage.Alert.Success>
              {'Form interacted with.'}
            </InfoMessage.Alert.Success>
          </>
        )}

        {getFormErrorMessage() && (
          <>
            <InfoMessage.Alert.Error>
              {getFormErrorMessage()}
            </InfoMessage.Alert.Error>
          </>
        )}

        {field('shorterEvenNumTextInput')}

        <Spacer.H16 />

        {field('intent')}

        <Spacer.H16 />

        {field('email')}

        <Spacer.H16 />

        {field('zipCode')}

        <Spacer.H16 />

        <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
          Submit
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```

_Note that we've set up the form submission to randomly fail or succeed—so, you're encouraged to resubmit until you've seen both!_

```jsx
import validateExists from '../../validators/validateExists'
import dayjs from '../../helpers/getDayjs.js'
import { validateMinMaxDateFactory } from '../../validators/BirthdateInputValidator'
import {
  TitleLarge,
  TextInput,
  TextMaskedInput,
  Spacer,
  Button,
  InfoMessage,
  TextAreaInput,
} from '../index'
import { ButtonSelectGroup } from '../Inputs/ButtonSelectGroup/ButtonSelectGroup'
import { BirthdateInput } from '../Inputs/BirthdateInput/BirthdateInput'
let count = 0

function validateIllegal(x) {
  console.log('validateIllegal: I got called...')
  return x === 'illegal' ? "That's an illegal option! Choose another." : ''
}

// This will only be called by the form engine after a field is
// validated and no errors were found (empty error messages string)
// Note that it's the consumer's responsibility to keep a table
// lookup or similar to prevent duplicate tracking of valid fields, etc.
const analyticsCustomEvent = (fieldName, fieldValue) => {
  console.log(
    'analyticsCustomEvent got called--field name: ',
    fieldName,
    'fieldValue: ',
    fieldValue,
    "--means no validation errors, so we'd likely call something like sendAnalyticsEvent(fieldName, fieldValue)"
  )
}

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

const minAge = 20
const maxAge = 65

;<Form
  config={{
    formName: 'Styleguidist example form',
    autocompleteOff: true,
    formId: '1',
    fields: {
      booleanGroup: {
        component: (props, options) => (
          <ButtonSelectGroup fullWidth={false} {...props}>
            {options.map((x) => (
              <ButtonSelectGroup.Option value={x.value} key={x.id}>
                {x.copy}
              </ButtonSelectGroup.Option>
            ))}
          </ButtonSelectGroup>
        ),
        labelCopy: 'Booleans Are Tricky -- false should count as valid here',
        validators: [validateExists],
        options: [
          { value: true, copy: 'True', id: 1 },
          { value: false, copy: 'False', id: 2 },
        ],
        tid: 'booleanGroup-tid',
      },
      birthdate: {
        component: (props, options) => {
          return <BirthdateInput {...props} />
        },
        // Note that Birthdate will only call these validators once it's own
        // internal validation passes e.g. there's a date string in valid format
        validators: [
          validateExists,
          validateMinMaxDateFactory({
            minAge,
            maxAge,
            minBirthdate: getMinBirthdateLga(maxAge),
            maxBirthdate: getMaxBirthdateLga(minAge),
            dateFormat: 'mm/dd/yyyy',
          }),
        ],
        validationSuccess: [analyticsCustomEvent],
        labelCopy: 'Must be between 20 and 65 years old',
      },
      optionalField: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        optional: true,
        labelCopy: 'Field marked optional true can be left blank and untouched',
        tid: 'optional-field-data-tid',
      },
      optionalFieldWithValidation: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [(val) => (val.length > 2 ? '2 chars max allowed' : '')],
        optional: true,
        labelCopy: 'optional with validation',
        tid: 'optional-validation-field-data-tid',
      },
      ssn: {
        component: (props, options) => {
          return (
            <TextMaskedInput
              placeholder="0000"
              mask={[/\d/, /\d/, /\d/, /\d/]}
              guide={true}
              keepCharPositions={true}
              type="text"
              name="last4-ssn"
              {...props}
            />
          )
        },
        labelCopy: 'Last 4 digits of SSN',
        tid: 'le-ssn',
        validators: [
          (value) =>
            value && value.length === 4 ? '' : 'Four digits required',
        ],
      },
      buttonGroup: {
        component: (props, options) => {
          return (
            <ButtonSelectGroup {...props} intialValue="often">
              {options.map((x, i) => (
                <ButtonSelectGroup.Option value={x.value} key={i}>
                  {x.copy}
                </ButtonSelectGroup.Option>
              ))}
            </ButtonSelectGroup>
          )
        },
        validators: [validateIllegal],
        validationSuccess: [analyticsCustomEvent],
        labelCopy: 'How often?',
        options: [
          { value: 'always', copy: 'Always' },
          { value: 'often', copy: 'Sometimes' },
          { value: 'never', copy: 'Never' },
          { value: 'illegal', copy: 'Illegal Option' },
        ],
      },
      optionalTextAreaField: {
        component: (props, options) => {
          return <TextAreaInput resize={true} {...props} />
        },
        optional: true,
        labelCopy: 'Optional textarea',
        tid: 'optional-textarea-field-data-tid',
      },
    },
    onSubmit: async (formData) => {
      if (count++ % 2 === 0) {
        throw new Error(
          'API Issue (Try again,, it alternates success & failure)'
        )
      } else {
        alert(
          'form submission successful with values:' + JSON.stringify(formData)
        )
      }
    },
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
          Example Complex Form
        </TitleLarge.Serif.Book500>

        <Spacer.H16 />

        {!!getFormInteractedWith() && (
          <>
            <InfoMessage.Alert.Success>
              {'Form interacted with.'}
            </InfoMessage.Alert.Success>
          </>
        )}

        {getFormErrorMessage() && (
          <>
            <InfoMessage.Alert.Error>
              {getFormErrorMessage()}
            </InfoMessage.Alert.Error>
          </>
        )}

        {field('buttonGroup')}

        <Spacer.H16 />

        {field('birthdate')}

        <Spacer.H16 />

        {field('optionalField')}

        <Spacer.H16 />

        {field('optionalFieldWithValidation')}

        <Spacer.H16 />

        {field('optionalTextAreaField')}

        <Spacer.H16 />

        {field('ssn')}

        <Spacer.H16 />

        {field('booleanGroup')}

        <Spacer.H16 />

        <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
          Submit
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```
