export const getToken = (): string => {
  return localStorage.getItem("jky-mobile-token") || "";
};

export const setToken = (token: string) => {
  return localStorage.setItem("jky-mobile-token", token);
};

export const removeToken = () => {
  return localStorage.removeItem("jky-mobile-token");
};

// 判断有没有token
export const isAuth = () => !!getToken();
