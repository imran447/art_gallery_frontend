import { backendCall } from "../../shared/backendCall";

export const getArtsAPICall = async () => {
  let _url = "arts";
  let _result = {
    isSuccess: false,
    artsList: [],
  };
  await backendCall(_url, "GET", {}).then(async (response) => {
    if (response.status) {
      _result = {
        isSuccess: true,
        artsList: response.data,
      };
    }
  });
  return _result;
};
export const getArtistAPICall = async () => {
    let _url = "arts/artist";
    let _result = {
      isSuccess: false,
      artist: [],
    };
    await backendCall(_url, "GET", {}).then(async (response) => {
      if (response.status) {
        _result = {
          isSuccess: true,
          artist: response.data,
        };
      }
    });
    return _result;
  };
export const deleteArtAPICall = async (id)=>{
    let _url = `arts/deleteArt/${id}`;
    let _result = {
      isSuccess: false,
      artist: [],
    };
    await backendCall(_url, "DELETE", {}).then(async (response) => {
      if (response.status) {
        _result = {
          isSuccess: true,
        };
      }
    });
    return _result;
  }

  export const addArtAPICall = async (data)=>{
    let _url = `arts`;
    let _result = {
      isSuccess: false,
      artist: [],
    };
    await backendCall(_url, "POST",data).then(async (response) => {
      if (response.status) {
        _result = {
          isSuccess: true,
        };
      }
    });
    return _result;
  }