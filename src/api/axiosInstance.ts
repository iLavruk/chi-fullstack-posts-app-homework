import axios from 'axios';

import { API_URL, ROUTE_PATHS } from '@/constants';

const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 10000,
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

        if (status === 401 || status === 403) {
            localStorage.removeItem('token');

            if (window.location.pathname !== ROUTE_PATHS.LOGIN) {
                window.location.replace(ROUTE_PATHS.LOGIN);
            }
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
