import React from 'react'
import { Footnote } from '../index'

const INFO_MESSAGE_TYPES = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
}

const INFO_MESSAGE_FORMATS = {
  TEXT: 'TEXT', // Plain text, no background
  ALERT: 'ALERT', // Styled like Bootstrap alerts, may get cut eventually
}

function InfoMessageFactory(type, format) {
  let className = ''
  switch (type) {
    case INFO_MESSAGE_TYPES.ERROR:
      className = 'error'
      break
    case INFO_MESSAGE_TYPES.WARNING:
      className = 'warning'
      break
    case INFO_MESSAGE_TYPES.INFO:
      className = 'info'
      break
    case INFO_MESSAGE_TYPES.SUCCESS:
      className = 'success'
      break
    default:
      throw new Error('Improper info message type supplied')
  }

  switch (format) {
    case INFO_MESSAGE_FORMATS.TEXT:
      break
    case INFO_MESSAGE_FORMATS.ALERT:
      className = className + ' Alert'
      break
  }

  const PublicInfoMessageComponent = ({ children }) => {
    return (
      <div className={'InfoMessage ' + className}>
        <Footnote.Regular400>{children}</Footnote.Regular400>
      </div>
    )
  }

  return PublicInfoMessageComponent
}

const PublicInfoMessageComponents = {
  Text: {
    Error: InfoMessageFactory(
      INFO_MESSAGE_TYPES.ERROR,
      INFO_MESSAGE_FORMATS.TEXT
    ),
    Warning: InfoMessageFactory(
      INFO_MESSAGE_TYPES.WARNING,
      INFO_MESSAGE_FORMATS.TEXT
    ),
    Info: InfoMessageFactory(
      INFO_MESSAGE_TYPES.INFO,
      INFO_MESSAGE_FORMATS.TEXT
    ),
    Success: InfoMessageFactory(
      INFO_MESSAGE_TYPES.SUCCESS,
      INFO_MESSAGE_FORMATS.TEXT
    ),
  },
  Alert: {
    Error: InfoMessageFactory(
      INFO_MESSAGE_TYPES.ERROR,
      INFO_MESSAGE_FORMATS.ALERT
    ),
    Warning: InfoMessageFactory(
      INFO_MESSAGE_TYPES.WARNING,
      INFO_MESSAGE_FORMATS.ALERT
    ),
    Info: InfoMessageFactory(
      INFO_MESSAGE_TYPES.INFO,
      INFO_MESSAGE_FORMATS.ALERT
    ),
    Success: InfoMessageFactory(
      INFO_MESSAGE_TYPES.SUCCESS,
      INFO_MESSAGE_FORMATS.ALERT
    ),
  },
}

export const InfoMessage = PublicInfoMessageComponents
