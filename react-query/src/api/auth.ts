import { apiRoutes } from 'utils/routes';
import { api } from '../utils/api';

export const login = (username: string, password: string) =>
  api.post<{ token: string }>(apiRoutes.login, {
    email:username,
    password
  });
