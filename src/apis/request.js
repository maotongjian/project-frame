import axios from 'axios';
import { showFailToast } from 'vant';

const viteApiBaseUrl = import.meta.env.VITE_API_BASE_URL;

axios.defaults.baseURL = viteApiBaseUrl;
axios.defaults.timeout = 30000;

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (error) => {
    const msg = error.response?.data?.message || error.message || '';
    if (msg) showFailToast(msg);
    return Promise.reject(error);
  },
);

export default function request({ url = '', method = 'get', params = {}, data = {}, ...rest }) {
  return axios({ url, method, params, data, ...rest });
}
