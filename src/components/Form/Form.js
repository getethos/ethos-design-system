import React from 'react'
import PropTypes from 'prop-types'

import { useFormState } from '../../hooks/useFormState'
import { INIT_INVALID } from '../../helpers/constants.js'

/**
 * Some underlying principles of this component:
 *
 *  - The Form takes one prop, `config`, which defines all of its
 *    behavior.
 *    - `config` schema definition TBA
 *  - All Fields used in the Form notify the Form of their value and error state
 *    whenever changed
 *  - The Form only controls form-level errors; Fields control and display their
 *    own errors. However, there is an exception—`formTouched` is passed into
 *.   fields, as it should take precedence over field `touched`. Correspondingly,
 *.   a field should call the prop `setFieldTouched` which informs the form engine.
 *  - Visible errors in Fields are passed to Form and are exact representations
 *    of the errors which prevent the Form from being submitted.
 *  - The Form uses the "Function as Child Component" pattern, and supplies
 *    the following arguments:
 *    - `field`
 *      — A function which takes an argument, `fieldName`,
 *        and provides it a set of props which serve to notify the Form
 *        of changes in error state and value state
 *    - `getFieldErrors`
 *      — Provides the underlying "form level errors" mapped by field name.
 *.       This can be useful as a shorthand when used to conditionally display
 *        of fields. For example you do: `const errors = getFieldErrors()` and
 *        then in the JSX: `{ !errors.field1 && field('field2')}`
 *    - `getFieldValues`
 *      — Provides the underlying "form level values" mapped by field name.
 *.       This can be useful as a shorthand when used to conditionally display
 *        of fields. For example you do: `const values = getFieldValues()` and
 *        then in the JSX: `{ values.field1 && field('field2')}`
 *    - `getFormErrorMessage`
 *      — Provides for "form level errors" e.g. for presenting API errors,
 *        or messaging that relates to the entire form.
 *        (Field level errors (or 'hints') are handled via
 *        the `validators` at the field level, which is part of the `config`
 *    - `getFormIsValid`
 *      — Call this to determine if the form is generally valid.
 *        Useful for determining whether to disable a submit button for example.
 *    - `getFormInteractedWith`
 *      — Call to determine if the form has been interacted with. This
 *        corresponds with a field being entered and a characted typed, a
 *        button group clicked, etc.
 *    - See corresponding markdown example for details.
 *
 * @see See also: `src/hooks/useFormState.js`
 */

