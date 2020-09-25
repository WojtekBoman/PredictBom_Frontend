import React from 'react';
import {createUseStyles} from 'react-jss';
import {connect} from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import history from '../history';
import {PrivateRoute} from './PrivateRoute';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import Background from '../img/background.jpg';
import NavigationBar from './NavigationBar';
import ProfilePage from './ProfilePage'
import CreateMarketPage from './CreateMarketPage';




const App = () => {
    
    return(
        <div className='wrapper'>
            <Router history={history}>
            <NavigationBar />
            <Switch>
            <PrivateRoute exact path="/" component={HomePage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/rejestracja" component={RegisterPage} />
                    <PrivateRoute path="/profile" component={ProfilePage} />
                    <PrivateRoute path="/markets/new" component={CreateMarketPage}/>
                    <Redirect from="*" to="/" />
            </Switch>
            </Router>
        </div>
    )
}


export default App;