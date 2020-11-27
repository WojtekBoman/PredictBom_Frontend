import {transactionConstants} from '../constants/transactionConstants';


export default (state = [], action) => {
    switch(action.type) {
        case transactionConstants.FETCH_TRANSACTIONS_REQUEST:
            return [...state];
        case transactionConstants.FETCH_TRANSACTIONS_SUCCESS:
            return [...action.payload];
        case transactionConstants.FETCH_TRANSACTIONS_FAILURE:
            return [...state];
        case transactionConstants.FETCH_FILTERED_TRANSACTIONS_REQUEST:
            return [...state];
        case transactionConstants.FETCH_FILTERED_TRANSACTIONS_SUCCESS:
            return [...action.payload];
        case transactionConstants.FETCH_FILTERED_TRANSACTIONS_FAILURE:
            return [...state];    
        case transactionConstants.CLEAR_TRANSACTIONS:
            return []    
        default:
            return [...state];
    }
}

