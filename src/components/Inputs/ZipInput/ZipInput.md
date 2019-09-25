The `ZipInput` takes a `validator`, and `ZipInputValidator` gives you validation for valid zip format. You can pass that directly, or, wrap it
for any custom or additional logic you may wish to use.

```jsx
import { ZipInputValidator } from './index.js'
;<ZipInput
  name="this-zip-input-example"
  labelCopy="What is your zip code?"
  data-tid="the-zip-input"
  forcedErrorMessage="forcedErrorMessage"
  onChange={() => console.log('asdf')}
/>
```
