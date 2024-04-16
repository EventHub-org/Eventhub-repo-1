import axios from "./axios";

export const getParticipantByUserId = async (userId, eventId) => {
  try {
    const accessToken = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await axios.get(
      `events/${eventId}/participants/user/${userId}`,
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.log("Error getting participant by user id:", error);
  }
};
