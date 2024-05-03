import axios from "./axios";

export const deleteUserByEmail = async (email) => {
  const response = await axios.delete(
    `users/${email}/email`
  );
  return response.data;
};
