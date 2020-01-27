import React from 'react'
import PropTypes from 'prop-types'
import createProps from './createProps'
import getClass from './classNames'
import { ColumnSizeType, ViewportSizeType } from './types'

const propTypes = {
  /** xs - number of units when viewport is "extra small" */
  xs: ColumnSizeType,
  /** xs - number of units when viewport is "small" */
  sm: ColumnSizeType,
  /** xs - number of units when viewport is "medium" */
  md: ColumnSizeType,
  /** xs - number of units when viewport is "large" */
  lg: ColumnSizeType,
  /** xs - number of units when viewport is "extra large" */
  xl: ColumnSizeType,
  /** xs - number of units to offset when viewport is "extra small" */
  xsOffset: PropTypes.number,
  /** xs - number of units to offset when viewport is "small" */
  smOffset: PropTypes.number,
  /** xs - number of units to offset when viewport is "medium" */
  mdOffset: PropTypes.number,
  /** xs - number of units to offset when viewport is "large" */
  lgOffset: PropTypes.number,
  /** xs - number of units to offset when viewport is "extra large" */
  xlOffset: PropTypes.number,
  /** first - Forces a column to appear first */
  first: ViewportSizeType,
  /** last - Forces a column to appear last */
  last: ViewportSizeType,
  /** className - additional custom class to use */
  className: PropTypes.string,
  /** tagName - tag to use defaults to div */
  tagName: PropTypes.string,
  /** tagName - react children */
  children: PropTypes.node,
}

const classMap = {
  xs: 'col-xs',
  sm: 'col-sm',
  md: 'col-md',
  lg: 'col-lg',
  xl: 'col-xl',
  xsOffset: 'col-xs-offset',
  smOffset: 'col-sm-offset',
  mdOffset: 'col-md-offset',
  lgOffset: 'col-lg-offset',
  xlOffset: 'col-xl-offset',
}

function isInteger(value) {
  return (
    typeof value === 'number' && isFinite(value) && Math.floor(value) === value
  )
}

function getColClassNames(props) {
  const extraClasses = []

  if (props.className) {
    extraClasses.push(props.className)
  }

  if (props.first) {
    extraClasses.push(getClass('first-' + props.first))
  }

  if (props.last) {
    extraClasses.push(getClass('last-' + props.last))
  }

  return Object.keys(props)
    .filter((key) => classMap[key])
    .map((key) =>
      getClass(
        isInteger(props[key]) ? classMap[key] + '-' + props[key] : classMap[key]
      )
    )
    .concat(extraClasses)
}

export function getColumnProps(props) {
  return createProps(propTypes, props, getColClassNames(props))
}

export const FlexCol = (props) => {
  const { tagName, ...columnProps } = props
  return React.createElement(tagName || 'div', getColumnProps(columnProps))
}

FlexCol.propTypes = propTypes