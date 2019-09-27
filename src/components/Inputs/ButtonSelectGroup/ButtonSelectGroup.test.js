import React from 'react'
import { OPTION_BUTTON_STYLES } from './OptionButton'
import { ButtonSelectGroup } from './ButtonSelectGroup'
import renderer from 'react-test-renderer'

jest.mock('uuid/v4', () => {
  return jest.fn(() => 1)
})

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

    const [first, ...rest] = options

    renderer.act(() => {
      first.props.onClick()
    })

    expect(onSelectStub).toBeCalledWith({
      value: optionValues[0],
      isAnswered: true,
    })
  })

  test('When passed a `defaultValue` renders with that value selected, and sets a new option as selected when clicked', () => {
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
        defaultValue={optionValues[0]}
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

    expect(onSelectStub).toBeCalledWith({
      value: optionValues[1],
      isAnswered: true,
    })
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

    expect(onClickStub).toBeCalled()
    expect(onSelectStub).toBeCalledWith({
      value,
      isAnswered: true,
    })
  })
})
