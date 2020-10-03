import authHeader from '../helpers/authHeader';


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

const fetchMarkets = (typeOfMarkets,marketTitle,marketCategories=[],sortedBy,page) => {

    console.log("Kategorie do requestu",marketCategories);

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

    return fetch(`http://localhost:8080/markets/${typeOfMarkets}?marketTitle=${marketTitle}&${marketCategoryParams}&page=${page}&size=${2}`,reqOptions).then((res) => handleMarkets(res));
}

const setMarketCover = (marketId,{marketCover}) => {
    const data = new FormData();
    data.append("marketCover", marketCover);
    const reqOptions = {
        method: 'POST',
        headers: authHeader(),
        body: data
    }

    return fetch(`http://localhost:8080/markets/marketCover/${marketId}`,reqOptions).then(res => handleChangeMarketCover(res));
}

const handleMarkets = res => {
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

const handleChangeMarketCover = (res) => {
    return res 
    .text()
    .then(text => {
        console.log(text);
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
    fetchMarkets,
    setMarketCover
}