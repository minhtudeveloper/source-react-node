import axiosClient from "./axiosClient";
import { getCookie } from "./cookies";

export const api = {
  get: <T>(url: string, params?: object) =>
    axiosClient.get<T>(url, {
      ...params,
    }),
  post: <T>(url: string, data: any) => axiosClient.post<T>(url, data, {}),
  put: <T>(url: string, data: any) => axiosClient.put<T>(url, data, {}),
  delete: <T>(url: string) => axiosClient.delete<T>(url, {}),
};
