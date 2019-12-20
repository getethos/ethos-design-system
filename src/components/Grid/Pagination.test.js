import React from 'react'
import TestRenderer, { act } from 'react-test-renderer'

import Pagination, { usePagination } from './Pagination'

const responseStub = {
  page: 1,
  per_page: 2,
  total: 6,
  total_pages: 3,
  data: [
    {
      id: 1,
      name: 'cerulean',
      year: 2000,
    },
    {
      id: 2,
      name: 'fuchsia rose',
      year: 2001,
    },
  ],
}

describe('API', () => {
  let tree
  let fetchFn
  let renderFn

  beforeEach(() => {
    fetchFn = jest.fn()
    renderFn = jest.fn()
    fetchFn.mockReturnValue(responseStub)
  })

  afterEach(() => {
    tree = null
    fetchFn = null
    renderFn = null
  })

  it('default rendering', () => {
    tree = TestRenderer.create(
      <Pagination fetchPageCallback={fetchFn} renderCallback={renderFn} />
    )
    let snapShot = tree.toJSON()
    expect(renderFn).toHaveBeenCalled()
    expect(snapShot).toMatchSnapshot()
  })

  it('fetches', async () => {
    tree = TestRenderer.create(
      <Pagination fetchPageCallback={fetchFn} renderCallback={renderFn} />
    )
    const root = tree.root
    const buttons = root.findAllByType('button')
    const [first] = buttons

    await act(async () => {
      first.props.onClick()
    })

    expect(fetchFn).toHaveBeenCalled()
    expect(renderFn).toHaveBeenCalled()
  })

  it('has aria labels', async () => {
    await act(async () => {
      tree = TestRenderer.create(
        <Pagination fetchPageCallback={fetchFn} renderCallback={renderFn} />
      )
    })
    const root = tree.root
    const buttons = root.findAllByType('button')
    expect(buttons.length).toEqual(5)
    const first = buttons[0]
    expect(first.props['aria-label']).toEqual('Goto Page 1')
    expect(first.children).toEqual(['«'])
    const last = buttons[4]
    expect(last.props['aria-label']).toEqual('Goto Page 3')
    expect(last.children).toEqual(['»'])
  })
})
