import React from 'react'
import PropTypes from 'prop-types'
import createProps from './createProps'
import getClass from './classNames'

const propTypes = {
  fluid: PropTypes.bool,
  className: PropTypes.string,
  tagName: PropTypes.string,
  children: PropTypes.node,
}

/**
 * FlexGrid is a flexbox based React component for doing layout. Under the hood it uses
 * [flexboxgrid2](https://evgenyrodionov.github.io/flexboxgrid2) and pulls in that CSS
 * using CSS Modules.
 *
 * @public
 *
 * @param {boolean} fluid - whether to use grid in fluid mode or not
 * @param {string} className - in addition to sizing attributes, you can add custom CSS
 * @param {string} tagName - what type of html tag to use for the container defaults to `<div>`
 * @param {ReactNode} children - children to render within the grid
 */
export const FlexGrid = (props) => {
  const containerClass = getClass(props.fluid ? 'container-fluid' : 'container')
  const classNames = [props.className, containerClass]

  return React.createElement(
    props.tagName || 'div',
    createProps(propTypes, props, classNames)
  )
}

FlexGrid.propTypes = propTypes
