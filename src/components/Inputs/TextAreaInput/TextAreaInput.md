### Default

```jsx
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}

;<TextAreaInput
  name="example"
  labelCopy="TextAreaInput"
  data-tid="the-textarea-input"
  formChangeHandler={formChangeHandlerStub}
  validator={() => 'This always fails'}
/>
```

### Handles resize prop, only vertical because it looks nicer

```jsx
;<TextAreaInput
  resize={true}
  name="example"
  labelCopy="Resize me"
  data-tid="the-textarea-input"
/>
```
