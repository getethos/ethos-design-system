import React from 'react';
import zipInputValidator from './ZipInputValidator.js';

describe('ZipInputValidator', () => {
  it('validates 5 digit zip codes', () => {
    expect(zipInputValidator('9').length === 0).toBeFalsy()
    expect(zipInputValidator('94').length === 0).toBeFalsy()
    expect(zipInputValidator('945').length === 0).toBeFalsy()
    expect(zipInputValidator('9454').length === 0).toBeFalsy()
    expect(zipInputValidator('94546').length === 0).toBeTruthy()
  });

  // hyphenated part e.g. 94546-1234
  it('validates 5 digit, hyphen, 4 digits', () => {
    expect(zipInputValidator('94546-').length === 0).toBeFalsy()
    expect(zipInputValidator('94546-1').length === 0).toBeFalsy()
    expect(zipInputValidator('94546-12').length === 0).toBeFalsy()
    expect(zipInputValidator('94546-123').length === 0).toBeFalsy()
    expect(zipInputValidator('94546-1234').length === 0).toBeTruthy()
  });
});
