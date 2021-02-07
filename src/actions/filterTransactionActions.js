import { filterTransactionConstants } from "../constants/filterTransactionConstants";

export const updateTransactionFilters = (filters) => {
  return {
    type: filterTransactionConstants.UPDATE_TRANSACTION_FILTERS,
    payload: filters,
  };
};

export const changeTransactionPage = (page) => {
  return {
    type: filterTransactionConstants.UPDATE_CURRENT_TRANSACTION_PAGE,
    payload: page,
  };
};

export const clearFilters = () => {
  return {
    type: filterTransactionConstants.CLEAR_TRANSACTION_FILTERS,
  };
};
