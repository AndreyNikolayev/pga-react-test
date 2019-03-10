import { shallow } from 'enzyme';
import React from 'react';
import EditPlayer from '..';

describe('EditPlayer', () => {

  let wrapper;
  let mockProps;
  const saveMock = jest.fn();

  beforeEach(() => {
    mockProps = {
      handleSave: saveMock,
      playerId: '1',
      player: {
        firstName: 'First 1',
        lastName: 'Last 1',
        score: '1'
      }
    };

    wrapper = shallow(<EditPlayer {...mockProps}/>);
  })


  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('initializes inputs correctly', () => {
    const firstNameInput = wrapper.find('#firstName');
    expect(firstNameInput.props().value).toBe(mockProps.player.firstName);

    const lastNameInput = wrapper.find('#lastName');
    expect(lastNameInput.props().value).toBe(mockProps.player.lastName);

    const scoreInput = wrapper.find('#score');
    expect(scoreInput.props().value).toBe(mockProps.player.score);
  });

  it('handles input change correctly', () => {
    wrapper.find('#firstName').simulate('change', {
      target: {
        value: 'New First Name'
      }
    });
    wrapper.find('#lastName').simulate('change', {
      target: {
        value: 'New Last Name'
      }
    });
    wrapper.find('#score').simulate('change', {
      target: {
        value: '33'
      }
    });

    expect(wrapper.find('#firstName').props().value).toBe('New First Name');
    expect(wrapper.find('#lastName').props().value).toBe('New Last Name');
    expect(wrapper.find('#score').props().value).toBe('33');
  });

  it('handles blur correctly', () => {
    expect(wrapper.state('firstName').isTouched).toBeFalsy();
    expect(wrapper.state('lastName').isTouched).toBeFalsy();
    expect(wrapper.state('score').isTouched).toBeFalsy();
    

    wrapper.find('#firstName').simulate('blur');
    wrapper.find('#lastName').simulate('blur');
    wrapper.find('#score').simulate('blur');

    expect(wrapper.state('firstName').isTouched).toBeTruthy();
    expect(wrapper.state('lastName').isTouched).toBeTruthy();
    expect(wrapper.state('score').isTouched).toBeTruthy();
  });

  it('validates text inputs', () => {
    wrapper.find('#firstName').simulate('change', {
      target: {
        value: ''
      }
    });
    wrapper.find('#lastName').simulate('change', {
      target: {
        value: 'New Last Name'
      }
    });

    expect(wrapper.state('firstName').errorMessage).toBeTruthy();
    expect(wrapper.state('lastName').errorMessage).toBeFalsy();

    wrapper.find('#firstName').simulate('change', {
      target: {
        value: 'New First Name'
      }
    });
    wrapper.find('#lastName').simulate('change', {
      target: {
        value: ''
      }
    });

    expect(wrapper.state('firstName').errorMessage).toBeFalsy();
    expect(wrapper.state('lastName').errorMessage).toBeTruthy();
  });

  it('validates score', () => {
    wrapper.find('#score').simulate('change', {
      target: {
        value: ''
      }
    });
    expect(wrapper.state('score').errorMessage).toBeTruthy();

    wrapper.find('#score').simulate('change', {
      target: {
        value: '32'
      }
    });
    expect(wrapper.state('score').errorMessage).toBeFalsy();
    
    wrapper.find('#score').simulate('change', {
      target: {
        value: 'sdsg'
      }
    });
    expect(wrapper.state('score').errorMessage).toBeTruthy();

    wrapper.find('#score').simulate('change', {
      target: {
        value: '-1'
      }
    });
    expect(wrapper.state('score').errorMessage).toBeTruthy();

    wrapper.find('#score').simulate('change', {
      target: {
        value: '101'
      }
    });
    expect(wrapper.state('score').errorMessage).toBeTruthy();

    wrapper.find('#score').simulate('change', {
      target: {
        value: '100'
      }
    });
    expect(wrapper.state('score').errorMessage).toBeFalsy();

    wrapper.find('#score').simulate('change', {
      target: {
        value: '0'
      }
    });
    expect(wrapper.state('score').errorMessage).toBeFalsy();
  });

  it('handles player changed via props', () => {
    wrapper.setProps({
      playerId: '2',
      player: {
        firstName: 'First 2',
        lastName: 'Last 2',
        score: '2'
      } 
    });

   setTimeout(() => {
     wrapper.update();
     expect(wrapper.state('playerId')).toBe('2');
     expect(wrapper.state('firstName').value).toBe('First 2');
     expect(wrapper.state('lastName').value).toBe('Last 2');
     expect(wrapper.state('score').value).toBe('2');
   },0)
  });

  it('handles invalid form', () => {
    wrapper.setState({
      firstName: {
        value: '',
        errorMessage: 'Field is required',
        isTouched: true
      } 
    });

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {
      }
     });

    expect(saveMock).not.toBeCalled();
    expect(wrapper.state('firstName').isTouched).toBeTruthy();
    expect(wrapper.state('lastName').isTouched).toBeTruthy();
    expect(wrapper.state('score').isTouched).toBeTruthy();
    saveMock.mockReset();
  });

  it('handles valid form', () => {

    wrapper.find('form').simulate('submit', {
      preventDefault: () => {
      }
     });

    expect(saveMock).toBeCalled();
    expect(saveMock.mock.calls[0][0]).toBe(wrapper.state('playerId'));
    expect(saveMock.mock.calls[0][1]).toEqual({
      firstName: wrapper.state('firstName').value,
      lastName:  wrapper.state('lastName').value,
      score: parseInt( wrapper.state('score').value, 10)
    });
    saveMock.mockReset();
  });
});