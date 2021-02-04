import { tokenConstants } from "../constants/tokenConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case tokenConstants.SEND_TOKEN_REQUEST:
      return { email: action.payload, sended: false };
    case tokenConstants.SEND_TOKEN_SUCCESS:
      return { email: action.payload, sended: true };
    case tokenConstants.SEND_TOKEN_FAILURE:
      return {};
    case tokenConstants.CHECK_TOKEN_REQUEST:
      return { ...state, token: action.payload, tokenCorrect: false };
    case tokenConstants.CHECK_TOKEN_SUCCESS:
      return { ...state, token: action.payload, tokenCorrect: true };
    case tokenConstants.CHECK_TOKEN_FAILURE:
      return { ...state, tokenCorrect: false };
    default:
      return state;
  }
};
