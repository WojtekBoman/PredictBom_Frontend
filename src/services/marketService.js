import authHeader from '../helpers/authHeader';
import authHeaderImgReq from '../helpers/authHeaderImgReq'


const createMarket = (marketTitle, marketCategory, predictedDateEnd,description) => {
  
    const reqOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({marketTitle,marketCategory,predictedDateEnd,description})
    };

    

    return fetch('http://localhost:8080/markets/new', reqOptions).then((res) => handleResponse(res))
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


    return fetch(`http://localhost:8080/markets/${typeOfMarkets}?marketTitle=${marketTitle}&${marketCategoryParams}&page=${page}&size=${pageSize}&sortAttribute=${sortedBy[0]}&sortDirection=${sortedBy[1]}`,reqOptions).then((res) => handleMarkets(res));
}

const fetchMarket = (marketId) => {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`http://localhost:8080/markets/${marketId}`,reqOptions).then(res => handleMarkets(res));
}

const setMarketCover = (marketId,{marketCover}) => {
    const data = new FormData();
    data.append("marketCover",marketCover)
    const reqOptions = {
        method: 'POST',
        headers: authHeaderImgReq(),
        body: data
    }

    return fetch(`http://localhost:8080/markets/marketCover/${marketId}`,reqOptions).then(res => handleResponse(res));
}

export const addBet = (marketId,chosenOption) => {
    const reqOptions = {
        method: 'POST',
        headers: authHeader()
    };

   return fetch(`http://localhost:8080/markets/addBet?marketId=${marketId}&chosenOption=${chosenOption}`,reqOptions).then(res => handleResponse(res));
}

export const deleteBet = (marketId, betId) => {
    const reqOptions = {
        method: 'POST',
        headers: authHeader()
    }

    return fetch(`http://localhost:8080/markets/deleteBet?marketId=${marketId}&betId=${betId}`,reqOptions).then(res => handleResponse(res));
}


const handleMarkets = res => {
   
    return res
    .text()
    .then(markets =>{
        console.log("handleMarket",res);
        const data = markets && JSON.parse(markets);
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
        console.log("Infooo",text);
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
    fetchMarkets,
    fetchMarket,
    setMarketCover,
    addBet,
    deleteBet
}