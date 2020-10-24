import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Footnote } from '../Footnote'
import styles from './InfoMessage.module.scss'
export const INFO_MESSAGE_TYPES = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
}
export const INFO_MESSAGE_FORMATS = {
  TEXT: 'TEXT',
  ALERT: 'ALERT',
}
export function InfoMessageFactory(type, format) {
  let classNames = ''
  switch (type) {
    case INFO_MESSAGE_TYPES.ERROR:
      classNames = styles.error
      break
    case INFO_MESSAGE_TYPES.WARNING:
      classNames = styles.warning
      break
    case INFO_MESSAGE_TYPES.INFO:
      classNames = styles.info
      break
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
      <div className={`${styles.InfoMessage} ${classNames}`}>
        <Footnote.Regular400>{children}</Footnote.Regular400>
      </div>
    )
  }
  PublicInfoMessageComponent.propTypes = {
    // We can have string, array, object, etc., so any for children prop
    children: PropTypes.any,
  }
  return PublicInfoMessageComponent
}
