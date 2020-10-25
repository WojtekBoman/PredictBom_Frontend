import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import alertReducer from './alertReducer';
import loadingReducer from './loadingReducer';
import marketsReducer from './marketsReducer';
import filterReducer from './filterReducer';
import paginationReducer from './paginationReducer';
import tokenReducer from './tokenReducer';
import betsReducer from './betsReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
   login: loginReducer,
   form: formReducer,
   markets: marketsReducer,
   register: registerReducer,
   filter: filterReducer,
   alert: alertReducer,
   loading: loadingReducer,
   pagination: paginationReducer,
   token: tokenReducer,
   bets: betsReducer
});