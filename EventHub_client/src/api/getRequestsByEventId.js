import axios from "./axios";

export const getRequestsByEventId = async (eventId) => {
  const response = await axios.get(`events/${eventId}/participants/requests`);
  return response.data;
};
