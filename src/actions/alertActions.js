import {
    alertConstants
} from '../constants/alertConstants'

const success = (message) => {
    return {
        type: alertConstants.ALERT_SUCCESS,
        payload: message
    }
}

const error = (message) => {
    return {
        type: alertConstants.ALERT_ERROR,
        payload: message
    }
}

const clear = () => {
    return {
        type: alertConstants.ALERT_CLEAR
    }
}

export const clearAction = () => {
    return {
        type: alertConstants.ALERT_CLEAR
    }
}


export const alertActions = {
    success,error,clear
};

