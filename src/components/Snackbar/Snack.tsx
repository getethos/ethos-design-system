import * as React from 'react'
type SnackProps = {
  classNameSkin: string
}
export const Snack: React.FC<SnackProps> = ({ classNameSkin, children }) => {
  return <div className={classNameSkin}>{children}</div>
}
