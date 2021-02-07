import { alertConstants } from "../constants/alertConstants";

const success = (message) => {
  return {
    type: alertConstants.ALERT_SUCCESS,
    payload: message,
  };
};

const error = (message) => {
  return {
    type: alertConstants.ALERT_ERROR,
    payload: message,
  };
};

const buyingError = (message) => {
  return {
    type: alertConstants.ALERT_BUYING,
    payload: message,
  };
};

const clear = () => {
  return {
    type: alertConstants.ALERT_CLEAR,
  };
};

const deleteAlert = (message) => {
  return {
    type: alertConstants.ALERT_DELETING,
    payload: message,
  };
};

export const alertActions = {
  success,
  error,
  clear,
  buyingError,
  deleteAlert,
};
