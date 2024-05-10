import axios from "./axios";

export const getUserParticipants = async (eventId) => {
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
    // const response = await axios.get(`events/${eventId}/participants/photos`, { headers: {"Authorization" : `Bearer ${localStorage.getItem('token')}`} })
    const response = await authAxios.get(
      `events/${eventId}/participants/users`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting participants with photos data:", error);
  }
};
