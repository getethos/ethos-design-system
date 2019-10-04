import React from 'react'
import restrict from './restrict.js'

describe('restrict', () => {
  it('works with a valid email', () => {
    const validEmail = 'foo@bar.com'
    expect(restrict(validEmail)).toEqual(validEmail)
  })

  it('prohibits', () => {
    expect(restrict('|').length).toEqual(0)
    expect(restrict('"').length).toEqual(0)
    expect(restrict('<').length).toEqual(0)
    expect(restrict('>').length).toEqual(0)
    expect(restrict('[').length).toEqual(0)
    expect(restrict(']').length).toEqual(0)
    expect(restrict('{').length).toEqual(0)
    expect(restrict('}').length).toEqual(0)
    expect(restrict('`').length).toEqual(0)
    expect(restrict(';').length).toEqual(0)
    expect(restrict('=').length).toEqual(0)
  })

  it('prunes but leaves valid characters', () => {
    expect(restrict('a|a').length).toEqual(2)
    expect(restrict('a"a').length).toEqual(2)
    expect(restrict('a<a').length).toEqual(2)
    expect(restrict('a>a').length).toEqual(2)
    expect(restrict('a[a').length).toEqual(2)
    expect(restrict('a]a').length).toEqual(2)
    expect(restrict('a{a').length).toEqual(2)
    expect(restrict('a}a').length).toEqual(2)
    expect(restrict('a`a').length).toEqual(2)
    expect(restrict('a;a').length).toEqual(2)
    expect(restrict('a=a').length).toEqual(2)
  })
})
