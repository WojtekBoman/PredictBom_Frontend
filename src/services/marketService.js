import authHeader from '../helpers/authHeader';
import authHeaderImgReq from '../helpers/authHeaderImgReq'
import {handleResponse} from '../helpers/HandleResponse';
import {baseURL} from '../api/baseURL';


const createMarket = (topic, category, endDate,description) => {
  
    const reqOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({topic, category, endDate,description})
    };

    return fetch(`${baseURL}/markets/new`, reqOptions).then((res) => handleResponse(res))
}

const editMarket = (marketId,topic, category, endDate,description) => {
  
    const reqOptions = {
        method: 'PUT',
        headers: authHeader(),
        body: JSON.stringify({topic, category, endDate,description})
    };

    

    return fetch(`${baseURL}/markets/edit/${marketId}`, reqOptions).then((res) => handleResponse(res))
}

const fetchMarkets = (typeOfMarkets,marketTitle,marketCategories=[],sortedBy,page,pageSize) => {


    let marketCategoryParams = "";
    if (marketCategories.length > 0) {
        marketCategories.forEach(market => {
            marketCategoryParams += `marketCategory=${market}&`
        })
    }

    marketCategoryParams.length > 0 ? marketCategoryParams.substr(0,marketCategoryParams.length-1) : marketCategoryParams="marketCategory=";

    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }


    return fetch(`${baseURL}/markets${typeOfMarkets}?marketTitle=${marketTitle}&${marketCategoryParams}&page=${page}&size=${pageSize}&sortAttribute=${sortedBy[0]}&sortDirection=${sortedBy[1]}`,reqOptions).then((res) => handleResponse(res));
}

const fetchMarket = (marketId) => {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`${baseURL}/markets/${marketId}`,reqOptions).then(res => handleResponse(res));
}

export const fetchBetPrice = (betId) => {
    const reqOptions = {
        method: 'GET',
        headers: authHeader(),
    };
    return fetch(`${baseURL}/markets/betPrice/${betId}`,reqOptions).then(res => handleResponse(res));
}


const setMarketCover = (marketId,{marketCover}) => {
    const data = new FormData();
    data.append("marketCover",marketCover)
    const reqOptions = {
        method: 'POST',
        headers: authHeaderImgReq(),
        body: data
    }

    return fetch(`${baseURL}/markets/marketCover/${marketId}`,reqOptions).then(res => handleResponse(res));
}

export const addBet = (marketId,yesPrice,noPrice,title,shares) => {
    
    const reqOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({marketId,yesPrice,noPrice,title,shares})
    };

    console.log(JSON.stringify({marketId,yesPrice,noPrice,title,shares}));

   return fetch(`${baseURL}/markets/addBet`,reqOptions).then(res => handleResponse(res));
}

export const deleteBet = (betId) => {
    const reqOptions = {
        method: 'POST',
        headers: authHeader()
    }

    return fetch(`${baseURL}/markets/deleteBet?betId=${betId}`,reqOptions).then(res => handleResponse(res));
}

export const solveMultiBetMarket = (marketId,betId) => {
    const reqOptions = {
        method: 'PUT',
        headers: authHeader()
    }

    return fetch(`${baseURL}/markets/solveMultiBetMarket?marketId=${marketId}&betId=${betId}`,reqOptions).then(res => handleResponse(res));
}

export const solveSingleBetMarket = (marketId,betId,correctOption) => {
    const reqOptions = {
        method: 'PUT',
        headers: authHeader()
    }

    return fetch(`${baseURL}/markets/solveSingleBetMarket?marketId=${marketId}&betId=${betId}&correctOption=${correctOption}`,reqOptions).then(res => handleResponse(res));
}

const makePublic = (marketId) => {
    const reqOptions = {
        method: 'PUT',
        headers: authHeader()
    }

    return fetch(`${baseURL}/markets/makePublic?marketId=${marketId}`,reqOptions).then(res => handleResponse(res));
}

const deleteMarket = (marketId) => {
    const reqOptions = {
        method: 'DELETE',
        headers: authHeader()
    }

    return fetch(`${baseURL}/markets/delete?marketId=${marketId}`,reqOptions).then(res => handleResponse(res));
}

// const handleMarkets = res => {
   
//     return res
//     .text()
//     .then(markets =>{
//         const data = markets && JSON.parse(markets);
//         if(!res.ok) {
            
//             let error = (data && data.error) || res.statusText;
//             return Promise.reject(error);
//         }
//         return data;
//     })
// }

// const handleMarket = res => {
   
//     return res
//     .text()
//     .then(market =>{
    
//         if(!res.ok) {
//             return Promise.reject(market);
//         }
//         const data = market && JSON.parse(market);
       
//         return data;
//     })
// }

export const marketService = {
    createMarket,
    editMarket,
    fetchMarkets,
    fetchMarket,
    fetchBetPrice,
    deleteMarket,
    setMarketCover,
    addBet,
    deleteBet,
    makePublic,
    solveSingleBetMarket,
    solveMultiBetMarket
}