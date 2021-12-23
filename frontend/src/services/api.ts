import axios from 'axios';
import { store } from '~/redux/store';

export const api = axios.create({
  baseURL: 'http://192.168.0.108:4001',
});

api.interceptors.request.use(function (config) {
  const token = store.getState().authReducer.token;

  config.headers!['Authorization'] = token ? `Bearer ${token}` : '';
  return config;
});
