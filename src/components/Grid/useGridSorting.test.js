import React from 'react'
import { act } from 'react-test-renderer'
import { useGridSorting } from './useGridSorting.js'
import testHook from '../../hooks/testHook.js'

describe('useGridSorting', () => {
  let columns, rows

  beforeEach(() => {
    columns = [
      {
        name: 'Description',
        labelCopy: 'Task',
        interactive: true,
        sortable: true,
        flexBasis: '40%',
      },
      {
        name: 'Type',
        labelCopy: 'Type of Task',
        flexBasis: '30%',
      },
    ]
    rows = [
      {
        Description: 'Zoo Trip',
        Type: 'Travel',
      },
      {
        Description: 'Coffee and Bagel',
        Type: 'Food',
      },
      {
        Description: 'Acting Classes',
        Type: 'Grooming',
      },
    ]
  })

  afterEach(() => {
    columns = null
    rows = null
  })

  it('defaults', async () => {
    await act(async () => {
      testHook(() => {
        const {
          rowsRefs,
          columnRefs,
          sortedRows,
          compareBy,
          setSortState,
          updateRowsRefs,
          getSortIcon,
        } = useGridSorting(rows, columns)

        expect(columnRefs[0].length).toEqual(2)
        expect(rowsRefs.length).toEqual(3)
        expect(sortedRows.length).toEqual(3)
        expect(compareBy).toBeDefined()
        expect(setSortState).toBeDefined()
        expect(updateRowsRefs).toBeDefined()
        expect(getSortIcon).toBeDefined()
      })
    })
  })

  it('default sort direction', async () => {
    await act(async () => {
      testHook(() => {
        const { getSortDirection } = useGridSorting(rows, columns)
        const direction = getSortDirection('Description')
        expect(direction).toEqual('default')
      })
    })
  })
})
