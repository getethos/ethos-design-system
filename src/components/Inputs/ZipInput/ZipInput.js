import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '../TextInput';

// Currently, we only support USA. When we start to support
// other locales, refer to http://html5pattern.com/Postal_Codes.
const validZipRegex = /^(\d{5}([\-]\d{4})?)$/;

const ZIP_CODE_INVALID_ERROR_MESSAGE = 'Please enter a valid Zip Code.'

export const ZipInput = (props) => {
  const {onValidation, ...prunedProps} = props;

  const validator = (postal) => {
    const errorMessage = validZipRegex.test(postal)
      ? ''
      : ZIP_CODE_INVALID_ERROR_MESSAGE

    if (onValidation) {
      onValidation.call(null, errorMessage)
    }
    return errorMessage
  }

  return (
    <TextInput validator={validator} {...prunedProps} />
  )
};

ZipInput.PUBLIC_PROPS = {
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  onValidation: PropTypes.func,
}

ZipInput.propTypes = {
  ...ZipInput.PUBLIC_PROPS,
}
