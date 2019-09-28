_Note that we've set up the form submission to randomly fail or succeed—so, you're encouraged to resubmit until you've seen both!_

```jsx
import validateTruthy from '../../validators/validateTruthy'
import validateMinMaxFactory from '../../validators/validateMinMax'
import { TitleLarge, TextInput, Spacer, Button, InfoMessage } from '../index'
;<Form
  config={{
    formName: 'Styleguidist example form',
    formId: '1',
    fields: {
      evenNumText: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [
          {
            name: 'truthy',
            get: () => {
              return validateTruthy
            },
          },
          {
            name: 'minMax',
            args: [5, 7],
            get: (args) => {
              return validateMinMaxFactory.apply(null, args)
            }
          },
        ],
        labelCopy:
          "Validation happens after first blur ('touched')     Value's length is between 5 and 7 characters",
      },
      shorterEvenNumTextInput: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [
          {
            name: 'truthy',
            get: () => {
              return validateTruthy
            },
          },
          {
            name: 'minMax',
            args: [3, 5],
            get: (args) => {
              return validateMinMaxFactory.apply(null, args)
            }
          },
        ],
        labelCopy:
          "Validation happens after first blur ('touched')     Value's length is between 3 and 5 characters",
      },
    },
    onSubmit: async (formData) => {
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (!!(Math.floor(Math.random() * 10) % 2)) {
        throw new Error("Oh no, the api is broken (try again, it's random)")
      } else {
        alert(
          'form submission successful with values:' +
            JSON.stringify(formData) +
            "\n\nBut try again, it's random"
        )
      }
    },
  }}
>
  {(field, getFormErrorMessage, getFormIsValid) => (
    <div>
      <TitleLarge.Serif.Book500>Example Form</TitleLarge.Serif.Book500>

      <Spacer.H16 />

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

      <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
        Submit
      </Button.Medium.Black>
    </div>
  )}
</Form>
```

_Note that we've set up the form submission to randomly fail or succeed—so, you're encouraged to resubmit until you've seen both!_

```jsx
import validateTruthy from '../../validators/validateTruthy'
import { validateMinMaxDateFactory } from '../../validators/BirthdateInputValidator'
import { TitleLarge, TextInput, Spacer, Button, InfoMessage } from '../index'
import { ButtonSelectGroup } from '../Inputs/ButtonSelectGroup/ButtonSelectGroup'
import { BirthdateInput } from '../Inputs/BirthdateInput/BirthdateInput'

;<Form
  config={{
    formName: 'Styleguidist example form',
    formId: '1',
    fields: {
      birthdate: {
        component: (props, options) => {
          return <BirthdateInput {...props} />
        },
        validators: [
          {
            name: 'truthy',
            get: () => {
              return validateTruthy
            },
          },
          {
            name: 'minMaxDate',
            args: [
              {
                minAge: 20,
                maxAge: 65,
                dateFormat: 'mm/dd/yyyy',
              },
            ],
            get: (args) => {
              return validateMinMaxDateFactory.apply(null, args)
            },
          },
        ],
        labelCopy: 'Must be between 20 and 65 years old',
      },
      buttonGroup: {
        component: (props, options) => {
          return (
            <ButtonSelectGroup {...props}>
              {options.map((x, i) => (
                <ButtonSelectGroup.Option value={x.value} key={i}>
                  {x.copy}
                </ButtonSelectGroup.Option>
              ))}
            </ButtonSelectGroup>
          )
        },
        validators: [
          {
            name: 'truthy',
            get: () => {
              return validateTruthy
            },
          },
        ],
        labelCopy: 'Either option is valid',
        options: [
          { value: 'female', copy: 'Female' },
          { value: 'male', copy: 'Male' },
        ],
      },
    },
    onSubmit: async (formData) => {
      console.log('submitting with form data: ', formData)
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (!!(Math.floor(Math.random() * 10) % 2)) {
        throw new Error("Oh no, the api is broken (try again, it's random)")
      } else {
        alert(
          'form submission successful with values:' +
            JSON.stringify(formData) +
            "\n\nBut try again, it's random"
        )
      }
    },
  }}
>
  {(field, getFormErrorMessage, getFormIsValid) => (
    <div>
      <TitleLarge.Serif.Book500>
        Example Form With Birthdate
      </TitleLarge.Serif.Book500>

      <Spacer.H16 />

      {getFormErrorMessage() && (
        <>
          <InfoMessage.Alert.Error>
            {getFormErrorMessage()}
          </InfoMessage.Alert.Error>
        </>
      )}

      {field('birthdate')}

      <Spacer.H16 />

      {field('buttonGroup')}

      <Spacer.H16 />

      <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
        Submit
      </Button.Medium.Black>
    </div>
  )}
</Form>
```
