import { shallow } from 'enzyme';
import React from 'react';
import EditPlayer from '..';

describe('EditPlayer', () => {
  it('renders correctly', () => {
    const match = {params: {}};

    const wrapper = shallow(<EditPlayer match={match} save={() => null} />);

    expect(wrapper).toMatchSnapshot();
  });
});