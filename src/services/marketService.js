import Axios from 'axios';
import authHeader from '../helpers/authHeader';
import axios from 'axios';

const createMarket = (marketTitle, marketCategory, predictedDateEnd,description) => {
    // const data = new FormData();
    // data.append("marketCover", marketCover)

    const reqOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({marketTitle,marketCategory,predictedDateEnd,description})
    };

    

    return fetch('http://localhost:8080/markets/new', reqOptions).then((res) => handleResponse(res))
}

const fetchMarkets = (typeOfMarkets) => {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`http://localhost:8080/markets/${typeOfMarkets}`,reqOptions).then((res) => handleMarkets(res));
}

const handleMarkets = res => {
    return res
    .text()
    .then(markets =>{
        const data = markets && JSON.parse(markets);
        console.log(data);
        if(!res.ok) {
        
            let error = (data && data.error) || res.statusText;
            return Promise.reject(error);
        }
        return data;
    })
}


const handleResponse = (res) => {

    return res
    .text()
    .then(text => {
        const data = text && JSON.parse(text);
        if(!data.predictionMarket){
            let error = data.info;
            return Promise.reject(error);
        }
        if(!res.ok) {
          

            let error = (data && data.error) || res.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

export const marketService = {
    createMarket,
    fetchMarkets
}