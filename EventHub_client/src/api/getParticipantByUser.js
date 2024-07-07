import axios from "./axios";

export const getParticipantByUser = async (eventId) => {
  const response = await axios.get(`events/${eventId}/participants/user`);
  return response.data;
};
