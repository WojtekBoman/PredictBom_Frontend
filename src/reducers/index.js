import { combineReducers } from 'redux';
import loginReducer from './loginReducer';
import registerReducer from './registerReducer';
import alertReducer from './alertReducer';
import loadingReducer from './loadingReducer';
import { reducer as formReducer } from 'redux-form';

export default combineReducers({
   login: loginReducer,
   form: formReducer,
   register: registerReducer,
   alert: alertReducer,
   loading: loadingReducer
});