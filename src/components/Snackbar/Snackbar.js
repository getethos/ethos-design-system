import React from 'react'
import PropTypes from 'prop-types'
import { Portal } from '../Portal'

/**
 * This is a base snackbar component meant to be unstyled and flexible so
 * that it is customizable and skinnable by consumers. Currently, only the
 * Nora application uses this component. If you plan to use in another Ethos
 * application, **please consult design first**!
 */
export const Snackbar = ({ id, children }) => {
  return <Portal id={id}>{children}</Portal>
}

Snackbar.propTypes = {
  id: PropTypes.string,
  children: PropTypes.node,
}
