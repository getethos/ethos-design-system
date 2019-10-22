### Description

`<ButtonSelectGroup />` renders a group of button that behaves similarly to a radio group

### Examples

### Base Usage

```jsx
<ButtonSelectGroup labelCopy="Health">
  <ButtonSelectGroup.Option value="average">Average</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="great">Great</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="excellent">
    Excellent
  </ButtonSelectGroup.Option>
</ButtonSelectGroup>
```

### Rendering with a `initialValue` selected, and column prop

```jsx
<ButtonSelectGroup initialValue={false} column labelCopy="Yes no">
  <ButtonSelectGroup.Option value={true}>True</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value={false}>False</ButtonSelectGroup.Option>
</ButtonSelectGroup>
```

### Using a `validator`

```jsx
// replace following line with validateExists
import validateTruthy from '../../../validators/validateTruthy'
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<ButtonSelectGroup
  column labelCopy="Click False to see bug---TODO replace all validateTruthy with validateExists"
  validator={validateTruthy}
  formChangeHandler={formChangeHandlerStub}
>
  <ButtonSelectGroup.Option value={true}>True</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value={false}>False</ButtonSelectGroup.Option>
</ButtonSelectGroup>
```

### Handling `onSelect`

```jsx
<ButtonSelectGroup
  initialValue="excellent"
  labelCopy="Health"
  onSelect={({ value }) => console.log(value)}
>
  <ButtonSelectGroup.Option value="average">Average</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="great">Great</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="excellent">
    Excellent
  </ButtonSelectGroup.Option>
</ButtonSelectGroup>
```

### Handling an `onClick` event on a specific `<Option/>`

```jsx
<ButtonSelectGroup
  initialValue="excellent"
  labelCopy="Health"
  onSelect={({ value }) => console.log(value)}
>
  <ButtonSelectGroup.Option
    onClick={() => console.log('i was clicked!')}
    value="average"
  >
    Average
  </ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="great">Great</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="excellent">
    Excellent
  </ButtonSelectGroup.Option>
</ButtonSelectGroup>
```

### Styling `<OptionButton />`

`<OptionButtons />` can be styled by applying the `buttonStyle` property to the wrapping `<ButtonSelectGroup />`. The `buttonStyle` property expects to be passed a valid style enumeration option from the `OPTION_BUTTON_STYLES` `ENUM` (imported from the `BUTTON_SELECT_GROUP` package).

There are currently two options: `WHITE` and `DEFAULT`. If `buttonStyle` is not passed, the button style is defaulted to `DEFAULT`.

### White `buttonStyle`

```jsx
import { OPTION_BUTTON_STYLES } from './index.js'
;<div style={{ background: '#f5f5f5', padding: '8px 16px' }}>
  <ButtonSelectGroup
    initialValue="riddikulus"
    labelCopy="Cast Spell"
    buttonStyle={OPTION_BUTTON_STYLES.WHITE}
  >
    <ButtonSelectGroup.Option value="riddikulus">
      Riddikulus
    </ButtonSelectGroup.Option>
    <ButtonSelectGroup.Option value=" expecto_patronum">
      Expecto Patronum
    </ButtonSelectGroup.Option>
  </ButtonSelectGroup>
</div>
```

### Default `buttonStyle`

```jsx
import { OPTION_BUTTON_STYLES } from './index.js'
;<div style={{ background: '#f5f5f5', padding: '8px 16px' }}>
  <ButtonSelectGroup
    initialValue="riddikulus"
    labelCopy="Cast Spell"
    buttonStyle={OPTION_BUTTON_STYLES.DEFAULT}
  >
    <ButtonSelectGroup.Option value="riddikulus">
      Riddikulus
    </ButtonSelectGroup.Option>
    <ButtonSelectGroup.Option value=" expecto_patronum">
      Expecto Patronum
    </ButtonSelectGroup.Option>
  </ButtonSelectGroup>
</div>
```

### Group when `fullWidth` is false

```jsx
<ButtonSelectGroup fullWidth={false} labelCopy="Health">
  <ButtonSelectGroup.Option value="average">Average</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="great">Great</ButtonSelectGroup.Option>
  <ButtonSelectGroup.Option value="excellent">
    Excellent
  </ButtonSelectGroup.Option>
</ButtonSelectGroup>
```
