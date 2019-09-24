import React from 'react'
import PropTypes from 'prop-types'
import { INPUT_MODES, INPUT_PATTERNS } from '../../../constants'
import { TextInput } from '../TextInput'

export const ZipInput = (props) => {
  return (
    <TextInput
      {...props}
      inputMode={INPUT_MODES.NUMERIC}
      pattern={INPUT_PATTERNS.NUMERIC}
    />
  )
}

ZipInput.PUBLIC_PROPS = {
  'data-tid': PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  name: PropTypes.string.isRequired,
  labelCopy: PropTypes.string.isRequired,
  validator: PropTypes.func,
}

ZipInput.propTypes = {
  ...ZipInput.PUBLIC_PROPS,
}
