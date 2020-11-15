import {filterOffersConstants} from '../constants/filterOffersConstants';

const initialState = {page:0,pageSize:100}

export default (state = initialState, action) => {
    switch(action.type) {
        case filterOffersConstants.UPDATE_CURRENT_OFFER_PAGE:
            return {...state,page:action.payload}
        default:
            return state;
    }
}

