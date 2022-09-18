import { backendCall } from "../../shared/backendCall";

export const getArtsAPICall = async (pageSize, offset) => {
  let _url = `arts?pageSize=${pageSize}&offset=${offset}`;
  let _result = {
    isSuccess: false,
    artsList: [],
    total:0
  };
  await backendCall(_url, "GET", {}).then(async (response) => {
    if (response.status) {
      _result = {
        isSuccess: true,
        artsList: response.data.data,
        total:response.data.count
      };
    }
  });
  return _result;
};
export const getFunFactsAPICall = async (pageSize, offset) => {
  let _url = `funfacts?pageSize=${pageSize}&offset=${offset}`;
  let _result = {
    isSuccess: false,
    artsList: [],
    total:0
  };
  await backendCall(_url, "GET", {}).then(async (response) => {
    if (response.status) {
      _result = {
        isSuccess: true,
        funFacts: response.data.data,
        total:response.data.count
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
    total:0
  };
  await backendCall(_url, "GET", {}).then(async (response) => {
    if (response.status) {
      _result = {
        isSuccess: true,
        artist: response.data.artistList,
        total: response.data.metaData[0].count
      };
    }
  });
  return _result;
};
export const deleteArtAPICall = async (id) => {
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

export const addArtAPICall = async (data) => {
  let _url = `arts`;
  let _result = {
    isSuccess: false,
    artist: [],
  };
  await backendCall(_url, "POST", data).then(async (response) => {
    if (response.status) {
      _result = {
        isSuccess: true,
      };
    }
  });
  return _result;
}

export const addFunFactsAPICall = async (data)=>{
  let _url = `funfacts`;
  let _result = {
    isSuccess: false,
    artist: [],
  };
  await backendCall(_url, "POST", data).then(async (response) => {
    if (response.status) {
      _result = {
        isSuccess: true,
      };
    }
  });
  return _result;
}