import React from 'react'
import TestRenderer, { act } from 'react-test-renderer'
import { Pagination } from './Pagination'
import styles from './Pagination.module.scss'

describe('Pagination Component', () => {
  let tree
  let fetchFn
  let renderFn

  const responseStub = {
    page: 1,
    itemCount: 2,
    total: 6,
    pageCount: 3,
    items: [{ id: 1 }, { id: 2 }],
  }

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

  it('default rendering', async () => {
    await act(async () => {
      tree = TestRenderer.create(
        <Pagination fetchPageCallback={fetchFn} renderCallback={renderFn} />
      )
    })
    let snapShot = tree.toJSON()
    expect(renderFn).toHaveBeenCalled()
    expect(snapShot).toMatchSnapshot()
  })

  it('fetches', async () => {
    await act(async () => {
      tree = TestRenderer.create(
        <Pagination fetchPageCallback={fetchFn} renderCallback={renderFn} />
      )
    })
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
    const last = buttons[4]
    expect(last.props['aria-label']).toEqual('Goto Page 3')
  })

  it('active page reflect current page', async () => {
    await act(async () => {
      tree = TestRenderer.create(
        <Pagination fetchPageCallback={fetchFn} renderCallback={renderFn} />
      )
    })
    const root = tree.root
    const buttons = root.findAllByType('button')
    const firstPageNumberButton = buttons[1]
    expect(firstPageNumberButton.props.className).toContain(styles.active)
  })
})

describe('Hide Pagination', () => {
  let tree
  let fetchFn
  let renderFn
  const singlePageResponseStub = {
    page: 1,
    itemCount: 2,
    total: 2,
    pageCount: 1,
    items: [{ id: 1 }, { id: 2 }],
  }

  beforeEach(() => {
    fetchFn = jest.fn()
    renderFn = jest.fn()
    fetchFn.mockReturnValue(singlePageResponseStub)
  })

  afterEach(() => {
    tree = null
    fetchFn = null
    renderFn = null
  })

  it('hides the pagination if only a single page worth of items', async () => {
    await act(async () => {
      tree = TestRenderer.create(
        <Pagination fetchPageCallback={fetchFn} renderCallback={renderFn} />
      )
    })
    const root = tree.root
    const buttons = root.findAllByType('button')
    expect(buttons.length).toEqual(0)
  })
})