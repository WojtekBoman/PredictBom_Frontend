import {transactionConstants} from '../constants/transactionConstants';
import {transactionService} from '../services/transactionService';
import { alertActions } from './alertActions';

export const fetchTransactions = (betId, option) => {
    return dispatch => {
        dispatch(request());
        transactionService.fetchTransactions(betId,option)
            .then(
                user => { 
                    dispatch(success(user));
                },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: transactionConstants.FETCH_TRANSACTIONS_REQUEST} }
    function success(payload) { return { type: transactionConstants.FETCH_TRANSACTIONS_SUCCESS, payload } }
    function failure(error) { return { type: transactionConstants.FETCH_TRANSACTIONS_FAILURE, error } }
}
