import React from 'react'
import renderer from 'react-test-renderer'

import Grid from './grid.js'
import Cell from './column.js'
import Row from './row.js'

test('renders the default state', () => {
  const grid = renderer
    .create(
      <Grid rowRefs={[]} columnRefs={[]}>
        <div>Foo</div>
        <div>Bar</div>
        <div>Baz</div>
      </Grid>
    )
    .toJSON()
  expect(grid).toMatchSnapshot()
})
