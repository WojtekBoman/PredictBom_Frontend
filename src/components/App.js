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
import ContractList from './Contracts/ContractList';
import Contract from './Contracts/Contract';
import EditMarketPage from './Markets/EditMarketPage';
import SolveMarketPage from './Markets/SolveMarketPage';
import ContractDetails from './Contracts/ContractDetails';
import ContractPage from './Contracts/ContractPage';
import EditPasswordPage from './User/EditPasswordPage';
import AddOffer from './Contracts/UserOfferPage';
import AddOfferPage from './Offers/AddOfferPage';
import BetOffers from './Offers/BetOffers';
import Ranking from './Contracts/Ranking';
import TransactionsPage from './Transactions/TransactionsPage'
import UserOfferPage from './Contracts/UserOfferPage';
import DeleteMarketPage from './Markets/DeleteMarketPage';


const App = () => {

    return(
        <div className='wrapper'>
            <Router history={history}>
            <NavigationBar />
            <Switch>
            <Route exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/register" component={RegisterPage} />
                    <Route path="/resetPassword" component={ResetPasswordPage} />
                    <Route path="/resetPasswordWithToken" component={ResetPasswordWithToken} /> 
                    <Route path="/ranking" component={Ranking} /> 
                    <PrivateRoute path="/transactions" component={TransactionsPage} />
                    <Route path="/offers/bet/:id/:option" component={BetOffers} />
                    <PrivateRoute path="/offers/new/:id" component={AddOfferPage} />
                    <PrivateRoute path="/offers" component={UserOfferPage} />
                    <PrivateRoute path="/editPassword" component={EditPasswordPage} />
                    <PrivateRoute path="/profile" component={ProfilePage} />
                    <PrivateRoute path="/contracts/details/:id" component={ContractDetails} />
                    <PrivateRoute path="/contracts" component={ContractPage} />
                    <PrivateRoute path="/markets/new" component={CreateMarketPage}/>
                    <Route path="/markets/details/:id" component={MarketDetails}/>
                    <PrivateRoute path="/markets/editCover/:id" component={MarketCoverPage}/>
                    <PrivateRoute path="/markets/editBets/:id" component={EditBetsPage} />
                    <PrivateRoute path="/markets/editMarket/:id" component={EditMarketPage} />
                    <PrivateRoute path="/markets/solveMarket/:id" component={SolveMarketPage} />
                    <PrivateRoute path="/markets/makePublic/:id" component={MakeMarketPublicPage} />
                    <PrivateRoute path="/markets/delete/:id" component={DeleteMarketPage} />
                    <PrivateRoute path="/markets/private" component={ModeratorMarketsPage}/>
                    <Route path="/markets/" component={MarketsPage}/>
                    <Redirect from="*" to="/" />
                    
            </Switch>
            </Router>
            <div className="footer" style={{marginTop:"20px"}}>
                footer
            </div>
        </div>
    )
}


export default App;