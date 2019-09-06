```jsx
<TextInput
  name="example"
  allCaps={true}
  labelCopy="Validation happens after first blur ('touched')—Value's length % 2"
  data-tid='the-text-input'
  validator={(x) =>
    x.length % 2
      ? 'Text does not have an even number of characters'
      : ''
  }
/>
```
