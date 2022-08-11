import { getUserToken } from "./localStorageUtility";

export const authChecker = () => {
  let isAuthenticated = false;

  if (getUserToken()) {
    isAuthenticated = true;
  }

  return isAuthenticated;
};
