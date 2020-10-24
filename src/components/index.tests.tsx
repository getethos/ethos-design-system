import * as React from 'react'
import { Accordion } from '.'
import { AccordionSection } from '.'
import { AsyncTypeahead } from '.'
import { ButtonSelectGroup } from '.'
import { CheckboxInput } from '.'
import { Drawer } from '.'
import { DateInput } from '.'
import { EmailInput } from '.'
import { Faq } from '.'
import { FlexGrid, FlexCol, FlexRow } from '.'
import { Icon } from '.'
import { IconLink } from '.'
import { Modal } from '.'
import { Snack } from '.'
import { KabobMenuContainer } from '.'
import { NoraButton } from '.'
import { NoraCheckboxInput } from '.'
import { NoraButtonInput } from '.'
import { NoraTextInput } from '.'
import { NoraRadioButtonGroup } from '.'
import { NoraDrawer } from '.'
import { NoraSnackbar } from '.'
import { NoraTextAreaInput } from '.'
import { NumberInput } from '.'
import { RadioButtonGroup } from '.'
import { Select } from '.'
import { SearchInput } from '.'
import { Stepper } from '.'
import { TextMaskedInput } from '.'
import { Tooltip } from '.'
import { ValueProps } from '.'
import { ZipInput } from '.'
import { UniversalNavbar } from '.'
import { Pagination } from '.'

// Usage: `yarn test:types` -- see [package.json](../../package.json):

const UniversalNavbarTest: React.FC = () => (
  <UniversalNavbar hideMobileCta hideDesktopCta logoHref="/href" />
)

// -------------- Localized tests ----------------//

class KabobMenuContainerTest extends React.Component<any, any> {
  render() {
    return (
      <KabobMenuContainer
        dataKey="name"
        items={[{ name: 'jack' }, { name: 'jill' }, { name: 'joe' }]}
        isOpen={false}
        setIsOpen={() => {}}
        setLastSelected={() => {}}
        popoverContainerClasses={'.b{}'}
      />
    )
  }
}
class NoraSnackbarTest extends React.Component<any, any> {
  render() {
    return (
      <NoraSnackbar
        id="le-snackbar"
        isOpen={true}
        ariaLabelledBy="xyz"
        ariaDescribedBy="def"
        className="abc"
      >
        <Snack classNameSkin="foo">
          <p>yo yo yo</p>
        </Snack>
      </NoraSnackbar>
    )
  }
}

class AccordionTest extends React.Component<any, any> {
  render() {
    return (
      <Accordion expanded={{ 1: true }} onToggle={() => {}}>
        <AccordionSection index={1} title="yo" renderToggle={() => {}}>
          yo
        </AccordionSection>
        <AccordionSection index={2} title="yo yo" renderToggle={() => {}}>
          yo yo
        </AccordionSection>
      </Accordion>
    )
  }
}

class NoraCheckboxInputTest extends React.Component<any, any> {
  render() {
    return (
      <NoraCheckboxInput name="name" data-tid="letid" validator={() => ''}>
        I agree{' '}
        <a href="/" target="_blank">
          Agreement
        </a>
      </NoraCheckboxInput>
    )
  }
}

class NoraButtonInputTest extends React.Component<any, any> {
  render() {
    return (
      <NoraButtonInput
        name="example"
        data-tid="the-button-input"
        formChangeHandler={() => {}}
        onClick={() => {}}
        buttonDisabled
        iconName="trash-alt"
        iconPrefix="far"
        side="right"
        validator={(x) => {
          return ''
        }}
      />
    )
  }
}

class NoraTextInputTest extends React.Component<any, any> {
  render() {
    return (
      <NoraTextInput
        name="example"
        labelCopy="Validation happens after first blur ('touched')—Value's length % 2"
        data-tid="the-text-input"
        formChangeHandler={() => {}}
        aria-label="text-input"
        validator={(s) => {
          return ''
        }}
      />
    )
  }
}

class DateInputTest extends React.Component<any, any> {
  render() {
    return (
      <DateInput
        dateFormat="mm/yyyy"
        labelCopy="When did you apply for this life insurance?"
        data-tid="when-applied-for"
        validator={(s) => {
          return s
        }}
        name="whenapplied"
      />
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
        drawerClasses="foo bar"
      >
        hey
      </NoraDrawer>
    )
  }
}

class NoraTextAreaInputTest extends React.Component<any, any> {
  render() {
    return (
      <NoraTextAreaInput
        data-tid="nora-textarea-input"
        name="default-example"
        placeholder="Enter text here"
      />
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

class ModalTest extends React.Component<any, any> {
  render() {
    return (
      <Modal>
        <div>
          <h1>Le Modal</h1>
          <p>Lorem ipsum, dolor</p>
          <button tabIndex={0} onClick={() => {}}>
            Yes
          </button>
        </div>
      </Modal>
    )
  }
}

class NoraRadioButtonGroupTest extends React.Component<any, any> {
  render() {
    const ReasonsOptions = [
      { value: 'Already fullfilled' },
      { value: 'Already have on file' },
    ]
    return (
      <NoraRadioButtonGroup
        name="reasons-test"
        options={ReasonsOptions.map((t) => ({
          name: t.value,
          value: t.value,
          label: t.value,
        }))}
        onChange={() => {}}
      />
    )
  }
}

class IconTest extends React.Component<any, any> {
  render() {
    return <Icon iconPrefix="fal" iconName="file-medical-alt" />
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

class StepperTest extends React.Component<any, any> {
  render() {
    return (
      <Stepper
        steps={[
          { title: 'foo', status: 'completed' },
          { title: 'bar', status: 'active' },
          { title: 'baz', status: 'incomplete' },
        ]}
      />
    )
  }
}

class SearchInputTest extends React.Component<any, any> {
  render() {
    return (
      <>
        <SearchInput
          data-tid="search-input-tid"
          name="search-input"
          onFocus={() => {}}
          onChange={() => {}}
          onClick={() => {}}
          onBlur={() => {}}
          onKeyDown={() => {}}
          placeholder="search..."
        />
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
          data-tid="foo"
        />
        <Select
          onChange={onSelected}
          options={options}
          isAsync={true}
          isMulti={true}
          data-tid="foo"
        />
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

class TooltipTest extends React.Component<any, any> {
  render() {
    return <Tooltip label="Flip" details="Hi!" />
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

class PaginationTest extends React.Component<any, any> {
  render() {
    return (
      <Pagination
        currentPage={5}
        pageCount={10}
        fetchPageCallback={() => {
          return {}
        }}
      />
    )
  }
}

class PaginationWithDisplayLimitTest extends React.Component<any, any> {
  render() {
    return (
      <Pagination
        currentPage={5}
        pageCount={10}
        displayedPagesCount={6}
        fetchPageCallback={() => {
          return {}
        }}
      />
    )
  }
}
