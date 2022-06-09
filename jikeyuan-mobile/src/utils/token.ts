export const getToken = (): { token: string, refresh_token: string } => {
  return JSON.parse(localStorage.getItem("jky-mobile-token") || "{}");
};

export const setToken = (token: { token: string, refresh_token: string }) => {
  return localStorage.setItem("jky-mobile-token", JSON.stringify(token));
};

export const removeToken = () => {
  return localStorage.removeItem("jky-mobile-token");
};

// 判断有没有token
export const isAuth = () => !!getToken().token;
