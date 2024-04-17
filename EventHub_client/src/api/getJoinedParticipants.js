import axios from "./axios";

export const getJoinedParticipants = async (eventId) => {
  try {
    const response = await axios.get(`events/${eventId}/participants/joined`);
    return response.data;
  } catch (error) {
    console.log("Error getting participants with photos data:", error);
  }
};
