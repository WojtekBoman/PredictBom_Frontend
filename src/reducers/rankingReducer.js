import {rankingConstants} from '../constants/rankingConstants';

export default (state = [], action) => {
        switch(action.type) {
            case rankingConstants.FETCH_RANKING_REQUEST:
                return [...state];
            case rankingConstants.FETCH_RANKING_SUCCESS:
                return [...action.payload]
            case rankingConstants.FETCH_RANKING_FAILURE:
                return [...state]
            default:
                return state;
    }
}

