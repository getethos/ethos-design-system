import * as React from 'react'
import styles from './Grid.module.scss'
import { Position } from './Position'
type GridProps = {
  className?: string
  rowRefs: any[][]
  columnRefs: any[][]
}
export const Grid: React.SFC<GridProps> = (props) => {
  const gridRefs = [...props.columnRefs, ...props.rowRefs]
  return (
    <Position className={props.className} refs={gridRefs} role="grid">
      {(positionX, positionY) =>
        // ethan - i dont understand the ts error message
        // @ts-ignore
        React.Children.map(
          props.children,
          (
            row: React.ReactElement<{ active: boolean; columnIndex: number }>,
            index
          ) => {
            // From https://bit.ly/2tq3FiS
            // ...`props.children` isn't the actual children; It is the descriptor
            // of the children. So you don't have actually anything to change; you
            // can't change any props, or edit any functionality; you can only read
            // from it. If you need to make any modifications you have to create new
            // elements using React.CloneElement.
            return React.cloneElement(row, {
              active: index === positionY,
              columnIndex: positionX,
            })
          }
        )
      }
    </Position>
  )
}
Grid.defaultProps = {
  className: styles.container,
}
Grid.displayName = 'Grid'
