import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import RefType from './ref'
import styles from './Column.module.css'

export const Column = React.memo((props) => {
  const inlineStyles = {
    flexBasis: props.flexBasis ? props.flexBasis : '1',
  }

  useEffect(() => {
    if (props.active) {
      props.columnRef.current.focus()
    }
  }, [props.active])

  const tabIndex = props.active ? 0 : -1

  /**
   * This allows a child of the column (e.g. an anchor) to handle
   * tabIndex and point columnRef to itself so it gets the focus.
   */
  const interactiveRender = (props) => {
    const klasses = props.header
      ? [props.className, styles.columnheader].join(' ')
      : props.className
    return (
      <div
        className={klasses}
        style={inlineStyles}
        data-label={props.name}
        role={props.header ? 'columnheader' : 'cell'}
      >
        {props.children(props.active, props.columnRef)}
      </div>
    )
  }

  /**
   * Normal column so we place the columnRef on it directly.
   */
  const normalRender = (props) => {
    const klasses = props.header
      ? [props.className, styles.columnheader].join(' ')
      : props.className
    return (
      <div
        className={klasses}
        style={inlineStyles}
        data-label={props.name}
        // eslint-disable-next-line
        {...!props.sortable && { ref: props.columnRef }}
        role={props.header ? 'columnheader' : 'cell'}
        tabIndex={tabIndex}
      >
        {props.children(props.active)}
      </div>
    )
  }

  return props.interactive ? interactiveRender(props) : normalRender(props)
})

Column.displayName = 'Column'
Column.propTypes = {
  name: PropTypes.string.isRequired,
  active: PropTypes.bool,
  sortable: PropTypes.bool,
  columnRef: RefType.isRequired,
  children: PropTypes.func.isRequired,
  className: PropTypes.string,
  flexBasis: PropTypes.string,
  header: PropTypes.bool,
  interactive: PropTypes.bool,
}

Column.defaultProps = {
  active: false,
  className: styles.column,
  header: false,
  interactive: false,
}
