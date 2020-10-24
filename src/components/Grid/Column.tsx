import * as React from 'react'
import { useEffect } from 'react'
import styles from './Column.module.scss'
type ColumnProps = {
  name: string
  active?: boolean
  sortable?: boolean
  columnRef: any
  className?: string
  flexBasis?: string
  header?: boolean
  interactive?: boolean
  children(active: boolean, columnRef?: any): JSX.Element
}
export const Column: React.SFC<ColumnProps> = React.memo((props) => {
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
        {...(!props.sortable && { ref: props.columnRef })}
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
Column.defaultProps = {
  active: false,
  className: styles.column,
  header: false,
  interactive: false,
}
