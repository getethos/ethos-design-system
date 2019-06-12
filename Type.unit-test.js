import React from 'react'

import { deepSnapshot } from 'test/helpers/snapshot'

import { Heading, Text } from './Type'

describe('Type.js', () => {
  describe('{ Heading }', () => {
    Object.keys(Heading.SIZES).forEach((Size) => {
      Object.keys(Heading[Size]).forEach((Style) => {
        describe(`<Heading.${Size}.${Style}>`, () => {
          const Component = Heading[Size][Style]
          it('matches snapshot', () => {
            expect(
              deepSnapshot(<Component>Lorem ipsum</Component>)
            ).toMatchSnapshot()
          })
        })
      })
    })
  })

  describe('{ Text }', () => {
    Object.keys(Text.SIZES).forEach((Size) => {
      Object.keys(Text[Size]).forEach((Style) => {
        describe(`<Text.${Size}.${Style}>`, () => {
          const Component = Text[Size][Style]
          it('matches snapshot', () => {
            expect(
              deepSnapshot(<Component>Lorem ipsum dolor sit amet</Component>)
            ).toMatchSnapshot()
          })
        })
      })
    })
  })
})
