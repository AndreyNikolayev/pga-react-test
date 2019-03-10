import { shallow } from 'enzyme';
import React from 'react';
import PlayerDashboard from '..';

describe('PlayerDashboard', () => {

  it('renders correctly', () => {
    const wrapper = shallow(<PlayerDashboard selectPlayer={()=>null} deletePlayer={()=>null}/>);

    expect(wrapper).toMatchSnapshot();
  });
});