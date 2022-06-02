export const getHistory = (): string => {
  return localStorage.getItem("jky-history") || "";
};

export const setHistory = (router: string) => {
  return localStorage.setItem("jky-history", router);
};
