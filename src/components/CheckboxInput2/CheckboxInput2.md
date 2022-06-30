```jsx
// formChangeHandler gets wired up automatically if using <Form /> component
import validateExists from '../../validators/validateExists'
const formChangeHandlerStub = () => {}
;<CheckboxInput2
  name="le-check-unchecked"
  data-tid="le-tid-unchecked"
  formChangeHandler={formChangeHandlerStub}
  validator={(n) => {
    // We only will accept the value of true!
    if (n === true) {
      return ''
    }
    return 'You must agree to submit form'
  }}
>
  I agree to the{' '}
  <a href="/" target="_blank">
    Agreement
  </a>{' '}
  , and the{' '}
  <a href="/" target="_blank">
    Other Agreement
  </a>
</CheckboxInput2>
```

Set to checked and disabled immediately:

```jsx
<CheckboxInput2
  initialValue={true}
  name="le-check2"
  disabled={true}
  data-tid="le-tid2"
>
  I answered for you...mwa ha ha. I agree to the{' '}
  <a href="/" target="_blank">
    Agreement
  </a>
</CheckboxInput2>
```

This one sets an `intialValue` which results in the field being considered as
already `touched`. This means you do not have to `blur` for field hint error
messages to appear. _Note, you can think of initialValue as "checked" if that
helps—true results in a checked checkbox, false results in unchecked._

```jsx
import validateExists from '../../validators/validateExists'
const formChangeHandlerStub = () => {}

;<CheckboxInput2
  initialValue={true}
  name="le-check3"
  data-tid="le-tid-checked"
  formChangeHandler={formChangeHandlerStub}
  validator={(n) => {
    // We only will accept the value of true!
    if (n === true) {
      return ''
    }
    return 'You must agree to submit form'
  }}
>
  I agree to the{' '}
  <a href="/" target="_blank">
    Agreement
  </a>
</CheckboxInput2>
```

Multiple example new

```jsx
import { Form } from '../index'
import CheckboxGroup from './CheckboxGroup'
const OPTIONS = [
  {
    value: 'READY_TODAY',
    label: 'READY_TODAY',
    id: '1',
  },
  {
    value: 'NEXT_7_DAYS',
    label: 'NEXT_7_DAYS',
    id: '2',
  },
  {
    value: 'IN_1_2_MONTHS',
    label: 'IN_1_2_MONTHS',
    id: '3',
  },
  {
    value: 'AFTER_3_MONTHS',
    label: 'AFTER_3_MONTHS',
    id: '4',
  },
]

;<Form
  config={{
    formName: 'Styleguidist example form',
    autocompleteOff: true,
    formId: '1',
    fields: {
      multipleCheckbox: {
        name: 'multipleCheckbox',
        tid: 'multipleCheckbox-tid',
        labelCopy: 'Mulitple Checkbox Label',
        optional: true,
        component: (props, options) => {
          // console.log(props)
          // console.log(options)
          return (
            <CheckboxGroup
              {...props}
              options={options.map((t) => ({
                value: t.value,
                id: t.id,
                label: t.label,
              }))}
              initialValue={[]}
            />
          )
        },
        options: OPTIONS,
      },
    },
    onSubmit: (data) => console.log(data),
  }}
>
  {({ field }) => {
    return (
      <>
        {field('multipleCheckbox')}
        <button type="submit">submit</button>
      </>
    )
  }}
</Form>
```

Multiple example

```jsx
import styles from '../Tooltip/TooltipExamples.module.scss'
;<div>
  <CheckboxInput2
    name="stacked-1"
    validator={(n) => {
      // We only will accept the value of true!
      if (n === true) {
        return ''
      }
      return 'You must agree to submit form'
    }}
  >
    I agree to the{' '}
    <a href="/" target="_blank">
      Agreement
    </a>{' '}
    , and the{' '}
    <a href="/" target="_blank">
      Other Agreement
    </a>
  </CheckboxInput2>
  <div style={{ marginBottom: '10px' }} />
  <CheckboxInput2 name="stacked-2">Default</CheckboxInput2>
  <div style={{ marginBottom: '10px' }} />
  <CheckboxInput2
    name="stacked-3"
    tooltip={{
      label: 'label',
      details: 'details',
      popperBoxStyles: styles.CustomTipExample,
    }}
  >
    With tooltip
  </CheckboxInput2>
  <div style={{ marginBottom: '10px' }} />
  <CheckboxInput2
    name="stacked-31"
    tooltip={{
      label: 'label',
      details: 'details',
      popperBoxStyles: styles.CustomTipExample,
    }}
    validator={(n) => {
      // We only will accept the value of true!
      if (n === true) {
        return ''
      }
      return 'You must agree to submit form'
    }}
  >
    With tooltip and validator
  </CheckboxInput2>
  <div style={{ marginBottom: '10px' }} />
  <CheckboxInput2 name="stacked-4" variant="textonly">
    With no checkbox
  </CheckboxInput2>
  <div style={{ marginBottom: '10px' }} />
  <CheckboxInput2
    name="stacked-5"
    variant="textonly"
    tooltip={{ label: 'label', details: 'details' }}
  >
    With no checkbox and tooltip
  </CheckboxInput2>
  <div style={{ marginBottom: '10px' }} />
  <CheckboxInput2
    name="stacked-6"
    variant="textonly"
    tooltip={{ label: 'label', details: 'details' }}
    validator={(n) => {
      // We only will accept the value of true!
      if (n === true) {
        return ''
      }
      return 'You must agree to submit form'
    }}
  >
    With no checkbox and tooltip and validator
  </CheckboxInput2>
</div>
```
