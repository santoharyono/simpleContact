import React from 'react';
import renderer from 'react-test-renderer';
import {CustomButton} from '../components/molecules';

describe('Render customButton', () => {
  it('render customButton correctly', () => {
    const CustomButtonComponent = renderer.create(<CustomButton />).toJSON();
    expect(CustomButtonComponent).toMatchSnapshot();
  });
});
