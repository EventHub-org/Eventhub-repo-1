import axios from "./axios";

export const getParticipantState = async (eventId) => {
  const response = await axios.get(`events/${eventId}/participants/user_state`);
  return response.data;
};
