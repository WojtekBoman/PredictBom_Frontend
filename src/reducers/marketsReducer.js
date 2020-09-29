import {marketsConstants} from '../constants/marketsConstants';

export default (state = {}, action) => {
    switch(action.type) {
        case marketsConstants.FETCH_MARKETS_REQUEST:
            return {};
        case marketsConstants.FETCH_MARKETS_SUCCESS:
            return {...state,markets: action.markets}
        case marketsConstants.FETCH_MARKETS_FAILURE:
            return {}
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

