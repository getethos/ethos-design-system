import React from 'react'

import { deepSnapshot } from 'test/helpers/snapshot'

import { Button } from './Buttons'

const buttonText = 'Click me'

describe('Buttons.js', () => {
  describe('{ Button }', () => {
    Object.keys(Button).forEach((Size) => {
      Object.keys(Button[Size]).forEach((Style) => {
        describe(`<Button.${Size}.${Style}>`, () => {
          it('matches snapshot', () => {
            const Component = Button[Size][Style]
            expect(
              deepSnapshot(<Component>{buttonText}</Component>)
            ).toMatchSnapshot()
          })
        })
      })
    })
  })
})
