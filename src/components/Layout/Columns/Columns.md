### Click show/hide button in upper right to view demos with corresponding cms module titles and figma links.

```jsx
import {
  Button,
  TitleXLarge,
  TitleMedium,
  Body,
  TitleSmall,
  Layout,
} from '../../index'

const { HorizontallyPaddedContainer, ColumnWrapper, Column } = Layout

// Recommended: set this to true when developing with hot-reload.
const showDemosOnPageLoad = false

/**
 *  Some filler/placeholder/DRY variables, just to try and keep the demo clean.
 */

// String of 400 periods.
const plentyOfText =
  ' ' +
  Array(400)
    .fill('.')
    .join('')

// Lightweight bounding box to demonstrate spacing of divs.
const textWrapper = {
  padding: 0,
  border: '1px solid #ddd',
  overflowWrap: 'break-word',
}

// Throwaway elements for spacing.
const spacer = <div style={{ height: 16 }} />
const bigSpacer = <div style={{ height: 40 }} />

// Placeholder for big hero images.
const imagePlaceholder = (text) => (
  <div
    style={{
      backgroundColor: 'var(--BrandForest)',
      color: 'white',
      textAlign: 'center',
    }}
  >
    {bigSpacer}
    {bigSpacer}
    {bigSpacer}
    Image should go here
    {bigSpacer}
    {text}
    {bigSpacer}
    {bigSpacer}
    {bigSpacer}
  </div>
)

// Just to DRY out the example modules.
let exampleDemoCounter = 0
const moduleExample = ({ title, description, figmaUrl, jsx, skipSpacer }) => (
  <>
    {spacer}
    <TitleSmall.Sans.Medium500>
      {++exampleDemoCounter}. "{title}" module
    </TitleSmall.Sans.Medium500>
    <Body.Regular400>{description}</Body.Regular400>
    {spacer}
    <a
      href={figmaUrl}
      style={{
        color: '#8C001A',
        cursor: 'pointer',
      }}
      target="_blank"
    >
      Figma link
    </a>
    {spacer}
    {jsx}
    {bigSpacer}
    {!skipSpacer && (
      <>
        <div
          style={{
            width: 'calc(100% - 160px)',
            marginLeft: 80,
            borderTop: '1px solid #ddd',
          }}
        />
        {bigSpacer}
      </>
    )}
  </>
)

// Button to show/hide the demo; this demo is meant for elements which are
// screen-wide, and it needs to take up the entire width of the screen, but
// it's so big it blocks all the text of the page.
const showHideButton = (
  <button
    id="help"
    style={{
      position: 'fixed',
      zIndex: 50,
      top: 10,
      right: 10,
      backgroundColor: 'hotpink',
    }}
    onClick={() => {
      const x = document.querySelector('#columns-wrapper')
      x.style.display = !!x.style.display ? '' : 'none'
    }}
  >
    Show/hide
  </button>
)

;<div>
  {showHideButton}
  <div
    id="columns-wrapper"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100vw',
      zIndex: 5,
      boxShadow: 'inset 0 0 10px #000000',
      backgroundColor: 'white',
      display: showDemosOnPageLoad ? '' : 'none',
    }}
  >
    <HorizontallyPaddedContainer>
      {bigSpacer}
      <TitleXLarge.Sans.Regular400>Columns demos</TitleXLarge.Sans.Regular400>
      {moduleExample({
        title: 'Story',
        description: 'Two medium columns, second is alignRight, and divider',
        figmaUrl:
          'https://www.figma.com/file/BqpC4jxtI91RlTR4v9sIUZ6t/CMS-Playground?node-id=2815%3A2908',
        jsx: (
          <ColumnWrapper divider>
            <Column.Medium>
              <div style={textWrapper}>(Column.Medium){plentyOfText}</div>
            </Column.Medium>
            <Column.Medium alignRight>
              <div style={textWrapper}>(Column.Medium){plentyOfText}</div>
            </Column.Medium>
          </ColumnWrapper>
        ),
      })}

      {moduleExample({
        title: 'Highlight',
        description: 'Two medium columns, second is alignRight',
        figmaUrl:
          'https://www.figma.com/file/BqpC4jxtI91RlTR4v9sIUZ6t/CMS-Playground?node-id=2815%3A2411',
        jsx: (
          <ColumnWrapper>
            <Column.Medium>
              <div style={textWrapper}>(Column.Medium){plentyOfText}</div>
            </Column.Medium>
            <Column.Medium alignRight>
              {imagePlaceholder('(Column.Medium)')}
            </Column.Medium>
          </ColumnWrapper>
        ),
      })}

      {moduleExample({
        title: 'Header Homepage',
        description: 'Small column + large column with hero image',
        figmaUrl:
          'https://www.figma.com/file/BqpC4jxtI91RlTR4v9sIUZ6t/CMS-Playground?node-id=2408%3A4566',
        jsx: (
          <ColumnWrapper>
            <Column.Small>
              <div style={textWrapper}>
                (Column.Medium)
                {plentyOfText}
              </div>
            </Column.Small>
            <Column.Large>
              {imagePlaceholder('(Column Large, full 50% width)')}
            </Column.Large>
          </ColumnWrapper>
        ),
      })}
      {spacer}
    </HorizontallyPaddedContainer>
    {/* This color isn't in our approved list of colors so it's inline i guess */}
    <div style={{ backgroundColor: '#F5F3F0' }}>
      <HorizontallyPaddedContainer>
        {moduleExample({
          title: 'Intent Header',
          description:
            'Medium column + large column with hero image, then two large columns. Column to the right disappears on tablet.',
          figmaUrl:
            'https://www.figma.com/file/TUiIpan0bPpI2gGUCoSqoT/Intent-Header?node-id=132%3A92',
          skipSpacer: true,
          jsx: (
            <>
              <ColumnWrapper>
                <Column.Medium>
                  <div style={textWrapper}>
                    <TitleXLarge.Serif.Book500>
                      Life insurance, the human way.
                    </TitleXLarge.Serif.Book500>
                    {spacer}

                    <Body.Regular400>
                      Ethos makes it faster and easier to secure your family’s
                      financial future with affordable policies that fit your
                      life.
                    </Body.Regular400>
                    {bigSpacer}
                    {bigSpacer}
                    <Button.Medium.Black arrowIcon>
                      Check my price
                    </Button.Medium.Black>
                  </div>
                </Column.Medium>
                <Column.Large>
                  <div className="hideOnPhoneAndTablet">
                    {imagePlaceholder('(Column Large)')}
                    {imagePlaceholder('This is a pretty tall image')}
                  </div>
                </Column.Large>
              </ColumnWrapper>

              {bigSpacer}

              <ColumnWrapper>
                <Column.Large>
                  <div className="columns-demo-margin-right-nonmobile">
                    <TitleMedium.Serif.Book500>
                      Want to know more about Ethos life insurance?
                    </TitleMedium.Serif.Book500>
                    {spacer}
                    <Body.Regular400>
                      Learn more about our quick and easy application process
                      and how to pick the best policy for your family.
                    </Body.Regular400>
                    {spacer}
                    <Button.Unstyled arrowIcon>Learn more</Button.Unstyled>
                  </div>
                </Column.Large>
                <Column.Large>
                  <div className="columns-demo-margin-left-nonmobile">
                    <TitleMedium.Serif.Book500>
                      Want to know more about Ethos life insurance?
                    </TitleMedium.Serif.Book500>
                    {spacer}
                    <Body.Regular400>
                      Learn more about our quick and easy application process
                      and how to pick the best policy for your family.
                    </Body.Regular400>
                    {spacer}
                    <Button.Unstyled arrowIcon>Learn more</Button.Unstyled>
                  </div>
                </Column.Large>
              </ColumnWrapper>
            </>
          ),
        })}
      </HorizontallyPaddedContainer>
    </div>

    {/* End of demo */}
    <div style={{ textAlign: 'center', padding: 40 }}>∎</div>
  </div>
</div>
```
