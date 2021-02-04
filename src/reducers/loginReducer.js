import {
  loginConstants,
  editPasswordConstants,
} from "../constants/userConstants";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export default (state = initialState, action) => {
  switch (action.type) {
    case loginConstants.LOGIN_REQUEST:
      return {
        loggedIn: false,
        user: action.user,
      };
    case loginConstants.LOGIN_SUCCESS:
      return {
        loggedIn: true,
        user: action.user,
      };
    case loginConstants.LOGIN_FAILURE:
      return {};
    case loginConstants.LOGOUT:
      return {};
    case editPasswordConstants.EDIT_PASSWORD_REQUEST:
      return { ...state };
    case editPasswordConstants.EDIT_PASSWORD_SUCCESS:
      return { ...state };
    case editPasswordConstants.EDIT_PASSWORD_FAILURE:
      return { ...state };
    default:
      return state;
  }
};
