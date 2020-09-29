import {marketsConstants} from '../constants/marketsConstants';
import history from '../history';
import { alertActions } from './alertActions';
import { marketService} from '../services/marketService';

export const createMarket = ({marketTitle,marketCategory,predictedDateEnd = "",description}) => {

    console.log("Opis",description);

    return dispatch => {
        dispatch(request({ marketTitle }));

        marketService.createMarket(marketTitle,marketCategory,predictedDateEnd,description)
            .then(
                market => { 
                    dispatch(success(market));
                    history.push('/modMarkets');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(market) { return { type: marketsConstants.CREATE_MARKET_REQUEST,market  } }
    function success(market) { return { type: marketsConstants.CREATE_MARKET_SUCCESS, market } }
    function failure(error) { return { type: marketsConstants.CREATE_MARKET_FAILURE, error } }
}

export const fetchMarkets = (typeOfMarkets) => {
    return dispatch => {
        dispatch(request(typeOfMarkets))
        marketService.fetchMarkets(typeOfMarkets) 
            .then(
                markets => {
                    dispatch(success(markets));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            )
    };

    function request(markets) { return { type: marketsConstants.FETCH_MARKETS_REQUEST,markets  } }
    function success(markets) { return { type: marketsConstants.FETCH_MARKETS_SUCCESS, markets } }
    function failure(error) { return { type: marketsConstants.FETCH_MARKETS_FAILURE, error } }
}
