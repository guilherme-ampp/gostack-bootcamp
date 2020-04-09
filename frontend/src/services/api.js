import axios from 'axios';

// a axios instance
// enter the base URL for all routes
const api = axios.create({
    baseURL: 'http://localhost:3333',
});

export default api;