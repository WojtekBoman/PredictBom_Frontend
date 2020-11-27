import {paginationConstants} from '../constants/paginationConstants';

export const updatePagination = (paginationValues) => {
    return {
        type: paginationConstants.UPDATE_PAGINATION,
        payload: paginationValues
    }
}

export const updateContractPagination = (paginationValues) => {
    return {
        type: paginationConstants.UPDATE_CONTRACT_PAGINATION,
        payload: paginationValues
    }
}

export const updateTransactionPagination = (paginationValues) => {
    return {
        type: paginationConstants.UPDATE_TRANSACTION_PAGINATION,
        payload: paginationValues
    }
}

export const updateOfferPagination = (paginationValues) => {
    return {
        type: paginationConstants.UPDATE_OFFERS_PAGINATION,
        payload: paginationValues
    }
}

export const clearPagination = () => {
    return {
        type: paginationConstants.CLEAR_PAGINATION
    }
}