export const getLocalSearchHistory = (): string[] => {
  return JSON.parse(localStorage.getItem("jky-search-history") || "[]");
};

export const setLocalSearchHistory = (history: string[]): void => {
  localStorage.setItem("jky-search-history", JSON.stringify(history));
};
