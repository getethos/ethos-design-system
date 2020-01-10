Used in tandem with the DataGrid component:

```jsx
import React, { useEffect, useState } from 'react'
import uuidv4 from 'uuid/v4'
import { FaHamburger } from 'react-icons/fa'
import { Grid } from '../Grid/Grid.js'
import { Row } from '../Grid/Row.js'
import { Column } from '../Grid/Column.js'
import { useGridSorting } from '../Grid/useGridSorting.js'
import styles from '../Grid/grid-example.module.scss'

const pageOne = `
{"page":1,"itemCount":6,"total":12,"pageCount":2,"items":[{"id":1,"name":"cerulean","year":2000,"color":"#98B2D1","pantone_value":"15-4020"},{"id":2,"name":"fuchsia rose","year":2001,"color":"#C74375","pantone_value":"17-2031"},{"id":3,"name":"true red","year":2002,"color":"#BF1932","pantone_value":"19-1664"},{"id":4,"name":"aqua sky","year":2003,"color":"#7BC4C4","pantone_value":"14-4811"},{"id":5,"name":"tigerlily","year":2004,"color":"#E2583E","pantone_value":"17-1456"},{"id":6,"name":"blue turquoise","year":2005,"color":"#53B0AE","pantone_value":"15-5217"}]}
`

const pageTwo = `
{"page":2,"itemCount":6,"total":12,"pageCount":2,"items":[{"id":7,"name":"sand dollar","year":2006,"color":"#DECDBE","pantone_value":"13-1106"},{"id":8,"name":"chili pepper","year":2007,"color":"#9B1B30","pantone_value":"19-1557"},{"id":9,"name":"blue iris","year":2008,"color":"#5A5B9F","pantone_value":"18-3943"},{"id":10,"name":"mimosa","year":2009,"color":"#F0C05A","pantone_value":"14-0848"},{"id":11,"name":"turquoise","year":2010,"color":"#45B5AA","pantone_value":"15-5519"},{"id":12,"name":"honeysuckle","year":2011,"color":"#D94F70","pantone_value":"18-2120"}]}
`
const stubs = {
  1: pageOne,
  2: pageTwo,
}

const toCaps = (str) => {
  const capitalizedWords = str.split('_').map(word => {
    return `${word.charAt(0).toUpperCase()}${word.slice(1)}`
  })
  return capitalizedWords.join(' ')
}

const toSnakeCase = (str) => {
  const snakeCasedWords = str.split(' ').map(word => {
    return word.toLowerCase()
  })
  return snakeCasedWords.join('_')
}

function LeGrid({ rows, columns }) {
  const {
    rowsRefs,
    columnRefs,
    sortedRows,
    compareBy,
    updateRowsRefs,
    getSortIcon,
  } = useGridSorting(rows, columns)

  const sortBy = (ev) => {
    ev.preventDefault()
    // Put back to snake case e.g. 'Pantone Value' becomes 'pantone_value'
    const key = toSnakeCase(ev.currentTarget.text)
    let rowsCopy = sortedRows
    let sortFunction
    // See if we have a custom sort function. If `sortFunction` is
    // `undefined`, `compareBy` will fallback to its own default sort
    const idx = columns.findIndex((c) => c.name === key)
    if (columns[idx].sortFn) {
      sortFunction = columns[idx].sortFn
    }
    rowsCopy.sort(compareBy(key, sortFunction))
    updateRowsRefs(rowsCopy)
  }

  useEffect(() => {
   if (rows.length) {
     updateRowsRefs(rows);
   }
  },[rows]);

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
                    onClick={sortBy}
                    tabIndex={active ? 0 : -1}
                    className={styles.iconContainer}
                    ref={columnRef}
                  >
                    {toCaps(col.name)}
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
                <span className={active ? 'active' : undefined}>
                  {toCaps(col.name)}
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
                      <FaHamburger className={styles.icon} />
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

function GridAndPagination() {

  const columns = [
    {
      name: 'id',
      flexBasis: '15%',
    },
    {
      name: 'name',
      interactive: true,
      sortable: true /* will use default sort function */,
      flexBasis: '30%',
    },
    {
      name: 'color',
      interactive: true,
      sortable: true /* will use default sort function */,
      flexBasis: '30%',
    },
    {
      name: 'pantone_value',
      flexBasis: '15%',
    },
  ]
  const [rows, setRows] = useState([])
  const fetchPage = async (pageNumber) => {
    /*
    Example via a real API
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
    */
    return await JSON.parse(stubs[pageNumber])
  }

  const renderCases = (rows) => {
    if (!rows || !rows.length) {
      return
    }
    setRows(rows)
  }
  const renderGrid = () => {
    if (rows.length) {
      return <LeGrid rows={rows} columns={columns} /> 
    }
    return null
  }

  return (
    <>
      {renderGrid()}
      <Pagination fetchPageCallback={fetchPage} renderCallback={renderCases} />
    </>
  )
}

<GridAndPagination />
```
