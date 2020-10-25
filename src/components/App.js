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



const App = () => {
    console.log("APP");
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
                    <PrivateRoute path="/profile" component={ProfilePage} />
                    <PrivateRoute path="/markets/new" component={CreateMarketPage}/>
                    <PrivateRoute path="/modMarkets" component={ModeratorMarketsPage}/>
                    <PrivateRoute path="/markets/editCover/:id" component={MarketCoverPage}/>
                    <PrivateRoute path="/markets/editBets/:id" component={EditBetsPage} />
                    <PrivateRoute path="/markets/makePubic:/:id" component={MakeMarketPublicPage} />
                    <Redirect from="*" to="/" />
            </Switch>
            </Router>
        </div>
    )
}


export default App;