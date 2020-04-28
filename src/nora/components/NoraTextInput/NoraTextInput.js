import React from 'react'
import PropTypes from 'prop-types'
import { TextInput } from '../../../components/index'
import styles from './NoraTextInput.module.scss'

/**
 * NoraTextInput is a wrapper around EDS TextInput but has the correct height and font-size
 *
 * @public
 *
 * @return {JSX.Element}
 */
export const NoraTextInput = (props) => {
  return (
    <div className={styles.CompactTextInputContainer}>
      <TextInput {...props} />
    </div>
  )
}

NoraTextInput.propTypes = {
  type: PropTypes.string,
  'data-tid': PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  allCaps: PropTypes.bool,
  initialValue: PropTypes.string,
  formChangeHandler: PropTypes.func,
  // TODO -- make this optional
  labelCopy: PropTypes.string,
  validator: PropTypes.func,
  placeholder: PropTypes.string,
  onBlur: PropTypes.func,
  onFocus: PropTypes.func,
  restrictIllegal: PropTypes.bool,
}
