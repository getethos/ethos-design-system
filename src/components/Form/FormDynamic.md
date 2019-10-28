### Dynamic Fields Examples

```jsx
import validateExists from '../../validators/validateExists'
import { validateMinMaxDateFactory } from '../../validators/BirthdateInputValidator'
import {
  TitleLarge,
  TextInput,
  TextMaskedInput,
  Spacer,
  Form,
  Button,
  InfoMessage,
} from '../index'
import { ButtonSelectGroup } from '../Inputs/ButtonSelectGroup/ButtonSelectGroup'
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

;<Form
  config={{
    formName: 'Dynamic Fields Examples',
    autocompleteOff: true,
    formId: '1',
    fields: {
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
        tid: 'toggle-dynamic-fields',
        labelCopy: 'Toggle dynamic fields',
        options: [
          { value: 'toggle-1', copy: 'Toggle Field 1' },
          { value: 'toggle-2', copy: 'Toggle Field 2' },
        ],
      },
      field1: {
        component: (props, options) => {
          return (
            <TextInput
              placeholder="field 1 depends on choice 1--enter something for another dynamic field"
              {...props}
            />
          )
        },
        validators: [(val) => (val.length > 2 ? '2 chars max allowed' : '')],
        optional: true,
        labelCopy: 'optional with validation',
        tid: 'field-1-text-input',
      },
      field2: {
        component: (props, options) => {
          return (
            <TextInput placeholder="field 2 depends on choice 2" {...props} />
          )
        },
        validators: [(val) => (val.length > 2 ? '2 chars max allowed' : '')],
        optional: true,
        labelCopy: 'optional with validation',
        tid: 'field-2-text-input',
      },
      field3: {
        component: (props, options) => {
          return (
            <TextInput
              placeholder="field 3 depends on input in field 1"
              {...props}
            />
          )
        },
        validators: [(val) => (val.length > 2 ? '2 chars max allowed' : '')],
        optional: true,
        labelCopy: 'optional with validation',
        tid: 'field-3-text-input',
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
      getFieldErrors,
      getFieldValues,
      getFormErrorMessage,
      getFormIsValid,
      getFormInteractedWith,
    } = api
    const values = getFieldValues()
    const errors = getFieldErrors()
    return (
      <div>
        <TitleLarge.Serif.Book500>Dynamic Fields</TitleLarge.Serif.Book500>

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

        {values.buttonGroup == 'toggle-1' && field('field1')}
        {values.buttonGroup == 'toggle-2' && field('field2')}

        <Spacer.H16 />

        {!errors.field1 && values.field1 && field('field3')}

        <Spacer.H16 />

        <Button.Medium.Black
          disabled={!getFormIsValid()}
          type="submit"
          data-tid="button-dynamic-submit"
        >
          Submit
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```

### Hiding dynamic fields

Dynamic fields & hidden fields—if you call `markHidden` when a dynamic field is hidden, it
will not be considered in determining form validity. Further, if the hidden field has
been previously interacted with, it's value will also be ignored.

```jsx
import {
  TitleLarge,
  TextInput,
  TextMaskedInput,
  Form,
  Spacer,
  Button,
  InfoMessage,
} from '../index'
import { ButtonSelectGroup } from '../Inputs/ButtonSelectGroup/ButtonSelectGroup'
;<Form
  config={{
    formName: 'Hiding dynamic fields',
    autocompleteOff: true,
    formId: '1',
    fields: {
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
        labelCopy: 'Toggle dynamic fields',
        tid: 'toggle-dynamic-fields2',
        options: [
          { value: 'toggle-1', copy: 'Show next question' },
          {
            value: 'toggle-2',
            copy:
              'If dynamic field below is hidden, clicking me should still enable submit button',
          },
        ],
      },
      buttonGroup2: {
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
        tid: 'toggled-buttons2',
        labelCopy: 'Toggle dynamic fields',
        options: [
          { value: 'toggle-1', copy: 'x' },
          { value: 'toggle-2', copy: 'y' },
        ],
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
      markHidden,
      getFieldErrors,
      getFieldValues,
      getFormErrorMessage,
      getFormIsValid,
      getFormInteractedWith,
    } = api
    const values = getFieldValues()
    const errors = getFieldErrors()
    return (
      <div>
        {getFormErrorMessage() && (
          <>
            <InfoMessage.Alert.Error>
              {getFormErrorMessage()}
            </InfoMessage.Alert.Error>
          </>
        )}

        {field('buttonGroup')}
        <Spacer.H16 />

        {values.buttonGroup == 'toggle-1'
          ? field('buttonGroup2')
          : markHidden('buttonGroup2')}
        <Spacer.H16 />

        <Button.Medium.Black
          disabled={!getFormIsValid()}
          type="submit"
          data-tid="button-dynamic-submit2"
        >
          Submit
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```

### Nested dynamic forms

```jsx
import {
  TitleLarge,
  TextInput,
  TextMaskedInput,
  Form,
  Spacer,
  Button,
  InfoMessage,
} from '../index'
import { ButtonSelectGroup } from '../Inputs/ButtonSelectGroup/ButtonSelectGroup'
;<Form
  config={{
    formName: 'Nested dynamic forms',
    autocompleteOff: true,
    formId: '1',
    fields: {
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
        tid: 'nested-group-level1',
        labelCopy: 'Question 1/3',
        options: [
          { value: '1', copy: 'Show next question' },
          {
            value: '2',
            copy:
              'If dynamic field below is hidden, clicking me should still enable submit button',
          },
        ],
      },
      buttonGroup2: {
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
        labelCopy: 'Question 2/3',
        tid: 'nested-group-level2',
        options: [
          { value: '1', copy: 'Show next question' },
          {
            value: '2',
            copy:
              'If dynamic field below is hidden, clicking me should still enable submit button',
          },
        ],
      },
      buttonGroup3: {
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
        labelCopy: 'Question 3/3',
        tid: 'nested-group-level3',
        options: [
          { value: '1', copy: 'Last question answer 1' },
          { value: '2', copy: 'Last question answer 2' },
        ],
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
      markHidden,
      getFieldErrors,
      getFieldValues,
      getFormErrorMessage,
      getFormIsValid,
      getFormInteractedWith,
    } = api
    const values = getFieldValues()
    const errors = getFieldErrors()
    return (
      <div>
        {getFormErrorMessage() && (
          <>
            <InfoMessage.Alert.Error>
              {getFormErrorMessage()}
            </InfoMessage.Alert.Error>
          </>
        )}
        {field('buttonGroup')}
        <Spacer.H16 />
        {values.buttonGroup === '1'
          ? field('buttonGroup2')
          : markHidden('buttonGroup2') || markHidden('buttonGroup3')}
        <Spacer.H16 />
        {values.buttonGroup2 === '1'
          ? field('buttonGroup3')
          : markHidden('buttonGroup3')}
        <Spacer.H16 />
        <Button.Medium.Black
          disabled={!getFormIsValid()}
          type="submit"
          data-tid="button-dynamic-submit3"
        >
          Submit
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```
