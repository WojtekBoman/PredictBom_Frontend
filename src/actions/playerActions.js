import {playerConstants} from '../constants/playerConstants';
import {playerService} from '../services/playerService';
import { alertActions } from './alertActions';

export const fetchPlayer = (username) => {
    return dispatch => {
        dispatch(request({ username }));
        playerService.fetchPlayer(username)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(payload) { return { type: playerConstants.FETCH_PLAYER_REQUEST, payload } }
    function success(payload) { return { type: playerConstants.FETCH_PLAYER_SUCCESS, payload } }
    function failure(error) { return { type: playerConstants.FETCH_PLAYER_FAILURE, error } }
}
