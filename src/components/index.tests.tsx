import * as React from 'react'
import { ButtonSelectGroup } from './index'
import { CheckboxInput } from './index'
import { EmailInput } from './index'
import { Faq } from './index'
import { RadioButtonGroup } from './index'
import { Select } from './index'
import { TextMaskedInput } from './index'
import { ValueProps } from './index'
import { ZipInput } from './index'

// Usage: `yarn test:types` -- see [package.json](../../package.json):

// -------------- Localized tests ----------------//

class EmailInputTest extends React.Component<any, any> {
  render() {
    return (
      <EmailInput
        name="the-email-input-example"
        allCaps={true}
        labelCopy="Your email"
        data-tid="the-email-input"
        placeholder="example@ethoslife.com"
      />
    )
  }
}

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

const strFn = (x: string) => ''
const setTouchedFn = (wasTouched: boolean) => {}
class TextMaskedInputTest extends React.Component<any, any> {
  render() {
    return (
      <TextMaskedInput
        mask={[/\d/, /\d/, /\d/, /\d/]}
        type="text"
        name="last4-ssn"
        labelCopy="Last 4 SSN Example"
        data-tid="last4-ssn-example"
        validator={strFn}
        setTouched={setTouchedFn}
      />
    )
  }
}

class ValuePropsTest extends React.Component<any, any> {
  valuePropsSections = [
    {
      iconUrl: 'https://res.cloudinary.com/foo.svg',
      header: 'Header',
      subHeader: 'Sub-header',
      alt: 'Le Icon',
    },
    {
      iconUrl: 'https://res.cloudinary.com/bar.svg',
      header: 'Header',
      subHeader: 'Sub-header',
      alt: undefined,
    },
  ]
  render() {
    return <ValueProps sections={this.valuePropsSections} />
  }
}

class ZipInputTest extends React.Component<any, any> {
  render() {
    return (
      <ZipInput
        name="this-zip-input-example"
        labelCopy="What is your zip code?"
        data-tid="the-zip-input"
      />
    )
  }
}
