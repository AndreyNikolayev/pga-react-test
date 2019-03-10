import {
    createSelector
} from "reselect";

export const getPlayers = (state) => state.players;
export const getIsLoading = (state) => state.players === undefined;

export const getCurrentPlayer = playerId => createSelector(
    [getPlayers],
    (players) => players && players[playerId]
);