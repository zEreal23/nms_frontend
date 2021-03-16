import axios from 'axios';
import {API} from '../config';

let APIKit = axios.create({
    baseURL: API,
    timeout: 10000,
});

// Add a request interceptor
APIKit.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response.status === 401) {
            localStorage.removeItem('jwt');
            alert('เซสชั่นหมดอายุ');
            window.location.href = '/';
        }
        return Promise.reject(error.response);
    },
);

// Add a response interceptor
APIKit.interceptors.request.use(
    (config) => {
        const result = JSON.parse(localStorage.getItem('jwt'));
        const token = result?.token;
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            config.headers.Authorization = null;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    },
);

export default APIKit;
