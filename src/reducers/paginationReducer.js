import {paginationConstants} from '../constants/paginationConstants'

export default (state = {}, action) => {
    switch(action.type) {
        case paginationConstants.UPDATE_PAGINATION:
            return {...state,paginationInfo:action.payload};
        default:
            return state;
    }
}

