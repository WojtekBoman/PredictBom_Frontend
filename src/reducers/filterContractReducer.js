import { filterContractConstants } from "../constants/filterContractConstants";

const initialState = {
  marketTitle: "",
  betTitle: "",
  contractStatus: "",
  contractOption: 0,
  selectedCategories: [],
  sortedBy: ["modifiedDate", "desc"],
  page: 0,
  pageSize: 10,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case filterContractConstants.SET_STATUS_PENDING:
      return { ...state, contractStatus: "PENDING" };
    case filterContractConstants.UPDATE_FILTERS:
      return { ...state, ...action.payload };
    case filterContractConstants.CLEAR_FILTERS:
      return { ...initialState };
    case filterContractConstants.UPDATE_CURRENT_CONTRACTS_PAGE:
      return { ...state, page: action.payload };
    default:
      return state;
  }
};
