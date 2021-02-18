import { marketsConstants } from "../constants/marketsConstants";
import history from "../history";
import { alertActions } from "./alertActions";
import { marketService } from "../services/marketService";
import { betsConstants } from "../constants/betsConstants";
import { updatePagination } from "./paginationActions";
import _ from "lodash";

export const createMarket = ({
  topic,
  category,
  endDate = "",
  description,
}) => {
  return (dispatch) => {
    dispatch(request({ topic }));

    marketService.createMarket(topic, category, endDate, description).then(
      (res) => {
        dispatch(success(res));
        history.push(`editBets/${res.marketId}`);
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request(market) {
    return { type: marketsConstants.CREATE_MARKET_REQUEST, payload: market };
  }
  function success(market) {
    return { type: marketsConstants.CREATE_MARKET_SUCCESS, payload: market };
  }
  function failure() {
    return { type: marketsConstants.CREATE_MARKET_FAILURE };
  }
};

export const editMarket = (
  marketId,
  { topic, category, endDate = "", description }
) => {
  return (dispatch) => {
    dispatch(request({ marketId }));
    marketService
      .editMarket(marketId, topic, category, endDate, description)
      .then(
        (res) => {
          dispatch(success(res));
          res.published
            ? history.push("/markets")
            : history.push("/markets/private");
        },
        (error) => {
          dispatch(failure());
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request(market) {
    return { type: marketsConstants.CREATE_MARKET_REQUEST, payload: market };
  }
  function success(market) {
    return { type: marketsConstants.CREATE_MARKET_SUCCESS, payload: market };
  }
  function failure() {
    return { type: marketsConstants.CREATE_MARKET_FAILURE };
  }
};

export const fetchMarkets = (
  typeOfMarkets,
  marketTitle,
  marketCategories,
  sortedBy,
  page,
  pageSize
) => {
  return (dispatch) => {
    dispatch(request());
    marketService
      .fetchMarkets(
        typeOfMarkets,
        marketTitle,
        marketCategories,
        sortedBy,
        page,
        pageSize
      )
      .then(
        (markets) => {
          dispatch(success(markets.content));
          dispatch(updatePagination(_.omit(markets, ["content"])));
        },
        (error) => {
          dispatch(failure());
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request() {
    return { type: marketsConstants.FETCH_MARKETS_REQUEST };
  }
  function success(markets) {
    return { type: marketsConstants.FETCH_MARKETS_SUCCESS, payload: markets };
  }
  function failure() {
    return { type: marketsConstants.FETCH_MARKETS_FAILURE };
  }
};

export const fetchMarket = (marketId) => {
  return (dispatch) => {
    dispatch(request());
    marketService.fetchMarket(marketId).then(
      (market) => {
        dispatch(success(market));
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: marketsConstants.FETCH_MARKET_REQUEST };
  }
  function success(market) {
    return { type: marketsConstants.FETCH_MARKET_SUCCESS, payload: market };
  }
  function failure() {
    return { type: marketsConstants.FETCH_MARKET_FAILURE };
  }
};

export const deleteMarket = (marketId) => {
  return (dispatch) => {
    dispatch(request());
    marketService.deleteMarket(marketId).then(
      (market) => {
        history.push("/markets");
        dispatch(success(market));
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: marketsConstants.DELETE_MARKET_REQUEST };
  }
  function success(market) {
    return { type: marketsConstants.DELETE_MARKET_SUCCESS, payload: market };
  }
  function failure() {
    return { type: marketsConstants.DELETE_MARKET_FAILURE };
  }
};

export const setMarketCover = (marketId, marketCover) => {
  return (dispatch) => {
    dispatch(request());
    marketService.setMarketCover(marketId, marketCover).then(
      (res) => {
        dispatch(success(res));
        history.push(`/markets/details/${marketId}`);
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: marketsConstants.SET_MARKET_COVER_REQUEST };
  }
  function success(market) {
    return { type: marketsConstants.SET_MARKET_COVER_SUCCESS, payload: market };
  }
  function failure() {
    return { type: marketsConstants.SET_MARKET_COVER_FAILURE };
  }
};

export const addBet = (marketId, yesPrice, noPrice, title, shares) => {
  return (dispatch) => {
    dispatch(request());
    marketService.addBet(marketId, yesPrice, noPrice, title, shares).then(
      (res) => {
        dispatch(success(res.predictionMarket));
        dispatch(addBetPrice(res.betPrice));
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: marketsConstants.ADD_BET_REQUEST };
  }
  function success(market) {
    return { type: marketsConstants.ADD_BET_SUCCESS, payload: market };
  }
  function failure() {
    return { type: marketsConstants.ADD_BET_FAILURE };
  }
  function addBetPrice(betPrice) {
    return { type: betsConstants.FETCH_BET_PRICE_SUCCESS, payload: betPrice };
  }
};

export const fetchBetPrice = (betId) => {
  return (dispatch) => {
    dispatch(request());
    marketService.fetchBetPrice(betId).then(
      (betPrice) => {
        dispatch(success(betPrice));
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: betsConstants.FETCH_BET_PRICE_REQUEST };
  }
  function success(betPrice) {
    return { type: betsConstants.FETCH_BET_PRICE_SUCCESS, payload: betPrice };
  }
  function failure() {
    return { type: betsConstants.FETCH_BET_PRICE_FAILURE };
  }
};

export const deleteBet = (betId) => {
  return (dispatch) => {
    dispatch(request());
    marketService.deleteBet(betId).then(
      (res) => {
        dispatch(success(res));
        dispatch(deleteBetPrice(betId));
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: marketsConstants.DELETE_BET_REQUEST };
  }
  function success(market) {
    return { type: marketsConstants.DELETE_BET_SUCCESS, payload: market };
  }
  function failure() {
    return { type: marketsConstants.DELETE_BET_FAILURE };
  }
  function deleteBetPrice(betId) {
    return { type: betsConstants.DELETE_BET, payload: betId };
  }
};

export const makePublic = (marketId) => {
  return (dispatch) => {
    dispatch(request());
    marketService.makePublic(marketId).then(
      (res) => {
        dispatch(success(res));
        history.push(`/markets/details/${marketId}`);
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return {
      type: marketsConstants.MAKE_MARKET_PUBLIC_REQUEST,
    };
  }
  function success(market) {
    return {
      type: marketsConstants.MAKE_MARKET_PUBLIC_SUCCESS,
      payload: market,
    };
  }
  function failure() {
    return { type: marketsConstants.MAKE_MARKET_PUBLIC_FAILURE };
  }
};


export const solveMarket = (marketId, betId, correctBetOption = true) => {
  return (dispatch) => {
    dispatch(request());
    marketService.solveMarket(marketId, betId, correctBetOption).then(
      (res) => {
        dispatch(success(res));
        history.push(`/markets/details/${marketId}`);
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return {
      type: marketsConstants.SOLVE_MARKET_REQUEST,
    };
  }
  function success(market) {
    return {
      type: marketsConstants.SOLVE_MARKET_SUCCESS,
      payload: market,
    };
  }
  function failure() {
    return { type: marketsConstants.SOLVE_MARKET_FAILURE };
  }
};
