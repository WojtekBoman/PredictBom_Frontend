export const handleResponse = (res) => {
  return res.text().then((text) => {
    if (!res.ok) {
      let error = text || res.statusText;
      return Promise.reject(error);
    }
    const data = text && JSON.parse(text);

    return data;
  });
};

export const handleLoginResponse = (res) => {
  return res.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!res.ok) {
      let error = (data && data.error) || res.statusText;

      return Promise.reject(error);
    }

    return data;
  });
};

export const handleBuying = (res) => {
  return res.text().then((text) => {

    if (res.status === 500) {
      return Promise.reject(
        "W tym momencie dużo osób próbuje złożyć zamówienie, spróbuj ponownie za chwilę"
      );
    }

    // if (!data.purchaser) {
    //   let error = data.info;
    //   return Promise.reject(error);
    //}
    if (!res.ok) {
      console.log(text);
      // let error = (data && data.error) || res.statusText;
      return Promise.reject(text);
    }

    const data = text && JSON.parse(text);
    return data;
  });
};
