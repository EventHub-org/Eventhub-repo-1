import axios from "./axios";

export const resetPassword = async (email) => {
  const response = await axios.get("/authentication/forgot-password", {
    params: {
      email: email,
    },
  });
  return response.data;
};
