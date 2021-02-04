import { betsConstants } from "../constants/betsConstants";
import _ from "lodash";

export default (state = {}, action) => {
  switch (action.type) {
    case betsConstants.FETCH_BET_PRICE_REQUEST:
      return { ...state };
    case betsConstants.FETCH_BET_PRICE_SUCCESS:
      return { ...state, ..._.mapKeys([action.payload], "betId") };
    case betsConstants.FETCH_BET_PRICE_FAILURE:
      return { ...state };
    case betsConstants.DELETE_BET:
      return _.omit(state, action.payload);
    default:
      return state;
  }
};
