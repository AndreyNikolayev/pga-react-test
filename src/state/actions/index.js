import { FETCH_PLAYERS } from './types';
import { playersRef } from '../../config/firebase';

export const addUpdatePlayer = (playerId, player) => async dispatch => {
  if(playerId) {
    playersRef.child(playerId).set(player);
  } else {
    playersRef.push().set(player);
  }
};

export const deletePlayer = playerId => async dispatch => {
    playersRef.child(playerId).remove();
};

export const fetchPlayers = () => async dispatch => {
  playersRef.on('value', snapshot => {
    dispatch({
      type: FETCH_PLAYERS,
      payload: snapshot.val()
    });
  });
};