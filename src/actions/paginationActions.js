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