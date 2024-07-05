import axios from "./axios";

export const getUserInfo = async () => {
  const response = await axios.get("users/user-info");
  return response.data;
};
