import axios from "./axios";

export const deleteParticipant = async (participantId, eventId) => {
  try {
    const accessToken = localStorage.getItem("token");

    const headers = {
      Authorization: `Bearer ${accessToken}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Credentials": "true",
    };

    const response = await axios.delete(
      `events/${eventId}/participants/${participantId}`,
      { headers: headers }
    );
    return response.data;
  } catch (error) {
    console.log("Error deleting participant:", error);
  }
};
