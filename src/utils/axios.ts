import axios from 'axios';

const axiosServices = axios.create();

axiosServices.defaults.validateStatus = function (status) {
    return status >= 200 && status < 500;
};

export default axiosServices;
