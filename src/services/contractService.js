import authHeader from "../helpers/authHeader";
import { baseURL } from "../api/baseURL";
import { handleResponse, handleBuying } from "../helpers/HandleResponse";

const buyContract = (betId, marketId, contractOption, maxPrice, shares) => {
  const reqOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ betId, marketId, contractOption, maxPrice, shares }),
  };

  return fetch(`${baseURL}/markets/buyContract`, reqOptions).then((res) =>
    handleBuying(res)
  );
};

const fetchFilteredContracts = (
  contractStatus,
  contractOption,
  betTitle,
  marketTitle,
  marketCategories = [],
  sortedBy,
  page,
  pageSize
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
    `${baseURL}/contracts/filtered?contractStatus=${contractStatus}&contractOption=${contractOption}&betTitle=${betTitle}&marketTitle=${marketTitle}&${marketCategoryParams}&page=${page}&size=${pageSize}&sortAttribute=${sortedBy[0]}&sortDirection=${sortedBy[1]}`,
    reqOptions
  ).then((res) => handleResponse(res));
};

const fetchContracts = (page, pageSize) => {
  const reqOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `${baseURL}/contracts?page=${page}&size=${pageSize}`,
    reqOptions
  ).then((res) => handleResponse(res));
};

const fetchContractDetails = (betId) => {
  const reqOptions = {
    method: "GET",
    headers: authHeader(),
  };
  return fetch(`${baseURL}/contracts/${betId}`, reqOptions).then((res) =>
    handleResponse(res)
  );
};


const addOffer = (contractId, shares, price) => {
  const reqOptions = {
    method: "POST",
    headers: authHeader(),
    body: JSON.stringify({ contractId, shares, price }),
  };

  return fetch(`${baseURL}/contracts/addOffer`, reqOptions).then((res) =>
    handleResponse(res)
  );
};

const deleteOffer = (offerId) => {
  const reqOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return fetch(
    `${baseURL}/contracts/deleteOffer?offerId=${offerId}`,
    reqOptions
  ).then((res) => handleResponse(res));
};

export const contractService = {
  buyContract,
  fetchFilteredContracts,
  fetchContracts,
  fetchContractDetails,
  addOffer,
  deleteOffer,
};
