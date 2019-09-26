```jsx
import { TitleLarge, TextInput, Spacer, Button, InfoMessage } from '../index'
import {
  ComponentGenerator,
  ValidatorGenerator,
} from './StyleguidistExampleStuff'
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
          {
            name: 'exampleEvenNumber',
          },
        ],
        labelCopy:
          "Validation happens after first blur ('touched')     Value's length % 2 and is between 5 and 7 characters",
      },
      shorterEvenNumTextInput: {
        componentName: 'TextInput',
        validators: [
          { name: 'truthy' },
          {
            name: 'minMax',
            args: [3, 5],
          },
          {
            name: 'exampleEvenNumber',
          },
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
  {(input, getInputErrors, getFormErrorMessage, getFormIsValid) => (
    <div>
      <TitleLarge.Serif.Book500>Example Form</TitleLarge.Serif.Book500>

      <Spacer.H16 />

      {input('evenNumText')}

      <Spacer.H16 />

      {input('shorterEvenNumTextInput')}

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

```jsx
import { TitleLarge, TextInput, Spacer, Button, InfoMessage } from '../index'
import {
  ComponentGenerator,
  ValidatorGenerator,
} from './StyleguidistExampleStuff'
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
          {
            name: 'exampleEvenNumber',
          },
        ],
        labelCopy:
          "Validation happens after first blur ('touched')     Value's length % 2 and is between 5 and 7 characters",
      },
      shorterEvenNumTextInput: {
        componentName: 'TextInput',
        validators: [
          { name: 'truthy' },
          {
            name: 'minMax',
            args: [3, 5],
          },
          {
            name: 'exampleEvenNumber',
          },
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
  {(input, getInputErrors, getFormErrorMessage, getFormIsValid) => (
    <div>
      <TitleLarge.Serif.Book500>
        Example Form With Submit Always Enabled
      </TitleLarge.Serif.Book500>

      <Spacer.H16 />

      {input('evenNumText')}

      <Spacer.H16 />

      {input('shorterEvenNumTextInput')}

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
