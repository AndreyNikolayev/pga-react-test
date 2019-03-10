import { shallow } from 'enzyme';
import React from 'react';
import Spinner from '..';

describe('Spinner', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper).toMatchSnapshot();
  });
});