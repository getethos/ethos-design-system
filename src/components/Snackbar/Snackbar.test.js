import React from 'react'
import ReactDOM from 'react-dom'
import { Snackbar } from './Snackbar'
import { render } from '@testing-library/react'

describe('Snackbar', () => {
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

  it("Render's a Snackbar", () => {
    const isOpen = true
    window.scrollTo = jest.fn()
    const ariaDescribedBy = 'some-id'
    const ariaLabelledBy = 'some-other-id'

    const props = {
      id: 'leSnAcK',
      ariaDescribedBy,
      ariaLabelledBy,
      isOpen,
    }

    const tree = render(
      <Snackbar {...props}>
        <h1 id={ariaLabelledBy}>snackdaddy</h1>
        <p id={ariaDescribedBy}>some more content</p>
      </Snackbar>
    )

    expect(tree).toMatchSnapshot()
  })
})
