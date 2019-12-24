import PropTypes from 'prop-types'
import React from 'react'
import styles from './Row.module.scss'

export const Row = React.memo((props) => {
  let css
  if (props.size !== Row.SIZES.DEFAULT) {
    css = styles[`row${props.size}`]
  } else {
    css = props.className
  }

  return (
    <div className={css} role="row">
      {React.Children.map(props.children, (column, index) =>
        React.cloneElement(column, {
          active: props.active && index === props.columnIndex,
        })
      )}
    </div>
  )
})

Row.displayName = 'Row'

Row.SIZES = {
  SMALL: 'Small',
  DEFAULT: 'Default',
  LARGE: 'Large',
}

Row.propTypes = {
  size: PropTypes.oneOf(Object.values(Row.SIZES)),
  active: PropTypes.bool,
  columnIndex: PropTypes.number,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
}

Row.defaultProps = {
  size: Row.SIZES.DEFAULT,
  active: false,
  columnIndex: -1,
  className: styles.row,
}
