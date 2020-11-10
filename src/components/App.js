import React from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import {PrivateRoute} from './PrivateRoute';
import HomePage from './HomePage';
import LoginPage from './Auth/LoginPage';
import CreateMarketPage from './Markets/CreateMarketPage';
import ModeratorMarketsPage from './Markets/ModeratorMarketsPage';
import MarketCoverPage from './Markets/MarketCoverPage';
import NavigationBar from './NavigationBar';
import ProfilePage from './User/ProfilePage';
import RegisterPage from './Auth/RegisterPage';
import EditBetsPage from './Markets/EditBetsPage';
import ResetPasswordPage from './Auth/ResetPasswordPage';
import ResetPasswordWithToken from './Auth/ResetPasswordWithToken';
import MakeMarketPublicPage from './Markets/MakeMarketPublicPage';
import MarketsPage from './Markets/MarketsPage';
import MarketDetails from './Markets/MarketDetails';
import ContractList from './PlayerComponents/ContractList';
import Contract from './PlayerComponents/Contract';
import EditMarketPage from './Markets/EditMarketPage';
import SolveMarketPage from './Markets/SolveMarketPage';
import ContractDetails from './PlayerComponents/ContractDetails';
import ContractPage from './PlayerComponents/ContractPage';
import EditPasswordPage from './User/EditPasswordPage';
import AddOffer from './PlayerComponents/SelectContractToAddOffer';
import AddOfferPage from './Offers/AddOfferPage';
import BetOffers from './Offers/BetOffers';
import Ranking from './PlayerComponents/Ranking';


const App = () => {

    return(
        <div className='wrapper'>
            <Router history={history}>
            <NavigationBar />
            <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/rejestracja" component={RegisterPage} />
                    <Route path="/resetPassword" component={ResetPasswordPage} />
                    <Route path="/resetPasswordWithToken" component={ResetPasswordWithToken} /> 
                    <Route path="/ranking" component={Ranking} /> 
                    <PrivateRoute path="/offers/bet/:id/:option" component={BetOffers} />
                    <PrivateRoute path="/offers/selectContract" component={AddOffer} />
                    <PrivateRoute path="/offers/new/:id" component={AddOfferPage} />
                    <PrivateRoute path="/editPassword" component={EditPasswordPage} />
                    <PrivateRoute path="/profile" component={ProfilePage} />
                    <PrivateRoute path="/contracts/details/:id" component={ContractDetails} />
                    <PrivateRoute path="/contracts" component={ContractPage} />
                    <PrivateRoute path="/markets/new" component={CreateMarketPage}/>
                    <PrivateRoute path="/markets/details/:id" component={MarketDetails}/>
                    <PrivateRoute path="/markets/editCover/:id" component={MarketCoverPage}/>
                    <PrivateRoute path="/markets/editBets/:id" component={EditBetsPage} />
                    <PrivateRoute path="/markets/editMarket/:id" component={EditMarketPage} />
                    <PrivateRoute path="/markets/solveMarket/:id" component={SolveMarketPage} />
                    <PrivateRoute path="/markets/makePublic/:id" component={MakeMarketPublicPage} />
                    <PrivateRoute path="/markets/" component={MarketsPage}/>
                    <Redirect from="*" to="/" />
            </Switch>
            </Router>
        </div>
    )
}


export default App;