import Cookies from "js-cookie";

export const setCookie = (key: string, value: string, option: object) => {
  return Cookies.set(key, value, option);
};

export const getCookie = (key: string) => {
  return Cookies.get(key);
};

export const removeCookie = (key: string) => {
  return Cookies.remove(key);
};
