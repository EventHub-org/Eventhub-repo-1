import axios from "./axios";

export const getUserInfo = async () => {
  try {
    const authAxios = axios.create({
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Credentials": "true",
      },
    });
    const response = await authAxios.get("users/user-info");
    return response.data;
  } catch (error) {
    console.log("Error getting user info : ", error);
  }
};