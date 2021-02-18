import { contractConstants } from "../constants/contractConstants";
import { contractService } from "../services/contractService";
import history from "../history";
import { alertActions } from "./alertActions";
import _ from "lodash";
import { playerConstants } from "../constants/playerConstants";
import { updateContractPagination } from "./paginationActions";

export const buyContract = (
  betId,
  marketId,
  contractOption,
  { maxPrice, shares }
) => {
  return (dispatch) => {
    dispatch(request({ betId }));
    contractService
      .buyContract(betId, marketId, contractOption, maxPrice, shares)
      .then(
        (res) => {
          dispatch(success(res.boughtContract));
          dispatch(fetchUser(res.purchaser));
          history.push("/contracts");
        },
        (error) => {
          dispatch(failure());
          dispatch(alertActions.buyingError(error.toString()));
        }
      );
  };

  function request(market) {
    return { type: contractConstants.BUY_CONTRACT_REQUEST, payload: market };
  }
  function fetchUser(payload) {
    return { type: playerConstants.FETCH_PLAYER_SUCCESS, payload };
  }
  function success(market) {
    return { type: contractConstants.BUY_CONTRACT_SUCCESS, payload: market };
  }
  function failure() {
    return { type: contractConstants.BUY_CONTRACT_FAILURE };
  }
};

export const fetchFilteredContracts = (
  contractStatus,
  contractOption,
  betTitle,
  marketTitle,
  marketCategories,
  sortedBy,
  page,
  pageSize
) => {
  return (dispatch) => {
    dispatch(request());
    contractService
      .fetchFilteredContracts(
        contractStatus,
        contractOption,
        betTitle,
        marketTitle,
        marketCategories,
        sortedBy,
        page,
        pageSize
      )
      .then(
        (res) => {
          dispatch(success(res.content));
          dispatch(updateContractPagination(_.omit(res, ["content"])));
        },
        (error) => {
          dispatch(failure());
          dispatch(alertActions.error(error.toString()));
        }
      );
  };

  function request() {
    return { type: contractConstants.FETCH_CONTRACTS_REQUEST };
  }
  function success(payload) {
    return { type: contractConstants.FETCH_CONTRACTS_SUCCESS, payload };
  }
  function failure() {
    return { type: contractConstants.FETCH_CONTRACTS_FAILURE };
  }
};

export const fetchContracts = (page, pageSize) => {
  return (dispatch) => {
    dispatch(request());
    contractService.fetchContracts(page, pageSize).then(
      (res) => {
        dispatch(success(res.content));
        dispatch(updateContractPagination(_.omit(res, ["content"])));
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: contractConstants.FETCH_CONTRACTS_REQUEST };
  }
  function success(payload) {
    return { type: contractConstants.FETCH_CONTRACTS_SUCCESS, payload };
  }
  function failure() {
    return { type: contractConstants.FETCH_CONTRACTS_FAILURE };
  }
};

export const fetchContractDetails = (id) => {
  return (dispatch) => {
    dispatch(request());
    contractService.fetchContractDetails(id).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: contractConstants.FETCH_CONTRACT_DETAILS_REQUEST };
  }
  function success(payload) {
    return { type: contractConstants.FETCH_CONTRACT_DETAILS_SUCCESS, payload };
  }
  function failure() {
    return { type: contractConstants.FETCH_CONTRACT_DETAILS_FAILURE };
  }
};

export const addOffer = (contractId, shares, price) => {
  return (dispatch) => {
    dispatch(request());
    contractService.addOffer(contractId, shares, price).then(
      (res) => {
        dispatch(success(res));
        history.push(`/contracts/details/${contractId}`);
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.error(error.toString()));
      }
    );
  };

  function request() {
    return { type: contractConstants.ADD_OFFER_REQUEST };
  }
  function success(payload) {
    return { type: contractConstants.ADD_OFFER_SUCCESS, payload };
  }
  function failure() {
    return { type: contractConstants.ADD_OFFER_FAILURE };
  }
};

export const deleteOffer = (offerId) => {
  return (dispatch) => {
    dispatch(request());
    contractService.deleteOffer(offerId).then(
      (res) => {
        dispatch(success(res));
      },
      (error) => {
        dispatch(failure());
        dispatch(alertActions.deleteAlert(error.toString()));
      }
    );
  };

  function request() {
    return { type: contractConstants.DELETE_OFFER_REQUEST };
  }
  function success(payload) {
    return { type: contractConstants.DELETE_OFFER_SUCCESS, payload };
  }
  function failure() {
    return { type: contractConstants.DELETE_OFFER_FAILURE };
  }
};
