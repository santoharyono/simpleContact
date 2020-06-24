import React from 'react';
import renderer from 'react-test-renderer';
import {
  CustomButton,
  CustomTextInput,
  RoundButton,
} from '../components/molecules';

describe('Render customButton', () => {
  it('render customButton correctly', () => {
    const CustomButtonComponent = renderer.create(<CustomButton />).toJSON();
    expect(CustomButtonComponent).toMatchSnapshot();
  });
});

describe('Render customTextInput', () => {
  it('render customTextInput correctly', () => {
    const CustomTextInputComponent = renderer
      .create(<CustomTextInput />)
      .toJSON();
    expect(CustomTextInputComponent).toMatchSnapshot();
  });
});

describe('Render roundButton', () => {
  it('render roundButton correctly', () => {
    const RoundButtonComponent = renderer.create(<RoundButton />).toJSON();
    expect(RoundButtonComponent).toMatchSnapshot();
  });
});
