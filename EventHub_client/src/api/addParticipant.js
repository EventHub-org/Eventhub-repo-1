import { message } from "antd";
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
    message.error("Error while adding participant");
    console.error(error);
  }
};
