```jsx
import { useState } from 'react'
import validateExists from '../../validators/validateExists'
import {
  TitleLarge,
  TitleSmall,
  TextInput,
  Spacer,
  Button,
  InfoMessage,
  ZipInput,
} from '../index'

const questionGroups = {
  one: {
    fields: {
      questionOne: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [(x) => (x === 'a' ? '' : 'Must be a')],
        labelCopy: 'Validator: value must be "a"',
        tid: 'example-data-tid-1',
      },
    }
  },
  two: {
    fields: {
      questionTwo: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [(x) => (x === 'a' ? '' : 'Must be a')],
        labelCopy: 'Same, must be a',
        tid: 'example-data-tid-2',
      },
    }
  },
  three: {
    fields: {
      questionThree: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [(x) => (x === 'a' ? '' : 'Must be a')],
        labelCopy: 'Same, must be a',
        tid: 'example-data-tid-3',
      },
    }
  },
  four: {
    fields: {
      questionFour: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [(x) => (x === 'a' ? '' : 'Must be a')],
        labelCopy: 'Same, must be a',
        tid: 'example-data-tid-4',
      },
    }
  },
  five: {
    fields: {
      questionFive: {
        component: (props, options) => {
          return <TextInput {...props} />
        },
        validators: [(x) => (x === 'a' ? '' : 'Must be a')],
        labelCopy: 'Same, must be a',
        tid: 'example-data-tid-5',
      },
    }
  },
}

const questionNames = Object.keys(questionGroups)

function FormGroup({ children }) {
  const [group, setGroup] = useState(0)

  return (
    <>
      {children({
        group,
        setGroup,
      })}
    </>
  )
}

;<FormGroup>
  {({ group, setGroup }) => {
    const [finalFormData, setFinalFormData] = useState({})
    const question = questionGroups[questionNames[group]]
    const questionFields = question.fields
    console.log('question: ', question, 'questionFields: ', questionFields)

    const form = (
    //return (
      <Form
        config={{
          formName: 'Styleguidist example form',
          formId: {group},
          autocompleteOff: true,
          fields: questionFields,
          onSubmit: async (formData) => {
            const spreaded = { ...finalFormData, ...formData }
            //if (group < questionGroups.length - 1) {
            if (group < questionNames.length - 1) {
              // Go to the next set of questions
              setGroup(group + 1)
              setFinalFormData(spreaded)
            } else {
              // Submit the form -- it will actually still have formData
              // from the first set of questions, too
              alert(
                'form submission successful with values:' +
                  JSON.stringify(spreaded)
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
          //console.log(questionFields)
          return (
            <div>
              <TitleLarge.Serif.Book500>
                Form with dynamically changing questions
              </TitleLarge.Serif.Book500>
              <Spacer.H16 />

              <TitleSmall.Serif.Book500>Form #{group}</TitleSmall.Serif.Book500>

              {group === questionNames.length - 1 ? (
                <>
                  <Spacer.H16 />
                  <TitleSmall.Serif.Book500>
                    This is the final form!
                  </TitleSmall.Serif.Book500>
                </>
              ) : null}

              <Spacer.H16 />

              { Object.keys(questionFields).map((name) => (
                  field(name)
              ))}

              <Spacer.H16 />

              <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
                Submit
              </Button.Medium.Black>

              <Spacer.H16 />
              <TitleSmall.Serif.Book500>Debug section</TitleSmall.Serif.Book500>
              <div>
                <code>
                  {' '}
                  fieldErrorsState (from useFormState):{' '}
                  {JSON.stringify(debugEntireFormState().fieldErrorsState)}{' '}
                </code>
              </div>
              <div>
                <code>
                  {' '}
                  fieldValuesState (from useFormState):{' '}
                  {JSON.stringify(debugEntireFormState().fieldValuesState)}{' '}
                </code>
              </div>
              <div>
                <code>
                  {' '}
                  finalFormData (from the example hook here):{' '}
                  {JSON.stringify(finalFormData)}{' '}
                </code>
              </div>
            </div>
          )
        }}
      </Form>
    )

    // This is how the dynamic form rerenders from scratch when submitted.
    // We return the form on even form "pages," and wrap it in a div
    // on odd "pages."
    //
    // This feels like a hack but it works
    /*
    switch (group) {
      case 0:
      case 2:
      case 4:
        return form
      case 1:
      case 3:
      default:
        return <div>{form}</div>
    }
    */
    return <div data-group={group}>{form}</div>
  }}
</FormGroup>
```
