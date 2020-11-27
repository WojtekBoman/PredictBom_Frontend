import {paginationConstants} from '../constants/paginationConstants'

export default (state = {}, action) => {
    switch(action.type) {
        case paginationConstants.UPDATE_PAGINATION:
            return {...state,paginationInfo:action.payload};
        case paginationConstants.UPDATE_CONTRACT_PAGINATION:
            return {...state,paginationContractInfo:action.payload};
        case paginationConstants.UPDATE_TRANSACTION_PAGINATION:
            return {...state,transactionPagination: action.payload}
        case paginationConstants.UPDATE_OFFERS_PAGINATION:
            return {...state,offersPagination: action.payload}
        case paginationConstants.CLEAR_PAGINATION:
            return {};     
        default:
            return state;
    }
}

