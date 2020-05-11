We leverage [React-Select](https://github.com/JedWatson/react-select) for our single and multi selects. For example, you can add
`menuIsOpen={true}` below as an attribute to `<Select>` and the menu will remain open. Additionally, you can define `--select-selected-color` and `--select-active-color` CSS properties in your application and the Ethos brand colors will be overriden as such. This is a global setting, so we
only use this in our auxilarary applications e.g. Nora.

```jsx
const onSelected = (selectedOption) => {
  console.log('Option selected: ', selectedOption)
}
const options = [
  { value: 'nyc', label: 'New York' },
  { value: 'sf', label: 'San Francisco' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'la', label: 'Los Angeles' },
  { value: 'seattle', label: 'Seattle' },
  { value: 'Portland', label: 'Portland' },
  { value: 'Miami', label: 'Miami' },
]
;<Select
  placeholder="Custom placeholder..."
  onChange={onSelected}
  options={options}
  data-tid="my-select"
/>
```

Compact Select

```jsx
const onSelected = (selectedOption) => {
  console.log('Option selected: ', selectedOption)
}
const options = [
  { value: 'nyc', label: 'New York' },
  { value: 'sf', label: 'San Francisco' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'la', label: 'Los Angeles' },
  { value: 'seattle', label: 'Seattle' },
  { value: 'Portland', label: 'Portland' },
  { value: 'Miami', label: 'Miami' },
]
;<Select
  placeholder="Custom placeholder..."
  isCompact={true}
  onChange={onSelected}
  options={options}
/>
```

An optional title may be included on the input box

```jsx
const onSelected = (selectedOption) => {
  console.log('Option selected: ', selectedOption)
}
const options = [
  { value: 'nyc', label: 'New York' },
  { value: 'sf', label: 'San Francisco' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'la', label: 'Los Angeles' },
  { value: 'seattle', label: 'Seattle' },
  { value: 'Portland', label: 'Portland' },
  { value: 'Miami', label: 'Miami' },
]
;<Select
  placeholder="Custom placeholder..."
  onChange={onSelected}
  options={options}
  title={'Input Title (optional)'}
/>
```

```jsx
import { COLORS } from '../Colors'
const colourOptions = [
  {
    value: 'brandforest',
    label: 'Brand Forest',
    color: COLORS.BRAND_FOREST,
    isFixed: true,
  },
  {
    value: 'salamander',
    label: 'Brand Salamander (Disabled)',
    color: COLORS.BRAND_SALAMANDER,
    isDisabled: true,
  },
  {
    value: 'grayprimary',
    label: 'Gray Primary',
    color: COLORS.GRAY_PRIMARY,
  },
  {
    value: 'graystrokedisabled',
    label: 'Gray Stroke and Disabled',
    color: COLORS.GRAY_STROKE_AND_DISABLED,
  },
  {
    value: 'pink',
    label: 'Pink',
    color: 'pink',
  },
  {
    value: 'green',
    label: 'Green',
    color: 'green',
  },
  {
    value: 'red',
    label: 'Red',
    color: 'red',
  },
  {
    value: 'blue',
    label: 'Blue',
    color: 'blue',
  },
]

;<Select
  defaultValue={[colourOptions[3]]}
  isMulti
  name="colors"
  options={colourOptions}
  menuIsOpen={true}
/>
```

You can pass in isCreatable to allow users to create options

```jsx
const options = [
  { value: 'nyc', label: 'New York' },
  { value: 'sf', label: 'San Francisco' },
  { value: 'chicago', label: 'Chicago' },
  { value: 'phoenix', label: 'Phoenix' },
  { value: 'la', label: 'Los Angeles' },
  { value: 'seattle', label: 'Seattle' },
  { value: 'Portland', label: 'Portland' },
  { value: 'Miami', label: 'Miami' },
]

;<Select isMulti isCreatable name="colors" options={options} />
```

Form engine example:

```jsx
import validateExists from '../../validators/validateExists'
import { Form, Spacer, Button, InfoMessage, Select } from '../index'
;<Form
  config={{
    formName: 'Select in form example',
    autocompleteOff: true,
    formId: '1',
    fields: {
      states: {
        component: (props, options) => {
          return (
            <Select
              title="What state?"
              placeholder="State"
              options={options}
              {...props}
            />
          )
        },
        name: 'states',
        options: [
          { value: 'CA', label: 'CA' },
          { value: 'OR', label: 'OR' },
          { value: 'NY', label: 'NY' },
          {
            value: 'default and invalid choice',
            label: 'Select something other then me :)',
          },
        ],
        validators: [
          (val) =>
            val.length && val == 'default and invalid choice'
              ? 'You must select an actual state'
              : '',
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
      getFormErrorMessage,
      getFormIsValid,
      getFormInteractedWith,
    } = api
    return (
      <div>
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
        {field('states')}
        <Spacer.H16 />
        <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
          Submit
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```
