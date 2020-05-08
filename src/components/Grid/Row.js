import PropTypes from 'prop-types'
import React from 'react'
import styles from './Row.module.scss'

export const Row = React.memo((props) => {
  return (
    <div className={props.className} role="row">
      {React.Children.map(props.children, (column, index) =>
        // From https://bit.ly/2tq3FiS
        // ...`props.children` isn't the actual children; It is the descriptor
        // of the children. So you don't have actually anything to change; you
        // can't change any props, or edit any functionality; you can only read
        // from it. If you need to make any modifications you have to create new
        // elements using React.CloneElement.
        React.cloneElement(column, {
          active: props.active && index === props.columnIndex,
        })
      )}
    </div>
  )
})

Row.displayName = 'Row'

Row.propTypes = {
  active: PropTypes.bool,
  columnIndex: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Row.defaultProps = {
  active: false,
  columnIndex: -1,
  className: styles.row,
}
