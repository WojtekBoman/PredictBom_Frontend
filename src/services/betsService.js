import authHeader from '../helpers/authHeader';

export const fetchBetPrice = (betId) => {
    const reqOptions = {
        method: 'POST',
        headers: authHeader(),
    };

}