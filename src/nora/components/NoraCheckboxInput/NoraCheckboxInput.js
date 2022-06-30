import React from 'react'
import PropTypes from 'prop-types'
import { CheckboxInput } from '../../../components/index'
import { Facade } from './Facade.js'
import styles from './NoraCheckboxInput.module.scss'

export const NoraCheckboxInput = ({
  validator,
  children,
  name,
  initialValue,
  checked,
  disabled,
  ...rest
}) => {
  const renderFacade = ({ className }) => <Facade className={className} />
  return (
    <div className={styles.NoraCheckboxInput}>
      <CheckboxInput
        initialValue={initialValue}
        name={name}
        data-tid={rest['data-tid']}
        validator={validator}
        facadeRenderer={renderFacade}
        disabled={disabled}
        checked={checked}
        {...rest}
      >
        {children}
      </CheckboxInput>
    </div>
  )
}

NoraCheckboxInput.propTypes = {
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  checked: PropTypes.bool,
  'data-tid': PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  validator: PropTypes.func,
}
