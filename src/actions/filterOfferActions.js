import {filterOffersConstants} from '../constants/filterOffersConstants';

export const changePage = (page) => {
    return{
        type: filterOffersConstants.UPDATE_CURRENT_OFFER_PAGE,
        payload: page
    }
}