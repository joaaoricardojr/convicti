import axios from 'axios';

const api = axios.create({
    baseURL: '/api/v1',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access_token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const getDados = async (endpoint) => {
    // console.log('endpoint', endpoint);
    try {
        const response = await api.get(endpoint);
        // console.log('response', response);
        return response.data;
    } catch (error) {
        console.error(`Erro ao buscar dados de ${endpoint}:`, error);
        throw error;
    }
};

export default api;