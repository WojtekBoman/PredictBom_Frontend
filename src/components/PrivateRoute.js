import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import jwt from 'jsonwebtoken';

const isPrivate = () => {
    const user = localStorage.getItem('user');
    if(user) {
        const expiry = jwt.decode(JSON.parse(user).token).exp;
        const now = new Date();
        return now.getTime() > expiry * 1000;
    }
    return false;
   
}

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => (
        isPrivate()
            ? <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            : <Component {...props} />
    )} />
);