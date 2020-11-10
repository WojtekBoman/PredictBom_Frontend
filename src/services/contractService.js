import authHeader from '../helpers/authHeader';

const buyContract = (betId,marketId, contractOption, maxPrice, countOfShares) => {
    const reqOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({betId, marketId, contractOption, maxPrice, countOfShares})
    };

    return fetch('http://localhost:8080/markets/buyContract',reqOptions).then(res => handleBuying(res));
}

const fetchFilteredContracts = (contractStatus,contractOption,betTitle,marketTitle,marketCategories=[],sortedBy,page,pageSize) => {
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
    console.log(contractStatus);
    return fetch(`http://localhost:8080/contracts/filtered?contractStatus=${contractStatus}&contractOption=${contractOption}&betTitle=${betTitle}&marketTitle=${marketTitle}&${marketCategoryParams}&page=${page}&size=${pageSize}&sortAttribute=${sortedBy[0]}&sortDirection=${sortedBy[1]}`,reqOptions).then(res => handleResponse(res));
}

const fetchContracts = (page,pageSize) => {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }

    return fetch(`http://localhost:8080/contracts?page=${page}&size=${pageSize}`,reqOptions).then(res => handleResponse(res));
}

const fetchContractDetails = (betId) => {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`http://localhost:8080/contracts/${betId}`,reqOptions).then(res => handleContractDetails(res));
}

const fetchLastPrice = (betId,option) => {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    };
    console.log(betId,option);
    return fetch(`http://localhost:8080/contracts/lastBetPrice?betId=${betId}&option=${option}`,reqOptions).then(res => handleResponse(res));
}

const addOffer = (contractId,countOfShares,sellPrice) => {
    
    const reqOptions = {
        method:'POST',
        headers: authHeader(),
        body:JSON.stringify({contractId,countOfShares,sellPrice})
    };

    return fetch('http://localhost:8080/contracts/addOffer',reqOptions).then(res => handleContractDetails(res));
}

const deleteOffer = (offerId) => {
    const reqOptions = {
        method:'DELETE',
        headers: authHeader()
    };

    return fetch(`http://localhost:8080/contracts/deleteOffer?offerId=${offerId}`,reqOptions).then(res => handleContractDetails(res));
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

const handleContractDetails = (res) => {
    return res
    .text()
    .then(text => {
        const data = text && JSON.parse(text);
        // if(!data.predictionMarket){
        //     let error = data.info;
        //     return Promise.reject(error);
        // }
        if(!res.ok) {
            let error = (data && data.error) || res.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}

const handleBuying = (res) => {
    return res
    .text()
    .then(text => {
        const data = text && JSON.parse(text);
        console.log(text);
        if(!data.purchaser){
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


export const betsService = {
    buyContract,
    fetchFilteredContracts,
    fetchContracts,
    fetchContractDetails,
    fetchLastPrice,
    addOffer,
    deleteOffer
}