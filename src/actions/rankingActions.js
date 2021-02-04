import { rankingConstants } from "../constants/rankingConstants";
import { playerService } from "../services/playerService";
import { alertActions } from "./alertActions";

export const fetchRanking = () => {
  return (dispatch) => {
    dispatch(request());
    playerService.fetchRanking().then(
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
    return { type: rankingConstants.FETCH_RANKING_REQUEST };
  }
  function success(payload) {
    return { type: rankingConstants.FETCH_RANKING_SUCCESS, payload };
  }
  function failure() {
    return { type: rankingConstants.FETCH_RANKING_FAILURE };
  }
};
