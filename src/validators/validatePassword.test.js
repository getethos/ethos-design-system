import React from 'react'
import validatePassword from './validatePassword.js'

describe('validatePassword', () => {
  test('valid passwords', () => {
    expect(validatePassword('AbcAbc!23').length).toBe(0)
    expect(validatePassword('!AbcAbc23').length).toBe(0)
    expect(validatePassword('!23AbcAbc').length).toBe(0)
    expect(validatePassword('!#$%^&*1Ab').length).toBe(0)
  })

  test('invalid length', () => {
    expect(validatePassword('').length > 0).toBe(true)
    expect(validatePassword('Abc!234').length > 0).toBe(true)
  })

  test('missing number', () => {
    expect(validatePassword('AbcAbc!#$').length > 0).toBe(true)
  })

  test('missing special character', () => {
    expect(validatePassword('AbcAbc123').length > 0).toBe(true)
  })

  test('missing uppercase letter', () => {
    expect(validatePassword('abcabc!23').length > 0).toBe(true)
  })

  test('missing lowercase letter', () => {
    expect(validatePassword('ABCAABC!23').length > 0).toBe(true)
  })
})
