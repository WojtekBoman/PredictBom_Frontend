import {contractConstants} from '../constants/contractConstants';
import _, { reduceRight } from 'lodash';

export default (state = {}, action) => {
    switch(action.type) {
        case contractConstants.FETCH_CONTRACTS_REQUEST:
            return {...state}
        case contractConstants.FETCH_CONTRACTS_SUCCESS:
            return {...state,..._.mapKeys(action.payload,"id")};
        case contractConstants.FETCH_CONTRACTS_FAILURE:
            return {...state};
            case contractConstants.FETCH_CONTRACT_REQUEST:
                return {...state}
            case contractConstants.FETCH_CONTRACT_SUCCESS:
                return {...state,..._.mapKeys([action.payload],"id")};
            case contractConstants.FETCH_CONTRACT_FAILURE:
                return {...state};
        case contractConstants.BUY_CONTRACT_REQUEST:
            return {...state};
        case contractConstants.BUY_CONTRACT_SUCCESS:
            return {...state,..._.mapKeys([action.payload],"id")};
        case contractConstants.BUY_CONTRACT_FAILURE:
            return {...state};
        case contractConstants.FETCH_CONTRACT_DETAILS_REQUEST:
            return {...state}
        case contractConstants.FETCH_CONTRACT_DETAILS_SUCCESS:
            return {...state}
        case contractConstants.FETCH_CONTRACT_DETAILS_FAILURE:
            return {...state}
        default:
            return state;
    }
}