import axios from "./axios";

export const getFullEventById = async (userId, eventId) => {
  const accessToken = localStorage.getItem("token");

  const authAxios = axios.create({
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Credentials": "true",
      ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    },
  });

  try {
    const response = await authAxios.get(`/users/${userId}/events/${eventId}`);
    return response.data;
  } catch (error) {
    console.log("Error getting event with Id: ", error);
  }
};
