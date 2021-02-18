import { registerConstants } from "../constants/userConstants";
import { userService } from "../services/userService";
import history from "../history";
import { alertActions } from "./alertActions";

export const register = ({ username, firstName, surname, email, password }) => {
  return (dispatch) => {
    dispatch(request({ username }));

    userService.register(username, firstName, surname, email, password).then(
      (text) => {
        dispatch(success());
        dispatch(alertActions.success(text));
        history.push("/login");
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: registerConstants.REGISTER_REQUEST };
  }
  function success() {
    return { type: registerConstants.REGISTER_SUCCESS };
  }
  function failure() {
    return { type: registerConstants.REGISTER_FAILURE };
  }
};
