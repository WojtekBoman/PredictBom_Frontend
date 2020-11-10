import {filterContractConstants} from '../constants/filterContractConstants';

export const updateContractFilters = (filters) => {
    return {
        type: filterContractConstants.UPDATE_FILTERS,
        payload: filters
    }
}

export const changeContractPage = (page) => {
    return{
        type: filterContractConstants.UPDATE_CURRENT_CONTRACTS_PAGE,
        payload: page
    }
}

export const clearFilters = () => {
    return{
        type: filterContractConstants.CLEAR_FILTERS
    }
}