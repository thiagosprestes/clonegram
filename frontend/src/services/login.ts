import { api } from './api';

interface LoginResponse {
  userId: string;
  username: string;
  token: string;
}

export const login = async (username: string, password: string) => {
  const { data } = await api.post<LoginResponse>('login', {
    username,
    password,
  });

  return data;
};
