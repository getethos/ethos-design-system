```jsx
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<TextMaskedInput
  mask={[/a/, /b/, /c/, /d/, /e/]}
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
