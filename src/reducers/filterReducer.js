import {filterConstants} from '../constants/filterConstants';

const initialState = {marketTitle:'',selectedCategories:[],sortedBy:['createdDate','desc'],page:0,pageSize:10}

export default (state = initialState, action) => {
    switch(action.type) {
        case filterConstants.SELECT_CATEGORY:
            return {...state,selectedCategories: [...state.selectedCategories,action.payload],page:0};
        case filterConstants.UNSELECT_CATEGORY:
            return {...state,selectedCategories: state.selectedCategories.filter(category => category != action.payload),page:0}
        case filterConstants.UPDATE_SEARCH:
            return {...state,marketTitle: action.payload,page:0};
        case filterConstants.UPDATE_SORTED:
            return {...state,sortedBy: action.payload,page:0};
        case filterConstants.UPDATE_PAGE_SIZE:
            return {...state,pageSize:action.payload,page:0}
        case filterConstants.UPDATE_CURRENT_PAGE:
            return {...state,page:action.payload}
        default:
            return state;
    }
}

