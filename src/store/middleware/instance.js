import axios from 'axios';
import getAccessTokenHeader from "./getAccessToken";

const instance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_CONNECT,
    timeout: 1000
});

instance.interceptors.request.use(
    async config => {
        const accessToken = getAccessTokenHeader();
        config.headers = {
            "x-access-token": accessToken
        }
        return config;
    },
    error => {
        Promise.reject(error)
    }
)

export default instance;