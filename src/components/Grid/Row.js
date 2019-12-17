import PropTypes from 'prop-types'
import React from 'react'
import styles from './Row.module.css'

export const Row = React.memo((props) => {
  return (
    <div className={props.className} role="row">
      {React.Children.map(props.children, (column, index) =>
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
