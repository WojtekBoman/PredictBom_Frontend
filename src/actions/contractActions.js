import {contractConstants} from '../constants/contractConstants';
import {marketsConstants} from '../constants/marketsConstants';
import {betsConstants} from '../constants/betsConstants';
import { betsService} from '../services/contractService';
import history from '../history';
import { alertActions } from './alertActions';
import _ from 'lodash';
import { playerConstants } from '../constants/playerConstants';

export const buyContract = (betId,marketId, contractOption,{maxPrice, countOfShares}) => {

    return dispatch => {
        dispatch(request({ betId }));
        betsService.buyContract(betId,marketId, contractOption,maxPrice, countOfShares)
            .then(
                res => { 
                    dispatch(success(res.boughtContract));
                    dispatch(fetchUser(res.purchaser))
                    history.push('/contracts');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(market) { return { type: contractConstants.BUY_CONTRACT_REQUEST,payload:market  } }
    function fetchUser(payload) { return { type: playerConstants.FETCH_PLAYER_SUCCESS,payload  } }
    function success(market) { return { type: contractConstants.BUY_CONTRACT_SUCCESS, payload:market } }
    function failure(error) { return { type: contractConstants.BUY_CONTRACT_FAILURE, error } }
}

export const fetchFilteredContracts = (contractOption,marketTitle,marketCategories=[],sortedBy,page,pageSize) => {
    return dispatch => {
        dispatch(request());
        betsService.fetchFilteredContracts(contractOption,marketTitle,marketCategories=[],sortedBy,page,pageSize)
            .then(
                res => { 
                    dispatch(success(res.content));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: contractConstants.FETCH_CONTRACTS_REQUEST } }
    function success(payload) { return { type: contractConstants.FETCH_CONTRACTS_SUCCESS, payload } }
    function failure(error) { return { type: contractConstants.FETCH_CONTRACTS_FAILURE, error } }
}

export const fetchContracts = (contractOption,marketTitle,marketCategories=[],sortedBy,page,pageSize) => {
    return dispatch => {
        dispatch(request());
        betsService.fetchContracts(contractOption,marketTitle,marketCategories=[],sortedBy,page,pageSize)
            .then(
                res => { 
                    dispatch(success(res.content));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: contractConstants.FETCH_CONTRACTS_REQUEST } }
    function success(payload) { return { type: contractConstants.FETCH_CONTRACTS_SUCCESS, payload } }
    function failure(error) { return { type: contractConstants.FETCH_CONTRACTS_FAILURE, error } }
}

export const fetchContractDetails = (betId) => {
    return dispatch => {
        dispatch(request());
        betsService.fetchContractDetails(betId)
            .then(
                res => { 
                    console.log("Wczytane dane",res);
                    // dispatch(alertActions.success(res.info));
                    dispatch(fetchMarket(res.predictionMarket));
                    dispatch(fetchBet(res.bet));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: contractConstants.FETCH_CONTRACT_DETAILS_REQUEST} }
    function success(payload) { return { type: contractConstants.FETCH_CONTRACT_DETAILS_SUCCESS, payload } }
    function failure(error) { return { type: contractConstants.FETCH_CONTRACT_DETAILS_FAILURE, error } }
    function fetchBet(bet) { return { type: betsConstants.FETCH_BET,payload: bet } }
    function fetchMarket(market) { return { type: marketsConstants.FETCH_MARKET_SUCCESS,payload: market } }

}