import * as React from 'react'
import { ButtonSelectGroup } from './index'
import { CheckboxInput } from './index'
import { Faq } from './index'
import { RadioButtonGroup } from './index'
import { Select } from './index'

// Usage: `yarn test:types` -- see [package.json](../../package.json):

// -------------- Localized tests ----------------//

const demoQuestions = [
  {
    summary: 'First',
    content: 'uno',
  },
  {
    summary: 'Second',
    content: 'dos',
  },
]
class FaqTest extends React.Component<any, any> {
  render() {
    return <Faq questions={demoQuestions} />
  }
}

class ButtonSelectGroupTest extends React.Component<any, any> {
  render() {
    return (
      <ButtonSelectGroup initialValue={false} column labelCopy="Yes no">
        <ButtonSelectGroup.Option value={true}>True</ButtonSelectGroup.Option>
        <ButtonSelectGroup.Option value={false}>False</ButtonSelectGroup.Option>
      </ButtonSelectGroup>
    )
  }
}

class CheckboxInputTest extends React.Component<any, any> {
  render() {
    return (
      <>
        <CheckboxInput
          name="name: string -- is required"
          data-tid="data-tid: string -- is required"
        >
          I agree to the{' '}
          <a href="/" target="_blank">
            Agreement
          </a>
        </CheckboxInput>
      </>
    )
  }
}

const options = [
  { value: 'nyc', label: 'New York' },
  { value: 'sf', label: 'San Francisco' },
]
const onSelected = (selectedOption: any) => {}

class SelectTest extends React.Component<any, any> {
  // Tests the various types of react selects based on booleans set
  render() {
    return (
      <>
        <Select
          onChange={onSelected}
          options={options}
          isAsync={true}
          isCreatable={true}
        />
        <Select onChange={onSelected} options={options} isAsync={true} />
        <Select onChange={onSelected} options={options} isCreatable={true} />
        <Select onChange={onSelected} options={options} />
      </>
    )
  }
}

const READY_TODAY = "I'm ready today"
const NEXT_7_DAYS = 'In the next 7 days'
const IntentOptions = [
  { value: READY_TODAY },
  { value: NEXT_7_DAYS },
  { value: 'In 1 to 2 months' },
  { value: 'After 3 months' },
]
class RadioButtonGroupTest extends React.Component<any, any> {
  render() {
    return (
      <RadioButtonGroup
        name="intent-to-apply"
        labelCopy="When would you like to apply?"
        options={IntentOptions.map((t) => ({
          name: t.value,
          value: t.value,
          label: t.value,
        }))}
      />
    )
  }
}
