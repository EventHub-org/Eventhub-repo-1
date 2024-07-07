import axios from "./axios";

export const getIsUserRegistered = async (googleToken) => {
  const response = await axios.get(
    `/authentication/${googleToken}/is-registered`
  );
  return response.data;
};
