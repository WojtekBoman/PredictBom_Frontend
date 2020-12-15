import {offerService} from '../services/offerService';
import {offerConstants} from '../constants/offerConstants';
import {alertActions} from './alertActions';
import {playerConstants} from '../constants/playerConstants';
import {contractConstants} from '../constants/contractConstants';
import {updateOfferPagination} from './paginationActions';
import history from '../history';
import _ from 'lodash';

export const fetchOffers = (betId,option,page,size) => {
    return dispatch => {
        dispatch(request())
        offerService.fetchOffers(betId,option,page,size) 
            .then(
                bets => {
                    dispatch(success(bets.content));
                    dispatch(updateOfferPagination(_.omit(bets,['content'])))
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    };


    function request() { return { type: offerConstants.FETCH_OFFERS_REQUEST  } }
    function success(markets) { return { type: offerConstants.FETCH_OFFERS_SUCCESS,payload: markets } }
    function failure(error) { return { type: offerConstants.FETCH_OFFERS_FAILURE, error } }
}


export const buyShares = (offerId,shares) => {

    return dispatch => {
        dispatch(request({ offerId }));
        offerService.buyShares(offerId,shares)
            .then(
                res => { 
                    dispatch(success(res.boughtContract));
                    dispatch(fetchUser(res.purchaser))
                    history.push('/contracts');
                },
                error => {
                    console.log(error);
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