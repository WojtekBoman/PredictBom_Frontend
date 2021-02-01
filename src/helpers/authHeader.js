import jwt from 'jsonwebtoken';

export default function authHeader() {

    const user = JSON.parse(localStorage.getItem('user'));
    // const expiry = jwt.decode(user.token).exp;
    // const now = new Date();
    // console.log("TIME ",now.getTime(),now.getTime() - expiry * 1000);
    return (user && user.token) ?  {'Authorization': 'Bearer ' + user.token,'Content-Type':'application/json'} : {};
}


