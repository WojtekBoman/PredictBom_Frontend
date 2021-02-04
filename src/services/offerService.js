import authHeader from "../helpers/authHeader";
import { baseURL } from "../api/baseURL";
import { handleResponse, handleBuying } from "../helpers/HandleResponse";

const fetchOffers = (betId, option, page, size) => {
  const reqOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return fetch(
    `${baseURL}/offers?betId=${betId}&option=${option}&page=${page}&size=${size}`,
    reqOptions
  ).then((res) => handleResponse(res));
};

const buyShares = (offerId, shares) => {
  const reqOption = {
    method: "POST",
    headers: authHeader(),
  };

  return fetch(
    `${baseURL}/offers/buy?offerId=${offerId}&shares=${shares}`,
    reqOption
  ).then((res) => handleBuying(res));
};

export const offerService = {
  fetchOffers,
  buyShares,
};
