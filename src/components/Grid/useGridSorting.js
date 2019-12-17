import React, { useState } from 'react'
import { FaSort, FaSortUp, FaSortDown } from 'react-icons/fa'
import styles from './useGridSorting.module.css'

export const useGridSorting = (rows, columns) => {
  const [currentSort, setCurrentSort] = useState({})

  const SortIcon = ({ columnKey }) => {
    let sortIcon
    const key = columnKey
    if (currentSort[key] && currentSort[key].direction === 'up') {
      sortIcon = <FaSortUp className={[styles.icon, styles.iconUp].join(' ')} />
    } else if (currentSort[key] && currentSort[key].direction === 'down') {
      sortIcon = (
        <FaSortDown className={[styles.icon, styles.iconDown].join(' ')} />
      )
    } else {
      sortIcon = (
        <FaSort className={[styles.icon, styles.iconDefault].join(' ')} />
      )
    }
    return sortIcon
  }

  const getSortIcon = (key) => {
    return <SortIcon columnKey={key} />
  }

  const [sortedRows, setSortedRows] = useState(rows)

  const columnRefs = [columns.map(() => React.createRef())]

  const mapRowsRefs = (rowsCopy) => {
    return rowsCopy.map(() => columns.map(() => React.createRef()))
  }

  const [rowsRefs, setRowsRefs] = useState(mapRowsRefs(rows))

  const updateRowsRefs = (sortedRowsCopy) => {
    setSortedRows(sortedRowsCopy)
    const sorted = mapRowsRefs(sortedRowsCopy)
    setRowsRefs(sorted)
  }

  // Refactored version of https://reactjsexample.com/a-lightweight-and-extendable-datagrid-for-react/
  const defaultSortMethod = (a, b) => {
    // force null and undefined to the bottom
    a = a === null || a === undefined ? -Infinity : a
    b = b === null || b === undefined ? -Infinity : b
    // force any string values to lowercase, and if dollar currency strip extraneous
    // Admittedly hacky and we'll do proper international currencies later ;)
    a = typeof a === 'string' ? a.toLowerCase().replace(/(^\$|,)/g, '') : a
    b = typeof b === 'string' ? b.toLowerCase().replace(/(^\$|,)/g, '') : b

    a = !isNaN(a) ? Number(a) : a
    b = !isNaN(b) ? Number(b) : b

    if (a > b) {
      return 1
    }
    if (a < b) {
      return -1
    }
    return 0
  }

  const compareBy = (key, sortMethod = defaultSortMethod) => {
    let nextSort
    let currSortCopy = currentSort

    // Have we sorted by this key before? If so, follow next state rules.
    if (currSortCopy[key]) {
      if (currSortCopy[key].direction === 'down') {
        nextSort = 'up'
      } else if (currSortCopy[key].direction === 'up') {
        nextSort = 'down'
      }
      currSortCopy[key].direction = nextSort
    } else {
      // First time sorting by this key, so we'll assume current direction is
      // 'default', and update it to 'down'.
      nextSort = 'down'
      currSortCopy[key] = {
        direction: nextSort,
        key,
      }
    }

    // When we sort by a certain column, we want the other columns to go back
    // to being unsorted, so, we overwrite our state with only `currentSort[key]`
    const newSortState = {}
    newSortState[key] = { ...currSortCopy[key] }
    setCurrentSort(newSortState)

    return function(a, b) {
      switch (nextSort) {
        case 'down':
          return sortMethod(a[key], b[key])
        case 'up':
          return sortMethod(b[key], a[key])
      }
    }
  }

  return {
    rowsRefs,
    columnRefs,
    sortedRows,
    compareBy,
    updateRowsRefs,
    getSortIcon,
  }
}
