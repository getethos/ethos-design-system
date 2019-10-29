```jsx
/**
 * The idea is json, component lookup table, and validator lookup table
 * can be defined as needed and on a per use case basis.
 */

import { json, componentsTable, validatorsTable } from './DebloatStub.js'

/**
 * The resolver is injected with json, and lookup tables, so, theoretically
 * it should be able to map arbitrary configurations, provided it can still 
 * understand and map them properly.
 */

import mapJsonToFields from './Resolver.js'

const formFields = mapJsonToFields(json, componentsTable, validatorsTable)

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
        ...formFields.email
      },
      password: {
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
