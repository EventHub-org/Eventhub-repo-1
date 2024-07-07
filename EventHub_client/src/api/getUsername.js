import axios from "./axios";

export const getUsername = async () => {
  const response = await axios.get("users/username");
  return response.data;
};
