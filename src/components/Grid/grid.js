import PropTypes from 'prop-types'
import React, { Children } from 'react'

import Position from './Position.js'
import RefType from './ref.js'
import styles from './Grid.module.css'

export default function Grid(props) {
  const gridRefs = props.columnRefs.concat(props.rowRefs)
  return (
    <Position className={props.className} refs={gridRefs} role="grid">
      {(positionX, positionY) =>
        Children.map(props.children, (row, index) => {
          return React.cloneElement(row, {
            active: index === positionY,
            columnIndex: positionX,
          })
        })
      }
    </Position>
  )
}

Grid.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  // Grid's a 2d array or matrix, so we expect an array of arrays of refs
  rowRefs: PropTypes.arrayOf(PropTypes.arrayOf(RefType)).isRequired,
  columnRefs: PropTypes.arrayOf(PropTypes.arrayOf(RefType)).isRequired,
}

Grid.defaultProps = {
  className: styles.container,
}

Grid.displayName = 'Grid'
