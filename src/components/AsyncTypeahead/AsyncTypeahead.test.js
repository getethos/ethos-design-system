import React from 'react'
import { AsyncTypeahead } from './index'
import { render, fireEvent, waitForElement } from '@testing-library/react'

describe('AsyncTypeahead', () => {
  let fetchCallbackStub, setOnChangeStub, MySearch
  let valueStub = {}

  beforeEach(() => {
    fetchCallbackStub = jest.fn()
    setOnChangeStub = jest.fn()
    // eslint-disable-next-line react/display-name
    MySearch = (props) => <input {...props} />
  })

  afterEach(() => {
    fetchCallbackStub = null
    setOnChangeStub = null
    MySearch = null
  })

  it('default rendering', () => {
    const tree = render(
      <AsyncTypeahead
        renderInput={MySearch}
        minChars={2}
        dataKey="name"
        lastSelectedValue={valueStub}
        onChange={setOnChangeStub}
        placeholder="Typeahead..."
        fetchCallback={fetchCallbackStub}
      />
    )
    expect(tree).toMatchSnapshot()
  })

  it('min characters', async () => {
    const { getByPlaceholderText, getByTestId, queryByTestId } = render(
      <AsyncTypeahead
        renderInput={MySearch}
        minChars={1}
        dataKey="name"
        lastSelectedValue={valueStub}
        onChange={setOnChangeStub}
        placeholder="typeahead"
        fetchCallback={fetchCallbackStub}
      />
    )
    // By default the options are of course hidden
    expect(queryByTestId('typeahead-options-container')).toBeNull()

    const input = getByPlaceholderText('typeahead')
    fireEvent.change(input, { target: { value: 'a' } })

    // We've typed an 'a' so the options are now shown
    const options = await waitForElement(() =>
      getByTestId('typeahead-options-container')
    )
    expect(options).not.toBeNull()
  })

  it('calls fetchCallback', async () => {
    const { getByPlaceholderText, getByTestId } = render(
      <AsyncTypeahead
        renderInput={MySearch}
        minChars={1}
        dataKey="name"
        lastSelectedValue={valueStub}
        onChange={setOnChangeStub}
        placeholder="typeahead"
        fetchCallback={fetchCallbackStub}
      />
    )
    const input = getByPlaceholderText('typeahead')
    fireEvent.change(input, { target: { value: 'a' } })
    await waitForElement(() => getByTestId('typeahead-options-container'))
    expect(fetchCallbackStub).toHaveBeenCalledWith('a')
  })
})
