import {filterConstants} from '../constants/filterConstants';

export const selectCategory = (category) => {
    return {
        type: filterConstants.SELECT_CATEGORY,
        payload: category
    }
};

export const unselectCategory = (category) => {
    return {
        type: filterConstants.UNSELECT_CATEGORY,
        payload: category
    }
}

export const updateSearch = (searchText) => {
    return {
        type: filterConstants.UPDATE_SEARCH,
        payload: searchText
    }
}

export const updateSorted = (sortedBy) => {
    return {
        type: filterConstants.UPDATE_SORTED,
        payload: sortedBy
    }
}

export const changePage = (page) => {
    return{
        type: filterConstants.UPDATE_CURRENT_PAGE,
        payload: page
    }
}

export const changePageSize = (pageSize) => {
    return{
        type: filterConstants.UPDATE_PAGE_SIZE,
        payload: pageSize
    }
}