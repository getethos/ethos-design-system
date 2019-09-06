import React from 'react';
import { BirthdateInput } from './BirthdateInput';
import renderer from 'react-test-renderer';

// TODO: make a helper
// https://github.com/text-mask/text-mask/issues/427
jest.mock('react-text-mask', () => (props) => <input type="text" {...props} />)

describe('BirthdateInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(
        <BirthdateInput
          dateFormat='mm/dd/yyyy'
          name="le-birthdate"
          allCaps={true}
          labelCopy="What is your birthdate?"
          data-tid='le-birthdate'
          validator={(thing) => {}}
          name="birthDate"
          minAge={20}
          maxAge={65}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
