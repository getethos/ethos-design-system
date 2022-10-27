import React from 'react'
import { OPTION_BUTTON_STYLES } from './OptionButton'
import { ButtonSelectGroup } from './ButtonSelectGroup'
import renderer from 'react-test-renderer'

jest.mock('uuid', () => ({
  v4: jest.fn(() => 1),
}))

describe('ButtonSelectGroup', () => {
  test('The ButtonSelectGroup renders (default button style, `buttonStyle` not passed)', () => {
    const tree = renderer
      .create(
        <ButtonSelectGroup labelCopy="options">
          <ButtonSelectGroup.Option value="foo">foo</ButtonSelectGroup.Option>
          <ButtonSelectGroup.Option value="bar">bar</ButtonSelectGroup.Option>
        </ButtonSelectGroup>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('The ButtonSelectGroup renders (default button style, `buttonStyle` passed)', () => {
    const tree = renderer
      .create(
        <ButtonSelectGroup
          buttonStyle={OPTION_BUTTON_STYLES.DEFAULT}
          labelCopy="options"
        >
          <ButtonSelectGroup.Option value="foo">foo</ButtonSelectGroup.Option>
          <ButtonSelectGroup.Option value="bar">bar</ButtonSelectGroup.Option>
        </ButtonSelectGroup>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('The ButtonSelectGroup renders (white button style)', () => {
    const tree = renderer
      .create(
        <ButtonSelectGroup
          buttonStyle={OPTION_BUTTON_STYLES.WHITE}
          labelCopy="options"
        >
          <ButtonSelectGroup.Option value="foo">foo</ButtonSelectGroup.Option>
          <ButtonSelectGroup.Option value="bar">bar</ButtonSelectGroup.Option>
        </ButtonSelectGroup>
      )
      .toJSON()

    expect(tree).toMatchSnapshot()
  })

  test('When passed an `onSelect` handler, the callback fires when an Option is `clicked`', () => {
    const onSelectStub = jest.fn()
    const optionValues = ['foo', 'bar']

    const optionButtons = optionValues.map((v, i) => {
      return (
        <ButtonSelectGroup.Option key={i} value={v}>
          {v}
        </ButtonSelectGroup.Option>
      )
    })
    const tree = renderer.create(
      <ButtonSelectGroup labelCopy="placeholder" onSelect={onSelectStub}>
        {optionButtons}
      </ButtonSelectGroup>
    )

    // Grab the group
    const group = tree.root
    const options = group.findAllByType(ButtonSelectGroup.Option)

    const [first] = options

    renderer.act(() => {
      first.props.onClick()
    })

    expect(onSelectStub).toHaveBeenCalledWith({
      value: optionValues[0],
      isAnswered: true,
      name: 'button-select-group-1',
    })
  })

  test('When passed a `initialValue` renders with that value selected, and sets a new option as selected when clicked', () => {
    const onSelectStub = jest.fn()
    const optionValues = ['foo', 'bar']

    const optionButtons = optionValues.map((v, i) => {
      return (
        <ButtonSelectGroup.Option key={i} value={v}>
          {v}
        </ButtonSelectGroup.Option>
      )
    })

    const tree = renderer.create(
      <ButtonSelectGroup
        labelCopy="options"
        initialValue={optionValues[0]}
        onSelect={onSelectStub}
      >
        {optionButtons}
      </ButtonSelectGroup>
    )

    // Grab the group
    const group = tree.root
    const options = group.findAllByType(ButtonSelectGroup.Option)

    const [first, last] = options

    expect(first.props.isSelected).toBe(true)

    renderer.act(() => {
      last.props.onClick()
    })

    expect(onSelectStub).toHaveBeenCalledWith({
      value: optionValues[1],
      isAnswered: true,
      name: 'button-select-group-1',
    })
  })

  test('The ButtonSelectGroup renders with currentValue set and changed', () => {
    const tree = renderer.create(
      <ButtonSelectGroup labelCopy="options">
        <ButtonSelectGroup.Option value="first">foo</ButtonSelectGroup.Option>
        <ButtonSelectGroup.Option value="last">bar</ButtonSelectGroup.Option>
      </ButtonSelectGroup>
    )

    // Grab the group
    let group = tree.root
    let options = group.findAllByType(ButtonSelectGroup.Option)
    let [first, last] = options
    expect(first.props.isSelected).toBe(false)
    expect(last.props.isSelected).toBe(false)

    tree.update(
      <ButtonSelectGroup labelCopy="options" currentValue="last">
        <ButtonSelectGroup.Option value="first">foo</ButtonSelectGroup.Option>
        <ButtonSelectGroup.Option value="last">bar</ButtonSelectGroup.Option>
      </ButtonSelectGroup>
    )

    group = tree.root
    options = group.findAllByType(ButtonSelectGroup.Option)
    ;[first, last] = options
    expect(first.props.isSelected).toBe(false)
    expect(last.props.isSelected).toBe(true)
  })

  test('When a click handler is passed to an option, it fires', () => {
    const onSelectStub = jest.fn()
    const onClickStub = jest.fn()
    const value = 'foo'

    const tree = renderer.create(
      <ButtonSelectGroup labelCopy="options" onSelect={onSelectStub}>
        <ButtonSelectGroup.Option value={value} onClick={onClickStub}>
          {value}
        </ButtonSelectGroup.Option>
      </ButtonSelectGroup>
    )

    // Grab the group
    const group = tree.root
    const option = group.findByType(ButtonSelectGroup.Option)

    renderer.act(() => {
      option.props.onClick()
    })

    expect(onClickStub).toHaveBeenCalled()
    expect(onSelectStub).toHaveBeenCalledWith({
      value,
      isAnswered: true,
      name: 'button-select-group-1',
    })
  })
})
