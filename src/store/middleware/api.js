import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:3000',
    // baseURL: 'http://' + process.env.DB_HOST + ':' + process.env.DB_PORT,
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
});

export default instance;