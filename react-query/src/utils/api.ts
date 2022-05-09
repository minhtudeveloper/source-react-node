import axiosClient from './axiosClient';
import { getCookie } from './cookies';

type TypeToken = string;

const token: TypeToken = getCookie('token') || '';

export const api = {
  get: <T>(url: string, params?: object) =>
    axiosClient.get<T>(url, {
      headers: {
        authorization: `Bearer ${token}`
      },
      ...params
    }),
  post: <T>(url: string, data: any) =>
    axiosClient.post<T>(url, data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }),
  put: <T>(url: string, data: any) =>
    axiosClient.put<T>(url, data, {
      headers: {
        authorization: `Bearer ${token}`
      }
    }),
  delete: <T>(url: string) =>
    axiosClient.delete<T>(url, {
      headers: {
        authorization: `Bearer ${token}`
      }
    })
};
