import validateNumberRange from './NumberInputValidator.js'

describe('validateNumberRnage', () => {
  test('validates if number stays within the range', () => {
    expect(validateNumberRange(0, 2)(0)).toBeUndefined()
    expect(validateNumberRange(0, 2)(2)).toBeUndefined()
    expect(validateNumberRange(0, 2)(3)).not.toBeUndefined()
    expect(validateNumberRange(0, 2)(-1)).not.toBeUndefined()
  })
})
