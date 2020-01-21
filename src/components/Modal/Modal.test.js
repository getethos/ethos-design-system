import React from 'react'
import ReactDOM from 'react-dom'
import { Modal } from './Modal'
import { render, fireEvent, act } from '@testing-library/react'

describe('Modal', () => {
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

  it("Render's a modal", () => {
    const showModal = true
    const toggleMock = jest.fn()
    window.scrollTo = jest.fn()
    const ariaDescribedBy = 'some-id'
    const ariaLabelledBy = 'some-other-id'

    const props = {
      ariaDescribedBy,
      ariaLabelledBy,
      showModal,
      toggle: toggleMock,
    }

    const tree = render(
      <Modal {...props}>
        <h1 id={ariaLabelledBy}>Ima modal</h1>
        <p id={ariaDescribedBy}>some more content</p>
      </Modal>
    )

    expect(tree).toMatchSnapshot()
  })

  it("Fire's `toggle` when the `escape` key is pressed", () => {
    const showModal = true
    const toggleMock = jest.fn()
    window.scrollTo = jest.fn()

    const props = {
      showModal,
      toggle: toggleMock,
    }

    const { getByTestId } = render(
      <Modal {...props}>
        <h1>Ima modal</h1>
      </Modal>
    )

    const modal = getByTestId('base-modal-container')

    act(() => {
      fireEvent.keyDown(modal, { key: 'Escape', keyCode: 27 })
    })

    expect(toggleMock).toHaveBeenCalled()
  })
})
