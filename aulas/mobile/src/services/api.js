import axios from 'axios';

const api = axios.create({
    baseUrl: 'http://192.168.1.39:3333/'
})

export default api;