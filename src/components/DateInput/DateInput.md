```jsx
var utc = require('dayjs/plugin/utc')

import dayjs from '../../helpers/getDayjs.js'
import validateExists from '../../validators/validateExists'
import {
  getMinDateValidator,
  getMaxDateValidator,
} from '../../validators/DateInputValidator'

import { TitleLarge2, Form, Spacer, Button, InfoMessage } from '../index'

const MIN_ERROR_MESSAGE = "That's too far in the past!"
const minDate = dayjs('1/1/1700', 'M/D/YYYY')
  .utc()
  .startOf('day')
  .toDate()
const minDateValidator = getMinDateValidator({
  minDate,
  customErrorMessage: MIN_ERROR_MESSAGE,
  dateFormat: 'mm/yyyy',
})

const MAX_ERROR_MESSAGE = "That's too far in the future!"
const maxDate = dayjs()
  .utc()
  .startOf('day')
  .add('10', 'years')
  .toDate()
const maxDateValidator = getMaxDateValidator({
  maxDate,
  customErrorMessage: MAX_ERROR_MESSAGE,
  dateFormat: 'mm/yyyy',
})

;<Form
  config={{
    formName: 'Prefilled w/DateInput',
    formId: '1',
    fields: {
      last_seen_date: {
        component: (props, options) => {
          return <DateInput dateFormat="mm/yyyy" {...props} />
        },
        labelCopy: ' ',
        tid: 'dateinput-prefilled-tid',
        validators: [validateExists, minDateValidator, maxDateValidator],
      },
    },
    onSubmit: async (formData) => {},
  }}
>
  {(api) => {
    const {
      field,
      getFormErrorMessage,
      getFormIsValid,
      getFormInteractedWith,
    } = api
    return (
      <div>
        <TitleLarge2.Sans.Regular400 element="label">
          When were you last seen by a Doctor?
        </TitleLarge2.Sans.Regular400>
        <Spacer.H16 />
        {field('last_seen_date')}
        <Spacer.H16 />
        <Button.Medium.Black disabled={!getFormIsValid()} type="submit">
          Continue
        </Button.Medium.Black>
      </div>
    )
  }}
</Form>
```
