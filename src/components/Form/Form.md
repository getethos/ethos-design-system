```jsx
import { TitleLarge, TextInput, Spacer, Button, InfoMessage } from '../index'
import { ComponentGenerator, ValidatorGenerator } from './example-mappers'
;<Form
  config={{
    formName: 'Styleguidist example form',
    formId: '1',
    componentMap: ComponentGenerator,
    validatorMap: ValidatorGenerator,
    inputs: {
      evenNumText: {
        componentName: 'TextInput',
        validators: [
          { name: 'truthy' },
          {
            name: 'minMax',
            args: [5, 7],
          },
        ],
        labelCopy:
          "Validation happens after first blur ('touched')     Value's length is between 5 and 7 characters",
      },
      shorterEvenNumTextInput: {
        componentName: 'TextInput',
        validators: [
          { name: 'truthy' },
          {
            name: 'minMax',
            args: [3, 5],
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
  {(input, getFormErrorMessage, getFormIsValid) => (
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

      {input('evenNumText')}

      <Spacer.H16 />

      {input('shorterEvenNumTextInput')}

      <Spacer.H16 />

      <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
        Submit
      </Button.Medium.Black>
    </div>
  )}
</Form>
```

```jsx
import { TitleLarge, TextInput, Spacer, Button, InfoMessage } from '../index'
import { ComponentGenerator, ValidatorGenerator } from './example-mappers'
;<Form
  config={{
    formName: 'Styleguidist example form',
    formId: '1',
    componentMap: ComponentGenerator,
    validatorMap: ValidatorGenerator,
    inputs: {
      birthdate: {
        componentName: 'BirthdateInput',
        validators: [
          { name: 'truthy' },
          {
            name: 'minMaxDate',
            args: [
              {
                minAge: 20,
                maxAge: 65,
                dateFormat: 'mm/dd/yyyy',
              },
            ],
          },
        ],
        labelCopy: 'Must be between 20 and 65 years old',
      },
      buttonGroup: {
        componentName: 'ButtonSelectGroup',
        validators: [{ name: 'truthy' }],
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
  {(input, getFormErrorMessage, getFormIsValid) => (
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

      {input('birthdate')}

      <Spacer.H16 />

      {input('buttonGroup')}

      <Spacer.H16 />

      <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
        Submit
      </Button.Medium.Black>
    </div>
  )}
</Form>
```
