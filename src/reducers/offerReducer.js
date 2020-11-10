import {offerConstants} from '../constants/offerConstants';
import _ from 'lodash';

export default (state = [], action) => {
    switch(action.type) {
        case offerConstants.FETCH_OFFERS_REQUEST:
            return [...state];
        case offerConstants.FETCH_OFFERS_SUCCESS:
            return [...action.payload]
        case offerConstants.FETCH_OFFERS_FAILURE:
            return [...state]
        case offerConstants.BUY_SHARES_REQUEST:
            return [...state]
        case offerConstants.BUY_SHARES_SUCCESS:
            return [...state]
        case offerConstants.BUY_SHARES_FAILURE:
            return [...state]            
        default:
            return [...state]
    }
}