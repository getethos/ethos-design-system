import React from 'react'
import PropTypes from 'prop-types'
import styles from './HelpTips.module.scss'

export const HelpTips = ({
  labelCopy,
  helpCopy,
  disabled,
  position,
  ...rest,
}) => {
  return (
    <div aria-label={labelCopy} data-tid={rest['data-tid']}>
      <span className={styles.info} data-pos={position}>i</span>
      <span className={styles.tip} style={{ minWidth: rest['min-width'] }} >{helpCopy}</span>
    </div>
  )
}

HelpTips.propTypes = {
  className: PropTypes.string,
  labelCopy: PropTypes.string.isRequired,
  helpCopy: PropTypes.string.isRequired,
  'data-tid': PropTypes.string.isRequired,
  'min-width': PropTypes.number,
  disabled: PropTypes.bool,
  position: PropTypes.string
}

HelpTips.defaultProps = {
  position: 'above',
  'min-width': 500,
}
