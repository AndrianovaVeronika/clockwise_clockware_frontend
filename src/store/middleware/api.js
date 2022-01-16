import axios from 'axios';

const instance = axios.create({
    baseURL: process.env.DB_LINK + ':' + process.env.DB_PORT,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance;