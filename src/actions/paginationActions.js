import {paginationConstants} from '../constants/paginationConstants';

export const updatePagination = (paginationValues) => {
    return {
        type: paginationConstants.UPDATE_PAGINATION,
        payload: paginationValues
    }
}