```jsx
import { TestFormWrapper } from './TestFormWrapper.js'
import validateTruthy from '../../validators/validateTruthy'
import {
  TitleLarge,
  TextInput,
  Spacer,
  Button,
  InfoMessage,
  ZipInput,
} from '../index'

const questionGroups = [
  {
    one: {
      component: (props, options) => {
        return <TextInput {...props} />
      },
      validators: [(x) => (x === 'a' ? '' : 'Must be a')],
      labelCopy: 'Validator: value must be "a"',
      tid: 'example-data-tid',
    },
  },
  {
    two: {
      component: (props, options) => {
        return <TextInput {...props} />
      },
      validators: [(x) => (x === 'a' ? '' : 'Must be a')],
      labelCopy: 'Validator: value must be "a" again',
      tid: 'example-data-tid',
    },
  },
]

const questionNames = ['one', 'two'] // same as keys in questionGroups

;<TestFormWrapper>
  {({ count, setCount }) => {
    const form = (
      <Form
        config={{
          formName: 'Styleguidist example form',
          formId: '1',
          autocompleteOff: true,
          fields: questionGroups[count],
          onSubmit: async (formData) => {
            if (count === 0) {
              // Go to the next set of questions
              setCount(count + 1)
            } else {
              // Submit the form -- it will actually still have formData
              // from the first set of questions, too
              alert(
                'form submission successful with values:' +
                  JSON.stringify(formData)
              )
            }
          },
        }}
      >
        {(api) => {
          const {
            field,
            getFormIsValid,
            debugEntireFormState, // REMOVE
          } = api
          return (
            <div>
              <TitleLarge.Serif.Book500>
                Form with dynamically changing questions. Form #{count}
              </TitleLarge.Serif.Book500>

              <Spacer.H16 />

              {field(questionNames[count])}

              <Spacer.H16 />

              <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
                Submit
              </Button.Medium.Black>
              <div>
                <code>
                  {' '}
                  fieldErrorsState:{' '}
                  {JSON.stringify(debugEntireFormState().fieldErrorsState)}{' '}
                </code>
              </div>
              <div>
                <code>
                  {' '}
                  fieldValuesState:{' '}
                  {JSON.stringify(debugEntireFormState().fieldValuesState)}{' '}
                </code>
              </div>
              <div>
                <code>
                  formErrorState:{' '}
                  {JSON.stringify(debugEntireFormState().formErrorState)}{' '}
                </code>
              </div>
            </div>
          )
        }}
      </Form>
    )

    switch (count) {
      case 0:
        return form
      case 1:
        return <div>{form}</div>
    }
    if (count === 0) {
      return <div>{form}</div>
    } else if (count === 0) return
  }}
</TestFormWrapper>
```

```jsx
import validateTruthy from '../../validators/validateTruthy'
import validateMinMaxFactory from '../../validators/validateMinMax'
import {
  TitleLarge,
  TextInput,
  Spacer,
  Button,
  InfoMessage,
  ZipInput,
} from '../index'
let count = 0

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
      evenNumText: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [
          validateTruthy,
          validateCustom,
          validateMinMaxFactory.call(null, 5, 7),
        ],
        validationSuccess: [analyticsCustomEvent],
        labelCopy:
          "Validation happens after first blur ('touched')     Value's length is between 5 and 7 characters",
        tid: 'example-data-tid',
      },
      shorterEvenNumTextInput: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [
          validateTruthy,
          validateCustom,
          validateMinMaxFactory.call(null, 3, 5),
        ],
        validationSuccess: [analyticsCustomEvent],
        labelCopy:
          "Validation happens after first blur ('touched')     Value's length is between 3 and 5 characters",
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

        {field('evenNumText')}

        <Spacer.H16 />

        {field('shorterEvenNumTextInput')}

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
import validateTruthy from '../../validators/validateTruthy'
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
        labelCopy: 'Booleans Are Tricky',
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
          validateTruthy,
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

```jsx
import validateTruthy from '../../validators/validateTruthy'
import {
  TitleLarge,
  TextInput,
  Spacer,
  Button,
  InfoMessage,
  ZipInput,
} from '../index'
;<Form
  config={{
    formName: 'Styleguidist example form',
    autocompleteOff: true,
    formId: '1',
    fields: {
      anything: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [validateTruthy],
        labelCopy: 'Validator: `validateTruthy`',
        tid: 'example-data-tid',
      },
      noValidator: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        labelCopy: 'No validators supplied',
        tid: 'example-data-tid',
      },
    },
    onSubmit: async (formData) => {
      alert(
        'form submission successful with values:' + JSON.stringify(formData)
      )
    },
  }}
>
  {(api) => {
    const { field, getFormIsValid } = api
    return (
      <div>
        <TitleLarge.Serif.Book500>
          Form with a field without a validator (Possibly bad)
        </TitleLarge.Serif.Book500>

        <Spacer.H16 />

        {field('anything')}

        <Spacer.H16 />

        {field('noValidator')}

        <Spacer.H16 />

        <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
          Submit
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```

```jsx
import validateTruthy from '../../validators/validateTruthy'
import {
  TitleLarge,
  TextInput,
  Spacer,
  Button,
  InfoMessage,
  ZipInput,
} from '../index'
;<Form
  config={{
    formName: 'Styleguidist example form',
    autocompleteOff: true,
    formId: '1',
    fields: {
      anything: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [validateTruthy],
        labelCopy: 'Validator: `validateTruthy`',
        tid: 'example-data-tid',
      },
      noValidator: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        labelCopy: 'No validators supplied',
        tid: 'example-data-tid',
      },
    },
    onSubmit: async (formData) => {
      alert(
        'form submission successful with values:' + JSON.stringify(formData)
      )
    },
  }}
>
  {(api) => {
    const { field, getFormIsValid } = api
    return (
      <div>
        <TitleLarge.Serif.Book500>
          Form with a field without a validator (Possibly bad)
        </TitleLarge.Serif.Book500>

        <Spacer.H16 />

        {field('anything')}

        <Spacer.H16 />

        {field('noValidator')}

        <Spacer.H16 />

        <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
          Submit
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```
