import {filterTransactionConstants} from '../constants/filterTransactionConstants';

const initialState = {marketTitle:'',betTitle:'',option:0,selectedCategories:[],sortedBy:['transactionDate','desc'],page:0,pageSize:10}

export default (state = initialState, action) => {
    switch(action.type) {
        case filterTransactionConstants.UPDATE_TRANSACTION_FILTERS:
            return {...state,...action.payload};
        case filterTransactionConstants.CLEAR_TRANSACTION_FILTERS:
            return {...initialState}
        case filterTransactionConstants.UPDATE_CURRENT_TRANSACTION_PAGE:
            return {...state,page:action.payload}
        default:
            return state;
    }
}

