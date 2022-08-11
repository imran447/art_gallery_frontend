import { backendCall } from "../../shared/backendCall";
import { setUserToken } from "../../shared/localStorageUtility";

export const loginAPICall = async (email, password) => {
  let _url = "auth/login";
  let _data = {
    email: email,
    password: password,
    isAdmin:true
  };
  let _result = {
    isSuccess: false,
  };
  let _isSuccess = false;
  await backendCall(_url, "POST", _data).then(async (response) => {
    if (response.status) {
      _isSuccess = true;
      await setUserToken(response?.data?.token);
    }
  });
  _result = {
    isSuccess: _isSuccess,
  };
  return _result;
};
