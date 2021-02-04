import { playerConstants } from "../constants/playerConstants";
import { loginConstants } from "../constants/userConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case playerConstants.FETCH_PLAYER_REQUEST:
      return { ...state };
    case playerConstants.FETCH_PLAYER_SUCCESS:
      return { ...state, ...action.payload };
    case playerConstants.FETCH_PLAYER_FAILURE:
      return {};
    case loginConstants.LOGOUT:
      return {};
    default:
      return state;
  }
};
