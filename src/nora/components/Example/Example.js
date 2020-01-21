import PropTypes from 'prop-types'
import React from 'react'
import styles from './Example.module.scss'

const INFO_MESSAGE_TYPES = {
  SUCCESS: 'SUCCESS',
}

const INFO_MESSAGE_FORMATS = {
  TEXT: 'TEXT', // Plain text, no background
  ALERT: 'ALERT', // Styled like Bootstrap alerts, may get cut eventually
}

function InfoMessageFactory(type, format) {
  let classNames = ''
  switch (type) {
    case INFO_MESSAGE_TYPES.SUCCESS:
      classNames = styles.success
      break
    default:
      throw new Error('Improper info message type supplied')
  }

  switch (format) {
    case INFO_MESSAGE_FORMATS.TEXT:
      break
    case INFO_MESSAGE_FORMATS.ALERT:
      classNames = `${classNames} ${styles.Alert}`
      break
  }

  const PublicInfoMessageComponent = ({ children }) => {
    return (
      <div className={`${styles.Example} ${classNames}`}>
        <span>{children}</span>
      </div>
    )
  }
  PublicInfoMessageComponent.propTypes = {
    // We can have string, array, object, etc., so any for children prop
    children: PropTypes.any,
  }

  return PublicInfoMessageComponent
}

const PublicInfoMessageComponents = {
  Text: {
    Success: InfoMessageFactory(
      INFO_MESSAGE_TYPES.SUCCESS,
      INFO_MESSAGE_FORMATS.TEXT
    ),
  },
  Alert: {
    Success: InfoMessageFactory(
      INFO_MESSAGE_TYPES.SUCCESS,
      INFO_MESSAGE_FORMATS.ALERT
    ),
  },
}

export const Example = PublicInfoMessageComponents
