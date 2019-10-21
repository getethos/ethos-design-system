import emailFormatValidator from './EmailValidator.js'

describe('EmailFormatValidator', () => {
  it('validates 5 digit zip codes', () => {
    // Invalid Emails
    expect(emailFormatValidator('test_string').length === 0).toBeFalsy()
    expect(emailFormatValidator('james@ethoslife.').length === 0).toBeFalsy()
    expect(emailFormatValidator('ethoslife.com').length === 0).toBeFalsy()
    expect(emailFormatValidator('@ethoslife.com').length === 0).toBeFalsy()
    expect(emailFormatValidator('rob@spam@ethos.com').length === 0).toBeFalsy()
    expect(emailFormatValidator('rob@ethos,com').length === 0).toBeFalsy()

    // Valid Emails
    expect(emailFormatValidator('rob@ethoslife.com').length === 0).toBeTruthy()
    expect(emailFormatValidator('rob+spam@ethos.com').length === 0).toBeTruthy()
    expect(emailFormatValidator('rob.spam@ethos.com').length === 0).toBeTruthy()
    expect(emailFormatValidator('rob&spam@ethos.com').length === 0).toBeTruthy()
  })
})
