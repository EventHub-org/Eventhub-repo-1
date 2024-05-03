import axios from "./axios";

export const confirmEmail = async (token) => {
  const authAxios = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Credentials": "true",
    },
  });
  const response = await authAxios.get(
    `authentication/confirm-account?token=${token}`
  );
  return response.data;
};
