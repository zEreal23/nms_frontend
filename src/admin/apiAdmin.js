import APIKit from '../api';
import {API} from '../config';
/** User API
 * get data
 * create user
 * put user
 * del user
 */
export const getUsers = () => {
    return fetch(`${API}/users`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            console.log(response);
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const updateUser = (userId, token, user) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(user),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const deleteUser = (userId, token) => {
    return fetch(`${API}/user/${userId}`, {
        method: 'DELETE',
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

/** Category API
 * get data
 * create
 * put
 * del
 */
export const createCategory = (userId, token, category) => {
    return fetch(`${API}/category/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updateCategory = (categoryId, userId, token, category) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'PUT',
        headers: {
            // content type?
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(category),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getCategory = (categoryId) => {
    return fetch(`${API}/category/${categoryId}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

/**
 * Get caregories for option select
 * @returns {Array} all categories
 */
export const getCategories = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data} = await APIKit.get(`/categories`);
            return resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
};

export const deleteCategory = (categoryId, userId, token) => {
    return fetch(`${API}/category/${categoryId}/${userId}`, {
        method: 'DELETE',
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

/**Order API
 * get data
 * status
 * put
 */

export const listOrders = (userId, token) => {
    return fetch(`${API}/order/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const getStatusValues = (userId, token) => {
    return fetch(`${API}/order/status-values/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const updateOrderStatus = (userId, token, orderId, status) => {
    return fetch(`${API}/order/${orderId}/status/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({status, orderId}),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

export const getProducts = () => {
    return fetch(`${API}/products`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const uploadImages = (formData, oldPath) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data} = await APIKit.put('/post-image', formData, {
                pathImg: oldPath,
            });
            return resolve(data.filePath);
        } catch (error) {
            return reject(error);
        }
    });
};

export const createProduct = (userId, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            await APIKit.post(`/product/create/${userId}`, payload);
            return resolve();
        } catch (error) {
            return reject(error);
        }
    });
};

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
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

/**
 * @param {String} productId product id on user select
 * @returns {Object} get value of product
 */
export const getProduct = (productId) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data} = await APIKit.get(`/product/${productId}`);
            return resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
};

/**
 *
 * @param {String} productId product id on user select
 * @param {String} userId  user id of user
 * @param {Object} payload value product will update
 * @returns value product after update
 */
export const updateProduct = (productId, userId, payload) => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data} = await APIKit.put(
                `/product/${productId}/${userId}`,
                payload,
            );
            return resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
};

/**table API
 * Get table data
 * Create table
 * Delete table
 * put table
 */
export const getTable = (tableId) => {
    return fetch(`${API}/table/${tableId}`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

/**
 *
 * @param {String} orderId order id on table
 * @returns status of order is complete
 */
export const onPaymentOrder = (orderId) => {
    return new Promise(async (resolve, reject) => {
        try {
            await APIKit.put(`/order/complete/${orderId}`);
            return resolve();
        } catch (error) {
            return reject(error);
        }
    });
};

/**
 *
 * @returns data of table has order
 */
export const getAllTable = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data} = await APIKit.get(`/alltable`);
            return resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
};

/**
 *
 * @returns report best seller
 */
export const getBestSeles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data} = await APIKit.get(`/report/best-seles`);
            return resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
};

/**
 *
 * @returns report best seller
 */
export const getBadSeles = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data} = await APIKit.get(`/report/bad-seles`);
            return resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
};

/**
 *
 * @returns report days
 */
export const getIcomeByDay = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data} = await APIKit.get(`/report/days`);
            return resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
};

/**
 *
 * @returns report months
 */
export const getIcomeByMonth = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const {data} = await APIKit.get(`/report/months`);
            return resolve(data);
        } catch (error) {
            return reject(error);
        }
    });
};

export const createTable = (userId, token, t) => {
    return fetch(`${API}/table/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(t),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const updateTable = (tableId, userId, token, table) => {
    return fetch(`${API}/table/${tableId}/${userId}`, {
        method: 'PUT',
        headers: {
            // content type?
            'Content-Type': 'application/json',
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(table),
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const deleteTable = (tableId, userId, token) => {
    return fetch(`${API}/table/${tableId}/${userId}`, {
        method: 'DELETE',
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

export const createPromotion = (userId, token, promotion) => {
    return fetch(`${API}/promotion/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: promotion,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => {
            console.log(err);
        });
};

export const getPromotion = () => {
    return fetch(`${API}/promotions`, {
        method: 'GET',
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};

export const deletePromotion = (promotionId, userId, token) => {
    return fetch(`${API}/promotion/${promotionId}/${userId}`, {
        method: 'DELETE',
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

export const updatePromotion = (promotionId, userId, token, promotion) => {
    return fetch(`${API}/promotion/${promotionId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
        },
        body: promotion,
    })
        .then((response) => {
            return response.json();
        })
        .catch((err) => console.log(err));
};
