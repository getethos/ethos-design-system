import React from 'react'
import renderer from 'react-test-renderer'

import Grid from './Grid.js'
import Cell from './Column.js'
import Row from './Row.js'

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
