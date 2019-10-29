```jsx
import validatePassword from '../../../validators/validatePassword'
// formChangeHandler gets wired up automatically if using <Form /> component
const formChangeHandlerStub = () => {}
;<PasswordInput
  name="password-example"
  labelCopy="Password"
  data-tid="the-password-input"
  formChangeHandler={formChangeHandlerStub}
  validator={validatePassword}
/>
```
