import {loginConstants} from '../constants/userConstants';
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
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: loginConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: loginConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: loginConstants.LOGIN_FAILURE, error } }
}



export const logout = () => {
    userService.logout();
    history.push('/login');
    return {type: loginConstants.LOGOUT};
}