import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: 'http://localhost:3000'
})

api.interceptors.request.use((config) => {
    const token = Cookies.get('token');
    if(token) {
        config.headers = config.headers ?? {};
        (config.headers as any)['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

export default api;