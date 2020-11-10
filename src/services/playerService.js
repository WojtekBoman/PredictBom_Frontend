import authHeader from '../helpers/authHeader';

const fetchPlayer = (username) => {

    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }


    return fetch(`http://localhost:8080/player/${username}`,reqOptions).then((res) => handleResponse(res));
}

const fetchRanking = () => {

    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`http://localhost:8080/player/ranking`,reqOptions).then((res) => handleResponse(res));
}

const handleResponse = (res) => {

    return res
    .text()
    .then(text => {
        console.log(text);
        const data = text && JSON.parse(text);
        if(!res.ok) {
            // if(res.status === 401) {
            //     logout();
            //     // window.location.reload(true);
            // }

            let error = (data && data.message) || res.statusText;
            return Promise.reject(error);
        }
        
        return data;
    });
}

export const playerService = {
    fetchPlayer,
    fetchRanking
};