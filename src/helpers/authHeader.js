export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));

    console.log("Token",user.token);

    return (user && user.token) ?  {'Authorization': 'Bearer ' + user.token,'Content-Type':'application/json'} : {};
}