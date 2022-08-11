export const setUserToken = (token) => {
  setItemInLocalStorage("token", token);
};

export const getUserToken = () => {
  return getItemInLocalStorage("token");
};
export const setItemInLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getItemInLocalStorage = (key) => {
  return localStorage.getItem(key);
};
