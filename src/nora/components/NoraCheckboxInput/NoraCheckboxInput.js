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
  ...rest
}) => {
  const renderFacade = (klasses) => <Facade classes={klasses} />
  return (
    <div className={styles.NoraCheckboxInput}>
      <CheckboxInput
        initialValue={initialValue}
        name={name}
        data-tid={rest['data-tid']}
        validator={validator}
        facadeRenderer={renderFacade}
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
  'data-tid': PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  validator: PropTypes.func,
}
