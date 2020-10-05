import {marketsConstants} from '../constants/marketsConstants';

export default (state = {}, action) => {
    switch(action.type) {
        case marketsConstants.FETCH_MARKETS_REQUEST:
            return {...state};
        case marketsConstants.FETCH_MARKETS_SUCCESS:
            return {...state,markets: action.markets}
        case marketsConstants.FETCH_MARKETS_FAILURE:
            return {...state}
        case marketsConstants.CREATE_MARKET_REQUEST:
            return {...state};
        case marketsConstants.CREATE_MARKET_SUCCESS:
            return {...state,market:action.payload};
        case marketsConstants.CREATE_MARKET_FAILURE:
            return {...state};
        case marketsConstants.SET_MARKET_COVER_REQUEST:
            return {...state};
        case marketsConstants.SET_MARKET_COVER_SUCCESS:
            return {...state,[action.payload.marketId]:action.payload};
        case marketsConstants.SET_MARKET_COVER_FAILURE:
            return {...state};
        default:
            return state;
    }
}

