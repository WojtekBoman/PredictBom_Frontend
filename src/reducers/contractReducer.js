import {contractConstants} from '../constants/contractConstants';
import _, { reduceRight } from 'lodash';

export default (state = [], action) => {
    switch(action.type) {
        case contractConstants.FETCH_CONTRACTS_REQUEST:
            return [...state]
        case contractConstants.FETCH_CONTRACTS_SUCCESS:
            return [...action.payload]
        case contractConstants.FETCH_CONTRACTS_FAILURE:
            return [...state];
            case contractConstants.FETCH_CONTRACT_REQUEST:
                return [...state]
            case contractConstants.FETCH_CONTRACT_SUCCESS:
                if(state.find(contract => contract.id === action.payload.id)) {
                    return [...state]
                }
                return [...state,action.payload]
            case contractConstants.FETCH_CONTRACT_FAILURE:
                return [...state];
        case contractConstants.BUY_CONTRACT_REQUEST:
            return [...state];
        case contractConstants.BUY_CONTRACT_SUCCESS:
            if(state.find(contract => contract.id === action.payload.id)) {
                return [...state]
            }
            return [...state,action.payload]
        case contractConstants.BUY_CONTRACT_FAILURE:
            return [...state];
        case contractConstants.FETCH_CONTRACT_DETAILS_REQUEST:
            return [...state]
        case contractConstants.FETCH_CONTRACT_DETAILS_SUCCESS:
            if(state.find(contract => contract.id === action.payload.id)) {
                return [...state]
            }
            return [...state,action.payload]
        case contractConstants.FETCH_CONTRACT_DETAILS_FAILURE:
            return [...state]
        case contractConstants.ADD_OFFER_REQUEST:
            return [...state]
        case contractConstants.ADD_OFFER_SUCCESS:
            const index = state.findIndex(contract => contract.id === action.payload.id)
            const newArray = [...state]
            newArray[index] = action.payload
            return newArray;
        case contractConstants.ADD_OFFER_FAILURE:
            return [...state]
        case contractConstants.DELETE_OFFER_REQUEST:
            return [...state]
        case contractConstants.DELETE_OFFER_SUCCESS:
            const indexTwo = state.findIndex(contract => contract.id === action.payload.id)
            const newArrayTwo = [...state]
            newArrayTwo[indexTwo] = action.payload
            return newArrayTwo;
        case contractConstants.DELETE_OFFER_FAILURE:
            return [...state]    
        default:
            return state;
    }
}