import axios from "./axios";

export const deleteParticipant = async (participantId, eventId) => {
  const response = await axios.delete(
    `events/${eventId}/participants/${participantId}`
  );
  return response.data;
};
