import authHeader from "../helpers/authHeader";
import { baseURL } from "../api/baseURL";
import { handleResponse } from "../helpers/HandleResponse";

const fetchTransactions = (betId, option, timeAgo) => {
  const reqOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(
    `${baseURL}/transactions/chart?betId=${betId}&option=${option}&timeAgo=${timeAgo}`,
    reqOptions
  ).then((res) => handleResponse(res));
};

const fetchTransactionsFiltered = (
  type,
  option,
  betTitle,
  marketTitle,
  marketCategories = [],
  page,
  pageSize,
  sortedBy
) => {
  let marketCategoryParams = "";
  if (marketCategories.length > 0) {
    marketCategories.forEach((market) => {
      marketCategoryParams += `marketCategory=${market}&`;
    });
  }

  marketCategoryParams.length > 0
    ? marketCategoryParams.substr(0, marketCategoryParams.length - 1)
    : (marketCategoryParams = "marketCategory=");

  const reqOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `${baseURL}/transactions/${type}?option=${option}&betTitle=${betTitle}&marketTitle=${marketTitle}&${marketCategoryParams}&sortAttribute=${sortedBy[0]}&sortDirection=${sortedBy[1]}&page=${page}&size=${pageSize}`,
    reqOptions
  ).then((res) => handleResponse(res));
};

export const transactionService = {
  fetchTransactions,
  fetchTransactionsFiltered,
};
