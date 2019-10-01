import React from 'react'
import PropTypes from 'prop-types'
import MaskedInput from 'react-text-mask'
import { InputLabel } from '../InputLabel'

export const ZipInput = (props) => {
  const {
    name,
    labelCopy,
    allCaps,
    validator,
    // formChangeHandler,
    ...restProps
  } = props

  return (
    <>
      <InputLabel name={name} labelCopy={labelCopy} allCaps={allCaps} />
      <MaskedInput
        mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
        type="text"
        inputmode="numeric"
        data-tid={restProps['data-tid']}
        guide={true}
        // onBlur={onBlur}
        // onChange={onChange}
        name={props.name}
        className={'ZipInput TextInput'}
        keepCharPositions={true}
      />
    </>
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
