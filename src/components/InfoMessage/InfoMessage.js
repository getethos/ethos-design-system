import React from 'react'
import { Footnote } from '../index'

import './InfoMessage.scss'

const INFO_MESSAGE_TYPES = {
  ERROR: 'ERROR',
  WARNING: 'WARNING',
  INFO: 'INFO',
  SUCCESS: 'SUCCESS',
}

function InfoMessageFactory(type) {
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
  Error: InfoMessageFactory(INFO_MESSAGE_TYPES.ERROR),
  Warning: InfoMessageFactory(INFO_MESSAGE_TYPES.WARNING),
  Info: InfoMessageFactory(INFO_MESSAGE_TYPES.INFO),
  Success: InfoMessageFactory(INFO_MESSAGE_TYPES.SUCCESS),
}

export const InfoMessage = PublicInfoMessageComponents
