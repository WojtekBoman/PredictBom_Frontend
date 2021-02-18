import {
  loginConstants,
  editPasswordConstants,
  registerConstants,
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
    case editPasswordConstants.CHANGE_PASSWORD_WITH_TOKEN_REQUEST:
      return { ...state };
    case editPasswordConstants.CHANGE_PASSWORD_WITH_TOKEN_SUCCESS:
      return { ...state };
    case editPasswordConstants.CHANGE_PASSWORD_WITH_TOKEN_FAILURE:
      return { ...state };
    case registerConstants.REGISTER_REQUEST:
      return {};
    case registerConstants.REGISTER_SUCCESS:
      return {};
    case registerConstants.REGISTER_FAILURE:
      return {};
    default:
      return state;
  }
};
