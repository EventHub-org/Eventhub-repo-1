import axios from "../api/axios";

export const refreshToken = async () => {
  const DATA_URL = "/authentication/refreshToken";

  const accessToken = localStorage.getItem("token");
  const token = localStorage.getItem("refreshToken");

  console.log(accessToken);
  console.log(token);

  try {
    const response = await axios.post(
      DATA_URL,
      {
        token,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newAccessToken = response?.data?.accessToken;

    localStorage.setItem("token", newAccessToken);

    console.log(newAccessToken);

    return response.data;
  } catch (error) {
    console.log("Error refreshing tokens", error);
  }
};
