import {alertConstants} from '../constants/alertConstants';

export default (state = {}, action) => {
    switch(action.type) {
        case alertConstants.ALERT_SUCCESS:
            return {
                type: alertConstants.ALERT_SUCCESS,
                payload: action.payload
            }
        case alertConstants.ALERT_ERROR:
            return {
                type: alertConstants.ALERT_ERROR,
                payload: action.payload
            }
        case alertConstants.ALERT_CLEAR:
            return {}
        default:
            return state;
    }
}