import axios from 'axios';

import { API_URL, ROUTE_PATHS, HTTP_TIMEOUT_MS, AUTH_ERROR_STATUSES } from '@/constants';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: HTTP_TIMEOUT_MS,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        const status = error?.response?.status;

        if (status && AUTH_ERROR_STATUSES.includes(status)) {
            localStorage.removeItem('token');

            if (window.location.pathname !== ROUTE_PATHS.LOGIN) {
                window.location.replace(ROUTE_PATHS.LOGIN);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
