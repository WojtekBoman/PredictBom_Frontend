import Axios from 'axios';
import authHeader from '../helpers/authHeader';
import axios from 'axios';

const createMarket = (marketTitle, marketCategory, predictedDateEnd) => {
    // const data = new FormData();
    // data.append("marketCover", marketCover)

    const reqOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({marketTitle,marketCategory,predictedDateEnd})
    };

    

    return fetch(`http://localhost:8080/markets/new`, reqOptions).then((res) => handleResponse(res))
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
        if(!data.predictionMarket){
            let error = data.info;
            return Promise.reject(error);
        }

        return data;
    });
}

export const marketService = {
    createMarket
}