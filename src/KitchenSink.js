import React from 'react'
import {
  Body,
  Button,
  Caption,
  Footnote,
  Input,
  Layout,
  Link,
  Logo,
  RadioButtonGroup,
  Spacer,
  TitleSmall,
  TitleMedium,
  TitleLarge,
  TitleXLarge,
  TitleXXLarge,
  InfoMessage,
  TextInput,
  ZipInput,
  ZipInputValidator,
} from './components/index.js'

import './KitchenSink.scss'
import './components/design-system.css'
import './fonts/index.css'

const KitchenSink = () => {
  return (
    <>
      <header className="KitchenSink-Header">
        <h2>Kitchensink Spotcheck</h2>
      </header>
      <main className="KitchenSink">
        <section>
          <h2>Buttons</h2>
          <Button.Medium.Black>Button.Medium.Black</Button.Medium.Black>
          <Button.Medium.Black fullWidth>
            Button.Medium.Black fullWidth
          </Button.Medium.Black>
          <Button.Medium.BlackOutline>
            Button.Medium.BlackOutline
          </Button.Medium.BlackOutline>
          <Button.Medium.WhiteOutline>
            Button.Medium.WhiteOutline
          </Button.Medium.WhiteOutline>
          <Button.Medium.Stateful.Default>
            Button.Medium.Stateful
          </Button.Medium.Stateful.Default>
          <Button.Medium.Stateful.Default isSelected={true}>
            Button.Medium.Stateful
          </Button.Medium.Stateful.Default>
          <Button.Unstyled>Button.Unstyled</Button.Unstyled>
        </section>
        <section>
          <h2>Type</h2>
          <Body.Regular400>
            We offer modern, ethical life insurance to protect the life you're
            building and the people you love
          </Body.Regular400>
          <Body.Medium500>
            We offer modern, ethical life insurance to protect the life you're
            building and the people you love
          </Body.Medium500>
          <TitleXXLarge.Serif.Book500>
            We offer modern, ethical life insurance
          </TitleXXLarge.Serif.Book500>
          <TitleXXLarge.Serif.Regular400>
            We offer modern, ethical life insurance
          </TitleXXLarge.Serif.Regular400>
          <TitleXXLarge.Serif.Demi600>
            We offer modern, ethical life insurance
          </TitleXXLarge.Serif.Demi600>
          <TitleXXLarge.Sans.Medium500>
            We offer modern, ethical life insurance
          </TitleXXLarge.Sans.Medium500>
          <TitleXXLarge.Sans.Regular400>
            We offer modern, ethical life insurance
          </TitleXXLarge.Sans.Regular400>
          <TitleSmall.Serif.Book500>
            We offer modern, ethical life insurance
          </TitleSmall.Serif.Book500>
          <TitleSmall.Serif.Regular400>
            We offer modern, ethical life insurance
          </TitleSmall.Serif.Regular400>
          <TitleSmall.Serif.Demi600>
            We offer modern, ethical life insurance
          </TitleSmall.Serif.Demi600>
          <TitleSmall.Sans.Medium500>
            We offer modern, ethical life insurance
          </TitleSmall.Sans.Medium500>
          <TitleSmall.Sans.Regular400>
            We offer modern, ethical life insurance
          </TitleSmall.Sans.Regular400>
          <Footnote.Medium500>
            We offer modern, ethical life insurance to protect the life you're
            building and the people you love
          </Footnote.Medium500>
          <Caption.Medium500>
            We offer modern, ethical life insurance to protect the life you're
            building and the people you love
          </Caption.Medium500>
        </section>
        <section>
          <h2>Layout</h2>
          <Layout.HorizontallyPaddedContainer>
            <Logo.Inline color="Black" />
            <p>
              Layout is a work-in-progress at the moment. Another short
              paragraphy.
            </p>
          </Layout.HorizontallyPaddedContainer>
        </section>
        <section>
          <h2>InfoMessages</h2>
          <InfoMessage.Error>Error</InfoMessage.Error>
          <InfoMessage.Warning>Warning</InfoMessage.Warning>
          <InfoMessage.Info>Info</InfoMessage.Info>
          <InfoMessage.Success>Success</InfoMessage.Success>
        </section>
        <section>
          <h2>Inputs</h2>
          <TextInput
            name="example"
            labelCopy="Example: validator is value.length % 2"
            data-tid="the-text-input"
            validator={(x) =>
              x.length % 2
                ? 'Text does not have an even number of characters'
                : ''
            }
          />
          <h2>ZipInput</h2>
          <ZipInput
            name="this-zip-input-example"
            labelCopy="What is your zip code?"
            data-tid='the-zip-input'
            validator={(zip) => {
              const errors = ZipInputValidator(zip)
              // More custom logic here should you wish
              return errors
            }}
          />
          <h2>RadioButtonGroup</h2>
          <RadioButtonGroup
            name="gender"
            value="Female"
            onChange={() => {}}
            options={[
              {
                'data-tid': 'gender-male',
                name: 'male',
                label: 'Male',
                value: 'M',
              },
              {
                'data-tid': 'gender-female',
                name: 'female',
                label: 'Female',
                value: 'F',
              },
            ]}
          />
        </section>
        <section>
          <h2>Spacer</h2>
          <Body.Regular400>Some text copy</Body.Regular400>
          <Spacer.H24 />
          <Body.Regular400>Some more text copy</Body.Regular400>
          <Spacer.H24 />
          <Body.Regular400>
            Some text.
            <Spacer.W8 />
            Some more text.
          </Body.Regular400>
        </section>
        <section>
          <h2>Spacer</h2>
          <Body.Regular400>Some text copy</Body.Regular400>
          <Spacer.H24 />
          <Body.Regular400>Some more text copy</Body.Regular400>
          <Spacer.H24 />
          <Body.Regular400>
            Some text.
            <Spacer.W8 />
            Some more text.
          </Body.Regular400>
        </section>
      </main>
    </>
  )
}

export default KitchenSink
