import {transactionConstants} from '../constants/transactionConstants';
import {transactionService} from '../services/transactionService';
import {updateTransactionPagination} from './paginationActions';
import { alertActions } from './alertActions';
import _ from 'lodash';

export const fetchTransactions = (betId, option,timeAgo) => {
    return dispatch => {
        dispatch(request());
        transactionService.fetchTransactions(betId,option,timeAgo)
            .then(
                res => { 
                    dispatch(success(res));
                   
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: transactionConstants.FETCH_TRANSACTIONS_REQUEST} }
    function success(payload) { return { type: transactionConstants.FETCH_TRANSACTIONS_SUCCESS, payload } }
    function failure(error) { return { type: transactionConstants.FETCH_TRANSACTIONS_FAILURE, error } }
}

export const fetchFilteredTransactions = (type,option,betTitle, marketTitle, marketCategories,page,pageSize, sortedBy) => {
    return dispatch => {
        dispatch(request());
        transactionService.fetchTransactionsFiltered(type,option,betTitle, marketTitle, marketCategories,page,pageSize, sortedBy)
            .then(
                res => { 
                    dispatch(success(res.content));
                    dispatch(updateTransactionPagination(_.omit(res,['content'])))
                },
                error => {
                   
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: transactionConstants.FETCH_FILTERED_TRANSACTIONS_REQUEST} }
    function success(payload) { return { type: transactionConstants.FETCH_FILTERED_TRANSACTIONS_SUCCESS, payload } }
    function failure(error) { return { type: transactionConstants.FETCH_FILTERED_TRANSACTIONS_FAILURE, error } }
}