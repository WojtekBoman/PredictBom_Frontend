export const handleResponse = (res) => {
    return res
    .text()
    .then(text => {
        if(!res.ok) {
            let error = text;
            return Promise.reject(error);
        }
        const data = text && JSON.parse(text);      

        return data;
    });
}