export function Form({ children, config }) {
  const fieldNames = Object.keys(config.fields)

  // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/form
  const formAutocomplete = config.autocompleteOff ? 'off' : 'on'

  // Set up initial values
  const initialValues = {}

  fieldNames.forEach((fieldName) => {
    // We don't do the preinitialize to non empty string trick for optional
    // fields as we'd like those to only be validated upon entering something
    if (config.fields[fieldName].optional) return

    // By default fields have "hidden" errors declared here.
    //
    // Setting the error states to a truthy text means that the initial state
    // of a form will have all fields marked as invalid.
    // After being touched, the validators for each field will handle whether
    // it has errors.
    //
    // If we wanted to have a form be optional, you could have its initial
    // value set to empty string, so the form could be submitted without
    // the field being touched.
    initialValues[fieldName] = INIT_INVALID
  })

  // Hooks
  const [
    touched,
    setFormTouched,
    getFieldErrorsString,
    getFieldErrors,
    getFieldValues,
    setFieldState,
    getFormErrorMessage,
    setFormErrorMessage,
    getFormIsValid,
    getFormInteractedWith,
    setFieldsHidden,
  ] = useFormState(initialValues)

  // Wrapper for default <form> submit function.
  async function onSubmit(ev) {
    setFormErrorMessage('')
    ev.preventDefault()

    // Check hook state to see if the form has any errors registered.
    // Ideally, forms should not have the submit button be clickable unless
    // all errors are clear by passing down getFormIsValid() to the `disabled`
    // prop on the submit button, but this is a backup in case they don't.
    if (!getFormIsValid()) {
      if (getFieldErrorsString()) {
        setFormErrorMessage('Errors: ' + getFieldErrorsString())
      } else {
        setFormErrorMessage("You haven't typed anything yet")
      }
      return
    }

    try {
      // Pass the form's values to whatever config.onSubmit wants to do
      await config.onSubmit(getFieldValues())
    } catch (e) {
      setFormErrorMessage(e.toString())
    }
  }

  function markHidden(fieldName) {
    setFieldsHidden(fieldName, true)
    // allows for chaining with && if needed
    return true
  }

  // Wrapper for all fields. Essentially, this translates the field definitions
  // from the config` prop into a form field with validation and proper callbacks.
  // with the necessary callbacks so the form can track its errors & value.
  function field(fieldName) {
    // This just makes the rest of this easier to read
    const fieldConfig = config.fields[fieldName]

    setFieldsHidden(fieldName, false)

    const doValidation = (fieldValue) => {
      // Form's `validationSuccess` won't get called unless we succeed in validating.
      // But that requires a validator of some kind so this circumnavigates the issue.
      const noop = () => ''
      fieldConfig.validators = fieldConfig.validators
        ? fieldConfig.validators
        : [noop]

      const errorMessages = fieldConfig.validators
        .reduce((errorsAccumulator, validator) => {
          return errorsAccumulator.concat(validator(fieldValue))
        }, [])
        .filter((x) => !!x) // remove empty strings
        .join('. ')

      // if field was configured with and array of validationSuccess
      // and we have no errors, we want to call each success hook here
      if (!errorMessages && fieldConfig.validationSuccess) {
        doValidationSuccess(fieldValue)
      }
      return errorMessages
    }

    // This supports things like calling analytics upon field validation
    const doValidationSuccess = (fieldValue) => {
      fieldConfig.validationSuccess.forEach((postValidationCallback) => {
        postValidationCallback.call(null, fieldName, fieldValue)
      })
    }

    const values = getFieldValues()
    let currentFieldValue = values && values[fieldName] ? values[fieldName] : ''
    currentFieldValue =
      currentFieldValue !== INIT_INVALID ? currentFieldValue : ''

    const errors = getFieldErrors()
    const currentFieldError =
      errors && errors[fieldName] ? errors[fieldName] : ''

    const fieldComponent = {
      // Field name. Used in the label to identify the field
      name: fieldName,

      // A callback which fields can call to update the form's errors
      // and values state for that same field. The field still controls
      // its own state internally, but the form needs to know if it has
      // errors (to know if the overall form is valid or not), and what
      // its value is (so it can later pass that to the onSubmit wrapper).
      // The validitiy of a form is essentially verified by
      // `touched && !getFieldErrorsString()`, and so, setting error and value
      // states here affects whether the form is ultimately valid or not.
      formChangeHandler: setFieldState(fieldName),

      // validators are functions which return an empty string if they pass
      // or an error message if they fail.
      //
      // if multiple validators fail, their errors will be combined together.
      validator: doValidation,

      // A field may start with an undefined value, or, an `initialValue` that is
      // non-empty. However, on renders we want to push the current updated value
      currentValue: currentFieldValue,

      // Same thing for errors--we want to push those back to the field on render
      currentError: currentFieldError,

      // If we've "touched" anywhere in form, that should take precedence over
      // field level "touched" e.g. if we toggle and rerender we do not want to
      // force the user to have to blur off the field to see a pre-existing error
      formTouched: touched,

      // The field needs to inform form if touched so form can in turn keep track
      setFieldTouched: setFormTouched,

      // data-tid is helpful for writing tests.
      // sometimes it's passed in, but if it isn't,
      // we will automatically generate one
      'data-tid':
        fieldConfig.tid ||
        [config.formName, config.formId, fieldName].join('-'),
    }

    // User-visible copy, shows up in the label above the field. Most inputs
    // have this, but CheckboxInputs do not so we only add if it applies.
    if (fieldConfig.labelCopy) {
      fieldComponent.labelCopy = fieldConfig.labelCopy
    }

    // We need to be able to to signify that the form is in a valid state
    // regardless of whether an optional field is "filled out" or not.
    if (fieldConfig.optional) {
      fieldComponent.optional = fieldConfig.optional
    }

    return fieldConfig.component(
      fieldComponent,

      // For things like ButtonGroupField, which may have options supplied.
      fieldConfig.options || undefined
    )
  }

  return (
    <form onSubmit={onSubmit} autoComplete={formAutocomplete}>
      {/* See the top of this file or ./Form.md for help on how to use
        these arguments passed to the children function. */}
      {children({
        field,
        markHidden,
        getFieldErrors,
        getFieldValues,
        getFormErrorMessage,
        getFormIsValid,
        getFormInteractedWith,
      })}
    </form>
  )
}
