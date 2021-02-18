import { alertConstants } from "../constants/alertConstants";

export default (state = {}, action) => {
  switch (action.type) {
    case alertConstants.ALERT_SUCCESS_INFO:
      return {
        type: alertConstants.ALERT_SUCCESS_INFO,
        payload: action.payload,
      };
    case alertConstants.ALERT_ERROR:
      if (action.payload === "TypeError: Failed to fetch") {
        return {
          type: alertConstants.ALERT_CONNECTION_ERROR,
          payload: "Serwer nie odpowiada, spróbuj ponownie później!",
        };
      }

      return {
        type: alertConstants.ALERT_ERROR,
        payload: action.payload,
      };
    case alertConstants.ALERT_BUYING: {
      return {
        type: alertConstants.ALERT_BUYING,
        payload: action.payload,
      };
    }
    case alertConstants.ALERT_DELETING: {
      return {
        type: alertConstants.ALERT_DELETING,
        payload: action.payload,
      };
    }
    case alertConstants.ALERT_CLEAR:
      return {};
    default:
      return state;
  }
};
