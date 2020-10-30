import {marketsConstants} from '../constants/marketsConstants';
import history from '../history';
import { alertActions } from './alertActions';
import { marketService} from '../services/marketService';
import {betsConstants} from '../constants/betsConstants';
import {updatePagination} from './paginationActions';
import _ from 'lodash';

export const createMarket = ({marketTitle,marketCategory,predictedDateEnd = "",description}) => {

    return dispatch => {
        dispatch(request({ marketTitle }));

        marketService.createMarket(marketTitle,marketCategory,predictedDateEnd,description)
            .then(
                res => { 
                    dispatch(success(res.predictionMarket));
                    history.push(`editBets/${res.predictionMarket.marketId}`);
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(market) { return { type: marketsConstants.CREATE_MARKET_REQUEST,payload:market  } }
    function success(market) { return { type: marketsConstants.CREATE_MARKET_SUCCESS, payload:market } }
    function failure(error) { return { type: marketsConstants.CREATE_MARKET_FAILURE, error } }
}

export const fetchMarkets = (typeOfMarkets,marketTitle,marketCategories,sortedBy,page,pageSize) => {
    return dispatch => {
        dispatch(request(typeOfMarkets,marketTitle,marketCategories,sortedBy,page,pageSize))
        marketService.fetchMarkets(typeOfMarkets,marketTitle,marketCategories,sortedBy,page,pageSize) 
            .then(
                markets => {
                    dispatch(success(markets.content));
                    dispatch(updatePagination(_.omit(markets,['content'])))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    };


    function request(markets) { return { type: marketsConstants.FETCH_MARKETS_REQUEST,payload:markets  } }
    function success(markets) { return { type: marketsConstants.FETCH_MARKETS_SUCCESS,payload: markets } }
    function failure(error) { return { type: marketsConstants.FETCH_MARKETS_FAILURE, error } }
}

export const fetchMarket = (marketId) => {
    return dispatch => {
        dispatch(request(marketId))
        marketService.fetchMarket(marketId) 
            .then(
                market => {
                    dispatch(success(market));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    };


    function request(market) { return { type: marketsConstants.FETCH_MARKET_REQUEST,payload:market  } }
    function success(market) { return { type: marketsConstants.FETCH_MARKET_SUCCESS,payload: market } }
    function failure(error) { return { type: marketsConstants.FETCH_MARKET_FAILURE, error } }
}

export const setMarketCover = (marketId, marketCover) => {
    return dispatch => {
        dispatch(request(marketId));
        marketService.setMarketCover(marketId,marketCover)
            .then(
                res => {
                    dispatch(success(res.predictionMarket));
                    dispatch(alertActions.success(res.info));
                    history.push('/markets')
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request(market) { return { type: marketsConstants.SET_MARKET_COVER_REQUEST,payload:market  } }
    function success(market) { return { type: marketsConstants.SET_MARKET_COVER_SUCCESS,payload:market } }
    function failure(error) { return { type: marketsConstants.SET_MARKET_COVER_FAILURE, error } }
}


export const addBet = (marketId,yesPrice, noPrice,chosenOption) => {
    return dispatch => {
        console.log(marketId,chosenOption);
        dispatch(request(marketId));
        marketService.addBet(marketId,yesPrice,noPrice,chosenOption)
            .then(
                res => {
                    dispatch(success(res.predictionMarket));
                    dispatch(addBetPrice(res.betPrice))
                    dispatch(alertActions.success(res.info));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request(market) { return { type: marketsConstants.ADD_BET_REQUEST,payload:market  } }
    function success(market) { return { type: marketsConstants.ADD_BET_SUCCESS,payload:market } }
    function failure(error) { return { type: marketsConstants.ADD_BET_FAILURE, error } }
    function addBetPrice(betPrice) {return {type:betsConstants.FETCH_BET_PRICE_SUCCESS,payload:betPrice}}
}

export const fetchBetPrice = (betId) => {
    return dispatch => {
        dispatch(request(betId))
        marketService.fetchBetPrice(betId) 
            .then(
                betPrice => {
                    dispatch(success(betPrice));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    };


    function request(betPrice) { return { type: betsConstants.FETCH_BET_PRICE_REQUEST,payload:betPrice  } }
    function success(betPrice) { return { type: betsConstants.FETCH_BET_PRICE_SUCCESS,payload: betPrice } }
    function failure(error) { return { type: betsConstants.FETCH_BET_PRICE_FAILURE, error } }
}

export const deleteBet = (marketId,betId) => {
    return dispatch => {
        dispatch(request(marketId));
        marketService.deleteBet(marketId,betId) 
            .then(
                res => {
                    dispatch(success(res.predictionMarket));
                    dispatch(alertActions.success(res.info));
                    dispatch(deleteBetPrice(betId));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request(market) { return { type: marketsConstants.DELETE_BET_REQUEST,payload:market  } }
    function success(market) { return { type: marketsConstants.DELETE_BET_SUCCESS,payload:market } }
    function failure(error) { return { type: marketsConstants.DELETE_BET_FAILURE, error } }
    function deleteBetPrice(betId) {return {type:betsConstants.DELETE_BET,payload:betId}}
}

export const makePublic = (marketId) => {
    return dispatch => {
        dispatch(request(marketId));
        marketService.makePublic(marketId) 
            .then(
                res => {
                    dispatch(success(res.predictionMarket));
                    dispatch(alertActions.success(res.info));
                    history.push('/markets');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    }

    function request(market) { return { type: marketsConstants.MAKE_MARKET_PUBLIC_REQUEST,payload:market  } }
    function success(market) { return { type: marketsConstants.MAKE_MARKET_PUBLIC_SUCCESS,payload:market } }
    function failure(error) { return { type: marketsConstants.MAKE_MARKET_PUBLIC_FAILURE, error } }
}