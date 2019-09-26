```jsx
import { TextInput, Spacer, Button, InfoMessage } from '../index'
import validateMinMaxFactory from '../../validators/validateMinMax'
;<Form
  config={{
    formName: 'Styleguidist example form',
    formId: '1',
    inputs: {
      evenNumText: {
        validators: [
          validateMinMaxFactory(5, 7),
          (x) =>
            x.length % 2
              ? 'Text does not have an even number of characters'
              : '',
        ],
        labelCopy:
          "Validation happens after first blur ('touched')     Value's length % 2 and is between 5 and 7 characters",
      },
    },
    onSubmit: (formData) => {
      console.log('passed in form worked!')
    },
  }}
>
  {(inputPropFactory, getInputErrors, getFormErrorMessage) => (
    <div>
      <TextInput {...inputPropFactory('evenNumText')} />

      <Spacer.H16 />

      {getFormErrorMessage() && (
        <InfoMessage.Alert.Error>
          {getFormErrorMessage()}
        </InfoMessage.Alert.Error>
      )}

      <Button.Medium.Black type="submit">Submit</Button.Medium.Black>
    </div>
  )}
</Form>
```
