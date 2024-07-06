import axios from "../api/axios";

export const refreshToken = async () => {
  const DATA_URL = "/authentication/refreshToken";

  const authAxios = axios.create({
    headers: {
      ...{ Authorization: null },
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Credentials": "true",
    },
  });

  const response = await authAxios.get(DATA_URL);

  return response.data;
};
