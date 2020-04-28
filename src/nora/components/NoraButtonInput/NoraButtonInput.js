import React from 'react'
import { NoraTextInput } from '../NoraTextInput'
import { Icon } from '../../../components/index'
import styles from './NoraButtonInput.module.scss'

/**
 * NoraButtonInput
 *
 * @public
 *
 * @return {JSX.Element}
 */
export const NoraButtonInput = (props) => {
  const cloned = { ...props }
  const iconPrefix = cloned.iconPrefix
  const iconName = cloned.iconName
  // Side refers to side the button is on (so input is opposite)
  const side = cloned.side
  const buttonDisabled = cloned.buttonDisabled
  const onClickHandler = cloned.onClick
  // Remove these so EDS TextInput et al don't throw error
  delete cloned.iconPrefix
  delete cloned.iconName
  delete cloned.side
  delete cloned.buttonDisabled
  delete cloned.onClick

  const onClick = (ev) => {
    if (onClickHandler) {
      onClickHandler(ev)
    }
  }

  const getButtonStyles = () => {
    let classes = ''
    if (side === 'right') {
      classes = styles.ButtonRight
    } else {
      classes = styles.ButtonLeft
    }

    if (buttonDisabled) {
      classes = [classes, styles.Disabled].join(' ')
    }
    return classes
  }

  return (
    <div className={styles.NoraButtonInputContainer}>
      {side === 'right' && (
        <NoraTextInput className={styles.InputLeft} {...cloned} />
      )}
      <button
        className={getButtonStyles()}
        tabIndex={buttonDisabled ? '-1' : '0'}
        onClick={onClick}
      >
        <Icon iconName={iconName} iconPrefix={iconPrefix} />
      </button>

      {side === 'left' && (
        <NoraTextInput className={styles.InputRight} {...cloned} />
      )}
    </div>
  )
}
