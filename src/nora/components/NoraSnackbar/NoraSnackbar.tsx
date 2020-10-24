import * as React from 'react'
import { Snackbar } from '../../../components/index'
type NoraSnackbarProps = {
  id: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  isOpen?: boolean
}
export const NoraSnackbar: React.FC<NoraSnackbarProps> = (props) => {
  return <Snackbar {...props}>{props.children}</Snackbar>
}
