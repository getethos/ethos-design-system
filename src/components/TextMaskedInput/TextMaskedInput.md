Last 4 SSN Example

```jsx
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}
;<TextMaskedInput
  placeholder="0000"
  mask={[/\d/, /\d/, /\d/, /\d/]}
  guide={true}
  keepCharPositions={true}
  type='text'
  formChangeHandler={formChangeHandlerStub}
  name="last4-ssn"
  labelCopy="Last 4 SSN Example"
  data-tid="last4-ssn-example"
  validator={(value) => value && value.length === 4 ? '' : 'Four digits required'}
/>
```

Customize the map to your specific use case. This one sets an `intialValue` which results
in the field being considered as already `touched`. This means you do not have to `blur` for
field hint error messages to appear.

```jsx
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<TextMaskedInput
  initialValue='abc'
  mask={[/a/, /b/, /c/, /d/, /e/]}
  placeholder="abcde"
  guide={true}
  keepCharPositions={true}
  type='text'
  allCaps={false}
  formChangeHandler={formChangeHandlerStub}
  name="le-masked"
  labelCopy="Masked Input Example—only 'a' 'b' 'c' 'd' 'e' in that order allowed"
  data-tid="the-masked-input"
  validator={(x) => {
    if (/a{1}b{1}c{1}d{1}e{1}/.test(x)) {
      return ''
    } else {
      return "It's gotta be 'abcde'"
    }
  }}
/>
```
