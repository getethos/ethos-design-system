import React from 'react'
import PropTypes from 'prop-types'

import { Caption, COLORS, Spacer } from './index'

/* @getethos/design-system/InputLabel.js

/**
 * Consistent label styling for all inputs
 *
 * @param  {String}   props.name        Input name that this label... labels.
 * @param  {String}   props.labelCopy   User-visible text of label for input
 * @param  {String}   props.element     HTML element, defaults to <label>
 * @param  {String}   props.id          HTML id, used with aria-labelledby
 * @param  {Boolean}  props.allCaps     If true apply "allCaps" label styling
 */

export function InputLabel({
  name,
  labelCopy,
  element = 'label',
  id,
  allCaps = true,
}) {
  // `name` prop should be supplied for most fields, unless
  // the field uses aria-labelledby
  let nameOrIdProps = null
  if (!name && !id) {
    throw new Error(
      'InputLabel component requires either a name or an id, you supplied neither'
    )
  } else if (!!name && !!id) {
    throw new Error(
      'InputLabel component requires either a name or an id, you supplied both'
    )
  } else {
    nameOrIdProps = name ? { htmlFor: name } : { id }
  }

  return (
    <>
      <Caption.Medium500
        element={element}
        color={COLORS.GRAY_PRIMARY}
        allCaps={allCaps}
        {...nameOrIdProps}
      >
        {labelCopy}
      </Caption.Medium500>
      <Spacer.H8 />
    </>
  )
}

InputLabel.propTypes = {
  element: PropTypes.string,
  allCaps: PropTypes.bool,
  name: PropTypes.string,
  labelCopy: PropTypes.string,
  id: PropTypes.string,
}
