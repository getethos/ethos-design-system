import React from 'react'
import ReactDOM from 'react-dom'
import { Snackbar } from './Snackbar'
import { render, fireEvent, act } from '@testing-library/react'

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
      <Snackbar {...props}>
        <h1 id={ariaLabelledBy}>snackdaddy</h1>
        <p id={ariaDescribedBy}>some more content</p>
      </Snackbar>
    )

    expect(tree).toMatchSnapshot()
  })

  it("Fire's `onDismiss` when the `escape` key is pressed", () => {
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

    const { getByTestId } = render(
      <Snackbar {...props}>
        <h1>snackbar</h1>
      </Snackbar>
    )

    const snack = getByTestId('snackbar-container')

    act(() => {
      fireEvent.keyDown(snack, { key: 'Escape', keyCode: 27 })
    })

    expect(onDismissMock).toHaveBeenCalled()
  })
})
