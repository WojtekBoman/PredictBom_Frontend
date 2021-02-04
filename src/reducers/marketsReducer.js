import { marketsConstants } from "../constants/marketsConstants";
import _ from "lodash";

const updateArr = (arr, action) => {
  const index = arr.findIndex(
    (market) => market.marketId === action.payload.marketId
  );
  const newArray = [...arr];
  newArray[index] = action.payload;
  return newArray;
};

export default (state = [], action) => {
  switch (action.type) {
    case marketsConstants.FETCH_MARKETS_REQUEST:
      return [...state];
    case marketsConstants.FETCH_MARKETS_SUCCESS:
      return [...action.payload];
    case marketsConstants.FETCH_MARKETS_FAILURE:
      return [...state];
    case marketsConstants.FETCH_MARKET_REQUEST:
      return [...state];
    case marketsConstants.FETCH_MARKET_SUCCESS:
      if (state.find((market) => market.marketId === action.payload.marketId)) {
        return [...state];
      }
      return [...state, action.payload];
    case marketsConstants.FETCH_MARKET_FAILURE:
      return [...state];
    case marketsConstants.CREATE_MARKET_REQUEST:
      return [...state];
    case marketsConstants.CREATE_MARKET_SUCCESS:
      updateArr(state, action);
    case marketsConstants.CREATE_MARKET_FAILURE:
      return [...state];
    case marketsConstants.SET_MARKET_COVER_REQUEST:
      return [...state];
    case marketsConstants.SET_MARKET_COVER_SUCCESS:
      return updateArr(state, action);
    case marketsConstants.SET_MARKET_COVER_FAILURE:
      return [...state];
    case marketsConstants.ADD_BET_REQUEST:
      return [...state];
    case marketsConstants.ADD_BET_SUCCESS:
      return updateArr(state, action);
    case marketsConstants.ADD_BET_FAILURE:
      return [...state];
    case marketsConstants.DELETE_BET_REQUEST:
      return [...state];
    case marketsConstants.DELETE_BET_SUCCESS:
      return updateArr(state, action);
    case marketsConstants.DELETE_BET_FAILURE:
      return [...state];
    case marketsConstants.MAKE_MARKET_PUBLIC_REQUEST:
      return [...state];
    case marketsConstants.MAKE_MARKET_PUBLIC_SUCCESS:
      return updateArr(state, action);
    case marketsConstants.MAKE_MARKET_PUBLIC_FAILURE:
      return [...state];
    case marketsConstants.SOLVE_SINGLE_BET_MARKET_REQUEST:
      return [...state];
    case marketsConstants.SOLVE_SINGLE_BET_MARKET_SUCCESS:
      return updateArr(state, action);
    case marketsConstants.SOLVE_SINGLE_BET_MARKET_FAILURE:
      return [...state];
    case marketsConstants.SOLVE_MULTI_BET_MARKET_REQUEST:
      return [...state];
    case marketsConstants.SOLVE_MULTI_BET_MARKET_SUCCESS:
      return updateArr(state, action);
    case marketsConstants.EDIT_MARKET_REQUEST:
      return [...state];
    case marketsConstants.EDIT_MARKET_SUCCESS:
      return [...state];
    case marketsConstants.EDIT_MARKET_FAILURE:
      return updateArr(state, action);
    case marketsConstants.DELETE_MARKET_REQUEST:
      return [...state];
    case marketsConstants.DELETE_MARKET_SUCCESS:
      return updateArr(state, action);
    case marketsConstants.DELETE_MARKET_FAILURE:
      return [...state];
    default:
      return state;
  }
};
