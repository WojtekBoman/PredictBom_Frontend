import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import alertReducer from './alertReducer';
import loadingReducer from './loadingReducer';
import marketsReducer from './marketsReducer';
import filterReducer from './filterReducer';
import paginationReducer from './paginationReducer';
import tokenReducer from './tokenReducer';
import betPriceReducer from './betPriceReducer';
import { reducer as formReducer } from 'redux-form';
import playerReducer from './playerReducer';
import contractReducer from './contractReducer';
import betReducer from './betReducer';
import filterContractReducer from './filterContractReducer';
import offerReducer from './offerReducer';
import rankingReducer from './rankingReducer';
import transactionReducer from './transactionReducer';
import filterTransactionConstants from './filterTransactionReducer';
import filterTransactionReducer from './filterTransactionReducer';

export default combineReducers({
   login: loginReducer,
   form: formReducer,
   markets: marketsReducer,
   register: registerReducer,
   filter: filterReducer,
   filterContracts:filterContractReducer,
   alert: alertReducer,
   loading: loadingReducer,
   pagination: paginationReducer,
   token: tokenReducer,
   betPrice: betPriceReducer,
   bets:betReducer,
   player:playerReducer,
   contracts: contractReducer,
   offers: offerReducer,
   ranking: rankingReducer,
   transactions: transactionReducer,
   transactionsFilter: filterTransactionReducer
});