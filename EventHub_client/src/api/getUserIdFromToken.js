import axios from "./axios";

export const getUserIdFromToken = async () => {
  try {
    const accessToken = localStorage.getItem("token");

    const authAxios = axios.create({
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    const response = await authAxios.get(`/token`);
    return response.data;
  } catch (error) {
    console.log("Error getting id from token: ", error);
  }
};
