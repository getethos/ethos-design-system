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

---

# Form Engine

Example of `<Select />` component being used within the EDS form engine:

- first select is "single select"
- second is "multi select":

Please note, the last user's selection will be one of used to call back the form engine
validator you hook up (if you choose to).

- For single select, that validator will be called back with the value of the selection as a string.

- For multi select it will be called back with an array of the values matching all the selections thus far. Internally, react-select will map this to: `[{"value": "a", "label": "A"}, {"value": "b", "label": "B"}]`, but, the validator will then be called with:
  `['a', 'b']`—most likely, it will validate against the existence of certain values, a minimum length, or similar. Also note, that react-select allows the user to remove all
  previously selected items; so, once there are no selections left, the multi select's
  corresponding form validator will be called with an empty array.

_Put differently, the [react-select docs](https://react-select.com/props#statemanager-props) specify this in Typescript notation as:
`<Object, Array<Object>, null, undefined>`_

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
              placeholder="State (single select)"
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
      states_multiselect: {
        component: (props, options) => {
          return (
            <Select
              isMulti
              title="Pick a few states?"
              placeholder="Pick a few states (multi select)"
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
          { value: 'WA', label: 'WA' },
          { value: 'TX', label: 'TX' },
        ],
        validators: [
          (arrayOfSelections) =>
            arrayOfSelections.length < 2
              ? 'You must select at least two (2) states!'
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
        {field('states_multiselect')}
        <Spacer.H16 />
        <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
          Submit
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```
