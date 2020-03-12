import React from 'react'
import PropTypes from 'prop-types'
import { Snackbar } from '../../../components/index'

export const NoraSnackbar = (props) => {
  return <Snackbar {...props}>{props.children}</Snackbar>
}

NoraSnackbar.propTypes = {
  /** Id of port element */
  id: PropTypes.string.isRequired,
  /** Id of an element that labels the modal */
  ariaLabelledBy: PropTypes.string,
  /** Id of an element that describes the modal */
  ariaDescribedBy: PropTypes.string,
  /** The Modal's children */
  children: PropTypes.node.isRequired,
  /** Boolean that sets the state of the modal */
  isOpen: PropTypes.bool,
}
