import { backendCall } from "../../shared/backendCall";

export const getUserListAPICall = async () => {
  let _url = "auth/userList";
  let _result = {
    isSuccess: false,
    userList: [],
  };
  await backendCall(_url, "GET", {}).then(async (response) => {
    if (response.status) {
      _result = {
        isSuccess: true,
        userList: response.data,
      };
    }
  });
  return _result;
};

