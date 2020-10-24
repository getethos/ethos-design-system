import * as React from 'react'
import { PublicFormProps } from '../../../components/Form/Form'
import { TextInput } from '../../../components/index'
import styles from './NoraTextInput.module.scss'
type NoraTextInputProps = PublicFormProps & {
  type?: string
  className?: string
  disabled?: boolean
  allCaps?: boolean
  capitalize?: boolean
  initialValue?: string
  labelCopy?: string
  placeholder?: string
  onBlur?: (...args: any[]) => any
  onFocus?: (...args: any[]) => any
  restrictIllegal?: boolean
}
/**
 * NoraTextInput is a wrapper around EDS TextInput but has the correct height and font-size
 *
 * @public
 *
 * @return {JSX.Element}
 */
export const NoraTextInput: React.FC<NoraTextInputProps> = (props) => {
  let classes = styles.CompactTextInputContainer
  const cloned = { ...props }
  if (cloned.className) {
    classes = [cloned.className, classes].join(' ')
    delete cloned.className
  }
  return (
    <div className={classes}>
      <TextInput {...cloned} />
    </div>
  )
}
