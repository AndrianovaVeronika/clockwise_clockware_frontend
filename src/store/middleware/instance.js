import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_CONNECT,
    timeout: 1000
});

export default instance;