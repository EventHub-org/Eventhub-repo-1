import axios from "./axios";

export const resetPassword = async (email) => {
  const accessToken = localStorage.getItem("token");

  const authAxios = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Credentials": "true",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  const response = await authAxios.get("/authentication/forgot-password", {
    params: {
      email: email,
    },
  });
  return response.data;
};

export const confirmResetPassword = async (data) => {
  const res = await axios.post("/authentication/forgot-password", data, {
    headers: { "Content-Type": "application/json" },
  });

  const accessToken = res?.data?.accessToken;
  const refToken = res?.data?.refreshToken;
  const expiryDate = res?.data?.expiryDate;

  localStorage.setItem("token", accessToken);
  localStorage.setItem("refreshToken", refToken);
  localStorage.setItem("expDate", expiryDate);
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${res.data["token"]}`;
};
