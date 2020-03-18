import React from 'react'
import ReactDOM from 'react-dom'
import { NoraSnackbar } from './NoraSnackbar'
import { render } from '@testing-library/react'

describe('NoraSnackbar', () => {
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

  it("Render's a NoraSnackbar", () => {
    const isOpen = true
    const onDismissMock = jest.fn()
    window.scrollTo = jest.fn()
    const ariaDescribedBy = 'some-id'
    const ariaLabelledBy = 'some-other-id'

    const props = {
      id: 'leSnAcK',
      ariaDescribedBy,
      ariaLabelledBy,
      isOpen,
      onDismiss: onDismissMock,
    }

    const tree = render(
      <NoraSnackbar {...props}>
        <h1 id={ariaLabelledBy}>snackdaddy</h1>
        <p id={ariaDescribedBy}>some more content</p>
      </NoraSnackbar>
    )

    expect(tree).toMatchSnapshot()
  })
})
