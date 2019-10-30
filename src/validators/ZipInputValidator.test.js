import zipInputValidator from './ZipInputValidator.js'

describe('ZipInputValidator', () => {
  it('validates 5 digit zip codes', () => {
    expect(zipInputValidator('9').length === 0).toBeFalsy()
    expect(zipInputValidator('94').length === 0).toBeFalsy()
    expect(zipInputValidator('945').length === 0).toBeFalsy()
    expect(zipInputValidator('9454').length === 0).toBeFalsy()
    expect(zipInputValidator('94546').length === 0).toBeTruthy()
  })
})
