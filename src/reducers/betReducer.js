import {betsConstants} from '../constants/betsConstants';
import _ from 'lodash';

export default (state = {}, action) => {
    switch(action.type) {
        case betsConstants.FETCH_BET:
            return {...state,..._.mapKeys([action.payload],"id")};
        default:
            return {...state};
        }
    }