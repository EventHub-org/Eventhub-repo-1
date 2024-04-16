import axios from "./axios";

export const createParticipant = async (userId, eventId) => {
  try {
    const accessToken = localStorage.getItem("token");

    const response = await axios({
      method: "post",
      url: `http://localhost:9090/events/${eventId}/participants`,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "content-type",
        "Access-Control-Allow-Credentials": "true",
      },
      data: {
        event_id: eventId,
        user_id: userId,
      },
    });

    return response.data;
  } catch (error) {
    console.log("Error creating participant:", error);
  }
};
