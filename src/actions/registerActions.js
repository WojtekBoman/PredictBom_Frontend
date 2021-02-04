import {registerConstants} from '../constants/userConstants';
import {userService} from '../services/userService';
import history from '../history';
import { alertActions } from './alertActions';

export const register = ({username,firstName,surname,email,password}) => {
  
    return dispatch => {
        dispatch(request({ username }));

        userService.register(username,firstName,surname,email,password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                  
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: registerConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: registerConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: registerConstants.REGISTER_FAILURE, error } }
}
