import React from 'react'
import PropTypes from 'prop-types'

import useInvalid from '../../hooks/useInvalid.js'

const BREAKPOINTS = ['phone', 'tablet', 'laptop', 'desktop']

export function Spacer({ height, width, ...rest }) {
  if (!width && !height) throw new TypeError('Must specify width or height.')

  // Verify that no invalid props were supplied
  const [includesInvalid] = useInvalid(Object.keys(Spacer.PUBLIC_PROPS))
  includesInvalid(rest)

  // Verify that height and/or width were valid enum values
  let validHeight = ''
  if (height) {
    if (height && height.constructor === Array) {
      if (height.length !== BREAKPOINTS.length) {
        throw new TypeError(
          'Spacer prop "height" requires exactly four members.'
        )
      }
      for (let i = 0; i < BREAKPOINTS.length; i++) {
        if (Spacer.HEIGHTS.find((h) => h === height[i])) {
          validHeight =
            validHeight + ' spacer-height-' + BREAKPOINTS[i] + '-' + height[i]
        } else {
          throw new TypeError(
            'Invalid height value supplied to prop "height." ' +
              'The valid heights are: [' +
              Spacer.HEIGHTS.join(', ') +
              '].'
          )
        }
      }
    } else {
      throw new TypeError('Spacer prop "height" requires an array.')
    }
  }

  let validWidth = ''
  if (width) {
    if (width.constructor === Array) {
      if (width.length !== BREAKPOINTS.length) {
        throw new TypeError(
          'Spacer prop "width" requires exactly four members.'
        )
      }
      for (let i = 0; i < BREAKPOINTS.length; i++) {
        if (Spacer.WIDTHS.find((w) => w === width[i])) {
          validWidth =
            validWidth + ' spacer-width-' + BREAKPOINTS[i] + '-' + width[i]
        } else {
          throw new TypeError(
            'Invalid width value supplied to prop "width." ' +
              'The valid width are: [' +
              Spacer.WIDTHS.join(', ') +
              '].'
          )
        }
      }
    } else {
      throw new TypeError('Spacer prop "width" requires an array.')
    }
  }

  return <div className={'Spacer ' + validHeight + ' ' + validWidth} />
}

Spacer.HEIGHTS = [80, 72, 64, 56, 48, 40, 32, 24, 16, 8, 4]

Spacer.WIDTHS = [80, 72, 64, 56, 48, 40, 32, 24, 16, 8, 4]

Spacer.PUBLIC_PROPS = {
  ['data-tid']: PropTypes.string,
}

Spacer.propTypes = {
  ...Spacer.PUBLIC_PROPS,
  height: PropTypes.array,
  width: PropTypes.array,
  ['data-tid']: PropTypes.string,
}
