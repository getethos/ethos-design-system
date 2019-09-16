```jsx
<TextInput
  name="example"
  minLength={5}
  maxLength={20}
  allCaps={true}
  labelCopy="Validation happens after first blur ('touched')—Value's length % 2"
  data-tid="the-text-input"
  validator={(x) =>
    x.length % 2 ? 'Text does not have an even number of characters' : ''
  }
/>
```

```jsx
<TextInput
  name="example"
  minLength={5}
  maxLength={20}
  allCaps={true}
  forcedErrorMessage="Your error message goes here"
  labelCopy="Error is controlled by prop, appears after first blur, never disappears"
  data-tid="the-text-input"
  validator={(x) =>
    x.length % 2 ? 'Text does not have an even number of characters' : ''
  }
/>
```
