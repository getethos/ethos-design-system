## Prefilled forms

This form starts completely _prefilled_. By this, we mean that each field has been configured
with an `initializeValue` (and they all happen to be valid values so the submit button is
enabled immediately).

Note that a field the gets an `initialValue` will do two things:

1. mark itself as "touched" (aka blurred)
1. do validation—this results in the form state being updated per the validity of the `initialValue` passed in

Try changing one of the `initialValue` values to something invalid e.g. for the zip switch
it from `initialValue="94544"` to an invalid zip value of: `initialValue="9454"`. You should
notice that the submit button has been disabled.

```
import createNumberMask from 'text-mask-addons/dist/createNumberMask'
import dayjs from '../../helpers/getDayjs.js'
import validateExists from '../../validators/validateExists'
import validateMinMaxFactory from '../../validators/validateMinMax'
import EmailFormatValidator from '../../validators/EmailValidator'
import { validateMinMaxDateFactory } from '../../validators/BirthdateInputValidator'

import {
  TitleLarge,
  Form,
  TextInput,
  TextMaskedInput,
  Spacer,
  EmailInput,
  NumberInput,
  CheckboxInput,
  ZipInput,
  BirthdateInput,
  ButtonSelectGroup,
  Button,
  InfoMessage,
} from '../index'

const dollarMaskFunction = createNumberMask({
  allowDecimal: false,
  allowLeadingZeroes: false,
  guide: false,
  includeThousandsSeparator: true,
  prefix: '$',
})


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
    formName: 'Dynamic fields example form',
    autocompleteOff: true,
    formId: '1',
    fields: {
      dollar: {
        component: (props, options) => {
          return <NumberInput {...props} mask={dollarMaskFunction} initialValue="1234" />
        },
        name: "dollar-input-example",
        labelCopy: "Enter a number (must be even to validate)",
        tid: 'dollar-number-input',
        validators: [(n) => {
          if (n > Number.MAX_SAFE_INTEGER) {
            return 'Number too large—you have exceeded JavaScript\s powers!!'
          }
          return n % 2 === 0 ? '' : 'Must be an even number'
        }],
      },
      birthdate: {
        component: (props, options) => {
          return <BirthdateInput {...props} initialValue="09/12/1977" />
        },
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
        labelCopy: 'Must be between 20 and 65 years old',
      },
      zipCode: {
        component: (props, options) => {
          return <ZipInput {...props} initialValue="94544" />
        },
        name: 'this-zip-input-example',
        labelCopy: 'What is your zip code?',
      },
      email: {
        component: (props, options) => {
          return <EmailInput {...props} initialValue="fooby@ethoslife.com" placeholder="example@ethoslife.com" />
        },
        validators: [EmailFormatValidator],
        name: 'the-email-input-example',
        labelCopy: 'Your email',
        tid: 'the-email-tid',
      },
      booleanGroup: {
        component: (props, options) => (
          <ButtonSelectGroup fullWidth={false} {...props} initialValue={false} >
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
      checkbox: {
        component: (props, options) => {
          return (
            <CheckboxInput {...props} initialValue={true}>
              I agree to the{' '}
              <a href="/" target="_blank">
                Agreement
              </a>
            </CheckboxInput>
          )
        },
        name: "le-check-unchecked",
        tid: "le-tid-unchecked",
        validators: [(n) => {
          // We only will accept the value of true!
          if (n === true) {
            return '' 
          }
          return 'You must agree to submit form'
        }],
      },
      evenNumText: {
        component: (props, options) => {
          return <TextInput {...props} initialValue="abcdef" />
        },
        validators: [
          validateExists,
          validateMinMaxFactory.call(null, 5, 7),
        ],
        labelCopy:
          "Validation happens after first form blur ('touched')--Value's length is between 5 and 7 characters",
        tid: 'even-num-text',
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

        {field('dollar')}
        
        <Spacer.H16 />

        {field('email')}

        <Spacer.H16 />

        {field('zipCode')}

        <Spacer.H16 />

        {field('birthdate')}

        <Spacer.H16 />

        {field('booleanGroup')}
        
        <Spacer.H16 />

        {field('checkbox')}

        <Spacer.H16 />

        <Button.Medium.Black disabled={!getFormIsValid()} type="submit" data-tid="button-prefilled-submit">
          Submit
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```
