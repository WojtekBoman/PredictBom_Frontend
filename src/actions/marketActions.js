import {marketsConstants} from '../constants/marketsConstants';
import history from '../history';
import { alertActions } from './alertActions';
import { marketService} from '../services/marketService';

export const createMarket = ({marketTitle,marketCategory,predictedDateEnd = ""}) => {

    return dispatch => {
        dispatch(request({ marketTitle }));

        marketService.createMarket(marketTitle,marketCategory,predictedDateEnd)
            .then(
                market => { 
                    dispatch(success(market));
                    history.push('/');
                },
                error => {
                    console.log(error);
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(market) { return { type: marketsConstants.CREATE_MARKET_REQUEST,market  } }
    function success(market) { return { type: marketsConstants.CREATE_MARKET_SUCCESS, market } }
    function failure(error) { return { type: marketsConstants.CREATE_MARKET_FAILURE, error } }
}