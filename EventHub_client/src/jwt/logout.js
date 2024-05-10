import axios from "../api/axios";

export const logout = async () => {
  const DATA_URL = "/authentication/logout";

  const accessToken = localStorage.getItem("token");

  try {
    const response = await axios.post(
      DATA_URL,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error:", error.message);
  }
};
