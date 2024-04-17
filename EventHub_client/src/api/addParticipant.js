import authAxios from "./authAxios";

export const addParticipant = async (userId, eventId, participantId) => {
  try {
    const response = await authAxios.put(
      `events/${eventId}/participants/${participantId}`,
      {
        event_id: eventId,
        user_id: userId,
      }
    );

    return response.data;
  } catch (error) {
    console.log("Error while adding participant: ", error);
  }
};
