import axios from "../api/axios";

export const refreshToken = async () => {
  const DATA_URL = "/authentication/refreshToken";

  const response = await axios.get(DATA_URL);

  return response.data;
};
