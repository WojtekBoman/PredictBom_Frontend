import {transactionConstants} from '../constants/transactionConstants';


export default (state = [], action) => {
    switch(action.type) {
        case transactionConstants.FETCH_TRANSACTIONS_REQUEST:
            return [...state];
        case transactionConstants.FETCH_TRANSACTIONS_SUCCESS:
            return [...action.payload];
        case transactionConstants.FETCH_TRANSACTIONS_FAILURE:
            return [...state];
        default:
            return [...state];
    }
}

