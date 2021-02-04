import authHeader from '../helpers/authHeader';
import {baseURL} from '../api/baseURL';
import {handleResponse} from '../helpers/HandleResponse';

const fetchPlayer = (username) => {

    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }


    return fetch(`${baseURL}/player/${username}`,reqOptions).then((res) => handleResponse(res));
}

const fetchRanking = () => {

    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${baseURL}/player/ranking`,reqOptions).then((res) => handleResponse(res));
}

// const handleResponse = (res) => {

//     return res
//     .text()
//     .then(text => {
      
//         const data = text && JSON.parse(text);
//         if(!res.ok) {
//             let error = (data && data.message) || res.statusText;
//             return Promise.reject(error);
//         }
        
//         return data;
//     });
// }

export const playerService = {
    fetchPlayer,
    fetchRanking
};