import { shallow } from 'enzyme';
import React from 'react';
import PlayerDashboard from '..';

describe('PlayerDashboard', () => {

  let wrapper;
  let mockProps;
  const selectPlayerMock = jest.fn();
  const deletePlayerMock = jest.fn();

  beforeEach(() => {
    mockProps = {
      selectPlayer: selectPlayerMock,
      deletePlayer: deletePlayerMock,
      players: {
        '1' : {
          firstName: 'First 1',
          lastName: 'Last 1',
          score: 1
        },
        '2': {
          firstName: 'First 2',
          lastName: 'Last 2',
          score: 2
        }
      }
    };

    wrapper = shallow(<PlayerDashboard {...mockProps}/>);
  })

  it('renders correctly', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('has table with same amount of rows as players array', () => {
    expect(wrapper.find('tbody tr').length).toBe(Object.keys(mockProps.players).length);
  });

  it('handles row click', () => {
    const firstRow = wrapper.find('tbody tr').first();
    firstRow.simulate('click');

    expect(selectPlayerMock).toBeCalled();
    selectPlayerMock.mockReset();
  });

  it('handles delete click', () => {
    const firstDeleteButton = wrapper.find('tr .delete-btn').first();
    firstDeleteButton.simulate('click', {
      stopPropagation: () => {
      }
     });

    expect(deletePlayerMock).toBeCalled();
    expect(deletePlayerMock.mock.calls[0][0]).toBe(Object.keys(mockProps.players)[0]);
    deletePlayerMock.mockReset();
  });

  it('does not have rows if there are no players', () => {
    wrapper.setProps({ players: null });

    expect(wrapper.find('tbody tr').length).toBe(0);
  });
});