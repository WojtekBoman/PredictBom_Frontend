import { playerConstants } from "../constants/playerConstants";
import { playerService } from "../services/playerService";
import { alertActions } from "./alertActions";

export const fetchPlayer = (username) => {
  return (dispatch) => {
    dispatch(request());
    playerService.fetchPlayer(username).then(
      (user) => {
        dispatch(success(user));
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: playerConstants.FETCH_PLAYER_REQUEST };
  }
  function success(payload) {
    return { type: playerConstants.FETCH_PLAYER_SUCCESS, payload };
  }
  function failure() {
    return { type: playerConstants.FETCH_PLAYER_FAILURE };
  }
};
