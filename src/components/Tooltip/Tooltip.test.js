import React from 'react'

jest.mock('react-popper', () => {
  return {
    Manager: () => <></>,
    Reference: () => <></>,
    Popper: () => <></>,
  }
})
jest.mock('../Modal/Modal.js', () => {
  return {
    Modal: () => {
      return <></>
    },
  }
})
import { Tooltip } from './Tooltip.js'
import windowMock from '../../mocks/windowMock'

import { render } from '@testing-library/react'

Object.assign(window, windowMock)

describe('Tooltip', () => {
  beforeAll(() => {
    // createPortal needs to be mocked
    // SEE: https://github.com/facebook/react/issues/11565
    // ReactDOM.createPortal = jest.fn((element) => {
    //   return element
    // })
  })

  describe('API', () => {
    test('exports properly', () => {
      expect(Tooltip).toBeDefined()
    })
  })

  describe('rendering component', () => {
    test('default', () => {
      const tree = render(
        <Tooltip label={'testLabel'} details="Test Details"></Tooltip>
      )
      expect(tree).toMatchSnapshot()
    })
  })
})
