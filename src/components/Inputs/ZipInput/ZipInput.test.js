import React from 'react';
import { ZipInput } from './ZipInput';
import renderer from 'react-test-renderer';

describe('ZipInput', () => {
  it('default rendering', () => {
    const tree = renderer
      .create(<ZipInput
        name="le-zip"
        allCaps={true}
        labelCopy="What is your zip code?"
        data-tid='le-zip'
        validator={(errors) => {}}
      />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
