import {
  FETCH_PLAYERS
} from '../actions/types';

const initialState = {
  players: undefined,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PLAYERS:
      return {
        ...state,
        players: action.payload
      }
    default:
      return state;
  }
};