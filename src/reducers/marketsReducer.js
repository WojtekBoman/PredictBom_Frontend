import {marketsConstants} from '../constants/marketsConstants';

export default (state = {}, action) => {
    switch(action.type) {
        case marketsConstants.CREATE_MARKET_REQUEST:
            return {creating: true};
        case marketsConstants.CREATE_MARKET_SUCCESS:
            return {};
        case marketsConstants.CREATE_MARKET_FAILURE:
            return {};
        default:
            return state;
    }
}

