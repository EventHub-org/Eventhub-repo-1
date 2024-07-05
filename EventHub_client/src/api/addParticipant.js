import axios from "./axios";

export const addParticipant = async (eventId, participantId) => {
  const response = await axios.post(
    `events/${eventId}/participants/add/${participantId}`
  );

  return response.data;
};
