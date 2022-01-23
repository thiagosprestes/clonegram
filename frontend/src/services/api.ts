import axios from 'axios';
import { updateToken } from '~/redux/slices/authSlice';
import { store } from '~/redux/store';
import { log } from '~/utils/log';

export const api = axios.create({
  baseURL: 'http://192.168.0.109:4001',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = store.getState().authReducer.token;

  config.headers!['Authorization'] = token ? `Bearer ${token}` : '';
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    log.e('apiResponse', error.response);

    if (error.response.status === 401) {
      try {
        const { data } = await api.post(
          '/refresh-token',
          {
            username: store.getState().authReducer.username,
          },
          { withCredentials: true }
        );

        error.config.headers!['Authorization'] = `Bearer ${data.token}`;

        store.dispatch(updateToken(data));
      } catch (error) {
        log.e('refreshToken', error);
      }
    }
  }
);
