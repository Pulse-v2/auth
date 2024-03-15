import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://auth-qa.qencode.com/v1/',
});

export default axiosInstance;
