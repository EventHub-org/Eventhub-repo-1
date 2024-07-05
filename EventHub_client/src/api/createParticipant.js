import axios from "./axios";

export const createParticipant = async (eventId) => {
  const response = await axios.post(`events/${eventId}/participants/create`);

  return response.data;
};
