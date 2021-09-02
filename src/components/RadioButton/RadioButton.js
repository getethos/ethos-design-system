import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import useIncludes from '../../hooks/useIncludes.js'
import useInvalid from '../../hooks/useInvalid.js'
import { Body } from '../Body.js'
import { COLORS } from '../Colors.js'
import { codes } from '../../helpers/constants.js'
import styles from './RadioButton.module.scss'

// Wrapping this way facilitates spying with spyOn
export const focusHelper = {
  focus: (elementRef) => {
    elementRef.current.focus()
  },
}

export function RadioButton({
  name,
  value,
  checked,
  tabIndex,
  required,
  disabled,
  label,
  onClick,
  onChange,
  ...rest
}) {
  const [, includesKeysOrThrow] = useIncludes(['name', 'label'])
  includesKeysOrThrow({ name, label })
  const [includesInvalid] = useInvalid(Object.keys(RadioButton.propTypes))
  includesInvalid(rest)

  const spanRadio = useRef(null)

  // This allows the user to arrow navigate within radio group preserving focus affordance
  useEffect(() => {
    if (checked) {
      focusHelper.focus(spanRadio)
    }
  }, [checked])

  return (
    <label className={styles.RadioButton}>
      <span
        role="radio"
        ref={spanRadio}
        value={value}
        aria-checked={checked}
        tabIndex={tabIndex}
      >
        <input
          type="radio"
          name={name}
          value={value}
          checked={checked}
          onClick={onClick}
          onChange={onChange}
          required={required}
          disabled={disabled}
          data-tid={rest['data-tid']}
        />
        <aside />
      </span>
      <Body.Regular400 color={COLORS.GRAY_PRIMARY}>{label}</Body.Regular400>
    </label>
  )
}

RadioButton.PUBLIC_PROPS = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  tabIndex: PropTypes.number,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  label: PropTypes.node.isRequired,
  'data-tid': PropTypes.string,
  onClick: PropTypes.func,

  // These will appear if RadioButton is used with redux-form:
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onDragStart: PropTypes.func,
  onDrop: PropTypes.func,
  onFocus: PropTypes.func,
}

RadioButton.propTypes = {
  ...RadioButton.PUBLIC_PROPS,
}
