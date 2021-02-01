import authHeader from '../helpers/authHeader';
import {baseURL} from '../api/baseURL';

const fetchOffers = (betId,option,page,size) => {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${baseURL}/offers?betId=${betId}&option=${option}&page=${page}&size=${size}`,reqOptions).then(res => handleOffers(res));
}

const buyShares = (offerId,shares) => {
    const reqOption = {
        method:'POST',
        headers: authHeader()
    }

    return fetch(`${baseURL}/offers/buy?offerId=${offerId}&shares=${shares}`,reqOption).then(res => handleResponse(res));
} 


const handleResponse = (res) => {
    return res
    .text()
    .then(text => {
        const data = text && JSON.parse(text);
        console.log(data)
        if(!res.ok) {
            let error = data.info;
            return Promise.reject(error);
        }
        return data;
    });
}

const handleOffers = res => {
   
    return res
    .text()
    .then(markets =>{
        const data = markets && JSON.parse(markets);
        if(!res.ok) {
            let error = (data && data.error) || res.statusText;
            return Promise.reject(error);
        }
        return data;
    })
}

export const offerService = {
    fetchOffers,
    buyShares
}