```jsx
import { TextInput, Spacer, Button, InfoMessage } from '../index'
import validateMinMaxFactory from '../../validators/validateMinMax'
import validateTruthy from '../../validators/validateTruthy'
;<Form
  config={{
    formName: 'Styleguidist example form',
    formId: '1',
    inputs: {
      evenNumTextInput: {
        validators: [
          validateTruthy,
          validateMinMaxFactory(5, 7),
          (x) =>
            x.length % 2
              ? 'Text does not have an even number of characters'
              : '',
        ],
        labelCopy:
          "Validation happens after first blur ('touched')     Value's length % 2 and is between 5 and 7 characters",
      },
      shorterEvenNumTextInput: {
        validators: [
          validateTruthy,
          validateMinMaxFactory(3, 5),
          (x) =>
            x.length % 2
              ? 'Text does not have an even number of characters'
              : '',
        ],
        labelCopy:
          "Validation happens after first blur ('touched')     Value's length % 2 and is between 3 and 5 characters",
      },
    },
    onSubmit: async (formData) => {
      console.log('submitting with form data: ', formData)
      await new Promise((resolve) => setTimeout(resolve, 500))
      if (!!(Math.floor(Math.random() * 10) % 2)) {
        throw new Error("Oh no, the api is broken (try again, it's random)")
      }
    },
  }}
>
  {(inputPropFactory, getInputErrors, getFormErrorMessage, getFormIsValid) => (
    <div>
      <TextInput {...inputPropFactory('evenNumTextInput')} />

      <Spacer.H16 />

      <TextInput {...inputPropFactory('shorterEvenNumTextInput')} />

      <Spacer.H16 />

      {getFormErrorMessage() && (
        <InfoMessage.Alert.Error>
          {getFormErrorMessage()}
        </InfoMessage.Alert.Error>
      )}

      <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
        Submit
      </Button.Medium.Black>
    </div>
  )}
</Form>
```
