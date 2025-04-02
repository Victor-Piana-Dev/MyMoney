import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3000', // URL base da API
});

// Adicionando o token JWT em todas as requisições
api.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        // console.log('token enviado para o backend: ', token)
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export default api;