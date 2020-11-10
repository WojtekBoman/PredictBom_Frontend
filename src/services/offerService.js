import authHeader from '../helpers/authHeader';

const fetchOffers = (betId,option) => {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`http://localhost:8080/offers?betId=${betId}&option=${option}&page=${0}&size=${50}`,reqOptions).then(res => handleOffers(res));
}

const buyShares = (offerId,countOfShares) => {
    const reqOption = {
        method:'POST',
        headers: authHeader()
    }

    return fetch(`http://localhost:8080/offers/buy?offerId=${offerId}&countOfShares=${countOfShares}`,reqOption).then(res => handleResponse(res));
} 


const handleResponse = (res) => {
    return res
    .text()
    .then(text => {
        const data = text && JSON.parse(text);
        if(!res.ok) {
            let error = (data && data.error) || res.statusText;
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