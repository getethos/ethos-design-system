import React from 'react'
import validateMinMaxFactory from './validateMinMax.js'

describe('validateMinMax', () => {
  test('zero to', () => {
    expect(validateMinMaxFactory(0, 2)('1')).toBeUndefined()
    expect(validateMinMaxFactory(0, 2)('12')).toBeUndefined()
    expect(validateMinMaxFactory(0, 2)('123')).not.toBeUndefined()
  })

  test('greater then zero up to', () => {
    expect(validateMinMaxFactory(2, 5)('1')).not.toBeUndefined()
    expect(validateMinMaxFactory(2, 5)('12')).toBeUndefined()
    expect(validateMinMaxFactory(2, 5)('12345')).toBeUndefined()
    expect(validateMinMaxFactory(2, 5)('123456')).not.toBeUndefined()
  })
})
