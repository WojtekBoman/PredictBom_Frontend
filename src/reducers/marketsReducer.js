import {marketsConstants} from '../constants/marketsConstants';
import _ from 'lodash';

export default (state = [], action) => {
    switch(action.type) {
        case marketsConstants.FETCH_MARKETS_REQUEST:
            return [...state];
        case marketsConstants.FETCH_MARKETS_SUCCESS:
            return [...action.payload]
        case marketsConstants.FETCH_MARKETS_FAILURE:
            return [...state]
            case marketsConstants.FETCH_MARKET_REQUEST:
                return [...state];
            case marketsConstants.FETCH_MARKET_SUCCESS:
                if(state.find(market => market.marketId === action.payload.marketId)) {
                    return [...state]
                }
                return [...state,action.payload]
            case marketsConstants.FETCH_MARKET_FAILURE:
                return [...state]
        case marketsConstants.CREATE_MARKET_REQUEST:
            return [...state]
        case marketsConstants.CREATE_MARKET_SUCCESS:
            const index = state.findIndex(market => market.marketId === action.payload.marketId)
            const newArray = [...state]
            newArray[index] = action.payload
            return newArray;
        case marketsConstants.CREATE_MARKET_FAILURE:
            return [...state]
        
        case marketsConstants.SET_MARKET_COVER_REQUEST:
            return [...state];
        case marketsConstants.SET_MARKET_COVER_SUCCESS:
            const index_two = state.findIndex(market => market.marketId === action.payload.marketId)
            const newArray_two = [...state]
            newArray_two[index_two] = action.payload
            return newArray_two;
        case marketsConstants.SET_MARKET_COVER_FAILURE:
            return [...state];
        case marketsConstants.ADD_BET_REQUEST:
            return [...state]
        case marketsConstants.ADD_BET_SUCCESS:
            const index_three = state.findIndex(market => market.marketId === action.payload.marketId)
            const newArray_three = [...state]
            newArray_three[index_three] = action.payload
            return newArray_three;
        case marketsConstants.ADD_BET_FAILURE:
            return [...state]
        case marketsConstants.DELETE_BET_REQUEST:
                return [...state]
        case marketsConstants.DELETE_BET_SUCCESS:
                const index_four = state.findIndex(market => market.marketId === action.payload.marketId)
                const newArray_four = [...state]
                newArray_four[index_four] = action.payload
                return newArray_four;
        case marketsConstants.DELETE_BET_FAILURE:
                return [...state]
        case marketsConstants.MAKE_MARKET_PUBLIC_REQUEST:
            return [...state]
        case marketsConstants.MAKE_MARKET_PUBLIC_SUCCESS:
            const index_five = state.findIndex(market => market.marketId === action.payload.marketId)
                const newArray_five = [...state]
                newArray_five[index_five] = action.payload
                return newArray_five;
        case marketsConstants.MAKE_MARKET_PUBLIC_FAILURE:
                return [...state]
        default:
            return state;
    }
}

