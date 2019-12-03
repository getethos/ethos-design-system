```jsx
import { Spacer, Body, TitleSmall, Layout } from '../../index'

const { HorizontallyPaddedContainer, ColumnWrapper, Column } = Layout

const absoluteFullScreenSize = {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100vw',
  zIndex: 5,
  boxShadow: 'inset 0 0 10px #000000',
  backgroundColor: 'white',
}

const plentyOfText =
  ' ' +
  Array(400)
    .fill('.')
    .join('')

const baseStyles = {
  padding: 20,
  border: '1px solid #ddd',
  overflowWrap: 'break-word',
}

const sm = {
  ...baseStyles,
}

const med = {
  ...baseStyles,
}

const lg = {
  backgroundColor: 'var(--BrandForest)',
  color: 'white',
  ...baseStyles,
}

const linkProps = {
  style: {
    color: 'burgundy',
    cursor: 'pointer',
  },
  target: '_blank',
}

const spacer = <div style={{ height: 16 }} />

;<div style={absoluteFullScreenSize}>
  <HorizontallyPaddedContainer>
    <br />
    <TitleSmall.Sans.Medium500>Story module</TitleSmall.Sans.Medium500>
    <Body.Regular400>Two medium columns and divider.</Body.Regular400>
    <a
      href="https://www.figma.com/file/BqpC4jxtI91RlTR4v9sIUZ6t/CMS-Playground?node-id=2815%3A2908"
      {...linkProps}
    >
      Figma link
    </a>
    {spacer}
    <ColumnWrapper divider>
      <Column.Medium>
        <div style={med}>(Column.Medium) Story module {plentyOfText}</div>
      </Column.Medium>
      <Column.Medium alignRight>
        <div style={med}>(Column.Medium) Story module right{plentyOfText}</div>
      </Column.Medium>
    </ColumnWrapper>
    <br />
    <br />
    <ColumnWrapper>
      <Column.Medium>
        <div style={med}>
          (Column.Medium)
          {plentyOfText}
        </div>
      </Column.Medium>
      <Column.Large>
        <div style={lg}>
          (Column Large, full 50% width)
          {[plentyOfText, plentyOfText, plentyOfText, plentyOfText]
            .join('')
            .replace(/ /g, '')}
        </div>
      </Column.Large>
    </ColumnWrapper>
    <br />
  </HorizontallyPaddedContainer>
</div>
```
