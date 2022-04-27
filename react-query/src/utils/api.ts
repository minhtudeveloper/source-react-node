import Cookies from 'js-cookie';
import axiosClient from './axiosClient';

type TypeToken = string;

const token: TypeToken = Cookies.get('token') || '';

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
