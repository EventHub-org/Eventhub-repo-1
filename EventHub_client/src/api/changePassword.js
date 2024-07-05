import axios from "./axios";

export const changePassword = async (passwords) => {
  const response = await axios.put("users/change-password", passwords);
  return response.data;
};
