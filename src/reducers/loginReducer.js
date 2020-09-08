import {loginConstants} from '../constants/userConstants';


let user = JSON.parse(localStorage.getItem('user'));
const initialState = user ? { loggedIn: true, user } : {};

export default (state = initialState, action) => {
    switch(action.type) {
        case loginConstants.LOGIN_REQUEST:
            return {
                loggedIn: false,
                user: action.payload
            };
        case loginConstants.LOGIN_SUCCESS:
            return {
                loggedIn: true,
                user: action.payload
            };
        case loginConstants.LOGIN_FAILURE:
            return {};
        case loginConstants.LOGOUT:
            return {};
        default:
            return state;
    }
}
