```jsx
<TextInput
  name="example"
  labelCopy="Example: validator is value.length % 2"
  data-tid='the-text-input'
  validator={(x) =>
    x.length % 2
      ? 'Text does not have an even number of characters'
      : ''
  }
/>
```
