`NoraCheckboxInput` is a simple wrapper component over `CheckboxInput`
that accounts for the generally smaller font sizes we use in Nora.

```jsx
<NoraCheckboxInput
  name="le-check-unchecked"
  data-tid="le-tid-unchecked"
  validator={(n) => {
    console.log('yo yo')
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
</NoraCheckboxInput>
```
