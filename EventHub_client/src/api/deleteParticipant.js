import authAxios from "./authAxios";

export const deleteParticipant = async (participantId, eventId) => {
  try {
    const response = await authAxios.delete(
      `events/${eventId}/participants/${participantId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error deleting participant:", error);
  }
};
