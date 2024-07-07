import axios from "./axios";

export const getUserByUsername = async (username) => {
  const response = await axios.get(`users/${username}/profile`);
  return response.data;
};
