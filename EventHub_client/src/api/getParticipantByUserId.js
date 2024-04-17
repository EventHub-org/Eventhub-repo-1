import authAxios from "./authAxios";

export const getParticipantByUserId = async (userId, eventId) => {
  try {
    const response = await authAxios.get(
      `events/${eventId}/participants/user/${userId}`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting participant by user id:", error);
  }
};
