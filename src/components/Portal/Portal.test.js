import React from 'react'
import { Portal } from './Portal'
import renderer from 'react-test-renderer'
import ReactDOM from 'react-dom'

const TEST_ID = 'my-portal'

describe('Portal', () => {
  beforeAll(() => {
    // createPortal needs to be mocked
    // SEE: https://github.com/facebook/react/issues/11565
    ReactDOM.createPortal = jest.fn((element) => {
      return element
    })
  })

  afterEach(() => {
    ReactDOM.createPortal.mockClear()
  })

  it("render's a portal", () => {
    const tree = renderer
      .create(
        <Portal id={TEST_ID}>
          <h1>hello world</h1>
        </Portal>
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
