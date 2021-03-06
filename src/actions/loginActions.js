import {loginConstants,editPasswordConstants} from '../constants/userConstants';
import {userService} from '../services/userService';
import history from '../history';
import { alertActions } from './alertActions';

export const login = ({username, password}) => {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/profile');
                },
                error => {
            
                    dispatch(failure());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: loginConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: loginConstants.LOGIN_SUCCESS, user } }
    function failure() { return { type: loginConstants.LOGIN_FAILURE } }
}

export const editPassword = ({oldPassword,newPassword,repeatedNewPassword}) => {
    return dispatch => {
        dispatch(request());

        userService.editPassword(oldPassword,newPassword,repeatedNewPassword)
            .then(
                res => { 
                    dispatch(logout());
                    dispatch(success());
                    dispatch(alertActions.success(res));
                },
                error => {
                    dispatch(failure());
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request() { return { type: editPasswordConstants.EDIT_PASSWORD_REQUEST} }
    function success() { return { type: editPasswordConstants.EDIT_PASSWORD_SUCCESS} }
    function failure() { return { type: editPasswordConstants.EDIT_PASSWORD_FAILURE} }
}


export const logout = () => {
    userService.logout();
    history.push('/login');
    return {type: loginConstants.LOGOUT};
}