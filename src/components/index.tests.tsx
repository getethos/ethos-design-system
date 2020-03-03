import * as React from 'react'
import { Accordian } from './index'
import { AsyncTypeahead } from './index'
import { ButtonSelectGroup } from './index'
import { CheckboxInput } from './index'
import { Drawer } from './index'
import { EmailInput } from './index'
import { Faq } from './index'
import { FlexGrid, FlexCol, FlexRow } from './index'
import { IconLink } from './index'
import { NoraButton } from './index'
import { NoraDrawer } from './index'
import { NumberInput } from './index'
import { RadioButtonGroup } from './index'
import { Select } from './index'
import { SearchInput } from './index'
import { TextMaskedInput } from './index'
import { ValueProps } from './index'
import { ZipInput } from './index'

// Usage: `yarn test:types` -- see [package.json](../../package.json):

// -------------- Localized tests ----------------//

class AccordionTest extends React.Component<any, any> {
  render() {
    return (
      <Accordian expanded={{ 1: true }} onToggle={() => {}}>
        hey
      </Accordian>
    )
  }
}

class DrawerTest extends React.Component<any, any> {
  render() {
    return (
      <Drawer onDismiss={() => {}} isOpen={true} position="left">
        hey
      </Drawer>
    )
  }
}

class NoraDrawerTest extends React.Component<any, any> {
  render() {
    return (
      <NoraDrawer
        onDismiss={() => {}}
        isOpen={true}
        position="left"
        labelCopy="label copy"
        closeCopy="close copy"
      >
        hey
      </NoraDrawer>
    )
  }
}
class NoraButtonTest extends React.Component<any, any> {
  render() {
    return <NoraButton>Submit</NoraButton>
  }
}

class IconLinkTest extends React.Component<any, any> {
  render() {
    return (
      <IconLink
        iconPrefix="far"
        iconName="exchange"
        iconClassName="iconClassName"
        iconContainerClassName="iconContainerClassName"
        textClassName="linkClassName"
        textPosition="right"
        copy="Decision"
      />
    )
  }
}

class AsyncTypeaheadTest extends React.Component<any, any> {
  getLocations(name: string) {
    return 'foo'
  }
  render() {
    return (
      <AsyncTypeahead
        renderInput={SearchInput}
        minChars={2}
        dataKey="name"
        entitiesKey="items"
        lastSelectedValue={{}}
        placeholder="placeholder..."
        fetchCallback={this.getLocations}
      />
    )
  }
}

class FlexGridTest extends React.Component<any, any> {
  render() {
    return (
      <FlexGrid>
        <FlexRow>
          <FlexCol xs={12} sm={4} lg={6}>
            <p>Hi</p>
          </FlexCol>
        </FlexRow>
      </FlexGrid>
    )
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

class NumberInputTest extends React.Component<any, any> {
  render() {
    return (
      <NumberInput
        data-tid="the-number-input"
        labelCopy="Enter a number (must be even to validate)"
        name="the-number-input-example"
        allCaps={true}
        validator={(n: number) => {
          if (n > Number.MAX_SAFE_INTEGER) {
            return 'Number too large'
          }
          return n % 2 === 0 ? '' : 'Must be an even number'
        }}
      />
    )
  }
}

class SearchInputTest extends React.Component<any, any> {
  render() {
    return (
      <>
        <SearchInput data-tid="search-input-tid" name="search-input" />
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

///////////////////////////////
// ---- NORA COMPONENTS ---- //
///////////////////////////////

class Header extends React.Component<any, any> {
  render() {
    return (
      <Header
        name="le-header"
        leftChildren="left child"
        rightChildren="right child"
      />
    )
  }
}

class Tag extends React.Component<any, any> {
  render() {
    return <Tag type="approved">approved</Tag>
  }
}
