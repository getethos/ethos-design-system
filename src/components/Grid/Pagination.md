Used in tandem with the DataGrid component:

```jsx
import React, { memo, useEffect, useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Grid } from '../Grid/Grid'
import { Row } from '../Grid/Row'
import { Column } from '../Grid/Column'
import { useGridSorting } from '../Grid/useGridSorting.js'
import styles from '../Grid/grid-example.module.scss'

const toCaps = (str) => {
  const capitalizedWords = str.split(' ').map((word) => {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
  })
  return capitalizedWords.join(' ')
}

const LeGrid = ({ rows, columns }) => {
  const {
    rowsRefs,
    columnRefs,
    sortedRows,
    compareBy,
    updateRowsRefs,
    getSortIcon,
  } = useGridSorting(rows, columns)

  const fetchPageData = async (ev) => {
    ev.preventDefault()
    const key = ev.currentTarget.dataset.key || ''
    const idx = columns.findIndex((c) => c.name === key)
    const fetchFunction = columns[idx].fetchFn
    if (fetchFunction) {
      const applications = await fetchFunction(1, columns[idx].name)
      updateRowsRefs(applications.items)
    }
  }

  useEffect(() => {
    if (rows.length) {
      updateRowsRefs(rows)
    }
  }, [rows])

  return (
    <Grid rowRefs={rowsRefs} columnRefs={columnRefs}>
      <Row key="headers" columnRefs={columnRefs[0]}>
        {columns.map((col, x) => {
          if (col.sortable) {
            return (
              <Column
                name={col.name}
                key={uuidv4()}
                columnRef={columnRefs[0][x]}
                flexBasis={col.flexBasis}
                header
                interactive
                sortable
              >
                {(active, columnRef) => (
                  <a
                    href="./#"
                    onClick={fetchPageData}
                    data-key={col.name}
                    tabIndex={active ? 0 : -1}
                    className={styles.iconContainer}
                    ref={columnRef}
                  >
                    {toCaps(col.labelCopy || col.name)}
                    {getSortIcon(col.name)}
                  </a>
                )}
              </Column>
            )
          }
          return (
            <Column
              name={col.name}
              key={uuidv4()}
              columnRef={columnRefs[0][x]}
              flexBasis={col.flexBasis}
              header
            >
              {(active) => (
                <span
                  data-key={col.name}
                  className={active ? 'active' : undefined}
                >
                  {toCaps(col.labelCopy || col.name)}
                </span>
              )}
            </Column>
          )
        })}
      </Row>
      {sortedRows.map((row, y) => (
        <Row key={uuidv4()} columnRefs={rowsRefs[y]}>
          {columns.map((col, x) => {
            if (col.interactive) {
              return (
                <Column
                  name={col.name}
                  key={uuidv4()}
                  columnRef={rowsRefs[y][x]}
                  flexBasis={col.flexBasis}
                  interactive
                >
                  {(active, columnRef) => (
                    <a href="./#" tabIndex={active ? 0 : -1} ref={columnRef}>
                      {row[col.name]}
                    </a>
                  )}
                </Column>
              )
            }
            return (
              <Column
                name={col.name}
                key={uuidv4()}
                columnRef={rowsRefs[y][x]}
                flexBasis={col.flexBasis}
              >
                {() => (
                  <div className={styles.iconContainer}>
                    {row[col.name]}{' '}
                    {col.name === 'Type' && row[col.name] === 'Food' && (
                      <FontAwesomeIcon
                        icon={['far', 'hamburger']}
                        className={styles.icon}
                      />
                    )}
                  </div>
                )}
              </Column>
            )
          })}
        </Row>
      ))}
    </Grid>
  )
}

const GridAndPagination = memo(() => {
  const columns = [
    {
      name: 'id',
      flexBasis: '15%',
    },
    {
      name: 'name',
      labelCopy: 'color name',
      interactive: true,
      sortable: true /* will use default sort function */,
      flexBasis: '30%',
    },
    {
      name: 'color',
      labelCopy: 'hex',
      interactive: true,
      sortable: true /* will use default sort function */,
      flexBasis: '30%',
    },
    {
      name: 'pantone_value',
      labelCopy: 'pantone value',
      flexBasis: '15%',
    },
  ]

  const [pagingState, setPagingState] = useState({
    currentPage: 1,
    pageCount: 0,
    rows: [],
  })

  const fetchPage = async (pageNumber) => {
    // Unfortunately, there is no sort or order params offered by reqres
    // https://github.com/benhowdle89/reqres/issues/32
    const response = await fetch(
      `https://reqres.in/api/cases?page=${pageNumber}`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    )

    const data = await response.json()

    // -------- reqres -------- //
    // These transform reqres response to Nora's paginate api
    const items = data.data
    const pageCount = data.total_pages
    // -------- ends: reqres -------- //

    setPagingState({
      currentPage: pageNumber,
      pageCount: pageCount,
      rows: items,
    })
  }

  const renderGrid = () => {
    if (pagingState.rows.length) {
      return <LeGrid rows={pagingState.rows} columns={columns} />
    }
    return null
  }

  useEffect(() => {
    fetchPage(1)
  }, [])

  return (
    <>
      {renderGrid()}
      <Pagination
        currentPage={pagingState.currentPage}
        pageCount={pagingState.pageCount}
        displayedPagesCount={6}
        fetchPageCallback={fetchPage}
      />
    </>
  )
})

;<GridAndPagination />
```

** Example Pagination views **

Pagination view with all page numbers displayed

```jsx
<Pagination
  currentPage={2}
  pageCount={5}
  displayedPagesCount={6}
  fetchPageCallback={() => {}}
/>
```

Pagination view with total count more than display pages

```jsx
<Pagination
  currentPage={2}
  pageCount={10}
  displayedPagesCount={6}
  fetchPageCallback={() => {}}
/>
```

Pagination view with left ellipsis

```jsx
<Pagination
  currentPage={15}
  pageCount={20}
  displayedPagesCount={10}
  fetchPageCallback={() => {}}
/>
```

Pagination view with left and right ellipsis

```jsx
<Pagination
  currentPage={6}
  pageCount={20}
  displayedPagesCount={10}
  fetchPageCallback={() => {}}
/>
```
