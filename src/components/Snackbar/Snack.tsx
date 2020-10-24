import * as React from 'react'
type SnackProps = {
  classNameSkin: string
}
export const Snack: React.SFC<SnackProps> = ({ classNameSkin, children }) => {
  return <div className={classNameSkin}>{children}</div>
}
