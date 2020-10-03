const login = (username,password) => {
    const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username,password})
    };

    return fetch('http://localhost:8080/api/auth/signin', reqOptions)
        .then(handleResponse)
        .then(user => {
            localStorage.setItem('user', JSON.stringify(user));

            return user;
        });
}

const logout = () => {
    localStorage.removeItem('user');
}

const register = (username,firstName,surname,email,password) => {
    const reqOptions = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({username,firstName,surname,email,password})
    };

    return fetch(`http://localhost:8080/api/auth/signup`, reqOptions).then((res) => handleResponse(res));;

}


const handleResponse = (res) => {

    return res
    .text()
    .then(text => {

        const data = text && JSON.parse(text);
        if(!res.ok) {
            // if(res.status === 401) {
            //     logout();
            //     // window.location.reload(true);
            // }

            let error = (data && data.error) || res.statusText;
            return Promise.reject(error);
        }
        
        return data;
    });
}

export const userService = {
    login,
    logout,
    register
};