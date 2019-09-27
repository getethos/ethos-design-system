import React from 'react'
import validateTruthy from './validateTruthy.js'

describe('validateTruthy', () => {
  test('validates truthy', () => {
    expect(validateTruthy(true).length).toBe(0)
    expect(validateTruthy(false).length).toBeTruthy()
  })
})
