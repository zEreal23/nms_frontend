import {API} from '../config';
import APIKit from '../api';
import queryString from 'query-string';

export const getProducts = (tableId) => {
    return fetch(`${API}/products/${tableId}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getFilteredProducts = (skip, limit, filters = {}) => {
    const data = {
        limit,
        skip,
        filters,
    };
    return fetch(`${API}/products/by/search`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const list = (params) => {
    const query = queryString.stringify(params);
    console.log('query', query);
    return fetch(`${API}/products/search?${query}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const read = (productId) => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const listRelated = (productId) => {
    return fetch(`${API}/products/related/${productId}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getBraintreeClientToken = (userId, token) => {
    return fetch(`${API}/braintree/getToken/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const processPayment = (userId, token, paymentData) => {
    return fetch(`${API}/braintree/payment/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(paymentData),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
export const createOrder = (tableId, createOrderData) => {
    return fetch(`${API}/order/create/${tableId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({order: createOrderData}),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const postCart = (productId, tableId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await APIKit.post(`/cart/${tableId}`, {productId: productId});
            return resolve();
        } catch (error) {
            return reject(error);
        }
    });
};

export const getProductsMenu = (tableId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data} = await APIKit.get(`products/${tableId}`);
            return resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
};

export const getCart = (tableId) => {
    return fetch(`${API}/cart/${tableId}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const deleteCart = (productId, tableId) => {
    return fetch(`${API}/cart-delete/${tableId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({productId}),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const postOder = (tableId, amount) => {
    return fetch(`${API}/create-order/${tableId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({tableId, amount}),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getOrder = (tableId) => {
    return fetch(`${API}/order/${tableId}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
