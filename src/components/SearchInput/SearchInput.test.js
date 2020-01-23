import React from 'react'
import renderer from 'react-test-renderer'
import { SearchInput } from './SearchInput'

jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: '',
}))

describe('SearchInput', () => {
  it('default rendering', () => {
    const enterHandlerStub = jest.fn()
    const tree = renderer
      .create(
        <SearchInput
          onEnter={enterHandlerStub}
          data-tid="search-input-tid"
          name="search-input"
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
