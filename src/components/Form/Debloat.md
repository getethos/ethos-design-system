```jsx
import formFields from './DebloatStub.js'

import {
  TitleLarge,
  TextInput,
  Spacer,
  Button,
  InfoMessage,
  ZipInput,
  EmailInput,
  Form,
  PasswordInput,
} from '../index'

let count = 1;

;<Form
  config={{
    formName: 'Debloat Test',
    autocompleteOff: true,
    formId: '1',
    fields: {
      email: {
        // Seems like the component may start out less smart and be declarative like we have here
        component: (props, options) => {
          return <EmailInput {...props} placeholder="example@ethoslife.com" />
        },
        // But these got built smart :) See DebloatStub.js
        ...formFields.email
      },
      password: {
        component: (props, options) => {
          return <PasswordInput {...props} placeholder="password..." />
        },
        ...formFields.password
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
        <TitleLarge.Serif.Book500>Email Page</TitleLarge.Serif.Book500>
        <Spacer.H16 />
        {getFormErrorMessage() && (
          <>
            <InfoMessage.Alert.Error>
              {getFormErrorMessage()}
            </InfoMessage.Alert.Error>
          </>
        )}
        <Spacer.H16 />
        {field('email')}
        <Spacer.H16 />
        {field('password')}
        <Spacer.H16 />
        <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
          Submit
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```
