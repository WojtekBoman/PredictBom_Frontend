import {tokenConstants} from '../constants/tokenConstants';
import {userService} from '../services/userService';
import history from '../history';
import { alertActions } from './alertActions';

export const sendToken = ({emailToReset}) => {
    return dispatch => {
        dispatch(request({ emailToReset }));

        userService.sendToken(emailToReset)
            .then(
                user => { 
                    dispatch(success(emailToReset));
                    history.push('/resetPasswordWithToken')
                },
                error => {
                   
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: tokenConstants.SEND_TOKEN_REQUEST, payload:user } }
    function success(user) { return { type: tokenConstants.SEND_TOKEN_SUCCESS, payload:user } }
    function failure(error) { return { type: tokenConstants.SEND_TOKEN_FAILURE, payload:error } }
}


export const checkToken = ({token}) => {
    return dispatch => {
        dispatch(request({ token }));

        userService.checkToken(token)
            .then(
                res => { 
                    dispatch(success(token));
                    dispatch(alertActions.success(res));
                    // history.push('/resetPasswordWithToken')
                },
                error => {
                   
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: tokenConstants.CHECK_TOKEN_REQUEST, payload:user } }
    function success(user) { return { type: tokenConstants.CHECK_TOKEN_SUCCESS, payload:user } }
    function failure(error) { return { type: tokenConstants.CHECK_TOKEN_FAILURE, payload:error } }
}

export const changePasswordWithToken = ({newPassword,repeatedPassword},token) => {
    return dispatch => {
        dispatch(request({ token }));

        userService.changePasswordWithToken(newPassword,repeatedPassword,token)
            .then(
                info => { 
                    dispatch(success());
                    dispatch(alertActions.success(info))
                    history.push("/login");
                },
                error => {
                    dispatch(failure());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: tokenConstants.CHANGE_PASSWORD_WITH_TOKEN_REQUEST } }
    function success() { return { type: tokenConstants.CHANGE_PASSWORD_WITH_TOKEN_SUCCESS } }
    function failure() { return { type: tokenConstants.CHANGE_PASSWORD_WITH_TOKEN_FAILURE } }
}