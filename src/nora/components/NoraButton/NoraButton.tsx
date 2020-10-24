import * as React from 'react'
import styles from './NoraButton.module.scss'
type NoraButtonProps = {
  'data-tid'?: string
  disabled?: boolean
  type?: 'button' | 'submit'
  name?: string
  onClick?: (...args: any[]) => any
  role?: string
  className?: string
}
export const NoraButton: React.FC<NoraButtonProps> = ({
  className,
  disabled,
  type,
  name,
  onClick,
  role,
  children,
  ...rest
}) => {
  const cssClasses = [styles.Button, className].join(' ')
  return (
    <button
      className={cssClasses}
      disabled={disabled}
      type={type}
      name={name}
      onClick={onClick}
      data-tid={rest['data-tid']}
      role={role}
    >
      {children}
    </button>
  )
}
