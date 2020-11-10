import authHeader from '../helpers/authHeader';

const fetchTransactions = (betId,option) => {

    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }


    return fetch(`http://localhost:8080/transactions/chart?betId=${betId}&option=${option}`,reqOptions).then((res) => handleResponse(res));
}

const fetchTransactionsFiltered = (username,chosenOption,betTitle, marketTitle, marketCategory, sortAttribute, sortDirection) => {

    const reqOptions = {
        method: 'GET',
        headers: authHeader()
    }
}

const handleResponse = (res) => {

    return res
    .text()
    .then(text => {
        console.log(text);
        const data = text && JSON.parse(text);
        if(!res.ok) {
            // if(res.status === 401) {
            //     logout();
            //     // window.location.reload(true);
            // }

            let error = (data && data.message) || res.statusText;
            return Promise.reject(error);
        }
        
        return data;
    });
}

export const transactionService = {
    fetchTransactions
}