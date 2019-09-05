import React from 'react';
import { BirthdateInput } from './BirthdateInput';
import renderer from 'react-test-renderer';

describe('BirthdateInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(<BirthdateInput
        name="le-birthdate"
        labelCopy="What is your birthdate?"
        data-tid='le-birthdate'
        validator={(errors) => {}}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
