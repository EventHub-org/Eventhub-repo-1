import axios from "./axios";

export const leaveEvent = async (participantId, eventId) => {
  const response = await axios.delete(
    `events/${eventId}/participants/${participantId}/leave`
  );
  return response.data;
};
