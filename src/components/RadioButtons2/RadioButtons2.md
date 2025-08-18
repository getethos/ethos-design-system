```jsx
const READY_TODAY = `I'm ready today`
const NEXT_7_DAYS = 'In the next 7 days'
const IntentOptions = [
  { value: READY_TODAY },
  { value: NEXT_7_DAYS },
  { value: 'In 1 to 2 months' },
  { value: 'After 3 months' },
]

<RadioButtonGroup2
  name='intent-to-apply'
  labelCopy='When would you like to apply?'
  onChange={({ value }) => console.log(value)}
  validator={(x) => (x === NEXT_7_DAYS ? 'This one is invalid.' : '')}
  options={IntentOptions.map((t) => ({
    name: t.value,
    value: t.value,
    label: t.value,
  }))}
/>
```

Disabled radio group

```jsx
const READY_TODAY = `I'm ready today`
const NEXT_7_DAYS = 'In the next 7 days'
const IntentOptions = [
  { value: READY_TODAY },
  { value: NEXT_7_DAYS },
  { value: 'In 1 to 2 months' },
  { value: 'After 3 months' },
]

<RadioButtonGroup2
  name='intent-to-apply"
  labelCopy='When would you like to apply?'
  onChange={({ value }) => console.log(value)}
  validator={(x) => (x === NEXT_7_DAYS ? 'This one is invalid.' : '')}
  options={IntentOptions.map((t) => ({
    name: t.value,
    value: t.value,
    label: t.value,
  }))}
  disabled
/>
```

Right aligned label for radio buttons

```jsx
import React from 'react'
import { Body2 } from '../Body2.js'

const CoverageOptions = [
  { value: '10 years' },
  { value: '15 years' },
  { value: '20 years' },
  { value: '30 years' },
]

<RadioButtonGroup2
  name='intent-to-apply'
  labelCopy=''
  onChange={({ value }) => console.log(value)}
  options={CoverageOptions.map((t) => ({
    name: t.value,
    value: t.value,
    label: t.value,
    rightAlignedLabel: (
      <>
        <Body2.Medium500 element="span">$1000.00 </Body2.Medium500>
        <Body2.Regular400 element="span">per month</Body2.Regular400>
      </>
    ),
  }))}
/>
```

Coverage options with lifetime having topLabel

```jsx
import React from 'react'
import { Body2 } from '../Body2.js'

const CoverageOptions = [
  { value: '10 years' },
  { value: '15 years' },
  { value: '20 years' },
  { value: '30 years' },
  { value: 'lifetime' },
]

<RadioButtonGroup2
  name='coverage-options'
  labelCopy='Coverage Options'
  onChange={({ value }) => console.log(value)}
  options={CoverageOptions.map((t) => ({
    name: t.value,
    value: t.value,
    label: t.value === 'lifetime' ? (
      <>
        <div>Lifetime</div>
        <div>*This price is for $1M in coverage—the maximum available for IUL.</div>
      </>
    ) : t.value,
    ...(t.value === 'lifetime' && {
      topLabel: <span style={{ padding: '20px' }}>Best Value</span>,
    }),
    rightAlignedLabel: (
      <>
        <Body2.Medium500 element="span">
          {t.value === 'lifetime' ? '$2,500.00' : '$1000.00'}{' '}
        </Body2.Medium500>
        <Body2.Regular400 element="span">
          {t.value === 'lifetime' ? 'one-time payment' : 'per month'}
        </Body2.Regular400>
      </>
    ),
  }))}
/>
```
