import axios from "./axios";

export const getRequestsByEventId = async (eventId) => {
  try {
    const accessToken = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await axios.get(
      `events/${eventId}/participants/requests`,
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.log("Error getting requests by event id:", error);
  }
};
