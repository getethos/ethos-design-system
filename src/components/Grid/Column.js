import PropTypes from 'prop-types'
import React, { useEffect } from 'react'

import RefType from './ref'
import styles from './Column.module.scss'

export const Column = React.memo(
  ({
    active = false,
    className = styles.column,
    header = false,
    interactive = false,
    ...props
  }) => {
    const inlineStyles = {
      flexBasis: props.flexBasis ? props.flexBasis : '1',
    }

    useEffect(() => {
      if (active) {
        props.columnRef.current.focus()
      }
    }, [active])

    const tabIndex = active ? 0 : -1

    /**
     * This allows a child of the column (e.g. an anchor) to handle
     * tabIndex and point columnRef to itself so it gets the focus.
     */
    const interactiveRender = (props) => {
      const klasses = header
        ? [className, styles.columnheader].join(' ')
        : className
      return (
        <div
          className={klasses}
          style={inlineStyles}
          data-label={props.name}
          role={header ? 'columnheader' : 'cell'}
        >
          {props.children(active, props.columnRef)}
        </div>
      )
    }

    /**
     * Normal column so we place the columnRef on it directly.
     */
    const normalRender = (props) => {
      const klasses = header
        ? [className, styles.columnheader].join(' ')
        : className
      return (
        <div
          className={klasses}
          style={inlineStyles}
          data-label={props.name}
          // eslint-disable-next-line
          {...!props.sortable && { ref: props.columnRef }}
          role={header ? 'columnheader' : 'cell'}
          tabIndex={tabIndex}
        >
          {props.children(active)}
        </div>
      )
    }

    return interactive ? interactiveRender(props) : normalRender(props)
  }
)

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
