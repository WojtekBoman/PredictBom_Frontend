import authHeader from '../helpers/authHeader';

const buyContract = (betId, contractOption, maxPrice, countOfShares) => {
    const reqOptions = {
        method: 'POST',
        headers: authHeader(),
        body: JSON.stringify({betId, contractOption, maxPrice, countOfShares})
    };

    return fetch('http://localhost:8080/markets/buyContract',reqOptions).then(res => handleBuying(res));
}

const fetchContracts = () => {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch('http://localhost:8080/contracts',reqOptions).then(res => handleResponse(res));
}

const fetchContractDetails = (betId) => {
    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    };
    return fetch(`http://localhost:8080/contracts/details?betId=${betId}`,reqOptions).then(res => handleContractDetails(res));
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
        console.log(text);
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
    fetchContracts,
    fetchContractDetails
}