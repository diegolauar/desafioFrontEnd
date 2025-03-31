import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:7142'
})

export default api;