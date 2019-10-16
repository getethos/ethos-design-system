import React from 'react'
import validateExists from './validateExists.js'

describe('validateExists', () => {
  test('validates existence of booleans', () => {
    expect(validateExists(true).length).toBe(0)
    expect(validateExists(false).length).toBe(0)
  })

  test('validates defined', () => {
    expect(validateExists(undefined).length).toBeTruthy()
  })
})
