import { message } from "antd";
import authAxios from "./authAxios";

export const deleteParticipant = async (participantId, eventId) => {
  try {
    const response = await authAxios.delete(
      `events/${eventId}/participants/${participantId}`
    );
    return response.data;
  } catch (error) {
    message.error("Error deleting participant");
    console.error(error);
  }
};
