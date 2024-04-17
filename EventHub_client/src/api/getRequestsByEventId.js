import authAxios from "./authAxios";

export const getRequestsByEventId = async (eventId) => {
  try {
    const response = await authAxios.get(
      `events/${eventId}/participants/requests`
    );
    return response.data;
  } catch (error) {
    console.log("Error getting requests by event id:", error);
  }
};
